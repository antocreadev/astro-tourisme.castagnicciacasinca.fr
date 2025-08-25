export interface RootColorTexte {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  documentId: string;
  fondBarreNavigation: string;
  texteBarreNavigation: string;
  texteHeroSection: string;
  texteAgenda: string;
  FondAgenda: string;
  fondElementAgenda: string;
  fondCarteInteractive: string;
  texteCarteInteractive: string;
  fondIncontournables: string;
  texteIncontournables: string;
  fondDecouvrezLeTerritoire: string;
  texteDecouvrezLeTerritoire: string;
  fondSejourner: string;
  texteSejourner: string;
  fondElementSejourner: string;
  FondPlages: string;
  textePlages: string;
  FondArtisanat: string;
  texteArtisanat: string;
  fondActivites: string;
  texteActivites: string;
  fondElementActivites: string;
  fondGuidesNumeriques: string;
  texteGuidesNumeriques: string;
  fondElementGuidesNumeriques: string;
  texteInformationsPratiques: string;
  fondInformationsPratiques: string;
  fondElementInformationsPratiques: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Meta {}
