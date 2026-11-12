import React from "react";
import { CenterPop } from "../_shared/center";
import { EuroIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Dot, Poll, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 039 — « Der Deutschlehrer » (petite cuillère). Format « mépris → revanche » (mépris de l'accent) :
// nouveau script de Claude.
export const DURATION_S = 62.1;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video039: React.FC = () => (
  <WoodVideo
    dir="039-deutschlehrer"
    title={["„Lern erst mal Deutsch!“", "Großer Fehler 😏🥄"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 26.3, 31.9, 37.5, 43.1, 48.7, 54.3, 59.1]}
    quiet={[[22.4, 26.3]]}
    zooms={[{ t: 0.3, s: 1.05 }, { t: 29.17, s: 1.06 }, { t: 49.64, s: 1.05 }]}
    pops={[29.2, 45.2]}
  >
    <G from={6.6} to={10.9} name="Akzent">
      <Tag top={TOP} t={6.82} tone="white" text="Nur wegen meinem Akzent" size={28} />
    </G>
    <G from={11.0} to={24.9} name="Spruch">
      <Tag top={TOP} t={12.97} tone="white" text="Löffel mit Spruch · Hochzeit seiner Tochter" size={26} />
      <Tag top={TOP + 90} t={18.13} tone="red" text="Auf dem Zettel: 3 Fehler" size={28} />
    </G>
    <G from={29.1} to={31.6} name="Lehrer (centre)">
      <CenterPop t={29.2} caption="12 JAHRE DEUTSCHLEHRER">
        <EmojiScene items={["👨‍🏫", "📚", "✏️"]} />
      </CenterPop>
    </G>
    <G from={33.6} to={41.4} name="Richtig">
      <Tag top={TOP} t={34.37} tone="green" text="Geschnitzt – aber richtig" size={28} />
      <Tag top={TOP + 90} t={36.69} text="Jedes Komma an seinem Platz" size={28} />
    </G>
    <G from={45.1} to={47.6} name="Braut (centre)">
      <CenterPop t={45.2} caption="„PAPA, DEINE RECHTSCHREIBUNG…“">
        <EmojiScene items={["👰", "😂"]} />
      </CenterPop>
    </G>
    <G from={52.3} to={59.0} name="Rechnung">
      <Tag top={TOP} t={53.34} text="Knallrot…" size={28} />
      <Tag top={TOP + 90} t={56.96} tone="red" icon={<Dot color="#fff"><EuroIcon size={30} color="#E10600" /></Dot>} text="Spezialpreis für Besserwisser" size={28} />
    </G>
    <G from={59.1} to={DURATION_S} name="Umfrage">
      <Poll top={TOP} t={59.2} question="Hättet ihr das auch gemacht?" a="JA" b="NEIN" footer="Antwortet in den Kommentaren 👇" />
    </G>
  </WoodVideo>
);
