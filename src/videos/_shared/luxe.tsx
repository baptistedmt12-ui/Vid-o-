import React from "react";
import { AbsoluteFill, Easing, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, sec, useG } from "./kit";

// Habillage « luxe épuré » : verre fumé, filet doré, serif élégante.
// Tout reste dans la zone sûre TikTok : x 70 → 900, y 290 → 1420.

export const GOLD = "#D9BD84";
export const INK = "#141416";
export const SANS = "Inter, Arial, sans-serif";
export const SERIF = "'Playfair Display', Georgia, serif";
export const HAND = "Caveat, cursive";
export const L = 70; // marge gauche
export const RED_SOFT = "#E5484D";
export const GREEN_SOFT = "#3DD68C";

export const glass: React.CSSProperties = {
  background: "rgba(16,16,18,0.66)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1.5px solid rgba(255,255,255,0.14)",
  boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
  color: "#fff",
};

/* ------------------------------------------------------------------ animation */

/** Entrée douce (ressort) à la seconde t du rush (début du bloc par défaut). */
export const useIn = (t?: number, damping = 18, stiffness = 150) => {
  const { frame, at, fps, exit } = useG();
  const f = frame - (t === undefined ? 0 : at(t));
  const k = spring({ frame: f, fps, config: { damping, stiffness } });
  return { k, exit, f };
};

/** Bloc positionné qui glisse depuis la gauche en se défloutant. */
export const Box: React.FC<{
  top: number;
  left?: number;
  width?: number;
  t?: number;
  rotate?: number;
  origin?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ top, left = L, width, t, rotate = 0, origin = "0% 50%", children, style }) => {
  const { k, exit, f } = useIn(t);
  if (f < 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        opacity: Math.min(1, k * 1.4) * (1 - exit),
        filter: `blur(${(1 - Math.min(1, k)) * 10 + exit * 8}px)`,
        transform: `translateX(${(1 - k) * -46 - exit * 30}px) scale(${0.94 + 0.06 * k}) rotate(${rotate}deg)`,
        transformOrigin: origin,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Apparition d'un élément interne (ligne, mot) à la seconde t. */
export const Appear: React.FC<{ t: number; children: React.ReactNode; dy?: number; style?: React.CSSProperties }> = ({
  t,
  children,
  dy = 14,
  style,
}) => {
  const { k, f } = useIn(t, 16, 170);
  return (
    <div
      style={{
        opacity: f < 0 ? 0 : Math.min(1, k * 1.5),
        transform: `translateY(${(1 - k) * dy}px)`,
        filter: `blur(${(1 - Math.min(1, k)) * 6}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ icônes */

type IP = { size?: number; color?: string };
const S: React.FC<IP & { children: React.ReactNode; vb?: string }> = ({ size = 34, color = GOLD, children, vb = "0 0 24 24" }) => (
  <svg width={size} height={size} viewBox={vb} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);
export const I = {
  phone: (p: IP) => (
    <S {...p}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </S>
  ),
  play: (p: IP) => (
    <S {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M10 8.5v7l6-3.5z" fill={p.color ?? GOLD} />
    </S>
  ),
  moon: (p: IP) => (
    <S {...p}>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </S>
  ),
  cal: (p: IP) => (
    <S {...p}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </S>
  ),
  plane: (p: IP) => (
    <S {...p}>
      <path d="M21 15.5v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V8.5l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-5z" />
    </S>
  ),
  warn: (p: IP) => (
    <S {...p}>
      <path d="M12 3.5 2.5 20h19z" />
      <path d="M12 10v4.5M12 17.2v.3" />
    </S>
  ),
  pin: (p: IP) => (
    <S {...p}>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </S>
  ),
  book: (p: IP) => (
    <S {...p}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8M8 10.5h6" />
    </S>
  ),
  wrench: (p: IP) => (
    <S {...p}>
      <path d="M14.5 6.5a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9a4 4 0 0 1-2-2z" />
    </S>
  ),
  spray: (p: IP) => (
    <S {...p}>
      <path d="M8 9h6v12H8zM9 9V6h4v3M13 6h3l2-2M17 7.5h2M17 10h2.5" />
    </S>
  ),
  people: (p: IP) => (
    <S {...p}>
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M5 20.5a7 7 0 0 1 14 0" />
    </S>
  ),
  key: (p: IP) => (
    <S {...p}>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l8-8M16 7l2.5 2.5M14 9l2 2" />
    </S>
  ),
  target: (p: IP) => (
    <S {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.8" fill={p.color ?? GOLD} />
    </S>
  ),
  euro: (p: IP) => (
    <S {...p}>
      <path d="M17.5 6.5A7 7 0 1 0 17.5 17.5M4 10.5h9M4 13.5h9" />
    </S>
  ),
  tag: (p: IP) => (
    <S {...p}>
      <path d="M3 12V4h8l10 10-8 8z" />
      <circle cx="7.5" cy="8" r="1.4" />
    </S>
  ),
};

export const IconRing: React.FC<{ size?: number; children: React.ReactNode; fill?: string }> = ({ size = 64, children, fill }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size,
      border: `1.5px solid ${GOLD}`,
      background: fill ?? "rgba(217,189,132,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

/** Petit libellé doré en capitales espacées. */
export const Label: React.FC<{ children: React.ReactNode; color?: string; size?: number }> = ({ children, color = GOLD, size = 21 }) => (
  <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: size, letterSpacing: 5, color, textTransform: "uppercase" }}>{children}</div>
);

/* ------------------------------------------------------------------ composants */

/** Étiquette en verre : icône + libellé + texte (+ sous-texte qui arrive à subT). */
export const Tag: React.FC<{
  top: number;
  left?: number;
  t?: number;
  icon?: React.ReactNode;
  label?: string;
  text: React.ReactNode;
  sub?: React.ReactNode;
  subT?: number;
  size?: number;
  maxWidth?: number;
}> = ({ top, left, t, icon, label, text, sub, subT, size = 36, maxWidth = 760 }) => (
  <Box top={top} left={left} t={t}>
    <div style={{ ...glass, display: "inline-flex", alignItems: "center", gap: 20, borderRadius: 26, padding: icon ? "16px 30px 16px 16px" : "16px 30px", maxWidth }}>
      {icon && <IconRing>{icon}</IconRing>}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {label && <Label>{label}</Label>}
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: size, lineHeight: 1.18 }}>{text}</div>
        {sub &&
          (subT === undefined ? (
            <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: size * 0.72, color: "rgba(255,255,255,0.7)" }}>{sub}</div>
          ) : (
            <Appear t={subT}>
              <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: size * 0.72, color: "rgba(255,255,255,0.7)" }}>{sub}</div>
            </Appear>
          ))}
      </div>
    </div>
  </Box>
);

/** Grand chiffre en serif doré qui défile. */
export const BigNumber: React.FC<{ top: number; t0: number; t1: number; to: number; suffix?: string; label?: string; sub?: string; subT?: number; size?: number }> = ({
  top,
  t0,
  t1,
  to,
  suffix = "",
  label,
  sub,
  subT,
  size = 116,
}) => {
  const { lin } = useG();
  const v = Math.round(to * lin(t0, t1, Easing.out(Easing.cubic)));
  const txt = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (
    <Box top={top}>
      {label && <Label>{label}</Label>}
      <div
        style={{
          fontFamily: SERIF,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.05,
          color: "#fff",
          textShadow: "0 6px 30px rgba(0,0,0,0.6)",
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
        }}
      >
        {txt}
        <span style={{ color: GOLD }}>{suffix}</span>
      </div>
      <GoldRule t={t1} width={300} />
      {sub && (
        <Appear t={subT ?? t1}>
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 32, color: "rgba(255,255,255,0.88)", marginTop: 10, textShadow: "0 3px 16px rgba(0,0,0,0.7)" }}>{sub}</div>
        </Appear>
      )}
    </Box>
  );
};

/** Filet doré qui se trace. */
export const GoldRule: React.FC<{ t?: number; width?: number }> = ({ t, width = 240 }) => {
  const { k, f } = useIn(t, 22, 90);
  return <div style={{ height: 2, width: f < 0 ? 0 : width * k, background: `linear-gradient(90deg, ${GOLD}, rgba(217,189,132,0))`, marginTop: 10 }} />;
};

export type RowT = { t: number; text: React.ReactNode; mark?: "check" | "cross" | "dot" | "warn" };

const Mark: React.FC<{ kind: RowT["mark"]; t: number }> = ({ kind, t }) => {
  const { k } = useIn(t + 0.08, 12, 200);
  const c = kind === "check" ? GREEN_SOFT : kind === "cross" || kind === "warn" ? RED_SOFT : GOLD;
  return (
    <svg width={38} height={38} viewBox="0 0 38 38" style={{ flexShrink: 0 }}>
      <circle cx={19} cy={19} r={17} stroke={c} strokeWidth={2} fill={kind === "dot" ? "none" : `${c}22`} opacity={Math.min(1, k * 2)} />
      {kind === "check" && <path d="M11 19.5l5.5 5.5L27 14" stroke={c} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={30} strokeDashoffset={30 * (1 - k)} />}
      {kind === "cross" && <path d="M13 13l12 12M25 13L13 25" stroke={c} strokeWidth={3} strokeLinecap="round" strokeDasharray={18} strokeDashoffset={18 * (1 - k)} />}
      {kind === "warn" && <path d="M19 11v9M19 25.5v.5" stroke={c} strokeWidth={3.2} strokeLinecap="round" opacity={k} />}
      {kind === "dot" && <circle cx={19} cy={19} r={5 * k} fill={c} />}
    </svg>
  );
};

/** Carte verre : libellé + lignes qui arrivent une à une. */
export const ListCard: React.FC<{ top: number; left?: number; t?: number; label?: string; rows: RowT[]; size?: number; width?: number }> = ({
  top,
  left,
  t,
  label,
  rows,
  size = 34,
  width,
}) => (
  <Box top={top} left={left} t={t} width={width}>
    <div style={{ ...glass, borderRadius: 26, padding: "22px 30px 24px", display: "inline-flex", flexDirection: "column", gap: 14 }}>
      {label && <Label>{label}</Label>}
      {rows.map((r, i) => (
        <Appear key={i} t={r.t} dy={0} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {r.mark && <Mark kind={r.mark} t={r.t} />}
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: size, lineHeight: 1.2 }}>{r.text}</div>
        </Appear>
      ))}
    </div>
  </Box>
);

export type Msg = { t: number; text: string; me?: boolean };

/** Conversation façon messagerie. `big` = moment fort (grand mais bref). */
export const Chat: React.FC<{ top: number; msgs: Msg[]; big?: boolean; header?: string; headerSub?: string; width?: number }> = ({
  top,
  msgs,
  big,
  header,
  headerSub,
  width,
}) => {
  const W = width ?? (big ? 830 : 620);
  const fs = big ? 46 : 33;
  return (
    <Box top={top} width={W} origin="0% 0%">
      <div style={{ ...glass, borderRadius: 34, padding: big ? "26px 28px 30px" : "18px 20px 22px", display: "flex", flexDirection: "column", gap: big ? 16 : 12 }}>
        {header && (
          <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: big ? 14 : 8, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <div
              style={{
                width: big ? 66 : 50,
                height: big ? 66 : 50,
                borderRadius: 100,
                background: `linear-gradient(135deg, ${GOLD}, #8a7346)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: SERIF,
                fontWeight: 700,
                fontSize: big ? 32 : 24,
                color: INK,
              }}
            >
              {header[0]}
            </div>
            <div>
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: big ? 32 : 25 }}>{header}</div>
              {headerSub && <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: big ? 22 : 18, color: "rgba(255,255,255,0.55)" }}>{headerSub}</div>}
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <Bubble key={i} m={m} fs={fs} />
        ))}
      </div>
    </Box>
  );
};

const Bubble: React.FC<{ m: Msg; fs: number }> = ({ m, fs }) => {
  const { k, f } = useIn(m.t, 14, 200);
  if (f < 0) return null;
  return (
    <div
      style={{
        alignSelf: m.me ? "flex-end" : "flex-start",
        maxWidth: "86%",
        background: m.me ? GOLD : "rgba(255,255,255,0.13)",
        color: m.me ? INK : "#fff",
        fontFamily: SANS,
        fontWeight: 600,
        fontSize: fs,
        lineHeight: 1.25,
        padding: `${fs * 0.36}px ${fs * 0.55}px`,
        borderRadius: fs * 0.75,
        borderBottomLeftRadius: m.me ? fs * 0.75 : 8,
        borderBottomRightRadius: m.me ? 8 : fs * 0.75,
        transform: `scale(${0.6 + 0.4 * k})`,
        transformOrigin: m.me ? "100% 100%" : "0% 100%",
        opacity: Math.min(1, k * 2),
      }}
    >
      {m.text.replace(/ ([?!:;])/g, " $1")}
    </div>
  );
};

/** Appel entrant. */
export const CallCard: React.FC<{ top: number; name: string; sub: string; t?: number }> = ({ top, name, sub, t }) => {
  const { frame } = useG();
  const ring = (frame % 24) / 24;
  return (
    <Box top={top} t={t}>
      <div style={{ ...glass, display: "inline-flex", alignItems: "center", gap: 20, borderRadius: 30, padding: "16px 34px 16px 16px" }}>
        <div style={{ position: "relative", width: 68, height: 68 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 100, border: `2px solid ${GREEN_SOFT}`, transform: `scale(${1 + ring * 0.5})`, opacity: 1 - ring }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 100, background: GREEN_SOFT, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {I.phone({ size: 34, color: "#fff" })}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 34 }}>{name}</div>
          <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 24, color: "rgba(255,255,255,0.6)" }}>{sub}</div>
        </div>
      </div>
    </Box>
  );
};

/** Page de carnet manuscrite. `shaky` = écriture qui tremble. */
export const Note: React.FC<{
  top: number;
  left?: number;
  width?: number;
  header?: string;
  lines: { t: number; text: string }[];
  size?: number;
  shaky?: boolean;
  rotate?: number;
}> = ({ top, left, width = 640, header, lines, size = 50, shaky, rotate = -1.5 }) => {
  const { frame } = useG();
  const lh = size * 1.22;
  return (
    <Box top={top} left={left} width={width} rotate={rotate} origin="0% 0%">
      <div
        style={{
          background: "#F2EADB",
          borderRadius: 10,
          padding: `${size * 0.5}px ${size * 0.7}px ${size * 0.6}px ${size * 1.1}px`,
          boxShadow: "0 22px 60px rgba(0,0,0,0.55)",
          position: "relative",
          backgroundImage: `repeating-linear-gradient(180deg, transparent 0 ${lh - 2}px, rgba(70,90,140,0.22) ${lh - 2}px ${lh}px)`,
          backgroundPosition: `0 ${size * 0.5 + 6}px`,
        }}
      >
        <div style={{ position: "absolute", left: size * 0.75, top: 0, bottom: 0, width: 2, background: "rgba(200,70,70,0.45)" }} />
        {header && (
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: size * 0.4, letterSpacing: 4, color: "#8a7a5c", marginBottom: size * 0.1, lineHeight: `${lh * 0.8}px` }}>
            {header}
          </div>
        )}
        {lines.map((l, i) => (
          <Ink key={i} t={l.t} text={l.text} size={size} lh={lh} shaky={shaky} frame={frame} seed={i} />
        ))}
      </div>
    </Box>
  );
};

const Ink: React.FC<{ t: number; text: string; size: number; lh: number; shaky?: boolean; frame: number; seed: number }> = ({ t, text, size, lh, shaky, frame, seed }) => {
  const { at, fps } = useG();
  const f = frame - at(t);
  // écriture de gauche à droite
  const n = text.length;
  const shown = Math.max(0, Math.min(n, Math.floor((f / (fps * 0.034)) | 0)));
  const jitter = shaky ? Math.sin(frame * 1.7 + seed) * 1.3 : 0;
  return (
    <div
      style={{
        fontFamily: HAND,
        fontWeight: 600,
        fontSize: size,
        lineHeight: `${lh}px`,
        color: "#1d2a4a",
        transform: `translateY(${jitter}px) rotate(${shaky ? Math.sin(frame * 0.9 + seed * 2) * 0.4 : 0}deg)`,
        minHeight: lh,
      }}
    >
      {f < 0 ? "" : text.slice(0, shown)}
    </div>
  );
};

/** Appel à l'action discret (bas gauche, hors interface TikTok). */
export const CTA: React.FC<{ kind: "like" | "share" | "comment"; text: string; top?: number }> = ({ kind, text, top = 1230 }) => {
  const { frame, fps } = useG();
  const beat = spring({ frame: frame - 12, fps, config: { damping: 7, stiffness: 260 } });
  const pulse = 1 + 0.12 * Math.max(0, Math.sin((frame - 12) / 5)) * Math.exp(-Math.max(0, frame - 12) / 25);
  const icon =
    kind === "like" ? (
      <svg width={40} height={40} viewBox="0 0 24 24">
        <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" fill="#FE2C55" />
      </svg>
    ) : kind === "share" ? (
      <svg width={40} height={40} viewBox="0 0 24 24">
        <path d="M14 4l7 7-7 7v-4c-5 0-8 1.5-10 5 .5-6 3.5-10 10-11z" fill="#FFC300" />
      </svg>
    ) : (
      <svg width={40} height={40} viewBox="0 0 24 24">
        <path d="M12 3c5 0 9 3.4 9 7.6s-4 7.6-9 7.6c-1 0-2-.1-2.9-.4L4 20l1.4-4A7.2 7.2 0 0 1 3 10.6C3 6.4 7 3 12 3z" fill="#fff" />
      </svg>
    );
  return (
    <Box top={top}>
      <div style={{ ...glass, display: "inline-flex", alignItems: "center", gap: 16, borderRadius: 100, padding: "12px 30px 12px 14px" }}>
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: 62,
            background: "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${(0.5 + 0.5 * beat) * pulse})`,
          }}
        >
          {icon}
        </div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 31 }}>{text}</div>
      </div>
    </Box>
  );
};

/** Sondage final : question + Oui / Non. */
export const Poll: React.FC<{ top: number; q: string; t?: number; optsT?: number }> = ({ top, q, t, optsT }) => (
  <Box top={top} t={t} width={740}>
    <div style={{ ...glass, borderRadius: 30, padding: "24px 28px 26px", display: "flex", flexDirection: "column", gap: 18 }}>
      <Label>Dis-le en commentaire</Label>
      <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 46, lineHeight: 1.15 }}>{q.replace(/ \?/g, " ?")}</div>
      <Appear t={optsT ?? 0} style={{ display: "flex", gap: 16 }}>
        {["Oui", "Non"].map((o) => (
          <div
            key={o}
            style={{
              flex: 1,
              textAlign: "center",
              border: `1.5px solid ${o === "Oui" ? GOLD : "rgba(255,255,255,0.35)"}`,
              color: o === "Oui" ? GOLD : "#fff",
              borderRadius: 100,
              padding: "12px 0",
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 32,
            }}
          >
            {o}
          </div>
        ))}
      </Appear>
    </div>
  </Box>
);

/** Phrase en serif italique (sans fond), mot à mot. */
export const SerifLine: React.FC<{ top: number; parts: { t: number; text: string; gold?: boolean }[]; size?: number; left?: number; width?: number }> = ({
  top,
  parts,
  size = 64,
  left = L,
  width = 800,
}) => (
  <Box top={top} left={left} width={width} style={{ background: "radial-gradient(ellipse at 35% 50%, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0) 72%)", padding: "18px 10px" }}>
    {parts.map((p, i) => (
      <Appear key={i} t={p.t}>
        <div
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: size,
            lineHeight: 1.15,
            color: p.gold ? GOLD : "#fff",
            textShadow: "0 4px 26px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.6)",
          }}
        >
          {p.text}
        </div>
      </Appear>
    ))}
  </Box>
);

/* ------------------------------------------------------------------ image */

export type Punch = { t: number; s: number };

/**
 * Rush original affiché tel quel : aucun filtre, aucun zoom, aucun flou (qualité d'origine intacte).
 * Seul effet : le miroir (inversion gauche/droite) sur les plages `mirrors` (secondes), en coupe franche.
 */
export const LuxeFootage: React.FC<{ video: string; mirrors: [number, number][] }> = ({ video, mirrors }) => {
  const frame = useCurrentFrame();
  const mirrored = mirrors.some(([a, b]) => frame >= sec(a) && frame < sec(b));
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0D", overflow: "hidden" }}>
      <OffthreadVideo
        src={staticFile(video)}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: mirrored ? "scaleX(-1)" : undefined }}
      />
    </AbsoluteFill>
  );
};
