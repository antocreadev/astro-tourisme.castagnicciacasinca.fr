import { useState, useEffect } from 'react';
import { Map, FileImage } from 'lucide-react';
import CarteStatique from './CarteStatique.jsx';

export default function CarteNavigation({ 
  sejournerData, 
  plagesData, 
  artisanatData, 
  evenementsData, 
  activitesNautiquesData, 
  randonneesData 
}) {
  const [activeView, setActiveView] = useState('interactive');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Charger la carte interactive si elle est active et que nous sommes côté client
    if (activeView === 'interactive' && isMounted) {
      // Délai pour s'assurer que le DOM est prêt
      setTimeout(() => {
        loadInteractiveMap();
      }, 100);
    }
  }, [activeView, isMounted]);

  const loadInteractiveMap = async () => {
    const wrapper = document.querySelector('.interactive-map-wrapper');
    if (!wrapper) return;

    try {
      // Import dynamique du module React et du composant côté client uniquement
      const [React, ReactDOM, { default: InteractiveMapClient }] = await Promise.all([
        import('react'),
        import('react-dom/client'),
        import('./InteractiveMapClient.jsx')
      ]);

      // Récupération des données depuis les attributs data
      const props = {
        sejournerData: JSON.parse(wrapper.dataset.sejourner || '[]'),
        plagesData: JSON.parse(wrapper.dataset.plages || '[]'),
        artisanatData: JSON.parse(wrapper.dataset.artisanat || '[]'),
        evenementsData: JSON.parse(wrapper.dataset.evenements || '[]'),
        activitesNautiquesData: JSON.parse(wrapper.dataset.activitesNautiques || '[]'),
        randonneesData: JSON.parse(wrapper.dataset.randonnees || '[]')
      };

      // Créer ou réutiliser le root React
      let root = wrapper._reactRoot;
      if (!root) {
        root = ReactDOM.createRoot(wrapper);
        wrapper._reactRoot = root;
      }

      root.render(React.createElement(InteractiveMapClient, props));
    } catch (error) {
      console.error('Erreur lors du chargement de la carte:', error);
      wrapper.innerHTML = `
        <div class="flex items-center justify-center h-[600px] bg-red-50">
          <div class="text-center">
            <p class="text-red-600">Erreur lors du chargement de la carte</p>
          </div>
        </div>
      `;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête avec navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Cartes du territoire
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Découvrez le territoire de la Castagniccia-Casinca à travers notre carte statique téléchargeable 
              et notre carte interactive avec tous les points d'intérêt.
            </p>
          </div>

          {/* Boutons de navigation */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveView('static')}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeView === 'static'
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <FileImage size={20} />
              Carte statique
            </button>
            
            <button
              onClick={() => setActiveView('interactive')}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeView === 'interactive'
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <Map size={20} />
              Carte interactive
            </button>
          </div>
        </div>
      </div>

      {/* Contenu conditionnel */}
      {activeView === 'static' ? (
        <CarteStatique 
        />
      ) : (
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[600px]">
              {isMounted ? (
                <div 
                  className="interactive-map-wrapper"
                  data-sejourner={JSON.stringify(sejournerData)}
                  data-plages={JSON.stringify(plagesData)}
                  data-artisanat={JSON.stringify(artisanatData)}
                  data-evenements={JSON.stringify(evenementsData)}
                  data-activites-nautiques={JSON.stringify(activitesNautiquesData)}
                  data-randonnees={JSON.stringify(randonneesData)}
                >
                  <div className="flex items-center justify-center h-[600px] bg-gray-100">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                      <p className="text-gray-600">Chargement de la carte...</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[600px] bg-gray-100">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement de la carte...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
