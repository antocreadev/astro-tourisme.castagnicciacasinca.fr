export interface RootTypeEvenements {
  data: TypeEvenementItem[];
  meta: Meta;
}

export interface TypeEvenementItem {
  id: number;
  documentId: string;
  Nom: string;
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
