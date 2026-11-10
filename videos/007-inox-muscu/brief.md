# Vidéo 007 — Inox en muscu (montage TikTok)

- **Statut :** 🔍 Relecture (v1 rendue)
- **Format :** 9:16 vertical (1080×1920), 25 i/s (cadence du rush)
- **Durée finale :** 1 min 06 s
- **Plateforme :** TikTok (plus d'1 minute, monétisation)
- **Composition Remotion :** `Video007` (`src/videos/007-inox-muscu/`)

## Ma demande

Montage TikTok pensé pour la rétention et la monétisation, à partir de la vidéo YouTube
« Que devient Inox en Muscu » (https://youtu.be/n6Vc_V1JNrk). Entre 1 min et 1 min 10,
uniquement les moments où on voit le physique d'Inox ou de l'autre personne et où ils font
des exercices — pas les moments où ils parlent. Ajouter des effets et du motion design,
faire attention aux zones de l'interface TikTok. Si le passage en vertical zoome trop,
garder le format d'origine. Téléchargement en 1080p max (pas de 4K).

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `Que devient Inox en Muscu.mp4` | `rushes/original/` (hors Git) | Reçu via WeTransfer : 1 h 13, 1920×1080, 25 i/s, 1,4 Go. Trop gros pour Git ; pas de copie d'archive (la vidéo est sur YouTube) |
| `segments/s01…s17.mp4` | `rushes/original/` (hors Git) | Les 17 plans retenus, extraits **sans perte** (x264 qp 0) |

## Ce qui a été fait

- 2026-11-10 — Téléchargement YouTube bloqué depuis le serveur (anti-robot) → fichier envoyé par WeTransfer.
- 2026-11-10 — Repérage (une image toutes les 10 s puis toutes les secondes sur les passages retenus).
- 2026-11-10 — **v1** (`export/007-v1.mp4`, 1 min 06) :
  - cadre 9:16 : image 16:9 agrandie à 130 % seulement, au centre, sur un fond flouté de la même image ;
  - accroche sur la fin (physiques torse nu au vestiaire) + « Reste jusqu'à la fin », puis « Mais d'abord… la séance » ;
  - 5 exercices titrés : développé couché (avec Inox qui force sous la barre), développé épaules, élévations latérales, poulie, duel de pompes ;
  - break « Et maintenant… le résultat » puis physiques au vestiaire ; fin « Qui a le meilleur physique ? Réponds en commentaire » qui boucle sur l'accroche ;
  - musique phonk générée (125 BPM, `assets/musique.wav`), toutes les coupes calées sur le temps, pulsation sur chaque temps, flash / zoom / whip / glitch RGB, secousse sur l'effort, whoosh et pop ;
  - son d'origine coupé (ils parlent tout le temps) ;
  - habillage petit et à gauche, dans les bandes au-dessus et au-dessous de l'image (jamais sur les mouvements),
    hors des zones TikTok (haut < 280 px, droite > 900 px, bas > 1450 px), pas de texte sur les actions.
- Note : créée d'abord sous le n° 002 dans une session en retard sur GitHub, renumérotée 007.

## Plans retenus (timecodes dans l'original « Que devient Inox en Muscu »)

| Plan | Original | Durée à l'écran | Contenu |
|------|----------|-----------------|---------|
| s01 | 1:12:06.6 (ralenti 0,8×) | 2,9 s | Accroche : les deux torse nu au vestiaire, Inox contracte |
| s02 | 0:04:05 | 3,8 s | Développé couché, gros plan |
| s03 | 0:10:16 | 3,8 s | Développé couché, vue de côté |
| s04 | 0:29:37 | 2,9 s | Inox sous la barre |
| s05 | 0:24:07 | 5,8 s | Inox force au développé couché, parade (secousse) |
| s06 | 0:24:16 | 2,9 s | Réaction, rires |
| s07 | 0:26:25 | 3,8 s | Développé couché, visage |
| s08 | 1:01:17.5 | 4,8 s | Inox au développé épaules (machine) |
| s09 | 0:49:21.5 | 2,9 s | Développé épaules, plan large |
| s10 | 1:06:09 | 5,8 s | Élévations latérales |
| s11 | 1:09:16 | 2,9 s | Poulie |
| s12 | 1:11:06 (accéléré 1,4×) | 5,8 s | Duel de pompes |
| s13 | 1:11:55.5 | 2,9 s | Arrivée au vestiaire |
| s14 | 1:12:02 | 4,8 s | Physiques |
| s15 | 1:12:14.5 | 3,8 s | Physiques, plan serré |
| s16 | 1:12:29 | 3,8 s | Physiques, plan serré |
| s17 | 1:12:35 | 2,9 s | Fin (boucle sur l'accroche) |

Pour refaire un rendu : remettre l'original dans `rushes/original/`, réextraire les plans sans perte
(`ffmpeg -ss <début> -i original.mp4 -t <durée+0,6> -an -c:v libx264 -qp 0 rushes/original/segments/sNN.mp4`),
puis `npm run render:hq -- Video007 …`.

## À faire / retours

- [ ] Retours sur la v1
- [ ] Option : remplacer la musique par un son tendance directement dans TikTok (bon pour la portée)
