import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch as Zoom } from "../_shared/Footage";
import { ClockIcon, HomeIcon, LockIcon, MagnifierIcon, MessageIcon, ShieldIcon } from "../_shared/icons";
import { BODY, Check, Cross, G, GREEN, Sfx, Stamp, sec } from "../_shared/kit";
import { CAPTIONS } from "./captions";
import { Captions, Call, Dot, Poll, Polaroid, Punch, Say, Side, Tag, Talk, tone } from "../_shared/story";
import { Footprint, Garage, LightOn, MoonIcon, Sizes } from "./Graphics";

// Vidéo 008 — « Le vasistas » (bosse sur le toit, garage fermé à clé).
// Rush remodelé (scripts/remodel.py) : 61,0 s, voix off de synthèse qui démarre à 0.
export const DURATION_S = 61.0;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "008-toit-vasistas";
const VIDEO = `${DIR}/rushes/original/travail.mp4`;
const AMBIANCE = `${DIR}/rushes/original/ambiance.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

const CUTS: Cut[] = [
  { t: 5.9, type: "flash" },
  { t: 7.5, type: "whip" },
  { t: 13.47, type: "zoom" },
  { t: 19.47, type: "whip" },
  { t: 23.07, type: "zoom" },
  { t: 28.57, type: "flash" },
  { t: 32.57, type: "whip" },
  { t: 38.57, type: "zoom" },
  { t: 44.07, type: "whip" },
  { t: 47.07, type: "zoom" },
  { t: 50.67, type: "whip" },
  { t: 55.37, type: "flash" },
];

const ZOOMS: Zoom[] = [
  { t: 1.22, s: 1.08 }, // pleine nuit
  { t: 4.08, s: 1.1 }, // fermé à clé
  { t: 5.08, s: 1.12, shake: true }, // personne
  { t: 7.02, s: 1.14 }, // quelqu'un est sorti
  { t: 19.68, s: 1.1, shake: true }, // ne veut rien savoir
  { t: 28.34, s: 1.12, shake: true }, // pas un choc
  { t: 28.98, s: 1.16 }, // un poids
  { t: 31.78, s: 1.1 }, // vasistas
  { t: 35.12, s: 1.12, shake: true }, // trace de semelle
  { t: 36.64, s: 1.16 }, // 43
  { t: 42.6, s: 1.16, shake: true }, // 43 (fils)
  { t: 45.22, s: 1.1 }, // sur le fait
  { t: 53.88, s: 1.16, shake: true }, // la lumière
  { t: 57.68, s: 1.14 }, // pas de chat
];

const T = 300;

export const Video008: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={22.47} />

    {/* HOOK */}
    <G from={0.0} to={5.0} name="Nuit, garage fermé">
      <Tag top={T} t={0.05} icon={<Dot color="#1d2a4a"><MoonIcon size={38} /></Dot>} text="Apparue en pleine nuit" />
      <Tag top={T + 96} t={3.52} tone="white" icon={<Dot><LockIcon size={32} /></Dot>} text="Garage fermé à clé" size={32} />
    </G>
    <G from={5.0} to={8.05} name="Personne n'est entré">
      <Punch t={5.08} top={T} text="PERSONNE N'EST ENTRÉ." size={66} />
      <Punch t={6.34} top={T + 86} text="ET POURTANT…" color="#FFD23F" size={66} />
      <Punch t={7.04} top={T + 172} text="QUELQU'UN EST SORTI." color="#E10600" size={66} />
    </G>

    {/* MISE EN PLACE */}
    <G from={8.05} to={9.64} name="Appel">
      <Call top={T} t={8.14} caller="Une mère de famille" />
    </G>
    <G from={9.64} to={15.28} name="Bosse sur le toit">
      <Tag top={T} t={9.68} icon={<Dot><HomeIcon size={34} /></Dot>} text="Le matin, au garage…" size={32} />
      <Polaroid src={A("avant.jpg")} t={12.02} top={T + 100} label="SUR LE TOIT" w={260} h={330} mark={{ x: 0.42, y: 0.58 }} />
    </G>
    <G from={15.28} to={18.97} name="Porte verrouillée">
      <Side top={T} t={15.36}>
        <div style={{ ...tone("dark"), borderRadius: 26, padding: "16px 26px", width: 500 }}>
          <Line t={15.36} icon={<LockIcon size={34} />} text="Porte verrouillée" />
          <Line t={16.44} icon={<span style={{ fontSize: 30 }}>🔑</span>} text="2 clés : elle et son mari" />
        </div>
      </Side>
    </G>
    <G from={18.97} to={22.47} name="Assurance">
      <Tag top={T} t={19.06} tone="white" icon={<Dot color="#2b5cab"><ShieldIcon size={34} /></Dot>} text="L'assurance" />
      <div style={{ position: "absolute", top: T + 110, left: 90 }}>
        <Stamp t={19.73} text="REFUSÉ" size={70} rotate={-8} />
      </div>
      <Tag top={T + 230} t={20.7} icon={<Cross k={1} size={44} />} text="Pas de tiers" size={30} />
      <Tag top={T + 310} t={21.52} icon={<Cross k={1} size={44} />} text="Pas de remboursement" size={30} />
    </G>

    {/* TENSION */}
    <G from={22.47} to={24.17} name="Inspection">
      <Tag top={T} t={22.52} icon={<Dot><MagnifierIcon size={34} /></Dot>} text="J'inspecte le toit" />
    </G>
    <G from={24.17} to={27.98} name="Diagnostic">
      <Side top={T} t={24.22}>
        <div style={{ ...tone("dark"), borderRadius: 26, padding: "16px 26px", width: 500 }}>
          <Line t={24.62} icon={<Check k={1} size={40} />} text="Large" />
          <Line t={25.24} icon={<Check k={1} size={40} />} text="Molle" />
          <Line t={25.84} icon={<span style={{ fontSize: 30 }}>⚠️</span>} text="Quelque chose de lourd…" color="#FFD23F" />
        </div>
      </Side>
    </G>
    <G from={27.98} to={29.37} name="Pas un choc">
      <Punch t={28.04} top={T} text="PAS UN CHOC." size={78} />
      <Punch t={28.88} top={T + 96} text="UN POIDS." color="#FFD23F" size={78} />
    </G>
    <G from={29.37} to={32.85} name="Vasistas">
      <Garage top={T} t={29.42} tLight={31.63} />
    </G>
    <G from={32.85} to={34.34} name="Nettoyage">
      <Tag top={T} t={32.96} tone="white" icon={<Dot color={GREEN}><span style={{ fontSize: 30 }}>✨</span></Dot>} text="Je nettoie le toit" sub="avant de coller les tirettes" />
    </G>
    <G from={34.34} to={36.21} name="Trace de semelle">
      <Footprint top={T} t={34.36} tLabel={35.02} />
    </G>
    <G from={36.21} to={42.87} name="Pointures">
      <Sizes
        top={T}
        tHead={36.6}
        rows={[
          { t: 37.78, who: "Elle", size: "37" },
          { t: 39.22, who: "Son mari", size: "41" },
          { t: 41.12, who: "Son fils (16 ans)", size: "43", ok: true },
        ]}
      />
    </G>

    {/* RÉSOLUTION */}
    <G from={42.87} to={44.78} name="Ne dites rien">
      <Tag top={T} t={42.89} tone="green" icon={<Check k={1} size={58} />} text="Toit débosselé" />
      <Talk top={T + 110}>
        <Say t={43.36} who="LA MÈRE" text="« Ne lui dites rien. »" />
      </Talk>
    </G>
    <G from={44.78} to={46.29} name="Sur le fait">
      <Punch t={44.83} top={T} text="LE PRENDRE SUR LE FAIT." color="#FFD23F" size={62} />
    </G>
    <G from={46.29} to={48.45} name="Message">
      <Tag top={T} t={46.34} tone="white" icon={<Dot color={GREEN}><MessageIcon size={32} /></Dot>} text="Nouveau message" sub="le lendemain" />
    </G>
    <G from={48.45} to={51.68} name="1 h du matin">
      <Tag top={T} t={48.46} icon={<Dot color="#1d2a4a"><ClockIcon size={38} h={1} m={0} /></Dot>} text="1 h du matin" sub="elle l'attend dans le noir" />
    </G>
    <LightOn t={53.88} />
    <G from={51.68} to={54.94} name="La lumière">
      <Tag top={T} t={51.74} icon={<Dot color="#1d2a4a"><span style={{ fontSize: 30 }}>🧗</span></Dot>} text="Il monte sur la voiture…" size={32} />
      <Punch t={53.88} top={T + 100} text="…ET LA LUMIÈRE S'ALLUME." color="#FFD23F" size={58} />
    </G>
    <G from={54.94} to={56.96} name="Le chat">
      <Talk top={T}>
        <Say t={54.98} who="LE FILS" side="right" tone="dark" text="« Je vais chercher le chat ! »" />
      </Talk>
    </G>
    <G from={56.96} to={58.24} name="Pas de chat">
      <Punch t={57.03} top={T} text="ILS N'ONT PAS DE CHAT." color="#E10600" size={64} />
    </G>
    <G from={58.24} to={DURATION_S} name="Par où ?">
      <Poll top={T} t={58.26} question="À 16 ans, tu sortais par où ?" a="LA PORTE" b="LA FENÊTRE" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={0.0} durationInFrames={sec(8.29)} name="nappe hook" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.12} />
    </Sequence>
    <Sequence from={sec(34.34)} durationInFrames={sec(11.28)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.28} />
    </Sequence>
    <Sequence from={sec(48.45)} durationInFrames={sec(6.17)} name="nappe nuit" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.16} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.05, 3.52, 9.68, 12.02, 15.36, 16.44, 20.7, 21.52, 22.52, 24.62, 25.24, 25.84, 29.42, 32.96, 37.78, 39.22, 42.89, 46.34, 48.46, 51.74, 58.72, 58.97].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[5.08, 7.04, 19.73, 28.04, 28.88, 36.6, 41.12, 57.03].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    {[43.36, 54.98].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    <Sfx src={A("ring.wav")} t={8.14} volume={0.2} len={1.4} />
    <Sfx src={A("notif.wav")} t={46.37} volume={0.3} />
    <Sfx src={A("ding.wav")} t={31.63} volume={0.2} />
    <Sfx src={A("splat.wav")} t={34.43} volume={0.22} />
    <Sfx src={A("tick.wav")} t={48.53} volume={0.2} len={2.5} />
    <Sfx src={A("impact.wav")} t={53.88} volume={0.38} />
    <Sfx src={A("ding.wav")} t={42.89} volume={0.2} />
  </AbsoluteFill>
);

const Line: React.FC<{ t: number; icon: React.ReactNode; text: string; color?: string }> = ({ t, icon, text, color = "#fff" }) => (
  <Side inline t={t}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "6px 0" }}>
      {icon}
      <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34, color }}>{text}</span>
    </div>
  </Side>
);
