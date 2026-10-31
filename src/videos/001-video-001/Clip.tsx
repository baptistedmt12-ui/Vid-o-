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
import { theme } from "../../theme";
import { SOURCE, Segment } from "./timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Un plan du rush, avec sa transition d'entrée, une sortie dynamique et un léger zoom continu. */
export const Clip: React.FC<{ seg: Segment; dim?: number; blur?: number }> = ({
  seg,
  dim = 0,
  blur = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 15, stiffness: 170 }, durationInFrames: 14 });

  let scale = 1;
  let x = 0;
  let entryBlur = 0;
  let flash = 0;

  switch (seg.transition) {
    case "zoom":
      scale = interpolate(enter, [0, 1], [1.4, 1]);
      entryBlur = interpolate(frame, [0, 8], [16, 0], clamp);
      flash = interpolate(frame, [0, 6], [0.35, 0], clamp);
      break;
    case "whip":
      x = interpolate(enter, [0, 1], [900, 0]);
      scale = interpolate(enter, [0, 1], [1.2, 1]);
      entryBlur = interpolate(frame, [0, 9], [24, 0], clamp);
      break;
    case "flash":
      scale = interpolate(enter, [0, 1], [1.15, 1]);
      flash = interpolate(frame, [0, 10], [0.95, 0], clamp);
      break;
  }

  // Sortie : petit zoom + flou sur les 5 dernières images pour lier au plan suivant
  const exit = interpolate(frame, [seg.duration - 5, seg.duration], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.quad),
  });
  scale *= 1 + exit * 0.15;
  const exitBlur = exit * 10;

  // Zoom lent continu (effet « Ken Burns »)
  scale *= interpolate(frame, [0, seg.duration], [1, 1.07], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `translateX(${x}px) scale(${scale})`,
          filter: `blur(${entryBlur + exitBlur + blur}px) contrast(1.08) saturate(1.1)`,
        }}
      >
        <OffthreadVideo
          src={staticFile(SOURCE)}
          trimBefore={Math.round(seg.from * fps)}
          playbackRate={seg.rate}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      {dim > 0 && <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${dim})` }} />}
      {flash > 0 && <AbsoluteFill style={{ backgroundColor: `rgba(255,255,255,${flash})` }} />}
    </AbsoluteFill>
  );
};
