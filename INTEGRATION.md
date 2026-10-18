# Code structure

React, TypeScript, Vite and Tailwind CSS 4. `index.html` loads `src/v2/main.tsx`.

- Page composition and routing: `src/v2/PortfolioV2.tsx`, with query-based project routes in `src/v2/lib/routes.ts`.
- Sections: `src/v2/components/` (selected work, capabilities, project evidence, preview modal).
- Opening poster: `components/ui/waving-portfolio-landing.tsx`.
- Content: `lib/content.ts` (bilingual copy), `lib/projects.ts` (project list and links), `src/v2/content/` (identity and per-project evidence).
- Language state: `lib/language.tsx`.
- Styles: `src/globals.css` (Tailwind, fonts, base) and `src/v2/styles/` (tokens and layout).
- Public asset base-path helper: `lib/assets.ts`.

For GitHub Pages project repositories, the workflow passes the repository name to Vite. `assetUrl` prefixes public asset paths with Vite's `BASE_URL`; Vite also rewrites font URLs in CSS. Root hosting is the default outside the Pages workflow. `VITE_BASE_PATH` can override the path when needed, including `/` for a custom domain.

Project evidence links to public files in each project's repository. Screenshots in `public/assets/work/` come from the deployed sites or the repositories themselves; nothing is mocked up.
