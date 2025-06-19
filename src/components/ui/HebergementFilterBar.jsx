import React, { useState } from 'react';
import { typesHebergement, communesHebergement, gammesPrix, servicesHebergement } from '../../data/hebergements.js';

const HebergementFilterBar = ({ onFiltersChange, onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'tous',
    commune: 'toutes',
    prix: 'tous',
    services: []
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

  const handleServiceToggle = (service) => {
    const newServices = filters.services.includes(service)
      ? filters.services.filter(s => s !== service)
      : [...filters.services, service];
    
    const newFilters = { ...filters, services: newServices };
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
      commune: 'toutes',
      prix: 'tous',
      services: []
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
        <h2 className="text-2xl font-bold text-gray-800">Rechercher un hébergement</h2>
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
            placeholder="Rechercher par nom, commune, description..."
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
          {typesHebergement.map(type => (
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
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
          <option value="note-desc">Mieux notés</option>
          <option value="commune">Par commune</option>
        </select>
      </div>

      {/* Filtres avancés */}
      {showAdvancedFilters && (
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commune
              </label>
              <select
                value={filters.commune}
                onChange={(e) => handleFilterChange('commune', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {communesHebergement.map(commune => (
                  <option key={commune.value} value={commune.value}>{commune.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gamme de prix
              </label>
              <select
                value={filters.prix}
                onChange={(e) => handleFilterChange('prix', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {gammesPrix.map(gamme => (
                  <option key={gamme.value} value={gamme.value}>{gamme.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Services souhaités
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {servicesHebergement.map(service => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{service}</span>
                </label>
              ))}
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

export default HebergementFilterBar;
