import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Segment, VIDEO } from "./timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Un plan plein cadre : effet d'entrée, zoom lent, étalonnage selon le moment de l'histoire. */
export const Clip: React.FC<{ seg: Segment }> = ({ seg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 15, stiffness: 190 }, durationInFrames: 12 });

  let scale = 1;
  let x = 0;
  let y = 0;
  let blur = 0;
  let flash = 0;
  let rotY = 0;

  switch (seg.fx) {
    case "zoom":
      scale = interpolate(enter, [0, 1], [1.4, 1]);
      blur = interpolate(frame, [0, 6], [12, 0], clamp);
      break;
    case "whip":
      x = interpolate(enter, [0, 1], [950, 0]);
      blur = interpolate(frame, [0, 7], [26, 0], clamp);
      break;
    case "flash":
      scale = interpolate(enter, [0, 1], [1.1, 1]);
      flash = interpolate(frame, [0, 8], [0.7, 0], clamp);
      break;
    case "photo":
      scale = interpolate(enter, [0, 1], [1.06, 1]);
      flash = interpolate(frame, [0, 3, 12], [1, 0.9, 0], clamp);
      break;
    case "blanc": {
      // « il devient tout blanc » : flash blanc, secousse, image délavée
      flash = interpolate(frame, [0, 4, 20], [1, 0.85, 0.15], clamp);
      const sh = Math.max(0, 1 - frame / 14);
      x = (random(`x${frame}`) - 0.5) * 40 * sh;
      y = (random(`y${frame}`) - 0.5) * 30 * sh;
      scale = 1.08;
      break;
    }
    case "flip":
      rotY = interpolate(frame, [0, 9], [80, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
      break;
  }

  const exit = interpolate(frame, [seg.duration - 3, seg.duration], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  scale *= 1 + exit * 0.07;
  blur += exit * 5;
  scale *= interpolate(frame, [0, seg.duration], [1.02, 1.09], clamp);

  const c = seg.cold;
  const warm = Math.max(0, -c);
  const cold = Math.max(0, c);
  const filter = `blur(${blur}px) contrast(${1.08 + cold * 0.08}) saturate(${1.1 - cold * 0.4 + warm * 0.05}) brightness(${1.02 - cold * 0.06}) sepia(${warm * 0.28})`;

  const video = (flipX: boolean) => (
    <OffthreadVideo
      src={staticFile(VIDEO)}
      startFrom={seg.startFrom}
      playbackRate={seg.rate}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover", transform: flipX ? "scaleX(-1)" : undefined }}
    />
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0D", overflow: "hidden", perspective: 1600 }}>
      <AbsoluteFill style={{ transform: `translate(${x}px, ${y}px) rotateY(${rotY}deg) scale(${scale})`, filter }}>
        {seg.fx === "mirror" ? (
          <>
            <AbsoluteFill style={{ clipPath: "inset(0 50% 0 0)" }}>{video(false)}</AbsoluteFill>
            <AbsoluteFill style={{ clipPath: "inset(0 0 0 50%)" }}>{video(true)}</AbsoluteFill>
          </>
        ) : (
          video(seg.fx === "flip")
        )}
      </AbsoluteFill>
      {cold > 0 && <AbsoluteFill style={{ backgroundColor: "rgb(18,34,70)", opacity: cold * 0.22, mixBlendMode: "multiply" }} />}
      {warm > 0 && <AbsoluteFill style={{ backgroundColor: "rgb(255,190,120)", opacity: warm * 0.12, mixBlendMode: "soft-light" }} />}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)" }} />
      {/* haut et bas assombris : lisibilité des étiquettes et des sous-titres */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.2) 100%)" }} />
      {flash > 0 && <AbsoluteFill style={{ backgroundColor: `rgba(255,255,255,${flash})` }} />}
    </AbsoluteFill>
  );
};
