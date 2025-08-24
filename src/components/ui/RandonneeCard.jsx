import React from 'react';
import { getImageUrl } from '../../utils/eventUtils';
import { Clock, MapPin, TrendingUp, Image as ImageIcon } from 'lucide-react';

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

  const images = randonnee.images || [];
  const coverImage = images[0];
  const coverUrl = coverImage ? getImageUrl(coverImage.formats?.medium || coverImage.formats?.small || coverImage) : (randonnee.image ? getImageUrl(randonnee.image) : null);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={coverImage?.alternativeText || randonnee.Nom}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center">
            <span className="text-5xl">🥾</span>
          </div>
        )}
        {randonnee.Difficulte && (
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getDifficulteColor(randonnee.Difficulte)}`}>
            {randonnee.Difficulte}
          </div>
        )}
        {images.length > 1 && (
          <div className="absolute top-2 right-2 bg-gray-900/70 text-white text-[11px] px-2 py-1 rounded-full flex items-center gap-1">
            <ImageIcon size={14} />
            <span>{images.length}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">{randonnee.Nom}</h3>
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
          {randonnee.commune?.Nom && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-1 text-purple-600" />
              <span className="truncate">{randonnee.commune.Nom}</span>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{randonnee.Description}</p>
        <div className="flex justify-between items-center mt-2">
          <a
            href={`/randonnee/${slug}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Voir détails
          </a>
          {randonnee.depart && (
            <a
              href={`https://maps.google.com/maps?q=${randonnee.depart.lat},${randonnee.depart.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              title="Point de départ"
            >
              <MapPin size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RandonneeCard;
