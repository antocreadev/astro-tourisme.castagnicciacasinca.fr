import React from 'react';

const PlageCard = ({ plage }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'sable':
        return '🏖️';
      case 'galets':
        return '🪨';
      case 'mixte':
        return '🏝️';
      default:
        return '🌊';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'sable':
        return 'Sable';
      case 'galets':
        return 'Galets';
      case 'mixte':
        return 'Mixte';
      default:
        return type;
    }
  };

  const getAccessColor = (acces) => {
    switch (acces) {
      case 'Très facile':
        return 'bg-green-100 text-green-800';
      case 'Facile':
        return 'bg-blue-100 text-blue-800';
      case 'Modéré':
        return 'bg-yellow-100 text-yellow-800';
      case 'Difficile':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={plage.image} 
          alt={plage.nom}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <span className="text-lg">{getTypeIcon(plage.type)}</span>
          <span className="text-sm font-medium text-gray-700">{getTypeLabel(plage.type)}</span>
        </div>
        <div className="absolute top-3 right-3 flex flex-col space-y-1">
          {plage.drapeauBleu && (
            <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              🏴 Drapeau Bleu
            </div>
          )}
          <div className={`text-xs px-2 py-1 rounded-full ${getAccessColor(plage.acces)}`}>
            {plage.acces}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
            {plage.nom}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-medium text-gray-600">
              {plage.note}
            </span>
            <span className="text-xs text-gray-500">
              ({plage.nombreAvis})
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            <span>{plage.commune}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">📏</span>
            <span>{plage.longueur}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {plage.description}
        </p>
        
        {/* Informations eau et temps */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="flex items-center text-blue-600">
            <span className="mr-1">💧</span>
            <span>{plage.qualiteEau}</span>
          </div>
          <div className="flex items-center text-orange-600">
            <span className="mr-1">🌡️</span>
            <span>{plage.temperatureEau}</span>
          </div>
        </div>
        
        {/* Services principaux */}
        <div className="flex flex-wrap gap-1 mb-3">
          {plage.services.slice(0, 3).map((service, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {service}
            </span>
          ))}
          {plage.services.length > 3 && (
            <span className="text-xs text-gray-500">
              +{plage.services.length - 3} autres
            </span>
          )}
        </div>
        
        {/* Activités principales */}
        <div className="flex flex-wrap gap-1 mb-3">
          {plage.activites.slice(0, 3).map((activite, index) => (
            <span 
              key={index}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
            >
              {activite}
            </span>
          ))}
          {plage.activites.length > 3 && (
            <span className="text-xs text-blue-500">
              +{plage.activites.length - 3} activités
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center text-gray-600">
              <span className="mr-1">🅿️</span>
              <span>{plage.parking}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-1">🐕</span>
              <span className="text-xs">
                {plage.animaux.includes('Autorisés') ? '✓' : '✗'}
              </span>
            </div>
          </div>
          
          <a 
            href={`/plages/${plage.slug}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Voir détails
          </a>
        </div>
        
        {/* Période optimale */}
        <div className="mt-3 pt-3 border-t border-gray-200 text-center">
          <span className="text-xs text-gray-500">
            Période optimale: {plage.periodeOptimale}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlageCard;
