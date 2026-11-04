import {
  AbsoluteFill,
  Audio,
  Freeze,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../../theme";

/*
 * Vidéo 006 — On Air (Chambly) : annonce du défi 15 / 15 / 15 dans la voiture.
 * Rush 1080×1920 à 60 i/s, 9,1 s. Graphiques calés au mot près sur la voix
 * (transcription Whisper) et placés dans la zone vide du plafond de la voiture,
 * au-dessus de la tête, hors des zones TikTok.
 *
 * Transcription :
 * « Ok les gars, direction le On Air de Chambly, on va tester le set le plus dur
 *   du Street Workout, le 15, 15, 15. En gros c'est quoi ? 15 muscle-ups, 15 dips,
 *   15 tractions sans lâcher la barre. »
 */
export const FPS = 60;
const SOURCE = staticFile("006-on-air-chambly/rushes/original.mov");
const sfx = (n: string) => staticFile(`006-on-air-chambly/assets/${n}`);

const VIDEO_SECONDS = 9.08;
const HOLD_SECONDS = 0.6;
export const TOTAL_FRAMES = Math.round((VIDEO_SECONDS + HOLD_SECONDS) * FPS);

/** Instants des mots (secondes) */
const T = {
  direction: 0.46,
  onAir: 0.9,
  chambly: 1.38,
  tester: 1.84,
  plusDur: 2.52,
  dur: 2.64,
  street: 3.1,
  n1: 3.92,
  n2: 4.32,
  n3: 4.58,
  cestQuoi: 5.04,
  muscleUps: 5.64,
  dips: 6.46,
  tractions: 7.06,
  sansLacher: 7.44,
  barre: 8.22,
  bite: 8.75,
};

const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Zone de travail : plafond de la voiture, sous la barre TikTok, à gauche des boutons */
const ZONE = { top: 300, left: 44, right: 180 };

const useSpringAt = (t: number, cfg = { damping: 12, stiffness: 200 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame >= f(t) ? spring({ frame: frame - f(t), fps, config: cfg }) : 0;
};

/* ---------- 1. « Direction le On Air de Chambly » ---------- */

/** Trajet en pointillés qui se dessine puis épingle qui tombe */
const RouteToGym: React.FC<{ out: number }> = ({ out }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [f(T.direction), f(T.onAir)], [0, 1], clamp);
  const pin = useSpringAt(T.onAir, { damping: 10, stiffness: 220 });
  const city = useSpringAt(T.chambly, { damping: 200, stiffness: 200 });
  const path = "M20 150 C 140 150, 160 40, 300 70 S 470 160, 560 80";
  const len = 640;
  return (
    <div style={{ position: "absolute", top: ZONE.top + 60, left: ZONE.left, opacity: 1 - out }}>
      <svg width="700" height="200" viewBox="0 0 700 200" style={{ overflow: "visible" }}>
        <path
          d={path}
          fill="none"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={len}
          strokeDashoffset={len * (1 - draw)}
        />
        <path
          d={path}
          fill="none"
          stroke={theme.colors.red}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="2 18"
          style={{ clipPath: `inset(0 ${100 - draw * 100}% 0 0)` }}
        />
        <circle cx="20" cy="150" r={10 * Math.min(1, draw * 5)} fill={theme.colors.white} stroke={theme.colors.red} strokeWidth="4" />
        {/* Épingle */}
        <g transform={`translate(560 ${80 - interpolate(pin, [0, 1], [120, 0])}) scale(${pin})`}>
          <path d="M0 0 C -26 -30, -30 -60, 0 -70 C 30 -60, 26 -30, 0 0 Z" fill={theme.colors.red} />
          <circle cx="0" cy="-46" r="10" fill={theme.colors.white} />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 300,
          transform: `scale(${pin})`,
          transformOrigin: "left top",
        }}
      >
        <div style={{ fontFamily: theme.fonts.title, fontSize: 84, lineHeight: 1, color: theme.colors.white, textShadow: "0 4px 18px rgba(0,0,0,0.45)" }}>
          ON AIR
        </div>
        <div
          style={{
            fontFamily: theme.fonts.body,
            fontWeight: 800,
            fontSize: 34,
            letterSpacing: 6,
            color: theme.colors.white,
            backgroundColor: theme.colors.red,
            padding: "2px 12px",
            borderRadius: 6,
            display: "inline-block",
            marginTop: 6,
            opacity: city,
            transform: `translateY(${interpolate(city, [0, 1], [10, 0])}px)`,
          }}
        >
          CHAMBLY
        </div>
      </div>
    </div>
  );
};

/** Pastille « ● ON AIR · Chambly » rangée en haut à gauche pour le reste de la vidéo */
const LocationChip: React.FC = () => {
  const frame = useCurrentFrame();
  const a = useSpringAt(T.tester - 0.12, { damping: 200, stiffness: 200 });
  const blink = 0.55 + 0.45 * Math.abs(Math.sin(frame / 18));
  return (
    <div
      style={{
        position: "absolute",
        top: ZONE.top,
        left: ZONE.left,
        opacity: a,
        transform: `translateY(${interpolate(a, [0, 1], [-20, 0])}px)`,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "6px 16px 6px 12px",
        borderRadius: 12,
        backgroundColor: "rgba(0,0,0,0.6)",
        border: `2px solid ${theme.colors.red}`,
      }}
    >
      <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: theme.colors.red, opacity: blink, boxShadow: `0 0 10px ${theme.colors.red}` }} />
      <span style={{ fontFamily: theme.fonts.title, fontSize: 38, color: theme.colors.white, letterSpacing: 1 }}>ON AIR</span>
      <span style={{ fontFamily: theme.fonts.body, fontWeight: 600, fontSize: 24, color: "rgba(255,255,255,0.85)" }}>· Chambly</span>
    </div>
  );
};

/* ---------- 2. « Le set le plus dur du Street Workout » ---------- */

const HardestSet: React.FC<{ out: number }> = ({ out }) => {
  const frame = useCurrentFrame();
  const title = useSpringAt(T.plusDur - 0.1);
  const sub = useSpringAt(T.street, { damping: 200, stiffness: 200 });
  // Jauge de difficulté qui se remplit jusqu'au maximum sur « dur »
  const fill = interpolate(frame, [f(T.plusDur), f(T.dur + 0.25)], [0, 5], clamp);
  const maxed = frame >= f(T.dur + 0.25);
  const shake = maxed ? Math.sin(frame * 1.7) * interpolate(frame - f(T.dur + 0.25), [0, 18], [6, 0], clamp) : 0;
  return (
    <div style={{ position: "absolute", top: ZONE.top + 90, left: ZONE.left, opacity: 1 - out, transform: `translateY(${-40 * out}px)` }}>
      <div style={{ fontFamily: theme.fonts.title, fontSize: 92, lineHeight: 1, color: theme.colors.white, transform: `scale(${interpolate(title, [0, 1], [1.6, 1])})`, transformOrigin: "left center", opacity: title > 0 ? 1 : 0, textShadow: "0 4px 18px rgba(0,0,0,0.45)" }}>
        LE SET LE PLUS <span style={{ color: theme.colors.red }}>DUR</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14, transform: `translateX(${shake}px)`, opacity: title > 0 ? 1 : 0 }}>
        <span style={{ fontFamily: theme.fonts.body, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: theme.colors.white, backgroundColor: "rgba(0,0,0,0.55)", padding: "4px 10px", borderRadius: 6 }}>
          DIFFICULTÉ
        </span>
        {[0, 1, 2, 3, 4].map((i) => {
          const on = Math.min(1, Math.max(0, fill - i));
          return (
            <div key={i} style={{ width: 54, height: 22, borderRadius: 5, backgroundColor: "rgba(0,0,0,0.35)", overflow: "hidden" }}>
              <div style={{ width: `${on * 100}%`, height: "100%", backgroundColor: theme.colors.red, boxShadow: maxed ? `0 0 14px ${theme.colors.red}` : "none" }} />
            </div>
          );
        })}
        {maxed && (
          <span style={{ fontFamily: theme.fonts.title, fontSize: 34, color: theme.colors.red, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>MAX</span>
        )}
      </div>
      <div style={{ marginTop: 12, display: "inline-block", padding: "4px 12px", borderRadius: 6, backgroundColor: "rgba(0,0,0,0.6)", fontFamily: theme.fonts.body, fontWeight: 800, fontSize: 32, letterSpacing: 5, color: theme.colors.white, opacity: sub, transform: `translateY(${interpolate(sub, [0, 1], [12, 0])}px)`, textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
        DU STREET WORKOUT
      </div>
    </div>
  );
};

/* ---------- 3. « Le 15, 15, 15 » puis détail des 3 exercices ---------- */

const COLUMNS = [
  { at: T.n1, label: "MUSCLE-UPS", labelAt: T.muscleUps },
  { at: T.n2, label: "DIPS", labelAt: T.dips },
  { at: T.n3, label: "TRACTIONS", labelAt: T.tractions },
];

const FifteenColumn: React.FC<{ at: number; label: string; labelAt: number; compact: number }> = ({ at, label, labelAt, compact }) => {
  const frame = useCurrentFrame();
  const slam = useSpringAt(at, { damping: 10, stiffness: 240 });
  const lab = useSpringAt(labelAt, { damping: 14, stiffness: 220 });
  const active = frame >= f(labelAt) && frame < f(labelAt) + 24;
  return (
    <div style={{ width: 250, display: "flex", flexDirection: "column", alignItems: "center", opacity: frame >= f(at) ? 1 : 0 }}>
      <div
        style={{
          fontFamily: theme.fonts.title,
          fontSize: interpolate(compact, [0, 1], [170, 120]),
          lineHeight: 1,
          color: theme.colors.white,
          transform: `scale(${interpolate(slam, [0, 1], [2.2, 1]) * (active ? 1.08 : 1)})`,
          textShadow: `0 6px 24px rgba(0,0,0,0.5)${active ? `, 0 0 30px ${theme.colors.red}` : ""}`,
        }}
      >
        15
      </div>
      <div
        style={{
          marginTop: 6,
          fontFamily: theme.fonts.body,
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: 2,
          color: theme.colors.white,
          backgroundColor: theme.colors.red,
          padding: "4px 12px",
          borderRadius: 6,
          transform: `scale(${lab}) skewX(-6deg)`,
          opacity: lab > 0 ? 1 : 0,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
};

const FifteenSet: React.FC = () => {
  const compact = useSpringAt(T.cestQuoi, { damping: 200, stiffness: 200 });
  const rule = useSpringAt(T.sansLacher - 0.05, { damping: 14, stiffness: 200 });
  const frame = useCurrentFrame();
  const barGlow = frame >= f(T.barre) ? interpolate(frame - f(T.barre), [0, 20], [1, 0.4], clamp) : 0;
  return (
    <div style={{ position: "absolute", top: ZONE.top + 80, left: ZONE.left, width: 1080 - ZONE.left - ZONE.right }}>
      <div style={{ display: "flex", justifyContent: "flex-start", gap: 6 }}>
        {COLUMNS.map((c) => (
          <FifteenColumn key={c.label} {...c} compact={compact} />
        ))}
      </div>
      {/* « Sans lâcher la barre » */}
      <div
        style={{
          marginTop: 22,
          marginLeft: 20,
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          padding: "8px 18px",
          borderRadius: 10,
          backgroundColor: "rgba(0,0,0,0.65)",
          opacity: rule,
          transform: `translateX(${interpolate(rule, [0, 1], [-60, 0])}px)`,
        }}
      >
        {/* Barre de traction stylisée */}
        <svg width="70" height="40" viewBox="0 0 70 40">
          <rect x="2" y="6" width="66" height="7" rx="3.5" fill={theme.colors.white} />
          <rect x="2" y="6" width="66" height="7" rx="3.5" fill={theme.colors.red} opacity={barGlow} />
          <rect x="18" y="13" width="6" height="22" rx="3" fill="rgba(255,255,255,0.75)" />
          <rect x="46" y="13" width="6" height="22" rx="3" fill="rgba(255,255,255,0.75)" />
        </svg>
        <span style={{ fontFamily: theme.fonts.title, fontSize: 46, color: theme.colors.white, letterSpacing: 1 }}>
          SANS LÂCHER LA <span style={{ color: theme.colors.red }}>BARRE</span>
        </span>
      </div>
    </div>
  );
};

/* ---------- Vidéo ---------- */

const Footage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoomIn = interpolate(frame, [0, f(1.0)], [1.05, 1], clamp);
  // Petit « punch » discret sur la bouchée (sans texte)
  const bite = f(T.bite);
  const punch = frame >= bite ? spring({ frame: frame - bite, fps, config: { damping: 14, stiffness: 240 } }) : 0;
  const scale = zoomIn * (1 + 0.06 * punch);
  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bg, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 48%" }}>
        <Sequence durationInFrames={f(VIDEO_SECONDS)} layout="none">
          <OffthreadVideo src={SOURCE} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Sequence>
        <Sequence from={f(VIDEO_SECONDS)} layout="none">
          <Freeze frame={f(VIDEO_SECONDS) - 2}>
            <OffthreadVideo src={SOURCE} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Freeze>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Sfx: React.FC<{ at: number; name: string; volume?: number; dur?: number }> = ({ at, name, volume = 0.5, dur = 0.6 }) => (
  <Sequence from={Math.max(0, f(at))} durationInFrames={f(dur)} layout="none">
    <Audio src={sfx(name)} volume={volume} />
  </Sequence>
);

export const Video006: React.FC = () => {
  const frame = useCurrentFrame();
  const routeOut = interpolate(frame, [f(T.tester - 0.15), f(T.tester + 0.05)], [0, 1], clamp);
  const hardOut = interpolate(frame, [f(T.n1 - 0.2), f(T.n1 - 0.02)], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Footage />

      {frame < f(T.tester + 0.1) && <RouteToGym out={routeOut} />}
      <LocationChip />
      {frame >= f(T.plusDur - 0.12) && frame < f(T.n1) && <HardestSet out={hardOut} />}
      {frame >= f(T.n1) && <FifteenSet />}

      {/* Sons, discrets sous la voix */}
      <Sfx at={T.direction - 0.05} name="whoosh.wav" volume={0.3} />
      <Sfx at={T.onAir} name="pop.wav" volume={0.45} dur={0.2} />
      <Sfx at={T.dur + 0.25} name="impact.wav" volume={0.35} />
      <Sfx at={T.n1} name="pop.wav" volume={0.5} dur={0.2} />
      <Sfx at={T.n2} name="pop.wav" volume={0.5} dur={0.2} />
      <Sfx at={T.n3} name="pop.wav" volume={0.55} dur={0.2} />
      <Sfx at={T.muscleUps} name="tick.wav" volume={0.4} dur={0.2} />
      <Sfx at={T.dips} name="tick.wav" volume={0.4} dur={0.2} />
      <Sfx at={T.tractions} name="tick.wav" volume={0.4} dur={0.2} />
      <Sfx at={T.sansLacher - 0.08} name="whoosh.wav" volume={0.25} />
      <Sfx at={T.bite - 0.03} name="crunch.wav" volume={1} />
    </AbsoluteFill>
  );
};
