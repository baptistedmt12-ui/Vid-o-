// Vidéo 002 — « L'étiquette arrachée » (MT-09 à 4 000 €)
// Le rush est monté en continu (la voix off ne doit pas être coupée) :
// tous les temps ci-dessous sont en secondes dans le rush, calés sur la voix.
export const FPS = 30;
export const DURATION_S = 60.2;
export const TOTAL_FRAMES = Math.round(DURATION_S * FPS);

/** Pendant le travail : fichier de travail tiré de l'original (hors Git). */
export const VIDEO = "002-etiquette-arrachee/rushes/original/travail-1080p.mp4";
export const VOICE = "002-etiquette-arrachee/rushes/original/voix.wav";
export const A = (f: string) => `002-etiquette-arrachee/assets/${f}`;

export const sec = (t: number) => Math.round(t * FPS);

/** Coupes présentes dans le rush (détection de plans) + type de transition ajoutée. */
export type Transition = "zoom" | "whip" | "flash";
export const CUTS: { t: number; type: Transition }[] = [
  { t: 2.167, type: "whip" },
  { t: 7.833, type: "zoom" },
  { t: 12.6, type: "flash" },
  { t: 14.9, type: "whip" },
  { t: 21.8, type: "zoom" },
  { t: 28.533, type: "flash" },
  { t: 33.2, type: "whip" },
  { t: 37.133, type: "zoom" },
  { t: 47.2, type: "whip" },
  { t: 52.0, type: "zoom" },
  { t: 56.7, type: "flash" },
];

/** Zooms « punch » sur les mots forts (t = mot dans la voix, s = zoom visé). */
export const PUNCHES: { t: number; s: number; shake?: boolean }[] = [
  { t: 1.58, s: 1.12, shake: true }, // 4000 €
  { t: 4.38, s: 1.18 }, // 4000 €, j'ai compris…
  { t: 8.3, s: 1.12 }, // l'affaire de sa vie
  { t: 11.82, s: 1.1 }, // même pas négocié
  { t: 18.2, s: 1.08 }, // pas de rayures
  { t: 22.22, s: 1.14, shake: true }, // double du prix
  { t: 29.22, s: 1.12 }, // plus le numéro
  { t: 30.68, s: 1.2 }, // limé
  { t: 35.44, s: 1.16, shake: true }, // effacé
  { t: 40.74, s: 1.2, shake: true }, // arrachée
  { t: 44.0, s: 1.1 }, // regarde longtemps
  { t: 48.38, s: 1.16, shake: true }, // supprimé
  { t: 53.8, s: 1.12, shake: true }, // volée
  { t: 55.9, s: 1.2 }, // jamais
  { t: 59.04, s: 1.14, shake: true }, // même pas de reçu
];

/** Bascule d'ambiance : l'histoire devient inquiétante. */
export const DARK_FROM = 24.9;
