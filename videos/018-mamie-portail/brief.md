# Vidéo 018 — Le portail de la voisine

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 01.0
- **Plateforme :** TikTok (rétention / monétisation)
- **Composition Remotion :** `Video018` (`src/videos/018-mamie-portail/`)
- **Hook utilisé :** n° 10 de `scripts/hooks-a-utiliser.md`

## Ma demande

> 6 vidéos à remonter complètement pour la rétention TikTok et la monétisation, minimum 1 minute, avec effets et
> graphiques motion comme la dernière fois. Choisir 6 des 10 hooks fournis, écrire l'histoire et faire la voix off
> avec Maxime, sans gâcher de crédits (réussir du premier coup), meilleure qualité possible.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mp4` (hors Git) | `rushes/original/` | Rush n° 3 du WeTransfer (`video3_arautopflege.mp4`) |
| `source.mp4` | `rushes/` | Copie compressée pour l'archive |

## Script (voix off Maxime, ElevenLabs multilingual v2, réglages dynamiques)

**[HOOK]**
Une mamie de soixante-dix-neuf ans m'a supplié de réparer sa voiture avant que sa voisine rentre de vacances, parce que la bosse, c'est le portail de la voisine qui l'a faite, et c'était pas un accident !

**[MISE EN PLACE]**
Elle arrive avec une voiture noire, une belle bosse sur l'aile arrière, juste au-dessus de la roue. Elle me raconte que le jour du départ en vacances, sa voisine a fermé son portail électrique d'un coup sur sa voiture, garée à peine devant chez elle, et qu'elle est partie sans rien dire, avec un petit sourire.

**[TENSION]**
Pendant que je travaille, elle me raconte quinze ans de guerre de voisinage, les roses coupées, le chat qui creuse dans les plantations, la haie trop haute. Elle me dit qu'elle veut pas porter plainte, elle veut juste que la voisine revienne et ne trouve rien du tout, comme si rien ne s'était passé. Et là, elle ouvre son sac, et elle sort la télécommande du portail de la voisine !

**[RÉSOLUTION]**
La voisine lui avait laissé ses clés pour arroser les plantes pendant les vacances. Pendant que je finissais l'aile, la mamie m'a demandé, très sérieusement, si je savais programmer un portail pour qu'il s'ouvre tout seul, toutes les nuits, à trois heures du matin. J'ai dit non. Elle m'a répondu qu'elle allait trouver quelqu'un d'autre. Et vous, vous auriez fait quoi à sa place ?

## Ce qui a été fait

- *2026-11-09* — v1 (`export/018-v1.mp4`, rendu `render:hq`) :
  - Voix off Maxime générée une seule fois, décalée de 0.8 s, sans aucune retouche ; prononciation vérifiée (Whisper).
  - Rush remonté (`rushes/segments.json`) : miroir gauche/droite à chaque coupe (~5,6 s) avec transitions, accélérés
    sur les passages répétitifs, fin au ralenti si besoin pour dépasser 1 minute ; aucun filtre sur l'image.
  - Graphiques calés au mot près, petits à gauche, 2–3 illustrations au centre, sondage final pour les commentaires.
  - Pas de sous-titres (à ajouter si besoin).

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
