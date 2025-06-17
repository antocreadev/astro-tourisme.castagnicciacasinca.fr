import { ChevronRight } from "lucide-react"

export default function ArtisanatTerroir() {
  const products = [
    {
      image: "https://placehold.co/600x400?text=Brasserie",
      title: "Production de Bière",
      alt: "Équipements de brasserie avec cuves et matériel de production de bière artisanale",
    },
    {
      image: "https://placehold.co/600x400?text=Charcuterie",
      title: "Charcuterie",
      alt: "Artisan charcutier découpant de la charcuterie traditionnelle corse",
    },
    {
      image: "https://placehold.co/600x400?text=Maraichage",
      title: "Maraichage",
      alt: "Tracteur dans les champs au coucher du soleil pour le maraîchage local",
    },
  ]

  return (
    <div className="bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black">Artisanat et produits du terroir</h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="group cursor-pointer">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
