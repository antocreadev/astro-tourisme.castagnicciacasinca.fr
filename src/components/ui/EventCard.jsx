import { Calendar, MapPin, Phone, ArrowRight, Star } from 'lucide-react';
import { convertSimpleMarkdown } from '../../utils/markdownUtils.js';
import { getDateBadge, formatEventPeriod, getStartDay, getEndDay } from '../../utils/eventUtils.js';

// Dégradés "terroir" pour les événements sans image (choisis de façon stable par événement)
const PLACEHOLDER_GRADIENTS = [
  'from-amber-200 via-orange-200 to-rose-300',   // terre cuite
  'from-lime-200 via-emerald-200 to-teal-300',   // maquis
  'from-sky-200 via-cyan-200 to-blue-300',       // mer
  'from-yellow-100 via-amber-200 to-orange-300', // châtaigne
  'from-rose-200 via-pink-200 to-fuchsia-300',   // fête
];

const hashString = (str = '') => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const extractImage = (evt) => {
  if (!evt) return null;
  if (evt.image) return evt.image;
  if (Array.isArray(evt.images) && evt.images.length > 0) return evt.images[0];
  if (Array.isArray(evt.Images) && evt.Images.length > 0) return evt.Images[0];
  if (Array.isArray(evt.medias) && evt.medias.length > 0) return evt.medias[0];
  if (Array.isArray(evt.media) && evt.media.length > 0) return evt.media[0];
  if (evt.images?.data?.length > 0) return evt.images.data[0].attributes || evt.images.data[0];
  return null;
};

const getImageUrl = (image) => {
  if (!image) return null;
  const f = image.formats || {};
  const best = f.medium || f.large || f.small || image;
  const rawUrl = best.url || image.url || image.src || image.path;
  if (!rawUrl) return null;
  if (/^https?:\/\//i.test(rawUrl)) return rawUrl;
  const baseUrl = import.meta.env.PUBLIC_STRAPI_URL || import.meta.env.PUBLIC_API_URL || 'https://cms.castagnicciacasinca.fr';
  return `${baseUrl}${rawUrl}`;
};

const toPlainExcerpt = (md = '', max = 160) => {
  const text = md.length > max ? md.substring(0, max).trimEnd() + '…' : md;
  return convertSimpleMarkdown(text);
};

/**
 * Carte événement unifiée (accueil + page Agenda).
 * S'adapte aux informations disponibles : image ou visuel de remplacement,
 * date (rien si pas de date), événement passé, description, téléphone…
 */
export default function EventCard({ event, href, onClick, isPast, style }) {
  const badge = getDateBadge(event);
  const hasDate = !!badge;
  const isMultiDay = hasDate && getEndDay(event) !== getStartDay(event);
  const isOngoing = !isPast && event.isOngoing;
  const isFeatured = !isPast && event.isFeatured;
  const imageUrl = getImageUrl(extractImage(event));
  const commune = event.commune?.Nom;
  const typeName = event.type_evenement?.Nom;
  const gradient = PLACEHOLDER_GRADIENTS[hashString(event.documentId || event.Nom) % PLACEHOLDER_GRADIENTS.length];

  const fullDate = hasDate ? formatEventPeriod(event) : null;
  // Carte « pauvre » (ni date, ni description, ni téléphone) : l'image occupe la place libre
  const isSparse = !fullDate && !event.Description && !event.Tel;

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(event);
    }
  };

  const card = (
    <article
      className={`group h-full flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isFeatured ? 'ring-2 ring-amber-400' : 'ring-1 ring-black/5'}`}
      data-status={event.status}
      data-featured={isFeatured ? 'true' : undefined}
      style={style}
    >
      {/* Visuel */}
      <div className={`relative overflow-hidden ${isSparse ? 'flex-1 min-h-[13rem]' : 'h-52'}`}>
        {imageUrl ? (
          <>
            {/* Fond flouté pour les affiches au format portrait */}
            <img
              src={imageUrl}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-70 ${isPast ? 'grayscale' : ''}`}
            />
            <img
              src={imageUrl}
              alt={event.Nom}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 ${isPast ? 'grayscale-[60%]' : ''}`}
            />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-2 ${isPast ? 'grayscale-[60%]' : ''}`}>
            <div className="w-14 h-14 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
              <Calendar className="w-7 h-7 text-gray-700/80" strokeWidth={1.75} />
            </div>
            {commune && (
              <span className="text-sm font-semibold tracking-wide text-gray-800/80 px-4 text-center">
                {commune}
              </span>
            )}
          </div>
        )}

        {/* Pastille date */}
        <div className="absolute top-3 left-3">
          {hasDate && (
            <div className="bg-white/95 backdrop-blur rounded-xl shadow-md px-3 py-1.5 text-center min-w-[3.5rem]">
              <div className={`text-2xl font-bold leading-none ${isPast ? 'text-gray-500' : 'text-gray-900'}`}>
                {badge.day}
              </div>
              <div className={`text-[11px] font-semibold tracking-wider mt-1 ${isPast ? 'text-gray-400' : 'text-blue-600'}`}>
                {badge.month}
              </div>
              {isMultiDay && (
                <div className="text-[10px] font-medium text-gray-500 mt-0.5">+ jours</div>
              )}
            </div>
          )}
        </div>

        {/* Statut / type */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {isPast && (
            <span className="bg-gray-900/80 text-white text-[11px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1">
              Terminé
            </span>
          )}
          {isFeatured && (
            <span className="bg-amber-400 text-gray-900 text-[11px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 shadow-sm inline-flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" /> À la une
            </span>
          )}
          {isOngoing && (
            <span className="bg-emerald-600 text-white text-[11px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 shadow-sm">
              En cours
            </span>
          )}
          {!isPast && typeName && (
            <span className="bg-white/95 text-gray-800 text-xs font-medium rounded-full px-2.5 py-1 shadow-sm">
              {typeName}
            </span>
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className={isSparse ? 'px-5 py-4 flex flex-col' : 'p-5 flex-1 flex flex-col'}>
        {commune && (
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{commune}</span>
          </div>
        )}

        <h3 className={`text-lg font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-blue-700 ${isPast ? 'text-gray-600' : 'text-gray-900'}`}>
          {event.Nom}
        </h3>

        <div className="mt-2 space-y-1">
          {fullDate && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{fullDate}</span>
            </div>
          )}
          {event.Tel && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{event.Tel}</span>
            </div>
          )}
        </div>

        {event.Description && (
          <div
            className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3"
            dangerouslySetInnerHTML={{ __html: toPlainExcerpt(event.Description) }}
          />
        )}

        <div className={isSparse ? 'pt-2' : 'mt-auto pt-4'}>
          <span className={`inline-flex items-center gap-1 text-sm font-semibold ${isPast ? 'text-gray-500' : 'text-blue-600'}`}>
            Voir détails
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );

  if (href) {
    return (
      <a href={href} onClick={handleClick} className="block h-full">
        {card}
      </a>
    );
  }

  return (
    <div onClick={handleClick} className={`h-full ${onClick ? 'cursor-pointer' : ''}`}>
      {card}
    </div>
  );
}
