import { Building2, Building, Home, Tent, ShoppingBasket, UtensilsCrossed, ChevronRight } from "lucide-react"
import { hebergements, typesHebergement } from '../data/hebergements.js';

export default function Sejourner({ data }) {
  // Compter les hébergements par type (garde la logique existante pour les fallbacks)
  const countByType = (type) => {
    if (type === "tous") return hebergements.length;
    return hebergements.filter(h => h.type === type).length;
  };

  // Utilise les données dynamiques de l'API ou les données statiques en fallback
  const getSejournerItems = () => {
    if (data?.type_sejourners && data.type_sejourners.length > 0) {
      return data.type_sejourners.map(item => ({
        title: item.Denomination,
        description: item.Description,
        link: item.lien?.Lien || "#",
        linkLabel: item.lien?.Label || "En savoir plus",
        linkColor: item.lien?.TextColor,
        iconUrl: item.Icone?.url ? `${import.meta.env.PUBLIC_API_URL || ''}${item.Icone.url}` : null,
        // Pour garder la compatibilité avec les compteurs existants
        count: item.Denomination.toLowerCase().includes('hôtel') ? countByType("hotel") :
               item.Denomination.toLowerCase().includes('résidence') ? countByType("residence") :
               item.Denomination.toLowerCase().includes('village') ? countByType("village-vacances") :
               item.Denomination.toLowerCase().includes('camping') ? countByType("camping") : null
      }));
    }

    // Fallback vers les données statiques si pas de données API
    const accommodations = [
      {
        icon: Building2,
        title: "Hôtels",
        count: countByType("hotel"),
        description: "Détendez-vous dans nos hôtels de charme avec vue sur mer ou montagne.",
        link: "/sejourner?type=hotel",
        linkLabel: "Voir les hébergements"
      },
      {
        icon: Building,
        title: "Résidences de tourisme",
        count: countByType("residence"),
        description: "Profitez de l'indépendance avec nos résidences tout équipées.",
        link: "/sejourner?type=residence",
        linkLabel: "Voir les hébergements"
      },
      {
        icon: Home,
        title: "Villages vacances",
        count: countByType("village-vacances"),
        description: "Partagez des moments inoubliables avec animations et services.",
        link: "/sejourner?type=village-vacances",
        linkLabel: "Voir les hébergements"
      },
    ];

    const services = [
      {
        icon: Tent,
        title: "Campings",
        count: countByType("camping"),
        description: "Campez en pleine nature avec tout le confort moderne.",
        link: "/sejourner?type=camping",
        linkLabel: "Voir les hébergements"
      },
      {
        icon: ShoppingBasket,
        title: "Commerces",
        description: "Découvrez nos produits locaux et artisanaux.",
        link: "#commerces",
        linkLabel: "En savoir plus"
      },
      {
        icon: UtensilsCrossed,
        title: "Restaurants",
        description: "Dégustez une cuisine corse authentique et savoureuse.",
        link: "#restaurants",
        linkLabel: "En savoir plus"
      },
    ];

    return [...accommodations, ...services];
  };

  const sejournerItems = getSejournerItems();

  return (
    <div className="bg-white pb-8 sm:pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-black">{data?.Titre || 'Séjourner'}</h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
          {sejournerItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div 
                key={index} 
                className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white space-y-4"
              >
                {/* Icon */}
                <div className="inline-block p-3 rounded-lg bg-gray-50">
                  {item.iconUrl ? (
                    <img 
                      src={item.iconUrl} 
                      alt={item.title}
                      className="w-8 h-8 text-black"
                    />
                  ) : IconComponent ? (
                    <IconComponent size={32} className="text-black" strokeWidth={1.5} />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  )}
                </div>

                {/* Title with count */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-black">{item.title}</h2>
                  {item.count && (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{item.description}</p>

                {/* Link */}
                <a 
                  href={item.link} 
                  className="inline-flex items-center font-medium hover:opacity-80 transition-colors group mt-4"
                  style={{ color: item.linkColor || '#000000' }}
                >
                  <span className="mr-2">
                    {item.linkLabel}
                  </span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )
          })}
        </div>

        {/* Bouton pour voir tous les hébergements */}
        <div className="text-center mt-12">
          {data?.Bouton ? (
            <a
              href={data.Bouton.Lien}
              className="inline-flex items-center px-8 py-4 text-base font-medium rounded-md shadow-sm transition-all duration-300 relative overflow-hidden sejourner-btn"
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
              <ChevronRight size={20} className="ml-2" />
            </a>
          ) : (
            <a
              href="/sejourner"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base font-medium rounded-md shadow-sm transition-colors duration-200"
            >
              Voir tous les hébergements
              <ChevronRight size={20} className="ml-2" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
