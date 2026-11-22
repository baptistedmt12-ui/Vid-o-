// Vidéo 010 — Villa à « seulement » 7 millions d'euros.
// Montage calé sur une voix off IMAGINÉE (≈ 3,2 mots/s) : à recaler sur la vraie voix ElevenLabs.
// Temps « src » = secondes du rush original (60 i/s), temps « out » = secondes de la vidéo finale.

export const FPS = 30;
export const RUSH = "010-villa-7-millions/rushes/original/rush.mp4";

export type Seg = {
  id: string;
  src0: number;
  src1: number;
  rate?: number; // < 1 = ralenti
  mirror?: boolean; // effet miroir (image retournée)
  zoom?: "in" | "out"; // zoom lent pendant le plan
  punch?: boolean; // entrée en léger zoom (teaser)
  voix: string; // texte de la voix off prévu sur ce plan
};

export const SEGS: Seg[] = [
  { id: "facade", src0: 0.0, src1: 3.3, zoom: "in", voix: "Voici ce que tu peux avoir pour seulement 7 millions d'euros." },
  { id: "teaser-escalier", src0: 52.0, src1: 53.6, mirror: true, punch: true, voix: "Un double escalier de château," },
  { id: "teaser-cave", src0: 19.2, src1: 20.7, punch: true, zoom: "out", voix: "une cave à vin tout en verre," },
  { id: "teaser-piscine", src0: 60.45, src1: 62.0, rate: 0.8, punch: true, zoom: "in", voix: "une piscine pour les soirées d'été…" },
  { id: "allee", src0: 4.3, src1: 6.45, rate: 0.7, zoom: "in", voix: "Et à la fin, tu me diras si elle les vaut." },
  { id: "entree", src0: 6.5, src1: 8.45, rate: 0.7, zoom: "in", voix: "On entre… et direct, deux escaliers qui se rejoignent." },
  {
    id: "salon",
    src0: 8.5,
    src1: 16.8,
    mirror: true,
    voix: "Le salon : plafond en arches, poutres noires… et regarde cette cheminée encastrée dans le mur. Le canapé ? Assez grand pour toute la famille, même celle que t'aimes pas.",
  },
  {
    id: "cave",
    src0: 17.5,
    src1: 23.0,
    mirror: true,
    zoom: "in",
    voix: "La cave à vin, juste à l'entrée. Parfait pour impressionner tes invités… ou pour ranger ton jus de raisin.",
  },
  {
    id: "cuisine",
    src0: 24.0,
    src1: 31.8,
    voix: "Et là… la cuisine. Des fenêtres jusqu'au plafond… honnêtement, rien que pour ça, je signe. Et un îlot plus grand que mon appart.",
  },
  {
    id: "cuisine-hotte",
    src0: 37.0,
    src1: 42.0,
    mirror: true,
    voix: "Placards bleu nuit, LED sous chaque meuble, et une hotte en inox… pour le chef que t'es pas.",
  },
  { id: "chambre", src0: 43.6, src1: 46.6, zoom: "out", voix: "La chambre parentale, avec son lustre en anneau." },
  {
    id: "salle-de-bain",
    src0: 46.6,
    src1: 50.6,
    mirror: true,
    voix: "Et la salle de bain : douche à l'italienne, et une baignoire posée au milieu.",
  },
  {
    id: "salle-de-jeux",
    src0: 54.5,
    src1: 60.4,
    mirror: true,
    voix: "À l'étage, au bout du couloir, une salle de jeux pour les enfants… ou pour toi, on juge pas.",
  },
  { id: "mezzanine", src0: 50.7, src1: 54.0, rate: 0.85, voix: "Et cette vue sur l'entrée, avec le lustre géant au milieu." },
  { id: "fin-piscine", src0: 60.45, src1: 62.0, rate: 0.5, mirror: true, zoom: "in", voix: "Alors, 7 millions… un : tu signes direct." },
  { id: "fin-facade", src0: 0.0, src1: 2.4, zoom: "in", voix: "Deux : c'est beaucoup trop cher. Dis-le en commentaire !" },
];

export type Placed = Seg & { from: number; frames: number; rate: number };

const f = (t: number) => Math.round(t * FPS);
let cursor = 0;
export const PLACED: Placed[] = SEGS.map((s) => {
  const rate = s.rate ?? 1;
  const frames = f((s.src1 - s.src0) / rate);
  const p = { ...s, rate, from: cursor, frames };
  cursor += frames;
  return p;
});
export const TOTAL_FRAMES = cursor;

/** Seconde de sortie correspondant à une seconde du rush dans un plan donné. */
export const outTime = (segId: string, src: number) => {
  const p = PLACED.find((s) => s.id === segId)!;
  return p.from / FPS + (src - p.src0) / p.rate;
};

// Cercles et flèches : uniquement sur ce que dit la voix, suivis image par image (tracks.json)
export type Annot = {
  seg: string;
  track: string;
  kind: "cercle" | "fleche";
  src0: number; // apparition (seconde du rush)
  src1?: number; // disparition (sinon : fin du plan)
  dir?: "bas-droite" | "bas-gauche" | "haut-droite" | "haut-gauche"; // d'où vient la flèche (à l'écran)
  son: "pop" | "tintement";
};

export const ANNOTS: Annot[] = [
  { seg: "facade", track: "maison", kind: "cercle", src0: 0.3, son: "pop" }, // cercle à 0,3 s
  { seg: "facade", track: "porte", kind: "fleche", src0: 2.0, dir: "bas-droite", son: "tintement" }, // flèche à 2 s (« 7 millions »)
  { seg: "entree", track: "escalier", kind: "fleche", src0: 7.0, dir: "bas-droite", son: "pop" },
  { seg: "salon", track: "cheminee", kind: "cercle", src0: 12.6, src1: 14.4, son: "pop" },
  { seg: "cuisine", track: "ilot", kind: "cercle", src0: 30.0, son: "pop" },
  { seg: "cuisine-hotte", track: "hotte", kind: "fleche", src0: 40.5, src1: 41.9, dir: "bas-droite", son: "pop" },
  { seg: "salle-de-bain", track: "baignoire", kind: "cercle", src0: 49.0, son: "pop" },
  { seg: "mezzanine", track: "lustre", kind: "fleche", src0: 52.3, dir: "bas-gauche", son: "pop" },
];

// Question finale « 1 ou 2 » : deux pastilles (petites, en haut à gauche, hors interface TikTok)
export const CHOIX = [
  { t: outTime("fin-piscine", 60.45) + 1.0, n: "1", texte: "je signe direct" },
  { t: outTime("fin-facade", 0) + 0.1, n: "2", texte: "beaucoup trop cher" },
];
