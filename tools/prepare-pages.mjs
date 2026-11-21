import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(root, "app");
const guideDir = path.join(root, "guide");
const vendorDir = path.join(appDir, "vendor");
const appGuideDir = path.join(appDir, "guide");

await fs.mkdir(vendorDir, { recursive: true });
await fs.copyFile(
  path.join(root, "node_modules", "marked", "lib", "marked.esm.js"),
  path.join(vendorDir, "marked.js"),
);
await fs.copyFile(
  path.join(root, "node_modules", "dompurify", "dist", "purify.es.mjs"),
  path.join(vendorDir, "purify.js"),
);

await fs.mkdir(appGuideDir, { recursive: true });
for (const entry of await fs.readdir(appGuideDir))
  if (entry.endsWith(".md")) await fs.unlink(path.join(appGuideDir, entry));
for (const entry of await fs.readdir(guideDir))
  if (entry.endsWith(".md"))
    await fs.copyFile(path.join(guideDir, entry), path.join(appGuideDir, entry));

await fs.writeFile(path.join(appDir, ".nojekyll"), "");

console.log("Prepared app/vendor and app/guide for GitHub Pages.");
