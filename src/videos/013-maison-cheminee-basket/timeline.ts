// Vidéo 013 — La maison à la cheminée et au terrain de basket (3 vidéos fondues en une seule maison).
// Montage calé sur une lecture IMAGINÉE (≈ 3,5 mots/s) : à recaler au mot près sur la vraie voix
// (voix de l'utilisateur, ou Chloé). Pas de titre à l'écran (l'utilisateur le met dans TikTok).
// Rushes : t = principale (1080p), m = maison moderne (576p, intérieurs), c = salon cathédrale (720p).

export const FPS = 30;
export type Rush = "t" | "m" | "c";
export const RUSHES: Record<Rush, string> = {
  t: "013-maison-cheminee-basket/rushes/original/principale.mp4",
  m: "013-maison-cheminee-basket/rushes/original/moderne.mp4",
  c: "013-maison-cheminee-basket/rushes/original/cathedrale.mp4",
};
// Étalonnage : la principale est chaude (pierre, bois) ; on réchauffe les deux autres pour qu'elles s'y fondent.
export const FILTRES: Record<Rush, string> = {
  t: "saturate(1.08) contrast(1.04)",
  m: "sepia(0.18) saturate(0.95) contrast(1.06) brightness(0.95)",
  c: "sepia(0.12) saturate(0.98) contrast(1.05) brightness(0.96)",
};

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
  // Intro : 3 points forts, très rapide
  { id: "intro-feu", rush: "t", src0: 9.0, src1: 10.6, dur: 1.6, punch: true, voix: "Une cheminée en plein air," },
  { id: "intro-basket", rush: "t", src0: 21.0, src1: 22.6, dur: 1.6, punch: true, voix: "un terrain de basket à l'intérieur," },
  { id: "intro-cascade", rush: "t", src0: 5.15, src1: 6.45, dur: 1.6, punch: true, zoom: "in", voix: "et même une cascade dans le jardin !" },
  // Ville + prix choc, puis appel à rester
  { id: "facade", rush: "t", src0: 2.3, src1: 5.0, dur: 3.6, zoom: "in", voix: "Bienvenue à Nice, et regarde ce que t'as pour trois cent quatre-vingt-dix mille euros !" },
  { id: "aerien", rush: "t", src0: 0.0, src1: 2.2, dur: 2.8, zoom: "in", voix: "Reste bien jusqu'à la fin, tu vas pas t'en remettre !" },
  // Visite dans l'ordre : séjour → cuisine → bar → bureau → jeux → basket → étage → dehors
  { id: "salon", rush: "t", src0: 24.5, src1: 32.5, dur: 4.6, punch: true, voix: "Le salon, avec ses poutres en bois et sa vue à couper le souffle…" },
  { id: "cathedrale", rush: "c", src0: 0.0, src1: 7.5, dur: 3.4, punch: true, voix: "et sous la charpente, un deuxième salon, ultra lumineux." },
  { id: "cuisine", rush: "t", src0: 33.2, src1: 36.0, dur: 3.6, punch: true, voix: "La cuisine : un îlot en marbre géant… assez grand pour faire la fête dessus." },
  { id: "vue", rush: "t", src0: 36.5, src1: 41.0, dur: 3.6, punch: true, voix: "Des baies vitrées du sol au plafond, avec vue sur toute la vallée." },
  { id: "bar", rush: "t", src0: 50.0, src1: 52.8, dur: 3.2, punch: true, voix: "Un vrai bar avec ses tabourets… ici, c'est open bar tous les soirs." },
  { id: "cave", rush: "m", src0: 10.0, src1: 11.5, dur: 2.6, mirror: true, punch: true, voix: "Et juste derrière, la cave à vin." },
  { id: "cta-ville", rush: "t", src0: 47.0, src1: 49.5, dur: 3.0, mirror: true, punch: true, voix: "D'ailleurs, toi, tu viens d'où ? Dis-le en commentaire !" },
  { id: "bureau", rush: "m", src0: 11.65, src1: 13.1, dur: 2.6, punch: true, voix: "Un bureau… pour faire semblant de bosser." },
  { id: "billard", rush: "t", src0: 13.25, src1: 15.0, dur: 2.6, punch: true, voix: "La salle de jeux et son billard," },
  { id: "basket", rush: "t", src0: 19.5, src1: 21.5, dur: 3.6, punch: true, voix: "et le fameux terrain de basket, avec ses vrais paniers !" },
  { id: "chambre", rush: "t", src0: 53.1, src1: 55.5, dur: 3.0, punch: true, voix: "La suite parentale, avec son lit king size," },
  { id: "salle-de-bain", rush: "m", src0: 7.0, src1: 8.55, dur: 2.8, punch: true, voix: "sa salle de bain, avec une baignoire au milieu," },
  { id: "dressing", rush: "t", src0: 59.05, src1: 60.5, dur: 3.0, punch: true, voix: "et un dressing de star, avec son tapis en peau de vache." },
  { id: "fin-feu", rush: "t", src0: 7.8, src1: 9.8, dur: 4.4, mirror: true, zoom: "in", voix: "Et pour finir, la cheminée dehors, face à la piscine… avoue, c'est magique." },
  // Fin : question qui rebondit sur le prix
  { id: "fin-1", rush: "t", src0: 2.3, src1: 5.0, dur: 3.4, mirror: true, zoom: "in", voix: "Alors, sois honnête : trois cent quatre-vingt-dix mille euros à Nice…" },
  { id: "fin-2", rush: "t", src0: 0.0, src1: 2.2, dur: 4.0, mirror: true, zoom: "in", voix: "un, tu signes tout de suite ? Ou deux, c'est forcément une arnaque ? Dis-le en commentaire !" },
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
  { seg: "intro-feu", track: "t:feu", src0: 9.15, dir: "haut-gauche", son: "scintille", phrase: "Une cheminée en plein air" },
  { seg: "intro-basket", track: "t:panier", src0: 21.05, dir: "bas-droite", phrase: "un terrain de basket à l'intérieur" },
  { seg: "intro-cascade", track: "t:cascade", src0: 5.2, dir: "haut-droite", son: "plouf", phrase: "une cascade dans le jardin" },
  { seg: "salon", track: "t:poutres", src0: 25.0, src1: 29.0, dir: "bas-droite", son: "pop", phrase: "ses poutres en bois" },
  { seg: "cathedrale", track: "c:verriere", src0: 1.5, dir: "bas-gauche", phrase: "ultra lumineux" },
  { seg: "cuisine", track: "t:ilot", src0: 33.6, dir: "haut-droite", son: "pop", phrase: "un îlot en marbre géant" },
  { seg: "vue", track: "t:vue", src0: 37.8, dir: "bas-droite", phrase: "vue sur toute la vallée" },
  { seg: "bar", track: "t:bar", src0: 50.6, dir: "bas-droite", son: "verre", phrase: "un vrai bar" },
  { seg: "cave", track: "m:cave", src0: 10.4, dir: "bas-gauche", son: "verre", phrase: "la cave à vin" },
  { seg: "bureau", track: "m:bureau", src0: 12.0, dir: "haut-droite", phrase: "un bureau" },
  { seg: "billard", track: "t:billard", src0: 13.6, dir: "haut-droite", son: "pop", phrase: "son billard" },
  { seg: "basket", track: "t:panier", src0: 20.2, dir: "bas-droite", son: "scintille", phrase: "ses vrais paniers" },
  { seg: "chambre", track: "t:lit", src0: 53.8, dir: "haut-gauche", phrase: "son lit king size" },
  { seg: "salle-de-bain", track: "m:baignoire", src0: 7.4, dir: "haut-droite", son: "pop", phrase: "une baignoire au milieu" },
  { seg: "dressing", track: "t:tapis", src0: 59.6, dir: "haut-droite", phrase: "son tapis en peau de vache" },
  { seg: "fin-feu", track: "t:feu", src0: 8.3, src1: 9.8, dir: "haut-gauche", son: "scintille", phrase: "la cheminée dehors" },
  { seg: "fin-1", track: "t:maison", src0: 3.0, dir: "bas-droite", phrase: "à Nice" },
];

// Pas de texte d'accroche à l'écran : l'utilisateur met son titre lui-même dans TikTok.
export const ACCROCHE = { from: 0, to: 0, texte: "" };

// « NICE » qui claque en gros sur le mot, puis étiquette « PRIX »
export const VILLE = { t: outTime("facade", 2.3) + 0.55, dur: 1.5, texte: "NICE" };
export const PRIX = { from: outTime("facade", 2.3) + 1.6, to: outTime("aerien", 2.2), texte: "390 000 €" };

export const CHOIX = [
  { t: outTime("fin-2", 0) + 0.1, n: "1", texte: "je signe tout de suite" },
  { t: outTime("fin-2", 0) + 1.5, n: "2", texte: "c'est une arnaque" },
];

export const VOIX: { fichier: string; at: number }[] = [];
