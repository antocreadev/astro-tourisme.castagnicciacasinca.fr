import React, { useState } from 'react';
import { typesArtisanat, categoriesArtisanat, communesArtisanat, servicesArtisanat, labelsArtisanat } from '../../data/artisanat.js';

const ArtisanatFilterBar = ({ onFiltersChange, onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'tous',
    categorie: 'toutes',
    commune: 'toutes',
    services: [],
    labels: []
  });
  const [sortBy, setSortBy] = useState('nom-asc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleArrayFilterToggle = (filterType, item) => {
    const currentArray = filters[filterType];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    
    const newFilters = { ...filters, [filterType]: newArray };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSort(value);
  };

  const resetFilters = () => {
    const resetFilters = {
      type: 'tous',
      categorie: 'toutes',
      commune: 'toutes',
      services: [],
      labels: []
    };
    setFilters(resetFilters);
    setSearchTerm('');
    setSortBy('nom-asc');
    onFiltersChange(resetFilters);
    onSearch('');
    onSort('nom-asc');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Rechercher artisanat & terroir</h2>
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {showAdvancedFilters ? 'Masquer les filtres' : 'Filtres avancés'}
        </button>
      </div>

      {/* Barre de recherche principale */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Rechercher par nom, produit, spécialité..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {typesArtisanat.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={handleSortChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="nom-asc">Nom A→Z</option>
          <option value="nom-desc">Nom Z→A</option>
          <option value="note-desc">Mieux notés</option>
          <option value="commune">Par commune</option>
          <option value="categorie">Par catégorie</option>
          <option value="type">Par type</option>
        </select>
      </div>

      {/* Filtres avancés */}
      {showAdvancedFilters && (
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={filters.categorie}
                onChange={(e) => handleFilterChange('categorie', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categoriesArtisanat.map(categorie => (
                  <option key={categorie.value} value={categorie.value}>{categorie.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commune
              </label>
              <select
                value={filters.commune}
                onChange={(e) => handleFilterChange('commune', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {communesArtisanat.map(commune => (
                  <option key={commune.value} value={commune.value}>{commune.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'activité
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {typesArtisanat.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services recherchés
              </label>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                {servicesArtisanat.map(service => (
                  <label key={service} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.services.includes(service)}
                      onChange={() => handleArrayFilterToggle('services', service)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Labels & certifications
              </label>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                {labelsArtisanat.map(label => (
                  <label key={label} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.labels.includes(label)}
                      onChange={() => handleArrayFilterToggle('labels', label)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t flex justify-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanatFilterBar;
