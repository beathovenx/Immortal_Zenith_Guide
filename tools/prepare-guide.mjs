import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = JSON.parse(
  await fs.readFile(
    path.join(root, "research", "wiki", "manuals.json"),
    "utf8",
  ),
);
const entryHtml = await fs.readFile(
  path.join(root, "recovered", "readable", "index.html"),
  "utf8",
);
const bundleMatch = entryHtml.match(/src="\/assets\/(index-[^"]+\.js)"/);
if (!bundleMatch)
  throw new Error("Cannot find current main index bundle in recovered index.html.");
const bundle = await fs.readFile(
  path.join(root, "recovered", "readable", "assets", bundleMatch[1]),
  "utf8",
);
const rows = [
  [
    "bloodlines",
    [
      "thunder_viper_bloodline",
      "thunder_stag_bloodline",
      "lightning_jackdaw_bloodline",
      "thunder_lotus_bloodline",
      "genesis_thunder_court_bloodline",
      "emperor_of_ten_thousand_thunder_bloodline",
    ],
    "lightning",
  ],
  [
    "physiques",
    [
      "steady_pulse_physique",
      "thunder_vessel_physique",
      "thunderheart",
      "stormbone_physique",
      "heavenly_thunder_physique",
    ],
    "lightning",
  ],
  [
    "manuals",
    [
      "sparkflash_scroll",
      "blazing_yang_codex",
      "five_spirits_sutra",
      "skybreaker_lightning_manual",
      "stormbolt_sutra",
      "lightning_dragon_codex",
      "celestial_thunder_emperor_canon",
      "storm_emperor_sutra",
    ],
    "lightning",
  ],
  [
    "bloodlines",
    [
      "shadow_weasel",
      "moonlit_fox_bloodline",
      "void_moth_bloodline",
      "blood_moon_wolf_bloodline",
      "blood_moon_sovereign_bloodline",
      "netherworld_monarch_bloodline",
    ],
    "yin",
  ],
  [
    "physiques",
    [
      "shadow_veil_physique",
      "twilight_flesh_physique",
      "moonshadow_veins",
      "moon_veil_physique",
      "eclipsed_soul_physique",
      "abyssal_heart_physique",
    ],
    "yin",
  ],
  [
    "manuals",
    [
      "strength_training_basic_manual",
      "astral_core_manual",
      "abyssal_yin_scripture",
      "frozen_yin_codex",
      "moonshadow_sutra",
      "nether_soul_sutra",
      "shadow_moon_sutra",
      "silent_yin_manual",
      "void_soul_codex",
      "dark_moon_sovereign_sutra",
      "eternal_yin_emperor_codex",
      "void_yin_emperor_canon",
    ],
    "yin",
  ],
];
const { entries: techniques } = JSON.parse(
  await fs.readFile(
    path.join(root, "research", "wiki", "techniques.json"),
    "utf8",
  ),
);
const data = { updated: "2026-11-12", entries: [], images: {}, techniques: {} };
for (const [collection, ids, build] of rows) {
  const { entries } =
    collection === "manuals"
      ? assets
      : JSON.parse(
          await fs.readFile(
            path.join(root, "research", "wiki", `${collection}.json`),
            "utf8",
          ),
        );
  for (const id of ids) {
    const entry = entries.find((item) => item.id === id);
    if (!entry) throw new Error(`Missing wiki entry: ${collection}/${id}`);
    data.entries.push({ ...entry, collection, build });
    for (const milestone of entry.milestones ?? entry.comprehension ?? []) {
      if (!milestone.grantsBattleTechnique) continue;
      const art = techniques.find(
        (item) => item.id === milestone.grantsBattleTechnique,
      );
      if (!art)
        throw new Error(
          `Missing technique: ${milestone.grantsBattleTechnique}`,
        );
      data.techniques[art.id] = art;
    }
  }
}
const imagePaths = new Set(data.entries.map((entry) => entry.image));
imagePaths.add("/zones/lightning_scarred_steppe.png");
imagePaths.add("/sect/demonic_sect_background.png");
const dir = path.join(root, "app", "assets");
await fs.mkdir(dir, { recursive: true });
for (const imagePath of imagePaths) {
  const key = imagePath.replace(/^\//, "");
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = bundle.match(new RegExp(`"${escaped}":\\s*"([^"]+)"`));
  if (!match) throw new Error(`No embedded CDN mapping for ${key}`);
  const suffix = match[1];
  if (!/^[a-zA-Z0-9._-]+$/.test(suffix))
    throw new Error(`Invalid image suffix: ${suffix}`);
  const remote = `https://d27wzk5al56txp.cloudfront.net/${key.replace(/\.[^.]+$/, "")}.${suffix}`;
  const local = `${path.basename(key, path.extname(key))}.${suffix}`;
  const target = path.join(dir, local);
  try {
    await fs.access(target);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    const response = await fetch(remote, {
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok)
      throw new Error(`Artwork download ${response.status}: ${remote}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (
      bytes.toString("ascii", 0, 4) !== "RIFF" ||
      bytes.toString("ascii", 8, 12) !== "WEBP"
    ) {
      throw new Error(`Expected WebP artwork: ${remote}`);
    }
    await fs.writeFile(target, bytes);
    console.log(`Saved ${local}`);
  }
  data.images[imagePath] = { src: `/assets/${local}`, source: remote };
}
await fs.copyFile(
  path.join(root, "recovered", "raw", "assets", "site-logo-DInD1iBQ.webp"),
  path.join(dir, "logo.webp"),
);
await fs.writeFile(
  path.join(root, "app", "data.json"),
  JSON.stringify(data, null, 2) + "\n",
);
console.log(
  `Prepared ${data.entries.length} entries and ${imagePaths.size} local game images.`,
);
