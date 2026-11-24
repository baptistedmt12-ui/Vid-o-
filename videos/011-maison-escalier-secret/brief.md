# Vidéo 011 — La maison à l'escalier secret

- **Statut :** 🔍 Relecture (montage v1 sans voix, script à valider)
- **Format :** 9:16 (1080×1920), 30 i/s (rushes 60 i/s)
- **Durée :** 64,2 s
- **Plateforme :** TikTok, niche visite immobilière (voir `niches/immobilier/README.md`)
- **Composition Remotion :** `Video011` (`src/videos/011-maison-escalier-secret/`)

## Ma demande

Deux vidéos de visite (≈ 61 s chacune) à fusionner en **une seule maison**, pour pouvoir vraiment retravailler (couper,
raccourcir, inverser) et éviter l'effet « contenu non original ». Un seul plan extérieur (le plus lumineux, en plein jour),
pas deux cuisines. S'inspirer au maximum des exemples. Prix « n'importe quoi » pour faire commenter (≈ 600 000 €).
Montage + script, **pas encore la voix off**. Avant : dire ce qui sera amélioré.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `v1.mp4` (SaveTik…446) | `rushes/original/` (hors Git, 99 Mo) | 61,1 s, HEVC 60 i/s : façade à l'heure bleue, bureau, salon + mur à vin, cuisine, chambre, salle de bain, dressing + escalier en colimaçon, salle de sport, billard, cinéma, piscine à débordement, terrain |
| `v2.mp4` (SaveTik…774) | `rushes/original/` (hors Git, 95 Mo) | 61,4 s, HEVC 60 i/s : façade plein jour, entrée double hauteur, cave, salon, cuisine îlot + lustre, salle à manger, piscine au coucher du soleil, chambre poutres, salle de bain, coursive, cinéma, terrain, terrasse |
| `source-v1.mp4`, `source-v2.mp4` | `rushes/` | Copies d'archive compressées |

## Ce qui a été fait

- 2026-11-24 — Diagnostic de la 010 (décrochage à 0:02) appliqué : accroche intrigante dès 0 s (escalier secret du
  dressing), texte « Attends de voir le dressing 😳 » 0–3 s, rafale de plans lumineux ≈ 1 s, voix prévue dès 0,0 s.
- **Une seule maison** : tout l'extérieur vient de v2 (façade plein jour, piscine, terrasse, terrain) ; intérieurs mixés
  sans doublon (v2 : entrée, cuisine, coursive, chambre ; v1 : bureau, salon + cave, salle de bain, dressing, sport,
  billard, cinéma). Écartés : façade v1, cuisine v1, chambre v1, piscine v1 (on y voit l'autre maison), etc.
- Plans raccourcis / ralentis / accélérés (×0,5 à ×1,4), 9 plans en miroir, 11 flèches suivies (OpenCV) uniquement sur
  ce que dit la voix, bruitages variés et bas, nouvelle musique maison (`outils/musique.py`, 104 BPM).
- Prix donné comme un **avis** (« Pour moi, six cent mille euros… ») : étiquette « SELON MOI 600 000 € », puis
  « un, t'es d'accord ? Deux, n'importe quoi ? ». Pas de question finissant par « direct ».

## À faire / retours

- [ ] Validation du montage et du script
- [ ] Voix Chloé (hook d'abord, puis la suite en previous_text), recalage au mot près

## Voix off (24/11)
- Hook généré (eleven_v4, Chloé, stabilité 0,30, ressemblance 0,75, **style 0,55, vitesse 1,15** pour plus de dynamisme,
  seed 4242), **80 crédits** : « Cette maison cache un escalier secret dans son dressing ! Une piscine, un cinéma, et même
  une salle de sport ! Bienvenue dans la maison de tes rêves. Reste bien jusqu'à la fin pour connaître le prix ! »
- Blancs raccourcis à 0,14 s → `assets/voix/hook-edit.wav` (9,75 s, 3,6 mots/s), MP3 envoyé pour validation.
- Rafale réduite à 3 plans (piscine, cinéma, salle de sport) à la demande de l'utilisateur.
