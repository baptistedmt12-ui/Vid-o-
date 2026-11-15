# Vidéo 013 — Mix de deux Reels (nettoyage de jet + plans d'appoint)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 03 utile + plans inutiles jusqu'à 1 min 17 (à couper sur TikTok)
- **Plateforme :** TikTok (monétisation, rétention)
- **Montage :** `montage.py` (découpes sans perte puis un seul encodage) — pas de composition Remotion

## Ma demande

> Mixe ces deux vidéos pour que TikTok les voie comme du contenu original. La première est la principale ;
> la deuxième sert à ajouter des petits plans (ex. la marche sur le grand tapis bleu, vers le début, comme mon
> arrivée). Enlève les écritures. Montage simple pour la rétention : pas de graphiques, pas de sous-titres,
> effets miroir, plans inversés, ordre changé. Partie utile entre 1 min et 1 min 05, puis ajoute des plans
> inutiles jusqu'à ~1 min 15–1 min 20 (je les couperai sur TikTok).

## Fichiers reçus (liens Instagram, téléchargés en 1080p)

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mp4` (hors Git) | `rushes/original/` | Reel principal : nettoyage extérieur d'un jet en hangar (texte « $45M Private Jet » au début, panneau, carte, étiquette d'avertissement) |
| `broll.mp4` (hors Git) | `rushes/original/` | Reel d'appoint : salon d'aviation, tapis bleu, jets, intérieurs (texte « Buying my first private jet », Lunchables, panneaux) |
| `source.mp4` | `rushes/` | Copie compressée du Reel principal pour l'archive |

## Ce qui a été fait

- *2026-11-15* — v1 : 24 plans. Accroche sur le polissage de l'aile, arrivée sur le tapis bleu + jet + montée des
  escaliers (Reel 2), inspection, nettoyage, moteur, aile, polisseuse, dessous du fuselage, 3 plans d'intérieur
  du Reel 2 intercalés, fin sur le polissage. Miroir sur 11 plans. Aucun texte incrusté dans la partie utile.
  62,9 s utiles, puis rivière/forêt, chambre d'hôtel, vue du hublot jusqu'à 76,7 s. Son muet.
  Découpes sans perte (x264 qp 0) puis un seul encodage CRF 12 (135 Mo, Git LFS). Fluidité vérifiée.

## À faire / retours

- [ ] Retours sur la v1
