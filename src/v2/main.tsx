import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "@/lib/language";
import Site from "@/src/folio/Site";
import "@/src/globals.css";
import "@/src/folio/folio.css";
import "@/src/folio/hero.css";
import "@/src/folio/sections.css";
import "@/src/folio/project.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root");

createRoot(root).render(
  <StrictMode>
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  </StrictMode>,
);
