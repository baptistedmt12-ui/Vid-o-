# Vidéo 012 — Le bouchon de champagne (voiture des mariés)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 01 (61,0 s)
- **Plateforme :** TikTok
- **Composition Remotion :** `Video012` (`src/videos/012-bouchon-champagne/`)

## Ma demande

> Voici un nouveau lien WeTransfer avec trois nouvelles vidéos. Tu me fais la même chose qu'hier, essaye de fluidifier
> un maximum la voix off avec l'intonation comme on a vu, et fais des histoires différentes pour les trois avec des hooks
> différents. […] tu peux commencer par « un client m'a payé 460 € pour réparer une bosse, j'ai vite compris pourquoi,
> il n'aurait pas hésité à mettre plus » […] essaye-le sur une des histoires, je te laisse faire.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `source.mp4` | `rushes/` | Rush reçu par WeTransfer, tel quel (576×1024). Voiture bleue, bosse sur le haut du toit au-dessus de la vitre arrière (rush en 25 i/s, passé en 30 i/s). |
| `original.mp4` | `rushes/original/` (hors Git) | Même fichier, utilisé pour le montage |

Fichiers de travail (hors Git) : `python3 scripts/remodel.py … 61.0 videos/012-bouchon-champagne/rushes/segments.json`.

## Script (voix off — balises d'émotion ElevenLabs v3 entre crochets)

**[HOOK]**
Un bouchon de champagne m'a fait travailler deux fois sur la même voiture, le même jour.

**[MISE EN PLACE]**
Un samedi matin, un témoin de mariage m'appelle en panique. La voiture des mariés, c'est la voiture bleue de l'oncle du marié, un homme qui la lave tous les dimanches. À l'apéritif, il a ouvert une bouteille, et le bouchon est parti droit sur le toit, juste au-dessus de la vitre arrière. Et l'oncle arrive à quinze heures.

**[TENSION]**
J'arrive sur le parking de la mairie, et la cérémonie commence dans vingt minutes. Je colle, je tire, je reprends au marteau pendant que le témoin fait le guet. À quatorze heures cinquante, une voiture se gare juste à côté : c'est l'oncle, en avance. Je range tout et je fais semblant de passer par là.

**[RÉSOLUTION]**
Il fait le tour de sa voiture, il passe la main sur le toit, et il dit fièrement que personne n'entretient une voiture comme lui. Le soir, au vin d'honneur, c'est lui qui ouvre le champagne devant tout le monde, et le bouchon part tout droit sur sa voiture. [laughs] Le témoin m'a rappelé à vingt-deux heures. J'y retourne, ou pas ?

## Ce qui a été fait

- *2026-11-05* — v1 (`export/012-v1.mp4`, rendu `render:hq`) :
  - Rush remodelé à 61,0 s, transitions sur les coupes, zooms punch. Miroir gauche/droite à chaque coupe (~5 s).
  - Voix ElevenLabs **Charlie** (eleven_v3, « Creative »), script écrit à la bonne longueur ; **pauses naturelles conservées**
    (seuls les blancs > 0,38–0,6 s raccourcis), accélération ≤ 4 %. Voix envoyée à l'utilisateur avant le montage.
  - Graphiques petits à gauche calés au mot près (Whisper), polaroid « avant », sondage final, sous-titres mot par mot.

## À faire / retours

- [x] Retour : « l'effet miroir souvent avec la petite transition, c'était top » → miroir toutes les ~5 s
- [x] Retour : « pour la troisième, enlève la voix off et les sous-titres, fais-moi un script qui colle exactement à la vidéo, je le ferai moi-même »
  → v1 rendue sans voix ni sous-titres (`AVEC_VOIX = false`), script minuté : `script-a-enregistrer.md`
- [ ] Recevoir l'enregistrement de l'utilisateur, le caler et ajouter les sous-titres
