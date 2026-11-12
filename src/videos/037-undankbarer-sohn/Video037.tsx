import React from "react";
import { CenterPop } from "../_shared/center";
import { EuroIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Dot, Poll, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 037 — « Der undankbare Sohn » (cuillère). Format « mépris → revanche », script de l'utilisateur
// (le père de 82 ans) adapté en allemand et en cuillère.
export const DURATION_S = 62.8;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video037: React.FC = () => (
  <WoodVideo
    dir="037-undankbarer-sohn"
    title={["Er behandelt seinen Vater (82)", "wie einen Hund 😡🥄"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 28.0, 33.6, 39.2, 44.8, 50.4, 56.0, 59.6]}
    zooms={[{ t: 0.3, s: 1.06 }, { t: 37.06, s: 1.05 }, { t: 48.62, s: 1.06 }]}
    pops={[31.0, 41.1]}
  >
    <G from={5.4} to={14.6} name="Vater">
      <Tag top={TOP} t={6.98} tone="white" text="Zu seinem eigenen Vater, 82" size={28} />
      <Tag top={TOP + 90} t={11.42} text="Ich gebe dem Sohn recht…" size={28} />
    </G>
    <G from={18.5} to={24.9} name="Auftrag">
      <Tag top={TOP} t={19.63} tone="white" text="Löffel zum 1. Geburtstag seines Babys" size={28} />
    </G>
    <G from={25.6} to={30.8} name="Parkplatz">
      <Tag top={TOP} t={25.84} tone="green" text="„Kommen Sie morgen. Allein.“" size={28} />
    </G>
    <G from={30.9} to={33.4} name="Tränen (centre)">
      <CenterPop t={31.0} caption="50 JAHRE SCHREINER">
        <EmojiScene items={["👴", "🪚", "🥹"]} />
      </CenterPop>
    </G>
    <G from={35.0} to={39.4} name="Hände">
      <Tag top={TOP} t={35.26} text="Jetzt zittern seine Hände" size={28} />
    </G>
    <G from={41.0} to={43.5} name="Hände (centre)">
      <CenterPop t={41.1} caption="„ICH BIN NUR IHRE HÄNDE“">
        <EmojiScene items={["👴", "🤝", "🥄"]} />
      </CenterPop>
    </G>
    <G from={48.5} to={59.5} name="Vater">
      <Tag top={TOP} t={48.62} tone="white" text="„Das war dein Vater.“" size={30} />
      <Tag top={TOP + 90} t={57.1} tone="red" icon={<Dot color="#fff"><EuroIcon size={30} color="#E10600" /></Dot>} text="Spezialpreis für undankbare Söhne" size={26} />
    </G>
    <G from={59.6} to={DURATION_S} name="Umfrage">
      <Poll top={TOP} t={59.7} question="Hättet ihr das auch gemacht?" a="JA" b="NEIN" footer="Antwortet in den Kommentaren 👇" />
    </G>
  </WoodVideo>
);
