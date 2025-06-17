export default function LesIncontournables() {
  const sitesPhares = [
    {
      image: "https://placehold.co/600x400?text=Monte+San+Petrone",
      title: "Monte San Petrone",
    },
    {
      image: "https://placehold.co/600x400?text=Juniperaie",
      title: "Juniperaie littorale d'A Venzulasca",
    },
    {
      image: "https://placehold.co/600x400?text=Monte+Sant+Anghjuli",
      title: "Monte d'I Sant'Anghjuli",
    },
    {
      image: "https://placehold.co/600x400?text=Eaux+Orezza",
      title: "Les eaux d'Orezza",
    },
  ]

  const itineraires = [
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
          <h2 className="text-3xl font-bold text-black mb-8">Les sites phares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sitesPhares.map((site, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    src={site.image || "/placeholder.svg"}
                    alt={site.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black text-center leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {site.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Itinéraires Section */}
        <div>
          <h2 className="text-3xl font-bold text-black mb-8">Les itinéraires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itineraires.map((itineraire, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    src={itineraire.image || "/placeholder.svg"}
                    alt={itineraire.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black text-center leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {itineraire.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
