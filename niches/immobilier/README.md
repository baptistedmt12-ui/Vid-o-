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

## Publication
- Heure retenue : **18h** (vidéos 010 et suivante, même heure pour comparer). Les autres comptes de l'utilisateur
  postent à 16h ; un test à 16h pourra être fait plus tard. Passer le compte en Pro pour voir l'activité des abonnés.
- Stats à envoyer vers J+1, avec l'heure de publication.

## Stats vidéo 010 (publiée le 23/11 à 17:59, relevé ~7 h après)
- 569 vues (98,6 % « Pour toi »), 22 j'aime, 1 commentaire, 0 partage, 2 enregistrements, 0 abonné.
- **Temps de visionnage moyen 4,9 s (8 %)**, 0,96 % jusqu'au bout. **Décrochage massif à 0:02**, 16 % restants à 0:05.
- Diagnostic : le problème est l'accroche, pas la visite. Phrase d'ouverture descriptive (« Une piscine face au coucher
  de soleil… ») sans curiosité ni enjeu ; prix (l'enjeu) seulement à 8,4 s ; aucun texte à l'écran pour ceux qui
  scrollent sans le son ; premier plan sombre (coucher de soleil) et lent (ralenti + zoom).
- À appliquer : enjeu/curiosité dans la 1re seconde (prix ou question), texte d'accroche court à l'écran sur les
  3 premières secondes, plan le plus lumineux et le plus « waouh » en 1er, coupes rapides (~1 s) au début, voix à fond dès 0,0 s.

## Stats vidéo 011 (publiée à 18h) et hypothèses
- 628 vues (99,4 % Pour toi), 6 j'aime, 0 commentaire/partage/favori, **3,6 s** de moyenne, 12 % à 5 s, 2 % à 30 s.
- Changer l'accroche n'a pas aidé (pire que la 010) → causes probables : voix IA reconnue dès la 1re seconde ;
  images déjà vues / reconnues par TikTok (vidéos virales retéléchargées) ; compte neuf.
- Pistes : voix humaine de l'utilisateur (test), images moins vues (Pexels/Unsplash — **Pinterest n'est pas libre de
  droits**), séquence face caméra au début, vérifier les avertissements « contenu non original » dans TikTok Studio.
- Vidéo 012 : test « mélange TikTok + Pinterest » pour casser l'effet « déjà vu ».

## Règles ajoutées (vidéo 012, 25/11/2026)
- **Un élément cité et fléché à chaque plan** ; un plan sans élément = ennuyeux → raccourcir ou retirer.
- Pas de titre à l'écran : l'utilisateur le met lui-même ; lui **donner le titre au rendu final**.
- Accroche : 2 éléments max en une phrase très rapide, puis ville + prix choc dès ~3 s (ville en gros en motion design),
  puis « Reste bien jusqu'à la fin, tu vas pas t'en remettre », puis visite directe ; appel à commenter rapide au milieu.
- Voix : couper les blancs **uniquement dans le silence réel** (`videos/012-maison-escalier-verre/outils/voix.py`) ;
  transcrire après génération ; si un mot sonne mal, regénérer **la phrase seule** (previous/next_text) et la réinsérer.

## Stats vidéo 012 (Marseille 450 000 €, ~24 h après)
- ≈ 700 vues, **29 j'aime (≈ 4,1 %, meilleur ratio des 3)**, **4,6 s** de moyenne, **18 % à 5 s** (011 : 12 %), 2 % à 30 s.
- L'accroche aide un peu, mais le décrochage reste massif. Hypothèse de l'utilisateur : la voix IA est pénalisée.
- **Test suivant : la voix de l'utilisateur** sur le même montage (`Video012SansVoix` + script à lire), recalage
  du montage sur son enregistrement.
