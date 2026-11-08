# Vidéo 014 — La mamie de l'enduro (restauration d'une vieille 125)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 00 (60,2 s)
- **Plateforme :** TikTok
- **Composition Remotion :** `Video014` (`src/videos/014-mamie-enduro/`)

## Ma demande

> Voici un nouveau lien WeTransfer, fais-moi le montage de ces deux vidéos, la voix off est déjà faite, tu t'occupes juste
> du montage, tu n'ajoutes pas de sous-titres. Tu n'ajoutes aucun filtre sur l'écran en entier qui peut nuire à la qualité
> ou assombrir la vidéo […] juste le montage avec les effets sonores, les graphiques motion qui s'ajoutent sur la voix off,
> des petits effets, des effets miroir pour ajouter du dynamisme. […] tu peux aussi ajouter des trucs un peu plus gros :
> quand je parle d'une grand-mère sur un podium à la fin, tu peux inclure une image en plein milieu de l'écran pendant une
> seconde […] je te laisse faire.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mov` (hors Git) | `rushes/original/` | Rush d'origine (1440×2560, ~30 i/s, 146 Mo), voix off de l'utilisateur incluse |
| `source.mp4` | `rushes/` | Copie compressée 1080p pour l'archive |

Travail (hors Git) : original → `hd.mov` (1080×1920 lanczos, CRF 8) → `scripts/remodel.py` avec `rushes/segments.json`
(segments contigus : voix intacte et synchro, miroir un segment sur deux).

## Ce qui a été fait

- *2026-11-08* — v1 (`export/014-v1.mp4`, rendu `render:hq`) :
  - Voix transcrite (Whisper), graphiques calés au mot près : étiquettes et cartes petites à gauche (300–850 px).
  - **Illustrations au centre** (~1,5–2 s, carte blanche de 600 px) : écharpe « tricotée » (26,4 s), coupe de la 3e place (42,5 s), mamie sur le podium (58,7 s).
  - Miroir gauche/droite toutes les 6,5 s avec transitions whip / zoom / flash, zooms punch.
  - **Aucun filtre sur l'image** (`Footage clean` : pas d'étalonnage, de vignette ni d'assombrissement). Pas de sous-titres.

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
