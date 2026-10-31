import React, { createContext, useContext } from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import { sec } from "./timeline";

// Boîte à outils commune aux graphiques de la vidéo 002.

export const RED = theme.colors.red;
export const GREEN = "#22C55E";
export const TITLE = theme.fonts.title;
export const BODY = theme.fonts.body;
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Zone sûre TikTok (1080×1920) : rien d'important hors de cette zone. */
export const SAFE = { left: 70, right: 920, top: 250, bottom: 1300 };
export const SAFE_W = SAFE.right - SAFE.left;

const Ctx = createContext({ from: 0, dur: 1 });

/** Graphique affiché de `from` à `to` (secondes du rush). */
export const G: React.FC<{ from: number; to: number; name: string; children: React.ReactNode }> = ({
  from,
  to,
  name,
  children,
}) => (
  <Sequence from={sec(from)} durationInFrames={sec(to) - sec(from)} name={name}>
    <Ctx.Provider value={{ from, dur: sec(to) - sec(from) }}>{children}</Ctx.Provider>
  </Sequence>
);

/** frame locale + conversion « seconde du rush » → frame locale. */
export const useG = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { from, dur } = useContext(Ctx);
  const at = (t: number) => sec(t) - sec(from);
  /** ressort 0 → 1 qui démarre à la seconde t du rush */
  const pop = (t: number, damping = 12, stiffness = 180) =>
    spring({ frame: frame - at(t), fps, config: { damping, stiffness } });
  /** 0 → 1 linéaire entre deux secondes du rush */
  const lin = (t0: number, t1: number, easing = Easing.inOut(Easing.quad)) =>
    interpolate(frame, [at(t0), at(t1)], [0, 1], { ...clamp, easing });
  const exit = interpolate(frame, [dur - 7, dur], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return { frame, fps, at, pop, lin, exit, dur };
};

/** Bloc positionné, avec entrée en ressort et sortie automatique. */
export const Place: React.FC<{
  top: number;
  left?: number;
  width?: number;
  rotate?: number;
  enterAt?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ top, left = SAFE.left, width = SAFE_W, rotate = 0, enterAt, children, style }) => {
  const { pop, exit, frame, fps } = useG();
  const k = enterAt === undefined ? spring({ frame, fps, config: { damping: 12, stiffness: 180 } }) : pop(enterAt);
  const scale = interpolate(k, [0, 1], [0.55, 1]) * (1 - exit * 0.2);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        opacity: Math.min(1, k * 1.6) * (1 - exit),
        transform: `translateY(${(1 - k) * 60 - exit * 40}px) rotate(${rotate}deg) scale(${scale})`,
        transformOrigin: "50% 50%",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Fill = AbsoluteFill;

export const cardWhite: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: 30,
  boxShadow: "0 24px 70px rgba(0,0,0,0.5)",
  color: "#0B0B0D",
};

export const cardDark: React.CSSProperties = {
  background: "rgba(11,11,13,0.86)",
  border: "2px solid rgba(255,255,255,0.12)",
  borderRadius: 30,
  boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
  color: "#FFFFFF",
};

/** Tampon rouge qui « s'écrase » sur l'écran. */
export const Stamp: React.FC<{ t: number; text: string; size?: number; rotate?: number; color?: string }> = ({
  t,
  text,
  size = 130,
  rotate = -10,
  color = RED,
}) => {
  const { frame, at, fps } = useG();
  const local = frame - at(t);
  if (local < 0) return null;
  const k = spring({ frame: local, fps, config: { damping: 9, stiffness: 260 } });
  const scale = interpolate(k, [0, 1], [2.6, 1]);
  return (
    <div
      style={{
        display: "inline-block",
        transform: `rotate(${rotate}deg) scale(${scale})`,
        opacity: Math.min(1, local / 3),
        border: `${size * 0.07}px solid ${color}`,
        borderRadius: size * 0.16,
        padding: `${size * 0.02}px ${size * 0.22}px`,
        color,
        fontFamily: TITLE,
        fontSize: size,
        lineHeight: 1.1,
        letterSpacing: 4,
        background: "rgba(255,255,255,0.9)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

/** Cercle rouge avec une icône blanche. */
export const IconDot: React.FC<{ size?: number; color?: string; children: React.ReactNode }> = ({
  size = 84,
  color = RED,
  children,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size,
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

/** Coche verte qui se dessine. */
export const Check: React.FC<{ k: number; size?: number }> = ({ k, size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 70 70">
    <circle cx={35} cy={35} r={33} fill={GREEN} opacity={Math.min(1, k * 2)} />
    <path
      d="M19 36 L30 47 L52 24"
      fill="none"
      stroke="#fff"
      strokeWidth={8}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={60}
      strokeDashoffset={60 * (1 - k)}
    />
  </svg>
);
