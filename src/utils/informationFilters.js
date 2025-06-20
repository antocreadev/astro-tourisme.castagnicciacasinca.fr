export const informationFilters = {
  categories: [
    { value: "", label: "Toutes les catégories" },
    { value: "tourisme", label: "Tourisme" },
    { value: "transport", label: "Transport" },
    { value: "sante", label: "Santé" },
    { value: "finance", label: "Finance" },
    { value: "technologie", label: "Technologie" },
    { value: "commerce", label: "Commerce" },
  ],
  types: [
    { value: "", label: "Tous les types" },
    { value: "service", label: "Service public" },
    { value: "transport", label: "Transport" },
    { value: "sante", label: "Santé" },
    { value: "commerce", label: "Commerce" },
  ],
};

export const filterInformations = (informations, filters) => {
  return informations.filter((info) => {
    if (filters.categorie && info.categorie !== filters.categorie) return false;
    if (filters.type && info.type !== filters.type) return false;
    if (filters.commune && info.commune !== filters.commune) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        info.nom.toLowerCase().includes(searchLower) ||
        info.description.toLowerCase().includes(searchLower) ||
        info.details.toLowerCase().includes(searchLower) ||
        info.commune.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
};

export const sortInformations = (informations, sortBy) => {
  const sorted = [...informations];

  switch (sortBy) {
    case "nom":
      return sorted.sort((a, b) => a.nom.localeCompare(b.nom));
    case "categorie":
      return sorted.sort((a, b) => a.categorie.localeCompare(b.categorie));
    case "commune":
      return sorted.sort((a, b) => a.commune.localeCompare(b.commune));
    default:
      return sorted;
  }
};

export const getUniqueCommunes = (informations) => {
  const communes = [...new Set(informations.map((info) => info.commune))];
  return [
    { value: "", label: "Toutes les communes" },
    ...communes.sort().map((commune) => ({ value: commune, label: commune })),
  ];
};
