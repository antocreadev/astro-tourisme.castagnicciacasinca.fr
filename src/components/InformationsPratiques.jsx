import { ChevronRight } from "lucide-react"
import { createSlug } from "../utils/slugUtils.js";

export default function InformationsPratiques({ data, colorData }) {
  // Utilise les données dynamiques de l'API ou les données statiques en fallback
  const getInformationItems = () => {
    if (!data?.type_information_pratiques) return [];
    const baseEnv = import.meta.env.PUBLIC_STRAPI_URL || import.meta.env.PUBLIC_API_URL || '';
    return data.type_information_pratiques.map(item => {
      let iconUrl = null;
      const media = item.Icone;
      if (media?.url && media?.mime && media.mime.startsWith('image/')) {
        if (media.url.startsWith('http')) iconUrl = media.url; else iconUrl = `${baseEnv}${media.url}`;
      }
      return {
        title: item.Titre,
        description: item.Description || '',
        link: item.Lien?.Lien || null,
        linkLabel: item.Lien?.Label || '',
        linkColor: item.Lien?.TextColor || null,
        iconUrl
      };
    });
  };

  const informationItems = getInformationItems();


  const sectionStyle = {
    backgroundColor: colorData?.data?.fondInformationsPratiques || '#ffffff',
    color: colorData?.data?.texteInformationsPratiques || '#000000'
  };

  const elementStyle = {
    backgroundColor: colorData?.data?.fondElementInformationsPratiques || '#ffffff'
  };

  return (
    <div className="py-8 sm:py-16 px-4" style={sectionStyle} id="informations-pratiques">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold" style={{ color: colorData?.data?.texteInformationsPratiques || '#000000' }}>{data?.Titre || 'Informations pratiques'}</h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
          {informationItems.map((info, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 space-y-4"
                style={elementStyle}
              >
                {info.iconUrl && (
                  <div className="inline-block p-3 rounded-lg bg-gray-50">
                    <img
                      src={info.iconUrl}
                      alt={info.title}
                      className="w-8 h-8"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-black">{info.title}</h2>

                {/* Description */}
                {info.description && (
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{info.description}</p>
                )}

                {/* Link */}
                {info.link && info.linkLabel && (
                  <a 
                    href={info.link}
                    className="inline-flex items-center font-medium hover:opacity-80 transition-colors group mt-4"
                    style={info.linkColor ? { color: info.linkColor } : undefined}
                  >
                    <span className="mr-2">{info.linkLabel}</span>
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
