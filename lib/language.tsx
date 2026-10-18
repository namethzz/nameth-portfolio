import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { copy, type CopyKey, type Language } from "@/lib/content";

const STORAGE_KEY = "nameth-portfolio-language";
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: CopyKey) => string;
}>({ language: "en", setLanguage: () => {}, t: (key) => copy[key].en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "th") return saved;
    } catch { /* Language switching still works when browser storage is disabled. */ }
    return "en";
  });
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "th"
      ? "ณเมธ วงค์มงคล — ผลงานและตัวตน"
      : "Nameth Wongmongkol — Full-stack, Data & AI";
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.heroDescription[language]);
    try { window.localStorage.setItem(STORAGE_KEY, language); } catch { /* Optional persistence. */ }
  }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, t: (key) => copy[key][language] }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
