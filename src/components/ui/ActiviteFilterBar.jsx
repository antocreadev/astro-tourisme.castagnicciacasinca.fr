import React from 'react';

const ActiviteFilterBar = ({ 
  filters, 
  onFilterChange, 
  sortBy, 
  onSortChange, 
  activiteFilters, 
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

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type d'activité
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.type || ''}
            onChange={(e) => onFilterChange('type', e.target.value)}
          >
            {activiteFilters.types.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Niveau */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Niveau
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.niveau || ''}
            onChange={(e) => onFilterChange('niveau', e.target.value)}
          >
            {activiteFilters.niveaux.map(niveau => (
              <option key={niveau.value} value={niveau.value}>
                {niveau.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Durée */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durée
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.duree || ''}
            onChange={(e) => onFilterChange('duree', e.target.value)}
          >
            {activiteFilters.durees.map(duree => (
              <option key={duree.value} value={duree.value}>
                {duree.label}
              </option>
            ))}
          </select>
        </div>

        {/* Âge */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Public
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.age || ''}
            onChange={(e) => onFilterChange('age', e.target.value)}
          >
            {activiteFilters.ages.map(age => (
              <option key={age.value} value={age.value}>
                {age.label}
              </option>
            ))}
          </select>
        </div>

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
            <option value="commune">Commune</option>
            <option value="type">Type</option>
            <option value="niveau">Niveau</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ActiviteFilterBar;
