/**
 * Service pour gérer le comptage des vues de pages
 */

// URL de base de l'API
const API_BASE_URL = "https://data.castagnicciacasinca.fr/api";

/**
 * Enregistre une vue de page
 * @param {string} nomPage - Le nom de la page visitée
 * @param {string} categorie - La catégorie de la page (optionnel)
 * @returns {Promise<boolean>} - Succès ou échec de l'enregistrement
 */
export async function enregistrerVuePage(nomPage, categorie = "page") {
  try {
    const response = await fetch(`${API_BASE_URL}/page-vue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom_page: nomPage,
        categorie: categorie,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Vue de page enregistrée:", result);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la vue:", error);
    return false;
  }
}

/**
 * Enregistre automatiquement une vue de page basée sur l'URL courante
 * @param {string} customPageName - Nom personnalisé pour la page (optionnel)
 * @param {string} categorie - Catégorie de la page (optionnel)
 */
export function enregistrerVuePageAuto(
  customPageName = null,
  categorie = "page"
) {
  // Attendre que le DOM soit chargé
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      doEnregistrement(customPageName, categorie);
    });
  } else {
    doEnregistrement(customPageName, categorie);
  }
}

/**
 * Fonction interne pour effectuer l'enregistrement
 */
function doEnregistrement(customPageName, categorie) {
  // Utiliser le nom personnalisé ou un nom générique
  const nomPage = customPageName || "page-inconnue";

  // Enregistrer la vue
  enregistrerVuePage(nomPage, categorie);
}

/**
 * Récupère les statistiques de vues depuis l'API
 * @returns {Promise<Object|null>} - Les statistiques ou null en cas d'erreur
 */
export async function obtenirStatistiques() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const stats = await response.json();
    return stats;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return null;
  }
}

/**
 * Initialise le tracking des vues selon le type de page
 * - Page d'accueil : Incrémente vue_total
 * - Autres pages : Enregistre vue par page
 * @param {string} customPageName - Nom personnalisé pour la page (optionnel)
 * @param {string} categorie - Catégorie de la page (optionnel)
 * @param {boolean} isAccueil - True si c'est la page d'accueil
 */

/**
 * Incrémente le compteur de vues totales
 * @returns {Promise<boolean>} - Succès ou échec de l'incrémentation
 */
export async function incrementerVuesTotales() {
  try {
    const response = await fetch(`${API_BASE_URL}/vue-totale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Vue totale incrémentée:", result);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'incrémentation des vues totales:", error);
    return false;
  }
}

/**
 * Initialise le tracking des vues selon le type de page
 * - Page d'accueil : Incrémente vue_total (une fois par session)
 * - Autres pages : Enregistre vue par page
 * @param {string} customPageName - Nom personnalisé pour la page (optionnel)
 * @param {string} categorie - Catégorie de la page (optionnel)
 * @param {boolean} isAccueil - True si c'est la page d'accueil
 */
export async function initialiserTracking(
  customPageName = null,
  categorie = "page",
  isAccueil = false
) {
  try {
    // Détecter automatiquement si c'est l'accueil si pas spécifié
    if (!isAccueil && !customPageName) {
      const path = window.location.pathname;
      isAccueil = path === "/" || path === "/index" || path === "/index.html";
    }

    if (isAccueil || (customPageName && customPageName === "accueil")) {
      // Page d'accueil : incrémenter les vues totales
      console.log("🏠 Page d'accueil détectée - incrémentation vue totale");
      await incrementerVuesTotales();
    } else {
      // Autres pages : enregistrer la vue de page spécifique
      console.log("📄 Page interne détectée - enregistrement vue par page");
      enregistrerVuePageAuto(customPageName, categorie);
    }

    return true;
  } catch (error) {
    console.error("Erreur lors de l'initialisation du tracking:", error);
    return false;
  }
}

/**
 * Fonction spécifique pour la page d'accueil
 * @returns {Promise<boolean>} - Succès ou échec
 */
export async function trackerAccueil() {
  console.log("🏠 Tracking page d'accueil");
  return await incrementerVuesTotales();
}

/**
 * Fonction spécifique pour les pages internes
 * @param {string} nomPage - Nom de la page
 * @param {string} categorie - Catégorie de la page
 */
export function trackerPageInterne(nomPage, categorie = "page") {
  console.log("📄 Tracking page interne:", nomPage, "-", categorie);
  enregistrerVuePageAuto(nomPage, categorie);
}
