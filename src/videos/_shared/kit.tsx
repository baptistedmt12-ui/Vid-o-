import React, { createContext, useContext } from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import { Audio, staticFile } from "remotion";

export const FPS = 30;
export const sec = (t: number) => Math.round(t * FPS);

// Boîte à outils partagée par les vidéos (graphiques motion design, bruitages).
// Les temps sont en secondes du rush, calés sur la voix off.

export const RED = theme.colors.red;
export const GREEN = "#22C55E";
export const TITLE = theme.fonts.title;
export const BODY = theme.fonts.body;
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Zone sûre TikTok (1080×1920) : rien d'important hors de cette zone. */
export const SAFE = { left: 70, right: 900, top: 260, bottom: 1250 };
export const MID_X = (SAFE.left + SAFE.right) / 2;
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

/** Effet sonore placé à la seconde t. */
export const Sfx: React.FC<{ src: string; t: number; volume?: number; len?: number }> = ({ src, t, volume = 0.4, len = 1 }) => (
  <Sequence from={Math.max(0, sec(t))} durationInFrames={sec(len)} name={`sfx ${src.split("/").pop()}`} layout="none">
    <Audio src={staticFile(src)} volume={volume} />
  </Sequence>
);

/** Étoile scintillante à 4 branches. */
export const Spark: React.FC<{ x: number; y: number; size: number; k: number; color?: string }> = ({ x, y, size, k, color = "#fff" }) => (
  <svg
    width={size}
    height={size}
    viewBox="-10 -10 20 20"
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      transform: `scale(${Math.sin(Math.min(1, Math.max(0, k)) * Math.PI)}) rotate(${k * 90}deg)`,
      filter: `drop-shadow(0 0 ${size / 6}px rgba(255,255,255,0.9))`,
    }}
  >
    <path d="M0 -10 Q1.2 -1.2 10 0 Q1.2 1.2 0 10 Q-1.2 1.2 -10 0 Q-1.2 -1.2 0 -10Z" fill={color} />
  </svg>
);

/** Croix rouge qui se dessine. */
export const Cross: React.FC<{ k: number; size?: number }> = ({ k, size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 70 70">
    <circle cx={35} cy={35} r={33} fill={RED} opacity={Math.min(1, k * 2)} />
    <path d="M23 23 L47 47 M47 23 L23 47" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" strokeDasharray={70} strokeDashoffset={70 * (1 - k)} />
  </svg>
);

type Tone = "dark" | "white" | "red";
const toneStyle = (tone: Tone): React.CSSProperties =>
  tone === "white"
    ? { background: "#fff", color: "#0B0B0D", boxShadow: "0 14px 40px rgba(0,0,0,0.45)" }
    : tone === "red"
      ? { background: RED, color: "#fff", boxShadow: "0 14px 40px rgba(0,0,0,0.45)" }
      : { background: "rgba(11,11,13,0.86)", color: "#fff", border: "2px solid rgba(255,255,255,0.14)", boxShadow: "0 14px 40px rgba(0,0,0,0.5)" };

/** Petite étiquette arrondie (icône + texte), centrée sur la zone sûre. */
export const Pill: React.FC<{
  top: number;
  text: React.ReactNode;
  sub?: string;
  icon?: React.ReactNode;
  tone?: Tone;
  enterAt?: number;
  rotate?: number;
  size?: number;
  x?: number;
}> = ({ top, text, sub, icon, tone = "dark", enterAt, rotate = 0, size = 42, x = MID_X }) => (
  <Place top={top} left={x - 400} width={800} rotate={rotate} enterAt={enterAt} style={{ display: "flex", justifyContent: "center" }}>
    <div
      style={{
        ...toneStyle(tone),
        display: "flex",
        alignItems: "center",
        gap: 16,
        borderRadius: 100,
        padding: icon ? "12px 30px 12px 14px" : "14px 30px",
        maxWidth: 760,
      }}
    >
      {icon}
      <div>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: size, lineHeight: 1.15 }}>{text}</div>
        {sub && <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: size * 0.68, opacity: 0.7 }}>{sub}</div>}
      </div>
    </div>
  </Place>
);

/** Mot fort en Anton (taille raisonnable), contour blanc. */
export const Word: React.FC<{ t: number; top: number; text: string; color?: string; size?: number; rotate?: number }> = ({
  t,
  top,
  text,
  color = RED,
  size = 100,
  rotate = -4,
}) => {
  const { pop, exit } = useG();
  const k = pop(t, 10, 230);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: MID_X - 450,
        width: 900,
        textAlign: "center",
        fontFamily: TITLE,
        fontSize: size,
        lineHeight: 1.05,
        color,
        WebkitTextStroke: color === "#fff" ? undefined : "3px #fff",
        textShadow: "0 8px 0 rgba(0,0,0,0.3), 0 0 40px rgba(0,0,0,0.55)",
        transform: `scale(${interpolate(k, [0, 1], [1.8, 1]) * (1 - exit * 0.2)}) rotate(${rotate}deg)`,
        opacity: Math.min(1, k * 2) * (1 - exit),
      }}
    >
      {text}
    </div>
  );
};

export type Row = { t: number; text: string; mark?: "check" | "cross" | "none"; icon?: React.ReactNode };

/** Carte compacte : titre + lignes qui apparaissent une à une. */
export const ListCard: React.FC<{ top: number; title?: string; rows: Row[]; width?: number; tone?: Tone; rotate?: number; size?: number }> = ({
  top,
  title,
  rows,
  width = 600,
  tone = "dark",
  rotate = 0,
  size = 40,
}) => {
  const { pop } = useG();
  return (
    <Place top={top} left={MID_X - width / 2} width={width} rotate={rotate}>
      <div style={{ ...toneStyle(tone), borderRadius: 26, padding: "24px 30px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
        {title && (
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 25, letterSpacing: 4, opacity: 0.65 }}>{title}</div>
        )}
        {rows.map((r) => {
          const k = pop(r.t, 14, 200);
          const m = pop(r.t + 0.1, 20, 160);
          return (
            <div key={r.text} style={{ display: "flex", alignItems: "center", gap: 18, opacity: Math.min(1, k * 1.5), transform: `translateX(${(1 - k) * -50}px)` }}>
              {r.mark === "check" && <Check k={m} size={size * 1.25} />}
              {r.mark === "cross" && <Cross k={m} size={size * 1.25} />}
              {r.icon}
              <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: size, lineHeight: 1.15 }}>{r.text}</div>
            </div>
          );
        })}
      </div>
    </Place>
  );
};

/** Bulle de citation (style message). */
export const Quote: React.FC<{ t: number; text: string; side?: "left" | "right"; tone?: Tone; size?: number }> = ({
  t,
  text,
  side = "left",
  tone = "white",
  size = 38,
}) => {
  const { pop } = useG();
  const k = pop(t, 13, 210);
  return (
    <div
      style={{
        ...toneStyle(tone),
        alignSelf: side === "left" ? "flex-start" : "flex-end",
        maxWidth: 560,
        fontFamily: BODY,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.25,
        padding: "16px 24px",
        borderRadius: 28,
        borderBottomLeftRadius: side === "left" ? 6 : 28,
        borderBottomRightRadius: side === "left" ? 28 : 6,
        transform: `scale(${k})`,
        transformOrigin: side === "left" ? "0% 100%" : "100% 100%",
        opacity: Math.min(1, k * 2),
      }}
    >
      {nbsp(text)}
    </div>
  );
};

/** Espaces insécables autour des guillemets et avant : ; ! ? */
export const nbsp = (s: string) => s.replace(/« /g, "«\u00A0").replace(/ ([»:;!?])/g, "\u00A0$1");

/** Pile de bulles. */
export const Quotes: React.FC<{ top: number; children: React.ReactNode; width?: number }> = ({ top, children, width = 640 }) => {
  const { exit } = useG();
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: MID_X - width / 2,
        width,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        opacity: 1 - exit,
        transform: `translateY(${-exit * 30}px)`,
      }}
    >
      {children}
    </div>
  );
};

/** Nombre qui défile de `from` à `to`. */
export const useCount = (t0: number, t1: number, from: number, to: number) => {
  const { lin } = useG();
  return Math.round(from + (to - from) * lin(t0, t1, Easing.out(Easing.cubic)));
};
export const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
