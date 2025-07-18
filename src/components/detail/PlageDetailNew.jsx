import React from 'react';
import { getImageUrl } from '../../utils/eventUtils';

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

  // Fonction pour déterminer les équipements PMR selon le niveau
  const getPMREquipements = (niveau) => {
    const equipements = [];
    if (niveau >= 1) equipements.push('Tapis');
    if (niveau >= 2) equipements.push('Fauteuil');
    if (niveau >= 3) equipements.push('WC PMR');
    return equipements;
  };

  // Fonction pour déterminer l'accès PMR
  const isPMRAccessible = (niveau) => {
    return niveau > 0;
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
            <li className="text-gray-800 font-medium">{plage.Nom}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Galerie d'images */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative">
                <img 
                  src={getImageUrl(plage.Image)} 
                  alt={plage.Nom}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {isPMRAccessible(plage.Niveau) && (
                    <div className="bg-blue-600 text-white px-3 py-2 rounded-full text-sm">
                      ♿ PMR
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Informations principales */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{plage.Nom}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="mr-2">📍</span>
                    <span>{plage.commune?.Nom}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {plage.Description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Informations</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="mr-2">♿</span>
                      <span>Accès PMR: {isPMRAccessible(plage.Niveau) ? 'Oui' : 'Non'}</span>
                    </li>
                    {plage.Coordonnees && (
                      <li className="flex items-center">
                        <span className="mr-2">📍</span>
                        <span>Coordonnées: {plage.Coordonnees.lat.toFixed(5)}, {plage.Coordonnees.lng.toFixed(5)}</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                {isPMRAccessible(plage.Niveau) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Équipements PMR</h3>
                    <ul className="space-y-2 text-gray-600">
                      {getPMREquipements(plage.Niveau).map((equipement, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>{equipement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Description de la commune */}
            {plage.commune?.description && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">À propos de {plage.commune.Nom}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {plage.commune.description}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations pratiques</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Localisation</h4>
                  <p className="text-gray-600">{plage.commune?.Nom}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Accessibilité</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${isPMRAccessible(plage.Niveau) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {isPMRAccessible(plage.Niveau) ? 'PMR accessible' : 'Non accessible PMR'}
                    </span>
                  </div>
                </div>

                {isPMRAccessible(plage.Niveau) && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Niveau d'équipement</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-gray-700">Niveau {plage.Niveau}</span>
                    </div>
                  </div>
                )}

                {plage.Coordonnees && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Coordonnées GPS</h4>
                    <div className="text-sm text-gray-600">
                      <p>Latitude: {plage.Coordonnees.lat.toFixed(5)}</p>
                      <p>Longitude: {plage.Coordonnees.lng.toFixed(5)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
              <div className="space-y-3">
                {plage.Coordonnees && (
                  <a 
                    href={`https://maps.google.com/maps?q=${plage.Coordonnees.lat},${plage.Coordonnees.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    🗺️ Voir sur Google Maps
                  </a>
                )}
                
                <a 
                  href="/plages"
                  className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ← Retour aux plages
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlageDetail;
