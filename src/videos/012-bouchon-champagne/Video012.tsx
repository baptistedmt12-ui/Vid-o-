import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch as Zoom } from "../_shared/Footage";
import { ClockIcon, HandIcon, HeartIcon, PinIcon } from "../_shared/icons";
import { G, Sfx, sec } from "../_shared/kit";
import { Call, Captions, Day, Dot, Poll, Polaroid, Punch, Say, Tag, Talk } from "../_shared/story";
import { BottleIcon, CorkShot, EyeIcon, Steps } from "../_shared/story2";
import { CAPTIONS } from "./captions";

// Vidéo 012 — « Le bouchon de champagne » (voiture bleue des mariés, bosse sur le toit au-dessus de la vitre arrière).
// Rush remodelé (scripts/remodel.py) : 25 → 30 i/s, 61,0 s, miroir gauche/droite à chaque coupe (~5 s). Voix ElevenLabs « Charlie » (v3).
export const DURATION_S = 61.0;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "012-bouchon-champagne";
const VIDEO = `${DIR}/rushes/original/travail.mp4`;
const AMBIANCE = `${DIR}/rushes/original/ambiance.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

const CUTS: Cut[] = [
  { t: 5.9, type: "whip" },
  { t: 11.96, type: "zoom" },
  { t: 16.7, type: "flash" },
  { t: 21.5, type: "whip" },
  { t: 26.4, type: "zoom" },
  { t: 31.32, type: "flash" },
  { t: 35.2, type: "whip" },
  { t: 39.0, type: "zoom" },
  { t: 43.0, type: "flash" },
  { t: 47.0, type: "whip" },
  { t: 51.0, type: "zoom" },
  { t: 54.96, type: "flash" },
];

const ZOOMS: Zoom[] = [
  { t: 0.18, s: 1.08 }, // bouchon
  { t: 1.66, s: 1.12, shake: true }, // deux fois
  { t: 7.7, s: 1.1 }, // panique
  { t: 13.5, s: 1.08 }, // lave
  { t: 18.92, s: 1.14, shake: true }, // droit sur le toit
  { t: 23.53, s: 1.1 }, // 15 h
  { t: 28.0, s: 1.1 }, // 20 minutes
  { t: 38.04, s: 1.14, shake: true }, // l'oncle
  { t: 46.12, s: 1.08 }, // fièrement
  { t: 54.64, s: 1.16, shake: true }, // sur sa voiture
  { t: 58.6, s: 1.1 }, // j'y retourne
];

const T = 300;

export const Video012: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={33.96} />

    {/* HOOK */}
    <G from={0.0} to={4.63} name="1 bouchon, 2 fois">
      <Tag top={T} t={0.11} tone="white" icon={<Dot color="#2f5d3a"><BottleIcon size={38} /></Dot>} text="1 bouchon de champagne" />
      <Tag top={T + 96} t={1.66} tone="red" icon={<Dot color="#fff"><span style={{ fontFamily: "Anton, Impact, sans-serif", fontSize: 34, color: "#E10600" }}>×2</span></Dot>} text="2 réparations, le même jour" size={32} />
    </G>

    {/* MISE EN PLACE */}
    <G from={4.63} to={8.69} name="Témoin">
      <Call top={T} t={4.69} caller="Le témoin du marié" sub="Samedi matin" />
    </G>
    <G from={8.69} to={15.06} name="La voiture de l'oncle">
      <Tag top={T} t={8.76} tone="white" icon={<Dot><HeartIcon size={34} color="#fff" /></Dot>} text="La voiture des mariés" />
      <Tag top={T + 96} t={11.48} icon={<Dot color="#1f4fa8"><HandIcon size={34} /></Dot>} text="Celle de l'oncle" sub="lavée tous les dimanches" size={32} />
    </G>
    <G from={15.06} to={20.09} name="Le bouchon part">
      <CorkShot top={T} t={15.12} tPop={17.4} label="À l'apéritif… droit sur le toit" />
    </G>
    <G from={20.09} to={22.47} name="Au-dessus de la vitre">
      <Polaroid src={A("avant.jpg")} t={20.14} top={T} label="AU-DESSUS DE LA VITRE" w={260} h={330} mark={{ x: 0.78, y: 0.5 }} />
    </G>
    <G from={22.47} to={24.54} name="15 h">
      <Tag top={T} t={22.52} tone="red" icon={<Dot color="#fff"><ClockIcon size={38} color="#E10600" h={3} m={0} /></Dot>} text="L'oncle arrive à 15 h" />
    </G>

    {/* TENSION */}
    <G from={24.54} to={29.1} name="Mairie">
      <Tag top={T} t={24.6} icon={<Dot><PinIcon size={34} /></Dot>} text="Parking de la mairie" />
      <Tag top={T + 96} t={26.92} tone="white" icon={<Day day="20'" />} text="Cérémonie dans 20 min" size={32} />
    </G>
    <G from={29.1} to={33.89} name="Méthode + guet">
      <Steps
        top={T}
        steps={[
          { t: 29.44, text: "Je colle" },
          { t: 30.04, text: "Je tire" },
          { t: 30.86, text: "Je reprends au marteau" },
        ]}
      />
      <Tag top={T + 250} t={32.42} icon={<Dot color="#1d2a4a"><EyeIcon size={34} /></Dot>} text="Le témoin fait le guet" size={30} />
    </G>
    <G from={33.89} to={39.54} name="L'oncle en avance">
      <Tag top={T} t={33.96} icon={<Dot><ClockIcon size={38} h={2} m={50} /></Dot>} text="14 h 50" sub="une voiture se gare à côté" />
      <Punch t={37.82} top={T + 110} text="L'ONCLE, EN AVANCE !" color="#E10600" size={60} />
    </G>
    <G from={39.54} to={42.04} name="Je range tout">
      <Tag top={T} t={39.6} tone="white" icon={<Dot><HandIcon size={34} /></Dot>} text="Je range tout…" sub="l'air de rien" />
    </G>

    {/* RÉSOLUTION */}
    <G from={42.04} to={49.79} name="Fier">
      <Tag top={T} t={43.92} icon={<Dot color="#1f4fa8"><HandIcon size={34} /></Dot>} text="La main sur le toit…" size={32} />
      <Talk top={T + 100}>
        <Say t={46.12} who="L'ONCLE" text="« Personne n'entretient une voiture comme moi ! »" />
      </Talk>
    </G>
    <G from={49.79} to={52.91} name="Vin d'honneur">
      <Tag top={T} t={49.86} tone="white" icon={<Dot color="#2f5d3a"><BottleIcon size={38} /></Dot>} text="Le soir, au vin d'honneur" sub="c'est lui qui ouvre le champagne" />
    </G>
    <G from={52.91} to={55.78} name="Encore">
      <CorkShot top={T} t={52.92} tPop={53.42} label="…tout droit sur sa voiture" />
    </G>
    <G from={55.78} to={57.6} name="22 h">
      <Call top={T} t={55.82} caller="Le témoin" sub="22 h" />
    </G>
    <G from={57.6} to={DURATION_S} name="J'y retourne ?">
      <Poll top={T} t={57.64} question="J'y retourne, ou pas ?" a="OUI" b="NON" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={sec(24.6)} durationInFrames={sec(15.46)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.13} />
    </Sequence>
    <Sequence from={sec(33.96)} durationInFrames={sec(5.55)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.32} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.11, 1.66, 8.76, 11.48, 15.12, 20.14, 24.6, 26.92, 29.44, 30.04, 30.86, 32.42, 33.96, 39.6, 43.92, 49.86, 58.55, 58.73].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[18.68, 37.82, 54.14].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    {[46.12].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    <Sfx src={A("ring.wav")} t={4.69} volume={0.2} len={1.4} />
    <Sfx src={A("ring.wav")} t={55.82} volume={0.2} len={1.4} />
    <Sfx src={A("tick.wav")} t={26.92} volume={0.2} len={1.6} />
    <Sfx src={A("splat.wav")} t={18.02} volume={0.26} />
    <Sfx src={A("splat.wav")} t={53.64} volume={0.26} />
  </AbsoluteFill>
);
