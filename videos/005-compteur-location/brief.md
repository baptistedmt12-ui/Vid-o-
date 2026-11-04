# Vidéo 005 — Le compteur (moto en location longue durée à rendre lundi)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 06 (66,25 s)
- **Plateforme :** TikTok
- **Composition Remotion :** `Video005` (`src/videos/005-compteur-location/`)

## Ma demande

Même demande que la vidéo 004 (les deux rushes sont arrivés ensemble par WeTransfer) :

> […] j'aimerais que tu me fasses comme la dernière fois où tu me fais un montage avec des graphiques Motion, fais pas
> des trucs trop gros qui prennent trop de place dans l'écran, fais attention aux filigranes de TikTok […] tu peux
> rajouter des petits effets sonores […] je te laisse faire.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mov` (129 Mo, hors Git) | `rushes/original/` | Rush d'origine reçu par WeTransfer (H.264 1080×1920, ~31 i/s variable, voix off) |
| `source.mp4` | `rushes/` | Copie compressée pour l'archive (le rush original dépasse 100 Mo) |

Fichiers de travail (hors Git, régénérables) :
```
ffmpeg -i rushes/original/original.mov -t 66.25 -vf fps=30 -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p -an rushes/original/travail.mp4
ffmpeg -i rushes/original/original.mov -t 66.25 -vn -ac 2 -ar 48000 -c:a pcm_s16le rushes/original/voix.wav
```

## Ce qui a été fait

- *2026-11-04* — v1 (`export/005-v1.mp4`, rendu `render:hq`) :
  - Voix off transcrite, graphiques calés au mot près ; rush monté en continu.
  - **Graphiques compacts** : direction l'atelier, à rendre lundi, « il m'a pas tout dit », retour au concessionnaire,
    +300 €, « CACHER QUOI ? », contrat LLD (3 ans, 189 €/mois, 0 € d'apport) + « la meilleure décision de ma vie »,
    inspection, frais de restitution + tampon « FACTURÉ », rayure de 10 cm sur le réservoir (règle) cachée par un autocollant,
    dialogue « tu peux la faire disparaître ? », compteur qui défile jusqu'à 31 000 km, 10 000 km/an, le calcul
    (30 000 autorisés, 31 000 au compteur, +1 000 km), « + de 2 000 € à payer lundi » + « MÊME PAS À LUI »,
    « Tu connais quelqu'un pour le compteur ? » + avertissement « Trafiquer un compteur = illégal », « LOUER ou ACHETER ? ».
  - Zooms punch + secousses, transitions sur 12 changements de plan, étalonnage plus froid à partir de 40 s.
  - Bruitages : whoosh, pop, notification, impacts, caisse, rayure, tic-tac, nappe + battement de cœur.
  - Rien sous la colonne de droite ni dans le bas de l'écran. Pas de sous-titres.

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
