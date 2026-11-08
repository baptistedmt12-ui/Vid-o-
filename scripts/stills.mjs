// Aperçus rapides : node scripts/stills.mjs <Composition> <dossier> <t1,t2,...> (secondes)
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";
const [id, out, list] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), publicDir: path.resolve(process.env.PUBLIC_DIR ?? "videos") });
const opts = { serveUrl, browserExecutable: "/opt/pw-browsers/chromium" };
const composition = await selectComposition({ ...opts, id });
for (const t of list.split(",")) {
  await renderStill({ ...opts, composition, frame: Math.round(Number(t) * 30), output: `${out}/${t.padStart(5, "0")}.jpg`, imageFormat: "jpeg", scale: 0.3 });
}
// supprime le bundle temporaire (il contient une copie du dossier public)
fs.rmSync(serveUrl, { recursive: true, force: true });
console.log("ok");
