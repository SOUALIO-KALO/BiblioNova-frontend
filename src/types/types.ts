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
} // Define the IBook interface for book objects
// This interface represents the structure of a book object in the application

export interface IBooksState {
  books: IBook[];
  query: string;
  loading: boolean;
  error: string | null;
} // Define the IBooksState interface for the books slice state

export interface IBookItemProps {
  book: IBook;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
} // Define the User interface for the authenticated user

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
} // Define the RegisterData interface for user registration data

export interface LoginData {
  email: string;
  password: string;
} // Define the LoginData interface for user login data
