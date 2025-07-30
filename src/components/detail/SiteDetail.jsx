import { 
  MapPin, 
  ArrowLeft, 
  Share2,
  Heart,
  ExternalLink,
  Camera
} from 'lucide-react';
import { useState } from 'react';
import { openMaps, getGoogleMapsUrl } from '../../utils/mapsUtils.js';

export default function SiteDetail({ site }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Site non trouvé</h1>
          <p className="text-gray-600 mb-4">Ce site n'existe pas ou n'est plus disponible.</p>
          <a href="/sites" className="text-blue-600 hover:text-blue-800">
            ← Retour aux sites
          </a>
        </div>
      </div>
    );
  }

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

  const handleOpenMaps = () => {
    if (site.coordinates?.lat && site.coordinates?.lng) {
      openMaps(site.coordinates.lat, site.coordinates.lng, site.title);
    }
  };

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
                <a href="/sites" className="hover:text-gray-700">Sites</a>
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
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {site.title}
                </h1>
                {site.commune && (
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="text-lg">{site.commune}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {site.description}
                </p>
              </div>

              {/* Links */}
              {site.links && site.links.length > 0 && (
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
                  <div className="space-y-3">
                    {site.links.map((link, index) => {
                      // Extraire le nom de domaine pour un affichage plus propre
                      let displayText = link.url;
                      try {
                        const url = new URL(link.url);
                        displayText = url.hostname.replace('www.', '');
                      } catch (e) {
                        // Si l'URL n'est pas valide, garder l'URL complète
                      }
                      
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                        >
                          {link.image && (
                            <img 
                              src={link.image} 
                              alt="" 
                              className="w-6 h-6 flex-shrink-0"
                            />
                          )}
                          <span className="text-blue-600 hover:text-blue-800 flex-1">
                            {displayText}
                          </span>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location Card */}
            {site.coordinates && (
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  Localisation
                </h3>
                
                <div className="space-y-4">
                  {/* Info de localisation */}
                  <div className="text-center mb-4">
                    <p className="font-medium text-gray-900">{site.title}</p>
                    <p className="text-gray-600">{site.commune}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {site.coordinates.lat.toFixed(4)}, {site.coordinates.lng.toFixed(4)}
                    </p>
                  </div>
                  
                  {/* Bouton unique pour ouvrir dans Maps */}
                  <button
                    onClick={handleOpenMaps}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Ouvrir dans Maps
                  </button>
                </div>
              </div>
            )}

            {/* Back to list */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <a 
                href="/sites"
                className="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ← Retour aux sites
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
