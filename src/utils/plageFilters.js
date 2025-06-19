export const filterPlagesByType = (plages, type) => {
  if (type === "tous") return plages;
  return plages.filter(p => p.type === type);
};

export const filterPlagesByCommune = (plages, commune) => {
  if (commune === "toutes") return plages;
  return plages.filter(p => p.commune === commune);
};

export const filterPlagesByServices = (plages, services) => {
  if (!services || services.length === 0) return plages;
  
  return plages.filter(p => 
    services.every(service => p.services.includes(service))
  );
};

export const filterPlagesByActivites = (plages, activites) => {
  if (!activites || activites.length === 0) return plages;
  
  return plages.filter(p => 
    activites.every(activite => p.activites.includes(activite))
  );
};

export const filterPlagesByAccess = (plages, acces) => {
  if (acces === "tous") return plages;
  return plages.filter(p => p.acces === acces);
};

export const filterPlagesByAnimaux = (plages, animaux) => {
  if (!animaux) return plages;
  return plages.filter(p => p.animaux.toLowerCase().includes("autorisés"));
};

export const filterPlagesByDrapeauBleu = (plages, drapeauBleu) => {
  if (!drapeauBleu) return plages;
  return plages.filter(p => p.drapeauBleu === true);
};

export const searchPlages = (plages, searchTerm) => {
  if (!searchTerm) return plages;
  
  const term = searchTerm.toLowerCase();
  return plages.filter(p => 
    p.nom.toLowerCase().includes(term) ||
    p.commune.toLowerCase().includes(term) ||
    p.description.toLowerCase().includes(term) ||
    p.type.toLowerCase().includes(term)
  );
};

export const sortPlages = (plages, sortBy) => {
  const sortedPlages = [...plages];
  
  switch (sortBy) {
    case "nom-asc":
      return sortedPlages.sort((a, b) => a.nom.localeCompare(b.nom));
    case "nom-desc":
      return sortedPlages.sort((a, b) => b.nom.localeCompare(a.nom));
    case "note-desc":
      return sortedPlages.sort((a, b) => b.note - a.note);
    case "commune":
      return sortedPlages.sort((a, b) => a.commune.localeCompare(b.commune));
    case "longueur-desc":
      return sortedPlages.sort((a, b) => {
        const longueurA = parseFloat(a.longueur.replace(' km', ''));
        const longueurB = parseFloat(b.longueur.replace(' km', ''));
        return longueurB - longueurA;
      });
    case "longueur-asc":
      return sortedPlages.sort((a, b) => {
        const longueurA = parseFloat(a.longueur.replace(' km', ''));
        const longueurB = parseFloat(b.longueur.replace(' km', ''));
        return longueurA - longueurB;
      });
    default:
      return sortedPlages;
  }
};

export const getPlageBySlug = (plages, slug) => {
  return plages.find(p => p.slug === slug);
};
