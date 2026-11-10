// Vidéo 010 — rush TikTok @aliengarage.th (Yamaha TMAX), remonté pour la rétention.
// Pas de voix off : aucun ajout sonore, son d'origine de chaque plan gardé (ASMR).
// Plans à vitesse normale (son naturel). 60 i/s comme le rush.
export const FPS = 60;
export const DIR = "010-aliengarage-1";
export const VIDEO = `${DIR}/rushes/original/rush.mov`;
export const sec = (t: number) => Math.round(t * FPS);

/** mirror = plan retourné horizontalement ; punch = léger zoom d'entrée */
export type Fx = "none" | "mirror" | "punch";
/** t : début dans le montage (s) ; a : début dans le rush (s) ; d : durée (s) ; shot : n° du plan dans le rush */
type Raw = { t: number; a: number; d: number; fx: Fx; note: string; shot: number };
const RAW: Raw[] = [
  { t: 0, a: 148.92, d: 1.16, fx: "punch", note: "rinçage de la mousse (accroche)", shot: 101 },
  { t: 1.16, a: 199.68, d: 0.94, fx: "punch", note: "résultat final (aperçu)", shot: 143 },
  { t: 2.1, a: 0.05, d: 1.0, fx: "none", note: "au départ : roue sale", shot: 0 },
  { t: 3.1, a: 3.265, d: 1.5, fx: "none", note: "mousse", shot: 2 },
  { t: 4.6, a: 11.9, d: 1.2, fx: "none", note: "pinceau", shot: 6 },
  { t: 5.8, a: 16.12, d: 1.13, fx: "none", note: "roue", shot: 9 },
  { t: 6.93, a: 21.92, d: 1.13, fx: "none", note: "roue", shot: 13 },
  { t: 8.06, a: 29.12, d: 1.1, fx: "none", note: "roue", shot: 19 },
  { t: 9.16, a: 25.55, d: 1.1, fx: "none", note: "roue", shot: 16 },
  { t: 10.26, a: 33.685, d: 1.4, fx: "none", note: "disque", shot: 22 },
  { t: 11.66, a: 40.85, d: 1.2, fx: "none", note: "jante", shot: 27 },
  { t: 12.86, a: 45.05, d: 1.07, fx: "none", note: "jante", shot: 30 },
  { t: 13.93, a: 50.315, d: 1.4, fx: "none", note: "microfibre", shot: 34 },
  { t: 15.33, a: 61.52, d: 0.86, fx: "mirror", note: "plancher", shot: 42 },
  { t: 16.19, a: 63.68, d: 1.14, fx: "none", note: "mousse", shot: 44 },
  { t: 17.33, a: 67.15, d: 1.07, fx: "mirror", note: "mousse", shot: 47 },
  { t: 18.4, a: 73.15, d: 1.07, fx: "none", note: "détails", shot: 50 },
  { t: 19.47, a: 79.935, d: 1.6, fx: "mirror", note: "pulvérisation", shot: 55 },
  { t: 21.07, a: 85.25, d: 1.13, fx: "mirror", note: "brosse", shot: 58 },
  { t: 22.2, a: 91.715, d: 1.2, fx: "none", note: "brosse", shot: 60 },
  { t: 23.4, a: 95.98, d: 1.14, fx: "mirror", note: "détails", shot: 63 },
  { t: 24.54, a: 100.85, d: 1.07, fx: "none", note: "détails", shot: 66 },
  { t: 25.61, a: 104.38, d: 0.87, fx: "punch", note: "jet d'eau (relance)", shot: 69 },
  { t: 26.48, a: 113.83, d: 1.2, fx: "none", note: "repose-pieds", shot: 74 },
  { t: 27.68, a: 123.38, d: 1.17, fx: "none", note: "béquille", shot: 82 },
  { t: 28.85, a: 136.45, d: 1.1, fx: "none", note: "carénage", shot: 92 },
  { t: 29.95, a: 138.2, d: 1.2, fx: "none", note: "carénage", shot: 93 },
  { t: 31.15, a: 141.18, d: 0.87, fx: "none", note: "jet", shot: 95 },
  { t: 32.02, a: 142.6, d: 1.2, fx: "mirror", note: "selle", shot: 96 },
  { t: 33.22, a: 146.75, d: 1.07, fx: "mirror", note: "selle", shot: 99 },
  { t: 34.29, a: 147.92, d: 0.9, fx: "none", note: "rinçage", shot: 100 },
  { t: 35.19, a: 152.38, d: 1.14, fx: "mirror", note: "face avant", shot: 104 },
  { t: 36.33, a: 153.62, d: 1.13, fx: "none", note: "face avant", shot: 105 },
  { t: 37.46, a: 156.08, d: 1.04, fx: "none", note: "carénage", shot: 107 },
  { t: 38.5, a: 157.22, d: 1.13, fx: "mirror", note: "mousse", shot: 108 },
  { t: 39.63, a: 159.65, d: 1.07, fx: "mirror", note: "roue avant", shot: 110 },
  { t: 40.7, a: 163.08, d: 0.87, fx: "punch", note: "mousse sur la bulle", shot: 113 },
  { t: 41.57, a: 165.08, d: 1.07, fx: "mirror", note: "bulle", shot: 115 },
  { t: 42.64, a: 167.28, d: 1.1, fx: "none", note: "bulle", shot: 117 },
  { t: 43.74, a: 175.05, d: 1.1, fx: "mirror", note: "guidon", shot: 123 },
  { t: 44.84, a: 178.65, d: 1.1, fx: "none", note: "guidon", shot: 126 },
  { t: 45.94, a: 181.05, d: 1.1, fx: "none", note: "tableau de bord", shot: 128 },
  { t: 47.04, a: 185.72, d: 1.1, fx: "none", note: "selle", shot: 131 },
  { t: 48.14, a: 188.15, d: 1.1, fx: "mirror", note: "mousse", shot: 133 },
  { t: 49.24, a: 189.35, d: 1.17, fx: "none", note: "flanc", shot: 134 },
  { t: 50.41, a: 191.78, d: 1.07, fx: "mirror", note: "mousse sur la selle", shot: 136 },
  { t: 51.48, a: 195.38, d: 0.87, fx: "none", note: "rinçage", shot: 139 },
  { t: 52.35, a: 196.35, d: 0.9, fx: "mirror", note: "rinçage", shot: 140 },
  { t: 53.25, a: 197.35, d: 0.93, fx: "punch", note: "rinçage final", shot: 141 },
  { t: 54.18, a: 200.42, d: 0.86, fx: "none", note: "séchage", shot: 144 },
  { t: 55.04, a: 202.42, d: 0.9, fx: "none", note: "séchage", shot: 146 },
  { t: 55.94, a: 205.45, d: 0.93, fx: "none", note: "séchage roue", shot: 149 },
  { t: 56.87, a: 203.42, d: 0.9, fx: "none", note: "résultat", shot: 147 },
  { t: 57.77, a: 206.865, d: 2.4, fx: "punch", note: "résultat", shot: 150 },
  { t: 60.17, a: 210.7, d: 3.0, fx: "none", note: "résultat final", shot: 151 },
];

export type Segment = Raw & { id: number; start: number; duration: number; startFrom: number };
export const SEGMENTS: Segment[] = RAW.map((r, id) => {
  const start = sec(r.t);
  const end = id + 1 < RAW.length ? sec(RAW[id + 1].t) : sec(r.t + r.d);
  return { ...r, id, start, duration: end - start, startFrom: sec(r.a) };
});
export const TOTAL_FRAMES = SEGMENTS[SEGMENTS.length - 1].start + SEGMENTS[SEGMENTS.length - 1].duration;
