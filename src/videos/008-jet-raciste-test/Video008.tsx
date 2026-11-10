import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from "remotion";
import { Clip } from "./Clip";
import { Clock, Contract, Message, Poll, Quote, Tag, TestMark } from "./Graphics";
import { BEATS as B, DIR, SEGMENTS, TOTAL_FRAMES, sec } from "./timeline";

const sfx = (name: string) => staticFile(`${DIR}/assets/${name}.wav`);

/** Graphique affiché de `from` à `to` (secondes du montage). */
const At: React.FC<{ from: number; to: number; name: string; children: (dur: number) => React.ReactNode }> = ({
  from,
  to,
  name,
  children,
}) => {
  const dur = sec(to) - sec(from);
  return (
    <Sequence from={sec(from)} durationInFrames={dur} name={name} layout="none">
      {children(dur)}
    </Sequence>
  );
};

/** Bruitage ponctuel à la seconde `t` du montage. */
const Sfx: React.FC<{ t: number; name: string; volume: number; len?: number }> = ({ t, name, volume, len = 2 }) => (
  <Sequence from={Math.max(0, sec(t))} durationInFrames={sec(len)} name={`son ${name}`} layout="none">
    <Audio src={sfx(name)} volume={volume} />
  </Sequence>
);

/** textes=false : pas d'habillage lié au script (il sera calé sur la voix off quand elle arrivera). */
export const Video008: React.FC<{ musique?: number; test?: boolean; textes?: boolean }> = ({
  musique = 0.55,
  test = false,
  textes = false,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
      {/* Plans */}
      {SEGMENTS.map((seg) => (
        <Sequence key={seg.id} from={seg.start} durationInFrames={seg.duration} name={`${seg.id} ${seg.note}`}>
          <Clip seg={seg} />
        </Sequence>
      ))}

      {textes && (
        <>
      {/* ACCROCHE */}
      <At from={0.3} to={B.hookEnd - 0.2} name="Interdit à bord">
        {(d) => <Tag label="Interdit à bord" sub="Mon collègue. À cause de sa couleur de peau." dur={d} />}
      </At>

      {/* MISE EN PLACE */}
      <At from={B.polo} to={B.restes - 0.3} name="Karim">
        {(d) => <Tag label="Karim · K. Benali" sub="Mon collègue" dur={d} />}
      </At>
      <At from={B.restes} to={B.rampe - 0.2} name="Toi, tu restes en bas">
        {(d) => <Quote text="Toi, tu restes en bas. Et tu touches à rien." who="Le propriétaire" dur={d} />}
      </At>
      <At from={B.rampe} to={B.choque} name="La rampe">
        {(d) => <Tag label="La rampe" sub="Là où Karim a posé sa main" dur={d} />}
      </At>
      <At from={B.telephone} to={B.benali - 0.1} name="Contrat">
        {(d) => <Contract dur={d} />}
      </At>
      <At from={B.telephone} to={B.benali - 0.1} name="Au téléphone">
        {(d) => <Tag label="Au téléphone" sub="Le contrat de sa vie, signé à bord" dur={d} />}
      </At>
      <At from={B.benali} to={B.message + 0.2} name="M. Benali">
        {(d) => <Tag label="M. Benali" sub="Atterrissage prévu à 17h" dur={d} />}
      </At>
      <At from={B.message} to={B.lien + 1.2} name="Message de Karim">
        {(d) => <Message from="Karim" text="Je pars à 17h, mon père arrive." dur={d} />}
      </At>

      {/* TENSION */}
      <At from={B.h17} to={B.homme - 0.2} name="17:00">
        {(d) => <Clock dur={d} />}
      </At>
      <At from={B.fils} to={B.blanc + 1.2} name="Mon fils m'a dit…">
        {(d) => (
          <Quote text="Mon fils m'a dit qu'il avait pas le droit de monter dans votre avion." who="Le père de Karim" dur={d} />
        )}
      </At>

      {/* RÉSOLUTION */}
      <At from={B.microfibre} to={B.silence} name="La rampe (rappel)">
        {(d) => <Tag label="La rampe" sub="Pile là où il avait mis la main" dur={d} />}
      </At>
      <At from={B.touche} to={B.contrat} name="Je touche à rien">
        {(d) => <Quote text="T'inquiète. Je touche à rien." who="Karim" dur={d} />}
      </At>
      <At from={B.contrat} to={B.question} name="Contrat envolé">
        {(d) => <Contract dur={d} struckAt={12} />}
      </At>

      {/* QUESTION */}
      <At from={B.question} to={TOTAL_FRAMES / 30} name="Question">
        {(d) => <Poll dur={d + 10} />}
      </At>

        </>
      )}

      {test && <TestMark />}

      {/* SON — musique d'ambiance (silence avant « Je touche à rien ») */}
      {musique > 0 && (
        <Audio
          src={sfx("musique")}
          volume={(f) => musique * interpolate(f, [0, 10, TOTAL_FRAMES - 45, TOTAL_FRAMES], [0, 1, 1, 0], { extrapolateRight: "clamp" })}
        />
      )}

      {/* Transitions : whoosh discrets, reflets dorés */}
      {SEGMENTS.filter((s) => s.fx === "whip").map((s) => (
        <Sfx key={`w${s.id}`} t={s.start / 30 - 0.15} name="whoosh" volume={0.22} len={1} />
      ))}
      {SEGMENTS.filter((s) => s.fx === "flip" || s.fx === "mirror").map((s) => (
        <Sfx key={`s${s.id}`} t={s.start / 30 - 0.1} name="swish" volume={0.18} len={1} />
      ))}
      {SEGMENTS.filter((s) => s.fx === "gold").map((s) => (
        <Sfx key={`g${s.id}`} t={s.start / 30} name="shine" volume={0.3} len={1.3} />
      ))}

      {/* Moments de l'histoire (seulement avec les textes, calés sur la voix) */}
      {textes && (
        <>
      <Sfx t={B.message} name="message" volume={0.5} len={1} />
      <Sfx t={B.h17 + 0.45} name="tick" volume={0.35} len={1.5} />
      <Sequence from={sec(B.lien)} durationInFrames={sec(B.blanc - B.lien)} name="son drone" layout="none">
        <Audio
          src={sfx("drone")}
          volume={(f) => 0.22 * interpolate(f, [0, 30, sec(B.blanc - B.lien) - 30, sec(B.blanc - B.lien)], [0, 1, 1, 0], { extrapolateRight: "clamp" })}
        />
      </Sequence>
      <Sequence from={sec(B.homme)} durationInFrames={sec(B.fils - B.homme)} name="son cœur" layout="none">
        <Audio src={sfx("heartbeat")} volume={0.32} />
      </Sequence>
      <Sfx t={B.fils} name="impact" volume={0.3} />
      <Sfx t={B.blanc} name="impact" volume={0.22} />
      <Sfx t={B.touche} name="ding" volume={0.35} />
      <Sfx t={B.contrat + 0.4} name="whoosh" volume={0.25} len={1} />
      <Sfx t={B.question + 0.5} name="pop" volume={0.25} len={0.5} />
      <Sfx t={B.question + 0.75} name="pop" volume={0.25} len={0.5} />
        </>
      )}
    </AbsoluteFill>
  );
};
