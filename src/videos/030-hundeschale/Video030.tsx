import React from "react";
import { CenterPop } from "../_shared/center";
import { EuroIcon, HeartIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Dot, Poll, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 030 — « Die Hundeschale » (petit plat ovale). Animaux et deuil : le chien du grand-père ne mange plus.
export const DURATION_S = 62.9;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video030: React.FC = () => (
  <WoodVideo
    dir="030-hundeschale"
    title={["Sein Hund frisst nicht mehr,", "seit Opa tot ist 🐕💔"]}
    captions={CAPTIONS}
    cuts={[6.4, 12.0, 17.6, 23.2, 28.8, 34.6, 37.0, 42.6, 48.2, 53.8, 58.6, 59.9]}
    quiet={[[34.6, 37.0]]}
    zooms={[{ t: 5.3, s: 1.06 }, { t: 10.42, s: 1.05 }, { t: 54.34, s: 1.06 }]}
    pops={[17.3, 52.2]}
  >
    <G from={0.9} to={8.4} name="Taschengeld">
      <Tag top={TOP} t={1.06} tone="white" text="11 Jahre alt" size={30} />
      <Tag top={TOP + 90} t={5.3} icon={<Dot color="#fff"><EuroIcon size={30} color="#22C55E" /></Dot>} text="37 € · sein ganzes Taschengeld" size={28} />
    </G>
    <G from={11.8} to={16.9} name="Opa">
      <Tag top={TOP} t={12.05} icon={<Dot><HeartIcon size={30} color="#fff" /></Dot>} text="Der Hund von Opa" size={30} />
      <Tag top={TOP + 96} t={15.53} tone="red" text="Opa: vor einem Monat gestorben" size={28} />
    </G>
    <G from={17.2} to={19.8} name="Wartet (centre)">
      <CenterPop t={17.3} caption="ER WARTET VOR SEINER TÜR">
        <EmojiScene items={["🐕", "🚪"]} />
      </CenterPop>
    </G>
    <G from={24.6} to={31.4} name="Bank">
      <Tag top={TOP} t={25.63} tone="white" text="Holz von Opas Gartenbank" size={30} />
      <Tag top={TOP + 90} t={29.49} text="„Vielleicht riecht sie nach Opa“" size={28} />
    </G>
    <G from={37.3} to={41.9} name="Flach">
      <Tag top={TOP} t={38.72} tone="white" text="Ganz flach – für den alten Hund" size={28} />
    </G>
    <G from={42.4} to={45.6} name="Funktioniert?">
      <Tag top={TOP} t={42.46} tone="red" text="Funktioniert das? 🤞" size={30} />
    </G>
    <G from={52.1} to={54.6} name="Wedelt (centre)">
      <CenterPop t={52.2} caption="ER WEDELT MIT DEM SCHWANZ">
        <EmojiScene items={["🐕", "🥣", "❤️"]} />
      </CenterPop>
    </G>
    <G from={54.6} to={59.8} name="Frisst">
      <Tag top={TOP} t={54.68} tone="green" text="Er frisst – zum 1. Mal seit 4 Wochen" size={28} />
      <Tag top={TOP + 90} t={57.68} text="Geld zurückgegeben" size={28} />
    </G>
    <G from={59.8} to={DURATION_S} name="Umfrage">
      <Poll top={TOP} t={59.9} question="Können Tiere trauern?" a="JA" b="NEIN" footer="Antwortet in den Kommentaren 👇" />
    </G>
  </WoodVideo>
);
