// Données de test pour la carte interactive
export const testData = {
  sejourner: [
    {
      id: 1,
      Titre: "Hôtel du Mont San Petrone",
      Description: "Hôtel familial avec vue panoramique sur la montagne",
      Coordonnees: { lat: 42.45, lng: 9.35 },
      Tel: "04 95 35 82 65",
      Email: "contact@hotelmontsan.com",
      commune: { Nom: "Morosaglia" },
      type_sejourner: { Denomination: "Hôtel" },
    },
    {
      id: 2,
      Titre: "Gîte U Castagnu",
      Description: "Gîte authentique au cœur de la Castagniccia",
      Coordonnees: { lat: 42.38, lng: 9.33 },
      commune: { Nom: "Piedicroce" },
      type_sejourner: { Denomination: "Gîte" },
    },
  ],
  plages: [
    {
      id: 1,
      Nom: "Plage de Penta-di-Casinca",
      Description: "Belle plage de sable fin avec vue sur la montagne",
      Coordonnees: { lat: 42.47, lng: 9.52 },
      Niveau: 4,
      commune: { Nom: "Penta-di-Casinca" },
    },
    {
      id: 2,
      Nom: "Plage de Folelli",
      Description: "Plage familiale avec tous les services",
      Coordonnees: { lat: 42.46, lng: 9.48 },
      Niveau: 5,
      commune: { Nom: "Folelli" },
    },
  ],
  artisanat: [
    {
      id: 1,
      Titre: "Atelier de Poterie Corsa",
      Description: "Poterie traditionnelle corse depuis 3 générations",
      Coordonnees: { lat: 42.42, lng: 9.41 },
      Tel: "04 95 35 20 15",
      type_artisanat_et_produit: { Titre: "Poterie" },
    },
    {
      id: 2,
      Titre: "Fromagerie du Berger",
      Description: "Fromages corses artisanaux au lait de brebis",
      Coordonnees: { lat: 42.4, lng: 9.37 },
      Tel: "04 95 35 28 90",
      type_artisanat_et_produit: { Titre: "Fromage" },
    },
  ],
  evenements: [
    {
      id: 1,
      Nom: "Festival de Musique Traditionnelle",
      Description: "Concerts de musique corse et méditerranéenne",
      Date: "2025-08-15",
      Coordonnees: { lat: 42.5, lng: 9.45 },
      commune: { Nom: "Vescovato" },
      Tel: "04 95 35 15 30",
    },
    {
      id: 2,
      Nom: "Fête de la Châtaigne",
      Description: "Célébration de la récolte des châtaignes",
      Date: "2025-10-20",
      Coordonnees: { lat: 42.39, lng: 9.34 },
      commune: { Nom: "Orezza" },
    },
  ],
  activitesNautiques: [
    {
      id: 1,
      Nom: "École de Voile",
      Description: "Cours de voile pour tous niveaux",
      commune: { Nom: "Penta-di-Casinca" },
      plage: {
        Nom: "Plage de Penta",
        Coordonnees: { lat: 42.47, lng: 9.52 },
      },
      Tel: "04 95 35 40 25",
    },
  ],
  randonnees: [
    {
      id: 1,
      Nom: "Sentier du Mont San Petrone",
      Description: "Randonnée vers le plus haut sommet de Castagniccia",
      commune: { Nom: "Morosaglia" },
    },
    {
      id: 2,
      Nom: "Circuit des Villages Perchés",
      Description: "Découverte des villages traditionnels",
      commune: { Nom: "Valle-d'Orezza" },
    },
  ],
};
