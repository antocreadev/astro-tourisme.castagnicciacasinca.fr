import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ImageOverlay } from 'react-leaflet';
import { Hotel, Waves, Palette, Calendar, Sailboat, Mountain, UtensilsCrossed } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fonction pour générer l'URL de la page de détail
const getDetailUrl = (type, item) => {
  const baseUrls = {
    hebergements: '/sejourner',
    restaurants: '/sejourner',
    plages: '/plages',
    artisanat: '/artisanat',
    evenements: '/agenda',
    activitesNautiques: '/activite-nautique',
    randonnees: '/randonnee'
  };
  
  const baseUrl = baseUrls[type];
  if (!baseUrl) return null;
  
  let slug;
  
  // Logique différente selon le type
  switch (type) {
    case 'hebergements':
    case 'restaurants':
    case 'evenements':
      // Ces catégories utilisent documentId
      slug = item.documentId;
      break;
      
    case 'plages':
      // Utilise Nom transformé
      if (!item.Nom) return null;
      slug = item.Nom
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      break;
      
    case 'artisanat':
      // Utilise Titre transformé
      if (!item.Titre) return null;
      slug = item.Titre
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      break;
      
    case 'activitesNautiques':
    case 'randonnees':
      // Utilisent Nom transformé
      if (!item.Nom) return null;
      slug = item.Nom
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      break;
      
    default:
      return null;
  }
  
  if (!slug) return null;
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

// Fonction pour déterminer si un séjourner est un restaurant ou un hébergement
const getSejournerType = (item) => {
  if (!item.type_sejourner || !item.type_sejourner.Denomination) {
    return 'hebergements'; // Par défaut, considérer comme hébergement
  }
  
  const denomination = item.type_sejourner.Denomination.toLowerCase();
  
  // Mots clés pour identifier les restaurants
  const restaurantKeywords = [
    'restaurant', 'resto', 'bistrot', 'brasserie', 'pizzeria', 
    'auberge', 'taverne', 'trattoria', 'osteria', 'café', 
    'bar', 'snack', 'glacier'
  ];
  
  const isRestaurant = restaurantKeywords.some(keyword => 
    denomination.includes(keyword)
  );
  
  return isRestaurant ? 'restaurants' : 'hebergements';
};

// Types de marqueurs avec leurs couleurs et icônes
const MARKER_TYPES = {
  hebergements: {
    color: '#e74c3c',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hotel-icon lucide-hotel"><path d="M10 22v-6.57"/><path d="M12 11h.01"/><path d="M12 7h.01"/><path d="M14 15.43V22"/><path d="M15 16a5 5 0 0 0-6 0"/><path d="M16 11h.01"/><path d="M16 7h.01"/><path d="M8 11h.01"/><path d="M8 7h.01"/><rect x="4" y="2" width="16" height="20" rx="2"/></svg>',
    icon: Hotel,
    label: 'Hébergements'
  },
  restaurants: {
    color: '#e6de10',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils-crossed-icon lucide-utensils-crossed"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/></svg>',
    icon: UtensilsCrossed,
    label: 'Restaurants'
  },
  plages: {
    color: '#3498db',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waves-icon lucide-waves"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>',
    icon: Waves,
    label: 'Plages'
  },
  artisanat: {
    color: '#f39c12',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette-icon lucide-palette"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>',
    icon: Palette,
    label: 'Artisanat'
  },
  evenements: {
    color: '#9b59b6',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
    icon: Calendar,
    label: 'Événements'
  },
  activitesNautiques: {
    color: '#1abc9c',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sailboat-icon lucide-sailboat"><path d="M10 2v15"/><path d="M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z"/><path d="M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z"/></svg>',
    icon: Sailboat,
    label: 'Activités Nautiques'
  },
  randonnees: {
    color: '#27ae60',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mountain-icon lucide-mountain"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>',
    icon: Mountain,
    label: 'Randonnées'
  }
};

// Fonction helper pour rendre les icônes dans les popups
const renderMarkerIcon = (type, size = 18) => {
  const IconComponent = MARKER_TYPES[type].icon;
  return React.createElement(IconComponent, { size });
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
        color: white;
      ">
        ${isCluster ? count : markerInfo.iconSvg}
        ${isCluster ? `<div style="position: absolute; top: -5px; right: -5px; background: #fff; color: ${markerInfo.color}; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; border: 2px solid ${markerInfo.color};">${markerInfo.iconSvg}</div>` : ''}
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
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
                    style={{ backgroundColor: info.color, color: 'white' }}
                  >
                    {renderMarkerIcon(key, 14)}
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
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
              style={{ backgroundColor: info.color, color: 'white' }}
            >
              {renderMarkerIcon(key, 14)}
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
  // Debug: afficher les données reçues
  console.log('InteractiveMap - Données reçues:', {
    sejourner: sejournerData?.length || 0,
    plages: plagesData?.length || 0,
    artisanat: artisanatData?.length || 0,
    evenements: evenementsData?.length || 0,
    activitesNautiques: activitesNautiquesData?.length || 0,
    randonnees: randonneesData?.length || 0
  });
  
  // Séparer les séjourners en hébergements et restaurants
  const hebergementsData = sejournerData?.filter(item => getSejournerType(item) === 'hebergements') || [];
  const restaurantsData = sejournerData?.filter(item => getSejournerType(item) === 'restaurants') || [];
  
  console.log('Séparation séjourners:', {
    hebergements: hebergementsData.length,
    restaurants: restaurantsData.length,
    total: sejournerData?.length || 0
  });
  
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

  // Fonction utilitaire pour extraire les coordonnées selon le type d'objet
  const getCoordinates = (item, type) => {
    let coords = null;
    
    switch (type) {
      case 'hebergements':
      case 'restaurants':
      case 'plages':
      case 'artisanat':
      case 'evenements':
        coords = item.Coordonnees; // Majuscule
        break;
      
      case 'activitesNautiques':
        // Les activités nautiques utilisent soit coordinates directement, soit plage.Coordonnees
        if (item.coordinates) {
          coords = item.coordinates;
        } else if (item.plage?.Coordonnees) {
          coords = item.plage.Coordonnees;
        }
        break;
      
      case 'randonnees':
        // Les randonnées utilisent depart ou coordonnees de la commune
        if (item.depart) {
          coords = item.depart;
        } else if (item.coordonnees) {
          coords = item.coordonnees;
        } else if (item.commune?.coordonnees) {
          coords = item.commune.coordonnees;
        } else {
          // Fallback: coordonnées approximatives basées sur la commune
          coords = getCommuneCoordinates(item.commune?.Nom);
        }
        break;
      
      default:
        break;
    }
    
    // Debug: afficher les coordonnées trouvées ou non
    if (!coords && item) {
      console.log(`Aucune coordonnée trouvée pour ${type}:`, item);
    }
    
    return coords;
  };

  // Hébergements
  if (visibleCategories.hebergements && hebergementsData && Array.isArray(hebergementsData)) {
    hebergementsData.forEach(item => {
      const coords = getCoordinates(item, 'hebergements');
      if (coords && coords.lat && coords.lng) {
        allMarkers.push({
          id: `hebergement-${item.id}`,
          position: [coords.lat, coords.lng],
          type: 'hebergements',
          title: item.Titre,
          detailUrl: getDetailUrl('hebergements', item),
          originalItem: item
        });
      }
    });
  }

  // Restaurants
  if (visibleCategories.restaurants && restaurantsData && Array.isArray(restaurantsData)) {
    restaurantsData.forEach(item => {
      const coords = getCoordinates(item, 'restaurants');
      if (coords && coords.lat && coords.lng) {
        allMarkers.push({
          id: `restaurant-${item.id}`,
          position: [coords.lat, coords.lng],
          type: 'restaurants',
          title: item.Titre,
          detailUrl: getDetailUrl('restaurants', item),
          originalItem: item
        });
      }
    });
  }

  // Plages
  if (visibleCategories.plages && plagesData && Array.isArray(plagesData)) {
    plagesData.forEach(item => {
      const coords = getCoordinates(item, 'plages');
      if (coords && coords.lat && coords.lng) {
        allMarkers.push({
          id: `plage-${item.id}`,
          position: [coords.lat, coords.lng],
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
      const coords = getCoordinates(item, 'artisanat');
      if (coords && coords.lat && coords.lng) {
        allMarkers.push({
          id: `artisanat-${item.id}`,
          position: [coords.lat, coords.lng],
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
      const coords = getCoordinates(item, 'evenements');
      if (coords && coords.lat && coords.lng) {
        allMarkers.push({
          id: `evenement-${item.id}`,
          position: [coords.lat, coords.lng],
          type: 'evenements',
          title: item.Nom,
          detailUrl: getDetailUrl('evenements', item),
          originalItem: item
        });
      }
    });
  }

  // Activités Nautiques
  if (visibleCategories.activitesNautiques && activitesNautiquesData && Array.isArray(activitesNautiquesData)) {
    activitesNautiquesData.forEach(item => {
      const coords = getCoordinates(item, 'activitesNautiques');
      if (coords && coords.lat && coords.lng) {
        allMarkers.push({
          id: `activite-nautique-${item.id}`,
          position: [coords.lat, coords.lng],
          type: 'activitesNautiques',
          title: item.Nom || item.title,
          detailUrl: getDetailUrl('activitesNautiques', item),
          originalItem: item
        });
      }
    });
  }

  // Randonnées
  if (visibleCategories.randonnees && randonneesData && Array.isArray(randonneesData)) {
    randonneesData.forEach(item => {
      const coords = getCoordinates(item, 'randonnees');
      if (coords && coords.lat && coords.lng) {
        allMarkers.push({
          id: `randonnee-${item.id}`,
          position: [coords.lat, coords.lng],
          type: 'randonnees',
          title: item.Nom,
          detailUrl: getDetailUrl('randonnees', item),
          originalItem: item
        });
      }
    });
  }

  // Grouper les marqueurs par position pour gérer les doublons
  const markerGroups = groupMarkersByPosition(allMarkers);

  // Debug: afficher le nombre total de marqueurs
  console.log(`Total de marqueurs créés: ${allMarkers.length}`);
  console.log('Marqueurs par catégorie:', {
    hebergements: allMarkers.filter(m => m.type === 'hebergements').length,
    restaurants: allMarkers.filter(m => m.type === 'restaurants').length,
    plages: allMarkers.filter(m => m.type === 'plages').length,
    artisanat: allMarkers.filter(m => m.type === 'artisanat').length,
    evenements: allMarkers.filter(m => m.type === 'evenements').length,
    activitesNautiques: allMarkers.filter(m => m.type === 'activitesNautiques').length,
    randonnees: allMarkers.filter(m => m.type === 'randonnees').length
  });

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
                        <div className="flex-shrink-0" style={{ color: MARKER_TYPES[marker.type].color }}>
                          {renderMarkerIcon(marker.type, 18)}
                        </div>
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
