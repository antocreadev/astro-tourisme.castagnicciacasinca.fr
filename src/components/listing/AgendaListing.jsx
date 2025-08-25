import { useState, useCallback, useEffect, useRef } from 'react';
import { filterEvents, sortEvents } from '../../utils/filters.js';
import { sortEventsByDate } from '../../utils/eventUtils.js';
import FilterBar from '../ui/FilterBar.jsx';
import EventCard from '../ui/EventCard.jsx';
import { Grid, List, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export default function AgendaListing({ events = [], typesEvenements = [], initialTypes = [], initialPage = 1, colorData }) {
  const initialEvents = sortEventsByDate(events);
  const [filteredEvents, setFilteredEvents] = useState(initialEvents);
  // selectedTypes contient les NOMS (pas ids)
  const [selectedTypes, setSelectedTypes] = useState(Array.isArray(initialTypes) ? initialTypes : []);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState('date');
  const eventsPerPage = 12;
  const [showTypesMenu, setShowTypesMenu] = useState(false);
  const typesMenuRef = useRef(null);
  const didInitialSyncRef = useRef(false);

  // Fermer le menu au clic extérieur
  useEffect(() => {
    if (!showTypesMenu) return;
    const handler = (e) => {
      if (typesMenuRef.current && !typesMenuRef.current.contains(e.target)) {
        setShowTypesMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showTypesMenu]);

  // Mettre à jour les événements filtrés quand les événements changent
  useEffect(() => {
    const sortedEvents = sortEventsByDate(events);
    setFilteredEvents(sortedEvents);
  }, [events]);

  const handleFiltersChange = useCallback(() => {
    let evts = [...events];
    if (selectedTypes.length > 0) {
      const selectedNamesLower = selectedTypes.map(n => n.toLowerCase());
      evts = evts.filter(evt => evt.type_evenement && selectedNamesLower.includes(evt.type_evenement.Nom.toLowerCase()));
    }
    const sorted = sortEventsByDate(evts);
    setFilteredEvents(sorted);
    setCurrentPage(1);
  }, [events, selectedTypes]);

  useEffect(() => {
    handleFiltersChange();
  }, [handleFiltersChange]);

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
    const url = new URL(window.location.href);
    // Nettoyage ancien format
    ['type','types'].forEach(k => url.searchParams.delete(k));
    // Préserver les types sélectionnés
    ['types1','types2','types3'].forEach(k => url.searchParams.delete(k));
    selectedTypes.slice(0,3).forEach((name, idx) => {
      if (name) url.searchParams.set(`types${idx+1}`, name);
    });
    if (page > 1) url.searchParams.set('page', String(page)); else url.searchParams.delete('page');
    window.history.replaceState({}, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Synchroniser l'URL quand les types changent
  useEffect(() => {
    const url = new URL(window.location.href);
    const existingQueryTypes = ['types1','types2','types3']
      .map(k => url.searchParams.get(k))
      .filter(Boolean);

    // Cas: l'utilisateur arrive avec des paramètres, mais initialTypes n'a pas été peuplé (ex: hydration / mismatch)
    if (!didInitialSyncRef.current) {
      didInitialSyncRef.current = true;
      if (selectedTypes.length === 0 && existingQueryTypes.length > 0) {
        // Hydrater l'état à partir de l'URL (sans la réécrire encore)
        setSelectedTypes(existingQueryTypes);
        return; // ne pas écraser l'URL maintenant
      }
    }

    // Réécriture normale seulement si l'état reflète réellement la sélection
    // Nettoyage ancien format
    ['types','type'].forEach(k => url.searchParams.delete(k));
    ['types1','types2','types3'].forEach(k => url.searchParams.delete(k));
    selectedTypes.slice(0,3).forEach((name, idx) => {
      if (name) url.searchParams.set(`types${idx+1}`, name);
    });
    url.searchParams.delete('page');
    window.history.replaceState({}, '', url);
    setCurrentPage(1);
  }, [selectedTypes]);

  const headerStyle = {
    backgroundColor: colorData?.data?.FondAgenda || '#ffffff',
    color: colorData?.data?.texteAgenda || '#000000'
  };

  const bgStyle = {
    backgroundColor: colorData?.data?.FondAgenda || '#f9fafb'
  };

  return (
    <div className="min-h-screen" style={bgStyle}>
      {/* Header */}
      <div className="border-b" style={headerStyle}>
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <nav className="flex items-center gap-2 text-sm mb-4" style={{ color: colorData?.data?.texteAgenda || '#6b7280' }}>
            <a href="/" className="hover:opacity-80">Accueil</a>
            <span>/</span>
            <span style={{ color: colorData?.data?.texteAgenda || '#111827' }}>Agenda</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4" style={{ color: colorData?.data?.texteAgenda || '#000000' }}>Agenda</h1>
            <p className="text-lg max-w-4xl mx-auto leading-relaxed" style={{ color: colorData?.data?.texteAgenda || '#374b58' }}>
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
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredEvents.length}</span> événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
            </p>

            {/* Filtre Types d'événement (multi-select) */}
            {typesEvenements.length > 0 && (
              <div className="relative" ref={typesMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowTypesMenu(v => !v)}
                  className="flex items-center gap-2 border border-gray-300 bg-white rounded-lg px-3 py-1 text-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-500"
                  aria-haspopup="listbox"
                  aria-expanded={showTypesMenu}
                >
                  <span className="text-gray-600">Types</span>
                  {selectedTypes.length === 0 && (
                    <span className="text-xs text-gray-400">Tous</span>
                  )}
                  {selectedTypes.length > 0 && (
                    <div className="flex gap-1 max-w-[180px] overflow-hidden">
                      {selectedTypes.slice(0,2).map(name => (
                        <span key={name} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{name}</span>
                      ))}
                      {selectedTypes.length > 2 && (
                        <span className="bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full">+{selectedTypes.length-2}</span>
                      )}
                    </div>
                  )}
                  <svg className={`w-4 h-4 text-gray-500 transition-transform ${showTypesMenu ? 'rotate-180':''}`} viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.115l3.71-3.884a.75.75 0 111.08 1.04l-4.24 4.44a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"/></svg>
                </button>
                {showTypesMenu && (
                  <div className="absolute z-40 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-h-72 overflow-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">Sélection (max 3)</span>
                      {selectedTypes.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedTypes([])}
                          className="text-xs text-blue-600 hover:underline"
                        >Vider</button>
                      )}
                    </div>
                    <ul className="space-y-1" role="listbox" aria-label="Types d'événements">
                      {typesEvenements.map(type => {
                        const active = selectedTypes.includes(type.Nom);
                        const disabled = !active && selectedTypes.length >= 3; // limite
                        return (
                          <li key={type.id}>
                            <button
                              type="button"
                              disabled={disabled}
                              onClick={() => {
                                setSelectedTypes(prev => prev.includes(type.Nom)
                                  ? prev.filter(n => n !== type.Nom)
                                  : (prev.length < 3 ? [...prev, type.Nom] : prev)
                                );
                              }}
                              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-left text-sm border transition ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                              role="option"
                              aria-selected={active}
                            >
                              <span className="truncate">{type.Nom}</span>
                              {active && <span className="text-xs">✓</span>}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
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
