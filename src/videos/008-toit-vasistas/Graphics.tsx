import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { BODY, RED, clamp, useG } from "../_shared/kit";
import { Side, tone } from "../_shared/story";

export const MoonIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="#FFD23F" d="M15.5 2.5A9.5 9.5 0 1 0 21.5 17 8 8 0 0 1 15.5 2.5z" />
  </svg>
);

/** Coupe du garage : voiture, vasistas au plafond, qui s'allume. */
export const Garage: React.FC<{ top: number; t: number; tLight: number }> = ({ top, t, tLight }) => {
  const { pop, lin } = useG();
  const car = pop(t + 0.3, 14, 160);
  const glow = lin(tLight, tLight + 0.4);
  const pulse = 0.6 + 0.4 * Math.sin(glow * Math.PI * 3);
  return (
    <Side top={top} t={t}>
      <div style={{ ...tone("dark"), borderRadius: 26, padding: 18, width: 460 }}>
        <svg width={424} height={250} viewBox="0 0 424 250">
          {/* murs + toit */}
          <path d="M20 240 V80 L212 14 L404 80 V240" fill="none" stroke="#fff" strokeWidth={5} strokeLinejoin="round" />
          <line x1={10} y1={240} x2={414} y2={240} stroke="#fff" strokeWidth={5} />
          {/* vasistas */}
          <rect x={250} y={36} width={70} height={22} rx={4} transform="rotate(-19 285 47)" fill={glow > 0 ? "#FFD23F" : "#3a3a42"} stroke="#fff" strokeWidth={3} opacity={glow > 0 ? pulse : 1} />
          {glow > 0 && <path d="M285 60 L252 150 M285 60 L318 150" stroke="#FFD23F" strokeWidth={3} strokeDasharray="8 8" opacity={glow} />}
          {/* porte verrouillée */}
          <rect x={36} y={130} width={60} height={110} fill="none" stroke="#fff" strokeWidth={4} />
          <circle cx={84} cy={186} r={5} fill={RED} />
          {/* voiture */}
          <g transform={`translate(${(1 - car) * 200} 0)`} opacity={car}>
            <path d="M150 226 L158 196 Q168 172 196 170 L300 170 Q326 172 340 196 L352 226 Z" fill="#1d1d22" stroke="#fff" strokeWidth={3} />
            <rect x={196} y={164} width={110} height={6} rx={3} fill="#9a9aa2" />
            <circle cx={190} cy={230} r={14} fill="#0B0B0D" stroke="#fff" strokeWidth={3} />
            <circle cx={316} cy={230} r={14} fill="#0B0B0D" stroke="#fff" strokeWidth={3} />
            <ellipse cx={262} cy={170} rx={14} ry={5} fill="none" stroke={RED} strokeWidth={3} />
          </g>
        </svg>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 32, marginTop: 6, color: glow > 0 ? "#FFD23F" : "#fff" }}>
          {glow > 0 ? "Un vasistas, juste au-dessus" : "Le garage"}
        </div>
      </div>
    </Side>
  );
};

/** Empreinte de semelle qui apparaît dans la poussière. */
export const Footprint: React.FC<{ top: number; t: number; tLabel: number }> = ({ top, t, tLabel }) => {
  const { lin, pop } = useG();
  const k = lin(t, t + 1.2);
  const l = pop(tLabel, 13, 200);
  const marks = Array.from({ length: 9 }, (_, i) => i);
  return (
    <Side top={top} t={t} from="up">
      <div style={{ ...tone("white"), borderRadius: 26, padding: "18px 24px", width: 420, display: "flex", alignItems: "center", gap: 18 }}>
        <svg width={120} height={220} viewBox="0 0 60 110">
          <path d="M30 4 C46 4 52 22 50 40 C48 56 42 62 42 70 L40 70 C30 70 18 68 14 54 C9 36 12 4 30 4Z" fill="#8a8178" opacity={k * 0.85} />
          <path d="M20 80 C34 78 42 82 42 92 C42 104 34 108 26 106 C18 104 14 96 16 88Z" fill="#8a8178" opacity={Math.max(0, k * 1.4 - 0.4) * 0.85} />
          {marks.map((i) => (
            <rect key={i} x={18} y={12 + i * 6} width={26} height={2.4} rx={1.2} fill="#fff" opacity={k * 0.7} />
          ))}
        </svg>
        <div style={{ opacity: l, transform: `translateX(${(1 - l) * 20}px)` }}>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: "#77777c" }}>DANS LA POUSSIÈRE</div>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 36, lineHeight: 1.15 }}>Une trace de semelle</div>
        </div>
      </div>
    </Side>
  );
};

/** Comparatif des pointures. */
export const Sizes: React.FC<{ top: number; rows: { t: number; who: string; size: string; ok?: boolean }[]; tHead: number }> = ({ top, rows, tHead }) => {
  const { pop } = useG();
  const h = pop(tHead, 10, 230);
  return (
    <Side top={top} t={tHead - 0.3}>
      <div style={{ ...tone("dark"), borderRadius: 26, padding: "18px 26px 20px", width: 460 }}>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 24, letterSpacing: 3, opacity: 0.6 }}>LA TRACE</div>
        <div style={{ fontFamily: "Anton, Impact, sans-serif", fontSize: 76, lineHeight: 1.05, color: "#FFD23F", transform: `scale(${h})`, transformOrigin: "0% 50%" }}>POINTURE 43</div>
        {rows.map((r) => {
          const k = pop(r.t, 14, 200);
          return (
            <div key={r.who} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px dashed rgba(255,255,255,0.18)", padding: "8px 0", opacity: Math.min(1, k * 1.6), transform: `translateX(${(1 - k) * -30}px)` }}>
              <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 32 }}>{r.who}</span>
              <span style={{ fontFamily: "Anton, Impact, sans-serif", fontSize: 44, color: r.ok ? "#22C55E" : RED, textDecoration: r.ok ? undefined : "line-through" }}>{r.size}</span>
            </div>
          );
        })}
      </div>
    </Side>
  );
};

/** Lumière qui s'allume d'un coup dans le garage (flash chaud). */
export const LightOn: React.FC<{ t: number }> = ({ t }) => {
  const { frame, at } = useG();
  const d = frame - at(t);
  const v = interpolate(d, [0, 2, 14], [0, 0.75, 0], clamp);
  const dark = interpolate(d, [-60, -10, 0], [0, 0.4, 0], clamp);
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: dark }} />
      <AbsoluteFill style={{ backgroundColor: "#FFF3C4", opacity: v }} />
    </>
  );
};
