import { sites } from '../data/sites.js';
import { itineraires } from '../data/itineraires.js';

export default function LesIncontournables() {
  // Utilise les vraies données des sites
  const sitesPhares = sites.slice(0, 4); // Prend les 4 premiers sites
  
  // Utilise les vraies données des itinéraires
  const itinerairesData = itineraires.slice(0, 3); // Prend les 3 premiers itinéraires

  const itineraireImages = [
    {
      image: "https://placehold.co/600x400?text=Castour",
      title: "Patrimonial « Castour »",
    },
    {
      image: "https://placehold.co/600x400?text=Canaux+Casinca",
      title: "Canaux de la Casinca",
    },
    {
      image: "https://placehold.co/600x400?text=A+definir",
      title: "À définir",
    },
  ]

  return (
    <div className="bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black">Les incontournables</h1>
        </div>

        {/* Sites Phares Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-black">Les sites phares</h2>
            <a 
              href="/sites-phares" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
            >
              Voir tous les sites
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sitesPhares.map((site, index) => (
              <a 
                key={index}
                href={`/sites-phares/${site.slug}`}
                className="group block h-full"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-[300px] flex flex-col">
                  <div className="overflow-hidden rounded-t-xl flex-shrink-0">
                    <img
                      src={site.image || "/placeholder.svg"}
                      alt={site.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-black text-center leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
                      {site.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-center line-clamp-2 flex-1">
                      {site.subtitle}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Itinéraires Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-black">Les itinéraires</h2>
            <a 
              href="/itineraires" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
            >
              Voir tous les itinéraires
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itinerairesData.map((itineraire, index) => (
              <a
                key={index}
                href={`/itineraires/${itineraire.slug}`}
                className="group block h-full"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-[400px] flex flex-col">
                  <div className="overflow-hidden rounded-t-xl flex-shrink-0">
                    <img
                      src={itineraire.image || "/placeholder.svg"}
                      alt={itineraire.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-black text-center leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
                      {itineraire.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-center line-clamp-2 flex-1 mb-3">
                      {itineraire.subtitle}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500 flex-shrink-0">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12,6 12,12 16,14"></polyline>
                        </svg>
                        {itineraire.duration}
                      </span>
                      <span className="flex items-center gap-1 capitalize">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {itineraire.theme}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
