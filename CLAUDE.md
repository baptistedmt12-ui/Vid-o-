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

## Série « nettoyage de jet privé » (repost amélioré, monétisation TikTok, vidéos ~1 min)
- Rushes = petit montage déjà fait + voix off déjà posée : on garde sa voix, **pas de sous-titres** (il les fait).
- Graphiques animés **calés au mot près** sur la voix off (transcrire), petits, sur les côtés.
- Style **épuré, un peu luxe, simple mais efficace** (pas trop « aviation »).
- **Effet miroir** (inversion gauche/droite, pas retournement) toutes les ~7-10 s ; le décaler juste avant/après
  si une plaque, une immatriculation ou du texte est visible (si impossible, tant pis, on le garde).
- **Bruitages** légers à l'apparition des graphiques/images, et sur les prix.
- **Pas de musique** (il l'ajoute sur TikTok) — à rediscuter plus tard.
- Un petit **appel à l'action** vers ~40 s (like, partage ou commentaire), discret, varié.
- Moments forts (message d'un client, discussion, carnet…) : peuvent être affichés **en grand mais brièvement**.
- Habillage partagé : `src/videos/_shared/luxe.tsx` (verre fumé, filet doré, Playfair Display + Inter, Caveat pour le manuscrit).
- **Livraison :** toujours la meilleure qualité possible, et donner **directement le lien de téléchargement** GitHub (Safari) dès que la vidéo est prête.
- **Image intacte :** aucun filtre, vignettage, dégradé, étalonnage, zoom permanent ni zoom « punch » sur le rush
  (ça assombrit et baisse la qualité). Seuls ajouts : graphiques, miroir, bruitages.
- **Bruitages plus audibles** (il ajoute une petite musique sur TikTok) : normaliser les .wav à -3 dB crête,
  puis volumes ~0,3–0,6 (heartbeat ~0,3). Ceux de la 007/008 v2 étaient trop faibles.
- **Tout regrouper en un seul rendu** : appliquer toutes ses demandes d'un coup avant de rendre, pour ne pas
  gaspiller sa limite d'utilisation. S'il dit « stop », s'arrêter immédiatement.
- **Illustrer vraiment** ce qu'il dit (demande du 08/11) : pas seulement des cartes à puces, mais des
  illustrations animées (`src/videos/_shared/illus.tsx` : Polaroid avec flash, scènes SVG, valise, carte,
  post Instagram avec image figée du rush…), brèves, et en grand pour les moments forts.
- **Ménage :** à chaque nouvelle livraison, supprimer de GitHub les exports des vidéos précédentes
  (garder seulement ceux du jour). Rester sous 100 Mo par export (commit normal) : le quota Git LFS
  gratuit est presque plein (~840 Mo stockés, non libérés par une suppression).
- **Sons prêts à l'emploi :** `videos/_sons/` (normalisés à -3 dB crête : pop, tick, ding, whoosh, impact, notif,
  cash, ring, shutter, vacuum, heartbeat, knock) → les copier dans `videos/NNN-nom/assets/`.
- **Modèles de montage :** `src/videos/009-jet-c/Video009.tsx` et `src/videos/010-jet-d/Video010.tsx`
  (dernière méthode validée : image intacte, miroir, illustrations, bruitages). Leurs rushes ont été supprimés.
- **Ménage du 08/11 :** tous les rushes et exports 001–010 ont été supprimés (déjà téléchargés par l'utilisateur).
- **Rush 4K :** rendre avec `--concurrency=2 --offthreadvideo-cache-size-in-bytes=1500000000` (sinon plantage mémoire).
