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
  { t: 1.46, s: 1.08 }, // pleine nuit
  { t: 4.04, s: 1.1 }, // fermé à clé
  { t: 5.26, s: 1.12, shake: true }, // personne
  { t: 7.12, s: 1.14 }, // quelqu'un est sorti
  { t: 19.14, s: 1.1, shake: true }, // ne veut rien savoir
  { t: 27.36, s: 1.12, shake: true }, // pas un choc
  { t: 27.88, s: 1.16 }, // un poids
  { t: 30.36, s: 1.1 }, // vasistas
  { t: 35.72, s: 1.12, shake: true }, // trace de semelle
  { t: 37.02, s: 1.16 }, // 43
  { t: 41.96, s: 1.16, shake: true }, // 43 (fils)
  { t: 46.12, s: 1.1 }, // sur le fait
  { t: 53.84, s: 1.16, shake: true }, // la lumière
  { t: 57.25, s: 1.14 }, // pas de chat
];

const T = 300;

export const Video008: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={21.73} />

    {/* HOOK */}
    <G from={0.0} to={5.15} name="Nuit, garage fermé">
      <Tag top={T} t={0.05} icon={<Dot color="#1d2a4a"><MoonIcon size={38} /></Dot>} text="Apparue en pleine nuit" />
      <Tag top={T + 96} t={3.48} tone="white" icon={<Dot><LockIcon size={32} /></Dot>} text="Garage fermé à clé" size={32} />
    </G>
    <G from={5.15} to={8.11} name="Personne n'est entré">
      <Punch t={5.26} top={T} text="PERSONNE N'EST ENTRÉ." size={66} />
      <Punch t={6.46} top={T + 86} text="ET POURTANT…" color="#FFD23F" size={66} />
      <Punch t={7.15} top={T + 172} text="QUELQU'UN EST SORTI." color="#E10600" size={66} />
    </G>

    {/* MISE EN PLACE */}
    <G from={8.11} to={9.16} name="Appel">
      <Call top={T} t={8.18} caller="Une mère de famille" />
    </G>
    <G from={9.16} to={14.83} name="Bosse sur le toit">
      <Tag top={T} t={9.18} icon={<Dot><HomeIcon size={34} /></Dot>} text="Le matin, au garage…" size={32} />
      <Polaroid src={A("avant.jpg")} t={11.78} top={T + 100} label="SUR LE TOIT" w={260} h={330} mark={{ x: 0.42, y: 0.58 }} />
    </G>
    <G from={14.83} to={18.49} name="Porte verrouillée">
      <Side top={T} t={14.9}>
        <div style={{ ...tone("dark"), borderRadius: 26, padding: "16px 26px", width: 500 }}>
          <Line t={14.9} icon={<LockIcon size={34} />} text="Porte verrouillée" />
          <Line t={16.36} icon={<span style={{ fontSize: 30 }}>🔑</span>} text="2 clés : elle et son mari" />
        </div>
      </Side>
    </G>
    <G from={18.49} to={21.73} name="Assurance">
      <Tag top={T} t={18.52} tone="white" icon={<Dot color="#2b5cab"><ShieldIcon size={34} /></Dot>} text="L'assurance" />
      <div style={{ position: "absolute", top: T + 110, left: 90 }}>
        <Stamp t={19.19} text="REFUSÉ" size={70} rotate={-8} />
      </div>
      <Tag top={T + 230} t={20.12} icon={<Cross k={1} size={44} />} text="Pas de tiers" size={30} />
      <Tag top={T + 310} t={20.92} icon={<Cross k={1} size={44} />} text="Pas de remboursement" size={30} />
    </G>

    {/* TENSION */}
    <G from={21.73} to={23.52} name="Inspection">
      <Tag top={T} t={21.78} icon={<Dot><MagnifierIcon size={34} /></Dot>} text="J'inspecte le toit" />
    </G>
    <G from={23.52} to={27.1} name="Diagnostic">
      <Side top={T} t={23.56}>
        <div style={{ ...tone("dark"), borderRadius: 26, padding: "16px 26px", width: 500 }}>
          <Line t={23.96} icon={<Check k={1} size={40} />} text="Large" />
          <Line t={24.4} icon={<Check k={1} size={40} />} text="Molle" />
          <Line t={24.72} icon={<span style={{ fontSize: 30 }}>⚠️</span>} text="Quelque chose de lourd…" color="#FFD23F" />
        </div>
      </Side>
    </G>
    <G from={27.1} to={28.27} name="Pas un choc">
      <Punch t={27.14} top={T} text="PAS UN CHOC." size={78} />
      <Punch t={27.76} top={T + 96} text="UN POIDS." color="#FFD23F" size={78} />
    </G>
    <G from={28.27} to={31.12} name="Vasistas">
      <Garage top={T} t={28.34} tLight={30.13} />
    </G>
    <G from={31.12} to={33.48} name="Nettoyage">
      <Tag top={T} t={31.18} tone="white" icon={<Dot color={GREEN}><span style={{ fontSize: 30 }}>✨</span></Dot>} text="Je nettoie le toit" sub="avant de coller les tirettes" />
    </G>
    <G from={33.48} to={36.63} name="Trace de semelle">
      <Footprint top={T} t={33.53} tLabel={35.62} />
    </G>
    <G from={36.63} to={42.64} name="Pointures">
      <Sizes
        top={T}
        tHead={36.98}
        rows={[
          { t: 38.12, who: "Elle", size: "37" },
          { t: 39.34, who: "Son mari", size: "41" },
          { t: 40.74, who: "Son fils (16 ans)", size: "43", ok: true },
        ]}
      />
    </G>

    {/* RÉSOLUTION */}
    <G from={42.64} to={45.29} name="Ne dites rien">
      <Tag top={T} t={42.68} tone="green" icon={<Check k={1} size={58} />} text="Toit débosselé" />
      <Talk top={T + 110}>
        <Say t={43.88} who="LA MÈRE" text="« Ne lui dites rien. »" />
      </Talk>
    </G>
    <G from={45.29} to={47.23} name="Sur le fait">
      <Punch t={45.34} top={T} text="LE PRENDRE SUR LE FAIT." color="#FFD23F" size={62} />
    </G>
    <G from={47.23} to={49.27} name="Message">
      <Tag top={T} t={47.28} tone="white" icon={<Dot color={GREEN}><MessageIcon size={32} /></Dot>} text="Nouveau message" sub="le lendemain" />
    </G>
    <G from={49.27} to={52.22} name="1 h du matin">
      <Tag top={T} t={49.28} icon={<Dot color="#1d2a4a"><ClockIcon size={38} h={1} m={0} /></Dot>} text="1 h du matin" sub="elle l'attend dans le noir" />
    </G>
    <LightOn t={53.84} />
    <G from={52.22} to={54.93} name="La lumière">
      <Tag top={T} t={52.28} icon={<Dot color="#1d2a4a"><span style={{ fontSize: 30 }}>🧗</span></Dot>} text="Il monte sur la voiture…" size={32} />
      <Punch t={53.84} top={T + 100} text="…ET LA LUMIÈRE S'ALLUME." color="#FFD23F" size={58} />
    </G>
    <G from={54.93} to={56.63} name="Le chat">
      <Talk top={T}>
        <Say t={54.98} who="LE FILS" side="right" tone="dark" text="« Je vais chercher le chat ! »" />
      </Talk>
    </G>
    <G from={56.63} to={58.09} name="Pas de chat">
      <Punch t={56.68} top={T} text="ILS N'ONT PAS DE CHAT." color="#E10600" size={64} />
    </G>
    <G from={58.09} to={DURATION_S} name="Par où ?">
      <Poll top={T} t={58.14} question="À 16 ans, tu sortais par où ?" a="LA PORTE" b="LA FENÊTRE" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={0.0} durationInFrames={sec(8.27)} name="nappe hook" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.12} />
    </Sequence>
    <Sequence from={sec(33.48)} durationInFrames={sec(11.13)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.28} />
    </Sequence>
    <Sequence from={sec(49.27)} durationInFrames={sec(5.99)} name="nappe nuit" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.16} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.05, 3.48, 9.18, 11.78, 14.9, 16.36, 20.12, 20.92, 21.78, 23.96, 24.4, 24.72, 28.34, 31.18, 38.12, 39.34, 42.68, 47.28, 49.28, 52.28, 58.42, 58.75].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[5.26, 7.15, 19.19, 27.14, 27.76, 36.98, 40.74, 56.68].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    {[43.88, 54.98].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    <Sfx src={A("ring.wav")} t={8.18} volume={0.2} len={1.4} />
    <Sfx src={A("notif.wav")} t={47.32} volume={0.3} />
    <Sfx src={A("ding.wav")} t={30.13} volume={0.2} />
    <Sfx src={A("splat.wav")} t={33.6} volume={0.22} />
    <Sfx src={A("tick.wav")} t={49.33} volume={0.2} len={2.5} />
    <Sfx src={A("impact.wav")} t={53.84} volume={0.38} />
    <Sfx src={A("ding.wav")} t={42.68} volume={0.2} />
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
