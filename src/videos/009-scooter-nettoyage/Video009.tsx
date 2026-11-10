import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from "remotion";
import { Clip } from "./Clip";
import { Message, Poll, Subtitles, Tag } from "./Graphics";
import { DIR, SEGMENTS, TOTAL_FRAMES, sec } from "./timeline";

const snd = (name: string) => staticFile(`${DIR}/assets/${name}.wav`);

const At: React.FC<{ from: number; to: number; name: string; children: (dur: number) => React.ReactNode }> = ({
  from,
  to,
  name,
  children,
}) => {
  const dur = sec(to) - sec(from);
  return (
    <Sequence from={sec(from)} durationInFrames={dur} name={name} layout="none">
      {children(dur)}
    </Sequence>
  );
};

const Sfx: React.FC<{ t: number; name: string; volume: number; len?: number }> = ({ t, name, volume, len = 2 }) => (
  <Sequence from={Math.max(0, sec(t))} durationInFrames={sec(len)} name={`son ${name}`} layout="none">
    <Audio src={snd(name)} volume={volume} />
  </Sequence>
);

export const Video009: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    {SEGMENTS.map((seg) => (
      <Sequence key={seg.id} from={seg.start} durationInFrames={seg.duration} name={`${seg.id} ${seg.note}`}>
        <Clip seg={seg} />
      </Sequence>
    ))}

    {/* Étiquettes de contexte, calées sur la voix */}
    <At from={0.9} to={8.4} name="Réfléchis pas">
      {(d) => <Tag icon="keys" text="« Lave et réfléchis pas »" sub="Le client" dur={d} />}
    </At>
    <At from={18.1} to={21.5} name="20 €">
      {(d) => <Tag icon="euro" text="20 € jetés par terre" dur={d} />}
    </At>
    <At from={21.6} to={25.3} name="Peinture">
      {(d) => <Tag icon="paint" text="Sous le gris… du blanc" dur={d} />}
    </At>
    <At from={26.6} to={34.4} name="Casque">
      {(d) => <Tag icon="daisy" text="Casque blanc à marguerite" sub="Cadeau pour ma mère" dur={d} />}
    </At>
    <At from={35.5} to={41.8} name="Volé">
      {(d) => <Tag icon="theft" text="Volé mardi dernier" sub="Scooter blanc, devant son travail" dur={d} />}
    </At>
    <At from={41.86} to={45.2} name="Message">
      {(d) => <Message from="Maman" text="C'est le mien. T'es où ?" dur={d} />}
    </At>
    <At from={55.82} to={TOTAL_FRAMES / 30} name="Question">
      {(d) => <Poll dur={d + 10} />}
    </At>

    <Subtitles />

    {/* Son : voix off d'origine, musique discrète dessous */}
    <Audio src={snd("voix")} volume={1} />
    <Audio
      src={snd("musique")}
      volume={(f) => 0.2 * interpolate(f, [0, 6, TOTAL_FRAMES - 40, TOTAL_FRAMES], [0, 1, 1.4, 0], { extrapolateRight: "clamp" })}
    />

    {SEGMENTS.filter((s) => s.fx === "whip").map((s) => (
      <Sfx key={`w${s.id}`} t={s.start / 30 - 0.12} name="whoosh" volume={0.2} len={1} />
    ))}
    {SEGMENTS.filter((s) => s.fx === "flip" || s.fx === "mirror").map((s) => (
      <Sfx key={`s${s.id}`} t={s.start / 30 - 0.08} name="swish" volume={0.16} len={1} />
    ))}

    {/* Bruitages calés sur les mots */}
    <Sfx t={0.88} name="cles" volume={0.5} len={1} />
    <Sfx t={3.04} name="impact" volume={0.22} />
    <Sfx t={14.0} name="cles" volume={0.45} len={1} />
    <Sfx t={18.1} name="cash" volume={0.25} len={1.5} />
    <Sfx t={40.3} name="photo" volume={0.5} len={0.5} />
    <Sfx t={41.5} name="vibreur" volume={0.35} len={1} />
    <Sfx t={41.86} name="message" volume={0.45} len={1} />
    <Sequence from={sec(44.2)} durationInFrames={sec(4.6)} name="son cœur" layout="none">
      <Audio src={snd("heartbeat")} volume={0.3} />
    </Sequence>
    <Sfx t={48.45} name="impact" volume={0.35} />
    <Sfx t={50.4} name="cles" volume={0.5} len={1} />
    <Sfx t={55.3} name="ding" volume={0.3} />
    <Sfx t={56.1} name="pop" volume={0.25} len={0.5} />
    <Sfx t={56.35} name="pop" volume={0.25} len={0.5} />
  </AbsoluteFill>
);
