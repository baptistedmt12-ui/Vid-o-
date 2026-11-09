import React from "react";
import { CenterPop } from "../_shared/center";
import { CarSide, Guy, SceneFrame, Sky } from "../_shared/illus";
import { HomeIcon, MagnifierIcon } from "../_shared/icons";
import { Check, G, sec, useG } from "../_shared/kit";
import { Day, Dot, Poll, Punch, Say, Tag, Talk } from "../_shared/story";
import { Card } from "../_shared/story2";
import { StoryVideo, cutsFrom } from "../_shared/StoryVideo";

// Vidéo 017 — « La noix de coco à Lille » (bosse au milieu du toit). Hook n° 9. Voix Maxime.
export const DURATION_S = 61.0;
export const TOTAL_FRAMES = sec(DURATION_S);
const DIR = "017-noix-de-coco";
const T = 300;

const Coco: React.FC = () => {
  const { lin } = useG();
  const f = lin(4.9, 5.6);
  return (
    <SceneFrame>
      <Sky />
      <rect y={330} width={572} height={50} fill="#7bb36a" />
      <path d="M440 330 Q452 200 470 120" stroke="#8a5a2b" strokeWidth={18} fill="none" />
      {[-60, -20, 20, 60, 100].map((a) => (
        <path key={a} d={`M470 120 q${60 * Math.cos((a * Math.PI) / 180)} ${-40 + 30 * Math.sin((a * Math.PI) / 180)} ${120 * Math.cos((a * Math.PI) / 180)} ${30 + 40 * Math.sin((a * Math.PI) / 180)}`} stroke="#2f8a3a" strokeWidth={14} fill="none" strokeLinecap="round" transform={`rotate(${a < 40 ? 180 : 0} 470 120)`} />
      ))}
      <CarSide x={40} y={190} s={0.95} color="#1b1b20" dent={f >= 1 ? { x: 175, y: 34 } : undefined} />
      {f < 1 && <circle cx={460 - 250 * f} cy={130 + 90 * f} r={20} fill="#6b4423" stroke="#3b2412" strokeWidth={3} />}
    </SceneFrame>
  );
};

const Basket: React.FC = () => {
  const { lin } = useG();
  const k = lin(47.6, 48.6);
  return (
    <SceneFrame>
      <Sky />
      <rect x={300} y={60} width={272} height={270} fill="#c8b8a0" />
      <rect x={290} y={52} width={290} height={14} fill="#888" />
      <circle cx={330} cy={44} r={20} fill="#f08a24" stroke="#7a3b05" strokeWidth={3} />
      <rect y={330} width={572} height={50} fill="#777" />
      <CarSide x={20} y={200} s={0.95} color="#1b1b20" />
      <Guy x={200 + 10 * k} y={110 - 30 * k} s={0.9} shirt="#3a6ad6" armUp={40 + 90 * k} />
    </SceneFrame>
  );
};

export const Video017: React.FC = () => (
  <StoryVideo
    dir={DIR}
    cuts={cutsFrom([5.6, 11.2, 16.8, 22.4, 28, 33.6, 39.2, 44.8, 50.4, 56])}
    zooms={[
      { t: 3.1, s: 1.08 },
      { t: 8.3, s: 1.12, shake: true },
      { t: 20.1, s: 1.08 },
      { t: 28.6, s: 1.1 },
      { t: 36.8, s: 1.1, shake: true },
      { t: 50.5, s: 1.12, shake: true },
      { t: 52.9, s: 1.08 },
    ]}
    tension={[27.3, 41.0]}
    sfx={{ pop: [0.8, 6.7, 8.9, 26.3, 30.6, 33.1, 42.6, 45.5, 53.7, 55.2, 57.5, 57.7], impact: [8.3, 36.8, 50.5], notif: [19.4, 23.4, 38.8], splat: [5.6], ding: [53.7] }}
  >
    <G from={0.6} to={4.6} name="Hook">
      <Tag top={T} t={0.8} tone="white" icon={<Dot><MagnifierIcon size={32} /></Dot>} text="Bosse ronde, en plein milieu du toit" size={30} />
    </G>
    <G from={4.6} to={6.5} name="Coco (centre)">
      <CenterPop t={4.7} caption="UNE NOIX DE COCO ?">
        <Coco />
      </CenterPop>
    </G>
    <G from={6.5} to={11.8} name="Lille">
      <Tag top={T} t={6.7} tone="red" icon={<Dot color="#fff"><HomeIcon size={32} color="#E10600" /></Dot>} text="Le problème : on habite à Lille" size={30} />
      <Tag top={T + 96} t={8.9} tone="white" icon={<Day day="LUN." />} text="Très sûr de lui" size={30} />
    </G>
    <G from={11.8} to={19.2} name="Palmier">
      <Card top={T} t={11.9} title="SA VERSION" rows={[{ t: 13.9, text: "Le palmier du voisin" }, { t: 15.8, text: "Une noix de coco tombe…" }, { t: 17.1, text: "…pile sur le toit", hot: true }]} />
    </G>
    <G from={19.2} to={24.7} name="Serre">
      <Talk top={T}>
        <Say t={19.4} who="MOI" text="« Un palmier, à Lille, en novembre ? »" />
        <Say t={23.4} who="LUI" side="right" tone="dark" text="« Oui, dans une serre chauffée. »" />
      </Talk>
    </G>
    <G from={24.7} to={29.1} name="Bizarre">
      <Tag top={T} t={26.3} tone="white" icon={<Dot><MagnifierIcon size={32} /></Dot>} text="Un truc bizarre…" size={32} />
    </G>
    <G from={29.1} to={36.5} name="Traces">
      <Card top={T} t={29.2} title="AU FOND DE LA BOSSE" rows={[{ t: 30.8, text: "Des petites traces orange", hot: true }, { t: 32.9, text: "La même sur la barre de toit" }]} />
    </G>
    <G from={36.5} to={41.0} name="Rouge">
      <Punch t={36.6} top={T} text="IL DEVIENT TOUT ROUGE." color="#E10600" size={56} />
      <Tag top={T + 90} t={38.8} tone="white" text="« Pas un mot à ma femme ! »" size={30} />
    </G>
    <G from={41.0} to={47.3} name="Basket">
      <Tag top={T} t={42.6} icon={<Dot color="#f08a24"><span style={{ fontFamily: "Anton, Impact", fontSize: 26, color: "#fff" }}>B</span></Dot>} text="Dimanche : basket avec ses neveux" size={30} />
      <Tag top={T + 96} t={45.5} tone="white" text="Ballon coincé dans la gouttière" size={30} />
    </G>
    <G from={47.3} to={51.9} name="Sur le toit (centre)">
      <CenterPop t={47.4} caption="90 KILOS SUR LE TOIT">
        <Basket />
      </CenterPop>
    </G>
    <G from={51.9} to={53.6} name="C'était lui">
      <Punch t={52.0} top={T} text="LA NOIX DE COCO, C'ÉTAIT LUI." size={50} color="#FFD23F" />
    </G>
    <G from={53.6} to={57.2} name="Parfait">
      <Tag top={T} t={53.7} tone="green" icon={<Check k={1} size={58} />} text="Toit parfait" />
      <Tag top={T + 96} t={55.2} tone="white" text="Sa femme y croit toujours" size={30} />
    </G>
    <G from={57.2} to={DURATION_S} name="Poll">
      <Poll top={T} t={57.3} question="Tu l'aurais crue, cette histoire ?" a="OUI" b="NON" />
    </G>
  </StoryVideo>
);
