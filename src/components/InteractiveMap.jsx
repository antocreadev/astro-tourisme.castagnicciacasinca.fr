import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fonction pour générer l'URL de la page de détail
const getDetailUrl = (type, item) => {
  const baseUrls = {
    sejourner: '/sejourner',
    plages: '/plages',
    artisanat: '/artisanat',
    evenements: '/agenda',
    activitesNautiques: '/activite-nautique',
    randonnees: '/randonnee'
  };
  
  const baseUrl = baseUrls[type];
  if (!baseUrl) return null;
  
  // Utiliser documentId ou slug selon la structure des données
  const slug = item.documentId || item.slug || item.id;
  return `${baseUrl}/${slug}`;
};

// Fonction pour obtenir les coordonnées approximatives des communes
const getCommuneCoordinates = (communeName) => {
  // Coordonnées approximatives des principales communes de Castagniccia-Casinca
  const communeCoords = {
    'Vescovato': [42.5, 9.45],
    'Venzolasca': [42.48, 9.43],
    'Penta-di-Casinca': [42.47, 9.52],
    'Loreto-di-Casinca': [42.45, 9.51],
    'Folelli': [42.46, 9.48],
    'Sorbo-Ocagnano': [42.44, 9.49],
    'Castellare-di-Casinca': [42.43, 9.47],
    'Casinca': [42.45, 9.50],
    'Campile': [42.42, 9.41],
    'Orezza': [42.38, 9.35],
    'Piedicroce': [42.36, 9.33],
    'Morosaglia': [42.42, 9.28],
    'Valle-di-Rostino': [42.43, 9.30],
    'Pastoreccia-di-Rostino': [42.44, 9.29],
    'Castello-di-Rostino': [42.45, 9.31],
    'Pie-d\'Orezza': [42.39, 9.34],
    'Stazzona': [42.37, 9.32],
    'Nocario': [42.35, 9.36],
    'Croce': [42.41, 9.37],
    'Valle-d\'Orezza': [42.40, 9.33]
  };
  
  return communeCoords[communeName] || null;
};

// Types de marqueurs avec leurs couleurs et icônes
const MARKER_TYPES = {
  sejourner: {
    color: '#e74c3c',
    icon: '🏨',
    label: 'Hébergements'
  },
  plages: {
    color: '#3498db',
    icon: '🏖️',
    label: 'Plages'
  },
  artisanat: {
    color: '#f39c12',
    icon: '🎨',
    label: 'Artisanat'
  },
  evenements: {
    color: '#9b59b6',
    icon: '🎭',
    label: 'Événements'
  },
  activitesNautiques: {
    color: '#1abc9c',
    icon: '⛵',
    label: 'Activités Nautiques'
  },
  randonnees: {
    color: '#27ae60',
    icon: '🥾',
    label: 'Randonnées'
  }
};

// Créer une icône personnalisée pour chaque type
const createCustomIcon = (type, count = 1) => {
  const markerInfo = MARKER_TYPES[type];
  const isCluster = count > 1;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${markerInfo.color};
        width: ${isCluster ? '45px' : '35px'};
        height: ${isCluster ? '45px' : '35px'};
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${isCluster ? '14px' : '16px'};
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        position: relative;
      ">
        ${isCluster ? count : markerInfo.icon}
        ${isCluster ? `<div style="position: absolute; top: -5px; right: -5px; background: #fff; color: ${markerInfo.color}; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; border: 2px solid ${markerInfo.color};">${markerInfo.icon}</div>` : ''}
      </div>
    `,
    iconSize: [isCluster ? 45 : 35, isCluster ? 45 : 35],
    iconAnchor: [isCluster ? 22 : 17, isCluster ? 45 : 35],
    popupAnchor: [0, isCluster ? -45 : -35]
  });
};

// Fonction pour grouper les marqueurs par position
const groupMarkersByPosition = (markers) => {
  const groups = {};
  
  markers.forEach(marker => {
    const key = `${marker.position[0].toFixed(4)}-${marker.position[1].toFixed(4)}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(marker);
  });
  
  return Object.values(groups);
};

// Composant pour limiter les bounds de la carte
const MapBounds = () => {
  const map = useMap();
  
  useEffect(() => {
    // Définir les limites de la région Castagniccia-Casinca
    const bounds = L.latLngBounds(
      [42.25, 9.15], // Sud-Ouest
      [42.65, 9.65]  // Nord-Est
    );
    
    map.setMaxBounds(bounds);
    map.on('drag', () => {
      map.panInsideBounds(bounds, { animate: false });
    });
    
    // Limiter les niveaux de zoom
    map.setMinZoom(9);
    map.setMaxZoom(16);
    
    return () => {
      map.off('drag');
    };
  }, [map]);
  
  return null;
};
// Composant pour contrôler le zoom avec un style plus moderne
const ZoomControl = ({ onZoomChange, currentZoom }) => {
  const map = useMap();

  useEffect(() => {
    const handleZoom = () => {
      onZoomChange(map.getZoom());
    };

    map.on('zoomend', handleZoom);
    return () => map.off('zoomend', handleZoom);
  }, [map, onZoomChange]);

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white text-gray-700 hover:bg-gray-50 hover:text-black flex items-center justify-center text-lg font-bold border-b border-gray-200 transition-colors"
          title="Zoomer"
        >
          +
        </button>
        <div className="w-10 h-8 bg-gray-50 text-center text-xs font-medium flex items-center justify-center text-gray-600">
          {Math.round(currentZoom)}
        </div>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white text-gray-700 hover:bg-gray-50 hover:text-black flex items-center justify-center text-lg font-bold border-t border-gray-200 transition-colors"
          title="Dézoomer"
        >
          -
        </button>
      </div>
    </div>
  );
};

// Composant pour les filtres de catégories
const CategoryFilter = ({ visibleCategories, onToggleCategory, onToggleBackgroundImage, setVisibleCategories, visibleMarkers }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (isMobile) {
    return (
      <div className="absolute top-4 left-4 z-[1000]">
        {/* Bouton pour mobile */}
        <button
          onClick={toggleExpanded}
          className="bg-white rounded-xl shadow-lg p-3 border border-gray-200 flex items-center gap-2"
        >
          <span className="text-xl">🗺️</span>
          <span className="font-medium text-sm">Filtres</span>
          <span className="text-sm text-gray-500">
            {isExpanded ? '▼' : '▶'}
          </span>
        </button>

        {/* Panel des filtres pour mobile */}
        {isExpanded && (
          <div className="absolute top-14 left-0 bg-white rounded-xl shadow-lg p-4 w-72 max-w-[calc(100vw-2rem)] border border-gray-200">
            <div className="space-y-3">
              {Object.entries(MARKER_TYPES).map(([key, info]) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={visibleCategories[key]}
                    onChange={() => onToggleCategory(key)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-sm font-medium"
                    style={{ backgroundColor: info.color }}
                  >
                    {info.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 flex-1">
                    {info.label}
                  </span>
                </label>
              ))}
            </div>
            
            {/* Compteur de marqueurs */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-medium text-blue-800 text-center">
                {visibleMarkers} point{visibleMarkers > 1 ? 's' : ''} d'intérêt affiché{visibleMarkers > 1 ? 's' : ''}
              </p>
            </div>
            
            {/* Bouton pour tout afficher/masquer */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => {
                  const allVisible = Object.values(visibleCategories).every(v => v);
                  setVisibleCategories(
                    Object.keys(MARKER_TYPES).reduce((acc, key) => {
                      acc[key] = !allVisible;
                      return acc;
                    }, {})
                  );
                }}
                className="w-full text-xs font-medium text-gray-600 hover:text-gray-800 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {Object.values(visibleCategories).every(v => v) ? 'Tout masquer' : 'Tout afficher'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Version desktop (toujours expandée)
  return (
    <div className="absolute top-4 left-4 z-[1000] category-filter rounded-xl shadow-lg p-4 max-w-xs border border-gray-200">
      <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
        <span className="text-xl">🗺️</span>
        Filtres
      </h3>
      
      <div className="space-y-3">
        {Object.entries(MARKER_TYPES).map(([key, info]) => (
          <label key={key} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={visibleCategories[key]}
              onChange={() => onToggleCategory(key)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-sm font-medium"
              style={{ backgroundColor: info.color }}
            >
              {info.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 flex-1">
              {info.label}
            </span>
          </label>
        ))}
      </div>
      
      {/* Compteur de marqueurs */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs font-medium text-blue-800 text-center">
          {visibleMarkers} point{visibleMarkers > 1 ? 's' : ''} d'intérêt affiché{visibleMarkers > 1 ? 's' : ''}
        </p>
      </div>
      
      {/* Bouton pour tout afficher/masquer */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <button
          onClick={() => {
            const allVisible = Object.values(visibleCategories).every(v => v);
            setVisibleCategories(
              Object.keys(MARKER_TYPES).reduce((acc, key) => {
                acc[key] = !allVisible;
                return acc;
              }, {})
            );
          }}
          className="w-full text-xs font-medium text-gray-600 hover:text-gray-800 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {Object.values(visibleCategories).every(v => v) ? 'Tout masquer' : 'Tout afficher'}
        </button>
      </div>
    </div>
  );
};

// Composant principal de la carte
const InteractiveMap = ({ 
  sejournerData, 
  plagesData, 
  artisanatData, 
  evenementsData,
  activitesNautiquesData,
  randonneesData
}) => {
  const [currentZoom, setCurrentZoom] = useState(11);
  const [visibleCategories, setVisibleCategories] = useState(
    Object.keys(MARKER_TYPES).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {})
  );

  // Centre de la carte (Castagniccia-Casinca)
  const mapCenter = [42.4, 9.4];

  const handleToggleCategory = (category) => {
    setVisibleCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Préparer les marqueurs pour chaque catégorie
  const allMarkers = [];

  // Séjourner (Hébergements)
  if (visibleCategories.sejourner && sejournerData && Array.isArray(sejournerData)) {
    sejournerData.forEach(item => {
      if (item.Coordonnees) {
        allMarkers.push({
          id: `sejourner-${item.id}`,
          position: [item.Coordonnees.lat, item.Coordonnees.lng],
          type: 'sejourner',
          title: item.Titre,
          detailUrl: getDetailUrl('sejourner', item),
          originalItem: item
        });
      }
    });
  }

  // Plages
  if (visibleCategories.plages && plagesData && Array.isArray(plagesData)) {
    plagesData.forEach(item => {
      if (item.Coordonnees) {
        allMarkers.push({
          id: `plage-${item.id}`,
          position: [item.Coordonnees.lat, item.Coordonnees.lng],
          type: 'plages',
          title: item.Nom,
          detailUrl: getDetailUrl('plages', item),
          originalItem: item
        });
      }
    });
  }

  // Artisanat
  if (visibleCategories.artisanat && artisanatData && Array.isArray(artisanatData)) {
    artisanatData.forEach(item => {
      if (item.Coordonnees) {
        allMarkers.push({
          id: `artisanat-${item.id}`,
          position: [item.Coordonnees.lat, item.Coordonnees.lng],
          type: 'artisanat',
          title: item.Titre,
          detailUrl: getDetailUrl('artisanat', item),
          originalItem: item
        });
      }
    });
  }

  // Événements
  if (visibleCategories.evenements && evenementsData && Array.isArray(evenementsData)) {
    evenementsData.forEach(item => {
      if (item.Coordonnees) {
        allMarkers.push({
          id: `evenement-${item.id}`,
          position: [item.Coordonnees.lat, item.Coordonnees.lng],
          type: 'evenements',
          title: item.Nom,
          detailUrl: getDetailUrl('evenements', item),
          originalItem: item
        });
      }
    });
  }

  // Activités Nautiques (utiliser les coordonnées de la plage associée)
  if (visibleCategories.activitesNautiques && activitesNautiquesData && Array.isArray(activitesNautiquesData)) {
    activitesNautiquesData.forEach(item => {
      if (item.plage?.Coordonnees) {
        allMarkers.push({
          id: `activite-nautique-${item.id}`,
          position: [item.plage.Coordonnees.lat, item.plage.Coordonnees.lng],
          type: 'activitesNautiques',
          title: item.Nom,
          detailUrl: getDetailUrl('activitesNautiques', item),
          originalItem: item
        });
      }
    });
  }

  // Randonnées (utiliser les coordonnées de la commune si disponibles)
  if (visibleCategories.randonnees && randonneesData && Array.isArray(randonneesData)) {
    randonneesData.forEach(item => {
      // Note: Les randonnées n'ont pas de coordonnées directes dans le type
      // Il faudrait ajouter des coordonnées dans l'API ou utiliser celles de la commune
      // Pour l'instant, on les ignore ou on peut utiliser des coordonnées par défaut de la commune
      if (item.commune) {
        // Coordonnées approximatives basées sur la commune (à ajuster selon vos besoins)
        const communeCoords = getCommuneCoordinates(item.commune.Nom);
        if (communeCoords) {
          allMarkers.push({
            id: `randonnee-${item.id}`,
            position: communeCoords,
            type: 'randonnees',
            title: item.Nom,
            detailUrl: getDetailUrl('randonnees', item),
            originalItem: item
          });
        }
      }
    });
  }

  // Grouper les marqueurs par position pour gérer les doublons
  const markerGroups = groupMarkersByPosition(allMarkers);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={mapCenter}
        zoom={currentZoom}
        className="w-full h-full"
        zoomControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        {/* Couche de tuiles OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Composant pour limiter les bounds */}
        <MapBounds />

        {/* Marqueurs groupés */}
        {markerGroups.map((group, groupIndex) => {
          const primaryMarker = group[0];
          const isCluster = group.length > 1;
          
          return (
            <Marker
              key={`group-${groupIndex}`}
              position={primaryMarker.position}
              icon={createCustomIcon(primaryMarker.type, group.length)}
            >
              <Popup className="custom-popup" maxWidth={280}>
                <div className="p-2 min-w-[200px]">
                  {group.map((marker, index) => (
                    <div key={marker.id} className={`${index > 0 ? 'border-t border-gray-200 pt-2 mt-2' : ''}`}>
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-lg flex-shrink-0" style={{ color: MARKER_TYPES[marker.type].color }}>
                          {MARKER_TYPES[marker.type].icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm leading-tight mb-1" style={{ color: MARKER_TYPES[marker.type].color }}>
                            {marker.title}
                          </h3>
                          {marker.detailUrl && (
                            <a 
                              href={marker.detailUrl}
                              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span>En savoir plus</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Contrôles de zoom personnalisés */}
        <ZoomControl onZoomChange={setCurrentZoom} currentZoom={currentZoom} />
      </MapContainer>

      {/* Filtres de catégories */}
      <CategoryFilter
        visibleCategories={visibleCategories}
        onToggleCategory={handleToggleCategory}
        setVisibleCategories={setVisibleCategories}
        visibleMarkers={allMarkers.length}
      />
    </div>
  );
};

export default InteractiveMap;
