# Vidéo 007 — Peut-être rien, mais peut-être pas (client inquiet après le crash en Floride)

- **Statut :** 🔍 Relecture
- **Format :** 9:16 (1080×1920), 30 i/s
- **Durée :** 1 min 08
- **Plateforme :** TikTok (repost amélioré, niche nettoyage de jet privé, monétisation)
- **Composition Remotion :** `Video007`

## Ma demande

> Pour chaque vidéo, j'aimerais que tu me fasses un montage dynamique où tu peux inclure des graphiques Motion
> en fonction de ce que je dis, grâce à la voix off ; un effet miroir environ toutes les 7-10 secondes (inverser
> la vidéo, pas la retourner). Pas de sous-titres. Attention aux filigranes TikTok. Graphiques pas trop gros, sauf
> moments importants (ex. message d'un client : en gros mais rapide). Un petit appel à l'action vers 40 s.
> Style épuré un peu luxe, simple mais efficace. Bruitages sur les incrustations et sur les prix. Pas de musique.
> Décaler le miroir s'il y a une plaque ou des écritures.

## Fichiers reçus

| Fichier | Dossier | Description |
|---------|---------|-------------|
| `original.mov` (126 Mo, hors Git) | `rushes/original/` | Rush reçu par WeTransfer (H.264 1080×1920, 30 i/s, montage + voix off) |
| `source.mp4` | `rushes/` | Copie compressée pour l'archive |
| `transcription.json` | `.` | Transcription Whisper (medium) au mot près |

Fichiers de travail (hors Git) :
```
ffmpeg -i rushes/original/original.mov -vf fps=30 -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p -an rushes/original/travail.mp4
ffmpeg -i rushes/original/original.mov -vn -ac 2 -ar 48000 -c:a pcm_s16le rushes/original/voix.wav
```

## Ce qui a été fait

- *2026-11-07* — v1 : habillage « luxe épuré » partagé (`src/videos/_shared/luxe.tsx` : verre fumé, filet doré,
  Playfair Display + Inter), graphiques calés sur la voix (crash, appel mardi, fiche avion, enregistrement pilote,
  départ jeudi, message client en grand, check-list, trace noire sur le chiffon, échange final), sondage
  « Tu ferais monter ta famille dedans ? » en fin. Miroir sur 7,3–13,8 / 20,2–25,3 / 33,9–42,1 / 48,6–57,5 /
  60,9–66,3 s (plans CIRRUS et SR22 laissés à l'endroit). CTA partage à 38 s. Bruitages légers, pas de musique.

## À faire / retours

- *2026-11-07* — v2 : retour « image plus sombre, effet vintage » → suppression du vignettage, du dégradé sombre, de l'étalonnage et du zoom lent permanent ; rendu depuis l'original, images PNG sans perte.
- [ ] Retours sur la v2
