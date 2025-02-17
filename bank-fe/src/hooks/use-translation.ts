import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

const translations = { en, vi };

export function useTranslation() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations[currentLanguage];

    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }

    return value;
  };

  return { t };
}
