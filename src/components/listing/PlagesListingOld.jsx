import React, { useState, useEffect } from 'react';
import PlageFilterBar from '../ui/PlageFilterBar.jsx';
import PlageCard from '../ui/PlageCard.jsx';
import { plages } from '../../data/plages.js';
import {
  filterPlagesByType,
  filterPlagesByCommune,
  filterPlagesByServices,
  filterPlagesByActivites,
  filterPlagesByAccess,
  filterPlagesByAnimaux,
  filterPlagesByDrapeauBleu,
  searchPlages,
  sortPlages
} from '../../utils/plageFilters.js';

const PlagesListing = ({ plages: apiPlages = [] }) => {
  // Utilise les données de l'API ou les données statiques en fallback
  const plagesData = apiPlages.length > 0 ? apiPlages : plages;
  
  const [filteredPlages, setFilteredPlages] = useState(plagesData);
  const [currentFilters, setCurrentFilters] = useState({
    type: 'tous',
    commune: 'toutes',
    services: [],
    activites: [],
    acces: 'tous',
    animaux: false,
    drapeauBleu: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nom-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    applyFilters();
  }, [currentFilters, searchTerm, sortBy, plagesData]);

  const applyFilters = () => {
    let filtered = plagesData;
    
    // Appliquer la recherche
    filtered = searchPlages(filtered, searchTerm);
    
    // Appliquer les filtres
    filtered = filterPlagesByType(filtered, currentFilters.type);
    filtered = filterPlagesByCommune(filtered, currentFilters.commune);
    filtered = filterPlagesByServices(filtered, currentFilters.services);
    filtered = filterPlagesByActivites(filtered, currentFilters.activites);
    filtered = filterPlagesByAccess(filtered, currentFilters.acces);
    
    if (currentFilters.animaux) {
      filtered = filterPlagesByAnimaux(filtered, currentFilters.animaux);
    }
    
    if (currentFilters.drapeauBleu) {
      filtered = filterPlagesByDrapeauBleu(filtered, currentFilters.drapeauBleu);
    }
    
    // Appliquer le tri
    filtered = sortPlages(filtered, sortBy);
    
    setFilteredPlages(filtered);
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
  const totalPages = Math.ceil(filteredPlages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPlages = filteredPlages.slice(startIndex, endIndex);

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
            Les Plages de la Costa Verde
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les plus belles plages de la côte orientale de la Corse : 
            sable fin, eaux cristallines et paysages préservés vous attendent 
            pour des moments de détente inoubliables.
          </p>
        </div>

        {/* Filtres */}
        <PlageFilterBar 
          onFiltersChange={handleFiltersChange}
          onSearch={handleSearch}
          onSort={handleSort}
        />

        {/* Résultats */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredPlages.length}</span> plage{filteredPlages.length > 1 ? 's' : ''} trouvée{filteredPlages.length > 1 ? 's' : ''}
            </p>
            {totalPages > 1 && (
              <p className="text-gray-600">
                Page {currentPage} sur {totalPages}
              </p>
            )}
          </div>
        </div>

        {/* Grille des plages */}
        {currentPlages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentPlages.map((plage) => (
              <PlageCard key={plage.id} plage={plage} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏖️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aucune plage trouvée
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

export default PlagesListing;
