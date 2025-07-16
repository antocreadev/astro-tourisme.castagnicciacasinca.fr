import { events } from '../data/agenda.js';

export default function Agenda({ data }) {

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
          {events.slice(0, 4).map((event, index) => (
            <div key={index} className="flex-shrink-0 w-full md:w-[25rem] px-4">
              <a href={`/agenda/${event.slug}`} className="block group h-full">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 h-[360px] flex flex-col">
                  {/* Date Section */}
                  <div className="flex flex-shrink-0">
                    <div className="bg-gray-200 w-24 flex flex-col items-center justify-center py-8">
                      <div className="text-4xl font-bold text-gray-400">{event.day}</div>
                      <div className="text-sm font-medium text-gray-400 mt-1">{event.month}</div>
                    </div>
                    <div className="flex-1">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-sm font-medium text-gray-600 mb-2">{event.category}</div>
                    <h3 className="text-lg font-semibold text-black leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 flex-1">{event.description}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* See All Button */}
        <div className="text-center mt-12">
          <a 
            href="/agenda" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Voir tous les événements
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
