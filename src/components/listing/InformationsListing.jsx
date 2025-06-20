import React, { useState, useMemo } from 'react';
import InformationFilterBar from '../ui/InformationFilterBar.jsx';
import InformationCard from '../ui/InformationCard.jsx';
import { informationFilters, filterInformations, sortInformations, getUniqueCommunes } from '../../utils/informationFilters.js';

const InformationsListing = ({ informations }) => {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('nom');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const communes = useMemo(() => getUniqueCommunes(informations), [informations]);

  const filteredAndSortedInformations = useMemo(() => {
    const filtered = filterInformations(informations, filters);
    return sortInformations(filtered, sortBy);
  }, [informations, filters, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedInformations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInformations = filteredAndSortedInformations.slice(startIndex, startIndex + itemsPerPage);

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
            Informations pratiques
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Toutes les informations utiles pour votre séjour en Castagniccia Casinca : services, transports, santé, commerces et bien plus.
          </p>
        </div>

        {/* Filtres */}
        <InformationFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          informationFilters={informationFilters}
          communes={communes}
        />

        {/* Résultats */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredAndSortedInformations.length} information(s) trouvée(s)
          </p>
        </div>

        {/* Grille des informations */}
        {paginatedInformations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedInformations.map((information) => (
              <InformationCard key={information.id} information={information} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucune information ne correspond à vos critères de recherche.
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

export default InformationsListing;
