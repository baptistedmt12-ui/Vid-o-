import { Fragment } from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../../theme";

type Word = { t: string; accent?: boolean; box?: boolean; size?: number; br?: boolean };

const LINE1: Word[] = [
  { t: "TU" },
  { t: "VAS" },
  { t: "À" },
  { t: "LA" },
  { t: "SALLE" },
  { t: "+3 FOIS", accent: true, size: 210, br: true },
  { t: "PAR", br: true },
  { t: "SEMAINE…" },
];

const LINE2: Word[] = [
  { t: "ET", size: 105 },
  { t: "T'ARRIVES", size: 105 },
  { t: "MÊME", size: 105, br: true },
  { t: "PAS", size: 105 },
  { t: "À", size: 105 },
  { t: "SOULEVER", size: 105 },
  { t: "TON PROPRE", box: true, size: 150, br: true },
  { t: "CORPS\u00A0?", box: true, size: 190, br: true },
];

const L1_START = 6;
const L2_START = 80;
const STEP = 5;
const BASE_SIZE = 118;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const SlamWord: React.FC<{ word: Word; at: number }> = ({ word, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - at;
  if (f < 0) return null;
  const s = spring({ frame: f, fps, config: { damping: 11, stiffness: 220 } });
  const scale = interpolate(s, [0, 1], [2.4, 1]);
  const opacity = interpolate(f, [0, 3], [0, 1], clamp);
  const blur = interpolate(f, [0, 5], [10, 0], clamp);
  const boxWipe = interpolate(f, [0, 7], [0, 1], clamp);

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        fontFamily: theme.fonts.title,
        fontSize: word.size ?? BASE_SIZE,
        lineHeight: 1.05,
        color: word.accent ? theme.colors.red : theme.colors.white,
        transform: `scale(${scale})`,
        opacity,
        filter: `blur(${blur}px)`,
        padding: word.box ? "0 22px" : 0,
        textShadow: word.box ? "none" : "0 8px 30px rgba(0,0,0,0.8)",
      }}
    >
      {word.box && (
        <span
          style={{
            position: "absolute",
            inset: "8px 0 4px 0",
            backgroundColor: theme.colors.red,
            transform: `scaleX(${boxWipe}) skewX(-6deg)`,
            transformOrigin: "left center",
            zIndex: -1,
          }}
        />
      )}
      {word.t}
    </span>
  );
};

const Line: React.FC<{ words: Word[]; start: number }> = ({ words, start }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "baseline",
      gap: "6px 26px",
      maxWidth: 1020,
      isolation: "isolate",
    }}
  >
    {words.map((w, i) => (
      <Fragment key={i}>
        {w.br && <div style={{ flexBasis: "100%", height: 0 }} />}
        <SlamWord word={w} at={start + i * STEP} />
      </Fragment>
    ))}
  </div>
);

/** Titre d'accroche animé, mot par mot, avec secousse sur la punchline. */
export const HookTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // La ligne 1 remonte et se réduit quand la ligne 2 arrive
  const lift = spring({ frame: frame - (L2_START - 4), fps, config: { damping: 200 }, durationInFrames: 14 });
  const l1Y = interpolate(lift, [0, 1], [0, -430]);
  const l1Scale = interpolate(lift, [0, 1], [1, 0.62]);
  const l1Opacity = interpolate(lift, [0, 1], [1, 0.8]);

  // Secousse au moment de la punchline et du mot final
  const shakeAt = (t: number, amp: number) => interpolate(frame, [t, t + 12], [amp, 0], clamp) * (frame >= t ? 1 : 0);
  const lastWordAt = L2_START + (LINE2.length - 1) * STEP;
  const amp = shakeAt(L2_START, 18) + shakeAt(lastWordAt, 28);
  const sx = (random(`sx-${frame}`) - 0.5) * 2 * amp;
  const sy = (random(`sy-${frame}`) - 0.5) * 2 * amp;

  // Léger zoom final avant la transition
  const outro = interpolate(frame, [lastWordAt + 10, lastWordAt + 50], [1, 1.06], clamp);

  const pops = [
    ...LINE1.map((_, i) => L1_START + i * STEP),
    ...LINE2.slice(0, -2).map((_, i) => L2_START + i * STEP),
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(${sx}px, ${sy}px) scale(${outro})`,
      }}
    >
      <div style={{ position: "absolute", transform: `translateY(${l1Y}px) scale(${l1Scale})`, opacity: l1Opacity }}>
        <Line words={LINE1} start={L1_START} />
      </div>
      <div style={{ position: "absolute", transform: "translateY(160px)" }}>
        <Line words={LINE2} start={L2_START} />
      </div>

      {pops.map((at) => (
        <Sequence key={at} from={at} durationInFrames={6} layout="none">
          <Audio src={staticFile("001-video-001/assets/pop.wav")} volume={0.6} />
        </Sequence>
      ))}
      <Sequence from={L2_START} durationInFrames={24} layout="none">
        <Audio src={staticFile("001-video-001/assets/impact.wav")} volume={0.7} />
      </Sequence>
      <Sequence from={lastWordAt - STEP} durationInFrames={24} layout="none">
        <Audio src={staticFile("001-video-001/assets/impact.wav")} volume={0.9} />
      </Sequence>
    </AbsoluteFill>
  );
};
