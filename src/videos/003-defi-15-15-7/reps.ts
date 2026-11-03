// Vidéo 003 — défi annoncé 15 muscle-ups / 15 dips / 15 tractions (réalisé : 15 / 15 / 7).
// Le compteur affiche toujours l'objectif annoncé (/15) pour garder le suspense jusqu'au bilan.
// Instants de chaque répétition (en secondes dans le rush original IMG_6027.mov),
// repérés par analyse d'image puis vérifiés visuellement.
export const FPS = 30;
export const SOURCE = "003-defi-15-15-7/rushes/original/IMG_6027.mov";

/** Fin utile du rush (il lâche la barre juste après) */
export const VIDEO_END = 116.2;
/** Durée de l'écran récap final (image figée) */
export const RECAP_SECONDS = 4;

export type Exercise = {
  id: string;
  name: string;
  target: number;
  /** début de la partie (s) */
  start: number;
  reps: number[];
};

export const EXERCISES: Exercise[] = [
  {
    id: "muscleups",
    name: "MUSCLE-UPS",
    target: 15,
    start: 0,
    reps: [2.0, 4.93, 7.8, 10.73, 13.6, 16.57, 19.47, 22.4, 25.33, 28.27, 31.27, 34.67, 38.7, 42.73, 46.97],
  },
  {
    id: "dips",
    name: "DIPS",
    target: 15,
    start: 48.6,
    reps: [51.73, 52.53, 53.37, 54.17, 55.0, 55.87, 56.77, 57.63, 58.57, 59.57, 62.4, 63.27, 64.17, 65.27, 67.37],
  },
  {
    id: "tractions",
    name: "TRACTIONS",
    target: 15, // objectif annoncé ; seulement 7 réalisées, révélé au bilan
    start: 68.9,
    reps: [72.0, 73.6, 75.5, 79.3, 94.3, 96.5, 108.3],
  },
];

/** Petites phrases pendant les moments difficiles des tractions */
export const CAPTIONS = [
  { from: 83.5, to: 90.5, text: "ÇA SE COMPLIQUE…" },
  { from: 100.5, to: 107.5, text: "ALLEZ, ENCORE UNE !" },
];

export const toFrame = (s: number) => Math.round(s * FPS);
export const VIDEO_FRAMES = toFrame(VIDEO_END);
export const TOTAL_FRAMES = VIDEO_FRAMES + RECAP_SECONDS * FPS;
