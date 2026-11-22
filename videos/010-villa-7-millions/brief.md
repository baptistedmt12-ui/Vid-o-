# Vidéo 010 — Villa à « seulement » 7 millions d'euros

- **Statut :** 🔍 Relecture (montage v1 sans voix, script à valider)
- **Format :** 9:16 (1080×1920), 30 i/s (rush 60 i/s → ralentis fluides possibles)
- **Durée :** 63,1 s
- **Plateforme :** TikTok, niche visite immobilière (voir `niches/immobilier/README.md`)
- **Composition Remotion :** `Video010` (`src/videos/010-villa-7-millions/`)

## Ma demande

« Tout d'abord, tu vas écrire un script […]. Le hook, par exemple, ça pourrait être « Voici ce que tu peux avoir
pour seulement 7 millions d'euros. » Comme ça, ça va faire réagir les gens dans les commentaires. […] Fais le montage
aussi en même temps, mais ne fais pas tout de suite la voix off, car on va avoir qu'un essai […]. D'abord tu me fais
le montage, tu m'écris le script à côté, je te dis si je valide, et à la fin on fera la voix off. »

« La vidéo fait déjà que 1 minute 2 : retravaille-la à fond, inverse quelques plans, mets des effets miroirs.
L'image du début est bien, impressionnante. Ajoute des sound effects là où tu mets des flèches. Monte comme s'il y
avait la voix, sans utiliser les crédits ElevenLabs, et explique ce que tu as fait. »

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `rush.mp4` (SaveTik…-hd.mp4) | `rushes/original/` (hors Git, 111 Mo) | WeTransfer : 62,0 s, 1080×1920, HEVC 60 i/s, son = musique seule, aucun texte incrusté |
| `source.mp4` | `rushes/` | Copie compressée d'archive (H.264) |

## Ce qui a été fait

- 2026-11-22 — Repérage image par image : visite d'une maison neuve aux États-Unis (drapeau US visible),
  aucun texte ni emoji incrusté → pas d'inpainting nécessaire.
- 2026-11-22 — **Montage v1 sans voix** (`export/010-v1-montage.mp4`), calé sur la voix off imaginée (`script.md`) :
  - accroche : façade (plan le plus impressionnant) avec boom + secousse, cercle à 0,3 s, flèche à 2 s + tintement ;
  - bande-annonce 3,3–8,3 s : escalier vu d'en haut (miroir), cave vitrée, piscine au coucher du soleil (ralenti) ;
  - visite remise dans un nouvel ordre (salle de jeux avant la mezzanine, piscine gardée pour la fin),
    7 plans en miroir, ralentis sur l'allée, l'entrée, la mezzanine et la piscine, cuisine raccourcie (19 s → 13 s) ;
  - 13 annotations rouges, uniquement sur ce que dit le script, suivies image par image (OpenCV, `outils/suivi.py`),
    qui disparaissent au changement de plan, chacune avec un « pop » : 2 cercles (maison à 0,3 s, cheminée),
    11 flèches (porte, escaliers, bouteilles, fenêtres, îlot, hotte, lustre de la chambre, miroir, baignoire,
    salle de jeux, lustre géant) ;
  - fin : question 1 ou 2 avec deux petites pastilles en haut à gauche, retour sur la façade (boucle) ;
  - son d'origine coupé, musique house douce générée (`outils/sons.py`, 100 BPM), pas de whoosh.

## Retours de l'utilisateur (22/11)

- Les exemples servent surtout pour le **script et l'intonation**, pas à copier le montage.
- Montage : retravailler la vidéo reçue (inverser des plans, miroirs…).
- **Flèches de préférence** ; cercle seulement autour d'un petit élément quand c'est propre.
- Flèches / cercles **uniquement sur les éléments dont parle le script**, pas partout.

## À faire / retours

- [ ] Validation du script par l'utilisateur
- [ ] Voix off ElevenLabs (Chloé) — **une seule prise, seulement après accord**
- [ ] Recaler coupes, cercles et flèches sur la vraie voix (transcription mot à mot), baisser la musique sous la voix
