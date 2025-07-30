/**
 * Convertit un titre en slug URL-friendly
 * @param {string} title - Le titre à convertir
 * @returns {string} Le slug généré
 */
export function createSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD') // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Supprime les tirets multiples
    .replace(/^-+|-+$/g, ''); // Supprime les tirets en début et fin
}

/**
 * Trouve une catégorie par son slug
 * @param {string} slug - Le slug recherché
 * @param {Array} categories - La liste des catégories
 * @returns {Object|null} La catégorie trouvée ou null
 */
export function findCategoryBySlug(slug, categories) {
  return categories.find(category => createSlug(category.type.Titre) === slug) || null;
}
