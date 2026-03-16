import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  Circle,
  useMap,
} from "react-leaflet";
import { Mountain, Locate, Layers } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const CMS_URL = "https://cms.castagnicciacasinca.fr";
const RANDO_COLOR = "#27ae60";
const TRACE_COLORS = ["#2563eb", "#dc2626", "#7c3aed", "#ea580c", "#0891b2", "#16a34a", "#d946ef", "#ca8a04"];

const TILE_LAYERS = [
  {
    id: "osm",
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  {
    id: "topo",
    name: "Topographique",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
  },
  {
    id: "ign",
    name: "IGN Plan",
    url: "https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
    attribution: '&copy; <a href="https://www.ign.fr">IGN</a>',
  },
  {
    id: "ign-satellite",
    name: "Satellite",
    url: "https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
    attribution: '&copy; <a href="https://www.ign.fr">IGN</a>',
  },
  {
    id: "ign-cadastre",
    name: "Cadastre",
    url: "https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=CADASTRALPARCELS.PARCELLAIRE_EXPRESS&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
    attribution: '&copy; <a href="https://www.ign.fr">IGN</a>',
  },
];

const getFullUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${CMS_URL}${url}`;
};

const createRandoIcon = (zoom, colorIndex) => {
  const size = Math.max(24, Math.min(50, 14 + (zoom - 9) * 4));
  const color = TRACE_COLORS[colorIndex % TRACE_COLORS.length];
  return L.divIcon({
    className: "rando-marker",
    html: `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const createUserIcon = () =>
  L.divIcon({
    className: "user-marker",
    html: `<div style="width:18px;height:18px;background-color:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 3px rgba(59,130,246,0.3),0 2px 6px rgba(0,0,0,0.3)"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

const generateSlug = (nom) =>
  (nom || "randonnee")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

// Parse GPX to positions array (simplified, only lat/lon)
const parseGpxToPositions = (xmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, "application/xml");
  const trkpts = doc.querySelectorAll("trkpt");
  const positions = [];
  // Sample to max ~500 points for performance on global map
  const step = Math.max(1, Math.floor(trkpts.length / 500));
  trkpts.forEach((pt, i) => {
    if (i % step === 0) {
      positions.push([
        parseFloat(pt.getAttribute("lat")),
        parseFloat(pt.getAttribute("lon")),
      ]);
    }
  });
  return positions;
};

const MapBounds = () => {
  const map = useMap();
  useEffect(() => {
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
        <button onClick={() => map.zoomIn()} className="w-10 h-10 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center text-lg font-bold border-b border-gray-200">+</button>
        <div className="w-10 h-8 bg-gray-50 text-center text-xs font-medium flex items-center justify-center text-gray-600">{Math.round(currentZoom)}</div>
        <button onClick={() => map.zoomOut()} className="w-10 h-10 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center text-lg font-bold border-t border-gray-200">-</button>
      </div>
    </div>
  );
};

const TileLayerSwitch = ({ activeLayer }) => {
  const map = useMap();
  const layerRef = React.useRef(null);

  useEffect(() => {
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }
    const tile = TILE_LAYERS.find((t) => t.id === activeLayer) || TILE_LAYERS[0];
    layerRef.current = L.tileLayer(tile.url, { attribution: tile.attribution, maxZoom: 18 });
    layerRef.current.addTo(map);
  }, [activeLayer, map]);

  return null;
};

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
        if (!silent) alert("Impossible d'obtenir votre position.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

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

const RandonneesMap = ({ randonneesData }) => {
  const [currentZoom, setCurrentZoom] = useState(11);
  const [userPosition, setUserPosition] = useState(null);
  const [gpxTraces, setGpxTraces] = useState({});
  const [loadingGpx, setLoadingGpx] = useState(true);
  const [activeLayer, setActiveLayer] = useState("osm");
  const [showLayerPicker, setShowLayerPicker] = useState(false);
  const mapCenter = [42.4, 9.4];

  // Helper: get departure coordinates, prioritizing GPX first point over depart field
  const getDepartCoords = (item) => {
    const id = item.documentId || item.id;
    const trace = gpxTraces[id];
    // 1. If GPX trace has points, use the first point as departure
    if (trace && trace.length > 0) {
      return { lat: trace[0][0], lng: trace[0][1] };
    }
    // 2. Fallback to depart field
    if (item.depart?.lat && item.depart?.lng) {
      return { lat: item.depart.lat, lng: item.depart.lng };
    }
    return null;
  };

  // Items with depart OR GPX (GPX coords resolved after loading)
  const validItems = (randonneesData || []).filter((item) => {
    const hasDepart = item.depart?.lat && item.depart?.lng;
    const hasGpx = item.GPX?.url;
    return hasDepart || hasGpx;
  });

  // Load all GPX traces
  useEffect(() => {
    const itemsWithGpx = (randonneesData || []).filter((item) => item.GPX?.url);
    if (itemsWithGpx.length === 0) {
      setLoadingGpx(false);
      return;
    }

    Promise.allSettled(
      itemsWithGpx.map(async (item) => {
        const url = getFullUrl(item.GPX.url);
        const res = await fetch(url);
        if (!res.ok) return null;
        const text = await res.text();
        const positions = parseGpxToPositions(text);
        return { id: item.documentId || item.id, positions };
      })
    ).then((results) => {
      const traces = {};
      results.forEach((r) => {
        if (r.status === "fulfilled" && r.value) {
          traces[r.value.id] = r.value.positions;
        }
      });
      setGpxTraces(traces);
      setLoadingGpx(false);
    });
  }, [randonneesData]);

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
          <TileLayerSwitch activeLayer={activeLayer} />
          <MapBounds />

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

          {/* GPX Traces */}
          {validItems.map((item, index) => {
            const id = item.documentId || item.id;
            const trace = gpxTraces[id];
            if (!trace || trace.length < 2) return null;
            const color = TRACE_COLORS[index % TRACE_COLORS.length];
            return (
              <Polyline
                key={`trace-${id}`}
                positions={trace}
                pathOptions={{ color, weight: 3, opacity: 0.7 }}
              />
            );
          })}

          {/* Markers at depart (GPX first point prioritized over depart field) */}
          {validItems.map((item, index) => {
            const coords = getDepartCoords(item);
            if (!coords) return null;
            const slug = generateSlug(item.Nom);
            return (
              <Marker
                key={item.id || item.documentId}
                position={[coords.lat, coords.lng]}
                icon={createRandoIcon(currentZoom, index)}
              >
                <Popup className="custom-popup" maxWidth={280}>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-semibold text-sm leading-tight mb-1" style={{ color: TRACE_COLORS[index % TRACE_COLORS.length] }}>
                      {item.Nom || "Randonnée"}
                    </h3>
                    {item.commune?.Nom && (
                      <p className="text-xs text-gray-500 mb-1">{item.commune.Nom}</p>
                    )}
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                      {item.Distance && <span>{item.Distance}</span>}
                      {item.Duree && <span>{item.Duree}</span>}
                      {item.Difficulte && <span>{item.Difficulte}</span>}
                    </div>
                    <a
                      href={`/randonnee/${slug}`}
                      className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-800 font-medium"
                    >
                      Voir la randonnée →
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          <ZoomControl onZoomChange={setCurrentZoom} currentZoom={currentZoom} />
          <GeolocateControl onLocated={setUserPosition} />
        </MapContainer>

        {loadingGpx && (
          <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 rounded-lg px-3 py-2 shadow text-sm text-gray-600 flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            Chargement des tracés...
          </div>
        )}

        {/* Layer picker */}
        <div className="absolute bottom-4 right-4 z-[1000]">
          <div className="relative">
            <button
              onClick={() => setShowLayerPicker((v) => !v)}
              className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
              title="Changer le fond de carte"
            >
              <Layers size={18} />
            </button>
            {showLayerPicker && (
              <div className="absolute bottom-12 right-0 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[180px]">
                {TILE_LAYERS.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => { setActiveLayer(layer.id); setShowLayerPicker(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeLayer === layer.id ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    {layer.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default RandonneesMap;
