import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Footage, type Cut, type Punch as Zoom } from "./Footage";
import { Sfx, sec } from "./kit";

// Squelette commun des vidéos « histoire + voix off Maxime » (016 → 021) :
// rush remodelé (miroir à chaque coupe), aucun filtre, voix off, petit fond sonore, bruitages.
export type Sfxs = { pop?: number[]; impact?: number[]; notif?: number[]; ring?: number[]; cash?: number[]; ding?: number[]; splat?: number[]; tick?: number[] };

export const cutsFrom = (times: number[]): Cut[] => times.map((t, i) => ({ t, type: (["whip", "zoom", "flash"] as const)[i % 3] }));

export const StoryVideo: React.FC<{
  dir: string;
  cuts: Cut[];
  zooms: Zoom[];
  sfx: Sfxs;
  tension?: [number, number];
  ambiance?: number | ((t: number) => number);
  whoosh?: number;
  children: React.ReactNode;
}> = ({ dir, cuts, zooms, sfx, tension, ambiance = 0.06, whoosh = 0.15, children }) => {
  const A = (f: string) => `${dir}/assets/${f}`;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
      <Footage video={`${dir}/rushes/original/travail.mp4`} cuts={cuts} punches={zooms} clean />
      {children}
      <Audio src={staticFile(A("voix.wav"))} volume={1} />
      <Audio src={staticFile(`${dir}/rushes/original/ambiance.wav`)} volume={typeof ambiance === "number" ? ambiance : (f: number) => ambiance(f / 30)} />
      {tension && (
        <Sequence from={sec(tension[0])} durationInFrames={sec(tension[1] - tension[0])} name="cœur" layout="none">
          <Audio src={staticFile(A("heartbeat.wav"))} volume={0.2} />
        </Sequence>
      )}
      {cuts.map((c) => <Sfx key={`w${c.t}`} src={A("whoosh.wav")} t={c.t - 0.2} volume={whoosh} />)}
      {(sfx.pop ?? []).map((t) => <Sfx key={`p${t}`} src={A("pop.wav")} t={t} volume={0.2} />)}
      {(sfx.impact ?? []).map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t} volume={0.24} />)}
      {(sfx.notif ?? []).map((t) => <Sfx key={`n${t}`} src={A("notif.wav")} t={t} volume={0.18} />)}
      {(sfx.ring ?? []).map((t) => <Sfx key={`r${t}`} src={A("ring.wav")} t={t} volume={0.16} len={1.5} />)}
      {(sfx.cash ?? []).map((t) => <Sfx key={`c${t}`} src={A("cash.wav")} t={t} volume={0.18} />)}
      {(sfx.ding ?? []).map((t) => <Sfx key={`d${t}`} src={A("ding.wav")} t={t} volume={0.16} />)}
      {(sfx.splat ?? []).map((t) => <Sfx key={`s${t}`} src={A("splat.wav")} t={t} volume={0.2} />)}
      {(sfx.tick ?? []).map((t) => <Sfx key={`k${t}`} src={A("tick.wav")} t={t} volume={0.16} len={1.5} />)}
    </AbsoluteFill>
  );
};
