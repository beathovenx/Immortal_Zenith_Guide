import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".md": "text/plain",
  ".webp": "image/webp",
};
const routes = {
  "/vendor/marked.js": ["node_modules", "marked", "lib", "marked.esm.js"],
  "/vendor/purify.js": ["node_modules", "dompurify", "dist", "purify.es.mjs"],
  "/guide/lightning-cultivator.md": ["guide", "lightning-cultivator.md"],
  "/guide/demonic-cultivator.md": ["guide", "demonic-cultivator.md"],
  "/guide/qi-cap.md": ["guide", "qi-cap.md"],
  "/guide/attributes.md": ["guide", "attributes.md"],
  "/guide/reincarnation.md": ["guide", "reincarnation.md"],
  "/guide/worldmap.md": ["guide", "worldmap.md"],
  "/guide/patchnotes.md": ["guide", "patchnotes.md"],
};
export const server = http.createServer(async (req, res) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405, { Allow: "GET, HEAD" }).end("Read-only guide");
    return;
  }
  try {
    const url = new URL(req.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    let file;
    if (routes[pathname]) file = path.join(root, ...routes[pathname]);
    else {
      const base = path.join(root, "app");
      file = path.resolve(
        base,
        "." + (pathname === "/" ? "/index.html" : pathname),
      );
      if (!file.startsWith(base + path.sep)) {
        res.writeHead(403).end("Forbidden");
        return;
      }
    }
    const bytes = await fs.readFile(file);
    res.writeHead(200, {
      "Content-Type": `${types[path.extname(file)] ?? "application/octet-stream"}${[".webp"].includes(path.extname(file)) ? "" : "; charset=utf-8"}`,
      "Cache-Control": "no-cache",
    });
    res.end(req.method === "HEAD" ? undefined : bytes);
  } catch (error) {
    const missing = ["ENOENT", "EISDIR", "ENOTDIR"].includes(error.code);
    if (!missing) console.error("Guide request failed:", error);
    res.writeHead(missing ? 404 : error instanceof URIError ? 400 : 500);
    res.end(missing ? "Not found" : "Unable to serve guide");
  }
});
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const port = Number(process.env.PORT ?? 4173);
  server.on("error", (error) => {
    console.error(error);
    process.exitCode = 1;
  });
  server.listen(port, "127.0.0.1", () =>
    console.log(`Private guide: http://127.0.0.1:${port}`),
  );
}
