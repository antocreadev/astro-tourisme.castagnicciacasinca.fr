export const activites = [
  {
    id: 1,
    slug: "plongee-sous-marine-costa-verde",
    nom: "Plongée sous-marine Costa Verde",
    type: "sport-nautique",
    categorie: "plongee",
    commune: "San-Nicolao",
    adresse: "Port de Taverna, 20230 San-Nicolao",
    telephone: "04 95 38 67 45",
    email: "info@plongee-costa-verde.com",
    siteweb: "https://plongee-costa-verde.com",
    description:
      "Club de plongée proposant baptêmes, formations et explorations des fonds marins de la Costa Verde.",
    descriptionLongue:
      "Le club de plongée Costa Verde vous invite à découvrir les merveilles sous-marines de la côte orientale corse. Nos moniteurs diplômés d'État vous accompagnent pour des baptêmes de plongée, des formations tous niveaux et des explorations des plus beaux sites. Les eaux cristallines de la région abritent une faune et une flore méditerranéennes exceptionnelles : mérous, barracudas, gorgones et herbiers de posidonie. Nous proposons des sorties quotidiennes adaptées à tous les niveaux, de la découverte à la plongée technique.",
    activites: [
      "Baptême de plongée",
      "Formation PADI",
      "Plongée exploration",
      "Plongée de nuit",
      "Randonnée palmée",
    ],
    services: [
      "Location matériel",
      "Transport bateau",
      "Formations certifiées",
      "Sorties guidées",
    ],
    niveauDifficulte: "Tous niveaux",
    duree: "2-6 heures",
    tarifs: "45-85€",
    horaires: "8h-18h (avril-octobre)",
    groupeMax: 8,
    ageMin: 8,
    image: "/photos/Plage-de-Cap-Sud.jpg",
    images: ["/photos/Plage-de-Cap-Sud.jpg"],
    coordonnees: { lat: 42.3823, lng: 9.5187 },
    note: 4.7,
    nombreAvis: 156,
    saisonOptimale: "Mai à Octobre",
    equipementFourni: true,
    reservationObligatoire: true,
    labels: ["Moniteur diplômé", "PADI certified"],
  },
  {
    id: 2,
    slug: "randonnee-vtt-castagniccia",
    nom: "VTT Castagniccia Adventures",
    type: "sport-terrestre",
    categorie: "vtt",
    commune: "Piedicroce",
    adresse: "Village de Piedicroce, 20229 Piedicroce",
    telephone: "06 12 34 56 78",
    email: "contact@vtt-castagniccia.fr",
    description:
      "Découverte de la Castagniccia en VTT avec guides expérimentés sur les anciens sentiers muletiers.",
    descriptionLongue:
      "VTT Castagniccia Adventures vous propose de découvrir les trésors cachés de la Castagniccia à travers des parcours VTT adaptés à tous les niveaux. Nos guides locaux vous emmènent sur les anciens sentiers muletiers, à travers les châtaigneraies centenaires et les villages perchés. Les circuits combinent patrimoine historique, paysages exceptionnels et défis sportifs. Nous proposons des demi-journées découverte, des journées complètes avec pique-nique et des séjours de plusieurs jours pour les plus aventureux.",
    activites: [
      "Circuits découverte",
      "Randonnées sportives",
      "Séjours VTT",
      "Initiation technique",
    ],
    services: [
      "Location VTT",
      "Guide accompagnateur",
      "Matériel de sécurité",
      "Pique-nique",
    ],
    niveauDifficulte: "Facile à difficile",
    duree: "2h-8h",
    tarifs: "35-75€",
    horaires: "9h-17h",
    groupeMax: 12,
    ageMin: 12,
    image: "/photos/Mont-San-Petrone.jpg",
    images: ["/photos/Mont-San-Petrone.jpg"],
    coordonnees: { lat: 42.3167, lng: 9.2833 },
    note: 4.6,
    nombreAvis: 89,
    saisonOptimale: "Mars à Novembre",
    equipementFourni: true,
    reservationObligatoire: true,
    labels: ["Guide agréé", "Matériel professionnel"],
  },
  {
    id: 3,
    slug: "kayak-mer-costa-serena",
    nom: "Kayak de mer Costa Serena",
    type: "sport-nautique",
    categorie: "kayak",
    commune: "Cervione",
    adresse: "Plage de Prunete, 20221 Cervione",
    telephone: "04 95 38 42 89",
    email: "kayak@costa-serena.fr",
    description:
      "Exploration de la côte en kayak de mer avec découverte des criques sauvages et de la faune marine.",
    descriptionLongue:
      "Costa Serena Kayak vous invite à explorer la magnifique côte orientale de la Corse depuis la mer. Nos sorties en kayak de mer vous mènent vers des criques inaccessibles à pied, des grottes marines et des zones de forte biodiversité. Nos guides naturalistes partagent leurs connaissances sur l'écosystème marin méditerranéen. Nous proposons des initiations pour débutants, des randonnées de plusieurs heures et des expéditions d'une journée complète avec pause baignade et pique-nique sur une plage secrète.",
    activites: [
      "Initiation kayak",
      "Randonnée côtière",
      "Exploration grottes",
      "Observation faune",
    ],
    services: [
      "Location kayak",
      "Guide naturaliste",
      "Équipement sécurité",
      "Collation",
    ],
    niveauDifficulte: "Débutant à intermédiaire",
    duree: "2h-6h",
    tarifs: "40-70€",
    horaires: "9h-16h",
    groupeMax: 10,
    ageMin: 10,
    image: "/photos/Plage-de-Cap-Sud-2.jpg",
    images: ["/photos/Plage-de-Cap-Sud-2.jpg"],
    coordonnees: { lat: 42.3456, lng: 9.4123 },
    note: 4.8,
    nombreAvis: 134,
    saisonOptimale: "Avril à Octobre",
    equipementFourni: true,
    reservationObligatoire: true,
    labels: ["Guide naturaliste", "Respect environnement"],
  },
  {
    id: 4,
    slug: "centre-equestre-casinca",
    nom: "Centre Équestre de Casinca",
    type: "sport-terrestre",
    categorie: "equitation",
    commune: "Vescovato",
    adresse: "Route de Venzolasca, 20215 Vescovato",
    telephone: "04 95 36 78 45",
    email: "contact@equestre-casinca.com",
    description:
      "Randonnées équestres dans la Casinca avec chevaux corses dressés et moniteurs expérimentés.",
    descriptionLongue:
      "Le Centre Équestre de Casinca vous propose de découvrir les paysages authentiques de la région à dos de cheval corse. Nos cavaliers expérimentés vous guident à travers maquis, forêts et villages perchés sur des sentiers séculaires. Nous possédons une cavalerie de chevaux corses parfaitement dressés et adaptés au terrain local. Les randonnées sont accessibles aux débutants comme aux cavaliers confirmés, avec des parcours variés allant de la promenade d'une heure aux randonnées de plusieurs jours avec hébergement en gîtes ruraux.",
    activites: [
      "Promenade débutant",
      "Randonnée confirmé",
      "Stage équitation",
      "Séjour équestre",
    ],
    services: [
      "Chevaux dressés",
      "Moniteur diplômé",
      "Matériel fourni",
      "Hébergement",
    ],
    niveauDifficulte: "Débutant à confirmé",
    duree: "1h-5 jours",
    tarifs: "25-300€",
    horaires: "9h-17h",
    groupeMax: 8,
    ageMin: 6,
    image: "/photos/Vescovato.jpg",
    images: ["/photos/Vescovato.jpg"],
    coordonnees: { lat: 42.3789, lng: 9.4234 },
    note: 4.5,
    nombreAvis: 67,
    saisonOptimale: "Toute l'année",
    equipementFourni: true,
    reservationObligatoire: true,
    labels: ["Moniteur BE", "Chevaux corses"],
  },
  {
    id: 5,
    slug: "parc-aventure-castagniccia",
    nom: "Parc Aventure Castagniccia",
    type: "loisir-familial",
    categorie: "accrobranche",
    commune: "La Porta",
    adresse: "Forêt de La Porta, 20237 La Porta",
    telephone: "04 95 39 67 23",
    email: "info@parc-aventure-castagniccia.com",
    siteweb: "https://parc-aventure-castagniccia.com",
    description:
      "Parc accrobranche familial dans la forêt de châtaigniers avec parcours adaptés à tous les âges.",
    descriptionLongue:
      "Le Parc Aventure Castagniccia est situé au cœur d'une magnifique châtaigneraie centenaire. Nous proposons des parcours d'accrobranche sécurisés pour toute la famille, des plus petits (4 ans) aux adultes aventureux. Nos 8 parcours de difficultés progressives incluent tyroliennes, ponts de singe, échelles et sauts de tarzan. Le parc respecte l'environnement forestier et utilise un système de sécurité continue. Une aire de pique-nique ombragée permet de prolonger la journée en famille au cœur de la nature corse.",
    activites: [
      "Parcours enfants",
      "Parcours adultes",
      "Tyroliennes",
      "Jeux d'équipe",
    ],
    services: [
      "Équipement sécurité",
      "Moniteurs",
      "Aire pique-nique",
      "Parking",
    ],
    niveauDifficulte: "Très facile à difficile",
    duree: "2h-4h",
    tarifs: "15-28€",
    horaires: "10h-18h (été), 10h-17h (hiver)",
    groupeMax: 20,
    ageMin: 4,
    image: "/photos/PentadiCasinca.jpg",
    images: ["/photos/PentadiCasinca.jpg"],
    coordonnees: { lat: 42.3345, lng: 9.3123 },
    note: 4.4,
    nombreAvis: 203,
    saisonOptimale: "Mars à Novembre",
    equipementFourni: true,
    reservationObligatoire: false,
    labels: ["Sécurité continue", "Famille"],
  },
  {
    id: 6,
    slug: "musee-pascal-paoli",
    nom: "Musée Pascal Paoli",
    type: "culturel",
    categorie: "musee",
    commune: "Morosaglia",
    adresse: "Maison natale, 20218 Morosaglia",
    telephone: "04 95 61 04 97",
    email: "musee@pascal-paoli.org",
    description:
      "Musée dédié à Pascal Paoli dans sa maison natale, retraçant l'histoire de la Corse au XVIIIe siècle.",
    descriptionLongue:
      "Le Musée Pascal Paoli occupe la maison natale du 'Père de la Patrie' corse à Morosaglia. Cette demeure historique du XVIIIe siècle présente la vie et l'œuvre de Pascal Paoli, figure emblématique de l'indépendance corse. Les collections comprennent des documents d'époque, des portraits, des armes et des objets personnels. Le musée retrace l'histoire mouvementée de la Corse, de la République corse (1755-1769) à l'exil londonien de Paoli. Une visite guidée permet de mieux comprendre l'héritage politique et culturel de ce visionnaire.",
    activites: [
      "Visite guidée",
      "Exposition permanente",
      "Conférences",
      "Ateliers pédagogiques",
    ],
    services: ["Guide conférencier", "Boutique", "Documentation", "Parking"],
    niveauDifficulte: "Facile",
    duree: "1h-1h30",
    tarifs: "5-8€",
    horaires: "9h-12h et 14h-18h (fermé lundi)",
    groupeMax: 25,
    ageMin: 0,
    image: "/photos/MontSantAnghjulu.JPG",
    images: ["/photos/MontSantAnghjulu.JPG"],
    coordonnees: { lat: 42.4234, lng: 9.3156 },
    note: 4.3,
    nombreAvis: 178,
    saisonOptimale: "Toute l'année",
    equipementFourni: false,
    reservationObligatoire: false,
    labels: ["Monument historique", "Patrimoine corse"],
  },
];

export const typesActivite = [
  { value: "tous", label: "Tous les types" },
  { value: "sport-nautique", label: "Sports nautiques" },
  { value: "sport-terrestre", label: "Sports terrestres" },
  { value: "loisir-familial", label: "Loisirs familiaux" },
  { value: "culturel", label: "Activités culturelles" },
];

export const categoriesActivite = [
  { value: "toutes", label: "Toutes catégories" },
  { value: "plongee", label: "Plongée" },
  { value: "kayak", label: "Kayak" },
  { value: "vtt", label: "VTT" },
  { value: "equitation", label: "Équitation" },
  { value: "accrobranche", label: "Accrobranche" },
  { value: "musee", label: "Musées" },
  { value: "voile", label: "Voile" },
  { value: "peche", label: "Pêche" },
];

export const communesActivite = [
  { value: "toutes", label: "Toutes les communes" },
  { value: "San-Nicolao", label: "San-Nicolao" },
  { value: "Piedicroce", label: "Piedicroce" },
  { value: "Cervione", label: "Cervione" },
  { value: "Vescovato", label: "Vescovato" },
  { value: "La Porta", label: "La Porta" },
  { value: "Morosaglia", label: "Morosaglia" },
];

export const niveauxDifficulte = [
  { value: "tous", label: "Tous niveaux" },
  { value: "Très facile", label: "Très facile" },
  { value: "Facile", label: "Facile" },
  { value: "Débutant", label: "Débutant" },
  { value: "Intermédiaire", label: "Intermédiaire" },
  { value: "Confirmé", label: "Confirmé" },
  { value: "Difficile", label: "Difficile" },
];

export const servicesActivite = [
  "Location matériel",
  "Guide accompagnateur",
  "Formation",
  "Transport",
  "Matériel fourni",
  "Pique-nique",
  "Parking",
  "Boutique",
];
