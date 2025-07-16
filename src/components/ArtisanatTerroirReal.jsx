import { ChevronRight } from "lucide-react"

export default function ArtisanatTerroirReal({ data }) {
  // Utilise les données dynamiques de l'API ou les données statiques en fallback
  const getArtisanatItems = () => {
    if (data?.type_artisanat_et_produits && data.type_artisanat_et_produits.length > 0) {
      return data.type_artisanat_et_produits.map(item => ({
        title: item.Titre,
        image: item.image?.url ? `${import.meta.env.PUBLIC_API_URL || ''}${item.image.url}` : "/photos/PentadiCasinca.jpg",
        alt: item.Titre,
        link: item.lien?.Lien || "/artisanat",
        linkColor: item.lien?.TextColor
      }));
    }

    // Fallback vers les données statiques si pas de données API
    return [
      {
        image: "/photos/PentadiCasinca.jpg",
        title: "Miel & Apiculture",
        alt: "Production de miel artisanal en Castagniccia",
        link: "/artisanat?categorie=miel"
      },
      {
        image: "/photos/PentadiCasinca.jpg",
        title: "Charcuterie Corse",
        alt: "Charcuterie traditionnelle corse artisanale",
        link: "/artisanat?categorie=charcuterie"
      },
      {
        image: "/photos/PentadiCasinca.jpg",
        title: "Poterie & Artisanat",
        alt: "Artisanat local et poterie traditionnelle",
        link: "/artisanat?categorie=poterie"
      },
    ];
  };

  const artisanatItems = getArtisanatItems();

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black">{data?.Titre || 'Artisanat et produits du terroir'}</h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisanatItems.map((product, index) => (
            <a href={product.link} key={index} className="group cursor-pointer block">
              {/* Image */}
              <div className="overflow-hidden rounded-lg mb-6">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.alt}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Title with Arrow */}
              <div className="flex items-center justify-between">
                <h2 
                  className="text-2xl font-bold group-hover:opacity-80 transition-colors"
                  style={{ color: product.linkColor || '#000000' }}
                >
                  {product.title}
                </h2>
                <ChevronRight
                  size={24}
                  className="transition-all group-hover:translate-x-1"
                  style={{ color: product.linkColor || '#000000' }}
                />
              </div>
            </a>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          {data?.bouton ? (
            <a
              href={data.bouton.Lien}
              className="inline-flex items-center px-8 py-4 text-base font-medium rounded-md shadow-sm transition-all duration-300 relative overflow-hidden artisanat-btn"
              style={{
                '--btn-bg': data.bouton.Couleur || '#000000',
                '--btn-text': data.bouton.TexteColor || '#ffffff', 
                '--btn-border': data.bouton.BorderColor || 'transparent',
                backgroundColor: 'var(--btn-bg)',
                color: 'var(--btn-text)',
                border: data.bouton.BorderColor ? '1px solid var(--btn-border)' : 'none'
              }}
            >
              {data.bouton.Label}
              <ChevronRight size={20} className="ml-2" />
            </a>
          ) : (
            <a
              href="/artisanat"
              className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-8 py-4 text-base font-medium rounded-md shadow-sm transition-colors"
            >
              Découvrir tous nos artisans
              <ChevronRight size={20} className="ml-2" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
