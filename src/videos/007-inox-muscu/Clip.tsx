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
import { BEAT, Segment } from "./timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Image 16:9 posée dans un cadre 9:16 : agrandie à 130 % (on perd un peu des bords, pas de zoom excessif)
export const VIDEO_W = 1080 * 1.3; // 1404
export const VIDEO_H = (VIDEO_W * 9) / 16; // ~790
export const VIDEO_TOP = 560;
export const VIDEO_BOTTOM = VIDEO_TOP + VIDEO_H;

/**
 * Un plan : fond flouté (même image) + image nette au centre,
 * transition d'entrée, « pulse » sur chaque temps, secousse optionnelle.
 */
export const Clip: React.FC<{ seg: Segment; shake?: number; dim?: number }> = ({ seg, shake = 0, dim = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 180 }, durationInFrames: 12 });

  let scale = 1;
  let x = 0;
  let blur = 0;
  let flash = 0;
  let rgb = 0;

  switch (seg.transition) {
    case "zoom":
      scale = interpolate(enter, [0, 1], [1.45, 1]);
      blur = interpolate(frame, [0, 7], [14, 0], clamp);
      flash = interpolate(frame, [0, 5], [0.3, 0], clamp);
      break;
    case "whip":
      x = interpolate(enter, [0, 1], [1100, 0]);
      blur = interpolate(frame, [0, 8], [26, 0], clamp);
      break;
    case "flash":
      scale = interpolate(enter, [0, 1], [1.12, 1]);
      flash = interpolate(frame, [0, 8], [0.9, 0], clamp);
      break;
    case "glitch":
      rgb = interpolate(frame, [0, 9], [26, 0], clamp);
      x = frame < 8 ? (random(`g${frame}${seg.id}`) - 0.5) * 70 : 0;
      flash = interpolate(frame, [0, 4], [0.4, 0], clamp);
      break;
  }

  // Sortie : léger zoom + flou sur les 4 dernières images
  const exit = interpolate(frame, [seg.duration - 4, seg.duration], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  scale *= 1 + exit * 0.12;
  blur += exit * 8;

  // Zoom lent continu + pulsation sur chaque temps de la musique
  scale *= interpolate(frame, [0, seg.duration], [1, 1.06], clamp);
  const sinceBeat = frame % BEAT;
  scale *= 1 + 0.022 * Math.exp(-sinceBeat / 2.5);

  // Secousse (efforts)
  const sx = shake ? (random(`x${frame}`) - 0.5) * shake : 0;
  const sy = shake ? (random(`y${frame}`) - 0.5) * shake : 0;

  const video = (style: React.CSSProperties) => (
    <OffthreadVideo src={staticFile(seg.file)} playbackRate={seg.rate} muted style={style} />
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      {/* Fond : la même image, en grand et floutée */}
      <AbsoluteFill style={{ transform: `scale(${1.15 * scale})`, filter: "blur(38px) brightness(0.45) saturate(1.3)" }}>
        {video({ width: "100%", height: "100%", objectFit: "cover" })}
      </AbsoluteFill>
      <AbsoluteFill
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 72%, rgba(0,0,0,0.6) 100%)" }}
      />

      {/* Image principale */}
      <div
        style={{
          position: "absolute",
          left: (1080 - VIDEO_W) / 2 + (seg.shiftX ?? 0),
          top: VIDEO_TOP,
          width: VIDEO_W,
          height: VIDEO_H,
          transform: `translate(${x + sx}px, ${sy}px) scale(${scale})`,
          filter: `blur(${blur}px) contrast(1.1) saturate(1.12)`,
          boxShadow: "0 0 80px rgba(0,0,0,0.8)",
        }}
      >
        {rgb > 0 && (
          <>
            <div style={{ position: "absolute", inset: 0, transform: `translateX(${-rgb}px)`, mixBlendMode: "screen", opacity: 0.7, filter: "sepia(1) hue-rotate(-50deg) saturate(6)" }}>
              {video({ width: "100%", height: "100%" })}
            </div>
            <div style={{ position: "absolute", inset: 0, transform: `translateX(${rgb}px)`, mixBlendMode: "screen", opacity: 0.7, filter: "sepia(1) hue-rotate(160deg) saturate(6)" }}>
              {video({ width: "100%", height: "100%" })}
            </div>
          </>
        )}
        {video({ position: "absolute", inset: 0, width: "100%", height: "100%" })}
        {/* vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)" }} />
      </div>

      {dim > 0 && <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${dim})` }} />}
      {flash > 0 && <AbsoluteFill style={{ backgroundColor: `rgba(255,255,255,${flash})` }} />}
    </AbsoluteFill>
  );
};
