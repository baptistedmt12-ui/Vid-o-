// Vidéo 012 — La maison à l'escalier de verre (vidéo TikTok + vidéo Pinterest, présentées comme une seule maison).
// Montage calé sur une voix off IMAGINÉE (≈ 3,4 mots/s) : à recaler au mot près sur la vraie voix (Chloé, ElevenLabs).
// Rushes : t = vidéo TikTok (4K ramenée en 1080p quasi sans perte), p = vidéo Pinterest (720p, étalonnée pour se fondre).

export const FPS = 30;
export type Rush = "t" | "p";
export const RUSHES: Record<Rush, string> = {
  t: "012-maison-escalier-verre/rushes/original/tiktok-1080.mp4",
  p: "012-maison-escalier-verre/rushes/original/pinterest.mp4",
};
// Étalonnage des plans Pinterest (plus froids et plus clairs) pour les rapprocher de la vidéo TikTok
export const FILTRE_P = "brightness(0.94) contrast(1.07) saturate(0.9) sepia(0.08)";

export type Seg = {
  id: string;
  rush: Rush;
  src0: number;
  src1: number;
  dur: number;
  mirror?: boolean;
  zoom?: "in" | "out";
  punch?: boolean;
  crop?: number;
  voix: string;
};

export const SEGS: Seg[] = [
  // Accroche : la façade (comme la vidéo d'origine, qui a bien marché) + phrase intrigante
  { id: "accroche", rush: "t", src0: 0.0, src1: 3.0, dur: 2.7, zoom: "in", voix: "Personne ne veut croire le prix de cette maison." },
  // Rafale des points forts
  { id: "rafale-escalier", rush: "t", src0: 15.0, src1: 16.2, dur: 1.1, mirror: true, punch: true, voix: "Un escalier qui flotte," },
  { id: "rafale-cave", rush: "t", src0: 30.8, src1: 31.8, dur: 1.0, punch: true, voix: "une cave tout en verre," },
  { id: "rafale-piscine", rush: "t", src0: 59.5, src1: 60.7, dur: 2.0, punch: true, zoom: "in", voix: "et une piscine qui s'illumine la nuit !" },
  { id: "allee", rush: "t", src0: 3.0, src1: 11.4, dur: 5.4, zoom: "in", voix: "Bienvenue dans une maison qui coche toutes les cases. Reste bien jusqu'à la fin pour connaître le prix." },
  // Visite dans l'ordre
  { id: "entree", rush: "t", src0: 11.7, src1: 18.5, dur: 4.2, voix: "On entre… et direct, cet escalier en verre qui flotte dans le vide." },
  { id: "salon", rush: "t", src0: 19.0, src1: 24.5, dur: 4.0, voix: "Le salon, avec son bar intégré… pour les soirées entre potes." },
  { id: "salle-a-manger", rush: "t", src0: 25.5, src1: 29.0, dur: 2.6, mirror: true, voix: "La salle à manger et ses lustres dorés," },
  { id: "cave", rush: "t", src0: 29.5, src1: 32.5, dur: 3.5, mirror: true, voix: "et juste à côté, la cave à vin vitrée. Tu prends un verre ?" },
  { id: "cuisine", rush: "t", src0: 37.5, src1: 44.0, dur: 4.4, voix: "La cuisine : un îlot en marbre interminable… assez long pour tout le quartier." },
  { id: "salon-2", rush: "t", src0: 44.0, src1: 47.0, dur: 2.0, mirror: true, voix: "Et un deuxième salon, ultra cosy." },
  { id: "mezzanine", rush: "t", src0: 55.0, src1: 57.5, dur: 2.8, mirror: true, voix: "À l'étage, une mezzanine tout en verre," },
  { id: "suite", rush: "t", src0: 48.0, src1: 50.5, dur: 1.4, voix: "la suite parentale," },
  { id: "salle-de-bain", rush: "t", src0: 50.8, src1: 54.5, dur: 3.6, voix: "et sa salle de bain en marbre, avec une baignoire posée au milieu." },
  { id: "chambre-amis-1", rush: "p", src0: 56.5, src1: 59.5, dur: 2.2, voix: "Deux chambres d'amis…" },
  { id: "chambre-amis-2", rush: "p", src0: 79.8, src1: 82.0, dur: 2.2, mirror: true, voix: "pour la belle-famille qu'on invite le moins possible." },
  { id: "balcon", rush: "p", src0: 48.6, src1: 50.2, dur: 2.2, zoom: "in", voix: "Un balcon avec vue sur le lac," },
  { id: "cinema", rush: "t", src0: 57.9, src1: 59.3, dur: 2.4, voix: "un cinéma privé, pour tes soirées Netflix," },
  { id: "piscine-jour", rush: "p", src0: 16.6, src1: 20.0, dur: 2.8, zoom: "in", voix: "et la piscine… le jour," },
  { id: "piscine-nuit", rush: "t", src0: 59.5, src1: 60.7, dur: 2.4, mirror: true, zoom: "in", voix: "et la nuit. Avoue, c'est magique." },
  // Fin : prix « n'importe quoi » donné comme un avis + question 1 ou 2
  { id: "fin-prix", rush: "t", src0: 7.5, src1: 11.4, dur: 4.0, mirror: true, zoom: "in", voix: "Et le prix ? Pour moi, huit cent mille euros, pas un centime de plus." },
  { id: "fin-facade", rush: "t", src0: 0.0, src1: 3.0, dur: 4.0, mirror: true, zoom: "in", voix: "Alors, sois honnête : un, t'es d'accord ? Deux, n'importe quoi ? Dis-le en commentaire !" },
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
  { seg: "accroche", track: "t:maison", src0: 0.3, src1: 1.2, dir: "bas-droite", phrase: "cette maison" },
  { seg: "rafale-escalier", track: "t:escalier", src0: 15.05, dir: "bas-gauche", phrase: "Un escalier qui flotte" },
  { seg: "rafale-cave", track: "t:cave", src0: 30.85, dir: "bas-droite", son: "verre", phrase: "une cave tout en verre" },
  { seg: "rafale-piscine", track: "t:piscine", src0: 59.6, dir: "haut-droite", son: "plouf", phrase: "une piscine qui s'illumine la nuit" },
  { seg: "entree", track: "t:escalier", src0: 15.0, src1: 18.0, dir: "bas-droite", son: "scintille", phrase: "cet escalier en verre qui flotte dans le vide" },
  { seg: "salon", track: "t:bar", src0: 22.0, src1: 24.0, dir: "bas-gauche", son: "pop", phrase: "son bar intégré" },
  { seg: "salle-a-manger", track: "t:lustres", src0: 26.2, dir: "bas-droite", phrase: "ses lustres dorés" },
  { seg: "cave", track: "t:cave", src0: 30.2, dir: "bas-gauche", son: "verre", phrase: "la cave à vin vitrée" },
  { seg: "cuisine", track: "t:ilot", src0: 39.0, src1: 40.4, dir: "haut-droite", son: "pop", phrase: "un îlot en marbre interminable" },
  { seg: "mezzanine", track: "t:mezzanine", src0: 55.2, src1: 56.2, dir: "haut-droite", phrase: "une mezzanine tout en verre" },
  { seg: "salle-de-bain", track: "t:baignoire", src0: 52.0, dir: "haut-droite", son: "pop", phrase: "une baignoire posée au milieu" },
  { seg: "balcon", track: "p:lac-fixe", src0: 48.9, dir: "haut-droite", phrase: "vue sur le lac" },
  { seg: "piscine-jour", track: "p:piscine", src0: 16.8, dir: "haut-droite", son: "plouf", phrase: "la piscine… le jour" },
  { seg: "piscine-nuit", track: "t:piscine", src0: 59.6, dir: "haut-gauche", son: "scintille", phrase: "et la nuit" },
];

// Texte d'accroche à l'écran (3 premières secondes)
export const ACCROCHE = { from: 0.0, to: 3.0, texte: "Devine le prix 😳" };

// Prix « n'importe quoi » (donné comme un avis) sur « huit cent mille »
export const PRIX = { from: outTime("fin-prix", 7.5) + 1.2, to: outTime("fin-prix", 11.4), texte: "800 000 €" };

export const CHOIX = [
  { t: outTime("fin-facade", 0) + 1.0, n: "1", texte: "t'es d'accord" },
  { t: outTime("fin-facade", 0) + 1.9, n: "2", texte: "n'importe quoi" },
];

export const VOIX: { fichier: string; at: number }[] = [];
