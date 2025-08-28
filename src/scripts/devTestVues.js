/**
 * Script de développement pour tester le service de vues
 * À ajouter temporairement dans Layout.astro pour les tests
 */

// Charger les tests uniquement en développement
if (import.meta.env.DEV) {
  import("../utils/testVuesService.js")
    .then((module) => {
      // console.log("🧪 Tests de vues chargés en mode développement");

      // Optionnel: exécuter automatiquement un test de base
      // module.afficherDebugInfo();
    })
    .catch((err) => {
      // console.log("Erreur lors du chargement des tests:", err);
    });
}

// Fonction pour monitorer les vues en temps réel (en développement)
if (import.meta.env.DEV) {
  let vueCount = 0;

  // Observer les changements de page
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    vueCount++;
    // console.log(
      `🔄 Navigation détectée (#${vueCount}):`,
      args[2] || window.location.pathname
    );
    return originalPushState.apply(history, args);
  };

  history.replaceState = function (...args) {
    // console.log(
      `🔄 Remplacement d'état détecté:`,
      args[2] || window.location.pathname
    );
    return originalReplaceState.apply(history, args);
  };

  // Observer les changements de hash
  window.addEventListener("hashchange", function (e) {
    // console.log(`🔄 Changement de hash détecté:`, e.newURL);
  });
}
