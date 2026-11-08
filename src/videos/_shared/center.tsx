import React from "react";
import { interpolate, spring } from "remotion";
import { BODY, TITLE, clamp, nbsp, useG } from "./kit";

// Grande illustration au centre de l'écran (~1–2 s), carte arrondie, sans couvrir les zones TikTok
// (centre à 540 px, largeur ≤ 620 px → reste à gauche de la colonne de droite à 900 px).

export const CenterPop: React.FC<{ t: number; width?: number; top?: number; caption?: string; children: React.ReactNode }> = ({
  t,
  width = 600,
  top = 560,
  caption,
  children,
}) => {
  const { frame, at, fps, exit } = useG();
  const local = frame - at(t);
  if (local < 0) return null;
  const k = spring({ frame: local, fps, config: { damping: 11, stiffness: 190 } });
  const wobble = Math.sin(local / 9) * 1.2;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 540 - width / 2 - 40,
        width,
        transform: `scale(${interpolate(k, [0, 1], [0.4, 1]) * (1 - exit * 0.25)}) rotate(${(1 - k) * -8 + wobble}deg)`,
        opacity: Math.min(1, k * 2) * (1 - exit),
        transformOrigin: "50% 50%",
      }}
    >
      <div style={{ background: "#fff", borderRadius: 34, padding: 14, boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }}>
        <div style={{ borderRadius: 24, overflow: "hidden" }}>{children}</div>
        {caption && (
          <div style={{ fontFamily: TITLE, fontSize: 44, color: "#0B0B0D", textAlign: "center", lineHeight: "64px" }}>{nbsp(caption)}</div>
        )}
      </div>
    </div>
  );
};

/** Petite animation 0→1 pour les illustrations. */
export const useAnim = (t: number, d = 0.6) => {
  const { lin } = useG();
  return lin(t, t + d);
};

export const Txt: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 30, color = "#0B0B0D" }) => (
  <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: size, color }}>{children}</span>
);

export { clamp };
