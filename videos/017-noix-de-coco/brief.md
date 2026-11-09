# Vidéo 017 — La noix de coco à Lille

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 01.0
- **Plateforme :** TikTok (rétention / monétisation)
- **Composition Remotion :** `Video017` (`src/videos/017-noix-de-coco/`)
- **Hook utilisé :** n° 9 de `scripts/hooks-a-utiliser.md`

## Ma demande

> 6 vidéos à remonter complètement pour la rétention TikTok et la monétisation, minimum 1 minute, avec effets et
> graphiques motion comme la dernière fois. Choisir 6 des 10 hooks fournis, écrire l'histoire et faire la voix off
> avec Maxime, sans gâcher de crédits (réussir du premier coup), meilleure qualité possible.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mp4` (hors Git) | `rushes/original/` | Rush n° 2 du WeTransfer (`video2_arautopflege.mp4`) |
| `source.mp4` | `rushes/` | Copie compressée pour l'archive |

## Script (voix off Maxime, ElevenLabs multilingual v2, réglages dynamiques)

**[HOOK]**
Une bosse ronde, parfaite, en plein milieu du toit, et le client me jure que c'est une noix de coco tombée d'un palmier. Le problème, c'est qu'on habite à Lille !

**[MISE EN PLACE]**
Il arrive un lundi matin, très sûr de lui, avec sa voiture noire. Il me raconte qu'il s'est garé chez un voisin, que le voisin a un palmier dans son jardin, et qu'une noix de coco est tombée pile sur son toit, juste à côté de la barre. Je lui demande : « Un palmier, à Lille, en novembre ? » Et il me répond sans hésiter : « Oui, dans une serre chauffée. »

**[TENSION]**
Je commence la réparation, je pose mes tirettes, et là, je remarque un truc bizarre. Au fond de la bosse, il y a des petites traces orange, et exactement la même trace sur la barre de toit, juste à côté. Je lui montre du doigt, il devient tout rouge, il regarde autour de lui, et il me demande de ne surtout pas en parler à sa femme.

**[RÉSOLUTION]**
La vérité, c'est que le dimanche, il jouait au basket avec ses neveux, et le ballon est resté coincé dans la gouttière du garage. Alors il est monté sur le toit de la voiture pour l'attraper, avec ses quatre-vingt-dix kilos ! La noix de coco, c'était lui. Aujourd'hui, le toit est parfait, et sa femme croit toujours à l'histoire du palmier. Et vous, vous l'auriez crue ?

## Ce qui a été fait

- *2026-11-09* — v1 (`export/017-v1.mp4`, rendu `render:hq`) :
  - Voix off Maxime générée une seule fois, décalée de 0.8 s, sans aucune retouche ; prononciation vérifiée (Whisper).
  - Rush remonté (`rushes/segments.json`) : miroir gauche/droite à chaque coupe (~5,6 s) avec transitions, accélérés
    sur les passages répétitifs, fin au ralenti si besoin pour dépasser 1 minute ; aucun filtre sur l'image.
  - Graphiques calés au mot près, petits à gauche, 2–3 illustrations au centre, sondage final pour les commentaires.
  - Pas de sous-titres (à ajouter si besoin).

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
