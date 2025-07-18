export const filterSejournersByType = (sejourners, type) => {
  if (type === "tous") return sejourners;
  return sejourners.filter((s) => s.type_sejourner?.Denomination === type);
};

export const filterSejournersByCommune = (sejourners, commune) => {
  if (commune === "toutes") return sejourners;
  return sejourners.filter((s) => s.commune?.Nom === commune);
};

export const filterSejournersByNote = (sejourners, note) => {
  if (!note || note === "tous") return sejourners;
  return sejourners.filter((s) => {
    const noteValue = s.EtablissementCharteNote;

    // Si c'est un objet (image de certification), on considère comme "Certifié"
    if (typeof noteValue === "object" && noteValue !== null) {
      return note === "Certifié";
    }

    // Si c'est une note numérique
    if (typeof noteValue === "number") {
      return noteValue.toString() === note;
    }

    // Si c'est une string
    return noteValue === note;
  });
};

export const searchSejourners = (sejourners, searchTerm) => {
  if (!searchTerm) return sejourners;
  const term = searchTerm.toLowerCase();
  return sejourners.filter(
    (s) =>
      s.Titre?.toLowerCase().includes(term) ||
      s.commune?.Nom?.toLowerCase().includes(term) ||
      s.Description?.toLowerCase().includes(term) ||
      s.type_sejourner?.Denomination?.toLowerCase().includes(term)
  );
};

export const sortSejourners = (sejourners, sortBy) => {
  const sortedSejourners = [...sejourners];

  switch (sortBy) {
    case "nom-asc":
      return sortedSejourners.sort((a, b) =>
        (a.Titre || "").localeCompare(b.Titre || "")
      );
    case "nom-desc":
      return sortedSejourners.sort((a, b) =>
        (b.Titre || "").localeCompare(a.Titre || "")
      );
    case "commune":
      return sortedSejourners.sort((a, b) =>
        (a.commune?.Nom || "").localeCompare(b.commune?.Nom || "")
      );
    case "type":
      return sortedSejourners.sort((a, b) =>
        (a.type_sejourner?.Denomination || "").localeCompare(
          b.type_sejourner?.Denomination || ""
        )
      );
    case "note-desc":
      return sortedSejourners.sort((a, b) => {
        const noteA = getNoteValue(a.EtablissementCharteNote);
        const noteB = getNoteValue(b.EtablissementCharteNote);
        return noteB - noteA;
      });
    default:
      return sortedSejourners;
  }
};

// Fonction utilitaire pour convertir les notes en valeur numérique
const getNoteValue = (note) => {
  if (typeof note === "object" && note !== null) {
    return 999; // Valeur élevée pour "Certifié"
  }
  if (typeof note === "number") {
    return note;
  }
  if (typeof note === "string" && !isNaN(note)) {
    return parseInt(note);
  }
  return 0;
};

export const getSejournerBySlug = (sejourners, slug) => {
  return sejourners.find((s) => s.slug === slug);
};

export const getUniqueCommunes = (sejourners) => {
  const communes = sejourners
    .filter((s) => s.commune?.Nom)
    .map((s) => s.commune.Nom)
    .filter((commune, index, arr) => arr.indexOf(commune) === index);
  return communes.sort();
};

export const getUniqueTypes = (sejourners) => {
  const types = sejourners
    .filter((s) => s.type_sejourner?.Denomination)
    .map((s) => s.type_sejourner.Denomination)
    .filter((type, index, arr) => arr.indexOf(type) === index);
  return types.sort();
};

export const getUniqueNotes = (sejourners) => {
  const notes = sejourners
    .filter((s) => s.EtablissementCharteNote)
    .map((s) => {
      const noteValue = s.EtablissementCharteNote;

      // Si c'est un objet (image de certification), on considère comme "Certifié"
      if (typeof noteValue === "object" && noteValue !== null) {
        return "Certifié";
      }

      // Si c'est une note numérique, on la convertit en string
      if (typeof noteValue === "number") {
        return noteValue.toString();
      }

      // Si c'est déjà une string
      return noteValue;
    })
    .filter((note, index, arr) => arr.indexOf(note) === index);

  return notes.sort((a, b) => {
    // Gérer le tri avec des strings et des nombres
    if (a === "Certifié") return 1;
    if (b === "Certifié") return -1;

    const numA = parseInt(a);
    const numB = parseInt(b);

    if (!isNaN(numA) && !isNaN(numB)) {
      return numB - numA; // Tri décroissant pour les notes numériques
    }

    return a.localeCompare(b);
  });
};
