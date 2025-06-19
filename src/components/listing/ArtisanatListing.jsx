import React, { useState, useEffect } from 'react';
import ArtisanatFilterBar from '../ui/ArtisanatFilterBar.jsx';
import ArtisanatCard from '../ui/ArtisanatCard.jsx';
import { artisanatTerroir } from '../../data/artisanat.js';
import {
  filterArtisanatByType,
  filterArtisanatByCategorie,
  filterArtisanatByCommune,
  filterArtisanatByServices,
  filterArtisanatByLabels,
  searchArtisanat,
  sortArtisanat
} from '../../utils/artisanatFilters.js';

const ArtisanatListing = () => {
  const [filteredArtisanat, setFilteredArtisanat] = useState(artisanatTerroir);
  const [currentFilters, setCurrentFilters] = useState({
    type: 'tous',
    categorie: 'toutes',
    commune: 'toutes',
    services: [],
    labels: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nom-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    applyFilters();
  }, [currentFilters, searchTerm, sortBy]);

  const applyFilters = () => {
    let filtered = artisanatTerroir;
    
    // Appliquer la recherche
    filtered = searchArtisanat(filtered, searchTerm);
    
    // Appliquer les filtres
    filtered = filterArtisanatByType(filtered, currentFilters.type);
    filtered = filterArtisanatByCategorie(filtered, currentFilters.categorie);
    filtered = filterArtisanatByCommune(filtered, currentFilters.commune);
    filtered = filterArtisanatByServices(filtered, currentFilters.services);
    filtered = filterArtisanatByLabels(filtered, currentFilters.labels);
    
    // Appliquer le tri
    filtered = sortArtisanat(filtered, sortBy);
    
    setFilteredArtisanat(filtered);
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
  const totalPages = Math.ceil(filteredArtisanat.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArtisanat = filteredArtisanat.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Statistiques pour l'en-tête
  const producteurs = artisanatTerroir.filter(a => a.type === 'producteur').length;
  const artisans = artisanatTerroir.filter(a => a.type === 'artisan').length;
  const labelsAOC = artisanatTerroir.filter(a => a.labels.some(l => l.includes('AOC'))).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Artisanat & Terroir de Castagniccia-Casinca
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            Découvrez les savoir-faire traditionnels et les produits du terroir de notre région. 
            Rencontrez nos artisans et producteurs passionnés qui perpétuent les traditions corses 
            avec authenticité et excellence.
          </p>
          
          {/* Statistiques */}
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{producteurs}</div>
                <div className="text-sm text-gray-600">Producteurs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{artisans}</div>
                <div className="text-sm text-gray-600">Artisans</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{labelsAOC}</div>
                <div className="text-sm text-gray-600">Labels AOC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <ArtisanatFilterBar 
          onFiltersChange={handleFiltersChange}
          onSearch={handleSearch}
          onSort={handleSort}
        />

        {/* Résultats */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredArtisanat.length}</span> artisan{filteredArtisanat.length > 1 ? 's' : ''} & producteur{filteredArtisanat.length > 1 ? 's' : ''} trouvé{filteredArtisanat.length > 1 ? 's' : ''}
            </p>
            {totalPages > 1 && (
              <p className="text-gray-600">
                Page {currentPage} sur {totalPages}
              </p>
            )}
          </div>
        </div>

        {/* Grille des artisans */}
        {currentArtisanat.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentArtisanat.map((artisan) => (
              <ArtisanatCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛠️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aucun artisan ou producteur trouvé
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

        {/* Call to action */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Vous êtes artisan ou producteur ?
          </h2>
          <p className="text-gray-600 mb-6">
            Rejoignez notre réseau et faites découvrir votre savoir-faire aux visiteurs de la région.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArtisanatListing;
