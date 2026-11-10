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
| 001 | Les 5 niveaux du poids de corps | 🔍 Relecture | 9:16 (1080×1920) | 1 min 06 | `Video001` | — | — | — | v1 rendue, voix off à enregistrer |
| 002 | L'étiquette arrachée (MT-09 à 4 000 €) | 🔍 Relecture | 9:16 (1080×1920) | 1 min 00 | `Video002` | — | — | — | v1 rendue (motion design calé sur la voix off, sans sous-titres) |
| 003 | Défi 15 / 15 / 15 (15 MU, 15 dips, 7 tractions) | 🔍 Relecture | 9:16 (1080×1920) | 2 min 00 | `Video003` | — | — | — | v1 qualité max envoyée (206 Mo, hors GitHub) |
| 004 | La boue rouge (enduro, gendarmes à 17h) | 🔍 Relecture | 9:16 (1080×1920) | 1 min 08 | `Video004` | — | — | — | v1 rendue, graphiques compacts |
| 005 | Le compteur (moto en LLD à rendre lundi) | 🔍 Relecture | 9:16 (1080×1920) | 1 min 06 | `Video005` | — | — | — | v1 rendue, graphiques compacts |
| 006 | On Air Chambly — annonce du 15/15/15 (banane en voiture) | 🔍 Relecture | 9:16 (1080×1920) 60 i/s | 10 s | `Video006` | — | — | — | v2 calée sur la voix (Whisper) |
| 007 | Inox en muscu (extrait « Que devient Inox en Muscu ») | 🔍 Relecture | 9:16 (1080×1920) 25 i/s | 1 min 06 | `Video007` | — | — | — | v1 rendue, musique générée calée sur les coupes |
| 008 | Style jet premium (script « raciste »), sans voix | 🔍 Relecture | 9:16 (1080×1920) | 1 min 03 | `Video008Test` | — | — | — | Images de @udetailers (accord de l'utilisateur) ; textes à caler sur la voix |
| 009 | Le scooter volé (casque à marguerite) | 🔍 Relecture | 9:16 (1080×1920) | 1 min 02 | `Video009` | — | — | — | v1 calée au mot près sur la voix off |
| 010 | TMAX noir (rush @aliengarage.th), sans voix | 🔍 Relecture | 9:16 (1080×1920) 60 i/s | 1 min 03 | `Video010` | — | — | — | Son d'origine (ASMR), aucun habillage |
| 011 | | 💡 Idée | | | | | | | |

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

---

## 4. Leçons TikTok (statistiques réelles du compte)

### Analyse du 10/11/2026 — format « histoire racontée sur un lavage de moto »
| Vidéo | Vues | Encore là à 10 s | Vue en entier | Likes / vues | Comm. / partages |
|---|---|---|---|---|---|
| « Interdit : le réservoir » (Jessica) | 5 218 | 41 % | 25,9 % | 1,5 % | 0 / 0 |
| « Une belle surprise non » (papa, 18 ans) | 1 201 | 35 % | 19,9 % | 5 % | 1 / 0 |

- Même montage pour les deux : la différence vient de **la 1re phrase et de la 1re image**.
  - Réservoir : interdit + transgression en 6 s (« Évidemment, j'ai touché au réservoir ») → on veut savoir.
  - Papa : phrase de 5 s sans conflit, le conflit (« sa femme n'était pas au courant ») n'arrive qu'à 5–8 s,
    puis 16 s d'explications ; 1re image = chaîne en gros plan, peu lisible.
- Après 10 s, les deux courbes sont plates : l'histoire tient, seul le début fait perdre les vues.
- Aucune question en fin de vidéo → presque 0 commentaire → TikTok arrête la diffusion au bout de quelques heures.
- TikTok a signalé « Améliore la résolution » sur la vidéo papa : exporter et publier en 1080p minimum.

### Règles à appliquer
1. Conflit ou interdit dans les **3 premières secondes**, en une phrase courte ; la 2e phrase relance (≤ 6 s).
2. 1re image = le plan le plus visuel (mousse, couleur, saleté qui part), jamais un gros plan illisible.
3. Couper l'exposition : chaque phrase doit faire avancer l'histoire.
4. Relance vers le milieu (~25 s) : un rebondissement annoncé.
5. Finir sur une **question à deux camps** (« Tu lui dis ou tu te tais ? ») + commentaire épinglé, ou « partie 2 ».
6. Rester au-dessus d'1 minute (monétisation).

---

## 5. Format « histoire + nettoyage premium » (jet privé) — demandé le 10/11/2026

L'utilisateur envoie ses **rushes sans montage** ; Claude écrit le script adapté aux plans, l'utilisateur enregistre sa voix, Claude fait tout le montage.

- **Montage simple mais entièrement retravaillé pour TikTok et la rétention** : meilleur plan en premier, coupe à chaque phrase, relance vers 25 s, silence avant la chute, question finale.
- **Épuré et premium** : peu d'éléments à l'écran, beaucoup d'air, rien de criard.
  - Couleurs : noir profond `#0B0B0D`, blanc cassé `#F5F2EC`, accent **or champagne `#C9A86A`** (remplace le rouge pour ce format).
  - Sous-titres mot par mot, blancs, mot clé en or, au-dessus de la zone de description TikTok (≤ ~1 400 px).
  - Étiquettes de contexte petites, en haut à gauche, fine ligne dorée, entrée en fondu.
- **Dynamisme** : effets miroir ponctuels (retournement / reflet) sur les moments de rythme, zooms lents sur les plans de cuir et de brillance, reflet lumineux qui passe sur certains textes.
- **Motion design** discret, calé au mot près sur la voix (heure « 17:00 », montant « 4 000 € »…).
- **Son** : effets sonores doux (whoosh léger, « ding » de brillance, silence avant la chute), musique d'ambiance discrète sous la voix.
- Règles TikTok habituelles : pas de texte sur les actions, rien dans les zones de l'interface, plus d'1 minute.
