export const sites = [
  {
    id: 1,
    slug: "monte-san-petrone",
    title: "Monte San Petrone",
    subtitle: "Point culminant de la Castagniccia",
    altitude: "1767m",
    type: "montagne",
    difficulty: "modéré",
    duration: "6h aller-retour",
    commune: "Morosaglia",
    image: "/photos/Mont-San-Petrone.jpg",
    description: "Le plus haut sommet de la Castagniccia offre un panorama exceptionnel sur toute la Corse.",
    fullDescription: `
      <p>Le Monte San Petrone, culminant à 1767 mètres d'altitude, est le point le plus élevé de la Castagniccia et l'un des sommets les plus accessibles de Corse pour découvrir des panoramas à couper le souffle.</p>
      
      <p>Cette montagne emblématique offre une vue imprenable sur l'ensemble de l'île : par temps clair, le regard porte de la mer Tyrrhénienne aux sommets enneigés du GR20, et même jusqu'aux côtes italiennes de Toscane.</p>
      
      <p>Le sentier d'ascension traverse des paysages variés : maquis méditerranéen, forêts de châtaigniers centenaires, puis landes d'altitude. Au sommet, une antenne de télécommunication marque le point culminant, mais ne gâche en rien la beauté du site.</p>
      
      <p>C'est un lieu privilégié pour l'observation astronomique et un point de départ pour de nombreuses randonnées dans la région.</p>
    `,
    details: {
      access: "Route forestière puis sentier balisé",
      parking: "Parking gratuit au départ du sentier",
      equipment: "Chaussures de randonnée recommandées",
      season: "Accessible toute l'année, éviter par mauvais temps",
      viewpoints: "360° sur toute la Corse",
      flora: "Châtaigniers, genévriers, asphodèles"
    },
    coordinates: {
      lat: 42.4247,
      lng: 9.3711
    },
    gallery: [
      "/photos/Mont-San-Petrone.jpg",
      "/photos/MontSantAnghjulu.JPG"
    ],
    activities: ["randonnée", "photographie", "observation", "astronomie"]
  },
  {
    id: 2,
    slug: "juniperaie-venzolasca",
    title: "Juniperaie littorale d'A Venzulasca",
    subtitle: "Écosystème rare et protégé",
    altitude: "50m",
    type: "nature",
    difficulty: "facile",
    duration: "2h",
    commune: "Venzolasca",
    image: "/photos/Venzolasca.jpg",
    description: "Une formation végétale exceptionnelle unique en Méditerranée occidentale.",
    fullDescription: `
      <p>La juniperaie littorale de Venzolasca constitue l'un des écosystèmes les plus remarquables et les plus rares de Corse. Cette formation végétale unique en Méditerranée occidentale abrite des genévriers séculaires aux formes tourmentées par les vents marins.</p>
      
      <p>Classé Espace Naturel Sensible, ce site exceptionnel témoigne de l'adaptation remarquable de la végétation méditerranéenne aux conditions littorales extrêmes. Les genévriers oxycèdres et phoeniciens forment ici une véritable forêt basse, créant un paysage d'une beauté saisissante.</p>
      
      <p>Le sentier d'interprétation permet de découvrir cette richesse botanique tout en profitant de magnifiques points de vue sur la mer Tyrrhénienne et l'archipel toscan.</p>
      
      <p>Un observatoire ornithologique permet d'observer de nombreuses espèces d'oiseaux migrateurs qui font escale dans cette zone humide remarquable.</p>
    `,
    details: {
      access: "Sentier d'interprétation balisé",
      parking: "Aire de stationnement aménagée",
      equipment: "Chaussures de marche, jumelles conseillées",
      season: "Toute l'année, printemps idéal pour la flore",
      protection: "Espace Naturel Sensible - Respect obligatoire",
      fauna: "Oiseaux migrateurs, reptiles endémiques"
    },
    coordinates: {
      lat: 42.5123,
      lng: 9.5234
    },
    gallery: [
      "/photos/Venzolasca.jpg"
    ],
    activities: ["observation", "photographie", "ornithologie", "botanique"]
  },
  {
    id: 3,
    slug: "monte-sant-anghjuli",
    title: "Monte d'I Sant'Anghjuli",
    subtitle: "Sommet mystique et historique",
    altitude: "1218m",
    type: "montagne",
    difficulty: "modéré",
    duration: "4h aller-retour",
    commune: "Valle-di-Rostino",
    image: "/photos/MontSantAnghjulu.JPG",
    description: "Montagne sacrée chargée d'histoire avec ses chapelles et ermitages.",
    fullDescription: `
      <p>Le Monte Sant'Anghjuli, culminant à 1218 mètres, est bien plus qu'un simple sommet : c'est un lieu chargé d'histoire et de spiritualité au cœur de la Castagniccia.</p>
      
      <p>Depuis des siècles, cette montagne abrite chapelles et ermitages qui témoignent de la ferveur religieuse de la région. Le sentier qui mène au sommet traverse plusieurs oratoires et offre une véritable plongée dans l'histoire spirituelle de la Corse.</p>
      
      <p>Le panorama depuis le sommet embrasse toute la vallée du Golo, les villages perchés de la Castagniccia et, au loin, les sommets du centre de l'île. C'est un lieu privilégié pour la contemplation et la méditation.</p>
      
      <p>La montagne est aussi réputée pour sa richesse botanique, avec de nombreuses espèces endémiques de Corse que l'on peut observer le long du parcours.</p>
    `,
    details: {
      access: "Sentier depuis Valle-di-Rostino",
      parking: "Village de Valle-di-Rostino",
      equipment: "Chaussures de randonnée, eau",
      season: "Mars à novembre recommandé",
      heritage: "Chapelles et ermitages historiques",
      flora: "Espèces endémiques corses"
    },
    coordinates: {
      lat: 42.4156,
      lng: 9.2987
    },
    gallery: [
      "/photos/MontSantAnghjulu.JPG"
    ],
    activities: ["randonnée", "patrimoine", "spiritualité", "photographie"]
  },
  {
    id: 4,
    slug: "eaux-orezza",
    title: "Les eaux d'Orezza",
    subtitle: "Source thermale historique",
    altitude: "650m",
    type: "thermal",
    difficulty: "facile",
    duration: "1h",
    commune: "Rapaggio",
    image: "/photos/Hotel-Restaurant-Le-Refuge-Orezza-2.jpg",
    description: "Source d'eau gazeuse naturelle aux vertus thérapeutiques reconnues depuis l'Antiquité.",
    fullDescription: `
      <p>Les eaux d'Orezza constituent l'un des trésors naturels les plus précieux de la Castagniccia. Cette source d'eau gazeuse naturelle jaillit du sol à une température constante de 37°C, chargée de minéraux aux vertus thérapeutiques reconnues.</p>
      
      <p>Découvertes et exploitées depuis l'époque romaine, ces eaux ont fait la renommée de la région. Napoléon Bonaparte lui-même en était un consommateur régulier, et elles furent longtemps exportées dans toute l'Europe.</p>
      
      <p>Le site thermal, niché dans un écrin de verdure au cœur d'une châtaigneraie centenaire, offre un cadre d'une beauté exceptionnelle. Les installations modernes permettent aujourd'hui de profiter pleinement des bienfaits de ces eaux uniques.</p>
      
      <p>La promenade autour des sources permet de découvrir l'histoire thermale de la région et de comprendre l'importance économique qu'a représentée cette ressource naturelle.</p>
    `,
    details: {
      access: "Route directe depuis Rapaggio",
      parking: "Parking aménagé sur site",
      equipment: "Tenue de bain pour les cures",
      season: "Ouvert toute l'année",
      services: "Centre thermal, restaurant, hébergement",
      history: "Exploitée depuis l'époque romaine"
    },
    coordinates: {
      lat: 42.4089,
      lng: 9.3456
    },
    gallery: [
      "/photos/Hotel-Restaurant-Le-Refuge-Orezza-2.jpg",
      "/photos/Hôtel-Restaurant-Le-Refuge-Orezza.jpg"
    ],
    activities: ["thermal", "détente", "cure", "gastronomie"]
  },
  {
    id: 5,
    slug: "village-perche-volpajola",
    title: "Village perché de Volpajola",
    subtitle: "Architecture traditionnelle préservée",
    altitude: "480m",
    type: "village",
    difficulty: "facile",
    duration: "2h",
    commune: "Volpajola",
    image: "/photos/Volpajola.JPG",
    description: "Village authentique aux maisons de schiste et ruelles pavées d'antan.",
    fullDescription: `
      <p>Volpajola, accroché à flanc de montagne à 480 mètres d'altitude, est l'un des villages les mieux préservés de la Castagniccia. Ses maisons de schiste aux toits de lauze témoignent de l'architecture traditionnelle corse dans toute sa splendeur.</p>
      
      <p>Les ruelles pavées serpentent entre les demeures centenaires, menant à de petites places ombragées où le temps semble s'être arrêté. Chaque pierre raconte l'histoire de générations de Corses qui ont façonné ce paysage unique.</p>
      
      <p>L'église baroque du village, dédiée à San Martinu, abrite des œuvres d'art remarquables et offre un témoignage précieux de l'art sacré corse des XVIIe et XVIIIe siècles.</p>
      
      <p>Depuis les terrasses du village, la vue embrasse toute la vallée et les sommets environnants, offrant des perspectives photographiques exceptionnelles.</p>
    `,
    details: {
      access: "Route de montagne sinueuse",
      parking: "Aire de stationnement au village",
      equipment: "Chaussures confortables",
      season: "Toute l'année, printemps et automne recommandés",
      heritage: "Architecture traditionnelle, église baroque",
      population: "Village habité à l'année"
    },
    coordinates: {
      lat: 42.3987,
      lng: 9.3245
    },
    gallery: [
      "/photos/Volpajola.JPG"
    ],
    activities: ["patrimoine", "photographie", "architecture", "balade"]
  },
  {
    id: 6,
    slug: "punta-acquatella",
    title: "Punta d'Acquatella",
    subtitle: "Belvédère panoramique exceptionnel",
    altitude: "900m",
    type: "belvédère",
    difficulty: "facile",
    duration: "1h30",
    commune: "Penta-di-Casinca",
    image: "/photos/PentaAcquatella.jpg",
    description: "Point de vue spectaculaire sur la côte orientale et la plaine du Golo.",
    fullDescription: `
      <p>La Punta d'Acquatella offre l'un des panoramas les plus spectaculaires de toute la Castagniccia. Située à 900 mètres d'altitude, cette terrasse naturelle domine majestueusement la côte orientale de la Corse.</p>
      
      <p>Le point de vue embrasse un paysage d'une diversité saisissante : depuis les eaux turquoise de la mer Tyrrhénienne jusqu'aux sommets enneigés du centre de l'île, en passant par la plaine fertile du Golo et ses méandres argentés.</p>
      
      <p>L'accès relativement facile en fait un site privilégié pour les familles et tous ceux qui souhaitent découvrir les beautés de la Corse sans effort particulier. Un sentier d'interprétation permet de mieux comprendre la géologie et la botanique de la région.</p>
      
      <p>C'est également un site exceptionnel pour l'observation du coucher de soleil, quand les derniers rayons embrasent la mer et transforment le paysage en tableau de maître.</p>
    `,
    details: {
      access: "Sentier facile depuis la route",
      parking: "Aire aménagée",
      equipment: "Chaussures de marche légères",
      season: "Toute l'année, éviter les jours de vent fort",
      viewpoints: "Côte orientale, plaine du Golo, centre montagneux",
      photography: "Idéal pour couchers de soleil"
    },
    coordinates: {
      lat: 42.4567,
      lng: 9.4123
    },
    gallery: [
      "/photos/PentaAcquatella.jpg",
      "/photos/PentadiCasinca.jpg"
    ],
    activities: ["observation", "photographie", "détente", "famille"]
  }
];

export const siteTypes = [
  { id: "all", label: "Tous types", color: "gray" },
  { id: "montagne", label: "Montagne", color: "green" },
  { id: "nature", label: "Nature", color: "emerald" },
  { id: "village", label: "Village", color: "orange" },
  { id: "thermal", label: "Thermal", color: "blue" },
  { id: "belvédère", label: "Belvédère", color: "purple" }
];

export const difficulties = [
  "Toutes difficultés",
  "facile",
  "modéré",
  "difficile"
];

export const durations = [
  "Toutes durées",
  "< 2h",
  "2h - 4h",
  "4h - 6h",
  "> 6h"
];

export const sitesCommunes = [
  "Toutes communes",
  "Morosaglia",
  "Venzolasca", 
  "Valle-di-Rostino",
  "Rapaggio",
  "Volpajola",
  "Penta-di-Casinca"
];
