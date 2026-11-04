// Aperçus rapides : node scripts/stills.mjs <Composition> <dossier> <t1,t2,...> (secondes)
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
const [id, out, list] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), publicDir: path.resolve("videos") });
const opts = { serveUrl, browserExecutable: "/opt/pw-browsers/chromium" };
const composition = await selectComposition({ ...opts, id });
for (const t of list.split(",")) {
  await renderStill({ ...opts, composition, frame: Math.round(Number(t) * 30), output: `${out}/${t.padStart(5, "0")}.jpg`, imageFormat: "jpeg", scale: 0.3 });
}
console.log("ok");
