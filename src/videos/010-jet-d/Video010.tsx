import React from "react";
import { AbsoluteFill, Audio, Easing, staticFile } from "remotion";
import { G, Sfx, sec, useG } from "../_shared/kit";
import { CTA, CallCard, GOLD, I, Label, LuxeFootage, RED_SOFT, SANS, SERIF, SerifLine, Tag, glass } from "../_shared/luxe";
import { Accident, Big, CarpetTrail, Chips, Clock, DustBag, Glyph, IllusCard, MapCorse, Polaroid, Ring, SceneFrame, Sub, UrnLevel, UrnPhoto } from "../_shared/illus";

// Vidéo 010 — « La grand-mère dans l'aspirateur » (urne renversée dans le jet)
// Temps en secondes du rush, calés au mot près sur transcription.json. Image du rush intacte (aucun filtre).
export const DURATION_S = 66.2;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "010-jet-d";
const VIDEO = `${DIR}/rushes/original/original.mov`;
const VOICE = `${DIR}/rushes/original/voix.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

// Miroir : plages calées sur les coupes, hors plans avec étiquettes (produits, cartons, autocollant des toilettes).
const MIRRORS: [number, number][] = [
  [5.04, 9.41],
  [17.84, 24.97],
  [29.63, 36.87],
  [40.87, 44.07],
  [48.37, 51.03],
  [58.83, 62.57],
];

/* 7,7 – 13,05 s : décollage à midi pour la Corse */
const Flight: React.FC = () => {
  const { lin } = useG();
  return (
    <IllusCard top={300} width={640} label="Le vol de la famille">
      <SceneFrame w={590} h={360}>
        <MapCorse tFly={8.16} tFlyEnd={11.82} />
      </SceneFrame>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Clock h={12} size={64} />
        <div>
          <Big size={32}>Décollage à midi</Big>
          <div style={{ opacity: lin(12.22, 12.5) }}>
            <Sub size={26}>Disperser ses cendres là où elle est née</Sub>
          </div>
        </div>
      </div>
    </IllusCard>
  );
};

/* 14,78 – 16,6 s : 9 h, personne */
const NineAM: React.FC = () => {
  const { lin } = useG();
  return (
    <IllusCard top={300}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Clock h={9} m={0} size={110} spin={-0.25 * (1 - lin(14.8, 15.4, Easing.out(Easing.cubic)))} />
        <div>
          <Big>J'arrive à 9 h</Big>
          <div style={{ opacity: lin(16.06, 16.3) }}>
            <Sub>Personne. Juste l'avion.</Sub>
          </div>
        </div>
      </div>
    </IllusCard>
  );
};

/* 40,3 – 42,5 s : trois secondes */
const ThreeSec: React.FC = () => {
  const { lin, frame, at } = useG();
  const k = lin(40.3, 41.2, Easing.linear);
  const n = Math.min(3, Math.floor((frame - at(40.3)) / 9) + 1);
  return (
    <IllusCard top={300}>
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <Ring k={k} size={120}>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 56, color: "#fff" }}>{n}</div>
        </Ring>
        <div>
          <Big>3 secondes…</Big>
          <div style={{ opacity: lin(41.36, 41.6) }}>
            <Sub color={RED_SOFT}>et là, je réalise.</Sub>
          </div>
        </div>
      </div>
    </IllusCard>
  );
};

/* 42,64 – 47,4 s : le sac de l'aspirateur / l'urne presque pleine */
const BagVsUrn: React.FC = () => {
  const { pop } = useG();
  const a = pop(44.04, 12, 180);
  const b = pop(45.82, 12, 180);
  return (
    <IllusCard top={300} label="J'éteins tout">
      <div style={{ display: "flex", alignItems: "flex-end", gap: 30 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: Math.min(1, a * 2), transform: `scale(${0.6 + 0.4 * Math.min(1, a)})` }}>
          <DustBag size={130} />
          <Sub size={24}>le sac de l'aspirateur</Sub>
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 50, color: GOLD, marginBottom: 60, opacity: b }}>/</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: Math.min(1, b * 2), transform: `scale(${0.6 + 0.4 * Math.min(1, b)})` }}>
          <UrnLevel t={46.4} level={0.88} />
          <Sub size={24}>encore presque pleine</Sub>
        </div>
      </div>
    </IllusCard>
  );
};

/* 47,44 – 56 s : le dilemme */
const Dilemma: React.FC = () => {
  const { pop } = useG();
  const opt = (t: number, icon: React.ReactNode, title: string, sub: string) => {
    const k = pop(t, 13, 190);
    return (
      <div style={{ ...glass, borderRadius: 26, padding: "18px 18px 20px", width: 330, display: "flex", flexDirection: "column", gap: 10, opacity: Math.min(1, k * 2), transform: `translateY(${(1 - Math.min(1, k)) * 30}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{icon}</div>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, lineHeight: 1.12 }}>{title}</div>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 23, color: "rgba(255,255,255,0.7)", lineHeight: 1.2 }}>{sub}</div>
      </div>
    );
  };
  const c = pop(55.46, 10, 220);
  return (
    <div style={{ position: "absolute", top: 300, left: 70, width: 760 }}>
      <div style={{ marginBottom: 12 }}>
        <Label>Qu'est-ce que je fais ?</Label>
      </div>
      <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
        {opt(49.42, <><DustBag size={60} />{Glyph.hand(60)}</>, "Ouvrir le sac", "et trier la poussière à la main")}
        {opt(52.14, <>{Glyph.phone(64)}</>, "Appeler le client", "« votre grand-mère est dans mon aspirateur »")}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, opacity: Math.min(1, c * 2), transform: `scale(${0.7 + 0.3 * Math.min(1, c)})`, transformOrigin: "0% 50%" }}>
        <Chips size={56} />
        <div style={{ ...glass, borderRadius: 100, padding: "10px 22px", fontFamily: SANS, fontWeight: 700, fontSize: 28 }}>…avec des miettes de chips</div>
      </div>
    </div>
  );
};

/* 56,06 – 62,1 s : assis par terre 5 minutes */
const FiveMin: React.FC = () => {
  const { lin } = useG();
  const k = lin(59.4, 60.6, Easing.out(Easing.cubic));
  return (
    <IllusCard top={300}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Ring k={k} size={120}>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 40, color: "#fff", lineHeight: 1 }}>5</div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 18, color: "rgba(255,255,255,0.7)" }}>min</div>
        </Ring>
        <div>
          <Big>Urne bien refermée</Big>
          <div style={{ opacity: lin(58.94, 59.2) }}>
            <Sub>assis par terre, sans bouger</Sub>
          </div>
          <div style={{ opacity: lin(61.18, 61.4), marginTop: 6 }}>
            <Sub color={GOLD}>…puis une voix dehors</Sub>
          </div>
        </div>
      </div>
    </IllusCard>
  );
};

/* 62,22 – 64,3 s : la famille arrive en avance */
const Family: React.FC = () => {
  const { pop, frame } = useG();
  const k = pop(62.5, 10, 220);
  const blink = 0.6 + 0.4 * Math.abs(Math.sin(frame / 4));
  return (
    <div style={{ position: "absolute", top: 300, left: 70, width: 760, transform: `translateY(${(1 - k) * -60}px)`, opacity: Math.min(1, k * 2) }}>
      <div style={{ ...glass, borderRadius: 32, padding: "18px 24px", display: "flex", alignItems: "center", gap: 18, border: `2px solid ${RED_SOFT}` }}>
        <div style={{ opacity: blink }}>{Glyph.people(4, 44, "#fff")}</div>
        <div>
          <Label color={RED_SOFT}>En avance</Label>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 34, marginTop: 4 }}>Toute la famille arrive</div>
        </div>
      </div>
    </div>
  );
};

/* 64,36 – fin : qu'auriez-vous fait ? */
const Ask: React.FC = () => {
  const { pop } = useG();
  const opts = [
    { t: 65.0, txt: "Trier le sac" },
    { t: 65.3, txt: "Tout avouer" },
  ];
  return (
    <IllusCard top={300} width={740} label="Dites-le en commentaire">
      <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 46, lineHeight: 1.15 }}>Vous auriez fait quoi à ma place&nbsp;?</div>
      <div style={{ display: "flex", gap: 16 }}>
        {opts.map((o, i) => {
          const k = pop(o.t, 12, 200);
          return (
            <div key={o.txt} style={{ flex: 1, textAlign: "center", border: `1.5px solid ${i === 0 ? GOLD : "rgba(255,255,255,0.35)"}`, color: i === 0 ? GOLD : "#fff", borderRadius: 100, padding: "12px 0", fontFamily: SANS, fontWeight: 800, fontSize: 30, opacity: Math.min(1, k * 2), transform: `scale(${0.7 + 0.3 * Math.min(1, k)})` }}>
              {o.txt}
            </div>
          );
        })}
      </div>
    </IllusCard>
  );
};

export const Video010: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <LuxeFootage video={VIDEO} mirrors={MIRRORS} />

    <G from={0.05} to={2.55} name="Accroche">
      <Tag top={300} icon={<svg width={34} height={34} viewBox="-75 -200 150 210"><g transform="scale(0.95)"><path d="M-26 -14 C-62 -40 -66 -96 -40 -128 C-34 -136 -30 -140 -24 -146 H24 C30 -140 34 -136 40 -128 C66 -96 62 -40 26 -14 Z" fill={GOLD} /></g></svg>} label="L'autre jour" text="J'ai aspiré une grand-mère" sub="sans le savoir" subT={1.72} />
    </G>
    <G from={2.64} to={6.1} name="Photo urne (couvercle mal fermé)">
      <Polaroid top={300} left={90} width={470} rotate={-3} caption="couvercle mal fermé…" t={3.28}>
        <UrnPhoto ajar />
      </Polaroid>
    </G>
    <G from={6.16} to={7.6} name="Client au téléphone">
      <CallCard top={300} name="Le client" sub="m'avait prévenu" />
    </G>
    <G from={7.72} to={13.05} name="Vol vers la Corse"><Flight /></G>
    <G from={13.08} to={14.6} name="Parfait pour elle">
      <SerifLine top={310} parts={[{ t: 13.6, text: "« Parfait pour elle. »", gold: true }]} />
    </G>
    <G from={14.78} to={16.6} name="9 h personne"><NineAM /></G>
    <G from={16.66} to={20.7} name="Photo urne dorée (fort)">
      <Polaroid top={300} left={80} width={620} rotate={2} caption="une urne dorée avec un ruban" t={18.86}>
        <UrnPhoto ajar={false} />
      </Polaroid>
    </G>
    <G from={20.76} to={22.45} name="Je fais attention">
      <Tag top={300} icon={I.spray({})} label="Je fais attention" text="Je nettoie tout autour" sub="je ne touche pas" subT={22.5} />
    </G>
    <G from={22.5} to={31.85} name="L'accident (fort)">
      <IllusCard top={300} width={680} label="Sous la table…">
        <SceneFrame w={630} h={470}>
          <Accident tHose={24.2} tHit={26.32} tSlide={27.8} tCatch={29.2} tLid={30.22} />
        </SceneFrame>
      </IllusCard>
    </G>
    <G from={31.92} to={40.25} name="Traînée grise + aspirateur">
      <IllusCard top={300} width={600} label="Sur la moquette beige">
        <SceneFrame w={550} h={300}>
          <CarpetTrail tTrail={34.3} tVac={39.4} tVacEnd={40.2} />
        </SceneFrame>
        <TrailText />
      </IllusCard>
    </G>
    <G from={36.0} to={39.9} name="CTA partage">
      <CTA kind="share" text="Envoie à quelqu'un de maladroit" />
    </G>
    <G from={40.3} to={42.5} name="3 secondes"><ThreeSec /></G>
    <G from={42.64} to={47.4} name="Sac vs urne"><BagVsUrn /></G>
    <G from={47.44} to={56.0} name="Dilemme"><Dilemma /></G>
    <G from={56.06} to={62.1} name="5 minutes"><FiveMin /></G>
    <G from={62.22} to={64.3} name="Famille en avance"><Family /></G>
    <G from={64.36} to={DURATION_S} name="Question finale"><Ask /></G>

    {/* Son : voix off + bruitages (normalisés à -3 dB crête) */}
    <Audio src={staticFile(VOICE)} />
    {MIRRORS.flat().map((t) => <Sfx key={`w${t}`} src={A("whoosh.wav")} t={t - 0.15} volume={0.43} />)}
    {[0.05, 14.78, 20.76, 22.5, 40.3, 47.44, 56.06].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.8} />
    ))}
    <Sfx src={A("shutter.wav")} t={3.28} volume={0.85} />
    <Sfx src={A("ring.wav")} t={6.16} volume={0.51} len={1.4} />
    <Sfx src={A("whoosh.wav")} t={8.16} volume={0.65} len={1.5} />
    <Sfx src={A("ding.wav")} t={11.82} volume={0.65} />
    <Sfx src={A("tick.wav")} t={15.38} volume={0.65} len={0.5} />
    <Sfx src={A("shutter.wav")} t={18.86} volume={0.85} />
    <Sfx src={A("vacuum.wav")} t={24.2} volume={0.51} len={2.6} />
    <Sfx src={A("impact.wav")} t={26.32} volume={0.72} />
    <Sfx src={A("whoosh.wav")} t={27.8} volume={0.65} />
    <Sfx src={A("pop.wav")} t={29.2} volume={0.85} />
    <Sfx src={A("impact.wav")} t={30.9} volume={0.65} />
    <Sfx src={A("vacuum.wav")} t={38.0} volume={0.72} len={2.6} />
    {[40.3, 40.6, 40.9].map((t) => <Sfx key={`t${t}`} src={A("tick.wav")} t={t} volume={0.65} len={0.3} />)}
    <Sfx src={A("impact.wav")} t={41.36} volume={0.72} />
    <Sfx src={A("ding.wav")} t={44.04} volume={0.65} />
    <Sfx src={A("ding.wav")} t={45.82} volume={0.65} />
    <Sfx src={A("tick.wav")} t={49.42} volume={0.65} len={0.4} />
    <Sfx src={A("notif.wav")} t={52.14} volume={0.65} />
    <Sfx src={A("pop.wav")} t={55.46} volume={0.85} />
    <Sfx src={A("heartbeat.wav")} t={58.8} volume={0.3} len={3.3} />
    <Sfx src={A("impact.wav")} t={62.5} volume={0.72} />
    <Sfx src={A("notif.wav")} t={64.36} volume={0.65} />
  </AbsoluteFill>
);

function TrailText() {
  const { lin } = useG();
  return (
    <div>
      <div style={{ opacity: lin(34.3, 34.6) }}>
        <Big size={34}>Une petite traînée grise</Big>
      </div>
      <div style={{ opacity: lin(37.4, 37.7) }}>
        <Sub>Aspirateur allumé… par réflexe.</Sub>
      </div>
    </div>
  );
}
