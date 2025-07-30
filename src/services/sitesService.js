// Fonction pour obtenir l'URL de base de l'API
function getApiBaseUrl() {
  // En client-side (browser), utiliser l'URL publique
  if (typeof window !== "undefined") {
    return import.meta.env.PUBLIC_API_URL || "http://localhost:1337";
  }
  // En server-side, utiliser l'URL privée ou publique
  return (
    import.meta.env.STRAPI_API_URL ||
    import.meta.env.PUBLIC_API_URL ||
    "http://localhost:1337"
  );
}

/**
 * Récupère tous les sites depuis l'API Strapi
 */
export async function fetchSites() {
  try {
    const API_BASE_URL = getApiBaseUrl();
    const response = await fetch(`${API_BASE_URL}/api/sites?populate=*`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des sites:", error);
    // Retourner des données vides en cas d'erreur
    return { data: [], meta: { pagination: { total: 0 } } };
  }
}

/**
 * Récupère un site spécifique par son slug/documentId
 */
export async function fetchSiteBySlug(slug) {
  try {
    const API_BASE_URL = getApiBaseUrl();
    // Essayer d'abord par documentId
    let response = await fetch(
      `${API_BASE_URL}/api/sites?filters[documentId][$eq]=${slug}&populate=*`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();

    // Si aucun résultat par documentId, essayer par titre (slug-like)
    if (!data.data || data.data.length === 0) {
      const titleSlug = slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      response = await fetch(
        `${API_BASE_URL}/api/sites?filters[Titre][$containsi]=${encodeURIComponent(
          titleSlug
        )}&populate=*`
      );
      data = await response.json();
    }

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error("Erreur lors de la récupération du site:", error);
    return null;
  }
}

/**
 * Transforme les données API en format compatible avec les composants existants
 */
export function transformSiteData(apiSite) {
  const baseUrl = getApiBaseUrl();

  // Transformer les images avec les URLs complètes
  const images =
    apiSite.Images?.map((img) => ({
      url: img.url.startsWith("http") ? img.url : `${baseUrl}${img.url}`,
      alt: img.alternativeText || apiSite.Titre,
      formats: img.formats,
    })) || [];

  // Créer une galerie d'images à partir des images disponibles
  const gallery = images.map((img) => img.url);

  return {
    id: apiSite.id,
    slug: apiSite.documentId,
    title: apiSite.Titre,
    subtitle: apiSite.commune?.Nom || "",
    description: apiSite.Description,
    fullDescription: apiSite.Description, // Utiliser la description comme description complète
    commune: apiSite.commune?.Nom || "",
    coordinates: apiSite.coordonnees,
    images: images,
    gallery: gallery,
    links:
      apiSite.Liens?.map((link) => ({
        url: link.lien,
        image: link.image?.url
          ? link.image.url.startsWith("http")
            ? link.image.url
            : `${baseUrl}${link.image.url}`
          : null,
      })) || [],
    // Ajouter des valeurs par défaut pour la compatibilité avec les composants existants
    type: "site",
    difficulty: "facile",
    duration: "Variable",
    image: gallery[0] || "/placeholder.svg",
    // Données détaillées pour le composant SiteDetail
    details: {
      access: "Accès variable selon le site",
      parking: "Se renseigner localement",
      equipment: "Équipement adapté recommandé",
      season: "Accessible toute l'année",
      viewpoints: apiSite.coordonnees
        ? `${apiSite.coordonnees.lat}, ${apiSite.coordonnees.lng}`
        : "",
      flora: "Végétation méditerranéenne",
    },
    // Coordonnées pour la carte
    lat: apiSite.coordonnees?.lat,
    lng: apiSite.coordonnees?.lng,
  };
}

/**
 * Génère un slug à partir d'un titre
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^a-z0-9\s-]/g, "") // Supprimer les caractères spéciaux
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .replace(/-+/g, "-") // Supprimer les tirets multiples
    .trim("-"); // Supprimer les tirets en début/fin
}
