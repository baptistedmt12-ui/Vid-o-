import React from "react";
import { CenterPop } from "../_shared/center";
import { EuroIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Dot, Poll, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 036 — « Der angebliche Araber » (grande cuillère à la hachette). Format « mépris → revanche »,
// script de l'utilisateur adapté en allemand.
export const DURATION_S = 64.0;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video036: React.FC = () => (
  <WoodVideo
    dir="036-angeblicher-araber"
    title={["Er hielt mich für einen Araber", "Großer Fehler 😏🥄"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 28.0, 33.6, 39.2, 44.8, 50.4, 56.0, 60.0]}
    zooms={[{ t: 0.3, s: 1.06 }, { t: 33.91, s: 1.06 }, { t: 49.37, s: 1.06 }]}
    pops={[33.9, 50.8]}
  >
    <G from={7.6} to={16.6} name="Muslim">
      <Tag top={TOP} t={9.94} tone="white" text="Nur weil er dachte: Muslim" size={28} />
      <Tag top={TOP + 90} t={12.2} text="Ich entschuldige mich…" size={28} />
    </G>
    <G from={20.0} to={28.4} name="Chef">
      <Tag top={TOP} t={21.31} tone="white" text="„Der Chef kümmert sich darum“" size={28} />
      <Tag top={TOP + 90} t={23.53} text="Er fühlt sich als Sieger 😎" size={28} />
    </G>
    <G from={33.8} to={36.3} name="Chef bin ich (centre)">
      <CenterPop t={33.9} caption="DER CHEF BIN ICH!">
        <EmojiScene items={["😏", "🔑"]} />
      </CenterPop>
    </G>
    <G from={37.8} to={41.0} name="Perfekt">
      <Tag top={TOP} t={37.95} tone="green" text="Perfekte Arbeit" size={30} />
    </G>
    <G from={44.4} to={48.4} name="Lob">
      <Tag top={TOP} t={44.55} tone="white" text="„Ein Lob an deinen Chef“" size={30} />
    </G>
    <G from={50.7} to={53.4} name="Araber (centre)">
      <CenterPop t={50.8} caption="DER „ARABER“ WAR DER CHEF">
        <EmojiScene items={["😳", "🥄"]} />
      </CenterPop>
    </G>
    <G from={53.6} to={60.9} name="Rechnung">
      <Tag top={TOP} t={54.07} text="Kreidebleich… dann knallrot" size={28} />
      <Tag top={TOP + 90} t={59.11} tone="red" icon={<Dot color="#fff"><EuroIcon size={30} color="#E10600" /></Dot>} text="Spezialpreis für Rassisten" size={28} />
    </G>
    <G from={60.9} to={DURATION_S} name="Umfrage">
      <Poll top={TOP} t={61.0} question="Hättet ihr das auch gemacht?" a="JA" b="NEIN" footer="Antwortet in den Kommentaren 👇" />
    </G>
  </WoodVideo>
);
