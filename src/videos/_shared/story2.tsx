import React from "react";
import { interpolate } from "remotion";
import { BODY, GREEN, RED, TITLE, clamp, nbsp, useG } from "./kit";
import { Side, tone } from "./story";

// Composants supplémentaires (vidéos 010 à 012), même style : petit, à gauche.

type P = { size?: number; color?: string };

export const DroneIcon: React.FC<P> = ({ size = 40, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect x={9} y={9} width={6} height={6} rx={1.5} fill={color} />
    <path d="M9.5 9.5 6 6 M14.5 9.5 18 6 M9.5 14.5 6 18 M14.5 14.5 18 18" stroke={color} strokeWidth={1.8} />
    {[
      [6, 6],
      [18, 6],
      [6, 18],
      [18, 18],
    ].map(([x, y]) => (
      <ellipse key={`${x}${y}`} cx={x} cy={y} rx={4} ry={1.3} fill="none" stroke={color} strokeWidth={1.4} />
    ))}
  </svg>
);

export const CardIcon: React.FC<P> = ({ size = 40, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M6 2h9l4 4v16H6z" fill={color} />
    {[8.5, 11, 13.5].map((x) => (
      <rect key={x} x={x} y={4} width={1.4} height={4} fill="#0B0B0D" />
    ))}
  </svg>
);

export const BottleIcon: React.FC<P> = ({ size = 40, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M10 2h4v4c0 1 3 2.5 3 6v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9c0-3.5 3-5 3-6z" fill={color} />
    <rect x={8.5} y={12} width={7} height={4} rx={0.6} fill="#E10600" />
  </svg>
);

export const EyeIcon: React.FC<P> = ({ size = 40, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="none" stroke={color} strokeWidth={2.2} d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx={12} cy={12} r={3.2} fill={color} />
  </svg>
);

export const DocIcon: React.FC<P> = ({ size = 40, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M6 2h8l5 5v15H6z" fill={color} />
    {[10, 13, 16].map((y) => (
      <rect key={y} x={8.5} y={y} width={8} height={1.4} rx={0.7} fill="#0B0B0D" />
    ))}
  </svg>
);

/** Carte : titre + lignes qui apparaissent une à une. */
export type CardRow = { t: number; text: string; right?: string; icon?: React.ReactNode; hot?: boolean };
export const Card: React.FC<{ top: number; t: number; title: string; rows: CardRow[]; width?: number; light?: boolean; rotate?: number; stamp?: { t: number; text: string; color?: string } }> = ({
  top,
  t,
  title,
  rows,
  width = 500,
  light,
  rotate = 0,
  stamp,
}) => {
  const { pop } = useG();
  const sk = stamp ? pop(stamp.t, 9, 240) : 0;
  const ink = light ? "#0B0B0D" : "#fff";
  return (
    <Side top={top} t={t} rotate={rotate}>
      <div style={{ ...tone(light ? "white" : "dark"), borderRadius: 24, padding: "18px 26px 20px", width, position: "relative" }}>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 22, letterSpacing: 3, opacity: 0.6, color: ink }}>{title}</div>
        {rows.map((r) => {
          const k = pop(r.t, 14, 200);
          return (
            <div
              key={r.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                justifyContent: "space-between",
                borderTop: `2px dashed ${light ? "#e1e1e6" : "rgba(255,255,255,0.16)"}`,
                padding: "8px 0",
                marginTop: 6,
                opacity: Math.min(1, k * 1.6),
                transform: `translateX(${(1 - k) * -30}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {r.icon}
                <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 31, lineHeight: 1.15, color: r.hot ? (light ? RED : "#FFD23F") : ink }}>{nbsp(r.text)}</span>
              </div>
              {r.right && <span style={{ fontFamily: TITLE, fontSize: 42, color: r.hot ? RED : ink, whiteSpace: "nowrap" }}>{r.right}</span>}
            </div>
          );
        })}
        {stamp && sk > 0.01 && (
          <div
            style={{
              position: "absolute",
              right: 16,
              bottom: 18,
              border: `5px solid ${stamp.color ?? RED}`,
              color: stamp.color ?? RED,
              fontFamily: TITLE,
              fontSize: 46,
              padding: "0 14px",
              borderRadius: 10,
              transform: `rotate(-10deg) scale(${2.4 - 1.4 * sk})`,
              opacity: Math.min(1, sk * 2),
              background: "rgba(255,255,255,0.92)",
              whiteSpace: "nowrap",
            }}
          >
            {stamp.text}
          </div>
        )}
      </div>
    </Side>
  );
};

/** Étapes numérotées 1-2-3 (colle, tire, marteau). */
export const Steps: React.FC<{ top: number; steps: { t: number; text: string }[] }> = ({ top, steps }) => {
  const { pop } = useG();
  return (
    <Side top={top} t={steps[0].t - 0.15}>
      <div style={{ ...tone("white"), borderRadius: 24, padding: "14px 26px", width: 440 }}>
        {steps.map((s, i) => {
          const k = pop(s.t, 14, 200);
          return (
            <div key={s.text} style={{ display: "flex", alignItems: "center", gap: 14, padding: "6px 0", opacity: Math.min(1, k * 1.6), transform: `translateX(${(1 - k) * -30}px)` }}>
              <div style={{ width: 44, height: 44, borderRadius: 44, background: GREEN, color: "#fff", fontFamily: TITLE, fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
              <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 32, color: "#0B0B0D" }}>{s.text}</span>
            </div>
          );
        })}
      </div>
    </Side>
  );
};

/** Bouchon qui part de la bouteille et frappe le toit (petite scène, à gauche). */
export const CorkShot: React.FC<{ top: number; t: number; tPop: number; label: string }> = ({ top, t, tPop, label }) => {
  const { lin, pop } = useG();
  const f = lin(tPop, tPop + 0.5);
  const hit = pop(tPop + 0.5, 8, 260);
  const x = 70 + 270 * f;
  const y = 170 - 150 * Math.sin(f * Math.PI * 0.8) + 40 * f;
  return (
    <Side top={top} t={t}>
      <div style={{ ...tone("dark"), borderRadius: 24, padding: 16, width: 440 }}>
        <svg width={408} height={210} viewBox="0 0 408 210">
          {/* voiture bleue */}
          <path d="M210 190 L222 150 Q236 118 280 116 L350 116 Q384 120 398 160 L404 190 Z" fill="#1f4fa8" stroke="#fff" strokeWidth={3} />
          <path d="M236 150 Q246 128 282 126 L344 126 Q372 128 384 150 Z" fill="#9cc3ff" opacity={0.5} />
          {/* bouteille */}
          <g transform="translate(30 98) rotate(-35)">
            <path d="M14 0h12v20c0 3 10 8 10 20v54H4V40c0-12 10-17 10-20z" fill="#2f5d3a" stroke="#fff" strokeWidth={2.5} />
            <rect x={6} y={50} width={28} height={16} fill="#FFD23F" />
          </g>
          {/* bouchon */}
          {f > 0 && f < 1 && <ellipse cx={x} cy={y} rx={9} ry={6} fill="#d8b07a" stroke="#fff" strokeWidth={2} />}
          {hit > 0.05 && <circle cx={336} cy={118} r={10 + 14 * hit} fill="none" stroke={RED} strokeWidth={5} opacity={interpolate(hit, [0, 1], [1, 0.6], clamp)} />}
        </svg>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 30 }}>{nbsp(label)}</div>
      </div>
    </Side>
  );
};
