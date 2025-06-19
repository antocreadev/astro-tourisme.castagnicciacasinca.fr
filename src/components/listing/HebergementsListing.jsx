import React, { useState, useEffect } from 'react';
import HebergementFilterBar from '../ui/HebergementFilterBar.jsx';
import HebergementCard from '../ui/HebergementCard.jsx';
import { hebergements } from '../../data/hebergements.js';
import {
  filterHebergementsByType,
  filterHebergementsByCommune,
  filterHebergementsByPrice,
  filterHebergementsByServices,
  searchHebergements,
  sortHebergements
} from '../../utils/hebergementFilters.js';

const HebergementsListing = () => {
  const [filteredHebergements, setFilteredHebergements] = useState(hebergements);
  const [currentFilters, setCurrentFilters] = useState({
    type: 'tous',
    commune: 'toutes',
    prix: 'tous',
    services: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nom-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    applyFilters();
  }, [currentFilters, searchTerm, sortBy]);

  const applyFilters = () => {
    let filtered = hebergements;
    
    // Appliquer la recherche
    filtered = searchHebergements(filtered, searchTerm);
    
    // Appliquer les filtres
    filtered = filterHebergementsByType(filtered, currentFilters.type);
    filtered = filterHebergementsByCommune(filtered, currentFilters.commune);
    filtered = filterHebergementsByPrice(filtered, currentFilters.prix);
    filtered = filterHebergementsByServices(filtered, currentFilters.services);
    
    // Appliquer le tri
    filtered = sortHebergements(filtered, sortBy);
    
    setFilteredHebergements(filtered);
    setCurrentPage(1); // Reset à la première page
  };

  const handleFiltersChange = (newFilters) => {
    setCurrentFilters(newFilters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
  };

  // Pagination
  const totalPages = Math.ceil(filteredHebergements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHebergements = filteredHebergements.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Hébergements en Castagniccia-Casinca
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection d'hébergements de qualité : hôtels de charme, 
            auberges traditionnelles, campings familiaux et résidences modernes pour 
            un séjour inoubliable.
          </p>
        </div>

        {/* Filtres */}
        <HebergementFilterBar 
          onFiltersChange={handleFiltersChange}
          onSearch={handleSearch}
          onSort={handleSort}
        />

        {/* Résultats */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredHebergements.length}</span> hébergement{filteredHebergements.length > 1 ? 's' : ''} trouvé{filteredHebergements.length > 1 ? 's' : ''}
            </p>
            {totalPages > 1 && (
              <p className="text-gray-600">
                Page {currentPage} sur {totalPages}
              </p>
            )}
          </div>
        </div>

        {/* Grille des hébergements */}
        {currentHebergements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentHebergements.map((hebergement) => (
              <HebergementCard key={hebergement.id} hebergement={hebergement} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aucun hébergement trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos critères de recherche ou vos filtres.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-2 rounded-lg border ${
                  page === currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HebergementsListing;
