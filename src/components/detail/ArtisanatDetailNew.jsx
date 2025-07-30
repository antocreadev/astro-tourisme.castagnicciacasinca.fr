import React from 'react';
import { getImageUrl } from '../../utils/eventUtils';
import { Phone, Mail, MapPin, ExternalLink, Clock, User, Tag } from 'lucide-react';

const ArtisanatDetail = ({ artisan }) => {
  if (!artisan) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Artisan non trouvé</h1>
          <p className="text-gray-600 mb-4">Cet artisan ou producteur n'existe pas ou n'est plus disponible.</p>
          <a href="/artisanat" className="text-blue-600 hover:text-blue-800">
            ← Retour à l'artisanat & terroir
          </a>
        </div>
      </div>
    );
  }

  // // Icône par type de produit
  // const getTypeIcon = (type) => {
  //   const typeMap = {
  //     'Miel & Apiculture': '🍯',
  //     'Charcuterie Corse': '',
  //     'Fromage & Produits Laitiers': '🧀',
  //     'Spiritueux & Liqueurs': '🍷',
  //     'Poterie & Céramique': '🏺',
  //     'Bijouterie & Artisanat': '💍',
  //     'Textile & Couture': '🧵',
  //     'Bois & Ébénisterie': '🪵',
  //     'Produits du Terroir': '🌾',
  //   };
  //   return typeMap[type] || '🏪';
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600">Accueil</a></li>
            <li>›</li>
            <li><a href="/artisanat" className="hover:text-blue-600">Artisanat & Terroir</a></li>
            <li>›</li>
            <li className="text-gray-800 font-medium">{artisan.Titre}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Image principale */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative">
                {artisan.image ? (
                  <img 
                    src={getImageUrl(artisan.image)} 
                    alt={artisan.Titre}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 md:h-80 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                    {/* <span className="text-8xl">
                      {getTypeIcon(artisan.type_artisanat_et_produit?.Titre)}
                    </span> */}
                  </div>
                )}
                
                {/* Badge type */}
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center space-x-2">
            
                  <span className="font-medium text-gray-700">{artisan.type_artisanat_et_produit?.Titre}</span>
                </div>
              </div>
            </div>

            {/* Informations principales */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{artisan.Titre}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Tag className="mr-2" size={16} />
                    <span>{artisan.type_artisanat_et_produit?.Titre}</span>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {artisan.Description}
                </p>
              </div>

              {/* Liens sociaux */}
              {artisan.Liens && artisan.Liens.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Liens utiles</h3>
                  <div className="flex flex-wrap gap-3">
                    {artisan.Liens.map((lien, index) => (
                      <a
                        key={index}
                        href={lien.lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <img
                          src={getImageUrl(lien.image)}
                          alt="Lien"
                          className="w-4 h-4 mr-2"
                        />
                        <span className="text-sm font-medium">Voir le profil</span>
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Informations de contact */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations de contact</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Activité</h4>
                  <div className="flex items-center">
                    {/* <span className="text-2xl mr-2">{getTypeIcon(artisan.type_artisanat_et_produit?.Titre)}</span> */}
                    <span className="text-gray-600">{artisan.type_artisanat_et_produit?.Titre}</span>
                  </div>
                </div>
                
                {artisan.Tel && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Téléphone</h4>
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-blue-600" />
                      <a href={`tel:${artisan.Tel}`} className="text-blue-600 hover:text-blue-800">
                        {artisan.Tel}
                      </a>
                    </div>
                  </div>
                )}
                
                {artisan.Email && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Email</h4>
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2 text-blue-600" />
                      <a href={`mailto:${artisan.Email}`} className="text-blue-600 hover:text-blue-800">
                        {artisan.Email}
                      </a>
                    </div>
                  </div>
                )}

                {artisan.Coordonnees && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Localisation</h4>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-blue-600" />
                      <span className="text-gray-600">GPS disponible</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>Latitude: {artisan.Coordonnees.lat.toFixed(5)}</p>
                      <p>Longitude: {artisan.Coordonnees.lng.toFixed(5)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
              <div className="space-y-3">
                {artisan.Tel && (
                  <a 
                    href={`tel:${artisan.Tel}`}
                    className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    📞 Appeler
                  </a>
                )}
                
                {artisan.Email && (
                  <a 
                    href={`mailto:${artisan.Email}`}
                    className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    ✉️ Envoyer un email
                  </a>
                )}
                
                {artisan.Coordonnees && (
                  <a 
                    href={`https://maps.google.com/maps?q=${artisan.Coordonnees.lat},${artisan.Coordonnees.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-orange-600 text-white text-center py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    🗺️ Voir sur Google Maps
                  </a>
                )}
                
                <a 
                  href="/artisanat"
                  className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ← Retour à la liste
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanatDetail;
