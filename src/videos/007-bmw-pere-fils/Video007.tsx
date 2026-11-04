import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch as Zoom } from "../_shared/Footage";
import { ClockIcon, EuroIcon, HandIcon, HeartIcon, LockIcon, MagnifierIcon, PinIcon } from "../_shared/icons";
import { Check, Cross, G, GREEN, Sfx, sec } from "../_shared/kit";
import { CAPTIONS } from "./captions";
import { Captions, Call, Day, Dot, Poll, Polaroid, Punch, Say, Side, Tag, Talk, Timeline, Times, tone } from "../_shared/story";
import { BODY, TITLE } from "../_shared/kit";
import { CarRear } from "./Graphics";

// Vidéo 007 — « La bosse du père » (BMW 116i noire, bosse au-dessus du feu arrière).
// Rush remodelé (scripts/remodel.py) : 61,0 s, voix off de synthèse qui démarre à 0.
export const DURATION_S = 61.0;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "007-bmw-pere-fils";
const VIDEO = `${DIR}/rushes/original/travail.mp4`;
const AMBIANCE = `${DIR}/rushes/original/ambiance.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

// Coupes du remodelage (sorties par remodel.py)
const CUTS: Cut[] = [
  { t: 5.8, type: "whip" },
  { t: 11.2, type: "zoom" },
  { t: 16.4, type: "flash" },
  { t: 20.6, type: "whip" },
  { t: 26.47, type: "zoom" },
  { t: 32.07, type: "flash" },
  { t: 38.27, type: "whip" },
  { t: 44.32, type: "zoom" },
  { t: 50.05, type: "flash" },
  { t: 52.92, type: "whip" },
  { t: 56.17, type: "zoom" },
];

const ZOOMS: Zoom[] = [
  { t: 0.58, s: 1.08 }, // payé
  { t: 3.02, s: 1.12, shake: true }, // pas lui
  { t: 4.4, s: 1.1 }, // vrai coupable
  { t: 8.16, s: 1.1, shake: true }, // panique
  { t: 14.22, s: 1.1 }, // une bosse
  { t: 16.98, s: 1.08 }, // lundi
  { t: 24.02, s: 1.12 }, // hésite
  { t: 33.58, s: 1.14, shake: true }, // même nom
  { t: 35.06, s: 1.16, shake: true }, // le père
  { t: 37.38, s: 1.1 }, // pilier
  { t: 47.82, s: 1.08 }, // toute ma vie
  { t: 51.72, s: 1.14 }, // plus rien
  { t: 55.92, s: 1.1 }, // bêtise
  { t: 58.98, s: 1.12 }, // je leur dis
];

const T = 300; // haut des graphiques (sous la barre TikTok)

export const Video007: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={31.6} />

    {/* HOOK */}
    <G from={0.0} to={2.24} name="Il m'a payé">
      <Tag top={T} t={0.04} tone="white" icon={<Dot color={GREEN}><EuroIcon size={36} /></Dot>} text="Il m'a payé" sub="pour effacer cette bosse" />
    </G>
    <G from={2.24} to={3.85} name="Pas lui">
      <Tag top={T} t={2.28} tone="red" icon={<Cross k={1} size={62} />} text="…mais c'est pas lui" sub="qui l'avait faite" />
    </G>
    <G from={3.85} to={6.59} name="Le vrai coupable">
      <Call top={T} t={4.38} caller="Le vrai coupable" sub="2 jours plus tard" />
    </G>

    {/* MISE EN PLACE */}
    <G from={6.59} to={8.79} name="Dimanche, panique">
      <Tag top={T} t={6.64} icon={<Day day="DIM." />} text="Un jeune m'appelle" sub="en panique" />
    </G>
    <G from={8.79} to={12.15} name="BMW du père">
      <Tag top={T} t={8.84} tone="white" icon={<CarRear size={70} />} text="La BMW de son père" />
      <Tag top={T + 100} t={10.9} tone="red" icon={<Dot color="#fff"><HeartIcon size={36} /></Dot>} text="1er rendez-vous" size={32} />
    </G>
    <G from={12.15} to={16.3} name="Bosse feu arrière">
      <Tag top={T} t={12.2} icon={<Dot><PinIcon size={36} /></Dot>} text="En sortant du restaurant…" size={32} />
      <Polaroid src={A("avant.jpg")} t={14.06} top={T + 100} label="AU-DESSUS DU FEU" w={260} h={330} mark={{ x: 0.55, y: 0.62 }} />
    </G>
    <G from={16.3} to={17.69} name="Père rentre lundi">
      <Tag top={T} t={16.36} tone="white" icon={<Day day="LUN." />} text="Son père rentre lundi" />
    </G>

    {/* TENSION */}
    <G from={17.69} to={20.97} name="Diagnostic">
      <Side top={T} t={17.74}>
        <div style={{ ...tone("dark"), borderRadius: 26, padding: "18px 26px", width: 470 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: BODY, fontWeight: 800, fontSize: 24, letterSpacing: 3, opacity: 0.65 }}>
            <MagnifierIcon size={30} /> DIAGNOSTIC
          </div>
          {[
            [19.72, "Bosse ronde"],
            [20.18, "Nette"],
            [20.66, "Sur l'aile"],
          ].map(([t, txt]) => (
            <Row key={txt as string} t={t as number} text={txt as string} />
          ))}
        </div>
      </Side>
    </G>
    <G from={20.97} to={23.85} name="T'es sûr ?">
      <Talk top={T}>
        <Say t={21.04} who="MOI" text="« T'es sûr que c'est arrivé au restaurant ? »" />
      </Talk>
    </G>
    <G from={23.85} to={25.0} name="Il hésite">
      <Punch t={23.95} top={T} text="IL HÉSITE…" color="#FFD23F" size={80} />
    </G>
    <G from={25.0} to={27.63} name="Il jure">
      <Talk top={T}>
        <Say t={25.04} who="LUI" side="right" tone="dark" text="« Je te jure ! Garé loin de tout le monde. »" />
      </Talk>
    </G>
    <G from={27.63} to={29.61} name="Réparé 1 h">
      <Tag top={T} t={27.66} tone="green" icon={<Dot color="#fff"><ClockIcon size={38} color={GREEN} h={1} m={0} /></Dot>} text="Réparé en 1 heure" />
    </G>
    <G from={29.61} to={31.55} name="Promis">
      <Tag top={T} t={29.64} icon={<Dot><LockIcon size={34} /></Dot>} text="« Tu dis rien, promis ? »" />
    </G>
    <G from={31.55} to={34.71} name="Mardi soir">
      <Call top={T} t={31.6} caller="Numéro inconnu" sub="Mardi soir" reveal={{ t: 33.03, text: "Même nom de famille" }} />
    </G>

    {/* RÉSOLUTION */}
    <G from={34.71} to={35.54} name="Le père">
      <Punch t={34.76} top={T} text="C'EST LE PÈRE." size={90} />
    </G>
    <G from={35.54} to={43.89} name="Chronologie">
      <Timeline
        top={T}
        title="CE QUI S'EST VRAIMENT PASSÉ"
        steps={[
          { t: 36.8, day: "VEN.", text: "Le père touche le pilier du garage" },
          { t: 39.1, day: "VEN.", text: "Bosse au-dessus du feu arrière", hot: true },
          { t: 41.17, day: "SAM.", text: "Il prête la voiture au fils… sans rien dire" },
        ]}
      />
    </G>
    <G from={43.89} to={48.61} name="Avant qu'il la voie">
      <Talk top={T}>
        <Say t={43.96} who="LE PÈRE" text="« Répare-la avant qu'il la voie… »" />
        <Say t={46.5} side="right" tone="red" text="« …sinon il me le rappelle toute ma vie ! »" size={30} />
      </Talk>
    </G>
    <G from={48.61} to={51.6} name="La main dix fois">
      <Side top={T} t={48.64}>
        <div style={{ ...tone("dark"), borderRadius: 100, padding: "10px 30px 10px 10px", display: "flex", alignItems: "center", gap: 16 }}>
          <Dot>
            <HandIcon size={38} />
          </Dot>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34 }}>Il passe la main dessus</div>
          <Times t0={50.0} t1={50.98} to={9.45} size={60} />
        </div>
      </Side>
    </G>
    <G from={51.6} to={52.42} name="Plus rien">
      <Punch t={51.72} top={T} text="PLUS RIEN." color="#22C55E" size={90} />
    </G>
    <G from={52.42} to={54.51} name="Toutes seules">
      <Talk top={T}>
        <Say t={52.44} who="MOI" text="« Parfois, les bosses partent toutes seules. »" />
      </Talk>
      <Polaroid src={A("apres.jpg")} t={53.0} top={T + 170} label="APRÈS" w={240} h={300} rotate={4} />
    </G>
    <G from={54.51} to={58.35} name="Bilan">
      <Side top={T} t={54.54}>
        <div style={{ ...tone("white"), borderRadius: 26, padding: "18px 26px", width: 500 }}>
          <Line t={55.0} who="LE FILS" what="a payé la bêtise du père" color="#E10600" />
          <Line t={56.24} who="LE PÈRE" what="croit au miracle" color="#0B0B0D" />
          <Line t={57.06} who="AUCUN DES DEUX" what="ne le sait" color="#22C55E" />
        </div>
      </Side>
    </G>
    <G from={58.35} to={DURATION_S} name="Je leur dis ?">
      <Poll top={T} t={58.64} question="Je leur dis, ou pas ?" a="OUI" b="NON" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={sec(31.6)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.14} />
    </Sequence>
    <Sequence from={sec(35.57)} durationInFrames={sec(7.75)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.28} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.04, 2.28, 6.64, 8.84, 10.9, 12.2, 16.36, 17.74, 19.12, 20.02, 20.5, 27.66, 29.64, 36.8, 39.1, 41.17, 48.64, 53.0, 55.0, 56.24, 57.06, 58.94, 59.12].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[21.04, 25.04, 43.96, 46.5, 52.44].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    {[3.02, 23.95, 34.76, 51.72].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    <Sfx src={A("ring.wav")} t={4.38} volume={0.2} len={1.8} />
    <Sfx src={A("ring.wav")} t={31.6} volume={0.22} len={1.8} />
    <Sfx src={A("cash.wav")} t={0.49} volume={0.24} />
    <Sfx src={A("tick.wav")} t={23.95} volume={0.22} len={1.2} />
    <Sfx src={A("ding.wav")} t={27.66} volume={0.2} />
    <Sfx src={A("ding.wav")} t={51.72} volume={0.22} />
  </AbsoluteFill>
);

const Row: React.FC<{ t: number; text: string }> = ({ t, text }) => (
  <Side inline t={t}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
      <Check k={1} size={44} />
      <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34 }}>{text}</span>
    </div>
  </Side>
);

const Line: React.FC<{ t: number; who: string; what: string; color: string }> = ({ t, who, what, color }) => (
  <Side inline t={t}>
    <div style={{ padding: "6px 0" }}>
      <div style={{ fontFamily: TITLE, fontSize: 40, color, lineHeight: 1.1 }}>{who}</div>
      <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 28, color: "#55555a" }}>{what}</div>
    </div>
  </Side>
);
