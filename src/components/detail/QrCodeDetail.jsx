import { MapPin, ArrowLeft, Share2, QrCode, ExternalLink, Navigation, Locate, Map as MapIcon, Car } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

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

const formatDistance = (km) => km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;

function NavigationModal({ isOpen, onClose, lat, lng, name }) {
  if (!isOpen) return null;

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d${name ? `&q=${encodeURIComponent(name)}` : ''}`;
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">S'y rendre</h3>
          <p className="text-sm text-gray-500 mb-4">Choisissez votre application</p>
          <div className="space-y-3">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors w-full">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Google Maps</p>
                <p className="text-xs text-gray-500">Itinéraire via Google Maps</p>
              </div>
            </a>
            <a href={appleMapsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors w-full">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Plans (Apple)</p>
                <p className="text-xs text-gray-500">Itinéraire via Plans</p>
              </div>
            </a>
            <a href={wazeUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors w-full">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Waze</p>
                <p className="text-xs text-gray-500">Itinéraire via Waze</p>
              </div>
            </a>
          </div>
        </div>
        <button onClick={onClose} className="w-full py-4 text-center text-gray-500 font-medium border-t hover:bg-gray-50 transition-colors">
          Annuler
        </button>
      </div>
    </div>
  );
}

function MiniMap({ lat, lng, title, userPosition }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || loaded) return;
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');
      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        zoomControl: false,
        scrollWheelZoom: true,
        dragging: true,
        doubleClickZoom: true,
        attributionControl: false,
      }).setView([lat, lng], 14);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      const qrSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>`;
      const poiIcon = L.divIcon({
        className: 'qrcode-marker',
        html: `<div style="background:#2563eb;width:32px;height:32px;border-radius:8px;border:3px solid white;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3);color:white;">${qrSvg}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
      L.marker([lat, lng], { icon: poiIcon }).addTo(map);

      if (userPosition) {
        const userIcon = L.divIcon({
          className: 'user-marker',
          html: `<div style="width:14px;height:14px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 3px rgba(59,130,246,0.3);"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        L.marker([userPosition.lat, userPosition.lng], { icon: userIcon }).addTo(map);
        const bounds = L.latLngBounds([[lat, lng], [userPosition.lat, userPosition.lng]]);
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      }

      setLoaded(true);
    })();

    return () => { cancelled = true; };
  }, [lat, lng, userPosition]);

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-48 rounded-lg overflow-hidden bg-gray-100" style={{ zIndex: 0 }} />
    </div>
  );
}

export default function QrCodeDetail({ qrCode, allQrCodes = [] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [navModalOpen, setNavModalOpen] = useState(false);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {},
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  if (!qrCode) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Point d'intérêt non trouvé</h1>
          <a href="/qr-codes" className="text-blue-600 hover:text-blue-800">← Retour aux points d'intérêt</a>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: qrCode.title, url: window.location.href }); } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const renderBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return null;
    return blocks.map((block, i) => {
      if (block.type === 'paragraph') {
        const text = block.children?.map((child) => {
          let c = child.text || '';
          if (child.bold) c = `<strong>${c}</strong>`;
          if (child.italic) c = `<em>${c}</em>`;
          if (child.underline) c = `<u>${c}</u>`;
          return c;
        }).join('') || '';
        return <p key={i} className="text-gray-700 mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />;
      }
      if (block.type === 'heading') {
        const text = block.children?.map(c => c.text).join('') || '';
        const Tag = `h${block.level || 2}`;
        return <Tag key={i} className="font-bold text-gray-900 mb-2 mt-4">{text}</Tag>;
      }
      if (block.type === 'list') {
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={i} className={`mb-3 ml-6 ${block.format === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
            {block.children?.map((item, j) => (
              <li key={j} className="text-gray-700 mb-1">{item.children?.map(c => c.text).join('')}</li>
            ))}
          </ListTag>
        );
      }
      return null;
    });
  };

  const images = qrCode.images || [];
  const currentImage = images[currentImageIndex]?.url || qrCode.image;
  const hasCoords = qrCode.coordonnees?.lat && qrCode.coordonnees?.lng;

  const distFromUser = (hasCoords && userPosition)
    ? getDistance(userPosition.lat, userPosition.lng, qrCode.coordonnees.lat, qrCode.coordonnees.lng)
    : null;

  const nearbyItems = allQrCodes
    .filter((item) => item.documentId !== qrCode.documentId && item.coordonnees?.lat && item.coordonnees?.lng)
    .map((item) => ({
      ...item,
      _distFromHere: hasCoords ? getDistance(qrCode.coordonnees.lat, qrCode.coordonnees.lng, item.coordonnees.lat, item.coordonnees.lng) : null,
      _distFromUser: userPosition ? getDistance(userPosition.lat, userPosition.lng, item.coordonnees.lat, item.coordonnees.lng) : null,
    }))
    .sort((a, b) => (a._distFromHere || 999) - (b._distFromHere || 999))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Retour</span>
              </button>
              <nav className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <a href="/" className="hover:text-gray-700">Accueil</a>
                <span>/</span>
                <a href="/qr-codes" className="hover:text-gray-700">Points d'intérêt</a>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate max-w-[200px]">{qrCode.title}</span>
              </nav>
            </div>
            {/* <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Partager</span>
            </button> */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-200">
                <img
                  src={currentImage || `https://placehold.co/800x450?text=${encodeURIComponent(qrCode.title || 'QR Code')}`}
                  alt={qrCode.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img.url} alt={`${qrCode.title} - Photo ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 mb-3">
                <QrCode className="w-5 h-5" />
                <span className="text-sm font-medium">Point d'intérêt</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{qrCode.title}</h1>
              {qrCode.description && (
                <div className="prose max-w-none">{renderBlocks(qrCode.description)}</div>
              )}
            </div>

            {nearbyItems.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Navigation size={20} className="text-blue-600" />
                  Points d'intérêt à proximité
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {nearbyItems.map((item) => (
                    <a key={item.documentId} href={`/qr-codes/${item.documentId}`}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                      {item.image && (
                        <div className="aspect-video overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      )}
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.title}</h4>
                        {item.commune && <p className="text-sm text-gray-500 mb-1">{item.commune}</p>}
                        {item._distFromHere !== null && (
                          <p className="text-xs text-gray-400">À {formatDistance(item._distFromHere)} d'ici</p>
                        )}
                        {item._distFromUser !== null && (
                          <p className="text-xs text-blue-500 font-medium">À {formatDistance(item._distFromUser)} de vous</p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {hasCoords && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Localisation</h3>
                <MiniMap lat={qrCode.coordonnees.lat} lng={qrCode.coordonnees.lng} title={qrCode.title} userPosition={userPosition} />
                {qrCode.commune && (
                  <div className="flex items-center gap-2 text-gray-600 mt-3">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{qrCode.commune}</span>
                  </div>
                )}
                {distFromUser !== null && (
                  <div className="flex items-center gap-2 mt-1 ml-6">
                    <Locate className="w-3 h-3 text-blue-500" />
                    <p className="text-xs text-blue-500 font-medium">À {formatDistance(distFromUser)} de vous</p>
                  </div>
                )}
                <button
                  onClick={() => setNavModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                >
                  <Navigation className="w-4 h-4" />
                  <span>S'y rendre</span>
                </button>
              </div>
            )}

            {qrCode.site && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Site associé</h3>
                <a href={`/sites/${qrCode.site.documentId}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
                  <ExternalLink className="w-4 h-4" />
                  <span>{qrCode.site.Titre || 'Voir le site'}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {hasCoords && (
        <NavigationModal isOpen={navModalOpen} onClose={() => setNavModalOpen(false)}
          lat={qrCode.coordonnees.lat} lng={qrCode.coordonnees.lng} name={qrCode.title} />
      )}
    </div>
  );
}
