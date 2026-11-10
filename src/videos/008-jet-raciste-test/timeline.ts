// Vidéo 008 — TEST de style « nettoyage de jet premium » sur le script « raciste ».
// Rush : reel Instagram d'un autre compte (@udetailers), 720p remis en 1080×1920 (lanczos).
// NE PAS PUBLIER. Sert uniquement à valider le style avant de le refaire avec les rushes de l'utilisateur.
// Pas encore de voix : les temps des étiquettes sont estimés sur le script (≈ 4,3 mots/s)
// et seront recalés au mot près quand la voix off arrivera.
export const FPS = 30;
export const DIR = "008-jet-raciste-test";
export const VIDEO = `${DIR}/rushes/original/reel_1080.mp4`;
export const sec = (t: number) => Math.round(t * FPS);

export type Fx = "none" | "mirror" | "flip" | "whip" | "zoom" | "flash" | "gold";

type Raw = {
  /** début et fin dans le rush (secondes) */
  a: number;
  b: number;
  /** durée à l'écran (secondes) */
  d: number;
  /** effet d'entrée / effet du plan */
  fx?: Fx;
  /** étalonnage : 0 = chaud premium, 1 = froid et tendu */
  cold?: number;
  note: string;
};

const RAW: Raw[] = [
  // ACCROCHE
  { a: 64.1, b: 66.3, d: 2.2, fx: "gold", note: "passerelle au soleil (plan le plus premium)" },
  { a: 61.23, b: 62.8, d: 2.0, fx: "mirror", note: "cabine terminée, miroir" },
  { a: 18.67, b: 21.77, d: 2.1, fx: "whip", note: "nettoyage au sol (accéléré)" },
  { a: 27.53, b: 29.67, d: 2.3, fx: "zoom", note: "il avance dans l'allée" },
  // MISE EN PLACE
  { a: 5.3, b: 6.0, d: 1.0, fx: "flash", note: "arrivée à l'aéroport" },
  { a: 2.03, b: 2.8, d: 0.8, note: "route" },
  { a: 2.8, b: 3.2, d: 0.75, fx: "whip", note: "badge" },
  { a: 8.1, b: 8.9, d: 1.35, note: "matériel" },
  { a: 15.7, b: 16.33, d: 1.2, fx: "flip", note: "voiture sur le tarmac" },
  { a: 7.3, b: 8.1, d: 1.6, note: "matériel au pied du jet" },
  { a: 16.73, b: 17.2, d: 0.9, fx: "whip", note: "main tendue" },
  { a: 16.33, b: 16.73, d: 0.75, note: "main" },
  { a: 6.5, b: 7.3, d: 0.9, note: "main" },
  { a: 67.53, b: 71.3, d: 3.8, fx: "zoom", note: "« Toi, tu restes en bas »" },
  { a: 66.3, b: 67.53, d: 1.6, fx: "flip", note: "la rampe" },
  { a: 30.77, b: 31.47, d: 1.3, note: "essuyer" },
  { a: 31.47, b: 32.0, d: 1.0, note: "essuyer" },
  { a: 9.67, b: 10.37, d: 1.35, fx: "flash", note: "cabine vide — il se tait" },
  { a: 10.37, b: 11.63, d: 1.65, note: "cabine" },
  { a: 21.77, b: 23.43, d: 1.7, fx: "mirror", note: "tout le jet seul" },
  { a: 23.43, b: 25.33, d: 1.9, fx: "whip", note: "au téléphone" },
  { a: 44.53, b: 45.37, d: 1.0, note: "shampouineuse" },
  { a: 45.37, b: 46.13, d: 1.0, note: "shampouineuse" },
  { a: 46.13, b: 46.93, d: 1.0, note: "shampouineuse" },
  { a: 46.93, b: 49.57, d: 2.2, fx: "zoom", note: "« Monsieur Benali, 17h »" },
  { a: 32.0, b: 32.77, d: 1.3, fx: "flip", note: "message de Karim" },
  { a: 32.77, b: 34.23, d: 2.0, note: "message de Karim" },
  // TENSION
  { a: 34.87, b: 38.93, d: 1.8, fx: "mirror", cold: 0.5, note: "il fait pas le lien" },
  { a: 17.2, b: 18.67, d: 2.4, fx: "flash", cold: 1, note: "17h, un deuxième jet" },
  { a: 6.0, b: 6.5, d: 1.0, fx: "whip", cold: 1, note: "il va l'accueillir" },
  { a: 8.9, b: 9.67, d: 1.05, cold: 1, note: "main tendue" },
  { a: 54.97, b: 56.07, d: 2.0, fx: "zoom", cold: 1, note: "un homme âgé" },
  { a: 56.07, b: 57.93, d: 2.8, cold: 1, note: "passe devant lui" },
  { a: 62.8, b: 64.1, d: 2.5, fx: "flash", cold: 1, note: "il le prend dans ses bras" },
  { a: 11.63, b: 13.33, d: 2.0, cold: 1, note: "« Mon fils m'a dit… »" },
  { a: 38.93, b: 42.67, d: 1.8, fx: "whip", cold: 1, note: "" },
  // RÉSOLUTION
  { a: 57.93, b: 61.23, d: 2.5, fx: "zoom", cold: 1, note: "il devient tout blanc" },
  { a: 25.33, b: 26.4, d: 1.5, cold: 0.8, note: "il bafouille" },
  { a: 26.4, b: 27.53, d: 1.6, fx: "flip", cold: 0.6, note: "le bienvenu" },
  { a: 34.23, b: 34.87, d: 1.25, fx: "flash", cold: 0.3, note: "la microfibre" },
  { a: 29.67, b: 30.77, d: 1.8, cold: 0.2, note: "pile là où…" },
  { a: 49.57, b: 52.67, d: 1.6, cold: 0.1, note: "" },
  { a: 42.67, b: 44.53, d: 1.7, fx: "zoom", note: "« Je touche à rien. »" },
  { a: 4.6, b: 5.3, d: 1.2, fx: "whip", note: "ils repartent" },
  { a: 61.23, b: 62.8, d: 2.0, fx: "mirror", note: "le contrat s'envole" },
  // QUESTION
  { a: 71.3, b: 73.8, d: 3.0, fx: "gold", note: "question" },
  { a: 17.2, b: 18.67, d: 2.4, fx: "mirror", note: "question" },
  { a: 64.1, b: 65.4, d: 2.4, fx: "flash", note: "question" },
];

export type Segment = Raw & { id: number; start: number; duration: number; rate: number; startFrom: number };

let cursor = 0;
export const SEGMENTS: Segment[] = RAW.map((r, id) => {
  const start = cursor;
  const duration = sec(r.d);
  cursor += duration;
  return { ...r, id, start, duration, rate: (r.b - r.a) / r.d, startFrom: sec(r.a) };
});
export const TOTAL_FRAMES = cursor;

/** Moments clés (secondes du montage), estimés sur le script — à recaler sur la voix. */
export const BEATS = {
  hookEnd: 8.6,
  arrive: 8.6,
  polo: 10.3,
  attend: 12.4,
  main: 15.4,
  restes: 17.9,
  rampe: 21.7,
  choque: 25.9,
  seul: 28.9,
  telephone: 30.3,
  benali: 35.2,
  message: 37.3,
  lien: 40.6,
  h17: 42.4,
  accueil: 44.8,
  homme: 46.9,
  bras: 51.7,
  fils: 54.8,
  blanc: 58.0,
  microfibre: 63.6,
  silence: 67.6,
  touche: 69.2,
  repartent: 70.4,
  contrat: 71.6,
  question: 73.6,
} as const;
