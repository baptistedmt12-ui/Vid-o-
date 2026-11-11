import React from "react";
import { CenterPop } from "../_shared/center";
import { HeartIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Dot, Poll, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 035 — « Der Babylöffel » (petite cuillère). Un couple qui essaie d'avoir un enfant depuis 6 ans.
export const DURATION_S = 64.6;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video035: React.FC = () => (
  <WoodVideo
    dir="035-babyloeffel"
    title={["Ein Babylöffel für ein Baby,", "das es nicht gibt 🍼🥹"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 28.0, 33.6, 36.5, 42.1, 47.7, 53.3, 58.9, 61.4]}
    quiet={[[33.6, 36.5]]}
    zooms={[{ t: 3.26, s: 1.05 }, { t: 13.26, s: 1.06 }, { t: 61.95, s: 1.07 }]}
    pops={[18.0, 54.2]}
  >
    <G from={8.0} to={13.9} name="6 Jahre">
      <Tag top={TOP} t={9.06} tone="white" icon={<Dot><HeartIcon size={30} color="#fff" /></Dot>} text="Seit 6 Jahren: Kinderwunsch" size={28} />
      <Tag top={TOP + 96} t={11.74} tone="red" text="5 Versuche · 5-mal nichts" size={28} />
    </G>
    <G from={17.9} to={20.4} name="Kinderzimmer (centre)">
      <CenterPop t={18.0} caption="DAS KINDERZIMMER BLEIBT ZU">
        <EmojiScene items={["🧸", "🚪"]} />
      </CenterPop>
    </G>
    <G from={22.3} to={28.9} name="Letzter Versuch">
      <Tag top={TOP} t={22.36} tone="white" text="Der 6. und letzte Versuch" size={30} />
      <Tag top={TOP + 90} t={27.94} text="„Wir glauben daran.“" size={28} />
    </G>
    <G from={29.1} to={33.1} name="Behalten">
      <Tag top={TOP} t={31.76} text="„Ich will ihn trotzdem behalten.“" size={28} />
    </G>
    <G from={36.6} to={41.3} name="Klein">
      <Tag top={TOP} t={36.55} tone="white" text="Ganz klein · für einen kleinen Mund" size={28} />
    </G>
    <G from={47.0} to={49.8} name="Schublade">
      <Tag top={TOP} t={47.15} tone="green" text="Nicht für die Schublade" size={30} />
    </G>
    <G from={50.0} to={53.4} name="1 Jahr">
      <Tag top={TOP} t={50.03} text="Fast 1 Jahr später… ein Foto" size={28} />
    </G>
    <G from={54.1} to={56.7} name="Baby (centre)">
      <CenterPop t={54.2} caption="IM HOCHSTUHL, VOLLER BREI">
        <EmojiScene items={["👶", "🥣", "🥄"]} />
      </CenterPop>
    </G>
    <G from={60.0} to={62.5} name="Endlich">
      <Tag top={TOP} t={61.95} tone="green" text="„Endlich.“" size={34} />
    </G>
    <G from={62.5} to={DURATION_S} name="Umfrage">
      <Poll top={TOP} t={62.6} question="Glaubt ihr an Zeichen?" a="JA" b="NEIN" footer="Antwortet in den Kommentaren 👇" />
    </G>
  </WoodVideo>
);
