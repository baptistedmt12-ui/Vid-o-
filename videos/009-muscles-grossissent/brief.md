# Vidéo 009 — Tes muscles ne grossissent pas à la salle

- **Statut :** 🔍 Relecture (v1 rendue)
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

## À faire / retours

- [ ] Retours sur la v1 (voix, style du personnage, rythme, sujet)
- [ ] Choisir : garder la voix synthétique ou enregistrer sa propre voix
- [ ] À la publication : cocher « Contenu généré par IA » si la voix synthétique est gardée
