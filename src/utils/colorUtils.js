/**
 * Utilitaires pour la gestion des couleurs dynamiques
 */

/**
 * Génère les variables CSS à partir des données de couleurs
 * @param {Object} colorData - Les données de couleurs de l'API
 * @returns {string} - Les variables CSS sous forme de string
 */
export function generateCSSVariables(colorData) {
  if (!colorData || !colorData.data) {
    return "";
  }

  const colors = colorData.data;

  return `
    :root {
      /* Barre de navigation */
      --color-navbar-bg: ${colors.fondBarreNavigation};
      --color-navbar-text: ${colors.texteBarreNavigation};
      
      /* Hero section */
      --color-hero-text: ${colors.texteHeroSection};
      
      /* Agenda */
      --color-agenda-text: ${colors.texteAgenda};
      --color-agenda-bg: ${colors.FondAgenda};
      --color-agenda-element-bg: ${colors.fondElementAgenda};
      
      /* Carte interactive */
      --color-carte-bg: ${colors.fondCarteInteractive};
      --color-carte-text: ${colors.texteCarteInteractive};
      
      /* Incontournables */
      --color-incontournables-bg: ${colors.fondIncontournables};
      --color-incontournables-text: ${colors.texteIncontournables};
      
      /* Découvrez le territoire */
      --color-territoire-bg: ${colors.fondDecouvrezLeTerritoire};
      --color-territoire-text: ${colors.texteDecouvrezLeTerritoire};
      
      /* Séjourner */
      --color-sejourner-bg: ${colors.fondSejourner};
      --color-sejourner-text: ${colors.texteSejourner};
      --color-sejourner-element-bg: ${colors.fondElementSejourner};
      
      /* Plages */
      --color-plages-bg: ${colors.FondPlages};
      --color-plages-text: ${colors.textePlages};
      
      /* Artisanat */
      --color-artisanat-bg: ${colors.FondArtisanat};
      --color-artisanat-text: ${colors.texteArtisanat};
      
      /* Activités */
      --color-activites-bg: ${colors.fondActivites};
      --color-activites-text: ${colors.texteActivites};
      --color-activites-element-bg: ${colors.fondElementActivites};
      
      /* Guides numériques */
      --color-guides-bg: ${colors.fondGuidesNumeriques};
      --color-guides-text: ${colors.texteGuidesNumeriques};
      --color-guides-element-bg: ${colors.fondElementGuidesNumeriques};
      
      /* Informations pratiques */
      --color-infos-text: ${colors.texteInformationsPratiques};
      --color-infos-bg: ${colors.fondInformationsPratiques};
      --color-infos-element-bg: ${colors.fondElementInformationsPratiques};
    }
  `;
}

/**
 * Génère les styles inline pour un élément spécifique
 * @param {Object} colorData - Les données de couleurs de l'API
 * @param {string} section - La section concernée (navbar, hero, agenda, etc.)
 * @returns {Object} - Objet de styles pour React/JSX
 */
export function getInlineStyles(colorData, section) {
  if (!colorData || !colorData.data) {
    return {};
  }

  const colors = colorData.data;

  const styleMap = {
    navbar: {
      backgroundColor: colors.fondBarreNavigation,
      color: colors.texteBarreNavigation,
    },
    hero: {
      color: colors.texteHeroSection,
    },
    agenda: {
      backgroundColor: colors.FondAgenda,
      color: colors.texteAgenda,
    },
    "agenda-element": {
      backgroundColor: colors.fondElementAgenda,
    },
    carte: {
      backgroundColor: colors.fondCarteInteractive,
      color: colors.texteCarteInteractive,
    },
    incontournables: {
      backgroundColor: colors.fondIncontournables,
      color: colors.texteIncontournables,
    },
    territoire: {
      backgroundColor: colors.fondDecouvrezLeTerritoire,
      color: colors.texteDecouvrezLeTerritoire,
    },
    sejourner: {
      backgroundColor: colors.fondSejourner,
      color: colors.texteSejourner,
    },
    "sejourner-element": {
      backgroundColor: colors.fondElementSejourner,
    },
    plages: {
      backgroundColor: colors.FondPlages,
      color: colors.textePlages,
    },
    artisanat: {
      backgroundColor: colors.FondArtisanat,
      color: colors.texteArtisanat,
    },
    activites: {
      backgroundColor: colors.fondActivites,
      color: colors.texteActivites,
    },
    "activites-element": {
      backgroundColor: colors.fondElementActivites,
    },
    guides: {
      backgroundColor: colors.fondGuidesNumeriques,
      color: colors.texteGuidesNumeriques,
    },
    "guides-element": {
      backgroundColor: colors.fondElementGuidesNumeriques,
    },
    infos: {
      backgroundColor: colors.fondInformationsPratiques,
      color: colors.texteInformationsPratiques,
    },
    "infos-element": {
      backgroundColor: colors.fondElementInformationsPratiques,
    },
  };

  return styleMap[section] || {};
}
