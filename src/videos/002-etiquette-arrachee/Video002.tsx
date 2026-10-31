import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage } from "./Footage";
import {
  Affaire,
  Appel,
  Brille,
  Conversation,
  Etiquette,
  Inspection,
  Liquide,
  Listing,
  Minutes,
  Perdus,
  Police,
  Samedi,
  Seller,
  SerialPlate,
  Valeur,
} from "./Graphics";
import { G } from "./kit";
import { A, CUTS, DARK_FROM, VOICE, sec } from "./timeline";

/** Effet sonore placé à la seconde t du rush. */
const Sfx: React.FC<{ t: number; file: string; volume?: number; len?: number }> = ({ t, file, volume = 0.5, len = 1 }) => (
  <Sequence from={Math.max(0, sec(t))} durationInFrames={sec(len)} name={`sfx ${file}`} layout="none">
    <Audio src={staticFile(A(file))} volume={volume} />
  </Sequence>
);

const POPS = [0.0, 3.3, 9.25, 10.45, 11.8, 13.6, 15.1, 16.1, 17.25, 18.15, 18.95, 20.3, 27.7, 30.6, 31.15, 32.1, 37.35, 39.15, 45.3, 46.45, 46.95, 47.45, 50.9, 55.8, 58.75];
const IMPACTS = [1.5, 8.3, 22.4, 35.44, 40.74, 48.38, 53.8, 55.95, 59.3];

export const Video002: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage />

    {/* Graphiques calés sur la voix off */}
    <G from={0} to={6.95} name="Annonce 4 000 €"><Listing /></G>
    <G from={7.9} to={9.3} name="L'affaire de sa vie"><Affaire /></G>
    <G from={9.2} to={12.75} name="Le vendeur"><Seller /></G>
    <G from={13.55} to={15.05} name="Qu'elle brille"><Brille /></G>
    <G from={15.1} to={16.3} name="Samedi"><Samedi /></G>
    <G from={16.05} to={20.0} name="Inspection"><Inspection /></G>
    <G from={20.0} to={24.1} name="Double du prix"><Valeur /></G>
    <G from={27.6} to={36.95} name="Numéro de série limé"><SerialPlate /></G>
    <G from={37.05} to={41.5} name="Étiquette arrachée"><Etiquette /></G>
    <G from={41.5} to={43.7} name="Appel"><Appel /></G>
    <G from={45.2} to={49.6} name="Compte supprimé"><Conversation /></G>
    <G from={50.85} to={52.6} name="Deux minutes"><Minutes /></G>
    <G from={53.6} to={55.75} name="Volée / police"><Police /></G>
    <G from={55.75} to={56.95} name="4 000 € perdus"><Perdus /></G>
    <G from={57.6} to={60.2} name="Liquide, pas de reçu"><Liquide /></G>

    {/* Son : voix off d'origine + ambiance + bruitages */}
    <Audio src={staticFile(VOICE)} />
    <Sequence from={sec(DARK_FROM)} name="nappe de tension" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.22} />
    </Sequence>
    <Sequence from={sec(28.4)} durationInFrames={sec(21.2)} name="battement de cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.45} />
    </Sequence>
    {CUTS.map((c) => (
      <Sfx key={`w${c.t}`} t={c.t - 0.2} file="whoosh.wav" volume={0.3} />
    ))}
    {POPS.map((t) => (
      <Sfx key={`p${t}`} t={t} file="pop.wav" volume={0.35} />
    ))}
    {IMPACTS.map((t) => (
      <Sfx key={`i${t}`} t={t} file="impact.wav" volume={0.45} />
    ))}
    <Sfx t={40.72} file="tear.wav" volume={0.7} />
    <Sfx t={41.35} file="ring.wav" volume={0.18} len={1.6} />
    <Sfx t={51.1} file="tick.wav" volume={0.25} len={1.5} />
  </AbsoluteFill>
);
