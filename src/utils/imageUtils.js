/**
 * Génère l'URL complète d'une image depuis l'API Strapi
 * @param {Object} image - Objet image de l'API Strapi
 * @returns {string|null} - URL complète de l'image ou null si pas d'image
 */
export const getImageUrl = (image) => {
  if (!image || !image.url) return null;

  const baseUrl =
    import.meta.env.PUBLIC_STRAPI_URL ||
    import.meta.env.PUBLIC_API_URL ||
    "https://cms.castagnicciacasinca.fr";

  return `${baseUrl}${image.url}`;
};
