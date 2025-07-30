/**
 * Script de test pour le service de comptage des vues
 * Exécuter dans la console du navigateur pour tester les fonctionnalités
 */

// Import du service (à adapter selon votre environnement)
import {
  initialiserTracking,
  incrementerVuesTotales,
  enregistrerVuePage,
  obtenirStatistiques,
  estNouvelleSession,
  getInfoSession,
} from "../services/pageViewService.js";

/**
 * Test complet du service de vues
 */
async function testerServiceVues() {
  console.log("🧪 Début des tests du service de vues");

  // 1. Vérifier l'état de la session
  console.log("\n📊 État de la session:");
  console.log("Nouvelle session:", estNouvelleSession());
  console.log("Info session:", getInfoSession());

  // 2. Test des vues totales
  console.log("\n🔢 Test incrémentation vues totales:");
  const resultTotalView = await incrementerVuesTotales();
  console.log("Résultat:", resultTotalView);

  // 3. Test d'une vue de page
  console.log("\n📄 Test enregistrement vue de page:");
  const resultPageView = await enregistrerVuePage("test-page", "Test");
  console.log("Résultat:", resultPageView);

  // 4. Test du tracking complet
  console.log("\n🚀 Test tracking complet:");
  const resultFullTracking = await initialiserTracking(
    "page-test-complete",
    "Test"
  );
  console.log("Résultat:", resultFullTracking);

  // 5. Récupérer les statistiques
  console.log("\n📈 Statistiques actuelles:");
  const stats = await obtenirStatistiques();
  console.log("Stats:", stats);

  console.log("\n✅ Tests terminés");
}

/**
 * Test de simulation de navigation
 */
async function simulerNavigation() {
  console.log("🌐 Simulation de navigation");

  const pages = [
    { nom: "accueil", categorie: "Accueil" },
    { nom: "randonnee-gr20", categorie: "Nature" },
    { nom: "hotel-refuge", categorie: "Hébergement" },
    { nom: "restaurant-local", categorie: "Restauration" },
    { nom: "agenda-juillet", categorie: "Événements" },
  ];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    console.log(`📍 Navigation vers: ${page.nom} (${page.categorie})`);

    if (i === 0) {
      // Première page = tracking complet
      await initialiserTracking(page.nom, page.categorie);
    } else {
      // Pages suivantes = que la vue de page
      await enregistrerVuePage(page.nom, page.categorie);
    }

    // Pause entre les pages
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("✅ Simulation terminée");
}

/**
 * Afficher les informations de debugging
 */
function afficherDebugInfo() {
  console.log("🔍 Informations de debugging:");
  console.log("SessionStorage:", {
    sessionStart: sessionStorage.getItem("ccc_session_start"),
  });
  console.log("LocalStorage:", {
    totalViewTracked: localStorage.getItem("ccc_total_view_tracked"),
  });
  console.log("URL actuelle:", window.location.href);
  console.log("Path:", window.location.pathname);
}

/**
 * Nettoyer les données de test
 */
function nettoyerDonneesTest() {
  sessionStorage.removeItem("ccc_session_start");
  localStorage.removeItem("ccc_total_view_tracked");
  console.log("🧹 Données de test nettoyées");
}

// Exposer les fonctions globalement pour les tests dans la console
window.testVues = {
  testerServiceVues,
  simulerNavigation,
  afficherDebugInfo,
  nettoyerDonneesTest,
  incrementerVuesTotales,
  enregistrerVuePage,
  obtenirStatistiques,
  estNouvelleSession,
  getInfoSession,
};

console.log(`
🧪 Service de test des vues chargé !

Fonctions disponibles dans window.testVues:
- testVues.testerServiceVues() : Test complet
- testVues.simulerNavigation() : Simulation de navigation
- testVues.afficherDebugInfo() : Infos de debugging
- testVues.nettoyerDonneesTest() : Nettoyer les données
- testVues.obtenirStatistiques() : Voir les stats actuelles

Exemple d'utilisation:
await testVues.testerServiceVues();
`);

export {
  testerServiceVues,
  simulerNavigation,
  afficherDebugInfo,
  nettoyerDonneesTest,
};
