import React from "react";
import { AbsoluteFill, Audio, Easing, staticFile } from "remotion";
import { G, Sfx, sec, useG } from "../_shared/kit";
import { CTA, CallCard, Chat, GOLD, I, Label, ListCard, LuxeFootage, Poll, RED_SOFT, SANS, SERIF, SerifLine, Tag, glass } from "../_shared/luxe";
import { Big, BarsX2, Books, FrameIcon, Glyph, IllusCard, PhonePost, Plaid, Polaroid, Profile, Ring, Still, Sub, Suitcase, Tiles, Viewfinder, WatchBox } from "../_shared/illus";

// Vidéo 009 — « Le coach et le jet loué » (shooting photo dans un jet qui n'est pas le sien)
// Temps en secondes du rush, calés au mot près sur transcription.json. Image du rush intacte (aucun filtre).
export const DURATION_S = 66.4;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "009-jet-c";
const VIDEO = `${DIR}/rushes/original/original.mov`;
const VOICE = `${DIR}/rushes/original/voix.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

// Miroir : plages calées sur les coupes, hors plans avec étiquettes de produits.
const MIRRORS: [number, number][] = [
  [3.97, 10.03],
  [17.9, 25.63],
  [32.9, 39.43],
  [46.73, 55.13],
  [61.06, 64.47],
];

/* 7,7 – 10,2 s : location 2 h, juste pour des photos */
const Rental: React.FC = () => {
  const { lin } = useG();
  const k = lin(8.64, 9.6, Easing.out(Easing.cubic));
  return (
    <IllusCard top={300} label="Location">
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <Ring k={k} size={130}>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 46, color: "#fff", lineHeight: 1 }}>2 h</div>
        </Ring>
        <div>
          <Big>Jet loué</Big>
          <Sub>juste pour des photos</Sub>
        </div>
        <div style={{ opacity: lin(9.6, 9.9) }}>{Glyph.camera(70)}</div>
      </div>
    </IllusCard>
  );
};

/* 46,6 – 50,9 s : un jet différent tous les 3 mois, ventes ×2 */
const EveryQuarter: React.FC = () => {
  const { pop } = useG();
  return (
    <IllusCard top={300} label="Sa technique">
      <div style={{ display: "flex", gap: 30, alignItems: "flex-end" }}>
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {[47.08, 47.4, 47.7, 48.0].map((t, i) => (
              <div key={i} style={{ transform: `scale(${pop(t, 12, 200)})` }}>
                {I.plane({ size: 46, color: i === 3 ? GOLD : "rgba(255,255,255,0.8)" })}
              </div>
            ))}
          </div>
          <Big size={34}>Un jet différent</Big>
          <Sub>tous les 3 mois</Sub>
        </div>
        <BarsX2 t={49.98} />
      </div>
    </IllusCard>
  );
};

/* 55,2 – 58,1 s : le propriétaire est sur le parking */
const OwnerAlert: React.FC = () => {
  const { frame, pop } = useG();
  const k = pop(55.98, 10, 220);
  const blink = 0.6 + 0.4 * Math.abs(Math.sin(frame / 4));
  return (
    <div style={{ position: "absolute", top: 300, left: 70, width: 760, transform: `translateY(${(1 - k) * -60}px)`, opacity: Math.min(1, k * 2) }}>
      <div style={{ ...glass, borderRadius: 32, padding: "18px 24px", display: "flex", alignItems: "center", gap: 18, border: `2px solid ${RED_SOFT}` }}>
        <div style={{ width: 70, height: 70, borderRadius: 18, background: RED_SOFT, display: "flex", alignItems: "center", justifyContent: "center", opacity: blink }}>
          {I.warn({ size: 42, color: "#fff" })}
        </div>
        <div>
          <Label color={RED_SOFT}>Propriétaire en avance</Label>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 36, marginTop: 4 }}>Il est sur le parking</div>
        </div>
      </div>
    </div>
  );
};

/* 62,4 – 63,95 s : la montre oubliée sur le siège */
const ForgottenWatch: React.FC = () => {
  const { lin } = useG();
  const ring = lin(63.04, 63.5, Easing.out(Easing.cubic));
  return (
    <IllusCard top={300} label="Oubliée sur le siège">
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ position: "relative", width: 150, height: 150 }}>
          <svg width={150} height={150} viewBox="0 0 150 150" style={{ position: "absolute", inset: 0 }}>
            <rect x={6} y={60} width={138} height={80} rx={22} fill="#6b6f78" />
            <rect x={14} y={66} width={122} height={30} rx={12} fill="#7a7f89" />
            <ellipse cx={75} cy={80} rx={64} ry={52} fill="none" stroke={RED_SOFT} strokeWidth={4} pathLength={100} strokeDasharray={`${ring * 100} 100`} transform="rotate(-90 75 80)" />
          </svg>
          <div style={{ position: "absolute", left: 30, top: 20 }}>
            <WatchBox size={90} noBox shine={lin(63.3, 63.9)} />
          </div>
        </div>
        <div>
          <Big>Une montre</Big>
          <Sub>dans la panique…</Sub>
        </div>
      </div>
    </IllusCard>
  );
};

export const Video009: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <LuxeFootage video={VIDEO} mirrors={MIRRORS} />

    <G from={0.05} to={2.6} name="Mission">
      <Tag top={300} icon={I.plane({})} label="Mission du jour" text="Jet privé de luxe" sub="payé pour le nettoyer" subT={0.9} />
    </G>
    <G from={2.64} to={5.95} name="Intérieur">
      <ListCard
        top={300}
        label="À bord"
        rows={[
          { t: 2.64, text: "Boiseries partout", mark: "dot" },
          { t: 3.66, text: "Sièges en cuir", mark: "dot" },
          { t: 4.86, text: "Table en bois vernis", mark: "dot" },
        ]}
      />
    </G>
    <G from={6.04} to={7.65} name="Pas le sien">
      <Tag top={300} icon={I.key({ color: RED_SOFT })} label="Sauf que…" text="Ce jet n'est pas le sien" />
    </G>
    <G from={7.7} to={10.2} name="Location 2 h"><Rental /></G>
    <G from={10.22} to={12.85} name="Photographe + valises">
      <Tiles
        top={300}
        label="Sur le tarmac"
        items={[
          { t: 11.58, icon: Glyph.camera(70), label: "Un photographe" },
          { t: 12.26, icon: <div style={{ display: "flex" }}>{Glyph.bag(64)}{Glyph.bag(64)}</div>, label: "Deux valises" },
        ]}
      />
    </G>
    <G from={12.92} to={17.5} name="Profil coach">
      <Profile top={300} name="Coach business" bio="Deviens riche" followers={300000} tCount={16.42} tBio={14.94} />
    </G>
    <G from={17.54} to={19.3} name="Shooting viseur"><Viewfinder label="SHOOTING" /></G>
    <G from={19.4} to={26.6} name="Valise ouverte">
      <Suitcase
        top={300}
        tOpen={19.54}
        label="Dans ses valises"
        items={[
          { t: 21.0, node: <FrameIcon size={104} />, label: "Ses photos" },
          { t: 22.66, node: <Plaid size={150} />, label: "Plaid à initiales" },
          { t: 24.26, node: <WatchBox size={128} />, label: "Une montre" },
          { t: 25.58, node: <Books size={160} />, label: "Livres « richesse »" },
        ]}
      />
    </G>
    <G from={26.66} to={29.6} name="Comme chez lui">
      <SerifLine
        top={310}
        parts={[
          { t: 27.32, text: "Tout installer…" },
          { t: 28.66, text: "comme si c'était chez lui.", gold: true },
        ]}
      />
    </G>
    <G from={29.74} to={34.35} name="À qui l'avion (fort)">
      <Chat
        top={300}
        big
        header="Le coach"
        headerSub="pendant le shooting"
        msgs={[
          { t: 29.98, text: "L'avion, il appartient à qui ?", me: true },
          { t: 32.44, text: "Ça, mes abonnés n'ont pas besoin de le savoir." },
        ]}
      />
    </G>
    <G from={34.4} to={39.05} name="Poses">
      <Tiles
        top={300}
        label="Il pose dans tous les fauteuils"
        items={[
          { t: 36.54, icon: Glyph.phone(70), label: "Au téléphone" },
          { t: 37.42, icon: Glyph.glass(70), label: "Un verre" },
          { t: 38.26, icon: Glyph.window(70), label: "Vers le hublot" },
        ]}
      />
    </G>
    <G from={39.12} to={42.75} name="300 photos"><Shots /></G>
    <G from={39.3} to={43.4} name="CTA like">
      <CTA kind="like" text="Like si tu connais ce genre de coach" />
    </G>
    <G from={42.82} to={46.6} name="Mon nouveau bureau">
      <PhonePost top={300} src={A("still-51.jpg")} caption="Mon nouveau bureau ✈️" tCaption={45.74} likes={48210} pos="50% 55%" />
    </G>
    <G from={46.64} to={50.95} name="Tous les 3 mois"><EveryQuarter /></G>
    <G from={50.98} to={55.1} name="Téléphone photographe">
      <CallCard top={300} name="Photographe" sub="appel entrant · 1 h 30 de shooting" />
      <Tag top={460} label="Il décroche…" text="et devient tout blanc" t={54.08} />
    </G>
    <G from={55.2} to={58.1} name="Propriétaire parking"><OwnerAlert /></G>
    <G from={58.12} to={62.35} name="Panique valise">
      <Suitcase
        top={300}
        tOpen={57.6}
        label="Panique"
        closeAt={60.0}
        items={[
          { t: 57.6, node: <FrameIcon size={104} />, label: "Les cadres" },
          { t: 57.6, node: <Plaid size={150} />, label: "Le plaid" },
          { t: 57.6, node: <Books size={160} />, label: "Les livres" },
        ]}
      />
    </G>
    <G from={62.4} to={63.95} name="Montre oubliée"><ForgottenWatch /></G>
    <G from={63.98} to={DURATION_S} name="Ses photos">
      <Polaroid top={300} left={90} width={430} rotate={-4} caption="#nouveaubureau" t={63.98}>
        <Still src={A("still-62.jpg")} pos="50% 50%" />
      </Polaroid>
    </G>

    {/* Son : voix off + bruitages (normalisés à -3 dB crête) */}
    <Audio src={staticFile(VOICE)} />
    {MIRRORS.flat().map((t) => <Sfx key={`w${t}`} src={A("whoosh.wav")} t={t - 0.15} volume={0.43} />)}
    {[0.05, 2.64, 7.7, 10.22, 12.92, 26.66, 34.4, 46.64, 62.4].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.8} />
    ))}
    {[3.66, 4.86, 11.58, 12.26, 36.54, 37.42, 38.26, 47.08, 47.4, 47.7, 48.0].map((t) => (
      <Sfx key={`t${t}`} src={A("tick.wav")} t={t} volume={0.58} len={0.4} />
    ))}
    {[21.0, 22.66, 24.26, 25.58].map((t) => <Sfx key={`d${t}`} src={A("ding.wav")} t={t} volume={0.65} />)}
    {[29.98, 32.44].map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.65} />)}
    <Sfx src={A("impact.wav")} t={6.04} volume={0.58} />
    <Sfx src={A("cash.wav")} t={8.64} volume={0.65} />
    <Sfx src={A("cash.wav")} t={16.62} volume={0.65} />
    <Sfx src={A("shutter.wav")} t={17.6} volume={0.85} />
    <Sfx src={A("whoosh.wav")} t={19.4} volume={0.51} />
    {[39.2, 39.45, 39.7, 40.0, 40.3, 40.6].map((t) => <Sfx key={`s${t}`} src={A("shutter.wav")} t={t} volume={0.72} />)}
    <Sfx src={A("notif.wav")} t={45.74} volume={0.65} />
    <Sfx src={A("cash.wav")} t={49.98} volume={0.72} />
    <Sfx src={A("ring.wav")} t={51.0} volume={0.58} len={2.0} />
    <Sfx src={A("impact.wav")} t={54.28} volume={0.65} />
    <Sfx src={A("notif.wav")} t={55.98} volume={0.72} />
    <Sfx src={A("heartbeat.wav")} t={55.2} volume={0.3} len={4.5} />
    <Sfx src={A("whoosh.wav")} t={59.9} volume={0.58} />
    <Sfx src={A("impact.wav")} t={61.5} volume={0.51} />
    <Sfx src={A("ding.wav")} t={63.04} volume={0.72} />
    <Sfx src={A("shutter.wav")} t={63.98} volume={0.85} />
  </AbsoluteFill>
);

/* 39,1 – 42,75 s : 300 photos (viseur + compteur) et traces de doigts */
function Shots() {
  const { lin, pop } = useG();
  const n = Math.round(300 * lin(39.12, 40.6, Easing.out(Easing.quad)));
  const f = pop(41.64, 12, 190);
  return (
    <>
      <Viewfinder label="PHOTO" count={n} />
      <div style={{ position: "absolute", top: 420, left: 120, opacity: Math.min(1, f * 2), transform: `scale(${0.7 + 0.3 * Math.min(1, f)})`, transformOrigin: "0% 50%" }}>
        <div style={{ ...glass, borderRadius: 26, padding: "14px 24px 14px 14px", display: "inline-flex", alignItems: "center", gap: 14 }}>
          {Glyph.finger(64)}
          <div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 32 }}>Entre chaque prise</div>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 24, color: "rgba(255,255,255,0.7)" }}>j'efface les traces de doigts</div>
          </div>
        </div>
      </div>
    </>
  );
}
