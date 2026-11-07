# Vidéo 013 — La moto des 18 ans (lavage d'une Honda routière)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 02 (61,9 s)
- **Plateforme :** TikTok
- **Composition Remotion :** `Video013` (`src/videos/013-lavage-moto/`)

## Ma demande

> Voici un nouveau lien WeTransfer, j'ai déjà fait la voix off. J'aimerais que tu me fasses un montage comme les premières
> vidéos, un montage sur la voix off : des graphiques motion avec les points clés de ce que je dis, pas de sous-titres
> (je le ferai moi-même). Pas de trucs trop gros qui cachent la vidéo, attention aux filigranes TikTok (côtés, haut, bas).
> Tu peux ajouter des effets miroir toutes les 6-7 secondes pour rajouter du dynamisme.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mov` (193 Mo, hors Git) | `rushes/original/` | Rush d'origine 4K (2160×3840, ~30 i/s), voix off de l'utilisateur incluse |
| `source.mp4` | `rushes/` | Copie compressée 1080p pour l'archive |

Fichiers de travail (hors Git) : `hd.mov` (4K → 1080×1920 lanczos, CRF 8), puis
`python3 scripts/remodel.py videos/013-lavage-moto/rushes/original/hd.mov … 61.88 videos/013-lavage-moto/rushes/segments.json`
(segments contigus : la voix reste intacte et synchro).

## Ce qui a été fait

- *2026-11-07* — v1 (`export/013-v1.mp4`, rendu `render:hq`) :
  - Voix transcrite (Whisper), graphiques calés au mot près, petits et à gauche (300–850 px) : 250 €, cadeau des 18 ans,
    « sa femme n'est pas au courant », routière d'occasion, carte « son fils » (12 ans, permis en secret, jobs d'été,
    1er coup), J-1 + nœud, « pourquoi ta femme ne sait rien ? », le frère, « elle a quitté la table », balance peur / rêve,
    « une peur qui n'est même pas la sienne », appels de sa femme, message, relevé de compte −4 000 €.
  - Miroir gauche/droite toutes les ~6,5 s avec transitions whip / zoom / flash, zooms punch.
  - Pas de sous-titres (l'utilisateur les fait). Bruitages discrets, voix d'origine intacte.

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
