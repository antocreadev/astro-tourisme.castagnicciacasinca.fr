import { Calendar, MapPin, Clock, Euro, Users, ArrowRight } from 'lucide-react';
import { formatDateShort, isEventPassed } from '../../utils/filters.js';

const categoryColors = {
  culture: 'bg-purple-100 text-purple-800',
  gastronomie: 'bg-orange-100 text-orange-800',
  nature: 'bg-green-100 text-green-800',
  artisanat: 'bg-blue-100 text-blue-800',
  sport: 'bg-red-100 text-red-800'
};

export default function EventCard({ event, href, onClick }) {
  const isPassed = isEventPassed(event.date);
  const categoryColor = categoryColors[event.category] || 'bg-gray-100 text-gray-800';

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(event);
    }
  };

  const CardContent = () => (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${isPassed ? 'opacity-60' : ''}`}>
      {/* Date Section & Image */}
      <div className="flex">
        <div className="bg-gray-100 w-20 sm:w-24 flex flex-col items-center justify-center py-6 sm:py-8">
          <div className="text-2xl sm:text-4xl font-bold text-gray-600">{event.day}</div>
          <div className="text-xs sm:text-sm font-medium text-gray-500 mt-1">{event.month}</div>
          {isPassed && (
            <div className="text-xs text-red-500 mt-1 font-medium">Passé</div>
          )}
        </div>
        <div className="flex-1 relative">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="w-full h-32 sm:h-48 object-cover"
            loading="lazy"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
          </div>
          {isPassed && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white font-medium">Événement passé</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-black leading-tight mb-3 line-clamp-2">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{event.location}, {event.commune}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Euro className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-green-600">{event.price}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{event.details.organizer}</span>
          </div>
          
          <div className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm">
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
