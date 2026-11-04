import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch } from "../_shared/Footage";
import { EyeOffIcon, MagnifierIcon, MotoIcon, PinIcon, WarnIcon } from "../_shared/icons";
import { G, IconDot, Pill, Quote, Quotes, Sfx, Word, sec } from "../_shared/kit";
import { Cal, Calcul, Compteur, Contrat, Facture, LouerAcheter, Money, Rayure, Total } from "./Graphics";

// Vidéo 005 — « Le compteur » (moto en location longue durée à rendre lundi)
// Rush monté en continu, temps en secondes calés sur la voix off.
export const DURATION_S = 66.25;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "005-compteur-location";
const VIDEO = `${DIR}/rushes/original/travail.mp4`;
const VOICE = `${DIR}/rushes/original/voix.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

const CUTS: Cut[] = [
  { t: 5.52, type: "zoom" },
  { t: 9.65, type: "whip" },
  { t: 14.08, type: "flash" },
  { t: 18.55, type: "whip" },
  { t: 22.88, type: "zoom" },
  { t: 28.35, type: "whip" },
  { t: 32.55, type: "flash" },
  { t: 37.05, type: "whip" },
  { t: 41.85, type: "zoom" },
  { t: 46.35, type: "whip" },
  { t: 48.98, type: "flash" },
  { t: 53.18, type: "zoom" },
];

const PUNCHES: Punch[] = [
  { t: 4.44, s: 1.12, shake: true }, // pas tout dit
  { t: 9.08, s: 1.1 }, // 300 €
  { t: 10.38, s: 1.12, shake: true }, // cacher
  { t: 14.14, s: 1.1 }, // 189 €
  { t: 17.22, s: 1.1 }, // meilleure décision
  { t: 21.42, s: 1.1 }, // tout inspecter
  { t: 24.24, s: 1.12, shake: true }, // facturé
  { t: 26.76, s: 1.12 }, // 10 cm
  { t: 29.68, s: 1.1 }, // autocollant
  { t: 38.1, s: 1.1 }, // ça reste une rayure
  { t: 41.58, s: 1.16, shake: true }, // 31 000 km
  { t: 46.12, s: 1.1 }, // 10 000 par an
  { t: 50.56, s: 1.12 }, // km en trop
  { t: 53.72, s: 1.1 }, // mille
  { t: 56.76, s: 1.16, shake: true }, // 2 000 €
  { t: 59.76, s: 1.12 }, // même pas
  { t: 63.46, s: 1.16, shake: true }, // le compteur
  { t: 65.0, s: 1.1 }, // louer
];

const DARK_FROM = 40.5;

const POPS = [0.25, 2.35, 3.6, 5.55, 9.75, 13.5, 14.14, 15.84, 18.4, 20.75, 22.7, 23.34, 24.85, 26.7, 27.7, 30.95, 38.45, 42.15, 46.95, 47.55, 50.5, 51.8, 55.2, 57.5, 60.2, 64.95, 65.55, 65.9];
const NOTIFS = [17.2, 33.3, 34.5, 36.2, 62.2];
const IMPACTS = [4.44, 10.38, 24.2, 41.95, 56.6, 59.25, 63.46];

export const Video005: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={PUNCHES} darkFrom={DARK_FROM} />

    <G from={0.2} to={2.3} name="Direction l'atelier">
      <Pill top={320} tone="white" icon={<IconDot size={68}><PinIcon size={40} /></IconDot>} text="Direction l'atelier" />
    </G>
    <G from={2.35} to={3.55} name="À rendre lundi">
      <Pill top={320} tone="white" icon={<Cal size={66} />} text="À rendre lundi" />
    </G>
    <G from={3.6} to={5.45} name="Pas tout dit">
      <Pill top={320} tone="dark" icon={<IconDot size={68}><EyeOffIcon size={40} /></IconDot>} text="Il m'a pas tout dit…" />
    </G>
    <G from={5.55} to={8.45} name="Concessionnaire">
      <Pill top={320} tone="white" icon={<Cal size={66} />} text="Retour au concessionnaire" sub="lundi · fin de la location" size={38} />
    </G>
    <G from={8.5} to={10.3} name="300 €"><Money /></G>
    <G from={10.3} to={11.65} name="Cacher quelque chose">
      <Word t={10.35} top={340} text="CACHER QUOI ?" size={100} color="#fff" />
    </G>
    <G from={11.7} to={18.3} name="Contrat LLD"><Contrat /></G>
    <G from={18.35} to={20.7} name="Roulé comme jamais">
      <Pill top={320} icon={<IconDot size={68}><MotoIcon size={44} /></IconDot>} text="Il a roulé comme jamais" />
    </G>
    <G from={20.75} to={22.45} name="Inspection">
      <Pill top={320} tone="white" icon={<IconDot size={68}><MagnifierIcon size={40} /></IconDot>} text="Le concessionnaire inspecte tout" size={38} />
    </G>
    <G from={22.5} to={24.8} name="Facturé"><Facture /></G>
    <G from={24.85} to={32.9} name="Rayure 10 cm"><Rayure /></G>
    <G from={33.0} to={38.35} name="Faire disparaître ?">
      <Quotes top={300}>
        <Quote t={33.3} text="« Tu peux la faire disparaître ? »" />
        <Quote t={34.5} side="right" tone="dark" text="« Je peux nettoyer, faire briller… »" />
        <Quote t={36.2} side="right" tone="red" text="« …mais une rayure reste une rayure. »" />
      </Quotes>
    </G>
    <G from={38.4} to={42.05} name="31 000 km"><Compteur /></G>
    <G from={42.15} to={45.75} name="Km autorisés ?">
      <Pill top={320} icon={<IconDot size={68}><MagnifierIcon size={40} /></IconDot>} text="Kilométrage autorisé ?" />
    </G>
    <G from={45.75} to={46.65} name="10 000 / an">
      <Pill top={320} tone="white" icon={<Cal size={66} day="AN" />} text="10 000 km / an" size={48} />
    </G>
    <G from={46.7} to={55.1} name="Le calcul"><Calcul /></G>
    <G from={55.15} to={60.1} name="Plus de 2 000 €"><Total /></G>
    <G from={60.15} to={63.8} name="Le compteur ?">
      <Quotes top={300}>
        <Quote t={62.2} text="« Tu connais quelqu'un pour le compteur ? »" />
      </Quotes>
      <Pill top={470} tone="red" enterAt={63.4} icon={<IconDot size={60} color="#0B0B0D"><WarnIcon size={36} /></IconDot>} text="Trafiquer un compteur = illégal" size={36} />
    </G>
    <G from={63.85} to={DURATION_S} name="Louer ou acheter"><LouerAcheter /></G>

    {/* Son */}
    <Audio src={staticFile(VOICE)} />
    <Sequence from={sec(DARK_FROM)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.18} />
    </Sequence>
    <Sequence from={sec(42)} durationInFrames={sec(18)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.35} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.25} />)}
    {POPS.map((t) => <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.32} />)}
    {NOTIFS.map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.3} />)}
    {IMPACTS.map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.38} />)}
    <Sfx src={A("cash.wav")} t={9.0} volume={0.3} />
    <Sfx src={A("cash.wav")} t={14.1} volume={0.2} />
    <Sfx src={A("tear.wav")} t={26.25} volume={0.35} />
    <Sfx src={A("splat.wav")} t={29.65} volume={0.3} />
    <Sfx src={A("tick.wav")} t={40.55} volume={0.25} len={1.5} />
    <Sfx src={A("cash.wav")} t={56.6} volume={0.3} />
  </AbsoluteFill>
);

