import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { Sfx, sec } from "../_shared/kit";
import { Captions } from "./Captions";
import { Scenes } from "./Scenes";
import { CX, TOTAL_FRAMES, cut, w } from "./timeline";

// Vidéo 009 — « Tes muscles ne grossissent pas à la salle »
// Explication 100 % animée (2D), calée sur la voix off générée (voix.ts).
export { TOTAL_FRAMES };
export const FPS = 30;

const DIR = "009-muscles-grossissent";
const A = (f: string) => `${DIR}/assets/${f}`;

const WHOOSH = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 17].map(cut);
const IMPACTS = [w(0, 4), w(1, 8), w(4, 9), w(5, 14), w(7, 7), w(9, 6), w(10, 5), w(16, 6), w(16, 13), w(17, 0), w(6, 15), w(6, 4)];
const POPS = [
  w(0, 0), w(0, 1), w(0, 3), w(2, 1), w(3, 1), w(3, 4), w(4, 2), w(5, 1), w(5, 4), w(5, 8), w(7, 2), w(8, 1), w(8, 3), w(8, 8), w(8, 12),
  w(10, 0), w(10, 2), w(10, 13), w(12, 0), w(12, 3), w(12, 5), w(14, 0), w(14, 14), w(15, 1), w(15, 4), w(16, 2), w(16, 7), w(16, 10), w(17, 5), w(6, 7), w(11, 2), w(11, 5), w(13, 1),
];

const Fond: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0D" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 900px at ${CX}px 780px, rgba(225,6,0,0.16), rgba(225,6,0,0) 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 2.5px, transparent 3px)",
          backgroundSize: "60px 60px",
          backgroundPosition: `${(frame * 0.4) % 60}px ${(frame * 0.4) % 60}px`,
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(closest-side at 50% 45%, transparent 55%, rgba(0,0,0,0.55))" }} />
    </AbsoluteFill>
  );
};

const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 276, left: 70, width: 830, height: 7, borderRadius: 7, background: "rgba(255,255,255,0.14)" }}>
      <div style={{ width: `${(frame / TOTAL_FRAMES) * 100}%`, height: "100%", borderRadius: 7, background: "#E10600" }} />
    </div>
  );
};

export const Video009: React.FC<{ musique?: boolean }> = ({ musique = true }) => (
  <AbsoluteFill>
    <Fond />
    <Scenes />
    <Progress />
    <Captions />
    <Audio src={staticFile(A("voix.wav"))} volume={1} />
    {musique && <Audio src={staticFile(A("musique.wav"))} volume={0.2} />}
    {WHOOSH.map((t) => <Sfx key={`w${t}`} src={A("whoosh.wav")} t={t - 0.12} volume={0.22} />)}
    {IMPACTS.map((t) => <Sfx key={`i${t}`} src={A("impact.wav")} t={t - 0.03} volume={0.3} len={1.5} />)}
    {POPS.map((t) => <Sfx key={`p${t}`} src={A("pop.wav")} t={t - 0.02} volume={0.3} />)}
  </AbsoluteFill>
);
