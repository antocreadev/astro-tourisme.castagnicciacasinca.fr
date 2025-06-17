export default function LesPlages() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Image - Takes up 3/5 of the space on desktop, appears between text and button on mobile */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <img
              src="https://placehold.co/1200x800?text=Plage+Corse+Aerienne"
              alt="Vue aérienne des plages de la Castagniccia Casinca"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Content - Takes up 2/5 of the space on desktop, appears first on mobile */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="space-y-8">
              <h1 className="text-5xl font-bold text-black mb-6">Les plages</h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Plongez dans un véritable paradis méditerranéen où chaque plage raconte une histoire. Entre étendues de
                sable fin, criques sauvages et eaux turquoise, le littoral de la Castagniccia Casinca vous invite à la
                détente et à l'évasion.
              </p>
            </div>
            {/* Button visible only on desktop */}
            <button className="hidden lg:block w-auto bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors">
              En savoir plus
            </button>
          </div>

          {/* Button for mobile - appears after image */}
          <div className="lg:hidden order-3">
            <button className="w-full bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors">
              En savoir plus
            </button>
          </div>


        </div>
      </div>
    </div>
  )
}
