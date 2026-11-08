import React from "react";
import { Easing, Img, interpolate, spring, staticFile } from "remotion";
import { clamp, useG } from "./kit";
import { Box, GOLD, HAND, INK, L, Label, RED_SOFT, SANS, SERIF, glass, useIn } from "./luxe";

// Illustrations animées « luxe épuré » pour illustrer la voix off (série jet privé).
// Toutes les scènes sont en SVG vectoriel : nettes à n'importe quelle taille.

/* ================================================================== outils */

/** 0 → 1 entre deux secondes du rush (avec easing). */
export const useLin = () => useG().lin;

/** Ressort qui démarre à t (secondes du rush). */
const usePop = () => useG().pop;

/* ================================================================== Polaroid */

/**
 * Photo façon Polaroid qui « tombe » avec un flash d'appareil photo.
 * `height` = hauteur de la zone photo.
 */
export const Polaroid: React.FC<{
  top: number;
  left?: number;
  width?: number;
  height?: number;
  rotate?: number;
  caption?: string;
  t?: number;
  children: React.ReactNode;
}> = ({ top, left = L, width = 560, height, rotate = -3, caption, t, children }) => {
  const { frame, at, fps, exit } = useG();
  const f = frame - (t === undefined ? 0 : at(t));
  if (f < 0) return null;
  const k = spring({ frame: f, fps, config: { damping: 14, stiffness: 160 } });
  const flash = interpolate(f, [0, 2, 12], [0, 1, 0], clamp);
  const h = height ?? width * 0.75;
  const pad = width * 0.045;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: width + pad * 2,
        transform: `translateY(${(1 - k) * 40}px) rotate(${rotate + (1 - k) * 8}deg) scale(${1.12 - 0.12 * k - exit * 0.06})`,
        transformOrigin: "50% 50%",
        opacity: Math.min(1, k * 2) * (1 - exit),
        filter: `blur(${exit * 8}px)`,
      }}
    >
      <div style={{ background: "#FAF8F3", padding: pad, paddingBottom: caption ? pad * 3.4 : pad, borderRadius: 6, boxShadow: "0 26px 70px rgba(0,0,0,0.55)" }}>
        <div style={{ position: "relative", width, height: h, overflow: "hidden", background: "#222" }}>
          {children}
          <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash }} />
        </div>
        {caption && (
          <div style={{ fontFamily: HAND, fontWeight: 600, fontSize: width * 0.085, color: "#2a2a2e", marginTop: pad * 0.7, lineHeight: 1 }}>{caption}</div>
        )}
      </div>
    </div>
  );
};

/** Image figée du rush (dans un Polaroid ou un téléphone). */
export const Still: React.FC<{ src: string; pos?: string; mirror?: boolean }> = ({ src, pos = "50% 50%", mirror }) => (
  <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, transform: mirror ? "scaleX(-1)" : undefined }} />
);

/** Viseur d'appareil photo (fins traits) + REC + compteur de photos. */
export const Viewfinder: React.FC<{ count?: number; label?: string }> = ({ count, label = "SHOOTING" }) => {
  const { frame, exit } = useG();
  const { k } = useIn(undefined, 20, 120);
  const x0 = 90;
  const x1 = 880;
  const y0 = 320;
  const y1 = 1300;
  const c = 70;
  const ins = (1 - k) * 40;
  const line = { stroke: "#fff", strokeWidth: 5, fill: "none", strokeLinecap: "round" as const };
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: (1 - exit) * Math.min(1, k * 1.5) }}>
      <g style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }}>
        <path d={`M${x0 + ins} ${y0 + ins + c} V${y0 + ins} H${x0 + ins + c}`} {...line} />
        <path d={`M${x1 - ins - c} ${y0 + ins} H${x1 - ins} V${y0 + ins + c}`} {...line} />
        <path d={`M${x0 + ins} ${y1 - ins - c} V${y1 - ins} H${x0 + ins + c}`} {...line} />
        <path d={`M${x1 - ins - c} ${y1 - ins} H${x1 - ins} V${y1 - ins - c}`} {...line} />
        <path d="M485 810 H595 M540 755 V865" stroke="rgba(255,255,255,0.7)" strokeWidth={3} />
        <circle cx={x0 + 62} cy={y0 + 52} r={13} fill={RED_SOFT} opacity={frame % 30 < 18 ? 1 : 0.25} />
        <text x={x0 + 88} y={y0 + 63} fill="#fff" fontFamily={SANS} fontWeight={800} fontSize={32} letterSpacing={4}>
          {label}
        </text>
        {count !== undefined && (
          <text x={x1 - 60} y={y0 + 63} fill="#fff" fontFamily={SANS} fontWeight={800} fontSize={34} textAnchor="end" letterSpacing={2}>
            {`${count} / 300`}
          </text>
        )}
      </g>
    </svg>
  );
};

/* ================================================================== urne */

const defsGold = (id: string) => (
  <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
    <stop offset="0" stopColor="#8a6a2c" />
    <stop offset="0.25" stopColor="#f3dc9a" />
    <stop offset="0.45" stopColor="#c99b45" />
    <stop offset="0.8" stopColor="#7a5a22" />
    <stop offset="1" stopColor="#b8913f" />
  </linearGradient>
);

/** Urne dorée avec ruban, dessinée autour de (0,0) = centre de sa base. */
export const Urn: React.FC<{ lid?: number; lidX?: number; lidY?: number; lidRot?: number; id?: string }> = ({ lid = 0, lidX = 0, lidY = 0, lidRot = 0, id = "u" }) => (
  <g>
    <defs>{defsGold(`${id}g`)}</defs>
    {/* ombre */}
    <ellipse cx={0} cy={4} rx={52} ry={8} fill="rgba(0,0,0,0.35)" />
    {/* pied */}
    <path d="M-34 0 H34 L26 -14 H-26 Z" fill={`url(#${id}g)`} />
    {/* corps */}
    <path d="M-26 -14 C-62 -40 -66 -96 -40 -128 C-34 -136 -30 -140 -24 -146 H24 C30 -140 34 -136 40 -128 C66 -96 62 -40 26 -14 Z" fill={`url(#${id}g)`} />
    {/* ruban */}
    <path d="M-52 -96 C-20 -88 20 -88 52 -96 L50 -82 C20 -74 -20 -74 -50 -82 Z" fill="#7d1f2b" />
    <path d="M0 -86 C-18 -104 -34 -100 -30 -90 C-26 -82 -10 -84 0 -86 Z M0 -86 C18 -104 34 -100 30 -90 C26 -82 10 -84 0 -86 Z" fill="#9b2a38" />
    <path d="M0 -86 L-12 -58 L-4 -60 Z M0 -86 L12 -58 L4 -60 Z" fill="#7d1f2b" />
    <circle cx={0} cy={-86} r={5} fill="#5e1520" />
    {/* reflet */}
    <path d="M-30 -120 C-44 -96 -44 -60 -26 -36" stroke="rgba(255,255,255,0.55)" strokeWidth={5} fill="none" strokeLinecap="round" />
    {/* col */}
    <rect x={-24} y={-156} width={48} height={12} rx={3} fill={`url(#${id}g)`} />
    {/* couvercle */}
    <g transform={`translate(${lidX} ${lidY - lid * 10}) rotate(${lidRot + lid * 12} 0 -160)`}>
      <path d="M-30 -156 C-28 -176 28 -176 30 -156 Z" fill={`url(#${id}g)`} />
      <circle cx={0} cy={-180} r={8} fill={`url(#${id}g)`} />
    </g>
  </g>
);

/** Fond cabine : paroi crème + hublot. */
const CabinBg: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <>
    <defs>
      <linearGradient id="wall" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#efe6d6" />
        <stop offset="1" stopColor="#d9ccb5" />
      </linearGradient>
      <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#8fc3ef" />
        <stop offset="1" stopColor="#dcefff" />
      </linearGradient>
      <linearGradient id="wood" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#8b4a22" />
        <stop offset="1" stopColor="#5a2c12" />
      </linearGradient>
      <linearGradient id="woodTop" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#a65e2e" />
        <stop offset="0.5" stopColor="#c47a42" />
        <stop offset="1" stopColor="#94512a" />
      </linearGradient>
    </defs>
    <rect width={w} height={h} fill="url(#wall)" />
    <rect x={w * 0.62} y={h * 0.14} width={w * 0.2} height={h * 0.34} rx={w * 0.1} fill="#cbbda4" />
    <rect x={w * 0.635} y={h * 0.165} width={w * 0.17} height={h * 0.29} rx={w * 0.085} fill="url(#sky)" />
    <rect x={0} y={h * 0.62} width={w} height={h * 0.38} fill="#cfc2a8" />
  </>
);

/** Table en bois vernis (plateau à y, centrée en cx). */
const Table: React.FC<{ cx: number; y: number; w: number; legH: number; rot?: number }> = ({ cx, y, w, legH, rot = 0 }) => (
  <g transform={`rotate(${rot} ${cx} ${y + legH})`}>
    <rect x={cx - 12} y={y + 14} width={24} height={legH} fill="url(#wood)" />
    <rect x={cx - 60} y={y + legH} width={120} height={10} rx={4} fill="#4a240f" />
    <rect x={cx - w / 2} y={y} width={w} height={18} rx={6} fill="url(#woodTop)" />
    <path d={`M${cx - w / 2 + 20} ${y + 7} H${cx + w / 2 - 60}`} stroke="rgba(255,255,255,0.35)" strokeWidth={3} strokeLinecap="round" />
  </g>
);

/** Photo de l'urne posée sur la table du jet (couvercle mal fermé). */
export const UrnPhoto: React.FC<{ ajar?: boolean }> = ({ ajar = true }) => {
  const W = 400;
  const H = 300;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <CabinBg w={W} h={H} />
      <Table cx={190} y={208} w={250} legH={80} />
      <g transform="translate(190 208) scale(0.78)">
        <Urn lid={ajar ? 0.6 : 0} lidRot={ajar ? -6 : 0} lidX={ajar ? 6 : 0} id="up" />
      </g>
    </svg>
  );
};

/**
 * L'accident : le tuyau de l'aspirateur accroche le pied, la table bouge, l'urne glisse,
 * je la rattrape, le couvercle tombe.
 * tHit = tuyau touche le pied, tSlide = l'urne glisse, tCatch = rattrapée, tLid = couvercle qui tombe.
 */
export const Accident: React.FC<{ tHose: number; tHit: number; tSlide: number; tCatch: number; tLid: number }> = ({ tHose, tHit, tSlide, tCatch, tLid }) => {
  const { lin, frame, at } = useG();
  const W = 400;
  const H = 300;
  const hose = lin(tHose, tHit, Easing.out(Easing.cubic));
  const sinceHit = frame - at(tHit);
  const wobble = sinceHit > 0 ? Math.sin(sinceHit * 0.9) * 5 * Math.exp(-sinceHit / 18) : 0;
  const slide = lin(tSlide, tSlide + 0.6, Easing.in(Easing.quad));
  const catchK = lin(tCatch, tCatch + 0.35, Easing.out(Easing.back(1.6)));
  // l'urne glisse vers le bord et penche, puis est redressée (rattrapée)
  const ux = 190 + slide * 95 * (1 - catchK) + catchK * 40;
  const uy = 208 + slide * 40 * (1 - catchK) + catchK * -30;
  const urot = slide * 38 * (1 - catchK);
  const lidK = lin(tLid, tLid + 0.9, Easing.in(Easing.quad));
  const lidOff = frame >= at(tLid);
  const sinceCatch = frame - at(tCatch);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <CabinBg w={W} h={H} />
      <Table cx={190} y={208} w={250} legH={80} rot={wobble} />
      {/* tuyau d'aspirateur */}
      <path
        d={`M${430 - hose * 0} 300 C ${360 - hose * 80} ${270} ${300 - hose * 70} ${292} ${250 - hose * 40} ${283}`}
        stroke="#2c2f36"
        strokeWidth={14}
        fill="none"
        strokeLinecap="round"
      />
      <path d={`M${250 - hose * 40} 283 l-14 -4`} stroke="#14161a" strokeWidth={18} strokeLinecap="round" />
      {sinceHit >= 0 && sinceHit < 10 && (
        <g transform="translate(205 283)" opacity={1 - sinceHit / 10}>
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M0 0 L${Math.cos(i * 1.2 - 2.4) * 26} ${Math.sin(i * 1.2 - 2.4) * 26}`} stroke={GOLD} strokeWidth={4} strokeLinecap="round" />
          ))}
        </g>
      )}
      {/* main qui rattrape */}
      {sinceCatch >= 0 && (
        <g transform={`translate(${ux + 58} ${uy - 70}) scale(${Math.min(1, sinceCatch / 5)})`}>
          <path d="M0 0 C20 -10 46 -6 60 6 L60 30 C40 36 18 34 0 24 Z" fill="#e2b58f" />
          <path d="M60 2 H110 V34 H60 Z" fill="#1f2228" />
          <path d="M4 4 C-8 6 -10 18 2 20" fill="#e2b58f" />
        </g>
      )}
      <g transform={`translate(${ux} ${uy}) rotate(${urot}) scale(0.78)`}>
        <Urn
          lid={0.5}
          id="ua"
          lidX={lidOff ? -lidK * 160 : 0}
          lidY={lidOff ? lidK * 210 : 0}
          lidRot={lidOff ? -lidK * 260 : 0}
        />
      </g>
    </svg>
  );
};

/* ================================================================== moquette + aspirateur */

/** Vue de dessus : traînée grise sur la moquette beige, puis l'aspirateur passe dessus. */
export const CarpetTrail: React.FC<{ tTrail: number; tVac: number; tVacEnd: number }> = ({ tTrail, tVac, tVacEnd }) => {
  const { lin, frame } = useG();
  const W = 400;
  const H = 300;
  const trail = lin(tTrail, tTrail + 0.8);
  const vac = lin(tVac, tVacEnd, Easing.inOut(Easing.sin));
  const nx = 40 + vac * 330;
  const shake = vac > 0 && vac < 1 ? Math.sin(frame * 2.3) * 1.5 : 0;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="carpet" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#d8c8a8" />
          <circle cx="2" cy="2" r="1.2" fill="#cbb994" />
          <circle cx="6" cy="6" r="1.2" fill="#e0d2b5" />
        </pattern>
        <filter id="ash">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <clipPath id="sucked">
          <rect x={nx + 20} y={0} width={W} height={H} />
        </clipPath>
      </defs>
      <rect width={W} height={H} fill="url(#carpet)" />
      <g clipPath={vac > 0 ? "url(#sucked)" : undefined}>
        <g filter="url(#ash)" opacity={0.85 * trail}>
          <path d="M70 170 C120 150 170 175 220 160 C260 150 300 165 340 150" stroke="#77787b" strokeWidth={26 * trail} fill="none" strokeLinecap="round" />
          <circle cx={150} cy={190} r={9 * trail} fill="#86878a" />
          <circle cx={260} cy={135} r={7 * trail} fill="#86878a" />
          <circle cx={310} cy={180} r={6 * trail} fill="#86878a" />
        </g>
      </g>
      {/* traces de passage */}
      {vac > 0 && <rect x={40} y={120} width={nx - 20} height={80} fill="rgba(255,255,255,0.08)" />}
      {/* tête d'aspirateur (vue de dessus) */}
      {vac > 0 && vac < 1 && (
        <g transform={`translate(${nx} ${160 + shake})`}>
          <path d="M8 10 L90 170" stroke="#3a3e46" strokeWidth={18} strokeLinecap="round" />
          <path d="M8 10 L90 170" stroke="#5b616c" strokeWidth={6} strokeLinecap="round" />
          <rect x={-14} y={-62} width={34} height={124} rx={14} fill="#1f2228" />
          <rect x={14} y={-56} width={5} height={112} rx={2} fill="#E5484D" />
          <rect x={-10} y={-56} width={6} height={112} rx={3} fill="#3a3e46" />
        </g>
      )}
    </svg>
  );
};

/** Sac d'aspirateur (gris, poussiéreux). */
export const DustBag: React.FC<{ size?: number }> = ({ size = 180 }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120">
    <path d="M18 18 H82 C88 50 88 90 80 112 H20 C12 90 12 50 18 18 Z" fill="#c9c6bf" />
    <path d="M18 18 H82 L80 30 H20 Z" fill="#b3afa6" />
    <circle cx={50} cy={24} r={8} fill="#5a5d63" />
    <circle cx={50} cy={24} r={4} fill="#2a2c30" />
    <path d="M26 70 C40 62 60 78 74 68 L76 106 H24 Z" fill="#8b8c8f" opacity={0.6} />
    <circle cx={36} cy={88} r={3} fill="#e0b84c" />
    <circle cx={62} cy={94} r={2.5} fill="#d9a63a" />
  </svg>
);

/** Paquet de chips. */
export const Chips: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 80 100">
    <path d="M10 8 L70 8 L66 50 L70 92 L10 92 L14 50 Z" fill="#E5484D" />
    <path d="M10 8 L70 8 L68 16 L12 16 Z M10 92 L70 92 L68 84 L12 84 Z" fill="#b8323a" />
    <ellipse cx={40} cy={50} rx={18} ry={14} fill="#F4C542" />
    <text x={40} y={73} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={10} fill="#fff">
      CHIPS
    </text>
  </svg>
);

/** Jauge de remplissage de l'urne (« encore presque pleine »). */
export const UrnLevel: React.FC<{ t: number; level: number }> = ({ t, level }) => {
  const { lin } = useG();
  const k = lin(t, t + 0.8, Easing.out(Easing.cubic)) * level;
  return (
    <svg width={150} height={190} viewBox="-75 -200 150 210">
      <defs>
        <clipPath id="ulc">
          <path d="M-26 -14 C-62 -40 -66 -96 -40 -128 C-34 -136 -30 -140 -24 -146 H24 C30 -140 34 -136 40 -128 C66 -96 62 -40 26 -14 Z" />
        </clipPath>
      </defs>
      <Urn id="ul" />
      <g clipPath="url(#ulc)">
        <rect x={-70} y={-14 - 132 * k} width={140} height={132 * k} fill="rgba(110,110,115,0.55)" />
      </g>
    </svg>
  );
};

/* ================================================================== carte Corse */

/** Carte : décollage → Corse, avion sur une trajectoire en pointillés. */
export const MapCorse: React.FC<{ tFly: number; tFlyEnd: number }> = ({ tFly, tFlyEnd }) => {
  const { lin, frame } = useG();
  const p = lin(tFly, tFlyEnd, Easing.inOut(Easing.quad));
  // courbe de Bézier quadratique
  const P0 = [70, 70];
  const P1 = [190, 40];
  const P2 = [285, 165];
  const bx = (1 - p) ** 2 * P0[0] + 2 * (1 - p) * p * P1[0] + p * p * P2[0];
  const by = (1 - p) ** 2 * P0[1] + 2 * (1 - p) * p * P1[1] + p * p * P2[1];
  const dx = 2 * (1 - p) * (P1[0] - P0[0]) + 2 * p * (P2[0] - P1[0]);
  const dy = 2 * (1 - p) * (P1[1] - P0[1]) + 2 * p * (P2[1] - P1[1]);
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  const len = 330;
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sea" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#1f4f74" />
          <stop offset="1" stopColor="#0f2c45" />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill="url(#sea)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${-40 + ((frame * 0.4 + i * 90) % 480)} ${60 + i * 50} q 12 -6 24 0`} stroke="rgba(255,255,255,0.15)" strokeWidth={2} fill="none" />
      ))}
      {/* côte (continent) */}
      <path d="M0 0 H150 C130 30 100 40 80 70 C60 95 30 100 0 110 Z" fill="#c9b78f" />
      <text x={20} y={40} fontFamily={SANS} fontWeight={800} fontSize={13} fill="#5b4c2f" letterSpacing={2}>
        DÉPART
      </text>
      {/* Corse (forme simplifiée) */}
      <path
        d="M300 92 L306 102 L304 116 L312 126 L310 140 L318 156 L316 176 L322 196 L316 214 L312 236 L300 252 L290 246 L280 232 L270 220 L272 206 L262 196 L266 182 L258 170 L266 158 L262 146 L274 138 L280 126 L290 120 L292 106 Z"
        fill="#d9c79b"
        stroke="#f2e6c7"
        strokeWidth={2}
      />
      <text x={330} y={205} fontFamily={SERIF} fontStyle="italic" fontWeight={500} fontSize={22} fill="#fff">
        Corse
      </text>
      {/* trajectoire */}
      <path d={`M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`} stroke="rgba(255,255,255,0.3)" strokeWidth={2.5} fill="none" strokeDasharray="7 7" />
      <path d={`M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`} stroke={GOLD} strokeWidth={3.5} fill="none" pathLength={len} strokeDasharray={`${p * len} ${len}`} strokeLinecap="round" />
      <circle cx={P0[0]} cy={P0[1]} r={6} fill={GOLD} />
      <circle cx={P2[0]} cy={P2[1]} r={6 + Math.sin(frame / 5) * 1.5} fill="none" stroke="#fff" strokeWidth={2} opacity={p > 0.9 ? 1 : 0.4} />
      {/* avion */}
      <g transform={`translate(${bx} ${by}) rotate(${ang + 90})`}>
        <path d="M0 -16 L3 -6 L16 2 L16 6 L3 2 L2 10 L6 14 L6 16 L0 14 L-6 16 L-6 14 L-2 10 L-3 2 L-16 6 L-16 2 L-3 -6 Z" fill="#fff" />
      </g>
    </svg>
  );
};

/* ================================================================== horloge, minuteur */

export const Clock: React.FC<{ h: number; m?: number; size?: number; spin?: number }> = ({ h, m = 0, size = 120, spin = 0 }) => {
  const mAng = (m / 60) * 360 + spin * 360;
  const hAng = ((h % 12) / 12) * 360 + (m / 60) * 30 + spin * 30;
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100">
      <circle r={46} fill="#FAF8F3" stroke={GOLD} strokeWidth={3} />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d="M0 -40 V-34" stroke="#2a2a2e" strokeWidth={i % 3 === 0 ? 3 : 1.5} transform={`rotate(${i * 30})`} />
      ))}
      <path d="M0 4 V-22" stroke={INK} strokeWidth={5} strokeLinecap="round" transform={`rotate(${hAng})`} />
      <path d="M0 6 V-34" stroke={INK} strokeWidth={3} strokeLinecap="round" transform={`rotate(${mAng})`} />
      <circle r={4} fill={GOLD} />
    </svg>
  );
};

/** Anneau qui se remplit (minuteur) avec un libellé au centre. */
export const Ring: React.FC<{ k: number; size?: number; children?: React.ReactNode; color?: string }> = ({ k, size = 130, children, color = GOLD }) => (
  <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute", inset: 0 }}>
      <circle cx={50} cy={50} r={44} stroke="rgba(255,255,255,0.15)" strokeWidth={6} fill="none" />
      <circle cx={50} cy={50} r={44} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" pathLength={100} strokeDasharray={`${k * 100} 100`} transform="rotate(-90 50 50)" />
    </svg>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>{children}</div>
  </div>
);

/* ================================================================== valise et objets */

/** Cadre photo doré avec un portrait. */
export const FrameIcon: React.FC<{ size?: number }> = ({ size = 110 }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120">
    <defs>{defsGold("fg")}</defs>
    <rect x={4} y={4} width={92} height={112} rx={4} fill="url(#fg)" />
    <rect x={14} y={14} width={72} height={92} fill="#9cc6e8" />
    <rect x={14} y={70} width={72} height={36} fill="#cfd8e0" />
    <circle cx={50} cy={50} r={13} fill="#3a2c24" />
    <path d="M26 106 C28 80 72 80 74 106 Z" fill="#1d1f24" />
    <path d="M44 72 L50 84 L56 72 Z" fill="#fff" />
  </svg>
);

/** Plaid plié avec initiales brodées. */
export const Plaid: React.FC<{ size?: number }> = ({ size = 130 }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 120 96">
    <defs>
      <pattern id="tartan" width="24" height="24" patternUnits="userSpaceOnUse">
        <rect width="24" height="24" fill="#cdb48a" />
        <rect x="0" y="9" width="24" height="6" fill="#9a7a4c" opacity="0.7" />
        <rect x="9" y="0" width="6" height="24" fill="#9a7a4c" opacity="0.7" />
        <rect x="0" y="11" width="24" height="2" fill="#5c1b24" opacity="0.8" />
        <rect x="11" y="0" width="2" height="24" fill="#5c1b24" opacity="0.8" />
      </pattern>
    </defs>
    <rect x={4} y={20} width={112} height={72} rx={10} fill="url(#tartan)" />
    <path d="M4 34 C40 20 80 20 116 34 V20 C116 14 112 10 106 10 H14 C8 10 4 14 4 20 Z" fill="#b89b6d" />
    <circle cx={88} cy={62} r={17} fill="rgba(255,255,255,0.75)" />
    <text x={88} y={68} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={16} fill="#5c1b24">
      MB
    </text>
  </svg>
);

/** Montre dans son écrin. */
export const WatchBox: React.FC<{ size?: number; noBox?: boolean; shine?: number }> = ({ size = 120, noBox, shine = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>{defsGold("wg")}</defs>
    {!noBox && (
      <>
        <path d="M10 40 H90 V88 C90 92 86 94 82 94 H18 C14 94 10 92 10 88 Z" fill="#1c1d22" />
        <path d="M12 8 H88 L90 40 H10 Z" fill="#2a2c33" />
        <rect x={18} y={46} width={64} height={40} rx={4} fill="#efe6d6" />
      </>
    )}
    <rect x={44} y={noBox ? 10 : 44} width={12} height={noBox ? 80 : 44} rx={3} fill="#3a2c24" />
    <circle cx={50} cy={noBox ? 50 : 66} r={17} fill="url(#wg)" />
    <circle cx={50} cy={noBox ? 50 : 66} r={12} fill="#13151a" />
    <path d={`M50 ${noBox ? 50 : 66} V${noBox ? 42 : 58} M50 ${noBox ? 50 : 66} L56 ${noBox ? 53 : 69}`} stroke={GOLD} strokeWidth={2} strokeLinecap="round" />
    {shine > 0 && (
      <path
        d="M0 -10 Q1.2 -1.2 10 0 Q1.2 1.2 0 10 Q-1.2 1.2 -10 0 Q-1.2 -1.2 0 -10Z"
        fill="#fff"
        transform={`translate(64 ${noBox ? 36 : 52}) scale(${Math.sin(shine * Math.PI) * 0.9})`}
      />
    )}
  </svg>
);

/** Pile de livres sur la richesse. */
export const Books: React.FC<{ size?: number }> = ({ size = 130 }) => {
  const b = [
    { c: "#1f3a5f", t: "RICHE EN 30 JOURS", w: 108 },
    { c: "#7d1f2b", t: "MINDSET MILLION", w: 100 },
    { c: "#14161a", t: "LIBERTÉ FINANCIÈRE", w: 112 },
  ];
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 120 90">
      {b.map((x, i) => (
        <g key={i} transform={`translate(${(120 - x.w) / 2 + (i % 2) * 3} ${62 - i * 26})`}>
          <rect width={x.w} height={24} rx={3} fill={x.c} />
          <rect x={0} y={20} width={x.w} height={4} fill="rgba(255,255,255,0.15)" />
          <text x={x.w / 2} y={15} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={8} fill={GOLD} letterSpacing={0.6}>
            {x.t}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Valise en cuir (vue de face), couvercle qui s'ouvre de 0 à 1. */
const SuitcaseSVG: React.FC<{ open: number; size?: number }> = ({ open, size = 260 }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 200 160">
    <defs>
      <linearGradient id="leather" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#5a3420" />
        <stop offset="1" stopColor="#3a2014" />
      </linearGradient>
    </defs>
    {/* intérieur visible quand ouverte */}
    <rect x={14} y={60} width={172} height={14 * open} fill="#d9ccb5" />
    <rect x={10} y={70} width={180} height={84} rx={12} fill="url(#leather)" />
    <path d="M70 70 V60 C70 52 76 48 84 48 H116 C124 48 130 52 130 60 V70" stroke="#2a160d" strokeWidth={7} fill="none" opacity={1 - open} />
    {/* couvercle */}
    <g transform={`translate(100 70) scale(1 ${1 - open * 1.6}) translate(-100 -70)`}>
      <rect x={10} y={40} width={180} height={32} rx={10} fill="#6b3e26" />
    </g>
    {[18, 182].map((x) => (
      <rect key={x} x={x - 6} y={80} width={12} height={66} rx={3} fill={GOLD} opacity={0.85} />
    ))}
    <rect x={90} y={84} width={20} height={12} rx={3} fill={GOLD} />
  </svg>
);

export type Item = { t: number; node: React.ReactNode; label: string };

/**
 * Valise qui s'ouvre puis objets qui en sortent un à un (arc au-dessus).
 * Avec `closeAt`, les objets replongent dans la valise qui se referme (panique).
 */
export const Suitcase: React.FC<{ top: number; left?: number; tOpen: number; items: Item[]; closeAt?: number; label?: string }> = ({
  top,
  left = L,
  tOpen,
  items,
  closeAt,
  label,
}) => {
  const { lin, pop } = useG();
  const open = lin(tOpen, tOpen + 0.5, Easing.out(Easing.cubic)) * (closeAt ? 1 - lin(closeAt + 1.2, closeAt + 1.6) : 1);
  const back = closeAt ? lin(closeAt, closeAt + 1.3, Easing.in(Easing.cubic)) : 0;
  const W = 720;
  const slots = items.length;
  return (
    <Box top={top} left={left} width={W}>
      <div style={{ ...glass, borderRadius: 30, padding: "18px 24px 22px", width: W }}>
        {label && <Label>{label}</Label>}
        <div style={{ position: "relative", height: 380 }}>
          {items.map((it, i) => {
            const k = pop(it.t, 11, 170);
            const x = 10 + i * ((W - 48 - 190) / Math.max(1, slots - 1));
            const yUp = 6 + Math.abs(i - (slots - 1) / 2) * 22;
            const yIn = 250;
            const y = yIn + (yUp - yIn) * Math.min(1, k) * (1 - back);
            const s = (0.4 + 0.6 * Math.min(1.2, k)) * (1 - back * 0.6);
            return (
              <div key={i} style={{ position: "absolute", left: x, top: y, width: 190, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", opacity: Math.min(1, k * 2) * (1 - back * back), transform: `scale(${s}) rotate(${(1 - Math.min(1, k)) * -20 + back * (i % 2 ? 40 : -40)}deg)` }}>
                {it.node}
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 24, color: "#fff", marginTop: 6, textAlign: "center", lineHeight: 1.1, opacity: 1 - back }}>{it.label}</div>
              </div>
            );
          })}
          <div style={{ position: "absolute", left: W / 2 - 24 - 130, top: 172 }}>
            <SuitcaseSVG open={open} size={260} />
          </div>
        </div>
      </div>
    </Box>
  );
};

/* ================================================================== réseaux sociaux */

/** Carte profil d'influenceur avec compteur d'abonnés. */
export const Profile: React.FC<{ top: number; name: string; bio: string; followers: number; tCount: number; tBio?: number }> = ({ top, name, bio, followers, tCount, tBio }) => {
  const { lin } = useG();
  const n = Math.round(followers * lin(tCount, tCount + 0.9, Easing.out(Easing.cubic)));
  const txt = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (
    <Box top={top}>
      <div style={{ ...glass, borderRadius: 30, padding: "22px 30px 24px", width: 620, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 96, height: 96, borderRadius: 96, padding: 4, background: "linear-gradient(135deg,#feda75,#fa7e1e,#d62976,#962fbf)" }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 96, background: "#1d1f24", border: "3px solid #111", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
              <svg width={70} height={70} viewBox="0 0 70 70">
                <circle cx={35} cy={28} r={14} fill="#c9a27a" />
                <path d="M21 22 C22 10 48 10 49 22 C44 16 26 16 21 22 Z" fill="#2a1d14" />
                <rect x={24} y={24} width={22} height={6} rx={3} fill="#111" />
                <path d="M8 70 C10 48 60 48 62 70 Z" fill="#f3f3f3" />
                <path d="M30 50 L35 62 L40 50 Z" fill="#1d1f24" />
              </svg>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, display: "flex", alignItems: "center", gap: 10 }}>
              {name}
              <svg width={30} height={30} viewBox="0 0 24 24">
                <circle cx={12} cy={12} r={11} fill="#3b9cf5" />
                <path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 24, color: "rgba(255,255,255,0.65)" }}>@coach.business</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 34, alignItems: "baseline" }}>
          <div>
            <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 52, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{txt}</div>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, color: "rgba(255,255,255,0.6)" }}>abonnés</div>
          </div>
          {tBio !== undefined && (
            <div style={{ opacity: lin(tBio, tBio + 0.3) }}>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 28, color: GOLD }}>{bio}</div>
              <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, color: "rgba(255,255,255,0.6)" }}>formations en ligne</div>
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

/** Publication sur téléphone (photo + légende + likes). */
export const PhonePost: React.FC<{ top: number; left?: number; src: string; caption: string; tCaption: number; likes?: number; pos?: string; mirror?: boolean }> = ({
  top,
  left = L,
  src,
  caption,
  tCaption,
  likes = 0,
  pos,
  mirror,
}) => {
  const { lin, frame } = useG();
  const c = lin(tCaption, tCaption + 0.4);
  const nLikes = Math.round(likes * lin(tCaption, tCaption + 1.6, Easing.out(Easing.cubic)));
  const W = 440;
  return (
    <Box top={top} left={left} width={W + 24} rotate={-2}>
      <div style={{ background: "#0b0b0d", borderRadius: 58, padding: 12, boxShadow: "0 26px 70px rgba(0,0,0,0.6)", border: "2px solid #2a2b30" }}>
        <div style={{ borderRadius: 46, overflow: "hidden", background: "#fff", width: W }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "40px 18px 12px" }}>
            <div style={{ width: 44, height: 44, borderRadius: 44, background: "linear-gradient(135deg,#feda75,#d62976)" }} />
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 22, color: INK }}>coach.business</div>
          </div>
          <div style={{ width: W, height: W * 1.0, position: "relative" }}>
            <Still src={src} pos={pos} mirror={mirror} />
          </div>
          <div style={{ padding: "12px 18px 22px" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <svg width={34} height={34} viewBox="0 0 24 24">
                <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" fill={c > 0.5 ? "#FE2C55" : "none"} stroke={c > 0.5 ? "#FE2C55" : INK} strokeWidth={2} transform={`scale(${1 + 0.15 * Math.max(0, Math.sin((frame % 40) / 6.4) * (c > 0.5 ? 1 : 0))})`} style={{ transformOrigin: "12px 12px" }} />
              </svg>
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 22, color: INK }}>{nLikes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} j'aime</div>
            </div>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 26, color: INK, marginTop: 8, opacity: c, transform: `translateY(${(1 - c) * 10}px)` }}>
              <b>coach.business</b> {caption}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

/** Barres « avant / après » avec ×2. */
export const BarsX2: React.FC<{ t: number }> = ({ t }) => {
  const { lin } = useG();
  const a = lin(t - 0.4, t + 0.1, Easing.out(Easing.cubic));
  const b = lin(t, t + 0.6, Easing.out(Easing.back(1.4)));
  const H = 160;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 22, height: H + 40 }}>
      {[
        { k: a, h: 0.45, l: "avant", c: "rgba(255,255,255,0.35)" },
        { k: b, h: 0.95, l: "après", c: GOLD },
      ].map((x) => (
        <div key={x.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 70, height: H * x.h * x.k, background: x.c, borderRadius: 10 }} />
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, color: "rgba(255,255,255,0.75)" }}>{x.l}</div>
        </div>
      ))}
      <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 70, color: GOLD, opacity: b, marginBottom: 40, transform: `scale(${0.6 + 0.4 * b})` }}>×2</div>
    </div>
  );
};

/* ================================================================== petites icônes illustrées */

export const Glyph = {
  phone: (s = 64) => (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <rect x={18} y={6} width={28} height={52} rx={6} fill="#1d1f24" stroke={GOLD} strokeWidth={2} />
      <rect x={21} y={12} width={22} height={38} rx={2} fill="#3b6fa8" />
      <circle cx={32} cy={54} r={2} fill={GOLD} />
    </svg>
  ),
  glass: (s = 64) => (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <path d="M20 8 H44 C44 26 40 34 32 34 C24 34 20 26 20 8 Z" fill="rgba(255,255,255,0.18)" stroke="#fff" strokeWidth={2} />
      <path d="M21 18 H43 C42 28 38 32 32 32 C26 32 22 28 21 18 Z" fill="#c9a24a" />
      <path d="M32 34 V52 M22 54 H42" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  ),
  window: (s = 64) => (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <rect x={16} y={4} width={32} height={56} rx={16} fill="#cbbda4" />
      <rect x={20} y={9} width={24} height={46} rx={12} fill="#8fc3ef" />
      <path d="M22 40 C30 34 36 38 42 30" stroke="#fff" strokeWidth={3} fill="none" opacity={0.7} />
    </svg>
  ),
  finger: (s = 64) => (
    <svg width={s} height={s} viewBox="0 0 64 64" fill="none" stroke={GOLD} strokeWidth={2.2} strokeLinecap="round">
      <path d="M20 44 C16 30 22 14 34 14 C44 14 50 24 48 36" />
      <path d="M26 46 C22 34 26 22 34 22 C42 22 44 30 42 40" />
      <path d="M32 48 C30 40 30 30 34 30 C38 30 38 38 36 46" />
      <path d="M44 46 C46 40 48 36 48 36" />
    </svg>
  ),
  camera: (s = 64) => (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <rect x={6} y={18} width={52} height={36} rx={6} fill="#1d1f24" stroke={GOLD} strokeWidth={2} />
      <path d="M22 18 L26 10 H38 L42 18" fill="#1d1f24" stroke={GOLD} strokeWidth={2} />
      <circle cx={32} cy={36} r={11} fill="#2f3440" stroke="#fff" strokeWidth={2} />
      <circle cx={28} cy={32} r={3} fill="rgba(255,255,255,0.6)" />
    </svg>
  ),
  bag: (s = 64) => (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <rect x={10} y={22} width={44} height={34} rx={6} fill="#5a3420" />
      <path d="M24 22 V16 C24 12 26 10 30 10 H34 C38 10 40 12 40 16 V22" stroke="#2a160d" strokeWidth={4} fill="none" />
      <rect x={10} y={34} width={44} height={4} fill={GOLD} opacity={0.7} />
    </svg>
  ),
  people: (n: number, s = 46, color = GOLD) => (
    <div style={{ display: "flex", gap: 6 }}>
      {Array.from({ length: n }, (_, i) => (
        <svg key={i} width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
          <circle cx={12} cy={8} r={3.6} />
          <path d="M5 21 a7 7 0 0 1 14 0" />
        </svg>
      ))}
    </div>
  ),
  hand: (s = 64) => (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <path d="M18 34 V18 a4 4 0 0 1 8 0 V30 V12 a4 4 0 0 1 8 0 V30 V14 a4 4 0 0 1 8 0 V32 V22 a4 4 0 0 1 8 0 V40 C50 52 42 58 34 58 C26 58 20 54 16 46 L10 36 a4 4 0 0 1 7 -4 Z" fill="#e2b58f" />
    </svg>
  ),
};

/** Rangée de tuiles illustrées qui arrivent une à une. */
export const Tiles: React.FC<{ top: number; items: { t: number; icon: React.ReactNode; label: string }[]; label?: string }> = ({ top, items, label }) => {
  const { pop } = useG();
  return (
    <Box top={top}>
      {label && (
        <div style={{ marginBottom: 12 }}>
          <Label>{label}</Label>
        </div>
      )}
      <div style={{ display: "flex", gap: 16 }}>
        {items.map((it, i) => {
          const k = pop(it.t, 12, 190);
          return (
            <div
              key={i}
              style={{
                ...glass,
                width: 190,
                borderRadius: 26,
                padding: "18px 10px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                opacity: Math.min(1, k * 2),
                transform: `translateY(${(1 - Math.min(1, k)) * 30}px) scale(${0.7 + 0.3 * Math.min(1, k)})`,
              }}
            >
              {it.icon}
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 25, textAlign: "center", lineHeight: 1.1 }}>{it.label}</div>
            </div>
          );
        })}
      </div>
    </Box>
  );
};

/** Carte verre générique contenant une illustration + textes. */
export const IllusCard: React.FC<{ top: number; left?: number; width?: number; label?: string; children: React.ReactNode; t?: number; rotate?: number }> = ({
  top,
  left,
  width,
  label,
  children,
  t,
  rotate,
}) => (
  <Box top={top} left={left} width={width} t={t} rotate={rotate}>
    <div style={{ ...glass, borderRadius: 30, padding: "20px 24px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
      {label && <Label>{label}</Label>}
      {children}
    </div>
  </Box>
);

/** Image dans une carte arrondie (scène SVG). */
export const SceneFrame: React.FC<{ w: number; h: number; children: React.ReactNode }> = ({ w, h, children }) => (
  <div style={{ width: w, height: h, borderRadius: 18, overflow: "hidden" }}>{children}</div>
);

export const Big: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 40, color = "#fff" }) => (
  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: size, lineHeight: 1.15, color }}>{children}</div>
);

export const Sub: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 28, color = "rgba(255,255,255,0.75)" }) => (
  <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: size, lineHeight: 1.2, color }}>{children}</div>
);

export { usePop };
