import { Search, Calendar, MapPin, Tag, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FilterBar({ 
  categories, 
  communes, 
  onFiltersChange, 
  initialFilters = {} 
}) {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    commune: 'Toutes communes',
    dateRange: 'upcoming',
    ...initialFilters
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    const defaultFilters = {
      search: '',
      category: 'all',
      commune: 'Toutes communes',
      dateRange: 'upcoming'
    };
    setFilters(defaultFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== 'all' && value !== 'Toutes communes' && value !== 'upcoming' && value !== ''
  ).length;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un événement, lieu, commune..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden flex items-center gap-2 mb-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filtres</span>
          {activeFiltersCount > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Filters */}
        <div className={`${isExpanded ? 'block' : 'hidden'} md:flex md:items-center md:gap-4 md:flex-wrap space-y-4 md:space-y-0`}>
          {/* Date Range */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="upcoming">À venir</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="all">Toutes dates</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Commune */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <select
              value={filters.commune}
              onChange={(e) => handleFilterChange('commune', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {communes.map(commune => (
                <option key={commune} value={commune}>
                  {commune}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Effacer les filtres
            </button>
          )}
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {categories.find(c => c.id === filters.category)?.label}
                <button
                  onClick={() => handleFilterChange('category', 'all')}
                  className="ml-1 hover:text-purple-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.commune !== 'Toutes communes' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {filters.commune}
                <button
                  onClick={() => handleFilterChange('commune', 'Toutes communes')}
                  className="ml-1 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.dateRange !== 'upcoming' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {filters.dateRange === 'today' ? 'Aujourd\'hui' :
                 filters.dateRange === 'week' ? 'Cette semaine' :
                 filters.dateRange === 'month' ? 'Ce mois' :
                 filters.dateRange === 'all' ? 'Toutes dates' : filters.dateRange}
                <button
                  onClick={() => handleFilterChange('dateRange', 'upcoming')}
                  className="ml-1 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
