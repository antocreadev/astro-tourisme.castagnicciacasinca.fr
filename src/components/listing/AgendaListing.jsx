import { useState, useCallback, useEffect } from 'react';
import { filterEvents, sortEvents } from '../../utils/filters.js';
import { sortEventsByDate } from '../../utils/eventUtils.js';
import FilterBar from '../ui/FilterBar.jsx';
import EventCard from '../ui/EventCard.jsx';
import { Grid, List, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export default function AgendaListing({ events = [] }) {
  const initialEvents = sortEventsByDate(events);
  const [filteredEvents, setFilteredEvents] = useState(initialEvents);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const eventsPerPage = 12;

  // Mettre à jour les événements filtrés quand les événements changent
  useEffect(() => {
    const sortedEvents = sortEventsByDate(events);
    setFilteredEvents(sortedEvents);
  }, [events]);

  const handleFiltersChange = useCallback((filters) => {
    // Pour l'instant, on garde juste le tri par date
    // Vous pourrez étendre cette fonction pour implémenter les filtres
    const sorted = sortEventsByDate(events);
    setFilteredEvents(sorted);
    setCurrentPage(1);
  }, [events]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    const sorted = sortEventsByDate(filteredEvents);
    setFilteredEvents(sorted);
  };

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-gray-700">Accueil</a>
            <span>/</span>
            <span className="text-gray-900">Agenda</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-black mb-4">Agenda</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Tout au long de l'année, des multitudes de rendez-vous culturels, musicaux, 
              cinématographiques, sportifs et gourmands avec des lieux de vie aux multiples facettes
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      {/* <FilterBar 
        categories={categories}
        communes={communes}
        onFiltersChange={handleFiltersChange}
      /> */}

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredEvents.length}</span> événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Trier par:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Date</option>
                <option value="title">Titre</option>
                <option value="commune">Commune</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {currentEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun événement trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <>
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
            }`}>
              {currentEvents.map((event) => (
                <div
                  key={event.id}
                  className={`${event.isPast ? 'opacity-60' : ''}`}
                >
                  <EventCard
                    event={event}
                    href={`/agenda/${event.documentId}`}
                    isPast={event.isPast}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-12 gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 text-gray-600 disabled:text-gray-400 hover:text-gray-900 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 text-gray-600 disabled:text-gray-400 hover:text-gray-900 disabled:cursor-not-allowed"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
