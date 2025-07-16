import { Ambulance, Sun, Heart, User, Shield, ChevronRight } from "lucide-react"

export default function InformationsPratiques({ data }) {
  // Utilise les données dynamiques de l'API ou les données statiques en fallback
  const getInformationItems = () => {
    if (data?.type_information_pratiques && data.type_information_pratiques.length > 0) {
      return data.type_information_pratiques.map(item => ({
        title: item.Titre,
        description: item.Description,
        link: item.Lien?.Lien || "/informations-pratiques",
        linkLabel: item.Lien?.Label || "En savoir plus",
        linkColor: item.Lien?.TextColor,
        iconUrl: item.Icone?.url ? `${import.meta.env.PUBLIC_API_URL || ''}${item.Icone.url}` : null
      }));
    }

    // Fallback vers les données statiques si pas de données API
    return [
      {
        icon: Ambulance,
        title: "Urgences",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        link: "/informations-pratiques",
        linkLabel: "En savoir plus"
      },
      {
        icon: Sun,
        title: "Météo",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        link: "/informations-pratiques",
        linkLabel: "En savoir plus"
      },
      {
        icon: Heart,
        title: "Santé",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        link: "/informations-pratiques",
        linkLabel: "En savoir plus"
      },
      {
        icon: User,
        title: "Transports",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        link: "/informations-pratiques",
        linkLabel: "En savoir plus"
      },
      {
        icon: Shield,
        title: "Administration",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        link: "/informations-pratiques",
        linkLabel: "En savoir plus"
      },
    ];
  };

  const informationItems = getInformationItems();

  return (
    <div className="bg-white py-8 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-black">{data?.Titre || 'Informations pratiques'}</h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
          {informationItems.map((info, index) => {
            const IconComponent = info.icon
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white space-y-4"
              >
                {/* Icon */}
                <div className="inline-block p-3 rounded-lg bg-gray-50">
                  {info.iconUrl ? (
                    <img 
                      src={info.iconUrl} 
                      alt={info.title}
                      className="w-8 h-8 text-black"
                    />
                  ) : IconComponent ? (
                    <IconComponent size={32} className="text-black" strokeWidth={1.5} />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-black">{info.title}</h2>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{info.description}</p>

                {/* Link */}
                <a 
                  href={info.link}
                  className="inline-flex items-center font-medium hover:opacity-80 transition-colors group mt-4"
                  style={{ color: info.linkColor || '#000000' }}
                >
                  <span className="mr-2">{info.linkLabel}</span>
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
