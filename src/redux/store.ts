import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./features/booksSlice";
import type { IBooksState } from "@/types/types";

// Définir le type de l'état global
export interface RootState {
  books: IBooksState; // Remplacer par vos propres slices
}

// Configurer le store
export const store = configureStore({
  reducer: {
    books: booksReducer, // Ajouter vos reducers ici
  },
});

// Définir le type pour le dispatch
export type AppDispatch = typeof store.dispatch;
// Exporter le store
export default store;
