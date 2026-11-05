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
  { t: 0.16, s: 1.08 }, // bouchon
  { t: 1.76, s: 1.12, shake: true }, // deux fois
  { t: 7.96, s: 1.1 }, // panique
  { t: 13.1, s: 1.08 }, // lave
  { t: 18.08, s: 1.14, shake: true }, // droit sur le toit
  { t: 22.7, s: 1.1 }, // 15 h
  { t: 27.1, s: 1.1 }, // 20 minutes
  { t: 36.98, s: 1.14, shake: true }, // l'oncle
  { t: 45.3, s: 1.08 }, // fièrement
  { t: 54.52, s: 1.16, shake: true }, // sur sa voiture
  { t: 59.02, s: 1.1 }, // j'y retourne
];

const T = 300;

export const Video012: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={33.1} />

    {/* HOOK */}
    <G from={0} to={5.24} name="1 bouchon, 2 fois">
      <Tag top={T} t={0.1} tone="white" icon={<Dot color="#2f5d3a"><BottleIcon size={38} /></Dot>} text="1 bouchon de champagne" />
      <Tag top={T + 96} t={1.76} tone="red" icon={<Dot color="#fff"><span style={{ fontFamily: "Anton, Impact, sans-serif", fontSize: 34, color: "#E10600" }}>×2</span></Dot>} text="2 réparations, le même jour" size={32} />
    </G>

    {/* MISE EN PLACE */}
    <G from={5.24} to={8.84} name="Témoin">
      <Call top={T} t={5.3} caller="Le témoin du marié" sub="Samedi matin" />
    </G>
    <G from={8.84} to={14.78} name="La voiture de l'oncle">
      <Tag top={T} t={8.9} tone="white" icon={<Dot><HeartIcon size={34} color="#fff" /></Dot>} text="La voiture des mariés" />
      <Tag top={T + 96} t={11.16} icon={<Dot color="#1f4fa8"><HandIcon size={34} /></Dot>} text="Celle de l'oncle" sub="lavée tous les dimanches" size={32} />
    </G>
    <G from={14.78} to={19.36} name="Le bouchon part">
      <CorkShot top={T} t={14.84} tPop={17.4} label="À l'apéritif… droit sur le toit" />
    </G>
    <G from={19.36} to={21.56} name="Au-dessus de la vitre">
      <Polaroid src={A("avant.jpg")} t={19.4} top={T} label="AU-DESSUS DE LA VITRE" w={260} h={330} mark={{ x: 0.78, y: 0.5 }} />
    </G>
    <G from={21.56} to={23.74} name="15 h">
      <Tag top={T} t={21.62} tone="red" icon={<Dot color="#fff"><ClockIcon size={38} color="#E10600" h={3} m={0} /></Dot>} text="L'oncle arrive à 15 h" />
    </G>

    {/* TENSION */}
    <G from={23.74} to={27.68} name="Mairie">
      <Tag top={T} t={23.8} icon={<Dot><PinIcon size={34} /></Dot>} text="Parking de la mairie" />
      <Tag top={T + 96} t={26.06} tone="white" icon={<Day day="20'" />} text="Cérémonie dans 20 min" size={32} />
    </G>
    <G from={27.68} to={33.04} name="Méthode + guet">
      <Steps
        top={T}
        steps={[
          { t: 28.46, text: "Je colle" },
          { t: 29.24, text: "Je tire" },
          { t: 30.18, text: "Je reprends au marteau" },
        ]}
      />
      <Tag top={T + 250} t={31.74} icon={<Dot color="#1d2a4a"><EyeIcon size={34} /></Dot>} text="Le témoin fait le guet" size={30} />
    </G>
    <G from={33.04} to={38.7} name="L'oncle en avance">
      <Tag top={T} t={33.1} icon={<Dot><ClockIcon size={38} h={2} m={50} /></Dot>} text="14 h 50" sub="une voiture se gare à côté" />
      <Punch t={36.82} top={T + 110} text="L'ONCLE, EN AVANCE !" color="#E10600" size={60} />
    </G>
    <G from={38.7} to={41.66} name="Je range tout">
      <Tag top={T} t={38.76} tone="white" icon={<Dot><HandIcon size={34} /></Dot>} text="Je range tout…" sub="et je fais semblant de passer" />
    </G>

    {/* RÉSOLUTION */}
    <G from={41.66} to={48.56} name="Fier">
      <Tag top={T} t={43.32} icon={<Dot color="#1f4fa8"><HandIcon size={34} /></Dot>} text="La main sur le toit…" size={32} />
      <Talk top={T + 100}>
        <Say t={45.3} who="L'ONCLE" text="« Personne n'entretient une voiture comme moi ! »" />
      </Talk>
    </G>
    <G from={48.56} to={52.96} name="Vin d'honneur">
      <Tag top={T} t={48.62} tone="white" icon={<Dot color="#2f5d3a"><BottleIcon size={38} /></Dot>} text="Le soir, au vin d'honneur" sub="c'est lui qui ouvre le champagne" />
    </G>
    <G from={52.96} to={56.14} name="Encore">
      <CorkShot top={T} t={53.0} tPop={53.42} label="…tout droit sur sa voiture" />
    </G>
    <G from={56.14} to={58.64} name="22 h">
      <Call top={T} t={56.2} caller="Le témoin" sub="22 h" />
    </G>
    <G from={58.64} to={DURATION_S} name="J'y retourne ?">
      <Poll top={T} t={58.7} question="J'y retourne, ou pas ?" a="OUI" b="NON" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={sec(23.8)} durationInFrames={sec(15)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.13} />
    </Sequence>
    <Sequence from={sec(33.1)} durationInFrames={sec(6)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.32} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.1, 1.76, 8.9, 11.16, 14.84, 19.4, 23.8, 26.06, 28.46, 29.24, 30.18, 31.74, 33.1, 38.76, 43.32, 48.62, 59.0, 59.2].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[17.9, 36.82, 53.9].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    {[45.3].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    <Sfx src={A("ring.wav")} t={5.3} volume={0.2} len={1.4} />
    <Sfx src={A("ring.wav")} t={56.2} volume={0.2} len={1.4} />
    <Sfx src={A("tick.wav")} t={26.06} volume={0.2} len={1.6} />
    <Sfx src={A("splat.wav")} t={17.4} volume={0.26} />
    <Sfx src={A("splat.wav")} t={53.42} volume={0.26} />
  </AbsoluteFill>
);
