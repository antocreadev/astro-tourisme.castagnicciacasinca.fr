import { Ticket, Ship, Sparkles, Mountain, ChevronRight } from "lucide-react"

export default function ActivitesLoisirs() {
  const activities = [
    {
      icon: Ticket,
      title: "Évènements",
      description: "Immersion totale au cœur de la Castagniccia lors de nos événements festifs !",
    },
    {
      icon: Ship,
      title: "Activités nautiques",
      description: "Explorez les côtes sauvages de la Casinca en kayak, paddle ou bateau.",
    },
    {
      icon: Sparkles,
      title: "Festivals, Marchés et foires",
      description: "Partez à l'aventure sur les sentiers de randonnée de la Castagniccia.",
    },
    {
      icon: Mountain,
      title: "Les randonnées, balades",
      description: "Détendez-vous dans nos hôtels confortables et accueillants.",
    },
  ]

  return (
    <div className="bg-white py-8 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-black">Activités et loisirs</h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon
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
                <h2 className="text-xl font-bold text-black">{activity.title}</h2>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed">{activity.description}</p>

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
