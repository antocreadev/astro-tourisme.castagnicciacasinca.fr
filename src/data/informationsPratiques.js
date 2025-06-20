export const informationsPratiques = [
  {
    id: 1,
    slug: "offices-tourisme",
    nom: "Offices de Tourisme",
    categorie: "tourisme",
    description:
      "Retrouvez tous les offices de tourisme et points d'information touristique de la Castagniccia Casinca pour vous aider à organiser votre séjour.",
    commune: "Plusieurs",
    type: "service",
    details: `Les offices de tourisme de la Castagniccia Casinca sont à votre disposition pour vous renseigner et vous accompagner dans la découverte du territoire.

Office de Tourisme Castagniccia Casinca - Siège
📍 Lieu-dit Acqua Viva, 20290 Borgo
📞 04 95 36 34 34
📧 contact@castagniccia-casinca.corsica
🌐 www.castagniccia-casinca.corsica

Point info Folelli
📍 Village de Folelli, 20213 Folelli
📞 04 95 35 61 32

Point info Vescovato
📍 Place de l'Église, 20215 Vescovato
📞 04 95 36 43 85

Horaires d'ouverture :
- Été (juin-septembre) : 9h-12h30 / 14h-18h
- Hiver (octobre-mai) : 9h-12h / 14h-17h
- Fermé le dimanche et jours fériés`,
    horaires: "Variable selon la saison",
    telephone: "04 95 36 34 34",
    email: "contact@castagniccia-casinca.corsica",
    siteWeb: "https://www.castagniccia-casinca.corsica",
    adresse: "Lieu-dit Acqua Viva, 20290 Borgo",
    image: "/photos/office-tourisme.jpg",
  },
  {
    id: 2,
    slug: "transports-publics",
    nom: "Transports publics",
    categorie: "transport",
    description:
      "Informations sur les transports en commun, liaisons bus et navettes disponibles sur le territoire.",
    commune: "Plusieurs",
    type: "transport",
    details: `Le réseau de transport public dessert les principales communes de la Castagniccia Casinca.

Lignes de bus CTC (Collectivité de Corse) :
- Ligne 1 : Bastia - Folelli - Penta di Casinca
- Ligne 2 : Bastia - Borgo - Lucciana
- Ligne 3 : Bastia - Vescovato - Venzolasca

Horaires et fréquences :
- Service du lundi au vendredi
- Fréquence : 3 à 5 services par jour selon les lignes
- Pas de service le dimanche et jours fériés

Tarifs :
- Billet simple : 2€
- Carte 10 voyages : 15€
- Abonnement mensuel : 45€

Navettes saisonnières :
- Navette plages (juillet-août)
- Desserte des sites touristiques principaux

Réservations et informations :
📞 04 95 31 73 76
🌐 www.ctc-corse.corsica`,
    horaires: "Lundi au vendredi - 6h30 à 19h30",
    telephone: "04 95 31 73 76",
    siteWeb: "https://www.ctc-corse.corsica",
    image: "/photos/transport.jpg",
  },
  {
    id: 3,
    slug: "services-medicaux",
    nom: "Services médicaux",
    categorie: "sante",
    description:
      "Professionnels de santé, pharmacies, centres médicaux et services d'urgence disponibles sur le territoire.",
    commune: "Plusieurs",
    type: "sante",
    details: `Services de santé disponibles en Castagniccia Casinca :

🏥 Centre Hospitalier de Bastia
📍 Route Impériale, 20600 Bastia
📞 04 95 59 11 11
Distance : 15-30 min selon votre localisation

💊 Pharmacies principales :
- Pharmacie de Borgo : 04 95 36 00 12
- Pharmacie de Folelli : 04 95 35 41 23
- Pharmacie de Vescovato : 04 95 36 42 18

👨‍⚕️ Médecins généralistes :
- Dr. Martin (Borgo) : 04 95 36 01 45
- Dr. Rossi (Folelli) : 04 95 35 42 67
- Dr. Santini (Vescovato) : 04 95 36 43 21

🦷 Dentistes :
- Cabinet dentaire Borgo : 04 95 36 02 78
- Dr. Albertini (Folelli) : 04 95 35 43 89

🚑 Urgences :
- SAMU : 15
- Pompiers : 18
- Numéro d'urgence européen : 112`,
    horaires: "Variables selon les professionnels",
    telephone: "15 (SAMU)",
    image: "/photos/sante.jpg",
  },
  {
    id: 4,
    slug: "banques-services",
    nom: "Banques et services financiers",
    categorie: "finance",
    description:
      "Distributeurs automatiques, banques et services financiers disponibles dans la région.",
    commune: "Plusieurs",
    type: "service",
    details: `Services bancaires et financiers en Castagniccia Casinca :

🏦 Agences bancaires :
- Crédit Agricole Borgo : 04 95 36 00 45
- La Poste Borgo : 04 95 36 01 23
- BNP Paribas Folelli : 04 95 35 42 10

💳 Distributeurs automatiques :
- Borgo : Place du marché, Crédit Agricole
- Folelli : Centre commercial, rue principale
- Vescovato : Place de l'église
- Penta di Casinca : Mairie
- Venzolasca : Bureau de poste

📮 Bureaux de poste :
- La Poste Borgo : 04 95 36 01 23
- La Poste Folelli : 04 95 35 41 45
- La Poste Vescovato : 04 95 36 42 67

Horaires standards :
- Matin : 8h30-12h
- Après-midi : 14h-17h30
- Fermé le mercredi après-midi et le dimanche`,
    horaires: "8h30-12h / 14h-17h30",
    telephone: "04 95 36 00 45",
    image: "/photos/banque.jpg",
  },
  {
    id: 5,
    slug: "wifi-internet",
    nom: "Points WiFi et Internet",
    categorie: "technologie",
    description:
      "Zones WiFi gratuites, cybercafés et points d'accès Internet disponibles pour les visiteurs.",
    commune: "Plusieurs",
    type: "service",
    details: `Accès Internet et WiFi gratuit en Castagniccia Casinca :

📶 Points WiFi gratuits :
- Offices de tourisme (tous)
- Mairies principales
- Bibliothèques municipales
- Cafés et restaurants participants
- Plages aménagées (saison estivale)

🏛️ Lieux publics avec WiFi :
- Mairie de Borgo : "WiFi_Borgo_Public"
- Médiathèque Folelli : "Media_Folelli"
- Office de tourisme : "Tourist_Info_Free"
- Gare de Casamozza : "SNCF_Connect"

☕ Établissements privés avec WiFi :
- Café de la Place (Borgo)
- Bar du Centre (Folelli)
- Restaurant A Stella (Vescovato)
- Camping sites (pour les clients)

💻 Services Internet :
- Cybercafé Borgo : 04 95 36 03 21
- Point multimédia médiathèque
- Espaces numériques des mairies

Conseils :
- Demandez le mot de passe aux établissements
- Connexion généralement limitée en temps
- Débit variable selon l'affluence`,
    horaires: "Variable selon les établissements",
    image: "/photos/wifi.jpg",
  },
  {
    id: 6,
    slug: "marches-commerces",
    nom: "Marchés et commerces",
    categorie: "commerce",
    description:
      "Marchés locaux, commerces alimentaires, supermarchés et magasins disponibles sur le territoire.",
    commune: "Plusieurs",
    type: "commerce",
    details: `Commerces et marchés en Castagniccia Casinca :

🛒 Supermarchés et grandes surfaces :
- Super U Borgo : 04 95 36 02 10
- Intermarché Folelli : 04 95 35 43 21
- Spar Vescovato : 04 95 36 44 12
- Casino Shop Penta : 04 95 35 61 89

🥖 Boulangeries :
- Boulangerie Mattei (Borgo) : 04 95 36 01 78
- Au Bon Pain (Folelli) : 04 95 35 42 34
- Pâtisserie Santini (Vescovato) : 04 95 36 43 56

🥩 Boucheries :
- Boucherie Rossi (Borgo) : 04 95 36 02 45
- Charcuterie Paoli (Folelli) : 04 95 35 43 67

🐟 Poissonneries :
- Poissonnerie du Port (Macinaggio) : 04 95 35 44 23
- Poissons frais (Borgo - marché) : Vendredi matin

📅 Marchés hebdomadaires :
- Borgo : Vendredi matin 8h-12h
- Folelli : Mercredi matin 8h-13h
- Vescovato : Samedi matin 8h-12h

🛍️ Autres commerces :
- Pharmacies, tabacs, journaux
- Magasins de vêtements
- Librairies, souvenirs`,
    horaires: "Variable selon les commerces",
    image: "/photos/marche.jpg",
  },
];

export default informationsPratiques;
