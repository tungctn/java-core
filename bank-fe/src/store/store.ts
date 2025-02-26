import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import languageReducer from "./features/language/languageSlice";
import bankReducer from "./features/bank/bankSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    bank: bankReducer,
  },
});

// Infer types from store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for TypeScript
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;