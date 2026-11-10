import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BODY } from "./kit";

// Titre permanent façon « texte TikTok » (style choisi par l'utilisateur, compte allemand) :
// lignes centrées sur fond blanc arrondi, texte noir gras, en pyramide (ligne 2 plus courte que la ligne 1),
// 1–2 emojis en fin de titre. Placé juste sous la zone de l'interface TikTok en haut.
// Hauteur ≈ 82 px par ligne : avec 2 lignes, le titre finit vers 410 px → étiquettes à partir de TITLE_BOTTOM.
export const TITLE_TOP = 245;
export const TITLE_LINE = 82;
export const titleBottom = (lines: number) => TITLE_TOP + lines * TITLE_LINE + 24;

export const Title: React.FC<{ lines: string[]; size?: number; top?: number }> = ({ lines, size = 56, top = TITLE_TOP }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = spring({ frame, fps, config: { damping: 14, stiffness: 180 } });
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        width: 1080,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${0.9 + 0.1 * k})`,
        opacity: Math.min(1, k * 2),
      }}
    >
      {lines.map((l, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            color: "#000",
            fontFamily: `${BODY}, "Noto Color Emoji"`,
            fontWeight: 700,
            fontSize: size,
            lineHeight: `${TITLE_LINE}px`,
            padding: "0 22px",
            borderRadius: 18,
            marginTop: i ? -8 : 0,
            whiteSpace: "nowrap",
            letterSpacing: -0.5,
          }}
        >
          {l}
        </div>
      ))}
    </div>
  );
};
