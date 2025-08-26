import { Building2, Building, Home, Tent, ShoppingBasket, UtensilsCrossed, ChevronRight } from "lucide-react"
import { hebergements } from '../data/hebergements.js';

export default function Sejourner({ data, sejourners = [], colorData }) {
  // Construire un index dynamique par type (API) si disponible
  const normalize = (s = '') => s
    .toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu,'')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-|-$/g,'');

  const countsFromApi = () => {
    if (!Array.isArray(sejourners) || sejourners.length === 0) return null;
    return sejourners.reduce((acc, item) => {
      const raw = item.type_sejourner?.Denomination || 'Autre';
      const key = normalize(raw);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  };
  const dynamicCounts = countsFromApi();

  // Fallback counts (statique) si pas d'API
  const countStatic = (type) => hebergements.filter(h => h.type === type).length;

  const mapLabelToStaticKey = (label) => {
    const lower = label.toLowerCase();
    if (lower.includes('hôtel')) return 'hotel';
    if (lower.includes('résidence')) return 'residence';
    if (lower.includes('village')) return 'village-vacances';
    if (lower.includes('camping')) return 'camping';
    return null; // pas de compteur statique pertinent
  };

  const getCount = (denomination) => {
    if (dynamicCounts) return dynamicCounts[normalize(denomination)] || 0;
    const key = mapLabelToStaticKey(denomination);
    return key ? countStatic(key) : 0;
  };

  const buildItems = () => {
    if (data?.type_sejourners?.length) {
      return data.type_sejourners.map(item => ({
        title: item.Denomination,
        description: item.Description,
        link: `${item.lien?.Lien || '/sejourner'}?type=${encodeURIComponent(item.Denomination)}`,
        linkLabel: item.lien?.Label || 'En savoir plus',
        linkColor: item.lien?.TextColor,
        iconUrl: item.Icone?.url ? `${import.meta.env.PUBLIC_API_URL || ''}${item.Icone.url}` : null,
  count: getCount(item.Denomination)
      }));
    }

    // Fallback statique
    return [
      { icon: Building2, title: 'Hôtels', description: 'Détendez-vous dans nos hôtels de charme avec vue sur mer ou montagne.', link: '/sejourner?type=Hôtels', linkLabel: 'Voir les hébergements', count: getCount('Hôtels') },
      { icon: Building, title: 'Résidences de tourisme', description: "Profitez de l'indépendance avec nos résidences tout équipées.", link: '/sejourner?type=Résidences de tourisme', linkLabel: 'Voir les hébergements', count: getCount('Résidences de tourisme') },
      { icon: Home, title: 'Villages vacances', description: 'Partagez des moments inoubliables avec animations et services.', link: '/sejourner?type=Villages vacances', linkLabel: 'Voir les hébergements', count: getCount('Villages vacances') },
      { icon: Tent, title: 'Campings', description: 'Campez en pleine nature avec tout le confort moderne.', link: '/sejourner?type=Campings', linkLabel: 'Voir les hébergements', count: getCount('Campings') },
      { icon: ShoppingBasket, title: 'Commerces', description: 'Découvrez nos produits locaux et artisanaux.', link: '/sejourner?type=Commerces', linkLabel: 'En savoir plus', count: getCount('Commerces') },
      { icon: UtensilsCrossed, title: 'Restaurants', description: 'Dégustez une cuisine corse authentique et savoureuse.', link: '/sejourner?type=Restaurants', linkLabel: 'En savoir plus', count: getCount('Restaurants') }
    ];
  };

  const sejournerItems = buildItems();

  const sectionStyle = {
    backgroundColor: colorData?.data?.fondSejourner || '#ffffff',
    color: colorData?.data?.texteSejourner || '#000000'
  };

  const elementStyle = {
    backgroundColor: colorData?.data?.fondElementSejourner || '#ffffff'
  };

  return (
    <div className="pb-8 sm:pb-16 px-4" style={sectionStyle}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8 sm:mb-16 pt-4">
          <h1 className="text-4xl sm:text-5xl font-bold" style={{ color: colorData?.data?.texteSejourner || '#000000' }}>{data?.Titre || 'Séjourner'}</h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
          {sejournerItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div 
                key={index} 
                className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 space-y-4"
                style={elementStyle}
              >
                {/* Icon */}
                <div className="inline-block p-3 rounded-lg bg-gray-50">
                  {item.iconUrl ? (
                    <img 
                      src={item.iconUrl} 
                      alt={item.title}
                      className="w-8 h-8 text-black"
                    />
                  ) : IconComponent ? (
                    <IconComponent size={32} className="text-black" strokeWidth={1.5} />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  )}
                </div>

                {/* Title with count */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-black">{item.title}</h2>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{item.description}</p>

                {/* Link */}
                <a 
                  href={item.link} 
                  className="inline-flex items-center font-medium hover:opacity-80 transition-colors group mt-4"
                  style={{ color: item.linkColor || '#000000' }}
                >
                  <span className="mr-2">
                    {item.linkLabel}
                  </span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )
          })}
        </div>

        {/* Bouton pour voir tous les hébergements */}
        <div className="text-center mt-12">
          {data?.Bouton ? (
            <a
              href={data.Bouton.Lien}
              className="inline-flex items-center px-8 py-4 text-base font-medium rounded-md shadow-sm transition-all duration-300 relative overflow-hidden sejourner-btn"
              style={{
                '--btn-bg': data.Bouton.Couleur || '#2563eb',
                '--btn-text': data.Bouton.TexteColor || '#ffffff', 
                '--btn-border': data.Bouton.BorderColor || 'transparent',
                backgroundColor: 'var(--btn-bg)',
                color: 'var(--btn-text)',
                border: data.Bouton.BorderColor ? '1px solid var(--btn-border)' : 'none'
              }}
            >
              {data.Bouton.Label}
              <ChevronRight size={20} className="ml-2" />
            </a>
          ) : (
            <a
              href="/sejourner"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base font-medium rounded-md shadow-sm transition-colors duration-200"
            >
              Voir tous les hébergements
              <ChevronRight size={20} className="ml-2" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
