import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { G, Sfx, sec, useG } from "../_shared/kit";
import {
  Appear,
  BigNumber,
  Box,
  CTA,
  CallCard,
  GOLD,
  I,
  Label,
  ListCard,
  LuxeFootage,
  Note,
  RED_SOFT,
  SANS,
  SerifLine,
  Tag,
  glass,
} from "../_shared/luxe";

// Vidéo 008 — « Le carnet de vol » (avion de 500 000 € hérité par trois frères et sœurs)
// Temps en secondes du rush, calés au mot près sur la transcription (transcription.json).
export const DURATION_S = 69.3;
export const TOTAL_FRAMES = sec(DURATION_S);

const DIR = "008-jet-b";
const VIDEO = `${DIR}/rushes/original/original.mov`;
const VOICE = `${DIR}/rushes/original/voix.wav`;
const A = (f: string) => `${DIR}/assets/${f}`;

// Effet miroir : plages calées sur les coupes du rush, hors plans avec écritures (hélico POLICE, boîte de gants, flacon, aspirateur).
const MIRRORS: [number, number][] = [
  [5.1, 12.93],
  [17.39, 24.86],
  [29.99, 34.79],
  [42.09, 51.05],
  [56.75, 62.9],
];


/* -------------------------------------------------- 6,9 – 10,2 s : trois frères et sœurs */
const Siblings: React.FC = () => {
  const { frame, at, lin } = useG();
  const cut = lin(9.0, 9.4);
  return (
    <Box top={300}>
      <div style={{ ...glass, borderRadius: 26, padding: "20px 30px 22px", display: "inline-flex", flexDirection: "column", gap: 14 }}>
        <Label>Trois frères et sœurs</Label>
        <div style={{ display: "flex", alignItems: "center" }}>
          {[7.66, 7.78, 8.28].map((t, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div style={{ width: 70, height: 4, position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: 3, width: 32 - cut * 10, background: frame > at(9.0) ? RED_SOFT : GOLD }} />
                  <div style={{ position: "absolute", right: 0, top: 0, height: 3, width: 32 - cut * 10, background: frame > at(9.0) ? RED_SOFT : GOLD }} />
                </div>
              )}
              <Appear t={t}>
                <div style={{ width: 84, height: 84, borderRadius: 84, border: `1.5px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(217,189,132,0.08)" }}>
                  {I.people({ size: 46 })}
                </div>
              </Appear>
            </React.Fragment>
          ))}
        </div>
        <Appear t={9.0}>
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 32, color: RED_SOFT }}>Ils ne se parlent plus</div>
        </Appear>
      </div>
    </Box>
  );
};

export const Video008: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
    <LuxeFootage video={VIDEO} mirrors={MIRRORS} />

    <G from={0.0} to={2.9} name="500 000 €">
      <BigNumber top={300} t0={0.0} t1={0.9} to={500000} suffix=" €" label="Le prix de l'avion" sub="nettoyé mardi" subT={1.92} />
    </G>
    <G from={3.0} to={6.8} name="Pas un jet privé">
      <ListCard
        top={300}
        rows={[
          { t: 3.42, text: "Pas un jet privé", mark: "cross" },
          { t: 4.48, text: "Un vieil avion à hélices", mark: "dot" },
          { t: 5.88, text: "Sièges en cuir marron", mark: "dot" },
        ]}
      />
    </G>
    <G from={6.86} to={10.2} name="Fratrie"><Siblings /></G>
    <G from={10.26} to={12.6} name="Appel de l'aîné">
      <CallCard top={300} name="L'aîné" sub="appel entrant" />
    </G>
    <G from={12.64} to={14.0} name="Père décédé">
      <Tag top={300} label="Leur père" text="Décédé au printemps" />
    </G>
    <G from={14.04} to={18.28} name="Héritage">
      <ListCard
        top={300}
        label="Héritage · 3 parts"
        rows={[
          { t: 15.62, text: "L'aîné : vendre", mark: "dot" },
          { t: 16.28, text: "La sœur : vendre", mark: "dot" },
          { t: 17.54, text: "Le petit frère : refuse", mark: "cross" },
        ]}
      />
    </G>
    <G from={18.32} to={21.9} name="Acheteur samedi">
      <Tag top={300} icon={I.cal({})} label="Samedi" text="Un acheteur vient le voir" sub="Il doit être impeccable" subT={20.7} />
    </G>
    <G from={21.94} to={25.4} name="Aérodrome">
      <Tag top={300} icon={I.pin({})} label="Petit aérodrome" text="Dans un hangar" sub="sous une bâche" subT={24.62} />
    </G>
    <G from={25.44} to={27.84} name="Magnifique mais vieux">
      <SerifLine
        top={310}
        parts={[
          { t: 26.52, text: "Vraiment magnifique…" },
          { t: 27.58, text: "mais vieux.", gold: true },
        ]}
      />
    </G>
    <G from={27.86} to={32.65} name="Usure">
      <ListCard
        top={300}
        label="Les traces du temps"
        rows={[
          { t: 28.26, text: "Cuir un peu craquelé", mark: "dot" },
          { t: 29.54, text: "Tableau de bord en bois usé", mark: "dot" },
          { t: 31.2, text: "Là où l'on pose les mains", mark: "dot" },
        ]}
      />
    </G>
    <G from={32.7} to={34.85} name="Quelqu'un l'avait aimé">
      <SerifLine
        top={310}
        parts={[
          { t: 32.86, text: "Quelqu'un l'avait aimé" },
          { t: 34.04, text: "pendant longtemps.", gold: true },
        ]}
      />
    </G>
    <G from={34.9} to={39.35} name="Les sièges">
      <ListCard
        top={300}
        label="Les sièges"
        rows={[
          { t: 36.32, text: "Cuir nourri", mark: "check" },
          { t: 37.3, text: "Coutures nettoyées", mark: "check" },
          { t: 38.28, text: "Tous les recoins", mark: "check" },
        ]}
      />
    </G>
    <G from={35.6} to={39.6} name="CTA like">
      <CTA kind="like" text="Like si tu veux la fin" />
    </G>
    <G from={39.4} to={47.15} name="Carnet de vol">
      <ListCard
        top={300}
        label="Poche du siège pilote"
        rows={[
          { t: 41.98, text: <span style={{ color: GOLD }}>Un carnet de vol</span>, mark: "dot" },
          { t: 42.94, text: "Des centaines de pages", mark: "dot" },
          { t: 44.24, text: "Écrites à la main", mark: "dot" },
          { t: 45.0, text: "Dates · destinations · météo", mark: "dot" },
        ]}
      />
    </G>
    <G from={47.22} to={50.85} name="Un prénom">
      <Tag top={300} icon={I.book({})} label="À côté de certains vols" text="Toujours le même prénom" sub="celui du petit frère" subT={49.86} />
    </G>
    <G from={50.9} to={57.3} name="Premier vol (fort)">
      <Note
        top={300}
        width={800}
        size={50}
        header="CARNET DE VOL"
        lines={[
          { t: 50.9, text: "Premier vol avec lui." },
          { t: 52.04, text: "Il avait 6 ans." },
          { t: 53.28, text: "Il a tenu le manche tout seul." },
          { t: 54.98, text: "Il veut devenir pilote." },
        ]}
      />
    </G>
    <G from={58.48} to={60.85} name="Dernière page">
      <Tag top={300} icon={I.book({})} label="Dernière page" text="Une écriture qui tremble" />
    </G>
    <G from={60.88} to={63.6} name="3 semaines avant">
      <Tag top={300} icon={I.cal({})} label="Daté" text="3 semaines avant le décès" sub="Une seule phrase" subT={62.88} />
    </G>
    <G from={63.7} to={67.2} name="La phrase (fort)">
      <Note
        top={300}
        width={820}
        size={58}
        shaky
        rotate={-2}
        lines={[
          { t: 63.8, text: "Si je pars, l'avion" },
          { t: 64.78, text: "doit rester à celui" },
          { t: 65.38, text: "qui le fera encore voler." },
        ]}
      />
    </G>
    <G from={67.24} to={DURATION_S} name="Pas de signature">
      <SerifLine
        top={310}
        parts={[
          { t: 67.24, text: "Pas de signature." },
          { t: 68.34, text: "Juste ça.", gold: true },
        ]}
      />
    </G>

    {/* Son : voix off + bruitages légers */}
    <Audio src={staticFile(VOICE)} />
    {MIRRORS.flat().map((t) => <Sfx key={`w${t}`} src={A("whoosh.wav")} t={t - 0.18} volume={0.35} />)}
    {[3.0, 6.86, 12.64, 14.04, 18.32, 21.94, 27.86, 34.9, 39.6, 47.22, 58.48, 60.88].map((t) => (
      <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.48} />
    ))}
    {[4.48, 5.88, 15.62, 16.28, 28.26, 29.54, 31.2, 42.94, 44.24, 45.0, 7.66, 7.78, 8.28].map((t) => (
      <Sfx key={`t${t}`} src={A("tick.wav")} t={t} volume={0.35} len={0.4} />
    ))}
    {[36.32, 37.3, 38.28].map((t) => <Sfx key={`d${t}`} src={A("ding.wav")} t={t} volume={0.31} />)}
    <Sfx src={A("cash.wav")} t={0.62} volume={0.66} />
    <Sfx src={A("impact.wav")} t={9.0} volume={0.4} />
    <Sfx src={A("notif.wav")} t={10.26} volume={0.55} />
    <Sfx src={A("impact.wav")} t={17.54} volume={0.44} />
    <Sfx src={A("cash.wav")} t={18.52} volume={0.31} />
    <Sfx src={A("impact.wav")} t={41.98} volume={0.53} />
    <Sfx src={A("whoosh.wav")} t={50.75} volume={0.44} />
    <Sfx src={A("heartbeat.wav")} t={60.88} volume={0.28} len={6.3} />
    <Sfx src={A("whoosh.wav")} t={63.6} volume={0.44} />
  </AbsoluteFill>
);
