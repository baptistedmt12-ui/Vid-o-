import React from "react";
import { CenterPop } from "../_shared/center";
import { G, sec } from "../_shared/kit";
import { Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 026 — « Drei Ringe » (petite pièce creuse à trois trous). Humour : les alliances de ses trois ex-maris.
export const DURATION_S = 62.6;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video026: React.FC = () => (
  <WoodVideo
    dir="026-drei-ringe"
    title={["Sie will genau 3 Löcher", "in dieser Schale 😳💍"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 26.0, 28.9, 34.5, 40.1, 45.7, 51.3, 58.2, 59.7]}
    quiet={[[26.0, 28.9]]}
    zooms={[{ t: 6.78, s: 1.06 }, { t: 16.46, s: 1.06 }, { t: 57.52, s: 1.06 }]}
    pops={[14.6, 51.6]}
  >
    <G from={2.9} to={7.4} name="3 Löcher">
      <Tag top={TOP} t={3.4} tone="white" text="Genau 3 Löcher" size={30} />
      <Tag top={TOP + 90} t={4.84} text="Nicht 2. Nicht 4." size={28} />
    </G>
    <G from={14.5} to={17.2} name="Ringe (centre)">
      <CenterPop t={14.6} caption="3 EHERINGE · 3 EX-MÄNNER">
        <EmojiScene items={["💍", "💍", "💍"]} />
      </CenterPop>
    </G>
    <G from={18.0} to={24.4} name="Zitat">
      <Tag top={TOP} t={18.26} tone="white" text="„Wegwerfen? Nein. Verkaufen? Nein.“" size={28} />
    </G>
    <G from={32.2} to={36.2} name="20 Jahre">
      <Tag top={TOP} t={32.76} text="20 Jahre Handwerk – so was noch nie" size={28} />
    </G>
    <G from={40.1} to={43.6} name="Frage">
      <Tag top={TOP} t={40.24} tone="white" text="Ausstellen? Oder verstecken? 🤔" size={30} />
    </G>
    <G from={51.5} to={53.6} name="WC (centre)">
      <CenterPop t={51.6} caption="„DIE KOMMT INS GÄSTE-WC!“">
        <EmojiScene items={["🚽", "😂"]} />
      </CenterPop>
    </G>
    <G from={56.8} to={59.7} name="4. Loch">
      <Tag top={TOP} t={57.52} tone="red" text="„Noch ein 4. Loch? Für alle Fälle.“" size={28} />
      <Tag top={TOP + 90} t={58.25} tone="white" text="Vorher" size={28} />
    </G>
    <G from={59.7} to={DURATION_S} name="Kommentare">
      <Tag top={TOP} t={60.0} tone="white" text="Und euer alter Ehering? 👇" sub="Schreibt es in die Kommentare" size={30} />
      <Tag top={TOP + 110} t={59.75} tone="green" text="Nachher" size={28} />
    </G>
  </WoodVideo>
);
