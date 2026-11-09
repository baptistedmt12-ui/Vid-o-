# Vidéo 021 — Les gamins qui poussent la voiture

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 01.4
- **Plateforme :** TikTok (rétention / monétisation)
- **Composition Remotion :** `Video021` (`src/videos/021-gamin-pousse/`)
- **Hook utilisé :** n° 5 de `scripts/hooks-a-utiliser.md`

## Ma demande

> 6 vidéos à remonter complètement pour la rétention TikTok et la monétisation, minimum 1 minute, avec effets et
> graphiques motion comme la dernière fois. Choisir 6 des 10 hooks fournis, écrire l'histoire et faire la voix off
> avec Maxime, sans gâcher de crédits (réussir du premier coup), meilleure qualité possible.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mp4` (hors Git) | `rushes/original/` | Rush n° 6 du WeTransfer (`video6_arautopflege.mp4`) |
| `source.mp4` | `rushes/` | Copie compressée pour l'archive |

## Script (voix off Maxime, ElevenLabs multilingual v2, réglages dynamiques)

**[HOOK]**
Un gamin de dix ans m'a ramené la voiture de son père en la poussant, avec trois de ses potes, sur trois cents mètres !

**[MISE EN PLACE]**
Un mercredi après-midi, je vois arriver une voiture grise qui avance toute seule, très lentement, au milieu de la rue, et derrière, quatre gamins tout rouges qui poussent de toutes leurs forces. Le plus petit s'avance, il me tend sa tirelire, et il me dit : « Monsieur, il faut réparer la bosse avant que mon papa rentre du travail ! »

**[TENSION]**
Je regarde l'aile arrière, il y a une belle bosse juste au-dessus de la roue. Il m'explique qu'ils jouaient au foot dans la cour, que le ballon a tapé la voiture, et qu'il a desserré le frein à main pour la pousser jusqu'à chez moi. Je lui demande s'il sait que c'est dangereux, il baisse la tête et il me dit oui, tout doucement. Son père rentre dans deux heures, alors je me mets au travail tout de suite.

**[RÉSOLUTION]**
J'ai réparé la bosse, et j'ai ramené la voiture moi-même, avec les quatre gamins qui couraient derrière. Dans la tirelire, il y avait douze euros et un ticket de manège, et je la lui ai rendue. Le soir, le père m'a appelé, son fils lui avait tout avoué, et il voulait payer. Je lui ai dit de garder l'argent pour un nouveau ballon. Et vous, à dix ans, vous auriez osé ?

## Ce qui a été fait

- *2026-11-09* — v1 (`export/021-v1.mp4`, rendu `render:hq`) :
  - Voix off Maxime générée une seule fois, décalée de 0.6 s, sans aucune retouche ; prononciation vérifiée (Whisper).
  - Rush remonté (`rushes/segments.json`) : miroir gauche/droite à chaque coupe (~5,6 s) avec transitions, accélérés
    sur les passages répétitifs, fin au ralenti si besoin pour dépasser 1 minute ; aucun filtre sur l'image.
  - Graphiques calés au mot près, petits à gauche, 2–3 illustrations au centre, sondage final pour les commentaires.
  - Pas de sous-titres (à ajouter si besoin).

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
