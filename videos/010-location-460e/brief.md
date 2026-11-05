# Vidéo 010 — Les 460 € (voiture de location)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 01 (61,0 s)
- **Plateforme :** TikTok
- **Composition Remotion :** `Video010` (`src/videos/010-location-460e/`)

## Ma demande

> Voici un nouveau lien WeTransfer avec trois nouvelles vidéos. Tu me fais la même chose qu'hier, essaye de fluidifier
> un maximum la voix off avec l'intonation comme on a vu, et fais des histoires différentes pour les trois avec des hooks
> différents. […] tu peux commencer par « un client m'a payé 460 € pour réparer une bosse, j'ai vite compris pourquoi,
> il n'aurait pas hésité à mettre plus » […] essaye-le sur une des histoires, je te laisse faire.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `source.mp4` | `rushes/` | Rush reçu par WeTransfer, tel quel (576×1024). Voiture noire, petite bosse sur la portière sous la vitre ; collage, tirettes, reprise au marteau (1 min 38 → remodelé à 61 s). |
| `original.mp4` | `rushes/original/` (hors Git) | Même fichier, utilisé pour le montage |

Fichiers de travail (hors Git) : `python3 scripts/remodel.py … 61.0 videos/010-location-460e/rushes/segments.json`.

## Script (voix off — balises d'émotion ElevenLabs v3 entre crochets)

**[HOOK]**
Un client m'a payé quatre cent soixante euros pour réparer une bosse, et j'ai vite compris pourquoi : il n'aurait pas hésité à mettre plus.

**[MISE EN PLACE]**
Il arrive un vendredi midi avec une voiture noire de location, une petite bosse juste sous la vitre de la portière, et il doit la rendre à dix-huit heures. Il a lu le contrat : une franchise de mille cinq cents euros, plus les frais de l'agence, alors il ne négocie même pas, il me tend directement les billets.

**[TENSION]**
Je colle mes tirettes, je tire, je reprends au marteau, et lui ne lâche pas son téléphone. Toutes les dix minutes, il me demande si ça se verra encore. À dix-sept heures trente, la portière est parfaite, il part en courant, et il me promet de m'appeler pour me raconter.

**[RÉSOLUTION]**
Le soir, il m'appelle. À l'agence, l'employée a fait le tour de la voiture avec sa lampe, elle n'a rien trouvé, et puis elle a sorti l'état des lieux du départ. La bosse sous la vitre était déjà notée dessus, elle était là avant lui. [laughs] Il a payé quatre cent soixante euros pour réparer la bosse d'un autre. Et vous, vous vérifiez l'état des lieux avant de partir ?

## Ce qui a été fait

- *2026-11-05* — v1 (`export/010-v1.mp4`, rendu `render:hq`) :
  - Rush remodelé à 61,0 s, transitions sur les coupes, zooms punch. Miroir gauche/droite à chaque coupe (~5 s).
  - Voix ElevenLabs **Charlie** (eleven_v3, « Creative »), script écrit à la bonne longueur ; **pauses naturelles conservées**
    (seuls les blancs > 0,38–0,6 s raccourcis), accélération ≤ 4 %. Voix envoyée à l'utilisateur avant le montage.
  - Graphiques petits à gauche calés au mot près (Whisper), polaroid « avant », sondage final, sous-titres mot par mot.

## À faire / retours

- [x] Retour : « l'effet miroir souvent avec la petite transition, c'était top » → miroir toutes les ~5 s
- [ ] Retours de l'utilisateur sur la v1
