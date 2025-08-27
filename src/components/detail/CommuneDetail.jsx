import React, { useState } from 'react';
import { getImageUrl } from '../../utils/eventUtils';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  MapPin, 
  Map, 
  Hotel, 
  Building2, 
  Waves, 
  Palette, 
  UtensilsCrossed, 
  Mountain 
} from 'lucide-react';

const CommuneDetail = ({ commune }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  // Fonction pour gérer l'article "de" ou "d'" selon la première lettre
  const getPreposition = (nom) => {
    if (!nom) return 'de';
    const firstLetter = nom.charAt(0).toLowerCase();
    return ['a', 'e', 'i', 'o', 'u', 'h'].includes(firstLetter) ? "d'" : 'de ';
  };

  if (!commune) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Commune non trouvée</h1>
          <p className="text-gray-600 mb-4">Cette commune n'existe pas ou n'est plus disponible.</p>
          <a href="/" className="text-blue-600 hover:text-blue-800">
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  const hasImages = commune.images && commune.images.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Conditionnel selon les images */}
      {hasImages ? (
        <div className="relative">
          <div className="relative h-80 lg:h-96 overflow-hidden">
            <img 
              src={getImageUrl(commune.images[selectedImage])} 
              alt={commune.Nom}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Navigation des images */}
            {commune.images.length > 1 && (
              <>
                <button 
                  onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : commune.images.length - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedImage(prev => prev < commune.images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Indicateurs */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {commune.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === selectedImage ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Bouton galerie */}
                <button 
                  onClick={() => setShowGallery(true)}
                  className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all text-sm"
                >
                  Galerie ({commune.images.length})
                </button>
              </>
            )}
          </div>
          
          {/* Titre superposé pour les images */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <div className="container mx-auto">
              <h1 className="text-3xl lg:text-5xl font-light text-white mb-3 tracking-wide">
                {commune.Nom}
              </h1>
              <div className="flex items-center text-white/90 text-base">
                <Building2 className="w-4 h-4 mr-2" />
                <span>Pieve {getPreposition(commune.pieve?.Nom)}{commune.pieve?.Nom}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Header compact sans images */
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4 tracking-wide">
              {commune.Nom}
            </h1>
            <div className="flex items-center text-gray-600 text-base">
              <Building2 className="w-4 h-4 mr-2" />
              <span>Pieve {getPreposition(commune.pieve?.Nom)}{commune.pieve?.Nom}</span>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="py-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li><a href="/" className="hover:text-blue-600 transition-colors">Accueil</a></li>
              <li className="text-gray-400">›</li>
              <li className="text-gray-800 font-medium">{commune.Nom}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description principale */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Découvrez {commune.Nom}
              </h2>
              <div 
                className="text-gray-700 leading-relaxed text-base prose max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: commune.description?.replace(/\n/g, '<br>') || 'Aucune description disponible.' 
                }}
              />
            </div>

            {/* Information sur la Pieve */}
            {commune.pieve && (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  La Pieve {getPreposition(commune.pieve.Nom)}{commune.pieve.Nom}
                </h3>
                <div 
                  className="text-gray-700 leading-relaxed prose max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: commune.pieve.Description?.replace(/\n/g, '<br>') || 'Aucune description disponible.' 
                  }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Planifier ma visite</h3>
              <div className="space-y-3">
                <a 
                  href="/carte-interactive"
                  className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Carte interactive
                </a>
                
                {commune.coordonnees && (
                  <a 
                    href={`https://maps.google.com/maps?q=${commune.coordonnees.lat},${commune.coordonnees.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Itinéraire
                  </a>
                )}
                
                <a 
                  href={`/sejourner?commune=${encodeURIComponent(commune.Nom)}`}
                  className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                >
                  <Hotel className="w-4 h-4 mr-2" />
                  Où dormir ?
                </a>
                
                <a 
                  href={`/sites?commune=${encodeURIComponent(commune.Nom)}`}
                  className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Sites d'intérêt
                </a>
                
                <a 
                  href={`/plages?commune=${encodeURIComponent(commune.Nom)}`}
                  className="flex items-center justify-center w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                >
                  <Waves className="w-4 h-4 mr-2" />
                  Plages
                </a>
                
                <a 
                  href={`/artisanat?commune=${encodeURIComponent(commune.Nom)}`}
                  className="flex items-center justify-center w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Artisanat & Terroir
                </a>
                
                <a 
                  href={`/sejourner?commune=${encodeURIComponent(commune.Nom)}&type=Restaurants`}
                  className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                >
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  Restaurants
                </a>
                
                <a 
                  href={`/randonnee?commune=${encodeURIComponent(commune.Nom)}`}
                  className="flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                >
                  <Mountain className="w-4 h-4 mr-2" />
                  Randonnées
                </a>
              </div>
            </div>

            {/* Informations */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations pratiques</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Territoire</h4>
                  <p className="text-gray-600 text-sm">Pieve {getPreposition(commune.pieve?.Nom)}{commune.pieve?.Nom}</p>
                </div>

                {commune.coordonnees && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Localisation</h4>
                    <div className="text-sm text-gray-600">
                      <p>Latitude: {commune.coordonnees.lat?.toFixed(5)}</p>
                      <p>Longitude: {commune.coordonnees.lng?.toFixed(5)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal galerie */}
      {showGallery && hasImages && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-lg font-semibold">Galerie - {commune.Nom}</h3>
              <button 
                onClick={() => setShowGallery(false)}
                className="text-white/80 hover:text-white text-2xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {commune.images.map((image, index) => (
                <img
                  key={index}
                  src={getImageUrl(image)}
                  alt={`${commune.Nom} - ${index + 1}`}
                  className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    setSelectedImage(index);
                    setShowGallery(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommuneDetail;
