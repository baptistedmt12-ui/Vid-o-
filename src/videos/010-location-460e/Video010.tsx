import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch as Zoom } from "../_shared/Footage";
import { ClockIcon, EuroIcon, MagnifierIcon, PhoneIcon } from "../_shared/icons";
import { Check, G, GREEN, Sfx, sec } from "../_shared/kit";
import { Call, Captions, Day, Dot, Poll, Polaroid, Punch, Say, Tag, Talk } from "../_shared/story";
import { Card, DocIcon, Steps } from "../_shared/story2";
import { CAPTIONS } from "./captions";

// Vidéo 010 — « Les 460 € » (voiture noire de location, bosse sous la vitre de la portière).
// Rush remodelé (scripts/remodel.py) : 97,7 s → 61,0 s, miroir toutes les ~15 s. Voix ElevenLabs « Charlie » (v3).
export const DURATION_S = 61.0;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "010-location-460e";
const VIDEO = `${DIR}/rushes/original/travail.mp4`;
const AMBIANCE = `${DIR}/rushes/original/ambiance.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

const CUTS: Cut[] = [
  { t: 7.0, type: "whip" },
  { t: 14.0, type: "zoom" },
  { t: 23.8, type: "flash" },
  { t: 29.1, type: "whip" },
  { t: 37.1, type: "zoom" },
  { t: 45.7, type: "flash" },
  { t: 51.4, type: "whip" },
];

const ZOOMS: Zoom[] = [
  { t: 0.88, s: 1.1, shake: true }, // 460
  { t: 6.24, s: 1.1 }, // mettre plus
  { t: 9.9, s: 1.08 }, // location
  { t: 17.84, s: 1.12, shake: true }, // 1500
  { t: 23.16, s: 1.08 }, // billets
  { t: 32.46, s: 1.08 }, // se verra
  { t: 44.84, s: 1.1 }, // rien trouvé
  { t: 49.66, s: 1.14, shake: true }, // déjà notée
  { t: 51.7, s: 1.12 }, // avant lui
  { t: 56.18, s: 1.12 }, // bosse d'un autre
];

const T = 300;

export const Video010: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={39.8} />

    {/* HOOK */}
    <G from={0} to={3.45} name="460 €">
      <Tag top={T} t={0.6} tone="green" icon={<Dot color="#fff"><EuroIcon size={36} color={GREEN} /></Dot>} text="460 € pour une bosse" />
    </G>
    <G from={3.45} to={7.25} name="Il aurait mis plus">
      <Tag top={T} t={3.5} icon={<Dot><MagnifierIcon size={34} /></Dot>} text="J'ai vite compris pourquoi…" size={32} />
      <Punch t={5.6} top={T + 100} text="IL AURAIT MIS PLUS." color="#FFD23F" size={64} />
    </G>

    {/* MISE EN PLACE */}
    <G from={7.25} to={10.72} name="Location">
      <Tag top={T} t={7.32} tone="white" icon={<Day day="VEN." />} text="Une voiture de location" sub="vendredi midi" />
    </G>
    <G from={10.72} to={13.66} name="Sous la vitre">
      <Polaroid src={A("avant.jpg")} t={10.8} top={T} label="SOUS LA VITRE" w={260} h={330} mark={{ x: 0.48, y: 0.46 }} />
    </G>
    <G from={13.66} to={15.74} name="18 h">
      <Tag top={T} t={13.72} tone="red" icon={<Dot color="#fff"><ClockIcon size={38} color="#E10600" h={6} m={0} /></Dot>} text="À rendre à 18 h" />
    </G>
    <G from={15.74} to={20.68} name="Contrat">
      <Card
        top={T}
        t={15.8}
        title="CONTRAT DE LOCATION"
        light
        rotate={-2}
        rows={[
          { t: 17.0, text: "Franchise", right: "1 500 €", hot: true },
          { t: 18.84, text: "+ frais de l'agence", right: "€€€" },
        ]}
      />
    </G>
    <G from={20.68} to={24.52} name="Pas de négo">
      <Tag top={T} t={20.74} icon={<Dot><EuroIcon size={34} /></Dot>} text="Il ne négocie même pas" />
      <Tag top={T + 96} t={23.04} tone="green" icon={<Check k={1} size={58} />} text="Billets sur la table" size={32} />
    </G>

    {/* TENSION */}
    <G from={24.52} to={28.4} name="Méthode">
      <Steps
        top={T}
        steps={[
          { t: 25.1, text: "Je colle" },
          { t: 26.2, text: "Je tire" },
          { t: 27.1, text: "Je reprends au marteau" },
        ]}
      />
    </G>
    <G from={28.4} to={30.34} name="Téléphone">
      <Tag top={T} t={28.46} icon={<Dot color="#1d2a4a"><PhoneIcon size={34} /></Dot>} text="Il ne lâche pas son téléphone" size={32} />
    </G>
    <G from={30.34} to={33.48} name="Ça se verra ?">
      <Talk top={T}>
        <Say t={31.4} who="LE CLIENT · TOUTES LES 10 MIN" side="right" tone="dark" text="« Ça se verra encore ? »" />
      </Talk>
    </G>
    <G from={33.48} to={36.28} name="17 h 30">
      <Tag top={T} t={33.54} tone="green" icon={<Check k={1} size={58} />} text="17 h 30 : portière parfaite" />
    </G>
    <G from={36.28} to={39.8} name="Il part">
      <Tag top={T} t={36.34} icon={<Dot><ClockIcon size={38} h={5} m={35} /></Dot>} text="Il part en courant" sub="« je vous appelle ce soir »" />
    </G>

    {/* RÉSOLUTION */}
    <G from={39.8} to={41.26} name="Le soir">
      <Call top={T} t={39.86} caller="Le client" sub="Le soir" />
    </G>
    <G from={41.26} to={46.04} name="Inspection">
      <Tag top={T} t={41.32} tone="white" icon={<Dot><MagnifierIcon size={34} /></Dot>} text="L'agence inspecte à la lampe" size={32} />
      <Tag top={T + 96} t={44.84} tone="green" icon={<Check k={1} size={58} />} text="Rien trouvé" />
    </G>
    <G from={46.04} to={52.3} name="État des lieux">
      <Card
        top={T}
        t={46.1}
        title="ÉTAT DES LIEUX · DÉPART"
        light
        rotate={2}
        rows={[
          { t: 46.56, text: "Pare-chocs : RAS", icon: <DocIcon size={30} color="#0B0B0D" /> },
          { t: 48.42, text: "Bosse sous la vitre", hot: true, icon: <DocIcon size={30} color="#E10600" /> },
        ]}
        stamp={{ t: 51.12, text: "DÉJÀ LÀ" }}
      />
    </G>
    <G from={52.3} to={57.48} name="La bosse d'un autre">
      <Punch t={53.76} top={T} text="460 € POUR LA BOSSE" color="#FFD23F" size={58} />
      <Punch t={55.58} top={T + 80} text="D'UN AUTRE." color="#E10600" size={58} />
    </G>
    <G from={57.48} to={DURATION_S} name="État des lieux ?">
      <Poll top={T} t={57.54} question="Tu vérifies l'état des lieux ?" a="TOUJOURS" b="JAMAIS" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={sec(24.5)} durationInFrames={sec(12)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.12} />
    </Sequence>
    <Sequence from={sec(46.1)} durationInFrames={sec(6)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.3} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[3.5, 7.32, 10.8, 13.72, 15.8, 17.0, 18.84, 20.74, 25.1, 26.2, 27.1, 28.46, 36.34, 41.32, 46.1, 46.56, 48.42, 57.8, 58.0].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[5.6, 51.12, 53.76, 55.58].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    {[31.4].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    <Sfx src={A("cash.wav")} t={0.6} volume={0.26} />
    <Sfx src={A("cash.wav")} t={23.04} volume={0.24} />
    <Sfx src={A("tick.wav")} t={13.72} volume={0.2} len={1.6} />
    <Sfx src={A("ding.wav")} t={33.54} volume={0.2} />
    <Sfx src={A("ding.wav")} t={44.84} volume={0.2} />
    <Sfx src={A("ring.wav")} t={39.86} volume={0.2} len={1.4} />
  </AbsoluteFill>
);
