import React from "react";
import { CenterPop } from "../_shared/center";
import { ClockIcon, PhoneIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Call, Dot, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 025 — « Der Pfannenwender der Schwiegermutter » (manche de spatule). Humour famille.
export const DURATION_S = 63.6;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video025: React.FC = () => (
  <WoodVideo
    dir="025-schwiegermutter"
    title={["Er zerbricht das Erbstück", "der Schwiegermutter 😱🍳"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.5, 24.1, 29.7, 31.5, 37.1, 42.7, 48.3, 55.4, 59.7, 61.3]}
    quiet={[[29.7, 31.5], [59.7, 61.3]]}
    zooms={[{ t: 3.38, s: 1.05 }, { t: 23.66, s: 1.07 }, { t: 55.24, s: 1.05 }]}
    pops={[23.7, 50.0]}
  >
    <G from={0.2} to={9.6} name="Anruf">
      <Call top={TOP} t={0.3} caller="Ein Kunde" sub="Anruf · völlig panisch" reveal={{ t: 4.82, text: "Pfanne… Schwiegermutter" }} />
    </G>
    <G from={10.0} to={16.9} name="40 Jahre">
      <Tag top={TOP} t={11.2} tone="white" text="40 Jahre alt" size={30} />
      <Tag top={TOP + 90} t={14.16} text="Griff vom verstorbenen Mann" size={28} />
    </G>
    <G from={23.6} to={25.8} name="Kaputt (centre)">
      <CenterPop t={23.7} caption="KNACK!">
        <EmojiScene items={["🍳", "💥"]} />
      </CenterPop>
    </G>
    <G from={25.9} to={29.6} name="Sonntag">
      <Tag top={TOP} t={25.38} tone="red" text="Am Sonntag kocht sie für alle" size={28} />
    </G>
    <G from={27.8} to={33.0} name="3 Tage">
      <Tag top={TOP + 90} t={28.24} tone="white" icon={<Dot><ClockIcon size={34} color="#fff" h={3} m={0} /></Dot>} text="Nur 3 Tage" size={30} />
    </G>
    <G from={34.3} to={38.8} name="Gleich">
      <Tag top={TOP} t={34.36} text="Gleiche Länge · gleiche Form" size={28} />
      <Tag top={TOP + 90} t={37.56} tone="white" text="+ die Kerbe für den Daumen" size={28} />
    </G>
    <G from={39.0} to={43.4} name="Nachricht">
      <Tag top={TOP} t={40.6} tone="white" icon={<Dot><PhoneIcon size={30} /></Dot>} text="„Sieht man den Unterschied?“" size={28} />
    </G>
    <G from={49.9} to={52.3} name="Schöner (centre)">
      <CenterPop t={50.0} caption="„SCHÖNER ALS DER ALTE!“">
        <EmojiScene items={["👵", "🤨"]} />
      </CenterPop>
    </G>
    <G from={56.1} to={59.7} name="Geklebt">
      <Tag top={TOP} t={58.52} tone="red" text="Sie hatte ihn 2× heimlich geklebt 😂" size={28} />
    </G>
    <G from={59.7} to={61.3} name="Vorher">
      <Tag top={TOP} t={59.75} tone="white" text="Vorher" size={28} />
    </G>
    <G from={60.4} to={DURATION_S} name="Kommentare">
      <Tag top={TOP + 96} t={60.52} tone="white" text="Hättet ihr es ihr gesagt? 👇" sub="Schreibt es in die Kommentare" size={30} />
    </G>
    <G from={61.3} to={DURATION_S} name="Nachher">
      <Tag top={TOP} t={61.35} tone="green" text="Nachher" size={28} />
    </G>
  </WoodVideo>
);
