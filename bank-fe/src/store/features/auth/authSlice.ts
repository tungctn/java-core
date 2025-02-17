import { createSlice } from "@reduxjs/toolkit";
import { getUserLogin } from "./action";

// interface User {
//   id: string;
//   email: string;
//   name: string;
// }

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: any) => {
      state.user = action?.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
