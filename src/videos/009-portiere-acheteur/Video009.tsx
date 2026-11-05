import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch as Zoom } from "../_shared/Footage";
import { CartIcon, ClockIcon, HandIcon, MagnifierIcon } from "../_shared/icons";
import { BODY, Check, Cross, G, GREEN, Sfx, sec } from "../_shared/kit";
import { CAPTIONS } from "./captions";
import { Captions, Call, Day, Dot, Poll, Polaroid, Punch, Say, Side, Tag, Talk, tone } from "../_shared/story";
import { Annonce, Facture, Parking } from "./Graphics";

// Vidéo 009 — « Le coup de portière » (voiture bordeaux, bosse au-dessus de la poignée).
// Rush remodelé (scripts/remodel.py) : 61,0 s, voix off de synthèse qui démarre à 0.
export const DURATION_S = 61.0;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "009-portiere-acheteur";
const VIDEO = `${DIR}/rushes/original/travail.mp4`;
const AMBIANCE = `${DIR}/rushes/original/ambiance.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

const CUTS: Cut[] = [
  { t: 2.87, type: "flash" },
  { t: 6.77, type: "whip" },
  { t: 11.6, type: "zoom" },
  { t: 16.0, type: "whip" },
  { t: 19.68, type: "zoom" },
  { t: 23.55, type: "flash" },
  { t: 24.71, type: "whip" },
  { t: 32.11, type: "zoom" },
  { t: 35.81, type: "whip" },
  { t: 39.65, type: "flash" },
  { t: 41.55, type: "zoom" },
  { t: 43.55, type: "whip" },
  { t: 45.88, type: "zoom" },
  { t: 53.61, type: "whip" },
  { t: 56.31, type: "flash" },
];

const ZOOMS: Zoom[] = [
  { t: 1.0, s: 1.08 }, // cette bosse
  { t: 1.46, s: 1.1 }, // revenu
  { t: 2.72, s: 1.14, shake: true }, // acheter la voiture
  { t: 11.54, s: 1.1, shake: true }, // coup de portière
  { t: 21.46, s: 1.1 }, // pile à hauteur de main
  { t: 26.96, s: 1.1 }, // trois fois
  { t: 30.86, s: 1.12 }, // portière conducteur
  { t: 33.24, s: 1.14, shake: true }, // la portière conducteur
  { t: 45.52, s: 1.12 }, // une bosse ici
  { t: 48.38, s: 1.14, shake: true }, // tout rouge
  { t: 51.72, s: 1.16, shake: true }, // c'était lui
  { t: 56.52, s: 1.12 }, // réparation
];

const T = 300;

export const Video009: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={25.34} />

    {/* HOOK */}
    <G from={0.0} to={2.5} name="Il est revenu">
      <Tag top={T} t={0.08} tone="white" icon={<Dot><HandIcon size={34} /></Dot>} text="Celui qui a fait cette bosse" />
      <Tag top={T + 96} t={1.46} icon={<Dot color="#1d2a4a"><ClockIcon size={38} h={10} m={10} /></Dot>} text="est revenu" sub="un mois plus tard" size={34} />
    </G>
    <G from={2.5} to={3.48} name="Pour acheter">
      <Punch t={2.52} top={T} text="POUR ACHETER LA VOITURE." color="#FFD23F" size={60} />
    </G>

    {/* MISE EN PLACE */}
    <G from={3.48} to={5.5} name="Vendredi soir">
      <Call top={T} t={3.52} caller="Un client" sub="Vendredi soir" />
    </G>
    <G from={5.5} to={8.22} name="Annonce">
      <Annonce top={T} t={5.52} />
    </G>
    <G from={8.22} to={13.89} name="Parking">
      <Tag top={T} t={8.24} icon={<Dot><CartIcon size={34} /></Dot>} text="Il y a 1 mois, au supermarché" size={30} />
      <Parking top={T + 96} t={9.26} tHit={11.54} label="Un coup de portière" />
    </G>
    <G from={13.89} to={15.69} name="Pas de mot">
      <Side top={T} t={13.97}>
        <div style={{ ...tone("dark"), borderRadius: 26, padding: "14px 26px", width: 420 }}>
          <Line t={13.97} icon={<Cross k={1} size={42} />} text="Pas de message" />
          <Line t={14.82} icon={<Cross k={1} size={42} />} text="Pas de numéro" />
        </div>
      </Side>
    </G>
    <G from={15.69} to={17.97} name="Parfaite">
      <Tag top={T} t={15.72} tone="green" icon={<Check k={1} size={58} />} text="Portière parfaite" sub="avant la vente" />
    </G>

    {/* TENSION */}
    <G from={17.97} to={22.56} name="Diagnostic">
      <Tag top={T} t={18.0} icon={<Dot><MagnifierIcon size={34} /></Dot>} text="Ronde, profonde" />
      <Polaroid src={A("avant.jpg")} t={19.82} top={T + 100} label="À HAUTEUR DE MAIN" w={260} h={330} mark={{ x: 0.55, y: 0.6 }} />
    </G>
    <G from={22.56} to={25.29} name="Méthode">
      <Side top={T} t={22.6}>
        <div style={{ ...tone("white"), borderRadius: 26, padding: "14px 26px", width: 420 }}>
          <Line t={22.62} icon={<Num n={1} />} text="Je colle" dark />
          <Line t={23.6} icon={<Num n={2} />} text="Je tire" dark />
          <Line t={24.34} icon={<Num n={3} />} text="Je reprends au marteau" dark />
        </div>
      </Side>
    </G>
    <G from={25.29} to={27.82} name="3 appels">
      <Call top={T} t={25.34} caller="L'acheteur" sub="Appel n° 1… 2… 3" reveal={{ t: 28.08, text: "3 appels manqués" }} />
    </G>
    <G from={27.82} to={33.76} name="Même question">
      <Talk top={T}>
        <Say t={29.06} who="L'ACHETEUR" text="« Est-ce que la portière conducteur a des bosses ? »" />
      </Talk>
      <Punch t={32.04} top={T + 190} text="PAS LA VOITURE." size={60} />
      <Punch t={32.82} top={T + 266} text="LA PORTIÈRE CONDUCTEUR." color="#FFD23F" size={56} />
    </G>
    <G from={33.76} to={35.97} name="Bizarre">
      <Tag top={T} t={33.96} icon={<Dot color="#FFD23F"><span style={{ fontFamily: "Anton, Impact, sans-serif", fontSize: 40, color: "#0B0B0D" }}>?</span></Dot>} text="Louche… moi aussi" />
    </G>

    {/* RÉSOLUTION */}
    <G from={35.97} to={38.52} name="Samedi midi">
      <Tag top={T} t={36.06} tone="white" icon={<Day day="SAM." />} text="Samedi midi" sub="il me rappelle en rigolant" />
    </G>
    <G from={38.52} to={46.29} name="Bosse ici">
      <Tag top={T} t={38.56} icon={<Dot><HandIcon size={34} /></Dot>} text="Droit vers la portière" size={32} />
      <Talk top={T + 100}>
        <Say t={43.5} who="L'ACHETEUR" text="« Bizarre… j'étais sûr qu'il y avait une bosse ici. »" />
      </Talk>
    </G>
    <G from={46.29} to={47.82} name="Pourquoi ?">
      <Talk top={T}>
        <Say t={46.34} who="MON CLIENT" side="right" tone="dark" text="« Ah bon ? Pourquoi ? »" />
      </Talk>
    </G>
    <G from={47.82} to={49.08} name="Tout rouge">
      <Punch t={47.86} top={T} text="IL DEVIENT TOUT ROUGE." color="#E10600" size={62} />
    </G>
    <G from={49.08} to={54.0} name="C'était lui">
      <Parking top={T} t={49.1} tHit={51.67} label="Le supermarché… c'était lui" />
      <Tag top={T + 330} t={52.28} tone="white" icon={<Dot><MagnifierIcon size={34} /></Dot>} text="Reconnue sur l'annonce" size={30} />
    </G>
    <G from={54.0} to={57.38} name="Réparation payée">
      <Tag top={T} t={54.04} tone="green" icon={<Check k={1} size={58} />} text="Voiture vendue" />
      <Facture top={T + 110} t={55.72} tPaid={56.52} />
    </G>
    <G from={57.38} to={DURATION_S} name="Un mot ?">
      <Poll top={T} t={57.42} question="Tu touches une voiture : tu laisses un mot ?" a="OUI" b="NON" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={sec(25.34)} durationInFrames={sec(11.1)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.14} />
    </Sequence>
    <Sequence from={sec(43.4)} durationInFrames={sec(5.52)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.3} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.08, 1.46, 5.52, 8.24, 13.97, 14.82, 15.36, 18.0, 19.82, 22.62, 23.6, 24.34, 33.96, 36.06, 38.56, 52.28, 54.04, 57.64, 57.88].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[2.52, 11.54, 32.82, 47.86, 51.67].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    {[29.06, 43.5, 46.34].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    <Sfx src={A("ring.wav")} t={3.52} volume={0.2} len={1.6} />
    <Sfx src={A("ring.wav")} t={25.34} volume={0.2} len={1.8} />
    <Sfx src={A("ding.wav")} t={15.72} volume={0.2} />
    <Sfx src={A("cash.wav")} t={56.5} volume={0.28} />
  </AbsoluteFill>
);

const Num: React.FC<{ n: number }> = ({ n }) => (
  <div style={{ width: 44, height: 44, borderRadius: 44, background: GREEN, color: "#fff", fontFamily: "Anton, Impact, sans-serif", fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</div>
);

const Line: React.FC<{ t: number; icon: React.ReactNode; text: string; dark?: boolean }> = ({ t, icon, text, dark }) => (
  <Side inline t={t}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "6px 0" }}>
      {icon}
      <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 32, color: dark ? "#0B0B0D" : "#fff" }}>{text}</span>
    </div>
  </Side>
);

