import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Habillage premium : noir profond, ivoire, or champagne. Tout est petit, à gauche,
// dans la zone sûre TikTok (x 70→850, y 300→1400).
export const GOLD = "#C9A86A";
export const GOLD_LIGHT = "#E8D3A2";
export const IVORY = "#F5F2EC";
export const SERIF = "'Playfair Display', Georgia, serif";
export const SANS = "Inter, Arial, sans-serif";
const LEFT = 70;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const glass: React.CSSProperties = {
  background: "rgba(11,11,13,0.58)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(232,211,162,0.28)",
  boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
};

/** entrée (0→1) et sortie (0→1) d'un élément qui dure `dur` images */
const useInOut = (dur: number, delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = spring({ frame: frame - delay, fps, config: { damping: 200, stiffness: 120 }, durationInFrames: 16 });
  const out = interpolate(frame, [dur - 10, dur], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return { frame, fps, k, out, vis: k * (1 - out) };
};

/** Reflet lumineux qui traverse un élément une fois. */
const Shine: React.FC<{ at?: number }> = ({ at = 8 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 22], [-0.4, 1.4], { ...clamp, easing: Easing.inOut(Easing.quad) });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: "inherit",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -40,
          bottom: -40,
          width: 120,
          left: `${p * 100}%`,
          transform: "skewX(-20deg)",
          background: "linear-gradient(90deg, rgba(255,240,205,0) 0%, rgba(255,240,205,0.45) 50%, rgba(255,240,205,0) 100%)",
        }}
      />
    </div>
  );
};

/** Étiquette de contexte : petite, en haut à gauche. */
export const Tag: React.FC<{ label: string; sub?: string; dur: number; top?: number }> = ({ label, sub, dur, top = 310 }) => {
  const { k, out, vis } = useInOut(dur);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: LEFT,
        maxWidth: 760,
        opacity: vis,
        transform: `translateX(${(1 - k) * -40 - out * 20}px)`,
        ...glass,
        borderRadius: 14,
        padding: "16px 26px 18px 24px",
        borderLeft: `4px solid ${GOLD}`,
      }}
    >
      <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 25, letterSpacing: 5, color: GOLD_LIGHT, textTransform: "uppercase" }}>
        {label}
      </div>
      {sub && (
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 34, color: IVORY, marginTop: 6, lineHeight: 1.25 }}>{sub}</div>
      )}
      <Shine />
    </div>
  );
};

/** Citation : quelques mots en italique, à gauche, mot par mot. */
export const Quote: React.FC<{ text: string; who: string; dur: number; top?: number }> = ({ text, who, dur, top = 1080 }) => {
  const { frame, fps, out } = useInOut(dur);
  const words = text.split(" ");
  const step = Math.min(4, Math.max(2, Math.floor((dur * 0.45) / words.length)));
  return (
    <div style={{ position: "absolute", top, left: LEFT, width: 760, opacity: 1 - out }}>
      <div style={{ fontFamily: SERIF, fontSize: 96, lineHeight: 0.6, color: GOLD, height: 46 }}>“</div>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 50, lineHeight: 1.22, color: IVORY, textShadow: "0 3px 18px rgba(0,0,0,0.85)" }}>
        {words.map((w, i) => {
          const k = spring({ frame: frame - i * step, fps, config: { damping: 200, stiffness: 140 }, durationInFrames: 12 });
          return (
            <span key={i} style={{ opacity: k, display: "inline-block", transform: `translateY(${(1 - k) * 14}px)`, marginRight: 13 }}>
              {w}
            </span>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: 5,
          color: GOLD_LIGHT,
          textTransform: "uppercase",
          opacity: interpolate(frame, [words.length * step, words.length * step + 10], [0, 1], clamp),
          textShadow: "0 2px 10px rgba(0,0,0,0.8)",
        }}
      >
        — {who}
      </div>
    </div>
  );
};

/** Notification de message (iPhone), petite, à gauche. */
export const Message: React.FC<{ from: string; text: string; dur: number }> = ({ from, text, dur }) => {
  const { k, out } = useInOut(dur);
  return (
    <div
      style={{
        position: "absolute",
        top: 1040,
        left: LEFT,
        width: 700,
        opacity: k * (1 - out),
        transform: `translateY(${(1 - k) * 40}px) scale(${0.94 + k * 0.06})`,
        ...glass,
        borderRadius: 30,
        padding: "22px 26px 26px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: "linear-gradient(180deg, #5BF675 0%, #22C14A 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path fill="#fff" d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.4 4.7 3.7 6.2L5 21l4.1-2.3c.9.2 1.9.3 2.9.3 5.5 0 10-3.6 10-8s-4.5-8-10-8z" />
          </svg>
        </div>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 24, color: "rgba(245,242,236,0.6)", letterSpacing: 1 }}>MESSAGES</div>
        <div style={{ marginLeft: "auto", fontFamily: SANS, fontWeight: 600, fontSize: 22, color: "rgba(245,242,236,0.45)" }}>maintenant</div>
      </div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: IVORY, marginTop: 16 }}>{from}</div>
      <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 32, color: "rgba(245,242,236,0.9)", marginTop: 4, lineHeight: 1.3 }}>
        {text}
      </div>
    </div>
  );
};

/** Heure qui s'affiche : 16:59 → 17:00. */
export const Clock: React.FC<{ dur: number }> = ({ dur }) => {
  const { frame, k, out } = useInOut(dur);
  const minute = frame < 14 ? "59" : "00";
  const hour = frame < 14 ? "16" : "17";
  const tick = interpolate(frame, [14, 22], [1.08, 1], clamp);
  return (
    <div style={{ position: "absolute", top: 300, left: LEFT, opacity: k * (1 - out), transform: `translateX(${(1 - k) * -30}px)` }}>
      <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 24, letterSpacing: 6, color: GOLD_LIGHT }}>ATTERRISSAGE</div>
      <div
        style={{
          fontFamily: SERIF,
          fontWeight: 600,
          fontSize: 132,
          color: IVORY,
          lineHeight: 1.05,
          transform: `scale(${tick})`,
          transformOrigin: "0% 50%",
          textShadow: "0 6px 30px rgba(0,0,0,0.7)",
        }}
      >
        {hour}
        <span style={{ color: GOLD, opacity: frame % 30 < 18 ? 1 : 0.35 }}>:</span>
        {minute}
      </div>
      <div style={{ width: 220, height: 2, background: `linear-gradient(90deg, ${GOLD}, rgba(201,168,106,0))`, marginTop: 6 }} />
    </div>
  );
};

/** Carte « contrat ». struckAt : moment (images locales) où il est barré puis s'envole. */
export const Contract: React.FC<{ dur: number; struckAt?: number; top?: number }> = ({ dur, struckAt, top = 1000 }) => {
  const { frame, fps, k, out } = useInOut(dur);
  const strike = struckAt === undefined ? 0 : interpolate(frame, [struckAt, struckAt + 10], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const fly = struckAt === undefined ? 0 : spring({ frame: frame - struckAt - 18, fps, config: { damping: 30, stiffness: 60 } });
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: LEFT,
        width: 520,
        opacity: k * (1 - out) * (1 - fly * 0.9),
        transform: `translate(${fly * 380}px, ${(1 - k) * 40 - fly * 700}px) rotate(${-3 + fly * 28}deg) scale(${1 - fly * 0.35})`,
        background: "linear-gradient(160deg, #FBF8F1 0%, #EDE6D6 100%)",
        borderRadius: 10,
        padding: "28px 32px 30px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
        color: "#1A1714",
      }}
    >
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 8 }}>CONTRAT</div>
      <div style={{ width: 60, height: 2, background: GOLD, margin: "12px 0 16px" }} />
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 30, lineHeight: 1.3 }}>Signature à bord du jet</div>
      <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, letterSpacing: 2, marginTop: 10, color: "#6B6256" }}>
        AUJOURD'HUI · 17:00 · M. BENALI
      </div>
      {[0, 1].map((i) => (
        <div key={i} style={{ height: 2, background: "rgba(26,23,20,0.18)", marginTop: 16, width: i ? "55%" : "85%" }} />
      ))}
      {/* sceau doré */}
      <div
        style={{
          position: "absolute",
          right: 26,
          bottom: 22,
          width: 74,
          height: 74,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, ${GOLD_LIGHT}, ${GOLD} 60%, #9C7D45)`,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      />
      {/* trait qui barre */}
      {strike > 0 && (
        <svg style={{ position: "absolute", inset: 0 }} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="6" y1="88" x2={6 + 88 * strike} y2={88 - 76 * strike} stroke="#B3261E" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      <Shine at={10} />
    </div>
  );
};

/** Question finale : deux camps, pour les commentaires. */
export const Poll: React.FC<{ dur: number }> = ({ dur }) => {
  const { frame, fps, k, out } = useInOut(dur);
  const opt = (i: number) => spring({ frame: frame - 14 - i * 8, fps, config: { damping: 200, stiffness: 130 }, durationInFrames: 14 });
  const pulse = 1 + 0.02 * Math.sin(frame / 6);
  const Option = ({ i, letter, text }: { i: number; letter: string; text: string }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginTop: 18,
        opacity: opt(i),
        transform: `translateX(${(1 - opt(i)) * -30}px)`,
        ...glass,
        borderRadius: 18,
        padding: "18px 24px",
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          border: `2px solid ${GOLD}`,
          color: GOLD_LIGHT,
          fontFamily: SERIF,
          fontWeight: 600,
          fontSize: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {letter}
      </div>
      <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 32, color: IVORY, lineHeight: 1.25 }}>{text}</div>
    </div>
  );
  return (
    <div style={{ position: "absolute", top: 860, left: LEFT, width: 760, opacity: 1 - out }}>
      <div style={{ opacity: k, transform: `translateY(${(1 - k) * 20}px)` }}>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 24, letterSpacing: 6, color: GOLD_LIGHT }}>ET TOI ?</div>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 50, color: IVORY, lineHeight: 1.2, marginTop: 8, textShadow: "0 3px 18px rgba(0,0,0,0.8)" }}>
          À la place de Karim…
        </div>
      </div>
      <Option i={0} letter="A" text="Je lui laisse une seconde chance" />
      <Option i={1} letter="B" text="Je pars avec mon père sans me retourner" />
      <div
        style={{
          marginTop: 22,
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 26,
          color: GOLD_LIGHT,
          opacity: opt(2),
          transform: `scale(${pulse})`,
          transformOrigin: "0% 50%",
        }}
      >
        Réponds A ou B en commentaire ↓
      </div>
    </div>
  );
};

/** Mention de test (vidéo d'un autre compte : ne pas publier). */
export const TestMark: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 236,
      right: 200,
      fontFamily: SANS,
      fontWeight: 800,
      fontSize: 22,
      letterSpacing: 4,
      color: "rgba(255,255,255,0.55)",
      border: "1px solid rgba(255,255,255,0.35)",
      borderRadius: 8,
      padding: "6px 12px",
    }}
  >
    TEST · NE PAS PUBLIER
  </div>
);
