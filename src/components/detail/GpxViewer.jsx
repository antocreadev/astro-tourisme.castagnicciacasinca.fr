import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Mountain,
  TrendingUp,
  TrendingDown,
  Route,
  ArrowUp,
  ArrowDown,
  Activity,
  Download,
  Locate,
  Layers,
} from "lucide-react";

const CMS_URL = "https://cms.castagnicciacasinca.fr";

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

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const parseGpx = (xmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, "application/xml");
  const nameEl = doc.querySelector("metadata > name");
  const descEl = doc.querySelector("metadata > desc");
  const metadata = {
    name: nameEl?.textContent || "",
    description: descEl?.textContent || "",
  };
  const trkpts = doc.querySelectorAll("trkpt");
  const points = [];
  trkpts.forEach((pt) => {
    const lat = parseFloat(pt.getAttribute("lat"));
    const lon = parseFloat(pt.getAttribute("lon"));
    const eleEl = pt.querySelector("ele");
    const timeEl = pt.querySelector("time");
    points.push({
      lat,
      lon,
      ele: eleEl ? parseFloat(eleEl.textContent) : null,
      time: timeEl ? new Date(timeEl.textContent) : null,
    });
  });
  return { points, metadata };
};

const computeStats = (points) => {
  if (!points || points.length < 2) return null;

  let totalDistance = 0;
  let elevGain = 0;
  let elevLoss = 0;
  const elevations = points.filter((p) => p.ele !== null).map((p) => p.ele);
  const hasElevation = elevations.length > 0;

  const distances = [0];
  for (let i = 1; i < points.length; i++) {
    const d = haversine(
      points[i - 1].lat, points[i - 1].lon,
      points[i].lat, points[i].lon
    );
    totalDistance += d;
    distances.push(totalDistance);
    if (hasElevation && points[i].ele !== null && points[i - 1].ele !== null) {
      const diff = points[i].ele - points[i - 1].ele;
      if (diff > 0) elevGain += diff;
      else elevLoss += Math.abs(diff);
    }
  }

  const slopes = [];
  for (let i = 1; i < points.length; i++) {
    if (points[i].ele !== null && points[i - 1].ele !== null) {
      const hDist = haversine(
        points[i - 1].lat, points[i - 1].lon,
        points[i].lat, points[i].lon
      );
      if (hDist > 0.5) {
        slopes.push(((points[i].ele - points[i - 1].ele) / hDist) * 100);
      }
    }
  }

  const hasTime = points[0].time && points[points.length - 1].time;
  let duration = null;
  if (hasTime) {
    duration = (points[points.length - 1].time - points[0].time) / 1000;
  }

  const sampleSize = Math.min(points.length, 300);
  const step = Math.max(1, Math.floor(points.length / sampleSize));
  const profileData = [];
  for (let i = 0; i < points.length; i += step) {
    if (points[i].ele !== null) {
      profileData.push({
        distance: +(distances[i] / 1000).toFixed(2),
        altitude: Math.round(points[i].ele),
      });
    }
  }
  const last = points[points.length - 1];
  if (last.ele !== null) {
    profileData.push({
      distance: +(totalDistance / 1000).toFixed(2),
      altitude: Math.round(last.ele),
    });
  }

  return {
    totalDistance: totalDistance / 1000,
    elevGain: Math.round(elevGain),
    elevLoss: Math.round(elevLoss),
    minElevation: hasElevation ? Math.round(Math.min(...elevations)) : null,
    maxElevation: hasElevation ? Math.round(Math.max(...elevations)) : null,
    avgElevation: hasElevation
      ? Math.round(elevations.reduce((a, b) => a + b, 0) / elevations.length)
      : null,
    minSlope: slopes.length > 0 ? Math.round(Math.min(...slopes)) : null,
    maxSlope: slopes.length > 0 ? Math.round(Math.max(...slopes)) : null,
    avgSlope: slopes.length > 0
      ? Math.round(slopes.reduce((a, b) => a + b, 0) / slopes.length)
      : null,
    duration,
    profileData,
    points: points.length,
  };
};

const formatDuration = (seconds) => {
  if (!seconds) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}'${String(s).padStart(2, "0")}"`;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-gray-900">{payload[0].value} m</p>
        <p className="text-xs text-gray-500">{payload[0].payload.distance} km</p>
      </div>
    );
  }
  return null;
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: `${color}15`, color }}
    >
      <Icon size={20} />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-500 truncate">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

// Inner map content - layers only (no HTML buttons)
const GpxMapLayers = ({ positions, startPt, endPt, L, rl, userPosition, mapRef, activeLayer }) => {
  const { useMap, Polyline, Marker, Popup, Circle } = rl;
  const map = useMap();
  const tileRef = useRef(null);

  // Store map ref for parent
  useEffect(() => {
    if (mapRef) mapRef.current = map;
  }, [map]);

  // Switch tile layer
  useEffect(() => {
    if (tileRef.current) map.removeLayer(tileRef.current);
    const tile = TILE_LAYERS.find((t) => t.id === activeLayer) || TILE_LAYERS[0];
    tileRef.current = L.tileLayer(tile.url, { attribution: tile.attribution, maxZoom: 18 });
    tileRef.current.addTo(map);
  }, [activeLayer, map]);

  // Fit bounds on mount
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, []);

  const startIcon = L.divIcon({
    className: "start-marker",
    html: `<div style="background:#16a34a;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
  const endIcon = L.divIcon({
    className: "end-marker",
    html: `<div style="background:#dc2626;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
  const userIcon = L.divIcon({
    className: "user-marker",
    html: `<div style="width:18px;height:18px;background-color:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 3px rgba(59,130,246,0.3),0 2px 6px rgba(0,0,0,0.3)"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  return (
    <>
      <Polyline positions={positions} pathOptions={{ color: "#2563eb", weight: 4, opacity: 0.8 }} />
      <Marker position={[startPt.lat, startPt.lon]} icon={startIcon}>
        <Popup><span className="font-medium text-green-700">Départ</span>{startPt.ele !== null && <span className="text-gray-500 text-xs ml-1">({startPt.ele} m)</span>}</Popup>
      </Marker>
      <Marker position={[endPt.lat, endPt.lon]} icon={endIcon}>
        <Popup><span className="font-medium text-red-700">Arrivée</span>{endPt.ele !== null && <span className="text-gray-500 text-xs ml-1">({endPt.ele} m)</span>}</Popup>
      </Marker>
      {userPosition && (
        <>
          <Marker position={[userPosition.lat, userPosition.lng]} icon={userIcon}>
            <Popup><span className="font-medium text-gray-700">Vous êtes ici</span></Popup>
          </Marker>
          <Circle center={[userPosition.lat, userPosition.lng]} radius={200} pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.1, weight: 1 }} />
        </>
      )}
    </>
  );
};

// Leaflet map loaded dynamically (avoids SSR window error)
const GpxMap = ({ positions, startPt, endPt }) => {
  const [MapComponents, setMapComponents] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [locating, setLocating] = useState(false);
  const [activeLayer, setActiveLayer] = useState("osm");
  const [showLayerPicker, setShowLayerPicker] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    Promise.all([
      import("react-leaflet"),
      import("leaflet"),
      import("leaflet/dist/leaflet.css"),
    ]).then(([rl, L]) => {
      setMapComponents({ rl, L: L.default || L });
    });
  }, []);

  // Auto-geolocate silently on mount — fit bounds to show both user + trail
  const autoLocated = useRef(false);
  useEffect(() => {
    if (autoLocated.current || !navigator.geolocation) return;
    autoLocated.current = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPosition({ lat: latitude, lng: longitude });
        // Fit bounds to include user position + GPX trace
        const tryFit = () => {
          if (mapRef.current) {
            const L = MapComponents?.L;
            if (L && positions.length > 0) {
              const bounds = L.latLngBounds(positions);
              bounds.extend([latitude, longitude]);
              mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
            }
          } else {
            setTimeout(tryFit, 200);
          }
        };
        tryFit();
      },
      () => {},
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [MapComponents]);

  const doGeolocate = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapRef.current) mapRef.current.flyTo([latitude, longitude], 14, { duration: 1.5 });
        setUserPosition({ lat: latitude, lng: longitude });
        setLocating(false);
      },
      () => {
        setLocating(false);
        alert("Impossible d'obtenir votre position.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  if (!MapComponents) {
    return (
      <div className="h-[400px] md:h-[500px] bg-gray-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">Chargement de la carte...</span>
        </div>
      </div>
    );
  }

  const { MapContainer } = MapComponents.rl;

  return (
    <div className="relative">
      <MapContainer
        center={[startPt.lat, startPt.lon]}
        zoom={13}
        className="w-full h-[400px] md:h-[500px]"
        zoomControl={true}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={true}
        touchZoom={true}
      >
        <GpxMapLayers positions={positions} startPt={startPt} endPt={endPt} L={MapComponents.L} rl={MapComponents.rl} userPosition={userPosition} mapRef={mapRef} activeLayer={activeLayer} />
      </MapContainer>
      {/* Geolocation button */}
      <div style={{ position: "absolute", top: 80, right: 10, zIndex: 1000 }}>
        <button
          onClick={doGeolocate}
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
  );
};

const GpxViewer = ({ gpxUrl, gpxName }) => {
  const [gpxData, setGpxData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fullUrl = getFullUrl(gpxUrl);

  useEffect(() => {
    if (!fullUrl) {
      setLoading(false);
      return;
    }
    fetch(fullUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger le fichier GPX");
        return res.text();
      })
      .then((text) => {
        const { points, metadata } = parseGpx(text);
        if (points.length === 0) throw new Error("Aucun point dans le GPX");
        setGpxData({ points, metadata });
        setStats(computeStats(points));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [fullUrl]);

  const positions = useMemo(
    () => (gpxData ? gpxData.points.map((p) => [p.lat, p.lon]) : []),
    [gpxData]
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">Chargement du tracé GPX...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl border border-red-200 p-6">
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    );
  }

  if (!gpxData || !stats) return null;

  const startPt = gpxData.points[0];
  const endPt = gpxData.points[gpxData.points.length - 1];

  return (
    <div className="space-y-6">
      {/* Map with GPX trace */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Route size={18} className="text-blue-600" />
            Tracé de la randonnée
          </h3>
          {fullUrl && (
            <a
              href={fullUrl}
              download={gpxName || "trace.gpx"}
              className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <Download size={16} />
              Télécharger GPX
            </a>
          )}
        </div>
        <GpxMap positions={positions} startPt={startPt} endPt={endPt} />
      </div>

      {/* Stats grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity size={18} className="text-blue-600" />
          Données techniques
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <StatCard
            icon={Route}
            label="Distance totale"
            value={`${stats.totalDistance.toFixed(2)} km`}
            color="#2563eb"
          />
          {stats.duration && (
            <StatCard
              icon={Activity}
              label="Durée"
              value={formatDuration(stats.duration)}
              color="#7c3aed"
            />
          )}
          {stats.minElevation !== null && (
            <StatCard
              icon={ArrowDown}
              label="Altitude min"
              value={`${stats.minElevation} m`}
              color="#0891b2"
            />
          )}
          {stats.maxElevation !== null && (
            <StatCard
              icon={ArrowUp}
              label="Altitude max"
              value={`${stats.maxElevation} m`}
              color="#059669"
            />
          )}
          {stats.avgElevation !== null && (
            <StatCard
              icon={Mountain}
              label="Altitude moyenne"
              value={`${stats.avgElevation} m`}
              color="#6366f1"
            />
          )}
          <StatCard
            icon={TrendingUp}
            label="Dénivelé positif"
            value={`+${stats.elevGain} m`}
            color="#16a34a"
          />
          <StatCard
            icon={TrendingDown}
            label="Dénivelé négatif"
            value={`-${stats.elevLoss} m`}
            color="#dc2626"
          />
          {stats.avgSlope !== null && (
            <StatCard
              icon={TrendingUp}
              label="Pente moyenne"
              value={`${stats.avgSlope} %`}
              color="#ea580c"
            />
          )}
        </div>

        {/* Detail table */}
        {(stats.minSlope !== null || stats.duration) && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Mesure</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Min</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Max</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Moyenne</th>
                </tr>
              </thead>
              <tbody>
                {stats.minElevation !== null && (
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 font-medium text-gray-700">Altitude</td>
                    <td className="py-2 px-3 text-right text-gray-600">{stats.minElevation} m</td>
                    <td className="py-2 px-3 text-right text-gray-600">{stats.maxElevation} m</td>
                    <td className="py-2 px-3 text-right text-gray-600">{stats.avgElevation} m</td>
                  </tr>
                )}
                {stats.minSlope !== null && (
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 font-medium text-gray-700">Pente</td>
                    <td className="py-2 px-3 text-right text-gray-600">{stats.minSlope} %</td>
                    <td className="py-2 px-3 text-right text-gray-600">{stats.maxSlope} %</td>
                    <td className="py-2 px-3 text-right text-gray-600">{stats.avgSlope} %</td>
                  </tr>
                )}
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-medium text-gray-700">Dénivelé</td>
                  <td className="py-2 px-3 text-right text-green-600 font-medium">+{stats.elevGain} m</td>
                  <td className="py-2 px-3 text-right text-red-600 font-medium">-{stats.elevLoss} m</td>
                  <td className="py-2 px-3 text-right text-gray-600">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Elevation profile chart */}
      {stats.profileData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Mountain size={18} className="text-blue-600" />
            Profil altimétrique
          </h3>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stats.profileData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="altitudeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="distance"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(v) => `${v}`}
                  label={{ value: "km", position: "insideBottomRight", offset: -5, style: { fontSize: 11, fill: "#9ca3af" } }}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(v) => `${v}`}
                  label={{ value: "m", position: "insideTopLeft", offset: -5, style: { fontSize: 11, fill: "#9ca3af" } }}
                  axisLine={{ stroke: "#e5e7eb" }}
                  domain={["auto", "auto"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="altitude"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fill="url(#altitudeGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
            <span>Distance : {stats.totalDistance.toFixed(2)} km</span>
            <span>D+ : {stats.elevGain} m</span>
            <span>D- : {stats.elevLoss} m</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GpxViewer;
