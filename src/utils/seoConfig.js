// Configuration SEO centralisée pour toutes les pages du site

export const seoConfig = {
  siteUrl: 'https://tourisme.castagnicciacasinca.fr',
  siteName: 'Tourisme Castagniccia-Casinca',
  defaultTitle: 'Tourisme - Communauté de communes de la Castagniccia-Casinca',
  defaultDescription: 'Découvrez la Castagniccia-Casinca en Corse : villages authentiques, randonnées, patrimoine, gastronomie locale et hébergements.',
  defaultKeywords: 'Tourisme, Castagniccia, Casinca, Corse, Haute-Corse, villages corses, randonnées, patrimoine, gastronomie corse',
  defaultImage: '/photos/Mont-San-Petrone.jpg',
  
  // Configuration spécifique par page
  pages: {
    '/': {
      title: 'Tourisme en Castagniccia-Casinca | Découvrez la Corse authentique',
      description: 'Explorez la Castagniccia-Casinca en Haute-Corse : villages pittoresques, randonnées nature, patrimoine historique, plages sauvages, gastronomie locale et hébergements de charme.',
      keywords: 'Castagniccia Casinca Corse, tourisme Haute-Corse, villages corses authentiques, randonnées Corse, patrimoine corse, plages Corse orientale',
      image: '/photos/Mont-San-Petrone.jpg'
    },
    '/guides': {
      title: 'Guides touristiques Castagniccia-Casinca | PDF gratuits',
      description: 'Téléchargez gratuitement nos guides touristiques PDF de la Castagniccia-Casinca : itinéraires, sites incontournables, bonnes adresses.',
      keywords: 'guides touristiques Corse, PDF gratuit, itinéraires Castagniccia, sites touristiques Casinca',
      image: '/photos/LoretodiCasinca.jpg'
    },
    '/carte-interactive': {
      title: 'Carte interactive Castagniccia-Casinca | Explorez le territoire',
      description: 'Naviguez sur notre carte interactive pour découvrir les sites, villages, randonnées et points d\'intérêt de la Castagniccia-Casinca.',
      keywords: 'carte interactive Corse, navigation territoire, sites touristiques, villages Castagniccia Casinca',
      image: '/carte-statique.png'
    },
    '/activite-nautique': {
      title: 'Activités nautiques Castagniccia-Casinca | Sports aquatiques Corse',
      description: 'Découvrez les activités nautiques en Castagniccia-Casinca : plongée, kayak, voile, pêche en mer sur la côte orientale de la Corse.',
      keywords: 'activités nautiques Corse, sports aquatiques, plongée Corse orientale, kayak mer, voile Casinca',
      image: '/photos/Plage-de-Cap-Sud.jpg'
    },
    '/plages': {
      title: 'Plages Castagniccia-Casinca | Côte orientale de la Corse',
      description: 'Les plus belles plages de la Castagniccia-Casinca : plages de sable fin, criques sauvages et eaux cristallines de la côte orientale corse.',
      keywords: 'plages Corse orientale, plages Casinca, plages de sable Corse, criques sauvages, baignade Corse',
      image: '/photos/Plage-de-Cap-Sud-2.jpg'
    },
    '/randonnee': {
      title: 'Randonnées Castagniccia-Casinca | Sentiers et circuits Corse',
      description: 'Parcourez les sentiers de randonnée de la Castagniccia-Casinca : Monte San Petrone, villages perchés, maquis corse et panoramas exceptionnels.',
      keywords: 'randonnées Corse, sentiers Castagniccia, Monte San Petrone, circuits pédestres, hiking Corse',
      image: '/photos/Mont-San-Petrone.jpg'
    },
    '/sejourner': {
      title: 'Hébergements Castagniccia-Casinca | Hôtels, gîtes et campings',
      description: 'Trouvez votre hébergement en Castagniccia-Casinca : hôtels de charme, gîtes ruraux, chambres d\'hôtes, campings et résidences.',
      keywords: 'hébergements Corse, hôtels Castagniccia, gîtes Casinca, chambres hôtes Corse, camping Corse orientale',
      image: '/photos/Hotel-Residence-A-Torra.jpg'
    },
    '/artisanat': {
      title: 'Artisanat et terroir Castagniccia-Casinca | Produits corses',
      description: 'Découvrez l\'artisanat local et les produits du terroir de la Castagniccia-Casinca : spécialités corses, artisans d\'art, producteurs locaux.',
      keywords: 'artisanat corse, produits terroir Corse, spécialités Castagniccia, producteurs locaux, gastronomie corse',
      image: '/photos/Campile.jpg'
    },
    '/sites': {
      title: 'Sites touristiques Castagniccia-Casinca | Patrimoine et culture',
      description: 'Explorez les sites incontournables de la Castagniccia-Casinca : villages historiques, monuments, églises baroques et patrimoine corse.',
      keywords: 'sites touristiques Corse, patrimoine Castagniccia, villages corses, monuments historiques, culture corse',
      image: '/photos/Vescovato.jpg'
    }
  }
};

// Fonction utilitaire pour récupérer la configuration SEO d'une page
export function getPageSEO(pathname) {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  return seoConfig.pages[normalizedPath] || {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    keywords: seoConfig.defaultKeywords,
    image: seoConfig.defaultImage
  };
}
