import React from 'react';
import { getImageUrl } from '../../utils/eventUtils';
import { Phone, Mail, MapPin, Images } from 'lucide-react';

const ArtisanatCard = ({ artisan }) => {
  // Génération du slug pour l'URL
  const slug = artisan.Titre.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // Icône par type de produit
  const getTypeIcon = (type) => {
    const typeMap = {
      'Miel & Apiculture': '🍯',
      'Charcuterie Corse': '',
      'Fromage & Produits Laitiers': '🧀',
      'Spiritueux & Liqueurs': '🍷',
      'Poterie & Céramique': '🏺',
      'Bijouterie & Artisanat': '💍',
      'Textile & Couture': '🧵',
      'Bois & Ébénisterie': '🪵',
      'Produits du Terroir': '🌾',
    };
    return typeMap[type] || '🏪';
  };

  const images = artisan.images || [];
  const coverImage = images[0];
  const coverUrl = coverImage ? getImageUrl(coverImage.formats?.medium || coverImage.formats?.small || coverImage) : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image / couverture */}
      <div className="relative">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={coverImage?.alternativeText || artisan.Titre}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center" />
        )}

        {/* Badge type */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <span className="text-xs font-medium text-gray-700">
            {artisan.type_artisanat_et_produit?.Titre || 'Type inconnu'}
          </span>
        </div>

        {/* Compteur d'images */}
        {images.length > 1 && (
          <div className="absolute top-2 right-2 bg-gray-900/70 text-white text-[11px] px-2 py-1 rounded-full flex items-center gap-1">
            <Images size={14} />
            <span>{images.length}</span>
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
          {artisan.Titre}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {artisan.Description}
        </p>

        {/* Informations de contact */}
        <div className="space-y-2 mb-4">
          {artisan.Tel && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone size={16} className="mr-2 text-blue-600" />
              <span>{artisan.Tel}</span>
            </div>
          )}
          {artisan.Email && (
            <div className="flex items-center text-sm text-gray-600">
              <Mail size={16} className="mr-2 text-blue-600" />
              <span>{artisan.Email}</span>
            </div>
          )}
          {artisan.Coordonnees && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-2 text-blue-600" />
              <span>GPS</span>
            </div>
          )}
        </div>

        {/* Liens sociaux (icônes uniquement) */}
        {artisan.Liens?.length > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              {artisan.Liens.slice(0,3).map((lien, index) => (
                <a
                  key={index}
                  href={lien.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
                >
                  <img
                    src={getImageUrl(lien.image)}
                    alt="Lien"
                    className="w-4 h-4"
                    loading="lazy"
                  />
                </a>
              ))}
              {artisan.Liens.length > 3 && (
                <span className="text-xs text-gray-500">+{artisan.Liens.length - 3}</span>
              )}
            </div>
        )}

        <div className="flex justify-between items-center mt-2">
          <a
            href={`/artisanat/${slug}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Voir détails
          </a>
          <div className="flex space-x-2">
            {artisan.Tel && (
              <a
                href={`tel:${artisan.Tel}`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title="Appeler"
              >
                <Phone size={18} />
              </a>
            )}
            {artisan.Email && (
              <a
                href={`mailto:${artisan.Email}`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title="Email"
              >
                <Mail size={18} />
              </a>
            )}
            {artisan.Coordonnees && (
              <a
                href={`https://maps.google.com/maps?q=${artisan.Coordonnees.lat},${artisan.Coordonnees.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title="Carte"
              >
                <MapPin size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanatCard;
