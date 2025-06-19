import { plages } from '../data/plages.js';

export default function LesPlages() {
  // Plages vedettes pour l'affichage
  const plagesVedettes = plages.slice(0, 3);
  const totalPlages = plages.length;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Image - Takes up 3/5 of the space on desktop, appears between text and button on mobile */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image principale */}
              <div className="md:col-span-2">
                <img
                  src="/photos/Plage-de-Cap-Sud.jpg"
                  alt="Vue aérienne des plages de la Castagniccia Casinca"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              {/* Images des plages vedettes */}
              {plagesVedettes.slice(0, 2).map((plage, index) => (
                <div key={plage.id} className="relative">
                  <img
                    src={plage.image}
                    alt={plage.nom}
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {plage.nom}
                  </div>
                </div>
              ))}
            </div>
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
              
              {/* Statistiques des plages */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{totalPlages}</div>
                    <div className="text-sm text-gray-600">Plages répertoriées</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {plages.filter(p => p.drapeauBleu).length}
                    </div>
                    <div className="text-sm text-gray-600">Drapeaux Bleus</div>
                  </div>
                </div>
              </div>

              {/* Aperçu des plages */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Nos plages vedettes</h3>
                <div className="space-y-2">
                  {plagesVedettes.map((plage) => (
                    <a
                      key={plage.id}
                      href={`/plages/${plage.slug}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-800">{plage.nom}</div>
                          <div className="text-sm text-gray-600">{plage.commune} • {plage.longueur}</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-sm font-medium">{plage.note}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {/* Button visible only on desktop */}
            <a 
              href="/plages"
              className="hidden lg:block w-auto bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors"
            >
              Découvrir toutes les plages
            </a>
          </div>

          {/* Button for mobile - appears after image */}
          <div className="lg:hidden order-3">
            <a 
              href="/plages"
              className="w-full bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors block text-center"
            >
              Découvrir toutes les plages
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
