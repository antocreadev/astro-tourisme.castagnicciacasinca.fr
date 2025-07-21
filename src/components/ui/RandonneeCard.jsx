import React from 'react';
import { getImageUrl } from '../../utils/eventUtils';
import { Clock, MapPin, TrendingUp, Users, Camera } from 'lucide-react';

const RandonneeCard = ({ randonnee }) => {
  // Génération du slug pour l'URL
  const slug = randonnee.Nom?.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'randonnee';

  // Icône par difficulté
  const getDifficulteColor = (difficulte) => {
    switch (difficulte?.toLowerCase()) {
      case 'facile':
        return 'bg-green-100 text-green-800';
      case 'moyen':
      case 'moyenne':
        return 'bg-yellow-100 text-yellow-800';
      case 'difficile':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image */}
      <div className="relative">
        {randonnee.image ? (
          <img 
            src={getImageUrl(randonnee.image)} 
            alt={randonnee.Nom}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center">
            <span className="text-6xl">🥾</span>
          </div>
        )}
        
        {/* Badge difficulté */}
        {randonnee.Difficulte && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getDifficulteColor(randonnee.Difficulte)}`}>
            {randonnee.Difficulte}
          </div>
        )}
      </div>
      
      {/* Contenu */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
            {randonnee.Nom}
          </h3>
        </div>
        
        {/* Informations principales */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
          {randonnee.Duree && (
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-blue-600" />
              <span>{randonnee.Duree}</span>
            </div>
          )}
          
          {randonnee.Distance && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-1 text-green-600" />
              <span>{randonnee.Distance}</span>
            </div>
          )}
          
          {randonnee.Denivele && (
            <div className="flex items-center">
              <TrendingUp size={16} className="mr-1 text-orange-600" />
              <span>{randonnee.Denivele}</span>
            </div>
          )}
          
          {randonnee.Localisation && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-1 text-purple-600" />
              <span className="truncate">{randonnee.Localisation}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {randonnee.Description}
        </p>
        
        {/* Boutons d'action */}
        <div className="flex justify-between items-center mt-4">
          <a 
            href={`/randonnee/${slug}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Voir détails
          </a>
          
          <div className="flex space-x-2">
            {randonnee.Coordonnees && (
              <a 
                href={`https://maps.google.com/maps?q=${randonnee.Coordonnees.lat},${randonnee.Coordonnees.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title="Voir sur la carte"
              >
                <MapPin size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandonneeCard;
