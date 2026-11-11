import React from "react";
import { CenterPop } from "../_shared/center";
import { SceneFrame } from "../_shared/illus";
import { HeartIcon, MessageIcon } from "../_shared/icons";
import { BODY, G, sec, useG } from "../_shared/kit";
import { Call, Captions, Dot, Tag } from "../_shared/story";
import { StoryVideo } from "../_shared/StoryVideo";
import { Title, titleBottom } from "../_shared/title";
import { CAPTIONS } from "./captions";

// Vidéo 023 — « Die zerbrochene Schale » (bol creusé jusqu'à être percé → cadre de miroir). Voix Andrew (edge-tts).
// Règles du compte allemand : titre en pyramide, étiquettes sous le titre, sous-titres bleu clair,
// son d'origine en fond, aucun ralenti/accéléré, habillage épuré.
export const DURATION_S = 64.5;
export const TOTAL_FRAMES = sec(DURATION_S);
const DIR = "023-zerbrochene-schale";
const TITLE = ["Warum zerstöre ich diese", "perfekte Schale? 😳🪵"];
const T = titleBottom(TITLE.length);

/** Miroir recouvert d'une serviette. */
const SpiegelTuch: React.FC = () => {
  const { lin } = useG();
  const k = lin(0.2, 0.9);
  return (
    <SceneFrame bg="#eef2f6">
      <rect x={0} y={0} width={572} height={380} fill="#e9e3d8" />
      <ellipse cx={286} cy={190} rx={120} ry={160} fill="#8a5a2b" />
      <ellipse cx={286} cy={190} rx={100} ry={140} fill="#bfe3f5" />
      <g transform={`translate(0 ${(1 - k) * -260})`}>
        <path d="M150 40 H422 V300 Q390 330 360 300 Q330 330 300 300 Q270 330 240 300 Q210 330 180 300 Q160 320 150 300Z" fill="#4f7cc4" />
        {[80, 120, 260].map((y) => (
          <rect key={y} x={150} y={y} width={272} height={10} fill="#fff" opacity={0.85} />
        ))}
      </g>
    </SceneFrame>
  );
};

/** Dos du cadre avec le mot du père. */
const Rueckseite: React.FC = () => {
  const { lin } = useG();
  const k = lin(0.3, 1.6);
  const text = "Auch kaputt bleibt sie wunderschön.";
  const n = Math.round(text.length * k);
  return (
    <SceneFrame bg="#fdf3e7">
      <ellipse cx={286} cy={190} rx={230} ry={150} fill="#c9925c" />
      <ellipse cx={286} cy={190} rx={200} ry={124} fill="#ddb07c" />
      <foreignObject x={110} y={120} width={352} height={150}>
        <div
          style={{
            fontFamily: BODY,
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 38,
            lineHeight: 1.2,
            color: "#3b2410",
            textAlign: "center",
          }}
        >
          {text.slice(0, n)}
        </div>
      </foreignObject>
    </SceneFrame>
  );
};

const CUTS = [
  { t: 5.6, type: "whip" as const },
  { t: 11.2, type: "zoom" as const },
  { t: 16.8, type: "whip" as const },
  { t: 22.4, type: "flash" as const },
  { t: 28.0, type: "whip" as const },
  { t: 33.6, type: "zoom" as const },
  { t: 39.2, type: "whip" as const },
  { t: 44.8, type: "zoom" as const },
  { t: 50.4, type: "whip" as const },
  { t: 56.0, type: "flash" as const },
  { t: 58.3, type: "zoom" as const },
  { t: 62.0, type: "flash" as const },
];

// Son d'origine en fond, plan par plan (scie et bac plus bas : mesurés plus forts).
const AMB: [number, number, number][] = [
  [11.2, 16.8, 0.05],
  [28.0, 33.6, 0.05],
];
const ambiance = (t: number) => AMB.find(([a, b]) => t >= a && t < b)?.[2] ?? 0.11;

export const Video023: React.FC = () => (
  <StoryVideo
    dir={DIR}
    cuts={CUTS}
    zooms={[
      { t: 3.0, s: 1.06 },
      { t: 14.24, s: 1.05 },
      { t: 40.32, s: 1.06 },
      { t: 58.36, s: 1.05 },
    ]}
    ambiance={ambiance}
    whoosh={0.07}
    sfx={{ pop: [19.6, 49.9] }}
  >
    <G from={0.2} to={6.9} name="Auftrag">
      <Call top={T} t={0.3} caller="Ein Vater" sub="Neuer Auftrag" reveal={{ t: 3.0, text: "Schale zerstören?!" }} />
    </G>
    <G from={12.1} to={19.1} name="Tochter">
      <Tag top={T} t={12.4} tone="white" icon={<Dot><HeartIcon size={30} color="#fff" /></Dot>} text="Seine Tochter, 9 Jahre" size={30} />
      <Tag top={T + 96} t={17.8} text="Seit Monaten kein Spiegel" size={28} />
    </G>
    <G from={19.4} to={22.3} name="Spiegel (centre)">
      <CenterPop t={19.6} caption="ALLE SPIEGEL ZUGEHÄNGT">
        <SpiegelTuch />
      </CenterPop>
    </G>
    <G from={25.9} to={30.0} name="Wie eine kaputte Schale">
      <Tag top={T} t={26.3} tone="white" text="„Wie eine kaputte Schale“" sub="Der Vater" size={30} />
    </G>
    <G from={39.2} to={44.0} name="Zerstören">
      <Tag top={T} t={40.32} tone="red" text="Absichtlich zerstören" size={30} />
    </G>
    <G from={49.7} to={53.1} name="Rückseite (centre)">
      <CenterPop t={49.9} caption="HINTEN DRAUF">
        <Rueckseite />
      </CenterPop>
    </G>
    <G from={53.2} to={55.9} name="Video">
      <Tag top={T} t={54.1} icon={<Dot><MessageIcon size={30} /></Dot>} text="3 Tage später · neues Video" size={28} />
    </G>
    <G from={56.0} to={58.3} name="Vorher">
      <Tag top={T} t={56.1} tone="white" text="Vorher" size={30} />
    </G>
    <G from={58.3} to={61.2} name="Lacht">
      <Tag top={T} t={59.32} tone="green" text="Zum ersten Mal seit Monaten" size={30} />
    </G>
    <G from={61.2} to={DURATION_S} name="Kommentare">
      <Tag top={T} t={61.4} tone="white" text="Was hättet ihr draufgeschrieben? 👇" sub="Schreibt es in die Kommentare" size={28} />
      <Tag top={T + 110} t={62.05} tone="green" text="Nachher" size={30} />
    </G>
    <Captions data={CAPTIONS} hl="#4FC3FF" />
    <Title lines={TITLE} size={58} />
  </StoryVideo>
);
