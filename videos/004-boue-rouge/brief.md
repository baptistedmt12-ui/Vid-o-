# Vidéo 004 — La boue rouge (enduro, vidéo virale, gendarmes à 17h)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 08 (67,9 s — l'écran de fin CapCut du rush est coupé)
- **Plateforme :** TikTok
- **Composition Remotion :** `Video004` (`src/videos/004-boue-rouge/`)

## Ma demande

> Salut, voici un lien WeTransfer il y a deux vidéos à l'intérieur, j'ai fait la voix off etc. j'aimerais que tu me
> fasses comme la dernière fois où tu me fais un montage avec des graphiques Motion, fais pas des trucs trop gros qui
> prennent trop de place dans l'écran, fais attention aux filigranes de TikTok car ce sont des vidéos pour TikTok,
> tu peux rajouter des petits effets sonores en même temps des petits trucs que tu rajoutes, je te laisse faire.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mov` (132 Mo, hors Git) | `rushes/original/` | Rush d'origine reçu par WeTransfer (H.264 1080×1920, ~31 i/s variable, voix off) |
| `source.mp4` | `rushes/` | Copie compressée pour l'archive (le rush original dépasse 100 Mo) |

Fichiers de travail (hors Git, régénérables) :
```
ffmpeg -i rushes/original/original.mov -t 67.9 -vf fps=30 -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p -an rushes/original/travail.mp4
ffmpeg -i rushes/original/original.mov -t 67.9 -vn -ac 2 -ar 48000 -c:a pcm_s16le rushes/original/voix.wav
```

## Ce qui a été fait

- *2026-11-04* — v1 (`export/004-v1.mp4`, rendu `render:hq`) :
  - Voix off transcrite, graphiques calés au mot près ; rush monté en continu.
  - **Graphiques compacts** (cartes de 520 à 600 px de large, dans le haut de la zone sûre) : appel entrant, « sale affaire »
    avec gyrophare, fiche du client, 17h + gendarmes qui sonnent, « il arrive en courant », « Je paierai ce qu'il faut »,
    publication du groupe de la ville (mini-vidéo animée : panneau interdit aux motos, enduro à fond, poussette),
    compteur 4 000 partages, commentaire « Je sais qui c'est », appel de la gendarmerie, comparatif vidéo / moto (3 coches),
    « C'EST LUI ? », ses excuses puis ses aveux en bulles, éclaboussure « BOUE ROUGE », les risques (saisie, amende, permis),
    billet froissé + horloge 16:10 (« gendarmes à 17h : −50 min »), sondage final A/B pour les commentaires.
  - Zooms punch + secousses sur les mots forts, transitions sur 13 changements de plan, étalonnage plus froid à partir de 32 s.
  - Bruitages : whoosh, pop, notification, impacts, sonnerie, sonnette, caisse, tic-tac, éclaboussure, nappe + battement de cœur.
  - Rien sous la colonne de droite (likes, commentaires…) ni dans le bas de l'écran. Pas de sous-titres.

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
