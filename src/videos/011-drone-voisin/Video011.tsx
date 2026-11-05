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
  { t: 1.88, s: 1.1, shake: true }, // tombé du ciel
  { t: 4.86, s: 1.08 }, // tout déclenché
  { t: 10.7, s: 1.12, shake: true }, // gros bruit
  { t: 13.62, s: 1.1 }, // drone
  { t: 24.04, s: 1.12 }, // tout pâle
  { t: 32.96, s: 1.08 }, // des semaines
  { t: 37.6, s: 1.14, shake: true }, // voisin d'en face
  { t: 41.46, s: 1.08 }, // la guerre
  { t: 53.92, s: 1.1 }, // a payé
  { t: 57.6, s: 1.12 }, // jamais coupée
];

const T = 300;

export const Video011: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={19.31} />

    {/* HOOK */}
    <G from={0.0} to={2.96} name="Tombé du ciel">
      <Tag top={T} t={0.26} icon={<Dot color="#1d2a4a"><DroneIcon size={40} /></Dot>} text="Tombé du ciel" />
    </G>
    <G from={2.96} to={6.33} name="La vidéo">
      <Tag top={T} t={3.02} tone="red" icon={<Dot color="#fff"><CardIcon size={34} color="#E10600" /></Dot>} text="…et la vidéo dedans" sub="a tout déclenché" />
    </G>

    {/* MISE EN PLACE */}
    <G from={6.33} to={8.6} name="Dimanche">
      <Call top={T} t={6.4} caller="Un client" sub="Dimanche matin" />
    </G>
    <G from={8.6} to={12.91} name="Gros bruit">
      <Tag top={T} t={8.64} icon={<Dot color="#1d2a4a"><MoonIcon size={38} /></Dot>} text="Un gros bruit dans la nuit" size={32} />
    </G>
    <G from={12.91} to={15.6} name="Un drone">
      <Tag top={T} t={12.98} tone="white" icon={<Dot><DroneIcon size={40} /></Dot>} text="Un drone près de la voiture" size={32} />
    </G>
    <G from={15.6} to={19.29} name="Bosse toit">
      <Polaroid src={A("avant.jpg")} t={15.64} top={T} label="SUR LE TOIT" w={260} h={330} mark={{ x: 0.52, y: 0.74 }} />
    </G>

    {/* TENSION */}
    <G from={19.29} to={23.03} name="Carte mémoire">
      <Tag top={T} t={21.26} icon={<Dot><CardIcon size={34} /></Dot>} text="La carte mémoire du drone" size={32} />
    </G>
    <G from={23.03} to={25.44} name="Tout pâle">
      <Punch t={23.54} top={T} text="IL DEVIENT TOUT PÂLE." size={64} />
    </G>
    <G from={25.44} to={34.05} name="Les vidéos">
      <Feed
        top={T}
        t={25.5}
        tDays={[26.8, 31.9]}
        lines={[
          { t: 29.52, text: "Son jardin, sa haie…" },
          { t: 32.72, text: "depuis des semaines" },
        ]}
      />
    </G>
    <G from={34.05} to={39.07} name="Chez le voisin">
      <Street top={T} t={34.12} tFly={34.62} />
    </G>

    {/* RÉSOLUTION */}
    <G from={39.07} to={46.75} name="Le voisin">
      <Card
        top={T}
        t={39.14}
        title="LE VOISIN D'EN FACE"
        rows={[
          { t: 41.46, text: "2 ans de guerre pour la haie", icon: <HomeIcon size={30} /> },
          { t: 45.3, text: "Des preuves pour la mairie", icon: <DocIcon size={30} />, hot: true },
        ]}
      />
    </G>
    <G from={46.75} to={50.09} name="Débosselé">
      <Tag top={T} t={46.8} tone="green" icon={<Check k={1} size={58} />} text="Toit débosselé" />
      <Tag top={T + 96} t={48.84} tone="white" icon={<Dot><DocIcon size={32} /></Dot>} text="Facture imprimée" size={32} />
    </G>
    <G from={50.09} to={53.1} name="Il sonne en face">
      <Tag top={T} t={50.14} icon={<Dot><HomeIcon size={34} /></Dot>} text="Il sonne en face" sub="le drone sous le bras" />
    </G>
    <G from={53.1} to={56.18} name="Payé">
      <Card top={T} t={53.14} title="RÉPARATION DU TOIT" light rotate={2} rows={[{ t: 53.34, text: "Payé par : le voisin" }]} stamp={{ t: 53.92, text: "PAYÉ", color: "#22C55E" }} />
    </G>
    <G from={56.18} to={58.38} name="Haie">
      <Punch t={56.22} top={T} text="LA HAIE ?" size={64} />
      <Punch t={57.6} top={T + 84} text="JAMAIS COUPÉE." color="#FFD23F" size={64} />
    </G>
    <G from={58.38} to={DURATION_S} name="Plainte ?">
      <Poll top={T} t={58.44} question="Tu aurais porté plainte ?" a="OUI" b="NON" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={sec(19.31)} durationInFrames={sec(17.75)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.14} />
    </Sequence>
    <Sequence from={sec(25.5)} durationInFrames={sec(11.69)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.28} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.26, 3.02, 8.64, 12.98, 15.64, 21.26, 25.5, 29.52, 32.72, 39.14, 41.46, 45.3, 48.84, 50.14, 53.14, 58.75, 58.95].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[1.88, 10.7, 23.54, 37.6, 56.22, 57.6].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    <Sfx src={A("ring.wav")} t={6.4} volume={0.2} len={1.4} />
    <Sfx src={A("whoosh.wav")} t={35.98} volume={0.3} />
    <Sfx src={A("ding.wav")} t={46.8} volume={0.2} />
    <Sfx src={A("cash.wav")} t={53.92} volume={0.26} />
  </AbsoluteFill>
);
