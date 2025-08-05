import { useEffect } from 'react';

const PageTracker = ({ pageName, pageCategory }) => {
  useEffect(() => {
    // Vérifier si on a déjà envoyé une vue pour cette session
    const sessionKey = `page_tracked_${pageName}_${Date.now().toString().slice(0, -6)}000`; // Arrondi à la minute
    const hasTrackedThisSession = sessionStorage.getItem(sessionKey);
    
    if (hasTrackedThisSession) {
      return;
    }

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
        // Marquer comme envoyé pour cette session
        sessionStorage.setItem(sessionKey, 'true');
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la vue de page:', error);
      }
    };

    // Incrémenter les vues totales (seulement une fois par page par session)
    const sendTotalView = async () => {
      const totalViewKey = `total_view_tracked_${Date.now().toString().slice(0, -6)}000`;
      const hasTrackedTotal = sessionStorage.getItem(totalViewKey);
      
      if (hasTrackedTotal) {
        return;
      }
      
      try {
        await fetch('https://data.castagnicciacasinca.fr/api/vue-totale', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        sessionStorage.setItem(totalViewKey, 'true');
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
