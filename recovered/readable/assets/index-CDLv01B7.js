const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/web-DVNxv7Gf.js",
      "assets/index-NLmKZ9vy.js",
      "assets/index-F_pTd4Yj.css",
    ]),
) => i.map((i) => d[i]);
import { r as e, _ as o } from "./index-NLmKZ9vy.js";
const _ = e("Browser", {
  web: () =>
    o(() => import("./web-DVNxv7Gf.js"), __vite__mapDeps([0, 1, 2])).then(
      (r) => new r.BrowserWeb(),
    ),
});
export { _ as Browser };
