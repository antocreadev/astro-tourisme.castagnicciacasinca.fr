import { Route, Car, MapPin, Clock, TrendingUp, Users, Compass, Building, Trees, Palette, Bike } from 'lucide-react';
import { useState } from 'react';

const typeIcons = {
  patrimoine: Building,
  nature: Trees, 
  culturel: Users,
  artisanat: Palette
};

const transportIcons = {
  voiture: Car,
  pied: Users,
  vélo: Bike
};

const difficultyColors = {
  facile: 'bg-green-100 text-green-800',
  modéré: 'bg-yellow-100 text-yellow-800',
  difficile: 'bg-red-100 text-red-800'
};

const typeColors = {
  patrimoine: 'bg-purple-100 text-purple-800',
  nature: 'bg-green-100 text-green-800',
  culturel: 'bg-blue-100 text-blue-800',
  artisanat: 'bg-orange-100 text-orange-800'
};

export default function ItineraireCard({ itineraire, href, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const TypeIcon = typeIcons[itineraire.type] || Route;
  const TransportIcon = transportIcons[itineraire.transport] || Car;
  const typeColor = typeColors[itineraire.type] || 'bg-gray-100 text-gray-800';
  const difficultyColor = difficultyColors[itineraire.difficulty] || 'bg-gray-100 text-gray-800';

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(itineraire);
    }
  };

  const CardContent = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={itineraire.image || "/placeholder.svg"}
          alt={itineraire.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* Overlay with badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${typeColor}`}>
              <TypeIcon className="w-3 h-3" />
              {itineraire.type.charAt(0).toUpperCase() + itineraire.type.slice(1)}
            </span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${difficultyColor}`}>
              <TrendingUp className="w-3 h-3" />
              {itineraire.difficulty.charAt(0).toUpperCase() + itineraire.difficulty.slice(1)}
            </span>
          </div>
          
          <div className="flex flex-col gap-2 items-end">
            <div className="bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <TransportIcon className="w-3 h-3" />
              {itineraire.transport === 'voiture' ? 'Auto' : 
               itineraire.transport === 'pied' ? 'Marche' : 
               itineraire.transport}
            </div>
            {itineraire.distance && (
              <div className="bg-blue-600 bg-opacity-90 text-white px-2 py-1 rounded-full text-xs font-medium">
                {itineraire.distance}
              </div>
            )}
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
            {itineraire.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-1">
            {itineraire.subtitle}
          </p>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {itineraire.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0 text-red-500" />
            <span className="truncate">{itineraire.startPoint} → {itineraire.endPoint}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 flex-shrink-0 text-blue-500" />
            <span>{itineraire.duration}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Compass className="w-4 h-4 flex-shrink-0 text-purple-500" />
            <span className="capitalize">{itineraire.theme}</span>
          </div>
        </div>

        {/* Stops count */}
        {itineraire.stops && itineraire.stops.length > 0 && (
          <div className="mb-4">
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {itineraire.stops.length} étape{itineraire.stops.length > 1 ? 's' : ''}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            {itineraire.type === 'patrimoine' ? 'Découverte' : 
             itineraire.type === 'nature' ? 'Randonnée' :
             itineraire.type === 'culturel' ? 'Culture' :
             itineraire.type === 'artisanat' ? 'Artisanat' :
             'Circuit'}
          </div>
          
          <div className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm">
            <span>Explorer</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} onClick={handleClick} className="block">
        <CardContent />
      </a>
    );
  }

  return (
    <div onClick={handleClick} className={onClick ? 'cursor-pointer' : ''}>
      <CardContent />
    </div>
  );
}
