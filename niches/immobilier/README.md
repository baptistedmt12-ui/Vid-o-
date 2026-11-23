# Niche : visite immobilière (compte TikTok FR, nom à venir)

Consignes générales : PDF « Consignes vidéos TikTok » (62–65 s, accroche choc, cercle rouge à 0,3 s,
flèche à 2 s, question « 1 ou 2 » à la fin, son d'origine coupé, textes d'origine retirés).

## Réponses de l'utilisateur
- Langue / pays : français, France.
- Voix : **féminine, ElevenLabs** (abonnement 30 000 crédits/mois, ~1 000 crédits par vidéo).
  Voix choisie : **Chloé - Warm, Friendly & UGC Ready** (ID `Hy28BjVfgieDVMiyQpQe`, voix pro FR, réseaux sociaux) (choisie à l'oreille par l'utilisateur le 22/11/2026).
- **Ne consommer AUCUN crédit ElevenLabs sans accord explicite de l'utilisateur** (compte gratuit 10 000 crédits pour l'instant).
- Narration : présentation de la maison, un peu d'humour (« troll »).
- Musique : à choisir selon la vidéo, discrète.

## Vidéo d'exemple (reçue le 22/11/2026, WeTransfer)
Enregistrement d'écran 63,6 s d'une visite de villa de luxe (Los Angeles), voix féminine FR.
Transcription mot par mot : `exemple-transcription.json`.

### Structure du script
1. **0–1,5 s** : phrase choc sur le plan le plus fort (piscine à débordement, « …se jettent dans le vide ! »), flèche rouge.
2. **1,5–11 s** : bande-annonce des pièces les plus folles en rafale + promesse : « à la fin, tu vas devoir deviner son prix ».
3. **11–57 s** : visite dans l'ordre (entrée → salon → piscine → jardin → chambres → dressing → cuisine → terrasse → salle de jeux → cinéma).
   Phrases courtes, souvent nominales (« Le salon ? Les baies vitrées disparaissent complètement »), une pièce = une phrase.
   Petites touches perso : « honnêtement, c'est la plus folle ! », « un dressing plus grand qu'un appart ».
4. **57–63 s** : « Alors, à ton avis, elle coûte combien ? Un, moins de 20 millions d'euros, ou deux, plus de 20 millions ? Dis-le en commentaire ! »
   Deux pastilles blanches arrondies affichées : « 1 · moins de 20 M€ » (noir) / « 2 · plus de 20 M€ » (rouge).

### Voix (mesures)
- Hauteur médiane ~215 Hz (voix féminine médium), **plus aiguë et énergique sur les 3 premières secondes (~275 Hz)**,
  remonte aussi sur la question finale (~240 Hz, intonation très variée).
- Débit soutenu : **~3,5 mots/s** (223 mots en 63 s), pauses très courtes (max 0,4 s), aucun blanc.
- Ton : enthousiaste, conteuse, complice (tutoiement), pas lu.

## Règles de montage (retours de l'utilisateur, 22/11/2026)
- Les vidéos d'exemple servent surtout pour le **script et l'intonation**, pas à copier leur montage.
- Retravailler la vidéo reçue : inverser des plans, effets miroir, ralentis, plans forts d'abord.
- **Flèches de préférence** ; cercle seulement autour d'un petit élément quand il tombe proprement.
- Flèches / cercles **uniquement sur ce que dit le script**, pas partout. Un « pop » sur chacun.
- 2e exemple (Hidden Hills, 63 s) : une flèche toutes les ~4 s, chaque fois sur l'élément nommé ; fin
  « Alors, sois honnête : un, tu signes direct ? Ou deux, beaucoup trop grand pour toi ? Dis-le-moi en commentaire ! ».

## Méthode voix off validée (vidéo 010, 23/11/2026) — « c'est nickel »
- Abonnement ElevenLabs **Starter** (40 000 crédits/mois ; l'offre gratuite refuse les voix de bibliothèque via l'API).
- Modèle **eleven_v4**, Chloé `Hy28BjVfgieDVMiyQpQe`, stabilité **0,30**, ressemblance **0,75**, style **0,5**,
  speaker boost, vitesse **1,1**, seed 4242. Pas de majuscules dans le texte : l'énergie vient des « ! » et « ? ».
  Chiffres en toutes lettres (« sept millions »). Coût réel ≈ 0,35 crédit/caractère (73 + 404 = 477 crédits pour 64 s).
- Ordre : **1) générer le hook seul** → le poser sur la vidéo → validation de l'utilisateur ; **2) générer la suite**
  avec le hook en `previous_text` (même énergie, rien à refaire).
- Après génération : pauses > 0,2 s raccourcies (0,26 s avant les chutes de blague), suite accélérée si besoin
  (atempo ≤ 1,07), niveaux égalisés, puis montage recalé au mot près (alignement ElevenLabs).
- **Attention prononciation** : « direct » a été écorché dans « un, tu signes direct ? » à la fin. Pour les prochaines
  vidéos : transcrire la voix aussitôt et réécouter les mots à risque ; éviter de finir une question sur un mot comme
  « direct » (préférer « tout de suite » / « sans hésiter ») ; régénérer seulement la phrase fautive si besoin.

## Structure de script validée (comme les exemples)
1. Intro 3 plans rapides des points forts (sans prix), plan le plus fort + boom + flèche à 0,3 s.
2. « Voici ce que tu peux avoir pour seulement X millions d'euros » sur la façade + étiquette prix + son d'argent.
3. « Reste bien jusqu'à la fin. On commence par… » puis visite dans l'ordre, une phrase courte par pièce,
   déco marquante comprise, petites blagues courtes et familières (belle-famille, plats ratés, « la tienne est jalouse »).
4. Fin sur la piscine (ou le plus beau plan) : « Alors, sois honnête : un… ? Ou deux… ? Dis-le en commentaire ! »
- Ton familier, tutoiement, aucun mot « agence immobilière » (« baignée de lumière », « vue plongeante » refusés).
- Flèches : sur ce que dit la voix (architecture d'abord, déco si citée avec insistance), jamais deux qui s'enchaînent
  trop vite (sinon une seule flèche, une seule mention). Bruitages variés et bas (sous la voix).

## Musique (décision du 23/11/2026)
- Musique **composée par programme** (aucun extrait existant, pas de droits) : script `videos/010-villa-7-millions/outils/sons.py`.
- Test sur **2 vidéos** (010 + la suivante) avec cette musique maison, à volume léger sous la voix (0,14).
  Ensuite, comparer les stats TikTok ; option à tester après : version sans musique + son tendance ajouté dans l'appli.
