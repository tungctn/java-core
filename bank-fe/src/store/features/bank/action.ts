import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/API";
import { getAuthToken } from "@/lib/axios";

// Create async thunk for getting user login data
export const getBanks = createAsyncThunk(
  "bank/banks",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }
      const res = await API.Bank.list();
      return res?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load user data"
      );
    }
  }
);
