export interface RootGlobal {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  BarreDeNavigation: BarreDeNavigation;
}

export interface BarreDeNavigation {
  id: number;
  logo: Logo;
  page_de_sections: PageDeSection[];
}

export interface Logo {
  id: number;
  lien: string;
  image: Image;
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
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
  medium: Medium;
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

export interface PageDeSection {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Titre: string;
  Description: string;
  LienVersLaPage: string;
}

export interface Meta {}