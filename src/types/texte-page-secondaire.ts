export interface RootTextePageSecondaire {
  data: Data;
  meta: Meta;
}
export interface Data {
  id: number;
  documentId: string;
  titrePlage: string;
  descriptionPlage: string;
  titreArtisanat: string;
  descriptionArtisanat: string;
  titreAgenda: string;
  descriptionAgenda: string;
  titreCarte: string;
  descriptionCarte: string;
  titreSejourner: string;
  descriptionSejourner: string;
  titreRandonnee: string;
  descriptionRandonnee: string;
  titreActiviteNautique: string;
  descriptiontActiviteNautique: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  titreSite: string;
  descriptionSite: string;
}

export interface Meta {}
