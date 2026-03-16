import { useState, useEffect } from 'react';
import { Map, FileImage, QrCode, Mountain } from 'lucide-react';
import CarteStatique from './CarteStatique.jsx';

export default function CarteNavigation({
  sejournerData,
  plagesData,
  artisanatData,
  evenementsData,
  activitesNautiquesData,
  randonneesData,
  sitesData,
  qrCodesData,
}) {
  const [activeView, setActiveView] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vue = params.get('vue');
    if (['static', 'interactive', 'qrcodes', 'randonnees'].includes(vue)) {
      setActiveView(vue);
    } else {
      setActiveView('interactive');
    }
    setIsMounted(true);
  }, []);

  // Sync URL param when tab changes
  useEffect(() => {
    if (!isMounted) return;
    const url = new URL(window.location);
    url.searchParams.set('vue', activeView);
    window.history.replaceState({}, '', url);
  }, [activeView, isMounted]);

  useEffect(() => {
    if (activeView === 'interactive' && isMounted) {
      setTimeout(() => {
        loadInteractiveMap();
      }, 100);
    }
    if (activeView === 'qrcodes' && isMounted) {
      setTimeout(() => {
        loadQrCodeMap();
      }, 100);
    }
    if (activeView === 'randonnees' && isMounted) {
      setTimeout(() => {
        loadRandonneesMap();
      }, 100);
    }
  }, [activeView, isMounted]);

  const loadInteractiveMap = async () => {
    const wrapper = document.querySelector('.interactive-map-wrapper');
    if (!wrapper) return;

    try {
      const [React, ReactDOM, { default: InteractiveMapClient }] = await Promise.all([
        import('react'),
        import('react-dom/client'),
        import('./InteractiveMapClient.jsx')
      ]);

      const props = {
        sejournerData: JSON.parse(wrapper.dataset.sejourner || '[]'),
        plagesData: JSON.parse(wrapper.dataset.plages || '[]'),
        artisanatData: JSON.parse(wrapper.dataset.artisanat || '[]'),
        evenementsData: JSON.parse(wrapper.dataset.evenements || '[]'),
        activitesNautiquesData: JSON.parse(wrapper.dataset.activitesNautiques || '[]'),
        randonneesData: JSON.parse(wrapper.dataset.randonnees || '[]'),
        sitesData: JSON.parse(wrapper.dataset.sites || '[]'),
      };

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

  const loadQrCodeMap = async () => {
    const wrapper = document.querySelector('.qrcode-map-wrapper');
    if (!wrapper) return;

    try {
      const [React, ReactDOM, { default: QrCodeMapClient }] = await Promise.all([
        import('react'),
        import('react-dom/client'),
        import('./QrCodeMapClient.jsx')
      ]);

      const props = {
        qrCodesData: JSON.parse(wrapper.dataset.qrCodes || '[]'),
      };

      let root = wrapper._reactRoot;
      if (!root) {
        root = ReactDOM.createRoot(wrapper);
        wrapper._reactRoot = root;
      }

      root.render(React.createElement(QrCodeMapClient, props));
    } catch (error) {
      console.error('Erreur lors du chargement de la carte QR:', error);
      wrapper.innerHTML = `
        <div class="flex items-center justify-center h-[600px] bg-red-50">
          <div class="text-center">
            <p class="text-red-600">Erreur lors du chargement de la carte</p>
          </div>
        </div>
      `;
    }
  };

  const loadRandonneesMap = async () => {
    const wrapper = document.querySelector('.randonnees-map-wrapper');
    if (!wrapper) return;

    try {
      const [React, ReactDOM, { default: RandonneesMapClient }] = await Promise.all([
        import('react'),
        import('react-dom/client'),
        import('./RandonneesMapClient.jsx')
      ]);

      const props = {
        randonneesData: JSON.parse(wrapper.dataset.randonnees || '[]'),
      };

      let root = wrapper._reactRoot;
      if (!root) {
        root = ReactDOM.createRoot(wrapper);
        wrapper._reactRoot = root;
      }

      root.render(React.createElement(RandonneesMapClient, props));
    } catch (error) {
      console.error('Erreur lors du chargement de la carte randonnées:', error);
      wrapper.innerHTML = `
        <div class="flex items-center justify-center h-[600px] bg-red-50">
          <div class="text-center">
            <p class="text-red-600">Erreur lors du chargement de la carte</p>
          </div>
        </div>
      `;
    }
  };

  const renderLoading = () => (
    <div className="flex items-center justify-center h-[600px] bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Cartes du territoire
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Découvrez le territoire de la Castagniccia-Casinca à travers nos cartes.
            </p>
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => setActiveView('static')}
              disabled={!isMounted}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${activeView === 'static'
                ? 'bg-gray-800 text-white shadow-lg ring-2 ring-gray-800 ring-offset-2'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } ${!isMounted ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
            >
              <FileImage size={18} />
              Carte statique
            </button>

            <button
              onClick={() => setActiveView('interactive')}
              disabled={!isMounted}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${activeView === 'interactive'
                ? 'bg-indigo-700 text-white shadow-lg ring-2 ring-indigo-700 ring-offset-2'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } ${!isMounted ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
            >
              <Map size={18} />
              Carte interactive
            </button>

            <button
              onClick={() => setActiveView('randonnees')}
              disabled={!isMounted}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${activeView === 'randonnees'
                ? 'bg-green-700 text-white shadow-lg ring-2 ring-green-700 ring-offset-2'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } ${!isMounted ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
            >
              <Mountain size={18} />
              Carte randonnées
            </button>
{/* 
            <button
              onClick={() => setActiveView('qrcodes')}
              disabled={!isMounted}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${activeView === 'qrcodes'
                ? 'bg-blue-700 text-white shadow-lg ring-2 ring-blue-700 ring-offset-2'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } ${!isMounted ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
            >
              <QrCode size={18} />
              Carte QR Codes
            </button> */}
          </div>
        </div>
      </div>

      {!activeView && (
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[600px]">
              {renderLoading()}
            </div>
          </div>
        </div>
      )}

      {activeView === 'static' && (
        <CarteStatique />
      )}

      {activeView === 'interactive' && (
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
                  data-sites={JSON.stringify(sitesData)}
                >
                  {renderLoading()}
                </div>
              ) : (
                renderLoading()
              )}
            </div>
          </div>
        </div>
      )}

      {activeView === 'randonnees' && (
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[600px]">
              {isMounted ? (
                <div
                  className="randonnees-map-wrapper"
                  data-randonnees={JSON.stringify(randonneesData)}
                >
                  {renderLoading()}
                </div>
              ) : (
                renderLoading()
              )}
            </div>
          </div>
        </div>
      )}

      {activeView === 'qrcodes' && (
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[600px]">
              {isMounted ? (
                <div
                  className="qrcode-map-wrapper"
                  data-qr-codes={JSON.stringify(qrCodesData)}
                >
                  {renderLoading()}
                </div>
              ) : (
                renderLoading()
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
