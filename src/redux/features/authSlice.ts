import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

// Interfaces pour l'utilisateur et l'état d'authentification
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// URL de base de l'API (définie dans .env)
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

// Inscription
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // console.log("Envoi de la requête d'inscription:", userData); // Débogage
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      // console.log("Réponse du serveur:", response.data); // Débogage
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error: any) {
      console.error(
        "Erreur lors de l'inscription:",
        error.response?.data || error.message
      ); // Débogage
      return rejectWithValue(
        error.response?.data?.message || "Échec de l'inscription"
      );
    }
  }
);

// Connexion
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Échec de la connexion"
      );
    }
  }
);

// Récupération du profil
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Échec de la récupération du profil"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Inscription
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<User & { token: string }>) => {
          state.loading = false;
          state.user = {
            _id: action.payload._id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
          };
          state.token = action.payload.token;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Connexion
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<User & { token: string }>) => {
          state.loading = false;
          state.user = {
            _id: action.payload._id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
          };
          state.token = action.payload.token;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Profil
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
