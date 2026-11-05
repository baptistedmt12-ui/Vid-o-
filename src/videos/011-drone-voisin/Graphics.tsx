import React from "react";
import { BODY, RED, TITLE, nbsp, useG } from "../_shared/kit";
import { Side, tone } from "../_shared/story";
import { DroneIcon } from "../_shared/story2";

/** Écran de la carte mémoire : REC, date qui défile, ce qu'on voit à l'image. */
export const Feed: React.FC<{ top: number; t: number; lines: { t: number; text: string }[]; tDays: [number, number] }> = ({ top, t, lines, tDays }) => {
  const { frame, at, pop, lin } = useG();
  const blink = Math.floor((frame - at(t)) / 12) % 2 === 0;
  const day = 1 + Math.round(41 * lin(tDays[0], tDays[1]));
  return (
    <Side top={top} t={t}>
      <div style={{ ...tone("dark"), borderRadius: 22, padding: 14, width: 460 }}>
        <div style={{ position: "relative", height: 190, borderRadius: 12, overflow: "hidden", background: "linear-gradient(180deg,#2c4a2a,#15240f)" }}>
          {/* jardin vu d'en haut : haie + terrasse */}
          <svg width={432} height={190} viewBox="0 0 432 190" style={{ position: "absolute", inset: 0 }}>
            <rect x={20} y={20} width={392} height={26} rx={10} fill="#3f7a35" />
            <rect x={20} y={20} width={392} height={26} rx={10} fill="none" stroke="#FFD23F" strokeWidth={3} strokeDasharray="10 8" />
            <rect x={240} y={90} width={150} height={80} rx={6} fill="#9a8a72" />
            <rect x={60} y={100} width={120} height={60} rx={30} fill="#2f6bb0" opacity={0.8} />
          </svg>
          <div style={{ position: "absolute", top: 10, left: 12, display: "flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 800, fontSize: 22, color: "#fff" }}>
            <div style={{ width: 14, height: 14, borderRadius: 14, background: RED, opacity: blink ? 1 : 0.2 }} /> REC
          </div>
          <div style={{ position: "absolute", top: 8, right: 12, fontFamily: TITLE, fontSize: 28, color: "#fff" }}>JOUR {day}</div>
        </div>
        {lines.map((l) => {
          const k = pop(l.t, 14, 200);
          return (
            <div key={l.text} style={{ fontFamily: BODY, fontWeight: 800, fontSize: 31, marginTop: 8, opacity: Math.min(1, k * 1.6), transform: `translateX(${(1 - k) * -24}px)` }}>
              {nbsp(l.text)}
            </div>
          );
        })}
      </div>
    </Side>
  );
};

/** Plan de la rue : le drone repart chez le voisin d'en face. */
export const Street: React.FC<{ top: number; t: number; tFly: number }> = ({ top, t, tFly }) => {
  const { lin, pop } = useG();
  const f = lin(tFly, tFly + 1.4);
  const lab = pop(tFly + 1.2, 13, 200);
  const x = 110 + 210 * f;
  const y = 150 - 80 * Math.sin(f * Math.PI);
  const House: React.FC<{ x: number; c: string; name: string; hl?: boolean }> = ({ x: hx, c, name, hl }) => (
    <g>
      <path d={`M${hx} 190 V130 L${hx + 50} 95 L${hx + 100} 130 V190 Z`} fill={c} stroke={hl ? "#FFD23F" : "#fff"} strokeWidth={hl ? 5 : 3} />
      <text x={hx + 50} y={182} textAnchor="middle" fontFamily="Inter, Arial" fontWeight={800} fontSize={18} fill="#fff">
        {name}
      </text>
    </g>
  );
  return (
    <Side top={top} t={t}>
      <div style={{ ...tone("dark"), borderRadius: 22, padding: 14, width: 460 }}>
        <svg width={432} height={200} viewBox="0 0 432 200">
          <rect x={190} y={60} width={52} height={140} fill="#3a3a42" />
          <line x1={216} y1={66} x2={216} y2={196} stroke="#fff" strokeWidth={3} strokeDasharray="12 10" />
          <House x={50} c="#2a2a30" name="CLIENT" />
          <House x={282} c="#2a2a30" name="VOISIN" hl={lab > 0.1} />
          <path d={`M110 150 Q216 40 330 150`} fill="none" stroke="#FFD23F" strokeWidth={3} strokeDasharray="8 8" opacity={f > 0 ? 0.8 : 0} />
          <g transform={`translate(${x - 20} ${y - 20})`}>
            <DroneIcon size={40} color="#FFD23F" />
          </g>
        </svg>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 30, opacity: lab, color: "#FFD23F" }}>Il redescend… chez le voisin d'en face</div>
      </div>
    </Side>
  );
};
