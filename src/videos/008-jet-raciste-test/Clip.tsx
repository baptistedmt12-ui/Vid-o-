import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Segment, VIDEO } from "./timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Un plan plein cadre 9:16, étalonnage premium, effet d'entrée, miroir éventuel. */
export const Clip: React.FC<{ seg: Segment }> = ({ seg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 170 }, durationInFrames: 14 });
  const fx = seg.fx ?? "none";

  let scale = 1;
  let x = 0;
  let blur = 0;
  let flash = 0;
  let gold = 0;
  let rotY = 0;

  switch (fx) {
    case "zoom":
      scale = interpolate(enter, [0, 1], [1.35, 1]);
      blur = interpolate(frame, [0, 7], [12, 0], clamp);
      break;
    case "whip":
      x = interpolate(enter, [0, 1], [900, 0]);
      blur = interpolate(frame, [0, 8], [24, 0], clamp);
      break;
    case "flash":
      scale = interpolate(enter, [0, 1], [1.08, 1]);
      flash = interpolate(frame, [0, 9], [0.75, 0], clamp);
      break;
    case "gold":
      scale = interpolate(enter, [0, 1], [1.1, 1]);
      gold = interpolate(frame, [0, 14], [0.85, 0], clamp);
      break;
    case "flip":
      rotY = interpolate(frame, [0, 9], [80, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
      break;
  }

  // Sortie douce sur les 3 dernières images
  const exit = interpolate(frame, [seg.duration - 3, seg.duration], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  scale *= 1 + exit * 0.06;
  blur += exit * 5;

  // Zoom lent continu (l'image vit toujours, effet « travelling »)
  scale *= interpolate(frame, [0, seg.duration], [1.02, 1.08], clamp);

  const cold = seg.cold ?? 0;
  const filter = `blur(${blur}px) contrast(${1.08 + cold * 0.06}) saturate(${1.06 - cold * 0.45}) brightness(${1.02 - cold * 0.08}) sepia(${0.1 * (1 - cold)})`;

  const video = (flipX: boolean) => (
    <OffthreadVideo
      src={staticFile(VIDEO)}
      startFrom={seg.startFrom}
      playbackRate={seg.rate}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover", transform: flipX ? "scaleX(-1)" : undefined }}
    />
  );

  const flipped = fx === "flip";

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0D", overflow: "hidden", perspective: 1600 }}>
      <AbsoluteFill
        style={{
          transform: `translateX(${x}px) rotateY(${rotY}deg) scale(${scale})`,
          filter,
        }}
      >
        {fx === "mirror" ? (
          <>
            {/* moitié gauche + son reflet à droite */}
            <AbsoluteFill style={{ clipPath: "inset(0 50% 0 0)" }}>{video(false)}</AbsoluteFill>
            <AbsoluteFill style={{ clipPath: "inset(0 0 0 50%)" }}>{video(true)}</AbsoluteFill>
          </>
        ) : (
          video(flipped)
        )}
      </AbsoluteFill>

      {/* Teinte froide quand l'histoire bascule */}
      {cold > 0 && (
        <AbsoluteFill style={{ backgroundColor: "rgb(18,34,64)", opacity: cold * 0.22, mixBlendMode: "multiply" }} />
      )}
      {/* Vignette premium */}
      <AbsoluteFill
        style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.55) 100%)" }}
      />
      {/* Haut assombri pour la lisibilité des étiquettes */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0) 30%)" }} />
      {flash > 0 && <AbsoluteFill style={{ backgroundColor: `rgba(255,255,255,${flash})` }} />}
      {gold > 0 && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at 20% 15%, rgba(255,226,170,${gold}) 0%, rgba(201,168,106,${gold * 0.6}) 35%, rgba(0,0,0,0) 75%)`,
            mixBlendMode: "screen",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
