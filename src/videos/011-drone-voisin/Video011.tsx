import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch as Zoom } from "../_shared/Footage";
import { HomeIcon } from "../_shared/icons";
import { Check, G, Sfx, sec } from "../_shared/kit";
import { Call, Captions, Dot, Poll, Polaroid, Punch, Tag } from "../_shared/story";
import { Card, CardIcon, DocIcon, DroneIcon } from "../_shared/story2";
import { MoonIcon } from "../008-toit-vasistas/Graphics";
import { CAPTIONS } from "./captions";
import { Feed, Street } from "./Graphics";

// Vidéo 011 — « Le drone du voisin » (bosse sur le toit, contre la barre de toit).
// Rush remodelé (scripts/remodel.py) : 61,0 s, miroir gauche/droite à chaque coupe (~5 s). Voix ElevenLabs « Charlie » (v3).
export const DURATION_S = 61.0;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "011-drone-voisin";
const VIDEO = `${DIR}/rushes/original/travail.mp4`;
const AMBIANCE = `${DIR}/rushes/original/ambiance.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

const CUTS: Cut[] = [
  { t: 6.5, type: "whip" },
  { t: 13.0, type: "zoom" },
  { t: 19.5, type: "flash" },
  { t: 26.8, type: "whip" },
  { t: 32.5, type: "zoom" },
  { t: 38.0, type: "flash" },
  { t: 43.0, type: "whip" },
  { t: 47.87, type: "zoom" },
  { t: 50.67, type: "flash" },
  { t: 56.0, type: "whip" },
];

const ZOOMS: Zoom[] = [
  { t: 1.9, s: 1.1, shake: true }, // tombé du ciel
  { t: 5.18, s: 1.08 }, // tout déclenché
  { t: 11.08, s: 1.12, shake: true }, // gros bruit
  { t: 14.04, s: 1.1 }, // drone
  { t: 24.4, s: 1.12 }, // tout pâle
  { t: 32.42, s: 1.08 }, // des semaines
  { t: 36.84, s: 1.14, shake: true }, // voisin d'en face
  { t: 40.4, s: 1.08 }, // la guerre
  { t: 53.52, s: 1.1 }, // a payé
  { t: 57.38, s: 1.12 }, // jamais coupée
];

const T = 300;

export const Video011: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={19.85} />

    {/* HOOK */}
    <G from={0.0} to={3.12} name="Tombé du ciel">
      <Tag top={T} t={0.3} icon={<Dot color="#1d2a4a"><DroneIcon size={40} /></Dot>} text="Tombé du ciel" />
    </G>
    <G from={3.12} to={6.74} name="La vidéo">
      <Tag top={T} t={3.18} tone="red" icon={<Dot color="#fff"><CardIcon size={34} color="#E10600" /></Dot>} text="…et la vidéo dedans" sub="a tout déclenché" />
    </G>

    {/* MISE EN PLACE */}
    <G from={6.74} to={9.14} name="Dimanche">
      <Call top={T} t={6.82} caller="Un client" sub="Dimanche matin" />
    </G>
    <G from={9.14} to={13.4} name="Gros bruit">
      <Tag top={T} t={9.18} icon={<Dot color="#1d2a4a"><MoonIcon size={38} /></Dot>} text="Un gros bruit dans la nuit" size={32} />
    </G>
    <G from={13.4} to={16.02} name="Un drone">
      <Tag top={T} t={13.46} tone="white" icon={<Dot><DroneIcon size={40} /></Dot>} text="Un drone près de la voiture" size={32} />
    </G>
    <G from={16.02} to={19.83} name="Bosse toit">
      <Polaroid src={A("avant.jpg")} t={16.06} top={T} label="SUR LE TOIT" w={260} h={330} mark={{ x: 0.52, y: 0.74 }} />
    </G>

    {/* TENSION */}
    <G from={19.83} to={23.71} name="Carte mémoire">
      <Tag top={T} t={21.86} icon={<Dot><CardIcon size={34} /></Dot>} text="La carte mémoire du drone" size={32} />
    </G>
    <G from={23.71} to={25.73} name="Tout pâle">
      <Punch t={23.96} top={T} text="IL DEVIENT TOUT PÂLE." size={64} />
    </G>
    <G from={25.73} to={33.38} name="Les vidéos">
      <Feed
        top={T}
        t={25.78}
        tDays={[26.8, 31.9]}
        lines={[
          { t: 29.4, text: "Son jardin, sa haie…" },
          { t: 32.18, text: "depuis des semaines" },
        ]}
      />
    </G>
    <G from={33.38} to={38.23} name="Chez le voisin">
      <Street top={T} t={33.44} tFly={34.62} />
    </G>

    {/* RÉSOLUTION */}
    <G from={38.23} to={45.87} name="Le voisin">
      <Card
        top={T}
        t={38.3}
        title="LE VOISIN D'EN FACE"
        rows={[
          { t: 40.4, text: "2 ans de guerre pour la haie", icon: <HomeIcon size={30} /> },
          { t: 44.12, text: "Des preuves pour la mairie", icon: <DocIcon size={30} />, hot: true },
        ]}
      />
    </G>
    <G from={45.87} to={49.44} name="Débosselé">
      <Tag top={T} t={45.94} tone="green" icon={<Check k={1} size={58} />} text="Toit débosselé" />
      <Tag top={T + 96} t={47.94} tone="white" icon={<Dot><DocIcon size={32} /></Dot>} text="Facture imprimée" size={32} />
    </G>
    <G from={49.44} to={52.78} name="Il sonne en face">
      <Tag top={T} t={49.5} icon={<Dot><HomeIcon size={34} /></Dot>} text="Il sonne en face" sub="le drone sous le bras" />
    </G>
    <G from={52.78} to={55.78} name="Payé">
      <Card top={T} t={52.82} title="RÉPARATION DU TOIT" light rotate={2} rows={[{ t: 53.02, text: "Payé par : le voisin" }]} stamp={{ t: 53.52, text: "PAYÉ", color: "#22C55E" }} />
    </G>
    <G from={55.78} to={58.3} name="Haie">
      <Punch t={55.82} top={T} text="LA HAIE ?" size={64} />
      <Punch t={57.38} top={T + 84} text="JAMAIS COUPÉE." color="#FFD23F" size={64} />
    </G>
    <G from={58.3} to={DURATION_S} name="Plainte ?">
      <Poll top={T} t={58.36} question="Tu aurais porté plainte ?" a="OUI" b="NON" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={sec(19.85)} durationInFrames={sec(18.22)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.14} />
    </Sequence>
    <Sequence from={sec(25.78)} durationInFrames={sec(12.22)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.28} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.3, 3.18, 9.18, 13.46, 16.06, 21.86, 25.78, 29.4, 32.18, 38.3, 40.4, 44.12, 47.94, 49.5, 52.82, 58.69, 58.9].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[1.9, 11.08, 23.96, 36.84, 55.82, 57.38].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    <Sfx src={A("ring.wav")} t={6.82} volume={0.2} len={1.4} />
    <Sfx src={A("whoosh.wav")} t={35.24} volume={0.3} />
    <Sfx src={A("ding.wav")} t={45.94} volume={0.2} />
    <Sfx src={A("cash.wav")} t={53.52} volume={0.26} />
  </AbsoluteFill>
);
