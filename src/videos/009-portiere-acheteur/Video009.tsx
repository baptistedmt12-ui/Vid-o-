import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch as Zoom } from "../_shared/Footage";
import { CartIcon, ClockIcon, HandIcon, MagnifierIcon } from "../_shared/icons";
import { BODY, Check, Cross, G, GREEN, Sfx, sec } from "../_shared/kit";
import { Call, Day, Dot, Poll, Polaroid, Punch, Say, Side, Tag, Talk, tone } from "../_shared/story";
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
  { t: 0.94, s: 1.08 }, // cette bosse
  { t: 1.54, s: 1.1 }, // revenu
  { t: 2.94, s: 1.14, shake: true }, // acheter la voiture
  { t: 11.4, s: 1.1, shake: true }, // coup de portière
  { t: 20.36, s: 1.1 }, // pile à hauteur de main
  { t: 26.02, s: 1.1 }, // trois fois
  { t: 29.44, s: 1.12 }, // portière conducteur
  { t: 32.28, s: 1.14, shake: true }, // la portière conducteur
  { t: 44.34, s: 1.12 }, // une bosse ici
  { t: 47.22, s: 1.14, shake: true }, // tout rouge
  { t: 50.3, s: 1.16, shake: true }, // c'était lui
  { t: 55.62, s: 1.12 }, // réparation
];

const T = 300;

export const Video009: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={24.1} />

    {/* HOOK */}
    <G from={0} to={2.82} name="Il est revenu">
      <Tag top={T} t={0.05} tone="white" icon={<Dot><HandIcon size={34} /></Dot>} text="Celui qui a fait cette bosse" />
      <Tag top={T + 96} t={1.54} icon={<Dot color="#1d2a4a"><ClockIcon size={38} h={10} m={10} /></Dot>} text="est revenu" sub="un mois plus tard" size={34} />
    </G>
    <G from={2.82} to={4.0} name="Pour acheter">
      <Punch t={2.86} top={T} text="POUR ACHETER LA VOITURE." color="#FFD23F" size={60} />
    </G>

    {/* MISE EN PLACE */}
    <G from={4.0} to={5.95} name="Vendredi soir">
      <Call top={T} t={4.06} caller="Un client" sub="Vendredi soir" />
    </G>
    <G from={5.95} to={8.05} name="Annonce">
      <Annonce top={T} t={6.0} />
    </G>
    <G from={8.05} to={13.8} name="Parking">
      <Tag top={T} t={8.08} icon={<Dot><CartIcon size={34} /></Dot>} text="Il y a 1 mois, au supermarché" size={30} />
      <Parking top={T + 96} t={9.0} tHit={11.4} label="Un coup de portière" />
    </G>
    <G from={13.8} to={15.45} name="Pas de mot">
      <Side top={T} t={13.86}>
        <div style={{ ...tone("dark"), borderRadius: 26, padding: "14px 26px", width: 420 }}>
          <Line t={13.86} icon={<Cross k={1} size={42} />} text="Pas de mot" />
          <Line t={14.4} icon={<Cross k={1} size={42} />} text="Pas de numéro" />
          <Line t={14.98} icon={<Cross k={1} size={42} />} text="Rien" />
        </div>
      </Side>
    </G>
    <G from={15.45} to={17.75} name="Parfaite">
      <Tag top={T} t={15.5} tone="green" icon={<Check k={1} size={58} />} text="Portière parfaite" sub="avant la vente" />
    </G>

    {/* TENSION */}
    <G from={17.75} to={21.55} name="Diagnostic">
      <Tag top={T} t={17.8} icon={<Dot><MagnifierIcon size={34} /></Dot>} text="Ronde, profonde" />
      <Polaroid src={A("avant.jpg")} t={19.16} top={T + 100} label="À HAUTEUR DE MAIN" w={260} h={330} mark={{ x: 0.55, y: 0.6 }} />
    </G>
    <G from={21.55} to={24.05} name="Méthode">
      <Side top={T} t={21.6}>
        <div style={{ ...tone("white"), borderRadius: 26, padding: "14px 26px", width: 420 }}>
          <Line t={21.62} icon={<Num n={1} />} text="Je colle" dark />
          <Line t={22.6} icon={<Num n={2} />} text="Je tire" dark />
          <Line t={23.08} icon={<Num n={3} />} text="Je reprends au marteau" dark />
        </div>
      </Side>
    </G>
    <G from={24.05} to={26.8} name="3 appels">
      <Call top={T} t={24.1} caller="L'acheteur" sub="Appel n° 1… 2… 3" reveal={{ t: 26.02, text: "3 appels manqués" }} />
    </G>
    <G from={26.8} to={32.95} name="Même question">
      <Talk top={T}>
        <Say t={27.72} who="L'ACHETEUR" text="« Est-ce que la portière conducteur a des bosses ? »" />
      </Talk>
      <Punch t={30.98} top={T + 190} text="PAS LA VOITURE." size={60} />
      <Punch t={31.84} top={T + 266} text="LA PORTIÈRE CONDUCTEUR." color="#FFD23F" size={56} />
    </G>
    <G from={32.95} to={35.2} name="Bizarre">
      <Tag top={T} t={33.2} icon={<Dot color="#FFD23F"><span style={{ fontFamily: "Anton, Impact, sans-serif", fontSize: 40, color: "#0B0B0D" }}>?</span></Dot>} text="Bizarre… moi aussi" />
    </G>

    {/* RÉSOLUTION */}
    <G from={35.2} to={37.38} name="Samedi midi">
      <Tag top={T} t={35.28} tone="white" icon={<Day day="SAM." />} text="Samedi midi" sub="il me rappelle en rigolant" />
    </G>
    <G from={37.38} to={45.05} name="Bosse ici">
      <Tag top={T} t={37.42} icon={<Dot><HandIcon size={34} /></Dot>} text="Droit vers la portière" size={32} />
      <Talk top={T + 100}>
        <Say t={42.46} who="L'ACHETEUR" text="« Bizarre… j'étais sûr qu'il y avait une bosse ici. »" />
      </Talk>
    </G>
    <G from={45.05} to={46.65} name="Pourquoi ?">
      <Talk top={T}>
        <Say t={45.1} who="MON CLIENT" side="right" tone="dark" text="« Ah bon ? Pourquoi ? »" />
      </Talk>
    </G>
    <G from={46.65} to={48.0} name="Tout rouge">
      <Punch t={46.7} top={T} text="IL DEVIENT TOUT ROUGE." color="#E10600" size={62} />
    </G>
    <G from={48.0} to={52.85} name="C'était lui">
      <Parking top={T} t={48.02} tHit={50.25} label="Le supermarché… c'était lui" />
      <Tag top={T + 330} t={50.88} tone="white" icon={<Dot><MagnifierIcon size={34} /></Dot>} text="Reconnue sur l'annonce" size={30} />
    </G>
    <G from={52.85} to={56.68} name="Réparation payée">
      <Tag top={T} t={52.9} tone="green" icon={<Check k={1} size={58} />} text="Voiture vendue" />
      <Facture top={T + 110} t={54.76} tPaid={55.62} />
    </G>
    <G from={56.68} to={DURATION_S} name="Un mot ?">
      <Poll top={T} t={56.72} question="Tu touches une voiture : tu laisses un mot ?" a="OUI" b="NON" />
    </G>

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={sec(24.1)} durationInFrames={sec(11)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.14} />
    </Sequence>
    <Sequence from={sec(42.4)} durationInFrames={sec(6)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.3} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.05, 1.54, 6.0, 8.08, 13.86, 14.4, 14.98, 17.8, 19.16, 21.62, 22.6, 23.08, 33.2, 35.28, 37.42, 50.88, 52.9, 56.9, 57.1].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[2.86, 11.4, 31.84, 46.7, 50.25].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    {[27.72, 42.46, 45.1].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    <Sfx src={A("ring.wav")} t={4.06} volume={0.2} len={1.6} />
    <Sfx src={A("ring.wav")} t={24.1} volume={0.2} len={1.8} />
    <Sfx src={A("ding.wav")} t={15.5} volume={0.2} />
    <Sfx src={A("cash.wav")} t={55.6} volume={0.28} />
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

