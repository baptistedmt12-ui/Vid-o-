import React from "react";
import { CenterPop } from "../_shared/center";
import { HeartIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Dot, Poll, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 034 — « Das Tablett » (plateau creusé). Un mari fait faire un plateau pour sa femme qui perd la vue.
export const DURATION_S = 63.6;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video034: React.FC = () => (
  <WoodVideo
    dir="034-tablett"
    title={["Er will ein Tablett, das man", "blind erkennt 🥹☕"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 15.8, 21.4, 27.0, 32.6, 37.1, 42.7, 48.3, 53.9, 60.6]}
    quiet={[[32.6, 37.1]]}
    zooms={[{ t: 3.44, s: 1.05 }, { t: 10.11, s: 1.06 }, { t: 56.17, s: 1.05 }]}
    pops={[15.4, 52.5]}
  >
    <G from={8.6} to={13.6} name="Augenlicht">
      <Tag top={TOP} t={9.03} tone="red" text="Seine Frau verliert ihr Augenlicht" size={28} />
      <Tag top={TOP + 90} t={11.43} tone="white" text="In 1 Jahr vielleicht ganz blind" size={28} />
    </G>
    <G from={15.3} to={17.8} name="Frühstück (centre)">
      <CenterPop t={15.4} caption="40 JAHRE FRÜHSTÜCK ANS BETT">
        <EmojiScene items={["☕", "🥐", "❤️"]} />
      </CenterPop>
    </G>
    <G from={21.0} to={26.4} name="Kaffee">
      <Tag top={TOP} t={21.17} text="Heißer Kaffee über die Hand" size={28} />
      <Tag top={TOP + 90} t={24.77} tone="white" text="Seitdem traut sie sich nicht mehr" size={28} />
    </G>
    <G from={27.2} to={31.6} name="Mulde">
      <Tag top={TOP} t={28.19} tone="white" text="Tiefe Mulde für die Tasse" size={30} />
    </G>
    <G from={37.6} to={42.0} name="Kanten">
      <Tag top={TOP} t={38.4} text="Alle Kanten rund – zum Ertasten" size={28} />
    </G>
    <G from={42.3} to={48.6} name="Hochzeitstag">
      <Tag top={TOP} t={42.34} tone="white" icon={<Dot><HeartIcon size={30} color="#fff" /></Dot>} text="Geheim bis zum Hochzeitstag" size={28} />
    </G>
    <G from={52.4} to={54.9} name="Abgetastet (centre)">
      <CenterPop t={52.5} caption="MIT GESCHLOSSENEN AUGEN">
        <EmojiScene items={["🙈", "✋", "🥹"]} />
      </CenterPop>
    </G>
    <G from={56.0} to={60.6} name="100">
      <Tag top={TOP} t={57.67} tone="green" text="„Frühstück, bis ich 100 bin!“" size={30} />
    </G>
    <G from={60.6} to={DURATION_S} name="Kommentare">
      <Tag top={TOP} t={60.73} tone="white" text="Was würdet ihr für eure Liebe bauen? 👇" sub="Schreibt es in die Kommentare" size={28} />
      <Tag top={TOP + 110} t={60.65} tone="green" text="Fertig" size={28} />
    </G>
  </WoodVideo>
);
