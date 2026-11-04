import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch } from "../_shared/Footage";
import { BellIcon, ClockIcon, MotoIcon, PhoneIcon, RunIcon } from "../_shared/icons";
import { G, GREEN, IconDot, ListCard, Pill, Quote, Quotes, RED, Sfx, Word, sec } from "../_shared/kit";
import { Beacon, Boue, Comment, Horloge, PostVideo, Shares, Sondage } from "./Graphics";

// Vidéo 004 — « La boue rouge » (enduro, vidéo virale, gendarmes à 17h)
// Rush monté en continu, temps en secondes calés sur la voix off.
export const DURATION_S = 67.9; // la fin CapCut (noir + logo) est coupée
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "004-boue-rouge";
const VIDEO = `${DIR}/rushes/original/travail.mp4`;
const VOICE = `${DIR}/rushes/original/voix.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

const CUTS: Cut[] = [
  { t: 4.78, type: "zoom" },
  { t: 11.42, type: "whip" },
  { t: 15.95, type: "flash" },
  { t: 21.15, type: "whip" },
  { t: 27.18, type: "zoom" },
  { t: 32.42, type: "flash" },
  { t: 35.82, type: "whip" },
  { t: 39.98, type: "zoom" },
  { t: 46.05, type: "whip" },
  { t: 51.98, type: "flash" },
  { t: 56.22, type: "zoom" },
  { t: 59.62, type: "whip" },
  { t: 63.2, type: "zoom" },
];

const PUNCHES: Punch[] = [
  { t: 3.62, s: 1.1 }, // sale affaire
  { t: 9.66, s: 1.12, shake: true }, // les gendarmes
  { t: 15.3, s: 1.1 }, // il payera
  { t: 24.1, s: 1.12, shake: true }, // à toute vitesse
  { t: 26.02, s: 1.1 }, // se jette
  { t: 28.16, s: 1.1 }, // 4000 partages
  { t: 31.7, s: 1.14, shake: true }, // je sais qui c'est
  { t: 34.34, s: 1.1 }, // gendarmerie
  { t: 39.04, s: 1.1 }, // rayure blanche
  { t: 40.84, s: 1.14 }, // c'est lui
  { t: 47.86, s: 1.1 }, // vu au dernier moment
  { t: 53.28, s: 1.16, shake: true }, // boue rouge
  { t: 57.96, s: 1.14, shake: true }, // c'était fini
  { t: 63.7, s: 1.12 }, // 16h10
  { t: 66.8, s: 1.1 }, // c'est fini pour lui
];

const DARK_FROM = 32.4;

const POPS = [0.15, 3.25, 5.24, 7.0, 7.72, 8.6, 11.45, 13.0, 15.05, 18.0, 21.2, 22.8, 24.8, 27.65, 30.1, 35.15, 36.94, 37.72, 38.94, 52.0, 54.1, 54.55, 55.35, 56.3, 58.86, 59.72, 60.4, 61.65, 62.7, 63.85, 65.6, 66.55];
const NOTIFS = [17.6, 31.7, 41.7, 43.85, 44.95, 47.4, 49.1, 50.65];
const IMPACTS = [3.25, 9.66, 24.1, 40.84, 53.28, 57.96, 64.65];

export const Video004: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={PUNCHES} darkFrom={DARK_FROM} />

    <G from={0.1} to={3.15} name="Appel entrant">
      <Pill top={320} tone="white" icon={<IconDot size={72} color={GREEN}><PhoneIcon size={40} /></IconDot>} text="Appel entrant" sub="Un gamin · enduro à nettoyer" />
    </G>
    <G from={3.2} to={4.75} name="Sale affaire">
      <Pill top={320} tone="dark" icon={<Beacon size={56} />} text="Sale affaire avec la police" size={40} />
    </G>
    <G from={5.1} to={8.5} name="Le client">
      <ListCard
        top={300}
        width={560}
        title="LE CLIENT"
        rows={[
          { t: 5.24, text: "19 ans", icon: <IconDot size={60}><RunIcon size={36} /></IconDot> },
          { t: 7.0, text: "Enduro noire", icon: <IconDot size={60}><MotoIcon size={40} /></IconDot> },
          { t: 7.72, text: "Urgent : moins d'1 h", icon: <IconDot size={60}><ClockIcon size={38} /></IconDot> },
        ]}
      />
    </G>
    <G from={8.6} to={11.15} name="17h gendarmes">
      <Pill top={310} tone="white" icon={<IconDot size={68}><ClockIcon size={40} h={5} m={0} /></IconDot>} text="17h00" />
      <Pill top={430} tone="red" enterAt={9.66} icon={<IconDot size={68} color="#0B0B0D"><BellIcon size={40} /></IconDot>} text="Les gendarmes sonnent" sub="déjà chez lui" />
    </G>
    <G from={11.45} to={14.85} name="En courant">
      <Pill top={320} icon={<IconDot size={68}><RunIcon size={42} /></IconDot>} text="Il arrive en courant" sub="encore en tenue, casque à la main" />
    </G>
    <G from={15.05} to={16.3} name="Je paierai">
      <Quotes top={330} width={560}>
        <Quote t={15.05} text="« Je paierai ce qu'il faut. »" size={42} />
      </Quotes>
    </G>
    <G from={17.55} to={27.6} name="Vidéo du groupe"><PostVideo /></G>
    <G from={27.65} to={30.0} name="4 000 partages"><Shares /></G>
    <G from={30.05} to={32.4} name="Je sais qui c'est"><Comment /></G>
    <G from={32.45} to={35.0} name="Appel gendarmerie">
      <Pill top={320} tone="red" icon={<IconDot size={68} color="#0B0B0D"><PhoneIcon size={38} /></IconDot>} text="Appel : Gendarmerie" sub="sur le téléphone de sa mère" />
    </G>
    <G from={35.1} to={40.4} name="Même moto">
      <ListCard
        top={300}
        width={580}
        title="LA VIDÉO VS SA MOTO"
        rows={[
          { t: 36.94, text: "Même couleur", mark: "check" },
          { t: 37.72, text: "Même sac à l'arrière", mark: "check" },
          { t: 38.94, text: "Même rayure blanche", mark: "check" },
        ]}
      />
    </G>
    <G from={40.45} to={41.6} name="C'est lui ?">
      <Word t={40.5} top={360} text="C'EST LUI ?" size={110} color="#fff" />
    </G>
    <G from={41.6} to={46.3} name="Ses excuses">
      <Quotes top={300}>
        <Quote t={41.7} text="« J'y roule depuis mes 14 ans »" />
        <Quote t={43.85} text="« Tout le monde y roule »" />
        <Quote t={44.95} text="« Les promeneurs exagèrent »" />
      </Quotes>
    </G>
    <G from={46.45} to={51.85} name="Les aveux">
      <Quotes top={300}>
        <Quote t={47.4} tone="dark" text="« Je l'ai vue au dernier moment… »" />
        <Quote t={49.1} tone="dark" text="« J'ai eu peur moi aussi »" />
        <Quote t={50.65} tone="red" text="« J'ai pas osé m'arrêter »" />
      </Quotes>
    </G>
    <G from={52.0} to={56.15} name="Boue rouge"><Boue /></G>
    <G from={56.25} to={61.25} name="Les risques">
      <ListCard
        top={300}
        width={580}
        title="SI LES GENDARMES VOIENT ÇA"
        rows={[
          { t: 58.86, text: "Moto saisie", mark: "cross" },
          { t: 59.72, text: "Amende", mark: "cross" },
          { t: 60.4, text: "Permis envolé", mark: "cross" },
        ]}
      />
      <Word t={57.96} top={640} text="C'ÉTAIT FINI" size={84} color={RED} rotate={-3} />
    </G>
    <G from={61.3} to={64.55} name="16h10"><Horloge /></G>
    <G from={64.6} to={DURATION_S} name="À votre avis"><Sondage /></G>

    {/* Son */}
    <Audio src={staticFile(VOICE)} />
    <Sequence from={sec(DARK_FROM)} name="nappe" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.2} />
    </Sequence>
    <Sequence from={sec(46.4)} durationInFrames={sec(18.2)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.4} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.25} />)}
    {POPS.map((t) => <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.32} />)}
    {NOTIFS.map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.3} />)}
    {IMPACTS.map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.38} />)}
    <Sfx src={A("ring.wav")} t={0.2} volume={0.15} len={1.6} />
    <Sfx src={A("ding.wav")} t={9.75} volume={0.3} len={1.8} />
    <Sfx src={A("cash.wav")} t={15.2} volume={0.25} />
    <Sfx src={A("tick.wav")} t={28.1} volume={0.2} len={1} />
    <Sfx src={A("ring.wav")} t={33.8} volume={0.15} len={1.6} />
    <Sfx src={A("splat.wav")} t={53.25} volume={0.6} />
    <Sfx src={A("tick.wav")} t={62.7} volume={0.22} len={1.5} />
  </AbsoluteFill>
);
