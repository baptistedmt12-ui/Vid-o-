# Suivi des vidéos — Vid-o-

Ce fichier regroupe trois choses :
1. **Le suivi** : où en est chaque vidéo.
2. **La méthode** : les étapes pour produire une vidéo.
3. **La DA** : les règles visuelles et le ton à respecter.

---

## 1. Suivi des vidéos

**Statuts :** 💡 Idée · ✍️ Script · 🎨 Assets · 🎬 Montage · 🔍 Relecture · ✅ Publiée

| # | Titre | Statut | Format | Durée | Composition Remotion | Date prévue | Publiée le | Lien | Notes |
|---|-------|--------|--------|-------|----------------------|-------------|------------|------|-------|
| 000 | Exemple — Bienvenue sur Vid-o- | 🎬 Montage | 16:9 (1920×1080) | 5 s | `HelloWorld` | — | — | — | Vidéo de test |
| 011 | | 💡 Idée | | | | | | | |

*Vidéos 001 à 010 livrées puis supprimées du dépôt le 08/11/2026 (l'utilisateur a tout téléchargé). Prochaine vidéo : 011.*

### Banque d'idées

- [ ] Idée 1 :
- [ ] Idée 2 :
- [ ] Idée 3 :

---

## 2. Méthode

### Étape 1 — Idée
- [ ] Sujet en une phrase : *« Cette vidéo montre/explique… »*
- [ ] Public visé
- [ ] Plateforme et format (YouTube 16:9, Shorts/TikTok/Reels 9:16, Instagram 1:1)
- [ ] Ajouter la ligne dans le tableau de suivi

### Étape 2 — Script
- [ ] **Accroche** (0–3 s) : ce qui retient l'attention tout de suite
- [ ] **Contenu** : 3 points clés maximum
- [ ] **Fin / appel à l'action** : abonnement, lien, question…
- [ ] Découper le script en scènes, avec une durée pour chaque scène

### Étape 3 — Assets
- [ ] Textes définitifs
- [ ] Images / icônes / logos (dans `public/`)
- [ ] Musique et effets sonores (vérifier les droits)
- [ ] Voix off, si besoin

### Étape 4 — Montage dans Remotion
- [ ] Créer la composition dans `src/` et la déclarer dans `src/Root.tsx`
- [ ] Une scène = un composant, enchaînés avec `<Sequence>`
- [ ] Appliquer la DA (couleurs, polices, animations ci-dessous)
- [ ] Prévisualiser avec `npm run dev`

### Étape 5 — Relecture
- [ ] Orthographe des textes à l'écran
- [ ] Rythme : pas de temps mort, textes lisibles assez longtemps
- [ ] Son : volume équilibré, pas de coupure
- [ ] Rendu sur mobile (textes assez gros ?)

### Étape 6 — Rendu et publication
- [ ] `npx remotion render <Composition> out/<nom>.mp4`
- [ ] Miniature
- [ ] Titre, description, hashtags
- [ ] Publier, puis mettre à jour le tableau de suivi (date + lien)

---

## 3. Direction artistique (DA)

### Identité
- **Ton :** *(ex. : dynamique, pédagogique, humoristique, premium…)*
- **Mots-clés de l'univers :** *(3 à 5 mots)*
- **Références / inspirations :** *(chaînes, vidéos, comptes)*

### Couleurs

| Rôle | Couleur | Utilisation |
|------|---------|-------------|
| Fond principal | `#0B0B0D` | Arrière-plan des scènes |
| Texte principal | `#FFFFFF` | Titres et textes |
| Couleur d'accent | `#E10600` (rouge) | Mots importants, badges, soulignements |
| Couleur secondaire | blanc 28 % | Éléments inactifs (échelle de niveaux) |

### Typographie

| Usage | Police | Graisse | Taille (1080p) |
|-------|--------|---------|----------------|
| Titres | Anton | Regular | 105–240 px |
| Badges / petits textes | Inter | ExtraBold (800) | 40–50 px |
| Texte courant / sous-titrage | | Regular | 40–48 px |

### Animations et rythme
- **Entrée des textes :** fondu + léger zoom (`spring`, damping 200) — comme dans `HelloWorld`
- **Transitions entre scènes :** flash blanc, zoom avec flou, whip (glissement rapide) + son whoosh
- **Durée minimale d'un texte à l'écran :** ~1,5 s
- **Rythme :** un changement visuel toutes les 2–4 s

### Son
- **Style de musique :**
- **Effets sonores :** whoosh sur les transitions, impact sur les titres, pop sur les mots
- **Voix off :** oui / non

### Éléments récurrents
- **Logo / signature :** *(position et taille)*
- **Intro :** *(durée, contenu)*
- **Outro :** *(durée, contenu, appel à l'action)*
- **Marges de sécurité :** garder les textes à au moins 80 px des bords (plus en 9:16 à cause de l'interface des applis)

### À faire / à éviter

| ✅ À faire | ❌ À éviter |
|-----------|------------|
| | |
| | |
