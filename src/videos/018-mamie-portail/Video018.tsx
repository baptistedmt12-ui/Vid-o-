import React from "react";
import { CenterPop } from "../_shared/center";
import { CarSide, SceneFrame, Sky } from "../_shared/illus";
import { ClockIcon, HeartIcon, HomeIcon } from "../_shared/icons";
import { Cross, G, RED, sec, useG } from "../_shared/kit";
import { Day, Dot, Poll, Punch, Say, Tag, Talk } from "../_shared/story";
import { Card } from "../_shared/story2";
import { StoryVideo, cutsFrom } from "../_shared/StoryVideo";

// Vidéo 018 — « Le portail de la voisine » (voiture noire, aile arrière). Hook n° 10. Voix Maxime.
export const DURATION_S = 61.0;
export const TOTAL_FRAMES = sec(DURATION_S);
const DIR = "018-mamie-portail";
const T = 300;

const Portail: React.FC = () => {
  const { lin } = useG();
  const k = lin(17.3, 18.1);
  return (
    <SceneFrame>
      <Sky />
      <rect y={320} width={572} height={60} fill="#999" />
      <rect x={20} y={150} width={24} height={180} fill="#555" />
      <CarSide x={170} y={190} s={0.95} color="#16161a" dent={k >= 1 ? { x: 300, y: 92 } : undefined} />
      <g transform={`translate(44 160) scale(${0.35 + 0.65 * k} 1)`}>
        <rect width={260} height={160} fill="none" stroke="#333" strokeWidth={8} />
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={14 + i * 29} y1={0} x2={14 + i * 29} y2={160} stroke="#333" strokeWidth={6} />
        ))}
      </g>
      <circle cx={32} cy={140} r={10} fill={k > 0 ? "#FFB800" : "#555"} />
    </SceneFrame>
  );
};

const Telecommande: React.FC = () => {
  const { frame, at } = useG();
  const blink = Math.floor((frame - at(39.6)) / 8) % 2 === 0;
  return (
    <SceneFrame bg="#2a2a33">
      <g transform="translate(286 190) rotate(-12)">
        <rect x={-70} y={-140} width={140} height={280} rx={40} fill="#e8e8ec" stroke="#888" strokeWidth={4} />
        <circle cx={0} cy={-100} r={10} fill={blink ? RED : "#5a1a1a"} />
        <rect x={-40} y={-60} width={80} height={60} rx={14} fill="#2b5cab" />
        <rect x={-40} y={20} width={80} height={60} rx={14} fill="#2b5cab" />
        <text x={0} y={-22} textAnchor="middle" fontFamily="Anton, Impact" fontSize={30} fill="#fff">
          ▲
        </text>
        <text x={0} y={58} textAnchor="middle" fontFamily="Anton, Impact" fontSize={30} fill="#fff">
          ▼
        </text>
      </g>
    </SceneFrame>
  );
};

export const Video018: React.FC = () => (
  <StoryVideo
    dir={DIR}
    cuts={cutsFrom([5.6, 11.2, 16.8, 22.4, 28, 33.6, 39.2, 44.8, 50.4, 56])}
    zooms={[
      { t: 1.3, s: 1.08 },
      { t: 9.5, s: 1.12, shake: true },
      { t: 18.8, s: 1.1, shake: true },
      { t: 26.5, s: 1.08 },
      { t: 39.7, s: 1.12, shake: true },
      { t: 49.2, s: 1.08 },
      { t: 54.1, s: 1.1 },
    ]}
    tension={[37.9, 46.0]}
    sfx={{ pop: [1.0, 4.7, 12.5, 24.4, 27.7, 28.8, 30.4, 32.4, 34.2, 42.4, 52.9, 56.9, 57.1], impact: [9.1, 18.8, 54.1], notif: [48.0], ding: [39.8], tick: [52.9] }}
  >
    <G from={0.6} to={8.8} name="Hook">
      <Tag top={T} t={1.0} tone="white" icon={<Dot><HeartIcon size={32} color="#fff" /></Dot>} text="Une mamie de 79 ans" />
      <Tag top={T + 96} t={4.7} icon={<Day day="J-?" />} text="Avant le retour de la voisine" size={30} />
    </G>
    <G from={8.8} to={10.0} name="Pas un accident">
      <Punch t={9.0} top={T} text="ET C'ÉTAIT PAS UN ACCIDENT." color="#E10600" size={50} />
    </G>
    <G from={10.0} to={16.9} name="Aile">
      <Tag top={T} t={11.8} tone="white" text="Aile arrière, au-dessus de la roue" size={30} />
    </G>
    <G from={16.9} to={19.7} name="Portail (centre)">
      <CenterPop t={17.0} caption="LE PORTAIL DE LA VOISINE">
        <Portail />
      </CenterPop>
    </G>
    <G from={19.7} to={24.2} name="Partie">
      <Tag top={T} t={21.8} tone="white" text="…et elle part en vacances, avec un petit sourire" size={28} />
    </G>
    <G from={24.2} to={31.5} name="Guerre">
      <Card top={T} t={24.3} title="15 ANS DE GUERRE" rows={[{ t: 27.7, text: "Les roses coupées" }, { t: 28.8, text: "Le chat dans les plantations" }, { t: 30.4, text: "La haie trop haute" }]} />
    </G>
    <G from={31.5} to={37.8} name="Pas de plainte">
      <Tag top={T} t={32.4} icon={<Cross k={1} size={56} />} text="Pas de plainte" />
      <Tag top={T + 96} t={34.2} tone="white" text="Qu'elle ne trouve rien du tout" size={30} />
    </G>
    <G from={37.8} to={39.5} name="Sac">
      <Tag top={T} t={38.0} tone="white" icon={<Dot><HomeIcon size={32} /></Dot>} text="Elle ouvre son sac…" size={30} />
    </G>
    <G from={39.5} to={41.6} name="Télécommande (centre)">
      <CenterPop t={39.6} caption="LA TÉLÉCOMMANDE DU PORTAIL">
        <Telecommande />
      </CenterPop>
    </G>
    <G from={41.6} to={47.7} name="Clés">
      <Tag top={T} t={42.4} tone="white" text="Les clés, pour arroser les plantes" size={30} />
    </G>
    <G from={47.7} to={52.8} name="Programmer">
      <Talk top={T}>
        <Say t={48.0} who="LA MAMIE · TRÈS SÉRIEUSE" text="« Tu sais programmer un portail ? »" />
      </Talk>
    </G>
    <G from={52.8} to={54.0} name="3 h">
      <Tag top={T} t={52.9} tone="red" icon={<Dot color="#fff"><ClockIcon size={36} color="#E10600" h={3} m={0} /></Dot>} text="Toutes les nuits, à 3 h" size={30} />
    </G>
    <G from={54.0} to={56.5} name="Non">
      <Punch t={54.1} top={T} text="J'AI DIT NON." size={60} />
      <Tag top={T + 90} t={55.0} tone="white" text="« Je trouverai quelqu'un d'autre. »" size={28} />
    </G>
    <G from={56.5} to={DURATION_S} name="Poll">
      <Poll top={T} t={56.6} question="À sa place, tu aurais fait quoi ?" a="PAREIL" b="RIEN" />
    </G>
  </StoryVideo>
);
