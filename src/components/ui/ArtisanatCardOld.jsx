import React from 'react';

const ArtisanatCard = ({ artisan }) => {
  // const getTypeIcon = (type) => {
  //   switch (type) {
  //     case 'producteur':
  //       return '🌾';
  //     case 'artisan':
  //       return '🛠️';
  //     default:
  //       return '🏪';
  //   }
  // };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'producteur':
        return 'Producteur';
      case 'artisan':
        return 'Artisan';
      default:
        return type;
    }
  };

  const getCategorieIcon = (categorie) => {
    switch (categorie) {
      case 'miel':
        return '🍯';
      case 'charcuterie':
        return '';
      case 'fromage':
        return '🧀';
      case 'spiritueux':
        return '🍷';
      case 'poterie':
        return '🏺';
      case 'bijouterie':
        return '💍';
      case 'textile':
        return '🧵';
      case 'bois':
        return '🪵';
      default:
        return '🛒';
    }
  };

  const getCategorieLabel = (categorie) => {
    switch (categorie) {
      case 'miel':
        return 'Miel & Apiculture';
      case 'charcuterie':
        return 'Charcuterie';
      case 'fromage':
        return 'Fromages';
      case 'spiritueux':
        return 'Spiritueux';
      case 'poterie':
        return 'Poterie';
      case 'bijouterie':
        return 'Bijouterie';
      case 'textile':
        return 'Textile';
      case 'bois':
        return 'Travail du bois';
      default:
        return categorie;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={artisan.image} 
          alt={artisan.nom}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          {/* <span className="text-lg">{getTypeIcon(artisan.type)}</span> */}
          <span className="text-sm font-medium text-gray-700">{getTypeLabel(artisan.type)}</span>
        </div>
        <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full px-3 py-1 flex items-center space-x-1">
          <span className="text-sm">{getCategorieIcon(artisan.categorie)}</span>
          <span className="text-xs font-medium">{getCategorieLabel(artisan.categorie)}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
            {artisan.nom}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-medium text-gray-600">
              {artisan.note}
            </span>
            <span className="text-xs text-gray-500">
              ({artisan.nombreAvis})
            </span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="mr-2">📍</span>
          <span>{artisan.commune}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {artisan.description}
        </p>
        
        {/* Spécialités */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {artisan.specialites.slice(0, 2).map((specialite, index) => (
              <span 
                key={index}
                className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium"
              >
                {specialite}
              </span>
            ))}
            {artisan.specialites.length > 2 && (
              <span className="text-xs text-orange-600">
                +{artisan.specialites.length - 2} autres
              </span>
            )}
          </div>
        </div>
        
        {/* Labels */}
        {artisan.labels && artisan.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {artisan.labels.slice(0, 2).map((label, index) => (
              <span 
                key={index}
                className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
              >
                {label}
              </span>
            ))}
            {artisan.labels.length > 2 && (
              <span className="text-xs text-green-600">
                +{artisan.labels.length - 2} labels
              </span>
            )}
          </div>
        )}
        
        {/* Services principaux */}
        <div className="flex flex-wrap gap-1 mb-3">
          {artisan.services.slice(0, 3).map((service, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {service}
            </span>
          ))}
          {artisan.services.length > 3 && (
            <span className="text-xs text-gray-500">
              +{artisan.services.length - 3} services
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">
              {artisan.horaires ? artisan.horaires.split(',')[0] : 'Voir horaires'}
            </span>
            <span className="text-xs text-gray-500">
              {artisan.saisonOptimale}
            </span>
          </div>
          
          <a 
            href={`/artisanat/${artisan.slug}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Voir détails
          </a>
        </div>
        
        {/* Contact */}
        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            {artisan.telephone && (
              <a 
                href={`tel:${artisan.telephone}`}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                📞 Appeler
              </a>
            )}
            {artisan.siteweb && (
              <a 
                href={artisan.siteweb}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 flex items-center"
              >
                🌐 Site web
              </a>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            {Object.keys(artisan.reseauxSociaux || {}).map((reseau) => (
              <a
                key={reseau}
                href={`https://${reseau}.com/${artisan.reseauxSociaux[reseau]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600"
              >
                {reseau === 'facebook' && '📘'}
                {reseau === 'instagram' && '📷'}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanatCard;
