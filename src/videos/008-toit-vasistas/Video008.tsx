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
  { t: 1.2, s: 1.08 }, // pleine nuit
  { t: 3.1, s: 1.1 }, // fermé à clé
  { t: 4.12, s: 1.12, shake: true }, // personne
  { t: 5.98, s: 1.14 }, // quelqu'un est sorti
  { t: 18.16, s: 1.1, shake: true }, // ne veut rien savoir
  { t: 26.78, s: 1.12, shake: true }, // pas un choc
  { t: 27.32, s: 1.16 }, // un poids
  { t: 29.72, s: 1.1 }, // vasistas
  { t: 35.62, s: 1.12, shake: true }, // trace de semelle
  { t: 37.04, s: 1.16 }, // 43
  { t: 42.18, s: 1.16, shake: true }, // 43 (fils)
  { t: 46.28, s: 1.1 }, // sur le fait
  { t: 54.1, s: 1.16, shake: true }, // la lumière
  { t: 57.12, s: 1.14 }, // pas de chat
];

const T = 300;

export const Video008: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <Footage video={VIDEO} cuts={CUTS} punches={ZOOMS} darkFrom={20.9} />

    {/* HOOK */}
    <G from={0} to={4.05} name="Nuit, garage fermé">
      <Tag top={T} t={0.05} icon={<Dot color="#1d2a4a"><MoonIcon size={38} /></Dot>} text="Apparue en pleine nuit" />
      <Tag top={T + 96} t={2.62} tone="white" icon={<Dot><LockIcon size={32} /></Dot>} text="Garage fermé à clé" size={32} />
    </G>
    <G from={4.05} to={6.8} name="Personne n'est entré">
      <Punch t={4.12} top={T} text="PERSONNE N'EST ENTRÉ." size={66} />
      <Punch t={5.4} top={T + 86} text="ET POURTANT…" color="#FFD23F" size={66} />
      <Punch t={6.0} top={T + 172} text="QUELQU'UN EST SORTI." color="#E10600" size={66} />
    </G>

    {/* MISE EN PLACE */}
    <G from={6.8} to={8.3} name="Appel">
      <Call top={T} t={6.86} caller="Une mère de famille" />
    </G>
    <G from={8.3} to={14.2} name="Bosse sur le toit">
      <Tag top={T} t={8.34} icon={<Dot><HomeIcon size={34} /></Dot>} text="Le matin, au garage…" size={32} />
      <Polaroid src={A("avant.jpg")} t={10.82} top={T + 100} label="SUR LE TOIT" w={260} h={330} mark={{ x: 0.42, y: 0.58 }} />
    </G>
    <G from={14.2} to={17.42} name="Porte verrouillée">
      <Side top={T} t={14.28}>
        <div style={{ ...tone("dark"), borderRadius: 26, padding: "16px 26px", width: 500 }}>
          <Line t={14.28} icon={<LockIcon size={34} />} text="Porte verrouillée" />
          <Line t={15.48} icon={<span style={{ fontSize: 30 }}>🔑</span>} text="2 clés : elle et son mari" />
        </div>
      </Side>
    </G>
    <G from={17.42} to={20.9} name="Assurance">
      <Tag top={T} t={17.48} tone="white" icon={<Dot color="#2b5cab"><ShieldIcon size={34} /></Dot>} text="L'assurance" />
      <div style={{ position: "absolute", top: T + 110, left: 90 }}>
        <Stamp t={18.2} text="REFUSÉ" size={70} rotate={-8} />
      </div>
      <Tag top={T + 230} t={19.28} icon={<Cross k={1} size={44} />} text="Pas de tiers" size={30} />
      <Tag top={T + 310} t={20.0} icon={<Cross k={1} size={44} />} text="Pas de remboursement" size={30} />
    </G>

    {/* TENSION */}
    <G from={20.9} to={22.6} name="Inspection">
      <Tag top={T} t={20.96} icon={<Dot><MagnifierIcon size={34} /></Dot>} text="J'inspecte le toit" />
    </G>
    <G from={22.6} to={26.4} name="Diagnostic">
      <Side top={T} t={22.64}>
        <div style={{ ...tone("dark"), borderRadius: 26, padding: "16px 26px", width: 500 }}>
          <Line t={23.16} icon={<Check k={1} size={40} />} text="Large" />
          <Line t={23.62} icon={<Check k={1} size={40} />} text="Molle" />
          <Line t={24.16} icon={<span style={{ fontSize: 30 }}>⚠️</span>} text="Quelque chose de lourd…" color="#FFD23F" />
        </div>
      </Side>
    </G>
    <G from={26.4} to={27.55} name="Pas un choc">
      <Punch t={26.44} top={T} text="PAS UN CHOC." size={78} />
      <Punch t={27.2} top={T + 96} text="UN POIDS." color="#FFD23F" size={78} />
    </G>
    <G from={27.55} to={30.5} name="Vasistas">
      <Garage top={T} t={27.6} tLight={29.6} />
    </G>
    <G from={30.5} to={32.9} name="Nettoyage">
      <Tag top={T} t={30.56} tone="white" icon={<Dot color={GREEN}><span style={{ fontSize: 30 }}>✨</span></Dot>} text="Je nettoie le toit" sub="avant de coller les tirettes" />
    </G>
    <G from={32.9} to={36.6} name="Trace de semelle">
      <Footprint top={T} t={33.0} tLabel={35.5} />
    </G>
    <G from={36.6} to={43.0} name="Pointures">
      <Sizes
        top={T}
        tHead={37.0}
        rows={[
          { t: 38.24, who: "Elle", size: "37" },
          { t: 39.58, who: "Son mari", size: "41" },
          { t: 40.96, who: "Son fils (16 ans)", size: "43", ok: true },
        ]}
      />
    </G>

    {/* RÉSOLUTION */}
    <G from={43.0} to={45.8} name="Ne dites rien">
      <Tag top={T} t={43.04} tone="green" icon={<Check k={1} size={58} />} text="Toit débosselé" />
      <Talk top={T + 110}>
        <Say t={44.28} who="LA MÈRE" text="« Ne lui dites rien. »" />
      </Talk>
    </G>
    <G from={45.8} to={47.32} name="Sur le fait">
      <Punch t={45.84} top={T} text="LE PRENDRE SUR LE FAIT." color="#FFD23F" size={62} />
    </G>
    <G from={47.32} to={49.2} name="Message">
      <Tag top={T} t={47.36} tone="white" icon={<Dot color={GREEN}><MessageIcon size={32} /></Dot>} text="Nouveau message" sub="le lendemain" />
    </G>
    <G from={49.2} to={52.22} name="1 h du matin">
      <Tag top={T} t={49.26} icon={<Dot color="#1d2a4a"><ClockIcon size={38} h={1} m={0} /></Dot>} text="1 h du matin" sub="elle l'attend dans le noir" />
    </G>
    <LightOn t={54.1} />
    <G from={52.22} to={55.2} name="La lumière">
      <Tag top={T} t={52.28} icon={<Dot color="#1d2a4a"><span style={{ fontSize: 30 }}>🧗</span></Dot>} text="Il monte sur la voiture…" size={32} />
      <Punch t={54.1} top={T + 100} text="…ET LA LUMIÈRE S'ALLUME." color="#FFD23F" size={58} />
    </G>
    <G from={55.2} to={56.7} name="Le chat">
      <Talk top={T}>
        <Say t={55.24} who="LE FILS" side="right" tone="dark" text="« Je vais chercher le chat ! »" />
      </Talk>
    </G>
    <G from={56.7} to={58.02} name="Pas de chat">
      <Punch t={56.74} top={T} text="ILS N'ONT PAS DE CHAT." color="#E10600" size={64} />
    </G>
    <G from={58.02} to={DURATION_S} name="Par où ?">
      <Poll top={T} t={58.08} question="À 16 ans, tu sortais par où ?" a="LA PORTE" b="LA FENÊTRE" />
    </G>

    <Captions data={CAPTIONS} />

    {/* Son */}
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    <Audio src={staticFile(AMBIANCE)} volume={0.12} />
    <Sequence from={0} durationInFrames={sec(7)} name="nappe hook" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.12} />
    </Sequence>
    <Sequence from={sec(32.9)} durationInFrames={sec(10)} name="cœur" layout="none">
      <Audio src={staticFile(A("heartbeat.wav"))} volume={0.28} />
    </Sequence>
    <Sequence from={sec(49.2)} durationInFrames={sec(5)} name="nappe nuit" layout="none">
      <Audio src={staticFile(A("drone.wav"))} volume={0.16} />
    </Sequence>
    {CUTS.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={0.2} />)}
    {[0.05, 2.62, 8.34, 10.82, 14.28, 15.48, 19.28, 20.0, 20.96, 23.16, 23.62, 24.16, 27.6, 30.56, 38.24, 39.58, 43.04, 47.36, 49.26, 52.28, 58.3, 58.5].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.28} />
    ))}
    {[4.12, 6.0, 18.2, 26.44, 27.2, 37.0, 40.96, 56.74].map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.32} />)}
    {[44.28, 55.24].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.24} />)}
    <Sfx src={A("ring.wav")} t={6.86} volume={0.2} len={1.4} />
    <Sfx src={A("notif.wav")} t={47.4} volume={0.3} />
    <Sfx src={A("ding.wav")} t={29.6} volume={0.2} />
    <Sfx src={A("splat.wav")} t={33.1} volume={0.22} />
    <Sfx src={A("tick.wav")} t={49.3} volume={0.2} len={2.5} />
    <Sfx src={A("impact.wav")} t={54.1} volume={0.38} />
    <Sfx src={A("ding.wav")} t={43.04} volume={0.2} />
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
