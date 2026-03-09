// Utilitaires génériques pour récupérer toutes les pages d'une collection Strapi
// Assure l'agrégation de 100% des entrées sans limite de 25 par défaut.

function getApiBaseUrl() {
  if (typeof window !== "undefined") {
    return import.meta.env.PUBLIC_API_URL || "http://localhost:1337";
  }
  return (
    import.meta.env.STRAPI_API_URL ||
    import.meta.env.PUBLIC_API_URL ||
    "http://localhost:1337"
  );
}

/**
 * Récupère l'ensemble des entrées d'un endpoint Strapi avec pagination.
 * @param {string} endpoint ex: '/api/evenements'
 * @param {object} options { populate, pageSize }
 * @returns {Promise<{data: any[], meta: any}>}
 */
export async function fetchAll(
  endpoint,
  { populate = "*", pageSize = 100 } = {}
) {
  const API_BASE_URL = getApiBaseUrl();
  let all = [];
  let page = 1;
  let pageCount = 1;
  let meta = {};
  try {
    do {
      const url = `${API_BASE_URL}${endpoint}?populate=${encodeURIComponent(
        populate
      )}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
      const json = await res.json();
      if (Array.isArray(json.data)) all = all.concat(json.data);
      meta = json.meta || meta;
      pageCount = meta.pagination?.pageCount || 1;
      page++;
    } while (page <= pageCount);
  } catch (e) {
    console.error("fetchAll error:", endpoint, e);
  }
  return { data: all, meta };
}

/**
 * Raccourcis spécifiques si besoin futur
 */
export const fetchAllEvenements = (opts = {}) =>
  fetchAll("/api/evenements", opts);
export const fetchAllSejourners = (opts = {}) =>
  fetchAll("/api/sejourners", opts);
export const fetchAllPlages = (opts = {}) => fetchAll("/api/plages", opts);
export const fetchAllArtisanat = (opts = {}) =>
  fetchAll("/api/artisanat-et-produits", opts);
export const fetchAllRandonnees = (opts = {}) =>
  fetchAll("/api/randonnees", opts);
export const fetchAllActivitesNautiques = (opts = {}) =>
  fetchAll("/api/activites-nautiques", opts);
export const fetchAllSites = (opts = {}) =>
  fetchAll("/api/sites", opts);
export const fetchAllQrCodes = (opts = {}) =>
  fetchAll("/api/qr-codes", opts);

/**
 * Récupère les couleurs et textes dynamiques
 */
export async function fetchColorTexte() {
  const API_BASE_URL = getApiBaseUrl();
  try {
    const url = `${API_BASE_URL}/api/couleur-du-texte-et-du-fond`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
    return await res.json();
  } catch (e) {
    console.error("fetchColorTexte error:", e);
    // Retourner des couleurs par défaut en cas d'erreur
    return {
      data: {
        fondBarreNavigation: "#ffffff",
        texteBarreNavigation: "#000000",
        texteHeroSection: "#000000",
        texteAgenda: "#000000",
        FondAgenda: "#ffffff",
        fondElementAgenda: "#ffffff",
        fondCarteInteractive: "#ffffff",
        texteCarteInteractive: "#000000",
        fondIncontournables: "#ffffff",
        texteIncontournables: "#000000",
        fondDecouvrezLeTerritoire: "#ffffff",
        texteDecouvrezLeTerritoire: "#000000",
        fondSejourner: "#ffffff",
        texteSejourner: "#000000",
        fondElementSejourner: "#ffffff",
        FondPlages: "#ffffff",
        textePlages: "#000000",
        FondArtisanat: "#ffffff",
        texteArtisanat: "#000000",
        fondActivites: "#ffffff",
        texteActivites: "#000000",
        fondElementActivites: "#ffffff",
        fondGuidesNumeriques: "#ffffff",
        texteGuidesNumeriques: "#000000",
        fondElementGuidesNumeriques: "#ffffff",
        texteInformationsPratiques: "#000000",
        fondInformationsPratiques: "#ffffff",
        fondElementInformationsPratiques: "#ffffff",
      },
    };
  }
}
