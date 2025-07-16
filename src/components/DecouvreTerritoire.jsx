
export default function DecouvreTerritoire({ data }) {
  return (
    <div className="bg-white min-h-[90vh]">
      
      <div className="max-w-7xl mx-auto px-4 py-16">
                      <h1 className="text-4xl font-bold text-black mb-6 leading-tight text-center">
                {data?.Titre || 'Découvrez le territoire le patrimoine et la culture'}
              </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Image - Hidden on mobile, shown on desktop */}
          <div className="relative hidden lg:block">
            <img
              src={data?.media?.[0]?.url ? `${import.meta.env.PUBLIC_API_URL || ''}${data.media[0].url}` : "https://placehold.co/800x600?text=Village+Corse"}
              alt="Vue aérienne d'un village corse traditionnel"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div>

              
              {/* Mobile Image - Appears after title on mobile only */}
              <div className="relative lg:hidden mb-6 flex items-center justify-center">
                <img
                  src={data?.media?.[0]?.url ? `${import.meta.env.PUBLIC_API_URL || ''}${data.media[0].url}` : "https://placehold.co/800x600?text=Village+Corse"}
                  alt="Vue aérienne d'un village corse traditionnel"
                  className="w-3/4 lg:w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {data?.Description || 'La Casinca est un territoire caractérisé par un secteur montagneux recouvert de forêts, de châtaigniers et d\'oliviers, un piémont avec ses terrasses où sont situées les villages anciens et la plaine avec son littoral. La Casinca est naturellement délimitée par deux fleuves : au nord par la partie terminale du Golu, au sud, par le Fium\'Altu qui prend sa source au pied du San Petrone. L\'ouest est quant à lui délimité par la chaîne montagneuse d\'I Sant\'Anghjuli et l\'est par la mer tyrrhénienne. Ses villages perchés offrent de magnifiques panoramas sur le nord de la côte orientale ainsi que sur l\'archipel toscan voire la péninsule italique.'}
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-5xl font-bold text-black mb-2">{data?.Stat1 || '70'}</div>
                <p className="text-gray-700 leading-relaxed">
                  {data?.DescriptionStat1 || 'Lieux culturels à découvrir (églises, chapelles, moulins, etc.)'}
                </p>
              </div>
              <div>
                <div className="text-5xl font-bold text-black mb-2">{data?.Stat2 || '800 ans'}</div>
                <p className="text-gray-700 leading-relaxed">
                  {data?.DescriptionStat2 || 'De nombreuses églises et constructions datent du Moyen Âge'}
                </p>
              </div>
            </div>

            {/* Button */}
            {/* <div className="pt-4">
              {data?.Bouton ? (
                <a 
                  href={data.Bouton.Lien}
                  className="inline-block w-full px-8 py-4 text-base font-medium rounded-md shadow-sm transition-all duration-300 relative overflow-hidden text-center decouvre-btn"
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
                <button className="w-full px-8 py-4 text-base font-medium rounded-md shadow-sm bg-black text-white hover:bg-gray-800 transition-colors">
                  En savoir plus
                </button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
