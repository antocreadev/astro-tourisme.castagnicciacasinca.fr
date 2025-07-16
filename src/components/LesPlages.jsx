export default function LesPlages({ data }) {
  // Parser la description pour extraire les points de liste
  const parseDescription = (description) => {
    if (!description) return [];
    const lines = description.split('\n');
    return lines.filter(line => line.startsWith('- ')).map(line => line.substring(2));
  };

  const features = parseDescription(data?.Description);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Image - Takes up 3/5 of the space on desktop, appears between text and button on mobile */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <img
              src="/photos/Plage-de-Cap-Sud.jpg"
              alt="Vue aérienne des plages de la Castagniccia Casinca"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Text Content - Takes up 2/5 of the space on desktop */}
          <div className="lg:col-span-2 order-1 lg:order-2 flex flex-col justify-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                {data?.Titre || 'Les plages'}
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                {data?.Description ? data.Description.split('\n\n')[0] : 'Découvrez les plus belles plages de la Castagniccia Casinca, des criques sauvages aux grandes étendues de sable fin. Un littoral préservé aux eaux cristallines vous attend.'}
              </p>

              <div className="space-y-4">
                {features.length > 0 ? (
                  features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-gray-700">Plages de sable fin</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-gray-700">Criques sauvages</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-gray-700">Eaux cristallines</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-gray-700">Spots de baignade familiale</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Button visible only on desktop */}
            <a 
              href={data?.bouton?.Lien || "/plages"}
              className="hidden lg:block w-auto bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors mt-8"
            >
              {data?.bouton?.Label || 'Découvrir les plages'}
            </a>
          </div>

          {/* Button for mobile - appears after image */}
          <div className="lg:hidden order-3">
            <a 
              href={data?.bouton?.Lien || "/plages"}
              className="w-full bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors block text-center"
            >
              {data?.bouton?.Label || 'Découvrir les plages'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
