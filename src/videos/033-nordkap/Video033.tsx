import React from "react";
import { CenterPop } from "../_shared/center";
import { ClockIcon, EuroIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Dot, Poll, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 033 — « Nordkap » (kuksa, tasse en bois). Un manager plaque tout et part à pied jusqu'au cap Nord.
export const DURATION_S = 64.0;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video033: React.FC = () => (
  <WoodVideo
    dir="033-nordkap"
    title={["Er kündigt nach 20 Jahren", "für diese Tasse ☕😳"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 28.0, 33.6, 35.7, 41.3, 46.9, 52.5, 58.1, 60.7]}
    quiet={[[33.6, 35.7]]}
    zooms={[{ t: 1.18, s: 1.05 }, { t: 15.63, s: 1.06 }, { t: 26.17, s: 1.05 }]}
    pops={[24.6, 53.4]}
  >
    <G from={0.5} to={8.6} name="Manager">
      <Tag top={TOP} t={0.78} tone="white" text="Manager · Porsche · 20 Jahre" size={28} />
      <Tag top={TOP + 90} t={6.58} icon={<Dot color="#fff"><EuroIcon size={30} color="#22C55E" /></Dot>} text="Kauft: eine Holztasse für 30 €" size={28} />
    </G>
    <G from={12.5} to={19.3} name="Büro">
      <Tag top={TOP} t={12.79} icon={<Dot><ClockIcon size={34} color="#fff" h={2} m={0} /></Dot>} text="14 Stunden am Tag im Büro" size={28} />
      <Tag top={TOP + 96} t={14.87} tone="red" text="Zweimal zusammengebrochen" size={28} />
    </G>
    <G from={19.5} to={22.6} name="50">
      <Tag top={TOP} t={19.81} text="50. Geburtstag: alles hingeschmissen" size={28} />
    </G>
    <G from={24.5} to={27.1} name="Nordkap (centre)">
      <CenterPop t={24.6} caption="ZU FUSS BIS ZUM NORDKAP">
        <EmojiScene items={["🥾", "🗺️", "🏔️"]} />
      </CenterPop>
    </G>
    <G from={27.2} to={32.6} name="3000 km">
      <Tag top={TOP} t={26.17} tone="white" text="3.000 Kilometer" size={30} />
      <Tag top={TOP + 90} t={28.39} text="Mit nur einer Holztasse" size={28} />
    </G>
    <G from={35.4} to={41.9} name="Kuksa">
      <Tag top={TOP} t={35.66} tone="white" text="Eine Kuksa – nordische Holztasse" size={28} />
    </G>
    <G from={42.4} to={46.8} name="Verrückt">
      <Tag top={TOP} t={42.48} tone="red" text="Seine Frau: „Verrückt!“" size={30} />
    </G>
    <G from={53.3} to={55.9} name="Foto (centre)">
      <CenterPop t={53.4} caption="MITTERNACHTSSONNE">
        <EmojiScene items={["🧔", "☕", "🌅"]} />
      </CenterPop>
    </G>
    <G from={57.0} to={61.4} name="Montag">
      <Tag top={TOP} t={58.17} tone="green" text="„Keine Angst mehr vor dem Montag.“" size={28} />
    </G>
    <G from={61.5} to={DURATION_S} name="Umfrage">
      <Poll top={TOP} t={61.6} question="Würdet ihr alles hinschmeißen?" a="JA" b="NEIN" footer="Antwortet in den Kommentaren 👇" />
    </G>
  </WoodVideo>
);
