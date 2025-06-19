import { 
  Route,
  MapPin, 
  Clock, 
  TrendingUp,
  ArrowLeft, 
  Share2,
  Heart,
  Car,
  Info,
  Users,
  Compass,
  Navigation,
  Calendar,
  Building,
  Trees,
  Palette,
  Bike
} from 'lucide-react';
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
  facile: 'bg-green-100 text-green-800 border-green-200',
  modéré: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  difficile: 'bg-red-100 text-red-800 border-red-200'
};

const typeColors = {
  patrimoine: 'bg-purple-100 text-purple-800 border-purple-200',
  nature: 'bg-green-100 text-green-800 border-green-200',
  culturel: 'bg-blue-100 text-blue-800 border-blue-200',
  artisanat: 'bg-orange-100 text-orange-800 border-orange-200'
};

export default function ItineraireDetail({ itineraire }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: itineraire.title,
          text: itineraire.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erreur lors du partage:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you could save to localStorage or send to an API
  };

  const TypeIcon = typeIcons[itineraire.type] || Route;
  const TransportIcon = transportIcons[itineraire.transport] || Car;
  const typeColor = typeColors[itineraire.type] || 'bg-gray-100 text-gray-800 border-gray-200';
  const difficultyColor = difficultyColors[itineraire.difficulty] || 'bg-gray-100 text-gray-800 border-gray-200';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour</span>
              </button>
              
              <nav className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <a href="/" className="hover:text-gray-700">Accueil</a>
                <span>/</span>
                <a href="/itineraires" className="hover:text-gray-700">Itinéraires</a>
                <span>/</span>
                <span className="text-gray-900 truncate max-w-48">{itineraire.title}</span>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-200">
                <img
                  src={itineraire.gallery?.[currentImageIndex] || itineraire.image}
                  alt={itineraire.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {itineraire.gallery && itineraire.gallery.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {itineraire.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index 
                          ? 'border-blue-500' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${itineraire.title} - Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Itineraire Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${typeColor}`}>
                      <TypeIcon className="w-4 h-4" />
                      {itineraire.type.charAt(0).toUpperCase() + itineraire.type.slice(1)}
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${difficultyColor}`}>
                      <TrendingUp className="w-4 h-4" />
                      {itineraire.difficulty.charAt(0).toUpperCase() + itineraire.difficulty.slice(1)}
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {itineraire.title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">
                    {itineraire.subtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Navigation className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">{itineraire.startPoint} → {itineraire.endPoint}</div>
                    {itineraire.distance && (
                      <div className="text-sm text-gray-500">{itineraire.distance}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Durée</div>
                    <div className="text-sm text-gray-500">{itineraire.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <TransportIcon className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Transport</div>
                    <div className="text-sm text-gray-500 capitalize">
                      {itineraire.transport === 'voiture' ? 'Voiture' :
                       itineraire.transport === 'pied' ? 'À pied' :
                       itineraire.transport}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Compass className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium">Thème</div>
                    <div className="text-sm text-gray-500 capitalize">{itineraire.theme}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: itineraire.fullDescription }} />
              </div>

              {/* Stops/Etapes */}
              {itineraire.stops && itineraire.stops.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Étapes du parcours</h3>
                  <div className="space-y-6">
                    {itineraire.stops.map((stop, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {index + 1}. {stop.name}
                          </h4>
                          <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                            {stop.duration}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{stop.description}</p>
                        {stop.highlights && stop.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {stop.highlights.map((highlight, highlightIndex) => (
                              <span
                                key={highlightIndex}
                                className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Informations pratiques
              </h3>
              
              <div className="space-y-4">
                {itineraire.details.level && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Niveau</span>
                    </div>
                    <p className="text-gray-900">{itineraire.details.level}</p>
                  </div>
                )}

                {itineraire.details.season && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Meilleure période</span>
                    </div>
                    <p className="text-gray-900">{itineraire.details.season}</p>
                  </div>
                )}

                {itineraire.details.equipment && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Équipement</span>
                    </div>
                    <p className="text-gray-900">{itineraire.details.equipment}</p>
                  </div>
                )}

                {itineraire.details.parking && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Parking</span>
                    </div>
                    <p className="text-gray-900">{itineraire.details.parking}</p>
                  </div>
                )}

                {itineraire.details.accessibility && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Accessibilité</span>
                    </div>
                    <p className="text-gray-900">{itineraire.details.accessibility}</p>
                  </div>
                )}

                {itineraire.details.guide && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Guide</span>
                    </div>
                    <p className="text-gray-900">{itineraire.details.guide}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {itineraire.tags && itineraire.tags.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Thématiques</h3>
                <div className="flex flex-wrap gap-2">
                  {itineraire.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Map placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Parcours
              </h3>
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Navigation className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">{itineraire.startPoint}</p>
                  <p className="text-sm">↓</p>
                  <p className="font-medium">{itineraire.endPoint}</p>
                  {itineraire.distance && (
                    <p className="text-sm font-medium text-blue-600 mt-2">{itineraire.distance}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
