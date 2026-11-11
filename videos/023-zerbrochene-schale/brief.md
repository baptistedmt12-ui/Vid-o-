# Vidéo 023 — Die zerbrochene Schale (le bol qu'on m'a payé pour détruire)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 04,5
- **Plateforme :** TikTok (compte allemand, rétention / monétisation)
- **Composition Remotion :** `Video023` (`src/videos/023-zerbrochene-schale/`)
- **Voix off :** Andrew (`en-US-AndrewMultilingualNeural`, edge-tts), en allemand
- **Titre (à l'écran) :** « Warum zerstöre ich diese / perfekte Schale? 😳🪵 » (« Pourquoi je détruis ce bol parfait ? »)

## Ma demande

> Lot de 13 liens (10 Instagram + 3 TikTok) : même travail que la 022 avec toutes les règles et les nouvelles
> rectifications (titre en pyramide, sous-titres bleu clair, son d'origine en fond, aucun ralenti/accéléré…),
> scripts très variés, hooks qui stoppent le scroll. Ne faire d'abord **que la première** et l'envoyer ; go pour
> les autres ensuite.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `reel.mkv` (hors Git) | `rushes/original/` | Reel Instagram `DfAPLrZDVPc` (1080×1920 VP9 60 i/s, 92 s) récupéré avec yt-dlp |
| `source.mp4` | `rushes/` | Copie compressée pour l'archive |

Ce qu'on voit : bac de bois sous les feuilles, hachette, scie, plane sur le banc d'âne, creusage au couteau croche
jusqu'à percer le fond → l'objet final est un **cadre ovale** (bol percé).

## Script (allemand) — `script-de.txt`

**[HOOK]** Ein Vater hat mich bezahlt, damit ich eine Holzschale kaputt mache. Er wollte, dass ich mitten durch den Boden schneide. Ich frage, warum. Und seine Antwort hat mich nicht mehr losgelassen.

**[AUFBAU]** Seine Tochter ist neun. Seit der Chemo hat sie keine Haare mehr, und seit Monaten schaut sie in keinen Spiegel mehr. Zu Hause hat sie alle Spiegel mit Handtüchern zugehängt. Er will einen Holzrahmen für einen kleinen Spiegel, und er sagt: „Er soll aussehen wie eine Schale, die kaputtgegangen ist.“

**[SPANNUNG]** Ich hole das Holz aus meiner Kiste und schnitze die Schale ganz normal, rund und glatt. Dann setze ich das Messer in der Mitte an. Eine gute Schale absichtlich zu zerstören, das war das Schwerste, was ich je gemacht habe. Und ich frage mich, ob sie das überhaupt verstehen wird.

**[AUFLÖSUNG]** Der Vater setzt den Spiegel ein und schreibt hinten drauf: „Auch kaputt bleibt sie wunderschön.“ Drei Tage später schickt er mir ein Video. Seine Tochter schaut lange in den Spiegel, und dann lacht sie. Zum ersten Mal seit Monaten. Was hättet ihr auf die Rückseite geschrieben?

### Traduction française

Un père m'a payé pour que je casse un bol en bois. Il voulait que je coupe en plein milieu du fond. Je lui demande
pourquoi. Et sa réponse ne m'a plus quitté. — Sa fille a neuf ans. Depuis la chimio, elle n'a plus de cheveux, et
depuis des mois elle ne se regarde plus dans aucun miroir. À la maison, elle a couvert tous les miroirs avec des
serviettes. Il veut un cadre en bois pour un petit miroir, et il me dit : « Il doit ressembler à un bol qui s'est
cassé. » — Je prends le bois dans mon bac et je sculpte le bol tout à fait normalement, rond et lisse. Puis je pose
le couteau au milieu. Détruire exprès un bon bol, c'est la chose la plus dure que j'aie jamais faite. Et je me
demande si elle va seulement comprendre. — Le père installe le miroir et écrit au dos : « Même cassée, elle reste
magnifique. » Trois jours plus tard, il m'envoie une vidéo. Sa fille regarde longtemps dans le miroir, et puis elle
rit. Pour la première fois depuis des mois. Qu'est-ce que vous auriez écrit au dos ?

## Ce qui a été fait

- *2026-11-11* — v1 (`export/023-v1.mp4`, rendu `render:hq`, volume normalisé -14 LUFS) :
  - Voix Andrew générée d'un bloc (63,2 s), blanc de tête retiré, rien d'autre retouché ; Whisper medium : texte
    retrouvé, aucun blanc au milieu d'une phrase.
  - Remontage à vitesse 1 (`rushes/segments.json`, `scripts/remodel_seg.py` plan par plan, moins de mémoire) :
    ouverture sur le couteau qui perce le fond (le hook), bac sur « aus meiner Kiste », scie / hachette / plane /
    couteau croche selon l'histoire, avant (bloc brut) / après (cadre fini) à la fin. Miroir à chaque coupe (~5,6 s).
  - Titre en pyramide pendant toute la vidéo, étiquettes sous le titre, 2 illustrations au centre (miroir couvert
    d'une serviette, dos du cadre avec le mot du père), appel aux commentaires à la fin.
  - Sous-titres allemands, mot en cours en bleu clair. Son d'origine à 0,11 (0,05 sur la scie et le bac).

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
