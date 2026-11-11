import React from "react";
import { CenterPop } from "../_shared/center";
import { ClockIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Dot, Poll, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 028 — « Die KI-Wette » (grande cuillère faite uniquement à la hachette). Actualité : l'IA et les métiers manuels.
export const DURATION_S = 63.4;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video028: React.FC = () => (
  <WoodVideo
    dir="028-ki-wette"
    title={["„Dein Beruf stirbt wegen KI!“", "Also wetten wir 🤖🪓"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 28.0, 33.6, 36.9, 42.5, 48.1, 53.7, 58.3]}
    quiet={[[33.6, 36.9]]}
    zooms={[{ t: 4.48, s: 1.06 }, { t: 43.66, s: 1.06 }, { t: 50.74, s: 1.05 }]}
    pops={[9.0, 32.9]}
  >
    <G from={0.2} to={8.0} name="14">
      <Tag top={TOP} t={0.3} tone="white" text="14 Jahre alt" size={30} />
      <Tag top={TOP + 90} t={3.08} tone="red" text="„Dein Beruf ist in 5 Jahren tot“" size={28} />
    </G>
    <G from={8.9} to={11.3} name="Wette (centre)">
      <CenterPop t={9.0} caption="DIE WETTE">
        <EmojiScene items={["📱", "🆚", "🪓"]} />
      </CenterPop>
    </G>
    <G from={14.4} to={18.0} name="Steinzeit">
      <Tag top={TOP} t={16.66} text="„Deine Axt? Steinzeit!“" size={30} />
    </G>
    <G from={25.7} to={28.6} name="Regel">
      <Tag top={TOP} t={25.78} tone="white" text="Wer zuerst Suppe essen kann, gewinnt 🥣" size={28} />
    </G>
    <G from={32.8} to={35.1} name="Bild (centre)">
      <CenterPop t={32.9} caption="NACH 3 SEKUNDEN: EIN BILD">
        <EmojiScene items={["🤖", "🖼️"]} />
      </CenterPop>
    </G>
    <G from={40.9} to={45.9} name="10 Minuten">
      <Tag top={TOP} t={41.04} icon={<Dot><ClockIcon size={34} color="#fff" h={0} m={10} /></Dot>} text="10 Minuten später" size={30} />
      <Tag top={TOP + 96} t={43.66} tone="green" text="Echter Löffel vs. Bild" size={28} />
    </G>
    <G from={49.1} to={55.4} name="Beibringen">
      <Tag top={TOP} t={50.74} tone="white" text="„Kannst du mir das beibringen?“" size={28} />
      <Tag top={TOP + 90} t={53.1} text="Jeden Samstag · ohne Handy" size={28} />
    </G>
    <G from={57.8} to={DURATION_S} name="Umfrage">
      <Poll top={TOP} t={57.9} question="Ersetzt die KI das Handwerk?" a="JA" b="NEIN" footer="Antwortet in den Kommentaren 👇" />
    </G>
  </WoodVideo>
);
