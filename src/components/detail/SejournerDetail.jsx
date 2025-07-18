import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ArrowLeft, MapPin, Phone, Mail, ExternalLink, Star, Images } from 'lucide-react';
import { convertMarkdownToHtml } from '../../utils/markdownUtils.js';
import { getImageUrl } from '../../utils/eventUtils.js';
import CharteCard from '../ui/CharteCard.jsx';
import CharteSidebarCard from '../ui/CharteSidebarCard.jsx';
import 'leaflet/dist/leaflet.css';

const SejournerDetail = ({ sejourner }) => {
  const [isClient, setIsClient] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
    // Fix for default markers in react-leaflet
    if (typeof window !== 'undefined') {
      import('leaflet').then((leaflet) => {
        delete leaflet.default.Icon.Default.prototype._getIconUrl;
        leaflet.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
      });
    }
  }, []);

  const getLinkImageUrl = (lien) => {
    if (!lien.image) return null;
    return getImageUrl(lien.image);
  };

  const openMaps = () => {
    if (!sejourner.Coordonnees || !sejourner.Coordonnees.lat || !sejourner.Coordonnees.lng) return;
    
    const { lat, lng } = sejourner.Coordonnees;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const getImagesList = () => {
    if (!sejourner.images) return [];
    
    // Si images est un tableau
    if (Array.isArray(sejourner.images)) {
      return sejourner.images;
    }
    
    // Si images est un objet unique
    if (typeof sejourner.images === 'object' && sejourner.images.url) {
      return [sejourner.images];
    }
    
    return [];
  };

  const images = getImagesList();
  const currentImage = images[currentImageIndex];

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
                <a href="/sejourner" className="hover:text-gray-700">Séjourner</a>
                <span>/</span>
                <span className="text-gray-900 truncate max-w-48">{sejourner.Titre}</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            {images.length > 0 && (
              <div className="relative">
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-200">
                  <img
                    src={getImageUrl(currentImage)}
                    alt={sejourner.Titre}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {images.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index 
                            ? 'border-blue-500' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={getImageUrl(image)}
                          alt={`${sejourner.Titre} - Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sejourner Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border bg-blue-100 text-blue-800 border-blue-200">
                  <MapPin className="w-4 h-4" />
                  {sejourner.type_sejourner?.Denomination || 'Hébergement'}
                </div>
                {sejourner.commune && sejourner.commune.Nom && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border bg-green-100 text-green-800 border-green-200">
                    <MapPin className="w-4 h-4" />
                    {sejourner.commune.Nom}
                  </div>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-black">
                {sejourner.Titre}
              </h1>

              {/* Description with markdown */}
              {sejourner.Description && (
                <div className="prose prose-lg max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: convertMarkdownToHtml(sejourner.Description) 
                    }} 
                  />
                </div>
              )}
            </div>

            {/* Map */}
            {sejourner.Coordonnees && sejourner.Coordonnees.lat && sejourner.Coordonnees.lng && isClient && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Localisation</h2>
                <div className="h-80 rounded-lg overflow-hidden">
                  <MapContainer 
                    center={[sejourner.Coordonnees.lat, sejourner.Coordonnees.lng]} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[sejourner.Coordonnees.lat, sejourner.Coordonnees.lng]}>
                      <Popup>
                        <div className="text-center">
                          <strong>{sejourner.Titre}</strong>
                          {sejourner.commune && sejourner.commune.Nom && <div>{sejourner.commune.Nom}</div>}
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Informations pratiques</h3>
              <div className="space-y-4">
                {sejourner.commune && sejourner.commune.Nom && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Commune</p>
                      <p className="text-gray-600">{sejourner.commune.Nom}</p>
                    </div>
                  </div>
                )}
                
                {sejourner.Tel && (
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Téléphone</p>
                      <a href={`tel:${sejourner.Tel}`} className="text-blue-600 hover:text-blue-800">
                        {sejourner.Tel}
                      </a>
                    </div>
                  </div>
                )}

                {sejourner.Email && (
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href={`mailto:${sejourner.Email}`} className="text-blue-600 hover:text-blue-800">
                        {sejourner.Email}
                      </a>
                    </div>
                  </div>
                )}

                {sejourner.Coordonnees && sejourner.Coordonnees.lat && sejourner.Coordonnees.lng && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Coordonnées</p>
                      <button 
                        onClick={openMaps}
                        className="text-blue-600 hover:text-blue-800 text-sm underline"
                      >
                        {sejourner.Coordonnees.lat.toFixed(4)}, {sejourner.Coordonnees.lng.toFixed(4)}
                        <br />
                        <span className="text-xs">Cliquer pour ouvrir dans Maps</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Links */}
            {sejourner.liens && Array.isArray(sejourner.liens) && sejourner.liens.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Liens utiles</h3>
                <div className="space-y-3">
                  {sejourner.liens.map((lien, index) => (
                    <a 
                      key={lien.id || index} 
                      href={lien.lien} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      {lien.image ? (
                        <img 
                          src={getLinkImageUrl(lien)} 
                          alt="Lien" 
                          className="w-6 h-6"
                        />
                      ) : (
                        <ExternalLink className="w-5 h-5 text-blue-600" />
                      )}
                      <span className="text-blue-700 font-medium">Voir le lien</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Charte Card */}
            {sejourner.EtablissementCharteNote && (
              <CharteSidebarCard etablissementCharteNote={sejourner.EtablissementCharteNote} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SejournerDetail;
