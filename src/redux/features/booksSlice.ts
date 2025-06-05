import type { IBook, IBooksState } from "@/types/types";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

// État initial
const initialState: IBooksState = {
  books: [],
  query: "",
  loading: false,
  error: null,
  selectedCategory: "",
  categories: [],
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/";

// Action asynchrone pour récupérer les livres
export const fetchBooks = createAsyncThunk<
  IBook[],
  string,
  { rejectValue: string }
>("books/fetchBooks", async (query, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${API_URL}/books/search?q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data.error || "Failed to fetch books");
    }
    return data || [];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch books"
    );
  }
});

// Créer le slice
const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Rechercher un livre
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBooks.fulfilled,
        (state, action: PayloadAction<IBook[]>) => {
          state.loading = false;
          state.books = action.payload;
          // Extraire les catégories uniques des livres
          const uniqueCategories = Array.from(
            new Set(
              action.payload
                .map((book) => book.category)
                .filter((category) => category && category !== "Inconnu")
            )
          );
          state.categories = uniqueCategories;
        }
      )
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

// Exporter les actions et le reducer
export const { setQuery, setSelectedCategory, setCategories } =
  booksSlice.actions;
export default booksSlice.reducer;
