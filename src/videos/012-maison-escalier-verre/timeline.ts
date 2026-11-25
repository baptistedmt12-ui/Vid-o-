// Vidéo 012 — La maison à l'escalier de verre (vidéo TikTok + vidéo Pinterest, présentées comme une seule maison).
// Montage calé au mot près sur la voix off réelle (Chloé, ElevenLabs eleven_v4).
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

// Calé au mot près sur la voix réelle (assets/voix/voix-mots.json), coupes 0,08 s avant chaque phrase.
// Règle : un élément cité et fléché à chaque plan ; punch à chaque coupe pour le dynamisme.
export const SEGS: Seg[] = [
  { id: "intro-escalier", rush: "t", src0: 17.0, src1: 18.2, dur: 1.24, mirror: true, punch: true, voix: "Un escalier qui flotte" },
  { id: "intro-piscine", rush: "t", src0: 59.5, src1: 60.7, dur: 2.13, punch: true, zoom: "in", voix: "et une piscine qui s'illumine la nuit" },
  { id: "facade", rush: "t", src0: 0.0, src1: 3.0, dur: 3.755, zoom: "in", voix: "Bienvenue à Marseille et regarde ce que t'as pour quatre cent cinquante mille euros" },
  { id: "allee", rush: "t", src0: 8.0, src1: 11.4, dur: 2.67, zoom: "in", voix: "Reste bien jusqu'à la fin tu vas pas t'en remettre" },
  { id: "entree", rush: "t", src0: 14.2, src1: 18.5, dur: 5.331, punch: true, voix: "L'entrée avec cet escalier en verre qui flotte dans le vide Franchement j'ose même pas monter dessus" },
  { id: "salon", rush: "t", src0: 21.0, src1: 24.5, dur: 3.127, punch: true, voix: "Le salon avec son bar intégré pour les soirées entre potes" },
  { id: "salle-a-manger", rush: "t", src0: 25.5, src1: 29.0, dur: 2.11, mirror: true, punch: true, voix: "La salle à manger et ses lustres dorés" },
  { id: "cave", rush: "t", src0: 29.5, src1: 32.5, dur: 4.271, mirror: true, punch: true, voix: "et juste à côté la cave à vin vitrée Tu prends un verre Moi je dis jamais non" },
  { id: "cuisine", rush: "t", src0: 37.5, src1: 44.0, dur: 4.352, punch: true, voix: "La cuisine un îlot en marbre interminable assez long pour tout le quartier" },
  { id: "salon-2", rush: "t", src0: 45.3, src1: 47.0, dur: 2.479, mirror: true, punch: true, voix: "Le deuxième salon avec son canapé géant" },
  { id: "cta-ville", rush: "p", src0: 6.5, src1: 10.0, dur: 2.299, punch: true, zoom: "in", voix: "et d'ailleurs dis-moi en commentaire de quelle ville tu es" },
  { id: "mezzanine", rush: "t", src0: 55.0, src1: 57.5, dur: 2.379, mirror: true, punch: true, voix: "À l'étage une mezzanine tout en verre" },
  { id: "suite", rush: "t", src0: 48.0, src1: 50.5, dur: 2.838, punch: true, voix: "la suite parentale avec son immense tête de lit" },
  { id: "salle-de-bain", rush: "t", src0: 50.8, src1: 54.5, dur: 3.16, punch: true, voix: "et sa salle de bain en marbre avec une baignoire posée au milieu" },
  { id: "chambre-amis-1", rush: "p", src0: 56.5, src1: 59.5, dur: 2.441, punch: true, voix: "Deux chambres d'amis avec leurs grandes baies vitrées" },
  { id: "chambre-amis-2", rush: "p", src0: 79.862, src1: 82.0, dur: 2.881, mirror: true, punch: true, voix: "pour la belle-famille qu'on invite le moins possible" },
  { id: "balcon", rush: "p", src0: 47.8, src1: 50.4, dur: 3.491, punch: true, zoom: "in", voix: "Un balcon avec vue sur le lac parfait pour ton café du matin" },
  { id: "cinema", rush: "t", src0: 57.95, src1: 59.3, dur: 3.486, punch: true, zoom: "in", voix: "un cinéma privé avec son écran géant pour tes soirées Netflix" },
  { id: "piscine-jour", rush: "p", src0: 17.0, src1: 19.6, dur: 1.604, punch: true, zoom: "in", voix: "et la piscine le jour" },
  { id: "piscine-nuit", rush: "t", src0: 59.5, src1: 60.7, dur: 1.916, mirror: true, zoom: "in", voix: "et la nuit Avoue c'est magique" },
  { id: "fin-1", rush: "t", src0: 7.5, src1: 11.4, dur: 2.852, mirror: true, zoom: "in", voix: "Alors sois honnête quatre cent cinquante mille euros à Marseille" },
  { id: "fin-2", rush: "t", src0: 0.0, src1: 3.0, dur: 4.098, mirror: true, zoom: "in", voix: "un tu signes tout de suite Ou deux c'est forcément une arnaque Dis-le en commentaire" },
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
  { seg: "intro-escalier", track: "t:escalier", src0: 17.194, src1: 18.2, dir: "bas-gauche", phrase: "escalier" },
  { seg: "intro-piscine", track: "t:piscine", src0: 59.692, src1: 60.7, dir: "haut-droite", son: "plouf", phrase: "piscine" },
  { seg: "entree", track: "t:escalier", src0: 15.157, src1: 18.0, dir: "bas-droite", son: "scintille", phrase: "escalier" },
  { seg: "salon", track: "t:bar", src0: 22.286, src1: 24.0, dir: "bas-gauche", son: "pop", phrase: "bar" },
  { seg: "salle-a-manger", track: "t:lustres", src0: 27.539, src1: 28.5, dir: "bas-droite", phrase: "lustres" },
  { seg: "cave", track: "t:cave", src0: 30.31, src1: 32.5, dir: "bas-gauche", son: "verre", phrase: "cave" },
  { seg: "cuisine", track: "t:ilot", src0: 39.032, src1: 40.4, dir: "haut-droite", son: "pop", phrase: "îlot" },
  { seg: "salon-2", track: "t:canape", src0: 46.272, src1: 47.0, dir: "haut-droite", son: "coussin", phrase: "canapé" },
  { seg: "mezzanine", track: "t:mezzanine", src0: 55.958, src1: 56.2, dir: "haut-droite", phrase: "mezzanine" },
  { seg: "suite", track: "t:tete-lit", src0: 49.849, src1: 50.5, dir: "bas-droite", phrase: "tête" },
  { seg: "salle-de-bain", track: "t:baignoire", src0: 52.771, src1: 54.0, dir: "haut-droite", son: "pop", phrase: "baignoire" },
  { seg: "chambre-amis-1", track: "p:baie", src0: 58.709, src1: 59.4, dir: "bas-gauche", phrase: "baies" },
  { seg: "chambre-amis-2", track: "p:lit", src0: 80.1, src1: 81.2, dir: "haut-droite", phrase: "belle-famille" },
  { seg: "balcon", track: "p:lac-fixe", src0: 48.913, src1: 50.2, dir: "haut-droite", phrase: "lac" },
  { seg: "cinema", track: "t:ecran", src0: 58.558, src1: 59.3, dir: "bas-droite", phrase: "écran" },
  { seg: "piscine-jour", track: "p:piscine", src0: 17.397, src1: 19.6, dir: "haut-droite", son: "plouf", phrase: "piscine" },
  { seg: "piscine-nuit", track: "t:piscine", src0: 59.653, src1: 60.7, dir: "haut-gauche", son: "scintille", phrase: "nuit" },
  { seg: "fin-1", track: "t:facade", src0: 10.454, src1: 11.4, dir: "bas-droite", phrase: "Marseille" },
];

// Texte d'accroche à l'écran (3 premières secondes)
// Pas de texte d'accroche à l'écran : l'utilisateur met son titre lui-même dans TikTok.
export const ACCROCHE = { from: 0, to: 0, texte: "" };

// Prix sur « quatre cent cinquante mille » (étiquette « PRIX »)
// « MARSEILLE » qui claque en gros sur le mot (motion design + impact)
export const VILLE = { t: 3.92, dur: 1.5, texte: "MARSEILLE" };
export const PRIX = { from: 5.71, to: 9.79, texte: "450 000 €" };

export const CHOIX = [
  { t: 60.81, n: "1", texte: "je signe tout de suite" },
  { t: 62.27, n: "2", texte: "c'est une arnaque" },
];

export const VOIX: { fichier: string; at: number }[] = [{ fichier: "voix/voix-complete.wav", at: 0 }];
