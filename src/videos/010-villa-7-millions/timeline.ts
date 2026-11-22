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
    voix: "Le salon… regarde ce plafond en arches, avec ses poutres noires. La cheminée, encastrée dans le mur. Et le canapé ? Assez grand pour toute ta belle-famille… même celle qui t'aime pas.",
  },
  {
    id: "cave",
    src0: 17.5,
    src1: 23.0,
    mirror: true,
    zoom: "in",
    voix: "La cave à vin, toute vitrée, juste à l'entrée. Parfait pour impressionner tes invités… ou pour ranger ton jus de raisin.",
  },
  {
    id: "cuisine",
    src0: 24.0,
    src1: 31.8,
    voix: "Et là… la cuisine. Des fenêtres jusqu'au plafond… honnêtement, rien que pour ça, je signe. Et un îlot plus grand que mon appart.",
  },
  {
    id: "cuisine-hotte",
    src0: 37.5,
    src1: 42.0,
    mirror: true,
    voix: "Placards bleu nuit, LED sous chaque meuble, et une hotte en inox… pour le chef que t'es pas.",
  },
  { id: "chambre", src0: 43.6, src1: 46.6, zoom: "out", voix: "La chambre, sous un plafond cathédrale." },
  {
    id: "salle-de-bain",
    src0: 46.6,
    src1: 50.6,
    rate: 0.7,
    mirror: true,
    voix: "Et la salle de bain, avec sa baignoire posée au milieu… et sa douche à l'italienne, toute vitrée.",
  },
  {
    id: "salle-de-jeux",
    src0: 55.2,
    src1: 60.4,
    mirror: true,
    voix: "À l'étage, au bout du couloir, une salle de jeux pour les enfants… ou pour toi, on juge pas.",
  },
  { id: "mezzanine", src0: 50.7, src1: 54.0, voix: "Et depuis la mezzanine, vue plongeante sur les deux escaliers." },
  { id: "fin-piscine", src0: 60.45, src1: 62.0, rate: 0.4, mirror: true, zoom: "in", voix: "Et dehors, la piscine. Alors, 7 millions… un : tu signes direct." },
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
export type Son = "pop" | "argent" | "plouf" | "verre" | "scintille" | "coussin" | "jeu";
export type Annot = {
  seg: string;
  track: string;
  kind: "cercle" | "fleche";
  src0: number; // apparition (seconde du rush)
  src1?: number; // disparition (sinon : fin du plan)
  dir?: "bas-droite" | "bas-gauche" | "haut-droite" | "haut-gauche"; // d'où vient la flèche (à l'écran)
  son?: Son; // pas obligatoire
  phrase: string; // phrase du script qui justifie la flèche
};

// Flèches uniquement sur l'ARCHITECTURE dont parle le script (pas la déco).
export const ANNOTS: Annot[] = [
  { seg: "facade", track: "maison-facade", kind: "fleche", src0: 0.3, dir: "bas-droite", phrase: "Voici ce que tu peux avoir…" },
  { seg: "teaser-piscine", track: "piscine", kind: "fleche", src0: 60.5, dir: "haut-droite", son: "plouf", phrase: "une piscine pour les soirées d'été" },
  { seg: "entree", track: "escalier-g", kind: "fleche", src0: 7.0, dir: "bas-droite", son: "scintille", phrase: "deux escaliers qui se rejoignent" },
  { seg: "entree", track: "escalier-d", kind: "fleche", src0: 7.0, dir: "bas-gauche", phrase: "deux escaliers qui se rejoignent" },
  { seg: "salon", track: "arches-fixe", kind: "fleche", src0: 9.8, src1: 12.2, dir: "bas-droite", son: "pop", phrase: "regarde ce plafond en arches" },
  { seg: "salon", track: "canape2", kind: "fleche", src0: 15.2, src1: 16.4, dir: "haut-droite", son: "coussin", phrase: "Et le canapé ? Assez grand pour toute ta belle-famille… même celle qui t'aime pas." },
  { seg: "cave", track: "bouteilles", kind: "fleche", src0: 18.0, src1: 19.0, dir: "bas-gauche", son: "verre", phrase: "La cave à vin, toute vitrée" },
  { seg: "cuisine", track: "fenetres", kind: "fleche", src0: 25.5, src1: 27.5, dir: "bas-droite", phrase: "Des fenêtres jusqu'au plafond" },
  { seg: "cuisine", track: "fenetre2", kind: "fleche", src0: 25.6, src1: 27.2, dir: "bas-gauche", phrase: "Des fenêtres jusqu'au plafond" },
  { seg: "cuisine", track: "ilot", kind: "fleche", src0: 30.0, dir: "haut-droite", son: "pop", phrase: "un îlot plus grand que mon appart" },
  { seg: "cuisine-hotte", track: "hotte", kind: "fleche", src0: 40.5, src1: 41.8, dir: "bas-droite", phrase: "et une hotte en inox… pour le chef que t'es pas" },
  { seg: "chambre", track: "poutres", kind: "fleche", src0: 44.0, src1: 45.0, dir: "bas-droite", phrase: "La chambre, sous un plafond cathédrale" },
  { seg: "salle-de-bain", track: "douche", kind: "fleche", src0: 49.6, dir: "bas-droite", phrase: "et sa douche à l'italienne, toute vitrée" },
  { seg: "mezzanine", track: "mezz-g", kind: "fleche", src0: 52.6, src1: 53.9, dir: "bas-droite", son: "scintille", phrase: "vue plongeante sur les deux escaliers" },
  { seg: "mezzanine", track: "mezz-d", kind: "fleche", src0: 52.6, dir: "bas-gauche", phrase: "vue plongeante sur les deux escaliers" },
  { seg: "fin-piscine", track: "piscine", kind: "fleche", src0: 60.5, dir: "haut-gauche", son: "plouf", phrase: "Et dehors, la piscine" },
];

// Question finale « 1 ou 2 » : deux pastilles (petites, en haut à gauche, hors interface TikTok)
export const CHOIX = [
  { t: outTime("fin-piscine", 60.45) + 2.6, n: "1", texte: "je signe direct" },
  { t: outTime("fin-facade", 0) + 0.6, n: "2", texte: "beaucoup trop cher" },
];

// Étiquette de prix sur « 7 millions d'euros » (avec bruit d'argent)
export const PRIX = { from: 1.9, to: 5.0, texte: "7 000 000 €" };
