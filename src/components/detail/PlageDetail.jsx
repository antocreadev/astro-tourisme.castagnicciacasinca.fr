import React from 'react';

const PlageDetail = ({ plage }) => {
  if (!plage) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Plage non trouvée</h1>
          <p className="text-gray-600 mb-4">Cette plage n'existe pas ou n'est plus disponible.</p>
          <a href="/plages" className="text-blue-600 hover:text-blue-800">
            ← Retour aux plages
          </a>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'sable': return '🏖️';
      case 'galets': return '🪨';
      case 'mixte': return '🏝️';
      default: return '🌊';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'sable': return 'Plage de sable';
      case 'galets': return 'Plage de galets';
      case 'mixte': return 'Plage mixte';
      default: return type;
    }
  };

  const getAccessColor = (acces) => {
    switch (acces) {
      case 'Très facile': return 'bg-green-100 text-green-800';
      case 'Facile': return 'bg-blue-100 text-blue-800';
      case 'Modéré': return 'bg-yellow-100 text-yellow-800';
      case 'Difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualiteEauColor = (qualite) => {
    switch (qualite) {
      case 'Excellente': return 'text-green-600';
      case 'Très bonne': return 'text-blue-600';
      case 'Bonne': return 'text-yellow-600';
      default: return 'text-gray-600';
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
            <li><a href="/plages" className="hover:text-blue-600">Plages</a></li>
            <li>›</li>
            <li className="text-gray-800 font-medium">{plage.nom}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Galerie d'images */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative">
                <img 
                  src={plage.image} 
                  alt={plage.nom}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center space-x-2">
                  <span className="text-xl">{getTypeIcon(plage.type)}</span>
                  <span className="font-medium text-gray-700">{getTypeLabel(plage.type)}</span>
                </div>
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {plage.drapeauBleu && (
                    <div className="bg-blue-600 text-white px-3 py-2 rounded-full text-sm">
                      🏴 Drapeau Bleu
                    </div>
                  )}
                  <div className={`px-3 py-2 rounded-full text-sm font-medium ${getAccessColor(plage.acces)}`}>
                    Accès {plage.acces}
                  </div>
                </div>
              </div>
              
              {/* Images supplémentaires */}
              {plage.images && plage.images.length > 1 && (
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {plage.images.slice(1).map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`${plage.nom} ${index + 2}`}
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
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{plage.nom}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="mr-2">📍</span>
                    <span>{plage.commune}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="text-xl font-bold text-gray-800">{plage.note}</span>
                  <span className="text-gray-600">({plage.nombreAvis} avis)</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {plage.descriptionLongue}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Caractéristiques</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="mr-2">📏</span>
                      <span>Longueur: {plage.longueur}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">🚗</span>
                      <span>Parking: {plage.parking}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">🐕</span>
                      <span>Animaux: {plage.animaux}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">♿</span>
                      <span>{plage.accessibility}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Conditions</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="mr-2">💧</span>
                      <span className={getQualiteEauColor(plage.qualiteEau)}>
                        Qualité eau: {plage.qualiteEau}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">🌡️</span>
                      <span>Température: {plage.temperatureEau}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">💨</span>
                      <span>Exposition: {plage.venExposition}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">📅</span>
                      <span>Période optimale: {plage.periodeOptimale}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Services disponibles</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {plage.services.map((service, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activités */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Activités possibles</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {plage.activites.map((activite, index) => (
                  <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">
                      {activite === 'Baignade' && '🏊‍♀️'}
                      {activite === 'Sports nautiques' && '🏄‍♂️'}
                      {activite === 'Pêche' && '🎣'}
                      {activite === 'Beach volley' && '🏐'}
                      {activite === 'Kayak' && '🛶'}
                      {activite === 'Paddle' && '🏄‍♀️'}
                      {activite === 'Kitesurf' && '🪁'}
                      {activite === 'Windsurf' && '🏄‍♂️'}
                      {activite === 'Snorkeling' && '🤿'}
                      {activite === 'Pétanque' && '⚽'}
                      {activite === 'Pique-nique' && '🧺'}
                      {activite === 'Lecture' && '📚'}
                      {activite === 'Sieste' && '😴'}
                      {activite === 'Photographie' && '📸'}
                      {activite === 'Contemplation' && '🧘‍♀️'}
                      {activite === 'Collecte galets' && '🪨'}
                      {activite === 'Détente' && '🏖️'}
                      {activite === 'Jeux enfants' && '👶'}
                      {activite === 'Randonnée côtière' && '🥾'}
                      {activite === 'Pêche sportive' && '🎣'}
                      {!['Baignade', 'Sports nautiques', 'Pêche', 'Beach volley', 'Kayak', 'Paddle', 'Kitesurf', 'Windsurf', 'Snorkeling', 'Pétanque', 'Pique-nique', 'Lecture', 'Sieste', 'Photographie', 'Contemplation', 'Collecte galets', 'Détente', 'Jeux enfants', 'Randonnée côtière', 'Pêche sportive'].includes(activite) && '🎯'}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{activite}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Météo et conditions */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🌊 Conditions actuelles</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Qualité de l'eau</span>
                  <span className={`font-semibold ${getQualiteEauColor(plage.qualiteEau)}`}>
                    {plage.qualiteEau}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Température eau</span>
                  <span className="font-semibold text-blue-600">
                    {plage.temperatureEau}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Exposition vent</span>
                  <span className="font-semibold text-gray-700">
                    {plage.venExposition}
                  </span>
                </div>
              </div>

              {plage.drapeauBleu && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-2">🏴</span>
                    <span className="text-sm font-medium text-blue-800">
                      Plage Drapeau Bleu
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Qualité environnementale certifiée
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <a 
                  href={`https://www.google.com/maps/search/${encodeURIComponent(plage.nom + ' ' + plage.commune)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center block transition-colors duration-200"
                >
                  🗺️ Itinéraire
                </a>
                
                <button 
                  onClick={() => navigator.share && navigator.share({
                    title: plage.nom,
                    text: plage.description,
                    url: window.location.href
                  })}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium text-center transition-colors duration-200"
                >
                  📤 Partager
                </button>
              </div>
            </div>

            {/* Localisation */}
            {plage.coordonnees && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📍 Localisation</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div>{plage.nom}</div>
                  <div>{plage.commune}</div>
                  <div>Coordonnées: {plage.coordonnees.lat}, {plage.coordonnees.lng}</div>
                </div>
                <a 
                  href={`https://www.google.com/maps?q=${plage.coordonnees.lat},${plage.coordonnees.lng}`}
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
            href="/plages"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Retour aux plages
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlageDetail;
