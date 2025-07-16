import { ChevronRight } from "lucide-react"

export default function ArtisanatTerroirReal({ data }) {
  const products = [
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
  ]

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black">{data?.Titre || 'Artisanat et produits du terroir'}</h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
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
                <h2 className="text-2xl font-bold text-black group-hover:text-gray-600 transition-colors">
                  {product.title}
                </h2>
                <ChevronRight
                  size={24}
                  className="text-black group-hover:text-gray-600 transition-all group-hover:translate-x-1"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href={data?.bouton?.Lien || "/artisanat"}
            className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-8 py-3 font-medium transition-colors"
          >
            {data?.bouton?.Label || 'Découvrir tous nos artisans'}
            <ChevronRight size={20} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  )
}
