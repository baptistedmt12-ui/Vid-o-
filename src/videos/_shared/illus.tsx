import React from "react";
import { useG } from "./kit";

// Petites scènes vectorielles pour les illustrations au centre (CenterPop), vidéos 016 à 021.
// Chaque scène fait 572×380 et s'anime à partir de la seconde `t` (secondes de la vidéo).

const W = 572;
const H = 380;

export const Sky: React.FC<{ c1?: string; c2?: string }> = ({ c1 = "#8fd0ff", c2 = "#e6f4ff" }) => (
  <>
    <defs>
      <linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={c1} />
        <stop offset="1" stopColor={c2} />
      </linearGradient>
    </defs>
    <rect width={W} height={H} fill="url(#skyg)" />
  </>
);

/** Voiture de profil (berline), couleur au choix. */
export const CarSide: React.FC<{ x?: number; y?: number; s?: number; color?: string; dent?: { x: number; y: number } }> = ({
  x = 0,
  y = 0,
  s = 1,
  color = "#2a2a30",
  dent,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M10 120 L22 84 Q30 66 60 62 L110 40 Q130 32 170 32 L230 34 Q262 38 284 64 L330 72 Q352 78 354 100 L354 120 Z" fill={color} stroke="#0B0B0D" strokeWidth={3} />
    <path d="M118 46 Q132 40 168 40 L196 41 L196 66 L104 68 Z" fill="#9cc7ee" opacity={0.85} />
    <path d="M204 41 L232 42 Q254 46 270 64 L204 66 Z" fill="#9cc7ee" opacity={0.85} />
    <line x1={200} y1={40} x2={200} y2={120} stroke="#0B0B0D" strokeWidth={2} opacity={0.5} />
    <circle cx={80} cy={122} r={24} fill="#111" />
    <circle cx={80} cy={122} r={10} fill="#bbb" />
    <circle cx={286} cy={122} r={24} fill="#111" />
    <circle cx={286} cy={122} r={10} fill="#bbb" />
    {dent && <ellipse cx={dent.x} cy={dent.y} rx={14} ry={9} fill="none" stroke="#E10600" strokeWidth={4} />}
  </g>
);

/** Personnage simple (tête + corps), couleur de vêtement au choix. */
export const Guy: React.FC<{ x: number; y: number; s?: number; shirt?: string; hair?: string; rot?: number; armUp?: number }> = ({
  x,
  y,
  s = 1,
  shirt = "#2b5cab",
  hair = "#3b2a1a",
  rot = 0,
  armUp = 0,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={70} width={11} height={44} rx={5} fill="#333" />
    <rect x={3} y={70} width={11} height={44} rx={5} fill="#333" />
    <path d="M-22 76 Q-24 30 0 26 Q24 30 22 76 Z" fill={shirt} />
    <g transform={`rotate(${-armUp} 20 34)`}>
      <rect x={16} y={32} width={10} height={40} rx={5} fill={shirt} />
    </g>
    <rect x={-26} y={32} width={10} height={40} rx={5} fill={shirt} />
    <circle cx={0} cy={10} r={17} fill="#f0c8a5" />
    <path d="M-17 6 Q-16 -10 0 -10 Q16 -10 17 6 Q8 -2 0 -2 Q-8 -2 -17 6Z" fill={hair} />
  </g>
);

/** Ballon / objet qui tombe : renvoie une position animée. */
export const useFall = (t: number, d = 0.6) => {
  const { lin } = useG();
  return lin(t, t + d);
};

export const SceneFrame: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg }) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", background: bg }}>
    {children}
  </svg>
);
