"use client"

import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { setLanguage } from "@/store/features/language/languageSlice"
import type { RootState } from "@/store/store"

export function LanguageSwitcher() {
  const dispatch = useDispatch()
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "vi" : "en"
    dispatch(setLanguage(newLanguage))
    localStorage.setItem("language", newLanguage)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="fixed top-4 right-4"
    >
      {currentLanguage.toUpperCase()}
    </Button>
  )
} 