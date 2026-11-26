import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import tracksJson from "./tracks.json";
import { ACCROCHE, ANNOTS, Annot, CHOIX, FILTRES, FPS, PLACED, Placed, PRIX, RUSHES, Son, TOTAL_FRAMES, VILLE, VOIX } from "./timeline";

export { FPS, TOTAL_FRAMES };

const RED = "#FF1E1E";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const tracks = tracksJson as unknown as Record<string, [number, number, number, number, number][]>;
const ASSETS = "013-maison-cheminee-basket/assets/";

/** Zoom du plan à l'image `frame` (lent zoom + entrée « punch »). */
const zoomOf = (seg: Placed, frame: number, fps: number) => {
  const p = frame / Math.max(1, seg.frames - 1);
  let z = seg.zoom === "in" ? 1 + 0.07 * p : seg.zoom === "out" ? 1.07 - 0.07 * p : 1.02;
  if (seg.punch) z *= interpolate(spring({ frame, fps, config: { damping: 15, stiffness: 200 } }), [0, 1], [1.12, 1]);
  if (seg.from === 0) {
    // accroche : entrée choc sur le boom
    z *= interpolate(spring({ frame, fps, config: { damping: 11, stiffness: 160 } }), [0, 1], [1.25, 1]);
  }
  z *= seg.crop ?? 1;
  return z;
};

/** Position d'un élément suivi (coordonnées rush) à une seconde du rush. */
const trackAt = (id: string, src: number) => {
  const tr = tracks[id];
  const i = Math.max(0, Math.min(tr.length - 1, Math.round((src - tr[0][0]) * 60)));
  // lissage léger sur ±3 images
  let cx = 0, cy = 0, w = 0, h = 0, n = 0;
  for (let k = Math.max(0, i - 3); k <= Math.min(tr.length - 1, i + 3); k++) {
    cx += tr[k][1]; cy += tr[k][2]; w += tr[k][3]; h += tr[k][4]; n++;
  }
  return { cx: cx / n, cy: cy / n, w: w / n, h: h / n };
};

/** Coordonnées rush → écran (miroir + zoom autour du centre). */
const toScreen = (seg: Placed, z: number, x: number, y: number) => {
  const X = seg.mirror ? 1080 - x : x;
  return { x: 540 + (X - 540) * z, y: 960 + (y - 960) * z };
};

const Cercle: React.FC<{ seg: Placed; a: Annot; z: number; src: number; local: number }> = ({ seg, a, z, src, local }) => {
  const { fps } = useVideoConfig();
  const p = trackAt(a.track, src);
  const c = toScreen(seg, z, p.cx, p.cy);
  const rx = Math.max(90, (p.w * z) / 2 + 40);
  const ry = Math.max(80, (p.h * z) / 2 + 40);
  const draw = interpolate(local, [0, 9], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const pop = spring({ frame: local, fps, config: { damping: 10, stiffness: 220 } });
  const s = interpolate(pop, [0, 1], [0.7, 1]);
  const len = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
  const W = rx * 2 + 60, H = ry * 2 + 60;
  return (
    <svg
      width={W}
      height={H}
      style={{ position: "absolute", left: c.x - W / 2, top: c.y - H / 2, transform: `scale(${s}) rotate(-8deg)`, overflow: "visible" }}
    >
      <ellipse cx={W / 2} cy={H / 2} rx={rx} ry={ry} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={17}
        strokeDasharray={len} strokeDashoffset={len * (1 - draw)} strokeLinecap="round" />
      <ellipse cx={W / 2} cy={H / 2} rx={rx} ry={ry} fill="none" stroke={RED} strokeWidth={11}
        strokeDasharray={len} strokeDashoffset={len * (1 - draw)} strokeLinecap="round" />
    </svg>
  );
};

const Fleche: React.FC<{ seg: Placed; a: Annot; z: number; src: number; local: number }> = ({ seg, a, z, src, local }) => {
  const { fps } = useVideoConfig();
  const p = trackAt(a.track, src);
  const c = toScreen(seg, z, p.cx, p.cy);
  const dir = a.dir ?? "bas-droite";
  const dx = dir.includes("droite") ? 1 : -1;
  const dy = dir.startsWith("bas") ? 1 : -1;
  const ang = Math.atan2(dy, dx); // direction depuis la cible vers la queue
  const gap = Math.min(p.w, p.h) * z * 0.35 + 18;
  const k = spring({ frame: local, fps, config: { damping: 9, stiffness: 200 } });
  const bob = Math.sin((local / fps) * Math.PI * 3) * 10;
  const dist = gap + (1 - k) * 160 + bob;
  const tipX = c.x + Math.cos(ang) * dist;
  const tipY = c.y + Math.sin(ang) * dist;
  const L = 160;
  const deg = (ang * 180) / Math.PI + 180; // la flèche pointe vers la cible
  return (
    <div style={{ position: "absolute", left: tipX, top: tipY, opacity: Math.min(1, k * 2), transform: `rotate(${deg}deg)`, transformOrigin: "0 0" }}>
      <svg width={L + 20} height={90} style={{ position: "absolute", left: -L - 10, top: -45, overflow: "visible" }}>
        <g filter="drop-shadow(0 3px 4px rgba(0,0,0,0.45))">
          <line x1={10} y1={45} x2={L - 30} y2={45} stroke={RED} strokeWidth={17} strokeLinecap="round" />
          <polygon points={`${L + 10},45 ${L - 44},10 ${L - 44},80`} fill={RED} strokeLinejoin="round" stroke={RED} strokeWidth={6} />
        </g>
      </svg>
    </div>
  );
};

const Plan: React.FC<{ seg: Placed }> = ({ seg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const z = zoomOf(seg, frame, fps);
  const src = seg.src0 + (frame / fps) * seg.rate;
  let shakeX = 0, shakeY = 0;
  if (seg.from === 0 && frame < 12) {
    const a = 1 - frame / 12;
    shakeX = Math.sin(frame * 2.9) * 16 * a;
    shakeY = Math.cos(frame * 3.4) * 12 * a;
  }
  const annots = ANNOTS.filter((a) => a.seg === seg.id);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `translate(${shakeX}px, ${shakeY}px) scale(${z}) scaleX(${seg.mirror ? -1 : 1})` }}>
        <OffthreadVideo
          src={staticFile(RUSHES[seg.rush])}
          muted
          trimBefore={Math.round(seg.src0 * fps)}
          playbackRate={seg.rate}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: FILTRES[seg.rush] }}
        />
      </AbsoluteFill>
      {annots.map((a, i) => {
        const local = Math.round((src - a.src0) * (fps / seg.rate));
        if (src < a.src0 || (a.src1 !== undefined && src > a.src1)) return null;
        // fondu de sortie quand l'élément quitte le suivi
        const Comp = Fleche;
        return <Comp key={i} seg={seg} a={a} z={z} src={src} local={local} />;
      })}
    </AbsoluteFill>
  );
};

const Pastille: React.FC<{ n: string; texte: string; at: number }> = ({ n, texte, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = spring({ frame: frame - at, fps, config: { damping: 12, stiffness: 200 } });
  if (frame < at) return null;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        background: "rgba(255,255,255,0.96)",
        borderRadius: 40,
        padding: "12px 26px",
        marginBottom: 14,
        fontFamily: "Inter, Arial, sans-serif",
        fontWeight: 800,
        fontSize: 38,
        color: n === "1" ? "#111" : RED,
        boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        transform: `scale(${interpolate(k, [0, 1], [0.6, 1])})`,
        transformOrigin: "0% 50%",
        opacity: Math.min(1, k * 2),
      }}
    >
      {n} · {texte}
    </div>
  );
};

// Bruitages volontairement bas : toujours sous la voix off (≈ -12 dB et moins)
const VOL: Record<Son, number> = { pop: 0.22, argent: 0.28, plouf: 0.25, verre: 0.2, scintille: 0.18, coussin: 0.3, jeu: 0.16 };

/** Petite étiquette de prix (en haut à gauche, hors interface TikTok), entrée en ressort. */
const EtiquettePrix: React.FC<{ texte: string }> = ({ texte }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const k = spring({ frame, fps, config: { damping: 10, stiffness: 210 } });
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        top: 330,
        background: "rgba(255,255,255,0.97)",
        borderRadius: 26,
        padding: "12px 28px 14px",
        boxShadow: "0 8px 22px rgba(0,0,0,0.35)",
        fontFamily: "Inter, Arial, sans-serif",
        transform: `scale(${interpolate(k, [0, 1], [0.5, 1]) * (0.9 + 0.1 * out)}) rotate(-3deg)`,
        transformOrigin: "0% 50%",
        opacity: Math.min(1, k * 2) * out,
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 600, color: "#777", letterSpacing: 3, marginBottom: 2 }}>PRIX</div>
      <div style={{ fontSize: 50, fontWeight: 800, color: RED, lineHeight: 1 }}>{texte}</div>
    </div>
  );
};

/** Texte d'accroche (3 premières secondes) : petit, en haut à gauche, hors interface TikTok. */
const TexteAccroche: React.FC<{ texte: string }> = ({ texte }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const k = spring({ frame, fps, config: { damping: 11, stiffness: 220 } });
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        top: 310,
        maxWidth: 780,
        background: "rgba(255,255,255,0.97)",
        borderRadius: 30,
        padding: "14px 28px",
        boxShadow: "0 8px 22px rgba(0,0,0,0.35)",
        fontFamily: "Inter, Arial, sans-serif, 'Noto Color Emoji'",
        fontWeight: 800,
        fontSize: 44,
        color: "#111",
        transform: `scale(${interpolate(k, [0, 1], [0.6, 1])}) rotate(-2deg)`,
        transformOrigin: "0% 50%",
        opacity: Math.min(1, k * 2) * out,
      }}
    >
      {texte}
    </div>
  );
};

/** « MARSEILLE » qui claque en gros : arrivée en écrasement + secousse, soulignement rouge, sortie rapide. */
const VilleSlam: React.FC<{ texte: string }> = ({ texte }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const k = spring({ frame, fps, config: { damping: 9, stiffness: 260, mass: 0.7 } });
  const scale = interpolate(k, [0, 1], [2.6, 1]);
  const shake = frame < 8 ? Math.sin(frame * 3.1) * 14 * (1 - frame / 8) : 0;
  const barre = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 200 } });
  const out = interpolate(frame, [durationInFrames - 7, durationInFrames], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        width: 830,
        top: 520,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: Math.min(1, k * 3) * out,
        transform: `translate(${shake}px, ${-shake * 0.6}px) scale(${scale * (0.92 + 0.08 * out)}) rotate(-4deg)`,
      }}
    >
      <div
        style={{
          fontFamily: "Anton, Impact, sans-serif",
          fontSize: 168,
          lineHeight: 1,
          color: "#FFFFFF",
          letterSpacing: 4,
          textShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 2px rgba(0,0,0,0.8)",
          WebkitTextStroke: "3px rgba(0,0,0,0.25)",
        }}
      >
        📍{texte}
      </div>
      <div style={{ height: 16, width: 620 * barre, background: RED, borderRadius: 8, marginTop: 10, boxShadow: "0 6px 16px rgba(0,0,0,0.4)" }} />
    </div>
  );
};

export const Video013: React.FC<{ musique?: boolean; voix?: boolean }> = ({ musique = true, voix = true }) => {
  const debutFin = Math.round(CHOIX[0].t * FPS);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {PLACED.map((s) => (
        <Sequence key={s.id + s.from} from={s.from} durationInFrames={s.frames} name={s.id}>
          <Plan seg={s} />
        </Sequence>
      ))}

      {/* Texte d'accroche (3 premières secondes) */}
      {ACCROCHE.texte ? (
        <Sequence from={Math.round(ACCROCHE.from * FPS)} durationInFrames={Math.round((ACCROCHE.to - ACCROCHE.from) * FPS)} name="accroche">
          <TexteAccroche texte={ACCROCHE.texte} />
        </Sequence>
      ) : null}

      {/* « MARSEILLE » en gros sur le mot */}
      <Sequence from={Math.round(VILLE.t * FPS)} durationInFrames={Math.round(VILLE.dur * FPS)} name="ville">
        <VilleSlam texte={VILLE.texte} />
      </Sequence>
      <Sequence from={Math.round(VILLE.t * FPS)} durationInFrames={50} name="son-ville">
        <Audio src={staticFile(ASSETS + "boom.wav")} volume={0.32} />
      </Sequence>

      {/* Étiquette de prix sur « 7 millions d'euros » */}
      <Sequence from={Math.round(PRIX.from * FPS)} durationInFrames={Math.round((PRIX.to - PRIX.from) * FPS)} name="prix">
        <EtiquettePrix texte={PRIX.texte} />
      </Sequence>

      {/* Question finale « 1 ou 2 » : petites pastilles en haut à gauche (zone sûre TikTok) */}
      <Sequence from={debutFin} name="choix-1-2">
        <div style={{ position: "absolute", left: 70, top: 330, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {CHOIX.map((c) => (
            <Pastille key={c.n} n={c.n} texte={c.texte} at={Math.round(c.t * FPS) - debutFin} />
          ))}
        </div>
      </Sequence>

      {/* Son : musique légère + bruitages calés (son d'origine coupé) */}
      {musique && (
        <Audio
          src={staticFile(ASSETS + "musique.wav")}
          volume={(f) => interpolate(f, [TOTAL_FRAMES - 45, TOTAL_FRAMES], [voix && VOIX.length ? 0.14 : 0.3, 0], clamp)}
        />
      )}
      <Audio src={staticFile(ASSETS + "boom.wav")} volume={0.4} />
      {voix && VOIX.map((v) => (
        <Sequence key={v.fichier} from={Math.round(v.at * FPS)} name={`voix-${v.fichier}`}>
          <Audio src={staticFile(ASSETS + v.fichier)} volume={1} />
        </Sequence>
      ))}
      {ANNOTS.map((a, i) => {
        if (!a.son) return null;
        const p = PLACED.find((s) => s.id === a.seg)!;
        const at = p.from + Math.round(((a.src0 - p.src0) / p.rate) * FPS);
        return (
          <Sequence key={i} from={at} durationInFrames={50} name={`son-${a.son}-${a.track}`}>
            <Audio src={staticFile(ASSETS + a.son + ".wav")} volume={VOL[a.son]} />
          </Sequence>
        );
      })}
      <Sequence from={Math.round(PRIX.from * FPS)} durationInFrames={50} name="son-argent">
        <Audio src={staticFile(ASSETS + "argent.wav")} volume={VOL.argent} />
      </Sequence>
      {CHOIX.map((c) => (
        <Sequence key={c.n} from={Math.round(c.t * FPS)} durationInFrames={20} name={`son-choix-${c.n}`}>
          <Audio src={staticFile(ASSETS + "pop.wav")} volume={VOL.pop} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
