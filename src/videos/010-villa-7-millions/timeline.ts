// Vidéo 010 — Villa à « seulement » 7 millions d'euros.
// Montage calé au mot près sur la voix off réelle (Chloé, ElevenLabs) : assets/voix/voix-mots.json.
// Temps « src » = secondes du rush original (60 i/s), temps « out » = secondes de la vidéo finale.

export const FPS = 30;
export const RUSH = "010-villa-7-millions/rushes/original/rush.mp4";

export type Seg = {
  id: string;
  src0: number;
  src1: number;
  rate?: number; // < 1 = ralenti
  dur?: number; // durée imposée à l'écran (s) : la vitesse s'adapte (calage sur la voix)
  mirror?: boolean; // effet miroir (image retournée)
  zoom?: "in" | "out"; // zoom lent pendant le plan
  punch?: boolean; // entrée en léger zoom (teaser)
  voix: string; // texte de la voix off prévu sur ce plan
};

// Structure des exemples : accroche → intro rapide des points forts → visite dans l'ordre (A à Z) → piscine → question.
export const SEGS: Seg[] = [
  // Intro rapide des points forts (sans le prix), plan le plus fort en premier avec le boom
  { id: "intro-piscine", src0: 60.45, src1: 62.0, dur: 1.95, punch: true, zoom: "in", voix: "Une piscine face au coucher du soleil," },
  { id: "intro-escalier", src0: 52.0, src1: 53.6, dur: 2.0, mirror: true, punch: true, voix: "un double escalier ultra moderne," },
  { id: "intro-cheminee", src0: 12.3, src1: 14.4, dur: 2.4, mirror: true, punch: true, zoom: "in", voix: "et même une cheminée incrustée dans le mur." },
  // Puis la présentation, directement
  { id: "facade", src0: 0.0, src1: 3.3, dur: 3.05, zoom: "in", voix: "Voici ce que tu peux avoir pour seulement 7 millions d'euros." },
  { id: "allee", src0: 3.3, src1: 6.45, zoom: "in", dur: 4.42, voix: "Reste bien jusqu'à la fin. On commence par l'allée fleurie, et cette porte en arche." },
  // Visite dans l'ordre
  { id: "entree", src0: 6.5, src1: 8.45, zoom: "in", dur: 4.33, voix: "À l'intérieur, deux escaliers qui se rejoignent, direct, ça donne le ton." },
  {
    id: "cave",
    src0: 17.5,
    src1: 23.0,
    mirror: true,
    zoom: "in", dur: 6.91,
    voix: "Juste à côté, la cave à vin, avec des centaines de bouteilles. Parfait pour impressionner tes invités, ou pour cacher ton jus de raisin.",
  },
  {
    id: "salon",
    src0: 8.5,
    src1: 15.6,
    mirror: true, dur: 7.12,
    voix: "Le salon ? Un plafond en arches, des poutres noires, et un canapé assez grand pour toute ta belle-famille… celle qui t'aime pas.",
  },
  {
    id: "cuisine",
    src0: 24.0,
    src1: 31.8, dur: 6.7,
    voix: "La cuisine : des fenêtres partout, jusqu'au plafond. T'as même pas besoin d'allumer. Un îlot plus grand que mon appart,",
  },
  {
    id: "cuisine-hotte",
    src0: 40.0,
    src1: 42.0,
    mirror: true, dur: 3.62,
    voix: "et une hotte en inox… pour faire disparaître l'odeur de tes plats ratés.",
  },
  { id: "mezzanine", src0: 51.8, src1: 54.0, dur: 3.81, voix: "À l'étage, les deux escaliers vus d'en haut, avoue, c'est stylé." },
  { id: "chambre", src0: 43.6, src1: 45.1, zoom: "out", dur: 3.07, voix: "La suite parentale, et regarde-moi ce lustre !" },
  {
    id: "salle-de-bain",
    src0: 49.0,
    src1: 50.6,
    mirror: true, dur: 3.88,
    voix: "La salle de bain, avec sa douche à l'italienne : la tienne est jalouse.",
  },
  {
    id: "salle-de-jeux",
    src0: 55.2,
    src1: 60.4,
    mirror: true, dur: 4.22,
    voix: "Au bout du couloir, une salle de jeux pour les enfants… ou pour toi, on juge pas.",
  },
  { id: "fin-piscine", src0: 60.45, src1: 62.0, mirror: true, zoom: "in", dur: 1.99, voix: "Et pour finir, la piscine. Alors, sois honnête : un, tu signes direct ?" },
  { id: "fin-facade", src0: 0.0, src1: 3.3, zoom: "in", dur: 5.44, voix: "Ou deux, beaucoup trop cher ? Dis-le en commentaire !" },
];

export type Placed = Seg & { from: number; frames: number; rate: number };

const f = (t: number) => Math.round(t * FPS);
let cursor = 0;
export const PLACED: Placed[] = SEGS.map((s) => {
  const rate = s.dur ? (s.src1 - s.src0) / s.dur : s.rate ?? 1;
  const frames = s.dur ? f(s.dur) : f((s.src1 - s.src0) / rate);
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
  // Intro
  { seg: "intro-piscine", track: "piscine", kind: "fleche", src0: 60.69, dir: "haut-droite", son: "plouf", phrase: "Une piscine face au coucher du soleil" },
  { seg: "intro-escalier", track: "mezz-g", kind: "fleche", src0: 52.4, dir: "bas-gauche", son: "scintille", phrase: "un double escalier ultra moderne" },
  { seg: "intro-escalier", track: "mezz-d", kind: "fleche", src0: 52.4, dir: "bas-droite", phrase: "un double escalier ultra moderne" },
  { seg: "intro-cheminee", track: "cheminee", kind: "fleche", src0: 12.6, src1: 14.1, dir: "bas-droite", son: "pop", phrase: "et même une cheminée incrustée dans le mur" },
  // Présentation + visite dans l'ordre
  { seg: "facade", track: "maison-facade", kind: "fleche", src0: 0.3, dir: "bas-droite", phrase: "Voici ce que tu peux avoir…" },
  { seg: "allee", track: "porte-allee", kind: "fleche", src0: 5.6, dir: "bas-droite", son: "pop", phrase: "et cette porte en arche" },
  { seg: "entree", track: "escalier-g", kind: "fleche", src0: 7.0, dir: "bas-droite", son: "scintille", phrase: "deux escaliers qui se rejoignent" },
  { seg: "entree", track: "escalier-d", kind: "fleche", src0: 7.0, dir: "bas-gauche", phrase: "deux escaliers qui se rejoignent" },
  { seg: "cave", track: "bouteilles", kind: "fleche", src0: 18.0, src1: 19.0, dir: "bas-gauche", son: "verre", phrase: "avec des centaines de bouteilles" },
  { seg: "salon", track: "arches-fixe", kind: "fleche", src0: 9.8, src1: 12.2, dir: "bas-droite", son: "pop", phrase: "Un plafond en arches, des poutres noires" },
  { seg: "salon", track: "canape3", kind: "fleche", src0: 11.5, src1: 12.6, dir: "haut-droite", son: "coussin", phrase: "un canapé assez grand pour toute ta belle-famille" },
  { seg: "cuisine", track: "baie-g", kind: "fleche", src0: 25.3, src1: 26.3, dir: "bas-droite", phrase: "des fenêtres partout, jusqu'au plafond" },
  { seg: "cuisine", track: "baie-d", kind: "fleche", src0: 25.3, src1: 26.3, dir: "bas-droite", phrase: "des fenêtres partout, jusqu'au plafond" },
  { seg: "cuisine", track: "fenetres", kind: "fleche", src0: 25.6, src1: 27.2, dir: "haut-droite", son: "scintille", phrase: "des fenêtres partout, jusqu'au plafond" },
  { seg: "cuisine", track: "fenetre2", kind: "fleche", src0: 25.6, src1: 27.2, dir: "bas-gauche", phrase: "des fenêtres partout, jusqu'au plafond" },
  { seg: "cuisine", track: "ilot", kind: "fleche", src0: 30.0, dir: "haut-droite", son: "pop", phrase: "un îlot plus grand que mon appart" },
  { seg: "cuisine-hotte", track: "hotte", kind: "fleche", src0: 40.1, src1: 41.8, dir: "bas-droite", phrase: "Et une hotte en inox… pour faire disparaître l'odeur de tes plats ratés" },
  { seg: "mezzanine", track: "mezz-g", kind: "fleche", src0: 52.6, dir: "bas-droite", son: "scintille", phrase: "les deux escaliers vus d'en haut" },
  { seg: "mezzanine", track: "mezz-d", kind: "fleche", src0: 52.6, dir: "bas-gauche", phrase: "les deux escaliers vus d'en haut" },
  { seg: "chambre", track: "anneau", kind: "fleche", src0: 44.0, src1: 44.9, dir: "bas-gauche", son: "pop", phrase: "La suite parentale… et regarde ce lustre !" },
  { seg: "salle-de-bain", track: "douche", kind: "fleche", src0: 49.6, dir: "bas-droite", son: "pop", phrase: "avec sa douche à l'italienne, toute vitrée" },
  { seg: "fin-piscine", track: "piscine", kind: "fleche", src0: 60.5, dir: "haut-gauche", son: "plouf", phrase: "Et pour finir, la piscine" },
];

// Question finale « 1 ou 2 » : deux pastilles (petites, en haut à gauche, hors interface TikTok)
export const CHOIX = [
  { t: 60.8, n: "1", texte: "je signe direct" }, // « un » à 60,86 s
  { t: 62.35, n: "2", texte: "beaucoup trop cher" }, // « deux » à 62,47 s
];

// Étiquette de prix sur « 7 millions d'euros » (avec bruit d'argent)
export const PRIX = { from: 8.3, to: 10.8, texte: "7 000 000 €" }; // « sept millions » à 8,4 s dans la voix

// Voix off (Chloé, ElevenLabs eleven_v4) : morceaux posés à leur seconde de sortie
export const VOIX = [{ fichier: "voix/voix-complete.wav", at: 0 }];
