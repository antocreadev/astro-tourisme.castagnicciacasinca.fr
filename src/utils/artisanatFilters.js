export const filterArtisanatByType = (artisanat, type) => {
  if (type === "tous") return artisanat;
  return artisanat.filter(a => a.type === type);
};

export const filterArtisanatByCategorie = (artisanat, categorie) => {
  if (categorie === "toutes") return artisanat;
  return artisanat.filter(a => a.categorie === categorie);
};

export const filterArtisanatByCommune = (artisanat, commune) => {
  if (commune === "toutes") return artisanat;
  return artisanat.filter(a => a.commune === commune);
};

export const filterArtisanatByServices = (artisanat, services) => {
  if (!services || services.length === 0) return artisanat;
  
  return artisanat.filter(a => 
    services.every(service => a.services.includes(service))
  );
};

export const filterArtisanatByLabels = (artisanat, labels) => {
  if (!labels || labels.length === 0) return artisanat;
  
  return artisanat.filter(a => 
    labels.every(label => a.labels.includes(label))
  );
};

export const searchArtisanat = (artisanat, searchTerm) => {
  if (!searchTerm) return artisanat;
  
  const term = searchTerm.toLowerCase();
  return artisanat.filter(a => 
    a.nom.toLowerCase().includes(term) ||
    a.commune.toLowerCase().includes(term) ||
    a.description.toLowerCase().includes(term) ||
    a.categorie.toLowerCase().includes(term) ||
    a.specialites.some(s => s.toLowerCase().includes(term)) ||
    a.produits.some(p => p.toLowerCase().includes(term))
  );
};

export const sortArtisanat = (artisanat, sortBy) => {
  const sortedArtisanat = [...artisanat];
  
  switch (sortBy) {
    case "nom-asc":
      return sortedArtisanat.sort((a, b) => a.nom.localeCompare(b.nom));
    case "nom-desc":
      return sortedArtisanat.sort((a, b) => b.nom.localeCompare(a.nom));
    case "note-desc":
      return sortedArtisanat.sort((a, b) => b.note - a.note);
    case "commune":
      return sortedArtisanat.sort((a, b) => a.commune.localeCompare(b.commune));
    case "categorie":
      return sortedArtisanat.sort((a, b) => a.categorie.localeCompare(b.categorie));
    case "type":
      return sortedArtisanat.sort((a, b) => a.type.localeCompare(b.type));
    default:
      return sortedArtisanat;
  }
};

export const getArtisanatBySlug = (artisanat, slug) => {
  return artisanat.find(a => a.slug === slug);
};
