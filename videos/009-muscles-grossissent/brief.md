# Vidéo 009 — Tes muscles ne grossissent pas à la salle

- **Statut :** 🔍 Relecture (v2 rendue, voix 3)
- **Format :** 9:16 vertical (1080×1920), 30 i/s
- **Durée finale :** 1 min 06 s
- **Plateforme :** TikTok — plus d'1 minute (monétisation)
- **Composition Remotion :** `Video009` (`src/videos/009-muscles-grossissent/`)

## Ma demande

Créer des vidéos de A à Z, entre 1 min et 1 min 10, pour la monétisation TikTok :
style 2D, niche musculation / sport en général, où l'on explique des choses.

## Fichiers reçus

Aucun : vidéo 100 % générée (script, voix, animation, musique, bruitages).

## Ce qui a été fait

- 2026-11-15 — **v1** (`export/009-v1.mp4`, 1 min 06 s, 20 Mo) :
  - sujet : comment un muscle grossit (tension = signal, construction pendant 24 à 48 h,
    les 3 leviers : protéines 1,6 g/kg/jour, sommeil 7 à 9 h, surcharge progressive) ;
  - script : `voix-off.txt` (une phrase par ligne) ;
  - voix off synthétique (Kokoro, voix française `ff_siwis`) + minutage mot par mot (Whisper) :
    `python3 outils/voix.py 009-muscles-grossissent` → `assets/voix.wav` et `voix.ts` ;
  - musique de fond générée (`outils/musique.py`), bruitages whoosh / pop / impact ;
  - 13 scènes animées en 2D (personnage, fibres, jauges, graphique), calées sur chaque mot ;
  - sous-titres mot à mot au-dessus de la zone basse de TikTok, barre de progression en haut.
- 2026-11-15 — Retour : la voix de la v1 ne plaît pas. Deux séries d'essais envoyées
  (`export/009-essais-voix.mp4`, puis `assets/essais-voix/voix-1…6.mp3` : homme, la vingtaine, pas trop grave).
  **Voix 3 choisie.**
- 2026-11-15 — **v2** (`export/009-v2.mp4`, 1 min 07 s, 20 Mo) : même vidéo, voix off refaite avec la voix 3
  (`outils/voix.py`, référence `outils/voix-reference.wav`), animation et sous-titres recalés sur la nouvelle voix.

## À faire / retours

- [x] Voix : voix 3 choisie
- [ ] Retours sur la v2 (style du personnage, rythme, sujet)
- [ ] À la publication : cocher « Contenu généré par IA » si la voix synthétique est gardée
