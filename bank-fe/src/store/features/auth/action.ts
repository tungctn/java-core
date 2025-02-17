import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/API";
import { getAuthToken } from "@/lib/axios";

// Create async thunk for getting user login data
export const getUserLogin = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }
      const res = await API.Auth.me();
      console.log("res", res?.data?.data);
      return res?.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load user data"
      );
    }
  }
);
