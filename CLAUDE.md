# Instructions pour Claude — projet Vid-o-

Ce dépôt est l'espace de production vidéo de l'utilisateur, basé sur Remotion.
Réponds toujours en français.

## Fichiers clés
- `SUIVI.md` : tableau de suivi de toutes les vidéos, méthode de production et DA.
- `videos/` : un dossier par vidéo (voir `videos/README.md`).
- `src/` : code Remotion (compositions déclarées dans `src/Root.tsx`).

## Façon de travailler
- Ne pas commenter chaque étape : travailler à fond, puis envoyer seulement le résultat final (vidéos + liens).
  Ne donner des nouvelles que s'il y a un problème ou une décision à prendre.

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

## Stockage (demande de l'utilisateur)
- Il télécharge chaque vidéo dès qu'elle est envoyée : **à chaque nouveau lien WeTransfer, supprimer les vidéos des
  projets précédents** (rushes, `source.mp4`, fichiers de travail et exports, en local et sur GitHub) pour garder de la place.
  Garder le code, les briefs, les scripts et les petits assets (sons, voix, images).

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
- Effet miroir = image inversée gauche/droite uniquement (jamais à l'envers, pas de kaléidoscope), **sur toutes les vidéos** :
  une bascule à chaque coupe, toutes les ~5–6 s, avec la petite transition (whip / zoom / flash) — l'utilisateur adore.
- Sous-titres de la voix off : `scripts/captions.py` + composant `Captions` (bas du texte à 1410 px, 95–875 px de large).
- **Aucun filtre sur l'image entière** (pas d'étalonnage, vignette, assombrissement) : `<Footage clean />`.
- Graphiques : petites étiquettes à gauche **et**, aux moments forts, une **illustration au centre** ~1,5–2 s
  (`CenterPop` dans `src/videos/_shared/center.tsx`, dessin vectoriel ; ex. mamie sur un podium).
- Quand la voix off est déjà dans le rush : montage continu (segments contigus), voix intacte, pas de sous-titres.
- Disque limité : les rendus copient le dossier public ; rendre avec un petit dossier public de liens durs
  (`out/pub-NNN/…`, option `--public-dir`) et supprimer les `hd.mov` intermédiaires une fois le remodelage fait.
- Ne rien placer dans les zones de l'interface TikTok (voir `videos/README.md`) :
  haut ~280 px, droite au-delà de ~900 px, bas à partir de ~1450 px.

## Rendu
- Aperçu : `npm run dev`
- Rendu : `npx remotion render <Composition> out/<nom>.mp4`
  (dans l'environnement cloud, ajouter `--browser-executable=/opt/pw-browsers/chromium`).

## Voix off de synthèse (quand l'utilisateur la demande)
- **Pas de tests ni d'essais envoyés** : à chaque lien WeTransfer, écrire l'histoire, générer directement la voix off
  avec Maxime, vérifier la prononciation (Whisper), monter et envoyer la vidéo finale. Viser une seule génération
  par vidéo (script à la bonne longueur) ; si un mot est mal prononcé, régénérer seulement la phrase concernée.
- **Voix off : ElevenLabs, voix « Maxime »** (`5Qfm4RqcAer0xoyWtoHC`, voix française de la bibliothèque), choisie par
  l'utilisateur, qui a pris l'abonnement Starter (les voix de la bibliothèque marchent donc par l'API).
  Réglages fixes pour avoir la même voix à chaque vidéo : `eleven_multilingual_v2`, réglages par défaut de la voix,
  `language_code: fr`, sortie `mp3_44100_128` (le 192 kb/s demande l'offre Creator). Jamais le mode v3 « Creative ».
  Clé dans `ELEVENLABS_API_KEY` (jamais dans le dépôt). **Ne jamais retoucher la voix** (ni accélérer, ni ralentir,
  ni couper les silences) : si c'est trop long ou trop court, **ajuster le script** et régénérer.
- **Hooks (rétention TikTok)** : style de `scripts/exemples-hooks.md` — mission banale, détail qui cloche, chute qui
  retourne tout ou promesse de révélation ; concret, un chiffre précis, jamais la réponse. Varier le type de hook
  d'une vidéo à l'autre. Thème : débosselage de voiture.
- **Écriture des scripts (exigence de l'utilisateur)** : exactement comme son exemple — **4 blocs** [HOOK] [MISE EN PLACE]
  [TENSION] [RÉSOLUTION], chaque bloc écrit comme une histoire racontée à l'oral : phrases simples qui s'enchaînent
  (« il me dit que… », « je lui demande… », « je dis rien »), pas de points de suspension, pas de deux-points en série,
  pas de petits fragments, pas de balises d'émotion. Exemple validé : `videos/012-bouchon-champagne/script-a-enregistrer.md`.
- **Fluidité « comme un humain qui lit » (exigence forte de l'utilisateur)** : ni phrase par phrase collée avec des blancs,
  ni tout un paragraphe d'une traite. Comme un humain : **chaque phrase commencée et finie d'un seul élan**, puis un
  **petit temps naturel**, plus ou moins long selon le sens (court après une virgule, un peu plus après une révélation),
  et l'intonation qui monte ou descend là où il faut.
  - Générer le texte en continu (un paragraphe ou plus par requête, avec `previous_text` / `next_text`) pour que
    l'intonation enchaîne ; ne jamais coller des phrases générées séparément.
  - **Garder les pauses naturelles de la voix** : ne pas les écraser toutes à la même durée. Seulement raccourcir les
    blancs anormalement longs (> 0,6 s → ~0,45 s) ; accélération ≤ 1,05 et seulement en dernier recours.
  - Donc écrire le script **à la bonne longueur dès le départ** (~215 mots pour 61 s en v3, à mesurer sur un essai).
  - Ponctuation au service de la lecture : virgules pour les respirations, points pour les temps, « … » rares
    (révélations), une ou deux balises d'émotion maximum.
- Voix off : **uniquement Maxime** (décision de l'utilisateur). Les autres pistes (Charlie, voix gratuites, Kokoro,
  clone de sa voix) ont été abandonnées et supprimées.
- Toujours vérifier la prononciation en retranscrivant avec Whisper, puis caler les graphiques sur le minutage des mots.
- Remodelage d'un rush (durée exacte, miroirs) : `scripts/remodel.py`. Aperçus rapides : `node scripts/stills.mjs`.
