import React from "react";
import { CenterPop } from "../_shared/center";
import { EuroIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Dot, Poll, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 038 — « Der Typ aus der Garage » (cuillère). Format « mépris → revanche » (mépris de classe),
// script de Claude validé par l'utilisateur, adapté en cuillère.
export const DURATION_S = 64.4;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video038: React.FC = () => (
  <WoodVideo
    dir="038-garage"
    title={["„Du hast dein Leben verkackt!“", "Großer Fehler 😏🥄"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 26.0, 31.6, 37.2, 42.8, 48.4, 54.0, 59.6]}
    quiet={[[22.4, 26.0]]}
    zooms={[{ t: 0.3, s: 1.05 }, { t: 24.6, s: 1.06 }, { t: 53.76, s: 1.06 }]}
    pops={[25.0, 52.0]}
  >
    <G from={7.1} to={12.9} name="Scheine">
      <Tag top={TOP} t={8.46} tone="white" text="Wirft mir seine Scheine hin 💸" size={28} />
      <Tag top={TOP + 90} t={10.5} text="Ich senke den Kopf…" size={28} />
    </G>
    <G from={13.1} to={22.6} name="Restaurant">
      <Tag top={TOP} t={13.84} tone="white" text="Löffel für sein Nobelrestaurant" size={28} />
      <Tag top={TOP + 90} t={17.46} text="Logo? Von einem „echten“ Handwerker" size={26} />
    </G>
    <G from={24.9} to={27.4} name="Lehrling (centre)">
      <CenterPop t={25.0} caption="MEIN EHEMALIGER LEHRLING">
        <EmojiScene items={["👨‍🔧", "📞"]} />
      </CenterPop>
    </G>
    <G from={33.4} to={42.6} name="Alles">
      <Tag top={TOP} t={33.48} tone="red" text="Aufgeben? Ernsthaft?" size={30} />
      <Tag top={TOP + 90} t={37.4} tone="green" text="Löffel + Logo, von Hand" size={28} />
    </G>
    <G from={42.9} to={49.4} name="Eröffnung">
      <Tag top={TOP} t={42.98} tone="white" text="Eröffnung · vor allen Gästen" size={28} />
      <Tag top={TOP + 90} t={46.92} text="„Der beste Handwerker der Region!“" size={26} />
    </G>
    <G from={51.9} to={54.4} name="Mikro (centre)">
      <CenterPop t={52.0} caption="„DER TYP AUS DER GARAGE“">
        <EmojiScene items={["🎤", "😳"]} />
      </CenterPop>
    </G>
    <G from={55.2} to={61.5} name="Rechnung">
      <Tag top={TOP} t={55.42} text="Knallrot…" size={28} />
      <Tag top={TOP + 90} t={59.78} tone="red" icon={<Dot color="#fff"><EuroIcon size={30} color="#E10600" /></Dot>} text="Spezialpreis für Angeber" size={28} />
    </G>
    <G from={61.6} to={DURATION_S} name="Umfrage">
      <Poll top={TOP} t={61.7} question="Hättet ihr das auch gemacht?" a="JA" b="NEIN" footer="Antwortet in den Kommentaren 👇" />
    </G>
  </WoodVideo>
);
