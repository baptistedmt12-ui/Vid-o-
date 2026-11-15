import React from "react";
import { Easing, interpolate, interpolateColors, spring } from "remotion";
import { ClockIcon } from "../_shared/icons";
import { BODY, Cross, G, GREEN, IconDot, Pill, RED, Stamp, TITLE, clamp, useG } from "../_shared/kit";
import { Perso } from "./Perso";
import { CX, cut, s, w } from "./timeline";
import { Bar, Bed, Big, Brain, Cone, Dumbbell, Header, Label, MUSCLE, MUSCLE_D, Plate, Scn, Svg, Words } from "./ui";
import { DUREE } from "./voix";

const out = Easing.out(Easing.cubic);

// ───── 1. Accroche + fatigue ─────
const Hook: React.FC = () => {
  const { frame, fps, lin, pop } = useG();
  const t = frame / fps;
  const tired = lin(s(1), w(1, 8));
  const amp = 68 - 46 * tired;
  const mid = 72 - 34 * tired;
  const ph = t * Math.PI * 2 * 0.85;
  const titleOut = lin(cut(1) - 0.15, cut(1) + 0.1);
  const energy = 1 - 0.8 * lin(w(1, 0), w(1, 8) + 0.4, out);
  const col = interpolateColors(energy, [0.2, 0.6, 1], [RED, "#FFB020", GREEN]);
  return (
    <Scn>
      <Svg>
        <Perso
          x={CX}
          y={1245}
          scale={0.95}
          dumbbells
          armL={[6, mid + amp * Math.sin(ph)]}
          armR={[6, mid - amp * Math.sin(ph)]}
          flex={0.5 + 0.5 * Math.sin(ph)}
          mood={tired > 0.4 ? "tired" : "ok"}
          bob={Math.sin(ph * 2) * 3 + tired * 8}
          sweat={tired > 0.15 ? t : 0}
        />
      </Svg>
      <div style={{ opacity: 1 - titleOut, transform: `translateY(${-titleOut * 60}px)` }}>
        <Words top={310} size={122} items={[{ t: w(0, 0), text: "TES" }, { t: w(0, 1), text: "MUSCLES" }]} />
        <Words top={446} size={104} items={[{ t: w(0, 2), text: "NE" }, { t: w(0, 3), text: "GROSSISSENT" }]} />
        <Words
          top={562}
          size={122}
          items={[
            { t: w(0, 4), text: "PAS", color: RED },
            { t: w(0, 5), text: "À LA SALLE" },
          ]}
        />
      </div>
      <Bar top={330} value={energy} color={col} label="ÉNERGIE DU MUSCLE" right={`${Math.round(energy * 100)} %`} t={w(1, 0)} />
      {pop(w(1, 4)) > 0.01 && <Label t={w(1, 4)} top={470} size={36}>PENDANT LA SÉANCE : L'INVERSE</Label>}
      <div style={{ position: "absolute", top: 548, left: CX - 400, width: 800, textAlign: "center" }}>
        <Stamp t={w(1, 8)} text="FATIGUÉS" size={92} rotate={-6} />
      </div>
    </Scn>
  );
};

// ───── 2. Question ─────
const Question: React.FC = () => {
  const { frame, pop } = useG();
  const k = pop(s(2), 9, 200);
  return (
    <Scn>
      <div
        style={{
          position: "absolute",
          top: 330,
          left: CX - 300,
          width: 600,
          textAlign: "center",
          fontFamily: TITLE,
          fontSize: 560,
          lineHeight: 1,
          color: RED,
          transform: `scale(${k}) rotate(${Math.sin(frame / 7) * 5}deg)`,
          textShadow: "0 16px 0 rgba(0,0,0,0.4), 0 0 120px rgba(225,6,0,0.45)",
        }}
      >
        ?
      </div>
      <Big t={w(2, 1)} top={930} size={104}>COMMENT ÇA MARCHE</Big>
      <Big t={w(2, 4)} top={1050} size={132} color={RED} rotate={-3}>VRAIMENT ?</Big>
    </Scn>
  );
};

// ───── 3. Fibres ─────
const FIBRES = (() => {
  const pts: { x: number; y: number; d: number }[] = [];
  const r = 21;
  for (let j = -6; j <= 6; j++)
    for (let i = -6; i <= 6; i++) {
      const x = i * r * 2.12 + (j % 2 ? r * 1.06 : 0);
      const y = j * r * 1.84;
      const d = Math.hypot(x, y);
      if (d < 180) pts.push({ x, y, d });
    }
  return pts.sort((a, b) => a.d - b.d);
})();

const Spindle: React.FC<{ strands: number }> = ({ strands }) => (
  <g>
    <rect x={-400} y={-20} width={90} height={40} rx={16} fill="#F1E9E2" />
    <rect x={310} y={-20} width={90} height={40} rx={16} fill="#F1E9E2" />
    <path d="M-340 0 C-220 -128 220 -128 340 0 C220 128 -220 128 -340 0Z" fill={MUSCLE} />
    <path d="M-250 -50 C-120 -100 120 -100 250 -50" stroke="rgba(255,255,255,0.35)" strokeWidth={12} fill="none" strokeLinecap="round" />
    {[-66, -40, -14, 14, 40, 66].map((o, i) => (
      <path
        key={i}
        d={`M-325 ${o * 0.12} C-200 ${o * 1.5} 200 ${o * 1.5} 325 ${o * 0.12}`}
        stroke={MUSCLE_D}
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - Math.min(1, Math.max(0, strands * 1.5 - i * 0.1))}
      />
    ))}
  </g>
);

const Fibres: React.FC = () => {
  const { pop, lin, frame, fps, at } = useG();
  const m = pop(w(3, 1), 12, 170);
  const lens = pop(w(3, 3), 13, 150);
  const strands = lin(w(3, 7), w(3, 12) + 0.3);
  return (
    <Scn>
      <Label t={w(3, 0)} top={320} size={44} color="#fff">UN MUSCLE</Label>
      <Svg>
        <g transform={`translate(${CX},520) scale(${m})`}>
          <Spindle strands={strands} />
        </g>
        <g opacity={lens * 0.45}>
          <line x1={CX - 50} y1={612} x2={CX - 170} y2={790} stroke="#fff" strokeWidth={5} strokeDasharray="14 12" />
          <line x1={CX + 50} y1={612} x2={CX + 170} y2={790} stroke="#fff" strokeWidth={5} strokeDasharray="14 12" />
        </g>
        <g transform={`translate(${CX},955) scale(${lens})`}>
          <circle r={214} fill="#3A0C12" stroke="#fff" strokeWidth={12} />
          {FIBRES.map((p, i) => {
            const k = spring({ frame: frame - at(w(3, 4)) - i * 0.45, fps, config: { damping: 11, stiffness: 220 } });
            return <circle key={i} cx={p.x} cy={p.y} r={19 * k} fill={MUSCLE} stroke={MUSCLE_D} strokeWidth={3} />;
          })}
        </g>
      </Svg>
      <Pill top={1182} tone="white" text="DES MILLIERS DE FIBRES" enterAt={w(3, 4)} size={42} />
    </Scn>
  );
};

// ───── 4. Tension ─────
const Strands: React.FC<{ x: number; y: number; half: number; n: number; gap: number; k: number; clampH?: number; thick?: number }> = ({
  x,
  y,
  half,
  n,
  gap,
  k,
  clampH,
  thick = 20,
}) => {
  const { frame } = useG();
  const hgt = clampH ?? (n - 1) * gap + 90;
  const col = interpolateColors(k, [0, 1], [MUSCLE, "#FF2A1F"]);
  return (
    <g transform={`translate(${x},${y})`}>
      {Array.from({ length: n }).map((_, i) => {
        const yy = (i - (n - 1) / 2) * gap;
        const v = Math.sin(frame * 1.7 + i * 2.1) * 7 * k;
        return (
          <path
            key={i}
            d={`M${-half} ${yy} Q0 ${yy + v} ${half} ${yy}`}
            stroke={col}
            strokeWidth={thick - thick * 0.3 * k}
            fill="none"
            strokeLinecap="round"
            style={{ filter: k > 0.3 ? `drop-shadow(0 0 ${14 * k}px rgba(255,42,31,0.8))` : undefined }}
          />
        );
      })}
      <rect x={-half - 46} y={-hgt / 2} width={52} height={hgt} rx={16} fill="#8A909B" />
      <rect x={half - 6} y={-hgt / 2} width={52} height={hgt} rx={16} fill="#8A909B" />
    </g>
  );
};

const Arrow: React.FC<{ x: number; y: number; dir: 1 | -1; k: number }> = ({ x, y, dir, k }) => (
  <g transform={`translate(${x},${y}) scale(${dir * k},${k})`}>
    <path d="M0 -14 H44 V-34 L88 0 L44 34 V14 H0Z" fill="#fff" />
  </g>
);

const Tension: React.FC = () => {
  const { pop, frame } = useG();
  const drop = pop(w(4, 2), 10, 160);
  const k = pop(w(4, 3), 14, 90);
  const half = 235 + 85 * k;
  const push = Math.sin(frame / 4) * 8;
  return (
    <Scn>
      <Label t={s(4)} top={318} size={40}>QUAND TU SOULÈVES LOURD</Label>
      <Svg>
        <g transform={`translate(${CX},${interpolate(drop, [0, 1], [240, 490])})`} opacity={Math.min(1, drop * 2)}>
          <Dumbbell s={1.5} />
        </g>
        <Strands x={CX} y={850} half={half} n={7} gap={44} k={k} />
        <Arrow x={CX + half + 62 + push * k} y={850} dir={1} k={Math.min(1, k * 1.4) * 0.8} />
        <Arrow x={CX - half - 62 - push * k} y={850} dir={-1} k={Math.min(1, k * 1.4) * 0.8} />
      </Svg>
      <Label t={w(4, 4)} top={610} size={40} color="#fff">CHAQUE FIBRE</Label>
      <Big t={w(4, 9)} top={1070} size={150} color={RED} rotate={-3}>TENSION</Big>
    </Scn>
  );
};

// ───── 5. Signal ─────
const Signal: React.FC = () => {
  const { pop, frame, fps, at } = useG();
  const t0 = at(w(5, 4));
  const brain = pop(w(5, 4), 11, 190);
  const x0 = 318;
  const x1 = 612;
  return (
    <Scn>
      <Words
        top={310}
        size={124}
        items={[
          { t: w(5, 1), text: "TENSION" },
          { t: w(5, 2), text: "=", color: "rgba(255,255,255,0.6)" },
          { t: w(5, 4), text: "SIGNAL", color: RED },
        ]}
      />
      <Svg>
        <Strands x={205} y={680} half={85} n={5} gap={34} k={1} thick={15} />
        <line x1={x0} y1={680} x2={x1} y2={680} stroke="rgba(255,255,255,0.3)" strokeWidth={6} strokeDasharray="4 20" strokeLinecap="round" />
        {frame > t0 &&
          [0, 1, 2].map((i) => {
            const p = ((frame - t0) / fps / 0.9 + i / 3) % 1;
            return <circle key={i} cx={x0 + (x1 - x0) * p} cy={680} r={17} fill={RED} opacity={Math.sin(p * Math.PI)} style={{ filter: "drop-shadow(0 0 14px rgba(225,6,0,0.9))" }} />;
          })}
        <g transform={`translate(725,680) scale(${brain})`}>
          {[0, 1].map((i) => {
            const p = ((frame - t0) / fps / 0.9 + i / 2) % 1;
            return <circle key={i} r={112 + p * 50} fill="none" stroke={RED} strokeWidth={6} opacity={(1 - p) * 0.7} />;
          })}
          <circle r={112} fill="#1B1B21" stroke="#fff" strokeWidth={8} />
          <Brain s={1.05} />
        </g>
      </Svg>
      <Label t={w(5, 1)} top={800} size={30}>
        <span style={{ display: "block", width: 300, marginLeft: 0, textAlign: "center" }}>FIBRES</span>
      </Label>
      <div style={{ position: "absolute", top: 812, left: 575, width: 300, textAlign: "center", fontFamily: BODY, fontWeight: 800, fontSize: 30, letterSpacing: 3, color: "rgba(255,255,255,0.78)", opacity: Math.min(1, brain * 2) }}>
        TON CORPS
      </div>
      <Pill top={905} tone="white" text="La prochaine fois, il faudra être…" enterAt={w(5, 8)} size={38} />
      <Big t={w(5, 14)} top={1010} size={190} color={RED} rotate={-3}>PLUS FORT</Big>
    </Scn>
  );
};

// ───── 5 bis. Pas besoin de courbatures : des séries proches de l'échec ─────
const Echec: React.FC = () => {
  const { pop, lin, frame, fps, at } = useG();
  const barre = lin(w(6, 4) + 0.3, w(6, 6));
  const N = 10;
  const fill = lin(w(6, 10), w(6, 15) + 0.2, Easing.linear) * N;
  const dur = lin(w(6, 12), w(6, 17), out);
  return (
    <Scn>
      <Label t={w(6, 1)} top={318} size={42}>PAS BESOIN DE</Label>
      <Big t={w(6, 4)} top={372} size={128}>COURBATURES</Big>
      <div style={{ position: "absolute", top: 440, left: CX - 400, width: 800 * barre, height: 14, borderRadius: 14, background: RED, transform: "rotate(-3deg)", transformOrigin: "0 50%" }} />
      <Label t={w(6, 7)} top={640} size={42} color="#fff">CE QUI COMPTE</Label>
      <Svg>
        {Array.from({ length: N }).map((_, i) => {
          const k = spring({ frame: frame - at(s(6)) - 4 - i * 1.5, fps, config: { damping: 12, stiffness: 200 } });
          const on = Math.min(1, Math.max(0, fill - i));
          const dure = i >= N - 3;
          const sh = dure && on > 0.5 ? Math.sin(frame * 1.9 + i) * 4 : 0;
          return (
            <g key={i} transform={`translate(${CX - 9 * 39 + i * 78 + sh},800) scale(${k})`}>
              <circle r={31} fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth={4} />
              <circle r={31 * on} fill={dure ? RED : "#fff"} />
              <text y={11} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={30} fill={on > 0.5 ? (dure ? "#fff" : "#0B0B0D") : "rgba(255,255,255,0.5)"}>
                {i + 1}
              </text>
            </g>
          );
        })}
      </Svg>
      <Label t={w(6, 12)} top={860} size={30}>RÉPÉTITIONS D'UNE SÉRIE</Label>
      <Bar top={930} width={700} value={0.15 + 0.8 * dur} color={interpolateColors(dur, [0, 0.6, 1], [GREEN, "#FFB020", RED])} label="DIFFICULTÉ" right={dur > 0.9 ? "MAX" : ""} t={w(6, 12)} />
      <Big t={w(6, 15)} top={1080} size={112} color={RED} rotate={-3}>PROCHE DE L'ÉCHEC</Big>
    </Scn>
  );
};

// ───── 6. Le chantier ─────
const STRIPES = "repeating-linear-gradient(-45deg,#111 0 34px,#FFC400 34px 68px)";
const Chantier: React.FC = () => {
  const { pop, frame } = useG();
  const sign = pop(w(7, 7), 9, 150);
  const cones = pop(w(7, 8), 11, 200);
  const hook = pop(w(7, 7) + 0.25, 16, 70);
  return (
    <Scn>
      <Pill top={322} tone="white" icon={<IconDot size={70}><ClockIcon size={40} h={8} m={0} /></IconDot>} text="APRÈS LA SÉANCE" enterAt={w(7, 2)} size={46} />
      <div
        style={{
          position: "absolute",
          top: 520,
          left: CX - 370,
          width: 740,
          borderRadius: 30,
          overflow: "hidden",
          background: "#FFC400",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          opacity: Math.min(1, sign * 2),
          transformOrigin: "50% 0%",
          transform: `rotate(${interpolate(sign, [0, 1], [-28, -3]) + Math.sin(frame / 9) * 0.8}deg) scale(${interpolate(sign, [0, 1], [0.7, 1])})`,
        }}
      >
        <div style={{ height: 46, background: STRIPES }} />
        <div style={{ fontFamily: TITLE, fontSize: 160, lineHeight: 1.05, color: "#111", textAlign: "center", paddingTop: 10 }}>CHANTIER</div>
        <div style={{ fontFamily: TITLE, fontSize: 84, lineHeight: 1.1, color: "#111", textAlign: "center", paddingBottom: 14 }}>EN COURS</div>
        <div style={{ height: 46, background: STRIPES }} />
      </div>
      <Svg>
        <g opacity={Math.min(1, hook * 3)}>
          <line x1={CX} y1={930} x2={CX} y2={930 + 120 * hook} stroke="#C9CED6" strokeWidth={8} />
          <g transform={`translate(${CX},${930 + 120 * hook}) rotate(${Math.sin(frame / 8) * 3})`}>
            <rect x={-95} y={0} width={190} height={84} rx={16} fill={MUSCLE} stroke={MUSCLE_D} strokeWidth={6} />
            <path d="M-60 26 H60 M-60 56 H60" stroke={MUSCLE_D} strokeWidth={6} strokeLinecap="round" />
          </g>
        </g>
        <g transform={`translate(190,1190) scale(${cones})`}><Cone s={0.95} /></g>
        <g transform={`translate(780,1190) scale(${cones})`}><Cone s={0.95} /></g>
      </Svg>
    </Scn>
  );
};

// ───── 7. 24 à 48 h : synthèse des protéines ─────
const BLOCS = Array.from({ length: 16 }).map((_, i) => {
  const a = (i * 137.5 * Math.PI) / 180;
  return { x: Math.cos(a) * 385, y: Math.sin(a) * 250, r: (i * 47) % 90 };
});

const Synthese: React.FC = () => {
  const { pop, lin, frame, at, fps } = useG();
  const fill = lin(w(8, 0), cut(9) - 0.4, Easing.linear);
  const grow = pop(w(8, 12), 12, 90);
  const r = 100 + 62 * grow;
  const circ = pop(w(8, 0) + 0.2, 13, 170);
  const TW = 740;
  const p1out = lin(w(8, 12) - 0.25, w(8, 12));
  return (
    <Scn>
      <Words
        top={300}
        size={176}
        items={[
          { t: w(8, 1), text: "24", color: RED },
          { t: w(8, 2), text: "À" },
          { t: w(8, 3), text: "48 H", color: RED },
        ]}
      />
      <div style={{ position: "absolute", top: 540, left: CX - TW / 2, width: TW }}>
        <div style={{ height: 30, borderRadius: 30, background: "rgba(255,255,255,0.13)", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", width: "50%", height: "100%", background: "rgba(225,6,0,0.28)" }} />
          <div style={{ width: `${fill * 100}%`, height: "100%", background: "#fff", borderRadius: 30 }} />
        </div>
        {["SÉANCE", "24 H", "48 H"].map((l, i) => (
          <div
            key={l}
            style={{
              position: "absolute",
              top: 44,
              left: `${i * 50}%`,
              transform: `translateX(${i === 0 ? 0 : i === 1 ? -50 : -100}%)`,
              fontFamily: BODY,
              fontWeight: 800,
              fontSize: 32,
              letterSpacing: 2,
              whiteSpace: "nowrap",
              color: fill >= i * 0.5 - 0.01 ? "#fff" : "rgba(255,255,255,0.4)",
            }}
          >
            {l}
          </div>
        ))}
      </div>
      <Svg>
        <g transform={`translate(${CX},905)`}>
          <circle r={164} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={5} strokeDasharray="10 14" opacity={circ} />
          <circle r={r * circ} fill={MUSCLE} stroke={MUSCLE_D} strokeWidth={8} />
          <circle r={r * circ * 0.55} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={10} />
          {BLOCS.map((b, i) => {
            const p = interpolate(frame, [at(w(8, 7)) + i * 4.5, at(w(8, 7)) + i * 4.5 + 20], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
            if (p <= 0 || p >= 1) return null;
            return (
              <rect
                key={i}
                x={-17}
                y={-17}
                width={34}
                height={34}
                rx={9}
                fill="#fff"
                stroke={RED}
                strokeWidth={6}
                transform={`translate(${b.x * (1 - p)},${b.y * (1 - p)}) rotate(${b.r + p * 180}) scale(${1 - p * 0.3})`}
                opacity={Math.min(1, p * 5)}
              />
            );
          })}
        </g>
      </Svg>
      <div style={{ opacity: 1 - p1out }}>
        <Pill top={1150} tone="dark" text="+ NOUVELLES PROTÉINES" enterAt={w(8, 8)} size={42} />
      </div>
      <Pill top={1150} tone="red" text="FIBRE PLUS ÉPAISSE" enterAt={w(8, 12)} size={44} />
    </Scn>
  );
};

// ───── 8. Trois choses ─────
const Trois: React.FC = () => {
  const { pop } = useG();
  return (
    <Scn>
      <Label t={s(9)} top={400} size={46}>POUR ÇA, IL LUI FAUT</Label>
      <Big t={w(9, 6)} top={480} size={250}>
        <span style={{ color: RED }}>3</span> CHOSES
      </Big>
      {[0, 1, 2].map((i) => {
        const k = pop(w(9, 6) + 0.22 + i * 0.14, 9, 200);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 860,
              left: CX - 95 + (i - 1) * 245,
              width: 190,
              height: 190,
              borderRadius: 190,
              background: RED,
              fontFamily: TITLE,
              fontSize: 130,
              lineHeight: "190px",
              textAlign: "center",
              color: "#fff",
              transform: `scale(${k})`,
              boxShadow: "0 16px 50px rgba(225,6,0,0.45)",
            }}
          >
            {i + 1}
          </div>
        );
      })}
    </Scn>
  );
};

// ───── 9. Protéines ─────
const Proteines: React.FC = () => {
  const { pop, lin } = useG();
  const plate = pop(w(10, 2), 11, 170);
  const repas = lin(s(11) - 0.1, s(11) + 0.1);
  return (
    <Scn>
      <Header n={1} title="PROTÉINES" t={s(10)} t2={w(10, 1)} />
      <Svg>
        <g transform={`translate(${CX},660) scale(${plate}) rotate(${(1 - plate) * -40})`}>
          <Plate />
        </g>
      </Svg>
      <Big t={w(10, 5)} top={850} size={210} color={RED}>1,6 G</Big>
      <Label t={w(10, 9)} top={1078} size={42} color="#fff">PAR KILO · CHAQUE JOUR</Label>
      <div style={{ opacity: 1 - repas }}>
        <Pill top={1158} tone="white" text={<>70 kg&nbsp;&nbsp;→&nbsp;&nbsp;<span style={{ color: RED }}>112 g</span> par jour</>} enterAt={w(10, 13)} size={44} />
      </div>
      <Svg>
        {[0, 1, 2, 3].map((i) => {
          const k = pop(i < 3 ? w(11, 2) + i * 0.1 : w(11, 5), 10, 210);
          return (
            <g key={i} transform={`translate(${CX - 240 + i * 160},1212) scale(${k * 0.28})`} opacity={i === 3 ? 0.35 + 0.65 * k : 1}>
              <Plate />
            </g>
          );
        })}
      </Svg>
    </Scn>
  );
};

// ───── 10. Sommeil ─────
const Sommeil: React.FC = () => {
  const { pop, lin, frame, fps } = useG();
  const bed = pop(w(12, 1), 13, 150);
  const mal = lin(w(13, 2), w(13, 6), out);
  const rec = lin(w(12, 10), w(12, 16) + 0.3, out) * (1 - 0.72 * mal);
  const recCol = interpolateColors(mal, [0, 1], [GREEN, RED]);
  const t = frame / fps;
  return (
    <Scn>
      <Header n={2} title="SOMMEIL" t={s(12)} t2={w(12, 1)} />
      <Svg>
        <g transform={`translate(760,560) scale(${bed})`}>
          <circle r={62} fill="#FFD75E" />
          <circle cx={-26} cy={-14} r={54} fill="#0B0B0D" />
        </g>
        {[[640, 500, 0], [820, 690, 1.3], [560, 610, 2.2]].map(([x, y, o], i) => (
          <path key={i} d="M0 -14 Q2 -2 14 0 Q2 2 0 14 Q-2 2 -14 0 Q-2 -2 0 -14Z" fill="#FFD75E" transform={`translate(${x},${y}) scale(${(0.6 + 0.4 * Math.sin(t * 3 + o)) * bed})`} />
        ))}
        <g transform={`translate(${CX},${760 + (1 - bed) * 60})`} opacity={Math.min(1, bed * 2)}>
          <Bed s={1.05} />
        </g>
        {[0, 1, 2].map((i) => {
          const p = (t * 0.45 + i / 3) % 1;
          return (
            <text key={i} x={300 + p * 150} y={650 - p * 120} fontFamily={TITLE} fontSize={36 + p * 50} fill="#fff" opacity={Math.sin(p * Math.PI) * bed}>
              Z
            </text>
          );
        })}
      </Svg>
      <Words
        top={880}
        size={176}
        items={[
          { t: w(12, 3), text: "7", color: RED },
          { t: w(12, 4), text: "À" },
          { t: w(12, 5), text: "9 H", color: RED },
        ]}
      />
      <div style={{ opacity: 1 - lin(s(13) - 0.1, s(13) + 0.05) }}>
        <Label t={w(12, 7)} top={1072} size={42} color="#fff">PAR NUIT</Label>
      </div>
      <Label t={w(13, 1)} top={1072} size={42} color={RED}>TU DORS MAL ?</Label>
      <Bar top={1140} width={640} value={rec} color={recCol} label="RÉCUPÉRATION" right={`${Math.round(rec * 100)} %`} t={w(12, 10)} />
    </Scn>
  );
};

// ───── 11–12. Progression ─────
const Progression: React.FC = () => {
  const { pop, lin, frame, fps, at } = useG();
  const BASE = 1040;
  const BW = 92;
  const GAP = 32;
  const X0 = CX - (6 * BW + 5 * GAP) / 2;
  const flatOut = lin(cut(15) - 0.2, cut(15));
  const line = lin(w(15, 8), w(15, 10) + 0.5, out);
  const tops: [number, number][] = [];
  return (
    <Scn>
      <Header n={3} title="PROGRESSION" t={s(14)} t2={w(14, 1)} />
      <Svg>
        <line x1={X0 - 20} y1={BASE} x2={X0 + 6 * BW + 5 * GAP + 20} y2={BASE} stroke="rgba(255,255,255,0.35)" strokeWidth={5} strokeLinecap="round" />
        {Array.from({ length: 6 }).map((_, i) => {
          const a = spring({ frame: frame - at(w(14, 6)) - i * 4, fps, config: { damping: 14, stiffness: 150 } });
          const g = spring({ frame: frame - at(w(15, 0)) - i * 6, fps, config: { damping: 12, stiffness: 120 } });
          const h = (250 + i * 58 * g) * a;
          const x = X0 + i * (BW + GAP);
          tops.push([x + BW / 2, BASE - h]);
          const kg = 60 + 2.5 * i;
          return (
            <g key={i}>
              <rect x={x} y={BASE - h} width={BW} height={h} rx={14} fill={interpolateColors(i === 0 ? 0 : g, [0, 1], ["#5A5F6B", RED])} />
              <text x={x + BW / 2} y={BASE - h + 46} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={30} fill="#fff" opacity={a}>
                {g > 0.5 ? kg.toString().replace(".", ",") : 60}
              </text>
              <text x={x + BW / 2} y={BASE + 46} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={30} fill="rgba(255,255,255,0.6)" opacity={a}>
                S{i + 1}
              </text>
            </g>
          );
        })}
        {line > 0 && (
          <path
            d={`M${tops[0][0]} ${tops[0][1] - 40} L${tops[5][0]} ${tops[5][1] - 40}`}
            stroke={GREEN}
            strokeWidth={10}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - line}
          />
        )}
        {line > 0.95 && (
          <path d="M-26 6 L4 -22 L10 14Z" fill={GREEN} transform={`translate(${tops[5][0] + 8},${tops[5][1] - 46}) rotate(8) scale(1.5)`} />
        )}
      </Svg>
      <div style={{ position: "absolute", top: 690, left: X0 + 10, fontFamily: BODY, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: "rgba(255,255,255,0.5)", opacity: pop(w(14, 6)) * (1 - flatOut) }}>
        CHARGE (KG)
      </div>
      <div style={{ opacity: 1 - flatOut }}>
        <Pill top={1118} tone="dark" icon={<Cross k={pop(w(14, 14) + 0.1, 20, 160)} size={58} />} text="AUCUNE RAISON DE CHANGER" enterAt={w(14, 14)} size={36} />
      </div>
      <Pill top={1112} tone="white" text="+ 1 RÉPÉTITION" enterAt={w(15, 1)} size={33} x={CX - 205} />
      <Pill top={1112} tone="red" text="+ UN PEU DE POIDS" enterAt={w(15, 4)} size={33} x={CX + 185} />
      <div style={{ opacity: 1 - lin(w(15, 11) - 0.1, w(15, 11) + 0.05) }}>
        <Label t={w(15, 8)} top={1202} size={34} color="#fff">SEMAINE APRÈS SEMAINE</Label>
      </div>
      <Label t={w(15, 12)} top={1198} size={40} color={RED}>SURCHARGE PROGRESSIVE</Label>
    </Scn>
  );
};

// ───── 13. À retenir ─────
const Card: React.FC<{ top: number; t: number; children: React.ReactNode }> = ({ top, t, children }) => {
  const { pop } = useG();
  const k = pop(t, 13, 170);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: CX - 390,
        width: 780,
        height: 330,
        borderRadius: 36,
        background: "rgba(255,255,255,0.06)",
        border: "3px solid rgba(255,255,255,0.16)",
        opacity: Math.min(1, k * 2),
        transform: `translateY(${(1 - k) * 70}px) scale(${interpolate(k, [0, 1], [0.9, 1])})`,
      }}
    >
      {children}
    </div>
  );
};

const Recap: React.FC = () => {
  const { pop } = useG();
  const eq = (t: number): React.CSSProperties => {
    const k = pop(t, 10, 220);
    return {
      position: "absolute",
      left: 0,
      width: "100%",
      top: 178,
      textAlign: "center",
      fontFamily: TITLE,
      fontSize: 124,
      lineHeight: 1.05,
      color: RED,
      opacity: Math.min(1, k * 2),
      transform: `scale(${interpolate(k, [0, 1], [1.7, 1])})`,
    };
  };
  const line: React.CSSProperties = { position: "absolute", top: 34, left: 0, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 26, fontFamily: TITLE, fontSize: 84, color: "#fff", lineHeight: 1 };
  const b = pop(w(16, 10), 11, 200);
  return (
    <Scn>
      <Pill top={312} tone="white" text="RETIENS ÇA" enterAt={s(16)} size={46} />
      <Card top={440} t={w(16, 2)}>
        <div style={line}>
          <svg width={170} height={110} viewBox="-120 -55 240 110"><Dumbbell /></svg>
          LA SALLE
        </div>
        <div style={eq(w(16, 6))}>= LE SIGNAL</div>
      </Card>
      <Card top={810} t={w(16, 7)}>
        <div style={line}>
          <svg width={112} height={112} viewBox="-175 -175 350 350"><Plate /></svg>
          L'ASSIETTE
          <span style={{ color: "rgba(255,255,255,0.6)", opacity: b }}>+</span>
          <span style={{ opacity: Math.min(1, b * 2), transform: `scale(${b})`, display: "inline-block" }}>LE LIT</span>
        </div>
        <div style={eq(w(16, 13))}>= LE MUSCLE</div>
      </Card>
    </Scn>
  );
};

// ───── 14. Abonne-toi ─────
const Fin: React.FC = () => {
  const { pop, frame, fps } = useG();
  const k = pop(w(17, 0), 9, 190);
  const t = frame / fps;
  const flex = 0.5 + 0.5 * Math.sin(t * 5);
  return (
    <Scn>
      <div
        style={{
          position: "absolute",
          top: 312,
          left: CX - 330,
          width: 660,
          height: 170,
          borderRadius: 170,
          background: RED,
          color: "#fff",
          fontFamily: TITLE,
          fontSize: 118,
          lineHeight: "170px",
          textAlign: "center",
          transform: `scale(${k * (1 + 0.035 * Math.sin(t * 7))})`,
          boxShadow: "0 20px 70px rgba(225,6,0,0.55)",
        }}
      >
        + ABONNE-TOI
      </div>
      <Label t={w(17, 1)} top={520} size={40} color="#fff">POUR COMPRENDRE TON CORPS</Label>
      <Big t={w(17, 5)} top={580} size={92}>
        <span style={{ color: RED }}>1 MINUTE</span> À LA FOIS
      </Big>
      <Svg>
        <Perso x={CX} y={1255} scale={0.97} armL={[88, 104 + flex * 14]} armR={[88, 104 + flex * 14]} flex={0.6 + 0.4 * flex} mood="happy" bob={Math.sin(t * 5) * 3} />
      </Svg>
    </Scn>
  );
};

export const Scenes: React.FC = () => (
  <>
    <G from={0} to={cut(2)} name="1 Accroche + fatigue"><Hook /></G>
    <G from={cut(2)} to={cut(3)} name="2 Question"><Question /></G>
    <G from={cut(3)} to={cut(4)} name="3 Fibres"><Fibres /></G>
    <G from={cut(4)} to={cut(5)} name="4 Tension"><Tension /></G>
    <G from={cut(5)} to={cut(6)} name="5 Signal"><Signal /></G>
    <G from={cut(6)} to={cut(7)} name="5 bis Proche de l'échec"><Echec /></G>
    <G from={cut(7)} to={cut(8)} name="6 Chantier"><Chantier /></G>
    <G from={cut(8)} to={cut(9)} name="7 24-48 h"><Synthese /></G>
    <G from={cut(9)} to={cut(10)} name="8 Trois choses"><Trois /></G>
    <G from={cut(10)} to={cut(12)} name="9 Protéines"><Proteines /></G>
    <G from={cut(12)} to={cut(14)} name="10 Sommeil"><Sommeil /></G>
    <G from={cut(14)} to={cut(16)} name="11 Progression"><Progression /></G>
    <G from={cut(16)} to={cut(17)} name="12 À retenir"><Recap /></G>
    <G from={cut(17)} to={DUREE + 1} name="13 Abonne-toi"><Fin /></G>
  </>
);
