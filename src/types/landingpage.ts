export interface RootLandingPage {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Hero: Hero;
  Agenda: Agenda;
  CarteInteractive: CarteInteractive;
  LesIncontournables: LesIncontournables;
  DecouvrezLeTerritoire: DecouvrezLeTerritoire;
  Sejourner: Sejourner;
  LesPlages: LesPlages;
  ArtisanatEtProduitsDuTerroir: ArtisanatEtProduitsDuTerroir;
  ActiviteLoisir: ActiviteLoisir;
  InformationsPratiques: InformationsPratiques;
}

export interface Hero {
  id: number;
  texte: string;
  images: Image[];
  Boutons: Bouton[];
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Formats {
  thumbnail: Thumbnail;
  small: Small;
  medium?: Medium;
  large?: Large;
}

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Large {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Bouton {
  id: number;
  Label: string;
  Lien: string;
  Couleur?: string;
  TexteColor?: string;
  BorderColor?: string;
}

export interface Agenda {
  id: number;
  Titre: string;
  Description: string;
}

export interface CarteInteractive {
  id: number;
  Titre: string;
  Description: string;
  Bouton: Bouton2;
  image: Image2;
}

export interface Bouton2 {
  id: number;
  Label: string;
  Lien: string;
  Couleur: any;
  TexteColor: string;
  BorderColor: any;
}

export interface Image2 {
  id: number;
  documentId: string;
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats2;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Formats2 {
  thumbnail: Thumbnail2;
  small: Small2;
  medium: Medium2;
  large: Large2;
}

export interface Thumbnail2 {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Small2 {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Medium2 {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Large2 {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface LesIncontournables {
  id: number;
  Titre: string;
  SousTitre1: string;
  SousTitre2: string;
}

export interface DecouvrezLeTerritoire {
  id: number;
  Titre: string;
  Description: string;
  Stat1: string;
  DescriptionStat1: string;
  Stat2: string;
  DescriptionStat2: string;
  media: Medum[];
}

export interface Medum {
  id: number;
  documentId: string;
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats3;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Formats3 {
  thumbnail: Thumbnail3;
  small: Small3;
  medium: Medium3;
  large: Large3;
}

export interface Thumbnail3 {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Small3 {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Medium3 {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Large3 {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Sejourner {
  id: number;
  Titre: string;
  Bouton: Bouton3;
}

export interface Bouton3 {
  id: number;
  Label: string;
  Lien: string;
  Couleur: any;
  TexteColor: string;
  BorderColor: any;
}

export interface LesPlages {
  id: number;
  Titre: string;
  Description: string;
  bouton: Bouton4;
}

export interface Bouton4 {
  id: number;
  Label: string;
  Lien: string;
  Couleur: any;
  TexteColor: string;
  BorderColor: any;
}

export interface ArtisanatEtProduitsDuTerroir {
  id: number;
  Titre: string;
  bouton: Bouton5;
}

export interface Bouton5 {
  id: number;
  Label: string;
  Lien: string;
  Couleur: any;
  TexteColor: string;
  BorderColor: any;
}

export interface ActiviteLoisir {
  id: number;
  Titre: string;
}

export interface InformationsPratiques {
  id: number;
  Titre: string;
}

export interface Meta {}
