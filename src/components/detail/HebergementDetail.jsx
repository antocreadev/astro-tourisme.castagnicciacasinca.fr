import React from 'react';

const HebergementDetail = ({ hebergement }) => {
  if (!hebergement) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Hébergement non trouvé</h1>
          <p className="text-gray-600 mb-4">Cet hébergement n'existe pas ou n'est plus disponible.</p>
          <a href="/hebergements" className="text-blue-600 hover:text-blue-800">
            ← Retour aux hébergements
          </a>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hotel': return '🏨';
      case 'auberge': return '🏡';
      case 'camping': return '🏕️';
      case 'residence': return '🏢';
      case 'village-vacances': return '🏖️';
      default: return '🏠';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'hotel': return 'Hôtel';
      case 'auberge': return 'Auberge';
      case 'camping': return 'Camping';
      case 'residence': return 'Résidence';
      case 'village-vacances': return 'Village vacances';
      default: return type;
    }
  };

  const getPrixRange = () => {
    const [min, max] = hebergement.prix.split('-');
    return max ? `${min}-${max}€` : `à partir de ${min}€`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600">Accueil</a></li>
            <li>›</li>
            <li><a href="/hebergements" className="hover:text-blue-600">Hébergements</a></li>
            <li>›</li>
            <li className="text-gray-800 font-medium">{hebergement.nom}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Galerie d'images */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative">
                <img 
                  src={hebergement.image} 
                  alt={hebergement.nom}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center space-x-2">
                  <span className="text-xl">{getTypeIcon(hebergement.type)}</span>
                  <span className="font-medium text-gray-700">{getTypeLabel(hebergement.type)}</span>
                </div>
                {hebergement.labelQualite && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-full">
                    {hebergement.labelQualite}
                  </div>
                )}
              </div>
              
              {/* Images supplémentaires */}
              {hebergement.images && hebergement.images.length > 1 && (
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {hebergement.images.slice(1).map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`${hebergement.nom} ${index + 2}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Informations principales */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{hebergement.nom}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="mr-2">📍</span>
                    <span>{hebergement.adresse}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="text-xl font-bold text-gray-800">{hebergement.note}</span>
                  <span className="text-gray-600">({hebergement.nombreAvis} avis)</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {hebergement.descriptionLongue}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Informations pratiques</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="mr-2">🏠</span>
                      <span>{hebergement.capacite}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">📅</span>
                      <span>{hebergement.periodeOuverture}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">♿</span>
                      <span>{hebergement.accessibilite}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">🗣️</span>
                      <span>{hebergement.languesParless.join(', ')}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {hebergement.services.map((service, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Équipements</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {hebergement.equipements.map((equipement, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>{equipement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activités à proximité */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Activités à proximité</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hebergement.activitesProximite.map((activite, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">
                      {activite === 'Randonnée' && '🥾'}
                      {activite === 'Plage' && '🏖️'}
                      {activite === 'Sports nautiques' && '🏄‍♂️'}
                      {activite === 'Patrimoine' && '🏛️'}
                      {activite === 'Dégustation' && '🍷'}
                      {activite === 'VTT' && '🚵‍♂️'}
                      {activite === 'Thermalisme' && '♨️'}
                      {activite === 'Aquaparc' && '🏊‍♂️'}
                      {activite === 'Mini-golf' && '⛳'}
                      {activite === 'Animations' && '🎭'}
                      {activite === 'Piscine' && '🏊‍♀️'}
                      {activite === 'Villages' && '🏘️'}
                      {!['Randonnée', 'Plage', 'Sports nautiques', 'Patrimoine', 'Dégustation', 'VTT', 'Thermalisme', 'Aquaparc', 'Mini-golf', 'Animations', 'Piscine', 'Villages'].includes(activite) && '🎯'}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{activite}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Prix et réservation */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {getPrixRange()}
                </div>
                <div className="text-gray-600">par nuit</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    📞 Téléphone
                  </label>
                  <a 
                    href={`tel:${hebergement.telephone}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {hebergement.telephone}
                  </a>
                </div>

                {hebergement.email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ✉️ Email
                    </label>
                    <a 
                      href={`mailto:${hebergement.email}`}
                      className="text-blue-600 hover:text-blue-800 font-medium break-all"
                    >
                      {hebergement.email}
                    </a>
                  </div>
                )}

                {hebergement.siteweb && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      🌐 Site web
                    </label>
                    <a 
                      href={hebergement.siteweb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Visiter le site
                    </a>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <a 
                  href={`tel:${hebergement.telephone}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center block transition-colors duration-200"
                >
                  Appeler maintenant
                </a>
                
                {hebergement.siteweb && (
                  <a 
                    href={hebergement.siteweb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium text-center block transition-colors duration-200"
                  >
                    Réserver en ligne
                  </a>
                )}
              </div>
            </div>

            {/* Localisation */}
            {hebergement.coordonnees && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📍 Localisation</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div>{hebergement.adresse}</div>
                  <div>{hebergement.commune}</div>
                </div>
                <a 
                  href={`https://www.google.com/maps?q=${hebergement.coordonnees.lat},${hebergement.coordonnees.lng}`}
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
            href="/hebergements"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Retour aux hébergements
          </a>
        </div>
      </div>
    </div>
  );
};

export default HebergementDetail;
