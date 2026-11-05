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
  { t: 0.8, s: 1.08 }, // payé
  { t: 3.28, s: 1.12, shake: true }, // pas lui
  { t: 4.94, s: 1.1 }, // vrai coupable
  { t: 9.62, s: 1.1, shake: true }, // panique
  { t: 16.06, s: 1.1 }, // une bosse
  { t: 19.24, s: 1.08 }, // lundi
  { t: 26.54, s: 1.12 }, // hésite
  { t: 34.94, s: 1.14, shake: true }, // même nom
  { t: 36.32, s: 1.16, shake: true }, // le père
  { t: 38.4, s: 1.1 }, // pilier
  { t: 46.96, s: 1.08 }, // toute ma vie
  { t: 51.26, s: 1.14 }, // plus rien
  { t: 55.8, s: 1.1 }, // bêtise
  { t: 59.16, s: 1.12 }, // je leur dis
];

const T = 300; // haut des graphiques (sous la barre TikTok)

export const Video007: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={32.64} />

    {/* HOOK */}
    <G from={0.0} to={2.47} name="Il m'a payé">
      <Tag top={T} t={0.07} tone="white" icon={<Dot color={GREEN}><EuroIcon size={36} /></Dot>} text="Il m'a payé" sub="pour effacer cette bosse" />
    </G>
    <G from={2.47} to={4.62} name="Pas lui">
      <Tag top={T} t={2.5} tone="red" icon={<Cross k={1} size={62} />} text="…mais c'est pas lui" sub="qui l'avait faite" />
    </G>
    <G from={4.62} to={7.73} name="Le vrai coupable">
      <Call top={T} t={4.92} caller="Le vrai coupable" sub="2 jours plus tard" />
    </G>

    {/* MISE EN PLACE */}
    <G from={7.73} to={10.29} name="Dimanche, panique">
      <Tag top={T} t={7.82} icon={<Day day="DIM." />} text="Un jeune m'appelle" sub="en panique" />
    </G>
    <G from={10.29} to={14.02} name="BMW du père">
      <Tag top={T} t={10.34} tone="white" icon={<CarRear size={70} />} text="La BMW de son père" />
      <Tag top={T + 100} t={12.62} tone="red" icon={<Dot color="#fff"><HeartIcon size={36} /></Dot>} text="1er rendez-vous" size={32} />
    </G>
    <G from={14.02} to={18.47} name="Bosse feu arrière">
      <Tag top={T} t={14.04} icon={<Dot><PinIcon size={36} /></Dot>} text="En sortant du restaurant…" size={32} />
      <Polaroid src={A("avant.jpg")} t={15.9} top={T + 100} label="AU-DESSUS DU FEU" w={260} h={330} mark={{ x: 0.55, y: 0.62 }} />
    </G>
    <G from={18.47} to={19.86} name="Père rentre lundi">
      <Tag top={T} t={18.52} tone="white" icon={<Day day="LUN." />} text="Son père rentre lundi" />
    </G>

    {/* TENSION */}
    <G from={19.86} to={24.05} name="Diagnostic">
      <Side top={T} t={19.9}>
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
    <G from={24.05} to={26.38} name="T'es sûr ?">
      <Talk top={T}>
        <Say t={24.12} who="MOI" text="« T'es sûr que c'est arrivé au restaurant ? »" />
      </Talk>
    </G>
    <G from={26.38} to={27.62} name="Il hésite">
      <Punch t={26.47} top={T} text="IL HÉSITE…" color="#FFD23F" size={80} />
    </G>
    <G from={27.62} to={28.79} name="Il jure">
      <Talk top={T}>
        <Say t={27.66} who="LUI" side="right" tone="dark" text="« Je te jure ! »" />
      </Talk>
    </G>
    <G from={28.79} to={30.43} name="Réparé 1 h">
      <Tag top={T} t={28.8} tone="green" icon={<Dot color="#fff"><ClockIcon size={38} color={GREEN} h={1} m={0} /></Dot>} text="Réparé en 1 heure" />
    </G>
    <G from={30.43} to={32.63} name="Promis">
      <Tag top={T} t={30.48} icon={<Dot><LockIcon size={34} /></Dot>} text="« Tu dis rien, promis ? »" />
    </G>
    <G from={32.63} to={35.9} name="Mardi soir">
      <Call top={T} t={32.64} caller="Numéro inconnu" sub="Mardi soir" reveal={{ t: 35.72, text: "Même nom de famille" }} />
    </G>

    {/* RÉSOLUTION */}
    <G from={35.9} to={36.64} name="Le père">
      <Punch t={35.94} top={T} text="C'EST LE PÈRE." size={90} />
    </G>
    <G from={36.64} to={42.75} name="Chronologie">
      <Timeline
        top={T}
        title="CE QUI S'EST VRAIMENT PASSÉ"
        steps={[
          { t: 37.88, day: "VEN.", text: "Le père touche le pilier du garage" },
          { t: 39.55, day: "VEN.", text: "Bosse au-dessus du feu arrière", hot: true },
          { t: 40.15, day: "SAM.", text: "Il prête la voiture au fils… sans rien dire" },
        ]}
      />
    </G>
    <G from={42.75} to={47.82} name="Avant qu'il la voie">
      <Talk top={T}>
        <Say t={42.8} who="LE PÈRE" text="« Répare-la avant qu'il la voie… »" />
        <Say t={45.46} side="right" tone="red" text="« …sinon il me le rappelle toute ma vie ! »" size={30} />
      </Talk>
    </G>
    <G from={47.82} to={51.16} name="La main dix fois">
      <Side top={T} t={47.86}>
        <div style={{ ...tone("dark"), borderRadius: 100, padding: "10px 30px 10px 10px", display: "flex", alignItems: "center", gap: 16 }}>
          <Dot>
            <HandIcon size={38} />
          </Dot>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34 }}>Il passe la main dessus</div>
          <Times t0={49.34} t1={50.47} to={10.95} size={60} />
        </div>
      </Side>
    </G>
    <G from={51.16} to={51.86} name="Plus rien">
      <Punch t={51.26} top={T} text="PLUS RIEN." color="#22C55E" size={90} />
    </G>
    <G from={51.86} to={54.75} name="Toutes seules">
      <Talk top={T}>
        <Say t={51.88} who="MOI" text="« Parfois, les bosses partent toutes seules. »" />
      </Talk>
      <Polaroid src={A("apres.jpg")} t={52.44} top={T + 170} label="APRÈS" w={240} h={300} rotate={4} />
    </G>
    <G from={54.75} to={58.14} name="Bilan">
      <Side top={T} t={54.82}>
        <div style={{ ...tone("white"), borderRadius: 26, padding: "18px 26px", width: 500 }}>
          <Line t={54.94} who="LE FILS" what="a payé la bêtise du père" color="#E10600" />
          <Line t={56.1} who="LE PÈRE" what="croit au miracle" color="#0B0B0D" />
          <Line t={57.1} who="AUCUN DES DEUX" what="ne le sait" color="#22C55E" />
        </div>
      </Side>
    </G>
    <G from={58.14} to={DURATION_S} name="Je leur dis ?">
      <Poll top={T} t={58.98} question="Je leur dis, ou pas ?" a="OUI" b="NON" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={sec(32.64)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.14} />
    </Sequence>
    <Sequence from={sec(36.67)} durationInFrames={sec(9.24)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.28} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.07, 2.5, 7.82, 10.34, 12.62, 14.04, 18.52, 19.9, 21.68, 22.9, 23.58, 28.8, 30.48, 37.88, 39.55, 40.15, 47.86, 52.44, 54.94, 56.1, 57.1, 59.13, 59.31].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[24.12, 27.66, 42.8, 45.46, 51.88].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    {[3.28, 26.47, 35.94, 51.26].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    <Sfx src={A("ring.wav")} t={4.92} volume={0.2} len={1.8} />
    <Sfx src={A("ring.wav")} t={32.64} volume={0.22} len={1.8} />
    <Sfx src={A("cash.wav")} t={0.7} volume={0.24} />
    <Sfx src={A("tick.wav")} t={26.47} volume={0.22} len={1.2} />
    <Sfx src={A("ding.wav")} t={28.8} volume={0.2} />
    <Sfx src={A("ding.wav")} t={51.26} volume={0.22} />
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
