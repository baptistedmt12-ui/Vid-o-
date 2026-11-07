import React from "react";
import { BODY, GREEN, RED, TITLE, nbsp, useG } from "../_shared/kit";
import { Side, tone } from "../_shared/story";

export const GiftIcon: React.FC<{ size?: number; color?: string }> = ({ size = 38, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect x={3} y={9} width={18} height={4} rx={1} fill={color} />
    <rect x={4.5} y={13} width={15} height={8} rx={1} fill={color} />
    <rect x={11} y={9} width={2} height={12} fill="#E10600" />
    <path d="M12 9c-2-4-6-4-6-1.5S10 9 12 9zm0 0c2-4 6-4 6-1.5S14 9 12 9z" fill="none" stroke={color} strokeWidth={1.8} />
  </svg>
);

/** Balance qui penche : la peur de la mère d'un côté, le rêve du fils de l'autre. */
export const Balance: React.FC<{ top: number; t: number; tLeft: number; tRight: number }> = ({ top, t, tLeft, tRight }) => {
  const { pop, lin } = useG();
  const l = pop(tLeft, 13, 200);
  const r = pop(tRight, 13, 200);
  const tilt = -8 * lin(tLeft, tLeft + 0.6) + 16 * lin(tRight, tRight + 0.6);
  const Pan: React.FC<{ k: number; label: string; sub: string; color: string }> = ({ k, label, sub, color }) => (
    <div style={{ width: 190, textAlign: "center", opacity: Math.min(1, k * 1.6), transform: `scale(${0.7 + 0.3 * k})` }}>
      <div style={{ fontFamily: TITLE, fontSize: 38, color, lineHeight: 1.05 }}>{label}</div>
      <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 22, opacity: 0.8 }}>{nbsp(sub)}</div>
    </div>
  );
  return (
    <Side top={top} t={t}>
      <div style={{ ...tone("dark"), borderRadius: 24, padding: "16px 20px 18px", width: 460 }}>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 22, letterSpacing: 3, opacity: 0.6, marginBottom: 8 }}>IL HÉSITE DEPUIS DES MOIS</div>
        <svg width={420} height={70} viewBox="0 0 420 70">
          <polygon points="200,68 220,68 210,30" fill="#fff" />
          <g transform={`rotate(${tilt} 210 30)`}>
            <rect x={40} y={26} width={340} height={8} rx={4} fill="#fff" />
            <circle cx={50} cy={30} r={10} fill={RED} />
            <circle cx={370} cy={30} r={10} fill={GREEN} />
          </g>
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Pan k={l} label="SA PEUR" sub="à elle" color={RED} />
          <Pan k={r} label="SON RÊVE" sub="depuis 6 ans" color={GREEN} />
        </div>
      </div>
    </Side>
  );
};
