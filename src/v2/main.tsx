import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "@/lib/language";
import StatusSite from "@/src/sw/StatusSite";
import "@/src/globals.css";
import "@/src/sw/status.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root");

createRoot(root).render(
  <StrictMode>
    <LanguageProvider>
      <StatusSite />
    </LanguageProvider>
  </StrictMode>,
);
