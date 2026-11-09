# Vidéo 020 — Remettez la bosse !

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 01.0
- **Plateforme :** TikTok (rétention / monétisation)
- **Composition Remotion :** `Video020` (`src/videos/020-remettre-la-bosse/`)
- **Hook utilisé :** n° 2 de `scripts/hooks-a-utiliser.md`

## Ma demande

> 6 vidéos à remonter complètement pour la rétention TikTok et la monétisation, minimum 1 minute, avec effets et
> graphiques motion comme la dernière fois. Choisir 6 des 10 hooks fournis, écrire l'histoire et faire la voix off
> avec Maxime, sans gâcher de crédits (réussir du premier coup), meilleure qualité possible.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mp4` (hors Git) | `rushes/original/` | Rush n° 5 du WeTransfer (`video5_arautopflege.mp4`) |
| `source.mp4` | `rushes/` | Copie compressée pour l'archive |

## Script (voix off Maxime, ElevenLabs multilingual v2, réglages dynamiques)

**[HOOK]**
Une femme m'a payé pour réparer la bosse sur la voiture de son mari, et le lendemain, elle m'a rappelé pour que je la remette, exactement pareille !

**[MISE EN PLACE]**
Elle arrive avec la voiture noire de son mari, une bosse bien marquée au milieu de la portière. Elle me dit qu'elle vient de reculer contre un poteau en sortant du parking, et qu'elle veut que tout soit réparé avant que son mari rentre de déplacement, le soir même. Je fais le travail, la portière est parfaite, et elle repart ravie, soulagée.

**[TENSION]**
Le lendemain, mon téléphone sonne, c'est elle. Elle me dit : « Il faut absolument que vous remettiez la bosse ! » Je lui demande pourquoi, et elle m'explique que son mari est rentré, qu'il a fait le tour de la voiture, et qu'il a dit : « Tiens, elle est où, la bosse que j'ai faite la semaine dernière ? » Elle croyait l'avoir faite en reculant, sauf que la bosse était déjà là depuis des jours.

**[RÉSOLUTION]**
Elle avait payé pour la bêtise de son mari, et lui l'avait cachée pendant toute une semaine, en espérant qu'elle ne la voie jamais. Évidemment, je n'ai pas remis la bosse, mais elle m'a demandé une deuxième facture, au nom de son mari cette fois, pour la poser bien en évidence sur la table du salon. Et vous, vous pensez qu'il a dormi sur le canapé ?

## Ce qui a été fait

- *2026-11-09* — v1 (`export/020-v1.mp4`, rendu `render:hq`) :
  - Voix off Maxime générée une seule fois, décalée de 1.6 s, sans aucune retouche ; prononciation vérifiée (Whisper).
  - Rush remonté (`rushes/segments.json`) : miroir gauche/droite à chaque coupe (~5,6 s) avec transitions, accélérés
    sur les passages répétitifs, fin au ralenti si besoin pour dépasser 1 minute ; aucun filtre sur l'image.
  - Graphiques calés au mot près, petits à gauche, 2–3 illustrations au centre, sondage final pour les commentaires.
  - Pas de sous-titres (à ajouter si besoin).

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
