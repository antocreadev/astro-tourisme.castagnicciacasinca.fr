import { Calendar, MapPin, Clock, Euro, Users, ArrowRight } from 'lucide-react';
import { convertSimpleMarkdown } from '../../utils/markdownUtils.js';

const categoryColors = {
  culture: 'bg-purple-100 text-purple-800',
  gastronomie: 'bg-orange-100 text-orange-800',
  nature: 'bg-green-100 text-green-800',
  artisanat: 'bg-blue-100 text-blue-800',
  sport: 'bg-red-100 text-red-800'
};

export default function EventCard({ event, href, onClick, isPast }) {
  // Fonction pour formater la date
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const months = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[date.getMonth()];
    return { day, month };
  };

  // Fonction pour obtenir l'URL de l'image
  const getImageUrl = (image) => {
    if (!image) return null;
    const baseUrl = import.meta.env.PUBLIC_STRAPI_URL || import.meta.env.PUBLIC_API_URL || 'http://localhost:1337';
    return `${baseUrl}${image.url}`;
  };

  const { day, month } = formatEventDate(event.Date);
  const categoryColor = 'bg-blue-100 text-blue-800'; // Couleur par défaut
  const imageUrl = getImageUrl(event.image);

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(event);
    }
  };

  const CardContent = () => (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-[400px] flex flex-col ${isPast ? 'grayscale' : ''}`}>
      {/* Date Section & Image */}
      <div className="flex flex-shrink-0">
        <div className={`${isPast ? 'bg-gray-300' : 'bg-gray-100'} w-20 sm:w-24 flex flex-col items-center justify-center py-6 sm:py-8`}>
          <div className={`text-2xl sm:text-4xl font-bold ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>{day}</div>
          <div className={`text-xs sm:text-sm font-medium ${isPast ? 'text-gray-500' : 'text-gray-500'} mt-1`}>{month}</div>
          {isPast && (
            <div className="text-xs text-red-500 mt-1 font-medium">Passé</div>
          )}
        </div>
        <div className="flex-1 relative">
          <div className="w-full h-32 sm:h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={event.Nom}
                className={`w-full h-full object-cover ${isPast ? 'opacity-75 grayscale' : ''}`}
              />
            ) : (
              <span className="text-gray-500 text-sm">Image événement</span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
              {event.commune?.Nom || 'Événement'}
            </span>
          </div>
          {isPast && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white font-medium">Événement passé</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <h3 className={`text-lg sm:text-xl font-semibold leading-tight mb-3 line-clamp-2 ${isPast ? 'text-gray-600' : 'text-black'}`}>
          {event.Nom}
        </h3>
        
        <div className="space-y-2 mb-4 flex-shrink-0">
          {event.commune && (
            <div className={`flex items-center gap-2 text-sm ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{event.commune.Nom}</span>
            </div>
          )}
          
          <div className={`flex items-center gap-2 text-sm ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{new Date(event.Date).toLocaleDateString('fr-FR', { 
              weekday: 'long',
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>

          {event.Tel && (
            <div className={`flex items-center gap-2 text-sm ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{event.Tel}</span>
            </div>
          )}
        </div>

        <div className={`text-sm mb-4 line-clamp-2 flex-1 ${isPast ? 'text-gray-500' : 'text-gray-700'}`}>
          {event.Description && (
            <div 
              dangerouslySetInnerHTML={{ 
                __html: convertSimpleMarkdown(event.Description.substring(0, 150) + (event.Description.length > 150 ? '...' : ''))
              }} 
            />
          )}
        </div>

        <div className="flex items-center justify-between flex-shrink-0">
          {event.Liens && event.Liens.length > 0 && (
            <div className={`flex items-center gap-2 text-sm ${isPast ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>Liens disponibles</span>
            </div>
          )}
          
          <div className={`flex items-center gap-1 font-medium text-sm ${isPast ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'}`}>
            <span>Voir détails</span>
            <ArrowRight className="w-4 h-4" />
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
