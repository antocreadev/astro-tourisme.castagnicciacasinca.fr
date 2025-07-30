import { useState, useCallback } from 'react';
import { filterSites, sortSites } from '../../utils/siteFilters.js';
import { sites as fallbackSites, siteTypes, difficulties, durations, sitesCommunes } from '../../data/sites.js';
import SiteFilterBar from '../ui/SiteFilterBar.jsx';
import SiteCard from '../ui/SiteCard.jsx';
import { Grid, List, ChevronLeft, ChevronRight, Mountain } from 'lucide-react';

export default function SitesListing({ sites = fallbackSites }) {
  const [filteredSites, setFilteredSites] = useState(sites);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('title');
  const sitesPerPage = 12;

  const handleFiltersChange = useCallback((filters) => {
    const filtered = filterSites(sites, filters);
    const sorted = sortSites(filtered, sortBy);
    setFilteredSites(sorted);
    setCurrentPage(1); // Reset to first page when filters change
  }, [sites, sortBy]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    const sorted = sortSites(filteredSites, newSortBy);
    setFilteredSites(sorted);
  };

  // Pagination
  const totalPages = Math.ceil(filteredSites.length / sitesPerPage);
  const startIndex = (currentPage - 1) * sitesPerPage;
  const endIndex = startIndex + sitesPerPage;
  const currentSites = filteredSites.slice(startIndex, endIndex);

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
            <span className="text-gray-900">Sites phares</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-black mb-4">Les sites phares</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Découvrez les trésors naturels et patrimoniaux de la Castagniccia-Casinca : 
              sommets panoramiques, villages authentiques, sources thermales et écosystèmes préservés.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <SiteFilterBar 
        types={siteTypes}
        communes={sitesCommunes}
        difficulties={difficulties}
        durations={durations}
        onFiltersChange={handleFiltersChange}
      />

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredSites.length}</span> site{filteredSites.length > 1 ? 's' : ''} trouvé{filteredSites.length > 1 ? 's' : ''}
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Trier par:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="title">Nom</option>
                <option value="commune">Commune</option>
                <option value="difficulty">Difficulté</option>
                <option value="duration">Durée</option>
                <option value="altitude">Altitude</option>
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

      {/* Sites Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {currentSites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Mountain className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun site trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <>
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
            }`}>
              {currentSites.map((site) => (
                <SiteCard
                  key={site.id}
                  site={site}
                  href={`/sites-phares/${site.slug}`}
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
