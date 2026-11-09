import React from "react";
import { CenterPop } from "../_shared/center";
import { CarSide, SceneFrame, Sky } from "../_shared/illus";
import { ClockIcon, EuroIcon } from "../_shared/icons";
import { Check, Cross, G, GREEN, sec, useG } from "../_shared/kit";
import { Call, Dot, Poll, Punch, Say, Tag, Talk } from "../_shared/story";
import { Card } from "../_shared/story2";
import { StoryVideo, cutsFrom } from "../_shared/StoryVideo";

// Vidéo 020 — « Remettez la bosse ! » (voiture noire du mari, portière). Hook n° 2. Voix Maxime.
export const DURATION_S = 61.0;
export const TOTAL_FRAMES = sec(DURATION_S);
const DIR = "020-remettre-la-bosse";
const T = 300;

const Poteau: React.FC = () => {
  const { lin } = useG();
  const k = lin(13.1, 13.9);
  return (
    <SceneFrame>
      <Sky c1="#b9d4e8" c2="#eef3f7" />
      <rect y={320} width={572} height={60} fill="#888" />
      <rect x={60} y={150} width={26} height={180} fill="#f2c200" stroke="#333" strokeWidth={3} />
      <CarSide x={420 - 280 * k} y={190} s={0.95} color="#16161a" dent={k >= 1 ? { x: 120, y: 92 } : undefined} />
    </SceneFrame>
  );
};

export const Video020: React.FC = () => (
  <StoryVideo
    dir={DIR}
    cuts={cutsFrom([5.6, 11.2, 16.8, 22.4, 28, 33.6, 39.2, 44.8, 50.4, 56])}
    zooms={[
      { t: 6.5, s: 1.12, shake: true },
      { t: 13.0, s: 1.08 },
      { t: 21.3, s: 1.06 },
      { t: 26.4, s: 1.12, shake: true },
      { t: 39.4, s: 1.12, shake: true },
      { t: 49.8, s: 1.08 },
    ]}
    tension={[28.4, 40.8]}
    sfx={{ pop: [2.2, 8.1, 16.9, 41.5, 42.0, 44.2, 47.2, 49.8, 54.8, 55.0], impact: [6.5, 39.4], notif: [26.4, 33.8], ring: [24.3], ding: [20.8], cash: [2.2, 50.4], tick: [16.9] }}
  >
    <G from={1.4} to={5.4} name="Hook">
      <Tag top={T} t={2.2} tone="green" icon={<Dot color="#fff"><EuroIcon size={32} color={GREEN} /></Dot>} text="Elle paie la réparation" size={32} />
    </G>
    <G from={5.4} to={7.9} name="Remettre">
      <Punch t={5.6} top={T} text="« REMETTEZ LA BOSSE ! »" color="#FFD23F" size={56} />
    </G>
    <G from={7.9} to={12.9} name="Voiture du mari">
      <Tag top={T} t={8.1} tone="white" text="La voiture noire de son mari" size={30} sub="une bosse en plein milieu de la portière" />
    </G>
    <G from={12.9} to={15.1} name="Poteau (centre)">
      <CenterPop t={13.0} caption="« J'AI RECULÉ CONTRE UN POTEAU »">
        <Poteau />
      </CenterPop>
    </G>
    <G from={15.1} to={20.6} name="Avant ce soir">
      <Tag top={T} t={16.9} tone="red" icon={<Dot color="#fff"><ClockIcon size={36} color="#E10600" h={7} m={0} /></Dot>} text="Avant que son mari rentre" size={30} sub="le soir même" />
    </G>
    <G from={20.6} to={24.1} name="Parfaite">
      <Tag top={T} t={20.8} tone="green" icon={<Check k={1} size={58} />} text="Portière parfaite" />
    </G>
    <G from={24.1} to={28.3} name="Appel">
      <Call top={T} t={24.3} caller="Elle" sub="Le lendemain" />
    </G>
    <G from={28.3} to={39.2} name="Le mari">
      <Talk top={T}>
        <Say t={26.4} who="ELLE" text="« Il faut remettre la bosse ! »" />
        <Say t={33.8} who="LE MARI, EN RENTRANT" side="right" tone="dark" text="« Elle est où, la bosse que j'ai faite la semaine dernière ? »" size={30} />
      </Talk>
    </G>
    <G from={39.2} to={41.1} name="Déjà là">
      <Punch t={39.3} top={T} text="LA BOSSE ÉTAIT DÉJÀ LÀ." color="#E10600" size={54} />
    </G>
    <G from={41.1} to={47.0} name="Bilan">
      <Card top={T} t={41.2} title="LE BILAN" rows={[{ t: 41.5, text: "Elle a payé…" }, { t: 42.0, text: "…la bêtise de son mari", hot: true }, { t: 44.2, text: "Cachée pendant une semaine" }]} />
    </G>
    <G from={47.0} to={49.6} name="Pas remise">
      <Tag top={T} t={47.2} icon={<Cross k={1} size={56} />} text="Bosse pas remise" size={32} />
    </G>
    <G from={49.6} to={54.5} name="Facture">
      <Card top={T} t={49.8} title="FACTURE N° 2" light rotate={-2} rows={[{ t: 50.6, text: "Au nom de : son mari", hot: true }, { t: 52.6, text: "Posée sur la table du salon" }]} stamp={{ t: 53.3, text: "À PAYER" }} />
    </G>
    <G from={54.5} to={DURATION_S} name="Poll">
      <Poll top={T} t={54.6} question="Il a dormi sur le canapé ?" a="OUI" b="NON" />
    </G>
  </StoryVideo>
);
