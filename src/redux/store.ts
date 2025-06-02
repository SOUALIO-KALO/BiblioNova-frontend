import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./features/booksSlice";
import authReducer from "./features/authSlice";
import type { IBooksState } from "@/types/types";

// Définir le type de l'état global
export interface RootState {
  books: IBooksState; // Remplacer par vos propres slices
  auth: ReturnType<typeof authReducer>; // Ajouter le type du reducer d'authentification
}

// Configurer le store
export const store = configureStore({
  reducer: {
    books: booksReducer, // Ajouter vos reducers ici
    auth: authReducer, // Ajouter le reducer d'authentification
  },
});

// Définir le type pour le dispatch
export type AppDispatch = typeof store.dispatch;
// Exporter le store
export default store;
