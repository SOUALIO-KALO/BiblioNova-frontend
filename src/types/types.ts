export interface IBook {
  id: string;
  title: string;
  authors: string;
  description?: string;
  coverUrl?: string;
  publishedDate?: string;
  pageCount?: number;
  language?: string;
  category?: string;
  link: string;
  previewLink: string;
  readLink: string;
}

export interface IBooksState {
  books: IBook[];
  query: string;
  loading: boolean;
  error: string | null;
}

export interface IBookItemProps {
  book: IBook;
}
