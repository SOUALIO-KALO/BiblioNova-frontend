export interface IBook {
  bookId: string; // Identifiant unique (doit correspondre à l'API)
  title: string; // Utilisé comme bookTitle
  authors: string;
  imageUrl: string; // Utilisé comme bookCover
  category: string;
  language: string;
  pageCount: number;
  description?: string;
  previewLink?: string;
} // Define the IBook interface for book objects
// This interface represents the structure of a book object in the application

export interface IBooksState {
  books: IBook[];
  query: string;
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  categories: string[];
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

// Borrow interface for borrowed books
// This interface represents the structure of a borrowed book object in the application
export interface Borrow {
  _id: string;
  user: string;
  bookId: string;
  bookTitle: string;
  bookCover: string;
  bookDetails?: string; // Optional book details
  borrowDate: string;
  returnDate: string;
  isReturned: boolean;
}

// Types existants
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}
