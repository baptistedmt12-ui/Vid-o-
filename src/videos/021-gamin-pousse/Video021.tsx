import React from "react";
import { CenterPop } from "../_shared/center";
import { CarSide, Guy, SceneFrame, Sky } from "../_shared/illus";
import { ClockIcon, HeartIcon, PhoneIcon } from "../_shared/icons";
import { Check, G, sec, useG } from "../_shared/kit";
import { Call, Day, Dot, Poll, Punch, Say, Tag, Talk } from "../_shared/story";
import { Card } from "../_shared/story2";
import { StoryVideo, cutsFrom } from "../_shared/StoryVideo";

// Vidéo 021 — « Les gamins qui poussent la voiture » (voiture grise, aile arrière). Hook n° 5. Voix Maxime.
export const DURATION_S = 61.44;
export const TOTAL_FRAMES = sec(DURATION_S);
const DIR = "021-gamin-pousse";
const T = 300;

const Pousse: React.FC = () => {
  const { lin } = useG();
  const k = lin(3.3, 6.0);
  return (
    <SceneFrame>
      <Sky />
      <rect y={318} width={572} height={62} fill="#8c8c8c" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={((i * 160 - 400 * k) % 640 + 640) % 640 - 60} y={346} width={70} height={8} fill="#fff" />
      ))}
      <CarSide x={40 + 30 * k} y={186} s={0.9} color="#9aa0a8" />
      {[0, 1, 2, 3].map((i) => (
        <Guy key={i} x={385 + 40 * i + 30 * k} y={210 + (i % 2) * 6} s={0.55} shirt={["#E10600", "#2b7bff", "#22C55E", "#F5B800"][i]} rot={-25} armUp={70} />
      ))}
    </SceneFrame>
  );
};

const Tirelire: React.FC = () => (
  <SceneFrame bg="#fff1f4">
    <ellipse cx={240} cy={220} rx={150} ry={110} fill="#f39ab2" />
    <circle cx={350} cy={190} r={60} fill="#f39ab2" />
    <circle cx={370} cy={175} r={8} fill="#333" />
    <ellipse cx={400} cy={205} rx={20} ry={14} fill="#e57f9c" />
    <rect x={200} y={108} width={60} height={10} rx={5} fill="#333" />
    <rect x={150} y={300} width={30} height={40} rx={8} fill="#e57f9c" />
    <rect x={290} y={300} width={30} height={40} rx={8} fill="#e57f9c" />
    <g transform="translate(400 260) rotate(-8)">
      <rect width={140} height={70} rx={8} fill="#FFD23F" stroke="#b58a00" strokeWidth={3} />
      <text x={70} y={44} textAnchor="middle" fontFamily="Anton, Impact" fontSize={24} fill="#7a4a00">
        MANÈGE
      </text>
    </g>
    <g transform="translate(40 60)">
      <circle r={36} fill="#d6a400" />
      <text y={12} textAnchor="middle" fontFamily="Anton, Impact" fontSize={32} fill="#fff">
        12 €
      </text>
    </g>
  </SceneFrame>
);

export const Video021: React.FC = () => (
  <StoryVideo
    dir={DIR}
    cuts={cutsFrom([5.6, 11.2, 16.8, 22.4, 28, 33.6, 39.2, 44.8, 50.4, 56])}
    zooms={[
      { t: 3.5, s: 1.1 },
      { t: 13.6, s: 1.08 },
      { t: 19.6, s: 1.1, shake: true },
      { t: 31.5, s: 1.08 },
      { t: 34.7, s: 1.1 },
      { t: 47.5, s: 1.08 },
      { t: 56.3, s: 1.08 },
    ]}
    tension={[33.6, 41.0]}
    sfx={{ pop: [0.8, 6.6, 9.7, 13.6, 17.7, 23.8, 28.2, 29.4, 31.5, 38.9, 53.1, 55.3, 57.4, 57.6], impact: [34.7], notif: [19.6, 37.3], ring: [51.2], ding: [42.1], cash: [47.5], tick: [38.9] }}
  >
    <G from={0.5} to={3.2} name="Hook">
      <Tag top={T} t={0.8} tone="white" icon={<Dot><HeartIcon size={30} color="#fff" /></Dot>} text="Un gamin de 10 ans" />
    </G>
    <G from={3.2} to={6.3} name="Pousse (centre)">
      <CenterPop t={3.3} caption="4 GAMINS · 300 MÈTRES">
        <Pousse />
      </CenterPop>
    </G>
    <G from={6.3} to={13.4} name="Mercredi">
      <Tag top={T} t={6.6} tone="white" icon={<Day day="MER." />} text="Mercredi après-midi" size={30} />
      <Tag top={T + 96} t={9.7} text="Une voiture qui avance toute seule…" size={28} />
    </G>
    <G from={13.4} to={19.4} name="Gamins">
      <Tag top={T} t={13.6} tone="red" text="4 gamins tout rouges qui poussent" size={30} />
      <Tag top={T + 96} t={17.7} tone="white" text="Le plus petit me tend sa tirelire" size={28} />
    </G>
    <G from={19.4} to={23.0} name="Papa">
      <Talk top={T}>
        <Say t={19.6} who="LE GAMIN" text="« Monsieur, il faut réparer avant que mon papa rentre ! »" size={30} />
      </Talk>
    </G>
    <G from={23.0} to={27.9} name="Aile">
      <Tag top={T} t={23.8} tone="white" text="Aile arrière, au-dessus de la roue" size={30} />
    </G>
    <G from={27.9} to={33.5} name="Ce qui s'est passé">
      <Card top={T} t={28.0} title="CE QUI S'EST PASSÉ" rows={[{ t: 28.2, text: "Foot dans la cour" }, { t: 29.4, text: "Le ballon tape la voiture" }, { t: 31.5, text: "Frein à main desserré", hot: true }]} />
    </G>
    <G from={33.5} to={38.6} name="Dangereux">
      <Punch t={34.7} top={T} text="C'EST DANGEREUX !" color="#E10600" size={56} />
      <Tag top={T + 90} t={37.3} tone="white" text="« Oui… » tout doucement" size={28} />
    </G>
    <G from={38.6} to={41.6} name="2 h">
      <Tag top={T} t={38.9} tone="red" icon={<Dot color="#fff"><ClockIcon size={36} color="#E10600" h={6} m={0} /></Dot>} text="Papa rentre dans 2 h" size={30} />
    </G>
    <G from={41.6} to={46.2} name="Réparée">
      <Tag top={T} t={42.1} tone="green" icon={<Check k={1} size={58} />} text="Bosse réparée" />
      <Tag top={T + 100} t={43.2} tone="white" text="Voiture ramenée, les gamins derrière" size={28} />
    </G>
    <G from={46.2} to={50.9} name="Tirelire (centre)">
      <CenterPop t={46.3} caption="TIRELIRE RENDUE">
        <Tirelire />
      </CenterPop>
    </G>
    <G from={50.9} to={54.2} name="Le père">
      <Call top={T} t={51.0} caller="Le père" sub="Le soir" reveal={{ t: 52.8, text: "Son fils a tout avoué" }} />
    </G>
    <G from={54.2} to={56.9} name="Ballon">
      <Tag top={T} t={55.3} tone="white" icon={<Dot><PhoneIcon size={30} /></Dot>} text="« Gardez l'argent pour un nouveau ballon »" size={26} />
    </G>
    <G from={56.9} to={DURATION_S} name="Poll">
      <Poll top={T} t={57.0} question="À 10 ans, tu aurais osé ?" a="OUI" b="NON" />
    </G>
  </StoryVideo>
);
