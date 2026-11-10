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

## À faire / retours

- [ ] Retours sur la v1
- [ ] Option : remplacer la musique par un son tendance directement dans TikTok (bon pour la portée)
