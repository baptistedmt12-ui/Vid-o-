import React from "react";
import { BODY, RED, TITLE, useG } from "../_shared/kit";
import { Side, tone } from "../_shared/story";

/** Annonce de vente (générique) avec la voiture bordeaux. */
export const Annonce: React.FC<{ top: number; t: number; tSeen?: number }> = ({ top, t, tSeen }) => {
  const { pop } = useG();
  const s = tSeen ? pop(tSeen, 12, 200) : 0;
  return (
    <Side top={top} t={t} from="up" rotate={-2}>
      <div style={{ ...tone("white"), borderRadius: 22, overflow: "hidden", width: 400 }}>
        <div style={{ height: 170, background: "linear-gradient(160deg,#5a2a33,#2a1218)", position: "relative" }}>
          <svg width={400} height={170} viewBox="0 0 400 170">
            <path d="M60 130 L76 96 Q92 70 130 66 L270 66 Q306 70 324 96 L344 130 Z" fill="#7a3340" stroke="#fff" strokeWidth={3} />
            <line x1={200} y1={70} x2={200} y2={130} stroke="#fff" strokeWidth={2} opacity={0.6} />
            <rect x={164} y={98} width={24} height={6} rx={3} fill="#ddd" />
            <circle cx={112} cy={134} r={18} fill="#111" stroke="#fff" strokeWidth={3} />
            <circle cx={292} cy={134} r={18} fill="#111" stroke="#fff" strokeWidth={3} />
            {s > 0 && <circle cx={176} cy={90} r={22 * s} fill="none" stroke="#FFD23F" strokeWidth={4} />}
          </svg>
          <div style={{ position: "absolute", top: 12, left: 12, background: RED, color: "#fff", fontFamily: BODY, fontWeight: 800, fontSize: 20, padding: "4px 12px", borderRadius: 8 }}>À VENDRE</div>
        </div>
        <div style={{ padding: "12px 18px 16px" }}>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 28 }}>Berline bordeaux · état parfait</div>
          <div style={{ fontFamily: TITLE, fontSize: 40, color: RED }}>Visite samedi 9 h</div>
        </div>
      </div>
    </Side>
  );
};

/** Plan du parking : deux voitures côte à côte, la portière qui s'ouvre et tape. */
export const Parking: React.FC<{ top: number; t: number; tHit: number; label: string }> = ({ top, t, tHit, label }) => {
  const { lin, pop } = useG();
  const open = lin(tHit - 0.5, tHit);
  const hit = pop(tHit, 8, 260);
  return (
    <Side top={top} t={t}>
      <div style={{ ...tone("dark"), borderRadius: 26, padding: 18, width: 420 }}>
        <svg width={384} height={220} viewBox="0 0 384 220">
          {[40, 150, 260, 370].map((x) => (
            <line key={x} x1={x} y1={10} x2={x} y2={210} stroke="#fff" strokeWidth={3} strokeDasharray="12 10" opacity={0.5} />
          ))}
          {/* voiture du client */}
          <rect x={62} y={30} width={66} height={160} rx={20} fill="#7a3340" stroke="#fff" strokeWidth={3} />
          {/* l'autre voiture + portière qui s'ouvre */}
          <rect x={172} y={30} width={66} height={160} rx={20} fill="#3a3a42" stroke="#fff" strokeWidth={3} />
          <line x1={172} y1={86} x2={172 - 46 * open} y2={86 + 22 * open} stroke="#FFD23F" strokeWidth={7} strokeLinecap="round" />
          {hit > 0.05 && <circle cx={128} cy={106} r={14 + 10 * hit} fill="none" stroke={RED} strokeWidth={5} opacity={1.2 - hit * 0.4} />}
        </svg>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 30, marginTop: 4 }}>{label}</div>
      </div>
    </Side>
  );
};

/** Ticket de réparation (payé par l'acheteur). */
export const Facture: React.FC<{ top: number; t: number; tPaid: number }> = ({ top, t, tPaid }) => {
  const { pop } = useG();
  const p = pop(tPaid, 9, 240);
  return (
    <Side top={top} t={t} rotate={2}>
      <div style={{ ...tone("white"), borderRadius: 18, padding: "18px 24px", width: 420, position: "relative" }}>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 22, letterSpacing: 3, color: "#77777c" }}>RÉPARATION PORTIÈRE</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 6 }}>
          <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 30 }}>Débosselage</span>
          <span style={{ fontFamily: TITLE, fontSize: 48 }}>180 €</span>
        </div>
        <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 26, color: "#55555a" }}>Payé par : l'acheteur</div>
        <div
          style={{
            position: "absolute",
            right: 14,
            top: 50,
            border: "5px solid #22C55E",
            color: "#22C55E",
            fontFamily: TITLE,
            fontSize: 44,
            padding: "0 14px",
            borderRadius: 10,
            transform: `rotate(-12deg) scale(${2.4 - 1.4 * p})`,
            opacity: Math.min(1, p * 2),
            background: "rgba(255,255,255,0.9)",
          }}
        >
          PAYÉ
        </div>
      </div>
    </Side>
  );
};
