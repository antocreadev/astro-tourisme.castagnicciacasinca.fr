import React, { useState, useEffect, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { getImageUrl } from "../../utils/imageUtils";
import { CommuneLink } from "../../utils/communeUtils.jsx";
import {
  Mountain,
  Clock,
  Route,
  TrendingUp,
  MapPin,
  ArrowLeft,
  Star,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

const GpxViewer = lazy(() => import("./GpxViewer.jsx"));

const CMS_URL = "https://cms.castagnicciacasinca.fr";
const getFullGpxUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${CMS_URL}${url}`;
};

const RandonneeDetail = ({ randonnee }) => {
  const images = randonnee.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gpxDepartCoords, setGpxDepartCoords] = useState(null);

  // Load GPX to extract departure point (first track point)
  useEffect(() => {
    const gpxUrl = getFullGpxUrl(randonnee.GPX?.url);
    if (!gpxUrl) return;

    fetch(gpxUrl)
      .then((res) => {
        if (!res.ok) throw new Error("GPX load failed");
        return res.text();
      })
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "application/xml");
        const firstPt = doc.querySelector("trkpt");
        if (firstPt) {
          const lat = parseFloat(firstPt.getAttribute("lat"));
          const lon = parseFloat(firstPt.getAttribute("lon"));
          if (!isNaN(lat) && !isNaN(lon)) {
            setGpxDepartCoords({ lat, lng: lon });
          }
        }
      })
      .catch(() => {});
  }, [randonnee.GPX?.url]);
  const currentImage = images[currentIndex];
  const imageUrl = currentImage
    ? getImageUrl(
        currentImage.formats?.large ||
          currentImage.formats?.medium ||
          currentImage
      )
    : null;
  const goPrev = () =>
    setCurrentIndex((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  const goNext = () =>
    setCurrentIndex((idx) => (idx === images.length - 1 ? 0 : idx + 1));

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "facile":
        return "bg-green-100 text-green-800";
      case "moyen":
        return "bg-yellow-100 text-yellow-800";
      case "difficile":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Priority: 1. GPX first point → 2. depart field → 3. GPS string
  const getDepartureCoords = () => {
    if (gpxDepartCoords) return gpxDepartCoords;
    if (randonnee.depart?.lat && randonnee.depart?.lng) return randonnee.depart;
    if (randonnee.GPS) {
      const parts = randonnee.GPS.split(",").map((c) => c.trim());
      if (parts.length === 2) return { lat: parseFloat(parts[0]), lng: parseFloat(parts[1]) };
    }
    return null;
  };

  const handleGPSClick = () => {
    const coords = getDepartureCoords();
    if (coords) {
      window.open(
        `https://maps.google.com/maps?q=${coords.lat},${coords.lng}`,
        "_blank"
      );
    }
  };

  const hasGps = gpxDepartCoords || randonnee.depart?.lat || randonnee.GPS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>

        {/* Top section: images + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Image gallery */}
          <div className="lg:col-span-2">
            {imageUrl && (
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={imageUrl}
                  alt={currentImage?.alternativeText || randonnee.Nom}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl font-bold mb-2">{randonnee.Nom}</h1>
                  <p className="text-lg opacity-90">
                    <CommuneLink
                      communeName={randonnee.commune?.Nom}
                      className="text-white hover:text-blue-200"
                    />
                  </p>
                </div>
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goPrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-900 p-2 rounded-full"
                      aria-label="Image précédente"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={goNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-900 p-2 rounded-full"
                      aria-label="Image suivante"
                    >
                      <ChevronRight size={22} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentIndex(i)}
                          className={`w-3 h-3 rounded-full border border-white ${i === currentIndex ? "bg-white" : "bg-white/50"}`}
                          aria-label={`Image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
                {images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <ImageIcon size={14} /> {currentIndex + 1}/{images.length}
                  </div>
                )}
              </div>
            )}
            {!imageUrl && (
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{randonnee.Nom}</h1>
                {randonnee.commune?.Nom && (
                  <p className="text-lg text-gray-600">
                    <CommuneLink communeName={randonnee.commune.Nom} />
                  </p>
                )}
              </div>
            )}
            {images.length > 1 && (
              <div className="grid grid-cols-6 gap-2 mt-3">
                {images.map((img, i) => (
                  <button
                    key={img.id || i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-16 rounded overflow-hidden border ${i === currentIndex ? "ring-2 ring-blue-500 border-blue-500" : "border-transparent"}`}
                  >
                    <img
                      src={getImageUrl(
                        img.formats?.thumbnail || img.formats?.small || img
                      )}
                      alt={img.alternativeText || randonnee.Nom}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technical info compact */}
            {(randonnee.Difficulte ||
              randonnee.Duree ||
              randonnee.Distance ||
              randonnee.Denivele) && (
              <Card>
                <CardHeader>
                  <CardTitle>Informations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {randonnee.Difficulte && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Difficulté</p>
                          <Badge
                            className={`text-xs ${getDifficultyColor(randonnee.Difficulte)}`}
                          >
                            {randonnee.Difficulte}
                          </Badge>
                        </div>
                      </div>
                    )}
                    {randonnee.Duree && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Durée</p>
                          <p className="text-sm font-medium">{randonnee.Duree}</p>
                        </div>
                      </div>
                    )}
                    {randonnee.Distance && (
                      <div className="flex items-center gap-2">
                        <Route className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Distance</p>
                          <p className="text-sm font-medium">{randonnee.Distance}</p>
                        </div>
                      </div>
                    )}
                    {randonnee.Denivele && (
                      <div className="flex items-center gap-2">
                        <Mountain className="h-4 w-4 text-orange-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Dénivelé</p>
                          <p className="text-sm font-medium">{randonnee.Denivele}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Commune */}
            {randonnee.commune && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Localisation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-lg">
                    <CommuneLink communeName={randonnee.commune.Nom} />
                  </p>
                  {randonnee.commune.description && (
                    <p className="text-gray-600 mt-2 text-sm">
                      {randonnee.commune.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {hasGps && (
                  <Button
                    onClick={handleGPSClick}
                    className="w-full flex items-center gap-2"
                    variant="outline"
                  >
                    <MapPin className="h-4 w-4" />
                    Voir le point de départ
                  </Button>
                )}
                {randonnee.GPX?.url && (
                  <a
                    href={
                      randonnee.GPX.url.startsWith("http")
                        ? randonnee.GPX.url
                        : `https://cms.castagnicciacasinca.fr${randonnee.GPX.url}`
                    }
                    download={randonnee.GPX.name || "trace.gpx"}
                    className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    Télécharger le GPX
                  </a>
                )}
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Description full width */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mountain className="h-5 w-5" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {randonnee.Description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Conseils */}
        {randonnee.Conseils && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Conseils pratiques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {randonnee.Conseils}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* GPX Viewer: full width */}
        {randonnee.GPX?.url && (
          <Suspense
            fallback={
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-gray-600">
                  Chargement du tracé GPX...
                </span>
              </div>
            }
          >
            <GpxViewer
              gpxUrl={randonnee.GPX.url}
              gpxName={randonnee.GPX.name}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default RandonneeDetail;
