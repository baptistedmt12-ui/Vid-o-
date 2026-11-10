import React from "react";
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { PhoneIcon } from "./icons";
import { BODY, GREEN, RED, SAFE, TITLE, nbsp, useG } from "./kit";

// Composants « histoire racontée » (vidéos 007 à 009) : tout est petit et calé à gauche,
// pour laisser voir le geste au centre et ne rien mettre sous l'interface TikTok.

export const LEFT = SAFE.left;

type Tone = "dark" | "white" | "red" | "green";
export const tone = (t: Tone): React.CSSProperties =>
  t === "white"
    ? { background: "#fff", color: "#0B0B0D", boxShadow: "0 14px 40px rgba(0,0,0,0.45)" }
    : t === "red"
      ? { background: RED, color: "#fff", boxShadow: "0 14px 40px rgba(0,0,0,0.45)" }
      : t === "green"
        ? { background: GREEN, color: "#fff", boxShadow: "0 14px 40px rgba(0,0,0,0.45)" }
        : { background: "rgba(11,11,13,0.86)", color: "#fff", border: "2px solid rgba(255,255,255,0.14)", boxShadow: "0 14px 40px rgba(0,0,0,0.5)" };

/** Entrée en ressort + sortie automatique, ancrée à gauche. */
export const Side: React.FC<{ top?: number; left?: number; t?: number; rotate?: number; children: React.ReactNode; from?: "left" | "up"; inline?: boolean }> = ({
  top,
  inline,
  left = LEFT,
  t,
  rotate = 0,
  children,
  from = "left",
}) => {
  const { pop, exit, frame, at, fps } = useG();
  const k = t === undefined ? spring({ frame, fps, config: { damping: 13, stiffness: 200 } }) : pop(t, 13, 200);
  const started = t === undefined || frame >= at(t);
  const dx = from === "left" ? (1 - k) * -120 : 0;
  const dy = from === "up" ? (1 - k) * 50 : 0;
  return (
    <div
      style={{
        position: inline ? "relative" : "absolute",
        top: inline ? undefined : top,
        left: inline ? undefined : left,
        opacity: started ? Math.min(1, k * 1.8) * (1 - exit) : 0,
        transform: `translate(${dx - exit * 60}px, ${dy}px) rotate(${rotate}deg) scale(${0.7 + 0.3 * k})`,
        transformOrigin: "0% 50%",
      }}
    >
      {children}
    </div>
  );
};

/** Étiquette arrondie : icône + texte (+ sous-titre). */
export const Tag: React.FC<{
  top: number;
  t?: number;
  icon?: React.ReactNode;
  text: React.ReactNode;
  sub?: string;
  tone?: Tone;
  size?: number;
  left?: number;
  rotate?: number;
}> = ({ top, t, icon, text, sub, tone: tn = "dark", size = 36, left, rotate }) => (
  <Side top={top} t={t} left={left} rotate={rotate}>
    <div
      style={{
        ...tone(tn),
        display: "flex",
        alignItems: "center",
        gap: 14,
        borderRadius: 100,
        padding: icon ? "10px 28px 10px 10px" : "12px 28px",
        maxWidth: 640,
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      <div>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: size, lineHeight: 1.15 }}>{typeof text === "string" ? nbsp(text) : text}</div>
        {sub && <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: size * 0.66, opacity: 0.72 }}>{nbsp(sub)}</div>}
      </div>
    </div>
  </Side>
);

/** Rond coloré avec une icône. */
export const Dot: React.FC<{ size?: number; color?: string; children: React.ReactNode }> = ({ size = 62, color = RED, children }) => (
  <div style={{ width: size, height: size, borderRadius: size, background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    {children}
  </div>
);

/** Mini calendrier (jour de la semaine). */
export const Day: React.FC<{ day: string; size?: number }> = ({ day, size = 62 }) => (
  <div style={{ width: size, height: size, borderRadius: 14, overflow: "hidden", background: "#fff", flexShrink: 0, boxShadow: "0 0 0 3px rgba(0,0,0,0.1)" }}>
    <div style={{ height: size * 0.3, background: RED }} />
    <div style={{ fontFamily: TITLE, fontSize: size * 0.4, color: "#0B0B0D", textAlign: "center", lineHeight: `${size * 0.7}px` }}>{day}</div>
  </div>
);

/** Appel entrant (carte téléphone qui vibre). */
export const Call: React.FC<{ top: number; t: number; caller: string; sub?: string; reveal?: { t: number; text: string } }> = ({
  top,
  t,
  caller,
  sub = "Appel entrant",
  reveal,
}) => {
  const { frame, at, pop } = useG();
  const local = frame - at(t);
  const ring = local > 0 && local % 30 < 14 ? Math.sin(local * 1.9) * 7 : 0;
  const r = reveal ? pop(reveal.t, 12, 200) : 0;
  return (
    <Side top={top} t={t}>
      <div style={{ ...tone("dark"), borderRadius: 30, padding: "16px 26px 16px 16px", display: "flex", alignItems: "center", gap: 18, width: 520 }}>
        <div style={{ position: "relative", width: 76, height: 76 }}>
          {[0, 1].map((i) => {
            const p = ((local + i * 15) % 30) / 30;
            return (
              <div
                key={i}
                style={{ position: "absolute", inset: 0, borderRadius: 80, border: `3px solid ${GREEN}`, transform: `scale(${1 + p * 0.6})`, opacity: local > 0 ? 1 - p : 0 }}
              />
            );
          })}
          <div style={{ position: "absolute", inset: 0, borderRadius: 80, background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${ring}deg)` }}>
            <PhoneIcon size={40} />
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 24, opacity: 0.65, letterSpacing: 1 }}>{sub}</div>
          <div style={{ position: "relative", height: 48 }}>
            <div style={{ position: "absolute", fontFamily: BODY, fontWeight: 800, fontSize: 38, opacity: 1 - r, whiteSpace: "nowrap" }}>{caller}</div>
            {reveal && (
              <div style={{ position: "absolute", fontFamily: BODY, fontWeight: 800, fontSize: 38, color: "#FFD23F", opacity: r, transform: `translateY(${(1 - r) * 20}px)`, whiteSpace: "nowrap" }}>
                {reveal.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </Side>
  );
};

/** Pile de bulles de dialogue, ancrée à gauche. */
export const Talk: React.FC<{ top: number; children: React.ReactNode; width?: number }> = ({ top, children, width = 600 }) => {
  const { exit } = useG();
  return (
    <div style={{ position: "absolute", top, left: LEFT, width, display: "flex", flexDirection: "column", gap: 12, opacity: 1 - exit, transform: `translateX(${-exit * 60}px)` }}>
      {children}
    </div>
  );
};

export const Say: React.FC<{ t: number; text: string; who?: string; side?: "left" | "right"; tone?: Tone; size?: number }> = ({
  t,
  text,
  who,
  side = "left",
  tone: tn = "white",
  size = 34,
}) => {
  const { pop, frame, at } = useG();
  const k = pop(t, 13, 210);
  if (frame < at(t)) return null;
  return (
    <div style={{ alignSelf: side === "left" ? "flex-start" : "flex-end", maxWidth: 540, transform: `scale(${k})`, transformOrigin: side === "left" ? "0% 100%" : "100% 100%", opacity: Math.min(1, k * 2) }}>
      {who && <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: "#fff", opacity: 0.75, marginBottom: 4, textAlign: side, textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>{who}</div>}
      <div
        style={{
          ...tone(tn),
          fontFamily: BODY,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.25,
          padding: "14px 22px",
          borderRadius: 26,
          borderBottomLeftRadius: side === "left" ? 6 : 26,
          borderBottomRightRadius: side === "left" ? 26 : 6,
        }}
      >
        {nbsp(text)}
      </div>
    </div>
  );
};

/** Mot fort, petit et à gauche (Anton). */
export const Punch: React.FC<{ t: number; top: number; text: string; color?: string; size?: number; rotate?: number; left?: number }> = ({
  t,
  top,
  text,
  color = "#fff",
  size = 84,
  rotate = -3,
  left = LEFT,
}) => {
  const { pop, exit, frame, at } = useG();
  const k = pop(t, 10, 230);
  if (frame < at(t)) return null;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        fontFamily: TITLE,
        fontSize: size,
        lineHeight: 1.05,
        color,
        whiteSpace: "nowrap",
        WebkitTextStroke: color === "#fff" ? undefined : "3px #fff",
        textShadow: "0 6px 0 rgba(0,0,0,0.35), 0 0 34px rgba(0,0,0,0.6)",
        transform: `scale(${interpolate(k, [0, 1], [1.7, 1]) * (1 - exit * 0.2)}) rotate(${rotate}deg)`,
        transformOrigin: "0% 50%",
        opacity: Math.min(1, k * 2) * (1 - exit),
      }}
    >
      {text}
    </div>
  );
};

/** Frise chronologique : lignes qui s'allument une à une. */
export type Step = { t: number; day: string; text: string; hot?: boolean };
export const Timeline: React.FC<{ top: number; title?: string; steps: Step[]; width?: number }> = ({ top, title, steps, width = 560 }) => {
  const { pop } = useG();
  return (
    <Side top={top} t={steps[0].t - 0.2}>
      <div style={{ ...tone("dark"), borderRadius: 26, padding: "20px 26px 22px", width, display: "flex", flexDirection: "column", gap: 12 }}>
        {title && <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 22, letterSpacing: 4, opacity: 0.6 }}>{title}</div>}
        {steps.map((s) => {
          const k = pop(s.t, 14, 200);
          return (
            <div key={s.day + s.text} style={{ display: "flex", alignItems: "center", gap: 16, opacity: 0.15 + 0.85 * Math.min(1, k * 1.5), transform: `translateX(${(1 - k) * -30}px)` }}>
              <Day day={s.day} size={56} />
              <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 31, lineHeight: 1.15, color: s.hot ? "#FFD23F" : "#fff" }}>{nbsp(s.text)}</div>
            </div>
          );
        })}
      </div>
    </Side>
  );
};

/** Photo « polaroid » tirée du rush (image dans assets/). */
export const Polaroid: React.FC<{ src: string; t: number; top: number; left?: number; w?: number; h?: number; label?: string; rotate?: number; mark?: { x: number; y: number } }> = ({
  src,
  t,
  top,
  left = LEFT,
  w = 300,
  h = 380,
  label,
  rotate = -5,
  mark,
}) => {
  const { pop, lin } = useG();
  const m = mark ? pop(t + 0.35, 14, 160) : 0;
  const drawn = mark ? lin(t + 0.35, t + 0.9) : 0;
  return (
    <Side top={top} left={left} t={t} rotate={rotate} from="up">
      <div style={{ background: "#fff", padding: "14px 14px 0", borderRadius: 8, boxShadow: "0 24px 60px rgba(0,0,0,0.55)" }}>
        <div style={{ position: "relative", width: w, height: h, overflow: "hidden", borderRadius: 4 }}>
          <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {mark && (
            <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
              <circle cx={mark.x * w} cy={mark.y * h} r={46 * m} fill="none" stroke={RED} strokeWidth={6} strokeDasharray={300} strokeDashoffset={300 * (1 - drawn)} />
            </svg>
          )}
        </div>
        <div style={{ fontFamily: TITLE, fontSize: 34, color: "#0B0B0D", textAlign: "center", lineHeight: "58px" }}>{label}</div>
      </div>
    </Side>
  );
};

/** Sondage de fin (appel aux commentaires). */
export const Poll: React.FC<{ top: number; t: number; question: string; a: string; b: string; footer?: string }> = ({ top, t, question, a, b, footer = "Réponds en commentaire 👇" }) => {
  const { pop, frame, at } = useG();
  const ka = pop(t + 0.35, 14, 200);
  const kb = pop(t + 0.55, 14, 200);
  const bounce = Math.sin((frame - at(t)) / 5) * 4;
  const Opt: React.FC<{ k: number; text: string; c: string }> = ({ k, text, c }) => (
    <div style={{ flex: 1, background: c, borderRadius: 18, padding: "12px 0", textAlign: "center", fontFamily: TITLE, fontSize: 44, color: "#fff", transform: `scale(${k})`, opacity: Math.min(1, k * 2) }}>{text}</div>
  );
  return (
    <Side top={top} t={t}>
      <div style={{ ...tone("white"), borderRadius: 28, padding: "20px 24px 22px", width: 540 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <svg width={46} height={46} viewBox="0 0 24 24" style={{ transform: `translateY(${bounce}px)` }}>
            <path fill={RED} d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
            <circle cx={8} cy={10.5} r={1.4} fill="#fff" />
            <circle cx={12} cy={10.5} r={1.4} fill="#fff" />
            <circle cx={16} cy={10.5} r={1.4} fill="#fff" />
          </svg>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34, lineHeight: 1.15 }}>{nbsp(question)}</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          <Opt k={ka} text={a} c={GREEN} />
          <Opt k={kb} text={b} c={RED} />
        </div>
        <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 24, color: "#77777c", marginTop: 12, textAlign: "center" }}>{footer}</div>
      </div>
    </Side>
  );
};

/** Compteur « ×N » qui grimpe. */
export const Times: React.FC<{ t0: number; t1: number; to: number; size?: number }> = ({ t0, t1, to, size = 70 }) => {
  const { lin } = useG();
  const n = Math.max(1, Math.round(to * lin(t0, t1, Easing.out(Easing.quad))));
  return <span style={{ fontFamily: TITLE, fontSize: size, color: "#FFD23F" }}>×{n}</span>;
};

/** Sous-titres de la voix off, mot par mot (mot en cours en jaune).
 *  Calés dans la zone sûre : bas du texte à 1410 px (la barre TikTok commence vers 1450),
 *  entre 95 et 875 px de large (la colonne de droite commence vers 900). */
export type Caption = { t: number; end: number; words: { t: number; w: string }[] };
export const Captions: React.FC<{ data: Caption[]; hl?: string }> = ({ data, hl = "#FFD23F" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const now = frame / fps;
  const c = data.find((x) => now >= x.t && now < x.end);
  if (!c) return null;
  const k = spring({ frame: frame - Math.round(c.t * fps), fps, config: { damping: 14, stiffness: 260 }, durationInFrames: 8 });
  return (
    <div style={{ position: "absolute", left: 95, width: 780, bottom: 1920 - 1410, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          textAlign: "center",
          fontFamily: BODY,
          fontWeight: 900,
          fontSize: 54,
          lineHeight: 1.18,
          transform: `scale(${0.85 + 0.15 * k})`,
          opacity: Math.min(1, k * 2),
        }}
      >
        {c.words.map((w, i) => {
          const on = now >= w.t && (i === c.words.length - 1 || now < c.words[i + 1].t);
          return (
            <span
              key={i}
              style={{
                color: on ? hl : "#fff",
                WebkitTextStroke: "9px #000",
                paintOrder: "stroke fill",
                textShadow: "0 5px 14px rgba(0,0,0,0.6)",
                marginRight: i < c.words.length - 1 ? "0.26em" : 0,
                display: "inline-block",
                transform: on ? "scale(1.06)" : undefined,
              }}
            >
              {w.w}
            </span>
          );
        })}
      </div>
    </div>
  );
};
