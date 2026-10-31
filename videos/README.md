# 📁 Dossier des vidéos

C'est **ici** que vivent toutes tes vidéos. Une vidéo = un dossier.

```
videos/
├── _modele/            ← modèle copié pour chaque nouvelle vidéo
├── 001-nom-de-la-video/
│   ├── brief.md        ← ce que tu veux + ce que Claude a fait
│   ├── rushes/         ← tes fichiers bruts (vidéos, audios)
│   └── assets/         ← images, logos, musiques
└── 002-.../
```

## Comment ça marche

1. Tu ouvres une discussion avec Claude sur ce dépôt.
2. Tu envoies ta vidéo (ou tes fichiers) et tu dis ce que tu veux.
3. Claude :
   - crée le dossier `videos/NNN-nom/` à partir de `_modele/` ;
   - range tes fichiers dans `rushes/` et `assets/` ;
   - remplit `brief.md` avec ta demande ;
   - fait le montage dans Remotion en suivant la DA de `SUIVI.md` ;
   - met à jour le tableau de suivi dans `SUIVI.md`.

## Limite de taille

GitHub refuse les fichiers de plus de **100 Mo**. Pour les gros rushes,
envoie une version compressée ou un lien (Drive, WeTransfer…).
