import React from "react";
import { interpolate, spring } from "remotion";
import { Captions, type Caption } from "./story";
import { StoryVideo } from "./StoryVideo";
import { Title, titleBottom } from "./title";
import { BODY, TITLE as TITLE_FONT, useG } from "./kit";

// Squelette des vidéos du compte allemand (bois fait main, à partir de la 024) :
// rush remonté à vitesse 1 (miroir à chaque coupe), titre en pyramide, sous-titres bleu clair,
// son d'origine en fond (plus bas sur les plans bruyants), très peu de bruitages.

const TYPES = ["whip", "zoom", "flash"] as const;

export const WoodVideo: React.FC<{
  dir: string;
  title: string[];
  captions: Caption[];
  cuts: number[];
  quiet?: [number, number][];
  zooms?: { t: number; s: number }[];
  pops?: number[];
  children?: React.ReactNode;
}> = ({ dir, title, captions, cuts, quiet = [], zooms = [], pops = [], children }) => (
  <StoryVideo
    dir={dir}
    cuts={cuts.map((t, i) => ({ t, type: TYPES[i % 3] }))}
    zooms={zooms}
    ambiance={(t) => (quiet.some(([a, b]) => t >= a && t < b) ? 0.05 : 0.11)}
    whoosh={0.07}
    sfx={{ pop: pops }}
  >
    {children}
    <Captions data={captions} hl="#4FC3FF" />
    <Title lines={title} size={58} />
  </StoryVideo>
);

/** Haut des étiquettes (sous un titre de 2 lignes). */
export const TOP = titleBottom(2);

/** Illustration « emoji » pour CenterPop : 1 à 3 grands emojis qui entrent l'un après l'autre sur un fond doux. */
export const EmojiScene: React.FC<{ items: string[]; bg?: string; arrow?: boolean; label?: string }> = ({
  items,
  bg = "#fff4e6",
  arrow,
  label,
}) => {
  const { frame, fps } = useG();
  return (
    <div style={{ width: 572, height: 330, background: bg, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, position: "relative" }}>
      {items.map((e, i) => {
        const k = spring({ frame: frame - 4 - i * 7, fps, config: { damping: 10, stiffness: 160 } });
        return (
          <React.Fragment key={i}>
            {arrow && i > 0 && (
              <span style={{ fontFamily: TITLE_FONT, fontSize: 64, color: "#b5835a", opacity: k }}>→</span>
            )}
            <span
              style={{
                fontFamily: `${BODY}, "Noto Color Emoji"`,
                fontSize: items.length === 1 ? 190 : items.length === 2 ? 150 : 120,
                transform: `scale(${interpolate(k, [0, 1], [0.2, 1])}) rotate(${(1 - k) * -20 + Math.sin((frame + i * 10) / 12) * 3}deg)`,
                opacity: Math.min(1, k * 2),
                display: "inline-block",
              }}
            >
              {e}
            </span>
          </React.Fragment>
        );
      })}
      {label && (
        <div style={{ position: "absolute", top: 16, left: 0, right: 0, textAlign: "center", fontFamily: BODY, fontWeight: 800, fontSize: 30, color: "#5b3a1e" }}>
          {label}
        </div>
      )}
    </div>
  );
};
