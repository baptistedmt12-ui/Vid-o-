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
import { sec } from "./kit";

export type Transition = "zoom" | "whip" | "flash";
export type Cut = { t: number; type: Transition };
export type Punch = { t: number; s: number; shake?: boolean };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type ZoomEvent = { f: number; s: number; shake?: boolean };

// Chaque coupe remet le zoom à 1, chaque mot fort pousse un zoom « punch ».
const buildEvents = (cuts: Cut[], punches: Punch[]): ZoomEvent[] =>
  [
    { f: 0, s: 1 },
    ...cuts.map((c) => ({ f: sec(c.t), s: 1 })),
    ...punches.map((p) => ({ f: sec(p.t), s: p.s, shake: p.shake })),
  ].sort((a, b) => a.f - b.f);

const zoomAt = (EVENTS: ZoomEvent[], frame: number, fps: number) => {
  let prev = 1;
  let cur = EVENTS[0];
  for (let i = 0; i < EVENTS.length; i++) {
    if (EVENTS[i].f > frame) break;
    prev = i > 0 ? EVENTS[i - 1].s : 1;
    cur = EVENTS[i];
  }
  const local = frame - cur.f;
  const k = spring({ frame: local, fps, config: { damping: 14, stiffness: 220 }, durationInFrames: 10 });
  const scale = prev + (cur.s - prev) * k;
  const shake = cur.shake ? Math.max(0, 1 - local / 9) : 0;
  return { scale, shake, local };
};

/** Rush monté en continu + zooms punch, transitions sur les coupes, étalonnage. */
export const Footage: React.FC<{ video: string; cuts: Cut[]; punches: Punch[]; darkFrom?: number; topShade?: number; clean?: boolean }> = ({
  video,
  cuts: CUTS,
  punches,
  darkFrom = 9999,
  topShade = 0.3,
  clean = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { scale: punch, shake } = zoomAt(buildEvents(CUTS, punches), frame, fps);

  // Transitions sur les coupes du rush
  let x = 0;
  let y = 0;
  let blur = 0;
  let flash = 0;
  let tScale = 1;
  for (const c of CUTS) {
    const cf = sec(c.t);
    const d = frame - cf; // < 0 : avant la coupe
    if (d < -5 || d > 10) continue;
    const before = interpolate(d, [-5, 0], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
    const after = interpolate(d, [0, 9], [1, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
    const amt = d < 0 ? before : after;
    if (c.type === "whip") {
      x += (d < 0 ? -1 : 1) * amt * 420;
      blur += amt * 28;
    } else if (c.type === "zoom") {
      tScale *= 1 + amt * 0.3;
      blur += amt * 18;
    } else {
      tScale *= 1 + amt * 0.08;
      flash = Math.max(flash, d < 0 ? before * 0.6 : after);
    }
  }

  if (shake > 0) {
    x += Math.sin(frame * 2.7) * 18 * shake;
    y += Math.cos(frame * 3.1) * 14 * shake;
  }

  // Lent zoom continu pour que l'image vive toujours
  const drift = 1 + 0.03 * Math.sin(frame / 90);

  // Étalonnage : chaud au début, plus froid et contrasté quand ça tourne mal
  const dark = interpolate(frame, [sec(darkFrom), sec(darkFrom + 1.5)], [0, 1], clamp);
  const saturate = 1.12 - dark * 0.42;
  const contrast = 1.06 + dark * 0.12;
  const brightness = 1 - dark * 0.1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0D", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `translate(${x}px, ${y}px) scale(${punch * tScale * drift})`,
          filter: clean ? (blur > 0.2 ? `blur(${blur}px)` : undefined) : `blur(${blur}px) saturate(${saturate}) contrast(${contrast}) brightness(${brightness})`,
        }}
      >
        <OffthreadVideo
          src={staticFile(video)}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      {/* Mode « clean » : aucun filtre ni assombrissement sur l'image (exigence de l'utilisateur) */}
      {!clean && (<>
      {/* Teinte froide quand l'histoire bascule */}
      <AbsoluteFill style={{ backgroundColor: "rgba(20,40,80,1)", opacity: dark * 0.16, mixBlendMode: "multiply" }} />
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, rgba(0,0,0,0) ${55 - dark * 15}%, rgba(0,0,0,${0.45 + dark * 0.3}) 100%)`,
        }}
      />
      {/* Assombrit le haut pour la lisibilité des graphiques */}
      <AbsoluteFill
        style={{ background: `linear-gradient(180deg, rgba(0,0,0,${topShade}) 0%, rgba(0,0,0,0) 45%)` }}
      />
      </>)}
      {flash > 0 && <AbsoluteFill style={{ backgroundColor: `rgba(255,255,255,${flash})` }} />}
    </AbsoluteFill>
  );
};
