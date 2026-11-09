import React from "react";
import { CenterPop } from "../_shared/center";
import { CarSide, Guy, SceneFrame, Sky } from "../_shared/illus";
import { MotoIcon, PhoneIcon } from "../_shared/icons";
import { Check, Cross, G, GREEN, sec, useG } from "../_shared/kit";
import { Day, Dot, Poll, Say, Tag, Talk } from "../_shared/story";
import { Card } from "../_shared/story2";
import { StoryVideo, cutsFrom } from "../_shared/StoryVideo";

// Vidéo 016 — « La bosse en forme de fesses » (voiture blanche, portière). Hook n° 1. Voix Maxime.
export const DURATION_S = 62.13;
export const TOTAL_FRAMES = sec(DURATION_S);
const DIR = "016-bosse-fesses";
const T = 300;

const Fesses: React.FC = () => {
  const { lin } = useG();
  const k = lin(5.1, 5.9);
  return (
    <SceneFrame bg="#e9edf2">
      <rect x={30} y={30} width={512} height={320} rx={30} fill="#f7f8fa" stroke="#c9ced6" strokeWidth={4} />
      <rect x={380} y={70} width={110} height={26} rx={13} fill="#c9ced6" />
      <g opacity={k} transform={`translate(286 210) scale(${0.6 + 0.4 * k})`}>
        <ellipse cx={-48} cy={0} rx={62} ry={74} fill="#dde2e9" stroke="#9aa3b0" strokeWidth={5} />
        <ellipse cx={48} cy={0} rx={62} ry={74} fill="#dde2e9" stroke="#9aa3b0" strokeWidth={5} />
        <path d="M0 -60 Q-6 0 0 70" stroke="#9aa3b0" strokeWidth={5} fill="none" />
      </g>
    </SceneFrame>
  );
};

const Glisse: React.FC = () => {
  const { lin } = useG();
  const k = lin(37.6, 39.4);
  return (
    <SceneFrame bg="#14141a">
      <rect x={150} y={20} width={272} height={340} rx={30} fill="#0B0B0D" stroke="#555" strokeWidth={6} />
      <g transform="translate(160 40)">
        <rect width={252} height={300} fill="#1d2233" />
        <circle cx={210} cy={40} r={14} fill="#FFD23F" opacity={0.8} />
        <CarSide x={-30} y={170} s={0.8} color="#f4f5f7" />
        <Guy x={120 + 50 * k} y={80 + 110 * k} s={0.55} shirt="#E10600" rot={-20 + 110 * k} armUp={60} />
      </g>
    </SceneFrame>
  );
};

const Cadre: React.FC = () => (
  <SceneFrame bg="#efe6da">
    <rect x={150} y={40} width={272} height={190} fill="#7a4a22" />
    <rect x={166} y={56} width={240} height={158} fill="#f7f8fa" />
    <ellipse cx={262} cy={140} rx={30} ry={36} fill="none" stroke="#9aa3b0" strokeWidth={4} />
    <ellipse cx={310} cy={140} rx={30} ry={36} fill="none" stroke="#9aa3b0" strokeWidth={4} />
    <rect x={80} y={280} width={412} height={80} rx={20} fill="#3a5f8a" />
    <rect x={60} y={260} width={60} height={100} rx={18} fill="#2f4f75" />
    <rect x={452} y={260} width={60} height={100} rx={18} fill="#2f4f75" />
  </SceneFrame>
);

export const Video016: React.FC = () => (
  <StoryVideo
    dir={DIR}
    cuts={cutsFrom([5.6, 11.2, 16.8, 22.4, 28, 33.6, 39.2, 44.8, 50.4, 56])}
    zooms={[
      { t: 6.2, s: 1.12, shake: true },
      { t: 14.1, s: 1.08 },
      { t: 21.0, s: 1.06 },
      { t: 27.4, s: 1.08 },
      { t: 39.2, s: 1.12, shake: true },
      { t: 49.2, s: 1.08 },
      { t: 54.6, s: 1.08 },
    ]}
    tension={[33.9, 42.6]}
    sfx={{ pop: [0.5, 6.7, 13.8, 25.6, 28.2, 42.6, 43.6, 45.7, 46.7, 53.0, 58.3, 58.5], impact: [6.2, 39.2], notif: [17.0, 21.0, 26.2, 27.4], ding: [53.9], cash: [43.6] }}
  >
    <G from={0.3} to={4.8} name="Hook">
      <Tag top={T} t={0.5} tone="white" icon={<Dot><MotoIcon size={38} /></Dot>} text="Une bosse sur la portière…" size={32} />
    </G>
    <G from={4.8} to={6.6} name="Fesses (centre)">
      <CenterPop t={4.9} caption="EN FORME DE FESSES">
        <Fesses />
      </CenterPop>
    </G>
    <G from={6.6} to={11.8} name="Parking">
      <Tag top={T} t={6.7} tone="white" icon={<Day day="SAM." />} text="Parking de la salle des fêtes" size={30} />
    </G>
    <G from={11.8} to={16.9} name="Deux ronds">
      <Tag top={T} t={13.8} icon={<Dot><span style={{ fontFamily: "Anton, Impact", fontSize: 30, color: "#fff" }}>2</span></Dot>} text="Deux ronds bien symétriques" size={30} sub="au-dessus de la roue arrière" />
    </G>
    <G from={16.9} to={23.5} name="La veille">
      <Talk top={T}>
        <Say t={17.0} who="MOI" text="« Il s'est passé quoi hier soir ? »" />
        <Say t={21.0} who="LUI" side="right" tone="dark" text="« Rien de spécial, une petite soirée d'anniversaire. »" />
      </Talk>
    </G>
    <G from={23.5} to={33.8} name="Téléphone">
      <Tag top={T} t={25.6} icon={<Dot color={GREEN}><PhoneIcon size={32} /></Dot>} text="Son téléphone vibre sans arrêt" size={30} />
      <Tag top={T + 96} t={28.2} tone="white" text="Groupe « Anniv » · 47 messages" size={30} />
    </G>
    <G from={33.8} to={36.6} name="La vidéo">
      <Tag top={T} t={33.9} tone="red" icon={<Dot color="#fff"><PhoneIcon size={30} color="#E10600" /></Dot>} text="Il me montre une vidéo…" size={30} sub="son meilleur pote, à 2 h du matin" />
    </G>
    <G from={36.6} to={42.4} name="Glisse (centre)">
      <CenterPop t={36.7} caption="IL DANSE SUR LE CAPOT…">
        <Glisse />
      </CenterPop>
    </G>
    <G from={42.4} to={46.4} name="Payer">
      <Card top={T} t={42.6} title="LA RÉPARATION" rows={[{ t: 43.2, text: "Le pote veut payer", icon: <Check k={1} size={34} /> }, { t: 45.3, text: "Le client refuse", icon: <Cross k={1} size={34} />, hot: true }]} />
    </G>
    <G from={46.4} to={52.9} name="Photo">
      <Tag top={T} t={46.7} tone="white" icon={<Dot><PhoneIcon size={30} /></Dot>} text="Une photo avant de réparer" size={30} sub="à offrir au prochain anniversaire" />
    </G>
    <G from={52.9} to={56.2} name="Comme neuve">
      <Tag top={T} t={53.0} tone="green" icon={<Check k={1} size={58} />} text="Portière comme neuve" />
    </G>
    <G from={56.2} to={58.0} name="Cadre (centre)">
      <CenterPop t={56.3} caption="ENCADRÉE AU-DESSUS DU CANAPÉ">
        <Cadre />
      </CenterPop>
    </G>
    <G from={58.0} to={DURATION_S} name="Poll">
      <Poll top={T} t={58.1} question="Tu aurais fait payer ton pote ?" a="OUI" b="NON" />
    </G>
  </StoryVideo>
);
