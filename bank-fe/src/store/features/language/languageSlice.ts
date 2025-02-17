import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  currentLanguage: "en" | "vi";
}

const initialState: LanguageState = {
  currentLanguage: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"en" | "vi">) => {
      state.currentLanguage = action.payload;
      localStorage.setItem("language", action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
