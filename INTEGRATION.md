# Prisma Hero integration

This standalone version uses React, TypeScript, Vite and Tailwind CSS 4. Its appearance and portfolio content were adapted from the latest hosted Nameth portfolio.

- UI components: `components/ui/`, using `@/components/ui/...`.
- Page composition: `components/portfolio.tsx`.
- Global styles and theme tokens: `src/globals.css`.
- Entry point: `src/main.tsx`.
- Original supplied component adaptation: `components/ui/prisma-hero.tsx`.
- Drop-in component example: `components/demo.tsx`.
- Public asset base-path helper: `lib/assets.ts`.

The shadcn aliases and CSS path are configured in `components.json`; no additional initialization is required. Keep reusable UI in `components/ui` so the CLI and imports use the same convention.

The Prisma Hero supports title, description, role, location, monogram, availability, navigation, CTA, video and poster props. `WordsPullUp` and `WordsPullUpMultiStyle` remain exported. Motion respects reduced-motion preferences. Project details use the accessible shadcn/Radix dialog. Navigation tracks visible sections. No additional application context provider is required.

Framer Motion and Lucide React are included in `package.json`. Font files, project photographs, the supplied hero video and the original PNG resume are included in `public/assets`.

For GitHub Pages project repositories, the workflow passes the repository name to Vite. `assetUrl` prefixes public asset paths with Vite's `BASE_URL`; Vite also rewrites font URLs in CSS. Root hosting is the default outside the Pages workflow. `VITE_BASE_PATH` can override the path when needed, including `/` for a custom domain.

Project facts come from the supplied resume, project context and the uploaded C# source. Forecasting in THAI TAY is described as in development; the agricultural data contribution is credited as a team project. OTW.SHOP details describe the implemented catalog, session cart, checkout, promotions, administration, reviews and returns. Its source link is https://github.com/namethzz/OTW.
