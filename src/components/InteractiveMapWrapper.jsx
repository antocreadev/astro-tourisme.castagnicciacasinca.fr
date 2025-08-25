import React, { useState, useEffect } from 'react';

const InteractiveMapWrapper = (props) => {
  const [MapComponent, setMapComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Import dynamique du composant InteractiveMap seulement côté client
    const loadMapComponent = async () => {
      try {
        // Import des dépendances Leaflet
        await import('leaflet/dist/leaflet.css');
        
        // Import du composant InteractiveMap
        const { default: InteractiveMapComponent } = await import('./InteractiveMapClient.jsx');
        setMapComponent(() => InteractiveMapComponent);
      } catch (error) {
        console.error('Erreur lors du chargement de la carte:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      loadMapComponent();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading || !MapComponent) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  return <MapComponent {...props} />;
};

export default InteractiveMapWrapper;
