// Vidéo 011 — La maison à l'escalier secret (montage de 2 vidéos de visite, présentées comme une seule maison).
// Montage calé sur une voix off IMAGINÉE (≈ 3,3 mots/s) : à recaler au mot près sur la vraie voix (Chloé, ElevenLabs).
// Temps « src » = secondes du rush (v1 ou v2, 60 i/s) ; temps « out » = secondes de la vidéo finale.
// Leçons de la 010 (décrochage à 0:02) : enjeu dès la 1re seconde, texte d'accroche à l'écran, plans lumineux et rapides au début.

export const FPS = 30;
export type Rush = "v1" | "v2";
export const RUSHES: Record<Rush, string> = {
  v1: "011-maison-escalier-secret/rushes/original/v1.mp4",
  v2: "011-maison-escalier-secret/rushes/original/v2.mp4",
};

export type Seg = {
  id: string;
  rush: Rush;
  src0: number;
  src1: number;
  dur: number; // durée à l'écran (s) : la vitesse s'adapte
  mirror?: boolean;
  zoom?: "in" | "out";
  punch?: boolean;
  crop?: number; // zoom fixe en plus (ex. faire sortir un texte incrusté du cadre)
  voix: string;
};

export const SEGS: Seg[] = [
  // Accroche : l'élément le plus surprenant, tout de suite
  { id: "accroche-escalier", rush: "v1", src0: 42.0, src1: 43.9, dur: 2.7, zoom: "in", voix: "Cette maison cache un escalier secret… dans son dressing !" },
  // Points forts en rafale (≈ 1 s par plan)
  { id: "rafale-piscine", rush: "v2", src0: 59.6, src1: 60.8, dur: 1.0, mirror: true, punch: true, voix: "Une piscine," },
  { id: "rafale-cinema", rush: "v2", src0: 50.9, src1: 52.0, dur: 0.9, crop: 1.16, punch: true, voix: "un cinéma," },
  { id: "rafale-sport", rush: "v1", src0: 44.2, src1: 45.0, dur: 1.1, punch: true, voix: "une salle de sport," },
  { id: "rafale-billard", rush: "v1", src0: 46.0, src1: 47.2, dur: 0.9, punch: true, voix: "un billard…" },
  { id: "rafale-terrain", rush: "v2", src0: 52.3, src1: 54.0, dur: 1.5, punch: true, voix: "et même un terrain de basket." },
  // Présentation
  { id: "facade", rush: "v2", src0: 0.0, src1: 3.8, dur: 4.2, zoom: "in", voix: "Bienvenue dans la maison de tes rêves. Reste bien jusqu'à la fin pour connaître le prix." },
  { id: "allee", rush: "v2", src0: 3.85, src1: 6.65, dur: 2.4, zoom: "in", voix: "On commence par l'entrée…" },
  // Visite dans l'ordre
  { id: "entree", rush: "v2", src0: 6.75, src1: 10.0, dur: 3.3, voix: "une entrée sur deux étages, avec sa mezzanine." },
  { id: "bureau", rush: "v1", src0: 9.6, src1: 11.5, dur: 3.2, mirror: true, voix: "Un bureau avec une bibliothèque géante… pour faire semblant de lire." },
  { id: "salon", rush: "v1", src0: 12.5, src1: 19.5, dur: 5.2, voix: "Le salon, plafond immense… et la cave à vin en plein milieu. T'as juste à tendre le bras." },
  { id: "cuisine", rush: "v2", src0: 22.3, src1: 28.0, dur: 5.2, voix: "La cuisine : un îlot en marbre géant, et assez de tabourets pour inviter tout le quartier." },
  { id: "coursive", rush: "v2", src0: 45.7, src1: 50.0, dur: 3.0, mirror: true, voix: "À l'étage, une coursive qui surplombe tout le salon." },
  { id: "chambre", rush: "v2", src0: 36.1, src1: 39.0, dur: 2.8, zoom: "out", voix: "La chambre, avec ses poutres apparentes." },
  { id: "salle-de-bain", rush: "v1", src0: 33.0, src1: 37.0, dur: 3.2, mirror: true, voix: "La salle de bain… plus grande que ta chambre." },
  { id: "dressing", rush: "v1", src0: 38.6, src1: 43.9, dur: 5.6, mirror: true, voix: "Et le fameux dressing… regarde bien. Un escalier en colimaçon qui descend tout droit à la salle de sport !" },
  { id: "sport", rush: "v1", src0: 44.6, src1: 45.6, dur: 2.0, voix: "Plus aucune excuse pour sécher la muscu." },
  { id: "billard", rush: "v1", src0: 45.7, src1: 48.5, dur: 2.3, mirror: true, voix: "Le billard pour les soirées entre potes," },
  { id: "cinema", rush: "v2", src0: 50.85, src1: 52.15, dur: 2.8, mirror: true, crop: 1.16, voix: "et un vrai cinéma, avec son écran géant." },
  { id: "piscine", rush: "v2", src0: 33.2, src1: 36.0, dur: 3.0, zoom: "in", voix: "Et dehors, une piscine face au coucher du soleil." },
  // Fin : prix « n'importe quoi » donné comme un avis + question 1 ou 2
  { id: "fin-terrasse", rush: "v2", src0: 56.7, src1: 61.3, dur: 4.6, mirror: true, zoom: "in", voix: "Et le prix ? Pour moi, six cent mille euros, pas un centime de plus." },
  { id: "fin-facade", rush: "v2", src0: 0.0, src1: 3.0, dur: 3.3, zoom: "in", voix: "Alors, sois honnête : un, t'es d'accord ? Deux, n'importe quoi ? Dis-le en commentaire !" },
];

export type Placed = Seg & { from: number; frames: number; rate: number };
const f = (t: number) => Math.round(t * FPS);
let cursor = 0;
export const PLACED: Placed[] = SEGS.map((s) => {
  const frames = f(s.dur);
  const p = { ...s, rate: (s.src1 - s.src0) / s.dur, from: cursor, frames };
  cursor += frames;
  return p;
});
export const TOTAL_FRAMES = cursor;

export const outTime = (segId: string, src: number) => {
  const p = PLACED.find((s) => s.id === segId)!;
  return p.from / FPS + (src - p.src0) / p.rate;
};

export type Son = "pop" | "argent" | "plouf" | "verre" | "scintille" | "coussin" | "jeu";
export type Annot = {
  seg: string;
  track: string; // clé de tracks.json (« v1:… » / « v2:… »)
  src0: number;
  src1?: number;
  dir?: "bas-droite" | "bas-gauche" | "haut-droite" | "haut-gauche";
  son?: Son;
  phrase: string;
};

// Flèches uniquement sur ce que dit la voix ; jamais deux qui s'enchaînent trop vite.
export const ANNOTS: Annot[] = [
  { seg: "accroche-escalier", track: "v1:escalier", src0: 42.2, dir: "bas-gauche", phrase: "un escalier secret" },
  // rafale : une flèche par plan, sur le mot
  { seg: "rafale-piscine", track: "v2:piscine-soir", src0: 59.7, dir: "haut-droite", son: "plouf", phrase: "Une piscine" },
  { seg: "rafale-cinema", track: "v2:ecran", src0: 51.0, dir: "bas-gauche", phrase: "un cinéma" },
  { seg: "rafale-sport", track: "v1:sport", src0: 44.3, dir: "bas-droite", phrase: "une salle de sport" },
  { seg: "rafale-billard", track: "v1:billard", src0: 46.1, dir: "haut-droite", phrase: "un billard" },
  { seg: "rafale-terrain", track: "v2:terrain", src0: 52.5, src1: 53.7, dir: "haut-droite", son: "pop", phrase: "et même un terrain de basket" },
  { seg: "entree", track: "v2:mezzanine", src0: 7.2, src1: 8.8, dir: "bas-droite", son: "pop", phrase: "avec sa mezzanine" },
  { seg: "bureau", track: "v1:biblio", src0: 9.8, src1: 11.0, dir: "bas-droite", phrase: "une bibliothèque géante" },
  { seg: "salon", track: "v1:cave", src0: 16.8, dir: "bas-gauche", son: "verre", phrase: "la cave à vin en plein milieu" },
  { seg: "cuisine", track: "v2:ilot-marbre", src0: 24.0, src1: 26.5, dir: "haut-droite", son: "pop", phrase: "un îlot en marbre géant" },
  { seg: "coursive", track: "v2:coursive", src0: 46.5, src1: 47.5, dir: "haut-droite", phrase: "une coursive qui surplombe tout le salon" },
  { seg: "chambre", track: "v2:poutres", src0: 36.2, src1: 37.5, dir: "bas-gauche", phrase: "ses poutres apparentes" },
  { seg: "salle-de-bain", track: "v1:baignoire-haut", src0: 33.8, src1: 35.5, dir: "haut-droite", son: "pop", phrase: "plus grande que ta chambre" },
  { seg: "dressing", track: "v1:escalier", src0: 42.0, src1: 43.4, dir: "bas-droite", son: "scintille", phrase: "un escalier en colimaçon" },
  { seg: "cinema", track: "v2:ecran", src0: 51.1, dir: "bas-droite", phrase: "avec son écran géant" },
  { seg: "piscine", track: "v2:piscine-eau", src0: 33.3, src1: 35.5, dir: "haut-droite", son: "plouf", phrase: "une piscine face au coucher du soleil" },
];

// Texte d'accroche à l'écran (3 premières secondes, pour ceux qui scrollent sans le son)
export const ACCROCHE = { from: 0.0, to: 3.0, texte: "Attends de voir le dressing 😳" };

// Prix « n'importe quoi » (donné comme un avis) sur « six cent mille »
export const PRIX = { from: outTime("fin-terrasse", 56.7) + 1.3, to: outTime("fin-terrasse", 61.3), texte: "600 000 €" };

// Question finale « 1 ou 2 »
export const CHOIX = [
  { t: outTime("fin-facade", 0) + 1.0, n: "1", texte: "t'es d'accord" },
  { t: outTime("fin-facade", 0) + 1.9, n: "2", texte: "n'importe quoi" },
];

// Voix off : à remplir après génération (mêmes réglages que la 010)
export const VOIX: { fichier: string; at: number }[] = [];
