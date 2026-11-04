# Vidéo 007 — La bosse du père (BMW 116i)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 01 (61,0 s)
- **Plateforme :** TikTok
- **Composition Remotion :** `Video007` (`src/videos/007-bmw-pere-fils/`)

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
| `source.mp4` | `rushes/` | Rush reçu par WeTransfer, tel quel (H.264 576×1024, 30 i/s, ~1 min 02). BMW 116i noire, bosse sur l'aile arrière au-dessus du feu ; collage de tirettes vertes, reprise au marteau, révélation finale « 116i ». |
| `original.mp4` | `rushes/original/` (hors Git) | Même fichier, utilisé pour le montage |

Fichiers de travail (hors Git, régénérables) :
```
python3 scripts/remodel.py videos/007-bmw-pere-fils/rushes/original/original.mp4 videos/007-bmw-pere-fils/rushes/original/travail.mp4 \
  videos/007-bmw-pere-fils/rushes/original/ambiance.wav 61.0 videos/007-bmw-pere-fils/rushes/segments.json
```
`rushes/segments.json` = découpage du remodelage (n = normal, f = miroir gauche/droite).

## Script (voix off, v2)

**[HOOK]**
Ce client m'a payé pour effacer cette bosse, sauf que ce n'est pas lui qui l'avait faite, et le vrai coupable m'a appelé deux jours plus tard.

**[MISE EN PLACE]**
Dimanche matin, un jeune m'appelle en panique : il a emprunté la BMW de son père pour un premier rendez-vous, et en sortant du restaurant, il découvre une bosse juste au-dessus du feu arrière. Son père rentre lundi.

**[TENSION]**
J'arrive et je regarde : une bosse ronde, bien nette, sur l'aile. Je lui demande s'il est sûr que c'est arrivé au restaurant, il hésite une seconde, puis il me jure que oui, qu'il s'était garé loin de tout le monde. Je répare tout en une heure, il me fait promettre de ne jamais rien dire, et mardi soir, mon téléphone sonne. Même nom de famille.

**[RÉSOLUTION]**
C'est le père. Il me dit que vendredi, il a touché le pilier du garage en reculant, qu'il a une bosse au-dessus du feu arrière, et qu'il a prêté la voiture à son fils sans rien lui dire. Il veut que je la répare avant que son fils la voie, sinon il va le lui rappeler toute sa vie. Je passe voir la voiture, il passe la main dessus dix fois, et il n'y a plus rien. Je lui dis que parfois, les bosses partent toutes seules. Le fils a payé pour la bêtise de son père, et aucun des deux ne le sait. Alors, je leur dis, ou pas ?

## Ce qui a été fait

- *2026-11-04* — v1 (`export/007-v1.mp4`, rendu `render:hq`) :
  - Rush remodelé à **61,0 s** : coupes dans les passages répétitifs, passages en **miroir** (image inversée gauche/droite, jamais à l'envers), agrandi en 1080×1920 (lanczos), transitions whip / zoom / flash sur chaque coupe, zooms punch.
  - **Voix off de synthèse** (Kokoro, voix française « siwis ») sans blancs, transcrite avec Whisper pour caler les graphiques au mot près
    (`assets/voix.wav`, minutage dans `assets/mots.json`).
  - Graphiques **petits, à gauche**, entre 300 et ~800 px de haut : étiquettes, appels entrants, bulles de dialogue, photos polaroid
    tirées du rush, illustrations, sondage final pour faire réagir en commentaire. Rien sous la colonne de droite ni en bas.
  - **Sous-titres** de la voix off, mot par mot (mot en cours en jaune), bas du texte à 1410 px, entre 95 et 875 px
    (`src/videos/007-bmw-pere-fils/captions.ts`, généré par `scripts/captions.py`).
  - Bruitages : whoosh, pop, sonnerie, notifications, impacts, nappe + battements de cœur pendant la tension. Son d'atelier du rush très bas.

- *2026-11-04* — v2 (`export/007-v2.mp4`) :
  - **Voix d'homme** (Kokoro : 60 % im_nicola + 40 % ff_siwis, voix « A » choisie parmi 5 essais).
  - **Voix plus fluide** : script réécrit en phrases longues et liées, généré par blocs de plusieurs phrases
    (plus de phrases collées une à une avec un blanc entre chaque).
  - Graphiques recalés automatiquement sur la nouvelle voix (`scripts/retime.py`), sous-titres refaits.

## À faire / retours

- [x] Retour : « trop saccadé, robotique » + « voix d'homme la plus réaliste possible » → v2

- [x] Retour : sous-titres ajoutés, sans déborder sur les zones TikTok
- [x] Retour : miroir moins fréquent → bascule toutes les ~10–15 s (11,2 / 20,6 / 32,1 / 44,3 s)

- [x] Retour : « pas à l'envers, juste l'effet miroir » → effet kaléidoscope retiré, miroir gauche/droite uniquement
- [x] Rien sur les zones / filigrane TikTok (graphiques entre 300 et ~850 px de haut, à gauche de 700 px)

- [ ] Retours de l'utilisateur sur la v1
- [ ] Rush d'origine en meilleure qualité (fichier du téléphone, 1080p ou 4K) pour un rendu plus net
