import React from 'react';
import { getImageUrl } from '../../utils/eventUtils';

const PlageCard = ({ plage }) => {
  // Fonction pour déterminer l'accès PMR
  const isPMRAccessible = (niveau) => {
    return niveau > 0;
  };

  // Fonction pour déterminer les équipements PMR selon le niveau
  const getPMREquipements = (niveau) => {
    const equipements = [];
    if (niveau >= 1) equipements.push('Tapis');
    if (niveau >= 2) equipements.push('Fauteuil');
    if (niveau >= 3) equipements.push('WC PMR');
    return equipements;
  };

  // Génération du slug pour l'URL
  const slug = plage.Nom.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={getImageUrl(plage.Image)} 
          alt={plage.Nom}
          className="w-full h-48 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          {isPMRAccessible(plage.Niveau) && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              ♿ PMR
            </span>
          )}
        </div>
        
        {/* Niveau PMR */}
        {isPMRAccessible(plage.Niveau) && (
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
            Niveau {plage.Niveau}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
            {plage.Nom}
          </h3>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            <span>{plage.commune?.Nom}</span>
          </div>
          {plage.Coordonnees && (
            <div className="flex items-center">
              <span className="mr-2">🗺️</span>
              <span>GPS</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {plage.Description}
        </p>
        
        {/* Informations PMR */}
        {isPMRAccessible(plage.Niveau) && (
          <div className="mb-3">
            <div className="flex items-center text-blue-600 text-xs mb-1">
              <span className="mr-1">♿</span>
              <span>Accès PMR disponible</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {getPMREquipements(plage.Niveau).map((equipement, index) => (
                <span 
                  key={index}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                >
                  {equipement}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Boutons */}
        <div className="flex justify-between items-center mt-4">
          <a 
            href={`/plages/${slug}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Voir plus
          </a>
          
          {plage.Coordonnees && (
            <a 
              href={`https://maps.google.com/maps?q=${plage.Coordonnees.lat},${plage.Coordonnees.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              🗺️
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlageCard;
