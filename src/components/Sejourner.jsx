import { Building2, Building, Home, Tent, ShoppingBasket, UtensilsCrossed, ChevronRight } from "lucide-react"
import { hebergements, typesHebergement } from '../data/hebergements.js';

export default function Sejourner() {
  // Compter les hébergements par type
  const countByType = (type) => {
    if (type === "tous") return hebergements.length;
    return hebergements.filter(h => h.type === type).length;
  };

  const accommodations = [
    {
      icon: Building2,
      title: "Hôtels",
      count: countByType("hotel"),
      description: "Détendez-vous dans nos hôtels de charme avec vue sur mer ou montagne.",
      link: "/hebergements?type=hotel"
    },
    {
      icon: Building,
      title: "Résidences de tourisme",
      count: countByType("residence"),
      description: "Profitez de l'indépendance avec nos résidences tout équipées.",
      link: "/hebergements?type=residence"
    },
    {
      icon: Home,
      title: "Villages vacances",
      count: countByType("village-vacances"),
      description: "Partagez des moments inoubliables avec animations et services.",
      link: "/hebergements?type=village-vacances"
    },
  ]

  const services = [
    {
      icon: Tent,
      title: "Campings",
      count: countByType("camping"),
      description: "Campez en pleine nature avec tout le confort moderne.",
      link: "/hebergements?type=camping"
    },
    {
      icon: ShoppingBasket,
      title: "Commerces",
      description: "Découvrez nos produits locaux et artisanaux.",
      link: "#commerces"
    },
    {
      icon: UtensilsCrossed,
      title: "Restaurants",
      description: "Dégustez une cuisine corse authentique et savoureuse.",
      link: "#restaurants"
    },
  ]

  const allItems = [...accommodations, ...services]

  return (
    <div className="bg-white py-8 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-black">Séjourner</h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
          {allItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div 
                key={index} 
                className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white space-y-4"
              >
                {/* Icon */}
                <div className="inline-block p-3 rounded-lg bg-gray-50">
                  <IconComponent size={32} className="text-black" strokeWidth={1.5} />
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
                  className="inline-flex items-center text-black font-medium hover:text-gray-600 transition-colors group mt-4"
                >
                  <span className="mr-2">
                    {item.count ? 'Voir les hébergements' : 'En savoir plus'}
                  </span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )
          })}
        </div>

        {/* Bouton pour voir tous les hébergements */}
        <div className="text-center mt-12">
          <a
            href="/hebergements"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Voir tous les hébergements
            <ChevronRight size={20} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  )
}
