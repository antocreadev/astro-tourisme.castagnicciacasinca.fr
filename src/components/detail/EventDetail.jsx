import { 
  Calendar, 
  MapPin, 
  Clock, 
  Euro, 
  Users, 
  Phone, 
  Mail, 
  ArrowLeft, 
  Share2,
  Heart,
  Car,
  Info
} from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '../../utils/filters.js';

export default function EventDetail({ event }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
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

  const categoryColors = {
    culture: 'bg-purple-100 text-purple-800 border-purple-200',
    gastronomie: 'bg-orange-100 text-orange-800 border-orange-200',
    nature: 'bg-green-100 text-green-800 border-green-200',
    artisanat: 'bg-blue-100 text-blue-800 border-blue-200',
    sport: 'bg-red-100 text-red-800 border-red-200'
  };

  const categoryColor = categoryColors[event.category] || 'bg-gray-100 text-gray-800 border-gray-200';

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
                <a href="/agenda" className="hover:text-gray-700">Agenda</a>
                <span>/</span>
                <span className="text-gray-900 truncate max-w-48">{event.title}</span>
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
                  src={event.gallery?.[currentImageIndex] || event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {event.gallery && event.gallery.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {event.gallery.map((image, index) => (
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
                        alt={`${event.title} - Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Event Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${categoryColor} mb-3`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">{formatDate(event.date)}</div>
                    <div className="text-sm text-gray-500">{event.time}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-medium">{event.location}</div>
                    <div className="text-sm text-gray-500">{event.commune}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Euro className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-600">{event.price}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Durée</div>
                    <div className="text-sm text-gray-500">{event.details.duration}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: event.fullDescription }} />
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
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-sm text-gray-700">Organisateur</span>
                  </div>
                  <p className="text-gray-900">{event.details.organizer}</p>
                </div>

                {event.details.contact && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Téléphone</span>
                    </div>
                    <a 
                      href={`tel:${event.details.contact}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {event.details.contact}
                    </a>
                  </div>
                )}

                {event.details.email && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Email</span>
                    </div>
                    <a 
                      href={`mailto:${event.details.email}`}
                      className="text-blue-600 hover:text-blue-800 break-all"
                    >
                      {event.details.email}
                    </a>
                  </div>
                )}

                {event.details.accessibility && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Accessibilité</span>
                    </div>
                    <p className="text-gray-900">{event.details.accessibility}</p>
                  </div>
                )}

                {event.details.parking && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">Parking</span>
                    </div>
                    <p className="text-gray-900">{event.details.parking}</p>
                  </div>
                )}

                {event.details.equipment && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">À prévoir</span>
                    </div>
                    <p className="text-gray-900">{event.details.equipment}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Map placeholder - you can integrate a real map here */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Localisation
              </h3>
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">{event.location}</p>
                  <p className="text-sm">{event.commune}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
