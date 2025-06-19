export function filterItineraires(itineraires, filters) {
  return itineraires.filter(itineraire => {
    // Filter by type
    if (filters.type && filters.type !== 'all' && itineraire.type !== filters.type) {
      return false;
    }

    // Filter by difficulty
    if (filters.difficulty && filters.difficulty !== 'Toutes difficultés' && itineraire.difficulty !== filters.difficulty) {
      return false;
    }

    // Filter by transport
    if (filters.transport && filters.transport !== 'Tous moyens' && itineraire.transport !== filters.transport) {
      return false;
    }

    // Filter by theme
    if (filters.theme && filters.theme !== 'Tous thèmes' && itineraire.theme !== filters.theme) {
      return false;
    }

    // Filter by duration
    if (filters.duration && filters.duration !== 'Toutes durées') {
      const itineraireDurationHours = parseDuration(itineraire.duration);
      const filterRange = filters.duration;
      
      if (!isDurationInRange(itineraireDurationHours, filterRange)) {
        return false;
      }
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = `${itineraire.title} ${itineraire.subtitle} ${itineraire.description} ${itineraire.startPoint} ${itineraire.endPoint} ${itineraire.theme}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
}

export function sortItineraires(itineraires, sortBy = 'title') {
  return [...itineraires].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'difficulty':
        const difficultyOrder = { 'facile': 1, 'modéré': 2, 'difficile': 3 };
        return (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0);
      case 'duration':
        return parseDuration(a.duration) - parseDuration(b.duration);
      case 'distance':
        return parseDistance(a.distance) - parseDistance(b.distance);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });
}

function parseDuration(duration) {
  if (!duration) return 0;
  
  // Extract hours from strings like "3h", "5h", "6h", etc.
  const match = duration.match(/(\d+)h/);
  return match ? parseInt(match[1]) : 0;
}

function parseDistance(distance) {
  if (!distance) return 0;
  
  // Extract distance from strings like "8 km", "12 km", etc.
  const match = distance.match(/(\d+)\s*km/);
  return match ? parseInt(match[1]) : 0;
}

function isDurationInRange(hours, range) {
  switch (range) {
    case '< 3h':
      return hours < 3;
    case '3h - 5h':
      return hours >= 3 && hours <= 5;
    case '5h - 7h':
      return hours > 5 && hours <= 7;
    case '> 7h':
      return hours > 7;
    default:
      return true;
  }
}
