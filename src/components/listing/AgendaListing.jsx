import { useState, useEffect, useMemo, useRef } from 'react';
import { splitEvents, selectHomepageEvents } from '../../utils/eventUtils.js';
import useNow from '../../utils/useNow.js';
import EventCard from '../ui/EventCard.jsx';
import { Grid, List, ChevronLeft, ChevronRight, Calendar, History } from 'lucide-react';

const EVENTS_PER_PAGE = 12;

const compareText = (a = '', b = '') => a.localeCompare(b, 'fr', { sensitivity: 'base' });

/**
 * Page Agenda.
 * - Onglet « À venir » : mis en avant d'abord, puis en cours / à venir par date, puis les événements sans date.
 * - Onglet « Passés » : événements terminés, du plus récent au plus ancien.
 * Le statut est recalculé dans le navigateur (useNow) : un événement terminé
 * depuis le dernier build bascule automatiquement dans « Passés ».
 */
export default function AgendaListing({ events = [], typesEvenements = [], initialTypes = [], initialPage = 1, initialTab = 'upcoming', buildTime, colorData, pageTexts }) {
  const now = useNow(buildTime);
  // selectedTypes contient les NOMS (pas ids)
  const [selectedTypes, setSelectedTypes] = useState(Array.isArray(initialTypes) ? initialTypes : []);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(initialPage > 0 ? initialPage : 1);
  const [sortBy, setSortBy] = useState('date');
  const [tab, setTab] = useState(initialTab === 'past' ? 'past' : 'upcoming');
  const [showTypesMenu, setShowTypesMenu] = useState(false);
  const typesMenuRef = useRef(null);
  const isFirstSyncRef = useRef(true);

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

  // Récupérer les filtres depuis l'URL si le rendu statique ne les a pas reçus
  useEffect(() => {
    const url = new URL(window.location.href);
    const fromUrl = ['types1', 'types2', 'types3'].map((k) => url.searchParams.get(k)).filter(Boolean);
    if (selectedTypes.length === 0 && fromUrl.length > 0) setSelectedTypes(fromUrl);
    if (url.searchParams.get('passes') === '1') setTab('past');
    const p = Number(url.searchParams.get('page') || '1');
    if (p > 1) setCurrentPage(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtrage par type puis répartition à venir / sans date / passés
  const { upcomingList, pastList } = useMemo(() => {
    let evts = Array.isArray(events) ? events : [];
    if (selectedTypes.length > 0) {
      const names = selectedTypes.map((n) => n.toLowerCase());
      evts = evts.filter((evt) => evt.type_evenement?.Nom && names.includes(evt.type_evenement.Nom.toLowerCase()));
    }
    const { past } = splitEvents(evts, now);
    // Même ordre que l'accueil : « Mettre en avant » d'abord, puis par date, puis sans date
    let upcoming = selectHomepageEvents(evts, Infinity, now);
    let pastSorted = past;
    if (sortBy === 'title') {
      upcoming = [...upcoming].sort((a, b) => compareText(a.Nom, b.Nom));
      pastSorted = [...past].sort((a, b) => compareText(a.Nom, b.Nom));
    } else if (sortBy === 'commune') {
      const byCommune = (a, b) => compareText(a.commune?.Nom || '~', b.commune?.Nom || '~') || compareText(a.Nom, b.Nom);
      upcoming = [...upcoming].sort(byCommune);
      pastSorted = [...past].sort(byCommune);
    }
    return { upcomingList: upcoming, pastList: pastSorted };
  }, [events, selectedTypes, sortBy, now]);

  const activeList = tab === 'past' ? pastList : upcomingList;

  // Pagination
  const totalPages = Math.max(1, Math.ceil(activeList.length / EVENTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * EVENTS_PER_PAGE;
  const currentEvents = activeList.slice(startIndex, startIndex + EVENTS_PER_PAGE);

  // Synchroniser l'URL (types, onglet, page) sans recharger
  useEffect(() => {
    if (isFirstSyncRef.current) {
      isFirstSyncRef.current = false;
      return;
    }
    const url = new URL(window.location.href);
    ['type', 'types', 'types1', 'types2', 'types3', 'page', 'passes'].forEach((k) => url.searchParams.delete(k));
    selectedTypes.slice(0, 3).forEach((name, idx) => {
      if (name) url.searchParams.set(`types${idx + 1}`, name);
    });
    if (tab === 'past') url.searchParams.set('passes', '1');
    if (safePage > 1) url.searchParams.set('page', String(safePage));
    window.history.replaceState({}, '', url);
  }, [selectedTypes, tab, safePage]);

  const changeTypes = (updater) => {
    setSelectedTypes(updater);
    setCurrentPage(1);
  };

  const changeTab = (next) => {
    setTab(next);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

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
            <h1 className="text-4xl sm:text-6xl font-bold mb-4" style={{ color: colorData?.data?.texteAgenda || '#000000' }}>
              {pageTexts?.titre || 'Agenda'}
            </h1>
            <p className="text-lg max-w-4xl mx-auto leading-relaxed" style={{ color: colorData?.data?.texteAgenda || '#374b58' }}>
                            {pageTexts?.description || 'Découvrez tous les événements organisés dans la région de Castagniccia Casinca'}
            </p>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Onglets À venir / Passés */}
            <div className="inline-flex rounded-lg border border-gray-300 bg-white p-0.5" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'upcoming'}
                onClick={() => changeTab('upcoming')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${tab === 'upcoming' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                À venir <span className="opacity-80">({upcomingList.length})</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'past'}
                onClick={() => changeTab('past')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${tab === 'past' ? 'bg-gray-800 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Passés <span className="opacity-80">({pastList.length})</span>
              </button>
            </div>

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
                          onClick={() => changeTypes([])}
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
                                changeTypes(prev => prev.includes(type.Nom)
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
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {tab === 'past' ? 'Aucun événement passé' : 'Aucun événement à venir pour le moment'}
            </h3>
            <p className="text-gray-600">
              {selectedTypes.length > 0
                ? 'Essayez de modifier vos critères de recherche.'
                : tab === 'upcoming'
                  ? 'De nouveaux rendez-vous seront bientôt annoncés.'
                  : ''}
            </p>
            {tab === 'upcoming' && pastList.length > 0 && (
              <button
                type="button"
                onClick={() => changeTab('past')}
                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
              >
                <History className="w-4 h-4" /> Voir les événements passés
              </button>
            )}
          </div>
        ) : (
          <>
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
            }`}>
              {currentEvents.map((event) => (
                <div key={event.id}>
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
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
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
                        safePage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
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
