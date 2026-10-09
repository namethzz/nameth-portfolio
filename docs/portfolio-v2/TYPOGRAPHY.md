# Portfolio v2 — Typography Review (local-only font study)

## Design decision

- English display headings: **Marion Marijola Regular** (condensed lettering).
- Occasional emphasis (About/Contact): **Marion Marijola Script**.
- Descriptions, navigation, controls, case-study paragraphs: existing Manrope.
- Thai text: existing Noto Sans Thai; the supplied fonts do **not** have Thai glyphs.
- The SVG-drawn kinetic `PORTFOLIO` headline remains unchanged.

## User-supplied font license

The ZIP includes `Personal Use Only.txt` and `1001fonts-marion-marijola-eula.txt`. These allow personal/non-commercial work but do not authorize publishing or redistributing the .otf files, and restrict commercial use. The personal-use notice explicitly mentions portfolios as a permitted personal example; it nevertheless forbids redistribution and commercial branding. **Do not commit or host the font binaries in this public repository without an appropriate license.**

Until a webfont/redistribution license is obtained, our `@font-face` rules resolve the fonts through the operating system's installed fonts only. Other visitors will see a fallback. This preview is for checking the look on the owner's own computer, not for public launch.

## Test on Windows

1. Extract the already owned `marion-marijola.zip` locally.
2. In File Explorer, right-click each of the two `.otf` files and choose **Install** (or **Install for all users**, if permitted).
3. Completely close and reopen Chrome so it sees the newly installed fonts.
4. Run `git pull origin feat/portfolio-v2` and `npm run dev` in the repository.
5. Open `http://localhost:5173/preview-v2.html#work`. Confirm the Selected Work headline and project names render in Marion, while the body paragraphs remain readable.
6. Change EN to TH: Thai headings intentionally continue to use the supported font.

If the typeface does not appear after installation, check that Windows lists the family names `Marion Marijola` and `Marion Marijola Script` in Settings → Personalization → Fonts.

## Before publishing

Obtain a license covering the actual intended use (public portfolio, career promotion if applicable, webfont embedding and hosting/distribution). Or choose an appropriately licensed freely distributable alternative. Do not upload `.otf` to public assets or GitHub until usage rights are confirmed.
