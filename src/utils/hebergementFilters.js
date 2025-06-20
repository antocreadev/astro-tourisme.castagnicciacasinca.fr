export const filterHebergementsByType = (hebergements, type) => {
  if (type === "tous") return hebergements;
  return hebergements.filter((h) => h.type === type);
};

export const filterHebergementsByCommune = (hebergements, commune) => {
  if (commune === "toutes") return hebergements;
  return hebergements.filter((h) => h.commune === commune);
};

export const filterHebergementsByPrice = (hebergements, gamme) => {
  if (gamme === "tous") return hebergements;

  return hebergements.filter((h) => {
    const prixMin = parseInt(h.prix.split("-")[0]);

    switch (gamme) {
      case "economique":
        return prixMin < 50;
      case "moyen":
        return prixMin >= 50 && prixMin < 100;
      case "superieur":
        return prixMin >= 100 && prixMin < 150;
      case "luxe":
        return prixMin >= 150;
      default:
        return true;
    }
  });
};

export const filterHebergementsByServices = (hebergements, services) => {
  if (!services || services.length === 0) return hebergements;

  return hebergements.filter((h) =>
    services.every((service) => h.services.includes(service))
  );
};

export const searchHebergements = (hebergements, searchTerm) => {
  if (!searchTerm) return hebergements;

  const term = searchTerm.toLowerCase();
  return hebergements.filter(
    (h) =>
      h.nom.toLowerCase().includes(term) ||
      h.commune.toLowerCase().includes(term) ||
      h.description.toLowerCase().includes(term) ||
      h.type.toLowerCase().includes(term)
  );
};

export const sortHebergements = (hebergements, sortBy) => {
  const sortedHebergements = [...hebergements];

  switch (sortBy) {
    case "nom-asc":
      return sortedHebergements.sort((a, b) => a.nom.localeCompare(b.nom));
    case "nom-desc":
      return sortedHebergements.sort((a, b) => b.nom.localeCompare(a.nom));
    case "prix-asc":
      return sortedHebergements.sort((a, b) => {
        const prixA = parseInt(a.prix.split("-")[0]);
        const prixB = parseInt(b.prix.split("-")[0]);
        return prixA - prixB;
      });
    case "prix-desc":
      return sortedHebergements.sort((a, b) => {
        const prixA = parseInt(a.prix.split("-")[0]);
        const prixB = parseInt(b.prix.split("-")[0]);
        return prixB - prixA;
      });
    case "note-desc":
      return sortedHebergements.sort((a, b) => b.note - a.note);
    case "commune":
      return sortedHebergements.sort((a, b) =>
        a.commune.localeCompare(b.commune)
      );
    default:
      return sortedHebergements;
  }
};

export const getHebergementBySlug = (hebergements, slug) => {
  return hebergements.find((h) => h.slug === slug);
};
