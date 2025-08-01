import { useEffect } from 'react';

const PageTracker = ({ pageName, pageCategory }) => {
  useEffect(() => {
    // Envoyer la vue de page
    const sendPageView = async () => {
      try {
        await fetch('https://data.castagnicciacasinca.fr/api/page-vue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom_page: pageName,
            categorie: pageCategory
          })
        });
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la vue de page:', error);
      }
    };

    // Incrémenter les vues totales
    const sendTotalView = async () => {
      try {
        await fetch('https://data.castagnicciacasinca.fr/api/vue-totale', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
      } catch (error) {
        console.error('Erreur lors de l\'incrémentation des vues totales:', error);
      }
    };

    // Envoyer les données avec un délai pour s'assurer que la page est chargée
    const timer = setTimeout(() => {
      sendPageView();
      sendTotalView();
    }, 1000);

    return () => clearTimeout(timer);
  }, [pageName, pageCategory]);

  // Ce composant ne rend rien visuellement
  return null;
};

export default PageTracker;
