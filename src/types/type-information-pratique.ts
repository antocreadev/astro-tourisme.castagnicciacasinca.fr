export interface RootTypeInformationPratique {
  data: Daum[];
  meta: Meta;
}

export interface Daum {
  id: number;
  documentId: string;
  Titre: string;
  Description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Icone: Icone;
  Lien: Lien;
}

export interface Icone {
  id: number;
  documentId: string;
  name: string;
  alternativeText: any;
  caption: any;
  width?: number;
  height?: number;
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

export interface Lien {
  id: number;
  Label?: string;
  Lien?: string;
  TextColor: any;
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
