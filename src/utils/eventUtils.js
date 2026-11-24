/**
 * Logique « agenda » centralisée (accueil, page Agenda, fiche détail, carte, RSS).
 *
 * Toutes les comparaisons se font sur des jours calendaires au fuseau
 * Europe/Paris, sous forme de chaînes "AAAA-MM-JJ" (indépendant du fuseau du
 * serveur de build ou du navigateur).
 *
 * Statuts possibles d'un événement :
 *  - "ongoing"  : en cours (Date <= aujourd'hui <= DateFin)
 *  - "upcoming" : à venir
 *  - "undated"  : sans date (aucune mention de date affichée), mis à jour récemment
 *  - "past"     : terminé
 *  - "stale"    : sans date ET non modifié depuis UNDATED_MAX_AGE_DAYS :
 *                 considéré comme obsolète, il n'est plus mis en avant.
 */

export const TIME_ZONE = "Europe/Paris";
export const UNDATED_MAX_AGE_DAYS = 180;

const DAY_RE = /^(\d{4})-(\d{2})-(\d{2})/;

/** Jour "AAAA-MM-JJ" (Europe/Paris) d'un instant donné. */
export const toDayKey = (instant = new Date()) => {
  const d = instant instanceof Date ? instant : new Date(instant);
  if (isNaN(d.getTime())) return null;
  // en-CA => format ISO AAAA-MM-JJ
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
};

/** Normalise une date Strapi ("AAAA-MM-JJ" ou ISO) en "AAAA-MM-JJ", sinon null. */
export const normalizeDay = (value) => {
  if (!value) return null;
  if (typeof value === "string") {
    const m = value.match(DAY_RE);
    if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  }
  return toDayKey(value);
};

/** Convertit "AAAA-MM-JJ" en Date locale (midi, pour éviter tout décalage). */
export const dayKeyToDate = (key) => {
  const m = key && key.match(DAY_RE);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12) : null;
};

const addDays = (key, n) => {
  const d = dayKeyToDate(key);
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** Jour de début de l'événement ou null. */
export const getStartDay = (event) => normalizeDay(event?.Date);

/** Jour de fin (DateFin si cohérente, sinon Date) ou null. */
export const getEndDay = (event) => {
  const start = getStartDay(event);
  const end = normalizeDay(event?.DateFin);
  if (!start) return null;
  return end && end >= start ? end : start;
};

/** Indique si un événement a une date valide */
export const hasEventDate = (event) => !!getStartDay(event);

/**
 * Statut d'un événement à une date donnée.
 * @param {Object} event
 * @param {Date|string} [now] instant de référence (défaut : maintenant)
 */
export const getEventStatus = (event, now = new Date()) => {
  const today = toDayKey(now);
  const start = getStartDay(event);
  if (!start) {
    const lastUpdate = normalizeDay(event?.updatedAt || event?.publishedAt || event?.createdAt);
    if (lastUpdate && lastUpdate < addDays(today, -UNDATED_MAX_AGE_DAYS)) return "stale";
    return "undated";
  }
  const end = getEndDay(event);
  if (end < today) return "past";
  if (start <= today) return "ongoing";
  return "upcoming";
};

export const isFeatured = (event) =>
  event?.PagePrincipale === true || event?.PagePrincipale === 1;

const byName = (a, b) => (a.Nom || "").localeCompare(b.Nom || "", "fr");
const byStartAsc = (a, b) =>
  (getStartDay(a) || "").localeCompare(getStartDay(b) || "") || byName(a, b);
const byEndDesc = (a, b) =>
  (getEndDay(b) || "").localeCompare(getEndDay(a) || "") || byName(a, b);

/** Ajoute les propriétés calculées (status, isPast, isOngoing, hasNoDate, isFeatured). */
export const annotateEvent = (event, now = new Date()) => {
  const status = getEventStatus(event, now);
  return {
    ...event,
    status,
    isPast: status === "past" || status === "stale",
    isOngoing: status === "ongoing",
    hasNoDate: !hasEventDate(event),
    isFeatured: isFeatured(event) && (status === "ongoing" || status === "upcoming" || status === "undated"),
  };
};

/**
 * Répartit les événements pour l'agenda :
 *  - current : en cours + à venir (mis en avant d'abord, puis par date croissante)
 *  - undated : sans date récents (mis en avant d'abord, puis par nom)
 *  - past    : terminés + sans date obsolètes (du plus récent au plus ancien)
 */
export const splitEvents = (events, now = new Date()) => {
  const current = [];
  const undated = [];
  const past = [];
  (Array.isArray(events) ? events : []).forEach((raw) => {
    const e = annotateEvent(raw, now);
    if (e.status === "ongoing" || e.status === "upcoming") current.push(e);
    else if (e.status === "undated") undated.push(e);
    else past.push(e);
  });
  const featuredFirst = (cmp) => (a, b) =>
    (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || cmp(a, b);
  current.sort(featuredFirst(byStartAsc));
  undated.sort(featuredFirst(byName));
  past.sort((a, b) => {
    // les « stale » (sans date) en dernier
    if (a.hasNoDate !== b.hasNoDate) return a.hasNoDate ? 1 : -1;
    return byEndDesc(a, b);
  });
  return { current, undated, past };
};

/**
 * Trie les événements : à venir/en cours, puis sans date, puis passés.
 * @returns {Array} événements annotés (status, isPast, hasNoDate…)
 */
export const sortEventsByDate = (events, now = new Date()) => {
  const { current, undated, past } = splitEvents(events, now);
  return [...current, ...undated, ...past];
};

/**
 * Événements de la page d'accueil :
 *  1. les événements « Mettre en avant » non terminés (par date, sans date en dernier)
 *  2. puis les prochains événements par date
 *  3. puis les événements sans date récents
 * Jamais d'événement passé : mieux vaut 2 cartes que des événements terminés.
 */
export const selectHomepageEvents = (events, limit = 4, now = new Date()) => {
  const { current, undated } = splitEvents(events, now);
  const featured = [...current, ...undated].filter((e) => e.isFeatured);
  const others = [...current, ...undated].filter((e) => !e.isFeatured);
  return [...featured, ...others].slice(0, limit);
};

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/**
 * Formate une date d'événement en français ("samedi 12 juillet 2026").
 * @param {string} dateString
 */
export const formatEventDate = (dateString) => {
  const key = normalizeDay(dateString);
  if (!key) return "";
  return dayKeyToDate(key).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Libellé complet de la période d'un événement :
 * "Samedi 12 juillet 2026", "Du 31 juillet au 2 août 2026", ou "" si pas de date.
 */
export const formatEventPeriod = (event) => {
  const start = getStartDay(event);
  if (!start) return ""; // sans date : rien n'est affiché (les dates sont dans le texte)
  const end = getEndDay(event);
  if (end === start) return capitalize(formatEventDate(start));
  const s = dayKeyToDate(start);
  const e = dayKeyToDate(end);
  const sameYear = s.getFullYear() === e.getFullYear();
  const sameMonth = sameYear && s.getMonth() === e.getMonth();
  const startLabel = s.toLocaleDateString("fr-FR", {
    day: "numeric",
    ...(sameMonth ? {} : { month: "long" }),
    ...(sameYear ? {} : { year: "numeric" }),
  });
  const endLabel = e.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return `Du ${startLabel} au ${endLabel}`;
};

const MONTHS_SHORT = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DÉC"];

/** Pastille { day: "05", month: "JUIL" } du jour de début, ou null. */
export const getDateBadge = (event) => {
  const start = getStartDay(event);
  if (!start) return null;
  const d = dayKeyToDate(start);
  return { day: String(d.getDate()).padStart(2, "0"), month: MONTHS_SHORT[d.getMonth()] };
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
    "https://cms.castagnicciacasinca.fr";
  return `${baseUrl}${image.url}`;
};

/**
 * Retourne la première image disponible d'un événement (nouvelle structure multi-images)
 * Fallback sur l'ancienne propriété event.image si présente
 * @param {Object} event
 * @returns {Object|null}
 */
export const getFirstImage = (event) => {
  if (!event) return null;
  return (event.images && event.images[0]) || event.image || null;
};

/**
 * Sélectionne le meilleur format d'image disponible (large > medium > small > thumbnail > image brute)
 * @param {Object} image
 * @returns {Object|null}
 */
export const getBestFormat = (image) => {
  if (!image) return null;
  const formats = image.formats || {};
  return (
    formats.large ||
    formats.medium ||
    formats.small ||
    formats.thumbnail ||
    image
  );
};

/**
 * Vérifie si un événement (ou une date) est terminé.
 * Accepte un événement (prend en compte DateFin) ou une date seule.
 */
export const isEventPast = (eventOrDate, now = new Date()) => {
  const event = eventOrDate && typeof eventOrDate === "object" && !(eventOrDate instanceof Date)
    ? eventOrDate
    : { Date: eventOrDate };
  const status = getEventStatus(event, now);
  return status === "past" || status === "stale";
};
