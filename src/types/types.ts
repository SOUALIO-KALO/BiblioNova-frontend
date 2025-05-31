export interface IBook {
  id: string;
  title: string;
  author: string;
  description?: string;
  coverUrl?: string;
  publishedDate?: string;
  pageCount?: number;
  language?: string;
  category?: string;
}

export interface IBooksState {
  books: IBook[];
  query: string;
  loading: boolean;
  error: string | null;
}
