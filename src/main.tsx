import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "@/lib/language";
import Portfolio from "@/components/portfolio";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider><Portfolio /></LanguageProvider>
  </StrictMode>,
);
