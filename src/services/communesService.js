const API_BASE_URL = "https://cms.castagnicciacasinca.fr/api";

/**
 * Génère un slug à partir d'un nom de commune
 */
export function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, "") // Supprime les caractères spéciaux
    .replace(/\s+/g, "-") // Remplace les espaces par des tirets
    .replace(/-+/g, "-") // Supprime les tirets multiples
    .trim();
}

/**
 * Récupère toutes les communes depuis l'API
 */
export async function fetchCommunes() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/communes?populate=*&pagination[page]=1&pagination[pageSize]=100`
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();

    // Transformer les données et ajouter les slugs
    const communes = result.data.map((commune) => ({
      ...commune,
      slug: generateSlug(commune.Nom),
    }));

    return communes;
  } catch (error) {
    console.error("Erreur lors de la récupération des communes:", error);
    return [];
  }
}

/**
 * Récupère une commune par son slug
 */
export async function getCommuneBySlug(slug) {
  try {
    const communes = await fetchCommunes();
    const commune = communes.find((c) => c.slug === slug);

    if (!commune) {
      throw new Error(`Commune avec le slug "${slug}" non trouvée`);
    }

    return commune;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la commune par slug:",
      error
    );
    return null;
  }
}

/**
 * Récupère une commune par son ID
 */
export async function getCommuneById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/communes/${id}?populate=*`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();

    return {
      ...result.data,
      slug: generateSlug(result.data.Nom),
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la commune par ID:",
      error
    );
    return null;
  }
}
