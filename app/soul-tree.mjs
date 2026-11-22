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
const sharedTrunkParents = new Set(["ashes_of_the_forge", "qi_gen_rate"]);

export async function initSoulTree() {
  const response = await fetch(toAppUrl("soul-tree.json"));
  if (!response.ok)
    throw new Error(`Soul Tree data could not load (${response.status}).`);
  const data = await response.json();
  const nodes = validateTree(data.entries);
  const $ = (id) => document.getElementById(id);
  const cleanRankMap = (value) => {
    if (!value || typeof value !== "object" || Array.isArray(value))
      throw new Error("Saved Soul Tree plan has an invalid format.");
    const cleaned = {};
    for (const [id, rank] of Object.entries(value)) {
      const node = nodes.get(id);
      if (!node || !Number.isSafeInteger(rank) || rank < 0)
        throw new Error(`Invalid saved rank for ${id}.`);
      if (node.maxRanks !== 0 && rank > node.maxRanks)
        throw new Error(`Invalid saved rank for ${id}.`);
      if (rank > 0) cleaned[id] = rank;
    }
    return cleaned;
  };
  const combineRanks = (primary, secondary) => {
    const combined = { ...primary };
    for (const [id, rank] of Object.entries(secondary))
      combined[id] = (combined[id] ?? 0) + rank;
    return combined;
  };
  let primaryRanks = {};
  let secondaryRanks = {};
  let planningPhase = "primary";
  let storageWarning = "";
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed) &&
        (parsed.primaryRanks || parsed.secondaryRanks)
      ) {
        primaryRanks = cleanRankMap(parsed.primaryRanks ?? {});
        secondaryRanks = cleanRankMap(parsed.secondaryRanks ?? {});
      } else if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed) &&
        parsed.ranks
      ) {
        primaryRanks = cleanRankMap(parsed.ranks);
        secondaryRanks = {};
      } else {
        primaryRanks = cleanRankMap(parsed);
        secondaryRanks = {};
      }
      validatePhases(primaryRanks, secondaryRanks);
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
  const branchLayoutPresets = {
    cultivation: {
      rows: [
        ["qi", "insight"],
        ["rebirth"],
      ],
      colGap: 46,
      rowGap: 52,
    },
    combat: {
      rows: [
        ["battle", "hunt"],
        ["vigor", "arms"],
        ["legacy", "wards"],
      ],
      colGap: 46,
      rowGap: 52,
    },
    exploration: {
      rows: [
        ["wayfinding", "roads"],
        ["homeland"],
      ],
      colGap: 46,
      rowGap: 52,
    },
    crafting: {
      rows: [
        ["mastery", "memory"],
        ["workshop"],
      ],
      colGap: 46,
      rowGap: 52,
    },
  };
  const getEffectiveRanks = () => combineRanks(primaryRanks, secondaryRanks);
  const getContextRanks = () =>
    planningPhase === "primary" ? primaryRanks : getEffectiveRanks();
  const getActiveRanks = () =>
    planningPhase === "primary" ? primaryRanks : secondaryRanks;
  const setActiveRanks = (next) => {
    if (planningPhase === "primary") primaryRanks = next;
    else secondaryRanks = next;
  };
  const validatePhases = (primary, secondary) => {
    validatePlan(primary, nodes);
    validatePlan(combineRanks(primary, secondary), nodes);
  };
  const phaseLabel = () =>
    planningPhase === "primary"
      ? "First/Current Reincarnation"
      : "Next Reincarnation";

  function save() {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          format: "zenith-soul-tree-plan-v2",
          primaryRanks,
          secondaryRanks,
        }),
      );
      storageWarning = "";
      $("soul-status").textContent =
        `${phaseLabel()} saved locally. This planner never edits your character.`;
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
      format: "zenith-soul-tree-plan-v2",
      exportedAt: new Date().toISOString(),
      wikiSnapshot: data.fetchedAt,
      primaryRanks,
      secondaryRanks,
      ranks: getEffectiveRanks(),
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
      "Build exported as JSON. Use it to switch between characters.";
  }

  function importPlan(text) {
    const parsed = JSON.parse(text);
    let nextPrimary = {};
    let nextSecondary = {};
    if (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed) &&
      (parsed.primaryRanks || parsed.secondaryRanks)
    ) {
      nextPrimary = cleanRankMap(parsed.primaryRanks ?? {});
      nextSecondary = cleanRankMap(parsed.secondaryRanks ?? {});
    } else {
      const candidate =
        parsed &&
        typeof parsed === "object" &&
        parsed.ranks &&
        !Array.isArray(parsed.ranks)
          ? parsed.ranks
          : parsed;
      nextPrimary = cleanRankMap(candidate);
      nextSecondary = {};
    }
    validatePhases(nextPrimary, nextSecondary);
    primaryRanks = nextPrimary;
    secondaryRanks = nextSecondary;
    save();
    renderDetails();
    $("soul-status").textContent =
      `Loaded build with ${Object.keys(getEffectiveRanks()).length} configured nodes.`;
  }

  function renderDetails() {
    const ranks = getEffectiveRanks();
    const contextRanks = getContextRanks();
    const activeRanks = getActiveRanks();
    const node = nodes.get(selected);
    const rank = ranks[node.id] ?? 0;
    const activeRank = activeRanks[node.id] ?? 0;
    const primaryRank = primaryRanks[node.id] ?? 0;
    const secondaryRank = secondaryRanks[node.id] ?? 0;
    const missing = missingPrerequisites(node, contextRanks, nodes);
    const maxed = node.maxRanks > 0 && rank >= node.maxRanks;
    const phaseStillValid =
      planningPhase === "primary"
        ? canRemoveRank(node, primaryRanks, nodes)
        : true;
    const canRemoveFromActive =
      activeRank > 0 &&
      phaseStillValid &&
      canRemoveRank(node, ranks, nodes);
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
    $("soul-spent-phase1").textContent = `${format(planCost(primaryRanks, nodes))} DSP`;
    $("soul-spent-phase2").textContent = `${format(planCost(secondaryRanks, nodes))} DSP`;
    $("soul-spent-total").textContent = `${format(planCost(ranks, nodes))} DSP`;
    $("soul-phase-toggle").textContent = `Planning mode: ${phaseLabel()}`;
    $("soul-detail").innerHTML = `
      <img class="soul-detail-art" src="${escape(toAppUrl(node.localImage))}" alt="">
      <span class="eyebrow">${escape(node.tree)} / ROW ${node.row ?? node.tier}</span>
      <h2>${escape(node.name)}</h2>
      <p>${escape(node.description)}</p>
      <div class="soul-detail-rank">Current build <strong>${format(rank)} / ${node.maxRanks ? format(node.maxRanks) : "∞"}</strong></div>
      <div class="soul-detail-rank">Current phase spend <strong>${format(activeRank)} rank${activeRank === 1 ? "" : "s"} (${escape(phaseLabel())})</strong></div>
      <div class="soul-detail-rank">Split <strong>P1 ${format(primaryRank)} · P2 ${format(secondaryRank)}</strong></div>
      <div class="soul-detail-rank">Upgrade cost <strong>${maxed ? "Maxed" : `${format(nextCost(node, rank))} DSP`}</strong></div>
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
        <button type="button" class="button" data-soul-action="remove" ${canRemoveFromActive ? "" : "disabled"}>− Remove rank</button>
        <button type="button" class="button primary" data-soul-action="add" ${maxed || missing.length ? "disabled" : ""}>+ Plan rank</button>
      </div>
      ${activeRank && !canRemoveFromActive ? '<p class="muted">Remove dependent ranks before lowering this prerequisite.</p>' : ""}
      <a class="text-link" href="https://immortalzenith.com/wiki/soultree/${encodeURIComponent(node.id)}" target="_blank" rel="noopener noreferrer">Official node ↗</a>`;

    document.querySelectorAll("[data-soul-node]").forEach((button) => {
      const item = nodes.get(button.dataset.soulNode);
      const itemRank = ranks[item.id] ?? 0;
      const itemSecondaryRank = secondaryRanks[item.id] ?? 0;
      const locked =
        missingPrerequisites(item, contextRanks, nodes).length > 0;
      button.classList.toggle("selected", item.id === selected);
      button.classList.toggle("planned", itemRank > 0);
      button.classList.toggle("planned-phase2", itemSecondaryRank > 0);
      button.classList.toggle("locked", locked);
      button.setAttribute("aria-pressed", String(item.id === selected));
      button.querySelector(".soul-node-rank").textContent =
        item.maxRanks === 1
          ? itemRank
            ? "✓"
            : ""
          : itemSecondaryRank > 0
            ? `${itemRank - itemSecondaryRank}+${itemSecondaryRank}/${item.maxRanks || "∞"}`
            : `${itemRank}/${item.maxRanks || "∞"}`;
    });
    updateEdgeStyles();
  }

  function updateEdgeStyles() {
    const ranks = getEffectiveRanks();
    $("soul-stage")
      .querySelectorAll(".soul-edges [data-edge-parent]")
      .forEach((edge) => {
        const parentId = edge.dataset.edgeParent;
        const childId = edge.dataset.edgeChild;
        const required = Number(edge.dataset.edgeRequired || 1);
        const parent = nodes.get(parentId);
        if (!parent) return;
        const effectiveRequired =
          parent.maxRanks === 0 ? required : Math.min(required, parent.maxRanks);
        const parentRank = ranks[parentId] ?? 0;
        const childRank = ranks[childId] ?? 0;
        edge.classList.toggle("edge-unlocked", parentRank >= effectiveRequired);
        edge.classList.toggle("edge-active", parentRank > 0 || childRank > 0);
        edge.classList.toggle(
          "edge-focused",
          parentId === selected || childId === selected,
        );
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
    const branchBounds = new Map(
      branchOrder.map((branch) => {
        const branchNodes = entriesByBranch.get(branch);
        const minCol = Math.min(...branchNodes.map((node) => node.col));
        const maxCol = Math.max(...branchNodes.map((node) => node.col));
        const minRow = Math.min(
          ...branchNodes.map((node) => node.row ?? node.tier),
        );
        const maxRow = Math.max(
          ...branchNodes.map((node) => node.row ?? node.tier),
        );
        return [
          branch,
          {
            minCol,
            maxCol,
            minRow,
            maxRow,
            width: (maxCol - minCol + 1) * colWidth,
            height: (maxRow - minRow + 1) * rowHeight,
          },
        ];
      }),
    );
    const branchOffsets = new Map();
    const preset = branchLayoutPresets[tree];
    if (preset) {
      const rows = [];
      const assigned = new Set();
      for (const row of preset.rows) {
        const present = row.filter((branch) => entriesByBranch.has(branch));
        if (!present.length) continue;
        present.forEach((branch) => assigned.add(branch));
        rows.push(present);
      }
      const leftovers = branchOrder.filter((branch) => !assigned.has(branch));
      for (const branch of leftovers) rows.push([branch]);
      const rowWidths = rows.map(
        (row) =>
          row.reduce((sum, branch) => sum + branchBounds.get(branch).width, 0) +
          preset.colGap * Math.max(0, row.length - 1),
      );
      const layoutWidth = Math.max(...rowWidths, 0);
      let cursorY = pad;
      rows.forEach((row, index) => {
        const rowWidth = rowWidths[index];
        let cursorX = pad + Math.max(0, (layoutWidth - rowWidth) / 2);
        let maxRowHeight = 0;
        for (const branch of row) {
          const bounds = branchBounds.get(branch);
          branchOffsets.set(branch, {
            x: cursorX - bounds.minCol * colWidth,
            y: cursorY - bounds.minRow * rowHeight,
          });
          cursorX += bounds.width + preset.colGap;
          maxRowHeight = Math.max(maxRowHeight, bounds.height);
        }
        cursorY += maxRowHeight + preset.rowGap;
      });
    } else {
      let cursorX = pad;
      for (const branch of branchOrder) {
        const bounds = branchBounds.get(branch);
        branchOffsets.set(branch, {
          x: cursorX - bounds.minCol * colWidth,
          y: pad - bounds.minRow * rowHeight,
        });
        cursorX += bounds.width + branchGap;
      }
    }
    const positions = new Map(
      entries.map((node) => [
        node.id,
        {
          x:
            branchOffsets.get(node.branch ?? "main").x + node.col * colWidth,
          y:
            branchOffsets.get(node.branch ?? "main").y +
            (node.row ?? node.tier) * rowHeight,
        },
      ]),
    );
    const nodeBoxes = new Map(
      entries.map((node) => {
        const pos = positions.get(node.id);
        return [
          node.id,
          {
            left: pos.x,
            right: pos.x + width,
            top: pos.y,
            bottom: pos.y + height,
            row: node.row ?? node.tier,
            branch: node.branch ?? "main",
          },
        ];
      }),
    );
    const branchSpan = new Map();
    for (const node of entries) {
      const branch = node.branch ?? "main";
      const box = nodeBoxes.get(node.id);
      const current = branchSpan.get(branch) ?? {
        left: Number.POSITIVE_INFINITY,
        right: Number.NEGATIVE_INFINITY,
      };
      current.left = Math.min(current.left, box.left);
      current.right = Math.max(current.right, box.right);
      branchSpan.set(branch, current);
    }
    const globalLeft = Math.min(
      ...Array.from(branchSpan.values(), (span) => span.left),
    );
    const globalRight = Math.max(
      ...Array.from(branchSpan.values(), (span) => span.right),
    );
    const globalCenterX = (globalLeft + globalRight) / 2;
    const branchInnerLanes = new Map();
    for (const [branch, branchNodes] of entriesByBranch.entries()) {
      const starts = Array.from(
        new Set(
          branchNodes
            .map((node) => {
              const box = nodeBoxes.get(node.id);
              return `${box.left}:${box.right}`;
            })
            .sort((a, b) => Number(a.split(":")[0]) - Number(b.split(":")[0])),
        ),
      ).map((pair) => {
        const [left, right] = pair.split(":").map(Number);
        return { left, right };
      });
      const lanes = [];
      for (let i = 0; i < starts.length - 1; i++) {
        const current = starts[i];
        const next = starts[i + 1];
        if (next.left - current.right > 6)
          lanes.push((current.right + next.left) / 2);
      }
      branchInnerLanes.set(branch, lanes);
    }
    const hasVerticalCollision = (x, y1, y2, parentId, childId, ignoredIds) => {
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      return entries.some((node) => {
        if (node.id === parentId || node.id === childId) return false;
        if (ignoredIds?.has(node.id)) return false;
        const box = nodeBoxes.get(node.id);
        return (
          x > box.left - 4 &&
          x < box.right + 4 &&
          maxY > box.top - 4 &&
          minY < box.bottom + 4
        );
      });
    };
    const hasHorizontalCollision = (y, x1, x2, parentId, childId, ignoredIds) => {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      return entries.some((node) => {
        if (node.id === parentId || node.id === childId) return false;
        if (ignoredIds?.has(node.id)) return false;
        const box = nodeBoxes.get(node.id);
        return (
          y > box.top - 4 &&
          y < box.bottom + 4 &&
          maxX > box.left - 4 &&
          minX < box.right + 4
        );
      });
    };
    const routeCrossesNodes = (points, parentId, childId, ignoredIds) => {
      for (let i = 0; i < points.length - 1; i++) {
        const from = points[i];
        const to = points[i + 1];
        if (Math.abs(from.x - to.x) < 0.5) {
          if (
            hasVerticalCollision(
              from.x,
              from.y,
              to.y,
              parentId,
              childId,
              ignoredIds,
            )
          )
            return true;
        } else if (Math.abs(from.y - to.y) < 0.5) {
          if (
            hasHorizontalCollision(
              from.y,
              from.x,
              to.x,
              parentId,
              childId,
              ignoredIds,
            )
          )
            return true;
        }
      }
      return false;
    };
    const staggerOffset = (useCount, step = 8, maxSteps = 4) => {
      if (useCount <= 0) return 0;
      const tier = Math.min(maxSteps, Math.ceil(useCount / 2));
      const direction = useCount % 2 === 1 ? 1 : -1;
      return direction * tier * step;
    };
    const roundedPolyline = (points, radius = 12) => {
      if (points.length < 2) return "";
      let path = `M ${points[0].x} ${points[0].y}`;
      for (let index = 1; index < points.length; index++) {
        const current = points[index];
        const previous = points[index - 1];
        const next = points[index + 1];
        if (!next) {
          path += ` L ${current.x} ${current.y}`;
          continue;
        }
        const inDx = current.x - previous.x;
        const inDy = current.y - previous.y;
        const outDx = next.x - current.x;
        const outDy = next.y - current.y;
        const inLength = Math.hypot(inDx, inDy);
        const outLength = Math.hypot(outDx, outDy);
        if (!inLength || !outLength) {
          path += ` L ${current.x} ${current.y}`;
          continue;
        }
        const bend = Math.min(radius, inLength / 2, outLength / 2);
        const enterX = current.x - (inDx / inLength) * bend;
        const enterY = current.y - (inDy / inLength) * bend;
        const leaveX = current.x + (outDx / outLength) * bend;
        const leaveY = current.y + (outDy / outLength) * bend;
        path += ` L ${enterX} ${enterY} Q ${current.x} ${current.y} ${leaveX} ${leaveY}`;
      }
      return path;
    };
    const laneUse = new Map();
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
          const parentNode = nodes.get(req.nodeId);
          const a = positions.get(req.nodeId);
          const b = positions.get(node.id);
          const startX = a.x + width / 2;
          const startY = a.y + height;
          const endX = b.x + width / 2;
          const endY = b.y;
          const attrs = `class=\"edge\" data-edge-parent=\"${escape(req.nodeId)}\" data-edge-child=\"${escape(node.id)}\" data-edge-required=\"${req.ranks}\"`;
          const parentRow = parentNode?.row ?? parentNode?.tier ?? 0;
          const childRow = node.row ?? node.tier;
          if (
            (req.nodeId.startsWith("keep_region_") ||
              req.nodeId.startsWith("region_keep_")) &&
            node.branch === "homeland" &&
            childRow === parentRow &&
            Math.abs(startX - endX) > 1
          ) {
            const sideY = a.y + height / 2;
            const startSideX = endX < startX ? a.x : a.x + width;
            const endSideX = endX < startX ? b.x + width : b.x;
            const sidePoints = [
              { x: startSideX, y: sideY },
              { x: endSideX, y: sideY },
            ];
            if (!routeCrossesNodes(sidePoints, req.nodeId, node.id))
              return `<path ${attrs} d="${roundedPolyline(sidePoints, 8)}"/>`;
          }
          const middleTrunkVigorNodes = new Set([
            "regen_stamina",
            "regen_energy",
            "stat_attack",
            "stat_mentalFortitude",
            "stat_defense",
            "stat_speed",
          ]);
          if (
            req.nodeId === "regen_health" &&
            node.branch === "vigor" &&
            middleTrunkVigorNodes.has(node.id)
          ) {
            const sideY = b.y + height / 2;
            const sideX = endX < startX ? b.x + width : b.x;
            const fanoutPoints = [
              { x: startX, y: startY },
              { x: startX, y: sideY },
              { x: sideX, y: sideY },
            ];
            if (!routeCrossesNodes(fanoutPoints, req.nodeId, node.id))
              return `<path ${attrs} d="${roundedPolyline(fanoutPoints, 12)}"/>`;
          }
          const tribulationSplitNodes = new Set([
            "enduring_vitality",
            "endless_breath",
            "tireless_sinew",
          ]);
          if (
            req.nodeId === "tribulation_memory" &&
            node.branch === "qi" &&
            tribulationSplitNodes.has(node.id)
          ) {
            const moralPos = positions.get("moral_anchor");
            const tirelessPos = positions.get("tireless_sinew");
            const trunkX = tirelessPos ? tirelessPos.x + width / 2 : endX;
            const trunkY = moralPos ? moralPos.y + height + 8 : startY + 36;
            const splitY = Math.max(trunkY, endY - 10);
            const splitPoints = [
              { x: startX, y: startY },
              { x: startX, y: trunkY },
              { x: trunkX, y: trunkY },
              { x: trunkX, y: splitY },
              { x: endX, y: splitY },
              { x: endX, y: endY },
            ];
            if (!routeCrossesNodes(splitPoints, req.nodeId, node.id))
              return `<path ${attrs} d="${roundedPolyline(splitPoints, 11)}"/>`;
          }
          if (
            Math.abs(startX - endX) < 1 &&
            !hasVerticalCollision(startX, startY, endY, req.nodeId, node.id)
          )
            return `<path ${attrs} d="M ${startX} ${startY} C ${startX} ${startY + 26} ${endX} ${endY - 26} ${endX} ${endY}"/>`;
          const midY = Math.round(startY + (endY - startY) * 0.45);
          const defaultCrossesNode =
            hasVerticalCollision(startX, startY, midY, req.nodeId, node.id) ||
            hasHorizontalCollision(midY, startX, endX, req.nodeId, node.id) ||
            hasVerticalCollision(endX, midY, endY, req.nodeId, node.id);
          if (!defaultCrossesNode && Math.abs(childRow - parentRow) <= 1)
            return `<path ${attrs} d="${roundedPolyline(
              [
                { x: startX, y: startY },
                { x: startX, y: midY },
                { x: endX, y: midY },
                { x: endX, y: endY },
              ],
              12,
            )}"/>`;
          if (req.nodeId === "qi_gen_rate" && node.id === "qi_gen_eternal") {
            const overlapNodeId = "deep_reservoir";
            const overlapPos = positions.get(overlapNodeId);
            const overlapX = overlapPos ? overlapPos.x + width / 2 : endX;
            const overlapTopY = overlapPos ? overlapPos.y : endY;
            const overlapBottomY = overlapPos ? overlapPos.y + height : endY;
            const overlapY = Math.round(
              startY + (overlapTopY - startY) * 0.45,
            );
            const splitX = Math.round((startX + overlapX) / 2);
            const mergeY = Math.round((overlapBottomY + endY) / 2);
            const overlapPoints = [
              { x: startX, y: startY },
              { x: startX, y: overlapY },
              { x: splitX, y: overlapY },
              { x: splitX, y: mergeY },
              { x: overlapX, y: mergeY },
            ];
            if (!routeCrossesNodes(overlapPoints, req.nodeId, node.id))
              return `<path ${attrs} d="${roundedPolyline(overlapPoints, 12)}"/>`;
          }
          if (sharedTrunkParents.has(req.nodeId) && childRow - parentRow >= 2) {
            const yStartLane = Math.min(endY - 12, startY + 10);
            const trunkY = Math.max(yStartLane + 10, endY - 18);
            const sharedCandidates = [];
            const branchInner = branchInnerLanes.get(node.branch ?? "main") ?? [];
            for (const laneX of branchInner)
              sharedCandidates.push({
                x: laneX,
                score: Math.abs(((startX + endX) / 2) - laneX),
              });
            sharedCandidates.push({
              x: startX,
              score: Math.abs(startX - endX) + 30,
            });
            sharedCandidates.sort((a, b) => a.score - b.score);
            for (const candidate of sharedCandidates) {
              const mergedPoints = [
                { x: startX, y: startY },
                { x: startX, y: yStartLane },
                { x: candidate.x, y: yStartLane },
                { x: candidate.x, y: trunkY },
                { x: candidate.x, y: endY - 10 },
                { x: endX, y: endY - 10 },
                { x: endX, y: endY },
              ];
              if (!routeCrossesNodes(mergedPoints, req.nodeId, node.id))
                return `<path ${attrs} d="${roundedPolyline(mergedPoints, 12)}"/>`;
            }
          }
          const branch = node.branch ?? "main";
          const span = branchSpan.get(branch);
          const yStartLane = Math.min(endY - 10, startY + 10);
          const yEndLane = Math.max(startY + 10, endY - 10);
          const innerLanes = branchInnerLanes.get(branch) ?? [];
          const candidateInner = innerLanes
            .map((laneX, index) => {
              const key = `${branch}:inner:${index}`;
              const use = laneUse.get(key) ?? 0;
              const shiftedX = laneX + staggerOffset(use);
              return {
                key,
                x: shiftedX,
                cost:
                  Math.abs(startX - shiftedX) +
                  Math.abs(endX - shiftedX) +
                  Math.abs(((startX + endX) / 2) - shiftedX) * 0.2 +
                  use * 3,
              };
            })
            .sort((a, b) => a.cost - b.cost);
          for (const candidate of candidateInner) {
            const points = [
              { x: startX, y: startY },
              { x: startX, y: yStartLane },
              { x: candidate.x, y: yStartLane },
              { x: candidate.x, y: yEndLane },
              { x: endX, y: yEndLane },
              { x: endX, y: endY },
            ];
            if (!routeCrossesNodes(points, req.nodeId, node.id)) {
              laneUse.set(candidate.key, (laneUse.get(candidate.key) ?? 0) + 1);
              return `<path ${attrs} d="${roundedPolyline(points, 11)}"/>`;
            }
          }
          const leftKey = `${branch}:left`;
          const rightKey = `${branch}:right`;
          const leftUse = laneUse.get(leftKey) ?? 0;
          const rightUse = laneUse.get(rightKey) ?? 0;
          const leftX = span.left - 18 - leftUse * 8;
          const rightX = span.right + 18 + rightUse * 8;
          const branchCenter = (span.left + span.right) / 2;
          const insideSide = branchCenter < globalCenterX ? "right" : "left";
          const options =
            insideSide === "right"
              ? [
                  { key: rightKey, x: rightX },
                  { key: leftKey, x: leftX },
                ]
              : [
                  { key: leftKey, x: leftX },
                  { key: rightKey, x: rightX },
                ];
          for (const option of options) {
            const points = [
              { x: startX, y: startY },
              { x: startX, y: yStartLane },
              { x: option.x, y: yStartLane },
              { x: option.x, y: yEndLane },
              { x: endX, y: yEndLane },
              { x: endX, y: endY },
            ];
            if (!routeCrossesNodes(points, req.nodeId, node.id)) {
              laneUse.set(option.key, (laneUse.get(option.key) ?? 0) + 1);
              return `<path ${attrs} d="${roundedPolyline(points, 11)}"/>`;
            }
          }
          const fallbackPoints = [
            { x: startX, y: startY },
            { x: startX, y: yStartLane },
            { x: options[0].x, y: yStartLane },
            { x: options[0].x, y: yEndLane },
            { x: endX, y: yEndLane },
            { x: endX, y: endY },
          ];
          laneUse.set(options[0].key, (laneUse.get(options[0].key) ?? 0) + 1);
          return `<path ${attrs} d="${roundedPolyline(fallbackPoints, 11)}"/>`;
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
    const activeRanks = getActiveRanks();
    const ranks = getEffectiveRanks();
    const contextRanks = getContextRanks();
    const node = nodes.get(selected);
    const rank = ranks[selected] ?? 0;
    const activeRank = activeRanks[selected] ?? 0;
    const updateAndValidate = (nextActiveRank) => {
      const nextActive = { ...activeRanks };
      if (nextActiveRank <= 0) delete nextActive[selected];
      else nextActive[selected] = nextActiveRank;
      if (planningPhase === "primary") validatePhases(nextActive, secondaryRanks);
      else validatePhases(primaryRanks, nextActive);
      setActiveRanks(nextActive);
    };
    if (
      action.dataset.soulAction === "add" &&
      !missingPrerequisites(node, contextRanks, nodes).length &&
      (!node.maxRanks || rank < node.maxRanks)
    ) {
      updateAndValidate(activeRank + 1);
    } else if (
      action.dataset.soulAction === "remove" &&
      activeRank > 0
    ) {
      const canRemoveCurrent =
        planningPhase === "primary"
          ? canRemoveRank(node, primaryRanks, nodes) &&
            canRemoveRank(node, ranks, nodes)
          : canRemoveRank(node, ranks, nodes);
      if (!canRemoveCurrent) return;
      updateAndValidate(activeRank - 1);
    } else return;
    save();
    renderDetails();
    const sameAction = $("soul-detail").querySelector(
      `[data-soul-action="${action.dataset.soulAction}"]:not(:disabled)`,
    );
    const selectedNodeButton = $("soul-stage").querySelector(
      `[data-soul-node="${CSS.escape(selected)}"]`,
    );
    const focusTarget = sameAction ?? selectedNodeButton;
    focusTarget?.focus({ preventScroll: true });
  });
  $("soul-phase-toggle").addEventListener("click", () => {
    planningPhase = planningPhase === "primary" ? "secondary" : "primary";
    renderDetails();
    $("soul-status").textContent =
      `${phaseLabel()} is active. New rank changes apply to this phase.`;
  });
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
      (!Object.keys(primaryRanks).length &&
        !Object.keys(secondaryRanks).length) ||
      !confirm(
        "Clear all planned Soul Tree ranks? This does not affect the game.",
      )
    )
      return;
    primaryRanks = {};
    secondaryRanks = {};
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
    "Pick a node to inspect details. First/Current Reincarnation and Next Reincarnation are tracked separately.";
  drawTree();
  new ResizeObserver(() => updateZoom()).observe($("soul-viewport"));
}
