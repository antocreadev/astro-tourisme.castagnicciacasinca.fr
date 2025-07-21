import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { getImageUrl } from "../../utils/imageUtils";
import { 
  Waves, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  ExternalLink,
  Star,
  Users,
  Package,
  AlertCircle,
  Euro
} from "lucide-react";

const ActiviteNautiqueDetail = ({ activite }) => {
  const imageUrl = getImageUrl(activite.Image);
  
  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'plongée':
        return 'bg-blue-100 text-blue-800';
      case 'kayak':
        return 'bg-green-100 text-green-800';
      case 'voile':
        return 'bg-purple-100 text-purple-800';
      case 'surf':
        return 'bg-orange-100 text-orange-800';
      case 'paddle':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNiveauColor = (niveau) => {
    switch (niveau?.toLowerCase()) {
      case 'débutant':
        return 'bg-green-100 text-green-800';
      case 'intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'avancé':
      case 'expert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGPSClick = () => {
    if (activite.GPS) {
      const gpsCoords = activite.GPS.split(',').map(coord => coord.trim());
      if (gpsCoords.length === 2) {
        window.open(`https://maps.google.com/maps?q=${gpsCoords[0]},${gpsCoords[1]}`, '_blank');
      }
    }
  };

  const handleLinkClick = () => {
    if (activite.Lien?.lien) {
      window.open(activite.Lien.lien, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
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
                  alt={activite.Nom}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl font-bold mb-2">{activite.Nom}</h1>
                  <p className="text-lg opacity-90">{activite.commune?.Nom}</p>
                </div>
                <div className="absolute top-6 right-6 flex gap-2">
                  {activite.Type && (
                    <Badge className={getTypeColor(activite.Type)}>
                      {activite.Type}
                    </Badge>
                  )}
                  {activite.Niveau && (
                    <Badge className={getNiveauColor(activite.Niveau)}>
                      {activite.Niveau}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{activite.Description}</p>
              </CardContent>
            </Card>

            {/* Informations détaillées */}
            <Card>
              <CardHeader>
                <CardTitle>Informations pratiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activite.Duree && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Durée</p>
                        <p className="text-gray-600">{activite.Duree}</p>
                      </div>
                    </div>
                  )}
                  
                  {activite.Prix && (
                    <div className="flex items-center gap-3">
                      <Euro className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Prix</p>
                        <p className="text-gray-600">{activite.Prix}</p>
                      </div>
                    </div>
                  )}
                  
                  {activite.Niveau && (
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">Niveau requis</p>
                        <Badge className={getNiveauColor(activite.Niveau)}>
                          {activite.Niveau}
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  {activite.Type && (
                    <div className="flex items-center gap-3">
                      <Waves className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Type d'activité</p>
                        <Badge className={getTypeColor(activite.Type)}>
                          {activite.Type}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Équipement */}
            {activite.Equipement && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Équipement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{activite.Equipement}</p>
                </CardContent>
              </Card>
            )}

            {/* Conseils */}
            {activite.Conseils && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Conseils pratiques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{activite.Conseils}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations commune */}
            {activite.commune && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Localisation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-lg">{activite.commune.Nom}</p>
                  {activite.commune.description && (
                    <p className="text-gray-600 mt-2">{activite.commune.description}</p>
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
                {activite.GPS && (
                  <Button
                    onClick={handleGPSClick}
                    className="w-full flex items-center gap-2"
                    variant="outline"
                  >
                    <MapPin className="h-4 w-4" />
                    Voir sur la carte
                  </Button>
                )}
                
                {activite.Lien?.lien && (
                  <Button
                    onClick={handleLinkClick}
                    className="w-full flex items-center gap-2"
                    variant="outline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Réserver / Plus d'infos
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Informations supplémentaires */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activite.Prix && (
                  <div>
                    <p className="text-sm font-medium">Prix</p>
                    <p className="text-sm text-gray-600">{activite.Prix}</p>
                  </div>
                )}
                
                {activite.Duree && (
                  <div>
                    <p className="text-sm font-medium">Durée</p>
                    <p className="text-sm text-gray-600">{activite.Duree}</p>
                  </div>
                )}
                
                {activite.GPS && (
                  <div>
                    <p className="text-sm font-medium">Coordonnées GPS</p>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {activite.GPS}
                    </code>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiviteNautiqueDetail;
