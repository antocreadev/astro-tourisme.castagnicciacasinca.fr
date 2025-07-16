import { Ambulance, Sun, Heart, User, Shield, ChevronRight } from "lucide-react"

export default function InformationsPratiques({ data }) {
  const informations = [
    {
      icon: Ambulance,
      title: "Urgences",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: Sun,
      title: "Météo",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: Heart,
      title: "Santé",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: User,
      title: "Transports",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: Shield,
      title: "Administration",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ]

  return (
    <div className="bg-white py-8 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-black">{data?.Titre || 'Informations pratiques'}</h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
          {informations.map((info, index) => {
            const IconComponent = info.icon
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
                <h2 className="text-xl sm:text-2xl font-bold text-black">{info.title}</h2>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{info.description}</p>

                {/* Link */}
                <a 
                  href="/informations-pratiques"
                  className="inline-flex items-center text-black font-medium hover:text-gray-600 transition-colors group mt-4"
                >
                  <span className="mr-2">En savoir plus</span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
