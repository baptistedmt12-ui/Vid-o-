import React from "react";
import { CenterPop } from "../_shared/center";
import { G, sec } from "../_shared/kit";
import { Poll, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 032 — « Der Nachbar » (cuillère). Le voisin qui a appelé l'Ordnungsamt vient demander une cuillère pour sa mère.
export const DURATION_S = 62.9;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video032: React.FC = () => (
  <WoodVideo
    dir="032-nachbar"
    title={["Er hat mich angezeigt, und", "jetzt braucht er mich 😏🪓"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 26.2, 31.8, 37.4, 40.9, 46.5, 52.1, 57.7, 59.7]}
    quiet={[[37.4, 40.9]]}
    zooms={[{ t: 1.18, s: 1.05 }, { t: 7.76, s: 1.06 }, { t: 58.4, s: 1.05 }]}
    pops={[12.2, 55.5]}
  >
    <G from={0.4} to={8.9} name="Ordnungsamt">
      <Tag top={TOP} t={1.18} tone="red" text="Ordnungsamt gerufen 🚨" size={30} />
      <Tag top={TOP + 90} t={5.1} tone="white" text="3 Wochen später: er klingelt" size={28} />
    </G>
    <G from={12.1} to={14.6} name="Beschwerden (centre)">
      <CenterPop t={12.2} caption="ER BESCHWERT SICH ÜBER ALLES">
        <EmojiScene items={["🪓", "🐕", "🎵"]} />
      </CenterPop>
    </G>
    <G from={18.6} to={21.6} name="Polizei">
      <Tag top={TOP} t={18.88} text="Sogar die Polizei – wegen Musik" size={28} />
    </G>
    <G from={25.4} to={33.0} name="Mutter">
      <Tag top={TOP} t={25.72} tone="white" text="Seine Mutter wird 90" size={30} />
      <Tag top={TOP + 90} t={29.86} text="Wunsch: ein Holzlöffel, von Hand" size={28} />
    </G>
    <G from={33.2} to={36.9} name="Wegschicken">
      <Tag top={TOP} t={33.84} tone="red" text="Wegschicken? 🤔" size={30} />
    </G>
    <G from={40.3} to={46.9} name="Zaun">
      <Tag top={TOP} t={40.4} tone="green" text="Diesmal: keine Beschwerde" size={28} />
      <Tag top={TOP + 90} t={44.54} tone="white" text="1 Stunde am Zaun · kein Wort" size={28} />
    </G>
    <G from={49.4} to={53.0} name="Bezahlen">
      <Tag top={TOP} t={49.48} text="Er will bezahlen – ich sage nein" size={28} />
    </G>
    <G from={55.4} to={57.8} name="Kuchen (centre)">
      <CenterPop t={55.5} caption="KUCHEN VON SEINER MUTTER">
        <EmojiScene items={["🎂", "🤝"]} />
      </CenterPop>
    </G>
    <G from={58.3} to={60.5} name="Zuschauen">
      <Tag top={TOP} t={58.4} tone="white" text="„Darf ich zuschauen?“" size={30} />
    </G>
    <G from={60.6} to={DURATION_S} name="Umfrage">
      <Poll top={TOP} t={60.7} question="Habt ihr auch so einen Nachbarn?" a="JA" b="NEIN" footer="Erzählt es in den Kommentaren 👇" />
    </G>
  </WoodVideo>
);
