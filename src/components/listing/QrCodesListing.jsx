import { useState, useEffect } from 'react';
import QrCodeCard from '../ui/QrCodeCard.jsx';
import { Grid, List, Search, QrCode } from 'lucide-react';

export default function QrCodesListing({ qrCodes = [] }) {
  const getInitialFilters = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return {
        commune: urlParams.get('commune') || 'toutes',
        search: ''
      };
    }
    return { commune: 'toutes', search: '' };
  };

  const initialFilters = getInitialFilters();
  const [filteredItems, setFilteredItems] = useState(qrCodes);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(initialFilters.search);
  const [selectedCommune, setSelectedCommune] = useState(initialFilters.commune);
  const itemsPerPage = 12;

  const getUniqueCommunes = () => {
    const communes = qrCodes.map(item => item.commune).filter(Boolean);
    return [...new Set(communes)].sort();
  };

  useEffect(() => {
    let filtered = [...qrCodes];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(term) ||
        item.commune?.toLowerCase().includes(term)
      );
    }

    if (selectedCommune !== 'toutes') {
      filtered = filtered.filter(item => item.commune === selectedCommune);
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [qrCodes, searchTerm, selectedCommune]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCommune('toutes');
  };

  const activeFiltersCount = [searchTerm, selectedCommune !== 'toutes'].filter(Boolean).length;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
              <QrCode className="w-5 h-5" />
              <span className="font-medium">Points d'intérêt</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Points d'intérêt QR Codes
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez les points d'intérêt de la Castagniccia-Casinca grâce aux QR codes disséminés sur le territoire.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              <select
                value={selectedCommune}
                onChange={(e) => setSelectedCommune(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="toutes">Toutes les communes</option>
                {getUniqueCommunes().map(commune => (
                  <option key={commune} value={commune}>{commune}</option>
                ))}
              </select>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Effacer les filtres ({activeFiltersCount})
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {filteredItems.length} résultat{filteredItems.length !== 1 ? 's' : ''}
              </span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentItems.length === 0 ? (
          <div className="text-center py-16">
            <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-4'
          }>
            {currentItems.map(item => (
              <QrCodeCard
                key={item.documentId}
                qrCode={item}
                href={`/qr-codes/${item.documentId}`}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Précédent
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
