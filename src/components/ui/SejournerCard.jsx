import { MapPin, Phone, Mail, Star, ArrowRight } from 'lucide-react';
import { getImageUrl } from '../../utils/eventUtils.js';
import { convertSimpleMarkdown } from '../../utils/markdownUtils.js';

export default function SejournerCard({ sejourner, href, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(sejourner);
    }
  };

  const getFirstImage = () => {
    if (sejourner.images) {
      // Si images est un tableau
      if (Array.isArray(sejourner.images) && sejourner.images.length > 0) {
        return getImageUrl(sejourner.images[0]);
      }
      // Si images est un objet unique
      if (typeof sejourner.images === 'object' && sejourner.images.url) {
        return getImageUrl(sejourner.images);
      }
    }
    return null;
  };

  const imageUrl = getFirstImage();

  const CardContent = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-[400px] flex flex-col">
      {/* Image */}
      <div className="h-48 relative overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={sejourner.Titre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image hébergement</span>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {sejourner.type_sejourner?.Denomination || 'Hébergement'}
          </span>
        </div>

        {/* Charté Badge if available */}
        {sejourner.EtablissementCharteNote && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white px-2 py-1 rounded-full">
            <img 
              src={getImageUrl(sejourner.EtablissementCharteNote)} 
              alt="Charté" 
              className="w-4 h-4"
            />
            <span className="text-xs font-medium">
              Charté
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold leading-tight mb-3 line-clamp-2 text-black">
          {sejourner.Titre}
        </h3>
        
        <div className="space-y-2 mb-4 flex-shrink-0">
          {sejourner.commune && sejourner.commune.Nom && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{sejourner.commune.Nom}</span>
            </div>
          )}
          
          {sejourner.Tel && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{sejourner.Tel}</span>
            </div>
          )}

          {sejourner.Email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{sejourner.Email}</span>
            </div>
          )}
        </div>

        <div className="text-sm mb-4 line-clamp-2 flex-1 text-gray-700">
          {sejourner.Description && typeof sejourner.Description === 'string' && (
            <div 
              dangerouslySetInnerHTML={{ 
                __html: convertSimpleMarkdown(sejourner.Description.substring(0, 150) + (sejourner.Description.length > 150 ? '...' : ''))
              }} 
            />
          )}
        </div>

        <div className="flex items-center justify-between flex-shrink-0">
          {sejourner.liens && Array.isArray(sejourner.liens) && sejourner.liens.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Liens disponibles</span>
            </div>
          )}
          
          <div className="flex items-center gap-1 font-medium text-sm text-blue-600 hover:text-blue-800">
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
