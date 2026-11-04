import React from "react";

// Petites icônes SVG blanches (ou de la couleur donnée).
type P = { size?: number; color?: string };

export const PhoneIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={color} d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
  </svg>
);

export const ClockIcon: React.FC<P & { h?: number; m?: number }> = ({ size = 44, color = "#fff", h = 5, m = 0 }) => {
  const ha = ((h % 12) + m / 60) * 30 * (Math.PI / 180);
  const ma = m * 6 * (Math.PI / 180);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx={12} cy={12} r={9.5} fill="none" stroke={color} strokeWidth={2.4} />
      <line x1={12} y1={12} x2={12 + 5 * Math.sin(ha)} y2={12 - 5 * Math.cos(ha)} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <line x1={12} y1={12} x2={12 + 7.5 * Math.sin(ma)} y2={12 - 7.5 * Math.cos(ma)} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
};

export const PinIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={color} d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

export const ShareIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={color} d="M14 5V1l9 8-9 8v-4.1C8 12.9 4.1 15 1 20c1-6 4.6-12.3 13-15z" />
  </svg>
);

export const EyeOffIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="none" stroke={color} strokeWidth={2.2} d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx={12} cy={12} r={3} fill={color} />
    <line x1={3} y1={21} x2={21} y2={3} stroke={color} strokeWidth={2.6} strokeLinecap="round" />
  </svg>
);

export const BellIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={color} d="M12 22a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 22zm7-6V11a7 7 0 0 0-5.5-6.8V3a1.5 1.5 0 0 0-3 0v1.2A7 7 0 0 0 5 11v5l-2 2v1h18v-1z" />
  </svg>
);

export const MagnifierIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx={10} cy={10} r={6.5} fill="none" stroke={color} strokeWidth={2.6} />
    <line x1={15} y1={15} x2={21} y2={21} stroke={color} strokeWidth={3} strokeLinecap="round" />
  </svg>
);

export const WarnIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={color} d="M12 2 1 21h22L12 2zm1 16h-2v-2h2v2zm0-4h-2V9h2v5z" />
  </svg>
);

export const EuroIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <text x={12} y={18.5} textAnchor="middle" fontFamily="Inter, Arial" fontWeight={800} fontSize={19} fill={color}>€</text>
  </svg>
);

export const RunIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx={14.5} cy={4} r={2.2} fill={color} />
    <path fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" d="M7 11l3-3.5 4 1.5 2 3.5 3 1M10 8l-1.5 6 4 3-1 5M8.5 14 5 20" />
  </svg>
);

/** Silhouette de moto tout-terrain. */
export const MotoIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 32 24">
    <circle cx={7} cy={16} r={5} fill="none" stroke={color} strokeWidth={2.2} />
    <circle cx={25} cy={16} r={5} fill="none" stroke={color} strokeWidth={2.2} />
    <path fill={color} d="M10 9h8l3 4h-3l-2-2h-6zM18 6h4l1.5 3-2 .6L20.5 8H18z" />
    <path fill="none" stroke={color} strokeWidth={2.2} strokeLinejoin="round" d="M7 16l5-6M25 16l-4-7M12 13h7" />
  </svg>
);

/** Poussette. */
export const StrollerIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={color} d="M13 2v8h8a8 8 0 0 0-8-8z" />
    <path fill="none" stroke={color} strokeWidth={2.2} strokeLinejoin="round" d="M2 6h2.5l1.5 4h15a7 7 0 0 1-7 6H9a5 5 0 0 1-3-6" />
    <circle cx={8} cy={20} r={2} fill={color} />
    <circle cx={17} cy={20} r={2} fill={color} />
  </svg>
);

export const HeartIcon: React.FC<P> = ({ size = 44, color = "#E10600" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={color} d="M12 21s-7.5-4.6-9.6-9.2C.8 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.2 1.8-2 3.3-3.2 5.4-3.2 3.6 0 5.8 3.7 4.2 7.3C19.5 16.4 12 21 12 21z" />
  </svg>
);

export const LockIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="none" stroke={color} strokeWidth={2.4} d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" />
    <rect x={4.5} y={10} width={15} height={11} rx={2.5} fill={color} />
  </svg>
);

export const HandIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={color} d="M7 11V5.5a1.5 1.5 0 0 1 3 0V10h.5V3.5a1.5 1.5 0 0 1 3 0V10h.5V4.5a1.5 1.5 0 0 1 3 0V11h.5V7.5a1.5 1.5 0 0 1 3 0V15a7 7 0 0 1-7 7h-1a7 7 0 0 1-5.6-2.8L3.4 15a1.6 1.6 0 0 1 2.4-2.1L7 14z" />
  </svg>
);

export const ShoeIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={color} d="M2 15.5c0-2 .6-6.5 1.5-8.5h3l1 2.5c1.6 1.4 4.3 2.6 7.4 3.4 4 1 7.1 1.8 7.1 4.6v1H2z" />
    <rect x={2} y={19} width={20} height={2} rx={1} fill={color} />
  </svg>
);

export const HomeIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={color} d="M12 3 2 11h3v10h5v-6h4v6h5V11h3z" />
  </svg>
);

export const ShieldIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={color} d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" />
  </svg>
);

export const CartIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="none" stroke={color} strokeWidth={2.2} strokeLinejoin="round" d="M2 3h3l2.4 11.5h11L21 7H6.2" />
    <circle cx={9} cy={19.5} r={1.8} fill={color} />
    <circle cx={17} cy={19.5} r={1.8} fill={color} />
  </svg>
);

export const MessageIcon: React.FC<P> = ({ size = 44, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={color} d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
  </svg>
);
