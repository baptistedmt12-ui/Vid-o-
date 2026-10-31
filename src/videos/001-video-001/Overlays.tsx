import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../../theme";
import { LEVELS, LEVEL_SPANS } from "./timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** « LA SOLUTION : TON POIDS DE CORPS » au début des tractions */
export const SolutionLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame: frame - 4, fps, config: { damping: 200 }, durationInFrames: 12 });
  const b = spring({ frame: frame - 12, fps, config: { damping: 13, stiffness: 200 } });
  const out = interpolate(frame, [44, 52], [1, 0], clamp);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: out }}>
      <div
        style={{
          fontFamily: theme.fonts.body,
          fontWeight: 800,
          fontSize: 50,
          letterSpacing: 10,
          color: theme.colors.white,
          opacity: a,
          transform: `translateY(${interpolate(a, [0, 1], [30, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.9)",
        }}
      >
        LA SOLUTION ?
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: theme.fonts.title,
          fontSize: 140,
          color: theme.colors.white,
          transform: `scale(${interpolate(b, [0, 1], [2, 1])})`,
          opacity: frame >= 12 ? 1 : 0,
          textShadow: "0 8px 30px rgba(0,0,0,0.9)",
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        TON POIDS
        <br />
        <span style={{ color: theme.colors.red }}>DE CORPS.</span>
      </div>
    </AbsoluteFill>
  );
};

/** Grand titre de niveau qui apparaît au centre puis se range en haut à gauche */
export const LevelBadge: React.FC<{ level: number; delay: number }> = ({ level, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  if (f < 0) return null;

  const pop = spring({ frame: f, fps, config: { damping: 12, stiffness: 200 } });
  const wipe = interpolate(f, [2, 14], [0, 100], clamp);
  const bar = interpolate(f, [8, 20], [0, 1], clamp);
  const dock = spring({ frame: f - 50, fps, config: { damping: 200 }, durationInFrames: 18 });

  const top = interpolate(dock, [0, 1], [760, theme.safe.top + 20]);
  const left = interpolate(dock, [0, 1], [90, 110]);
  const scale = interpolate(dock, [0, 1], [1, 0.45]) * interpolate(pop, [0, 1], [0.6, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        transform: `scale(${scale})`,
        transformOrigin: "left top",
      }}
    >
      <div
        style={{
          display: "inline-block",
          backgroundColor: theme.colors.red,
          color: theme.colors.white,
          fontFamily: theme.fonts.body,
          fontWeight: 800,
          fontSize: 40,
          letterSpacing: 6,
          padding: "8px 20px",
          transform: "skewX(-8deg)",
          opacity: interpolate(f, [0, 4], [0, 1], clamp),
        }}
      >
        NIVEAU {level}/5
      </div>
      <div
        style={{
          fontFamily: theme.fonts.title,
          fontSize: 170,
          lineHeight: 1.05,
          color: theme.colors.white,
          clipPath: `inset(0 ${100 - wipe}% 0 0)`,
          textShadow: "0 8px 30px rgba(0,0,0,0.8)",
          whiteSpace: "nowrap",
        }}
      >
        {LEVELS[level - 1]}
      </div>
      <div
        style={{
          height: 12,
          width: 420,
          backgroundColor: theme.colors.red,
          transform: `scaleX(${bar})`,
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

/** Échelle de progression (1 à 5) sur le bord gauche */
export const LevelLadder: React.FC<{ allDone?: boolean }> = ({ allDone = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 15 });

  const current = allDone ? 6 : LEVEL_SPANS.filter((s) => frame >= s.start).length;

  return (
    <div
      style={{
        position: "absolute",
        left: theme.safe.left,
        top: 760,
        display: "flex",
        flexDirection: "column-reverse",
        gap: 18,
        opacity: appear,
        transform: `translateX(${interpolate(appear, [0, 1], [-80, 0])}px)`,
      }}
    >
      {LEVEL_SPANS.map((span) => {
        const since = frame - span.start;
        const isCurrent = span.level === current;
        const done = span.level < current;
        const fill = interpolate(since, [0, 10], [0, 1], clamp);
        const pulse = allDone ? 1 + 0.15 * Math.max(0, Math.sin((frame - span.level * 4) / 5)) : 1;
        return (
          <div key={span.level} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 14,
                height: 64,
                borderRadius: 7,
                backgroundColor: theme.colors.muted,
                overflow: "hidden",
                position: "relative",
                transform: `scale(${isCurrent ? 1.25 : pulse})`,
                boxShadow: isCurrent || allDone ? `0 0 24px ${theme.colors.red}` : "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: `${(done || isCurrent ? fill : 0) * 100}%`,
                  backgroundColor: isCurrent || allDone ? theme.colors.red : theme.colors.white,
                }}
              />
            </div>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontWeight: 800,
                fontSize: 26,
                color: isCurrent || allDone ? theme.colors.white : theme.colors.muted,
              }}
            >
              {span.level}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Écran de fin : appel à commenter */
export const OutroCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame: frame - 6, fps, config: { damping: 11, stiffness: 220 } });
  const b = spring({ frame: frame - 22, fps, config: { damping: 200 }, durationInFrames: 14 });
  const c = spring({ frame: frame - 40, fps, config: { damping: 200 }, durationInFrames: 14 });
  const bounce = Math.abs(Math.sin(frame / 6)) * 18;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <div
        style={{
          fontFamily: theme.fonts.title,
          fontSize: 240,
          lineHeight: 1,
          color: theme.colors.red,
          transform: `scale(${interpolate(a, [0, 1], [2.5, 1])})`,
          opacity: frame >= 6 ? 1 : 0,
          textShadow: "0 10px 40px rgba(0,0,0,0.8)",
        }}
      >
        ET TOI ?
      </div>
      <div
        style={{
          marginTop: 20,
          fontFamily: theme.fonts.title,
          fontSize: 96,
          lineHeight: 1.05,
          color: theme.colors.white,
          opacity: b,
          transform: `translateY(${interpolate(b, [0, 1], [40, 0])}px)`,
          maxWidth: 880,
        }}
      >
        TU EN ES À QUEL NIVEAU ?
      </div>
      <div
        style={{
          marginTop: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: c,
        }}
      >
        <div
          style={{
            fontFamily: theme.fonts.body,
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: 4,
            color: theme.colors.white,
            backgroundColor: theme.colors.red,
            padding: "14px 30px",
            transform: "skewX(-8deg)",
          }}
        >
          RÉPONDS EN COMMENTAIRE
        </div>
        <svg width="70" height="70" viewBox="0 0 24 24" style={{ marginTop: 20, transform: `translateY(${bounce}px)` }}>
          <path d="M12 4v14m0 0l-6-6m6 6l6-6" stroke="white" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <Sequence from={6} durationInFrames={24} layout="none">
        <Audio src={staticFile("001-video-001/assets/impact.wav")} volume={0.8} />
      </Sequence>
    </AbsoluteFill>
  );
};
