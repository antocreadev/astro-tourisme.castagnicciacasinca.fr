export default function CarteInteractive() {
  const features = [
    {
      title: "Localisez les points d'intérêt",
      description: "Identifiez rapidement les lieux emblématiques.",
    },
    {
      title: "Obtenez des itinéraires détaillés",
      description: "Choisissez un lieux et obtenez directement son itinéraire",
    },
    {
      title: "Découvrez les commerces et services à proximité",
      description: "Repérez restaurants, boutiques d'artisanat, et producteurs",
    },
    {
      title: "Trouvez des activités adaptées à vos envies",
      description:
        "Visualisez les zones pour des balades familiales, des activités nautiques ou les lieux où se déroulent festivals et foires.",
    },
    {
      title: "Explorez les communes et villages",
      description: "Accédez à des informations spécifiques pour chaque localité de la région.",
    },
  ]

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header Content */}
        <div className="text-center lg:text-left mb-12">
          <h1 className="text-4xl font-bold text-black mb-6">Carte interactive</h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Naviguez facilement dans notre région grâce à des cartes interactives intuitives et riches en
            fonctionnalités.
          </p>
        </div>

        {/* Map Section - Visible on mobile */}
        <div className="w-full mb-12 lg:hidden">
          <div className="relative">
            <img
              src="https://placehold.co/800x600?text=map"
              alt="Carte interactive de la région"
              className="w-full h-[300px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">{feature.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Explorer Button */}
            <div className="pt-4">
              <button className="w-full lg:w-auto bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors">
                Explorer
              </button>
            </div>
          </div>

          {/* Right Map - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block">
            <div className="relative">
              <img
                src="https://placehold.co/800x600?text=map"
                alt="Carte interactive de la région"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
