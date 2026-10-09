# Portfolio v2 — Implementation Plan

## Scope and safety

- Repository: `namethzz/nameth-portfolio`
- Live website stays on `main`, which is **not** part of current edits.
- Work takes place in `feat/portfolio-v2`.
- Do not delete or overwrite the current `lib/content.ts`, `lib/projects.ts`, `lib/language.tsx`, `public/assets/resume.pdf`, images, or project links.
- Existing GitHub Pages workflow remains in place until Railway staging and a production cutover are approved.

## Phase 2 / foundation (current)

1. Record approved design decisions and owner's personal identity in a durable spec.
2. Create namespaced Creative Engineering design tokens that cannot style the old site accidentally.
3. Introduce a typed v2 content adapter; **reuse existing project content** instead of duplicating project descriptions.
4. Inventory existing assets and decide the information architecture, including project case-study paths.
5. Build a parallel v2 app shell, route system and header with real TH/EN support.
6. Add build/typecheck and test gates before beginning heavy motion work.

## Phase 3 / hero & main sections

- Integrate `WavingPortfolioLanding` using the user-provided reference; adapt its props and animation timing.
- Develop the semi-personal glasses-wearing mascot after a visual review.
- Build Cinematic Editorial Project Cards and scroll storytelling.
- Adapt the provided Animated Modal to true dialog accessibility.
- Implement About, Skills and Contact sections aligned with identity.

## Phase 4 / case studies

- Create one full case study per project using source-backed content and real visuals.
- Keep routes, navigation, accessibility and reusable components consistent.
- Use project-specific visual themes, not three different app foundations.
- Validate roles, outcomes and links before publication.

## Phase 5 / quality & deployment

- TypeScript and production build.
- Playwright: homepage, language, navigation, project route, modal focus/Escape, CTA/resume, mobile.
- axe-core automated checks plus manual keyboard and screen-reader pass.
- Reduced-motion and performance checks.
- Railway **staging** build and review, then production switch only after approval.

## Non-goals for foundation

No immediate redesign of the separate THAITAY, chatbot-project or OTW repositories; no Railway or production configuration changes; no new claims about ML or AI engineering skill without evidence.

## Definition of done for this first step

- v2 branch exists.
- Design spec and implementation plan exist in the branch.
- Creative Engineering CSS variables and typed personal identity copy are available for later imports.
- Old main remains unchanged.
