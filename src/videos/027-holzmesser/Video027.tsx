import React from "react";
import { CenterPop } from "../_shared/center";
import { G, sec } from "../_shared/kit";
import { Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 027 — « Das Holzmesser » (couteau en bois). Version allemande de l'histoire de l'utilisateur :
// un père commande un couteau en bois pour son fils de 16 ans, avant de lui offrir un vrai couteau.
export const DURATION_S = 63.9;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video027: React.FC = () => (
  <WoodVideo
    dir="027-holzmesser"
    title={["Er will ein Holzmesser", "für seinen Sohn (16) 🔪🤔"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 28.0, 33.6, 39.2, 44.8, 47.7, 53.3, 59.6]}
    quiet={[[33.6, 39.2]]}
    zooms={[{ t: 8.58, s: 1.06 }, { t: 22.7, s: 1.05 }, { t: 53.68, s: 1.05 }]}
    pops={[27.9, 57.6]}
  >
    <G from={7.4} to={13.6} name="16">
      <Tag top={TOP} t={8.58} tone="white" text="Der Sohn: 16 Jahre" size={30} />
      <Tag top={TOP + 90} t={10.26} text="Warum aus Holz?" size={30} />
    </G>
    <G from={16.8} to={23.4} name="Echtes Messer">
      <Tag top={TOP} t={17.04} text="Will seit 2 Jahren ein echtes Messer" size={28} />
      <Tag top={TOP + 90} t={21.0} tone="red" text="Papa: „Nein. Zu gefährlich!“" size={28} />
    </G>
    <G from={27.8} to={30.2} name="Deal (centre)">
      <CenterPop t={27.9} caption="ERST AUS HOLZ, DANN ECHT">
        <EmojiScene items={["🪵", "🔪"]} arrow />
      </CenterPop>
    </G>
    <G from={30.5} to={33.5} name="Bedingung">
      <Tag top={TOP} t={30.6} tone="white" text="Wenn er gut darauf aufpasst…" size={28} />
    </G>
    <G from={39.6} to={43.2} name="Kein Spielzeug">
      <Tag top={TOP} t={42.04} tone="red" text="Kein Spielzeug" size={30} />
    </G>
    <G from={53.0} to={56.9} name="Freut sich">
      <Tag top={TOP} t={53.12} tone="white" text="„Da freut er sich bestimmt.“" size={28} />
      <Tag top={TOP + 90} t={54.66} text="3 Wochen später…" size={28} />
    </G>
    <G from={57.5} to={60.9} name="Nachttisch (centre)">
      <CenterPop t={57.6} caption="JEDE NACHT AUF DEM NACHTTISCH">
        <EmojiScene items={["🛏️", "🔪", "💤"]} />
      </CenterPop>
    </G>
    <G from={61.0} to={DURATION_S} name="Kommentare">
      <Tag top={TOP} t={61.36} tone="white" text="Euer erstes Messer? 👇" sub="Schreibt es in die Kommentare" size={30} />
      <Tag top={TOP + 110} t={61.1} tone="green" text="Fertig" size={28} />
    </G>
  </WoodVideo>
);
