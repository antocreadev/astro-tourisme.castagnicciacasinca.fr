
import React from 'react';
import { convertMarkdownToHtml } from '../utils/markdownUtils.js';

export default function DecouvreTerritoire({ data, colorData }) {
  const sectionStyle = {
    color: colorData?.data?.texteDecouvrezLeTerritoire || '#000000',
    backgroundColor: colorData?.data?.fondDecouvrezLeTerritoire || '#ffffff'
  };

  return (
    <div  style={sectionStyle} id="decouvrez-le-territoire">
      
      <div className="max-w-7xl mx-auto px-4 pb-16">
                      <h1 className="text-4xl font-bold mb-6 leading-tight text-center" style={{ color: colorData?.data?.texteDecouvrezLeTerritoire || '#000000' }}>
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
              <div 
                className="text-gray-700 text-lg leading-relaxed text-justify"
                dangerouslySetInnerHTML={{ 
                  __html: convertMarkdownToHtml(data?.Description || '')
                }}
              />
            </div>

            {/* Statistics */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-5xl font-bold text-black mb-2">{data?.Stat1 || '70'}</div>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: convertMarkdownToHtml(data?.DescriptionStat1 || 'Lieux culturels à découvrir (églises, chapelles, moulins, etc.)')
                  }}
                />
              </div>
              <div>
                <div className="text-5xl font-bold text-black mb-2">{data?.Stat2 || '800 ans'}</div>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: convertMarkdownToHtml(data?.DescriptionStat2 || 'De nombreuses églises et constructions datent du Moyen Âge')
                  }}
                />
              </div>
            </div> */}

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
