import React, { useState, useEffect } from 'react';
import ArtisanatCard from '../ui/ArtisanatCard.jsx';
import { Grid, List, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';

const ArtisanatListing = ({ artisanat = [] }) => {
  const [filteredArtisanat, setFilteredArtisanat] = useState(artisanat);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('tous');
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 9;

  // Obtenir les types uniques
  const getUniqueTypes = () => {
    const types = artisanat.map(item => item.type_artisanat_et_produit?.Titre).filter(Boolean);
    return [...new Set(types)].sort();
  };

  useEffect(() => {
    applyFilters();
  }, [artisanat, searchTerm, selectedType]);

  const applyFilters = () => {
    let filtered = [...artisanat];

    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.Titre.toLowerCase().includes(term) ||
        item.Description.toLowerCase().includes(term) ||
        item.type_artisanat_et_produit?.Titre.toLowerCase().includes(term)
      );
    }

    // Filtre par type
    if (selectedType !== 'tous') {
      filtered = filtered.filter(item => item.type_artisanat_et_produit?.Titre === selectedType);
    }

    setFilteredArtisanat(filtered);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredArtisanat.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArtisanat = filteredArtisanat.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const uniqueTypes = getUniqueTypes();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Artisanat & Produits du Terroir
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les artisans et producteurs locaux de la Castagniccia Casinca. 
            Produits authentiques, savoir-faire traditionnel et goûts d'exception.
          </p>
        </div>

        {/* Barre de filtres */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Recherche */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un artisan, produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Type de produit */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="tous">Tous les types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Mode d'affichage */}
            <div className="flex items-center space-x-2">
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
          <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
            <span>
              {filteredArtisanat.length} artisan{filteredArtisanat.length !== 1 ? 's' : ''} trouvé{filteredArtisanat.length !== 1 ? 's' : ''}
            </span>
            <span>
              Page {currentPage} sur {totalPages}
            </span>
          </div>
        </div>

        {/* Résultats */}
        <div className={`grid gap-6 mb-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {currentArtisanat.map((artisan) => (
            <ArtisanatCard key={artisan.id} artisan={artisan} />
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredArtisanat.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏺</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucun artisan trouvé
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

export default ArtisanatListing;
