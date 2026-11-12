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
import { AXIS_ANKLE, AXIS_HIP, AXIS_KNEE, AXIS_T, AXIS_WRI, SHO_L, SHO_R, SHO_T } from "./pose";

/*
 * Vidéo 008 — Les 5 étapes pour réussir ses premières handstand push-ups (On Air, Chambly).
 * Rush 1080×1920 à 59,94 i/s, 60,3 s. Montage épuré, sans sous-titres : petite carte « étape »
 * en haut à gauche + petites étiquettes calées sur la voix (transcription Whisper), et une
 * ligne qui suit les jambes (suivi de pose) quand il les remet dans l'axe.
 */
export const FPS = 59.94;
const SOURCE = staticFile("008-axe-jambes/rushes/original/original.mov");
const sfx = (n: string) => staticFile(`008-axe-jambes/assets/${n}`);

const VIDEO_SECONDS = 60.3;
const OUTRO_SECONDS = 1.4;
export const TOTAL_FRAMES = Math.round((VIDEO_SECONDS + OUTRO_SECONDS) * FPS);

const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const LEFT = 44;
const TOP = 300;

const STEPS = [
  { at: 5.54, title: "MAÎTRISER LE HANDSTAND" },
  { at: 16.84, title: "TENIR LA POSITION" },
  { at: 26.6, title: "DESCENDRE ET TENIR EN BAS" },
  { at: 37.92, title: "REMONTER D'EN BAS" },
  { at: 44.1, title: "ENTRAÎNER SA FORCE" },
];

/** Petites étiquettes sous la carte, calées sur les mots */
const TAGS: { from: number; to: number; text: string; accent?: string }[] = [
  { from: 14.14, to: 16.7, text: "BASE OBLIGATOIRE", accent: "⚠" },
  { from: 24.16, to: 26.5, text: "BONUS : MONTÉE EN FORCE", accent: "+" },
  { from: 33.2, to: 36.95, text: "HAUT ≠ BAS" },
  { from: 47.56, to: 50.6, text: "CONTRE UN MUR · TALONS QUI GLISSENT" },
  { from: 51.44, to: 53.2, text: "UN MAXIMUM DE RÉPÉTITIONS" },
  { from: 53.24, to: 57.6, text: "COMMENCE PAR L'EXO LE PLUS DUR" },
];

const useSpringAt = (t: number, damping = 14) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame >= f(t) ? spring({ frame: frame - f(t), fps, config: { damping, stiffness: 200 } }) : 0;
};

const pill = {
  backgroundColor: "rgba(0,0,0,0.62)",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.14)",
} as const;

/* ---------- Localisation (5 premières secondes) ---------- */
const LocationChip: React.FC = () => {
  const frame = useCurrentFrame();
  const a = useSpringAt(0.3, 200);
  const out = interpolate(frame, [f(4.9), f(5.4)], [1, 0], clamp);
  return (
    <div style={{ position: "absolute", top: TOP, left: LEFT, opacity: a * out, transform: `translateX(${interpolate(a, [0, 1], [-30, 0])}px)`, display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 10px", ...pill }}>
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill={theme.colors.red} />
      </svg>
      <span style={{ fontFamily: theme.fonts.title, fontSize: 32, color: theme.colors.white, letterSpacing: 1 }}>ON AIR</span>
      <span style={{ fontFamily: theme.fonts.body, fontWeight: 600, fontSize: 24, color: "rgba(255,255,255,0.85)" }}>Chambly</span>
    </div>
  );
};

/* ---------- Titre « 5 étapes » (2,2 s → 5,4 s) ---------- */
const IntroTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const five = useSpringAt(2.24, 10);
  const sub = useSpringAt(4.8, 200);
  const out = interpolate(frame, [f(5.25), f(5.5)], [1, 0], clamp);
  return (
    <div style={{ position: "absolute", top: TOP + 70, left: LEFT, opacity: out }}>
      <div style={{ display: "inline-flex", alignItems: "baseline", gap: 12, padding: "4px 16px 8px", ...pill, transform: `scale(${interpolate(five, [0, 1], [0.6, 1])})`, transformOrigin: "left center", opacity: five > 0 ? 1 : 0 }}>
        <span style={{ fontFamily: theme.fonts.title, fontSize: 84, lineHeight: 1, color: theme.colors.red }}>5</span>
        <span style={{ fontFamily: theme.fonts.title, fontSize: 54, lineHeight: 1, color: theme.colors.white }}>ÉTAPES</span>
      </div>
      <div style={{ marginTop: 8, display: "inline-block", padding: "4px 12px", ...pill, fontFamily: theme.fonts.body, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: theme.colors.white, opacity: sub, transform: `translateY(${interpolate(sub, [0, 1], [10, 0])}px)` }}>
        TES PREMIÈRES HANDSTAND PUSH-UPS
      </div>
    </div>
  );
};

/* ---------- Carte « étape » ---------- */
const StepCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let idx = -1;
  STEPS.forEach((s, i) => {
    if (frame >= f(s.at)) idx = i;
  });
  if (idx < 0) return null;
  const step = STEPS[idx];
  const since = frame - f(step.at);
  const swap = spring({ frame: since, fps, config: { damping: 14, stiffness: 200 } });
  const appear = spring({ frame: frame - f(STEPS[0].at), fps, config: { damping: 200 }, durationInFrames: 14 });
  return (
    <div style={{ position: "absolute", top: TOP, left: LEFT, padding: "10px 16px 12px", ...pill, opacity: appear, maxWidth: 560 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: theme.fonts.body, fontWeight: 800, fontSize: 20, letterSpacing: 3, color: theme.colors.red }}>ÉTAPE {idx + 1}/5</span>
        <div style={{ display: "flex", gap: 5 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ width: i === idx ? 22 : 10, height: 8, borderRadius: 4, backgroundColor: i <= idx ? theme.colors.red : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
      </div>
      <div style={{ marginTop: 4, fontFamily: theme.fonts.title, fontSize: 44, lineHeight: 1.1, color: theme.colors.white, opacity: swap, transform: `translateY(${interpolate(swap, [0, 1], [14, 0])}px)` }}>
        {step.title}
      </div>
    </div>
  );
};

/* ---------- Étiquettes ---------- */
const Tag: React.FC<{ text: string; accent?: string; duration: number }> = ({ text, accent, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 14, stiffness: 220 } });
  const out = interpolate(frame, [duration - 10, duration], [1, 0], clamp);
  return (
    <div style={{ position: "absolute", top: TOP + 118, left: LEFT, opacity: a * out, transform: `translateX(${interpolate(a, [0, 1], [-24, 0])}px)`, display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", ...pill }}>
      {accent && <span style={{ fontFamily: theme.fonts.title, fontSize: 28, color: theme.colors.red }}>{accent}</span>}
      <span style={{ fontFamily: theme.fonts.body, fontWeight: 800, fontSize: 24, letterSpacing: 1.5, color: theme.colors.white }}>{text}</span>
    </div>
  );
};

/** « Une fois sur trois » → « à tous les coups » : 3 pastilles */
const OneOfThree: React.FC = () => {
  const frame = useCurrentFrame();
  const a = useSpringAt(10.26);
  const all = frame >= f(12.3);
  const out = interpolate(frame, [f(13.6), f(13.95)], [1, 0], clamp);
  return (
    <div style={{ position: "absolute", top: TOP + 118, left: LEFT, opacity: a * out, display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px", ...pill }}>
      {[0, 1, 2].map((i) => {
        const ok = i === 0 || all;
        const pop = all && i > 0 ? spring({ frame: frame - f(12.3) - i * 5, fps: FPS, config: { damping: 10, stiffness: 240 } }) : 1;
        return (
          <div key={i} style={{ width: 30, height: 30, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: ok ? "#1DB954" : "rgba(255,255,255,0.18)", transform: `scale(${pop})`, fontFamily: theme.fonts.body, fontWeight: 800, fontSize: 18, color: theme.colors.white }}>
            {ok ? "✓" : "✕"}
          </div>
        );
      })}
      <span style={{ fontFamily: theme.fonts.title, fontSize: 30, color: theme.colors.white, marginLeft: 4 }}>{all ? "À TOUS LES COUPS" : "1 FOIS SUR 3"}</span>
    </div>
  );
};

/* ---------- Anneau sur les épaules (« qu'avec vos épaules ») ---------- */
const lerpTrack = (T: number[], P: number[][], t: number) => {
  if (t <= T[0]) return P[0];
  if (t >= T[T.length - 1]) return P[P.length - 1];
  let i = 0;
  while (T[i + 1] < t) i++;
  const k = (t - T[i]) / (T[i + 1] - T[i]);
  return [P[i][0] + (P[i + 1][0] - P[i][0]) * k, P[i][1] + (P[i + 1][1] - P[i][1]) * k];
};

const ShoulderRings: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const from = 21.6, to = 22.75;
  if (t < from || t > to) return null;
  const a = interpolate(t, [from, from + 0.15, to - 0.2, to], [0, 1, 1, 0], clamp);
  const pulse = 1 + 0.12 * Math.sin((t - from) * 12);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      {[SHO_L, SHO_R].map((P, i) => {
        const [x, y] = lerpTrack(SHO_T, P, t);
        return <circle key={i} cx={x} cy={y} r={34 * pulse} fill="none" stroke={theme.colors.red} strokeWidth={6} opacity={a} />;
      })}
    </svg>
  );
};

/* ---------- Ligne d'axe des jambes (40,9 s → 43,9 s) ---------- */
const AXIS_FROM = 40.9;
const AXIS_TO = 43.9;
const ALIGNED_AT = 42.95; // jambes revenues à la verticale

const LegAxis: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  if (t < AXIS_FROM || t > AXIS_TO) return null;
  const hip = lerpTrack(AXIS_T, AXIS_HIP, t);
  const knee = lerpTrack(AXIS_T, AXIS_KNEE, t);
  const ankle = lerpTrack(AXIS_T, AXIS_ANKLE, t);
  const wri = lerpTrack(AXIS_T, AXIS_WRI, t);
  const angle = (Math.atan2(ankle[0] - hip[0], hip[1] - ankle[1]) * 180) / Math.PI;
  const aligned = Math.abs(angle) < 6;
  const vis = interpolate(t, [AXIS_FROM, AXIS_FROM + 0.25, AXIS_TO - 0.25, AXIS_TO], [0, 1, 1, 0], clamp);
  const axisX = wri[0];
  const legColor = aligned ? theme.colors.white : theme.colors.red;
  const ok = t >= ALIGNED_AT;
  const okPop = ok ? spring({ frame: frame - f(ALIGNED_AT), fps: FPS, config: { damping: 10, stiffness: 240 } }) : 0;
  // Arc d'angle entre l'axe et les jambes, à la hanche
  const r = 120;
  const a0 = -Math.PI / 2;
  const a1 = a0 + (angle * Math.PI) / 180;
  const arc = `M ${hip[0] + r * Math.cos(a0)} ${hip[1] + r * Math.sin(a0)} A ${r} ${r} 0 0 ${angle > 0 ? 1 : 0} ${hip[0] + r * Math.cos(a1)} ${hip[1] + r * Math.sin(a1)}`;
  return (
    <AbsoluteFill style={{ opacity: vis }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {/* Axe idéal : verticale au-dessus des mains */}
        <line x1={axisX} y1={wri[1]} x2={axisX} y2={20} stroke="rgba(255,255,255,0.85)" strokeWidth={4} strokeDasharray="14 12" />
        {/* Ligne des jambes */}
        <polyline points={`${hip[0]},${hip[1]} ${knee[0]},${knee[1]} ${ankle[0]},${ankle[1]}`} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={`${hip[0]},${hip[1]} ${knee[0]},${knee[1]} ${ankle[0]},${ankle[1]}`} fill="none" stroke={legColor} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        {[hip, knee, ankle].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={11} fill={legColor} stroke="rgba(0,0,0,0.4)" strokeWidth={3} />
        ))}
        {!aligned && Math.abs(angle) > 3 && <path d={arc} fill="none" stroke={theme.colors.red} strokeWidth={5} />}
      </svg>
      {/* Étiquette à gauche du corps, hors zones TikTok */}
      <div style={{ position: "absolute", top: 700, left: LEFT, display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px", ...pill }}>
        {ok ? (
          <span style={{ fontFamily: theme.fonts.title, fontSize: 36, color: "#1DB954", transform: `scale(${okPop})`, display: "inline-block" }}>✓ DANS L'AXE</span>
        ) : (
          <>
            <span style={{ fontFamily: theme.fonts.title, fontSize: 36, color: theme.colors.red }}>{Math.round(Math.abs(angle))}°</span>
            <span style={{ fontFamily: theme.fonts.body, fontWeight: 800, fontSize: 22, letterSpacing: 1, color: theme.colors.white }}>HORS DE L'AXE</span>
          </>
        )}
      </div>
      {t >= 43.18 && (
        <div style={{ position: "absolute", top: 780, left: LEFT, display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", ...pill, opacity: interpolate(t, [43.18, 43.35], [0, 1], clamp) }}>
          <svg width="22" height="26" viewBox="0 0 22 26"><path d="M11 2 L20 13 H14 V24 H8 V13 H2 Z" fill={theme.colors.white} /></svg>
          <span style={{ fontFamily: theme.fonts.body, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: theme.colors.white }}>POUSSE</span>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ---------- Fin : récap des 5 étapes sur image figée ---------- */
const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [0, 12], [0, 0.45], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${dim})` }} />
      <div style={{ position: "absolute", top: TOP, left: LEFT, padding: "12px 18px", ...pill }}>
        <div style={{ fontFamily: theme.fonts.body, fontWeight: 800, fontSize: 20, letterSpacing: 3, color: theme.colors.red, marginBottom: 6 }}>LES 5 ÉTAPES</div>
        {STEPS.map((s, i) => {
          const a = spring({ frame: frame - 4 - i * 5, fps: FPS, config: { damping: 14, stiffness: 220 } });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: frame >= 4 + i * 5 ? 1 : 0, transform: `translateX(${interpolate(a, [0, 1], [-20, 0])}px)` }}>
              <span style={{ fontFamily: theme.fonts.title, fontSize: 30, color: theme.colors.red, width: 22 }}>{i + 1}</span>
              <span style={{ fontFamily: theme.fonts.title, fontSize: 30, lineHeight: 1.3, color: theme.colors.white }}>{s.title}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Sfx: React.FC<{ at: number; name: string; volume?: number; dur?: number }> = ({ at, name, volume = 0.2, dur = 0.6 }) => (
  <Sequence from={Math.max(0, f(at))} durationInFrames={f(dur)} layout="none">
    <Audio src={sfx(name)} volume={volume} />
  </Sequence>
);

export const Video008: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bg }}>
      <Sequence durationInFrames={f(VIDEO_SECONDS)} name="Rush">
        <OffthreadVideo src={SOURCE} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Sequence>
      <Sequence from={f(VIDEO_SECONDS)} name="Fin">
        <Freeze frame={f(VIDEO_SECONDS) - 3}>
          <OffthreadVideo src={SOURCE} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Freeze>
        <Outro />
      </Sequence>

      <LocationChip />
      <IntroTitle />
      <Sequence durationInFrames={f(VIDEO_SECONDS)} layout="none">
        <StepCard />
      </Sequence>
      <OneOfThree />
      {TAGS.map((tg) => (
        <Sequence key={tg.text} from={f(tg.from)} durationInFrames={f(tg.to - tg.from)} layout="none">
          <Tag text={tg.text} accent={tg.accent} duration={f(tg.to - tg.from)} />
        </Sequence>
      ))}
      <ShoulderRings />
      <LegAxis />

      {/* Sons discrets (volume bas, sous la voix) */}
      <Sfx at={0.3} name="pop.wav" volume={0.18} dur={0.2} />
      <Sfx at={2.24} name="pop.wav" volume={0.22} dur={0.2} />
      {STEPS.map((s) => (
        <Sfx key={s.at} at={s.at - 0.1} name="whoosh.wav" volume={0.14} />
      ))}
      {TAGS.map((tg) => (
        <Sfx key={tg.text} at={tg.from} name="tick.wav" volume={0.18} dur={0.15} />
      ))}
      <Sfx at={10.26} name="tick.wav" volume={0.18} dur={0.15} />
      <Sfx at={12.3} name="ding.wav" volume={0.16} />
      <Sfx at={21.98} name="tick.wav" volume={0.18} dur={0.15} />
      <Sfx at={ALIGNED_AT} name="ding.wav" volume={0.2} />
      <Sfx at={VIDEO_SECONDS} name="pop.wav" volume={0.18} dur={0.2} />
    </AbsoluteFill>
  );
};
