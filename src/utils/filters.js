export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatDateShort(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short'
  }).format(date);
}

export function isEventPassed(dateString) {
  const eventDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate < today;
}

export function filterEvents(events, filters) {
  return events.filter(event => {
    // Filter by category
    if (filters.category && filters.category !== 'all' && event.category !== filters.category) {
      return false;
    }

    // Filter by commune
    if (filters.commune && filters.commune !== 'Toutes communes' && event.commune !== filters.commune) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange) {
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      switch (filters.dateRange) {
        case 'today':
          const todayEnd = new Date(today);
          todayEnd.setHours(23, 59, 59, 999);
          if (eventDate < today || eventDate > todayEnd) return false;
          break;
        case 'week':
          const weekEnd = new Date(today);
          weekEnd.setDate(today.getDate() + 7);
          if (eventDate < today || eventDate > weekEnd) return false;
          break;
        case 'month':
          const monthEnd = new Date(today);
          monthEnd.setMonth(today.getMonth() + 1);
          if (eventDate < today || eventDate > monthEnd) return false;
          break;
        case 'upcoming':
          if (eventDate < today) return false;
          break;
      }
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = `${event.title} ${event.description} ${event.location} ${event.commune}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
}

export function sortEvents(events, sortBy = 'date') {
  return [...events].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date) - new Date(b.date);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'commune':
        return a.commune.localeCompare(b.commune);
      default:
        return 0;
    }
  });
}
