import { MapPin } from 'lucide-react';
import { useState } from 'react';

export default function SiteCard({ site, href, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(site);
    }
  };

  const CardContent = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={site.image || "/placeholder.svg"}
          alt={site.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* Overlay */}
        <div className="absolute top-3 right-3">
          {site.commune && (
            <div className="bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs font-medium">
              {site.commune}
            </div>
          )}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
            {site.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-1">
            {site.subtitle}
          </p>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {site.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0 text-red-500" />
            <span className="truncate">{site.commune}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Site culturel
          </div>
          
          <div className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm">
            <span>Découvrir</span>
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
