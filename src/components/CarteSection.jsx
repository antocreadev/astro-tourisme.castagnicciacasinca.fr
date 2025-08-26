import { events } from '../data/agenda.js';

export default function CarteInteractive({ data, colorData }) {
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

  const sectionStyle = {
    backgroundColor: colorData?.data?.fondCarteInteractive || '#ffffff',
    color: colorData?.data?.texteCarteInteractive || '#000000'
  };

  return (
    <div className="min-h-screen" style={sectionStyle}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Content */}
        <div className="text-center lg:text-left mb-12">
          <h1 className="text-4xl font-bold mb-6" style={{ color: colorData?.data?.texteCarteInteractive || '#000000' }}>{data?.Titre || 'Carte interactive'}</h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{ color: colorData?.data?.texteCarteInteractive || '#374b58' }}>
            {data?.Description ? data.Description.split('\n\n')[0] : 'Naviguez facilement dans notre région grâce à des cartes interactives intuitives et riches en fonctionnalités.'}
          </p>
        </div>

        {/* Map Section - Visible on mobile */}
        <div className="w-full mb-12 lg:hidden">
          <div className="relative">
            <img
              src={data?.image?.url ? `${import.meta.env.PUBLIC_API_URL || ''}${data.image.url}` : "https://placehold.co/800x600?text=map"}
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
                  <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: colorData?.data?.texteCarteInteractive || '#000000' }}></div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: colorData?.data?.texteCarteInteractive || '#000000' }}>{feature.title}</h3>
                    <p className="leading-relaxed" style={{ color: colorData?.data?.texteCarteInteractive || '#374b58' }}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Explorer Button */}
            <div className="pt-4">
              {data?.Bouton ? (
                <a 
                  href={data.Bouton.Lien}
                  className="inline-block w-full lg:w-auto px-8 py-4 text-base font-medium rounded-md shadow-sm transition-all duration-300 relative overflow-hidden text-center carte-btn"
                  style={{
                    '--btn-bg': data.Bouton.Couleur || '#000000',
                    '--btn-text': data.Bouton.TexteColor || '#ffffff', 
                    '--btn-border': data.Bouton.BorderColor || 'transparent',
                    backgroundColor: 'var(--btn-bg)',
                    color: 'var(--btn-text)',
                    border: data.Bouton.BorderColor ? '1px solid var(--btn-border)' : 'none'
                  }}
                >
                  {data.Bouton.Label}
                </a>
              ) : (
                <a 
                  href="/carte-interactive" 
                  className="inline-block w-full lg:w-auto px-8 py-4 text-base font-medium rounded-md shadow-sm bg-black text-white hover:bg-gray-800 transition-colors text-center"
                >
                  Explorer
                </a>
              )}
            </div>
          </div>

          {/* Right Map - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block">
            <div className="relative bottom-20">
              <img
                src={data?.image?.url ? `${import.meta.env.PUBLIC_API_URL || ''}${data.image.url}` : "https://placehold.co/800x600?text=map"}
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
