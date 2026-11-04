# Vidéo 006 — On Air Chambly (banane dans la voiture)

- **Statut :** 🔍 Relecture (v2 rendue)
- **Format :** 9:16 (1080×1920), **60 i/s** (HEVC), rush de 9 s
- **Plateforme :** TikTok
- **Composition Remotion :** `Video006` (`src/videos/006-on-air-chambly/`)
- **Durée finale :** 9,7 s (9,1 s de vidéo + 0,6 s d'image figée)

## Ma demande

Petit montage simple calé sur ce que je dis. Inclure le nom de la salle de sport **On Air**
et la ville **Chambly**. Petits motion graphics, petits effets sonores (par exemple à la fin
quand je croque dans la banane).

## Transcription (Whisper small, mots horodatés dans `transcription.json`)

> « Ok les gars, direction le On Air de Chambly, on va tester le set le plus dur du Street Workout,
> le 15, 15, 15. En gros c'est quoi ? 15 muscle-ups, 15 dips, 15 tractions sans lâcher la barre. »

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mov` | `rushes/` | Original reçu en pièce jointe, 20 Mo, HEVC 1080×1920 à 60 i/s, 9,1 s |

## Contenu du rush (repérage)

- En voiture, parle face caméra avec un micro-cravate à la main en épluchant une banane.
- Parole continue de 0 à ~8,5 s, croque dans la banane vers 8,5 s.

## Ce qui a été fait

- 2026-11-04 — Rush rangé. Transcription automatique impossible (Hugging Face bloqué par le réseau) :
  texte demandé à l'utilisateur. L'utilisateur préfère un montage sans transcription.
- 2026-11-04 — **v1** (`export/006-v1.mp4`, 1080×1920 à **60 i/s**, qualité max, 23,5 Mo) :
  - badge « ● ON AIR » (voyant rouge qui clignote, clin d'œil au micro) + « 📍 Chambly », en haut à gauche sous la barre TikTok ;
  - léger zoom d'ouverture ;
  - à la bouchée (8,75 s) : zoom « punch », secousse, flash, sticker « CROC ! » et bruit de croquage ;
  - 1 s d'image figée à la fin sur la réaction ;
  - son d'origine conservé, sons : whoosh + pop à l'apparition du badge, crunch à la bouchée.

- 2026-11-04 — **v2** (`export/006-v2.mp4`, 60 i/s, qualité max, 23 Mo), calée au mot près sur la voix :
  - « direction le On Air de Chambly » : trajet en pointillés qui se dessine, épingle qui tombe, « ON AIR » + « CHAMBLY » ;
    puis pastille « ● ON AIR · Chambly » rangée en haut à gauche ;
  - « le set le plus dur du Street Workout » : titre + jauge de difficulté qui monte jusqu'à « MAX » sur « dur » ;
  - « le 15, 15, 15 » : trois « 15 » qui tombent un par un ; puis « MUSCLE-UPS », « DIPS », « TRACTIONS » sous chaque 15 au moment où ils sont dits ;
  - « sans lâcher la barre » : bandeau avec une barre stylisée ;
  - bouchée : petit zoom + bruit de croquage, **sans texte** ;
  - tout dans la zone du plafond de la voiture, au-dessus de la tête, hors zones TikTok.

## À faire / retours

- [x] Montage v1 — **refusé** : trop pauvre (juste le nom de la salle) et texte « CROC ! » non voulu.
  Retours : faire un vrai montage calé sur la voix comme d'habitude ; le nom de la ville et de la salle
  n'étaient donnés que pour l'orthographe ; à la bouchée, juste un son, pas de texte.
- [x] Montage v2
- [ ] Retours sur la v2
