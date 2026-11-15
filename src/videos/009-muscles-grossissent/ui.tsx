import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { BODY, RED, TITLE, useG } from "../_shared/kit";
import { CX } from "./timeline";

export const W = 1080;
export const H = 1920;
export const MUSCLE = "#E8505B";
export const MUSCLE_D = "#8E1B26";

/** Calque SVG plein cadre. */
export const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
    {children}
  </svg>
);

/** Scène : fondu d'entrée + sortie automatique. */
export const Scn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { frame, exit } = useG();
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, (frame + 1) / 5) * (1 - exit), transform: `scale(${1 + exit * 0.05})` }}>
      {children}
    </AbsoluteFill>
  );
};

/** Gros texte Anton qui « claque » à la seconde t. */
export const Big: React.FC<{
  t: number;
  top: number;
  size?: number;
  color?: string;
  rotate?: number;
  children: React.ReactNode;
}> = ({ t, top, size = 110, color = "#fff", rotate = 0, children }) => {
  const { pop } = useG();
  const k = pop(t, 11, 220);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: CX - 440,
        width: 880,
        textAlign: "center",
        fontFamily: TITLE,
        fontSize: size,
        lineHeight: 1.06,
        color,
        whiteSpace: "nowrap",
        textShadow: "0 8px 0 rgba(0,0,0,0.35)",
        opacity: Math.min(1, k * 2),
        transform: `scale(${interpolate(k, [0, 1], [1.6, 1])}) rotate(${rotate}deg)`,
      }}
    >
      {children}
    </div>
  );
};

/** Ligne de mots Anton, chacun apparaissant à son temps. */
export const Words: React.FC<{
  top: number;
  size?: number;
  items: { t: number; text: string; color?: string }[];
  gap?: number;
}> = ({ top, size = 110, items, gap = 0.26 }) => {
  const { pop } = useG();
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: CX - 440,
        width: 880,
        display: "flex",
        justifyContent: "center",
        gap: size * gap,
        fontFamily: TITLE,
        fontSize: size,
        lineHeight: 1.06,
        whiteSpace: "nowrap",
        textShadow: "0 8px 0 rgba(0,0,0,0.35)",
      }}
    >
      {items.map((it, i) => {
        const k = pop(it.t, 11, 220);
        return (
          <span
            key={i}
            style={{
              color: it.color ?? "#fff",
              display: "inline-block",
              opacity: Math.min(1, k * 2),
              transform: `translateY(${(1 - k) * 40}px) scale(${interpolate(k, [0, 1], [1.5, 1])})`,
            }}
          >
            {it.text}
          </span>
        );
      })}
    </div>
  );
};

/** Petit texte en capitales espacées. */
export const Label: React.FC<{ t: number; top: number; size?: number; color?: string; children: React.ReactNode }> = ({
  t,
  top,
  size = 40,
  color = "rgba(255,255,255,0.78)",
  children,
}) => {
  const { pop } = useG();
  const k = pop(t, 16, 170);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: CX - 430,
        width: 860,
        textAlign: "center",
        fontFamily: BODY,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: size * 0.09,
        color,
        opacity: Math.min(1, k * 1.6),
        transform: `translateY(${(1 - k) * 24}px)`,
      }}
    >
      {children}
    </div>
  );
};

/** En-tête « numéro + titre » des trois leviers. */
export const Header: React.FC<{ n: number; title: string; t: number; t2: number }> = ({ n, title, t, t2 }) => {
  const { pop } = useG();
  const a = pop(t, 10, 220);
  const b = pop(t2, 12, 200);
  return (
    <div style={{ position: "absolute", top: 305, left: CX - 420, width: 840, display: "flex", alignItems: "center", justifyContent: "center", gap: 26 }}>
      <div
        style={{
          width: 124,
          height: 124,
          borderRadius: 124,
          background: RED,
          color: "#fff",
          fontFamily: TITLE,
          fontSize: 92,
          lineHeight: "124px",
          textAlign: "center",
          flexShrink: 0,
          transform: `scale(${a}) rotate(${(1 - a) * -90}deg)`,
          boxShadow: "0 12px 40px rgba(225,6,0,0.45)",
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: TITLE,
          fontSize: 112,
          color: "#fff",
          lineHeight: 1,
          opacity: Math.min(1, b * 2),
          transform: `translateX(${(1 - b) * -40}px)`,
          textShadow: "0 8px 0 rgba(0,0,0,0.35)",
        }}
      >
        {title}
      </div>
    </div>
  );
};

/** Jauge horizontale. */
export const Bar: React.FC<{ top: number; width?: number; value: number; color: string; label: string; t: number; right?: string }> = ({
  top,
  width = 700,
  value,
  color,
  label,
  t,
  right,
}) => {
  const { pop } = useG();
  const k = pop(t, 16, 170);
  return (
    <div style={{ position: "absolute", top, left: CX - width / 2, width, opacity: Math.min(1, k * 1.6), transform: `translateY(${(1 - k) * 30}px)` }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: BODY, fontWeight: 800, fontSize: 34, letterSpacing: 3, color: "rgba(255,255,255,0.8)", marginBottom: 12 }}>
        <span>{label}</span>
        <span style={{ color }}>{right}</span>
      </div>
      <div style={{ height: 50, borderRadius: 50, background: "rgba(255,255,255,0.12)", overflow: "hidden", border: "3px solid rgba(255,255,255,0.22)" }}>
        <div style={{ width: `${value * 100}%`, height: "100%", background: color, borderRadius: 50 }} />
      </div>
    </div>
  );
};

// ───── Icônes dessinées (centrées sur 0,0) ─────

export const Dumbbell: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-70} y={-9} width={140} height={18} rx={8} fill="#C9CED6" />
    <rect x={-92} y={-48} width={30} height={96} rx={10} fill="#8A909B" />
    <rect x={62} y={-48} width={30} height={96} rx={10} fill="#8A909B" />
    <rect x={-112} y={-34} width={20} height={68} rx={8} fill="#6B717C" />
    <rect x={92} y={-34} width={20} height={68} rx={8} fill="#6B717C" />
  </g>
);

export const Plate: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <circle r={170} fill="#F4F4F6" />
    <circle r={128} fill="#E3E4EA" />
    <circle r={120} fill="#FAFAFC" />
    {/* steak */}
    <path d="M-92 -18 Q-98 -78 -30 -80 Q30 -84 22 -30 Q18 20 -40 26 Q-88 28 -92 -18Z" fill="#9C4A2F" />
    <path d="M-66 -30 q24 -22 52 -12 M-60 -4 q26 -12 50 -4" stroke="#C97B5E" strokeWidth={7} fill="none" strokeLinecap="round" />
    {/* œuf */}
    <path d="M22 26 Q30 -14 78 0 Q112 14 96 56 Q82 92 44 82 Q10 70 22 26Z" fill="#fff" stroke="#DDDEE6" strokeWidth={4} />
    <circle cx={60} cy={42} r={21} fill="#FFC21A" />
    {/* brocoli */}
    <rect x={-52} y={56} width={16} height={36} rx={6} fill="#7DBB55" />
    <circle cx={-62} cy={52} r={21} fill="#3E9B45" />
    <circle cx={-36} cy={42} r={23} fill="#46AB4D" />
    <circle cx={-18} cy={60} r={18} fill="#3E9B45" />
  </g>
);

export const Bed: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-340} y={-130} width={44} height={250} rx={14} fill="#565C6B" />
    <rect x={296} y={-20} width={44} height={140} rx={14} fill="#565C6B" />
    <rect x={-320} y={30} width={640} height={60} rx={14} fill="#3A3F4B" />
    <rect x={-300} y={-20} width={600} height={64} rx={22} fill="#F4F4F6" />
    <rect x={-286} y={-64} width={150} height={56} rx={24} fill="#DADCE4" />
    <circle cx={-205} cy={-80} r={50} fill="#F2B38A" />
    <path d="M-255 -84 Q-257 -134 -205 -134 Q-153 -134 -155 -84 Q-172 -112 -205 -110 Q-238 -112 -255 -84Z" fill="#2A1B14" />
    <path d="M-230 -74 q9 7 18 0 M-196 -74 q9 7 18 0" stroke="#2A1B14" strokeWidth={4.5} fill="none" strokeLinecap="round" />
    <path d="M-160 -60 Q-150 -84 -110 -80 L270 -70 Q300 -66 300 -30 V26 H-160 Z" fill="#E10600" />
    <path d="M-160 -34 H300" stroke="rgba(0,0,0,0.18)" strokeWidth={8} />
  </g>
);

export const Cone: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M-22 -110 H22 L62 30 H-62 Z" fill="#FF7A1A" />
    <path d="M-34 -66 H34 L42 -38 H-42 Z M-50 -10 H50 L56 12 H-56Z" fill="#fff" />
    <rect x={-84} y={30} width={168} height={24} rx={8} fill="#FF7A1A" />
  </g>
);

export const Brain: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path
      d="M-8 -62 Q-50 -76 -64 -40 Q-92 -22 -76 12 Q-84 50 -44 58 Q-22 76 -6 56 V-62Z M8 -62 Q50 -76 64 -40 Q92 -22 76 12 Q84 50 44 58 Q22 76 6 56 V-62Z"
      fill="#FF9AA8"
    />
    <path
      d="M-30 -38 q-18 10 -6 28 q-22 8 -8 30 M-52 -6 q14 -4 22 6 M30 -38 q18 10 6 28 q22 8 8 30 M52 -6 q-14 -4 -22 6"
      stroke="#D9566B"
      strokeWidth={7}
      fill="none"
      strokeLinecap="round"
    />
  </g>
);
