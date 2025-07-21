import { Ticket, Ship, Sparkles, Mountain, ChevronRight } from "lucide-react"

export default function ActivitesLoisirs({ data, randonnees = [], activitesNautiques = [] }) {
  // S'assurer que les données sont des tableaux
  const randonneesArray = Array.isArray(randonnees) ? randonnees : [];
  const activitesNautiquesArray = Array.isArray(activitesNautiques) ? activitesNautiques : [];

  // Utilise les données dynamiques de l'API ou les données statiques en fallback
  const getActiviteItems = () => {
    if (data?.type_activite_loisirs && data.type_activite_loisirs.length > 0) {
      return data.type_activite_loisirs.map(item => ({
        title: item.Titre,
        description: item.Description,
        link: generateLinkForActivity(item),
        linkLabel: item.Lien?.Label || "En savoir plus",
        linkColor: item.Lien?.TextColor,
        iconUrl: item.Icone?.url ? `${import.meta.env.PUBLIC_API_URL || ''}${item.Icone.url}` : null
      }));
    }

    // Données enrichies avec les vraies données d'API
    const items = [
      {
        icon: Ticket,
        title: "Évènements",
        description: "Immersion totale au cœur de la Castagniccia lors de nos événements festifs !",
        link: "/agenda",
        linkLabel: "En savoir plus"
      },
      {
        icon: Ship,
        title: "Activités nautiques",
        description: activitesNautiquesArray.length > 0 
          ? `Découvrez ${activitesNautiquesArray.length} activité${activitesNautiquesArray.length > 1 ? 's' : ''} nautique${activitesNautiquesArray.length > 1 ? 's' : ''} : ${activitesNautiquesArray.slice(0, 2).map(a => a.Nom).join(', ')}${activitesNautiquesArray.length > 2 ? '...' : ''}` 
          : "Explorez les côtes sauvages de la Casinca en kayak, paddle ou bateau.",
        link: "/activite-nautique",
        linkLabel: "En savoir plus"
      },
      {
        icon: Sparkles,
        title: "Festivals, Marchés et foires",
        description: "Participez aux événements festifs et découvrez l'artisanat local lors de nos marchés et foires.",
        link: "/agenda",
        linkLabel: "En savoir plus"
      },
      {
        icon: Mountain,
        title: "Les randonnées, balades",
        description: randonneesArray.length > 0 
          ? `Explorez ${randonneesArray.length} randonnée${randonneesArray.length > 1 ? 's' : ''} : ${randonneesArray.slice(0, 2).map(r => r.Nom).join(', ')}${randonneesArray.length > 2 ? '...' : ''}` 
          : "Découvrez les sentiers de randonnée de la Castagniccia.",
        link: "/randonnee",
        linkLabel: "En savoir plus"
      },
    ];

    return items;
  };

  // Fonction pour générer le lien approprié selon le type d'activité
  const generateLinkForActivity = (item) => {
    const baseLink = item.Lien?.Lien || "/activites";
    const title = item.Titre.toLowerCase();
    
    if (title.includes('randonnée') || title.includes('rando') || title.includes('sentier') || title.includes('balade')) {
      return "/randonnee";
    }
    
    if (title.includes('nautique') || title.includes('kayak') || title.includes('paddle') || title.includes('bateau') || title.includes('mer')) {
      return "/activite-nautique";
    }
    
    if (title.includes('événement') || title.includes('festival') || title.includes('marché') || title.includes('foire')) {
      return "/agenda";
    }
    
    return baseLink;
  };

  const activiteItems = getActiviteItems();

  return (
    <div className="bg-white py-8 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-black">{data?.Titre || 'Activités et loisirs'}</h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activiteItems.map((activity, index) => {
            const IconComponent = activity.icon
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white space-y-4"
              >
                {/* Icon */}
                <div className="inline-block p-3 rounded-lg bg-gray-50">
                  {activity.iconUrl ? (
                    <img 
                      src={activity.iconUrl} 
                      alt={activity.title}
                      className="w-8 h-8 text-black"
                    />
                  ) : IconComponent ? (
                    <IconComponent size={32} className="text-black" strokeWidth={1.5} />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-black">{activity.title}</h2>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed">{activity.description}</p>

                {/* Link */}
                <a 
                  href={activity.link}
                  className="inline-flex items-center font-medium hover:opacity-80 transition-colors group mt-4"
                  style={{ color: activity.linkColor || '#000000' }}
                >
                  <span className="mr-2">{activity.linkLabel}</span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
