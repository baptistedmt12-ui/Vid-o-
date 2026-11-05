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
  { t: 0.62, s: 1.08 }, // payé
  { t: 2.68, s: 1.12, shake: true }, // pas lui
  { t: 4.18, s: 1.1 }, // vrai coupable
  { t: 7.92, s: 1.1, shake: true }, // panique
  { t: 13.56, s: 1.1 }, // une bosse
  { t: 16.3, s: 1.08 }, // lundi
  { t: 23.3, s: 1.12 }, // hésite
  { t: 33.34, s: 1.14, shake: true }, // même nom
  { t: 34.7, s: 1.16, shake: true }, // le père
  { t: 37.1, s: 1.1 }, // pilier
  { t: 47.26, s: 1.08 }, // toute ma vie
  { t: 51.3, s: 1.14 }, // plus rien
  { t: 56.02, s: 1.1 }, // bêtise
  { t: 59.22, s: 1.12 }, // je leur dis
];

const T = 300; // haut des graphiques (sous la barre TikTok)

export const Video007: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={31.38} />

    {/* HOOK */}
    <G from={0.0} to={2.07} name="Il m'a payé">
      <Tag top={T} t={0.05} tone="white" icon={<Dot color={GREEN}><EuroIcon size={36} /></Dot>} text="Il m'a payé" sub="pour effacer cette bosse" />
    </G>
    <G from={2.07} to={3.9} name="Pas lui">
      <Tag top={T} t={2.1} tone="red" icon={<Cross k={1} size={62} />} text="…mais c'est pas lui" sub="qui l'avait faite" />
    </G>
    <G from={3.9} to={6.31} name="Le vrai coupable">
      <Call top={T} t={4.16} caller="Le vrai coupable" sub="2 jours plus tard" />
    </G>

    {/* MISE EN PLACE */}
    <G from={6.31} to={8.46} name="Dimanche, panique">
      <Tag top={T} t={6.36} icon={<Day day="DIM." />} text="Un jeune m'appelle" sub="en panique" />
    </G>
    <G from={8.46} to={11.6} name="BMW du père">
      <Tag top={T} t={8.5} tone="white" icon={<CarRear size={70} />} text="La BMW de son père" />
      <Tag top={T + 100} t={10.5} tone="red" icon={<Dot color="#fff"><HeartIcon size={36} /></Dot>} text="1er rendez-vous" size={32} />
    </G>
    <G from={11.6} to={15.6} name="Bosse feu arrière">
      <Tag top={T} t={11.64} icon={<Dot><PinIcon size={36} /></Dot>} text="En sortant du restaurant…" size={32} />
      <Polaroid src={A("avant.jpg")} t={13.4} top={T + 100} label="AU-DESSUS DU FEU" w={260} h={330} mark={{ x: 0.55, y: 0.62 }} />
    </G>
    <G from={15.6} to={16.92} name="Père rentre lundi">
      <Tag top={T} t={15.64} tone="white" icon={<Day day="LUN." />} text="Son père rentre lundi" />
    </G>

    {/* TENSION */}
    <G from={16.92} to={20.45} name="Diagnostic">
      <Side top={T} t={16.96}>
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
    <G from={20.45} to={23.12} name="T'es sûr ?">
      <Talk top={T}>
        <Say t={20.52} who="MOI" text="« T'es sûr que c'est arrivé au restaurant ? »" />
      </Talk>
    </G>
    <G from={23.12} to={24.36} name="Il hésite">
      <Punch t={23.22} top={T} text="IL HÉSITE…" color="#FFD23F" size={80} />
    </G>
    <G from={24.36} to={27.33} name="Il jure">
      <Talk top={T}>
        <Say t={24.4} who="LUI" side="right" tone="dark" text="« Je te jure ! Garé loin de tout le monde. »" />
      </Talk>
    </G>
    <G from={27.33} to={28.62} name="Réparé 1 h">
      <Tag top={T} t={27.38} tone="green" icon={<Dot color="#fff"><ClockIcon size={38} color={GREEN} h={1} m={0} /></Dot>} text="Réparé en 1 heure" />
    </G>
    <G from={28.62} to={31.32} name="Promis">
      <Tag top={T} t={28.64} icon={<Dot><LockIcon size={34} /></Dot>} text="« Tu dis rien, promis ? »" />
    </G>
    <G from={31.32} to={34.3} name="Mardi soir">
      <Call top={T} t={31.38} caller="Numéro inconnu" sub="Mardi soir" reveal={{ t: 32.71, text: "Même nom de famille" }} />
    </G>

    {/* RÉSOLUTION */}
    <G from={34.3} to={35.14} name="Le père">
      <Punch t={34.34} top={T} text="C'EST LE PÈRE." size={90} />
    </G>
    <G from={35.14} to={43.42} name="Chronologie">
      <Timeline
        top={T}
        title="CE QUI S'EST VRAIMENT PASSÉ"
        steps={[
          { t: 36.6, day: "VEN.", text: "Le père touche le pilier du garage" },
          { t: 38.9, day: "VEN.", text: "Bosse au-dessus du feu arrière", hot: true },
          { t: 40.9, day: "SAM.", text: "Il prête la voiture au fils… sans rien dire" },
        ]}
      />
    </G>
    <G from={43.42} to={48.04} name="Avant qu'il la voie">
      <Talk top={T}>
        <Say t={43.46} who="LE PÈRE" text="« Répare-la avant qu'il la voie… »" />
        <Say t={45.96} side="right" tone="red" text="« …sinon il me le rappelle toute ma vie ! »" size={30} />
      </Talk>
    </G>
    <G from={48.04} to={51.17} name="La main dix fois">
      <Side top={T} t={48.08}>
        <div style={{ ...tone("dark"), borderRadius: 100, padding: "10px 30px 10px 10px", display: "flex", alignItems: "center", gap: 16 }}>
          <Dot>
            <HandIcon size={38} />
          </Dot>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34 }}>Il passe la main dessus</div>
          <Times t0={49.5} t1={50.51} to={9.17} size={60} />
        </div>
      </Side>
    </G>
    <G from={51.17} to={51.86} name="Plus rien">
      <Punch t={51.3} top={T} text="PLUS RIEN." color="#22C55E" size={90} />
    </G>
    <G from={51.86} to={55.03} name="Toutes seules">
      <Talk top={T}>
        <Say t={51.88} who="MOI" text="« Parfois, les bosses partent toutes seules. »" />
      </Talk>
      <Polaroid src={A("apres.jpg")} t={52.48} top={T + 170} label="APRÈS" w={240} h={300} rotate={4} />
    </G>
    <G from={55.03} to={58.18} name="Bilan">
      <Side top={T} t={55.1}>
        <div style={{ ...tone("white"), borderRadius: 26, padding: "18px 26px", width: 500 }}>
          <Line t={55.24} who="LE FILS" what="a payé la bêtise du père" color="#E10600" />
          <Line t={56.34} who="LE PÈRE" what="croit au miracle" color="#0B0B0D" />
          <Line t={57.2} who="AUCUN DES DEUX" what="ne le sait" color="#22C55E" />
        </div>
      </Side>
    </G>
    <G from={58.18} to={DURATION_S} name="Je leur dis ?">
      <Poll top={T} t={59.08} question="Je leur dis, ou pas ?" a="OUI" b="NON" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={sec(31.38)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.14} />
    </Sequence>
    <Sequence from={sec(35.18)} durationInFrames={sec(7.52)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.28} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.05, 2.1, 6.36, 8.5, 10.5, 11.64, 15.64, 16.96, 18.3, 19.36, 19.98, 27.38, 28.64, 36.6, 38.9, 40.9, 48.08, 52.48, 55.24, 56.34, 57.2, 59.2, 59.34].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[20.52, 24.4, 43.46, 45.96, 51.88].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    {[2.68, 23.22, 34.34, 51.3].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    <Sfx src={A("ring.wav")} t={4.16} volume={0.2} len={1.8} />
    <Sfx src={A("ring.wav")} t={31.38} volume={0.22} len={1.8} />
    <Sfx src={A("cash.wav")} t={0.54} volume={0.24} />
    <Sfx src={A("tick.wav")} t={23.22} volume={0.22} len={1.2} />
    <Sfx src={A("ding.wav")} t={27.38} volume={0.2} />
    <Sfx src={A("ding.wav")} t={51.3} volume={0.22} />
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
