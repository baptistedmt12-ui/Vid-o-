import {
  AbsoluteFill,
  Audio,
  Freeze,
  OffthreadVideo,
  Sequence,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../../theme";

// Vidéo 006 — On Air (Chambly) : banane dans la voiture. Rush 1080×1920 à 60 i/s, 9,1 s.
export const FPS = 60;
const SOURCE = staticFile("006-on-air-chambly/rushes/original.mov");
const sfx = (n: string) => staticFile(`006-on-air-chambly/assets/${n}`);

const VIDEO_SECONDS = 9.08;
const HOLD_SECONDS = 1.0; // image figée à la fin, après la bouchée
const BITE = 8.75; // instant où il croque dans la banane
export const TOTAL_FRAMES = Math.round((VIDEO_SECONDS + HOLD_SECONDS) * FPS);

const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Badge « ● ON AIR — Chambly » en haut à gauche, sous la barre TikTok */
const LocationBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = spring({ frame: frame - f(0.25), fps, config: { damping: 14, stiffness: 180 } });
  const city = spring({ frame: frame - f(0.6), fps, config: { damping: 200 }, durationInFrames: 18 });
  // Voyant rouge « on air » qui clignote doucement
  const blink = 0.55 + 0.45 * Math.abs(Math.sin(frame / 18));

  return (
    <div
      style={{
        position: "absolute",
        top: theme.safe.top + 100,
        left: 44,
        transform: `translateX(${interpolate(inn, [0, 1], [-420, 0])}px)`,
        opacity: frame >= f(0.25) ? 1 : 0,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          padding: "8px 18px 8px 14px",
          borderRadius: 14,
          backgroundColor: "rgba(0,0,0,0.6)",
          border: `3px solid ${theme.colors.red}`,
          boxShadow: `0 0 ${18 * blink}px rgba(225,6,0,${0.6 * blink})`,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: theme.colors.red,
            opacity: blink,
            boxShadow: `0 0 12px ${theme.colors.red}`,
          }}
        />
        <div
          style={{
            fontFamily: theme.fonts.title,
            fontSize: 58,
            lineHeight: 1.05,
            color: theme.colors.white,
            letterSpacing: 2,
          }}
        >
          ON AIR
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 10,
          marginLeft: 4,
          opacity: city,
          transform: `translateY(${interpolate(city, [0, 1], [-12, 0])}px)`,
        }}
      >
        {/* Pictogramme de localisation */}
        <svg width="26" height="26" viewBox="0 0 24 24">
          <path
            d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
            fill={theme.colors.white}
          />
        </svg>
        <span
          style={{
            fontFamily: theme.fonts.body,
            fontWeight: 800,
            fontSize: 30,
            letterSpacing: 3,
            color: theme.colors.white,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          Chambly
        </span>
      </div>
    </div>
  );
};

/** Sticker « CROC ! » au moment de la bouchée */
const BiteSticker: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 9, stiffness: 240 } });
  const wobble = Math.sin(frame / 5) * 3;
  return (
    <div
      style={{
        position: "absolute",
        top: 1120,
        left: 70,
        transform: `scale(${interpolate(s, [0, 1], [0, 1])}) rotate(${-10 + wobble}deg)`,
        transformOrigin: "center",
      }}
    >
      <div
        style={{
          fontFamily: theme.fonts.title,
          fontSize: 110,
          lineHeight: 1,
          color: theme.colors.white,
          backgroundColor: theme.colors.red,
          padding: "6px 24px 10px",
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        CROC !
      </div>
      {/* Petits traits d'impact */}
      {[0, 1, 2].map((i) => {
        const len = interpolate(frame, [0, 8], [0, 1], clamp);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              right: -50 - i * 6,
              top: 10 + i * 40,
              width: 40 * len,
              height: 8,
              borderRadius: 4,
              backgroundColor: theme.colors.white,
              transform: `rotate(${-25 + i * 25}deg)`,
              opacity: interpolate(frame, [10, 24], [1, 0], clamp),
            }}
          />
        );
      })}
    </div>
  );
};

/** Vidéo avec zoom « punch » et secousse au moment de la bouchée */
const Footage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bite = f(BITE);
  const punch = spring({ frame: frame - bite, fps, config: { damping: 12, stiffness: 220 } });
  const zoomStart = interpolate(frame, [0, f(1.2)], [1.06, 1], clamp);
  const scale = zoomStart * (frame >= bite ? interpolate(punch, [0, 1], [1, 1.12]) : 1);
  const amp = frame >= bite ? interpolate(frame - bite, [0, 14], [14, 0], clamp) : 0;
  const x = (random(`x${frame}`) - 0.5) * 2 * amp;
  const y = (random(`y${frame}`) - 0.5) * 2 * amp;
  const flash = frame >= bite ? interpolate(frame - bite, [0, 6], [0.4, 0], clamp) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bg, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `translate(${x}px, ${y}px) scale(${scale})`, transformOrigin: "50% 45%" }}>
        <Sequence durationInFrames={f(VIDEO_SECONDS)} layout="none">
          <OffthreadVideo src={SOURCE} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Sequence>
        <Sequence from={f(VIDEO_SECONDS)} layout="none">
          <Freeze frame={f(VIDEO_SECONDS) - 2}>
            <OffthreadVideo src={SOURCE} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Freeze>
        </Sequence>
      </AbsoluteFill>
      {flash > 0 && <AbsoluteFill style={{ backgroundColor: `rgba(255,255,255,${flash})` }} />}
    </AbsoluteFill>
  );
};

export const Video006: React.FC = () => {
  return (
    <AbsoluteFill>
      <Footage />
      <LocationBadge />
      <Sequence from={f(BITE)} name="CROC">
        <BiteSticker />
      </Sequence>

      {/* Sons */}
      <Sequence from={f(0.15)} durationInFrames={f(0.5)} layout="none">
        <Audio src={sfx("whoosh.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={f(0.6)} durationInFrames={f(0.2)} layout="none">
        <Audio src={sfx("pop.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={f(BITE) - 2} durationInFrames={f(0.6)} layout="none">
        <Audio src={sfx("crunch.wav")} volume={1} />
      </Sequence>
    </AbsoluteFill>
  );
};
