import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { getImageUrl } from "../../utils/imageUtils";
import { 
  Mountain, 
  Clock, 
  Route, 
  TrendingUp, 
  MapPin, 
  ArrowLeft, 
  ExternalLink,
  Star 
} from "lucide-react";

const RandonneeDetail = ({ randonnee }) => {
  const imageUrl = getImageUrl(randonnee.image);
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'facile':
        return 'bg-green-100 text-green-800';
      case 'moyen':
        return 'bg-yellow-100 text-yellow-800';
      case 'difficile':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGPSClick = () => {
    if (randonnee.GPS) {
      const gpsCoords = randonnee.GPS.split(',').map(coord => coord.trim());
      if (gpsCoords.length === 2) {
        window.open(`https://maps.google.com/maps?q=${gpsCoords[0]},${gpsCoords[1]}`, '_blank');
      }
    }
  };

  const handleLinkClick = () => {
    if (randonnee.Lien?.lien) {
      window.open(randonnee.Lien.lien, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header avec bouton retour */}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image principale */}
            {imageUrl && (
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={imageUrl}
                  alt={randonnee.Nom}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl font-bold mb-2">{randonnee.Nom}</h1>
                  <p className="text-lg opacity-90">{randonnee.commune?.Nom}</p>
                </div>
              </div>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mountain className="h-5 w-5" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{randonnee.Description}</p>
              </CardContent>
            </Card>

            {/* Informations détaillées */}
            {(randonnee.Difficulte || randonnee.Duree || randonnee.Distance || randonnee.Denivele) && (
              <Card>
                <CardHeader>
                  <CardTitle>Informations techniques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {randonnee.Difficulte && (
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Difficulté</p>
                          <Badge className={getDifficultyColor(randonnee.Difficulte)}>
                            {randonnee.Difficulte}
                          </Badge>
                        </div>
                      </div>
                    )}
                    
                    {randonnee.Duree && (
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Durée</p>
                          <p className="text-gray-600">{randonnee.Duree}</p>
                        </div>
                      </div>
                    )}
                    
                    {randonnee.Distance && (
                      <div className="flex items-center gap-3">
                        <Route className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">Distance</p>
                          <p className="text-gray-600">{randonnee.Distance}</p>
                        </div>
                      </div>
                    )}
                    
                    {randonnee.Denivele && (
                      <div className="flex items-center gap-3">
                        <Mountain className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-medium">Dénivelé</p>
                          <p className="text-gray-600">{randonnee.Denivele}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Conseils et recommandations */}
            {randonnee.Conseils && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Conseils pratiques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{randonnee.Conseils}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations commune */}
            {randonnee.commune && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Localisation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-lg">{randonnee.commune.Nom}</p>
                  {randonnee.commune.description && (
                    <p className="text-gray-600 mt-2">{randonnee.commune.description}</p>
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
                {randonnee.GPS && (
                  <Button
                    onClick={handleGPSClick}
                    className="w-full flex items-center gap-2"
                    variant="outline"
                  >
                    <MapPin className="h-4 w-4" />
                    Voir sur la carte
                  </Button>
                )}
                
                {randonnee.Lien?.lien && (
                  <Button
                    onClick={handleLinkClick}
                    className="w-full flex items-center gap-2"
                    variant="outline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Plus d'infos
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Coordonnées GPS */}
            {randonnee.GPS && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Coordonnées GPS</CardTitle>
                </CardHeader>
                <CardContent>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {randonnee.GPS}
                  </code>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandonneeDetail;
