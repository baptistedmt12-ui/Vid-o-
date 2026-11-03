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
import { CAPTIONS, EXERCISES, Exercise, RECAP_SECONDS, SOURCE, VIDEO_FRAMES, toFrame } from "./reps";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const sfx = (name: string) => staticFile(`003-defi-15-15-7/assets/${name}`);

/*
 * Zones TikTok à ne pas recouvrir (1080×1920) :
 * - en haut, jusqu'à ~280 px : barre d'état + onglets « Suivis / Pour toi » ;
 * - à droite, au-delà de ~900 px : boutons j'aime / commentaires / partage ;
 * - en bas, à partir de ~1450 px : pseudo, description, musique.
 * Tout l'habillage reste donc dans la colonne de gauche, entre 300 et 700 px de haut.
 */
const LEFT = 44;
const CARD_TOP = 300;
const UNDER_CARD = 560;

const currentExercise = (frame: number) => {
  let idx = 0;
  EXERCISES.forEach((ex, i) => {
    if (frame >= toFrame(ex.start)) idx = i;
  });
  return idx;
};

const repsDone = (ex: Exercise, frame: number) => ex.reps.filter((r) => frame >= toFrame(r)).length;

/** Petite carte compteur, en haut à gauche */
const CounterCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cur = currentExercise(frame);
  const ex = EXERCISES[cur];
  const n = repsDone(ex, frame);
  const since = n > 0 ? frame - toFrame(ex.reps[n - 1]) : 999;
  const pop = spring({ frame: since, fps, config: { damping: 10, stiffness: 260 } });
  const scale = n > 0 ? interpolate(pop, [0, 1], [1.18, 1]) : 1;
  const glow = interpolate(since, [0, 12], [1, 0], clamp);
  const appear = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 12 });

  return (
    <div
      style={{
        position: "absolute",
        top: CARD_TOP,
        left: LEFT,
        padding: "12px 18px 14px",
        borderRadius: 18,
        backgroundColor: "rgba(0,0,0,0.55)",
        border: "2px solid rgba(255,255,255,0.12)",
        opacity: appear,
        minWidth: 200,
      }}
    >
      <div
        style={{
          fontFamily: theme.fonts.body,
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: 2,
          color: theme.colors.red,
        }}
      >
        {ex.name}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", height: 104 }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: theme.fonts.title,
            fontSize: 96,
            lineHeight: 1.05,
            color: theme.colors.white,
            transform: `scale(${scale})`,
            transformOrigin: "left 75%",
            textShadow: `0 0 ${40 * glow}px ${theme.colors.red}`,
          }}
        >
          {n}
        </span>
        <span
          style={{
            fontFamily: theme.fonts.title,
            fontSize: 50,
            color: n === ex.target ? theme.colors.red : "rgba(255,255,255,0.55)",
            marginLeft: 6,
          }}
        >
          /{ex.target}
        </span>
      </div>
      {/* Les 3 parties : 15 · 15 · 7 */}
      <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
        {EXERCISES.map((e, i) => {
          const done = i < cur;
          const active = i === cur;
          return (
            <div
              key={e.id}
              style={{
                fontFamily: theme.fonts.body,
                fontWeight: 800,
                fontSize: 18,
                padding: "3px 8px",
                borderRadius: 6,
                color: active || done ? theme.colors.white : "rgba(255,255,255,0.4)",
                backgroundColor: active ? theme.colors.red : done ? "rgba(255,255,255,0.2)" : "transparent",
                border: `1px solid ${active ? theme.colors.red : "rgba(255,255,255,0.25)"}`,
              }}
            >
              {done ? "✓" : e.target}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Bandeau sous la carte au changement d'exercice (« PARTIE 2/3 · DIPS ») */
const SwitchBanner: React.FC<{ ex: Exercise; index: number; duration: number }> = ({ ex, index, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 14, stiffness: 200 } });
  const out = interpolate(frame, [duration - 10, duration], [0, 1], clamp);
  const x = interpolate(inn, [0, 1], [-500, 0]) + interpolate(out, [0, 1], [0, -500]);
  return (
    <div style={{ position: "absolute", top: UNDER_CARD, left: LEFT, transform: `translateX(${x}px)` }}>
      <div
        style={{
          fontFamily: theme.fonts.body,
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: 3,
          color: "rgba(255,255,255,0.85)",
          marginBottom: 4,
        }}
      >
        PARTIE {index + 1}/3
      </div>
      <div
        style={{
          display: "inline-block",
          fontFamily: theme.fonts.title,
          fontSize: 58,
          lineHeight: 1.1,
          color: theme.colors.white,
          backgroundColor: theme.colors.red,
          padding: "2px 16px",
          transform: "skewX(-6deg)",
        }}
      >
        {ex.target} {ex.name}
      </div>
    </div>
  );
};

/** Petite phrase sous la carte pendant les moments durs */
const Caption: React.FC<{ text: string; duration: number }> = ({ text, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const out = interpolate(frame, [duration - 8, duration], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        top: UNDER_CARD,
        left: LEFT,
        opacity: out * a,
        transform: `scale(${interpolate(a, [0, 1], [0.7, 1])})`,
        transformOrigin: "left center",
        fontFamily: theme.fonts.title,
        fontSize: 44,
        color: theme.colors.white,
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: "4px 14px",
        borderRadius: 8,
      }}
    >
      {text}
    </div>
  );
};

/** Écran récap final (sur image figée), centré dans la zone sûre */
const Recap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dim = interpolate(frame, [0, 12], [0, 0.6], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${dim})` }} />
      <div
        style={{
          position: "absolute",
          top: 620,
          left: 120,
          right: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            fontFamily: theme.fonts.body,
            fontWeight: 800,
            fontSize: 30,
            letterSpacing: 6,
            color: theme.colors.white,
            opacity: interpolate(frame, [4, 12], [0, 1], clamp),
            marginBottom: 6,
          }}
        >
          BILAN DE LA SÉANCE
        </div>
        {EXERCISES.map((ex, i) => {
          const s = spring({ frame: frame - 10 - i * 7, fps, config: { damping: 12, stiffness: 200 } });
          return (
            <div
              key={ex.id}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 18,
                opacity: frame >= 10 + i * 7 ? 1 : 0,
                transform: `scale(${interpolate(s, [0, 1], [1.6, 1])})`,
              }}
            >
              <span style={{ fontFamily: theme.fonts.title, fontSize: 120, lineHeight: 1, color: theme.colors.red }}>
                {ex.reps.length}
                {ex.reps.length < ex.target && (
                  <span style={{ fontSize: 60, color: "rgba(255,255,255,0.6)" }}>/{ex.target}</span>
                )}
              </span>
              <span style={{ fontFamily: theme.fonts.title, fontSize: 68, lineHeight: 1, color: theme.colors.white }}>
                {ex.name}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** Léger flash blanc au changement d'exercice (sans texte au centre) */
const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ backgroundColor: `rgba(255,255,255,${interpolate(frame, [0, 7], [0.35, 0], clamp)})` }} />;
};

export const Video003: React.FC = () => {
  const BANNER = 66;
  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bg }}>
      {/* Vidéo en continu, son d'origine conservé */}
      <Sequence durationInFrames={VIDEO_FRAMES} name="Rush">
        <OffthreadVideo src={staticFile(SOURCE)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Sequence>

      {/* Image figée + bilan */}
      <Sequence from={VIDEO_FRAMES} durationInFrames={RECAP_SECONDS * 30} name="Bilan">
        <Freeze frame={VIDEO_FRAMES - 6}>
          <OffthreadVideo src={staticFile(SOURCE)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Freeze>
        <Recap />
        <Audio src={sfx("fanfare.wav")} volume={0.8} />
      </Sequence>

      {/* Compteur */}
      <Sequence durationInFrames={VIDEO_FRAMES} name="Compteur">
        <CounterCard />
      </Sequence>

      {/* Changements d'exercice */}
      {EXERCISES.slice(1).map((ex, i) => (
        <Sequence key={ex.id} from={toFrame(ex.start)} durationInFrames={BANNER} name={`Partie ${i + 2}`}>
          <Flash />
          <SwitchBanner ex={ex} index={i + 1} duration={BANNER} />
          <Audio src={sfx("impact.wav")} volume={0.6} />
        </Sequence>
      ))}
      {EXERCISES.slice(1).map((ex) => (
        <Sequence key={`w-${ex.id}`} from={toFrame(ex.start) - 8} durationInFrames={18} layout="none">
          <Audio src={sfx("whoosh.wav")} volume={0.45} />
        </Sequence>
      ))}

      {/* Phrases */}
      {CAPTIONS.map((c) => (
        <Sequence key={c.text} from={toFrame(c.from)} durationInFrames={toFrame(c.to - c.from)} name="Phrase">
          <Caption text={c.text} duration={toFrame(c.to - c.from)} />
        </Sequence>
      ))}

      {/* « Ding » à chaque répétition */}
      {EXERCISES.flatMap((ex) =>
        ex.reps.map((r, i) => (
          <Sequence key={`${ex.id}-${i}`} from={toFrame(r)} durationInFrames={12} layout="none">
            <Audio src={sfx("ding.wav")} volume={i === ex.reps.length - 1 ? 0.9 : 0.6} />
          </Sequence>
        )),
      )}
    </AbsoluteFill>
  );
};
