# Migration des Sites vers des Données Dynamiques

## Résumé des modifications

Les pages de sites ont été migrées pour utiliser des données dynamiques depuis l'API Strapi au lieu des données statiques. Voici les changements apportés :

## Fichiers créés

### `src/services/sitesService.js`

Service pour récupérer et transformer les données des sites depuis l'API Strapi :

- `fetchSites()` : Récupère tous les sites
- `fetchSiteBySlug(slug)` : Récupère un site spécifique par son slug/documentId
- `transformSiteData(apiSite)` : Transforme les données API au format compatible avec les composants existants
- `generateSlug(title)` : Génère un slug à partir d'un titre

## Fichiers modifiés

### `src/pages/sites/index.astro`

- Intégration du service pour récupérer les sites depuis l'API
- Passage des sites dynamiques au composant `SitesListing`

### `src/pages/sites/[slug].astro`

- Mise à jour de `getStaticPaths()` pour utiliser les données API
- Gestion des routes dynamiques avec les `documentId` comme slugs
- Gestion des erreurs et redirections

### `src/components/listing/SitesListing.jsx`

- Ajout du prop `sites` pour recevoir les données dynamiques
- Fallback sur les données statiques si aucune donnée n'est fournie
- Mise à jour des dépendances du callback `handleFiltersChange`

### `src/components/LesIncontournables.jsx`

- Ajout du prop `sites` pour recevoir les données dynamiques
- Fallback sur les données statiques existantes

### `src/pages/index.astro`

- Intégration du service pour récupérer les sites
- Passage des sites au composant `LesIncontournables`
- Import des types nécessaires

## Structure des données

### Format API (RootSite)

```typescript
interface Daum {
  id: number;
  documentId: string;
  Titre: string;
  Description: string;
  coordonnees: { lat: number; lng: number };
  commune: { Nom: string };
  Liens: Array<{ lien: string; image: Image }>;
  Images: Array<Image>;
}
```

### Format transformé (compatible avec les composants existants)

```javascript
{
  id: number,
  slug: string, // documentId
  title: string, // Titre
  subtitle: string, // commune.Nom
  description: string,
  fullDescription: string,
  commune: string,
  coordinates: { lat: number, lng: number },
  images: Array<{ url: string, alt: string, formats: object }>,
  gallery: Array<string>, // URLs des images
  links: Array<{ url: string, image: string }>,
  // Propriétés de compatibilité
  type: 'site',
  difficulty: 'facile',
  duration: 'Variable',
  image: string, // Première image disponible
  details: { /* informations détaillées */ },
  lat: number,
  lng: number
}
```

## Routes générées

Les routes sont maintenant générées dynamiquement basées sur les `documentId` des sites :

- `/sites/` - Liste de tous les sites
- `/sites/[documentId]/` - Page de détail d'un site spécifique

Exemple : `/sites/afh1ahn27jw49ghjuf98e8m6/` pour le "Couvent de Saint-Antoine"

## Variables d'environnement

Le service utilise les variables d'environnement suivantes :

- `PUBLIC_API_URL` : URL publique de l'API Strapi (accessible côté client)
- `STRAPI_API_URL` : URL privée de l'API (optionnelle, pour le côté serveur)

## Compatibilité

- ✅ Les composants existants continuent de fonctionner
- ✅ Les données statiques servent de fallback en cas d'erreur API
- ✅ Les routes existantes restent compatibles
- ✅ Les filtres et la recherche fonctionnent avec les nouvelles données

## Test

1. **Build de production** : `npm run build` ✅
2. **Serveur de développement** : `npm run dev` ✅
3. **Page d'accueil** : Les sites apparaissent dans la section "Les incontournables"
4. **Page de liste** : `/sites/` affiche tous les sites avec les données API
5. **Pages de détail** : `/sites/[documentId]/` affichent les informations complètes

## À faire (optionnel)

- [ ] Mise en cache des données API pour améliorer les performances
- [ ] Gestion des erreurs réseau avec retry automatique
- [ ] Ajout de loading states dans les composants React
- [ ] Optimisation des images avec les formats Strapi (thumbnail, small, medium, large)
