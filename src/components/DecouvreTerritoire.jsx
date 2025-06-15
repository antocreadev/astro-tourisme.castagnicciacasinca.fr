
export default function DecouvreTerritoire() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative">
            <img
              src="https://placehold.co/800x600?text=Village+Corse"
              alt="Vue aérienne d'un village corse traditionnel"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-black mb-6 leading-tight">
                Découvrez le territoire le patrimoine et la culture
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                La Casinca est un territoire caractérisé par un secteur montagneux recouvert de forêts, de châtaigniers
                et d'oliviers, un piémont avec ses terrasses où sont situées les villages anciens et la plaine avec son
                littoral. La Casinca est naturellement délimitée par deux fleuves : au nord par la partie terminale du
                Golu, au sud, par le Fium'Altu qui prend sa source au pied du San Petrone. L'ouest est quant à lui
                délimité par la chaîne montagneuse d'I Sant'Anghjuli et l'est par la mer tyrrhénienne. Ses villages
                perchés offrent de magnifiques panoramas sur le nord de la côte orientale ainsi que sur l'archipel
                toscan voire la péninsule italique.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-5xl font-bold text-black mb-2">70</div>
                <p className="text-gray-700 leading-relaxed">
                  Lieux culturels à découvrir (églises, chapelles, moulins, etc.)
                </p>
              </div>
              <div>
                <div className="text-5xl font-bold text-black mb-2">800 ans</div>
                <p className="text-gray-700 leading-relaxed">
                  De nombreuses églises et constructions datent du Moyen Âge
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="pt-4">
              <button className="border-2 border-gray-300 text-black px-6 py-3 font-medium hover:bg-gray-50 transition-colors">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
