import React from 'react';

const ActiviteCard = ({ activite }) => {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {activite.image && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img 
            src={activite.image} 
            alt={activite.nom}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
            {activite.nom}
          </h3>
          <div className="flex gap-2 ml-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(activite.type)}`}>
              {activite.type}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNiveauColor(activite.niveau)}`}>
              {activite.niveau}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-3 line-clamp-3">
          {activite.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {activite.commune}
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {activite.dureeTexte}
          </div>

          {activite.prix && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              {activite.prix}
            </div>
          )}
        </div>

        {activite.ages && activite.ages.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {activite.ages.map((age, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {age}
                </span>
              ))}
            </div>
          </div>
        )}

        <a 
          href={`/activites/${activite.slug}`}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Voir les détails
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ActiviteCard;
