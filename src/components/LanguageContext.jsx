import { createContext, useContext, useState } from "react";
import { translations } from "../data/content.js";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("fr");

  const toggleLanguage = (newLang) => {
    if (newLang) {
      setLang(newLang);
    } else {
      setLang((prev) => (prev === "fr" ? "ht" : "fr"));
    }
  };

  const t = translations[lang] || translations.fr;

  return (
    <LanguageContext.Provider value={{ lang, setLang: toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
