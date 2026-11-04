import React from "react";
import { Easing, interpolate, random } from "remotion";
import {
  BODY,
  GREEN,
  IconDot,
  MID_X,
  Place,
  RED,
  TITLE,
  cardDark,
  cardWhite,
  fmt,
  useCount,
  useG,
} from "../_shared/kit";
import { ClockIcon, MotoIcon, ShareIcon, StrollerIcon } from "../_shared/icons";

/** Gyrophare bleu / rouge. */
export const Beacon: React.FC<{ size?: number }> = ({ size = 60 }) => {
  const { frame } = useG();
  const red = Math.floor(frame / 5) % 2 === 0;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size,
        background: red ? RED : "#1E5BFF",
        boxShadow: `0 0 ${size / 2}px ${red ? "rgba(225,6,0,0.9)" : "rgba(30,91,255,0.9)"}`,
        flexShrink: 0,
      }}
    />
  );
};

/* ------------------------------------------------ 17,5 – 27,6 s : la vidéo Facebook */

const PANEL_W = 520;

const Caption: React.FC<{ t: number; until: number; text: string }> = ({ t, until, text }) => {
  const { pop, frame, at } = useG();
  if (frame < at(t) || frame >= at(until)) return null;
  const k = pop(t, 14, 220);
  return (
    <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 32, lineHeight: 1.2, opacity: k, transform: `translateY(${(1 - k) * 14}px)` }}>{text}</div>
  );
};

export const PostVideo: React.FC = () => {
  const { frame, at, pop, lin } = useG();
  const sign = pop(21.2, 10, 220);
  const ride = lin(22.8, 24.4, Easing.inOut(Easing.cubic));
  const stroller = pop(24.8, 10, 220);
  const jump = lin(26.0, 26.6, Easing.out(Easing.quad));
  const playing = frame >= at(18.9);
  const progress = lin(18.9, 27.5, Easing.linear);
  return (
    <Place top={290} left={MID_X - PANEL_W / 2} width={PANEL_W} rotate={-2}>
      <div style={{ ...cardWhite, borderRadius: 26, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px" }}>
          <div style={{ width: 56, height: 56, borderRadius: 56, background: "#1E5BFF", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: BODY, fontWeight: 800, fontSize: 26 }}>
            MV
          </div>
          <div>
            <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 28 }}>Groupe · Ma ville</div>
            <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 22, color: "#77777c" }}>Vidéo partagée · ce matin</div>
          </div>
        </div>
        {/* Écran de la vidéo */}
        <div style={{ position: "relative", height: 290, background: "linear-gradient(180deg, #2f4a2a 0%, #1d2e1b 60%, #4a3a22 100%)", overflow: "hidden" }}>
          {/* chemin */}
          <div style={{ position: "absolute", left: "30%", bottom: -40, width: 200, height: 330, background: "linear-gradient(180deg, rgba(150,110,70,0.3), rgba(160,110,70,0.9))", transform: "perspective(300px) rotateX(55deg)" }} />
          {/* fougères */}
          {new Array(9).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: i < 5 ? i * 30 - 20 : 360 + (i - 5) * 45,
                bottom: -10,
                width: 70,
                height: 120 + random(`f${i}`) * 60,
                background: "radial-gradient(ellipse at 50% 100%, #3f7a2f 0%, #2b5a20 60%, transparent 70%)",
                transform: `rotate(${(random(`fr${i}`) - 0.5) * 30}deg)`,
              }}
            />
          ))}
          {!playing && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 96, height: 96, borderRadius: 96, background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 0, height: 0, borderTop: "22px solid transparent", borderBottom: "22px solid transparent", borderLeft: `36px solid #0B0B0D`, marginLeft: 8 }} />
              </div>
            </div>
          )}
          {/* panneau interdit aux motos */}
          <div style={{ position: "absolute", left: 30, top: 26, transform: `scale(${sign})` }}>
            <div style={{ width: 120, height: 120, borderRadius: 120, background: "#fff", border: `14px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.4)" }}>
              <MotoIcon size={70} color="#0B0B0D" />
            </div>
          </div>
          {/* enduro qui passe à toute vitesse */}
          {ride > 0 && ride < 1 && (
            <div style={{ position: "absolute", top: 150, left: -160 + ride * 720, display: "flex", alignItems: "center" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 90, height: 6, background: "rgba(255,255,255,0.7)", marginRight: 6, marginTop: i * 18 - 18, borderRadius: 4 }} />
              ))}
              <MotoIcon size={110} color="#0B0B0D" />
            </div>
          )}
          {/* poussette */}
          <div style={{ position: "absolute", right: 40, top: 110 - jump * 40, transform: `scale(${stroller}) rotate(${jump * 35}deg)`, opacity: Math.min(1, stroller * 2) }}>
            <div style={{ width: 110, height: 110, borderRadius: 20, background: "#FFD400", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.4)" }}>
              <StrollerIcon size={78} color="#0B0B0D" />
            </div>
          </div>
          {/* barre de lecture */}
          <div style={{ position: "absolute", left: 0, bottom: 0, height: 6, width: `${progress * 100}%`, background: RED }} />
        </div>
        <div style={{ padding: "16px 22px 20px", minHeight: 44 }}>
          <Caption t={17.6} until={21.2} text="Encore une moto dans la forêt !!" />
          <Caption t={21.2} until={22.8} text="Chemin interdit aux motos" />
          <Caption t={22.8} until={24.8} text="Une enduro noire, à fond" />
          <Caption t={24.8} until={26.0} text="Une maman et sa poussette…" />
          <Caption t={26.0} until={99} text="…qui se jette dans les fougères" />
        </div>
      </div>
    </Place>
  );
};

/* ------------------------------------------------ 27,6 – 30 s : 4 000 partages */

export const Shares: React.FC = () => {
  const n = useCount(28.1, 28.9, 0, 4000);
  const { pop } = useG();
  const sub = pop(29.1);
  return (
    <Place top={330} left={MID_X - 300} width={600}>
      <div style={{ ...cardDark, borderRadius: 100, display: "flex", alignItems: "center", gap: 20, padding: "14px 34px 14px 16px" }}>
        <IconDot size={84} color="#1E5BFF">
          <ShareIcon size={46} />
        </IconDot>
        <div>
          <div style={{ fontFamily: TITLE, fontSize: 72, lineHeight: 1 }}>{fmt(n)} partages</div>
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 30, opacity: 0.75 * sub }}>en une seule matinée</div>
        </div>
      </div>
    </Place>
  );
};

/* ------------------------------------------------ 30 – 32,4 s : « Je sais qui c'est » */

export const Comment: React.FC = () => {
  const { pop } = useG();
  const txt = pop(31.7, 10, 220);
  return (
    <Place top={330} left={MID_X - 290} width={580} rotate={-1}>
      <div style={{ ...cardWhite, borderRadius: 26, padding: "20px 24px", display: "flex", gap: 18 }}>
        <div style={{ width: 64, height: 64, borderRadius: 64, background: "#c8c8ce", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 26, color: "#55555a" }}>Commentaire · il y a 2 h</div>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 42, color: "#0B0B0D", whiteSpace: "nowrap", transform: `scale(${txt})`, transformOrigin: "0% 50%", opacity: Math.min(1, txt * 2) }}>
            {"«\u00A0Je sais qui c'est.\u00A0»"}
          </div>
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 22, color: "#8a8a90", marginTop: 4 }}>J'aime · Répondre · 212</div>
        </div>
      </div>
    </Place>
  );
};

/* ------------------------------------------------ 52 – 56,1 s : la boue rouge */

const blob = (seed: string, r: number, n = 14) => {
  const pts = new Array(n).fill(0).map((_, i) => {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (0.72 + random(`${seed}${i}`) * 0.5);
    return [Math.cos(a) * rr, Math.sin(a) * rr];
  });
  let d = `M${(pts[0][0] + pts[n - 1][0]) / 2} ${(pts[0][1] + pts[n - 1][1]) / 2}`;
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % n];
    d += ` Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${((p[0] + q[0]) / 2).toFixed(1)} ${((p[1] + q[1]) / 2).toFixed(1)}`;
  }
  return d + "Z";
};
const MAIN_BLOB = blob("mud", 150);
const DROPS = new Array(7).fill(0).map((_, i) => ({
  x: Math.cos(i * 0.9 + 0.3) * (190 + random(`dx${i}`) * 50),
  y: Math.sin(i * 0.9 + 0.3) * (150 + random(`dy${i}`) * 40),
  r: 14 + random(`dr${i}`) * 18,
}));

export const Boue: React.FC = () => {
  const { pop, lin } = useG();
  const splat = pop(53.25, 9, 260);
  const drip = lin(53.4, 55.8, Easing.out(Easing.quad));
  const chips = [
    { t: 54.1, text: "Rouge" },
    { t: 54.55, text: "Collante" },
    { t: 55.35, text: "Que sur ces chemins" },
  ];
  return (
    <>
      <div style={{ position: "absolute", top: 300, left: MID_X - 230, width: 460, height: 360 }}>
        <svg width={460} height={360} viewBox="-230 -180 460 360" style={{ overflow: "visible", transform: `scale(${splat})`, filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.5))" }}>
          <defs>
            <radialGradient id="mud" cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#b5462a" />
              <stop offset="70%" stopColor="#7d2814" />
              <stop offset="100%" stopColor="#5a1a0b" />
            </radialGradient>
          </defs>
          <path d={MAIN_BLOB} fill="url(#mud)" />
          {/* coulures */}
          {[-60, 10, 70].map((x, i) => (
            <rect key={i} x={x - 10} y={90} width={20} height={20 + drip * (60 + i * 25)} rx={10} fill="#7d2814" />
          ))}
          {DROPS.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#8f3019" />
          ))}
          <ellipse cx={-50} cy={-60} rx={50} ry={18} fill="rgba(255,255,255,0.18)" transform="rotate(-20)" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TITLE, fontSize: 92, color: "#fff", textShadow: "0 4px 16px rgba(0,0,0,0.5)", transform: `scale(${splat})` }}>
          BOUE ROUGE
        </div>
      </div>
      <div style={{ position: "absolute", top: 700, left: MID_X - 380, width: 760, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        {chips.map((c) => {
          const k = pop(c.t, 11, 220);
          return (
            <div key={c.text} style={{ ...cardDark, borderRadius: 100, padding: "10px 24px", fontFamily: BODY, fontWeight: 800, fontSize: 36, transform: `scale(${k})`, opacity: Math.min(1, k * 2), border: "3px solid #b5462a" }}>
              {c.text}
            </div>
          );
        })}
      </div>
    </>
  );
};

/* ------------------------------------------------ 61,3 – 64,5 s : billet froissé + 16h10 */

export const Horloge: React.FC = () => {
  const { pop, frame } = useG();
  const bill = pop(61.65, 10, 200);
  const clock = pop(62.7, 12, 200);
  const warn = pop(63.85, 11, 220);
  const sec = (frame * 6) % 360; // trotteuse
  return (
    <>
      {/* Billet froissé */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: MID_X - 330,
          width: 230,
          height: 124,
          borderRadius: 8,
          background: "linear-gradient(115deg, #f2a65a 0%, #d98636 22%, #f6b673 34%, #cf7a2e 52%, #f3ab64 70%, #d4802f 100%)",
          border: "3px solid rgba(255,255,255,0.6)",
          transform: `scale(${bill}) rotate(${-14 + (1 - bill) * 40}deg) skewX(-6deg)`,
          opacity: Math.min(1, bill * 2),
          boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          fontFamily: TITLE,
          color: "rgba(255,255,255,0.95)",
        }}
      >
        <span style={{ fontSize: 60 }}>50</span>
        <span style={{ fontSize: 34 }}>€</span>
      </div>
      {/* Horloge */}
      <Place top={330} left={MID_X - 60} width={400} enterAt={62.7}>
        <div style={{ ...cardWhite, borderRadius: 30, padding: "22px 26px", display: "flex", alignItems: "center", gap: 20 }}>
          <svg width={130} height={130} viewBox="-65 -65 130 130">
            <circle r={60} fill="#fff" stroke="#0B0B0D" strokeWidth={7} />
            {new Array(12).fill(0).map((_, i) => (
              <line key={i} x1={0} y1={-50} x2={0} y2={-42} stroke="#0B0B0D" strokeWidth={4} transform={`rotate(${i * 30})`} />
            ))}
            <line x1={0} y1={0} x2={0} y2={-28} stroke="#0B0B0D" strokeWidth={7} strokeLinecap="round" transform={`rotate(${4 * 30 + 5})`} />
            <line x1={0} y1={0} x2={0} y2={-44} stroke="#0B0B0D" strokeWidth={5} strokeLinecap="round" transform={`rotate(${10 * 6})`} />
            <line x1={0} y1={6} x2={0} y2={-48} stroke={RED} strokeWidth={2.5} transform={`rotate(${sec})`} />
            <circle r={5} fill={RED} />
          </svg>
          <div style={{ fontFamily: TITLE, fontSize: 96, lineHeight: 1, color: "#0B0B0D", transform: `scale(${clock})` }}>16:10</div>
        </div>
      </Place>
      <div style={{ position: "absolute", top: 545, left: MID_X - 300, width: 600, display: "flex", justifyContent: "center" }}>
        <div style={{ background: RED, color: "#fff", borderRadius: 100, padding: "12px 28px", fontFamily: BODY, fontWeight: 800, fontSize: 36, display: "flex", gap: 12, alignItems: "center", transform: `scale(${warn})`, opacity: Math.min(1, warn * 2), boxShadow: "0 14px 40px rgba(0,0,0,0.45)" }}>
          <ClockIcon size={40} h={5} m={0} /> Gendarmes à 17h : −50 min
        </div>
      </div>
    </>
  );
};

/* ------------------------------------------------ 64,6 – fin : question finale */

const Choice: React.FC<{ t: number; text: string; color: string; icon: React.ReactNode }> = ({ t, text, color, icon }) => {
  const { pop } = useG();
  const k = pop(t, 12, 200);
  return (
    <div
      style={{
        ...cardDark,
        borderRadius: 100,
        border: `4px solid ${color}`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 30px 12px 14px",
        transform: `translateX(${(1 - k) * -60}px)`,
        opacity: Math.min(1, k * 1.6),
      }}
    >
      <IconDot size={60} color={color}>
        {icon}
      </IconDot>
      <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 40 }}>{text}</div>
    </div>
  );
};

export const Sondage: React.FC = () => {
  const { pop } = useG();
  const title = pop(64.65, 10, 220);
  const hint = pop(67.0);
  return (
    <div style={{ position: "absolute", top: 320, left: MID_X - 300, width: 600, display: "flex", flexDirection: "column", alignItems: "stretch", gap: 18 }}>
      <div style={{ textAlign: "center", fontFamily: TITLE, fontSize: 96, color: "#fff", textShadow: "0 6px 30px rgba(0,0,0,0.7)", transform: `scale(${interpolate(title, [0, 1], [1.6, 1])})`, opacity: Math.min(1, title * 2) }}>
        À VOTRE AVIS ?
      </div>
      <Choice t={65.6} text="Il s'en est sorti" color={GREEN} icon={<span style={{ color: "#fff", fontFamily: BODY, fontWeight: 800, fontSize: 34 }}>A</span>} />
      <Choice t={66.55} text="C'est fini pour lui" color={RED} icon={<span style={{ color: "#fff", fontFamily: BODY, fontWeight: 800, fontSize: 34 }}>B</span>} />
      <div style={{ textAlign: "center", fontFamily: BODY, fontWeight: 800, fontSize: 32, color: "rgba(255,255,255,0.85)", opacity: hint, textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>
        Réponds A ou B en commentaire
      </div>
    </div>
  );
};

