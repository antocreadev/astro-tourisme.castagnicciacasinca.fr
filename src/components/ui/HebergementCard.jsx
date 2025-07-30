import React from 'react';

const HebergementCard = ({ hebergement }) => {
  // const getTypeIcon = (type) => {
  //   switch (type) {
  //     case 'hotel':
  //       return '🏨';
  //     case 'auberge':
  //       return '🏡';
  //     case 'camping':
  //       return '🏕️';
  //     case 'residence':
  //       return '🏢';
  //     case 'village-vacances':
  //       return '🏖️';
  //     default:
  //       return '🏠';
  //   }
  // };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'hotel':
        return 'Hôtel';
      case 'auberge':
        return 'Auberge';
      case 'camping':
        return 'Camping';
      case 'residence':
        return 'Résidence';
      case 'village-vacances':
        return 'Village vacances';
      default:
        return type;
    }
  };

  const getPrixRange = () => {
    const [min, max] = hebergement.prix.split('-');
    return max ? `${min}-${max}€` : `à partir de ${min}€`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={hebergement.image} 
          alt={hebergement.nom}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          {/* <span className="text-lg">{getTypeIcon(hebergement.type)}</span> */}
          <span className="text-sm font-medium text-gray-700">{getTypeLabel(hebergement.type)}</span>
        </div>
        {hebergement.labelQualite && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {hebergement.labelQualite}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
            {hebergement.nom}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-medium text-gray-600">
              {hebergement.note}
            </span>
            <span className="text-xs text-gray-500">
              ({hebergement.nombreAvis})
            </span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="mr-2">📍</span>
          <span>{hebergement.commune}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {hebergement.description}
        </p>
        
        {/* Services principaux */}
        <div className="flex flex-wrap gap-1 mb-3">
          {hebergement.services.slice(0, 3).map((service, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {service}
            </span>
          ))}
          {hebergement.services.length > 3 && (
            <span className="text-xs text-gray-500">
              +{hebergement.services.length - 3} autres
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-blue-600">
              {getPrixRange()}
            </span>
            <span className="text-xs text-gray-500">par nuit</span>
          </div>
          
          <a 
            href={`/hebergements/${hebergement.slug}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Voir détails
          </a>
        </div>
        
        {/* Informations complémentaires */}
        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <span>{hebergement.capacite}</span>
          <span>{hebergement.periodeOuverture}</span>
        </div>
      </div>
    </div>
  );
};

export default HebergementCard;
