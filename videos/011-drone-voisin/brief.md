# Vidéo 011 — Le drone du voisin (bosse sur le toit)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 01 (61,0 s)
- **Plateforme :** TikTok
- **Composition Remotion :** `Video011` (`src/videos/011-drone-voisin/`)

## Ma demande

> Voici un nouveau lien WeTransfer avec trois nouvelles vidéos. Tu me fais la même chose qu'hier, essaye de fluidifier
> un maximum la voix off avec l'intonation comme on a vu, et fais des histoires différentes pour les trois avec des hooks
> différents. […] tu peux commencer par « un client m'a payé 460 € pour réparer une bosse, j'ai vite compris pourquoi,
> il n'aurait pas hésité à mettre plus » […] essaye-le sur une des histoires, je te laisse faire.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `source.mp4` | `rushes/` | Rush reçu par WeTransfer, tel quel (576×1024). Voiture foncée, bosse sur le toit contre la barre ; pistolet à colle, tirettes, reprise au marteau. |
| `original.mp4` | `rushes/original/` (hors Git) | Même fichier, utilisé pour le montage |

Fichiers de travail (hors Git) : `python3 scripts/remodel.py … 61.0 videos/011-drone-voisin/rushes/segments.json`.

## Script (voix off — balises d'émotion ElevenLabs v3 entre crochets)

**[HOOK]**
Ce qui a fait cette bosse sur le toit est tombé du ciel, et c'est la vidéo qu'il y avait dedans qui a tout déclenché.

**[MISE EN PLACE]**
Un client m'appelle un dimanche matin. Dans la nuit, il a entendu un gros bruit dans son allée, et en sortant, il a trouvé un drone posé à côté de sa voiture, avec une bosse sur le toit, juste à côté de la barre.

**[TENSION]**
Pendant que je prépare mes colles, il regarde la carte mémoire du drone, et il devient tout pâle. Il y a des heures de vidéo, et c'est toujours le même endroit : son jardin et sa haie, filmés d'en haut, depuis des semaines. Et sur les dernières images, on voit le drone redescendre chez le voisin d'en face.

**[RÉSOLUTION]**
Ce voisin, c'est celui qui lui fait la guerre depuis deux ans parce que sa haie serait trop haute, et il voulait des preuves pour la mairie. Je débosselle le toit, mon client imprime la facture, et il va sonner en face avec le drone sous le bras. Le voisin a payé la réparation sans discuter. La haie, elle, n'a jamais été coupée. Vous, vous auriez porté plainte ?

## Ce qui a été fait

- *2026-11-05* — v1 (`export/011-v1.mp4`, rendu `render:hq`) :
  - Rush remodelé à 61,0 s, transitions sur les coupes, zooms punch. Miroir gauche/droite à chaque coupe (~5 s).
  - Voix ElevenLabs **Charlie** (eleven_v3, « Creative »), script écrit à la bonne longueur ; **pauses naturelles conservées**
    (seuls les blancs > 0,38–0,6 s raccourcis), accélération ≤ 4 %. Voix envoyée à l'utilisateur avant le montage.
  - Graphiques petits à gauche calés au mot près (Whisper), polaroid « avant », sondage final, sous-titres mot par mot.

## À faire / retours

- [x] Retour : « l'effet miroir souvent avec la petite transition, c'était top » → miroir toutes les ~5 s
- [ ] Retours de l'utilisateur sur la v1
