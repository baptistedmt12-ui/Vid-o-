import React from "react";
import { useG } from "../_shared/kit";

// Illustrations « plein centre » de la vidéo 014 (dessins vectoriels, pas de photo).

const Grandma: React.FC<{ x: number; y: number; arm: number }> = ({ x, y, arm }) => (
  <g transform={`translate(${x} ${y})`}>
    {/* combinaison */}
    <path d="M-34 120 Q-40 40 0 30 Q40 40 34 120 Z" fill="#E10600" />
    <rect x={-30} y={70} width={60} height={10} fill="#0B0B0D" opacity={0.25} />
    {/* bras levé avec la coupe */}
    <g transform={`rotate(${-arm} 26 44)`}>
      <rect x={22} y={-6} width={14} height={54} rx={7} fill="#E10600" />
      <g transform="translate(29 -14)">
        <path d="M-16 -26 h32 v10 a16 16 0 0 1 -32 0 z" fill="#F5B800" />
        <rect x={-4} y={-4} width={8} height={10} fill="#F5B800" />
        <rect x={-10} y={6} width={20} height={6} rx={2} fill="#C98F00" />
      </g>
    </g>
    <rect x={-36} y={40} width={14} height={50} rx={7} fill="#E10600" />
    {/* tête */}
    <circle cx={0} cy={6} r={24} fill="#F2C9A5" />
    <circle cx={0} cy={-20} r={14} fill="#F4F4F4" />
    <path d="M-24 2 Q-26 -22 0 -24 Q26 -22 24 2 Q20 -10 0 -12 Q-20 -10 -24 2Z" fill="#F4F4F4" />
    <circle cx={-9} cy={8} r={6} fill="none" stroke="#333" strokeWidth={2.2} />
    <circle cx={9} cy={8} r={6} fill="none" stroke="#333" strokeWidth={2.2} />
    <path d="M-8 18 Q0 24 8 18" fill="none" stroke="#a0524b" strokeWidth={2.5} strokeLinecap="round" />
  </g>
);

/** Une mamie (en combinaison) sur la 3e marche du podium, coupe levée, confettis. */
export const GrandmaPodium: React.FC<{ t: number }> = ({ t }) => {
  const { lin, frame, at } = useG();
  const k = lin(t, t + 0.5);
  const arm = 40 + 40 * k;
  const local = frame - at(t);
  const conf = Array.from({ length: 26 }, (_, i) => i);
  return (
    <svg width={572} height={430} viewBox="0 0 572 430" style={{ display: "block" }}>
      <defs>
        <linearGradient id="sky14" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7cc6ff" />
          <stop offset="1" stopColor="#d9f0ff" />
        </linearGradient>
      </defs>
      <rect width={572} height={430} fill="url(#sky14)" />
      <rect y={380} width={572} height={50} fill="#8a6a3c" />
      {/* podium 2-1-3 */}
      <rect x={96} y={270} width={130} height={110} fill="#c7ccd6" />
      <rect x={226} y={220} width={130} height={160} fill="#F5B800" />
      <rect x={356} y={300} width={130} height={80} fill="#d08b4f" />
      {[["2", 161, 340], ["1", 291, 310], ["3", 421, 355]].map(([n, x, y]) => (
        <text key={n as string} x={x as number} y={y as number} textAnchor="middle" fontFamily="Anton, Impact" fontSize={54} fill="#fff">
          {n}
        </text>
      ))}
      {/* silhouettes des jeunes sur 1 et 2 */}
      <circle cx={161} cy={222} r={20} fill="#333" />
      <path d="M131 270 Q131 240 161 238 Q191 240 191 270Z" fill="#333" />
      <circle cx={291} cy={172} r={20} fill="#333" />
      <path d="M261 220 Q261 190 291 188 Q321 190 321 220Z" fill="#333" />
      <Grandma x={421} y={180} arm={arm} />
      {conf.map((i) => {
        const cx = (i * 97) % 572;
        const cy = ((i * 53 + local * (3 + (i % 4))) % 430) - 20;
        const c = ["#E10600", "#F5B800", "#22C55E", "#2b7bff", "#ffffff"][i % 5];
        return <rect key={i} x={cx} y={cy} width={10} height={6} fill={c} transform={`rotate(${(local * 7 + i * 30) % 360} ${cx} ${cy})`} opacity={k} />;
      })}
    </svg>
  );
};

/** L'écharpe « tricotée » achetée au marché, avec son étiquette. */
export const Scarf: React.FC<{ t: number }> = ({ t }) => {
  const { lin } = useG();
  const k = lin(t + 0.3, t + 0.8);
  const rows = Array.from({ length: 9 }, (_, i) => i);
  return (
    <svg width={572} height={330} viewBox="0 0 572 330" style={{ display: "block" }}>
      <rect width={572} height={330} fill="#f3e6d3" />
      <g transform="rotate(-12 286 165)">
        {rows.map((i) => (
          <rect key={i} x={70 + i * 48} y={120} width={48} height={90} fill={i % 2 ? "#c0392b" : "#f1f1f1"} />
        ))}
        {rows.map((i) => (
          <path key={`z${i}`} d={`M${70 + i * 48} 140 l12 -10 l12 10 l12 -10 l12 10`} stroke="#0B0B0D" strokeOpacity={0.15} strokeWidth={3} fill="none" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`f${i}`} x1={502} y1={130 + i * 18} x2={540} y2={134 + i * 18} stroke="#c0392b" strokeWidth={5} />
        ))}
      </g>
      <g transform={`translate(380 ${200 - 20 * k}) rotate(${10 - 10 * k})`} opacity={k}>
        <line x1={0} y1={0} x2={-30} y2={-30} stroke="#555" strokeWidth={2} />
        <rect x={-10} y={-4} width={130} height={56} rx={8} fill="#fff" stroke="#0B0B0D" strokeWidth={2} />
        <text x={55} y={32} textAnchor="middle" fontFamily="Inter, Arial" fontWeight={800} fontSize={22} fill="#0B0B0D">
          MARCHÉ · 12 €
        </text>
      </g>
    </svg>
  );
};

/** La coupe de la 3e place. */
export const Trophy: React.FC<{ t: number }> = ({ t }) => {
  const { lin, frame, at } = useG();
  const shine = lin(t + 0.2, t + 1.0);
  const local = frame - at(t);
  return (
    <svg width={572} height={360} viewBox="0 0 572 360" style={{ display: "block" }}>
      <rect width={572} height={360} fill="#1b1b22" />
      <g transform={`translate(286 190) rotate(${Math.sin(local / 6) * 3})`}>
        <path d="M-80 -120 h160 v40 a80 80 0 0 1 -160 0 z" fill="#d08b4f" />
        <path d="M-80 -104 q-46 0 -40 40 q6 30 44 30" fill="none" stroke="#d08b4f" strokeWidth={14} />
        <path d="M80 -104 q46 0 40 40 q-6 30 -44 30" fill="none" stroke="#d08b4f" strokeWidth={14} />
        <rect x={-14} y={0} width={28} height={50} fill="#b8743c" />
        <rect x={-60} y={50} width={120} height={36} rx={6} fill="#7a4a22" />
        <text x={0} y={-50} textAnchor="middle" fontFamily="Anton, Impact" fontSize={76} fill="#fff">
          3e
        </text>
        <rect x={-120 + 300 * shine} y={-130} width={30} height={230} fill="#fff" opacity={0.25 * Math.sin(shine * Math.PI)} transform="skewX(-20)" />
      </g>
    </svg>
  );
};
