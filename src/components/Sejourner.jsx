import { Building2, Building, Home, Tent, ShoppingBasket, UtensilsCrossed, ChevronRight } from "lucide-react"

export default function Sejourner() {
  const accommodations = [
    {
      icon: Building2,
      title: "Hôtels",
      description: "Détendez-vous dans nos hôtels confortables et accueillants.",
    },
    {
      icon: Building,
      title: "Residences de tourisme",
      description: "Louez votre résidence de tourisme et vivez comme un local.",
    },
    {
      icon: Home,
      title: "Villages vacances",
      description: "Partagez des moments inoubliables en famille ou entre amis.",
    },
  ]

  const services = [
    {
      icon: Tent,
      title: "Campings",
      description: "Campez en pleine nature et profitez du grand air.",
    },
    {
      icon: ShoppingBasket,
      title: "Commerces",
      description: "Découvrez nos produits locaux et artisanaux.",
    },
    {
      icon: UtensilsCrossed,
      title: "Restaurants",
      description: "Dégustez une cuisine corse authentique et savoureuse.",
    },
  ]

  const allItems = [...accommodations, ...services]

  return (
    <div className="bg-white min-h-screen py-8 sm:py-16 px-4">
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

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-black">{item.title}</h2>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{item.description}</p>

                {/* Link */}
                <button className="inline-flex items-center text-black font-medium hover:text-gray-600 transition-colors group mt-4">
                  <span className="mr-2">En savoir plus</span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
