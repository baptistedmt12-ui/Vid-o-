import { DUREE, LIGNES } from "./voix";
import { FPS } from "../_shared/kit";

// Tout est calé sur la voix off (voix.ts, généré par outils/voix.py).
export const TOTAL_FRAMES = Math.round(DUREE * FPS);
/** début de la phrase i (secondes) */
export const s = (i: number) => LIGNES[i].debut;
/** début du mot k de la phrase i (secondes) */
export const w = (i: number, k: number) => LIGNES[i].mots[k].t0;
/** point de coupe juste avant la phrase i */
export const cut = (i: number) => (i <= 0 ? 0 : i >= LIGNES.length ? DUREE : LIGNES[i].debut - 0.2);
export const CX = 485; // centre de la zone sûre TikTok
