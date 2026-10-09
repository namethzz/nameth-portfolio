import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "@/lib/language";
import PortfolioV2 from "@/src/v2/PortfolioV2";
import "@/src/globals.css";
import "@/src/v2/styles/tokens.css";
import "@/src/v2/styles/portfolio.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root");

createRoot(root).render(
  <StrictMode>
    <LanguageProvider>
      <PortfolioV2 />
    </LanguageProvider>
  </StrictMode>,
);
