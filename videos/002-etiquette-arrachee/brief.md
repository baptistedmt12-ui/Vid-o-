# Vidéo 002 — L'étiquette arrachée (MT-09 à 4 000 €)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée visée :** 1 min (60,2 s)
- **Plateforme :** TikTok
- **Composition Remotion :** `Video002` (`src/videos/002-etiquette-arrachee/`)

## Ma demande

> Salut, voici ma vidéo, j'aimerais que tu me fasses un montage dynamique, tu peux m'inclure des graphiques Motion
> par rapport à ce que je dis dans la vidéo donc grâce à ma voix off. […] à un moment, je parle d'une étiquette qui
> a été arrachée, tu peux inclure une petite image avec une étiquette arrachée […] tu peux mettre quelques petites
> transitions à des moments si t'as envie, tu ne me mets pas de sous-titres, je le ferai directement sur TikTok.
> C'est pour faire une vidéo TikTok de une minute. Fais attention où tu places les choses : sur TikTok il y a les
> trucs sur les côtés (likes, commentaires, etc.).

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mov` | `rushes/` | Rush d'origine (HEVC 720×1280, 30 i/s, 60,2 s) avec la voix off — 21 Mo, committé tel quel |

Fichiers de travail (hors Git, dans `rushes/original/`, régénérables depuis l'original) :
- `travail-1080p.mp4` : rush agrandi en 1080×1920 (Lanczos, H.264 CRF 11) — Chromium ne lit pas le HEVC.
- `voix.wav` : son d'origine en PCM 48 kHz (pas de recompression de la voix).

```
ffmpeg -i rushes/original.mov -vf scale=1080:1920:flags=lanczos -c:v libx264 -crf 11 -preset slow -pix_fmt yuv420p -an rushes/original/travail-1080p.mp4
ffmpeg -i rushes/original.mov -vn -ac 2 -ar 48000 -c:a pcm_s16le rushes/original/voix.wav
```

## Ce qui a été fait

- *2026-10-31* — v1 (`export/002-v1.mp4`, rendu `render:hq`) :
  - Voix off transcrite (Whisper) pour caler chaque graphique au mot près. Rush gardé en continu (pas de coupe dans la voix).
  - **Motion design** : annonce MT-09 à 4 000 € (photo tirée du rush), « L'affaire de sa vie », fiche vendeur,
    « Qu'elle brille » + étincelles, « Samedi », checklist d'inspection, comparatif de prix x2, plaque de cadre
    limée (chiffres qui s'effacent + étincelles, « Limé / Propre / Récent », tampon « EFFACÉ »),
    **étiquette d'identification qui se fait arracher** (animée, colle visible), appel en cours,
    conversation avec le vendeur → « Compte supprimé », chrono « 2:00 sans un mot », « VOLÉE ? » + rubalise
    police + gyrophares, « 4 000 € » barré « PERDUS », billets qui tombent + reçu barré.
  - **Dynamique** : zooms « punch » sur les mots forts, secousses sur les impacts, transitions (whip, zoom-flou, flash)
    sur chaque changement de plan.
  - **Ambiance** : étalonnage qui passe au froid/désaturé quand l'histoire bascule (≈ 25 s), nappe grave + battement de cœur.
  - **Bruitages** : whoosh, pop, impacts, déchirure, sonnerie, tic-tac (générés, libres de droits).
  - **Placement TikTok** : tous les graphiques dans la zone x 70–920 / y 250–1300 (rien sous la colonne
    like/commentaires ni dans la zone description/sous-titres en bas). Pas de sous-titres.

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
