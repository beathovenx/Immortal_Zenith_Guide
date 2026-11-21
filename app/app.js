import { marked } from "./vendor/marked.js";
import DOMPurify from "./vendor/purify.js";
import { realms, stages, calculateQi, filterEntries } from "./model.mjs";
import { initSoulTree } from "./soul-tree.mjs";

const $ = (id) => document.getElementById(id);
const escape = (text) =>
  String(text ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const format = (number) =>
  new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(number);
const toAppUrl = (value) => {
  if (!value) return value;
  if (/^https?:\/\//.test(value)) return value;
  const normalized = String(value).replace(/^\/+/, "");
  return new URL(normalized, document.baseURI).toString();
};
let data;
let saved = {};
let noteRequest = 0;
let soulTreePromise;
const labels = {
  bloodlines: "Bloodline",
  physiques: "Physique",
  manuals: "Manual",
};
const tasks = [
  [
    "manual",
    "01",
    "Find your first lightning art",
    "If obtainable, Stormcrown grants an attack at 45 comprehension and absorption at 65. Its exact source is unverified; do not stall progression for it.",
    "#codex",
  ],
  [
    "bloodline",
    "02",
    "Awaken the bloodline",
    "Thunder Viper or Thunder Stag is a useful first step. Skip ranks when practical.",
    "#codex",
  ],
  [
    "physique",
    "03",
    "Build a safer foundation",
    "Keep Steady Pulse until Thunder Vessel or Thunderheart is worth the upgrade.",
    "#codex",
  ],
];
const demonicTasks = [
  [
    "demonic-foundation",
    "01",
    "Build the mortal foundation",
    "Use the granted starter Body manual. At Body Tempering, Soul and Mind unlock; begin a useful available Mind manual.",
    "#codex/yin",
  ],
  [
    "demonic-art",
    "02",
    "Equip a real yin attack",
    "If acquired, Shadow Weasel or Moonlit Fox supplies an early yin art. The first yin-granting manuals in this snapshot are tier 4.",
    "#codex/yin",
  ],
  [
    "demonic-traits",
    "03",
    "Upgrade without losing the build",
    "Pursue affordable higher-rank opportunities. Compare Energy, Mental Fortitude, lost arts and absorption; skip risky equal-rank swaps.",
    "#codex/yin",
  ],
];
function showError(error) {
  console.error(error);
  $("error").hidden = false;
  $("error").textContent =
    error.message ||
    "Unable to load the guide. Check the local server and reload.";
}
function image(entry, className = "") {
  const asset = data.images[entry.image];
  if (!asset) throw new Error(`Missing local artwork: ${entry.image}`);
  return `<img class="${className}" src="${escape(toAppUrl(asset.src))}" alt="" loading="lazy">`;
}
function entryButton(entry, target = false) {
  return `<button type="button" class="${target ? "target-card" : "codex-card"}" data-entry="${escape(entry.id)}">${image(entry)}<div><span class="eyebrow">${escape(labels[entry.collection])} <b class="rank">${escape(entry.rank ?? `T${entry.realmTier}`)}</b></span><h3>${escape(entry.name)}</h3><p>${target ? (entry.collection === "bloodlines" ? "Your long-term offensive lightning lineage." : "Your long-term defensive lightning foundation.") : escape(entry.description)}</p><span class="text-link">View bonuses & milestones <span aria-hidden="true">↗</span></span></div></button>`;
}
function renderTasks(target, list) {
  $(target).innerHTML = list
    .map(
      ([id, index, title, text, href]) =>
        `<div class="task-card ${saved[id] ? "complete" : ""}"><span class="task-number">${index}</span><h3>${title}</h3><p>${text}</p><div class="task-bottom"><a href="${href}">Browse the codex ↗</a><label><input type="checkbox" data-task="${id}" ${saved[id] ? "checked" : ""}> Done</label></div></div>`,
    )
    .join("");
}
function setSaveStatus(text) {
  document.querySelectorAll("[data-save-status]").forEach((element) => {
    element.textContent = text;
  });
}
function statLines(stats) {
  if (!stats || !Object.keys(stats).length) return "";
  return Object.entries(stats)
    .map(([key, value]) => {
      if (typeof value === "object" && value !== null)
        return `<li><strong>${escape(key)}</strong><ul>${statLines(value)}</ul></li>`;
      return `<li><span>${escape(key)}</span><strong>${escape(typeof value === "number" ? format(value) : value)}</strong></li>`;
    })
    .join("");
}
function artDetails(id) {
  const art = data.techniques[id];
  if (!art) throw new Error(`Missing battle art: ${id}`);
  const elements = art.elements ?? [art.element];
  return `<p class="accent">Art: ${escape(art.name)}</p><p>${escape(elements.join(" / "))} · ${escape(art.kind)} · requires ${escape(realms[art.minRealmMajor])}</p><p>Raw base ${format(art.baseAmount)}${art.scaleStat ? ` + ${format(art.scaleFactor)} × ${escape(art.scaleStat)}` : ""} · Energy ${format(art.energyCost)} · Stamina ${format(art.staminaCost)} · Cooldown ${format(art.cooldown)}</p>${art.effects?.length ? `<p>Effects: ${art.effects.map(escape).join(", ")}</p>` : ""}`;
}
function showEntry(id) {
  const entry = data.entries.find((item) => item.id === id);
  if (!entry) throw new Error("This codex entry was not found.");
  const milestones = entry.milestones ?? entry.comprehension ?? [];
  $("detail-body").innerHTML =
    `${image(entry, "detail-art")}<span class="eyebrow">${labels[entry.collection]} / ${escape(entry.rank ?? `Tier ${entry.realmTier}`)}</span><h2 id="detail-title">${escape(entry.name)}</h2><p>${escape(entry.description)}</p>
    ${entry.slot ? `<p class="notice">Slot: ${escape(entry.slot.replace("tech_", ""))}. Manual tier ${entry.realmTier} (${escape(realms[entry.realmTier])}). Arts can have separate realm gates.</p>` : ""}
    <h3>Bonuses & growth</h3><p class="muted">Raw wiki fields: stats are flat, statsPct are percentages. qiPoolCap uses percent units. These are not final character totals.</p>
    <ul class="stat-list">${statLines(entry.bonuses ?? { stats: entry.stats, levelStatsPct: entry.levelStatsPct, levelQiGenMult: entry.levelQiGenMult, growth: entry.growth })}</ul>
    ${entry.drawbacks ? `<h3>Drawbacks</h3><p class="warning">${escape(entry.drawbacks.description)}</p><ul class="stat-list">${statLines(entry.drawbacks.stats)}${statLines(entry.drawbacks.statsPct ? { statsPct: entry.drawbacks.statsPct } : {})}</ul>` : ""}
    ${entry.weaknesses?.length ? `<p class="warning">Elemental weaknesses: ${entry.weaknesses.map(escape).join(", ")}.</p>` : ""}
    <h3>Milestones</h3><ol class="milestones">${milestones.map((milestone) => `<li><b>${entry.collection === "manuals" ? `Comprehension ${milestone.level}` : escape(realms[milestone.realm] ?? `Realm ${milestone.realm}`)}</b><p>${escape(milestone.description)}</p>${milestone.grantsBattleTechnique ? artDetails(milestone.grantsBattleTechnique) : ""}${milestone.absorbElement ? `<p class="accent">Absorb ${escape(milestone.absorbElement)}</p>` : ""}<ul class="stat-list">${statLines(milestone.stats)}${statLines(milestone.statsPct ? { statsPct: milestone.statsPct } : {})}</ul></li>`).join("")}</ol>
    ${entry.dropsFrom ? `<p>Weighted source categories: <strong>${entry.dropsFrom.map(escape).join(", ")}</strong>. Not a guaranteed named drop.</p>` : ""}
    <a class="text-link" href="https://immortalzenith.com/wiki/${entry.collection}/${encodeURIComponent(entry.id)}" target="_blank" rel="noopener noreferrer">Official live wiki ↗</a><p class="muted">Snapshot: ${data.updated}. Trait replacement removes old arts and bonuses.</p>`;
  $("detail").setAttribute("aria-labelledby", "detail-title");
  $("detail").showModal();
  $("close-detail").focus();
}
function renderCodex() {
  const entries = filterEntries(
    data.entries,
    $("search").value,
    $("category").value,
    $("build").value,
  );
  $("results").textContent =
    `${entries.length} ${entries.length === 1 ? "entry" : "entries"} · official snapshot ${data.updated}`;
  $("cards").innerHTML = entries.length
    ? entries.map((entry) => entryButton(entry)).join("")
    : '<p class="empty">No entries match. Try a broader search or another category.</p>';
}
function renderStage() {
  const realm = Number($("realm").value);
  const stage = stages.find((item) => item.realm === realm);
  if (!stage) throw new Error("Unknown progression stage.");
  const entry = data.entries.find((item) => item.id === stage.id);
  $("stage-detail").innerHTML =
    `<div class="stage-focus">${entry ? image(entry) : '<span class="stage-sigil" aria-hidden="true">☯</span>'}<div><span class="eyebrow">${escape(realms[realm])} / MAJOR ${realm}</span><h2>${stage.title}</h2><p>${stage.text}</p><strong class="accent">${escape(stage.manual)}</strong><ul>${stage.goals.map((goal) => `<li>${escape(goal)}</li>`).join("")}</ul>${entry ? `<button class="button" data-entry="${escape(entry.id)}" type="button">Inspect manual ↗</button>` : ""}</div></div>`;
  document.querySelectorAll("[data-realm]").forEach((button) => {
    button.classList.toggle("selected", Number(button.dataset.realm) === realm);
    button.setAttribute(
      "aria-pressed",
      String(Number(button.dataset.realm) === realm),
    );
  });
}
function renderQi() {
  try {
    const values = {};
    for (const id of ["base", "bonus", "rate", "current"]) {
      if ($(id).value.trim() === "")
        throw new RangeError("Fill in all four values.");
      values[id] = Number($(id).value);
    }
    const result = calculateQi(values);
    const duration =
      result.seconds === 0
        ? "Pool full"
        : result.seconds >= 3600
          ? `${format(result.seconds / 3600)} hours`
          : result.seconds >= 60
            ? `${format(result.seconds / 60)} minutes`
            : `${format(result.seconds)} seconds`;
    $("qi-result").innerHTML =
      `<span class="eyebrow">ILLUSTRATIVE POOL MATH</span><div class="result-value">${format(result.pool)} <small>Qi capacity</small></div><div class="result-stat"><span>Time remaining</span><strong>${duration}</strong></div><div class="result-stat"><span>Full-pool time vs. base</span><strong>${format(result.timeRatio)}×</strong></div><p class="muted">At unchanged Qi rate. Excess current Qi does not produce negative time.</p><div class="unknown"><span>Energy / Stamina reward multiplier</span><strong>Not verified</strong></div>`;
  } catch (error) {
    if (!(error instanceof RangeError)) throw error;
    $("qi-result").textContent = error.message;
  }
}
async function renderNotes(topic, target = "notes") {
  const request = ++noteRequest;
  const topics = {
    lightning: "guide/lightning-cultivator.md",
    demonic: "guide/demonic-cultivator.md",
    qi: "guide/qi-cap.md",
    attributes: "guide/attributes.md",
    reincarnation: "guide/reincarnation.md",
    worldmap: "guide/worldmap.md",
    patchnotes: "guide/patchnotes.md",
    "dao-points": "dao-points.md",
    "fast-progress": "fast-progress.md",
  };
  const selected = Object.hasOwn(topics, topic) ? topic : "lightning";
  for (const key of Object.keys(topics)) {
    const button = $(`${key}-notes`);
    if (button) button.setAttribute("aria-pressed", String(selected === key));
  }
  $(target).textContent = "Loading research…";
  const response = await fetch(toAppUrl(topics[selected]));
  if (!response.ok)
    throw new Error(`Research could not load (${response.status}).`);
  const markdown = await response.text();
  if (request !== noteRequest) return;
  $(target).innerHTML = DOMPurify.sanitize(marked.parse(markdown));
  for (const image of $(target).querySelectorAll("img[src]")) {
    const src = image.getAttribute("src");
    if (!src || /^https?:\/\//.test(src)) continue;
    image.src = toAppUrl(src);
  }
  for (const anchor of $(target).querySelectorAll("a[href]")) {
    const href = anchor.getAttribute("href");
    if (href === "qi-cap.md") anchor.href = "#library/qi";
    else if (
      href.startsWith("../recovered/") ||
      href.startsWith("../research/")
    ) {
      const span = document.createElement("span");
      span.className = "source-file";
      span.textContent = `${anchor.textContent} [workspace source: ${href.slice(3)}]`;
      anchor.replaceWith(span);
    } else if (href.startsWith("http")) {
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
  }
}
async function route() {
  const [requested = "overview", topic] = location.hash.slice(1).split("/");
  if (requested === "content") {
    $("content").focus();
    return;
  }
  const section = [
    "overview",
    "progression",
    "codex",
    "qi",
    "library",
    "demonic",
    "attributes",
    "reincarnation",
    "worldmap",
    "patchnotes",
    "soul-tree",
    "dao-points",
    "fast-progress",
  ].includes(requested)
    ? requested
    : "overview";
  for (const id of [
    "overview",
    "progression",
    "codex",
    "qi",
    "library",
    "demonic",
    "attributes",
    "reincarnation",
    "worldmap",
    "patchnotes",
    "soul-tree",
    "dao-points",
    "fast-progress",
  ])
    $(id).hidden = id !== section;
  document.querySelectorAll("nav a").forEach((anchor) => {
    if (anchor.hash === `#${section}`)
      anchor.setAttribute("aria-current", "page");
    else anchor.removeAttribute("aria-current");
  });
  if (section === "library") await renderNotes(topic);
  if (section === "demonic") await renderNotes("demonic", "demonic-guide");
  if (section === "attributes")
    await renderNotes("attributes", "attributes-guide");
  if (section === "reincarnation")
    await renderNotes("reincarnation", "reincarnation-guide");
  if (section === "worldmap") await renderNotes("worldmap", "worldmap-guide");
  if (section === "patchnotes")
    await renderNotes("patchnotes", "patchnotes-guide");
  if (section === "dao-points")
    await renderNotes("dao-points", "dao-points-guide");
  if (section === "fast-progress")
    await renderNotes("fast-progress", "fast-progress-guide");
  if (section === "soul-tree") {
    soulTreePromise ??= initSoulTree().catch((error) => {
      soulTreePromise = undefined;
      throw error;
    });
    await soulTreePromise;
  }
  if (section === "codex" && ["yin", "lightning"].includes(topic)) {
    $("build").value = topic;
    renderCodex();
  }
  $("path-label").textContent =
    section === "demonic" || (section === "library" && topic === "demonic")
      ? "THE DEMONIC / YIN PATH"
      : section === "attributes" ||
          (section === "library" && topic === "attributes")
        ? "THE ATTRIBUTE REFERENCE"
        : section === "fast-progress" ||
            (section === "library" && topic === "fast-progress")
          ? "THE FAST PROGRESSION GUIDE"
          : section === "worldmap" ||
              (section === "library" && topic === "worldmap")
            ? "THE WORLD MAP TIERS"
          : section === "patchnotes" ||
              (section === "library" && topic === "patchnotes")
            ? "PATCH NOTES HIGHLIGHTS"
          : section === "dao-points" ||
              (section === "library" && topic === "dao-points")
            ? "MAXIMIZE DAO SOUL POINTS"
            : section === "reincarnation" ||
                (section === "library" && topic === "reincarnation")
              ? "THE REINCARNATION GUIDE"
              : section === "soul-tree"
                ? "THE SOUL TREE"
                : section === "codex"
                  ? "THE BUILD CODEX"
                  : ["overview", "progression"].includes(section)
                    ? "THE LIGHTNING PATH"
                    : "CULTIVATOR'S FIELD RESEARCH";
  window.scrollTo(0, 0);
}
async function init() {
  const response = await fetch(toAppUrl("data.json"));
  if (!response.ok)
    throw new Error(
      "Guide data is missing. Run npm.cmd run prepare:guide, then reload.",
    );
  data = await response.json();
  try {
    const stored = JSON.parse(
      localStorage.getItem("zenith-guide-tasks") ?? "{}",
    );
    if (!stored || typeof stored !== "object" || Array.isArray(stored))
      throw new Error("Saved checklist has an invalid format.");
    saved = stored;
  } catch (error) {
    setSaveStatus(
      `Checklist storage unavailable: ${error.message}. Changes will remain in this tab only.`,
    );
  }
  renderTasks("tasks", tasks);
  renderTasks("demonic-tasks", demonicTasks);
  $("demonic-targets").innerHTML = [
    "blood_moon_sovereign_bloodline",
    "abyssal_heart_physique",
  ]
    .map((id) => entryButton(data.entries.find((entry) => entry.id === id)))
    .join("");
  $("targets").innerHTML = [
    "genesis_thunder_court_bloodline",
    "heavenly_thunder_physique",
  ]
    .map((id) =>
      entryButton(
        data.entries.find((entry) => entry.id === id),
        true,
      ),
    )
    .join("");
  for (const [section, imagePath] of [
    ["overview", "/zones/lightning_scarred_steppe.png"],
    ["demonic", "/sect/demonic_sect_background.png"],
  ]) {
    const heroImage = document.createElement("img");
    heroImage.className = "hero-art";
    heroImage.src = toAppUrl(data.images[imagePath].src);
    heroImage.alt = "";
    $(section).querySelector(".hero").prepend(heroImage);
  }
  $("realm").innerHTML = stages
    .map(
      (stage) =>
        `<option value="${stage.realm}">${realms[stage.realm]}${stage.realm === 2 ? " · your starting realm" : ""}</option>`,
    )
    .join("");
  $("timeline").innerHTML = stages
    .map(
      (stage) =>
        `<button type="button" class="timeline-step" data-realm="${stage.realm}" aria-pressed="false"><span class="timeline-number">${String(stage.realm).padStart(2, "0")}</span><div><span class="eyebrow">${realms[stage.realm]} ${stage.tag ? ` / ${stage.tag}` : ""}</span><h3>${stage.title}</h3><p>${escape(stage.manual)}</p></div><span aria-hidden="true">↗</span></button>`,
    )
    .join("");
  renderStage();
  renderCodex();
  renderQi();
  document.addEventListener("click", (event) => {
    const entry = event.target.closest("[data-entry]");
    if (entry) {
      try {
        showEntry(entry.dataset.entry);
      } catch (error) {
        showError(error);
      }
    }
    const realm = event.target.closest("[data-realm]");
    if (realm) {
      $("realm").value = realm.dataset.realm;
      renderStage();
      $("stage-detail").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  document.addEventListener("change", (event) => {
    if (!event.target.matches("[data-task]")) return;
    saved[event.target.dataset.task] = event.target.checked;
    try {
      localStorage.setItem("zenith-guide-tasks", JSON.stringify(saved));
      setSaveStatus(
        "Checklist saved in this browser. It does not change your game.",
      );
    } catch (error) {
      setSaveStatus(
        `Could not save checklist: ${error.message}. Change is only kept in this tab.`,
      );
    }
    // Keep focus on the checkbox after toggling.
    event.target
      .closest(".task-card")
      .classList.toggle("complete", event.target.checked);
  });
  $("realm").addEventListener("change", renderStage);
  $("search").addEventListener("input", renderCodex);
  $("category").addEventListener("change", renderCodex);
  $("build").addEventListener("change", renderCodex);
  $("qi-form").addEventListener("input", renderQi);
  $("qi-form").addEventListener("submit", (event) => event.preventDefault());
  $("close-detail").addEventListener("click", () => $("detail").close());
  $("detail").addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      $("detail").close();
    }
  });
  $("detail").addEventListener("click", (event) => {
    if (event.target === $("detail")) {
      const rect = $("detail").getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        $("detail").close();
    }
  });
  $("lightning-notes").addEventListener("click", () => {
    location.hash = "library/lightning";
  });
  $("qi-notes").addEventListener("click", () => {
    location.hash = "library/qi";
  });
  $("demonic-notes").addEventListener("click", () => {
    location.hash = "library/demonic";
  });
  $("attributes-notes").addEventListener("click", () => {
    location.hash = "library/attributes";
  });
  $("reincarnation-notes").addEventListener("click", () => {
    location.hash = "library/reincarnation";
  });
  $("worldmap-notes").addEventListener("click", () => {
    location.hash = "library/worldmap";
  });
  $("patchnotes-notes").addEventListener("click", () => {
    location.hash = "library/patchnotes";
  });
  $("dao-points-notes").addEventListener("click", () => {
    location.hash = "library/dao-points";
  });
  $("fast-progress-notes").addEventListener("click", () => {
    location.hash = "library/fast-progress";
  });
  window.addEventListener("hashchange", () => {
    route().catch(showError);
  });
  document.addEventListener(
    "error",
    (event) => {
      if (event.target instanceof HTMLImageElement) {
        event.target.classList.add("image-failed");
        const failed = event.target.currentSrc || event.target.src || "(unknown)";
        showError(
          new Error(
            `A local game image could not load: ${failed}`,
          ),
        );
      }
    },
    true,
  );
  await route();
}
init().catch(showError);
