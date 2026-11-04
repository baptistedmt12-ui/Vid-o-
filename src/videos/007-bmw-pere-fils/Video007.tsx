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
  { t: 2.9, s: 1.12, shake: true }, // pas lui
  { t: 4.32, s: 1.1 }, // vrai coupable
  { t: 8.4, s: 1.1, shake: true }, // panique
  { t: 14.92, s: 1.1 }, // une bosse
  { t: 17.6, s: 1.08 }, // lundi
  { t: 24.38, s: 1.12 }, // hésite
  { t: 34.1, s: 1.14, shake: true }, // même nom
  { t: 35.68, s: 1.16, shake: true }, // le père
  { t: 38.26, s: 1.1 }, // pilier
  { t: 47.28, s: 1.08 }, // toute ma vie
  { t: 51.22, s: 1.14 }, // plus rien
  { t: 55.62, s: 1.1 }, // bêtise
  { t: 58.24, s: 1.12 }, // je leur dis
];

const T = 300; // haut des graphiques (sous la barre TikTok)

export const Video007: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={32.3} />

    {/* HOOK */}
    <G from={0} to={2.12} name="Il m'a payé">
      <Tag top={T} t={0.05} tone="white" icon={<Dot color={GREEN}><EuroIcon size={36} /></Dot>} text="Il m'a payé" sub="pour effacer cette bosse" />
    </G>
    <G from={2.12} to={4.08} name="Pas lui">
      <Tag top={T} t={2.16} tone="red" icon={<Cross k={1} size={62} />} text="…mais c'est pas lui" sub="qui l'avait faite" />
    </G>
    <G from={4.08} to={6.7} name="Le vrai coupable">
      <Call top={T} t={4.3} caller="Le vrai coupable" sub="2 jours plus tard" />
    </G>

    {/* MISE EN PLACE */}
    <G from={6.7} to={9.05} name="Dimanche, panique">
      <Tag top={T} t={6.76} icon={<Day day="DIM." />} text="Un jeune m'appelle" sub="en panique" />
    </G>
    <G from={9.05} to={12.82} name="BMW du père">
      <Tag top={T} t={9.1} tone="white" icon={<CarRear size={70} />} text="La BMW de son père" />
      <Tag top={T + 100} t={11.7} tone="red" icon={<Dot color="#fff"><HeartIcon size={36} /></Dot>} text="1er rendez-vous" size={32} />
    </G>
    <G from={12.82} to={16.85} name="Bosse feu arrière">
      <Tag top={T} t={12.86} icon={<Dot><PinIcon size={36} /></Dot>} text="En sortant du restaurant…" size={32} />
      <Polaroid src={A("avant.jpg")} t={14.74} top={T + 100} label="AU-DESSUS DU FEU" w={260} h={330} mark={{ x: 0.55, y: 0.62 }} />
    </G>
    <G from={16.85} to={18.2} name="Père rentre lundi">
      <Tag top={T} t={16.9} tone="white" icon={<Day day="LUN." />} text="Son père rentre lundi" />
    </G>

    {/* TENSION */}
    <G from={18.2} to={21.15} name="Diagnostic">
      <Side top={T} t={18.24}>
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
    <G from={21.15} to={24.2} name="T'es sûr ?">
      <Talk top={T}>
        <Say t={21.22} who="MOI" text="« T'es sûr que c'est arrivé au restaurant ? »" />
      </Talk>
    </G>
    <G from={24.2} to={25.45} name="Il hésite">
      <Punch t={24.3} top={T} text="IL HÉSITE…" color="#FFD23F" size={80} />
    </G>
    <G from={25.45} to={28.3} name="Il jure">
      <Talk top={T}>
        <Say t={25.5} who="LUI" side="right" tone="dark" text="« Je te jure ! Garé loin de tout le monde. »" />
      </Talk>
    </G>
    <G from={28.3} to={30.1} name="Réparé 1 h">
      <Tag top={T} t={28.32} tone="green" icon={<Dot color="#fff"><ClockIcon size={38} color={GREEN} h={1} m={0} /></Dot>} text="Réparé en 1 heure" />
    </G>
    <G from={30.1} to={32.25} name="Promis">
      <Tag top={T} t={30.14} icon={<Dot><LockIcon size={34} /></Dot>} text="« Tu dis rien, promis ? »" />
    </G>
    <G from={32.25} to={35.25} name="Mardi soir">
      <Call top={T} t={32.3} caller="Numéro inconnu" sub="Mardi soir" reveal={{ t: 34.1, text: "Même nom de famille" }} />
    </G>

    {/* RÉSOLUTION */}
    <G from={35.25} to={36.25} name="Le père">
      <Punch t={35.3} top={T} text="C'EST LE PÈRE." size={90} />
    </G>
    <G from={36.25} to={44.05} name="Chronologie">
      <Timeline
        top={T}
        title="CE QUI S'EST VRAIMENT PASSÉ"
        steps={[
          { t: 37.66, day: "VEN.", text: "Le père touche le pilier du garage" },
          { t: 39.84, day: "VEN.", text: "Bosse au-dessus du feu arrière", hot: true },
          { t: 41.58, day: "SAM.", text: "Il prête la voiture au fils… sans rien dire" },
        ]}
      />
    </G>
    <G from={44.05} to={48.1} name="Avant qu'il la voie">
      <Talk top={T}>
        <Say t={44.1} who="LE PÈRE" text="« Répare-la avant qu'il la voie… »" />
        <Say t={46.0} side="right" tone="red" text="« …sinon il me le rappelle toute ma vie ! »" size={30} />
      </Talk>
    </G>
    <G from={48.1} to={51.15} name="La main dix fois">
      <Side top={T} t={48.14}>
        <div style={{ ...tone("dark"), borderRadius: 100, padding: "10px 30px 10px 10px", display: "flex", alignItems: "center", gap: 16 }}>
          <Dot>
            <HandIcon size={38} />
          </Dot>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34 }}>Il passe la main dessus</div>
          <Times t0={49.7} t1={50.8} to={10} size={60} />
        </div>
      </Side>
    </G>
    <G from={51.15} to={51.98} name="Plus rien">
      <Punch t={51.22} top={T} text="PLUS RIEN." color="#22C55E" size={90} />
    </G>
    <G from={51.98} to={54.42} name="Toutes seules">
      <Talk top={T}>
        <Say t={52.0} who="MOI" text="« Parfois, les bosses partent toutes seules. »" />
      </Talk>
      <Polaroid src={A("apres.jpg")} t={52.5} top={T + 170} label="APRÈS" w={240} h={300} rotate={4} />
    </G>
    <G from={54.42} to={57.8} name="Bilan">
      <Side top={T} t={54.48}>
        <div style={{ ...tone("white"), borderRadius: 26, padding: "18px 26px", width: 500 }}>
          <Line t={54.66} who="LE FILS" what="a payé la bêtise du père" color="#E10600" />
          <Line t={55.92} who="LE PÈRE" what="croit au miracle" color="#0B0B0D" />
          <Line t={56.86} who="AUCUN DES DEUX" what="ne le sait" color="#22C55E" />
        </div>
      </Side>
    </G>
    <G from={57.8} to={DURATION_S} name="Je leur dis ?">
      <Poll top={T} t={57.86} question="Je leur dis, ou pas ?" a="OUI" b="NON" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={sec(32.3)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.14} />
    </Sequence>
    <Sequence from={sec(36.3)} durationInFrames={sec(8)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.28} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.05, 2.16, 6.76, 9.1, 11.7, 12.86, 16.9, 18.24, 19.72, 20.18, 20.66, 28.32, 30.14, 37.66, 39.84, 41.58, 48.14, 52.5, 54.66, 55.92, 56.86, 58.2, 58.4].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[21.22, 25.5, 44.1, 46.0, 52.0].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    {[2.9, 24.3, 35.3, 51.22].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    <Sfx src={A("ring.wav")} t={4.3} volume={0.2} len={1.8} />
    <Sfx src={A("ring.wav")} t={32.3} volume={0.22} len={1.8} />
    <Sfx src={A("cash.wav")} t={0.5} volume={0.24} />
    <Sfx src={A("tick.wav")} t={24.3} volume={0.22} len={1.2} />
    <Sfx src={A("ding.wav")} t={28.32} volume={0.2} />
    <Sfx src={A("ding.wav")} t={51.22} volume={0.22} />
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
