# Vidéo 012 — La maison à l'escalier de verre

- **Statut :** 🔍 Relecture (rendu final avec voix)
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 62,9 s
- **Composition Remotion :** `Video012` (`src/videos/012-maison-escalier-verre/`)

## Ma demande

Après des stats faibles sur 010 et 011 (≈ 600 vues, 3,6–4,9 s de visionnage moyen), mélanger une vidéo TikTok
(qui avait bien marché) avec une vidéo Pinterest pour n'en faire **qu'une maison**, le plus réaliste possible, bien
mélangé. Flèches, petits effets sonores, cercles comme d'habitude. Premier plan = celui de la vidéo TikTok.
Montage d'abord, pas de voix off.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `tiktok.mp4` (SaveTik…133) | `rushes/original/` (hors Git, 389 Mo) | 60,8 s, 2160×3840, 60 i/s : maison contemporaine au crépuscule, escalier de verre flottant, bar, salle à manger, cave vitrée, cuisine marbre, chambre, salle de bain marbre, mezzanine, cinéma, piscine de nuit |
| `tiktok-1080.mp4` | `rushes/original/` (hors Git) | Même vidéo ramenée en 1080p quasi sans perte (CRF 10, lanczos) pour le rendu |
| `pinterest.mp4` (pindown…203) | `rushes/original/` (hors Git, 19 Mo) | 101 s, 720×1280, 30 i/s : maison moderne en plein jour (chambres, balcon vue lac, piscine), pub à la fin (88,8 s+) écartée |
| `source-tiktok.mp4`, `source-pinterest.mp4` | `rushes/` | Copies d'archive compressées |

Note donnée à l'utilisateur : les images Pinterest ne sont pas libres de droits (Pinterest rassemble des photos d'autres
auteurs) ; sources gratuites conseillées : Pexels, Unsplash, Pixabay.

## Ce qui a été fait

- 2026-11-25 — Montage v1 sans voix : une seule maison (extérieur TikTok), 3 plans Pinterest + piscine de jour
  intégrés et étalonnés (luminosité, contraste, saturation, légère chaleur) ; accroche « Personne ne veut croire le prix
  de cette maison » + texte « Devine le prix 😳 » ; rafale escalier / cave / piscine de nuit ; visite dans l'ordre ;
  piscine « le jour… et la nuit » ; prix donné comme un avis (« SELON MOI 800 000 € ») ; 14 flèches suivies (OpenCV) ;
  nouvelle musique maison (`outils/musique.py`, 98 BPM).

- 2026-11-25 — Retours v1 : trop proche de la 011 (prix « selon moi », question « d'accord / n'importe quoi ») →
  garder le format des exemples mais : **pas de titre à l'écran** (l'utilisateur le met ; donner le titre au rendu final),
  **accroche plus grosse et plus rapide** (2 éléments max), **« Bienvenue à Marseille » + 450 000 €** dès le début
  (affirmation voulue par l'utilisateur, réserve exprimée sur le côté trompeur), appel à rester, visite directe,
  **appel « de quelle ville tu es » au milieu**, fin « tu signes tout de suite / c'est forcément une arnaque ».
- Montage v2 : intro escalier (vu d'en dessous, miroir) + piscine illuminée, façade + « PRIX 450 000 € », 13 flèches,
  fin en 2 plans. Script porté à ≈ 215 mots (ajouts courts) pour tenir 62 s sans blanc.

- 2026-11-25 — Voix : hook avec « tu vas pas t'en remettre » (81 crédits) + suite (435 crédits) + phrase
  « belle-famille qu'on invite » regénérée seule et réinsérée (22 crédits ; « invite » sonnait « enlite »).
  **Total voix 012 : 618 crédits** (dont 80 du 1er hook écarté).
- **Nouvelle méthode anti-mots écorchés** (`outils/voix.py`) : on ne coupe que du silence réel (énergie mesurée),
  avec 0,07 s de marge après chaque mot et 0,04 s avant le suivant ; blancs ramenés à 0,16 s.
- **Règle utilisateur : un élément cité ET fléché à chaque plan** (sinon le plan est ennuyeux) : canapé, tête de lit,
  baies vitrées, lit, écran ajoutés ; plan Pinterest (salon double hauteur) pour l'appel « de quelle ville tu es ».
- **« MARSEILLE » en motion design** (arrivée en écrasement + secousse + soulignement rouge + impact) sur le mot,
  puis étiquette « PRIX 450 000 € » + argent. Punch à chaque coupe pour le dynamisme.
- Calage au mot près (`outils/calage.py`) : coupes 0,08 s avant chaque phrase, flèches à 0,1 s de leur mot.

## À faire / retours

- [ ] Validation du montage et du script
- [ ] Voix (hook puis suite), recalage au mot près, rendu final
