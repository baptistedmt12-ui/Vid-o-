# Vidéo 019 — Le mec dans le coffre

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 04.6
- **Plateforme :** TikTok (rétention / monétisation)
- **Composition Remotion :** `Video019` (`src/videos/019-mec-dans-le-coffre/`)
- **Hook utilisé :** n° 7 de `scripts/hooks-a-utiliser.md`

## Ma demande

> 6 vidéos à remonter complètement pour la rétention TikTok et la monétisation, minimum 1 minute, avec effets et
> graphiques motion comme la dernière fois. Choisir 6 des 10 hooks fournis, écrire l'histoire et faire la voix off
> avec Maxime, sans gâcher de crédits (réussir du premier coup), meilleure qualité possible.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mp4` (hors Git) | `rushes/original/` | Rush n° 4 du WeTransfer (`video4_arautopflege.mp4`) |
| `source.mp4` | `rushes/` | Copie compressée pour l'archive |

## Script (voix off Maxime, ElevenLabs multilingual v2, réglages dynamiques)

**[HOOK]**
J'ai travaillé sur une voiture pendant une heure entière avant de remarquer qu'un mec dormait dans le coffre !

**[MISE EN PLACE]**
Un client me dépose sa voiture grise le matin, avec une bosse sur la portière, juste sous la vitre. Il a l'air pressé, un peu stressé, il regarde sans arrêt son téléphone. Il me donne les clés, il me dit qu'il revient à midi, et il repart à pied. Je m'installe, je passe mes outils par la fenêtre, et je commence à travailler la tôle tranquillement.

**[TENSION]**
Au bout d'une heure, j'entends un bruit sourd. Je m'arrête, je regarde autour de moi, et rien. Je me dis que c'est le compresseur du garage d'à côté. Je reprends, et là, j'entends très clairement quelqu'un qui ronfle ! Je fais le tour de la voiture, j'ouvre le coffre, et il y a un grand gaillard en costume, roulé en boule, avec une cravate nouée autour de la tête.

**[RÉSOLUTION]**
Il ouvre un œil, il me regarde, et il me demande : « On est arrivés à la mairie ? » C'était le témoin du client, qui avait trop fêté l'enterrement de vie de garçon la veille, et qui s'était caché dans le coffre pour échapper à ses potes. Le mariage était à quatorze heures, et le client l'avait cherché toute la nuit. Quand il est revenu à midi, il l'a serré dans ses bras comme s'il rentrait de la guerre. Et vous, vous l'auriez réveillé ?

## Ce qui a été fait

- *2026-11-09* — v1 (`export/019-v1.mp4`, rendu `render:hq`) :
  - Voix off Maxime générée une seule fois, décalée de 0.3 s, sans aucune retouche ; prononciation vérifiée (Whisper).
  - Rush remonté (`rushes/segments.json`) : miroir gauche/droite à chaque coupe (~5,6 s) avec transitions, accélérés
    sur les passages répétitifs, fin au ralenti si besoin pour dépasser 1 minute ; aucun filtre sur l'image.
  - Graphiques calés au mot près, petits à gauche, 2–3 illustrations au centre, sondage final pour les commentaires.
  - Pas de sous-titres (à ajouter si besoin).

## À faire / retours

- [ ] Retours de l'utilisateur sur la v1
