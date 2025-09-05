import React, { useEffect, useState } from "react";
import { ArrowLeft, Calendar, MapPin, Phone, ExternalLink } from 'lucide-react';
import { convertMarkdownToHtml } from '../../utils/markdownUtils.js';
import { formatEventDate, getImageUrl, isEventPast, getFirstImage, getBestFormat } from '../../utils/eventUtils.js';
import { getInlineStyles } from '../../utils/colorUtils.js';
import { CommuneLink } from '../../utils/communeUtils.jsx';

// Galerie d'images pour un événement (multi-images)
const EventGallery = ({ event, isPast }) => {
  const images = event.images || (event.image ? [event.image] : []);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (images.length === 0) return null;

  const current = getBestFormat(images[currentIndex]) || images[currentIndex];
  const goPrev = () => setCurrentIndex(idx => (idx === 0 ? images.length - 1 : idx - 1));
  const goNext = () => setCurrentIndex(idx => (idx === images.length - 1 ? 0 : idx + 1));

  return (
    <div className="relative mb-4">
      <div className="aspect-video rounded-xl overflow-hidden bg-gray-200">
        <img
          src={getImageUrl(current)}
          alt={current?.alternativeText || event.Nom}
          className={`w-full h-full object-cover ${isPast ? 'opacity-75 grayscale' : ''}`}
          loading="lazy"
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow"
            aria-label="Image précédente"
          >
            ‹
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow"
            aria-label="Image suivante"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((img, i) => (
              <button
                key={img.id || i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/50'} border border-white/70`}
                aria-label={`Aller à l'image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
      {images.length > 1 && (
        <div className="grid grid-cols-5 md:grid-cols-8 gap-2 mt-4">
          {images.map((img, i) => {
            const thumb = getBestFormat(img.formats?.thumbnail ? img : img);
            return (
              <button
                key={img.id || i}
                onClick={() => setCurrentIndex(i)}
                className={`relative rounded overflow-hidden border ${i === currentIndex ? 'ring-2 ring-blue-500 border-blue-500' : 'border-transparent'}`}
              >
                <img
                  src={getImageUrl(img.formats?.thumbnail || img.formats?.small || img)}
                  alt={img.alternativeText || event.Nom}
                  className="w-full h-14 object-cover"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const EventDetail = ({ event, colorData }) => {
  const [isClient, setIsClient] = useState(false);
  const [LeafletComponents, setLeafletComponents] = useState(null);

  // Utiliser les styles CSS globaux ou inline basés sur colorData
  const dynamicStyles = colorData ? getInlineStyles(colorData) : {};

  useEffect(() => {
    setIsClient(true);
    // Import dynamique des composants Leaflet côté client uniquement
    const loadLeaflet = async () => {
      try {
        // Import du CSS
        await import('leaflet/dist/leaflet.css');
        
        // Import des composants Leaflet
        const leafletModule = await import('leaflet');
        const reactLeafletModule = await import('react-leaflet');
        
        // Fix for default markers in react-leaflet
        delete leafletModule.default.Icon.Default.prototype._getIconUrl;
        leafletModule.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
        
        // Stocker les composants chargés
        setLeafletComponents({
          MapContainer: reactLeafletModule.MapContainer,
          TileLayer: reactLeafletModule.TileLayer,
          Marker: reactLeafletModule.Marker,
          Popup: reactLeafletModule.Popup
        });
      } catch (error) {
        console.error('Erreur lors du chargement de Leaflet:', error);
      }
    };
    
    if (typeof window !== 'undefined') {
      loadLeaflet();
    }
  }, []);

  const isEventPastCheck = () => {
    return isEventPast(event.Date);
  };

  const isPast = isEventPast(event.Date);

  const getLinkImageUrl = (lien) => {
    if (!lien.image) return null;
    const baseUrl = import.meta.env.PUBLIC_STRAPI_URL || import.meta.env.PUBLIC_API_URL || 'https://cms.castagnicciacasinca.fr';
    return `${baseUrl}${lien.image.url}`;
  };

  const openMaps = () => {
    if (!event.Coordonnees) return;
    
    const { lat, lng } = event.Coordonnees;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: dynamicStyles.backgroundColor || 'var(--bg-primary, #f9fafb)' }}>
      {/* Header with navigation */}
      <div 
        className="border-b sticky top-0 z-50"
        style={{
          backgroundColor: dynamicStyles.primaryColor || 'var(--color-primary, #ffffff)',
          color: dynamicStyles.backgroundColor || 'var(--bg-primary, #ffffff)',
          borderBottomColor: dynamicStyles.accentColor || 'var(--color-accent, #e5e7eb)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 transition-colors hover:opacity-80"
                style={{ color: dynamicStyles.backgroundColor || 'var(--bg-primary, #6b7280)' }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour</span>
              </button>
              
              <nav className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <a href="/" className="hover:text-gray-700">Accueil</a>
                <span>/</span>
                <a href="/agenda" className="hover:text-gray-700">Agenda</a>
                <span>/</span>
                <span className="text-gray-900 truncate max-w-48">{event.Nom}</span>
              </nav>
            </div>

            {isPast && (
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                Événement passé
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galerie d'images */}
            <EventGallery event={event} isPast={isPast} />

            {/* Event Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
                  isPast ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-blue-100 text-blue-800 border-blue-200'
                }`}>
                  <Calendar className="w-4 h-4" />
                  {formatEventDate(event.Date)}
                </div>
                {event.commune && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border bg-green-100 text-green-800 border-green-200">
                    <MapPin className="w-4 h-4" />
                    <CommuneLink communeName={event.commune.Nom} className="hover:text-green-900" />
                  </div>
                )}
              </div>

              <h1 className={`text-3xl sm:text-4xl font-bold mb-6 ${isPast ? 'text-gray-600' : 'text-black'}`}>
                {event.Nom}
              </h1>

              {/* Description with markdown */}
              {event.Description && (
                <div className={`prose prose-lg max-w-none ${isPast ? 'opacity-75' : ''}`}>
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: convertMarkdownToHtml(event.Description) 
                    }} 
                  />
                </div>
              )}
            </div>

            {/* Map */}
            {event.Coordonnees && isClient && LeafletComponents && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Localisation</h2>
                <div className="h-80 rounded-lg overflow-hidden">
                  <LeafletComponents.MapContainer 
                    center={[event.Coordonnees.lat, event.Coordonnees.lng]} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <LeafletComponents.TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LeafletComponents.Marker position={[event.Coordonnees.lat, event.Coordonnees.lng]}>
                      <LeafletComponents.Popup>
                        <div className="text-center">
                          <strong>{event.Nom}</strong>
                          {event.commune && (
                            <div>
                              <CommuneLink communeName={event.commune.Nom} />
                            </div>
                          )}
                        </div>
                      </LeafletComponents.Popup>
                    </LeafletComponents.Marker>
                  </LeafletComponents.MapContainer>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Informations pratiques</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Date</p>
                    <p className="text-gray-600">{formatEventDate(event.Date)}</p>
                  </div>
                </div>

                {event.commune && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Commune</p>
                      <p className="text-gray-600">
                        <CommuneLink communeName={event.commune.Nom} />
                      </p>
                    </div>
                  </div>
                )}
                
                {event.Tel && (
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Téléphone</p>
                      <a href={`tel:${event.Tel}`} className="text-blue-600 hover:text-blue-800">
                        {event.Tel}
                      </a>
                    </div>
                  </div>
                )}

                {event.Coordonnees && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Coordonnées</p>
                      <button 
                        onClick={openMaps}
                        className="text-blue-600 hover:text-blue-800 text-sm underline"
                      >
                        {event.Coordonnees.lat.toFixed(4)}, {event.Coordonnees.lng.toFixed(4)}
                        <br />
                        <span className="text-xs">Cliquer pour ouvrir dans Maps</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Links */}
            {event.Liens && event.Liens.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Liens utiles</h3>
                <div className="space-y-3">
                  {event.Liens.map((lien, index) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;