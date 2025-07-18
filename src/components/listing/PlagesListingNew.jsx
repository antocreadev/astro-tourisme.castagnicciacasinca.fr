import React, { useState, useEffect } from 'react';
import PlageCard from '../ui/PlageCard.jsx';
import { Grid, List, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const PlagesListing = ({ plages = [] }) => {
  const [filteredPlages, setFilteredPlages] = useState(plages);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('toutes');
  const [selectedPMR, setSelectedPMR] = useState('tous');
  const itemsPerPage = 9;

  // Obtenir les communes uniques
  const getUniqueCommunes = () => {
    const communes = plages.map(plage => plage.commune?.Nom).filter(Boolean);
    return [...new Set(communes)].sort();
  };

  useEffect(() => {
    applyFilters();
  }, [plages, searchTerm, selectedCommune, selectedPMR]);

  const applyFilters = () => {
    let filtered = [...plages];

    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(plage => 
        plage.Nom.toLowerCase().includes(term) ||
        plage.commune?.Nom.toLowerCase().includes(term) ||
        plage.Description.toLowerCase().includes(term)
      );
    }

    // Filtre par commune
    if (selectedCommune !== 'toutes') {
      filtered = filtered.filter(plage => plage.commune?.Nom === selectedCommune);
    }

    // Filtre par PMR
    if (selectedPMR !== 'tous') {
      if (selectedPMR === 'accessible') {
        filtered = filtered.filter(plage => plage.Niveau > 0);
      } else if (selectedPMR === 'non-accessible') {
        filtered = filtered.filter(plage => plage.Niveau === 0);
      }
    }

    setFilteredPlages(filtered);
    setCurrentPage(1);
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

  const uniqueCommunes = getUniqueCommunes();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Les Plages de la Castagniccia Casinca
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les plus belles plages de la côte orientale de la Corse : 
            sable fin, eaux cristallines et paysages préservés vous attendent.
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une plage..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Commune */}
            <select
              value={selectedCommune}
              onChange={(e) => setSelectedCommune(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="toutes">Toutes les communes</option>
              {uniqueCommunes.map(commune => (
                <option key={commune} value={commune}>{commune}</option>
              ))}
            </select>

            {/* PMR */}
            <select
              value={selectedPMR}
              onChange={(e) => setSelectedPMR(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="tous">Tous les accès</option>
              <option value="accessible">PMR accessible</option>
              <option value="non-accessible">Non PMR</option>
            </select>

            {/* Mode d'affichage */}
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {filteredPlages.length} plage{filteredPlages.length !== 1 ? 's' : ''} trouvée{filteredPlages.length !== 1 ? 's' : ''}
            </span>
            <span>
              Page {currentPage} sur {totalPages}
            </span>
          </div>
        </div>

        {/* Résultats */}
        <div className={`grid gap-6 mb-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {currentPlages.map((plage) => (
            <PlageCard key={plage.id} plage={plage} />
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredPlages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏖️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucune plage trouvée
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlagesListing;
