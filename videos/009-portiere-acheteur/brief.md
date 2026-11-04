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

## Script (voix off)

**[HOOK]**
Le type qui a fait cette bosse est revenu un mois plus tard. Pour acheter la voiture.

**[MISE EN PLACE]**
Un client m'appelle un vendredi soir. Il vend sa voiture le lendemain à neuf heures. Il y a un mois, au parking du supermarché, quelqu'un lui a mis un coup de portière, juste au-dessus de la poignée. Pas de mot, pas de numéro, rien. Il veut une portière parfaite avant la vente.

**[TENSION]**
J'arrive, je regarde. Une bosse ronde, profonde, pile à hauteur de main. Je colle mes tirettes, je tire, je reprends au marteau. Pendant que je travaille, l'acheteur l'appelle trois fois. Et à chaque fois, la même question : est-ce que la portière conducteur a des bosses ? Pas la voiture. La portière conducteur. Mon client trouve ça bizarre. Moi aussi.

**[RÉSOLUTION]**
Samedi midi, il me rappelle en rigolant. L'acheteur est allé directement à la portière. Il a passé le doigt au-dessus de la poignée, et il a dit : bizarre, j'étais sûr qu'il y avait une bosse ici. Mon client lui demande pourquoi. Le gars devient tout rouge. Il y a un mois, au parking du supermarché, c'était lui. Il a reconnu la voiture sur l'annonce. Mon client lui a vendu la voiture, et il lui a fait payer la réparation en plus. Et vous, quand vous touchez une voiture, vous laissez un mot ?

## Ce qui a été fait

- *2026-11-04* — v1 (`export/009-v1.mp4`, rendu `render:hq`) :
  - Rush remodelé à **61,0 s** : coupes dans les passages répétitifs, passages en **miroir** (image inversée gauche/droite, jamais à l'envers), agrandi en 1080×1920 (lanczos), transitions whip / zoom / flash sur chaque coupe, zooms punch.
  - **Voix off de synthèse** (Kokoro, voix française « siwis ») sans blancs, transcrite avec Whisper pour caler les graphiques au mot près
    (`assets/voix.wav`, minutage dans `assets/mots.json`).
  - Graphiques **petits, à gauche**, entre 300 et ~800 px de haut : étiquettes, appels entrants, bulles de dialogue, photos polaroid
    tirées du rush, illustrations, sondage final pour faire réagir en commentaire. Rien sous la colonne de droite ni en bas.
  - Bruitages : whoosh, pop, sonnerie, notifications, impacts, nappe + battements de cœur pendant la tension. Son d'atelier du rush très bas.

## À faire / retours

- [x] Retour : « pas à l'envers, juste l'effet miroir » → effet kaléidoscope retiré, miroir gauche/droite uniquement
- [x] Rien sur les zones / filigrane TikTok (graphiques entre 300 et ~850 px de haut, à gauche de 700 px)

- [ ] Retours de l'utilisateur sur la v1
- [ ] Rush d'origine en meilleure qualité (fichier du téléphone, 1080p ou 4K) pour un rendu plus net
