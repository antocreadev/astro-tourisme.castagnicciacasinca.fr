import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import { QrCode, Navigation, Locate } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const QR_COLOR = "#2563eb";
const CMS_URL = "https://cms.castagnicciacasinca.fr";

const getFullImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${CMS_URL}${url}`;
};

const QR_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>`;

// Calcul distance haversine en km
const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const createQrIcon = (zoom) => {
  const size = Math.max(24, Math.min(50, 14 + (zoom - 9) * 4));
  return L.divIcon({
    className: "qrcode-marker",
    html: `
      <div style="
        background-color: ${QR_COLOR};
        width: ${size}px;
        height: ${size}px;
        border-radius: 8px;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        color: white;
      ">
        ${QR_ICON_SVG}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const createUserIcon = () => {
  return L.divIcon({
    className: "user-marker",
    html: `
      <div style="
        width: 18px;
        height: 18px;
        background-color: #3b82f6;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 3px rgba(59,130,246,0.3), 0 2px 6px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};

const MapBounds = () => {
  const map = useMap();
  useEffect(() => {
    // Pas de maxBounds sur la carte QR codes pour permettre la géolocalisation libre
    map.setMinZoom(7);
    map.setMaxZoom(18);
  }, [map]);
  return null;
};

const ZoomControl = ({ onZoomChange, currentZoom }) => {
  const map = useMap();
  useEffect(() => {
    const handleZoom = () => onZoomChange(map.getZoom());
    map.on("zoomend", handleZoom);
    return () => map.off("zoomend", handleZoom);
  }, [map, onZoomChange]);

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col">
        <button onClick={() => map.zoomIn()} className="w-10 h-10 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center text-lg font-bold border-b border-gray-200" title="Zoomer">+</button>
        <div className="w-10 h-8 bg-gray-50 text-center text-xs font-medium flex items-center justify-center text-gray-600">{Math.round(currentZoom)}</div>
        <button onClick={() => map.zoomOut()} className="w-10 h-10 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center text-lg font-bold border-t border-gray-200" title="Dézoomer">-</button>
      </div>
    </div>
  );
};

// Composant qui gère la géolocalisation et le recentrage
const GeolocateControl = ({ onLocated }) => {
  const map = useMap();
  const [locating, setLocating] = useState(false);
  const [autoLocated, setAutoLocated] = useState(false);

  const doGeolocate = (silent = false) => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        map.flyTo([latitude, longitude], 13, { duration: 1.5 });
        onLocated({ lat: latitude, lng: longitude });
        setLocating(false);
      },
      () => {
        setLocating(false);
        if (!silent) {
          alert("Impossible d'obtenir votre position. Vérifiez les permissions de géolocalisation.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Géolocalisation automatique au montage
  useEffect(() => {
    if (!autoLocated && navigator.geolocation) {
      setAutoLocated(true);
      doGeolocate(true);
    }
  }, []);

  return (
    <div className="absolute top-40 right-4 z-[1000]">
      <button
        onClick={() => doGeolocate(false)}
        disabled={locating}
        className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
        title="Ma position"
      >
        {locating ? (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Locate size={18} />
        )}
      </button>
    </div>
  );
};

const QrMarker = ({ item, zoom, distance }) => {
  const coords = item.coordonnees || item.Coordonnees;
  if (!coords || !coords.lat || !coords.lng) return null;

  return (
    <Marker position={[coords.lat, coords.lng]} icon={createQrIcon(zoom)}>
      <Popup className="custom-popup" maxWidth={280}>
        <div className="p-2 min-w-[200px]">
          <div className="flex items-start gap-2 mb-2">
            <div className="flex-shrink-0" style={{ color: QR_COLOR }}>
              {React.createElement(QrCode, { size: 18 })}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-tight mb-1" style={{ color: QR_COLOR }}>
                {item.Titre || "Point d'intérêt"}
              </h3>
              {item.commune?.Nom && (
                <p className="text-xs text-gray-500 mb-1">{item.commune.Nom}</p>
              )}
              {distance !== null && (
                <p className="text-xs text-gray-400 mb-1">
                  À {distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`}
                </p>
              )}
              <a
                href={`/qr-codes/${item.documentId}`}
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <span>En savoir plus</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

const QrCodeMap = ({ qrCodesData }) => {
  const [currentZoom, setCurrentZoom] = useState(11);
  const [userPosition, setUserPosition] = useState(null);
  const mapCenter = [42.4, 9.4];

  const validItems = (qrCodesData || []).filter((item) => {
    const coords = item.coordonnees || item.Coordonnees;
    return coords && coords.lat && coords.lng;
  });

  // Calcul des distances si position connue
  const itemsWithDistance = validItems.map((item) => {
    const coords = item.coordonnees || item.Coordonnees;
    const distance = userPosition
      ? getDistance(userPosition.lat, userPosition.lng, coords.lat, coords.lng)
      : null;
    return { ...item, _distance: distance };
  });

  // Tri par distance si position connue
  const sortedItems = userPosition
    ? [...itemsWithDistance].sort((a, b) => a._distance - b._distance)
    : itemsWithDistance;

  // Les 3 plus proches
  const nearestItems = userPosition ? sortedItems.slice(0, 3) : [];

  return (
    <div>
      <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={mapCenter}
          zoom={currentZoom}
          className="w-full h-full"
          zoomControl={false}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          dragging={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <MapBounds />

          {/* Marqueur utilisateur */}
          {userPosition && (
            <>
              <Marker position={[userPosition.lat, userPosition.lng]} icon={createUserIcon()}>
                <Popup>
                  <div className="p-1 text-sm font-medium text-gray-700">Vous êtes ici</div>
                </Popup>
              </Marker>
              <Circle
                center={[userPosition.lat, userPosition.lng]}
                radius={200}
                pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.1, weight: 1 }}
              />
            </>
          )}

          {sortedItems.map((item) => (
            <QrMarker
              key={item.id || item.documentId}
              item={item}
              zoom={currentZoom}
              distance={item._distance}
            />
          ))}

          <ZoomControl onZoomChange={setCurrentZoom} currentZoom={currentZoom} />
          <GeolocateControl onLocated={setUserPosition} />
        </MapContainer>

      </div>

      {/* Suggestions des plus proches */}
      {nearestItems.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Navigation size={20} className="text-blue-600" />
            Points d'intérêt les plus proches
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {nearestItems.map((item) => {
              const coords = item.coordonnees || item.Coordonnees;
              const img = item.images?.[0];
              const imgUrl = getFullImageUrl(img?.url);

              return (
                <a
                  key={item.documentId}
                  href={`/qr-codes/${item.documentId}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={imgUrl || `https://placehold.co/800x450?text=${encodeURIComponent(item.Titre || "Point d'intérêt")}`} alt={item.Titre} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.Titre}</h4>
                    {item.commune?.Nom && (
                      <p className="text-sm text-gray-500 mb-1">{item.commune.Nom}</p>
                    )}
                    <p className="text-sm font-medium text-blue-600">
                      {item._distance < 1
                        ? `${Math.round(item._distance * 1000)} m`
                        : `${item._distance.toFixed(1)} km`}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QrCodeMap;
