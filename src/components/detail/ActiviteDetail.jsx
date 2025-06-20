import React from 'react';

const ActiviteDetail = ({ activite }) => {
  if (!activite) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Activité non trouvée</h1>
          <p className="text-gray-600 mb-6">L'activité que vous recherchez n'existe pas.</p>
          <a 
            href="/activites" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Retour aux activités
          </a>
        </div>
      </div>
    );
  }

  const getNiveauColor = (niveau) => {
    switch (niveau) {
      case 'facile': return 'bg-green-100 text-green-800';
      case 'moyen': return 'bg-yellow-100 text-yellow-800';
      case 'difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'sport': return 'bg-blue-100 text-blue-800';
      case 'culture': return 'bg-purple-100 text-purple-800';
      case 'nature': return 'bg-green-100 text-green-800';
      case 'aventure': return 'bg-orange-100 text-orange-800';
      case 'famille': return 'bg-pink-100 text-pink-800';
      case 'detente': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation de retour */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <a 
            href="/activites" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux activités
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image principale */}
          {activite.image && (
            <div className="h-64 md:h-96 bg-gray-200 overflow-hidden">
              <img 
                src={activite.image} 
                alt={activite.nom}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 lg:p-8">
            {/* En-tête */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(activite.type)}`}>
                  {activite.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getNiveauColor(activite.niveau)}`}>
                  {activite.niveau}
                </span>
                {activite.ages && activite.ages.map((age, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {age}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {activite.nom}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {activite.commune}
                </div>

                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {activite.dureeTexte}
                </div>

                {activite.prix && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    {activite.prix}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {activite.description}
              </p>
            </div>

            {/* Détails supplémentaires */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informations pratiques */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Informations pratiques</h3>
                <div className="space-y-3">
                  {activite.adresse && (
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700">{activite.adresse}</span>
                    </div>
                  )}

                  {activite.telephone && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-700">{activite.telephone}</span>
                    </div>
                  )}

                  {activite.email && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${activite.email}`} className="text-blue-600 hover:text-blue-800">
                        {activite.email}
                      </a>
                    </div>
                  )}

                  {activite.siteWeb && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                      </svg>
                      <a href={activite.siteWeb} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        Site web
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Équipements et services */}
              {activite.equipements && activite.equipements.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Équipements fournis</h3>
                  <div className="space-y-2">
                    {activite.equipements.map((equipement, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{equipement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Galerie d'images */}
            {activite.galerie && activite.galerie.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Galerie</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {activite.galerie.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${activite.nom} - Image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiviteDetail;
