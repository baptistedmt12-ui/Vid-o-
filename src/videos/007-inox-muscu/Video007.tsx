import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from "remotion";
import { Clip } from "./Clip";
import { ChapterTitle, HookTitle, MaisDabord, OutroCTA, Punch, ResultBuild, ResultFrame, Teaser } from "./Overlays";
import { BREAK, CHAPTERS, DIR, DROP1, DROP2, PUNCHES, SEGMENTS, TOTAL_FRAMES, b } from "./timeline";

const MUSIC = staticFile(`${DIR}/assets/musique.wav`);
const WHOOSH = staticFile(`${DIR}/assets/whoosh.wav`);
const POP = staticFile(`${DIR}/assets/pop.wav`);

/** musique=false : version pour voix off (bruitages seuls) */
export const Video007: React.FC<{ musique?: boolean }> = ({ musique = true }) => {
  const last = SEGMENTS[SEGMENTS.length - 1];
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Plans */}
      {SEGMENTS.map((seg) => {
        const effort = seg.id === "s05";
        return (
          <Sequence key={seg.id} from={seg.start} durationInFrames={seg.duration} name={seg.id}>
            <Clip seg={seg} shake={effort ? 9 : 0} dim={seg.id === "s01" ? 0.15 : 0} />
          </Sequence>
        );
      })}

      {/* Accroche */}
      <Sequence from={0} durationInFrames={b(DROP1)} name="Accroche">
        <HookTitle />
      </Sequence>
      <Sequence from={b(DROP1)} durationInFrames={22} name="Mais d'abord">
        <MaisDabord />
      </Sequence>

      {/* Titres d'exercice (après « Mais d'abord… ») */}
      {CHAPTERS.map((c, i) => {
        const from = b(c.from) + (i === 0 ? 22 : 0);
        const dur = b(c.to) - from;
        return (
          <Sequence key={c.num} from={from} durationInFrames={dur} name={`Exercice ${c.num}`}>
            <ChapterTitle num={c.num} label={c.label} duration={dur} />
          </Sequence>
        );
      })}

      {/* Phrases-chocs */}
      {PUNCHES.map((p) => (
        <Sequence key={p.from} from={b(p.from)} durationInFrames={b(p.to - p.from)} name={`Punch ${p.text}`}>
          <Punch text={p.text} accent={p.accent} duration={b(p.to - p.from)} />
          <Audio src={POP} volume={0.35} />
        </Sequence>
      ))}

      {/* Rappel de rétention */}
      <Sequence from={b(58)} durationInFrames={b(BREAK - 58)} name="Teaser">
        <Teaser />
      </Sequence>

      {/* Break + résultat */}
      <Sequence from={b(BREAK)} durationInFrames={b(DROP2 - BREAK)} name="Le résultat (montée)">
        <ResultBuild />
      </Sequence>
      <Sequence from={b(DROP2)} durationInFrames={last.start - b(DROP2)} name="Le résultat">
        <ResultFrame />
      </Sequence>

      {/* Fin */}
      <Sequence from={last.start} durationInFrames={last.duration} name="Fin">
        <OutroCTA />
      </Sequence>

      {/* Son */}
      {musique && <Audio
        src={MUSIC}
        volume={(f) => interpolate(f, [0, 4], [0.6, 1], { extrapolateRight: "clamp" })}
      />}
      {SEGMENTS.slice(1).map((seg) => (
        <Sequence key={`w-${seg.id}`} from={Math.max(seg.start - 6, 0)} durationInFrames={16} name="whoosh" layout="none">
          <Audio src={WHOOSH} volume={0.28} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export { TOTAL_FRAMES };
