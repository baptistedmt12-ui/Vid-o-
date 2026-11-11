import React from "react";
import { CenterPop } from "../_shared/center";
import { HeartIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Dot, Poll, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 029 — « Der Antrag im Löffel » (cuillère). Couple : c'est elle qui fait la demande… et lui avait déjà une bague.
export const DURATION_S = 62.7;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video029: React.FC = () => (
  <WoodVideo
    dir="029-antrag-loeffel"
    title={["Sie versteckt einen Ring", "in diesem Löffel 💍🥄"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 28.0, 30.9, 36.5, 42.1, 47.7, 53.3, 58.9]}
    quiet={[[28.0, 30.9]]}
    zooms={[{ t: 10.84, s: 1.06 }, { t: 49.86, s: 1.06 }, { t: 57.44, s: 1.05 }]}
    pops={[3.6, 54.0]}
  >
    <G from={3.5} to={5.9} name="Ring (centre)">
      <CenterPop t={3.6} caption="VERSTECK IHN IM LÖFFEL">
        <EmojiScene items={["💍", "🥄"]} />
      </CenterPop>
    </G>
    <G from={9.9} to={16.6} name="Sie fragt">
      <Tag top={TOP} t={10.04} tone="red" text="Sie macht IHM den Antrag" size={30} />
      <Tag top={TOP + 90} t={12.76} icon={<Dot color="#fff"><HeartIcon size={30} /></Dot>} text="8 Jahre zusammen · nie gefragt" size={28} />
    </G>
    <G from={20.4} to={26.6} name="Versteck">
      <Tag top={TOP} t={20.46} tone="white" text="Versteck hinten im Griff" size={30} />
      <Tag top={TOP + 90} t={25.48} text="+ Stöpsel aus Holz" size={28} />
    </G>
    <G from={33.5} to={41.9} name="Nervös">
      <Tag top={TOP} t={33.98} text="Total nervös 😬" size={30} />
      <Tag top={TOP + 90} t={37.66} tone="white" text="„Und wenn er ablehnt?“" size={28} />
    </G>
    <G from={42.3} to={47.0} name="Suppe">
      <Tag top={TOP} t={42.5} tone="white" text="Samstag: seine Lieblingssuppe 🍲" size={28} />
    </G>
    <G from={47.1} to={50.6} name="Umdrehen">
      <Tag top={TOP} t={48.12} tone="red" text="„Dreh mal den Löffel um.“" size={30} />
    </G>
    <G from={53.9} to={56.3} name="Zwei Ringe (centre)">
      <CenterPop t={54.0} caption="ER HATTE AUCH EINEN RING!">
        <EmojiScene items={["💍", "😂", "💍"]} />
      </CenterPop>
    </G>
    <G from={59.8} to={DURATION_S} name="Umfrage">
      <Poll top={TOP} t={59.9} question="Darf eine Frau den Antrag machen?" a="JA" b="NEIN" footer="Antwortet in den Kommentaren 👇" />
    </G>
  </WoodVideo>
);
