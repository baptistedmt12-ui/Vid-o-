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
| 001 | Street workout (titre à définir) | 🎨 Assets | 9:16 (1080×1920) | 62 s (rush) | — | — | — | — | Rush reçu, en attente des consignes |
| 002 | | 💡 Idée | | | | | | | |

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
| Fond principal | `#0B1020` | Arrière-plan des scènes |
| Texte principal | `#FFFFFF` | Titres et textes |
| Couleur d'accent | `#______` | Mots importants, boutons, soulignements |
| Couleur secondaire | `#______` | Formes, éléments décoratifs |

### Typographie

| Usage | Police | Graisse | Taille (1080p) |
|-------|--------|---------|----------------|
| Titres | *(ex. : Montserrat)* | Bold | 100–120 px |
| Sous-titres | | SemiBold | 60–72 px |
| Texte courant / sous-titrage | | Regular | 40–48 px |

### Animations et rythme
- **Entrée des textes :** fondu + léger zoom (`spring`, damping 200) — comme dans `HelloWorld`
- **Transitions entre scènes :** *(ex. : glissement, fondu, coupe franche)*
- **Durée minimale d'un texte à l'écran :** ~1,5 s
- **Rythme :** un changement visuel toutes les 2–4 s

### Son
- **Style de musique :**
- **Effets sonores :** *(ex. : whoosh sur les transitions)*
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
