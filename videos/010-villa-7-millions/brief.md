# Vidéo 010 — Villa à « seulement » 7 millions d'euros

- **Statut :** 🔍 Relecture (v1 finale avec voix envoyée)
- **Format :** 9:16 (1080×1920), 30 i/s (rush 60 i/s → ralentis fluides possibles)
- **Durée :** 64,98 s
- **Plateforme :** TikTok, niche visite immobilière (voir `niches/immobilier/README.md`)
- **Composition Remotion :** `Video010` (`src/videos/010-villa-7-millions/`)

## Ma demande

« Tout d'abord, tu vas écrire un script […]. Le hook, par exemple, ça pourrait être « Voici ce que tu peux avoir
pour seulement 7 millions d'euros. » Comme ça, ça va faire réagir les gens dans les commentaires. […] Fais le montage
aussi en même temps, mais ne fais pas tout de suite la voix off, car on va avoir qu'un essai […]. D'abord tu me fais
le montage, tu m'écris le script à côté, je te dis si je valide, et à la fin on fera la voix off. »

« La vidéo fait déjà que 1 minute 2 : retravaille-la à fond, inverse quelques plans, mets des effets miroirs.
L'image du début est bien, impressionnante. Ajoute des sound effects là où tu mets des flèches. Monte comme s'il y
avait la voix, sans utiliser les crédits ElevenLabs, et explique ce que tu as fait. »

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `rush.mp4` (SaveTik…-hd.mp4) | `rushes/original/` (hors Git, 111 Mo) | WeTransfer : 62,0 s, 1080×1920, HEVC 60 i/s, son = musique seule, aucun texte incrusté |
| `source.mp4` | `rushes/` | Copie compressée d'archive (H.264) |

## Ce qui a été fait

- 2026-11-22 — Repérage image par image : visite d'une maison neuve aux États-Unis (drapeau US visible),
  aucun texte ni emoji incrusté → pas d'inpainting nécessaire.
- 2026-11-22 — **Montage v1 sans voix** (162 Mo, sur GitHub via LFS) (`export/010-v1-montage.mp4`), calé sur la voix off imaginée (`script.md`) :
  - accroche : façade (plan le plus impressionnant) avec boom + secousse, cercle à 0,3 s, flèche à 2 s + tintement ;
  - bande-annonce 3,3–8,3 s : escalier vu d'en haut (miroir), cave vitrée, piscine au coucher du soleil (ralenti) ;
  - visite remise dans un nouvel ordre (salle de jeux avant la mezzanine, piscine gardée pour la fin),
    7 plans en miroir, ralentis sur l'allée, l'entrée, la mezzanine et la piscine, cuisine raccourcie (19 s → 13 s) ;
  - 13 annotations rouges, uniquement sur ce que dit le script, suivies image par image (OpenCV, `outils/suivi.py`),
    qui disparaissent au changement de plan, chacune avec un « pop » : 2 cercles (maison à 0,3 s, cheminée),
    11 flèches (porte, escaliers, bouteilles, fenêtres, îlot, hotte, lustre de la chambre, miroir, baignoire,
    salle de jeux, lustre géant) ;
  - fin : question 1 ou 2 avec deux petites pastilles en haut à gauche, retour sur la façade (boucle) ;
  - son d'origine coupé, musique house douce générée (`outils/sons.py`, 100 BPM), pas de whoosh.

## Retours de l'utilisateur (22/11)

- Les exemples servent surtout pour le **script et l'intonation**, pas à copier le montage.
- Montage : retravailler la vidéo reçue (inverser des plans, miroirs…).
- **Flèches de préférence** ; cercle seulement autour d'un petit élément quand c'est propre.
- Flèches / cercles **uniquement sur les éléments dont parle le script**, pas partout.

## v2 (22/11) — retours sur la v1

- Retours : trop de flèches sur la déco (lustres, miroir, baignoire) ; pas de flèche sur la piscine en premier plan ;
  au début, juste une flèche sur la maison + pop-up « 7 millions » avec un son d'argent ; deux flèches sur le double
  escalier ; sons différents selon l'élément, pas obligatoirement sur chaque flèche.
- Fait : 10 flèches sur l'architecture seulement (maison, piscine ×2, 2 escaliers, plafond en arches, cave, fenêtres,
  îlot), plus aucun cercle ; étiquette « PRIX 7 000 000 € » (1,9–5 s) + « ka-ching » ; sons : boom, argent, plouf,
  scintillement, tintement de verres, pop ; fin « Et dehors, la piscine » (ralenti 0,4×). Durée 63,8 s.
  Note : pas de cercle à 0,3 s (consigne du PDF), remplacé par la flèche sur la maison à la demande de l'utilisateur.

## v3 (22/11) — retours sur la v2

- Retours : plus aucune flèche entre l'îlot (34 s) et la piscine finale ; on peut aussi flécher de la déco quand le
  script en parle (canapé), mais pas lustres / miroir ; la douche = architecture ; bruitages trop forts.
- Fait : flèches ajoutées sur canapé (« pouf »), hotte, poutres du plafond cathédrale, douche à l'italienne
  (salle de bain ralentie 0,7×), salle de jeux (« bip »), escaliers vus de la mezzanine → une flèche toutes les
  3 à 5 s jusqu'à la fin. Bruitages baissés de moitié environ. Durée 63,8 s.

## v4 (22/11) — retours sur la v3

- Retours : 2 flèches sur les fenêtres du haut ; pas de flèche sur la table de la salle de jeux ; 2 flèches sur les
  escaliers vus de la mezzanine ; phrase belle-famille ; surtout : **visite progressive de A à Z** comme les exemples,
  pas de bande-annonce qui saute dehors/dedans ; appel à rester jusqu'à la fin pour la piscine.
- Puis l'utilisateur s'est ravisé : garder une **intro rapide des points forts** (comme les exemples), puis la visite
  dans l'ordre. Version finale v4 : façade (accroche + prix) → intro escalier / cave / piscine → allée « Reste bien
  jusqu'à la fin… » → « On commence par l'entrée » → visite dans l'ordre → piscine → question. Durée 64,1 s.
- Étape intermédiaire (non rendue) : bande-annonce supprimée ; ordre façade → allée (« reste jusqu'à la fin… la piscine ») → hall → cave →
  salon → cuisine → mezzanine → chambre → salle de bain → salle de jeux → piscine → façade (boucle).
  Inversions : cave avant le salon, mezzanine avant la chambre. Miroirs : cave, salon, cuisine côté hotte, salle de
  bain, salle de jeux, piscine. Appel à l'action vers 15–18 s sur un aperçu de la piscine (flèche + plouf), piscine reprise à la fin
  (miroir, plus lente). Durée 64,2 s.

- Dernière demande : « faire exactement comme les exemples », y compris le script : citer aussi la déco marquante
  (porte en arche, cheminée, lustres, miroir…), une phrase courte par pièce, fin « Alors, sois honnête : un… ou deux… ».
  Flèches sur tout ce qui est cité avec insistance (21 flèches), structure intro + visite dans l'ordre. **= v4 rendue.**

## v5 (22/11) — retours sur la v4

- Retours : pas de prix dès le début ; intro façon exemples = 3 plans dynamiques (piscine, double escalier, cheminée),
  puis « Voici ce que tu peux avoir pour seulement 7 millions d'euros » ; flèches pas trop rapides (sinon une seule
  flèche, une seule mention) ; flèches sur presque toutes les fenêtres de la cuisine (lumière naturelle).
- Fait : intro piscine → escalier vu d'en haut → cheminée, puis façade + prix ; lustre de la mezzanine et miroir
  retirés ; salle de bain = douche seulement ; 4 flèches sur les fenêtres de la cuisine. Durée 64,7 s.

## À faire / retours

- [ ] Validation du script par l'utilisateur
- [ ] Voix off ElevenLabs (Chloé) — **une seule prise, seulement après accord**
- [ ] Recaler coupes, cercles et flèches sur la vraie voix (transcription mot à mot), baisser la musique sous la voix

## Voix off (23/11)

- Abonnement ElevenLabs Starter (40 000 crédits). L'offre gratuite refusait les voix de bibliothèque via l'API.
- **Hook** généré : eleven_v4, Chloé, stabilité 0,30, ressemblance 0,75, style 0,5, speaker boost, vitesse 1,1,
  seed 4242, texte sans majuscules (énergie par la ponctuation). **73 crédits.** `assets/voix/hook.mp3`
  (+ alignement), pauses > 0,2 s raccourcies → `assets/voix/hook-edit.wav` (9,4 s).
- Intro recalée sur la voix (piscine 0–1,97 / escalier –3,97 / cheminée –6,37 / façade « Voici » –9,53),
  étiquette de prix sur « sept millions » (8,3 s). Extrait envoyé : `export/010-test-hook.mp4`.
- **Suite** générée (mêmes réglages, hook en previous_text) : 404 crédits, 60,8 s. Pauses > 0,2 s raccourcies,
  accélérée de 7 % (atempo, hauteur conservée), même niveau que le hook → `assets/voix/voix-complete.wav` (64,8 s),
  mots horodatés dans `assets/voix/voix-mots.json`. **Total voix : 477 crédits.**
- Montage recalé au mot près (durées imposées par plan, flèches à < 0,3 s de leur mot, pastilles 1/2 sur « un » et « deux »),
  musique baissée sous la voix (0,14).
- **Rendu final `export/010-v1.mp4`** : 64,98 s, 1080×1920, 30 i/s, H.264 CRF 14, AAC 320 kb/s, 159 Mo (GitHub via LFS),
  aucune image noire, aucun silence > 0,4 s.
