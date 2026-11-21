const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/web-0WUeaYZY.js",
      "assets/index-NLmKZ9vy.js",
      "assets/index-F_pTd4Yj.css",
    ]),
) => i.map((i) => d[i]);
import { r, _ as t } from "./index-NLmKZ9vy.js";
const n = r("SplashScreen", {
  web: () =>
    t(() => import("./web-0WUeaYZY.js"), __vite__mapDeps([0, 1, 2])).then(
      (e) => new e.SplashScreenWeb(),
    ),
});
export { n as SplashScreen };
