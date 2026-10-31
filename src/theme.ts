// Direction artistique partagée par toutes les vidéos (voir SUIVI.md, section DA)
export const theme = {
  colors: {
    bg: "#0B0B0D",
    red: "#E10600",
    white: "#FFFFFF",
    muted: "rgba(255,255,255,0.28)",
  },
  fonts: {
    title: "Anton, Impact, sans-serif",
    body: "Inter, Arial, sans-serif",
  },
  // Zones à éviter sur TikTok (interface de l'appli) en 1080×1920
  safe: { top: 200, bottom: 460, right: 160, left: 40 },
} as const;
