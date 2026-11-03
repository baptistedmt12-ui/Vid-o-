# Vidéo 003 — Défi 15 / 15 / 15 (réalisé : 15 muscle-ups, 15 dips, 7 tractions)

- **Statut :** 🔍 Relecture (v1 rendue et envoyée)
- **Format :** 9:16 (1080×1920), 30 i/s — rush original en 4K vertical
- **Durée finale :** ~2 min (1 min 56 de vidéo + 4 s de récap)
- **Plateforme :** TikTok (plus d'1 minute, monétisation)
- **Composition Remotion :** `Video003` (`src/videos/003-defi-15-15-7/`)

## Ma demande

Montage simple : je fais 15 muscle-ups, puis 15 dips, puis 7 tractions (où je galère pas mal).
Ajouter un compteur qui augmente à chaque répétition, et bien séparer les trois mouvements
pour qu'on comprenne que j'ai fait 15, 15 et 7.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `IMG_6027.mov` | `rushes/original/` (hors Git) | Original reçu via WeTransfer, 375 Mo, 4K vertical, 1 min 57 |
| `source.mp4` | `rushes/` | Copie 1080p compressée pour l'archive Git (pas utilisée pour le rendu) |

## Ce qui a été fait

- 2026-11-03 — Repérage de chaque répétition (analyse d'image, vérifiée image par image) :
  15 muscle-ups (0:02 → 0:47), 15 dips (0:51 → 1:07), 7 tractions (1:12 → 1:48).
  Les instants sont dans `src/videos/003-defi-15-15-7/reps.ts`.
- 2026-11-03 — Première version avec un gros compteur au centre : **abandonnée**
  (trop gros, cachait les mouvements). Retours de Baptiste :
  - compteur petit, sur le côté, sans gêner les mouvements ;
  - ne rien écrire sous les zones de TikTok (onglets « Suivis / Pour toi » en haut,
    boutons à droite, description et commentaires en bas).
- 2026-11-03 — **v1** (`export/003-v1.mp4`, rendu qualité max depuis l'original 4K) :
  - petite carte compteur en haut à gauche, sous la barre TikTok : nom de l'exercice,
    « n/15 » qui saute à chaque répétition avec un « ding », et 3 pastilles 15 · 15 · 7 ;
  - changement d'exercice : léger flash, bandeau « PARTIE 2/3 · 15 DIPS » sous la carte ;
  - phrases « ÇA SE COMPLIQUE… » et « ALLEZ, ENCORE UNE ! » pendant les tractions ;
  - **suspense** : le défi annoncé est 15 / 15 / 15, donc le compteur des tractions affiche « /15 »
    et les pastilles 15 · 15 · 15 ; l'échec (7/15) n'est révélé qu'au bilan final ;
  - fin : image figée et bilan « 15 MUSCLE-UPS / 15 DIPS / 7/15 TRACTIONS », centré dans la zone sûre ;
  - vidéo en continu, son d'origine conservé.

## Export

- `export/003-v1.mp4` : 2 min 00, 1080×1920, 30 i/s, H.264 CRF 14, AAC 320 kb/s, **206 Mo**.
  Trop gros pour GitHub (> 100 Mo) : envoyé dans la discussion, pas commité.

## À faire / retours

- [ ] Retours sur la v1
