import React from "react";
import { CenterPop } from "../_shared/center";
import { SceneFrame } from "../_shared/illus";
import { HeartIcon, MessageIcon } from "../_shared/icons";
import { G, sec, useG } from "../_shared/kit";
import { Call, Captions, Dot, Poll, Tag } from "../_shared/story";
import { StoryVideo } from "../_shared/StoryVideo";
import { CAPTIONS } from "./captions";

// Vidéo 022 — « Omas Löffel » (grande cuillère en bois, compte TikTok allemand). Voix Andrew (edge-tts).
// Habillage épuré (demande de l'utilisateur) : peu de graphiques, peu de bruitages, son d'origine audible sous la voix.
export const DURATION_S = 63.0;
export const TOTAL_FRAMES = sec(DURATION_S);
const DIR = "022-omas-loeffel";
const T = 300;

const SKIN = "#f0c8a5";

/** Personnage simple (vue de face). */
const Person: React.FC<{ x: number; y: number; s?: number; hair: string; shirt: string; bun?: boolean; tails?: boolean; glasses?: boolean; jam?: boolean }> = ({
  x,
  y,
  s = 1,
  hair,
  shirt,
  bun,
  tails,
  glasses,
  jam,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-42 150 Q-44 70 0 64 Q44 70 42 150Z" fill={shirt} />
    {tails && (
      <>
        <circle cx={-40} cy={8} r={14} fill={hair} />
        <circle cx={40} cy={8} r={14} fill={hair} />
      </>
    )}
    {bun && <circle cx={0} cy={-38} r={16} fill={hair} />}
    <circle cx={0} cy={14} r={34} fill={SKIN} />
    <path d="M-35 10 Q-34 -24 0 -24 Q34 -24 35 10 Q20 -6 0 -6 Q-20 -6 -35 10Z" fill={hair} />
    <circle cx={-12} cy={14} r={3.5} fill="#333" />
    <circle cx={12} cy={14} r={3.5} fill="#333" />
    {glasses && (
      <g fill="none" stroke="#555" strokeWidth={2.5}>
        <circle cx={-12} cy={14} r={9} />
        <circle cx={12} cy={14} r={9} />
        <path d="M-3 14 H3" />
      </g>
    )}
    <path d="M-10 30 Q0 38 10 30" stroke="#a5523a" strokeWidth={3} fill="none" strokeLinecap="round" />
    {jam && (
      <g fill="#c8102e" opacity={0.85}>
        <circle cx={-20} cy={28} r={6} />
        <circle cx={18} cy={-2} r={5} />
        <circle cx={8} cy={38} r={4} />
        <ellipse cx={-6} cy={-12} rx={7} ry={4} />
      </g>
    )}
  </g>
);

/** Marmite de confiture fumante. */
const Pot: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) => (
  <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d={`M${-30 + i * 30} -20 q -12 -20 0 -40 q 12 -20 0 -40`}
        stroke="#fff"
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
        opacity={0.5 + 0.3 * Math.sin(k * 6 + i)}
        transform={`translate(0 ${-8 * Math.sin(k * 4 + i)})`}
      />
    ))}
    <rect x={-80} y={-10} width={160} height={90} rx={18} fill="#4a4f57" />
    <ellipse cx={0} cy={-10} rx={80} ry={16} fill="#c8102e" />
    <rect x={-100} y={4} width={22} height={12} rx={6} fill="#4a4f57" />
    <rect x={78} y={4} width={22} height={12} rx={6} fill="#4a4f57" />
  </g>
);

/** Grande cuillère en bois. */
const Spoon: React.FC<{ x: number; y: number; rot: number; s?: number }> = ({ x, y, rot, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-6} y={-150} width={12} height={130} rx={6} fill="#d9a066" />
    <ellipse cx={0} cy={0} rx={22} ry={32} fill="#d9a066" />
    <ellipse cx={0} cy={2} rx={14} ry={22} fill="#c38a52" />
  </g>
);

const OmaMarmelade: React.FC = () => {
  const { frame } = useG();
  const k = frame / 30;
  return (
    <SceneFrame bg="#fff1dc">
      <rect y={300} width={572} height={80} fill="#b5835a" />
      <Person x={150} y={140} s={1.25} hair="#d9d9d9" shirt="#7a9cc6" bun glasses />
      <Spoon x={330 + 10 * Math.sin(k * 5)} y={250} rot={-30 + 12 * Math.sin(k * 5)} />
      <Pot x={380} y={250} k={k} />
    </SceneFrame>
  );
};

const Generationen: React.FC = () => {
  const { frame } = useG();
  const k = Math.min(1, frame / 40);
  const sx = 140 + 290 * k;
  return (
    <SceneFrame bg="#fdf3e7">
      <Person x={110} y={120} s={1.15} hair="#d9d9d9" shirt="#7a9cc6" bun glasses />
      <Person x={290} y={135} s={1.0} hair="#6b4226" shirt="#E10600" />
      <Person x={450} y={175} s={0.8} hair="#8a5a2b" shirt="#22C55E" tails />
      <Spoon x={sx} y={330} rot={70} s={0.8} />
      {[0, 1].map((i) => (
        <path key={i} d={`M${185 + i * 170} 300 l 26 0 l -8 -8 M${211 + i * 170} 300 l -8 8`} stroke="#b5835a" strokeWidth={5} fill="none" strokeLinecap="round" opacity={k > (i + 1) * 0.4 ? 1 : 0.2} />
      ))}
    </SceneFrame>
  );
};

const MaedchenStuhl: React.FC = () => {
  const { frame } = useG();
  const k = frame / 30;
  return (
    <SceneFrame bg="#ffeef0">
      <rect y={320} width={572} height={60} fill="#b5835a" />
      {/* chaise */}
      <rect x={110} y={250} width={130} height={14} rx={4} fill="#8a5a2b" />
      <rect x={118} y={262} width={12} height={70} fill="#8a5a2b" />
      <rect x={220} y={262} width={12} height={70} fill="#8a5a2b" />
      <Person x={175} y={88} s={1.05} hair="#8a5a2b" shirt="#f5b800" tails jam />
      <Spoon x={330 + 8 * Math.sin(k * 6)} y={235} rot={-35 + 14 * Math.sin(k * 6)} />
      <rect x={290} y={300} width={220} height={24} rx={6} fill="#7a5235" />
      <Pot x={400} y={232} k={k} />
    </SceneFrame>
  );
};

const CUTS = [
  { t: 5.6, type: "whip" as const },
  { t: 11.2, type: "zoom" as const },
  { t: 16.8, type: "whip" as const },
  { t: 22.4, type: "flash" as const },
  { t: 28.0, type: "whip" as const },
  { t: 33.6, type: "zoom" as const },
  { t: 39.2, type: "whip" as const },
  { t: 44.8, type: "zoom" as const },
  { t: 50.4, type: "whip" as const },
  { t: 55.1, type: "flash" as const },
  { t: 57.2, type: "flash" as const },
  { t: 59.97, type: "zoom" as const },
];

export const Video022: React.FC = () => (
  <StoryVideo
    dir={DIR}
    cuts={CUTS}
    zooms={[
      { t: 2.76, s: 1.06 },
      { t: 7.04, s: 1.06 },
      { t: 22.88, s: 1.07 },
      { t: 45.94, s: 1.05 },
      { t: 57.25, s: 1.06 },
    ]}
    ambiance={(t) => ((t >= 27.9 && t < 33.7) || (t >= 55.0 && t < 57.3) ? 0.04 : 0.1)}
    whoosh={0.07}
    sfx={{ pop: [11.0, 39.3, 50.0, 59.05] }}
  >
    <G from={0.15} to={4.4} name="Anruf">
      <Call top={T} t={0.25} caller="Eine Frau" sub="Neue Bestellung" reveal={{ t: 2.76, text: "Großer Holzlöffel" }} />
    </G>
    <G from={4.8} to={9.5} name="Kochen ?">
      <Tag top={T} t={5.5} tone="white" text="Zum Kochen?" size={32} />
      <Tag top={T + 90} t={7.04} tone="red" text="„Nein.“" size={32} />
    </G>
    <G from={10.9} to={13.7} name="Oma (centre)">
      <CenterPop t={11.0} caption="OMAS MARMELADE">
        <OmaMarmelade />
      </CenterPop>
    </G>
    <G from={18.7} to={24.0} name="Gestorben">
      <Tag top={T} t={18.92} icon={<Dot color="#fff"><HeartIcon size={30} /></Dot>} text="Im Frühling gestorben" size={30} />
      <Tag top={T + 96} t={22.88} tone="red" text="Löffel weggeworfen" size={30} />
    </G>
    <G from={24.2} to={28.4} name="Tochter">
      <Tag top={T} t={26.68} tone="white" text="„Wann machen wir Omas Marmelade?“" sub="Ihre Tochter, jeden Tag" size={28} />
    </G>
    <G from={39.1} to={41.6} name="Generationen (centre)">
      <CenterPop t={39.3} caption="FÜR GENERATIONEN">
        <Generationen />
      </CenterPop>
    </G>
    <G from={47.3} to={49.8} name="Foto">
      <Tag top={T} t={48.32} icon={<Dot><MessageIcon size={30} /></Dot>} text="Neue Nachricht · 1 Foto" size={30} />
    </G>
    <G from={49.9} to={52.7} name="Mädchen (centre)">
      <CenterPop t={50.0} caption="2 WOCHEN SPÄTER">
        <MaedchenStuhl />
      </CenterPop>
    </G>
    <G from={55.1} to={57.2} name="Vorher">
      <Tag top={T} t={55.2} tone="white" text="Vorher" size={30} />
    </G>
    <G from={57.2} to={59.0} name="Nachher">
      <Tag top={T} t={57.25} tone="green" text="Nachher" size={30} />
      <Tag top={T + 90} t={57.35} tone="red" text="„Omas Löffel“" size={32} />
    </G>
    <G from={59.0} to={DURATION_S} name="Umfrage">
      <Poll top={T} t={59.05} question="Habt ihr etwas von euren Großeltern?" a="JA" b="NEIN" footer="Antworte in den Kommentaren 👇" />
    </G>
    <Captions data={CAPTIONS} hl="#4FC3FF" />
  </StoryVideo>
);
