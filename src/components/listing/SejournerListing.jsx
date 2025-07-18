import { useState, useCallback, useEffect } from 'react';
import { 
  filterSejournersByType, 
  filterSejournersByCommune, 
  filterSejournersByNote,
  searchSejourners, 
  sortSejourners,
  getUniqueCommunes,
  getUniqueTypes
} from '../../utils/sejournerFilters.js';
import SejournerCard from '../ui/SejournerCard.jsx';
import { Grid, List, ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';

export default function SejournerListing({ sejourners = [] }) {
  // Récupérer les paramètres URL pour initialiser les filtres
  const getInitialFilters = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const type = urlParams.get('type');
      return {
        commune: 'toutes',
        type: type || 'tous',
        search: ''
      };
    }
    return {
      commune: 'toutes',
      type: 'tous',
      search: ''
    };
  };

  const [filteredSejourners, setFilteredSejourners] = useState(sejourners);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('nom');
  const [filters, setFilters] = useState(getInitialFilters());
  const sejournersPerPage = 12;

  // Mettre à jour les séjours filtrés quand les données changent
  useEffect(() => {
    applyFilters();
  }, [sejourners, filters, sortBy]);

  const applyFilters = () => {
    let filtered = [...sejourners];
    
    // Appliquer les filtres
    if (filters.commune && filters.commune !== 'toutes') {
      filtered = filterSejournersByCommune(filtered, filters.commune);
    }
    
    if (filters.type && filters.type !== 'tous') {
      if (filters.type === 'Charté') {
        filtered = filterSejournersByNote(filtered, 'Certifié');
      } else {
        filtered = filterSejournersByType(filtered, filters.type);
      }
    }
    
    if (filters.search) {
      filtered = searchSejourners(filtered, filters.search);
    }
    
    // Appliquer le tri
    filtered = sortSejourners(filtered, sortBy);
    
    setFilteredSejourners(filtered);
  };

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  }, []);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  // Pagination
  const totalPages = Math.ceil(filteredSejourners.length / sejournersPerPage);
  const startIndex = (currentPage - 1) * sejournersPerPage;
  const endIndex = startIndex + sejournersPerPage;
  const currentSejourners = filteredSejourners.slice(startIndex, endIndex);

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
            <span className="text-gray-900">Séjourner</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-black mb-4">Séjourner</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Découvrez nos hébergements et services pour profiter pleinement de votre séjour en Castagniccia-Casinca
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-b">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Commune:</label>
            <select
              value={filters.commune}
              onChange={(e) => handleFiltersChange({ commune: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="toutes">Toutes</option>
              {sejourners.map(s => s.commune?.Nom).filter(Boolean).filter((commune, index, arr) => arr.indexOf(commune) === index).sort().map((commune) => (
                <option key={commune} value={commune}>
                  {commune}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Type:</label>
            <select
              value={filters.type}
              onChange={(e) => handleFiltersChange({ type: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="tous">Tous</option>
              {sejourners.map(s => s.type_sejourner?.Denomination).filter(Boolean).filter((type, index, arr) => arr.indexOf(type) === index).sort().map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
              <option value="Charté">Charté</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Recherche:</label>
            <input
              type="text"
              value={filters.search}
              placeholder="Rechercher un hébergement..."
              onChange={(e) => handleFiltersChange({ search: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredSejourners.length}</span> hébergement{filteredSejourners.length > 1 ? 's' : ''} trouvé{filteredSejourners.length > 1 ? 's' : ''}
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Trier par:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="nom-asc">Nom (A-Z)</option>
                <option value="nom-desc">Nom (Z-A)</option>
                <option value="commune">Commune</option>
                <option value="type">Type</option>
                <option value="note-desc">Note (meilleure en premier)</option>
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

      {/* Sejourners Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {currentSejourners.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun hébergement trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <>
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
            }`}>
              {currentSejourners.map((sejourner) => (
                <SejournerCard
                  key={sejourner.id}
                  sejourner={sejourner}
                  href={`/sejourner/${sejourner.documentId}`}
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
