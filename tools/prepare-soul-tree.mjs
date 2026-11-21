import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const api = "https://api.immortalzenith.com/api/v1/public/wiki/soultree";
const manifestUrl = "https://immortalzenith.com/assets.json";
const artBase = "https://d27wzk5al56txp.cloudfront.net";

async function getJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.json();
}

const [wiki, manifest] = await Promise.all([
  getJson(api),
  getJson(manifestUrl),
]);
if (!Array.isArray(wiki.entries) || !wiki.entries.length)
  throw new Error("Soul Tree wiki returned no nodes.");
if (manifest.base !== artBase || !manifest.map)
  throw new Error("Unexpected Soul Tree artwork manifest.");

const dir = path.join(root, "app", "assets", "soul-tree");
await fs.mkdir(dir, { recursive: true });
const artwork = new Map();
for (const node of wiki.entries) {
  const key = node.image?.replace(/^\//, "");
  const suffix = manifest.map[key];
  if (
    !/^trees\/[a-z0-9_]+\.png$/.test(key ?? "") ||
    !/^[a-zA-Z0-9._-]+\.webp$/.test(suffix ?? "")
  )
    throw new Error(`Missing or invalid artwork mapping for ${node.id}`);
  const local = `${path.basename(key, ".png")}.${suffix}`;
  if (!artwork.has(local))
    artwork.set(local, key.replace(/\.png$/, "") + "." + suffix);
  node.localImage = `/assets/soul-tree/${local}`;
}

for (const [local, remotePath] of artwork) {
  const target = path.join(dir, local);
  let bytes;
  try {
    bytes = await fs.readFile(target);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    const response = await fetch(`${artBase}/${remotePath}`, {
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok)
      throw new Error(`Artwork HTTP ${response.status}: ${remotePath}`);
    bytes = Buffer.from(await response.arrayBuffer());
  }
  if (
    bytes.toString("ascii", 0, 4) !== "RIFF" ||
    bytes.toString("ascii", 8, 12) !== "WEBP"
  )
    throw new Error(`Expected WebP artwork: ${local}`);
  await fs.writeFile(target, bytes);
}

await fs.writeFile(
  path.join(root, "app", "soul-tree.json"),
  JSON.stringify(
    { fetchedAt: new Date().toISOString(), source: api, entries: wiki.entries },
    null,
    2,
  ) + "\n",
);
console.log(
  `Prepared ${wiki.entries.length} Soul Tree nodes and ${artwork.size} local images.`,
);
