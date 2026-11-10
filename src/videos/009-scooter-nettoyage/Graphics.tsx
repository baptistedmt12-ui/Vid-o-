import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FPS, WORDS } from "./timeline";

// Habillage : petit, à gauche, dans la zone sûre TikTok (x 70→880, y 300→1400).
export const YELLOW = "#FFD400";
export const RED = "#E10600";
export const GREEN = "#22C55E";
const SANS = "Inter, Arial, sans-serif";
const LEFT = 70;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const useInOut = (dur: number, delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = spring({ frame: frame - delay, fps, config: { damping: 13, stiffness: 190 } });
  const out = interpolate(frame, [dur - 8, dur], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return { frame, fps, k, out };
};

export type IconKind = "alert" | "euro" | "paint" | "daisy" | "theft" | "keys";

const Icon: React.FC<{ kind: IconKind }> = ({ kind }) => {
  const bg = { alert: RED, euro: GREEN, paint: "#8A8F98", daisy: "#F5B800", theft: RED, keys: "#3B82F6" }[kind];
  return (
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {kind === "alert" && (
          <>
            <path d="M12 6v8" />
            <path d="M12 18h.01" />
          </>
        )}
        {kind === "euro" && (
          <>
            <path d="M17 6.5A6 6 0 1 0 17 17.5" />
            <path d="M5 10h8M5 14h8" />
          </>
        )}
        {kind === "paint" && <path d="M4 15c3-1 4-5 8-5s5 4 8 5M7 19h10" />}
        {kind === "daisy" &&
          [0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx="12" cy="6.5" rx="2.3" ry="4" fill="#fff" stroke="none" transform={`rotate(${a} 12 12)`} />
          ))}
        {kind === "daisy" && <circle cx="12" cy="12" r="2.6" fill="#F5B800" stroke="none" />}
        {kind === "theft" && (
          <>
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
          </>
        )}
        {kind === "keys" && (
          <>
            <circle cx="8" cy="12" r="3.5" />
            <path d="M11.5 12H20M17 12v3M20 12v2" />
          </>
        )}
      </svg>
    </div>
  );
};

/** Étiquette de contexte (style des vidéos du compte) : pastille blanche, petite, en haut à gauche. */
export const Tag: React.FC<{ icon: IconKind; text: string; sub?: string; dur: number }> = ({ icon, text, sub, dur }) => {
  const { k, out } = useInOut(dur);
  return (
    <div
      style={{
        position: "absolute",
        top: 310,
        left: LEFT,
        maxWidth: 760,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 24px 12px 12px",
        background: "rgba(255,255,255,0.96)",
        borderRadius: 999,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        opacity: Math.min(1, k * 1.5) * (1 - out),
        transform: `translateX(${(1 - k) * -60 - out * 30}px) scale(${0.85 + k * 0.15})`,
        transformOrigin: "0% 50%",
      }}
    >
      <Icon kind={icon} />
      <div>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: "#0B0B0D", lineHeight: 1.1 }}>{text}</div>
        {sub && <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 24, color: "#5B5F66", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
};

/** Notification de message reçu (iPhone), sous l'étiquette. */
export const Message: React.FC<{ from: string; text: string; dur: number }> = ({ from, text, dur }) => {
  const { k, out } = useInOut(dur);
  return (
    <div
      style={{
        position: "absolute",
        top: 420,
        left: LEFT,
        width: 700,
        opacity: k * (1 - out),
        transform: `translateY(${(1 - k) * -50}px) scale(${0.92 + k * 0.08})`,
        background: "rgba(245,245,247,0.94)",
        borderRadius: 30,
        padding: "20px 26px 24px",
        boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 11,
            background: "linear-gradient(180deg, #5BF675 0%, #22C14A 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24">
            <path fill="#fff" d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.4 4.7 3.7 6.2L5 21l4.1-2.3c.9.2 1.9.3 2.9.3 5.5 0 10-3.6 10-8s-4.5-8-10-8z" />
          </svg>
        </div>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 23, color: "#6B6F76", letterSpacing: 1 }}>MESSAGES</div>
        <div style={{ marginLeft: "auto", fontFamily: SANS, fontWeight: 600, fontSize: 22, color: "#8E9197" }}>maintenant</div>
      </div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: "#0B0B0D", marginTop: 14 }}>{from}</div>
      <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 32, color: "#1C1D20", marginTop: 4 }}>{text}</div>
    </div>
  );
};

/** Question finale A / B pour les commentaires. */
export const Poll: React.FC<{ dur: number }> = ({ dur }) => {
  const { frame, fps, k, out } = useInOut(dur);
  const opt = (i: number) => spring({ frame: frame - 8 - i * 7, fps, config: { damping: 14, stiffness: 180 } });
  const Option = ({ i, letter, text, color }: { i: number; letter: string; text: string; color: string }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginTop: 14,
        padding: "12px 22px 12px 12px",
        background: "rgba(255,255,255,0.96)",
        borderRadius: 999,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        opacity: Math.min(1, opt(i) * 1.5),
        transform: `translateX(${(1 - opt(i)) * -50}px)`,
        width: "fit-content",
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: color,
          color: "#fff",
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {letter}
      </div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: "#0B0B0D" }}>{text}</div>
    </div>
  );
  return (
    <div style={{ position: "absolute", top: 300, left: LEFT, width: 800, opacity: 1 - out }}>
      <div
        style={{
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 34,
          color: "#fff",
          textShadow: "0 3px 14px rgba(0,0,0,0.8)",
          opacity: k,
          transform: `translateY(${(1 - k) * 20}px)`,
        }}
      >
        Toi, à ma place ?
      </div>
      <Option i={0} letter="A" text="J'appelle la police" color={RED} />
      <Option i={1} letter="B" text="Il s'explique devant ma mère" color="#3B82F6" />
      <div
        style={{
          marginTop: 16,
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 28,
          color: YELLOW,
          textShadow: "0 3px 12px rgba(0,0,0,0.85)",
          opacity: opt(2),
          transform: `scale(${1 + 0.03 * Math.sin(frame / 5)})`,
          transformOrigin: "0% 50%",
        }}
      >
        Réponds A ou B en commentaire ↓
      </div>
    </div>
  );
};

// Mots mis en jaune dans les sous-titres
const KEY = new Set(
  [
    "clés", "figure", "réfléchis", "coffre", "compris", "boue", "regarde", "ramasse,", "ramasse", "questions.", "20 €",
    "blanc.", "s'écaille.", "casque,", "casque", "marguerite", "mère.", "volé", "pied.", "mien,", "où", "dehors,", "tout",
    "crois.", "police", "mère", "descend.",
  ].map((w) => w.toLowerCase()),
);

type Line = { words: [string, number, number][]; start: number; end: number };

/** Groupes de 1 à 4 mots, coupés sur la ponctuation et les pauses. */
const LINES: Line[] = (() => {
  const toks: [string, number, number][] = [];
  for (const w of WORDS) {
    if (/^[?!.,]$/.test(w[0]) && toks.length) {
      const p = toks[toks.length - 1];
      toks[toks.length - 1] = [`${p[0]} ${w[0]}`, p[1], w[2]];
    } else toks.push([...w]);
  }
  const lines: Line[] = [];
  let cur: [string, number, number][] = [];
  const flush = () => {
    if (cur.length) lines.push({ words: cur, start: cur[0][1], end: cur[cur.length - 1][2] });
    cur = [];
  };
  toks.forEach((w, i) => {
    cur.push(w);
    const next = toks[i + 1];
    const chars = cur.map((c) => c[0]).join(" ").length;
    if (/[.,?!]$/.test(w[0]) || cur.length >= 4 || chars > 16 || (next && next[1] - w[2] > 0.35)) flush();
  });
  flush();
  // chaque ligne reste jusqu'au début de la suivante (au plus 0,6 s après son dernier mot)
  return lines.map((l, i) => ({ ...l, end: Math.min(lines[i + 1]?.start ?? l.end + 0.6, l.end + 0.6) }));
})();

/** Sous-titres mot par mot, au-dessus de la zone de description TikTok. */
export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / FPS;
  const line = LINES.find((l) => t >= l.start - 0.05 && t < l.end);
  if (!line) return null;
  const local = frame - Math.round((line.start - 0.05) * FPS);
  const pop = spring({ frame: local, fps, config: { damping: 12, stiffness: 260 }, durationInFrames: 8 });
  return (
    <div
      style={{
        position: "absolute",
        left: LEFT,
        width: 820,
        top: 1210,
        textAlign: "center",
        transform: `scale(${0.88 + pop * 0.12})`,
      }}
    >
      {line.words.map(([w, s], i) => {
        const spoken = t >= s - 0.03;
        const key = KEY.has(w.toLowerCase().replace(/ [?!.,]$/, "")) || KEY.has(w.toLowerCase());
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              margin: "0 9px",
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 58,
              lineHeight: 1.15,
              textTransform: "uppercase",
              color: key && spoken ? YELLOW : "#FFFFFF",
              opacity: spoken ? 1 : 0.55,
              WebkitTextStroke: "2px rgba(0,0,0,0.9)",
              paintOrder: "stroke fill",
              textShadow: "0 4px 16px rgba(0,0,0,0.85)",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
