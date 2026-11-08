import React from "react";
import { useG } from "../_shared/kit";

// Illustrations « plein centre » de la vidéo 015.

/** Réservoir bleu + oiseau qui passe + fiente qui s'écrase au milieu. */
export const BirdDrop: React.FC<{ t: number }> = ({ t }) => {
  const { lin } = useG();
  const fly = lin(t, t + 0.9);
  const drop = lin(t + 0.35, t + 0.75);
  const splat = lin(t + 0.75, t + 0.95);
  return (
    <svg width={572} height={380} viewBox="0 0 572 380" style={{ display: "block" }}>
      <rect width={572} height={380} fill="#dfe7f1" />
      {/* réservoir */}
      <path d="M70 330 Q60 200 170 170 L420 160 Q520 170 512 330 Z" fill="#1f4fd1" />
      <path d="M120 300 Q120 220 200 205 L400 198 Q470 205 470 300 Z" fill="#2f63ea" />
      <ellipse cx={300} cy={176} rx={40} ry={12} fill="#c7ccd6" />
      {/* oiseau */}
      <g transform={`translate(${-60 + 700 * fly} ${70 + 10 * Math.sin(fly * 12)})`}>
        <path d="M0 0 q20 -24 40 0 q20 -24 40 0" fill="none" stroke="#0B0B0D" strokeWidth={6} strokeLinecap="round" />
      </g>
      {/* goutte puis éclaboussure */}
      {drop > 0 && drop < 1 && <ellipse cx={300} cy={80 + 170 * drop} rx={8} ry={12} fill="#fff" stroke="#bbb" strokeWidth={2} />}
      {splat > 0 && (
        <g transform={`translate(300 255) scale(${splat})`}>
          <path d="M-60 0 q10 -30 30 -18 q8 -28 30 -10 q20 -22 32 6 q30 -6 26 22 q-10 26 -40 18 q-14 22 -36 6 q-28 14 -34 -10 q-26 -2 -8 -14z" fill="#f7f7f2" stroke="#d9d9cf" strokeWidth={3} />
        </g>
      )}
    </svg>
  );
};

/** Visage de femme peint à la main qui se découvre sous le covering (bandeau bleu qui se décolle). */
export const Portrait: React.FC<{ t: number; reveal?: boolean; banner?: boolean }> = ({ t, reveal = true, banner }) => {
  const { lin } = useG();
  const peel = reveal ? lin(t, t + 1.2) : 1;
  const b = banner ? lin(t + 0.2, t + 0.7) : 0;
  return (
    <svg width={572} height={400} viewBox="0 0 572 400" style={{ display: "block" }}>
      <rect width={572} height={400} fill="#1f4fd1" />
      {/* peinture */}
      <rect x={40} y={20} width={492} height={360} rx={20} fill="#efe3d0" />
      <path d="M190 360 Q170 140 286 70 Q402 140 382 360 Z" fill="#4a2a17" />
      <ellipse cx={286} cy={190} rx={78} ry={98} fill="#e9b996" />
      <path d="M208 170 Q230 80 286 88 Q350 92 366 170 Q340 120 286 122 Q236 122 208 170Z" fill="#4a2a17" />
      <ellipse cx={256} cy={190} rx={13} ry={8} fill="#fff" />
      <ellipse cx={316} cy={190} rx={13} ry={8} fill="#fff" />
      <circle cx={256} cy={190} r={6} fill="#4f7a3a" />
      <circle cx={316} cy={190} r={6} fill="#4f7a3a" />
      <path d="M270 238 Q286 250 302 238" fill="none" stroke="#b0464b" strokeWidth={6} strokeLinecap="round" />
      <path d="M244 176 q12 -8 26 -2 M302 174 q14 -6 26 2" stroke="#4a2a17" strokeWidth={4} fill="none" />
      {/* covering bleu qui se décolle depuis le coin */}
      <path d={`M572 0 L${572 - 572 * peel * 1.4} 0 L572 ${400 * peel * 1.4} Z`} fill="none" />
      <path d={`M0 0 H${572 - 600 * peel} L572 ${600 * peel} V400 H0 Z`} fill="#1f4fd1" />
      {peel > 0 && peel < 1 && (
        <path d={`M${572 - 600 * peel} 0 L572 ${600 * peel} L${572 - 300 * peel} ${300 * peel} Z`} fill="#5f86ff" opacity={0.9} />
      )}
      {b > 0 && (
        <g opacity={b} transform={`translate(0 ${(1 - b) * 20})`}>
          <rect x={86} y={300} width={400} height={64} rx={10} fill="#fff" />
          <text x={286} y={345} textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize={36} fill="#8b1e2b">
            Jessica pour toujours
          </text>
        </g>
      )}
    </svg>
  );
};
