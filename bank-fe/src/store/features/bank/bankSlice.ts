import { createSlice } from "@reduxjs/toolkit";
import { getBanks } from "./action";

interface BankState {
  banks: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BankState = {
  banks: [],
  loading: false,
  error: null,
};

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setBanks: (state, action: any) => {
      state.banks = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanks.fulfilled, (state, action) => {
        state.loading = false;
        state.banks = action.payload;
        state.error = null;
      })
      .addCase(getBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBanks } = bankSlice.actions;
export default bankSlice.reducer;
