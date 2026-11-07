import React from "react";
import { AbsoluteFill, Audio, Easing, staticFile } from "remotion";
import { G, Sfx, sec, useG } from "../_shared/kit";
import {
  Appear,
  BigNumber,
  Box,
  CTA,
  CallCard,
  Chat,
  GOLD,
  I,
  Label,
  ListCard,
  LuxeFootage,
  Poll,
  RED_SOFT,
  SANS,
  SERIF,
  SerifLine,
  Tag,
  glass,
  useIn,
} from "../_shared/luxe";

// Vidéo 007 — « Peut-être rien, mais peut-être pas » (client inquiet après le crash en Floride)
// Temps en secondes du rush, calés au mot près sur la transcription (transcription.json).
export const DURATION_S = 68.1;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "007-jet-a";
const VIDEO = `${DIR}/rushes/original/original.mov`;
const VOICE = `${DIR}/rushes/original/voix.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

// Effet miroir : plages calées sur les coupes du rush, hors plans avec écritures (CIRRUS, SR22).
const MIRRORS: [number, number][] = [
  [7.3, 13.77],
  [20.2, 25.3],
  [33.87, 42.1],
  [48.63, 57.47],
  [60.9, 66.33],
];


/* -------------------------------------------------- 18,3 – 23 s : l'enregistrement */
const Recording: React.FC = () => {
  const { frame, lin } = useG();
  const n = Math.round(10 + 20 * lin(22.1, 22.95, Easing.out(Easing.cubic)));
  return (
    <Box top={300}>
      <div style={{ ...glass, borderRadius: 26, padding: "20px 28px 22px", display: "inline-flex", flexDirection: "column", gap: 12 }}>
        <Label>Pilote ↔ Tour de contrôle</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 6, height: 70 }}>
          {Array.from({ length: 30 }, (_, i) => {
            const h = 10 + Math.abs(Math.sin(frame * 0.35 + i * 0.9) * Math.sin(i * 0.5 + frame * 0.11)) * 58;
            return <div key={i} style={{ width: 9, height: h, borderRadius: 6, background: i % 6 === 0 ? GOLD : "rgba(255,255,255,0.85)" }} />;
          })}
        </div>
        <Appear t={21.84}>
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 30, color: "rgba(255,255,255,0.85)" }}>
            Écouté <span style={{ fontFamily: SERIF, fontWeight: 700, color: GOLD, fontSize: 38 }}>×{n}</span> fois
          </div>
        </Appear>
      </div>
    </Box>
  );
};

/* -------------------------------------------------- 52,2 – 58,5 s : la trace sur le chiffon */
const Rag: React.FC = () => {
  const { k: smear } = useIn(53.46, 20, 60);
  const { k: smear2 } = useIn(54.66, 20, 60);
  return (
    <Box top={300}>
      <div style={{ ...glass, borderRadius: 28, padding: 20, display: "inline-flex", alignItems: "center", gap: 24 }}>
        <svg width={170} height={170} viewBox="0 0 170 170" style={{ borderRadius: 18, flexShrink: 0 }}>
          <defs>
            <pattern id="fib" width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="#F4D23C" />
              <path d="M0 6L6 0" stroke="#E2BE25" strokeWidth="1.4" />
            </pattern>
            <filter id="soft">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>
          <rect width="170" height="170" fill="url(#fib)" />
          <g filter="url(#soft)" opacity={0.92}>
            <ellipse cx={80} cy={88} rx={52 * smear} ry={20 * smear} fill="#16130f" transform="rotate(-18 80 88)" />
            <ellipse cx={104} cy={70} rx={26 * smear2} ry={11 * smear2} fill="#2a2418" transform="rotate(-25 104 70)" />
          </g>
          <ellipse cx={74} cy={84} rx={18 * smear} ry={5 * smear} fill="rgba(255,255,255,0.25)" transform="rotate(-18 74 84)" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingRight: 12 }}>
          <Label>Sous le capot moteur</Label>
          <Appear t={53.46}>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 36, lineHeight: 1.15 }}>
              Trace noire
              <br />
              et grasse
            </div>
          </Appear>
          <Appear t={55.82}>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 26, color: RED_SOFT }}>Coulure inexpliquée</div>
          </Appear>
        </div>
      </div>
    </Box>
  );
};

export const Video007: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <LuxeFootage video={VIDEO} mirrors={MIRRORS} />

    <G from={0.05} to={3.0} name="Crash en Floride">
      <Tag top={300} icon={I.plane({})} label="Floride" text="Crash d'un jet privé" sub="Mon client ne dort plus" subT={1.94} />
    </G>
    <G from={3.06} to={5.0} name="Appel mardi">
      <CallCard top={300} name="Client" sub="Mardi · appel entrant" />
    </G>
    <G from={5.02} to={7.55} name="La vraie question">
      <Chat top={300} msgs={[{ t: 5.4, text: "Je peux encore monter dedans ?" }]} />
    </G>
    <G from={7.62} to={13.7} name="L'avion">
      <ListCard
        top={300}
        label="Son avion"
        rows={[
          { t: 7.76, text: "Avion à hélice", mark: "dot" },
          { t: 8.96, text: "Quasiment neuf", mark: "dot" },
          { t: 10.02, text: "Acheté il y a 1 an", mark: "dot" },
          { t: 12.34, text: "Jamais une question", mark: "check" },
        ]}
      />
    </G>
    <G from={13.84} to={15.32} name="Dimanche, la vidéo">
      <Tag top={300} icon={I.play({})} label="Dimanche" text="Il a vu la vidéo" />
    </G>
    <G from={15.38} to={18.2} name="9 décédés">
      <BigNumber top={300} t0={17.2} t1={17.7} to={9} suffix=" décédés" size={92} label="Au milieu des maisons" />
    </G>
    <G from={18.26} to={23.05} name="Enregistrement"><Recording /></G>
    <G from={23.12} to={28.72} name="Départ jeudi">
      <ListCard
        top={300}
        label="Jeudi · départ"
        rows={[
          { t: 25.38, text: "Décollage jeudi", mark: "dot" },
          { t: 26.66, text: "Avec sa fille, 12 ans", mark: "dot" },
          { t: 27.74, text: "Chez sa mère, dans le sud", mark: "dot" },
        ]}
      />
    </G>
    <G from={28.84} to={32.4} name="Message client (fort)">
      <Chat
        top={300}
        big
        header="Client"
        headerSub="en ligne"
        msgs={[
          { t: 29.0, text: "Fais l'extérieur à fond." },
          { t: 30.3, text: "Et dis-moi si tu vois quelque chose de bizarre." },
        ]}
      />
    </G>
    <G from={32.44} to={37.95} name="Pas mécanicien">
      <ListCard
        top={300}
        rows={[
          { t: 33.42, text: "Moi, je nettoie", mark: "check" },
          { t: 34.28, text: "Je ne suis pas mécanicien", mark: "cross" },
          { t: 36.26, text: "Le contrôle, c'est leur métier", mark: "dot" },
        ]}
      />
    </G>
    <G from={38.2} to={42.3} name="CTA partage">
      <CTA kind="share" text="Partage à un pilote" />
    </G>
    <G from={38.5} to={42.45} name="Il reste à côté">
      <Tag top={300} icon={I.people({})} text="Il reste à côté de moi" sub="pendant tout le nettoyage" subT={39.96} />
    </G>
    <G from={42.5} to={44.96} name="Pourquoi tu t'arrêtes">
      <Tag top={300} icon={I.people({})} label="À chaque pause" text="« Pourquoi tu t'arrêtes ? »" t={42.82} />
    </G>
    <G from={45.02} to={48.36} name="Tout brille">
      <ListCard
        top={300}
        rows={[
          { t: 45.38, text: "Fuselage", mark: "check" },
          { t: 46.22, text: "Ailes", mark: "check" },
          { t: 46.74, text: "Train d'atterrissage", mark: "check" },
          { t: 47.78, text: <span style={{ color: GOLD }}>Tout brille</span>, mark: "dot" },
        ]}
      />
    </G>
    <G from={48.38} to={52.15} name="Capot moteur">
      <Tag top={300} icon={I.target({})} label="Capot moteur" text="Juste derrière l'hélice" sub="Le dessous, au chiffon" subT={51.0} />
    </G>
    <G from={52.2} to={58.6} name="Trace noire"><Rag /></G>
    <G from={58.74} to={60.15} name="Peut-être rien">
      <SerifLine
        top={310}
        parts={[
          { t: 58.74, text: "Peut-être rien…" },
          { t: 59.5, text: "mais peut-être pas.", gold: true },
        ]}
      />
    </G>
    <G from={60.2} to={66.05} name="Échange final">
      <Chat
        top={300}
        width={680}
        msgs={[
          { t: 60.46, text: "C'est quoi ?" },
          { t: 61.48, text: "Honnêtement, je sais pas." , me: true },
          { t: 63.18, text: "Peut-être normal…", me: true },
          { t: 64.62, text: "Mais fais-le regarder avant jeudi.", me: true },
        ]}
      />
    </G>
    <G from={66.1} to={DURATION_S} name="Sondage final">
      <Poll top={300} q="Tu ferais monter ta famille dedans ?" optsT={67.0} />
    </G>

    {/* Son : voix off + bruitages légers */}
    <Audio src={staticFile(VOICE)} />
    {MIRRORS.flat().map((t) => <Sfx key={`w${t}`} src={A("whoosh.wav")} t={t - 0.18} volume={0.35} />)}
    {[0.05, 5.4, 7.62, 13.84, 18.26, 23.12, 32.44, 38.5, 45.02, 48.38, 52.2, 66.1].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.48} />
    ))}
    {[8.96, 10.02, 12.34, 25.38, 26.66, 27.74, 33.42, 34.28, 36.26].map((t) => (
      <Sfx key={`t${t}`} src={A("tick.wav")} t={t} volume={0.35} len={0.4} />
    ))}
    {[45.38, 46.22, 46.74].map((t) => <Sfx key={`d${t}`} src={A("ding.wav")} t={t} volume={0.31} />)}
    {[29.0, 30.3, 43.78, 60.46, 61.48, 64.62].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.44} />)}
    <Sfx src={A("notif.wav")} t={3.06} volume={0.55} />
    <Sfx src={A("impact.wav")} t={17.2} volume={0.48} />
    <Sfx src={A("ding.wav")} t={47.78} volume={0.4} />
    <Sfx src={A("impact.wav")} t={53.46} volume={0.62} />
    <Sfx src={A("heartbeat.wav")} t={52.2} volume={0.28} len={6.4} />
    <Sfx src={A("impact.wav")} t={59.5} volume={0.44} />
  </AbsoluteFill>
);
