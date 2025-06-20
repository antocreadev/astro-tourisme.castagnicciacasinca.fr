import React, { useState, useMemo } from 'react';
import ActiviteFilterBar from '../ui/ActiviteFilterBar.jsx';
import ActiviteCard from '../ui/ActiviteCard.jsx';
import { activiteFilters, filterActivites, sortActivites, getUniqueCommunes } from '../../utils/activiteFilters.js';

const ActivitesListing = ({ activites }) => {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('nom');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const communes = useMemo(() => getUniqueCommunes(activites), [activites]);

  const filteredAndSortedActivites = useMemo(() => {
    const filtered = filterActivites(activites, filters);
    return sortActivites(filtered, sortBy);
  }, [activites, filters, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedActivites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivites = filteredAndSortedActivites.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Activités et loisirs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez toutes les activités et loisirs disponibles en Castagniccia Casinca pour un séjour inoubliable.
          </p>
        </div>

        {/* Filtres */}
        <ActiviteFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          activiteFilters={activiteFilters}
          communes={communes}
        />

        {/* Résultats */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredAndSortedActivites.length} activité(s) trouvée(s)
          </p>
        </div>

        {/* Grille des activités */}
        {paginatedActivites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedActivites.map((activite) => (
              <ActiviteCard key={activite.id} activite={activite} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucune activité ne correspond à vos critères de recherche.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-2 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitesListing;
