# Site MAKAYA

Site vitrine React (Vite) pour MAKAYA — sensibilisation à la santé bucco-dentaire.

## Démarrer en local

```bash
npm install
npm run dev
```

Le site sera disponible sur http://localhost:5173

## Construire pour la mise en ligne

```bash
npm run build
```

Le résultat est généré dans le dossier `dist/`, prêt à être déployé (Netlify, Vercel, GitHub Pages, ou tout hébergement statique).

## Modifier le contenu

Tous les textes du site (titres, descriptions, actualités, coordonnées) se trouvent dans un seul fichier, facile à éditer sans toucher au design :

```
src/data/content.js
```

## Ajouter vos photos et votre vidéo

Dans `src/data/content.js` :

- **Galerie** (`gallery.slides`) : remplacez `src: ""` par le chemin de la photo (ex. `src: "/photos/formation-1.jpg"`, la photo doit être placée dans `public/photos/`). Tant que `src` est vide, un motif de remplacement s'affiche automatiquement.
- **Vidéo** (`video.embedUrl`) : collez le lien d'intégration de la vidéo (ex. un lien YouTube au format `https://www.youtube.com/embed/XXXXXXXX`). Tant que le champ est vide, un bandeau « Vidéo à venir » s'affiche.

## Structure du projet

```
src/
  components/   → un composant par section du site
  data/          → contenu textuel du site
  index.css      → design (couleurs, typographie, mise en page)
  App.jsx        → assemble les sections de la page
  main.jsx       → point d'entrée
```

## Palette et typographie

- Couleurs : porcelaine `#F2F4EF`, pin profond `#0E4A3D`, rose `#C97B84`, sauge `#AFC6B4`
- Typographie : Fraunces (titres), Inter (texte courant)
- Élément signature : l'arc du sourire, utilisé comme séparateur entre les sections
