import { BookOpen, Download, ExternalLink, FileText, MapPin } from "lucide-react"

export default function GuidesNumeriques({ data, colorData }) {
  // Utilise les données dynamiques de l'API
  const getGuidesItems = () => {
    if (data?.PDF && data.PDF.length > 0) {
      return data.PDF.map(pdf => ({
        title: pdf.Titre,
        description: pdf.Description,
        link: pdf.Lien?.Lien,
        linkLabel: pdf.Lien?.Label || "Consulter le guide",
        linkColor: pdf.Lien?.TextColor,
        isExternal: true,
        coverImage: pdf.image?.formats?.medium?.url 
          ? `${import.meta.env.PUBLIC_API_URL || ''}${pdf.image.formats.medium.url}`
          : pdf.image?.url 
          ? `${import.meta.env.PUBLIC_API_URL || ''}${pdf.image.url}`
          : null
      }));
    }

    // Guides par défaut si pas de données API
    return [
      {
        title: "Guide Territoire Castagniccia",
        description: "Découvrez notre territoire à travers ce guide complet présentant les sites incontournables, les traditions et l'histoire de la Castagniccia.",
        link: "https://www.calameo.com/read/0080195455a91864339ba",
        linkLabel: "Consulter le guide",
        isExternal: true,
        coverImage: "/photos/LoretodiCasinca.jpg"
      },
      {
        title: "Guide Territoire Casinca",
        description: "Explorez la richesse de la Casinca avec ce guide détaillé sur les lieux d'intérêt, les activités et le patrimoine local.",
        link: "https://www.calameo.com/read/00801954513c38c5b34e9",
        linkLabel: "Consulter le guide",
        isExternal: true,
        coverImage: "/photos/Vescovato.jpg"
      }
    ];
  };

  const guidesItems = getGuidesItems();

  const sectionStyle = {
    backgroundColor: colorData?.data?.fondGuidesNumeriques || '#f9fafb',
    color: colorData?.data?.texteGuidesNumeriques || '#000000'
  };

  const elementStyle = {
    backgroundColor: colorData?.data?.fondElementGuidesNumeriques || '#ffffff'
  };

  return (
    <div className="py-8 sm:py-16 px-4" style={sectionStyle}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold" style={{ color: colorData?.data?.texteGuidesNumeriques || '#000000' }}>
            {data?.Titre || 'Guides numériques'}
          </h1>
          {(data?.Description || data?.Subtitle) && (
            <p className="text-lg sm:text-xl mt-4 max-w-3xl" style={{ color: colorData?.data?.texteGuidesNumeriques || '#4b5563' }}>
              {data.Description || data.Subtitle || 'Découvrez nos guides numériques interactifs pour explorer le territoire de la Castagniccia-Casinca.'}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {guidesItems.map((guide, index) => {
            return (
              <div
                key={index}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={elementStyle}
              >
                {/* Image ou placeholder */}
                <div className="h-48 sm:h-56 bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden">
                  {guide.coverImage ? (
                    <img 
                      src={guide.coverImage}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                      <BookOpen size={64} className="text-slate-400 opacity-60" strokeWidth={1} />
                    </div>
                  )}
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  
      
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-black mb-3 group-hover:text-green-700 transition-colors">
                    {guide.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                    {guide.description}
                  </p>

                  {/* Link */}
                  <a 
                    href={guide.link}
                    target={guide.isExternal ? "_blank" : "_self"}
                    rel={guide.isExternal ? "noopener noreferrer" : ""}
                    className="inline-flex items-center font-medium text-black hover:text-green-700 transition-colors group/link"
                    style={{ color: guide.linkColor || '#000000' }}
                  >
                    <span className="mr-2">{guide.linkLabel}</span>
                    {guide.isExternal ? (
                      <ExternalLink size={18} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    ) : (
                      <Download size={18} className="transition-transform group-hover/link:translate-x-1" />
                    )}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
