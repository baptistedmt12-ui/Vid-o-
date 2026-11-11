import React from "react";
import { CenterPop } from "../_shared/center";
import { PhoneIcon } from "../_shared/icons";
import { G, sec } from "../_shared/kit";
import { Call, Dot, Poll, Tag } from "../_shared/story";
import { EmojiScene, TOP, WoodVideo } from "../_shared/wood";
import { CAPTIONS } from "./captions";

// Vidéo 031 — « Die Mobberin » (cuillère). L'ancienne harceleuse de l'artisan l'appelle pour son fils harcelé.
export const DURATION_S = 63.2;
export const TOTAL_FRAMES = sec(DURATION_S);

export const Video031: React.FC = () => (
  <WoodVideo
    dir="031-mobberin"
    title={["Meine Mobberin ruft nach", "20 Jahren an 😳📞"]}
    captions={CAPTIONS}
    cuts={[5.6, 11.2, 16.8, 22.4, 28.0, 33.6, 39.2, 42.1, 47.7, 53.3, 58.9, 60.9]}
    quiet={[[39.2, 42.1]]}
    zooms={[{ t: 4.42, s: 1.05 }, { t: 22.46, s: 1.06 }, { t: 55.43, s: 1.05 }]}
    pops={[13.6, 50.6]}
  >
    <G from={0.2} to={7.0} name="Anruf">
      <Call top={TOP} t={0.3} caller="Unbekannte Nummer" sub="Anruf" reveal={{ t: 1.84, text: "Meine Mobberin 😳" }} />
    </G>
    <G from={7.1} to={11.6} name="Auflegen">
      <Tag top={TOP} t={7.84} tone="red" text="Fast aufgelegt…" size={30} />
    </G>
    <G from={13.5} to={15.9} name="Schule (centre)">
      <CenterPop t={13.6} caption="JEDEN TAG AUSGELACHT">
        <EmojiScene items={["🏫", "😞"]} />
      </CenterPop>
    </G>
    <G from={21.0} to={30.6} name="Sohn">
      <Tag top={TOP} t={22.46} tone="white" icon={<Dot><PhoneIcon size={30} /></Dot>} text="„Mein Sohn wird gemobbt“" size={28} />
      <Tag top={TOP + 90} t={27.86} text="Er liebt nur noch: Schnitzen" size={28} />
    </G>
    <G from={33.0} to={38.9} name="Bring ihn mit">
      <Tag top={TOP} t={34.75} tone="green" text="„Bring ihn mit.“" size={30} />
      <Tag top={TOP + 90} t={35.77} tone="white" text="Samstag · ein stiller Junge" size={28} />
    </G>
    <G from={43.2} to={47.6} name="Hände">
      <Tag top={TOP} t={45.91} text="Kaum ein Wort – aber seine Hände…" size={28} />
    </G>
    <G from={50.5} to={53.0} name="Lächelt (centre)">
      <CenterPop t={50.6} caption="SEIN ERSTER LÖFFEL">
        <EmojiScene items={["🥄", "😊"]} />
      </CenterPop>
    </G>
    <G from={54.2} to={60.9} name="Entschuldigung">
      <Tag top={TOP} t={55.43} tone="white" text="„Es tut mir leid. Für alles.“" size={28} />
      <Tag top={TOP + 90} t={58.89} tone="green" text="Jetzt jeden Samstag" size={28} />
    </G>
    <G from={60.9} to={DURATION_S} name="Umfrage">
      <Poll top={TOP} t={61.0} question="Hättet ihr ihr verziehen?" a="JA" b="NEIN" footer="Antwortet in den Kommentaren 👇" />
    </G>
  </WoodVideo>
);
