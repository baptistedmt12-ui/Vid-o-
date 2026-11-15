import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { BODY, RED } from "../_shared/kit";
import { CX } from "./timeline";
import { LIGNES } from "./voix";

// Sous-titres mot à mot, par petits groupes, au-dessus de la zone basse de TikTok.
const CHIFFRES: Record<string, string> = { "vingt-quatre": "24", "quarante-huit": "48", Sept: "7", neuf: "9", trois: "3", quatre: "4" };
// « un virgule six gramme » → « 1,6 g »
const FUSION: Record<string, string> = { "un virgule six gramme": "1,6 g" };

type Mot = { m: string; t0: number; t1: number };
type Groupe = { mots: Mot[]; t0: number; t1: number };

const GROUPES: Groupe[] = (() => {
  const res: Groupe[] = [];
  LIGNES.forEach((l, li) => {
    let mots: Mot[] = l.mots.map((x) => ({ ...x, m: CHIFFRES[x.m] ?? x.m }));
    for (const [k, v] of Object.entries(FUSION)) {
      const seq = k.split(" ");
      for (let i = 0; i + seq.length <= mots.length; i++) {
        if (seq.every((q, j) => mots[i + j].m === q)) {
          mots = [...mots.slice(0, i), { m: v, t0: mots[i].t0, t1: mots[i + seq.length - 1].t1 }, ...mots.slice(i + seq.length)];
        }
      }
    }
    let cur: Mot[] = [];
    const flush = () => {
      if (cur.length) res.push({ mots: cur, t0: cur[0].t0, t1: cur[cur.length - 1].t1 });
      cur = [];
    };
    mots.forEach((m) => {
      const len = cur.reduce((n, x) => n + x.m.length + 1, 0);
      if (cur.length >= 4 || len + m.m.length > 20) flush();
      cur.push(m);
      if (/[.,:?!]$/.test(m.m) && cur.length >= 2) flush();
    });
    flush();
  });
  // chaque groupe reste affiché jusqu'au suivant (0,6 s max après son dernier mot)
  res.forEach((g, i) => {
    const next = res[i + 1]?.t0 ?? g.t1 + 0.6;
    g.t1 = Math.min(next, g.t1 + 0.6);
  });
  return res;
})();

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const g = GROUPES.find((x) => t >= x.t0 - 0.04 && t < x.t1);
  if (!g) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 1296,
        left: CX - 430,
        width: 860,
        height: 110,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 14,
        fontFamily: BODY,
        fontWeight: 800,
        fontSize: 60,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {g.mots.map((m, i) => {
        const on = t >= m.t0 - 0.04 && (i === g.mots.length - 1 || t < g.mots[i + 1].t0 - 0.04);
        const said = t >= m.t0 - 0.04;
        return (
          <span
            key={i}
            style={{
              padding: "4px 14px",
              borderRadius: 16,
              background: on ? RED : "transparent",
              color: said ? "#fff" : "rgba(255,255,255,0.55)",
              transform: `scale(${on ? 1.06 : 1})`,
              textShadow: on ? "none" : "0 4px 0 rgba(0,0,0,0.6), 0 0 18px rgba(0,0,0,0.9)",
            }}
          >
            {m.m}
          </span>
        );
      })}
    </div>
  );
};
