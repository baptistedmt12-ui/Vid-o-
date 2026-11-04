# Instructions pour Claude — projet Vid-o-

Ce dépôt est l'espace de production vidéo de l'utilisateur, basé sur Remotion.
Réponds toujours en français.

## Fichiers clés
- `SUIVI.md` : tableau de suivi de toutes les vidéos, méthode de production et DA.
- `videos/` : un dossier par vidéo (voir `videos/README.md`).
- `src/` : code Remotion (compositions déclarées dans `src/Root.tsx`).

## Quand l'utilisateur envoie une vidéo ou une demande
1. Si c'est une nouvelle vidéo : copier `videos/_modele/` vers `videos/NNN-nom-court/`
   (NNN = numéro suivant, nom en minuscules avec tirets).
2. Ranger les fichiers reçus : vidéos/audios bruts dans `rushes/`, images/logos/musiques dans `assets/`.
   Fichier > 100 Mo : ne pas le committer tel quel (voir « Qualité maximale » ci-dessous).
3. Noter la demande dans `brief.md` (section « Ma demande »), puis ce qui a été fait.
4. Faire le travail demandé en suivant la méthode et la DA de `SUIVI.md`.
   Les compositions Remotion d'une vidéo vont dans `src/videos/NNN-nom-court/`.
5. Mettre à jour le tableau de `SUIVI.md` (statut, durée, composition, dates).
6. Committer et pousser.

## Qualité maximale (exigence de l'utilisateur)
L'utilisateur veut **toujours le rendu final dans la meilleure qualité possible** :
- Monter et rendre à partir du **fichier original** reçu (jamais d'une copie recompressée).
  Si l'original dépasse 100 Mo, le garder hors de Git dans `videos/NNN-nom/rushes/original/`
  (ignoré par Git) et committer seulement une copie compressée `rushes/source.mp4` pour l'archive.
  Pendant le travail, pointer la composition sur l'original.
- Rendu final : `npm run render:hq -- <Composition> videos/NNN-nom/export/NNN-vX.mp4`
  (H.264, CRF 14, preset lent, audio AAC 320 kb/s, 1080p minimum, 30 i/s ou la cadence du rush).
- Toujours envoyer le fichier final à l'utilisateur dans la discussion.
  Ne le committer que s'il fait moins de 100 Mo ; sinon, le dire.
- Les rendus intermédiaires (aperçus) peuvent être en qualité réduite, en le précisant.

## Livraison des vidéos (constaté avec l'utilisateur)
- L'utilisateur est sur **iPhone 17 Pro + PC Windows** (pas de Mac).
- **Réception des rushes :** par lien **WeTransfer** (original intact). Les pièces jointes sont limitées à ~30 Mo.
- **Envoi des vidéos finales :** dans la discussion. Sur l'appli iPhone, le bouton de partage n'apparaît
  que pour les fichiers d'environ 100 Mo maximum (vu à 94 Mo, absent à 206 Mo), et l'enregistrement
  depuis l'iPhone ne fonctionne pas de toute façon : il récupère ses vidéos par **lien GitHub** dans Safari.
- Toujours envoyer la version qualité max dans la discussion **et** la mettre sur GitHub :
  - moins de 100 Mo : commit normal ;
  - plus de 100 Mo : via **Git LFS** (`git lfs track "videos/NNN-nom/export/NNN-vX.mp4"`, uniquement le
    fichier final, pas les rushes) — les domaines LFS sont autorisés dans le réseau de l'environnement.
  - Donner le lien direct à ouvrir dans Safari :
    `https://github.com/baptistedmt12-ui/Vid-o-/raw/<branche>/videos/NNN-nom/export/NNN-vX.mp4`
  - Le quota LFS gratuit est limité : supprimer du suivi LFS les anciennes versions remplacées.

## Transcription de la voix
- « Comme d'habitude » = graphiques animés **calés au mot près sur ce qu'il dit** : toujours transcrire.
- Les noms propres qu'il écrit (ville, salle…) servent à l'**orthographe**, pas de contenu à afficher seul.
- Si Hugging Face est bloqué : modèle Whisper small (CTranslate2) publié sur npm en 4 parties
  `@skillninja/shortmovie-telop-model-p0..p3` (télécharger les tarballs, concaténer `model.bin.part*`,
  vérifier `model.sha256`), puis `faster-whisper` avec l'audio passé en tableau numpy (16 kHz mono).

## Habillage TikTok (exigence de l'utilisateur)
- Pas de texte sur les actions (ex. « CROC ! ») : un effet sonore suffit.
- Textes et compteurs **petits et sur le côté**, jamais en gros au milieu : on doit bien voir les mouvements.
- Ne rien placer dans les zones de l'interface TikTok (voir `videos/README.md`) :
  haut ~280 px, droite au-delà de ~900 px, bas à partir de ~1450 px.

## Rendu
- Aperçu : `npm run dev`
- Rendu : `npx remotion render <Composition> out/<nom>.mp4`
  (dans l'environnement cloud, ajouter `--browser-executable=/opt/pw-browsers/chromium`).
