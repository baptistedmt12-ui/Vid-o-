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

// v2 : intro 2 éléments → Marseille + 450 000 € → appel à rester → visite (appel « de quelle ville tu es » au milieu).
// Durées estimées (≈ 3,55 mots/s) : recalées au mot près sur la vraie voix.
export const SEGS: Seg[] = [
  { id: "intro-escalier", rush: "t", src0: 17.0, src1: 18.2, dur: 1.1, mirror: true, punch: true, voix: "Un escalier qui flotte" },
  { id: "intro-piscine", rush: "t", src0: 59.5, src1: 60.7, dur: 2.16, punch: true, zoom: "in", voix: "et une piscine qui s'illumine la nuit !" },
  { id: "facade", rush: "t", src0: 0.0, src1: 3.0, dur: 4.22, zoom: "in", voix: "Bienvenue à Marseille, et regarde ce que t'as pour quatre cent cinquante mille euros !" },
  { id: "allee", rush: "t", src0: 8.0, src1: 11.4, dur: 3.1, zoom: "in", voix: "Reste bien jusqu'à la fin, tu vas pas en revenir." },
  { id: "entree", rush: "t", src0: 11.7, src1: 18.5, dur: 5.25, voix: "L'entrée, avec cet escalier en verre qui flotte dans le vide. Franchement, j'ose même pas monter dessus." },
  { id: "salon", rush: "t", src0: 19.0, src1: 24.5, dur: 3.47, voix: "Le salon, avec son bar intégré… pour les soirées entre potes." },
  { id: "salle-a-manger", rush: "t", src0: 25.5, src1: 29.0, dur: 2.44, mirror: true, voix: "La salle à manger et ses lustres dorés," },
  { id: "cave", rush: "t", src0: 29.5, src1: 32.5, dur: 5.0, mirror: true, voix: "et juste à côté, la cave à vin vitrée. Tu prends un verre ? Moi, je dis jamais non." },
  { id: "cuisine", rush: "t", src0: 37.5, src1: 44.0, dur: 4.03, voix: "La cuisine : un îlot en marbre interminable… assez long pour tout le quartier." },
  { id: "cta-ville", rush: "t", src0: 44.0, src1: 47.0, dur: 3.1, mirror: true, voix: "D'ailleurs, dis-moi en commentaire de quelle ville tu es !" },
  { id: "mezzanine", rush: "t", src0: 55.0, src1: 57.5, dur: 2.25, mirror: true, voix: "À l'étage, une mezzanine tout en verre," },
  { id: "suite", rush: "t", src0: 48.0, src1: 50.5, dur: 2.53, voix: "la suite parentale, avec vue sur le jardin," },
  { id: "salle-de-bain", rush: "t", src0: 50.8, src1: 54.5, dur: 3.94, voix: "et sa salle de bain en marbre, avec une baignoire posée au milieu." },
  { id: "chambre-amis-1", rush: "p", src0: 56.5, src1: 59.5, dur: 1.8, voix: "Deux chambres d'amis…" },
  { id: "chambre-amis-2", rush: "p", src0: 79.8, src1: 82.0, dur: 2.2, mirror: true, voix: "pour la belle-famille qu'on invite le moins possible." },
  { id: "balcon", rush: "p", src0: 47.8, src1: 50.4, dur: 3.6, zoom: "in", voix: "Un balcon avec vue sur le lac, parfait pour ton café du matin," },
  { id: "cinema", rush: "t", src0: 57.9, src1: 59.3, dur: 2.16, voix: "un cinéma privé pour tes soirées Netflix," },
  { id: "piscine-jour", rush: "p", src0: 16.6, src1: 20.0, dur: 2.4, zoom: "in", voix: "et la piscine… le jour," },
  { id: "piscine-nuit", rush: "t", src0: 59.5, src1: 60.7, dur: 2.06, mirror: true, zoom: "in", voix: "et la nuit. Avoue, c'est magique." },
  { id: "fin-1", rush: "t", src0: 7.5, src1: 11.4, dur: 3.6, mirror: true, zoom: "in", voix: "Alors, sois honnête : quatre cent cinquante mille euros à Marseille…" },
  { id: "fin-2", rush: "t", src0: 0.0, src1: 3.0, dur: 4.0, mirror: true, zoom: "in", voix: "un, tu signes tout de suite ? Ou deux, c'est forcément une arnaque ? Dis-le en commentaire !" },
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
  { seg: "intro-escalier", track: "t:escalier", src0: 17.1, dir: "bas-gauche", phrase: "Un escalier qui flotte" },
  { seg: "intro-piscine", track: "t:piscine", src0: 59.6, dir: "haut-droite", son: "plouf", phrase: "une piscine qui s'illumine la nuit" },
  { seg: "facade", track: "t:maison", src0: 0.3, src1: 1.2, dir: "bas-droite", phrase: "Bienvenue à Marseille" },
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
// Pas de texte d'accroche à l'écran : l'utilisateur met son titre lui-même dans TikTok.
export const ACCROCHE = { from: 0, to: 0, texte: "" };

// Prix sur « quatre cent cinquante mille » (étiquette « PRIX »)
export const PRIX = { from: outTime("facade", 0) + 1.9, to: outTime("allee", 11.4), texte: "450 000 €" };

export const CHOIX = [
  { t: outTime("fin-2", 0) + 0.1, n: "1", texte: "je signe tout de suite" },
  { t: outTime("fin-2", 0) + 1.4, n: "2", texte: "c'est une arnaque" },
];

export const VOIX: { fichier: string; at: number }[] = [];
