# Task: Design The Jet Lag Chronicles design system (before the build)

**Status:** To do. Blocks the design-system build issue (tokens, fonts, logo, header/footer) and every page issue after it.
**Use with:** Claude Design. Attach the three files listed under "Inputs" and paste the prompt below.
**Output goes to:** `docs/design-system.md` (the guideline), `web/src/styles/tokens.css` (code), and reference mockups saved in `docs/design/`.
**Why:** one written system means new pages and sections later (Reader Stories, Toolkit, Spanish, new countries) can be designed by following rules instead of starting over.

## Inputs to attach
1. `The Jetlag Chronicles Logo.svg` (the logo; keep it as drawn, recolouring is allowed)
2. `docs/design/mood-boards.html` (the three mood boards; **Board A was chosen**)
3. `docs/plan.md` (site map, page layouts, content model, quality targets)

---

## Prompt

You are a brand and UI designer. Design the full visual system and the page designs for **The Jet Lag Chronicles** (thejetlagchronicles.com). **Start from Board A** in the attached mood boards: keep what works and enhance it. You're free to push it further, but stay recognisably Board A and stay built around the logo.

### About the site
- A **non-monetized travel-story blog** by Moni & Dunny, a Canadian-Colombian couple living and travelling abroad (mostly Southeast Asia so far: Thailand, Malaysia, Vietnam).
- Stories with **real-life lessons**: warm, first-person, honest, a little funny. Not a listicle factory or a booking site.
- Readers are a mix: people dreaming about travel, people planning a move abroad, and people already living abroad.
- Content is organized **by place** (continent → country → stories), plus a **Life Abroad** section (visas, money, moving). Later: **Reader Stories** (funny/weird stories from other travellers) and **Our Travel Toolkit** (a page of tools we use, some with affiliate links).
- Look and feel: **nice and simple**. Calm, editorial, photo-led, plenty of white space. Like a well-made travel magazine, not a template.

### Tone to hit
- Warm, curious, honest, light-hearted, trustworthy.
- **Avoid:** influencer clichés (script fonts, pastel gradients, "wanderlust" type), busy booking-site UI (badges, stars, price tags, pop-ups), stock-photo feel, and heavy drop shadows.
- The photos are the hero. The interface should step back.

### Board A (starting point)
| Token | Value | Use |
|---|---|---|
| Ink | `#2E3A4B` | text, logo |
| Route Blue | `#0C90E9` | logo accent, pin, route dashes. Decoration only: 3.4:1 on white, never body text |
| Link Blue | `#0A64A4` | links, focus ring (AA) |
| Page | `#FBFAF7` | background |
| Dividers | `#ECE6DA` | rules, card borders |

- **Fonts:** headlines **Source Serif 4**, text **Source Sans 3** (the logo's typeface).
- **Motif:** the logo's three-segment blue dash (proportions about 1:7:18) used as a "route" divider between sections. Use it sparingly.
- **Logo:** two-line wordmark "THE**JET**LAG / CHRONICLES" with "JET" in blue, a pin in a ring, and the dashed underline. The ring mark works alone (favicon, footer, small sizes).

### Hard constraints
1. **Accessibility: WCAG 2.2 AA.** List the contrast ratio for every text/background pair, in light and dark. Visible focus style on every interactive element. Touch targets at least 24×24 px (aim for 44). Nothing relies on colour alone. Motion is optional and respects `prefers-reduced-motion`.
2. **Dark mode follows the device setting** (no toggle). Give light and dark values for every colour token, including how the logo recolours.
3. **Performance:** at most two font families, self-hosted woff2, limited weights (say which). No icon font: inline SVG only. No decorative images beyond photos and the logo.
4. **Semantic design tokens only** (e.g. `--color-text`, `--color-surface`, `--color-link`, `--color-route`, `--space-4`, `--radius-card`), never one-off values. Components may only use tokens.
5. **Mobile first.** Works from 320 px wide with a 16 px side gutter and no horizontal scroll. Show mobile and desktop for every page.
6. **Photos:** they come from Cloudinary in mixed orientations. Define the aspect ratios to crop to (cover, card, country hero), and how captions and credits look.
7. **Sample copy** must sound like us (warm, first-person) and use real post titles from the plan. No lorem ipsum.
8. **No** share buttons, comments, newsletter boxes, pop-ups, carousels, sidebars, star ratings or ads.

### Deliverables
1. **Brand direction:** a 2–3 sentence concept and 3 adjectives.
2. **Logo usage:** full logo and ring mark; minimum sizes, clear space, light/dark versions, what not to do. Favicon set (SVG, 32, 180, 512) from the ring mark.
3. **Colour tokens:** the full palette with hex, token name and role, light and dark, with the contrast table.
4. **Typography:** type scale (h1–h4, lead/summary, body, small, caption, byline, breadcrumb), line heights, measure (max line length for reading), and the styles for Markdown body content: links, lists, blockquote, tables, inline code, horizontal rule, figure + caption.
5. **Spacing, radius, border, shadow and breakpoint tokens.**
6. **`tokens.css`:** ready to paste. Light values on `:root`, dark values under `@media (prefers-color-scheme: dark)`.
7. **Component specs** (look, states, mobile/desktop, and HTML/CSS sketches where useful):
   - Header + menu (Places · Life Abroad · Stories · About), including mobile menu and the current-page state
   - Footer (ring mark, contact email, Instagram/YouTube/X, RSS, Privacy, ©; room for a Toolkit link later)
   - Skip link and focus style
   - Route divider (the logo dash motif)
   - Story card in three sizes: featured (big), standard, compact
   - Country card (photo, name, story count)
   - Breadcrumb
   - Story byline (author, published date, "Updated" date, reading time)
   - Table of contents (for stories with 4+ sections)
   - Figure with caption (full-width photo in the story body)
   - Callout / "lesson learned" box for story bodies
   - Author box: team (Moni & Dunny) and guest (reader story; name, short bio, optional link)
   - "Write to us" line (contact email at the end of a story)
   - "More from [country]" block
   - Pagination (for `/stories`)
   - Section intro (title + short intro + optional hero photo; used by country, Life Abroad and Stories pages)
   - Toolkit item (name, category, "why we use it", link, Affiliate/Sponsor label) and the disclosure note
   - Reader Story label (how a guest story is marked as different from ours)
   - Empty state and the 404 message
8. **Page designs**, mobile and desktop, using the layouts in `docs/plan.md` §7:
   - Home
   - Places (countries grouped by continent)
   - Country page (e.g. Thailand)
   - Life Abroad
   - All stories
   - Story page (long article with TOC, photos, a table and a callout)
   - About
   - Privacy (plain text page template)
   - 404
   - Our Travel Toolkit
   - Reader Stories landing + one reader story
9. **Social share image template** (1200×630): story cover, title and the logo. It must work with any photo.
10. **Extending the system:** short rules for designing a new page or section later without breaking the system. Cover which existing components to reuse first, when a new component is allowed, how to add a new section (e.g. a future "Food" or Spanish `/es/`), and how a new country page gets its look.
11. A one-page **do / don't** summary.

### How to work
Work in three rounds and stop for our feedback after each one:
1. **Foundations:** brand direction, logo usage, colour tokens + contrast table, typography, spacing, `tokens.css` (deliverables 1–6).
2. **Components:** every component spec (deliverable 7), shown in light and dark.
3. **Pages and rules:** page designs, social image, extending the system, do/don't (deliverables 8–11).

Show your work as visual designs. Put code (`tokens.css`, HTML/CSS sketches) in code blocks we can copy.
