import React from 'react';

const InformationFilterBar = ({ 
  filters, 
  onFilterChange, 
  sortBy, 
  onSortChange, 
  informationFilters, 
  communes 
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Recherche */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rechercher
          </label>
          <input
            type="text"
            placeholder="Nom, description, commune..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.categorie || ''}
            onChange={(e) => onFilterChange('categorie', e.target.value)}
          >
            {informationFilters.categories.map(categorie => (
              <option key={categorie.value} value={categorie.value}>
                {categorie.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.type || ''}
            onChange={(e) => onFilterChange('type', e.target.value)}
          >
            {informationFilters.types.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Commune */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Commune
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.commune || ''}
            onChange={(e) => onFilterChange('commune', e.target.value)}
          >
            {communes.map(commune => (
              <option key={commune.value} value={commune.value}>
                {commune.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tri */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trier par
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="nom">Nom</option>
            <option value="categorie">Catégorie</option>
            <option value="commune">Commune</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InformationFilterBar;
