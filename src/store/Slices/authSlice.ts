import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../Axios/axiosInstance";

// ===============================
// TYPES
// ===============================
interface LoginPayload {
  rollNo: string;
  password: string;
}

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// ===============================
// LOGIN THUNK
// ===============================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ rollNo, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { rollNo, password });

      const { accessToken, refreshToken, user } = res.data;

      // Save tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

    

      return user;
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Login failed";

      return rejectWithValue(msg);
    }
  }
);

// ===============================
// SLICE
// ===============================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout,setUser } = authSlice.actions;
export default authSlice.reducer;
