import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch as Zoom } from "../_shared/Footage";
import { EuroIcon, LockIcon, MessageIcon, MotoIcon } from "../_shared/icons";
import { Check, G, GREEN, Sfx, sec } from "../_shared/kit";
import { Call, Day, Dot, Punch, Say, Tag, Talk } from "../_shared/story";
import { Card } from "../_shared/story2";
import { Balance, GiftIcon } from "./Graphics";

// Vidéo 013 — « La moto des 18 ans » (lavage d'une Honda routière, voix off de l'utilisateur dans le rush).
// Rush 4K → 1080×1920, monté en continu (voix intacte), miroir gauche/droite toutes les ~6,5 s. Pas de sous-titres.
export const DURATION_S = 61.86;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "013-lavage-moto";
const VIDEO = `${DIR}/rushes/original/travail.mp4`;
const VOICE = `${DIR}/rushes/original/ambiance.wav`; // son du rush = la voix off
const A = (f: string) => `${DIR}/assets/${f}`;

const CUTS: Cut[] = [
  { t: 6.53, type: "whip" },
  { t: 13.58, type: "zoom" },
  { t: 19.24, type: "flash" },
  { t: 25.78, type: "whip" },
  { t: 32.14, type: "zoom" },
  { t: 38.71, type: "flash" },
  { t: 46.38, type: "whip" },
  { t: 52.14, type: "zoom" },
  { t: 58.81, type: "flash" },
];

const ZOOMS: Zoom[] = [
  { t: 0.72, s: 1.08 }, // 250 €
  { t: 4.38, s: 1.08 }, // 18 ans
  { t: 7.02, s: 1.1 }, // très bonne raison
  { t: 18.36, s: 1.06 }, // premier coup
  { t: 29.1, s: 1.1 }, // mort en moto
  { t: 35.8, s: 1.08 }, // quitté la table
  { t: 44.82, s: 1.08 }, // une peur
  { t: 50.1, s: 1.08 }, // ne décroche pas
  { t: 54.6, s: 1.12, shake: true }, // tout blanc
  { t: 58.96, s: 1.12, shake: true }, // 4000 euros
];

const T = 300;

export const Video013: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={27.7} topShade={0.2} />

    <G from={0.4} to={5.0} name="250 € / 18 ans">
      <Tag top={T} t={0.72} tone="green" icon={<Dot color="#fff"><EuroIcon size={34} color={GREEN} /></Dot>} text="250 €" sub="pour faire briller la moto" />
      <Tag top={T + 110} t={3.64} tone="white" icon={<Dot><GiftIcon size={34} /></Dot>} text="Cadeau pour ses 18 ans" size={32} />
    </G>
    <G from={5.0} to={7.95} name="La femme ne sait pas">
      <Tag top={T} t={5.08} icon={<Dot><LockIcon size={32} /></Dot>} text="Sa femme n'est pas au courant" size={32} />
    </G>
    <G from={7.95} to={12.45} name="Remorque">
      <Tag top={T} t={9.26} tone="white" icon={<Dot><MotoIcon size={40} /></Dot>} text="Routière d'occasion" sub="propre, mais pas parfaite" size={32} />
    </G>
    <G from={12.45} to={19.0} name="Le fils">
      <Card
        top={T}
        t={12.5}
        title="SON FILS"
        rows={[
          { t: 13.98, text: "En parle depuis ses 12 ans" },
          { t: 15.1, text: "Permis passé en secret" },
          { t: 16.96, text: "Payé avec ses jobs d'été" },
          { t: 18.22, text: "Du premier coup", icon: <Check k={1} size={36} />, hot: true },
        ]}
      />
    </G>
    <G from={19.0} to={24.55} name="Anniversaire">
      <Tag top={T} t={19.14} tone="white" icon={<Day day="J-1" />} text="Demain, ses 18 ans" />
      <Tag top={T + 100} t={23.68} tone="red" icon={<Dot color="#fff"><GiftIcon size={34} color="#E10600" /></Dot>} text="Un nœud sur la moto" sub="devant la maison, au réveil" size={32} />
    </G>
    <G from={24.55} to={27.7} name="Pourquoi ?">
      <Talk top={T}>
        <Say t={24.68} who="MOI" text="« Pourquoi ta femme ne sait rien ? »" />
      </Talk>
    </G>
    <G from={27.7} to={33.15} name="Le frère">
      <Tag top={T} t={28.28} icon={<Dot color="#1d1d22"><MotoIcon size={40} color="#9a9aa2" /></Dot>} text="Son frère, mort en moto à 20 ans" size={30} sub="depuis, elle refuse d'en entendre parler" />
    </G>
    <G from={33.15} to={37.12} name="Quitté la table">
      <Tag top={T} t={34.7} icon={<Dot color="#1d1d22"><span style={{ fontFamily: "Anton, Impact, sans-serif", fontSize: 30, color: "#fff" }}>P</span></Dot>} text="Le permis ?" size={32} />
      <Tag top={T + 96} t={35.8} tone="white" text="Elle a quitté la table, sans un mot" size={30} />
    </G>
    <G from={37.12} to={43.2} name="Balance">
      <Balance top={T} t={37.18} tLeft={39.8} tRight={41.5} />
    </G>
    <G from={43.2} to={46.2} name="Pas la sienne">
      <Talk top={T}>
        <Say t={44.4} who="LE PÈRE" tone="dark" text="« Une peur qui n'est même pas la sienne. »" />
      </Talk>
    </G>
    <G from={46.2} to={50.95} name="Appel">
      <Call top={T} t={46.9} caller="Sa femme" sub="Appel entrant" reveal={{ t: 49.84, text: "Il ne décroche pas" }} />
    </G>
    <G from={50.95} to={54.95} name="Message">
      <Call top={T} t={51.1} caller="Sa femme" sub="2e appel" />
      <Tag top={T + 130} t={52.68} tone="white" icon={<Dot color={GREEN}><MessageIcon size={30} /></Dot>} text="Nouveau message" size={30} />
      <Punch t={54.28} top={T + 230} text="IL DEVIENT TOUT BLANC." size={50} />
    </G>
    <G from={54.95} to={59.66} name="Relevé">
      <Card
        top={T}
        t={55.36}
        title="RELEVÉ DE COMPTE"
        light
        rotate={-2}
        rows={[{ t: 56.32, text: "Retrait · moto", right: "−4 000 €", hot: true }]}
      />
      <Talk top={T + 200}>
        <Say t={57.96} who="SA FEMME" side="right" tone="red" text="« C'est quoi ces 4 000 € ? »" />
      </Talk>
    </G>

    {/* Son : la voix off du rush, intacte */}
    <Audio src={staticFile(VOICE)} volume={1} />
    <Sequence from={sec(27.7)} durationInFrames={sec(9.5)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.22} />
    </Sequence>
    <Sequence from={sec(46.2)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.12} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.16} />)}
    {[3.64, 5.08, 9.26, 12.5, 13.98, 15.1, 16.96, 19.14, 23.68, 34.7, 35.8, 37.18, 39.8, 41.5, 52.68, 55.36].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.22} />
    ))}
    {[24.68, 44.4, 57.96].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.2} />)}
    <Sfx src={A("cash.wav")} t={0.72} volume={0.22} />
    <Sfx src={A("ding.wav")} t={18.22} volume={0.16} />
    <Sfx src={A("ring.wav")} t={46.9} volume={0.18} len={2} />
    <Sfx src={A("ring.wav")} t={51.1} volume={0.18} len={1.5} />
    <Sfx src={A("notif.wav")} t={52.7} volume={0.26} />
    <Sfx src={A("impact.wav")} t={54.28} volume={0.26} />
    <Sfx src={A("cash.wav")} t={56.32} volume={0.2} />
  </AbsoluteFill>
);
