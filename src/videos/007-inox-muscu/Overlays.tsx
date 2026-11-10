import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import { VIDEO_BOTTOM, VIDEO_TOP } from "./Clip";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const RED = theme.colors.red;

// Zones TikTok à laisser libres (voir videos/README.md) : haut < 280 px, droite > 900 px, bas > 1450 px.
// L'habillage se place dans les bandes au-dessus (280 → 560) et au-dessous (1350 → 1450) de l'image,
// petit et à gauche : il ne cache jamais les mouvements.
const TOP_Y = 290;
const LOW_Y = VIDEO_BOTTOM + 16; // ~1366
const LEFT = 60;

const TITLE: React.CSSProperties = {
  fontFamily: theme.fonts.title,
  color: "#fff",
  lineHeight: 0.98,
  textTransform: "uppercase",
  textShadow: "0 4px 0 rgba(0,0,0,0.55), 0 0 24px rgba(0,0,0,0.7)",
};

const usePop = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const s = spring({ frame: Math.max(f, 0), fps, config: { damping: 12, stiffness: 220 } });
  return { f, scale: interpolate(s, [0, 1], [1.8, 1]), opacity: interpolate(f, [0, 3], [0, 1], clamp), blur: interpolate(f, [0, 5], [8, 0], clamp) };
};

/** Mot qui « claque », aligné à gauche */
const Slam: React.FC<{ text: string; delay: number; size: number; color?: string; box?: boolean }> = ({ text, delay, size, color = "#fff", box }) => {
  const { f, scale, opacity, blur } = usePop(delay);
  if (f < 0) return null;
  return (
    <div
      style={{
        ...TITLE,
        fontSize: size,
        color: box ? "#fff" : color,
        transform: `scale(${scale})`,
        transformOrigin: "left center",
        opacity,
        filter: `blur(${blur}px)`,
        background: box ? RED : undefined,
        padding: box ? "4px 18px 0" : undefined,
        alignSelf: "flex-start",
        marginTop: 14,
      }}
    >
      {text}
    </div>
  );
};

const TopBlock: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ position: "absolute", left: LEFT, top: TOP_Y, display: "flex", flexDirection: "column", ...style }}>{children}</div>
);

/** Petite étiquette sous l'image (à gauche, au-dessus de la légende TikTok) */
const Chip: React.FC<{ children: React.ReactNode; bg?: string; border?: string; opacity?: number; scale?: number }> = ({ children, bg = "rgba(0,0,0,0.7)", border = RED, opacity = 1, scale = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: LEFT,
      top: LOW_Y,
      fontFamily: theme.fonts.body,
      fontWeight: 800,
      fontSize: 34,
      color: "#fff",
      background: bg,
      border: `3px solid ${border}`,
      borderRadius: 12,
      padding: "8px 20px",
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: "left center",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

/** Accroche (0 → 6 temps) */
export const HookTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const blink = Math.floor(frame / 6) % 2 === 0 ? 1 : 0.4;
  return (
    <AbsoluteFill>
      <TopBlock>
        <Slam text="LE NOUVEAU PHYSIQUE" delay={0} size={72} />
        <Slam text="D'INOX" delay={7} size={118} box />
      </TopBlock>
      {frame >= 18 && <Chip opacity={blink}>⚠️ RESTE JUSQU'À LA FIN</Chip>}
    </AbsoluteFill>
  );
};

/** « Mais d'abord… la séance » au premier drop */
export const MaisDabord: React.FC = () => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [16, 22], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <TopBlock>
        <Slam text="MAIS D'ABORD…" delay={0} size={80} />
        <Slam text="LA SÉANCE" delay={4} size={110} color={RED} />
      </TopBlock>
    </AbsoluteFill>
  );
};

/** Titre d'exercice en haut à gauche (numéro + nom) */
export const ChapterTitle: React.FC<{ num: string; label: string; duration: number }> = ({ num, label, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14, stiffness: 160 } });
  const out = interpolate(frame, [duration - 5, duration], [1, 0], clamp);
  const x = interpolate(s, [0, 1], [-700, 0]);
  const bar = interpolate(frame, [4, 16], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <TopBlock style={{ transform: `translateX(${x}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontFamily: theme.fonts.title, fontSize: 50, color: "#fff", background: RED, padding: "2px 12px 0", lineHeight: 1.05 }}>{num}</div>
          <div style={{ fontFamily: theme.fonts.body, fontWeight: 800, fontSize: 28, color: "rgba(255,255,255,0.8)", letterSpacing: 5 }}>EXERCICE</div>
        </div>
        <div style={{ ...TITLE, fontSize: label.length > 16 ? 72 : 84, marginTop: 10 }}>{label}</div>
        <div style={{ height: 6, width: 420 * bar, background: RED, marginTop: 10 }} />
      </TopBlock>
    </AbsoluteFill>
  );
};

/** Petite phrase sous l'image, à gauche */
export const Punch: React.FC<{ text: string; accent?: string; duration: number }> = ({ text, accent, duration }) => {
  const frame = useCurrentFrame();
  const { scale, opacity } = usePop(0);
  const out = interpolate(frame, [duration - 4, duration], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: opacity * out }}>
      <div style={{ position: "absolute", left: LEFT, top: LOW_Y - 4, transform: `scale(${scale})`, transformOrigin: "left center" }}>
        <div style={{ ...TITLE, fontSize: 64 }}>
          {text}
          {accent && <span style={{ color: RED }}> {accent}</span>}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Rappel « le résultat arrive » (rétention), sous le titre d'exercice */
export const Teaser: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  const glow = 0.75 + 0.25 * Math.sin(frame / 3);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: LEFT,
          top: VIDEO_TOP - 62,
          transform: `scale(${s})`,
          transformOrigin: "left center",
          fontFamily: theme.fonts.body,
          fontWeight: 800,
          fontSize: 28,
          color: "#fff",
          background: RED,
          borderRadius: 10,
          padding: "6px 16px",
          opacity: glow,
        }}
      >
        LE RÉSULTAT ARRIVE 👀
      </div>
    </AbsoluteFill>
  );
};

/** Break : « Et maintenant… le résultat » (en haut, l'image reste visible) */
export const ResultBuild: React.FC = () => {
  const frame = useCurrentFrame();
  const flick = frame > 36 && frame % 4 < 2 ? 0.55 : 1;
  return (
    <AbsoluteFill style={{ opacity: flick }}>
      <TopBlock>
        <Slam text="ET MAINTENANT…" delay={0} size={76} />
        <Slam text="LE RÉSULTAT" delay={12} size={118} color={RED} />
      </TopBlock>
    </AbsoluteFill>
  );
};

/** Titre sur les plans du vestiaire */
export const ResultFrame: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 13 } });
  return (
    <AbsoluteFill>
      <TopBlock style={{ transform: `scale(${s})`, transformOrigin: "left center" }}>
        <div style={{ fontFamily: theme.fonts.body, fontWeight: 800, fontSize: 28, color: "rgba(255,255,255,0.8)", letterSpacing: 5 }}>APRÈS LA SÉANCE</div>
        <div style={{ ...TITLE, fontSize: 110, color: RED, marginTop: 16 }}>LE RÉSULTAT</div>
      </TopBlock>
    </AbsoluteFill>
  );
};

/** Fin : question pour les commentaires */
export const OutroCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.03 * Math.sin(frame / 3);
  return (
    <AbsoluteFill>
      <TopBlock>
        <Slam text="QUI A LE MEILLEUR" delay={0} size={72} />
        <Slam text="PHYSIQUE ?" delay={5} size={118} box />
      </TopBlock>
      {frame >= 10 && (
        <Chip border="#fff" scale={pulse}>
          💬 RÉPONDS EN COMMENTAIRE
        </Chip>
      )}
    </AbsoluteFill>
  );
};
