import { selectHomepageEvents } from "../utils/eventUtils.js";
import useNow from "../utils/useNow.js";
import EventCard from "./ui/EventCard.jsx";

export default function Agenda({ data, events, colorData, buildTime }) {
  // "now" = instant du build au rendu serveur, puis instant réel côté visiteur
  const now = useNow(buildTime);
  // Mis en avant d'abord, puis prochains événements ; jamais d'événement terminé
  const displayEvents = selectHomepageEvents(events, 4, now);

  // Couleurs dynamiques
  const agendaStyle = {
    backgroundColor: colorData?.data?.FondAgenda || "#ffffff",
    color: colorData?.data?.texteAgenda || "#000000",
  };

  const elementStyle = {
    backgroundColor: colorData?.data?.fondElementAgenda || "#ffffff",
  };

  return (
    <div className="py-16" style={agendaStyle}>
      <div className="mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1
            className="text-6xl font-bold mb-8"
            style={{ color: colorData?.data?.texteAgenda || "#000000" }}
          >
            {data?.Titre || "Agenda"}
          </h1>
          <p
            className="text-lg max-w-4xl mx-auto leading-relaxed"
            style={{ color: colorData?.data?.texteAgenda || "#666666" }}
          >
            {data?.Description ||
              "Tout au long de l'année, des multitudes de rendez-vous culturels, musicaux, cinématographiques, sportifs et gourmands avec des lieux de vie aux multiples facettes"}
          </p>
        </div>

        {/* Events Grid */}
        {displayEvents.length === 0 && (
          <p className="text-center text-gray-500 px-4">
            De nouveaux rendez-vous seront bientôt annoncés.
          </p>
        )}
        {/* flex + justify-center : reste centré s'il y a moins de 4 événements */}
        <div className="flex flex-wrap justify-center gap-6 px-4 md:px-8 max-w-[110rem] mx-auto">
          {displayEvents.map((event, index) => (
            <div
              key={event.id || index}
              className="w-full sm:w-[calc(50%-0.75rem)] xl:w-[calc(25%-1.125rem)]"
            >
              <EventCard
                event={event}
                href={`/agenda/${event.documentId}`}
                isPast={event.isPast}
                style={elementStyle}
              />
            </div>
          ))}
        </div>

        {/* See All Button */}
        <div className="text-center mt-12">
          {data?.Bouton ? (
            <a
              href={data.Bouton.Lien}
              className="inline-flex items-center gap-2 font-semibold px-8 py-3 rounded-lg transition-all duration-300 relative overflow-hidden agenda-btn"
              style={{
                "--btn-bg": data.Bouton.Couleur || "#2563eb",
                "--btn-text": data.Bouton.TexteColor || "#ffffff",
                "--btn-border": data.Bouton.BorderColor || "transparent",
                backgroundColor: "var(--btn-bg)",
                color: "var(--btn-text)",
                border: data.Bouton.BorderColor
                  ? "1px solid var(--btn-border)"
                  : "none",
              }}
            >
              {data.Bouton.Label}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          ) : (
            <a
              href="/agenda"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Voir tous les événements
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* CSS pour le hover dynamique du bouton */
const agendaBtnStyles = `
.agenda-btn {
  position: relative;
  overflow: hidden;
}

.agenda-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--btn-bg) 85%, white 15%),
    color-mix(in srgb, var(--btn-bg) 90%, black 10%)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.agenda-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow:
    0 8px 25px color-mix(in srgb, var(--btn-bg) 30%, transparent 70%),
    0 4px 12px color-mix(in srgb, var(--btn-bg) 20%, transparent 80%);
}

.agenda-btn:hover::before {
  opacity: 1;
}

.agenda-btn:active {
  transform: translateY(-1px) scale(1.01);
  transition: all 0.1s ease;
}

.agenda-btn:hover {
  filter: brightness(0.96) saturate(1.1);
}

.agenda-btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--btn-bg) 70%, transparent 30%);
  outline-offset: 2px;
}
`;

// Injecter les styles dans le document
if (
  typeof document !== "undefined" &&
  !document.getElementById("agenda-btn-styles")
) {
  const style = document.createElement("style");
  style.id = "agenda-btn-styles";
  style.textContent = agendaBtnStyles;
  document.head.appendChild(style);
}
