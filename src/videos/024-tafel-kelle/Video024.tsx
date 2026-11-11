import React from "react";
import { CenterPop } from "../_shared/center";
import { EuroIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Dot, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 024 — « Die Tafel-Kelle » (grande louche). Un homme riche paie 2 000 € une louche pour la bénévole
// de la Tafel qui le nourrissait quand il était à la rue.
export const DURATION_S = 63.0;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video024: React.FC = () => (
  <WoodVideo
    dir="024-tafel-kelle"
    title={["Er zahlt 2.000 € für eine", "einfache Holzkelle 😳🥣"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 28.0, 35.25, 39.2, 44.8, 50.4, 56.0, 57.7, 60.1]}
    quiet={[[35.25, 39.2], [56.0, 57.7]]}
    zooms={[{ t: 1.78, s: 1.06 }, { t: 5.9, s: 1.05 }, { t: 53.36, s: 1.06 }]}
    pops={[21.3, 53.3]}
  >
    <G from={0.3} to={7.2} name="Kunde">
      <Tag top={TOP} t={0.48} text="Kunde im Maßanzug" size={30} />
    </G>
    <G from={7.3} to={11.6} name="Bedingung">
      <Tag top={TOP} t={7.44} tone="red" text="Bedingung: Niemand darf es wissen 🤫" size={28} />
    </G>
    <G from={17.4} to={21.1} name="Straße">
      <Tag top={TOP} t={17.7} tone="white" text="Vor 15 Jahren: obdachlos" size={30} />
    </G>
    <G from={21.2} to={23.6} name="Tafel (centre)">
      <CenterPop t={21.3} caption="JEDEN ABEND BEI DER TAFEL">
        <EmojiScene items={["🥣", "❤️"]} />
      </CenterPop>
    </G>
    <G from={30.0} to={33.4} name="Rente">
      <Tag top={TOP} t={30.7} text="Rente nach 30 Jahren" size={30} />
    </G>
    <G from={37.6} to={40.9} name="30 Jahre">
      <Tag top={TOP} t={38.2} tone="green" text="Soll noch 30 Jahre halten" size={30} />
    </G>
    <G from={45.2} to={49.6} name="Letzter Tag">
      <Tag top={TOP} t={45.6} tone="white" text="Ihr letzter Tag" size={30} />
    </G>
    <G from={53.2} to={55.5} name="Markus (centre)">
      <CenterPop t={53.3} caption="„MARKUS? DU HAST ES GESCHAFFT!“">
        <EmojiScene items={["😮", "🥹"]} />
      </CenterPop>
    </G>
    <G from={55.7} to={58.6} name="Gespendet">
      <Tag top={TOP} t={56.3} tone="green" icon={<Dot color="#fff"><EuroIcon size={30} color="#22C55E" /></Dot>} text="2.000 € an die Tafel gespendet" size={28} />
      <Tag top={TOP + 96} t={56.05} tone="white" text="Vorher" size={28} />
    </G>
    <G from={58.6} to={DURATION_S} name="Kommentare">
      <Tag top={TOP} t={58.7} tone="white" text="Wer hat euch geholfen? 👇" sub="Schreibt es in die Kommentare" size={30} />
      <Tag top={TOP + 110} t={60.15} tone="green" text="Nachher" size={28} />
    </G>
  </WoodVideo>
);
