import { convertMarkdownWithLists } from '../utils/markdownUtils.js';

export default function LesPlages({ data, plages = [], colorData }) {
  const API_URL = import.meta.env.PUBLIC_STRAPI_URL || 'https://cms.castagnicciacasinca.fr';
  
  // Obtenir l'URL de l'image depuis l'API
  const getImageUrl = () => {
    if (data?.image?.url) {
      return `${API_URL}${data.image.url}`;
    }
    return '/photos/Plage-de-Cap-Sud.jpg'; // Image par défaut
  };

  const sectionStyle = {
    backgroundColor: colorData?.data?.FondPlages || '#ffffff',
    color: colorData?.data?.textePlages || '#000000'
  };

  return (
    <div style={sectionStyle}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Image - Takes up 3/5 of the space on desktop, appears between text and button on mobile */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <img
              src={getImageUrl()}
              alt={data?.image?.alternativeText || "Vue aérienne des plages de la Castagniccia Casinca"}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Text Content - Takes up 2/5 of the space on desktop */}
          <div className="lg:col-span-2 order-1 lg:order-2 flex flex-col justify-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight" style={{ color: colorData?.data?.textePlages || '#000000' }}>
                {data?.Titre || 'Les plages'}
              </h2>

              <div 
                className="text-lg leading-relaxed text-justify" 
                style={{ color: colorData?.data?.textePlages || '#4b5563' }}
                dangerouslySetInnerHTML={{
                  __html: data?.Description ? convertMarkdownWithLists(data.Description) : convertMarkdownWithLists('Découvrez les plus belles plages de la Castagniccia Casinca, des criques sauvages aux grandes étendues de sable fin. Un littoral préservé aux eaux cristallines vous attend.')
                }}
              />
            </div>
            {/* Button visible only on desktop */}
            {data?.bouton && (
              <a 
                href={data.bouton.Lien || "/plages"}
                className="mt-4 plages-btn hidden lg:inline-block w-auto px-8 py-3 font-medium rounded-lg transition-all duration-300 relative overflow-hidden"
                style={{
                  '--btn-bg': data.bouton.Couleur || '#000000',
                  '--btn-text': data.bouton.TexteColor || '#ffffff',
                  '--btn-border': data.bouton.BorderColor || '#000000',
                  backgroundColor: 'var(--btn-bg)',
                  color: 'var(--btn-text)',
                  borderColor: 'var(--btn-border)',
                  border: '1px solid var(--btn-border)'
                }}
              >
                {data.bouton.Label || 'Découvrir les plages'}
              </a>
            )}
          </div>

          {/* Button for mobile - appears after image */}
          <div className="lg:hidden order-3">
            {data?.bouton && (
              <a 
                href={data.bouton.Lien || "/plages"}
                className="plages-btn w-full px-8 py-3 font-medium rounded-lg transition-all duration-300 relative overflow-hidden block text-center"
                style={{
                  '--btn-bg': data.bouton.Couleur || '#000000',
                  '--btn-text': data.bouton.TexteColor || '#ffffff',
                  '--btn-border': data.bouton.BorderColor || '#000000',
                  backgroundColor: 'var(--btn-bg)',
                  color: 'var(--btn-text)',
                  borderColor: 'var(--btn-border)',
                  border: '1px solid var(--btn-border)'
                }}
              >
                {data.bouton.Label || 'Découvrir les plages'}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
