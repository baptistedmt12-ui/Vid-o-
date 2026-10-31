import React from "react";
import { Easing, Img, interpolate, random, staticFile } from "remotion";
import {
  BODY,
  Check,
  GREEN,
  IconDot,
  Place,
  RED,
  SAFE,
  Stamp,
  TITLE,
  cardDark,
  cardWhite,
  clamp,
  useG,
} from "./kit";
import { A } from "./timeline";

const MID_X = (SAFE.left + SAFE.right) / 2; // centre horizontal de la zone sûre (≈ 495)

/* ------------------------------------------------------------------ icônes */

const Stopwatch: React.FC<{ angle: number }> = ({ angle }) => (
  <svg width={50} height={50} viewBox="0 0 50 50">
    <circle cx={25} cy={28} r={18} fill="none" stroke="#fff" strokeWidth={5} />
    <rect x={20} y={3} width={10} height={6} rx={2} fill="#fff" />
    <line x1={25} y1={28} x2={25 + 12 * Math.sin(angle)} y2={28 - 12 * Math.cos(angle)} stroke="#fff" strokeWidth={5} strokeLinecap="round" />
  </svg>
);

const Plane: React.FC = () => (
  <svg width={52} height={52} viewBox="0 0 24 24">
    <path fill="#fff" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
  </svg>
);

const NoEuro: React.FC = () => (
  <svg width={52} height={52} viewBox="0 0 52 52">
    <text x={26} y={38} textAnchor="middle" fontFamily="Inter, Arial" fontWeight={800} fontSize={34} fill="#fff">€</text>
    <line x1={8} y1={44} x2={44} y2={8} stroke="#fff" strokeWidth={5} strokeLinecap="round" />
  </svg>
);

const Magnifier: React.FC<{ size?: number; color?: string }> = ({ size = 56, color = "#0B0B0D" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx={10} cy={10} r={6.5} fill="none" stroke={color} strokeWidth={2.6} />
    <line x1={15} y1={15} x2={21} y2={21} stroke={color} strokeWidth={3} strokeLinecap="round" />
  </svg>
);

const Phone: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      fill="#fff"
      d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"
    />
  </svg>
);

/** Étoile scintillante à 4 branches. */
const Spark: React.FC<{ x: number; y: number; size: number; k: number; color?: string }> = ({ x, y, size, k, color = "#fff" }) => (
  <svg
    width={size}
    height={size}
    viewBox="-10 -10 20 20"
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      transform: `scale(${Math.sin(Math.min(1, Math.max(0, k)) * Math.PI)}) rotate(${k * 90}deg)`,
      filter: `drop-shadow(0 0 ${size / 6}px rgba(255,255,255,0.9))`,
    }}
  >
    <path d="M0 -10 Q1.2 -1.2 10 0 Q1.2 1.2 0 10 Q-1.2 1.2 -10 0 Q-1.2 -1.2 0 -10Z" fill={color} />
  </svg>
);

/* ------------------------------------------------------- 0 – 7 s : l'annonce */

export const Listing: React.FC = () => {
  const { pop, lin, frame, at } = useG();
  const price = pop(1.5, 9, 230);
  const sub = pop(3.3);
  const circle = lin(4.35, 4.85);
  const pulse = frame > at(4.38) ? 1 + 0.06 * Math.sin((frame - at(4.38)) / 2.2) * Math.max(0, 1 - (frame - at(4.38)) / 30) : 1;
  return (
    <Place top={270} left={115} width={760} rotate={-2}>
      <div style={{ ...cardWhite, overflow: "hidden" }}>
        <div style={{ height: 360, position: "relative", overflow: "hidden" }}>
          <Img src={staticFile(A("moto-annonce.jpg"))} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.05 + frame / 2000})` }} />
          <div
            style={{
              position: "absolute",
              top: 22,
              left: 22,
              background: "#0B0B0D",
              color: "#fff",
              fontFamily: BODY,
              fontWeight: 800,
              fontSize: 28,
              padding: "8px 18px",
              borderRadius: 12,
              letterSpacing: 2,
            }}
          >
            ANNONCE
          </div>
        </div>
        <div style={{ padding: "22px 36px 26px" }}>
          <div style={{ fontFamily: TITLE, fontSize: 74, lineHeight: 1.05 }}>YAMAHA MT-09</div>
          <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 32, color: "#6b6b70", opacity: sub, transform: `translateX(${(1 - sub) * -30}px)` }}>
            Presque neuve · Vendeur particulier
          </div>
          <div style={{ position: "relative", display: "inline-block", marginTop: 6 }}>
            <div
              style={{
                fontFamily: TITLE,
                fontSize: 128,
                lineHeight: 1.1,
                color: RED,
                transform: `scale(${interpolate(price, [0, 1], [0, 1]) * pulse})`,
                transformOrigin: "20% 60%",
              }}
            >
              4 000 €
            </div>
            <svg
              width={460}
              height={210}
              viewBox="0 0 460 210"
              style={{ position: "absolute", left: -40, top: -28, overflow: "visible" }}
            >
              <path
                d="M60 40 C170 -10 400 10 430 90 C455 170 260 205 140 190 C40 178 0 120 30 75 C45 52 90 35 120 30"
                fill="none"
                stroke={RED}
                strokeWidth={9}
                strokeLinecap="round"
                strokeDasharray={1300}
                strokeDashoffset={1300 * (1 - circle)}
              />
            </svg>
          </div>
        </div>
      </div>
    </Place>
  );
};

/* -------------------------------------------- 7,9 – 9,3 s : l'affaire de sa vie */

export const Affaire: React.FC = () => {
  const { frame, pop } = useG();
  const l2 = pop(8.3, 10, 220);
  const sparks = [
    { x: 120, y: -10, s: 90, d: 2 },
    { x: 720, y: 30, s: 70, d: 6 },
    { x: 760, y: 300, s: 100, d: 10 },
    { x: 60, y: 290, s: 60, d: 14 },
  ];
  return (
    <Place top={400} rotate={-5}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ background: "#fff", color: "#0B0B0D", fontFamily: TITLE, fontSize: 120, padding: "0 34px", lineHeight: 1.2, transform: "skewX(-8deg)", boxShadow: "0 20px 50px rgba(0,0,0,0.45)" }}>
          L'AFFAIRE
        </div>
        <div
          style={{
            background: RED,
            color: "#fff",
            fontFamily: TITLE,
            fontSize: 120,
            padding: "0 34px",
            lineHeight: 1.2,
            marginTop: -8,
            transform: `skewX(-8deg) scale(${l2}) rotate(${(1 - l2) * 8}deg)`,
            boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
          }}
        >
          DE SA VIE
        </div>
        {sparks.map((s, i) => (
          <Spark key={i} x={s.x} y={s.y} size={s.s} k={(frame - s.d) / 22} />
        ))}
      </div>
    </Place>
  );
};

/* ---------------------------------------------------- 9,2 – 12,8 s : le vendeur */

const FactRow: React.FC<{ t: number; icon: React.ReactNode; text: string }> = ({ t, icon, text }) => {
  const { pop } = useG();
  const k = pop(t, 13, 200);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 26, opacity: Math.min(1, k * 1.5), transform: `translateX(${(1 - k) * -80}px)` }}>
      <IconDot>{icon}</IconDot>
      <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 54 }}>{text}</div>
    </div>
  );
};

export const Seller: React.FC = () => {
  const { frame } = useG();
  return (
    <Place top={300} left={110} width={780}>
      <div style={{ ...cardDark, padding: "34px 40px", display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 30, letterSpacing: 5, color: "rgba(255,255,255,0.6)" }}>LE VENDEUR</div>
        <FactRow t={9.25} icon={<Stopwatch angle={frame / 3} />} text="Très pressé" />
        <FactRow t={10.45} icon={<Plane />} text="Part à l'étranger" />
        <FactRow t={11.8} icon={<NoEuro />} text="Pas de négociation" />
      </div>
    </Place>
  );
};

/* -------------------------------------------- 13,5 – 15,1 s : qu'elle brille */

export const Brille: React.FC = () => {
  const { frame } = useG();
  const shine = interpolate(frame, [4, 30], [-40, 140], clamp);
  return (
    <>
      <Place top={330}>
        <div
          style={{
            textAlign: "center",
            fontFamily: TITLE,
            fontSize: 150,
            lineHeight: 1,
            color: "transparent",
            backgroundImage: `linear-gradient(100deg, #fff ${shine - 20}%, #fff7c2 ${shine - 5}%, #ffffff ${shine}%, #fff7c2 ${shine + 5}%, #fff ${shine + 20}%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.6))",
          }}
        >
          QU'ELLE BRILLE
        </div>
      </Place>
      {new Array(12).fill(0).map((_, i) => (
        <Spark
          key={i}
          x={SAFE.left + 60 + random(`bx${i}`) * 720}
          y={560 + random(`by${i}`) * 700}
          size={50 + random(`bs${i}`) * 80}
          k={(frame - random(`bd${i}`) * 26) / 20}
        />
      ))}
    </>
  );
};

export const Samedi: React.FC = () => (
  <Place top={320} left={MID_X - 250} width={500} rotate={3}>
    <div style={{ ...cardWhite, overflow: "hidden", textAlign: "center" }}>
      <div style={{ background: RED, color: "#fff", fontFamily: BODY, fontWeight: 800, fontSize: 34, letterSpacing: 6, padding: "14px 0" }}>
        LE GRAND JOUR
      </div>
      <div style={{ fontFamily: TITLE, fontSize: 130, lineHeight: 1.15, padding: "10px 0 0" }}>SAMEDI</div>
      <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 36, color: "#6b6b70", paddingBottom: 26 }}>montrer aux potes</div>
    </div>
  </Place>
);

/* --------------------------------------------------- 16 – 20 s : l'inspection */

const CheckRow: React.FC<{ t: number; text: string }> = ({ t, text }) => {
  const { pop } = useG();
  const k = pop(t, 14, 200);
  const c = pop(t + 0.12, 20, 160);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, opacity: Math.min(1, k * 1.5), transform: `translateY(${(1 - k) * 30}px)` }}>
      <Check k={c} />
      <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 52 }}>{text}</div>
    </div>
  );
};

export const Inspection: React.FC = () => (
  <Place top={300} left={110} width={780}>
    <div style={{ ...cardWhite, padding: "32px 42px 40px", display: "flex", flexDirection: "column", gap: 26 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Magnifier size={64} />
        <div style={{ fontFamily: TITLE, fontSize: 80, lineHeight: 1 }}>INSPECTION</div>
      </div>
      <div style={{ height: 3, background: "#e5e5e8" }} />
      <CheckRow t={17.25} text="Peu de kilomètres" />
      <CheckRow t={18.15} text="Aucune rayure" />
      <CheckRow t={18.95} text="Pneus quasi neufs" />
    </div>
  </Place>
);

/* ---------------------------------------------- 20 – 24 s : le double du prix */

export const Valeur: React.FC = () => {
  const { lin, pop } = useG();
  const b1 = lin(20.3, 20.85, Easing.out(Easing.cubic));
  const b2 = lin(22.05, 22.6, Easing.out(Easing.cubic));
  const x2 = pop(22.4, 8, 240);
  const bar = (w: number, bg: string, fg: string): React.CSSProperties => ({
    height: 92,
    width: w,
    background: bg,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    paddingLeft: 22,
    color: fg,
    fontFamily: TITLE,
    fontSize: 60,
    overflow: "hidden",
    whiteSpace: "nowrap",
  });
  return (
    <Place top={300} left={110} width={780}>
      <div style={{ ...cardDark, padding: "34px 40px 42px", position: "relative" }}>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 30, letterSpacing: 5, color: "rgba(255,255,255,0.6)" }}>
          UNE MT-09 DANS CET ÉTAT
        </div>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 38, marginTop: 26, marginBottom: 10 }}>Prix payé</div>
        <div style={bar(Math.max(4, 330 * b1), "#fff", "#0B0B0D")}>4 000 €</div>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 38, marginTop: 26, marginBottom: 10, opacity: Math.min(1, b2 * 3) }}>
          Prix normal
        </div>
        <div style={{ ...bar(Math.max(4, 660 * b2), RED, "#fff"), opacity: Math.min(1, b2 * 3) }}>≈ 8 000 €</div>
        <div
          style={{
            position: "absolute",
            right: 30,
            top: 70,
            width: 190,
            height: 190,
            borderRadius: 190,
            background: "#FFD400",
            color: "#0B0B0D",
            fontFamily: TITLE,
            fontSize: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${x2}) rotate(${(1 - x2) * -90 + 10}deg)`,
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          }}
        >
          x2
        </div>
      </div>
    </Place>
  );
};

/* ------------------------------------------ 27,6 – 37 s : le numéro de série */

const VIN = "JYARN51E0MA012847";

export const SerialPlate: React.FC = () => {
  const { frame, at, lin, pop } = useG();
  const erase = lin(28.5, 30.4, Easing.linear);
  const rub = frame > at(32.9) && frame < at(34.3) ? Math.sin(frame * 1.3) * 16 : 0;
  const chips = [
    { t: 30.6, text: "LIMÉ" },
    { t: 31.15, text: "PROPRE" },
    { t: 32.1, text: "RÉCENT" },
  ];
  const stampShake = frame > at(35.44) && frame < at(35.44) + 8 ? Math.sin(frame * 3) * 8 : 0;
  const n = VIN.length;
  return (
    <>
      <Place top={300} left={110} width={780} rotate={-2}>
        <div
          style={{
            position: "relative",
            height: 270,
            borderRadius: 18,
            border: "4px solid #6f767e",
            background: "linear-gradient(135deg, #e4e7ea 0%, #a8afb7 38%, #eef0f2 58%, #959ca4 100%)",
            boxShadow: "0 24px 70px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.7)",
            transform: `translateX(${rub + stampShake}px)`,
            overflow: "hidden",
          }}
        >
          {[
            [20, 20],
            [744, 20],
            [20, 222],
            [744, 222],
          ].map(([x, y], i) => (
            <div key={i} style={{ position: "absolute", left: x, top: y, width: 20, height: 20, borderRadius: 20, background: "radial-gradient(circle at 35% 35%, #fff, #7b828a)" }} />
          ))}
          <div style={{ position: "absolute", top: 34, width: "100%", textAlign: "center", fontFamily: BODY, fontWeight: 800, fontSize: 28, letterSpacing: 8, color: "#3d434a" }}>
            N° DE CADRE
          </div>
          <div style={{ position: "absolute", top: 98, left: 50, right: 50, height: 110 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: TITLE, fontSize: 82, lineHeight: "110px", color: "#40464d", textShadow: "0 2px 0 rgba(255,255,255,0.65), 0 -1px 0 rgba(0,0,0,0.3)" }}>
              {VIN.split("").map((ch, i) => (
                <span key={i} style={{ opacity: interpolate(erase * n, [i, i + 1], [1, 0], clamp) }}>
                  {ch}
                </span>
              ))}
            </div>
            {/* Métal limé */}
            <div
              style={{
                position: "absolute",
                left: -12,
                top: 4,
                height: 102,
                width: `calc(${erase * 100}% + 24px)`,
                borderRadius: 8,
                background:
                  "repeating-linear-gradient(176deg, #d7dbdf 0px, #aab1b8 2px, #eceef0 4px, #b9bfc5 6px, #cfd3d7 8px)",
                boxShadow: "inset 0 0 12px rgba(0,0,0,0.25)",
                opacity: erase > 0 ? 1 : 0,
              }}
            />
            {/* Étincelles de la lime */}
            {erase > 0 && erase < 1 &&
              new Array(8).fill(0).map((_, i) => {
                const p = ((frame * 0.25 + i / 8) % 1 + 1) % 1;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: `${erase * 100}%`,
                      top: 50,
                      width: 8,
                      height: 8,
                      borderRadius: 8,
                      background: "#ffb347",
                      boxShadow: "0 0 10px #ff8a00",
                      opacity: 1 - p,
                      transform: `translate(${p * (40 + random(`sx${i}`) * 80)}px, ${(random(`sy${i}`) - 0.5) * 140 * p}px)`,
                    }}
                  />
                );
              })}
          </div>
        </div>
      </Place>
      <div style={{ position: "absolute", top: 620, left: 110, width: 780, display: "flex", gap: 22, justifyContent: "center" }}>
        {chips.map((c) => {
          const k = pop(c.t, 11, 220);
          return (
            <div
              key={c.text}
              style={{
                fontFamily: BODY,
                fontWeight: 800,
                fontSize: 44,
                color: "#fff",
                background: "rgba(11,11,13,0.86)",
                border: `4px solid ${RED}`,
                borderRadius: 18,
                padding: "10px 26px",
                transform: `scale(${k})`,
                opacity: Math.min(1, k * 2),
              }}
            >
              {c.text}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 360, left: 0, width: 2 * MID_X, display: "flex", justifyContent: "center" }}>
        <Stamp t={35.44} text="EFFACÉ" size={150} rotate={-12} />
      </div>
    </>
  );
};

/* ------------------------------------------ 37 – 41,6 s : l'étiquette arrachée */

const BARS = new Array(46).fill(0).map((_, i) => 2 + Math.floor(random(`bar${i}`) * 4) * 2);

// Ligne de déchirure en dents de scie (en % de l'étiquette)
const TEAR = new Array(15).fill(0).map((_, i) => {
  const x = (i / 14) * 100;
  const y = 74 - (i / 14) * 56 + (i % 2 === 0 ? 5 : -4) + (random(`tear${i}`) - 0.5) * 6;
  return `${x.toFixed(1)}% ${y.toFixed(1)}%`;
});
const KEEP = `polygon(${[...TEAR, "100% 100%", "0% 100%"].join(",")})`;
const GONE = `polygon(${["0% 0%", "100% 0%", ...[...TEAR].reverse()].join(",")})`;

const LabelFace: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "#f7f7f5", borderRadius: 14 }}>
    <div style={{ background: "#0B0B0D", color: "#fff", fontFamily: BODY, fontWeight: 800, fontSize: 26, letterSpacing: 4, padding: "14px 26px", borderRadius: "14px 14px 0 0" }}>
      ÉTIQUETTE D'IDENTIFICATION
    </div>
    <div style={{ padding: "16px 26px 0", fontFamily: BODY, fontWeight: 600, fontSize: 24, color: "#55555a" }}>N° DE CADRE</div>
    <div style={{ padding: "0 26px", fontFamily: BODY, fontWeight: 800, fontSize: 44, letterSpacing: 3, color: "#0B0B0D" }}>{VIN}</div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 96, padding: "14px 26px 0" }}>
      {BARS.map((w, i) => (
        <div key={i} style={{ width: w, height: "100%", background: i % 2 === 0 ? "#0B0B0D" : "transparent" }} />
      ))}
    </div>
    <div style={{ padding: "8px 26px", fontFamily: BODY, fontWeight: 600, fontSize: 20, color: "#77777c", letterSpacing: 2 }}>
      NE PAS RETIRER · CONTRÔLE 2021
    </div>
  </div>
);

export const Etiquette: React.FC = () => {
  const { frame, at, pop, lin, exit } = useG();
  const label = pop(39.15, 13, 190);
  const lift = frame > at(40.45) && frame < at(40.74) ? Math.sin(frame * 2.5) * 3 : 0;
  const tear = lin(40.72, 41.35, Easing.in(Easing.quad));
  const torn = frame >= at(40.72);
  const word = pop(40.8, 9, 230);
  return (
    <>
      <Place top={290} left={MID_X - 260} width={520} enterAt={37.35}>
        <div style={{ ...cardWhite, borderRadius: 60, padding: "16px 30px", display: "flex", alignItems: "center", gap: 18, justifyContent: "center" }}>
          <Magnifier size={52} />
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 44 }}>SOUS LA SELLE</div>
        </div>
      </Place>
      <div
        style={{
          position: "absolute",
          top: 440,
          left: MID_X - 360,
          width: 720,
          height: 370,
          transform: `scale(${label * (1 - exit * 0.2)}) rotate(-3deg)`,
          opacity: Math.min(1, label * 2) * (1 - exit),
        }}
      >
        {/* Colle restée sur le cadre */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 14,
            clipPath: GONE,
            opacity: torn ? 0.75 : 0,
            background:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.75) 0 6%, transparent 7%), radial-gradient(circle at 60% 20%, rgba(255,255,255,0.6) 0 9%, transparent 10%), radial-gradient(circle at 80% 45%, rgba(255,255,255,0.7) 0 5%, transparent 6%), radial-gradient(circle at 40% 50%, rgba(255,255,255,0.5) 0 4%, transparent 5%), rgba(200,200,190,0.45)",
            border: "3px dashed rgba(255,255,255,0.6)",
          }}
        />
        {/* Partie restée collée */}
        <div style={{ position: "absolute", inset: 0, clipPath: KEEP, filter: "drop-shadow(0 16px 30px rgba(0,0,0,0.5))" }}>
          <LabelFace />
        </div>
        {/* Partie arrachée */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: GONE,
            transformOrigin: "100% 0%",
            transform: `translate(${tear * 620 + lift}px, ${-tear * 520 + tear * tear * 200}px) rotate(${tear * 55 + lift}deg)`,
            opacity: 1 - interpolate(tear, [0.7, 1], [0, 1], clamp),
            filter: "drop-shadow(0 16px 30px rgba(0,0,0,0.5))",
          }}
        >
          <LabelFace />
        </div>
      </div>
      {torn && (
        <div
          style={{
            position: "absolute",
            top: 860,
            left: 0,
            width: 2 * MID_X,
            textAlign: "center",
            fontFamily: TITLE,
            fontSize: 150,
            color: RED,
            textShadow: "0 8px 0 rgba(0,0,0,0.35), 0 0 40px rgba(0,0,0,0.6)",
            WebkitTextStroke: "3px #fff",
            transform: `scale(${interpolate(word, [0, 1], [2, 1])}) rotate(-4deg)`,
            opacity: Math.min(1, word * 2) * (1 - exit),
          }}
        >
          ARRACHÉE
        </div>
      )}
    </>
  );
};

/* ----------------------------------------------- 41,3 – 43,6 s : l'appel */

export const Appel: React.FC = () => {
  const { frame } = useG();
  const ring = Math.sin(frame * 1.6) * 12 * (Math.floor(frame / 12) % 2 === 0 ? 1 : 0.2);
  return (
    <Place top={300} left={MID_X - 330} width={660}>
      <div style={{ ...cardWhite, borderRadius: 80, padding: "22px 36px 22px 24px", display: "flex", alignItems: "center", gap: 26 }}>
        <div style={{ position: "relative" }}>
          {[0, 1].map((i) => {
            const p = ((frame / 24 + i / 2) % 1 + 1) % 1;
            return (
              <div
                key={i}
                style={{ position: "absolute", inset: 0, borderRadius: 200, border: `4px solid ${GREEN}`, transform: `scale(${1 + p * 0.9})`, opacity: 1 - p }}
              />
            );
          })}
          <IconDot size={110} color={GREEN}>
            <div style={{ transform: `rotate(${ring}deg)` }}>
              <Phone size={60} />
            </div>
          </IconDot>
        </div>
        <div>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 48 }}>Appel en cours…</div>
          <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 32, color: "#6b6b70" }}>Le nouveau propriétaire</div>
        </div>
      </div>
    </Place>
  );
};

/* ------------------------------- 45,2 – 49,6 s : la conversation avec le vendeur */

const Bubble: React.FC<{ t: number; me?: boolean; text: string; dead: number }> = ({ t, me, text, dead }) => {
  const { pop } = useG();
  const k = pop(t, 13, 210);
  return (
    <div
      style={{
        alignSelf: me ? "flex-end" : "flex-start",
        maxWidth: "80%",
        background: me ? "#2F7BF6" : "#fff",
        color: me ? "#fff" : "#0B0B0D",
        fontFamily: BODY,
        fontWeight: 600,
        fontSize: 28,
        lineHeight: 1.3,
        padding: "14px 20px",
        borderRadius: 24,
        borderBottomLeftRadius: me ? 24 : 6,
        borderBottomRightRadius: me ? 6 : 24,
        boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
        transform: `scale(${k})`,
        transformOrigin: me ? "100% 100%" : "0% 100%",
        opacity: Math.min(1, k * 2) * (1 - dead * 0.6),
        filter: `blur(${dead * 2.5}px) grayscale(${dead})`,
      }}
    >
      {text}
    </div>
  );
};

export const Conversation: React.FC = () => {
  const { frame, at, lin } = useG();
  const dead = lin(48.3, 48.5);
  const isDead = frame >= at(48.38);
  const W = 540;
  const H = 960;
  return (
    <Place top={270} left={MID_X - W / 2} width={W} rotate={-3}>
      <div style={{ width: W, height: H, background: "#0d0d0f", borderRadius: 70, padding: 16, boxShadow: "0 30px 80px rgba(0,0,0,0.6)", position: "relative" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 56, background: "#ECECF1", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ height: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: 150, height: 34, borderRadius: 20, background: "#0d0d0f" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 26px", background: "#fff", borderBottom: "2px solid #e1e1e6" }}>
            <div
              style={{
                width: 74,
                height: 74,
                borderRadius: 74,
                background: isDead ? "#b9b9c0" : "linear-gradient(135deg, #4b6cb7, #182848)",
                color: "#fff",
                fontFamily: BODY,
                fontWeight: 800,
                fontSize: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isDead ? "?" : "V"}
            </div>
            <div>
              <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 32, color: isDead ? RED : "#0B0B0D" }}>
                {isDead ? "Compte supprimé" : "Vendeur MT-09"}
              </div>
              <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 24, color: isDead ? "#8a8a90" : GREEN }}>
                {isDead ? "Utilisateur introuvable" : "● En ligne"}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, padding: "26px 22px" }}>
            <Bubble t={46.45} text="Toujours dispo. Je pars à l'étranger, faut que ça parte vite." dead={dead} />
            <Bubble t={46.95} me text="Ok pour 4 000 € ?" dead={dead} />
            <Bubble t={47.45} text="Deal. En liquide stp." dead={dead} />
          </div>
        </div>
        <div style={{ position: "absolute", top: 520, left: 0, width: W, display: "flex", justifyContent: "center" }}>
          <Stamp t={48.38} text="COMPTE SUPPRIMÉ" size={70} rotate={-8} />
        </div>
      </div>
    </Place>
  );
};

/* ------------------------------------------ 50,8 – 52,6 s : deux bonnes minutes */

export const Minutes: React.FC = () => {
  const { lin } = useG();
  const p = lin(51.1, 52.25, Easing.inOut(Easing.cubic));
  const s = Math.round(p * 120);
  const label = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const R = 150;
  const C = 2 * Math.PI * R;
  return (
    <Place top={300} left={MID_X - 200} width={400}>
      <div style={{ position: "relative", width: 400, height: 400 }}>
        <svg width={400} height={400} viewBox="0 0 400 400" style={{ position: "absolute", inset: 0 }}>
          <circle cx={200} cy={200} r={185} fill="rgba(11,11,13,0.85)" />
          <circle cx={200} cy={200} r={R} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={22} />
          <circle
            cx={200}
            cy={200}
            r={R}
            fill="none"
            stroke={RED}
            strokeWidth={22}
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - p)}
            transform="rotate(-90 200 200)"
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <div style={{ fontFamily: TITLE, fontSize: 120, lineHeight: 1 }}>{label}</div>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34, color: "rgba(255,255,255,0.75)" }}>sans un mot</div>
        </div>
      </div>
    </Place>
  );
};

/* ------------------------------------------------ 53,6 – 55,7 s : volée / police */

const Tape: React.FC<{ y: number; rotate: number; t: number; dir: 1 | -1 }> = ({ y, rotate, t, dir }) => {
  const { lin, frame } = useG();
  const k = lin(t, t + 0.25, Easing.out(Easing.cubic));
  const text = "SAISIE  ●  POLICE  ●  ".repeat(6);
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: -300,
        width: 1700,
        height: 104,
        background: "#FFD400",
        borderTop: "6px solid #0B0B0D",
        borderBottom: "6px solid #0B0B0D",
        transform: `rotate(${rotate}deg) translateX(${(1 - k) * dir * 1800}px)`,
        boxShadow: "0 14px 40px rgba(0,0,0,0.5)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ fontFamily: TITLE, fontSize: 66, color: "#0B0B0D", whiteSpace: "nowrap", transform: `translateX(${-frame * 4 * dir}px)`, letterSpacing: 3 }}>
        {text}
      </div>
    </div>
  );
};

export const Police: React.FC = () => {
  const { frame, at } = useG();
  const on = frame >= at(54.2);
  const phase = Math.floor(frame / 4) % 2;
  return (
    <>
      {on && (
        <>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at ${phase ? "0%" : "100%"} 40%, ${phase ? "rgba(225,6,0,0.55)" : "rgba(30,90,255,0.55)"} 0%, rgba(0,0,0,0) 55%)` }} />
          <Tape y={700} rotate={-11} t={54.22} dir={1} />
          <Tape y={900} rotate={7} t={54.4} dir={-1} />
        </>
      )}
      <div style={{ position: "absolute", top: 400, left: 0, width: 2 * MID_X, display: "flex", justifyContent: "center" }}>
        <Stamp t={53.8} text="VOLÉE ?" size={170} rotate={-8} />
      </div>
    </>
  );
};

/* ------------------------------------------------ 55,75 – 56,95 s : 4 000 € perdus */

export const Perdus: React.FC = () => {
  const { lin, pop, frame, at } = useG();
  const strike = lin(55.95, 56.15, Easing.out(Easing.quad));
  const word = pop(56.1, 10, 220);
  const fall = interpolate(frame, [at(56.6), at(56.95)], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  return (
    <div style={{ position: "absolute", top: 380, left: 0, width: 2 * MID_X, display: "flex", flexDirection: "column", alignItems: "center", transform: `translateY(${fall * 500}px) rotate(${fall * 12}deg)` }}>
      <Place top={0} left={MID_X - 400} width={800}>
        <div style={{ position: "relative", textAlign: "center", fontFamily: TITLE, fontSize: 220, color: "#fff", lineHeight: 1.1, textShadow: "0 10px 40px rgba(0,0,0,0.7)" }}>
          4 000 €
          <div style={{ position: "absolute", left: 60, top: "52%", height: 26, width: (800 - 120) * strike, background: RED, borderRadius: 13, transform: "rotate(-8deg)", boxShadow: "0 6px 16px rgba(0,0,0,0.4)" }} />
        </div>
      </Place>
      <div style={{ position: "absolute", top: 270, fontFamily: TITLE, fontSize: 110, color: RED, WebkitTextStroke: "3px #fff", transform: `scale(${word})`, opacity: Math.min(1, word * 2) }}>
        PERDUS
      </div>
    </div>
  );
};

/* ------------------------------------------ 57,6 – 60,2 s : liquide, pas de reçu */

const Bill: React.FC<{ i: number }> = ({ i }) => {
  const { frame, at } = useG();
  const start = at(58.15) + i * 2;
  const local = frame - start;
  if (local < 0) return null;
  const x = SAFE.left + random(`cx${i}`) * 700;
  const y = -220 + local * (26 + random(`cv${i}`) * 12);
  const r = (random(`cr${i}`) - 0.5) * 80 + local * (random(`cw${i}`) - 0.5) * 10;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 270,
        height: 145,
        borderRadius: 10,
        background: "linear-gradient(135deg, #f7b26a 0%, #e8893a 55%, #f3a45a 100%)",
        border: "4px solid rgba(255,255,255,0.7)",
        transform: `rotate(${r}deg) rotateX(${Math.sin(local / 5 + i) * 50}deg)`,
        boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 22px",
        fontFamily: TITLE,
        color: "rgba(255,255,255,0.95)",
      }}
    >
      <span style={{ fontSize: 76 }}>50</span>
      <span style={{ width: 70, height: 70, borderRadius: 70, border: "4px solid rgba(255,255,255,0.7)" }} />
      <span style={{ fontSize: 40 }}>€</span>
    </div>
  );
};

export const Liquide: React.FC = () => {
  const { lin, frame, at } = useG();
  const x = lin(59.25, 59.45, Easing.out(Easing.quad));
  const x2 = lin(59.38, 59.58, Easing.out(Easing.quad));
  const shake = frame > at(59.3) && frame < at(59.3) + 8 ? Math.sin(frame * 3) * 10 : 0;
  const row = (a: string, b: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: BODY, fontWeight: 600, fontSize: 28, color: "#3a3a3f", borderBottom: "3px dashed #d0d0d4", padding: "10px 0" }}>
      <span>{a}</span>
      <span>{b}</span>
    </div>
  );
  return (
    <>
      {new Array(9).fill(0).map((_, i) => (
        <Bill key={i} i={i} />
      ))}
      <Place top={300} left={MID_X - 230} width={460} rotate={4} enterAt={58.75}>
        <div style={{ position: "relative", transform: `translateX(${shake}px)` }}>
          <div
            style={{
              background: "#fbfbf8",
              padding: "30px 34px 60px",
              clipPath:
                "polygon(0 0, 100% 0, 100% 94%, 95% 100%, 90% 94%, 85% 100%, 80% 94%, 75% 100%, 70% 94%, 65% 100%, 60% 94%, 55% 100%, 50% 94%, 45% 100%, 40% 94%, 35% 100%, 30% 94%, 25% 100%, 20% 94%, 15% 100%, 10% 94%, 5% 100%, 0 94%)",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
            }}
          >
            <div style={{ fontFamily: TITLE, fontSize: 84, textAlign: "center", color: "#0B0B0D", lineHeight: 1.1 }}>REÇU</div>
            {row("Yamaha MT-09", "4 000 €")}
            {row("Paiement", "liquide")}
            {row("Signature", "—")}
          </div>
          <svg width={460} height={460} viewBox="0 0 460 460" style={{ position: "absolute", left: 0, top: -10, overflow: "visible" }}>
            <line x1={40} y1={40} x2={40 + 380 * x} y2={40 + 380 * x} stroke={RED} strokeWidth={30} strokeLinecap="round" />
            <line x1={420} y1={40} x2={420 - 380 * x2} y2={40 + 380 * x2} stroke={RED} strokeWidth={30} strokeLinecap="round" />
          </svg>
        </div>
      </Place>
    </>
  );
};
