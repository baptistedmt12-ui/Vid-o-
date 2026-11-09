import React from "react";
import { CenterPop } from "../_shared/center";
import { SceneFrame } from "../_shared/illus";
import { ClockIcon, HandIcon, MagnifierIcon, PhoneIcon } from "../_shared/icons";
import { G, sec, useG } from "../_shared/kit";
import { Dot, Poll, Punch, Say, Tag, Talk } from "../_shared/story";
import { Card } from "../_shared/story2";
import { StoryVideo, cutsFrom } from "../_shared/StoryVideo";

// Vidéo 019 — « Le mec dans le coffre » (voiture grise, portière sous la vitre). Hook n° 7. Voix Maxime.
export const DURATION_S = 64.59;
export const TOTAL_FRAMES = sec(DURATION_S);
const DIR = "019-mec-dans-le-coffre";
const T = 300;

const Coffre: React.FC = () => {
  const { lin, frame, at } = useG();
  const open = lin(36.3, 36.9);
  const z = (frame - at(36.3)) / 30;
  return (
    <SceneFrame bg="#2a2a30">
      <rect x={60} y={150} width={452} height={200} rx={20} fill="#7d8088" />
      <rect x={90} y={180} width={392} height={150} rx={10} fill="#1a1a1f" />
      {/* le témoin en costume, roulé en boule, cravate sur la tête */}
      <ellipse cx={290} cy={280} rx={150} ry={42} fill="#20232c" />
      <circle cx={170} cy={262} r={30} fill="#f0c8a5" />
      <rect x={140} y={226} width={60} height={12} rx={4} fill="#c0392b" transform="rotate(-10 170 232)" />
      <path d="M200 236 l40 -10 l-6 18 z" fill="#c0392b" />
      <rect x={260} y={262} width={20} height={36} fill="#fff" />
      {[0, 1, 2].map((i) => (
        <text key={i} x={210 + i * 26} y={210 - i * 22 - ((z * 20) % 20)} fontFamily="Anton, Impact" fontSize={26 + i * 6} fill="#fff" opacity={0.85}>
          Z
        </text>
      ))}
      {/* hayon qui s'ouvre */}
      <g transform={`translate(60 150) scale(1 ${1 - 0.92 * open})`}>
        <rect width={452} height={200} rx={20} fill="#9ea2aa" stroke="#555" strokeWidth={4} />
      </g>
    </SceneFrame>
  );
};

export const Video019: React.FC = () => (
  <StoryVideo
    dir={DIR}
    cuts={cutsFrom([6, 11, 17, 23, 29, 35, 41, 47, 53, 59])}
    zooms={[
      { t: 4.1, s: 1.12, shake: true },
      { t: 12.2, s: 1.06 },
      { t: 24.2, s: 1.08 },
      { t: 33.7, s: 1.12, shake: true },
      { t: 45.0, s: 1.08 },
      { t: 54.2, s: 1.08 },
      { t: 60.2, s: 1.08 },
    ]}
    tension={[22.6, 36.2]}
    sfx={{ pop: [0.4, 6.0, 11.2, 16.4, 19.0, 23.6, 28.7, 46.6, 48.6, 51.0, 53.5, 55.7, 58.4, 60.9, 61.1], impact: [3.8, 33.7], notif: [44.8], tick: [16.4], ding: [36.4] }}
  >
    <G from={0.2} to={3.7} name="Hook">
      <Tag top={T} t={0.4} tone="white" icon={<Dot><ClockIcon size={36} h={1} m={0} /></Dot>} text="1 heure de travail…" size={32} />
    </G>
    <G from={3.7} to={5.6} name="Un mec">
      <Punch t={3.8} top={T} text="…UN MEC DANS LE COFFRE ?!" color="#FFD23F" size={54} />
    </G>
    <G from={5.6} to={10.9} name="Voiture grise">
      <Tag top={T} t={6.0} tone="white" text="Voiture grise · bosse sous la vitre" size={30} />
    </G>
    <G from={10.9} to={18.0} name="Pressé">
      <Tag top={T} t={11.2} icon={<Dot><PhoneIcon size={30} /></Dot>} text="Pressé, stressé, sur son téléphone" size={28} />
      <Tag top={T + 96} t={16.4} tone="white" icon={<Dot><ClockIcon size={36} h={12} m={0} /></Dot>} text="« Je reviens à midi »" size={30} />
    </G>
    <G from={18.0} to={22.5} name="Outils">
      <Tag top={T} t={19.0} tone="white" icon={<Dot><HandIcon size={32} /></Dot>} text="Les outils passés par la fenêtre" size={30} />
    </G>
    <G from={22.5} to={30.4} name="Bruit">
      <Tag top={T} t={23.6} icon={<Dot><MagnifierIcon size={32} /></Dot>} text="Un bruit sourd…" size={32} />
      <Tag top={T + 96} t={28.7} tone="white" text="Le compresseur d'à côté ?" size={30} />
    </G>
    <G from={30.4} to={36.1} name="Ronfle">
      <Punch t={33.6} top={T} text="QUELQU'UN RONFLE !" color="#E10600" size={60} />
    </G>
    <G from={36.1} to={41.9} name="Coffre (centre)">
      <CenterPop t={36.2} caption="DANS LE COFFRE">
        <Coffre />
      </CenterPop>
    </G>
    <G from={41.9} to={46.2} name="Mairie">
      <Talk top={T}>
        <Say t={44.8} who="LE GAILLARD, UN ŒIL OUVERT" side="right" tone="dark" text="« On est arrivés à la mairie ? »" />
      </Talk>
    </G>
    <G from={46.2} to={56.6} name="Témoin">
      <Card
        top={T}
        t={46.3}
        title="C'ÉTAIT LE TÉMOIN"
        rows={[
          { t: 48.6, text: "Enterrement de vie de garçon la veille" },
          { t: 51.0, text: "Caché pour échapper à ses potes" },
          { t: 53.5, text: "Mariage à 14 h", hot: true },
        ]}
      />
    </G>
    <G from={56.6} to={60.6} name="Retrouvé">
      <Tag top={T} t={56.7} tone="white" text="Cherché toute la nuit…" size={30} />
      <Tag top={T + 96} t={58.4} tone="green" text="…et un câlin comme au retour de la guerre" size={28} />
    </G>
    <G from={60.6} to={DURATION_S} name="Poll">
      <Poll top={T} t={60.7} question="Tu l'aurais réveillé ?" a="OUI" b="NON" />
    </G>
  </StoryVideo>
);
