# Vidéo 008 — Les 5 étapes pour tes premières handstand push-ups (On Air, Chambly)

- **Statut :** 🔍 Relecture (v1 rendue)
- **Format :** 9:16 (1080×1920), **59,94 i/s**
- **Durée finale :** 1 min 01,7 (60,3 s de vidéo + 1,4 s de récap)
- **Plateforme :** TikTok (plus d'1 minute)
- **Composition Remotion :** `Video008` (`src/videos/008-axe-jambes/`)

## Ma demande

Montage épuré mais cool, petits graphiques qui ne prennent pas trop de place, petits effets
sonores pas trop forts. Quand je dis qu'il faut remettre les jambes dans le bon axe pour pousser :
une ligne/courbe qui suit mes jambes et montre qu'elles reviennent dans l'axe. **Pas de sous-titres.**
« On Air Chambly 📍 » dans un petit coin, discret (au pire seulement les 5 premières secondes).

## Transcription (Whisper small, mots horodatés dans `transcription.json`)

> J'ai découvert un truc que personne ne m'a jamais dit. Il y a 5 trucs que tu dois apprendre si tu veux
> réussir tes premières handstand push-ups. Première chose […] maîtriser parfaitement le handstand […]
> pas juste se lancer et tenir une fois sur trois […] à tous les coups […]. Deuxième chose […] tenir dans
> cette position […] qu'avec vos épaules […] montée en force […]. Prochaine étape […] descendre […] tenir
> en bas […] l'équilibre en haut et en bas c'est pas la même chose […]. Dernière étape : remonter une fois
> en bas […] remettre les jambes dans le bon axe pour pouvoir pousser. À côté […] entraîner sa force :
> contre un mur, les talons qui glissent […] spammez un maximum de handstand push-ups […] commencez
> toujours votre séance par l'exercice le plus dur […] suivez les étapes de cette vidéo parce que…

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mov` | `rushes/original/` (hors Git) | Original WeTransfer, 172 Mo, H.264 1080×1920 à 59,94 i/s, 60,3 s |
| `source.mp4` | `rushes/` | Copie compressée pour l'archive |

## Ce qui a été fait

- 2026-11-12 — **v1** (`export/008-v1.mp4`, qualité max, 59,94 i/s) :
  - « 📍 ON AIR Chambly » en petite pastille en haut à gauche, **pendant les 5 premières secondes** ;
  - « 5 ÉTAPES · tes premières handstand push-ups » sur « 5 trucs… handstand push-ups » ;
  - petite carte « ÉTAPE n/5 » + titre, qui change à chaque étape (1 maîtriser le handstand, 2 tenir la
    position, 3 descendre et tenir en bas, 4 remonter d'en bas, 5 entraîner sa force) ;
  - étiquettes calées sur la voix : « 1 FOIS SUR 3 » → « À TOUS LES COUPS » (3 pastilles), « BASE
    OBLIGATOIRE », anneaux rouges sur les épaules (« qu'avec vos épaules »), « BONUS : MONTÉE EN FORCE »,
    « HAUT ≠ BAS », « CONTRE UN MUR · TALONS QUI GLISSENT », « UN MAXIMUM DE RÉPÉTITIONS »,
    « COMMENCE PAR L'EXO LE PLUS DUR » ;
  - **axe des jambes** (40,9 → 43,9 s) : suivi de pose MediaPipe (`src/videos/008-axe-jambes/pose.ts`),
    ligne hanche-genou-cheville qui suit les jambes, rouge avec l'angle (jusqu'à ~20°) « HORS DE L'AXE »,
    axe vertical en pointillés au-dessus des mains, puis blanche « ✓ DANS L'AXE » + « POUSSE » ;
  - fin : image figée 1,4 s avec la liste des 5 étapes (la vidéo passe au-delà d'une minute) ;
  - sons très discrets (whoosh, tick, ding, pop à 14–22 % du volume), voix d'origine.

## Export

- `export/008-v1.mp4` : 1 min 01,7, 1080×1920, 59,94 i/s, H.264 CRF 14, **155 Mo** — sur GitHub via Git LFS.
- `export/008-v1-hevc.mp4` : même vidéo en HEVC 2 passes, < 95 Mo (lien de secours).

## À faire / retours

- [ ] Retours sur la v1
