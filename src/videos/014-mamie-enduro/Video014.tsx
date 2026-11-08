import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch as Zoom } from "../_shared/Footage";
import { HandIcon, HeartIcon, MotoIcon, PhoneIcon } from "../_shared/icons";
import { Cross, G, Sfx, sec } from "../_shared/kit";
import { CenterPop } from "../_shared/center";
import { Call, Day, Dot, Punch, Say, Tag, Talk } from "../_shared/story";
import { Card } from "../_shared/story2";
import { GrandmaPodium, Scarf, Trophy } from "./Illus";

// Vidéo 014 — « La mamie de l'enduro » (restauration d'une vieille 125, voix off de l'utilisateur dans le rush).
// Montage continu (voix intacte), miroir toutes les 6,5 s, aucun filtre sur l'image, pas de sous-titres.
export const DURATION_S = 60.18;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "014-mamie-enduro";
const VIDEO = `${DIR}/rushes/original/travail.mp4`;
const VOICE = `${DIR}/rushes/original/ambiance.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

const CUTS: Cut[] = [6.5, 13, 19.5, 26, 32.5, 39, 45.5, 52, 58.5].map((t, i) => ({ t, type: (["whip", "zoom", "flash"] as const)[i % 3] }));

const ZOOMS: Zoom[] = [
  { t: 0.56, s: 1.08 }, // 82 ans
  { t: 6.16, s: 1.08 }, // tricot
  { t: 12.34, s: 1.1 }, // enduro
  { t: 19.94, s: 1.1, shake: true }, // interdire
  { t: 33.62, s: 1.06 }, // boue
  { t: 39.78, s: 1.1 }, // doublé
  { t: 48.1, s: 1.06 }, // doigt sur la bouche
  { t: 59.1, s: 1.08 }, // podium
];

const T = 300;
const Yarn = () => (
  <svg width={34} height={34} viewBox="0 0 24 24">
    <circle cx={12} cy={12} r={9} fill="#fff" />
    <path d="M5 8 Q12 12 19 8 M4 13 Q12 17 20 13 M7 18 Q12 20 17 18" stroke="#c0392b" strokeWidth={1.8} fill="none" />
  </svg>
);

export const Video014: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} clean />

    <G from={0.3} to={3.4} name="Mamie 82 ans">
      <Tag top={T} t={0.4} tone="white" icon={<Dot><HeartIcon size={32} color="#fff" /></Dot>} text="Une mamie de 82 ans" />
      <Tag top={T + 100} t={2.28} icon={<Dot color="#6b4a2b"><MotoIcon size={40} /></Dot>} text="Moto couverte de boue" size={30} />
    </G>
    <G from={3.4} to={7.2} name="Tricot">
      <Tag top={T} t={4.74} tone="white" icon={<Dot color="#c0392b"><Yarn /></Dot>} text="Ses petits-enfants croient…" sub="qu'elle tricote le dimanche" size={32} />
    </G>
    <G from={7.2} to={11.4} name="Combinaison">
      <Tag top={T} t={7.9} icon={<Dot><MotoIcon size={40} /></Dot>} text="Combinaison, casque sous le bras" size={30} sub="cheveux blancs tout aplatis" />
    </G>
    <G from={11.4} to={18.75} name="Le mari">
      <Card
        top={T}
        t={11.5}
        title="L'ENDURO"
        rows={[
          { t: 12.34, text: "Elle en fait depuis toujours" },
          { t: 13.74, text: "Avec son mari, sur les chemins" },
          { t: 16.38, text: "Parti il y a 10 ans" },
          { t: 17.88, text: "Elle n'a jamais arrêté", hot: true },
        ]}
      />
    </G>
    <G from={18.75} to={23.3} name="Interdite">
      <Tag top={T} t={19.94} tone="red" icon={<Cross k={1} size={56} />} text="Moto interdite à 75 ans" />
      <Tag top={T + 100} t={22.2} tone="white" text="…elle fait semblant d'arrêter" size={30} />
    </G>
    <G from={23.3} to={26.3} name="Club de tricot">
      <Tag top={T} t={23.36} icon={<Day day="DIM." />} text="« Je vais au club de tricot »" size={30} />
    </G>
    <G from={26.3} to={28.0} name="Écharpe (centre)">
      <CenterPop t={26.4} caption="L'ÉCHARPE « TRICOTÉE »">
        <Scarf t={26.4} />
      </CenterPop>
    </G>
    <G from={28.0} to={31.95} name="Marché">
      <Tag top={T} t={28.44} tone="white" icon={<Dot color="#c0392b"><Yarn /></Dot>} text="Achetée au marché" sub="une nouvelle chaque mois, pour être crédible" size={32} />
    </G>
    <G from={31.95} to={35.4} name="Boue">
      <Tag top={T} t={33.3} icon={<Dot color="#6b4a2b"><MotoIcon size={40} /></Dot>} text="De la boue jusque dans le guidon" size={30} />
    </G>
    <G from={35.4} to={41.0} name="La course">
      <Card
        top={T}
        t={35.5}
        title="SA COURSE DE CE MATIN"
        rows={[
          { t: 37.54, text: "Les virages" },
          { t: 38.22, text: "Les bosses" },
          { t: 38.8, text: "Des jeunes de 20 ans doublés", hot: true },
        ]}
      />
    </G>
    <G from={41.0} to={42.4} name="3e">
      <Punch t={41.38} top={T} text="TROISIÈME !" color="#F5B800" size={70} />
    </G>
    <G from={42.4} to={44.6} name="Coupe (centre)">
      <CenterPop t={42.5} caption="TOUTE FIÈRE">
        <Trophy t={42.5} />
      </CenterPop>
    </G>
    <G from={44.6} to={47.5} name="Petit-fils">
      <Call top={T} t={45.34} caller="Son petit-fils" />
    </G>
    <G from={47.5} to={50.6} name="Chut">
      <Tag top={T} t={47.62} tone="white" icon={<Dot><HandIcon size={32} /></Dot>} text="« Chut… pas un bruit »" />
    </G>
    <G from={50.6} to={55.1} name="Voix fatiguée">
      <Talk top={T}>
        <Say t={51.0} who="LA MAMIE · PETITE VOIX FATIGUÉE" text="« Je suis au tricot, tout va bien… »" />
      </Talk>
    </G>
    <G from={55.1} to={58.6} name="Photo reçue">
      <Tag top={T} t={55.24} icon={<Dot color="#22C55E"><PhoneIcon size={32} /></Dot>} text="Une photo reçue…" size={32} />
    </G>
    <G from={58.6} to={DURATION_S} name="Podium (centre)">
      <CenterPop t={58.7} caption="UNE MAMIE SUR UN PODIUM">
        <GrandmaPodium t={58.7} />
      </CenterPop>
    </G>

    {/* Son : voix off du rush intacte */}
    <Audio src={staticFile(VOICE)} volume={1} />
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.16} />)}
    {[0.4, 2.28, 4.74, 7.9, 11.5, 12.34, 13.74, 16.38, 17.88, 22.2, 23.36, 28.44, 33.3, 35.5, 37.54, 38.22, 38.8, 47.62, 55.24].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.2} />
    ))}
    <Sfx src={A("splat.wav")} t={2.28} volume={0.18} />
    <Sfx src={A("impact.wav")} t={19.94} volume={0.24} />
    <Sfx src={A("whoosh.wav")} t={26.3} volume={0.22} />
    <Sfx src={A("ding.wav")} t={41.38} volume={0.2} />
    <Sfx src={A("cash.wav")} t={42.5} volume={0.18} />
    <Sfx src={A("ring.wav")} t={45.34} volume={0.18} len={1.6} />
    <Sfx src={A("notif.wav")} t={51.0} volume={0.18} />
    <Sfx src={A("notif.wav")} t={55.24} volume={0.22} />
    <Sfx src={A("ding.wav")} t={58.7} volume={0.22} />
  </AbsoluteFill>
);
