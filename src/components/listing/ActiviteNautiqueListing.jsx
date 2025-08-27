import React, { useState, useMemo } from "react";
import { getImageUrl } from "../../utils/imageUtils";
import { Waves, Clock, MapPin, Star, Users, Search, ExternalLink, Grid, List } from "lucide-react";
import { getInlineStyles } from '../../utils/colorUtils.js';

const ActiviteNautiqueCard = ({ activite, viewMode = 'grid' }) => {
  const imageUrl = getImageUrl(activite.Image);
  
  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'plongée':
        return 'bg-blue-100 text-blue-800';
      case 'kayak':
        return 'bg-green-100 text-green-800';
      case 'voile':
        return 'bg-purple-100 text-purple-800';
      case 'surf':
        return 'bg-orange-100 text-orange-800';
      case 'paddle':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNiveauColor = (niveau) => {
    switch (niveau?.toLowerCase()) {
      case 'débutant':
        return 'bg-green-100 text-green-800';
      case 'intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'avancé':
      case 'expert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCardClick = () => {
    const slug = activite.Nom?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'activite';
    
    window.location.href = `/activite-nautique/${slug}`;
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex" onClick={handleCardClick}>
        {imageUrl && (
          <div className="w-48 h-32 flex-shrink-0">
            <img
              src={imageUrl}
              alt={activite.Nom}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-800">{activite.Nom}</h3>
            <div className="flex gap-2">
              {activite.Type && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(activite.Type)}`}>
                  {activite.Type}
                </span>
              )}
              {activite.Niveau && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNiveauColor(activite.Niveau)}`}>
                  {activite.Niveau}
                </span>
              )}
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{activite.Description}</p>
          <div className="flex items-center text-sm text-gray-500">
            {activite.commune && (
              <div className="flex items-center gap-1 mr-4">
                <MapPin className="h-4 w-4" />
                <span>{activite.commune.Nom}</span>
              </div>
            )}
            {activite.Tel && (
              <div className="flex items-center gap-1">
                <span>📞 {activite.Tel}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer" onClick={handleCardClick}>
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={activite.Nom}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            {activite.Type && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(activite.Type)}`}>
                {activite.Type}
              </span>
            )}
            {activite.Niveau && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNiveauColor(activite.Niveau)}`}>
                {activite.Niveau}
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{activite.Nom}</h3>
          <Waves className="h-5 w-5 text-blue-600 flex-shrink-0 ml-2" />
        </div>
        
        {activite.commune && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <MapPin className="h-4 w-4" />
            {activite.commune.Nom}
          </div>
        )}
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {activite.Description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {activite.Tel && (
              <div className="flex items-center gap-1">
                <span>📞</span>
                <span>{activite.Tel}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              Voir détails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActiviteNautiqueListing = ({ activiteNautiques, colorData, pageTexts }) => {
  // Utiliser les styles CSS globaux ou inline basés sur colorData
  const dynamicStyles = colorData ? getInlineStyles(colorData) : {};
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("tous");
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // S'assurer que activiteNautiques est un tableau
  const activiteNautiquesArray = Array.isArray(activiteNautiques) ? activiteNautiques : [];

  // Extraire les valeurs uniques pour les filtres
  // Filtres type et niveau retirés

  const communes = useMemo(() => {
    const uniqueCommunes = [...new Set(activiteNautiquesArray
      .filter(activite => activite.commune?.Nom)
      .map(activite => activite.commune.Nom))];
    return uniqueCommunes.sort();
  }, [activiteNautiquesArray]);

  // Filtrer les activités
  const filteredActivites = useMemo(() => {
    return activiteNautiquesArray.filter(activite => {
      const matchesSearch = activite.Nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activite.Description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCommune = selectedCommune === "tous" || activite.commune?.Nom === selectedCommune;
      return matchesSearch && matchesCommune;
    });
  }, [activiteNautiquesArray, searchTerm, selectedCommune]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCommune("tous");
  };

  // Pagination
  const totalPages = Math.ceil(filteredActivites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivites = filteredActivites.slice(startIndex, endIndex);

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
            {pageTexts?.titreActiviteNautique || 'Activités Nautiques'}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {pageTexts?.descriptiontActiviteNautique || 'Découvrez les nombreuses activités nautiques proposées dans la région de Castagniccia Casinca'}
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une activité..."
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
              <option value="tous">Toutes les communes</option>
              {communes.map(commune => (
                <option key={commune} value={commune}>{commune}</option>
              ))}
            </select>
          </div>

          {/* Statistiques et mode d'affichage */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {filteredActivites.length} activité{filteredActivites.length !== 1 ? 's' : ''} trouvée{filteredActivites.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center space-x-4">
              <span>
                Page {currentPage} sur {totalPages}
              </span>
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
          </div>
        </div>

        {/* Grille des activités */}
        <div className={`grid gap-6 mb-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {currentActivites.map((activite) => (
            <ActiviteNautiqueCard key={activite.id} activite={activite} viewMode={viewMode} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              Précédent
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded-lg ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              Suivant
            </button>
          </div>
        )}

        {/* Message si aucun résultat */}
        {filteredActivites.length === 0 && (
          <div className="text-center py-12">
            <Waves className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune activité trouvée
            </h3>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <button 
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiviteNautiqueListing;
