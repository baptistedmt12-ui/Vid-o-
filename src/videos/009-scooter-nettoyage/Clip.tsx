import { AbsoluteFill, Easing, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Segment, VIDEO } from "./timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * Un plan, montage épuré (consigne de l'utilisateur) : coupe franche, léger zoom lent,
 * « miroir » = plan simplement retourné horizontalement, « punch » = petit zoom d'entrée sur un mot fort.
 * Pas de flou, pas de flash, pas de rotation : l'image reste nette.
 */
export const Clip: React.FC<{ seg: Segment }> = ({ seg }) => {
  const frame = useCurrentFrame();

  let scale = interpolate(frame, [0, seg.duration], [1.0, 1.035], clamp);
  if (seg.fx === "punch") {
    scale *= interpolate(frame, [0, 7], [1.07, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  }
  // flash très bref pour « je prends une photo »
  const flash = seg.fx === "photo" ? interpolate(frame, [0, 2, 7], [0.55, 0.45, 0], clamp) : 0;

  const cold = Math.max(0, seg.cold);
  const warm = Math.max(0, -seg.cold);
  const filter = `contrast(${1.04 + cold * 0.03}) saturate(${1.04 - cold * 0.18 + warm * 0.04}) sepia(${warm * 0.12})`;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scale}) scaleX(${seg.fx === "mirror" ? -1 : 1})`, filter }}>
        <OffthreadVideo
          src={staticFile(VIDEO)}
          startFrom={seg.startFrom}
          playbackRate={seg.rate}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      {/* haut et bas légèrement assombris pour la lisibilité des textes */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 24%, rgba(0,0,0,0) 56%, rgba(0,0,0,0.35) 76%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      {flash > 0 && <AbsoluteFill style={{ backgroundColor: `rgba(255,255,255,${flash})` }} />}
    </AbsoluteFill>
  );
};
