import { AbsoluteFill, Audio, staticFile } from "remotion";
import { Footage, type Cut, type Punch as Zoom } from "../_shared/Footage";
import { HandIcon, MagnifierIcon, MotoIcon, WarnIcon } from "../_shared/icons";
import { Cross, G, Sfx, sec } from "../_shared/kit";
import { CenterPop } from "../_shared/center";
import { Dot, Punch, Say, Tag, Talk } from "../_shared/story";
import { Card, Steps } from "../_shared/story2";
import { BirdDrop, Portrait } from "./Illus";

// Vidéo 015 — « Le réservoir interdit » (moto bleue, covering, voix off de l'utilisateur dans le rush).
// Montage continu (voix intacte), miroir toutes les 6,5 s, aucun filtre sur l'image, pas de sous-titres.
export const DURATION_S = 62.54;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "015-reservoir-jessica";
const VIDEO = `${DIR}/rushes/original/travail.mp4`;
const VOICE = `${DIR}/rushes/original/ambiance.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

const CUTS: Cut[] = [6.5, 13, 19.5, 26, 32.5, 39, 45.5, 52, 58.5].map((t, i) => ({ t, type: (["whip", "zoom", "flash"] as const)[i % 3] }));

const ZOOMS: Zoom[] = [
  { t: 2.36, s: 1.08 }, // formellement
  { t: 5.16, s: 1.1, shake: true }, // j'ai touché
  { t: 11.4, s: 1.06 }, // tout sauf
  { t: 25.3, s: 1.1 }, // fiente
  { t: 34.24, s: 1.1 }, // se décolle
  { t: 40.8, s: 1.08 }, // un dessin
  { t: 47.9, s: 1.1 }, // m'arrêter
  { t: 59.88, s: 1.1, shake: true }, // pas tout seul
];

const T = 300;
const Car = () => (
  <svg width={40} height={40} viewBox="0 0 24 24">
    <path d="M3 15l2-5c.4-1 1.2-1.6 2.3-1.6h9.4c1.1 0 1.9.6 2.3 1.6l2 5v4h-2v-2H5v2H3z" fill="#fff" />
    <circle cx={7} cy={15} r={1.4} fill="#0B0B0D" />
    <circle cx={17} cy={15} r={1.4} fill="#0B0B0D" />
  </svg>
);

export const Video015: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} clean />

    <G from={0.2} to={4.3} name="Interdit">
      <Tag top={T} t={0.3} tone="red" icon={<Cross k={1} size={56} />} text="Interdit : le réservoir" />
    </G>
    <G from={4.3} to={6.1} name="Évidemment">
      <Punch t={4.38} top={T} text="ÉVIDEMMENT… J'Y AI TOUCHÉ." size={52} />
    </G>
    <G from={6.1} to={9.9} name="Moto bleue">
      <Tag top={T} t={6.16} tone="white" icon={<Dot color="#1f4fd1"><MotoIcon size={40} /></Dot>} text="Moto bleue, presque neuve" size={32} />
    </G>
    <G from={9.9} to={14.3} name="Tout sauf">
      <Talk top={T}>
        <Say t={10.1} who="LE CLIENT" text="« Tout sauf le réservoir. Même pas un chiffon. »" />
        <Say t={13.42} who="MOI" side="right" tone="dark" text="« Pourquoi ? »" />
      </Talk>
    </G>
    <G from={14.3} to={18.5} name="Covering">
      <Tag top={T} t={14.88} tone="white" icon={<Dot><WarnIcon size={32} /></Dot>} text="Un covering spécial" sub="très fragile" />
    </G>
    <G from={18.5} to={23.5} name="Méthode">
      <Steps
        top={T}
        steps={[
          { t: 19.08, text: "Les roues" },
          { t: 19.66, text: "Le moteur" },
          { t: 20.28, text: "La selle" },
        ]}
      />
      <Tag top={T + 220} t={21.56} icon={<Dot><MagnifierIcon size={32} /></Dot>} text="…puis le réservoir" size={30} />
    </G>
    <G from={23.5} to={26.45} name="Fiente (centre)">
      <CenterPop t={23.6} caption="UNE ÉNORME FIENTE">
        <BirdDrop t={23.6} />
      </CenterPop>
    </G>
    <G from={26.45} to={28.6} name="Déjà sèche">
      <Tag top={T} t={26.52} tone="red" icon={<Cross k={1} size={56} />} text="Déjà sèche" />
    </G>
    <G from={28.6} to={32.8} name="Juste un peu">
      <Tag top={T} t={28.8} tone="white" icon={<Dot><HandIcon size={32} /></Dot>} text="Un chiffon, un peu de produit" sub="juste là, juste un petit peu" size={30} />
    </G>
    <G from={32.8} to={37.9} name="Ça se décolle">
      <Tag top={T} t={32.86} tone="red" icon={<Dot color="#fff"><WarnIcon size={32} color="#E10600" /></Dot>} text="Le coin se décolle" />
      <Tag top={T + 100} t={36.52} icon={<Dot><HandIcon size={32} /></Dot>} text="…encore un peu plus" size={30} />
    </G>
    <G from={37.9} to={45.9} name="Le dessin">
      <Card
        top={T}
        t={38.0}
        title="EN DESSOUS"
        rows={[
          { t: 38.6, text: "De la peinture… pas d'origine" },
          { t: 40.8, text: "Un dessin", hot: true },
          { t: 41.96, text: "Un œil" },
          { t: 42.74, text: "Des cheveux longs, bruns" },
        ]}
      />
    </G>
    <G from={45.9} to={48.45} name="Plus moyen d'arrêter">
      <Punch t={46.04} top={T} text="IMPOSSIBLE DE M'ARRÊTER." color="#FFD23F" size={52} />
    </G>
    <G from={48.45} to={51.2} name="Visage (centre)">
      <CenterPop t={48.5} caption="PEINT À LA MAIN">
        <Portrait t={48.5} />
      </CenterPop>
    </G>
    <G from={51.2} to={53.3} name="En dessous">
      <Tag top={T} t={51.3} icon={<Dot><MagnifierIcon size={32} /></Dot>} text="Et en dessous, un prénom…" size={30} />
    </G>
    <G from={53.3} to={54.85} name="Jessica (centre)">
      <CenterPop t={53.35}>
        <Portrait t={53.35} reveal={false} banner />
      </CenterPop>
    </G>
    <G from={54.85} to={57.5} name="Ne recolle plus">
      <Tag top={T} t={54.94} tone="red" icon={<Cross k={1} size={56} />} text="Le covering ne recolle plus" size={30} />
    </G>
    <G from={57.5} to={60.5} name="Il arrive">
      <Tag top={T} t={57.66} icon={<Dot><Car /></Dot>} text="Une voiture se gare…" size={32} />
      <Tag top={T + 100} t={59.08} tone="white" text="C'est lui, mais pas tout seul" size={30} />
    </G>
    <G from={60.5} to={DURATION_S} name="Pas Jessica">
      <Punch t={60.56} top={T} text="…ET CE N'ÉTAIT PAS JESSICA." color="#E10600" size={48} />
    </G>

    {/* Son : voix off du rush intacte */}
    <Audio src={staticFile(VOICE)} volume={1} />
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.16} />)}
    {[6.16, 14.88, 19.08, 19.66, 20.28, 21.56, 28.8, 36.52, 38.0, 38.6, 41.96, 42.74, 51.3, 57.66, 59.08].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.2} />
    ))}
    <Sfx src={A("impact.wav")} t={4.38} volume={0.24} />
    <Sfx src={A("notif.wav")} t={10.1} volume={0.18} />
    <Sfx src={A("splat.wav")} t={24.35} volume={0.26} />
    <Sfx src={A("tear.wav")} t={32.86} volume={0.24} />
    <Sfx src={A("tear.wav")} t={36.78} volume={0.22} />
    <Sfx src={A("ding.wav")} t={40.8} volume={0.18} />
    <Sfx src={A("tear.wav")} t={48.5} volume={0.24} />
    <Sfx src={A("ding.wav")} t={53.35} volume={0.2} />
    <Sfx src={A("impact.wav")} t={60.56} volume={0.26} />
  </AbsoluteFill>
);
