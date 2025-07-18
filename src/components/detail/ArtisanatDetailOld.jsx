import React from 'react';

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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'producteur': return '🌾';
      case 'artisan': return '🛠️';
      default: return '🏪';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'producteur': return 'Producteur';
      case 'artisan': return 'Artisan';
      default: return type;
    }
  };

  const getCategorieIcon = (categorie) => {
    switch (categorie) {
      case 'miel': return '🍯';
      case 'charcuterie': return '🥓';
      case 'fromage': return '🧀';
      case 'spiritueux': return '🍷';
      case 'poterie': return '🏺';
      case 'bijouterie': return '💍';
      case 'textile': return '🧵';
      case 'bois': return '🪵';
      default: return '🛒';
    }
  };

  const getCategorieLabel = (categorie) => {
    switch (categorie) {
      case 'miel': return 'Miel & Apiculture';
      case 'charcuterie': return 'Charcuterie';
      case 'fromage': return 'Fromages';
      case 'spiritueux': return 'Spiritueux & Liqueurs';
      case 'poterie': return 'Poterie & Céramique';
      case 'bijouterie': return 'Bijouterie';
      case 'textile': return 'Textile & Tissage';
      case 'bois': return 'Travail du bois';
      default: return categorie;
    }
  };

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
            <li className="text-gray-800 font-medium">{artisan.nom}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* En-tête avec image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative">
                <img 
                  src={artisan.image} 
                  alt={artisan.nom}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center space-x-2">
                  <span className="text-xl">{getTypeIcon(artisan.type)}</span>
                  <span className="font-medium text-gray-700">{getTypeLabel(artisan.type)}</span>
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full px-4 py-2 flex items-center space-x-2">
                  <span className="text-lg">{getCategorieIcon(artisan.categorie)}</span>
                  <span className="font-medium">{getCategorieLabel(artisan.categorie)}</span>
                </div>
              </div>
            </div>

            {/* Informations principales */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{artisan.nom}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="mr-2">📍</span>
                    <span>{artisan.adresse}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="text-xl font-bold text-gray-800">{artisan.note}</span>
                  <span className="text-gray-600">({artisan.nombreAvis} avis)</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {artisan.descriptionLongue}
              </p>

              {/* Spécialités */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Spécialités</h3>
                <div className="flex flex-wrap gap-2">
                  {artisan.specialites.map((specialite, index) => (
                    <span 
                      key={index}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {specialite}
                    </span>
                  ))}
                </div>
              </div>

              {/* Labels et certifications */}
              {artisan.labels && artisan.labels.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Labels & Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {artisan.labels.map((label, index) => (
                      <span 
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Produits */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Nos produits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {artisan.produits.map((produit, index) => (
                  <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <span className="mr-3 text-blue-500">✓</span>
                    <span className="text-gray-700">{produit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Services proposés</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {artisan.services.map((service, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <span className="mr-3 text-green-500 text-lg">✓</span>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact et horaires */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📞 Contact & Horaires</h3>
              
              <div className="space-y-4 mb-6">
                {artisan.telephone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <a 
                      href={`tel:${artisan.telephone}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {artisan.telephone}
                    </a>
                  </div>
                )}

                {artisan.email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <a 
                      href={`mailto:${artisan.email}`}
                      className="text-blue-600 hover:text-blue-800 font-medium break-all"
                    >
                      {artisan.email}
                    </a>
                  </div>
                )}

                {artisan.siteweb && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site web
                    </label>
                    <a 
                      href={artisan.siteweb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Visiter le site
                    </a>
                  </div>
                )}

                {artisan.horaires && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Horaires d'ouverture
                    </label>
                    <p className="text-gray-600 text-sm">
                      {artisan.horaires}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Saison optimale
                  </label>
                  <p className="text-gray-600 text-sm">
                    {artisan.saisonOptimale}
                  </p>
                </div>
              </div>

              {/* Moyens de paiement */}
              {artisan.paiement && artisan.paiement.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    💳 Moyens de paiement
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {artisan.paiement.map((moyen, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {moyen}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {artisan.telephone && (
                  <a 
                    href={`tel:${artisan.telephone}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center block transition-colors duration-200"
                  >
                    📞 Appeler
                  </a>
                )}
                
                {artisan.siteweb && (
                  <a 
                    href={artisan.siteweb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium text-center block transition-colors duration-200"
                  >
                    🌐 Site web
                  </a>
                )}

                {artisan.email && (
                  <a 
                    href={`mailto:${artisan.email}`}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium text-center block transition-colors duration-200"
                  >
                    ✉️ Envoyer un email
                  </a>
                )}
              </div>

              {/* Réseaux sociaux */}
              {artisan.reseauxSociaux && Object.keys(artisan.reseauxSociaux).length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    📱 Réseaux sociaux
                  </h4>
                  <div className="flex space-x-3">
                    {Object.entries(artisan.reseauxSociaux).map(([reseau, compte]) => (
                      <a
                        key={reseau}
                        href={`https://${reseau}.com/${compte}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:scale-110 transition-transform duration-200"
                      >
                        {reseau === 'facebook' && '📘'}
                        {reseau === 'instagram' && '📷'}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Localisation */}
            {artisan.coordonnees && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📍 Localisation</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div>{artisan.nom}</div>
                  <div>{artisan.adresse}</div>
                  <div>{artisan.commune}</div>
                </div>
                <a 
                  href={`https://www.google.com/maps?q=${artisan.coordonnees.lat},${artisan.coordonnees.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium text-center block transition-colors duration-200"
                >
                  Voir sur Google Maps
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <a 
            href="/artisanat"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Retour à l'artisanat & terroir
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArtisanatDetail;
