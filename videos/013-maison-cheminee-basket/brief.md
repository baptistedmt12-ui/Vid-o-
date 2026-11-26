# Vidéo 013 — La maison à la cheminée et au terrain de basket

- **Statut :** 🔍 Relecture (montage v1 sans voix, script à valider)
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** ≈ 64,6 s (estimée, à recaler sur la voix)
- **Composition Remotion :** `Video013` (`src/videos/013-maison-cheminee-basket/`)

## Ma demande

Nouvelle vidéo : 3 sources à mélanger en **une seule maison**, de façon indétectable (vidéo principale ≈ 1 min,
une 2e vidéo et une 3e petite vidéo). Même format que la 012 (Marseille, « superbe ») : points forts au début
(cheminée dehors avec flammes, terrain de basket, cascade), ville + petit prix qui fait parler, flèches, sons.
Prendre des intérieurs de la 2e vidéo (salle de bain…). Montage + script, sans voix.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `principale.mp4` (SaveTik…117) | `rushes/original/` (hors Git, 88 Mo) | 60,5 s, 1080×1920, 60 i/s : maison en pierre (Texas), vue aérienne, façade, cascade, cheminée extérieure, billard, basket intérieur, salon à poutres, cuisine, baies vitrées, lounge, bar, chambre, salle de bain, dressing |
| `moderne.mp4` (pindown…180) | `rushes/` (2,5 Mo) | 15 s, 576×1024 : maison moderne (Floride) ; retenus : cave à vin, bureau, salle de bain |
| `cathedrale.mp4` (pindown…884, envoyé dans la discussion) | `rushes/` (2,8 Mo) | 7,6 s, 720×1280 : salon sous charpente cathédrale |
| `source-*.mp4` | `rushes/` | Copies d'archive |

## Ce qui a été fait

- 2026-11-26 — Montage v1 sans voix : intro cheminée / basket / cascade, « 📍NICE » + « PRIX 390 000 € »,
  visite dans l'ordre, un élément fléché par plan (17 flèches suivies OpenCV), plans des vidéos 2 et 3 étalonnés
  (réchauffés) pour se fondre dans la principale, pas de palmiers ni de façade moderne (trahiraient le mélange),
  musique maison (`outils/musique.py`, 102 BPM). Durées estimées : à recaler au mot près sur la voix.

## À faire / retours

- [ ] Validation du montage et du script
- [ ] Voix (utilisateur ou Chloé), recalage au mot près, rendu final
