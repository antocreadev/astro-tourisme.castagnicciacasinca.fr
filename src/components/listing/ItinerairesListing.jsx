import { useState, useCallback } from 'react';
import { filterItineraires, sortItineraires } from '../../utils/itineraireFilters.js';
import { itineraires, itineraireTypes, itinerairesDifficulties, itinerairesDurations, transports, themes } from '../../data/itineraires.js';
import ItineraireFilterBar from '../ui/ItineraireFilterBar.jsx';
import ItineraireCard from '../ui/ItineraireCard.jsx';
import { Grid, List, ChevronLeft, ChevronRight, Route } from 'lucide-react';

export default function ItinerairesListing() {
  const [filteredItineraires, setFilteredItineraires] = useState(itineraires);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('title');
  const itinerairesPerPage = 12;

  const handleFiltersChange = useCallback((filters) => {
    const filtered = filterItineraires(itineraires, filters);
    const sorted = sortItineraires(filtered, sortBy);
    setFilteredItineraires(sorted);
    setCurrentPage(1); // Reset to first page when filters change
  }, [sortBy]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    const sorted = sortItineraires(filteredItineraires, newSortBy);
    setFilteredItineraires(sorted);
  };

  // Pagination
  const totalPages = Math.ceil(filteredItineraires.length / itinerairesPerPage);
  const startIndex = (currentPage - 1) * itinerairesPerPage;
  const endIndex = startIndex + itinerairesPerPage;
  const currentItineraires = filteredItineraires.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-gray-700">Accueil</a>
            <span>/</span>
            <span className="text-gray-900">Itinéraires</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-black mb-4">Les itinéraires</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Explorez la Castagniccia-Casinca à travers nos circuits thématiques : 
              patrimoine historique, villages authentiques, nature préservée et savoir-faire traditionnels.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ItineraireFilterBar 
        types={itineraireTypes}
        difficulties={itinerairesDifficulties}
        durations={itinerairesDurations}
        transports={transports}
        themes={themes}
        onFiltersChange={handleFiltersChange}
      />

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredItineraires.length}</span> itinéraire{filteredItineraires.length > 1 ? 's' : ''} trouvé{filteredItineraires.length > 1 ? 's' : ''}
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Trier par:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="title">Nom</option>
                <option value="type">Type</option>
                <option value="difficulty">Difficulté</option>
                <option value="duration">Durée</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Itineraires Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {currentItineraires.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Route className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun itinéraire trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <>
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
            }`}>
              {currentItineraires.map((itineraire) => (
                <ItineraireCard
                  key={itineraire.id}
                  itineraire={itineraire}
                  href={`/itineraires/${itineraire.slug}`}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-12 gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 text-gray-600 disabled:text-gray-400 hover:text-gray-900 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 text-gray-600 disabled:text-gray-400 hover:text-gray-900 disabled:cursor-not-allowed"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
