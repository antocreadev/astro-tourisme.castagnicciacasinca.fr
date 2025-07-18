export interface RootPlage {
  data: Daum[];
  meta: Meta;
}

export interface Daum {
  id: number;
  documentId: string;
  Nom: string;
  Description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Coordonnees: Coordonnees;
  Niveau: number;
  commune: Commune;
  Image: Image;
}

export interface Coordonnees {
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
  medium: Medium;
  large: Large;
  small: Small;
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

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
