# Vidéo 022 — Omas Löffel (la cuillère de mamie)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 03
- **Plateforme :** TikTok (compte allemand, rétention / monétisation)
- **Composition Remotion :** `Video022` (`src/videos/022-omas-loeffel/`)
- **Voix off :** Andrew (`en-US-AndrewMultilingualNeural`, edge-tts, gratuite), en allemand

## Ma demande

> Avec le premier lien (Reel Instagram de fabrication d'une cuillère), faire un montage retravaillé exprès pour la
> monétisation TikTok et la rétention : effets miroir, graphiques motion calés sur la voix off et le texte, histoire
> adaptée en allemand (pas mot à mot, propre à l'oral), sous-titres, attention aux zones TikTok, son d'origine
> audible mais pas gênant, version finale entre 1 min et 1 min 05. Montage épuré, peu d'effets sonores, pas « too much ».

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `reel.mkv` (hors Git) | `rushes/original/` | Reel Instagram `DfPsAIAgSV_` récupéré avec yt-dlp (1080×1920 VP9, 87,8 s) |
| `source.mp4` | `rushes/` | Copie compressée pour l'archive |

## Script (allemand, voix Andrew) — `script-de.txt`

**[HOOK]** Eine Frau ruft mich an und bestellt einen großen Holzlöffel. Ich frage, ob sie damit kochen will. Sie sagt nein. Und was sie mir dann erzählt hat, vergesse ich nie.

**[AUFBAU]** Ihre Oma hat jeden Sommer Marmelade gekocht, mit einem Holzlöffel, und als kleines Mädchen hat sie ihn am Ende immer abgeleckt. Im Frühling ist die Oma gestorben, und beim Ausräumen hat jemand den Löffel weggeworfen. Seitdem fragt ihre Tochter jeden Tag, wann sie wieder Omas Marmelade machen.

**[SPANNUNG]** Ich hole ein Stück Holz aus meiner Kiste und denke an meine eigene Oma. Ich schnitze den Griff so glatt, dass eine kleine Hand ihn halten kann. Er soll lange halten. So lange, dass die Kleine ihn eines Tages ihrer eigenen Tochter schenkt.

**[AUFLÖSUNG]** Als sie ihn abholt, drückt sie ihn an sich, ohne ein Wort. Zwei Wochen später schickt sie mir ein Foto. Ihre Tochter steht auf einem Stuhl und rührt die Marmelade, das ganze Gesicht verschmiert. Darunter steht: „Sie nennt ihn Omas Löffel.“ Habt ihr auch etwas von euren Großeltern, das ihr nie hergeben würdet?

### Traduction française

Une femme m'appelle et me commande une grande cuillère en bois. Je lui demande si c'est pour cuisiner. Elle me dit
non. Et ce qu'elle m'a raconté ensuite, je ne l'oublierai jamais. — Sa grand-mère faisait de la confiture chaque été
avec une cuillère en bois, et petite, elle la léchait toujours à la fin. Au printemps, la grand-mère est morte, et en
vidant la maison, quelqu'un a jeté la cuillère. Depuis, sa fille demande tous les jours quand on refait la confiture
de mamie. — Je prends un morceau de bois dans mon bac et je pense à ma propre grand-mère. Je sculpte le manche si
lisse qu'une petite main peut le tenir. Elle doit durer longtemps. Assez longtemps pour que la petite l'offre un jour
à sa propre fille. — Quand elle vient la chercher, elle la serre contre elle, sans un mot. Deux semaines plus tard,
elle m'envoie une photo. Sa fille, debout sur une chaise, qui tourne la confiture, le visage tout barbouillé. En
dessous : « Elle l'appelle la cuillère de mamie. » Et vous, vous avez un objet de vos grands-parents que vous ne
donneriez jamais ?

## Ce qui a été fait

- *2026-11-10* — v1 (`export/022-v1.mp4`, rendu `render:hq`) :
  - Voix Andrew générée d'un bloc (intonation continue), blanc de tête retiré, rien d'autre retouché (62,0 s) ;
    vérifiée avec Whisper medium (texte retrouvé mot pour mot, aucun blanc au milieu d'une phrase). « durfte »
    remplacé par « hat … immer abgeleckt » (risque d'être entendu « dürfte »).
  - Remontage (`rushes/segments.json`) : ouverture sur la hachette qui fend le bois, bac de bois rouge placé sur
    « aus meiner Kiste », dessin et dégrossissage accélérés (×1,25), copeaux du manche au ralenti (×0,6), creusage au
    couteau croche, avant/après final (bois rouge trempé → cuillère finie) pile sur « Omas Löffel ».
    Miroir gauche/droite à chaque coupe (~5,6 s) avec whip / zoom / flash ; aucun filtre sur l'image.
  - Graphiques épurés en allemand, petits à gauche (appel, « Zum Kochen? / Nein. », décès, cuillère jetée, phrase de la
    fille, message photo, Vorher/Nachher), 3 illustrations au centre (Oma et sa confiture, « Für Generationen »,
    la petite sur sa chaise), sondage final en allemand.
  - Sous-titres allemands mot à mot (zone sûre TikTok). Son d'origine (ASMR des outils) gardé à 0,28 sous la voix,
    whoosh très discrets, 4 « pop » seulement.

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
