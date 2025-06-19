import { 
  Mountain, 
  MapPin, 
  Clock, 
  TrendingUp,
  ArrowLeft, 
  Share2,
  Heart,
  Car,
  Info,
  Trees,
  Eye,
  Camera,
  Compass,
  Building,
  Droplets,
  Calendar
} from 'lucide-react';
import { useState } from 'react';

const typeIcons = {
  montagne: Mountain,
  nature: Trees,
  village: Building,
  thermal: Droplets,
  belvédère: Eye
};

const difficultyColors = {
  facile: 'bg-green-100 text-green-800 border-green-200',
  modéré: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  difficile: 'bg-red-100 text-red-800 border-red-200'
};

const typeColors = {
  montagne: 'bg-green-100 text-green-800 border-green-200',
  nature: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  village: 'bg-orange-100 text-orange-800 border-orange-200',
  thermal: 'bg-blue-100 text-blue-800 border-blue-200',
  belvédère: 'bg-purple-100 text-purple-800 border-purple-200'
};

export default function SiteDetail({ site }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: site.title,
          text: site.description,
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

  const TypeIcon = typeIcons[site.type] || Mountain;
  const typeColor = typeColors[site.type] || 'bg-gray-100 text-gray-800 border-gray-200';
  const difficultyColor = difficultyColors[site.difficulty] || 'bg-gray-100 text-gray-800 border-gray-200';

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
                <a href="/sites-phares" className="hover:text-gray-700">Sites phares</a>
                <span>/</span>
                <span className="text-gray-900 truncate max-w-48">{site.title}</span>
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
                  src={site.gallery?.[currentImageIndex] || site.image}
                  alt={site.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {site.gallery && site.gallery.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {site.gallery.map((image, index) => (
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
                        alt={`${site.title} - Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Site Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${typeColor}`}>
                      <TypeIcon className="w-4 h-4" />
                      {site.type.charAt(0).toUpperCase() + site.type.slice(1)}
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${difficultyColor}`}>
                      <TrendingUp className="w-4 h-4" />
                      {site.difficulty.charAt(0).toUpperCase() + site.difficulty.slice(1)}
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {site.title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">
                    {site.subtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-medium">{site.commune}</div>
                    {site.altitude && (
                      <div className="text-sm text-gray-500">{site.altitude}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Durée</div>
                    <div className="text-sm text-gray-500">{site.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium">Difficulté</div>
                    <div className="text-sm text-gray-500">{site.difficulty.charAt(0).toUpperCase() + site.difficulty.slice(1)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Camera className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Type</div>
                    <div className="text-sm text-gray-500">{site.type.charAt(0).toUpperCase() + site.type.slice(1)}</div>
                  </div>
                </div>
              </div>

              {/* Activities */}
              {site.activities && site.activities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Activités</h3>
                  <div className="flex flex-wrap gap-2">
                    {site.activities.map((activity, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: site.fullDescription }} />
              </div>
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
                {site.details.access && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Compass className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Accès</span>
                    </div>
                    <p className="text-gray-900">{site.details.access}</p>
                  </div>
                )}

                {site.details.parking && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Parking</span>
                    </div>
                    <p className="text-gray-900">{site.details.parking}</p>
                  </div>
                )}

                {site.details.equipment && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Équipement</span>
                    </div>
                    <p className="text-gray-900">{site.details.equipment}</p>
                  </div>
                )}

                {site.details.season && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Meilleure période</span>
                    </div>
                    <p className="text-gray-900">{site.details.season}</p>
                  </div>
                )}

                {site.details.viewpoints && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Points de vue</span>
                    </div>
                    <p className="text-gray-900">{site.details.viewpoints}</p>
                  </div>
                )}

                {site.details.flora && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trees className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Flore</span>
                    </div>
                    <p className="text-gray-900">{site.details.flora}</p>
                  </div>
                )}

                {site.details.fauna && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Faune</span>
                    </div>
                    <p className="text-gray-900">{site.details.fauna}</p>
                  </div>
                )}

                {site.details.heritage && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Patrimoine</span>
                    </div>
                    <p className="text-gray-900">{site.details.heritage}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Localisation
              </h3>
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">{site.title}</p>
                  <p className="text-sm">{site.commune}</p>
                  {site.altitude && (
                    <p className="text-sm font-medium text-blue-600">{site.altitude}</p>
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
