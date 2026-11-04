# Vidéo 008 — Le vasistas (bosse sur le toit)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 01 (61,0 s)
- **Plateforme :** TikTok
- **Composition Remotion :** `Video008` (`src/videos/008-toit-vasistas/`)

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
| `source.mp4` | `rushes/` | Rush reçu par WeTransfer, tel quel (H.264 576×1024, 30 i/s, ~1 min 02). Voiture noire, bosse sur le toit à côté des barres et de l'antenne requin ; tireur à colle, reprise au marteau, révélation de l'antenne. |
| `original.mp4` | `rushes/original/` (hors Git) | Même fichier, utilisé pour le montage |

Fichiers de travail (hors Git, régénérables) :
```
python3 scripts/remodel.py videos/008-toit-vasistas/rushes/original/original.mp4 videos/008-toit-vasistas/rushes/original/travail.mp4 \
  videos/008-toit-vasistas/rushes/original/ambiance.wav 61.0 videos/008-toit-vasistas/rushes/segments.json
```
`rushes/segments.json` = découpage du remodelage (n = normal, f = miroir gauche/droite).

## Script (voix off, v2)

**[HOOK]**
Cette bosse est apparue en pleine nuit, sur le toit d'une voiture enfermée dans un garage fermé à clé. Personne n'est entré, et pourtant, quelqu'un est sorti.

**[MISE EN PLACE]**
Une mère de famille m'appelle : le matin, en descendant au garage, elle a trouvé une bosse sur le toit de sa voiture, juste à côté de l'antenne. La porte était verrouillée, et personne n'a la clé à part elle et son mari. Et l'assurance ne veut rien savoir : pas de tiers, pas de remboursement.

**[TENSION]**
J'arrive et je regarde le toit. La bosse est large et molle, comme si quelque chose de lourd s'était posé dessus : pas un choc, un poids. Et juste au-dessus de la voiture, il y a un vasistas. Je nettoie le toit avant de coller mes tirettes, et dans la poussière, à côté de la bosse, je vois une trace de semelle. Pointure quarante-trois. Elle fait du trente-sept, et son mari du quarante et un.

**[RÉSOLUTION]**
Mais son fils de seize ans, lui, fait du quarante-trois. Je débosselle le toit, et elle me demande de ne rien dire, parce qu'elle veut le prendre sur le fait. Le lendemain, elle m'envoie un message : à une heure du matin, elle l'attendait dans le garage, dans le noir. Il est monté sur la voiture, et la lumière s'est allumée. Il a juré qu'il allait chercher le chat. Sauf qu'ils n'ont pas de chat. Et vous, à seize ans, vous sortiez par où ?

## Ce qui a été fait

- *2026-11-04* — v1 (`export/008-v1.mp4`, rendu `render:hq`) :
  - Rush remodelé à **61,0 s** : coupes dans les passages répétitifs, sans effet miroir (gardé seulement sur la vidéo 007, à la demande de l'utilisateur), agrandi en 1080×1920 (lanczos), transitions whip / zoom / flash sur chaque coupe, zooms punch.
  - **Voix off de synthèse** (Kokoro, voix française « siwis ») sans blancs, transcrite avec Whisper pour caler les graphiques au mot près
    (`assets/voix.wav`, minutage dans `assets/mots.json`).
  - Graphiques **petits, à gauche**, entre 300 et ~800 px de haut : étiquettes, appels entrants, bulles de dialogue, photos polaroid
    tirées du rush, illustrations, sondage final pour faire réagir en commentaire. Rien sous la colonne de droite ni en bas.
  - **Sous-titres** de la voix off, mot par mot (mot en cours en jaune), bas du texte à 1410 px, entre 95 et 875 px
    (`src/videos/008-toit-vasistas/captions.ts`, généré par `scripts/captions.py`).
  - Bruitages : whoosh, pop, sonnerie, notifications, impacts, nappe + battements de cœur pendant la tension. Son d'atelier du rush très bas.

- *2026-11-04* — v2 (`export/008-v2.mp4`) :
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
