import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { theme } from "../../theme";
import { Clip } from "./Clip";
import { HookTitle } from "./HookTitle";
import { LevelBadge, LevelLadder, OutroCTA, SolutionLine } from "./Overlays";
import { LEVEL_SPANS, SEGMENTS, segmentById } from "./timeline";

const WHOOSH = staticFile("001-video-001/assets/whoosh.wav");
const IMPACT = staticFile("001-video-001/assets/impact.wav");

const OutroDim: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${interpolate(frame, [0, 15], [0, 0.6], { extrapolateRight: "clamp" })})` }} />;
};

export const Video001: React.FC = () => {
  const hook = segmentById("hook");
  const tractions = segmentById("tractions");
  const outro = segmentById("outro");
  const ladderStart = tractions.start;
  const ladderEnd = outro.start;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bg }}>
      {/* Plans vidéo */}
      {SEGMENTS.map((seg) => (
        <Sequence key={seg.id} from={seg.start} durationInFrames={seg.duration} name={seg.id}>
          <Clip seg={seg} dim={seg.id === "hook" ? 0.55 : 0} blur={seg.id === "hook" ? 4 : 0} />
        </Sequence>
      ))}

      {/* Accroche */}
      <Sequence from={hook.start} durationInFrames={hook.duration} name="Titre d'accroche">
        <HookTitle />
      </Sequence>

      {/* « La solution ? Ton poids de corps » */}
      <Sequence from={tractions.start} durationInFrames={55} name="Solution">
        <SolutionLine />
      </Sequence>

      {/* Titres de niveau (le niveau 1 arrive après la phrase « solution ») */}
      {LEVEL_SPANS.map((span) => {
        const delay = span.level === 1 ? 52 : 6;
        return (
          <Sequence key={span.level} from={span.start} durationInFrames={span.duration} name={`Niveau ${span.level}`}>
            <LevelBadge level={span.level} delay={delay} />
            <Sequence from={delay} durationInFrames={24} layout="none">
              <Audio src={IMPACT} volume={0.55} />
            </Sequence>
          </Sequence>
        );
      })}

      {/* Échelle de progression */}
      <Sequence from={ladderStart} durationInFrames={ladderEnd - ladderStart} name="Échelle">
        <LevelLadder />
      </Sequence>

      {/* Fin */}
      <Sequence from={outro.start} durationInFrames={outro.duration} name="Fin">
        <OutroDim />
        <OutroCTA />
      </Sequence>

      {/* Whoosh à chaque transition */}
      {SEGMENTS.slice(1).map((seg) => (
        <Sequence key={`w-${seg.id}`} from={seg.start - 8} durationInFrames={18} name="whoosh" layout="none">
          <Audio src={WHOOSH} volume={0.5} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
