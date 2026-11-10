import React from "react";
import { AbsoluteFill, Easing, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";

// Montage simple « sans voix » (vidéos 011+) : coupes franches à vitesse normale, image nette,
// plans retournés (miroir) et léger zoom d'entrée sur quelques plans. Son d'origine de chaque plan.
export type SimpleFx = "none" | "mirror" | "punch";
export type SimpleRaw = { t: number; a: number; d: number; fx: SimpleFx; note: string; shot: number };
export type SimpleSeg = SimpleRaw & { id: number; start: number; duration: number; startFrom: number };

export const buildSegments = (raw: SimpleRaw[], fps: number): SimpleSeg[] =>
  raw.map((r, id) => {
    const start = Math.round(r.t * fps);
    const end = id + 1 < raw.length ? Math.round(raw[id + 1].t * fps) : Math.round((r.t + r.d) * fps);
    return { ...r, id, start, duration: end - start, startFrom: Math.round(r.a * fps) };
  });

export const totalFrames = (segs: SimpleSeg[]) => segs[segs.length - 1].start + segs[segs.length - 1].duration;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Clip: React.FC<{ seg: SimpleSeg; video: string; fps: number }> = ({ seg, video, fps }) => {
  const frame = useCurrentFrame();
  let scale = interpolate(frame, [0, seg.duration], [1.0, 1.03], clamp);
  if (seg.fx === "punch") scale *= interpolate(frame, [0, fps * 0.2], [1.07, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const f = Math.max(2, Math.round(fps * 0.05));
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scale}) scaleX(${seg.fx === "mirror" ? -1 : 1})` }}>
        <OffthreadVideo
          src={staticFile(video)}
          startFrom={seg.startFrom}
          volume={(x) => interpolate(x, [0, f, seg.duration - f, seg.duration], [0, 1, 1, 0], clamp)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const MontageSimple: React.FC<{ segments: SimpleSeg[]; video: string; fps: number }> = ({ segments, video, fps }) => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {segments.map((seg) => (
      <Sequence key={seg.id} from={seg.start} durationInFrames={seg.duration} name={`${seg.id} plan ${seg.shot} ${seg.note}`}>
        <Clip seg={seg} video={video} fps={fps} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
