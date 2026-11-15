import React from "react";

// Personnage 2D à plat. Origine = entre les pieds. Hauteur ≈ 540.
const SKIN = "#F2B38A";
const SKIN_D = "#E09A70";
const HAIR = "#2A1B14";
const RED = "#E10600";

type Mood = "ok" | "tired" | "happy" | "sleep";

const Arm: React.FC<{ side: -1 | 1; a: number; b: number; dumbbell?: boolean; flex?: number }> = ({ side, a, b, dumbbell, flex = 0 }) => (
  <g transform={`translate(${side * 84},-388) rotate(${-side * a})`}>
    <line x1={0} y1={0} x2={0} y2={100} stroke={SKIN} strokeWidth={36} strokeLinecap="round" />
    <ellipse cx={-side * 6} cy={50} rx={19 + 12 * flex} ry={36} fill={SKIN} />
    <ellipse cx={-side * (10 + 6 * flex)} cy={46} rx={6 + 5 * flex} ry={20} fill={SKIN_D} opacity={0.35 + 0.4 * flex} />
    <g transform={`translate(0,100) rotate(${-side * b})`}>
      <line x1={0} y1={0} x2={0} y2={88} stroke={SKIN} strokeWidth={31} strokeLinecap="round" />
      <circle cx={0} cy={98} r={21} fill={SKIN} />
      {dumbbell && (
        <g transform="translate(0,98)">
          <rect x={-52} y={-7} width={104} height={14} rx={6} fill="#C9CED6" />
          <rect x={-66} y={-30} width={24} height={60} rx={8} fill="#8A909B" />
          <rect x={42} y={-30} width={24} height={60} rx={8} fill="#8A909B" />
          <rect x={-78} y={-21} width={14} height={42} rx={6} fill="#6B717C" />
          <rect x={64} y={-21} width={14} height={42} rx={6} fill="#6B717C" />
        </g>
      )}
    </g>
  </g>
);

export const Perso: React.FC<{
  x: number;
  y: number;
  scale?: number;
  armL?: [number, number];
  armR?: [number, number];
  dumbbells?: boolean;
  flex?: number;
  mood?: Mood;
  bob?: number;
  sweat?: number;
}> = ({ x, y, scale = 1, armL = [8, 0], armR = [8, 0], dumbbells, flex = 0, mood = "ok", bob = 0, sweat = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}>
    <ellipse cx={0} cy={6} rx={150} ry={18} fill="rgba(0,0,0,0.45)" />
    {/* chaussures + jambes */}
    <ellipse cx={-44} cy={-10} rx={38} ry={16} fill="#fff" />
    <ellipse cx={44} cy={-10} rx={38} ry={16} fill="#fff" />
    <rect x={-62} y={-190} width={40} height={178} rx={18} fill={SKIN} />
    <rect x={22} y={-190} width={40} height={178} rx={18} fill={SKIN} />
    <g transform={`translate(0,${bob})`}>
      {/* short */}
      <path d="M-70 -262 H70 L74 -150 H8 L0 -200 L-8 -150 H-74 Z" fill="#F4F4F6" />
      {/* débardeur */}
      <path d="M-84 -412 Q-88 -330 -66 -250 H66 Q88 -330 84 -412 Q60 -428 34 -424 Q0 -396 -34 -424 Q-60 -428 -84 -412 Z" fill={RED} />
      <rect x={-17} y={-448} width={34} height={40} rx={10} fill={SKIN_D} />
      <Arm side={-1} a={armL[0]} b={armL[1]} dumbbell={dumbbells} flex={flex} />
      <Arm side={1} a={armR[0]} b={armR[1]} dumbbell={dumbbells} flex={flex} />
      {/* tête */}
      <circle cx={0} cy={-492} r={60} fill={SKIN} />
      <path d="M-60 -496 Q-62 -560 0 -560 Q62 -560 60 -496 Q40 -530 0 -528 Q-40 -530 -60 -496 Z" fill={HAIR} />
      {mood === "sleep" ? (
        <path d="M-30 -486 q10 8 20 0 M10 -486 q10 8 20 0" stroke={HAIR} strokeWidth={5} fill="none" strokeLinecap="round" />
      ) : (
        <>
          <circle cx={-21} cy={-486} r={6.5} fill={HAIR} />
          <circle cx={21} cy={-486} r={6.5} fill={HAIR} />
        </>
      )}
      {mood === "tired" && <path d="M-34 -502 l22 6 M34 -502 l-22 6" stroke={HAIR} strokeWidth={5} strokeLinecap="round" />}
      <path
        d={
          mood === "happy"
            ? "M-22 -462 Q0 -438 22 -462 Z"
            : mood === "tired"
              ? "M-14 -452 Q0 -464 14 -452"
              : mood === "sleep"
                ? "M-8 -458 Q0 -452 8 -458"
                : "M-16 -460 Q0 -448 16 -460"
        }
        stroke={HAIR}
        strokeWidth={5}
        fill={mood === "happy" ? "#fff" : "none"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {sweat > 0 &&
        [0, 1, 2].map((i) => {
          const p = (sweat * 1.3 + i / 3) % 1;
          const sx = [-78, 80, -66][i];
          return (
            <path
              key={i}
              d="M0 -12 Q9 2 0 8 Q-9 2 0 -12Z"
              fill="#6EC8FF"
              opacity={Math.sin(p * Math.PI)}
              transform={`translate(${sx},${-520 + p * 90}) scale(1.5)`}
            />
          );
        })}
    </g>
  </g>
);
