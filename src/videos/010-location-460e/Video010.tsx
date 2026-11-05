import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch as Zoom } from "../_shared/Footage";
import { ClockIcon, EuroIcon, MagnifierIcon, PhoneIcon } from "../_shared/icons";
import { Check, G, GREEN, Sfx, sec } from "../_shared/kit";
import { Call, Captions, Day, Dot, Poll, Polaroid, Punch, Say, Tag, Talk } from "../_shared/story";
import { Card, DocIcon, Steps } from "../_shared/story2";
import { CAPTIONS } from "./captions";

// Vidéo 010 — « Les 460 € » (voiture noire de location, bosse sous la vitre de la portière).
// Rush remodelé (scripts/remodel.py) : 97,7 s → 61,0 s, miroir gauche/droite à chaque coupe (~5 s). Voix ElevenLabs « Charlie » (v3).
export const DURATION_S = 61.0;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "010-location-460e";
const VIDEO = `${DIR}/rushes/original/travail.mp4`;
const AMBIANCE = `${DIR}/rushes/original/ambiance.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

const CUTS: Cut[] = [
  { t: 7.0, type: "whip" },
  { t: 14.0, type: "zoom" },
  { t: 19.0, type: "flash" },
  { t: 23.8, type: "whip" },
  { t: 29.1, type: "zoom" },
  { t: 37.1, type: "flash" },
  { t: 45.7, type: "whip" },
  { t: 51.4, type: "zoom" },
  { t: 56.4, type: "flash" },
];

const ZOOMS: Zoom[] = [
  { t: 0.98, s: 1.1, shake: true }, // 460
  { t: 6.82, s: 1.1 }, // mettre plus
  { t: 11.06, s: 1.08 }, // location
  { t: 19.06, s: 1.12, shake: true }, // 1500
  { t: 22.72, s: 1.08 }, // billets
  { t: 32.12, s: 1.08 }, // se verra
  { t: 42.92, s: 1.1 }, // rien trouvé
  { t: 48.4, s: 1.14, shake: true }, // déjà notée
  { t: 50.3, s: 1.12 }, // avant lui
  { t: 54.04, s: 1.12 }, // bosse d'un autre
];

const T = 300;

export const Video010: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={38.0} />

    {/* HOOK */}
    <G from={0.0} to={3.3} name="460 €">
      <Tag top={T} t={0.62} tone="green" icon={<Dot color="#fff"><EuroIcon size={36} color={GREEN} /></Dot>} text="460 € pour une bosse" />
    </G>
    <G from={3.3} to={8.37} name="Il aurait mis plus">
      <Tag top={T} t={3.32} icon={<Dot><MagnifierIcon size={34} /></Dot>} text="J'ai vite compris pourquoi…" size={32} />
      <Punch t={6.14} top={T + 100} text="IL AURAIT MIS PLUS." color="#FFD23F" size={64} />
    </G>

    {/* MISE EN PLACE */}
    <G from={8.37} to={11.94} name="Location">
      <Tag top={T} t={8.48} tone="white" icon={<Day day="VEN." />} text="Une voiture de location" sub="vendredi midi" />
    </G>
    <G from={11.94} to={14.32} name="Sous la vitre">
      <Polaroid src={A("avant.jpg")} t={12.01} top={T} label="SOUS LA VITRE" w={260} h={330} mark={{ x: 0.48, y: 0.46 }} />
    </G>
    <G from={14.32} to={16.44} name="18 h">
      <Tag top={T} t={14.35} tone="red" icon={<Dot color="#fff"><ClockIcon size={38} color="#E10600" h={6} m={0} /></Dot>} text="À rendre à 18 h" />
    </G>
    <G from={16.44} to={20.46} name="Contrat">
      <Card
        top={T}
        t={16.51}
        title="CONTRAT DE LOCATION"
        light
        rotate={-2}
        rows={[
          { t: 18.28, text: "Franchise", right: "1 500 €", hot: true },
        ]}
      />
    </G>
    <G from={20.46} to={23.75} name="Pas de négo">
      <Tag top={T} t={20.48} icon={<Dot><EuroIcon size={34} /></Dot>} text="Il ne négocie même pas" />
      <Tag top={T + 96} t={22.6} tone="green" icon={<Check k={1} size={58} />} text="Billets sur la table" size={32} />
    </G>

    {/* TENSION */}
    <G from={23.75} to={27.75} name="Méthode">
      <Steps
        top={T}
        steps={[
          { t: 24.14, text: "Je colle" },
          { t: 25.24, text: "Je tire" },
          { t: 26.18, text: "Je reprends au marteau" },
        ]}
      />
    </G>
    <G from={27.75} to={29.79} name="Téléphone">
      <Tag top={T} t={27.82} icon={<Dot color="#1d2a4a"><PhoneIcon size={34} /></Dot>} text="Il ne lâche pas son téléphone" size={32} />
    </G>
    <G from={29.79} to={33.5} name="Ça se verra ?">
      <Talk top={T}>
        <Say t={31.0} who="LE CLIENT · SANS ARRÊT" side="right" tone="dark" text="« Ça se verra encore ? »" />
      </Talk>
    </G>
    <G from={33.5} to={36.48} name="17 h 30">
      <Tag top={T} t={33.58} tone="green" icon={<Check k={1} size={58} />} text="17 h 30 : portière parfaite" />
    </G>
    <G from={36.48} to={38.0} name="Il part">
      <Tag top={T} t={36.56} icon={<Dot><ClockIcon size={38} h={5} m={35} /></Dot>} text="Il part en courant" />
    </G>

    {/* RÉSOLUTION */}
    <G from={38.0} to={39.81} name="Le soir">
      <Call top={T} t={38.02} caller="Le client" sub="Le soir" />
    </G>
    <G from={39.81} to={43.99} name="Inspection">
      <Tag top={T} t={39.88} tone="white" icon={<Dot><MagnifierIcon size={34} /></Dot>} text="L'agence inspecte tout" size={32} />
      <Tag top={T + 96} t={42.92} tone="green" icon={<Check k={1} size={58} />} text="Rien trouvé" />
    </G>
    <G from={43.99} to={51.2} name="État des lieux">
      <Card
        top={T}
        t={44.05}
        title="ÉTAT DES LIEUX · DÉPART"
        light
        rotate={2}
        rows={[
          { t: 44.68, text: "Pare-chocs : RAS", icon: <DocIcon size={30} color="#0B0B0D" /> },
          { t: 46.9, text: "Bosse sous la vitre", hot: true, icon: <DocIcon size={30} color="#E10600" /> },
        ]}
        stamp={{ t: 49.78, text: "DÉJÀ LÀ" }}
      />
    </G>
    <G from={51.2} to={55.42} name="La bosse d'un autre">
      <Punch t={51.72} top={T} text="460 € POUR LA BOSSE" color="#FFD23F" size={58} />
      <Punch t={53.48} top={T + 80} text="D'UN AUTRE." color="#E10600" size={58} />
    </G>
    <G from={55.42} to={DURATION_S} name="État des lieux ?">
      <Poll top={T} t={55.5} question="Tu vérifies l'état des lieux ?" a="TOUJOURS" b="JAMAIS" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={sec(23.7)} durationInFrames={sec(13.24)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.12} />
    </Sequence>
    <Sequence from={sec(44.05)} durationInFrames={sec(6.57)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.3} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[3.32, 8.48, 12.01, 14.35, 16.51, 18.28, 19.74, 20.48, 24.14, 25.24, 26.18, 27.82, 36.56, 39.88, 44.05, 44.68, 46.9, 55.79, 56.01].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[6.14, 49.78, 51.72, 53.48].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    {[31.0].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    <Sfx src={A("cash.wav")} t={0.62} volume={0.26} />
    <Sfx src={A("cash.wav")} t={22.6} volume={0.24} />
    <Sfx src={A("tick.wav")} t={14.35} volume={0.2} len={1.6} />
    <Sfx src={A("ding.wav")} t={33.58} volume={0.2} />
    <Sfx src={A("ding.wav")} t={42.92} volume={0.2} />
    <Sfx src={A("ring.wav")} t={38.02} volume={0.2} len={1.4} />
  </AbsoluteFill>
);
