import React from "react";
import { RED } from "../_shared/kit";

/** Arrière de citadine noire (vue de 3/4) avec la bosse marquée au-dessus du feu. */
export const CarRear: React.FC<{ size?: number }> = ({ size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 70 70">
    <circle cx={35} cy={35} r={35} fill="#0B0B0D" />
    <path d="M12 44 L16 30 Q19 22 27 21 L45 21 Q52 22 55 30 L58 44 Q58 50 52 50 L18 50 Q12 50 12 44Z" fill="#2a2a30" stroke="#fff" strokeWidth={2} />
    <path d="M20 31 Q22 25 28 25 L42 25 Q48 25 50 31Z" fill="#7fb4e6" opacity={0.6} />
    <rect x={15} y={36} width={9} height={6} rx={2} fill={RED} />
    <rect x={46} y={36} width={9} height={6} rx={2} fill={RED} />
    <circle cx={50.5} cy={32} r={4.5} fill="none" stroke="#FFD23F" strokeWidth={2.4} />
  </svg>
);
