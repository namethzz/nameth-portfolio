# NAMETH Portfolio v2 — Design Specification

Status: Phase 1 design direction approved; Phase 2 foundation in progress.
Date: 2026-10-09
Production branch: `main` (keep unchanged until tested release)
Development branch: `feat/portfolio-v2`

## North star

**Creative Engineering: I start with curiosity, build with care, and create with purpose.**

Thai: **เริ่มต้นด้วยความอยากรู้ ลงมือสร้างด้วยความใส่ใจ และมุ่งให้สิ่งที่ทำมีประโยชน์จริง**

The site must *show*, not merely claim, the owner's approach to work:
- **Curiosity** — willing to learn independently and begin from zero.
- **Craftsmanship** — values quality and careful details, not rushed work.
- **Purpose** — builds useful digital experiences that address real problems.
- **Responsibility** — follows through, supports teammates, and distinguishes personal contributions from team contributions.

Avoid generic unsupported self-praise (e.g. “expert in everything”). Respect work-in-progress labels and evidence from shipped projects. This identity should guide copy, illustration, motion, and case studies.

## Visual identity — Creative Engineering

| Token | Value | Meaning |
| --- | --- | --- |
| Paper | `#F5F1E8` | warm off-white ground |
| Ink | `#1E292C` | primary text and dark surfaces |
| Copper | `#B84F3A` | expressive focal accent |
| Teal | `#356B68` | disciplined secondary accent |

Typography: expressive editorial hierarchy, accessible body typography; finalize exact families and type scale during implementation.
Motion: purposeful, delightful and optional. CTA remains available without waiting for animation; respect `prefers-reduced-motion`.

## Approved page structure

1. **Hero:** `Waving Portfolio Landing` inspiration; kinetic “PORTFOLIO” headline, short intro, name, roles, mascot and direct CTAs.
2. **Selected Work:** Cinematic Editorial large previews, sticky scroll storytelling on desktop, ordinary vertical scroll on mobile.
3. **About:** Editorial Story + Interactive Highlights expressing curiosity, craftsmanship, purpose and responsibility.
4. **Skills:** Capabilities + Project Evidence (skills linked to verifiable contributions).
5. **Contact:** Cinematic Editorial Finale with accessible email, resume, GitHub and Back to Top.
6. **Case studies:** separate routes using Hybrid Storytelling + Interactive Showcase.

## Hero content

- Top left: **NAMETH WONGMONGKOL**
- Top right: **PORTFOLIO / 2026**
- Headline: **PORTFOLIO**
- Left role: **SOFTWARE DEVELOPER**
- Right role: **DATA ENTHUSIAST**
- Intro: **I build digital experiences with care, clarity, and curiosity.**
- CTAs: **Explore Work**, **Download Resume**
- Scroll cue: **SCROLL TO EXPLORE**

Mascot: semi-personal, wears glasses, approachable, intelligent and curious; clean minimal illustrated lines, teal clothes, ink outline and copper detail. Do not assert that a stylized drawing is a real portrait. Preserve the source component's letter-roll and waving interactions while refining intro to approximately 2.2–3.2 seconds, without blocking navigation. Final mascot appearance remains a design review item.

## Selected Work interactions

- **Primary card action:** dedicated case-study route, immersive/shared-element transition when supported.
- **Separate secondary action:** Quick Preview opens an animated modal.
- Modal must trap/restore focus, close on Escape, label its content, prevent background interaction and restore body scroll. No nested conflicting click targets.
- Mobile scrolling must not be trapped by a cinematic sequence.
- `prefers-reduced-motion`: skip or simplify all non-essential motion.

## Case studies — shared foundation, distinct identity

All case studies use: Project Hero → Challenge → My Role → Process → Solution → Evidence & Outcomes → Live/GitHub links → Next Project.

- **THAI TAY / Construction Price Intelligence:** analytical/data-forward; steel-blue/teal direction; price-material data cleaning and frontend; clearly mark any forecasting as future/in-progress until implemented and validated.
- **Economic Crops Chat:** organic/intelligent direction; agricultural data and chatbot UI; distinguish user's data/front-end work from teammate RAG work.
- **OTW.SHOP:** bold commerce direction; customer/admin journeys and ASP.NET Core MVC; demonstrate actual storefront and admin functionality.

Project-specific color suggestions are not yet approved as final; choose alongside screenshots and references.

## Navigation

Minimal Editorial Navigation, bilingual TH/EN, links to Work/About/Skills/Contact and case study navigation. On desktop it may stick unobtrusively. On mobile it must remain obvious and keyboard-operable.

## Existing data to preserve

Keep the current content and links from `lib/content.ts`, `lib/projects.ts`, `lib/language.tsx` and files in `public/assets`. In particular:
- THAI TAY — https://github.com/namethzz/THAITAY
- Economic Crops Chat — https://github.com/namethzz/chatbot-project
- OTW.SHOP — https://github.com/namethzz/OTW
- OTW live site — https://otw-production.up.railway.app/
- THAI TAY live site — https://namethzz.github.io/THAITAY/#overview

Data and links must be checked for accuracy during the redesign; do not silently drop them. Use the actual stored `public/assets/resume.pdf`.

## Engineering requirements

React + TypeScript + Vite + Tailwind 4, shadcn/Radix foundations, Lucide, Motion (single consistent animation integration), Playwright and axe-core in GitHub Actions. Accessibility target WCAG 2.2 AA, combining automated and manual checks. Optimize images, maintain readable contrast, prevent scroll traps and keyboard-only dead ends.

## Deploy plan

Keep the live GitHub Pages deployment on `main` intact during development. Build `feat/portfolio-v2` in isolation. Add CI gates, validate mobile/desktop and keyboard workflows, deploy a Railway staging instance, then plan a separate production cutover. Railway project/domain settings are **not** configured by this spec.

## Explicitly pending

Final character portrait, typography families, exact breakpoints, project photography/screenshots, case study brand colors, transition implementation details, and production domain. Do not treat these as approved without design review.
