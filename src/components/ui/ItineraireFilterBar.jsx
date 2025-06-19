import { Search, Route, MapPin, Clock, Filter, TrendingUp, Car } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ItineraireFilterBar({ 
  types, 
  difficulties,
  durations,
  transports,
  themes,
  onFiltersChange, 
  initialFilters = {} 
}) {
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    difficulty: 'Toutes difficultés',
    duration: 'Toutes durées',
    transport: 'Tous moyens',
    theme: 'Tous thèmes',
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
      type: 'all',
      difficulty: 'Toutes difficultés',
      duration: 'Toutes durées',
      transport: 'Tous moyens',
      theme: 'Tous thèmes'
    };
    setFilters(defaultFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== 'all' && 
    value !== 'Toutes difficultés' && 
    value !== 'Toutes durées' && 
    value !== 'Tous moyens' &&
    value !== 'Tous thèmes' && 
    value !== ''
  ).length;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un itinéraire, thème, lieu..."
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
          {/* Type */}
          <div className="flex items-center gap-2">
            <Route className="w-4 h-4 text-gray-500" />
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <select
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'Toutes difficultés' ? difficulty : 
                   difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Transport */}
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-gray-500" />
            <select
              value={filters.transport}
              onChange={(e) => handleFilterChange('transport', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {transports.map(transport => (
                <option key={transport} value={transport}>
                  {transport === 'voiture' ? 'Voiture' :
                   transport === 'pied' ? 'À pied' :
                   transport === 'vélo' ? 'Vélo' :
                   transport}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {durations.map(duration => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>

          {/* Theme */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <select
              value={filters.theme}
              onChange={(e) => handleFilterChange('theme', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {themes.map(theme => (
                <option key={theme} value={theme}>
                  {theme === 'Tous thèmes' ? theme :
                   theme.charAt(0).toUpperCase() + theme.slice(1)}
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
            {filters.type !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {types.find(t => t.id === filters.type)?.label}
                <button
                  onClick={() => handleFilterChange('type', 'all')}
                  className="ml-1 hover:text-purple-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.difficulty !== 'Toutes difficultés' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                {filters.difficulty.charAt(0).toUpperCase() + filters.difficulty.slice(1)}
                <button
                  onClick={() => handleFilterChange('difficulty', 'Toutes difficultés')}
                  className="ml-1 hover:text-yellow-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.transport !== 'Tous moyens' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {filters.transport === 'voiture' ? 'Voiture' :
                 filters.transport === 'pied' ? 'À pied' :
                 filters.transport === 'vélo' ? 'Vélo' :
                 filters.transport}
                <button
                  onClick={() => handleFilterChange('transport', 'Tous moyens')}
                  className="ml-1 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.duration !== 'Toutes durées' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {filters.duration}
                <button
                  onClick={() => handleFilterChange('duration', 'Toutes durées')}
                  className="ml-1 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.theme !== 'Tous thèmes' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                {filters.theme.charAt(0).toUpperCase() + filters.theme.slice(1)}
                <button
                  onClick={() => handleFilterChange('theme', 'Tous thèmes')}
                  className="ml-1 hover:text-orange-600"
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
