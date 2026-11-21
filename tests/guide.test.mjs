import { test, after, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { server } from "../tools/serve-guide.mjs";
import { calculateQi, filterEntries, stages } from "../app/model.mjs";
import {
  branchPoints,
  canRemoveRank,
  fitTreeScale,
  missingPrerequisites,
  nextCost,
  planCost,
  requiredBranchPoints,
  validatePlan,
  validateTree,
} from "../app/soul-tree-model.mjs";

let base;
before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));
test("Qi cap examples and invalid inputs", () => {
  assert.deepEqual(
    calculateQi({ base: 10000, bonus: 50, rate: 100, current: 0 }),
    { pool: 15000, seconds: 150, timeRatio: 1.5 },
  );
  assert.equal(
    calculateQi({ base: 10000, bonus: 100, rate: 100, current: 25000 }).seconds,
    0,
  );
  assert.equal(
    calculateQi({ base: 100, bonus: -20, rate: 10, current: 0 }).pool,
    80,
  );
  for (const patch of [
    { rate: 0 },
    { bonus: -100 },
    { base: -1 },
    { current: -1 },
    { bonus: NaN },
  ]) {
    assert.throws(
      () => calculateQi({ base: 100, bonus: 0, rate: 1, current: 0, ...patch }),
      RangeError,
    );
  }
});
test("Filters combine search, category and build without mixing paths", () => {
  const entries = [
    {
      name: "Thunderheart",
      collection: "physiques",
      rank: "B",
      build: "lightning",
    },
    {
      name: "Thunder Viper",
      collection: "bloodlines",
      rank: "C",
      build: "lightning",
    },
    { name: "Moonlit Fox", collection: "bloodlines", rank: "C", build: "yin" },
  ];
  assert.equal(filterEntries(entries, " THUNDER ", "all").length, 2);
  assert.equal(filterEntries(entries, "thunder", "physiques").length, 1);
  assert.equal(filterEntries(entries, "missing", "all").length, 0);
  assert.equal(filterEntries(entries, "", "all", "yin").length, 1);
  assert.equal(filterEntries(entries, "thunder", "all", "yin").length, 0);
  assert.equal(filterEntries(entries, "fox", "physiques", "yin").length, 0);
});
test("Stage references resolve to the public snapshot and all artwork is local", async () => {
  const data = JSON.parse(
    await fs.readFile(new URL("../app/data.json", import.meta.url)),
  );
  assert.equal(stages.length, 13);
  for (const stage of stages)
    if (stage.id) assert(data.entries.some((entry) => entry.id === stage.id));
  for (const entry of data.entries) assert(data.images[entry.image]);
  const { entries: officialTechniques } = JSON.parse(
    await fs.readFile(
      new URL("../research/wiki/techniques.json", import.meta.url),
    ),
  );
  for (const entry of data.entries) {
    assert(["lightning", "yin"].includes(entry.build));
    for (const milestone of entry.milestones ?? entry.comprehension ?? []) {
      if (!milestone.grantsBattleTechnique) continue;
      const art = data.techniques[milestone.grantsBattleTechnique];
      assert(art, milestone.grantsBattleTechnique);
      assert.deepEqual(
        art,
        officialTechniques.find((item) => item.id === art.id),
      );
    }
  }
  for (const image of Object.values(data.images)) {
    const response = await fetch(base + image.src);
    assert.equal(response.status, 200, image.src);
    assert.match(response.headers.get("content-type"), /image\/webp/);
    assert.equal(
      Buffer.from(await response.arrayBuffer()).toString("ascii", 8, 12),
      "WEBP",
    );
  }
});
test("Demonic guide claims match yin unlocks, name traps and absorption gates", async () => {
  const data = JSON.parse(
    await fs.readFile(new URL("../app/data.json", import.meta.url)),
  );
  const { entries: manuals } = JSON.parse(
    await fs.readFile(
      new URL("../research/wiki/manuals.json", import.meta.url),
    ),
  );
  const { entries: techniques } = JSON.parse(
    await fs.readFile(
      new URL("../research/wiki/techniques.json", import.meta.url),
    ),
  );
  const yinBooks = manuals.filter((manual) =>
    manual.comprehension.some((milestone) => {
      const art = techniques.find(
        (item) => item.id === milestone.grantsBattleTechnique,
      );
      return art && (art.element === "yin" || art.elements?.includes("yin"));
    }),
  );
  assert.equal(Math.min(...yinBooks.map((book) => book.realmTier)), 4);
  for (const id of ["abyssal_yin_scripture", "frozen_yin_codex"]) {
    const book = data.entries.find((entry) => entry.id === id);
    const first = book.comprehension.find(
      (milestone) => milestone.grantsBattleTechnique,
    );
    assert.equal(data.techniques[first.grantsBattleTechnique].element, "water");
  }
  for (const [id, realm] of [
    ["eclipsed_soul_physique", 8],
    ["abyssal_heart_physique", 11],
    ["blood_moon_sovereign_bloodline", 11],
  ]) {
    const entry = data.entries.find((item) => item.id === id);
    assert.equal(
      entry.milestones.find((item) => item.absorbElement === "yin").realm,
      realm,
    );
  }
  const fox = data.techniques.bt_bl_moonlit_fox_bloodline_1;
  const weasel = data.techniques.bt_bl_shadow_weasel_1;
  assert.equal(fox.baseAmount + fox.scaleFactor * 100, 133);
  assert.equal(weasel.baseAmount + weasel.scaleFactor * 100, 92);
  const response = await fetch(base + "/guide/demonic-cultivator.md");
  assert.equal(response.status, 200);
  const guide = await response.text();
  for (const heading of [
    "Creation and the first playable foundation",
    "Bloodline route",
    "Physique route",
    "Realm-by-realm progression",
    "Battle arts and quantitative priorities",
    "Acquiring the build without inventing a farm",
    "If you also want an actual demonic sect",
  ])
    assert(guide.includes(heading), heading);
  assert.match(
    guide,
    /No exact vendor, recipe, quest reward or live market listing/,
  );
  assert.match(guide, /133/);
  assert.match(guide, /92/);
});
test("Attribute reference covers every displayed stat and key evidence limits", async () => {
  const response = await fetch(base + "/guide/attributes.md");
  assert.equal(response.status, 200);
  const guide = await response.text();
  const keys = [
    "health",
    "energy",
    "qiPoolCap",
    "attack",
    "defense",
    "damageReduction",
    "mentalFortitude",
    "speed",
    "stamina",
    "fortune",
    "critChance",
    "critDamage",
    "healthRegen",
    "energyRegen",
    "staminaRegen",
  ];
  for (const key of keys) assert(guide.includes(`\`${key}\``), key);
  for (const phrase of [
    "Qi Generation Rate",
    "Comprehension",
    "Elemental Attack",
    "Elemental Resistance",
    "ABSORB",
    "REFLECT",
    "Composite elements",
    "vsType",
    "fromType",
    "Origin",
    "Dao Power",
    "Age / lifespan",
    "Morality",
    "out of combat",
    "both during and between fights",
    "no exact probability curve",
    "not a complete server damage formula",
  ])
    assert(guide.includes(phrase), phrase);
  const index = await (await fetch(base + "/")).text();
  assert.match(index, /href="#attributes"/);
  assert.match(index, /id="attributes-guide"/);
  assert.match(index, /id="attributes-notes"/);
});
test("Reincarnation guide is available through the dedicated page and field notes", async () => {
  const response = await fetch(base + "/guide/reincarnation.md");
  assert.equal(response.status, 200);
  const guide = await response.text();
  for (const phrase of [
    "Nascent Soul",
    "Tireless Fist",
    "Flowing Meridians",
    "Soul Wandering",
    "555 DSP",
    "reward preview",
  ])
    assert(guide.includes(phrase), phrase);
  const index = await (await fetch(base + "/")).text();
  assert.match(index, /href="#reincarnation"/);
  assert.match(index, /id="reincarnation-guide"/);
  assert.match(index, /id="reincarnation-notes"/);
});
test("World map guide is available with dedicated navigation", async () => {
  const response = await fetch(base + "/guide/worldmap.md");
  assert.equal(response.status, 200);
  const guide = await response.text();
  for (const phrase of [
    "World map tier reference",
    "Jadebrook Village",
    "World's End Market",
    "assets/worldmap-tier-reference.webp",
  ])
    assert(guide.includes(phrase), phrase);
  const index = await (await fetch(base + "/")).text();
  assert.match(index, /href="#worldmap"/);
  assert.match(index, /id="worldmap-guide"/);
});
test("Patch notes highlights are available with dedicated navigation", async () => {
  const response = await fetch(base + "/guide/patchnotes.md");
  assert.equal(response.status, 200);
  const guide = await response.text();
  for (const phrase of [
    "Patch notes highlights (1.33.x)",
    "Soul Tree rebuild + full refund",
    "Rebirth reward model changed",
    "Core break became a major penalty",
  ])
    assert(guide.includes(phrase), phrase);
  const index = await (await fetch(base + "/")).text();
  assert.match(index, /href="#patchnotes"/);
  assert.match(index, /id="patchnotes-guide"/);
});
test("Dao points guide is served with dedicated navigation and evidence limits", async () => {
  const response = await fetch(base + "/dao-points.md");
  assert.equal(response.status, 200);
  const guide = await response.text();
  for (const phrase of [
    "realm reached",
    "final Dao Power",
    "without confirming",
    "different from the most points per day",
    "server calculation",
  ])
    assert(guide.includes(phrase), phrase);
  const index = await (await fetch(base + "/")).text();
  assert.match(index, /href="#dao-points"/);
  assert.match(index, /id="dao-points-guide"/);
  assert.match(index, /id="dao-points-notes"/);
});
test("Fast progression budgets match Soul Tree prerequisites and costs", async () => {
  const tree = JSON.parse(
    await fs.readFile(new URL("../app/soul-tree.json", import.meta.url)),
  );
  const nodes = validateTree(tree.entries);
  const wandering = nodes.get("soul_wandering");
  const withNodePrereqs = (plan, nodeId) => {
    const node = nodes.get(nodeId);
    const merged = { ...plan };
    for (const req of node.prereqs ?? []) {
      const reqNode = nodes.get(req.nodeId);
      const required =
        reqNode.maxRanks === 0
          ? req.ranks
          : Math.min(req.ranks, reqNode.maxRanks ?? req.ranks);
      merged[req.nodeId] = Math.max(merged[req.nodeId] ?? 0, required);
    }
    return merged;
  };
  const withWanderingPrereqs = (plan) =>
    withNodePrereqs(plan, "soul_wandering");
  const normalizePlanPrereqs = (plan) => {
    const normalized = { ...plan };
    for (let pass = 0; pass < 20; pass++) {
      let changed = false;
      for (const [id] of Object.entries({ ...normalized })) {
        const node = nodes.get(id);
        for (const req of node.prereqs ?? []) {
          const reqNode = nodes.get(req.nodeId);
          const required =
            reqNode.maxRanks === 0
              ? req.ranks
              : Math.min(req.ranks, reqNode.maxRanks ?? req.ranks);
          if ((normalized[req.nodeId] ?? 0) < required) {
            normalized[req.nodeId] = required;
            changed = true;
          }
        }
        const requiredPoints = requiredBranchPoints(node);
        if (requiredPoints > 0) {
          let deficit = requiredPoints - branchPoints(node, normalized, nodes);
          if (deficit > 0) {
            const candidates = [...nodes.values()]
              .filter(
                (candidate) =>
                  candidate.tree === node.tree &&
                  candidate.branch === node.branch &&
                  candidate.tier < node.tier,
              )
              .sort((a, b) => a.tier - b.tier || a.col - b.col);
            for (const candidate of candidates) {
              if (deficit <= 0) break;
              const current = normalized[candidate.id] ?? 0;
              const max =
                candidate.maxRanks === 0 ? current + deficit : candidate.maxRanks;
              const add = Math.min(deficit, Math.max(0, max - current));
              if (add <= 0) continue;
              normalized[candidate.id] = current + add;
              deficit -= add;
              changed = true;
            }
          }
        }
      }
      if (!changed) break;
    }
    return normalized;
  };
  const plans = [
    { qi_gen_rate: 1, comprehension_rate: 1 },
    { qi_gen_rate: 3, comprehension_rate: 1 },
    withWanderingPrereqs({ soul_wandering: 1 }),
    withWanderingPrereqs({
      qi_gen_rate: 3,
      comprehension_rate: 1,
      soul_wandering: 1,
    }),
    withWanderingPrereqs({
      qi_gen_rate: 5,
      comprehension_rate: 1,
      soul_wandering: 1,
      auto_combat: 1,
    }),
    withNodePrereqs({ start_lifespan: 1 }, "start_lifespan"),
    { qi_gen_rate: 1, start_realm_1: 1, start_realm_2: 1 },
    { comprehension_rate: 1, retain_soul: 1, retain_soul_l10: 1 },
    { auto_combat: 1, beast_lore: 1, bonus_yield_charges: 1 },
  ];
  for (const rawPlan of plans) {
    const plan = normalizePlanPrereqs(rawPlan);
    validatePlan(plan, nodes);
    let manual = 0;
    for (const [id, rank] of Object.entries(plan))
      for (let current = 0; current < rank; current++)
        manual += nextCost(nodes.get(id), current);
    assert.equal(planCost(plan, nodes), manual);
  }
  const response = await fetch(base + "/fast-progress.md");
  assert.equal(response.status, 200);
  const guide = await response.text();
  for (const phrase of [
    "don't assume two cultivation slots stack",
    "do not simply add 25% and 50%",
  ])
    assert(guide.includes(phrase), phrase);
  const index = await (await fetch(base + "/")).text();
  assert.match(index, /href="#fast-progress"/);
  assert.match(index, /id="fast-progress-guide"/);
  assert.match(index, /id="fast-progress-notes"/);
});
test("Soul Tree snapshot resolves prerequisite paths and plans rank costs", async () => {
  const response = await fetch(base + "/soul-tree.json");
  assert.equal(response.status, 200);
  const snapshot = await response.json();
  const nodes = validateTree(snapshot.entries);
  assert.deepEqual(
    new Set(snapshot.entries.map((node) => node.tree)),
    new Set(["cultivation", "combat", "exploration", "crafting"]),
  );
  const wandering = nodes.get("soul_wandering");
  const prereq = wandering.prereqs[0];
  const prereqNode = nodes.get(prereq.nodeId);
  assert.equal(nextCost(prereqNode, 0), prereqNode.baseCost);
  assert.equal(
    nextCost(prereqNode, 4),
    prereqNode.baseCost + (prereqNode.costStep ?? 0) * 4,
  );
  assert.equal(
    missingPrerequisites(
      wandering,
      { [prereq.nodeId]: Math.max(0, prereq.ranks - 1) },
      nodes,
    )[0].ranks,
    prereq.ranks,
  );
  const lifespanGain = nodes.get("lifespan_gain");
  const branchMissing = missingPrerequisites(
    lifespanGain,
    { qi_gen_rate: 1, start_lifespan: 1 },
    nodes,
  );
  assert(
    branchMissing.some((item) => item.kind === "branch_points" && item.ranks === 5),
  );
  const plan = { [prereq.nodeId]: prereq.ranks, soul_wandering: 1 };
  validatePlan(plan, nodes);
  assert.equal(
    planCost(plan, nodes),
    Array.from({ length: prereq.ranks }, (_, rank) =>
      nextCost(prereqNode, rank),
    ).reduce((sum, cost) => sum + cost, 0) +
      nextCost(wandering, 0),
  );
  assert.equal(canRemoveRank(prereqNode, plan, nodes), false);
  assert.equal(canRemoveRank(wandering, plan, nodes), true);
  const eternalSpring = nodes.get("qi_gen_eternal");
  assert.equal(
    missingPrerequisites(
      eternalSpring,
      { qi_gen_rate: 10, deep_reservoir: 5 },
      nodes,
    ).length,
    0,
  );
  assert.throws(() => {
    const invalidPlan = { ...plan, [prereq.nodeId]: prereq.ranks - 1 };
    validatePlan(invalidPlan, nodes);
  });
  assert.throws(() => validatePlan({ auto_combat: 2 }, nodes));
  const art = await fetch(base + wandering.localImage);
  assert.equal(art.status, 200);
  assert.equal(
    Buffer.from(await art.arrayBuffer()).toString("ascii", 8, 12),
    "WEBP",
  );
});
test("Soul Tree scale fits the available width", () => {
  assert.equal(fitTreeScale(600, 1500), 0.4);
  assert.equal(fitTreeScale(2000, 1500), 4 / 3);
  assert.equal(fitTreeScale(600, 1500, 0.5), 0.2);
  assert.throws(() => fitTreeScale(0, 1500), RangeError);
  assert.throws(() => fitTreeScale(600, 1500, 1.6), RangeError);
});
test("Guide serves only intended app routes and local dependencies", async () => {
  for (const route of [
    "/",
    "/app.js",
    "/model.mjs",
    "/soul-tree.mjs",
    "/soul-tree-model.mjs",
    "/soul-tree.json",
    "/theme.css",
    "/data.json",
    "/vendor/marked.js",
    "/vendor/purify.js",
    "/guide/qi-cap.md",
    "/guide/lightning-cultivator.md",
    "/guide/demonic-cultivator.md",
    "/guide/attributes.md",
    "/guide/reincarnation.md",
    "/guide/worldmap.md",
    "/guide/patchnotes.md",
  ]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    assert.match(
      response.headers.get("content-security-policy"),
      /connect-src 'self'/,
    );
  }
  for (const route of [
    "/package.json",
    "/research/wiki/bloodlines.json",
    "/recovered/raw/index.html",
    "/missing",
    "/%2e%2e%5cpackage.json",
  ]) {
    const response = await fetch(base + route);
    assert(
      [403, 404].includes(response.status),
      `${route}: ${response.status}`,
    );
  }
  assert.equal((await fetch(base, { method: "POST" })).status, 405);
});
