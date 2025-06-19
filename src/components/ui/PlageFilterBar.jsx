import React, { useState } from 'react';
import { typesPlage, communesPlage, servicesPlage, activitesPlage } from '../../data/plages.js';

const PlageFilterBar = ({ onFiltersChange, onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'tous',
    commune: 'toutes',
    services: [],
    activites: [],
    acces: 'tous',
    animaux: false,
    drapeauBleu: false
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

  const handleBooleanFilterToggle = (filterType) => {
    const newFilters = { ...filters, [filterType]: !filters[filterType] };
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
      services: [],
      activites: [],
      acces: 'tous',
      animaux: false,
      drapeauBleu: false
    };
    setFilters(resetFilters);
    setSearchTerm('');
    setSortBy('nom-asc');
    onFiltersChange(resetFilters);
    onSearch('');
    onSort('nom-asc');
  };

  const niveauxAcces = [
    { value: "tous", label: "Tous niveaux" },
    { value: "Très facile", label: "Très facile" },
    { value: "Facile", label: "Facile" },
    { value: "Modéré", label: "Modéré" },
    { value: "Difficile", label: "Difficile" }
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Rechercher une plage</h2>
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
          {typesPlage.map(type => (
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
          <option value="note-desc">Mieux notées</option>
          <option value="commune">Par commune</option>
          <option value="longueur-desc">Plus longues</option>
          <option value="longueur-asc">Plus courtes</option>
        </select>
      </div>

      {/* Filtres avancés */}
      {showAdvancedFilters && (
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commune
              </label>
              <select
                value={filters.commune}
                onChange={(e) => handleFilterChange('commune', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {communesPlage.map(commune => (
                  <option key={commune.value} value={commune.value}>{commune.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau d'accès
              </label>
              <select
                value={filters.acces}
                onChange={(e) => handleFilterChange('acces', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {niveauxAcces.map(niveau => (
                  <option key={niveau.value} value={niveau.value}>{niveau.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Critères spéciaux
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.animaux}
                  onChange={() => handleBooleanFilterToggle('animaux')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Animaux autorisés</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.drapeauBleu}
                  onChange={() => handleBooleanFilterToggle('drapeauBleu')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Drapeau Bleu</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services souhaités
              </label>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                {servicesPlage.map(service => (
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
                Activités souhaitées
              </label>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                {activitesPlage.map(activite => (
                  <label key={activite} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.activites.includes(activite)}
                      onChange={() => handleArrayFilterToggle('activites', activite)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{activite}</span>
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

export default PlageFilterBar;
