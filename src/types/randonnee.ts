export interface RootRandonnee {
  data: Randonnee[];
  meta: Meta;
}

export interface Randonnee {
  id: number;
  documentId: string;
  Nom: string;
  Description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  depart?: Depart;
  commune?: Commune;
  GPX?: GpxFile;
  images?: Image[];
  Difficulte?: string;
  Duree?: string;
  Distance?: string;
  Denivele?: string;
  Conseils?: string;
  GPS?: string;
}

export interface Depart {
  lat: number;
  lng: number;
}

export interface Commune {
  id: number;
  documentId: string;
  Nom: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  coordonnees: any;
}

export interface GpxFile {
  id: number;
  documentId: string;
  name: string;
  alternativeText: any;
  caption: any;
  width: any;
  height: any;
  formats: any;
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

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats?: Formats;
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
  thumbnail?: FormatDetail;
  small?: FormatDetail;
  medium?: FormatDetail;
  large?: FormatDetail;
}

export interface FormatDetail {
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

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
