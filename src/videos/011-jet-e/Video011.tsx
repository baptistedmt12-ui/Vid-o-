import React from "react";
import { AbsoluteFill, Audio, Easing, staticFile } from "remotion";
import { G, Sfx, sec, useG } from "../_shared/kit";
import { CTA, Chat, GOLD, Label, LuxeFootage, RED_SOFT, SANS, SERIF, glass } from "../_shared/luxe";
import { Big, Clock, IllusCard, Ring, SceneFrame, Sub, Tiles } from "../_shared/illus";
import { BoardingPass, Bottle, Confetti, FranceMap, Guy, Shoe, Sound, ToiletDoor, WeddingCard } from "../_shared/illus2";

// Vidéo 011 — « Enfermé dans les toilettes du jet » (invité d'EVG oublié, qui se marie à 15 h)
// Temps en secondes du rush, calés au mot près sur transcription.json. Image du rush intacte (aucun filtre).
export const DURATION_S = 62.15;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "011-jet-e";
const VIDEO = `${DIR}/rushes/original/travail.mp4`; // copie 30 i/s fixe, 1080p lanczos, CRF 8 (évite les saccades)
const VOICE = `${DIR}/rushes/original/voix.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

// Miroir : plages calées sur les coupes, hors plans avec écritures (LOCK/OPEN, magazines, outil FLEX,
// étiquettes du cockpit, consignes de sécurité).
const MIRRORS: [number, number][] = [
  [2.33, 6.77],
  [9.2, 16.07],
  [17.0, 23.53],
  [28.7, 35.8],
  [39.03, 46.93],
  [52.6, 55.93],
  [58.76, 61.85],
];

/* 0 – 5,1 s : accroche, porte verrouillée depuis 2 h */
const Hook: React.FC = () => {
  const { lin } = useG();
  return (
    <IllusCard top={300} width={560} label="Depuis le début…">
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <SceneFrame w={200} h={230}>
          <ToiletDoor occupied />
        </SceneFrame>
        <div>
          <Ring k={lin(1.38, 1.9, Easing.out(Easing.cubic))} size={120}>
            <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 44, color: "#fff" }}>2 h</div>
          </Ring>
          <div style={{ opacity: lin(3.24, 3.5), marginTop: 10 }}>
            <Big size={32}>quelqu'un</Big>
            <Sub size={26}>enfermé dedans</Sub>
          </div>
        </div>
      </div>
    </IllusCard>
  );
};

/* 15,8 – 19 s : le bazar classique */
const Mess: React.FC = () => (
  <Tiles
    top={300}
    label="Classique"
    items={[
      { t: 15.82, icon: <div style={{ display: "flex", gap: 4 }}><Bottle size={70} rot={-12} /><Bottle size={70} rot={18} /></div>, label: "Bouteilles" },
      { t: 16.24, icon: <Confetti size={74} t0={16.24} />, label: "Confettis" },
      { t: 17.06, icon: <Shoe size={110} />, label: "Une chaussure seule" },
    ]}
  />
);

/* 22,5 – 30 s : la porte est fermée, je frappe */
const Locked: React.FC = () => {
  const { frame, at, lin } = useG();
  const knock = (t: number, amp: number) => {
    const d = frame - at(t);
    return d >= 0 && d < 14 ? Math.sin(d * 2.2) * amp * (1 - d / 14) : 0;
  };
  const shake = knock(27.68, 3) + knock(28.86, 6) + knock(29.3, 6);
  return (
    <IllusCard top={300} width={600} label="10 h · les toilettes">
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <SceneFrame w={230} h={260}>
          <ToiletDoor occupied shake={shake} />
        </SceneFrame>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 4, background: RED_SOFT }} />
            <Big size={32}>Fermé à l'intérieur</Big>
          </div>
          <div style={{ opacity: lin(26.5, 26.8) }}>
            <Sub>Le verrou est coincé ?</Sub>
          </div>
          <div style={{ opacity: lin(28.22, 28.5) }}>
            <Sub color={GOLD}>Je frappe… rien.</Sub>
          </div>
        </div>
      </div>
    </IllusCard>
  );
};

/* 36,98 – 42,4 s : la porte s'ouvre, le gars apparaît */
const DoorOpens: React.FC = () => {
  const { lin, frame } = useG();
  const open = lin(37.3, 38.3, Easing.inOut(Easing.cubic));
  const sway = Math.sin(frame / 9) * 2.5;
  const shirt = lin(38.78, 39.1);
  const shoe = lin(40.02, 40.3);
  const hair = lin(40.94, 41.2);
  const eyes = lin(41.84, 42.1);
  const label = (o: number, txt: string, x: number, y: number) => (
    <div style={{ position: "absolute", left: x, top: y, opacity: o, transform: `translateX(${(1 - o) * 14}px)`, display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 26, height: 2, background: GOLD }} />
      <div style={{ ...glass, borderRadius: 100, padding: "6px 16px", fontFamily: SANS, fontWeight: 700, fontSize: 24, whiteSpace: "nowrap" }}>{txt}</div>
    </div>
  );
  return (
    <div style={{ position: "absolute", top: 300, left: 70, width: 780 }}>
      <IllusCard top={0} left={0} width={470} label="La porte s'ouvre…">
        <SceneFrame w={420} h={470}>
          <ToiletDoor
            open={open}
            occupied={open < 0.05}
            dark={0.3}
            inside={
              <g transform="translate(200 262) scale(0.95)" opacity={Math.min(1, open * 1.6)}>
                <Guy sway={sway} blink={0.6} />
              </g>
            }
          />
        </SceneFrame>
      </IllusCard>
      {label(shirt, "Chemise hawaïenne", 470, 300)}
      {label(shoe, "Une seule chaussure", 470, 520)}
      {label(hair, "Cheveux collés", 470, 140)}
      {label(eyes, "Yeux mi-clos", 470, 210)}
    </div>
  );
};

/* 47,8 – 51,5 s : 5 minutes… endormi */
const Asleep: React.FC = () => {
  const { lin, frame } = useG();
  const k = lin(49.62, 50.4, Easing.out(Easing.cubic));
  const z = lin(50.76, 51.1);
  return (
    <IllusCard top={300}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Ring k={k} size={120}>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 40, color: "#fff", lineHeight: 1 }}>5</div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 18, color: "rgba(255,255,255,0.7)" }}>min</div>
        </Ring>
        <div>
          <Big>« Juste 5 minutes tranquille »</Big>
          <div style={{ opacity: z, display: "flex", alignItems: "baseline", gap: 10 }}>
            <Sub color={GOLD}>Endormi assis</Sub>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 26 + i * 6, color: "#fff", opacity: (Math.sin(frame / 6 - i) + 1) / 2, transform: `translateY(${-i * 6}px)`, display: "inline-block" }}>
                z
              </span>
            ))}
          </div>
        </div>
      </div>
    </IllusCard>
  );
};

/* 51,78 – 53,1 s : 14 h, personne n'a cherché */
const Hours14: React.FC = () => {
  const { lin } = useG();
  const n = Math.round(14 * lin(51.78, 52.3, Easing.out(Easing.cubic)));
  return (
    <IllusCard top={300}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
        <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 96, color: "#fff", lineHeight: 1 }}>
          {n}
          <span style={{ color: GOLD }}> h</span>
        </div>
        <div style={{ opacity: lin(52.3, 52.6) }}>
          <Sub size={30} color="rgba(255,255,255,0.85)">et personne</Sub>
          <Sub size={30} color="rgba(255,255,255,0.85)">n'a cherché.</Sub>
        </div>
      </div>
    </IllusCard>
  );
};

/* 53,1 – 56,6 s : la chaussure sous le siège → son pied */
const ShoeMatch: React.FC = () => {
  const { lin, pop } = useG();
  const a = pop(53.76, 12, 180);
  const b = pop(55.3, 12, 180);
  const give = lin(56.46, 56.66, Easing.out(Easing.cubic));
  return (
    <IllusCard top={300} label="Le mystère de la chaussure">
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ textAlign: "center", opacity: Math.min(1, a * 2), transform: `translateX(${give * 150}px) scale(${0.6 + 0.4 * Math.min(1, a)})` }}>
          <Shoe size={130} />
          <Sub size={22}>sous le siège</Sub>
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 48, color: GOLD, opacity: b * (1 - give) }}>=</div>
        <div style={{ textAlign: "center", opacity: Math.min(1, b * 2), transform: `scale(${0.6 + 0.4 * Math.min(1, b)})` }}>
          <svg width={130} height={80} viewBox="0 0 130 80">
            <rect x={70} y={0} width={22} height={50} rx={8} fill="#c8b08a" />
            <path d="M40 48 C40 38 56 36 70 40 H92 V64 H40 Z" fill="#d64b6a" />
          </svg>
          <Sub size={22}>son pied</Sub>
        </div>
      </div>
    </IllusCard>
  );
};

/* 56,66 – 59,4 s : Lille, comment rentrer ? */
const Lille: React.FC = () => {
  const { lin } = useG();
  return (
    <IllusCard top={300}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <FranceMap size={150} label="Lille" />
        <div>
          <Big size={34}>Il habite à Lille</Big>
          <div style={{ opacity: lin(58.04, 58.3) }}>
            <Sub color={GOLD}>« Tu comptais rentrer comment ? »</Sub>
          </div>
        </div>
      </div>
    </IllusCard>
  );
};

export const Video011: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <LuxeFootage video={VIDEO} mirrors={MIRRORS} />

    <G from={0.05} to={5.1} name="Accroche"><Hook /></G>
    <G from={5.18} to={7.95} name="EVG Ibiza">
      <BoardingPassBox />
    </G>
    <G from={8.08} to={11.5} name="Message du pilote">
      <Chat top={300} header="Le pilote" headerSub="la veille au soir" msgs={[{ t: 8.72, text: "Tout le monde est descendu à l'atterrissage." }]} />
    </G>
    <G from={11.56} to={14.1} name="Vol à midi">
      <IllusCard top={300}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Clock h={12} size={100} />
          <div>
            <Big>Tout remettre en état</Big>
            <Sub color={GOLD}>avant un vol à midi</Sub>
          </div>
        </div>
      </IllusCard>
    </G>
    <G from={14.18} to={15.7} name="8 h">
      <IllusCard top={300}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Clock h={8} size={90} />
          <Big>Je commence à 8 h</Big>
        </div>
      </IllusCard>
    </G>
    <G from={15.82} to={19.0} name="Le bazar"><Mess /></G>
    <G from={19.14} to={22.4} name="9 h, petit bruit">
      <IllusCard top={300} label="Vers 9 h">
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Sound size={80} />
          <div>
            <Big size={34}>Un petit bruit au fond</Big>
            <SubAt t={21.5} text="« Sûrement la tuyauterie »" />
          </div>
        </div>
      </IllusCard>
    </G>
    <G from={22.48} to={30.2} name="Toilettes fermées"><Locked /></G>
    <G from={30.26} to={33.8} name="Petite voix (fort)">
      <Chat top={300} big header="Derrière la porte" headerSub="une petite voix faible" msgs={[{ t: 32.26, text: "Il est quelle heure… ?" }]} />
    </G>
    <G from={33.84} to={36.95} name="Qui est là ? Silence">
      <Chat
        top={300}
        msgs={[
          { t: 35.22, text: "Qui est là ?", me: true },
          { t: 36.44, text: "…" },
        ]}
      />
    </G>
    <G from={36.98} to={42.6} name="La porte s'ouvre (fort)"><DoorOpens /></G>
    <G from={42.64} to={45.95} name="Où sont les autres">
      <Chat
        top={300}
        header="Le gars"
        headerSub="regarde l'avion vide"
        msgs={[{ t: 44.98, text: "Ils sont où, les autres ?" }]}
      />
    </G>
    <G from={44.0} to={47.8} name="CTA partage">
      <CTA kind="share" text="Envoie à ton pote qui s'endort partout" />
    </G>
    <G from={45.98} to={47.78} name="Tous descendus">
      <Chat top={300} msgs={[{ t: 46.1, text: "Tout le monde est descendu hier soir.", me: true }]} />
    </G>
    <G from={47.82} to={51.5} name="5 min, endormi"><Asleep /></G>
    <G from={51.78} to={53.1} name="14 h"><Hours14 /></G>
    <G from={53.14} to={56.66} name="Chaussure"><ShoeMatch /></G>
    <G from={56.7} to={59.45} name="Lille"><Lille /></G>
    <G from={59.5} to={DURATION_S} name="Il se marie à 15 h (fort)">
      <div style={{ position: "absolute", top: 300, left: 110 }}>
        <WeddingReveal />
      </div>
    </G>

    {/* Son : voix off + bruitages (normalisés à -3 dB crête) */}
    <Audio src={staticFile(VOICE)} />
    {MIRRORS.flat().map((t) => <Sfx key={`w${t}`} src={A("whoosh.wav")} t={t - 0.15} volume={0.45} />)}
    {[0.05, 11.56, 14.18, 19.14, 22.48, 47.82, 53.14, 56.7].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.75} />
    ))}
    <Sfx src={A("tick.wav")} t={1.38} volume={0.55} len={0.4} />
    <Sfx src={A("whoosh.wav")} t={5.2} volume={0.6} />
    <Sfx src={A("notif.wav")} t={8.72} volume={0.6} />
    <Sfx src={A("tick.wav")} t={14.78} volume={0.6} len={0.4} />
    {[15.82, 16.24, 17.06].map((t) => <Sfx key={`d${t}`} src={A("ding.wav")} t={t} volume={0.6} />)}
    <Sfx src={A("tick.wav")} t={19.28} volume={0.6} len={0.4} />
    <Sfx src={A("knock.wav")} t={27.68} volume={0.55} />
    <Sfx src={A("knock.wav")} t={28.86} volume={0.85} />
    <Sfx src={A("notif.wav")} t={32.26} volume={0.6} />
    <Sfx src={A("heartbeat.wav")} t={33.8} volume={0.3} len={3.2} />
    <Sfx src={A("notif.wav")} t={35.22} volume={0.55} />
    <Sfx src={A("whoosh.wav")} t={37.3} volume={0.55} />
    {[38.78, 40.02, 40.94, 41.84].map((t) => <Sfx key={`l${t}`} src={A("pop.wav")} t={t} volume={0.7} />)}
    <Sfx src={A("notif.wav")} t={44.98} volume={0.6} />
    <Sfx src={A("notif.wav")} t={46.1} volume={0.55} />
    <Sfx src={A("tick.wav")} t={49.62} volume={0.55} len={0.6} />
    <Sfx src={A("impact.wav")} t={51.78} volume={0.6} />
    <Sfx src={A("ding.wav")} t={55.3} volume={0.6} />
    <Sfx src={A("whoosh.wav")} t={56.46} volume={0.5} />
    <Sfx src={A("ding.wav")} t={57.26} volume={0.55} />
    <Sfx src={A("impact.wav")} t={60.7} volume={0.65} />
    <Sfx src={A("cash.wav")} t={61.4} volume={0.5} />
  </AbsoluteFill>
);

function SubAt({ t, text }: { t: number; text: string }) {
  const { lin } = useG();
  return (
    <div style={{ opacity: lin(t, t + 0.3) }}>
      <Sub color={GOLD}>{text}</Sub>
    </div>
  );
}

function BoardingPassBox() {
  const { pop } = useG();
  const k = pop(5.3, 13, 170);
  return (
    <div style={{ position: "absolute", top: 300, left: 70, opacity: Math.min(1, k * 2), transform: `translateY(${(1 - Math.min(1, k)) * 40}px) rotate(${-2 + (1 - Math.min(1, k)) * 6}deg)` }}>
      <BoardingPass from="Ibiza" fromCode="IBZ" to="Retour" toCode="✈" note="Enterrement de vie de garçon" />
    </div>
  );
}

function WeddingReveal() {
  const { pop, exit } = useG();
  const k = pop(60.58, 11, 170);
  return (
    <div style={{ opacity: Math.min(1, k * 2) * (1 - exit), transform: `translateY(${(1 - Math.min(1, k)) * 60}px) rotate(${2 - (1 - Math.min(1, k)) * 6}deg) scale(${0.85 + 0.15 * Math.min(1, k)})` }}>
      <WeddingCard time="15 h" t={60.82} width={540} />
      <div style={{ marginTop: 18, ...glass, borderRadius: 100, padding: "10px 22px", display: "inline-block" }}>
        <Label>C'est lui qui se marie</Label>
      </div>
    </div>
  );
}

