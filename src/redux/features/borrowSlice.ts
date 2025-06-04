import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { Borrow } from "@/types/types";
import type { RootState } from "../store";
import { toast } from "react-toastify";

interface BorrowState {
  borrows: Borrow[];
  loading: boolean;
  error: string | null;
}

const initialState: BorrowState = {
  borrows: [],
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/";

// Emprunter un livre
export const borrowBook = createAsyncThunk(
  "borrow/borrowBook",
  async (
    bookData: {
      bookId: string;
      bookTitle: string;
      bookCover: string;
      bookDetails?: string; // Détails du livre optionnels
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const response = await axios.post(`${API_URL}/borrows`, bookData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Échec de l'emprunt"
      );
    }
  }
);

// Retourner un livre
export const returnBook = createAsyncThunk(
  "borrow/returnBook",
  async (borrowId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const response = await axios.patch(
        `${API_URL}/borrows/return/${borrowId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Échec du retour"
      );
    }
  }
);

// Récupérer les emprunts de l'utilisateur
export const getUserBorrows = createAsyncThunk(
  "borrow/getUserBorrows",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const response = await axios.get(`${API_URL}/borrows/my-borrows`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Si un message est présent, afficher une notification
      if (response.data.message) {
        toast.info(response.data.message);
      }

      return response.data.borrows || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Échec de la récupération des emprunts"
      );
    }
  }
);

// Prolonger un emprunt
export const extendBorrow = createAsyncThunk(
  "borrow/extendBorrow",
  async ({ borrowId }: { borrowId: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const borrow = state.borrow.borrows.find((b) => b._id === borrowId);

      if (!borrow) {
        return rejectWithValue("Emprunt non trouvé");
      }

      const newReturnDate = new Date(borrow.returnDate);
      newReturnDate.setDate(newReturnDate.getDate() + 7); // Prolongation de 1 semaines

      const response = await axios.patch(
        `${API_URL}/borrows/extend/${borrowId}`,
        { newReturnDate: newReturnDate.toISOString() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Échec de la prolongation"
      );
    }
  }
);

// Supprimer un emprunt
export const deleteBorrow = createAsyncThunk(
  "borrow/deleteBorrow",
  async (borrowId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      const response = await axios.delete(`${API_URL}/borrows/${borrowId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message);
      return borrowId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Échec de la suppression"
      );
    }
  }
);

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Emprunter un livre
    builder
      .addCase(borrowBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(borrowBook.fulfilled, (state, action: PayloadAction<Borrow>) => {
        state.loading = false;
        state.borrows.push(action.payload);
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Retourner un livre
    builder
      .addCase(returnBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(returnBook.fulfilled, (state, action: PayloadAction<Borrow>) => {
        state.loading = false;
        const index = state.borrows.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.borrows[index] = action.payload;
        }
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Récupérer les emprunts
    builder
      .addCase(getUserBorrows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserBorrows.fulfilled,
        (state, action: PayloadAction<Borrow[]>) => {
          state.loading = false;
          state.borrows = action.payload;
        }
      )
      .addCase(getUserBorrows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Prolonger un emprunt
    builder
      .addCase(extendBorrow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        extendBorrow.fulfilled,
        (state, action: PayloadAction<Borrow>) => {
          state.loading = false;
          const index = state.borrows.findIndex(
            (b) => b._id === action.payload._id
          );
          if (index !== -1) {
            state.borrows[index] = action.payload;
          }
        }
      )
      .addCase(extendBorrow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Supprimer un emprunt
    builder
      .addCase(deleteBorrow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBorrow.fulfilled, (state, action) => {
        state.loading = false;
        state.borrows = state.borrows.filter(
          (borrow) => borrow._id !== action.payload
        );
      })
      .addCase(deleteBorrow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = borrowSlice.actions;
export default borrowSlice.reducer;
