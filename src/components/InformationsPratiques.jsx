import { Ambulance, Sun, Heart, User, Shield, ChevronRight } from "lucide-react"

export default function InformationsPratiques() {
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
    <div className="bg-white min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-black">Informations pratiques</h1>
        </div>

        {/* Grid - First row with 3 items, second row with 2 items */}
        <div className="space-y-12">
          {/* First Row - 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {informations.slice(0, 3).map((info, index) => {
              const IconComponent = info.icon
              return (
                <div key={index} className="space-y-6">
                  {/* Icon */}
                  <div className="mb-6">
                    <IconComponent size={48} className="text-black" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-black mb-4">{info.title}</h2>

                  {/* Description */}
                  <p className="text-gray-700 text-base leading-relaxed mb-6">{info.description}</p>

                  {/* Link */}
                  <button className="flex items-center text-black font-medium hover:text-gray-600 transition-colors group">
                    <span className="mr-2">En savoir plus</span>
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              )
            })}
          </div>

          {/* Second Row - 2 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {informations.slice(3, 5).map((info, index) => {
              const IconComponent = info.icon
              return (
                <div key={index + 3} className="space-y-6">
                  {/* Icon */}
                  <div className="mb-6">
                    <IconComponent size={48} className="text-black" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-black mb-4">{info.title}</h2>

                  {/* Description */}
                  <p className="text-gray-700 text-base leading-relaxed mb-6">{info.description}</p>

                  {/* Link */}
                  <button className="flex items-center text-black font-medium hover:text-gray-600 transition-colors group">
                    <span className="mr-2">En savoir plus</span>
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
