import React from "react";
import { Easing, interpolate } from "remotion";
import { BODY, GREEN, MID_X, Place, RED, Stamp, TITLE, cardDark, cardWhite, fmt, useCount, useG } from "../_shared/kit";

/** Mini calendrier « LUN. » */
export const Cal: React.FC<{ size?: number; day?: string }> = ({ size = 70, day = "LUN." }) => (
  <div style={{ width: size, height: size, borderRadius: 14, overflow: "hidden", background: "#fff", flexShrink: 0, boxShadow: "0 0 0 3px rgba(0,0,0,0.08)" }}>
    <div style={{ height: size * 0.32, background: RED }} />
    <div style={{ fontFamily: TITLE, fontSize: size * 0.42, color: "#0B0B0D", textAlign: "center", lineHeight: `${size * 0.66}px` }}>{day}</div>
  </div>
);

/* ------------------------------------------------ 8,5 – 10,3 s : 300 € */

export const Money: React.FC = () => {
  const { pop } = useG();
  const k = pop(9.05, 9, 240);
  const sub = pop(9.75);
  return (
    <div style={{ position: "absolute", top: 320, left: MID_X - 300, width: 600, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ background: GREEN, color: "#fff", fontFamily: TITLE, fontSize: 110, lineHeight: 1.1, padding: "4px 40px", borderRadius: 24, transform: `scale(${k}) rotate(-4deg)`, boxShadow: "0 14px 40px rgba(0,0,0,0.45)" }}>
        +300 €
      </div>
      <div style={{ ...cardDark, borderRadius: 100, marginTop: 18, padding: "10px 26px", fontFamily: BODY, fontWeight: 800, fontSize: 36, opacity: sub, transform: `translateY(${(1 - sub) * 20}px)` }}>
        pour l'aider à cacher…
      </div>
    </div>
  );
};

/* ------------------------------------------------ 11,7 – 18,3 s : le contrat LLD */

const ContractRow: React.FC<{ t: number; label: string; value: string; strong?: boolean }> = ({ t, label, value, strong }) => {
  const { pop } = useG();
  const k = pop(t, 14, 200);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "3px dashed #e1e1e6", padding: "8px 0", opacity: Math.min(1, k * 1.5), transform: `translateX(${(1 - k) * -40}px)` }}>
      <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 32, color: "#55555a" }}>{label}</span>
      <span style={{ fontFamily: strong ? TITLE : BODY, fontWeight: 800, fontSize: strong ? 58 : 36, color: strong ? RED : "#0B0B0D" }}>{value}</span>
    </div>
  );
};

export const Contrat: React.FC = () => {
  const { pop } = useG();
  const q = pop(17.2, 12, 200);
  return (
    <>
      <Place top={290} left={MID_X - 280} width={560} rotate={-2}>
        <div style={{ ...cardWhite, borderRadius: 26, padding: "22px 30px 24px" }}>
          <div style={{ fontFamily: TITLE, fontSize: 56, lineHeight: 1 }}>CONTRAT LLD</div>
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 26, color: "#77777c", marginBottom: 8 }}>Location longue durée</div>
          <ContractRow t={13.5} label="Durée" value="3 ans" />
          <ContractRow t={14.14} label="Loyer" value="189 €/mois" strong />
          <ContractRow t={15.84} label="Apport" value="0 €" />
        </div>
      </Place>
      <div style={{ position: "absolute", top: 690, left: MID_X - 320, width: 640, display: "flex", justifyContent: "center" }}>
        <div style={{ background: GREEN, color: "#fff", borderRadius: 26, padding: "14px 26px", fontFamily: BODY, fontWeight: 800, fontSize: 34, whiteSpace: "nowrap", transform: `scale(${q}) rotate(2deg)`, opacity: Math.min(1, q * 2), boxShadow: "0 14px 40px rgba(0,0,0,0.45)" }}>
          {"« La meilleure décision de ma vie »"}
        </div>
      </div>
    </>
  );
};

/* ------------------------------------------------ 22,45 – 24,75 s : tout est facturé */

export const Facture: React.FC = () => {
  const { pop } = useG();
  const rows = [
    { t: 22.7, a: "Chaque rayure", b: "€€€" },
    { t: 23.34, a: "Chaque trace", b: "€€€" },
  ];
  return (
    <Place top={300} left={MID_X - 270} width={540} rotate={2}>
      <div style={{ ...cardWhite, borderRadius: 20, padding: "22px 30px 30px", position: "relative" }}>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 24, letterSpacing: 4, color: "#77777c" }}>FRAIS DE RESTITUTION</div>
        {rows.map((r) => {
          const k = pop(r.t, 14, 200);
          return (
            <div key={r.a} style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px dashed #e1e1e6", padding: "10px 0", fontFamily: BODY, fontWeight: 800, fontSize: 38, opacity: Math.min(1, k * 1.5), transform: `translateX(${(1 - k) * -40}px)` }}>
              <span>{r.a}</span>
              <span style={{ color: RED }}>{r.b}</span>
            </div>
          );
        })}
        <div style={{ position: "absolute", right: 10, bottom: -40 }}>
          <Stamp t={24.2} text="FACTURÉ" size={70} rotate={-10} />
        </div>
      </div>
    </Place>
  );
};

/* ------------------------------------------------ 24,8 – 32,9 s : la rayure de 10 cm */

export const Rayure: React.FC = () => {
  const { pop, lin, frame, at } = useG();
  const scratch = lin(26.25, 26.9, Easing.out(Easing.quad));
  const ruler = pop(26.7, 12, 200);
  const label = pop(27.7);
  const sticker = pop(29.65, 8, 260);
  const fall = pop(30.95, 12, 200);
  const W = 560;
  return (
    <>
      <Place top={300} left={MID_X - W / 2} width={W}>
        <div style={{ ...cardDark, borderRadius: 26, padding: "18px 22px 22px" }}>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 26, letterSpacing: 4, opacity: 0.65 * label + 0.0001, marginBottom: 10 }}>RÉSERVOIR · CÔTÉ GAUCHE</div>
          {/* tôle rouge du réservoir */}
          <div style={{ position: "relative", height: 150, borderRadius: 18, background: "linear-gradient(160deg, #ff3b30 0%, #c4120c 55%, #8e0905 100%)", overflow: "hidden", boxShadow: "inset 0 6px 14px rgba(255,255,255,0.25)" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 18, height: 30, background: "linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0))" }} />
            <svg width={W - 44} height={150} style={{ position: "absolute", inset: 0 }}>
              <path
                d="M70 92 L150 80 L210 86 L300 72 L380 78 L446 66"
                fill="none"
                stroke="#f3e9e6"
                strokeWidth={6}
                strokeLinecap="round"
                strokeDasharray={420}
                strokeDashoffset={420 * (1 - scratch)}
              />
              <path d="M75 96 L150 85 L210 90 L300 77 L380 82 L440 71" fill="none" stroke="rgba(80,0,0,0.6)" strokeWidth={2} strokeDasharray={420} strokeDashoffset={420 * (1 - scratch)} />
            </svg>
            {/* autocollant qui cache la moitié */}
            {frame >= at(29.65) && (
              <div
                style={{
                  position: "absolute",
                  left: 240,
                  top: 18,
                  width: 230,
                  height: 114,
                  borderRadius: 18,
                  background: "linear-gradient(135deg, #111 0%, #333 100%)",
                  border: "4px solid #fff",
                  transform: `scale(${interpolate(sticker, [0, 1], [1.8, 1])}) rotate(-6deg)`,
                  opacity: Math.min(1, sticker * 2),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: TITLE,
                  fontSize: 44,
                  color: "#FFD400",
                  letterSpacing: 2,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
                }}
              >
                RACING
              </div>
            )}
          </div>
          {/* règle */}
          <div style={{ position: "relative", height: 70, marginTop: 12, opacity: ruler, transform: `translateY(${(1 - ruler) * 20}px)` }}>
            <div style={{ position: "absolute", left: 48, width: 400, top: 0, height: 34, background: "#FFD400", borderRadius: 6 }}>
              {new Array(11).fill(0).map((_, i) => (
                <div key={i} style={{ position: "absolute", left: i * 40 - 1.5, top: 0, width: 3, height: i % 5 === 0 ? 22 : 13, background: "#0B0B0D" }} />
              ))}
            </div>
            <div style={{ position: "absolute", left: 48, width: 400, top: 36, textAlign: "center", fontFamily: TITLE, fontSize: 34, color: "#FFD400" }}>10 CM</div>
          </div>
        </div>
      </Place>
      <div style={{ position: "absolute", top: 640, left: MID_X - 320, width: 640, display: "flex", justifyContent: "center" }}>
        <div style={{ ...cardWhite, borderRadius: 100, padding: "12px 28px", fontFamily: BODY, fontWeight: 800, fontSize: 34, transform: `scale(${fall})`, opacity: Math.min(1, fall * 2) }}>
          Chute à l'arrêt · l'an dernier
        </div>
      </div>
    </>
  );
};

/* ------------------------------------------------ 38,4 – 42 s : le compteur */

export const Compteur: React.FC<{ t0?: number; t1?: number; value?: number }> = ({ t0 = 40.55, t1 = 41.95, value = 31000 }) => {
  const n = useCount(t0, t1, 0, value);
  const digits = String(n).padStart(6, "0").split("");
  const { frame, at } = useG();
  const done = frame >= at(t1);
  return (
    <Place top={320} left={MID_X - 260} width={520}>
      <div style={{ ...cardDark, borderRadius: 26, padding: "18px 24px 22px", border: done ? `3px solid ${RED}` : cardDark.border }}>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 24, letterSpacing: 5, opacity: 0.65, marginBottom: 10 }}>COMPTEUR</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          {digits.map((d, i) => (
            <div key={i} style={{ width: 62, height: 92, borderRadius: 10, background: "linear-gradient(180deg, #1c1c20, #000 50%, #1c1c20)", color: i < 1 ? "rgba(255,255,255,0.35)" : "#fff", fontFamily: TITLE, fontSize: 74, lineHeight: "92px", textAlign: "center", boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.1)" }}>
              {d}
            </div>
          ))}
          <div style={{ fontFamily: TITLE, fontSize: 48, marginLeft: 8, color: done ? RED : "#fff" }}>KM</div>
        </div>
      </div>
    </Place>
  );
};

/* ------------------------------------------------ 46,7 – 55,1 s : le calcul */

export const Calcul: React.FC = () => {
  const { pop } = useG();
  const rows = [
    { t: 46.95, a: "Autorisé (3 × 10 000)", b: "30 000 km", c: "#fff" },
    { t: 47.55, a: "Au compteur", b: "31 000 km", c: "#fff" },
    { t: 50.5, a: "En trop", b: "+1 000 km", c: RED },
    { t: 51.8, a: "Prix", b: "× centimes/km", c: "#FFD400" },
  ];
  return (
    <Place top={300} left={MID_X - 290} width={580}>
      <div style={{ ...cardDark, borderRadius: 26, padding: "20px 28px 24px" }}>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 24, letterSpacing: 5, opacity: 0.65, marginBottom: 6 }}>LE CALCUL</div>
        {rows.map((r) => {
          const k = pop(r.t, 14, 200);
          return (
            <div key={r.a} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: "2px solid rgba(255,255,255,0.1)", opacity: Math.min(1, k * 1.5), transform: `translateX(${(1 - k) * -40}px)` }}>
              <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 30, opacity: 0.8 }}>{r.a}</span>
              <span style={{ fontFamily: TITLE, fontSize: 48, color: r.c }}>{r.b}</span>
            </div>
          );
        })}
      </div>
    </Place>
  );
};

/* ------------------------------------------------ 55,15 – 60,1 s : plus de 2 000 € */

export const Total: React.FC = () => {
  const { pop } = useG();
  const n = useCount(56.6, 57.3, 0, 2000);
  const sub = pop(57.5);
  return (
    <div style={{ position: "absolute", top: 300, left: MID_X - 300, width: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <Place top={0} left={0} width={600}>
        <div style={{ ...cardWhite, borderRadius: 26, padding: "18px 28px 20px", textAlign: "center" }}>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 28, color: "#55555a" }}>Rayure + km en trop</div>
          <div style={{ fontFamily: TITLE, fontSize: 100, lineHeight: 1.05, color: RED, whiteSpace: "nowrap" }}>+ de {fmt(n)} €</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, opacity: sub, fontFamily: BODY, fontWeight: 800, fontSize: 34 }}>
            <Cal size={50} /> à payer lundi
          </div>
        </div>
      </Place>
      <div style={{ position: "absolute", top: 280, width: 600, display: "flex", justifyContent: "center" }}>
        <Stamp t={59.25} text="MÊME PAS À LUI" size={64} rotate={-6} />
      </div>
    </div>
  );
};

/* ------------------------------------------------ 63,85 – fin : louer ou acheter */

export const LouerAcheter: React.FC = () => {
  const { pop } = useG();
  const a = pop(64.95, 10, 220);
  const b = pop(65.55, 10, 220);
  const q = pop(65.9);
  const box = (k: number, bg: string, fg: string, r: number): React.CSSProperties => ({
    background: bg,
    color: fg,
    fontFamily: TITLE,
    fontSize: 84,
    lineHeight: 1.1,
    padding: "4px 30px",
    borderRadius: 20,
    transform: `scale(${k}) rotate(${r}deg)`,
    opacity: Math.min(1, k * 2),
    boxShadow: "0 14px 40px rgba(0,0,0,0.45)",
  });
  return (
    <div style={{ position: "absolute", top: 330, left: MID_X - 320, width: 640, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={box(a, "#fff", "#0B0B0D", -4)}>LOUER</div>
        <div style={{ fontFamily: TITLE, fontSize: 56, color: "#fff", opacity: b, textShadow: "0 4px 16px rgba(0,0,0,0.7)" }}>OU</div>
        <div style={box(b, RED, "#fff", 4)}>ACHETER</div>
      </div>
      <div style={{ ...cardDark, borderRadius: 100, padding: "10px 26px", fontFamily: BODY, fontWeight: 800, fontSize: 34, opacity: q, transform: `translateY(${(1 - q) * 20}px)` }}>
        Et toi, tu fais quoi ?
      </div>
    </div>
  );
};
