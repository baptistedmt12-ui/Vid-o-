import React from "react";
import { AbsoluteFill, Easing, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SEGMENTS, Segment, VIDEO } from "./timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Un plan : coupe franche, image nette, son d'origine (fondu de 3 images aux bords pour éviter les clics). */
const Clip: React.FC<{ seg: Segment }> = ({ seg }) => {
  const frame = useCurrentFrame();
  let scale = interpolate(frame, [0, seg.duration], [1.0, 1.03], clamp);
  if (seg.fx === "punch") scale *= interpolate(frame, [0, 12], [1.07, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scale}) scaleX(${seg.fx === "mirror" ? -1 : 1})` }}>
        <OffthreadVideo
          src={staticFile(VIDEO)}
          startFrom={seg.startFrom}
          volume={(f) => interpolate(f, [0, 3, seg.duration - 3, seg.duration], [0, 1, 1, 0], clamp)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Video010: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {SEGMENTS.map((seg) => (
      <Sequence key={seg.id} from={seg.start} durationInFrames={seg.duration} name={`${seg.id} ${seg.note}`}>
        <Clip seg={seg} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
