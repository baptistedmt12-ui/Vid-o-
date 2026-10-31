// Découpage de la vidéo 001 (rush : videos/001-video-001/rushes/source.mp4)
export const FPS = 30;
export const SOURCE = "001-video-001/rushes/source.mp4";

export type Transition = "none" | "flash" | "zoom" | "whip";

type RawSegment = {
  id: string;
  /** début / fin dans le rush, en secondes */
  from: number;
  to: number;
  /** vitesse de lecture (< 1 = ralenti) */
  rate: number;
  /** niveau affiché (1 à 5) */
  level?: number;
  transition: Transition;
};

const RAW: RawSegment[] = [
  { id: "hook", from: 0, to: 2.6, rate: 0.45, transition: "none" },
  { id: "tractions", from: 2.8, to: 16.5, rate: 1, level: 1, transition: "flash" },
  { id: "muscleup-essais", from: 26.1, to: 37.5, rate: 1, level: 2, transition: "whip" },
  { id: "muscleup-reussi", from: 37.6, to: 42.7, rate: 1, level: 2, transition: "zoom" },
  { id: "frontlever", from: 42.8, to: 47.0, rate: 0.6, level: 3, transition: "whip" },
  { id: "planche", from: 21.9, to: 26.0, rate: 0.8, level: 4, transition: "flash" },
  { id: "handstand", from: 47.1, to: 57.5, rate: 1, level: 5, transition: "zoom" },
  { id: "outro", from: 57.5, to: 61.9, rate: 0.6, transition: "flash" },
];

export type Segment = RawSegment & { start: number; duration: number };

export const SEGMENTS: Segment[] = (() => {
  let start = 0;
  return RAW.map((s) => {
    const duration = Math.round(((s.to - s.from) * FPS) / s.rate);
    const seg = { ...s, start, duration };
    start += duration;
    return seg;
  });
})();

export const TOTAL_FRAMES = SEGMENTS.reduce((acc, s) => acc + s.duration, 0);

export const LEVELS = ["TRACTIONS", "MUSCLE-UP", "FRONT LEVER", "PLANCHE", "HANDSTAND"];

/** Plage (début, durée) couverte par chaque niveau, tous segments confondus */
export const LEVEL_SPANS = LEVELS.map((_, i) => {
  const segs = SEGMENTS.filter((s) => s.level === i + 1);
  const start = segs[0].start;
  const end = segs[segs.length - 1].start + segs[segs.length - 1].duration;
  return { level: i + 1, start, duration: end - start };
});

export const segmentById = (id: string) => SEGMENTS.find((s) => s.id === id)!;
