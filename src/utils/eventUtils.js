/**
 * Trie les événements par date (futurs d'abord, puis passés)
 * @param {Array} eventsData - Tableau des événements
 * @returns {Array} - Événements triés avec la propriété isPast ajoutée
 */
export const sortEventsByDate = (eventsData) => {
  if (!eventsData || !Array.isArray(eventsData)) return [];

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const futureEvents = [];
  const pastEvents = [];

  eventsData.forEach((event) => {
    const eventDate = new Date(event.Date);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate >= currentDate) {
      futureEvents.push({ ...event, isPast: false });
    } else {
      pastEvents.push({ ...event, isPast: true });
    }
  });

  // Trier les événements futurs par date croissante (du plus proche au plus loin)
  futureEvents.sort((a, b) => new Date(a.Date) - new Date(b.Date));

  // Trier les événements passés par date décroissante (du plus récent au plus ancien)
  pastEvents.sort((a, b) => new Date(b.Date) - new Date(a.Date));

  return [...futureEvents, ...pastEvents];
};

/**
 * Formate une date d'événement en français
 * @param {string} dateString - Date au format ISO
 * @returns {string} - Date formatée en français
 */
export const formatEventDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Obtient l'URL complète d'une image Strapi
 * @param {Object} image - Objet image de Strapi
 * @returns {string|null} - URL complète de l'image ou null
 */
export const getImageUrl = (image) => {
  if (!image) return null;
  const baseUrl =
    import.meta.env.PUBLIC_STRAPI_URL ||
    import.meta.env.PUBLIC_API_URL ||
    "http://localhost:1337";
  return `${baseUrl}${image.url}`;
};

/**
 * Vérifie si un événement est passé
 * @param {string} eventDate - Date de l'événement
 * @returns {boolean} - True si l'événement est passé
 */
export const isEventPast = (eventDate) => {
  const currentDate = new Date();
  const evtDate = new Date(eventDate);
  return evtDate < currentDate;
};
