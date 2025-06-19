export function filterSites(sites, filters) {
  return sites.filter(site => {
    // Filter by type
    if (filters.type && filters.type !== 'all' && site.type !== filters.type) {
      return false;
    }

    // Filter by commune
    if (filters.commune && filters.commune !== 'Toutes communes' && site.commune !== filters.commune) {
      return false;
    }

    // Filter by difficulty
    if (filters.difficulty && filters.difficulty !== 'Toutes difficultés' && site.difficulty !== filters.difficulty) {
      return false;
    }

    // Filter by duration
    if (filters.duration && filters.duration !== 'Toutes durées') {
      const siteDurationHours = parseDuration(site.duration);
      const filterRange = filters.duration;
      
      if (!isDurationInRange(siteDurationHours, filterRange)) {
        return false;
      }
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = `${site.title} ${site.subtitle} ${site.description} ${site.commune} ${site.type}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
}

export function sortSites(sites, sortBy = 'title') {
  return [...sites].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'commune':
        return a.commune.localeCompare(b.commune);
      case 'difficulty':
        const difficultyOrder = { 'facile': 1, 'modéré': 2, 'difficile': 3 };
        return (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0);
      case 'duration':
        return parseDuration(a.duration) - parseDuration(b.duration);
      case 'altitude':
        return parseAltitude(a.altitude) - parseAltitude(b.altitude);
      default:
        return 0;
    }
  });
}

function parseDuration(duration) {
  if (!duration) return 0;
  
  // Extract hours from strings like "2h", "4h aller-retour", "1h30", etc.
  const match = duration.match(/(\d+)h?(\d+)?/);
  if (match) {
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    return hours + (minutes / 60);
  }
  return 0;
}

function parseAltitude(altitude) {
  if (!altitude) return 0;
  
  // Extract altitude from strings like "1767m", "650m", etc.
  const match = altitude.match(/(\d+)m?/);
  return match ? parseInt(match[1]) : 0;
}

function isDurationInRange(hours, range) {
  switch (range) {
    case '< 2h':
      return hours < 2;
    case '2h - 4h':
      return hours >= 2 && hours <= 4;
    case '4h - 6h':
      return hours > 4 && hours <= 6;
    case '> 6h':
      return hours > 6;
    default:
      return true;
  }
}
