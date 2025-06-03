import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./features/booksSlice";
import authReducer from "./features/authSlice";
import borrowReducer from "./features/borrowSlice";
import type { IBooksState } from "@/types/types";

// Définir le type de l'état global
export interface RootState {
  books: IBooksState; // Remplacer par vos propres slices
  auth: ReturnType<typeof authReducer>; // Ajouter le type du reducer d'authentification
  borrow: ReturnType<typeof borrowReducer>; // Ajouter le type du reducer de gestion des emprunts
}

// Configurer le store
export const store = configureStore({
  reducer: {
    books: booksReducer, // Ajouter vos reducers ici
    auth: authReducer, // Ajouter le reducer d'authentification
    borrow: borrowReducer, // Ajouter le reducer de gestion des emprunts
  },
});

// Définir le type pour le dispatch
export type AppDispatch = typeof store.dispatch;
// Exporter le store
export default store;
