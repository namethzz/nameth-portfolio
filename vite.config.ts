import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The Pages workflow supplies the repository name. Other hosts use the root.
const pagesRepository = process.env.GITHUB_PAGES_REPO;
const pagesBase = pagesRepository && !pagesRepository.endsWith(".github.io")
  ? `/${pagesRepository}/`
  : "/";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || pagesBase,
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  build: {
    // Keep v1 as the homepage; emit v2 as a separate, reviewable preview.
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("./index.html", import.meta.url)),
        previewV2: fileURLToPath(new URL("./preview-v2.html", import.meta.url)),
      },
    },
  },
});
