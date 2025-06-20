export const activiteFilters = {
  types: [
    { value: "", label: "Tous les types" },
    { value: "sport", label: "Sport" },
    { value: "culture", label: "Culture" },
    { value: "nature", label: "Nature" },
    { value: "aventure", label: "Aventure" },
    { value: "famille", label: "Famille" },
    { value: "detente", label: "Détente" },
  ],
  niveaux: [
    { value: "", label: "Tous les niveaux" },
    { value: "facile", label: "Facile" },
    { value: "moyen", label: "Moyen" },
    { value: "difficile", label: "Difficile" },
  ],
  durees: [
    { value: "", label: "Toutes les durées" },
    { value: "courte", label: "Moins de 2h" },
    { value: "moyenne", label: "2h - 4h" },
    { value: "longue", label: "Plus de 4h" },
    { value: "journee", label: "Journée complète" },
  ],
  ages: [
    { value: "", label: "Tous les âges" },
    { value: "enfant", label: "Enfants" },
    { value: "ado", label: "Adolescents" },
    { value: "adulte", label: "Adultes" },
    { value: "senior", label: "Séniors" },
  ],
};

export const filterActivites = (activites, filters) => {
  return activites.filter((activite) => {
    if (filters.type && activite.type !== filters.type) return false;
    if (filters.niveau && activite.niveau !== filters.niveau) return false;
    if (filters.duree && activite.duree !== filters.duree) return false;
    if (filters.age && !activite.ages.includes(filters.age)) return false;
    if (filters.commune && activite.commune !== filters.commune) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        activite.nom.toLowerCase().includes(searchLower) ||
        activite.description.toLowerCase().includes(searchLower) ||
        activite.commune.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
};

export const sortActivites = (activites, sortBy) => {
  const sorted = [...activites];

  switch (sortBy) {
    case "nom":
      return sorted.sort((a, b) => a.nom.localeCompare(b.nom));
    case "commune":
      return sorted.sort((a, b) => a.commune.localeCompare(b.commune));
    case "type":
      return sorted.sort((a, b) => a.type.localeCompare(b.type));
    case "niveau":
      const niveauOrder = { facile: 1, moyen: 2, difficile: 3 };
      return sorted.sort(
        (a, b) => (niveauOrder[a.niveau] || 0) - (niveauOrder[b.niveau] || 0)
      );
    default:
      return sorted;
  }
};

export const getUniqueCommunes = (activites) => {
  const communes = [...new Set(activites.map((activite) => activite.commune))];
  return [
    { value: "", label: "Toutes les communes" },
    ...communes.sort().map((commune) => ({ value: commune, label: commune })),
  ];
};
