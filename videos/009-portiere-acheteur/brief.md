# Vidéo 009 — Le coup de portière (l'acheteur)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 01 (61,0 s)
- **Plateforme :** TikTok
- **Composition Remotion :** `Video009` (`src/videos/009-portiere-acheteur/`)

## Ma demande

> Pour les trois vidéos tu fais un peu de remodelage pour qu'elles fassent 1 minute 01, tu peux mettre des effets miroir
> à des moments pour qu'il y ait du montage sur les vidéos. Pour chaque vidéo tu feras un script différent à chaque fois
> d'une histoire/anecdote de travail […] le but est d'avoir du suspense jusqu'à la fin avec un hook très accrocheur, faut
> réussir à créer de l'interaction dans les commentaires […] tu fais en fonction de ce que tu vois dans la vidéo […] tu fais
> pas toujours le même type de hook. Pour la voix off, il faut vraiment éviter un maximum les blancs, faut que tout soit
> dynamique, et en rapport avec la voix off tu vas ajouter du montage avec des graphiques motion, des insertions d'images
> en rapport avec ce que tu dis.

(Les trois rushes sont arrivés ensemble par WeTransfer : vidéos 007, 008 et 009. Exemple de script fourni : la bosse du mari
qui reculait en regardant son téléphone — même structure HOOK / MISE EN PLACE / TENSION / RÉSOLUTION.)

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `source.mp4` | `rushes/` | Rush reçu par WeTransfer, tel quel (H.264 576×1024, 30 i/s, ~1 min 02). Voiture bordeaux, bosse ronde au-dessus de la poignée de porte ; pistolet à colle, tirettes, reprise au marteau, chiffon, révélation de la poignée. |
| `original.mp4` | `rushes/original/` (hors Git) | Même fichier, utilisé pour le montage |

Fichiers de travail (hors Git, régénérables) :
```
python3 scripts/remodel.py videos/009-portiere-acheteur/rushes/original/original.mp4 videos/009-portiere-acheteur/rushes/original/travail.mp4 \
  videos/009-portiere-acheteur/rushes/original/ambiance.wav 61.0 videos/009-portiere-acheteur/rushes/segments.json
```
`rushes/segments.json` = découpage du remodelage (n = normal, f = miroir gauche/droite).

## Script (voix off, v2)

**[HOOK]**
La personne qui a fait cette bosse est revenue un mois plus tard pour acheter la voiture.

**[MISE EN PLACE]**
Un vendredi soir, un client m'appelle : il vend sa voiture le lendemain à neuf heures du matin, et il y a un mois, sur le parking du supermarché, quelqu'un lui a mis un coup de portière juste au-dessus de la poignée, sans laisser de message ni de numéro. Il veut que sa portière soit parfaite avant la vente.

**[TENSION]**
J'arrive, je regarde, et je trouve une bosse ronde, profonde, pile à hauteur de main. Je colle mes tirettes, je tire, puis je reprends au marteau. Pendant que je travaille, l'acheteur l'appelle trois fois, et à chaque fois, il pose la même question : est-ce que la portière conducteur a des bosses ? Pas la voiture, la portière conducteur. Mon client trouve ça louche, et moi aussi.

**[RÉSOLUTION]**
Samedi midi, il me rappelle en rigolant. L'acheteur est allé directement à la portière, il a passé le doigt au-dessus de la poignée, et il a dit : bizarre, j'étais sûr qu'il y avait une bosse ici. Mon client lui demande pourquoi, et le gars devient tout rouge : il y a un mois, sur le parking du supermarché, c'était lui. Il avait reconnu la voiture sur l'annonce. Mon client lui a vendu la voiture, et il lui a fait payer la réparation en plus. Et vous, quand vous touchez une voiture, vous laissez un petit mot ?

## Ce qui a été fait

- *2026-11-04* — v1 (`export/009-v1.mp4`, rendu `render:hq`) :
  - Rush remodelé à **61,0 s** : coupes dans les passages répétitifs, sans effet miroir (gardé seulement sur la vidéo 007, à la demande de l'utilisateur), agrandi en 1080×1920 (lanczos), transitions whip / zoom / flash sur chaque coupe, zooms punch.
  - **Voix off de synthèse** (Kokoro, voix française « siwis ») sans blancs, transcrite avec Whisper pour caler les graphiques au mot près
    (`assets/voix.wav`, minutage dans `assets/mots.json`).
  - Graphiques **petits, à gauche**, entre 300 et ~800 px de haut : étiquettes, appels entrants, bulles de dialogue, photos polaroid
    tirées du rush, illustrations, sondage final pour faire réagir en commentaire. Rien sous la colonne de droite ni en bas.
  - **Sous-titres** de la voix off, mot par mot (mot en cours en jaune), bas du texte à 1410 px, entre 95 et 875 px
    (`src/videos/009-portiere-acheteur/captions.ts`, généré par `scripts/captions.py`).
  - Bruitages : whoosh, pop, sonnerie, notifications, impacts, nappe + battements de cœur pendant la tension. Son d'atelier du rush très bas.

- *2026-11-04* — v2 (`export/009-v2.mp4`) :
  - **Voix d'homme** (Kokoro : 60 % im_nicola + 40 % ff_siwis, voix « A » choisie parmi 5 essais).
  - **Voix plus fluide** : script réécrit en phrases longues et liées, généré par blocs de plusieurs phrases
    (plus de phrases collées une à une avec un blanc entre chaque).
  - Graphiques recalés automatiquement sur la nouvelle voix (`scripts/retime.py`), sous-titres refaits.

## À faire / retours

- [x] Retour : « trop saccadé, robotique » + « voix d'homme la plus réaliste possible » → v2

- [x] Retour : sous-titres ajoutés, sans déborder sur les zones TikTok

- [x] Retour : « pas à l'envers, juste l'effet miroir » → puis « fais-le que sur une vidéo » : pas de miroir sur cette vidéo
- [x] Rien sur les zones / filigrane TikTok (graphiques entre 300 et ~850 px de haut, à gauche de 700 px)

- [ ] Retours de l'utilisateur sur la v1
- [ ] Rush d'origine en meilleure qualité (fichier du téléphone, 1080p ou 4K) pour un rendu plus net
