import React from "react";
import { Easing } from "remotion";
import { useG } from "./kit";
import { GOLD, INK, RED_SOFT, SANS, SERIF, HAND } from "./luxe";

// Illustrations supplémentaires (vidéo 011 et suivantes) — SVG vectoriel.

/* ------------------------------------------------------------------ porte des toilettes */

/**
 * Porte des toilettes du jet (vue de face).
 * open 0 → 1 : la porte pivote ; shake : tremblement (coups) ; occupied : voyant rouge « OCCUPÉ ».
 * `inside` est dessiné derrière la porte (visible quand elle s'ouvre).
 */
export const ToiletDoor: React.FC<{ open?: number; shake?: number; occupied?: boolean; inside?: React.ReactNode; dark?: number }> = ({
  open = 0,
  shake = 0,
  occupied = true,
  inside,
  dark = 0,
}) => {
  const W = 400;
  const H = 300;
  const sx = 1 - open * 0.92;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="tdWall" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#efeae2" />
          <stop offset="1" stopColor="#d8d0c2" />
        </linearGradient>
        <linearGradient id="tdDoor" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#2a2b30" />
          <stop offset="1" stopColor="#3a3c43" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#tdWall)" />
      <rect x={0} y={250} width={W} height={50} fill="#8f8574" />
      {/* encadrement */}
      <rect x={118} y={28} width={164} height={240} rx={8} fill="#1b1c20" />
      {/* intérieur (toilettes sombres) */}
      <g>
        <rect x={124} y={34} width={152} height={232} fill={`rgb(${40 + 30 * (1 - dark)},${40 + 30 * (1 - dark)},${46 + 30 * (1 - dark)})`} />
        {inside}
      </g>
      {/* porte qui pivote (charnière à gauche) */}
      <g transform={`translate(${124 + shake} 34) scale(${sx} 1)`}>
        <rect x={0} y={0} width={152} height={232} rx={4} fill="url(#tdDoor)" />
        <rect x={14} y={14} width={124} height={204} rx={4} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
        {/* poignée */}
        <rect x={120} y={112} width={22} height={8} rx={4} fill="#c9c9cf" />
        {/* voyant */}
        <rect x={110} y={84} width={34} height={16} rx={3} fill="#111" />
        <rect x={112} y={86} width={30} height={12} rx={2} fill={occupied ? RED_SOFT : "#3DD68C"} />
        {/* pictogramme WC */}
        <circle cx={76} cy={52} r={18} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
        <text x={76} y={58} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={15} fill="rgba(255,255,255,0.7)">
          WC
        </text>
      </g>
    </svg>
  );
};

/** Le gars de l'EVG : chemise hawaïenne, cheveux collés, yeux mi-clos, une seule chaussure. Base des pieds en (0,0). */
export const Guy: React.FC<{ blink?: number; sway?: number; shoe?: boolean }> = ({ blink = 0.55, sway = 0, shoe = false }) => (
  <g transform={`rotate(${sway} 0 0)`}>
    {/* jambes */}
    <rect x={-22} y={-96} width={18} height={92} rx={6} fill="#c8b08a" />
    <rect x={4} y={-96} width={18} height={92} rx={6} fill="#c8b08a" />
    {/* pied gauche : chaussure ; pied droit : chaussette */}
    <path d="M-30 -6 H0 V0 H-34 Z" fill="#f5f5f5" />
    <rect x={-32} y={-10} width={28} height={10} rx={5} fill="#f2f2f2" stroke="#ccc" strokeWidth={1} />
    {shoe ? <rect x={4} y={-10} width={28} height={10} rx={5} fill="#f2f2f2" stroke="#ccc" strokeWidth={1} /> : <rect x={4} y={-9} width={24} height={9} rx={4} fill="#d64b6a" />}
    {/* short */}
    <rect x={-26} y={-118} width={52} height={34} rx={6} fill="#2f3d55" />
    {/* chemise hawaïenne */}
    <path d="M-34 -196 H34 L38 -116 H-38 Z" fill="#1f9fa6" />
    {[[-20, -180], [12, -170], [-8, -150], [22, -136], [-26, -128], [4, -126], [26, -188]].map(([x, y], i) => (
      <g key={i} transform={`translate(${x} ${y})`}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx={0} cy={-4} rx={2.6} ry={4.6} fill={i % 2 ? "#ffd166" : "#ff7aa2"} transform={`rotate(${a})`} />
        ))}
        <circle r={1.8} fill="#fff" />
      </g>
    ))}
    <path d="M-6 -196 L0 -182 L6 -196" fill="#c8b08a" />
    {/* bras */}
    <rect x={-46} y={-192} width={14} height={66} rx={7} fill="#c8b08a" />
    <rect x={32} y={-192} width={14} height={66} rx={7} fill="#c8b08a" />
    <path d="M-46 -194 H-30 V-170 H-48 Z M30 -194 H46 L48 -170 H30 Z" fill="#1f9fa6" />
    {/* tête */}
    <rect x={-7} y={-206} width={14} height={12} fill="#c8b08a" />
    <ellipse cx={0} cy={-226} rx={22} ry={25} fill="#d8bf98" />
    {/* cheveux collés */}
    <path d="M-23 -230 C-24 -254 20 -258 24 -234 C14 -244 4 -238 -4 -246 C-10 -238 -18 -240 -23 -230 Z" fill="#3a2a1e" />
    <path d="M-20 -236 L-24 -216 M18 -236 L22 -220" stroke="#3a2a1e" strokeWidth={4} strokeLinecap="round" />
    {/* yeux mi-clos */}
    {[-9, 9].map((x) => (
      <g key={x}>
        <ellipse cx={x} cy={-226} rx={5} ry={3.2 * (1 - blink)} fill="#1b1b1b" />
        <path d={`M${x - 6} ${-227 - 3.2 * (1 - blink)} H${x + 6}`} stroke="#8a6d4e" strokeWidth={2.4} strokeLinecap="round" />
      </g>
    ))}
    <path d="M-6 -212 C-2 -210 3 -210 6 -213" stroke="#7a4e3a" strokeWidth={2} fill="none" strokeLinecap="round" />
  </g>
);

/* ------------------------------------------------------------------ objets */

export const Shoe: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg width={size} height={size * 0.55} viewBox="0 0 100 55">
    <path d="M6 30 C6 18 18 14 30 16 L46 22 C58 26 72 26 84 30 C94 33 96 42 94 48 H8 C5 44 5 36 6 30 Z" fill="#f2f2f2" stroke="#c9c9c9" strokeWidth={1.5} />
    <rect x={6} y={44} width={90} height={8} rx={3} fill="#d9d9d9" />
    <path d="M34 22 L40 30 M42 24 L48 32 M50 26 L56 33" stroke="#9aa0a8" strokeWidth={2} strokeLinecap="round" />
    <path d="M60 30 C70 30 78 32 86 36" stroke="#1f9fa6" strokeWidth={4} fill="none" strokeLinecap="round" />
  </svg>
);

export const Bottle: React.FC<{ size?: number; rot?: number }> = ({ size = 70, rot = 0 }) => (
  <svg width={size * 0.5} height={size} viewBox="0 0 40 80" style={{ transform: `rotate(${rot}deg)` }}>
    <rect x={15} y={2} width={10} height={16} rx={2} fill={GOLD} />
    <path d="M14 18 H26 C26 26 34 28 34 36 V74 C34 77 32 78 30 78 H10 C8 78 6 77 6 74 V36 C6 28 14 26 14 18 Z" fill="#1d4d2f" />
    <rect x={8} y={44} width={24} height={18} rx={2} fill="#f2e6c7" />
  </svg>
);

/** Confettis qui volent (t0 = début). */
export const Confetti: React.FC<{ size?: number; t0: number }> = ({ size = 90, t0 }) => {
  const { frame, at } = useG();
  const f = Math.max(0, frame - at(t0));
  const cols = [GOLD, "#ff7aa2", "#4cc9f0", "#ffd166", "#fff"];
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100">
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const d = Math.min(1, f / 14) * (24 + (i % 4) * 6);
        return (
          <rect
            key={i}
            x={Math.cos(a) * d - 3}
            y={Math.sin(a) * d - 2 + f * 0.25}
            width={6}
            height={4}
            fill={cols[i % 5]}
            transform={`rotate(${i * 37 + f * 8} ${Math.cos(a) * d} ${Math.sin(a) * d + f * 0.25})`}
          />
        );
      })}
    </svg>
  );
};

/** Onde sonore discrète (petit bruit). */
export const Sound: React.FC<{ size?: number }> = ({ size = 70 }) => {
  const { frame } = useG();
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" stroke={GOLD} strokeWidth={3} strokeLinecap="round">
      <path d="M8 24 H16 L28 14 V46 L16 36 H8 Z" fill={GOLD} stroke="none" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${34 + i * 7} ${20 - i * 4} C${40 + i * 8} ${26} ${40 + i * 8} ${34} ${34 + i * 7} ${40 + i * 4}`} opacity={((frame / 6 + i) % 3) / 3 > 0.33 ? 1 : 0.25} />
      ))}
    </svg>
  );
};

/* ------------------------------------------------------------------ carte d'embarquement */

export const BoardingPass: React.FC<{ from: string; fromCode: string; to: string; toCode: string; note: string; width?: number }> = ({ from, fromCode, to, toCode, note, width = 620 }) => (
  <div style={{ width, borderRadius: 22, overflow: "hidden", boxShadow: "0 22px 60px rgba(0,0,0,0.5)", display: "flex", background: "#FAF8F3", color: INK }}>
    <div style={{ flex: 1, padding: "20px 24px 22px" }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 18, letterSpacing: 5, color: "#9a8556" }}>CARTE D'EMBARQUEMENT</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
        <div>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 58, lineHeight: 1 }}>{fromCode}</div>
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 20, color: "#666" }}>{from}</div>
        </div>
        <svg width={70} height={30} viewBox="0 0 70 30">
          <path d="M4 15 H56" stroke="#bbb" strokeWidth={2} strokeDasharray="4 4" />
          <path d="M70 15 L56 8 V22 Z" fill={GOLD} />
        </svg>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 58, lineHeight: 1 }}>{toCode}</div>
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 20, color: "#666" }}>{to}</div>
        </div>
      </div>
      <div style={{ marginTop: 12, fontFamily: HAND, fontWeight: 600, fontSize: 34, color: "#7d1f2b" }}>{note}</div>
    </div>
    <div style={{ width: 120, borderLeft: "3px dashed #d9d0bd", background: "#F2EADB", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
      <svg width={60} height={70} viewBox="0 0 60 70">
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={2 + i * 4} y={4} width={i % 3 === 0 ? 3 : 1.6} height={62} fill={INK} />
        ))}
      </svg>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 16, color: "#9a8556", letterSpacing: 2 }}>JET PRIVÉ</div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ faire-part de mariage */

export const WeddingCard: React.FC<{ time: string; width?: number; t: number }> = ({ time, width = 560, t }) => {
  const { lin } = useG();
  const r = lin(t, t + 0.6, Easing.out(Easing.back(1.5)));
  return (
    <div style={{ width, background: "#FAF8F3", borderRadius: 14, padding: "26px 30px 30px", boxShadow: "0 26px 70px rgba(0,0,0,0.55)", textAlign: "center", border: `2px solid ${GOLD}`, outline: "8px solid #FAF8F3", color: INK }}>
      <svg width={120} height={70} viewBox="0 0 120 70" style={{ transform: `scale(${0.6 + 0.4 * r})` }}>
        <circle cx={48} cy={40} r={22} fill="none" stroke={GOLD} strokeWidth={6} />
        <circle cx={72} cy={40} r={22} fill="none" stroke="#c9a24a" strokeWidth={6} />
        <path d="M66 12 L72 4 L78 12 L72 18 Z" fill="#cfe8ff" stroke="#fff" strokeWidth={1.5} />
      </svg>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 18, letterSpacing: 6, color: "#9a8556", marginTop: 6 }}>FAIRE-PART</div>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: 52, lineHeight: 1.1, marginTop: 8 }}>Mariage</div>
      <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 26, color: "#555", marginTop: 6 }}>aujourd'hui</div>
      <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 70, color: "#7d1f2b", lineHeight: 1.05, marginTop: 4 }}>{time}</div>
    </div>
  );
};

/** Mini carte de France avec un point (ex. Lille). */
export const FranceMap: React.FC<{ size?: number; label: string; x?: number; y?: number }> = ({ size = 150, label, x = 58, y = 8 }) => {
  const { frame } = useG();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M52 4 L62 10 L76 14 L86 26 L82 36 L88 48 L80 60 L84 74 L74 84 L58 90 L46 96 L30 90 L22 78 L26 66 L18 56 L22 46 L10 40 L14 30 L26 28 L34 18 L44 14 Z"
        fill="rgba(217,189,132,0.18)"
        stroke={GOLD}
        strokeWidth={2}
      />
      <circle cx={x} cy={y + 6} r={4 + (frame % 30) / 6} fill="none" stroke="#fff" strokeWidth={1.2} opacity={1 - (frame % 30) / 30} />
      <circle cx={x} cy={y + 6} r={4} fill={RED_SOFT} />
      <text x={x + 8} y={y + 12} fontFamily={SANS} fontWeight={800} fontSize={11} fill="#fff">
        {label}
      </text>
    </svg>
  );
};
