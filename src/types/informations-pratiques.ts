export interface RootInformationPratique {
  data: Daum[];
  meta: Meta;
}

export interface Daum {
  id: number;
  documentId: string;
  Texte: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  type_information_pratique: TypeInformationPratique;
}

export interface TypeInformationPratique {
  id: number;
  documentId: string;
  Titre: string;
  Description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
