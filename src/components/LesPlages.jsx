
export default function LesPlages() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Left Image - Takes up 3/5 of the space */}
          <div className="lg:col-span-3">
            <img
              src="https://placehold.co/1200x800?text=Plage+Corse+Aerienne"
              alt="Vue aérienne des plages de la Castagniccia Casinca"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Content - Takes up 2/5 of the space */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-black mb-6">Les plages</h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Plongez dans un véritable paradis méditerranéen où chaque plage raconte une histoire. Entre étendues de
                sable fin, criques sauvages et eaux turquoise, le littoral de la Castagniccia Casinca vous invite à la
                détente et à l'évasion.
              </p>
            </div>

            {/* Button */}
            <div className="pt-4">
              <button className="border-2 border-black text-black px-6 py-3 font-medium hover:bg-black hover:text-white transition-colors">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
