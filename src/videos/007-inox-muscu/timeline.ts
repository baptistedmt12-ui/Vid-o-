// Découpage de la vidéo 007 — « Que devient Inox en Muscu » (rush 16:9, 25 i/s, 1 h 13)
// Les plans sont extraits SANS PERTE de l'original dans rushes/original/segments/ (ignoré par Git).
// Tout est calé sur la musique : 125 BPM → 1 temps = 12 images à 25 i/s.
export const FPS = 25;
export const BEAT = 12;
export const DIR = "007-inox-muscu";

export type Transition = "none" | "flash" | "zoom" | "whip" | "glitch";

type RawSegment = {
  id: string;
  /** position dans l'original (secondes), pour mémoire */
  src: number;
  /** durée à l'écran, en temps musicaux */
  beats: number;
  rate: number;
  transition: Transition;
  /** décalage horizontal de l'image (px) pour garder le sujet dans le cadre */
  shiftX?: number;
};

const RAW: RawSegment[] = [
  { id: "s01", src: 4326.6, beats: 6, rate: 0.8, transition: "none" }, // accroche : physiques au vestiaire
  { id: "s02", src: 245.0, beats: 8, rate: 1, transition: "flash" }, // développé couché (gros plan)
  { id: "s03", src: 616.0, beats: 8, rate: 1, transition: "whip" }, // développé couché (côté)
  { id: "s04", src: 1777.0, beats: 6, rate: 1, transition: "zoom" }, // Inox sous la barre
  { id: "s05", src: 1447.0, beats: 12, rate: 1, transition: "glitch" }, // Inox force, parade
  { id: "s06", src: 1456.0, beats: 6, rate: 1, transition: "whip" }, // réaction
  { id: "s07", src: 1585.0, beats: 8, rate: 1, transition: "flash" }, // développé couché (visage)
  { id: "s08", src: 3677.5, beats: 10, rate: 1, transition: "zoom" }, // Inox développé épaules
  { id: "s09", src: 2961.5, beats: 6, rate: 1, transition: "whip" }, // développé épaules (large)
  { id: "s10", src: 3969.0, beats: 12, rate: 1, transition: "flash" }, // élévations latérales
  { id: "s11", src: 4156.0, beats: 6, rate: 1, transition: "glitch", shiftX: 120 }, // poulie
  { id: "s12", src: 4266.0, beats: 12, rate: 1.4, transition: "whip" }, // duel de pompes
  { id: "s13", src: 4315.5, beats: 6, rate: 1, transition: "flash" }, // arrivée au vestiaire
  { id: "s14", src: 4322.0, beats: 10, rate: 1, transition: "zoom" }, // physiques
  { id: "s15", src: 4334.5, beats: 8, rate: 1, transition: "whip" },
  { id: "s16", src: 4349.0, beats: 8, rate: 1, transition: "flash" },
  { id: "s17", src: 4355.0, beats: 6, rate: 1, transition: "zoom" }, // fin → boucle sur l'accroche
];

export type Segment = RawSegment & { start: number; duration: number; file: string };

export const SEGMENTS: Segment[] = (() => {
  let start = 0;
  return RAW.map((s) => {
    const duration = s.beats * BEAT;
    const seg = { ...s, start, duration, file: `${DIR}/rushes/original/segments/${s.id}.mp4` };
    start += duration;
    return seg;
  });
})();

export const TOTAL_FRAMES = SEGMENTS.reduce((acc, s) => acc + s.duration, 0);

/** Convertit un numéro de temps musical en image */
export const b = (beat: number) => beat * BEAT;

// Repères musicaux (en temps)
export const DROP1 = 6;
export const BREAK = 96;
export const DROP2 = 100;

/** Titre d'exercice affiché en haut, par plage de temps */
export const CHAPTERS: { from: number; to: number; num: string; label: string }[] = [
  { from: 6, to: 54, num: "01", label: "DÉVELOPPÉ COUCHÉ" },
  { from: 54, to: 70, num: "02", label: "DÉVELOPPÉ ÉPAULES" },
  { from: 70, to: 82, num: "03", label: "ÉLÉVATIONS LATÉRALES" },
  { from: 82, to: 88, num: "04", label: "POULIE" },
  { from: 88, to: 96, num: "05", label: "DUEL DE POMPES" },
];

/** Petites phrases sous l'image (pas de texte sur les actions elles-mêmes) */
export const PUNCHES: { from: number; to: number; text: string; accent?: string }[] = [
  { from: 8, to: 14, text: "ÇA COMMENCE", accent: "FORT" },
  { from: 22, to: 28, text: "AU TOUR", accent: "D'INOX" },
  { from: 55, to: 64, text: "INOX AUX", accent: "ÉPAULES" },
  { from: 89, to: 96, text: "QUI LÂCHE EN", accent: "PREMIER ?" },
  { from: 107, to: 116, text: "REGARDE CES", accent: "ABDOS" },
  { from: 125, to: 132, text: "SECS TOUS LES", accent: "DEUX" },
];
