export const itineraires = [
  {
    id: 1,
    slug: "patrimonial-castour",
    title: "Patrimonial « Castour »",
    subtitle: "Circuit découverte du patrimoine historique",
    type: "patrimoine",
    difficulty: "facile",
    duration: "3h",
    distance: "8 km",
    transport: "voiture",
    theme: "histoire",
    startPoint: "Vescovato",
    endPoint: "Loreto-di-Casinca",
    image: "/photos/Vescovato.jpg",
    description:
      "Découvrez l'histoire fascinante de la Casinca à travers ses villages chargés d'histoire et ses monuments emblématiques.",
    fullDescription: `
      <p>Le circuit patrimonial « Castour » vous invite à un voyage dans le temps à travers les villages historiques de la Casinca. Cette route panoramique révèle les trésors architecturaux et culturels de cette région au riche passé.</p>
      
      <p>Partant de Vescovato, ancien siège du pouvoir pisano-génois, l'itinéraire serpente à travers des paysages préservés où chaque pierre raconte une histoire. Vous découvrirez des églises baroques exceptionnelles, des tours génoises séculaires et des villages perchés aux ruelles pavées d'antan.</p>
      
      <p>Le parcours met en lumière l'évolution architecturale de la région, depuis les premières constructions romanes jusqu'aux splendeurs baroques des XVIIe et XVIIIe siècles. Chaque étape révèle un aspect différent de l'art de vivre corse traditionnel.</p>
      
      <p>Des panneaux d'interprétation jalonnent le parcours, permettant de mieux comprendre l'histoire locale et l'importance stratégique de cette région dans l'histoire de la Corse.</p>
    `,
    stops: [
      {
        name: "Vescovato",
        description: "Village historique et église baroque",
        duration: "45 min",
        highlights: [
          "Église paroissiale",
          "Architecture traditionnelle",
          "Point de vue panoramique",
        ],
      },
      {
        name: "Venzolasca",
        description: "Village authentique et artisanat local",
        duration: "30 min",
        highlights: [
          "Artisans locaux",
          "Architecture de schiste",
          "Produits du terroir",
        ],
      },
      {
        name: "Penta-di-Casinca",
        description: "Belvédère et patrimoine rural",
        duration: "40 min",
        highlights: [
          "Point de vue exceptionnel",
          "Patrimoine agricole",
          "Sentiers de découverte",
        ],
      },
      {
        name: "Loreto-di-Casinca",
        description: "Destination finale avec patrimoine religieux",
        duration: "50 min",
        highlights: [
          "Sanctuaire historique",
          "Art sacré",
          "Panorama sur la côte",
        ],
      },
    ],
    details: {
      level: "Tout public",
      season: "Toute l'année",
      equipment: "Chaussures confortables, appareil photo",
      parking: "Disponible dans chaque village",
      accessibility: "Accessible aux familles",
      guide: "Brochure disponible à l'Office de Tourisme",
    },
    coordinates: {
      start: { lat: 42.5012, lng: 9.4456 },
      end: { lat: 42.4789, lng: 9.4123 },
    },
    gallery: [
      "/photos/Vescovato.jpg",
      "/photos/Venzolasca.jpg",
      "/photos/PentadiCasinca.jpg",
      "/photos/LoretodiCasinca.jpg",
    ],
    tags: ["patrimoine", "culture", "architecture", "histoire", "famille"],
  },
  {
    id: 2,
    slug: "canaux-casinca",
    title: "Canaux de la Casinca",
    subtitle: "Patrimoine hydraulique et paysages agricoles",
    type: "nature",
    difficulty: "modéré",
    duration: "4h",
    distance: "12 km",
    transport: "pied",
    theme: "nature",
    startPoint: "Penta-di-Casinca",
    endPoint: "Vescovato",
    image: "/photos/PentaAcquatella.jpg",
    description:
      "Suivez les anciens canaux d'irrigation qui ont façonné les paysages agricoles de la Casinca.",
    fullDescription: `
      <p>L'itinéraire des Canaux de la Casinca vous fait découvrir un patrimoine hydraulique exceptionnel, témoignage de l'ingéniosité des anciens pour domestiquer l'eau dans cette région méditerranéenne.</p>
      
      <p>Ces canaux d'irrigation, construits aux XVIIIe et XIXe siècles, ont permis le développement d'une agriculture prospère dans la plaine de la Casinca. Aujourd'hui partiellement préservés, ils constituent un réseau de sentiers de randonnée unique en Corse.</p>
      
      <p>Le parcours alterne entre sections ombragées le long des cours d'eau et passages en terrain découvert offrant de magnifiques panoramas sur la vallée et la mer. Vous découvrirez une faune et une flore remarquables adaptées aux zones humides méditerranéennes.</p>
      
      <p>Cette randonnée permet de comprendre les enjeux de l'eau en Corse et l'importance de ce patrimoine hydraulique dans l'aménagement du territoire insulaire.</p>
    `,
    stops: [
      {
        name: "Source de Penta",
        description: "Point de départ et captage historique",
        duration: "20 min",
        highlights: [
          "Source naturelle",
          "Ancien système de captage",
          "Départ du sentier",
        ],
      },
      {
        name: "Canal principal",
        description: "Suivre le canal d'irrigation principal",
        duration: "90 min",
        highlights: [
          "Ouvrage hydraulique",
          "Faune aquatique",
          "Végétation ripariale",
        ],
      },
      {
        name: "Belvédère d'Acquatella",
        description: "Point de vue sur la plaine irriguée",
        duration: "30 min",
        highlights: [
          "Panorama exceptionnel",
          "Géologie",
          "Observation ornithologique",
        ],
      },
      {
        name: "Anciens moulins",
        description: "Vestiges de l'activité meunière",
        duration: "40 min",
        highlights: [
          "Patrimoine industriel",
          "Mécanismes anciens",
          "Histoire locale",
        ],
      },
    ],
    details: {
      level: "Randonneurs confirmés",
      season: "Printemps et automne recommandés",
      equipment: "Chaussures de randonnée, eau, protection solaire",
      parking: "Aire aménagée à Penta-di-Casinca",
      accessibility: "Sentier non accessible PMR",
      guide: "Accompagnateur recommandé",
    },
    coordinates: {
      start: { lat: 42.4567, lng: 9.4123 },
      end: { lat: 42.5012, lng: 9.4456 },
    },
    gallery: ["/photos/PentaAcquatella.jpg", "/photos/PentadiCasinca.jpg"],
    tags: ["randonnée", "patrimoine", "hydraulique", "nature", "histoire"],
  },
  {
    id: 3,
    slug: "villages-perches-castagniccia",
    title: "Villages perchés de Castagniccia",
    subtitle: "Circuit des villages authentiques",
    type: "culturel",
    difficulty: "facile",
    duration: "5h",
    distance: "25 km",
    transport: "voiture",
    theme: "villages",
    startPoint: "Morosaglia",
    endPoint: "Volpajola",
    image: "/photos/Volpajola.JPG",
    description:
      "Explorez les villages perchés authentiques de la Castagniccia, véritables joyaux de l'architecture corse.",
    fullDescription: `
      <p>Ce circuit vous mène à la découverte des plus beaux villages perchés de la Castagniccia, région de moyenne montagne où l'architecture traditionnelle corse s'est le mieux conservée.</p>
      
      <p>Chaque village révèle ses secrets : maisons de schiste aux toits de lauze, ruelles pavées serpentant entre les demeures séculaires, églises baroques aux façades ouvragées et places ombragées où résonne encore l'écho des conversations en langue corse.</p>
      
      <p>L'itinéraire traverse des paysages de châtaigniers centenaires, ancienne richesse de la région, et offre de nombreux points de vue sur les sommets environnants et la mer au loin.</p>
      
      <p>C'est un voyage dans le temps qui permet de comprendre l'art de vivre traditionnel corse et l'adaptation remarquable de l'homme à ce territoire de montagne.</p>
    `,
    stops: [
      {
        name: "Morosaglia",
        description: "Village natal de Pasquale Paoli",
        duration: "60 min",
        highlights: [
          "Maison natale de Paoli",
          "Musée départemental",
          "Architecture traditionnelle",
        ],
      },
      {
        name: "Valle-di-Rostino",
        description: "Village viticole historique",
        duration: "45 min",
        highlights: [
          "Vignobles en terrasses",
          "Cave coopérative",
          "Dégustation locale",
        ],
      },
      {
        name: "Castello-di-Rostino",
        description: "Village fortifié médiéval",
        duration: "50 min",
        highlights: [
          "Vestiges du château",
          "Point de vue panoramique",
          "Architecture défensive",
        ],
      },
      {
        name: "Volpajola",
        description: "Village perché authentique",
        duration: "70 min",
        highlights: ["Ruelles pavées", "Maisons de schiste", "Église baroque"],
      },
    ],
    details: {
      level: "Tout public",
      season: "Toute l'année, printemps et automne idéaux",
      equipment: "Chaussures confortables, appareil photo",
      parking: "Parking dans chaque village",
      accessibility: "Partiellement accessible",
      guide: "Visites guidées possibles sur réservation",
    },
    coordinates: {
      start: { lat: 42.4289, lng: 9.2876 },
      end: { lat: 42.3987, lng: 9.3245 },
    },
    gallery: ["/photos/Volpajola.JPG", "/photos/MontSantAnghjulu.JPG"],
    tags: ["villages", "patrimoine", "architecture", "culture", "histoire"],
  },
  {
    id: 4,
    slug: "sentier-des-bergeries",
    title: "Sentier des bergeries",
    subtitle: "Découverte du pastoralisme traditionnel",
    type: "nature",
    difficulty: "modéré",
    duration: "6h",
    distance: "15 km",
    transport: "pied",
    theme: "pastoralisme",
    startPoint: "Valle-di-Rostino",
    endPoint: "Monte Sant'Anghjuli",
    image: "/photos/MontSantAnghjulu.JPG",
    description:
      "Immersion dans l'univers du pastoralisme corse à travers bergeries et alpages d'altitude.",
    fullDescription: `
      <p>Le Sentier des bergeries vous emmène au cœur de la tradition pastorale corse, dans un univers préservé où se perpétuent les gestes ancestraux de l'élevage en montagne.</p>
      
      <p>Cette randonnée exigeante mais accessible révèle les secrets de la transhumance et de la fabrication des fromages corses traditionnels. Vous découvrirez des bergeries en activité où bergers et fromagers perpétuent un savoir-faire millénaire.</p>
      
      <p>Le sentier traverse des paysages d'une beauté sauvage : landes d'altitude, forêts de pins laricio, alpages fleuris au printemps. La faune montagnarde y est particulièrement riche avec la possibilité d'observer cochons sauvages, mouflons et rapaces.</p>
      
      <p>Cette expérience authentique permet de comprendre les enjeux contemporains de l'élevage corse et l'importance de préserver ces pratiques traditionnelles face aux défis de la modernité.</p>
    `,
    stops: [
      {
        name: "Départ Valle-di-Rostino",
        description: "Village de départ et première montée",
        duration: "30 min",
        highlights: ["Préparatifs", "Première montée", "Vue sur la vallée"],
      },
      {
        name: "Bergerie de Pratu",
        description: "Bergerie traditionnelle en activité",
        duration: "90 min",
        highlights: [
          "Visite de bergerie",
          "Dégustation fromages",
          "Rencontre avec le berger",
        ],
      },
      {
        name: "Col de Verde",
        description: "Point culminant et panorama",
        duration: "45 min",
        highlights: ["Panorama 360°", "Flore d'altitude", "Pause déjeuner"],
      },
      {
        name: "Monte Sant'Anghjuli",
        description: "Sommet et chapelle",
        duration: "60 min",
        highlights: [
          "Sommet panoramique",
          "Chapelle historique",
          "Spiritualité montagnarde",
        ],
      },
    ],
    details: {
      level: "Randonneurs expérimentés",
      season: "Mai à octobre",
      equipment: "Équipement de randonnée complet, pique-nique",
      parking: "Valle-di-Rostino",
      accessibility: "Non accessible PMR",
      guide: "Guide de montagne recommandé",
    },
    coordinates: {
      start: { lat: 42.4156, lng: 9.2987 },
      end: { lat: 42.4156, lng: 9.2987 },
    },
    gallery: ["/photos/MontSantAnghjulu.JPG"],
    tags: ["randonnée", "montagne", "pastoralisme", "tradition", "gastronomie"],
  },
  {
    id: 5,
    slug: "route-des-artisans",
    title: "Route des artisans",
    subtitle: "Circuit découverte de l'artisanat local",
    type: "artisanat",
    difficulty: "facile",
    duration: "4h",
    distance: "20 km",
    transport: "voiture",
    theme: "artisanat",
    startPoint: "Venzolasca",
    endPoint: "Prunelli-di-Casacconi",
    image: "/photos/Venzolasca.jpg",
    description:
      "Rencontrez les artisans locaux et découvrez les savoir-faire traditionnels de la région.",
    fullDescription: `
      <p>La Route des artisans vous invite à découvrir la richesse créative de la Castagniccia-Casinca à travers la rencontre avec des artisans passionnés qui perpétuent les traditions tout en innovant.</p>
      
      <p>Ce circuit original permet de visiter ateliers de poterie, forges traditionnelles, ateliers de lutherie, tissage et bien d'autres métiers d'art. Chaque étape est l'occasion d'échanger avec des créateurs qui partagent leur passion et leur savoir-faire.</p>
      
      <p>Vous découvrirez comment les matières premières locales (argile, bois de châtaignier, laine, miel) sont transformées en objets d'art et d'usage selon des techniques ancestrales adaptées aux goûts contemporains.</p>
      
      <p>Cette immersion dans l'univers artisanal local offre la possibilité d'acquérir des pièces uniques et de ramener un souvenir authentique de votre passage en Castagniccia-Casinca.</p>
    `,
    stops: [
      {
        name: "Atelier de poterie - Venzolasca",
        description: "Poterie traditionnelle corse",
        duration: "60 min",
        highlights: [
          "Démonstration tournage",
          "Techniques d'émaillage",
          "Achat direct",
        ],
      },
      {
        name: "Forge de Porri",
        description: "Ferronnerie d'art traditionnelle",
        duration: "45 min",
        highlights: [
          "Travail du fer forgé",
          "Outils traditionnels",
          "Créations contemporaines",
        ],
      },
      {
        name: "Atelier textile - Volpajola",
        description: "Tissage et filage artisanal",
        duration: "50 min",
        highlights: ["Métier à tisser", "Laine locale", "Teintures naturelles"],
      },
      {
        name: "Miellerie de Prunelli",
        description: "Production de miel et cire",
        duration: "45 min",
        highlights: [
          "Ruches traditionnelles",
          "Dégustation miels",
          "Produits dérivés",
        ],
      },
    ],
    details: {
      level: "Tout public",
      season: "Toute l'année sauf dimanche",
      equipment: "Aucun équipement particulier",
      parking: "Disponible près de chaque atelier",
      accessibility: "Accessible aux familles",
      guide: "Visite libre ou sur rendez-vous",
    },
    coordinates: {
      start: { lat: 42.5123, lng: 9.5234 },
      end: { lat: 42.4567, lng: 9.389 },
    },
    gallery: [
      "/photos/Venzolasca.jpg",
      "/photos/Volpajola.JPG",
      "/photos/PrunellidiCasacconi.jpg",
      "/photos/Porri.jpg",
    ],
    tags: ["artisanat", "tradition", "culture", "shopping", "famille"],
  },
];

export const itineraireTypes = [
  { id: "all", label: "Tous types", color: "gray" },
  { id: "patrimoine", label: "Patrimoine", color: "purple" },
  { id: "nature", label: "Nature", color: "green" },
  { id: "culturel", label: "Culturel", color: "blue" },
  { id: "artisanat", label: "Artisanat", color: "orange" },
];

export const transports = ["Tous moyens", "voiture", "pied", "vélo"];

export const themes = [
  "Tous thèmes",
  "histoire",
  "nature",
  "villages",
  "pastoralisme",
  "artisanat",
  "gastronomie",
];

export const itinerairesDifficulties = [
  "Toutes difficultés",
  "facile",
  "modéré",
  "difficile",
];

export const itinerairesDurations = [
  "Toutes durées",
  "< 3h",
  "3h - 5h",
  "5h - 7h",
  "> 7h",
];
