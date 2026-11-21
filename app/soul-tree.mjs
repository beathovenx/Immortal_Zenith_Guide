import {
  canRemoveRank,
  fitTreeScale,
  missingPrerequisites,
  nextCost,
  planCost,
  validatePlan,
  validateTree,
} from "./soul-tree-model.mjs";

const storageKey = "zenith-soul-tree-plan";
const escape = (text) =>
  String(text ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const format = (number) => new Intl.NumberFormat("en").format(number);
const toAppUrl = (value) => {
  if (!value) return value;
  if (/^https?:\/\//.test(value)) return value;
  const normalized = String(value).replace(/^\/+/, "");
  return new URL(normalized, document.baseURI).toString();
};

export async function initSoulTree() {
  const response = await fetch(toAppUrl("soul-tree.json"));
  if (!response.ok)
    throw new Error(`Soul Tree data could not load (${response.status}).`);
  const data = await response.json();
  const nodes = validateTree(data.entries);
  const $ = (id) => document.getElementById(id);
  let ranks = {};
  let storageWarning = "";
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      validatePlan(parsed, nodes);
      ranks = parsed;
    }
  } catch (error) {
    storageWarning = `Could not load the saved plan: ${error.message}. Starting with an empty plan.`;
  }
  let tree = "cultivation";
  let selected = data.entries.find((node) => node.tree === tree).id;
  let zoomFactor = 1;
  const width = 132;
  const height = 54;
  const colWidth = 154;
  const rowHeight = 96;
  const pad = 18;
  const branchGap = 64;

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(ranks));
      storageWarning = "";
      $("soul-status").textContent =
        "Plan saved in this browser; no changes are sent to the game.";
    } catch (error) {
      storageWarning = `Could not save the plan: ${error.message}. Changes are only kept in this tab.`;
      $("soul-status").textContent = storageWarning;
    }
  }

  function exportPlan() {
    const date = new Date().toISOString().slice(0, 10);
    const suggestedName = `soul-tree-plan-${date}`;
    const inputName = window.prompt(
      "Filename for export (without .json)",
      suggestedName,
    );
    if (inputName === null) {
      $("soul-status").textContent = "Export canceled.";
      return;
    }
    const cleanedBaseName = inputName
      .trim()
      .replace(/[\\/:*?"<>|\u0000-\u001F]/g, "_");
    const baseName = cleanedBaseName || suggestedName;
    const fileName = /\.json$/i.test(baseName) ? baseName : `${baseName}.json`;
    const payload = {
      format: "zenith-soul-tree-plan-v1",
      exportedAt: new Date().toISOString(),
      wikiSnapshot: data.fetchedAt,
      ranks,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    $("soul-status").textContent =
      "Plan exported as JSON. You can import it for another character.";
  }

  function importPlan(text) {
    const parsed = JSON.parse(text);
    const candidate =
      parsed && typeof parsed === "object" && parsed.ranks && !Array.isArray(parsed.ranks)
        ? parsed.ranks
        : parsed;
    validatePlan(candidate, nodes);
    ranks = candidate;
    save();
    renderDetails();
    $("soul-status").textContent =
      `Imported plan with ${Object.keys(ranks).length} configured nodes.`;
  }

  function renderDetails() {
    const node = nodes.get(selected);
    const rank = ranks[node.id] ?? 0;
    const missing = missingPrerequisites(node, ranks, nodes);
    const maxed = node.maxRanks > 0 && rank >= node.maxRanks;
    const requirements = node.prereqs
      ? node.prereqs.map((req) => {
          const parent = nodes.get(req.nodeId);
          const requiredRanks =
            parent.maxRanks === 0 ? req.ranks : Math.min(req.ranks, parent.maxRanks);
          const currentRanks = ranks[req.nodeId] ?? 0;
          return {
            name: parent.name,
            ranks: requiredRanks,
            current: currentRanks,
            met: currentRanks >= requiredRanks,
          };
        })
      : [];
    $("soul-spent").textContent =
      `${format(planCost(ranks, nodes))} DSP planned`;
    $("soul-picker").value = node.id;
    $("soul-detail").innerHTML = `
      <img class="soul-detail-art" src="${escape(toAppUrl(node.localImage))}" alt="">
      <span class="eyebrow">${escape(node.tree)} / ROW ${node.row ?? node.tier}</span>
      <h2>${escape(node.name)}</h2>
      <p>${escape(node.description)}</p>
      <div class="soul-detail-rank">Planned rank <strong>${format(rank)} / ${node.maxRanks ? format(node.maxRanks) : "∞"}</strong></div>
      <div class="soul-detail-rank">Next rank <strong>${maxed ? "Maxed" : `${format(nextCost(node, rank))} DSP`}</strong></div>
      <h3>Prerequisites</h3>
      <ul class="soul-requirements">${
        requirements.length
          ? requirements
              .map(
                (req) =>
                  `<li class="${req.met ? "met" : ""}">${req.met ? "✓" : "○"} ${escape(req.name)}${req.ranks > 1 ? ` · rank ${req.ranks}` : ""}${req.current !== undefined ? ` <small>(${req.current}/${req.ranks})</small>` : ""}</li>`,
              )
              .join("")
          : "<li>None · root node</li>"
      }</ul>
      <div class="soul-actions">
        <button type="button" class="button" data-soul-action="remove" ${canRemoveRank(node, ranks, nodes) ? "" : "disabled"}>− Remove rank</button>
        <button type="button" class="button primary" data-soul-action="add" ${maxed || missing.length ? "disabled" : ""}>+ Plan rank</button>
      </div>
      ${rank && !canRemoveRank(node, ranks, nodes) ? '<p class="muted">Remove dependent ranks before lowering this prerequisite.</p>' : ""}
      <a class="text-link" href="https://immortalzenith.com/wiki/soultree/${encodeURIComponent(node.id)}" target="_blank" rel="noopener noreferrer">Official node ↗</a>`;

    document.querySelectorAll("[data-soul-node]").forEach((button) => {
      const item = nodes.get(button.dataset.soulNode);
      const itemRank = ranks[item.id] ?? 0;
      const locked = missingPrerequisites(item, ranks, nodes).length > 0;
      button.classList.toggle("selected", item.id === selected);
      button.classList.toggle("planned", itemRank > 0);
      button.classList.toggle("locked", locked);
      button.setAttribute("aria-pressed", String(item.id === selected));
      button.querySelector(".soul-node-rank").textContent =
        item.maxRanks === 1
          ? itemRank
            ? "✓"
            : ""
          : `${itemRank}/${item.maxRanks || "∞"}`;
    });
  }

  function drawTree() {
    const entries = data.entries.filter((node) => node.tree === tree);
    const branchOrder = [];
    const entriesByBranch = new Map();
    for (const node of entries) {
      const branch = node.branch ?? "main";
      if (!entriesByBranch.has(branch)) {
        entriesByBranch.set(branch, []);
        branchOrder.push(branch);
      }
      entriesByBranch.get(branch).push(node);
    }
    let cursorX = pad;
    const branchOffsets = new Map();
    for (const branch of branchOrder) {
      const branchNodes = entriesByBranch.get(branch);
      const minCol = Math.min(...branchNodes.map((node) => node.col));
      const maxCol = Math.max(...branchNodes.map((node) => node.col));
      branchOffsets.set(branch, cursorX - minCol * colWidth);
      cursorX += (maxCol - minCol + 1) * colWidth + branchGap;
    }
    const positions = new Map(
      entries.map((node) => [
        node.id,
        {
          x: branchOffsets.get(node.branch ?? "main") + node.col * colWidth,
          y: pad + (node.row ?? node.tier) * rowHeight,
        },
      ]),
    );
    const canvasWidth = Math.ceil(
      Math.max(...entries.map((node) => positions.get(node.id).x + width)) +
        pad,
    );
    const canvasHeight = Math.ceil(
      Math.max(...entries.map((node) => positions.get(node.id).y + height)) +
        pad,
    );
    const edges = entries
      .flatMap((node) =>
        (node.prereqs ?? []).map((req) => {
          const a = positions.get(req.nodeId);
          const b = positions.get(node.id);
          return `<line x1="${a.x + width / 2}" y1="${a.y + height}" x2="${b.x + width / 2}" y2="${b.y}"/>`;
        }),
      )
      .join("");
    const buttons = entries
      .map((node) => {
        return `<button type="button" class="soul-node" data-soul-node="${escape(node.id)}" aria-label="${escape(node.name)}" aria-pressed="false">
        <img src="${escape(toAppUrl(node.localImage))}" alt="" loading="lazy"><span class="soul-node-name">${escape(node.name)}</span><span class="soul-node-rank"></span>
      </button>`;
      })
      .join("");
    $("soul-stage").style.width = `${canvasWidth}px`;
    $("soul-stage").style.height = `${canvasHeight}px`;
    $("soul-stage").innerHTML =
      `<svg class="soul-edges" width="${canvasWidth}" height="${canvasHeight}" aria-hidden="true">${edges}</svg>${buttons}`;
    $("soul-stage")
      .querySelectorAll("[data-soul-node]")
      .forEach((button) => {
        const pos = positions.get(button.dataset.soulNode);
        button.style.left = `${pos.x}px`;
        button.style.top = `${pos.y}px`;
      });
    $("soul-picker").innerHTML = entries
      .slice()
      .sort(
        (a, b) =>
          (a.row ?? a.tier) - (b.row ?? b.tier) ||
          a.name.localeCompare(b.name),
      )
      .map(
        (node) =>
          `<option value="${escape(node.id)}">${escape(node.name)} · row ${node.row ?? node.tier}</option>`,
      )
      .join("");
    document.querySelectorAll("[data-soul-tree]").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.soulTree === tree),
      );
    });
    updateZoom(canvasWidth, canvasHeight);
    renderDetails();
  }

  function updateZoom(canvasWidth, canvasHeight) {
    const stage = $("soul-stage");
    const w = canvasWidth ?? parseFloat(stage.style.width);
    const h = canvasHeight ?? parseFloat(stage.style.height);
    const availableWidth = $("soul-viewport").clientWidth;
    if (!availableWidth) return;
    const zoom = fitTreeScale(availableWidth, w, zoomFactor);
    stage.style.transform = `scale(${zoom})`;
    $("soul-sizer").style.width = `${Math.ceil(w * zoom)}px`;
    $("soul-sizer").style.height = `${Math.ceil(h * zoom)}px`;
    $("soul-zoom-value").textContent = `${Math.round(zoom * 100)}%`;
    $("soul-zoom-in").disabled = zoomFactor >= 1.5;
    $("soul-zoom-out").disabled = zoomFactor <= 0.5;
  }

  function selectNode(id, center = false) {
    selected = id;
    renderDetails();
    if (center) {
      const button = $("soul-stage").querySelector(
        `[data-soul-node="${CSS.escape(id)}"]`,
      );
      button.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }

  $("soul-tree").addEventListener("click", (event) => {
    const tab = event.target.closest("[data-soul-tree]");
    if (tab && tab.dataset.soulTree !== tree) {
      tree = tab.dataset.soulTree;
      selected = data.entries.find((node) => node.tree === tree).id;
      drawTree();
      return;
    }
    const button = event.target.closest("[data-soul-node]");
    if (button) {
      selectNode(button.dataset.soulNode);
      return;
    }
    const action = event.target.closest("[data-soul-action]");
    if (!action) return;
    const node = nodes.get(selected);
    const rank = ranks[selected] ?? 0;
    if (
      action.dataset.soulAction === "add" &&
      !missingPrerequisites(node, ranks, nodes).length &&
      (!node.maxRanks || rank < node.maxRanks)
    ) {
      const updated = { ...ranks, [selected]: rank + 1 };
      validatePlan(updated, nodes);
      ranks = updated;
    } else if (
      action.dataset.soulAction === "remove" &&
      canRemoveRank(node, ranks, nodes)
    ) {
      const updated = { ...ranks };
      if (rank === 1) delete updated[selected];
      else updated[selected] = rank - 1;
      ranks = updated;
    } else return;
    save();
    renderDetails();
    const sameAction = $("soul-detail").querySelector(
      `[data-soul-action="${action.dataset.soulAction}"]:not(:disabled)`,
    );
    (sameAction ?? $("soul-picker")).focus();
  });
  $("soul-picker").addEventListener("change", (event) =>
    selectNode(event.target.value, true),
  );
  $("soul-zoom-in").addEventListener("click", () => {
    zoomFactor = Math.min(1.5, Math.round((zoomFactor + 0.1) * 10) / 10);
    updateZoom();
  });
  $("soul-zoom-out").addEventListener("click", () => {
    zoomFactor = Math.max(0.5, Math.round((zoomFactor - 0.1) * 10) / 10);
    updateZoom();
  });
  $("soul-reset").addEventListener("click", () => {
    if (
      !Object.keys(ranks).length ||
      !confirm(
        "Clear all planned Soul Tree ranks? This does not affect the game.",
      )
    )
      return;
    ranks = {};
    save();
    renderDetails();
  });
  $("soul-export").addEventListener("click", exportPlan);
  $("soul-import").addEventListener("click", () => $("soul-import-file").click());
  $("soul-import-file").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      importPlan(await file.text());
    } catch (error) {
      $("soul-status").textContent =
        `Could not import plan: ${error.message}. Use a valid Soul Tree plan JSON file.`;
    } finally {
      event.target.value = "";
    }
  });
  $("soul-snapshot").textContent =
    `Wiki snapshot: ${data.fetchedAt.slice(0, 10)} · ${nodes.size} nodes · local planning only`;
  $("soul-status").textContent =
    storageWarning ||
    "Select a node to inspect it. Plan ranks locally; nothing is sent to the game.";
  drawTree();
  new ResizeObserver(() => updateZoom()).observe($("soul-viewport"));
}
