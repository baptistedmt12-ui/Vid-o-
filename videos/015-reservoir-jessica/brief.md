# Vidéo 015 — Le réservoir interdit (covering et « Jessica pour toujours »)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 03 (62,5 s)
- **Plateforme :** TikTok
- **Composition Remotion :** `Video015` (`src/videos/015-reservoir-jessica/`)

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
| `original.mov` (hors Git) | `rushes/original/` | Rush d'origine (4K 2160×3840, ~30 i/s, 187 Mo), voix off de l'utilisateur incluse |
| `source.mp4` | `rushes/` | Copie compressée 1080p pour l'archive |

Travail (hors Git) : original → `hd.mov` (1080×1920 lanczos, CRF 8) → `scripts/remodel.py` avec `rushes/segments.json`
(segments contigus : voix intacte et synchro, miroir un segment sur deux).

## Ce qui a été fait

- *2026-11-08* — v1 (`export/015-v1.mp4`, rendu `render:hq`) :
  - Voix transcrite (Whisper), graphiques calés au mot près : étiquettes et cartes petites à gauche (300–850 px).
  - **Illustrations au centre** (~1,5–2 s, carte blanche de 600 px) : fiente d'oiseau sur le réservoir (23,6 s), visage peint qui se découvre (48,5 s), « Jessica pour toujours » (53,35 s).
  - Miroir gauche/droite toutes les 6,5 s avec transitions whip / zoom / flash, zooms punch.
  - **Aucun filtre sur l'image** (`Footage clean` : pas d'étalonnage, de vignette ni d'assombrissement). Pas de sous-titres.

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
