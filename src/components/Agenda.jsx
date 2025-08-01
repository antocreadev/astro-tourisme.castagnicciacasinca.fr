import { sortEventsByDate, getImageUrl } from '../utils/eventUtils.js';
import { convertSimpleMarkdown } from '../utils/markdownUtils.js';

export default function Agenda({ data, events }) {
  // Fonction pour formater la date pour l'affichage en cards
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const months = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[date.getMonth()];
    return { day, month };
  };

  const sortedEvents = sortEventsByDate(events);
  const displayEvents = sortedEvents.slice(0, 4);
  return (
    <div className="py-16">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-black mb-8">{data?.Titre || 'Agenda'}</h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {data?.Description || 'Tout au long de l\'année, des multitudes de rendez-vous culturels, musicaux, cinématographiques, sportifs et gourmands avec des lieux de vie aux multiples facettes'}
          </p>
        </div>

        {/* Events Grid */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start md:flex-row gap-8 overflow-x-auto pb-4 md:p-0">
          {displayEvents.map((event, index) => {
            const { day, month } = formatEventDate(event.Date);
            const imageUrl = getImageUrl(event.image);
            return (
              <div key={event.id || index} className="flex-shrink-0 w-full md:w-[25rem] px-4">
                <a href={`/agenda/${event.documentId}`} className={`block group h-full ${event.isPast ? 'opacity-60' : ''}`}>
                  <div className={`bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 h-[360px] flex flex-col ${event.isPast ? 'grayscale' : ''}`}>
                    {/* Date Section */}
                    <div className="flex flex-shrink-0">
                      <div className={`${event.isPast ? 'bg-gray-300' : 'bg-gray-200'} w-24 flex flex-col items-center justify-center py-8`}>
                        <div className={`text-4xl font-bold ${event.isPast ? 'text-gray-500' : 'text-gray-400'}`}>{day}</div>
                        <div className={`text-sm font-medium ${event.isPast ? 'text-gray-500' : 'text-gray-400'} mt-1`}>{month}</div>
                      </div>
                      <div className="flex-1">
                        <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                          {imageUrl ? (
                            <img 
                              src={imageUrl} 
                              alt={event.Nom}
                              className={`w-full h-full object-cover ${event.isPast ? 'opacity-75 grayscale' : ''}`}
                            />
                          ) : (
                            <span className="text-gray-500 text-sm">Image événement</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className={`text-sm font-medium ${event.isPast ? 'text-gray-500' : 'text-gray-600'} mb-2`}>
                        {event.commune?.Nom || 'Événement'}
                      </div>
                      <h3 className={`text-lg font-semibold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 ${event.isPast ? 'text-gray-600' : 'text-black'}`}>
                        {event.Nom}
                      </h3>
                      <div className={`text-sm line-clamp-2 flex-1 ${event.isPast ? 'text-gray-500' : 'text-gray-600'}`}>
                        {event.Description && (
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: convertSimpleMarkdown(event.Description.substring(0, 120) + (event.Description.length > 120 ? '...' : ''))
                            }} 
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {/* See All Button */}
        <div className="text-center mt-12">
          {data?.Bouton ? (
            <a 
              href={data.Bouton.Lien}
              className="inline-flex items-center gap-2 font-semibold px-8 py-3 rounded-lg transition-all duration-300 relative overflow-hidden agenda-btn"
              style={{
                '--btn-bg': data.Bouton.Couleur || '#2563eb',
                '--btn-text': data.Bouton.TexteColor || '#ffffff', 
                '--btn-border': data.Bouton.BorderColor || 'transparent',
                backgroundColor: 'var(--btn-bg)',
                color: 'var(--btn-text)',
                border: data.Bouton.BorderColor ? '1px solid var(--btn-border)' : 'none'
              }}
            >
              {data.Bouton.Label}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ) : (
            <a 
              href="/agenda" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Voir tous les événements
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* CSS pour le hover dynamique du bouton */
const agendaBtnStyles = `
.agenda-btn {
  position: relative;
  overflow: hidden;
}

.agenda-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--btn-bg) 85%, white 15%),
    color-mix(in srgb, var(--btn-bg) 90%, black 10%)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.agenda-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 
    0 8px 25px color-mix(in srgb, var(--btn-bg) 30%, transparent 70%),
    0 4px 12px color-mix(in srgb, var(--btn-bg) 20%, transparent 80%);
}

.agenda-btn:hover::before {
  opacity: 1;
}

.agenda-btn:active {
  transform: translateY(-1px) scale(1.01);
  transition: all 0.1s ease;
}

.agenda-btn:hover {
  filter: brightness(0.96) saturate(1.1);
}

.agenda-btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--btn-bg) 70%, transparent 30%);
  outline-offset: 2px;
}
`;

// Injecter les styles dans le document
if (typeof document !== 'undefined' && !document.getElementById('agenda-btn-styles')) {
  const style = document.createElement('style');
  style.id = 'agenda-btn-styles';
  style.textContent = agendaBtnStyles;
  document.head.appendChild(style);
}
