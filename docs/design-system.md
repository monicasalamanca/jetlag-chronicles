# The Jet Lag Chronicles: design system (v1)

Calm, editorial and photo-led. Built from Board A and the logo. This file is the single written source for designers and developers. Visuals live in `docs/design/` (`foundations.html`, `components.html`, `pages-gallery.html`, `pages/`, `social/`; PNG exports in `screenshots/` stay local, not in git). The live code is `web/src/styles/` (`tokens.css`, `components.css`, `story.css`, `base.css`); `docs/design/css/` is the reference copy the mockups use. Change the web copy first and keep this file in step.

## 1. Principles

1. **Photos lead, words follow.** Layouts give photos room and keep text to a 44rem reading column.
2. **Blue means you can click.** Link Blue marks links, the current page and focus. Route Blue is decoration only. Eyebrows and the drop cap are ink.
3. **One clay accent, one job.** Warm clay appears only for Reader Stories (chip, banner, guest author).
4. **Quiet by default.** No share buttons, comments, newsletter boxes, pop-ups, carousels, sidebars, star ratings or ads. One "Write to us" line replaces comments.
5. **Accessible first.** WCAG 2.2 AA: contrast tables below, visible focus, targets of at least 24px (aim for 44px), no information by colour alone.
6. **Mobile first.** Designed from 320px with a 16px gutter. Dark mode follows the device; there is no toggle.
7. **Tokens only.** No hard-coded colours, sizes, spaces, radii or shadows in components.

## 2. Logo

- Primary: the full wordmark with pin ring (`brand/logo-full.svg`). Secondary: the ring mark alone (`brand/logo-ring.svg`) for footer, favicon, avatars and social avatars.
- Recoloured with two tokens: `--logo-ink` (light #2E3A4B, dark #E8EBF0) and `--logo-accent` (light #0C90E9, dark #2EA3F2). Never any other colours.
- Header sizes: `--size-logo-mobile` 8.75rem, `--size-logo` 10.5rem. Footer ring: `--size-ring-footer` 2.5rem.
- Clear space: the height of the ring on every side. Never stretch, outline, add shadows, or place on a busy photo without the scrim (white version, `--color-on-scrim`).
- The name always also exists as real text (page title, alt text, footer).

## 3. Colour

| Token | Light | Dark |
|---|---|---|
| `--color-page` | #FBFAF7 | #12161C |
| `--color-surface` | #FFFFFF | #1A2028 |
| `--color-surface-sunken` | #F3F0E8 | #0E1217 |
| `--color-surface-tint` | #EDF4F9 | #15222F |
| `--color-border` | #ECE6DA | #2B333E |
| `--color-border-strong` | #7D8794 | #6B7686 |
| `--color-text` | #2E3A4B | #E8EBF0 |
| `--color-text-muted` | #566171 | #AEB8C5 |
| `--color-text-subtle` | #626C7A | #9AA5B3 |
| `--color-link` | #0A64A4 | #7CC2F5 |
| `--color-link-hover` | #074E82 | #A8D8F8 |
| `--color-link-visited` | #6A3F93 | #C4A6EB |
| `--color-route` | #0C90E9 | #2EA3F2 |
| `--color-focus` | #0A64A4 | #7CC2F5 |
| `--color-guest` | #96411F | #F2A988 |
| `--color-guest-surface` | #F9EEE8 | #2B1F1A |
| `--color-selection` | #CFE5F6 | #24496B |
| `--color-scrim` | #12161C | #12161C |
| `--color-on-scrim` | #FFFFFF | #FFFFFF |
| `--color-logo-ink` | #2E3A4B | #E8EBF0 |
| `--color-logo-accent` | #0C90E9 | #2EA3F2 |

Roles: `page` is the canvas; `surface` is cards and panels; `surface-sunken` is code chips, table headers and the footer; `surface-tint` is the TOC and the "Lesson learned" callout; `border-strong` is for control outlines that need 3:1.

The scrim over photos is `rgb(18 22 28 / 0.64)`. White text on it measures 5.44:1 over a pure-white photo, the worst case.

### Contrast, light mode

| Foreground | Background | Used for | Ratio | Needs | Result |
|---|---|---|---|---|---|
| `text` #2E3A4B | page #FBFAF7 | Body text, headings | 11.04:1 | 4.5:1 | Pass |
| `text` #2E3A4B | surface #FFFFFF | Text on cards / menu panel | 11.52:1 | 4.5:1 | Pass |
| `text` #2E3A4B | surface-sunken #F3F0E8 | Inline code, table header | 10.12:1 | 4.5:1 | Pass |
| `text` #2E3A4B | surface-tint #EDF4F9 | Callout text | 10.37:1 | 4.5:1 | Pass |
| `text-muted` #566171 | page #FBFAF7 | Lead, byline, breadcrumb | 6.02:1 | 4.5:1 | Pass |
| `text-muted` #566171 | surface #FFFFFF | Muted text on cards | 6.28:1 | 4.5:1 | Pass |
| `text-muted` #566171 | surface-sunken #F3F0E8 | Muted text on sunken | 5.51:1 | 4.5:1 | Pass |
| `text-muted` #566171 | surface-tint #EDF4F9 | Muted text in callout | 5.65:1 | 4.5:1 | Pass |
| `text-subtle` #626C7A | page #FBFAF7 | Captions, credits, footer small print | 5.10:1 | 4.5:1 | Pass |
| `text-subtle` #626C7A | surface #FFFFFF | Captions on cards | 5.32:1 | 4.5:1 | Pass |
| `text-subtle` #626C7A | surface-sunken #F3F0E8 | Credits on sunken | 4.67:1 | 4.5:1 | Pass |
| `link` #0A64A4 | page #FBFAF7 | Links, current nav item | 5.97:1 | 4.5:1 | Pass |
| `link` #0A64A4 | surface #FFFFFF | Links on cards / menu panel | 6.23:1 | 4.5:1 | Pass |
| `link` #0A64A4 | surface-sunken #F3F0E8 | Links on sunken | 5.47:1 | 4.5:1 | Pass |
| `link` #0A64A4 | surface-tint #EDF4F9 | Links in callout | 5.61:1 | 4.5:1 | Pass |
| `link-hover` #074E82 | page #FBFAF7 | Link hover | 8.31:1 | 4.5:1 | Pass |
| `link-visited` #6A3F93 | page #FBFAF7 | Visited link | 7.33:1 | 4.5:1 | Pass |
| `link-visited` #6A3F93 | surface #FFFFFF | Visited link on card | 7.65:1 | 4.5:1 | Pass |
| `guest` #96411F | guest-surface #F9EEE8 | Reader Story label | 6.00:1 | 4.5:1 | Pass |
| `guest` #96411F | page #FBFAF7 | Reader Story label text alone | 6.55:1 | 4.5:1 | Pass |
| `text` #2E3A4B | guest-surface #F9EEE8 | Reader Story banner text | 10.11:1 | 4.5:1 | Pass |
| `text-muted` #566171 | guest-surface #F9EEE8 | Muted text in Reader Story banner | 5.51:1 | 4.5:1 | Pass |
| `on-scrim` #FFFFFF | scrim 64% over white ≈ #676A6E | White text on scrim, over a pure-white photo (worst case) | 5.44:1 | 4.5:1 | Pass |
| `text` #2E3A4B | selection #CFE5F6 | Selected text | 8.88:1 | 4.5:1 | Pass |
| `focus` #0A64A4 | page #FBFAF7 | Focus ring | 5.97:1 | 3:1 | Pass |
| `focus` #0A64A4 | surface #FFFFFF | Focus ring on cards | 6.23:1 | 3:1 | Pass |
| `focus` #0A64A4 | surface-sunken #F3F0E8 | Focus ring on sunken | 5.47:1 | 3:1 | Pass |
| `focus` #0A64A4 | surface-tint #EDF4F9 | Focus ring on callout | 5.61:1 | 3:1 | Pass |
| `border-strong` #7D8794 | page #FBFAF7 | Control / table-edge borders | 3.49:1 | 3:1 | Pass |
| `border-strong` #7D8794 | surface #FFFFFF | Control borders on cards | 3.64:1 | 3:1 | Pass |
| `route` #0C90E9 | page #FBFAF7 | Route divider, pin, markers (decoration) | 3.25:1 | n/a | n/a |
| `route` #0C90E9 | surface #FFFFFF | Route dash on cards (decoration) | 3.40:1 | n/a | n/a |
| `logo-accent` #0C90E9 | page #FBFAF7 | Logo "JET" (logotype is exempt) | 3.25:1 | n/a | n/a |
| `border` #ECE6DA | page #FBFAF7 | Hairline (decoration) | 1.19:1 | n/a | n/a |

### Contrast, dark mode

| Foreground | Background | Used for | Ratio | Needs | Result |
|---|---|---|---|---|---|
| `text` #E8EBF0 | page #12161C | Body text, headings | 15.18:1 | 4.5:1 | Pass |
| `text` #E8EBF0 | surface #1A2028 | Text on cards / menu panel | 13.72:1 | 4.5:1 | Pass |
| `text` #E8EBF0 | surface-sunken #0E1217 | Inline code, table header | 15.72:1 | 4.5:1 | Pass |
| `text` #E8EBF0 | surface-tint #15222F | Callout text | 13.50:1 | 4.5:1 | Pass |
| `text-muted` #AEB8C5 | page #12161C | Lead, byline, breadcrumb | 9.04:1 | 4.5:1 | Pass |
| `text-muted` #AEB8C5 | surface #1A2028 | Muted text on cards | 8.17:1 | 4.5:1 | Pass |
| `text-muted` #AEB8C5 | surface-sunken #0E1217 | Muted text on sunken | 9.36:1 | 4.5:1 | Pass |
| `text-muted` #AEB8C5 | surface-tint #15222F | Muted text in callout | 8.04:1 | 4.5:1 | Pass |
| `text-subtle` #9AA5B3 | page #12161C | Captions, credits, footer small print | 7.26:1 | 4.5:1 | Pass |
| `text-subtle` #9AA5B3 | surface #1A2028 | Captions on cards | 6.56:1 | 4.5:1 | Pass |
| `text-subtle` #9AA5B3 | surface-sunken #0E1217 | Credits on sunken | 7.52:1 | 4.5:1 | Pass |
| `link` #7CC2F5 | page #12161C | Links, current nav item | 9.41:1 | 4.5:1 | Pass |
| `link` #7CC2F5 | surface #1A2028 | Links on cards / menu panel | 8.50:1 | 4.5:1 | Pass |
| `link` #7CC2F5 | surface-sunken #0E1217 | Links on sunken | 9.75:1 | 4.5:1 | Pass |
| `link` #7CC2F5 | surface-tint #15222F | Links in callout | 8.37:1 | 4.5:1 | Pass |
| `link-hover` #A8D8F8 | page #12161C | Link hover | 11.96:1 | 4.5:1 | Pass |
| `link-visited` #C4A6EB | page #12161C | Visited link | 8.64:1 | 4.5:1 | Pass |
| `link-visited` #C4A6EB | surface #1A2028 | Visited link on card | 7.81:1 | 4.5:1 | Pass |
| `guest` #F2A988 | guest-surface #2B1F1A | Reader Story label | 8.23:1 | 4.5:1 | Pass |
| `guest` #F2A988 | page #12161C | Reader Story label text alone | 9.34:1 | 4.5:1 | Pass |
| `text` #E8EBF0 | guest-surface #2B1F1A | Reader Story banner text | 13.38:1 | 4.5:1 | Pass |
| `text-muted` #AEB8C5 | guest-surface #2B1F1A | Muted text in Reader Story banner | 7.96:1 | 4.5:1 | Pass |
| `on-scrim` #FFFFFF | scrim 64% over white ≈ #676A6E | White text on scrim, over a pure-white photo (worst case) | 5.44:1 | 4.5:1 | Pass |
| `text` #E8EBF0 | selection #24496B | Selected text | 7.84:1 | 4.5:1 | Pass |
| `focus` #7CC2F5 | page #12161C | Focus ring | 9.41:1 | 3:1 | Pass |
| `focus` #7CC2F5 | surface #1A2028 | Focus ring on cards | 8.50:1 | 3:1 | Pass |
| `focus` #7CC2F5 | surface-sunken #0E1217 | Focus ring on sunken | 9.75:1 | 3:1 | Pass |
| `focus` #7CC2F5 | surface-tint #15222F | Focus ring on callout | 8.37:1 | 3:1 | Pass |
| `border-strong` #6B7686 | page #12161C | Control / table-edge borders | 3.94:1 | 3:1 | Pass |
| `border-strong` #6B7686 | surface #1A2028 | Control borders on cards | 3.56:1 | 3:1 | Pass |
| `route` #2EA3F2 | page #12161C | Route divider, pin, markers (decoration) | 6.60:1 | n/a | n/a |
| `route` #2EA3F2 | surface #1A2028 | Route dash on cards (decoration) | 5.96:1 | n/a | n/a |
| `logo-accent` #2EA3F2 | page #12161C | Logo "JET" (logotype is exempt) | 6.60:1 | n/a | n/a |
| `border` #2B333E | page #12161C | Hairline (decoration) | 1.42:1 | n/a | n/a |

All pairs pass (checked again independently on 2026-11-22). Re-check every pair whenever a colour changes.

## 4. Typography

Two self-hosted families, five woff2 files, no icon font and no monospace.

| Use | Font | Weight |
|---|---|---|
| Headings, card titles, callout lead | Source Serif 4 | SemiBold 600 |
| Story lead and pull quotes | Source Serif 4 | Italic 400 |
| Body, UI, nav, captions | Source Sans 3 | Regular 400 |
| Eyebrows, buttons, labels, inline code | Source Sans 3 | SemiBold 600 |
| Emphasis in body | Source Sans 3 | Italic 400 |

- Body 16px minimum, line-height 1.6, reading column `--measure-prose` (about 66 characters).
- Fluid sizes are tokens (`--text-h1` … `--text-small`); do not set font sizes in components.
- Stay inside the Latin subset: write "THB", not the baht sign. Use inline SVG for arrows and icons.
- Next.js: load with `next/font/local` and point `--font-serif` and `--font-sans` at the generated variables (see the comment at the end of `foundations.html`).
- For OG image generation (Satori and similar) use ttf or woff copies of the same fonts; woff2 is not supported there.

## 5. Spacing, layout and shape

- Spacing scale `--space-1` … `--space-10`. Gutter 16px base, 24px from md, 32px from lg (`--gutter`).
- Breakpoints: md 48rem (768px), lg 64rem (1024px). Components switch with **container queries** on the page shell (`.ctx`) so the same CSS works in the real site and in side-by-side previews. Media queries cannot read custom properties; tokens.css lists the values as a comment.
- Max container `--container-max`; text column `--container-text` 44rem; wide figures `--container-figure`.
- Radii: `--radius-sm` (chips, route dash), `--radius-card` (cards, photos, callouts), `--radius-round` (author photo). Shadows are not used; borders do the work.
- Test widths: 320, 390, 768, 1024, 1440. No horizontal scroll at 320.

## 6. Photography

| Use | Ratio | Notes |
|---|---|---|
| Story cover and section hero | 4:3 on phone, 2:1 from md (`--ratio-hero`, `--ratio-hero-wide`) | Most photos are phone shots, so 2:1 rather than 21:9 |
| Standard card | 4:3 | `c_fill,g_auto` |
| Featured card | 3:2, 2:1 from md | |
| Compact card | 1:1 | 5.5rem |
| Country card | 4:5 | |
| Author photo | 1:1 | |
| Share image | 1200×630 | see section 9 |
| In-story figure | its own shape | portraits capped at 80svh and 28rem |

- Always set width and height; placeholder is `--color-surface-sunken`.
- Alt text describes the photo; the caption tells the story. Cards use `alt=""` because the title carries the meaning.
- **Credit:** an optional field. A "Photo: Name" line shows only when filled in. It is required for guest and reader photos. Older posts without per-photo credits show none.
- Never put text over a photo without the scrim.

## 7. Components

### 1. Header and menu

Logo left, four links right on desktop; a no-JavaScript <details> menu on phone. The current page is marked by a Link Blue underline and aria-current="page", never by colour alone. Inside a section (e.g. a Life Abroad story) the section's item gets aria-current="true" and the same underline.

**States and behaviour**

- Default
- Hover: link goes to full-strength text with a grey underline
- Current page: Link Blue underline bar + aria-current
- Focus: 3px Link Blue outline, 3px offset
- Menu open (phone): full-width panel, 48px rows

**Accessibility**

- Menu is a native <details>/<summary>: keyboard and screen reader friendly with no script.
- Summary is 48px tall; panel links are 48px. Desktop links are 44px tall.
- Two nav landmarks share the label “Main”; only one is displayed at a time (the other is display:none, so it is removed from the accessibility tree).

**Tokens:** color-text, color-text-muted, color-link, color-border, space-*, size-logo, size-logo-mobile, header-height-md

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 2. Footer

Ring mark, one-line tagline, Follow, contact and more, and the legal line. A Toolkit link appears in the “contact and more” list only when the Toolkit page is live.

**States and behaviour**

- Default
- Link hover: Link Blue text with underline
- Focus: standard ring

**Accessibility**

- Social links name the network in text, no icon-only links.
- The footer h2s are visually small but are real headings for navigation.

**Tokens:** color-surface-sunken, color-border, color-text-muted, size-ring-footer, space-*

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 3. Skip link and focus style

One focus style for everything: a 3px Focus Blue outline with a 3px offset. Never removed, never reduced to a colour change. Focus Blue passes 3:1 against the page and surface colours in both modes.

**States and behaviour**

- Skip link hidden off-screen until focused, then pinned top-left
- Focus ring: 3px solid var(--color-focus), offset 3px (`--focus-offset`)
- Card focus: the ring wraps the whole card, not just the title

**Accessibility**

- Skip link is the first focusable element and targets #main (tabindex="-1").
- Focus is never hidden under a sticky header (the header is not sticky).
- Windows High Contrast: outlines use real outline, so they survive forced colours.

**Tokens:** color-focus, focus-width, focus-offset

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 4. Route divider

The brand’s dashed route line with a small pin at one end. Decoration only: it carries no information, is hidden from assistive tech, and is used at most once per section break.

**States and behaviour**

- Left-aligned (default)
- Centred (404, empty states)

**Accessibility**

- aria-hidden="true"; it must never be the only signal of a section change, so a heading always follows it.

**Tokens:** color-route, space-*

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 5. Story card

The workhorse. Three sizes. The whole card is one link (a stretched link on the title), so there is one tab stop per card. Eyebrow is ink (country, then city), never Link Blue.

**States and behaviour**

- Featured: 3:2 photo on phone, 2:1 from md, with the large serif title and lead below
- Standard: 4:3 photo, eyebrow, title, two-line summary, date and read time
- Compact: 1:1 thumbnail left, title and meta; no summary
- Hover: title underlines
- Focus: ring around the whole card
- Reader story: adds the clay “Reader story” chip before the eyebrow

**Accessibility**

- One link per card; the title text is the accessible name.
- Photos are decorative here (alt=""), because the title says it all.
- Summary is clamped to 2 lines with line-clamp, not truncated by JS.

**Tokens:** radius-card, color-surface, color-border, color-text, color-text-muted, ratio-card, ratio-featured, size-thumb, space-*

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 6. Country card

Portrait 4:5 photo with the country name in a scrim band at the bottom and a story count. One link. Cards group under a continent heading (Asia, later Europe and so on).

**States and behaviour**

- Default
- Hover: name underlines
- Focus: ring around the card

**Accessibility**

- Name + count read as “Thailand, 11 stories”.
- Scrim is 64% over the photo; white text measures 5.44:1 even on a pure-white photo.

**Tokens:** ratio-country, color-scrim, color-on-scrim, radius-card

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 7. Breadcrumb

Home › Places › Country › Story, in muted text. The last item is the current page, not a link. On phone it wraps; it never scrolls sideways.

**States and behaviour**

- Link: muted text, underline on hover (Link Blue)
- Current: ink, aria-current="page"

**Accessibility**

- <nav aria-label="Breadcrumb"> with an ordered list; separators are CSS, not read aloud.

**Tokens:** color-text-muted, color-text, color-link

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 8. Story byline

Author, published date, updated date (only when there is one) and read time on one wrapping line. Dates use real <time> elements.

**States and behaviour**

- With update date
- Without update date (guest or new post)

**Accessibility**

- Separators are aria-hidden; the order reads naturally as a sentence.

**Tokens:** color-text-muted, text-small

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 9. Table of contents

Shown on stories with four or more sections. An ordered list of jump links in a tinted box. On desktop it stays in the text column, never in a sidebar.

**States and behaviour**

- Default
- Link hover: underline
- Focus: standard ring

**Accessibility**

- <nav aria-labelledby>; links use real #fragment ids; headings have scroll-margin so they are never hidden.

**Tokens:** color-surface-tint, color-border, color-link, radius-card

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 10. Figure with caption

Photos keep their own orientation; portraits are capped at 80svh and 28rem so they never swallow a phone screen. The credit line appears only when the optional credit field is filled in (required for guest and reader photos).

**States and behaviour**

- Wide figure: extends past the text column on desktop
- Text-width figure
- With credit
- Portrait: capped height

**Accessibility**

- Every figure needs real alt text describing the photo, or alt="" when purely decorative.
- Caption sits in <figcaption>.

**Tokens:** color-text-muted, text-small, radius-card, space-*

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 11. Callout: “Lesson learned”

The brand’s signature. A pin icon and an ink label, a short serif lead, one or two sentences. Use once or twice per story at most. Not a warning box: it has no alarm colours.

**States and behaviour**

- Default (one style only)

**Accessibility**

- <aside aria-label="Lesson learned">; the label is text, so the meaning does not depend on the icon.

**Tokens:** color-surface-tint, color-border, color-route, radius-card

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 12. Author box

Team version uses the ring mark as an avatar; guest version uses the author’s photo (or the ring if none), a “Guest author” label in clay, and one external link marked rel="ugc nofollow".

**States and behaviour**

- Team
- Guest (clay accent on the border)

**Accessibility**

- External link announces “(external link)” to screen readers.

**Tokens:** color-surface, color-border, color-guest, size-avatar, radius-card

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 13. “Write to us” line

A single quiet line at the end of every story, in place of comments. It is a mailto link, not a form and not a box that asks for anything else.

**States and behaviour**

- Default
- Link hover and focus as standard links

**Accessibility**

- The link text says what it does (the email address).

**Tokens:** color-surface-sunken, color-text

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 14. “More from [country]” block

Three standard cards under a heading, with a link to the full country page. Always at the end of a story, before the footer. Never an infinite list.

**States and behaviour**

- Three cards: one column on phone, three columns from lg

**Accessibility**

- Heading is an h2; card headings are h3.

**Tokens:** (uses story card and section head)

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 15. Pagination

Phone: Newer, “Page 2 of 4”, Older. From md: Newer, numbers, Older. All targets are at least 44px. The first and last page show the unavailable end as disabled text, not a dead link.

**States and behaviour**

- Current page: filled ink pill
- Hover: sunken background and underline
- Disabled: muted, no link
- Focus: standard ring

**Accessibility**

- <nav aria-label="Pagination">; current page has aria-current="page"; numbers have visually-hidden “Page”.

**Tokens:** color-text, color-page, color-surface-sunken, radius-card

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 16. Section intro

Opens Places, a country, Life Abroad and All stories. Eyebrow, serif h1, a lead paragraph, and an optional photo (2:1 on desktop, 4:3 on phone).

**States and behaviour**

- Text only
- With photo and caption

**Accessibility**

- One h1 per page.

**Tokens:** text-h1, text-lead, ratio-hero, ratio-hero-wide

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 17. Toolkit item and disclosure note

The Toolkit is the only place with commercial links. The disclosure note comes first on the page, in plain words. Every affiliate item carries the visible word “Affiliate”, rel="sponsored noopener", and says why we use it.

**States and behaviour**

- Affiliate item
- Non-affiliate item
- Button-link hover: tinted background
- Focus: standard ring

**Accessibility**

- Button-link announces “(external link, affiliate)”.
- The label is text in a chip, never colour alone.

**Tokens:** color-surface, color-border, color-surface-tint, radius-card

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 18. Reader Story label

The only place the warm clay accent appears. A chip on cards and a banner at the top of the story. Words carry the meaning; clay is a hint, not a signal.

**States and behaviour**

- Chip on a card
- Banner on the story page

**Accessibility**

- Clay on its surface passes 4.5:1 in both modes (see contrast table).

**Tokens:** color-guest, color-guest-surface

See `components.html` for the light and dark renderings and the HTML and CSS sketch.

### 19. Empty state and 404

Friendly, short, always with next steps as plain links. No illustration beyond the route divider. The 404 keeps the header and footer so people can recover.

**States and behaviour**

- Empty state (no results)
- 404

**Accessibility**

- 404 returns a real 404 status; the heading is the h1.

**Tokens:** color-text, color-text-muted, color-route

See `components.html` for the light and dark renderings and the HTML and CSS sketch.


## 8. Pages

Page designs for plan.md section 7, each at 1280px and 390px, with light and dark for Home and Story, are in `pages-gallery.html`; the live HTML is in `pages/`.

| Page | Built from |
|---|---|
| Home | featured card, story cards by section, country cards, section heads |
| Places | section intro, continent heading, country cards (Asia only for now) |
| Country (Thailand) | section intro with hero, story cards, pagination |
| Life Abroad | section intro, featured and standard cards, pagination |
| All stories | section intro, story cards, pagination, empty state |
| Story | breadcrumb, cover, byline, TOC (4+ sections), story body, figures, table, callout, author box, write to us, more from country |
| About | section intro, joint photo, story body, author box |
| Privacy | plain text in the story layout, no cards |
| 404 | not found component with next-step links |
| Toolkit | disclosure note first, toolkit items |
| Reader Stories | section intro, reader chip cards, how to send us one |
| Reader story | reader banner, story body, guest author box |

## 9. Social share image (1200×630)

- Any photo, `object-fit: cover`, centred. A bottom-weighted scrim: `rgb(18 22 28 / .86)` at the bottom, `.64` at 55% of the height, `0` at the top.
- White logo top-left, 230px wide. Safe area 64px on all sides.
- Eyebrow (country · city, or "Life Abroad"), Sans 600, 22px, tracked, uppercase. Title Serif 600, 64px, line-height 1.08, max about 960px wide, balanced.
- Titles longer than about 90 characters: drop to 56px. Never more than three lines.
- Examples and the HTML template are in `social/`. Export PNG. If generating at build time, render the same template with Playwright, or with Satori using ttf fonts, and serve photos through the Cloudinary recipe `c_fill,g_auto,w_1200,h_630,f_jpg`.

## 10. Extending the system

1. **Reuse first.** Before adding anything, try an existing component with different content. Most new pages are a section intro, cards and pagination.
2. **A new component is allowed only when** (a) the content has a structure no current component can hold, (b) it will appear on at least two pages or it is a template for many, and (c) it can be built from existing tokens. It needs: a spec in this file, light and dark renderings, mobile and desktop behaviour, accessibility notes and a contrast check. Otherwise it is a variant, not a component.
3. **New tokens** are added only when no existing token fits twice. Add to tokens.css, give the dark value, run the contrast script, then update section 3.
4. **Adding a section (for example "Food").** Add one nav item only if the header still fits at 320px (the menu holds up to six). Create a section intro page, reuse story cards, give it no colour of its own (sections are told apart by words, not colour). Add it to the eyebrow rules ("Food" as the eyebrow, with the city when there is one). Update the sitemap and this file.
5. **Adding `/es/`.** Same components and tokens. Set `lang="es"` on the page, translate all UI strings (menu, "Page 2 of 4", "Write to us", disclosure, skip link, aria-labels), and allow 30% longer text: nothing may truncate. Add `hreflang` pairs, keep the same URL structure, and show the language switch as a plain text link in the footer, not a flag or dropdown. Spanish accents are in the Latin subset, so no new fonts.
6. **A new country page** is a country page with content. It takes the standard section intro with a 4:3/2:1 hero from one of its own photos, then story cards. It gets no custom colour or layout. It appears under its continent heading on Places and gets a country card (4:5 photo, name, story count). Pick the card photo for the subject in the centre band so it survives both the 4:5 and 2:1 crops.
7. **Guest and reader content** always uses the clay chip, the banner and the guest author box, and requires a photo credit.
8. **Anything commercial** lives on the Toolkit page only, with the disclosure note and the visible word "Affiliate".

## 11. Do and don't

**Do**

- Lead with a real photo, then the title.
- Use ink for eyebrows, Link Blue only for things you can click.
- Keep one link per card, with the title as its name.
- Keep text in the 44rem column; let figures go wider on desktop.
- Add alt text, captions and, where known, a credit.
- Use tokens for every colour, size, space and radius.
- Test at 320px, in dark mode and with the keyboard.
- Use real titles and real sentences, never lorem ipsum.
- Use the route divider at most once per section break.
- Mark every affiliate link "Affiliate", with `rel="sponsored noopener"`.

**Don't**

- Don't add share buttons, comments, newsletter boxes, pop-ups, carousels, sidebars, star ratings or ads.
- Don't use colour as the only signal (current page, affiliate, reader story, errors).
- Don't put text on a photo without the scrim.
- Don't recolour or stretch the logo, or put it on a busy photo.
- Don't add fonts, an icon font, or a dark-mode toggle.
- Don't remove or shrink the focus ring.
- Don't use the clay accent anywhere except Reader Stories.
- Don't crop faces or subjects out: pick the centre of the frame for `g_auto`.
- Don't hard-code hex values or pixel sizes in components.
- Don't make a new component when a variant will do.

## 12. Files and handoff

| File | What it is |
|---|---|
| `tokens.css` | All design tokens, light on `:root`, dark in `prefers-color-scheme` (live copy: `web/src/styles/`) |
| `story.css` | Story body layout and typography |
| `components.css` | Every component, tokens only, container queries |
| `fonts.css`, `fonts/` | Self-hosted `@font-face` rules and the five woff2 files |
| `brand/` | Logo SVGs, favicon, apple-touch-icon, 512 icon |
| `foundations.html`, `components.html`, `pages-gallery.html`, `pages/` | Visual references |
| `screenshots/`, `social/` | PNG exports |

Notes for the build: placeholder photos come from the mood board; dates, bios and Reader Stories are draft samples; "Reader Stories" is a working name; the Places page shows Asia only until more continents have stories. The mobile menu is a no-JavaScript `<details>`. Card focus uses `:has()` with a `@supports` fallback to a ring on the link.

## Appendix A. tokens.css

```css
/* ==========================================================================
   The Jet Lag Chronicles: design tokens  (v1)
   Light values on :root. Dark values under prefers-color-scheme (no toggle).
   Components may only use these tokens. Never hard-code a colour, size,
   space, radius, shadow or font.

   Breakpoints (mobile-first, min-width only; queries cannot read custom
   properties, so use the literal values). Components switch layout with
   @container ctx (min-width: ...) against the page shell, which equals the
   viewport on the real site and lets a demo show phone and desktop side by side:
     sm 30rem (480px) · md 48rem (768px) · lg 64rem (1024px) · xl 80rem (1280px)
   ========================================================================== */

:root {
  color-scheme: light dark;

  /* ---- Colour: light ---- */
  --color-page: #FBFAF7;
  --color-surface: #FFFFFF;
  --color-surface-sunken: #F3F0E8;
  --color-surface-tint: #EDF4F9;
  --color-border: #ECE6DA;
  --color-border-strong: #7D8794;
  --color-text: #2E3A4B;
  --color-text-muted: #566171;
  --color-text-subtle: #626C7A;
  --color-link: #0A64A4;
  --color-link-hover: #074E82;
  --color-link-visited: #6A3F93;
  --color-route: #0C90E9;
  --color-focus: #0A64A4;
  --color-guest: #96411F;
  --color-guest-surface: #F9EEE8;
  --color-selection: #CFE5F6;
  --color-on-scrim: #FFFFFF;
  --color-scrim: rgb(18 22 28 / 0.64);
  --logo-ink: #2E3A4B;
  --logo-accent: #0C90E9;

  /* ---- Type: families (self-hosted woff2; the only two families) ---- */
  --font-serif: "Source Serif 4", "Source Serif 4 Fallback", Georgia, "Times New Roman", serif;
  --font-sans: "Source Sans 3", "Source Sans 3 Fallback", system-ui, -apple-system, "Segoe UI", sans-serif;

  /* ---- Type: sizes (fluid, 320px to 1280px) ---- */
  --text-h1: clamp(2rem, 1.55rem + 2.2vw, 3.25rem);          /* 32 to 52 */
  --text-h2: clamp(1.5rem, 1.3rem + 0.9vw, 2rem);            /* 24 to 32 */
  --text-h3: clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem);       /* 20 to 24 */
  --text-h4: 1.125rem;                                       /* 18 */
  --text-lead: clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem); /* 18 to 21 */
  --text-body: clamp(1.0625rem, 1.03rem + 0.15vw, 1.125rem); /* 17 to 18 */
  --text-small: 0.9375rem;                                   /* 15 */
  --text-caption: 0.875rem;                                  /* 14 */
  --text-byline: 0.9375rem;                                  /* 15 */
  --text-breadcrumb: 0.875rem;                               /* 14 */
  --text-eyebrow: 0.8125rem;                                 /* 13, uppercase */
  --text-nav: 1rem;                                          /* 16 */
  --text-card-title: clamp(1.1875rem, 1.1rem + 0.4vw, 1.375rem); /* 19 to 22 */
  --text-card-title-compact: 1.0625rem;                      /* 17 */

  /* ---- Type: line heights ---- */
  --leading-tight: 1.08;   /* h1 */
  --leading-snug: 1.2;     /* h2, h3, card titles */
  --leading-heading: 1.3;  /* h4, compact titles */
  --leading-lead: 1.5;
  --leading-body: 1.7;
  --leading-ui: 1.45;      /* small, caption, byline, breadcrumb */

  /* ---- Type: weights, tracking ---- */
  --weight-regular: 400;
  --weight-semibold: 600;
  --tracking-display: -0.015em;
  --tracking-heading: -0.01em;
  --tracking-eyebrow: 0.14em;
  --underline-thickness: 0.075em;
  --underline-thickness-hover: 0.125em;
  --underline-offset: 0.2em;

  /* ---- Type: measure (max line length) ---- */
  --measure-prose: 66ch;   /* story body */
  --measure-lead: 52ch;    /* lead / summary */
  --measure-intro: 46ch;   /* section intros */
  --measure-title: 22ch;   /* h1 balance width */

  /* ---- Space (4px scale) ---- */
  --space-1: 0.25rem;  /*   4 */
  --space-2: 0.5rem;   /*   8 */
  --space-3: 0.75rem;  /*  12 */
  --space-4: 1rem;     /*  16 */
  --space-5: 1.5rem;   /*  24 */
  --space-6: 2rem;     /*  32 */
  --space-7: 3rem;     /*  48 */
  --space-8: 4rem;     /*  64 */
  --space-9: 6rem;     /*  96 */
  --space-10: 8rem;    /* 128 */

  /* ---- Layout ---- */
  --gutter-base: 1rem;         /* 16 at 320 */
  --gutter-md: 1.5rem;         /* 24 from md */
  --gutter-lg: 2rem;           /* 32 from lg */
  --gutter: var(--gutter-base);/* current side gutter; .shell widens it per container size */
  --container-max: 72rem;      /* 1152: header, grids, footer */
  --container-figure: 56rem;   /* 896: full-width photos in a story */
  --header-height: 4rem;       /* 64 */
  --header-height-md: 4.5rem;  /* 72 from md */
  --target-min: 2.75rem;       /* 44: aim for this */
  --target-floor: 1.5rem;      /* 24: WCAG 2.2 floor, never smaller */

  --container-text: 44rem;     /* 704: title block, intros, forms of text */
  --size-icon: 1.25rem;        /* 20: inline SVG icons */
  --size-icon-sm: 0.875rem;    /* 14: chevrons, external-link marks */
  --size-thumb: 5.5rem;        /* 88: compact card thumbnail */
  --size-avatar: 4.5rem;       /* 72: author photo */
  --size-logo-mobile: 8.75rem; /* 140: full logo, header, phone */
  --size-logo: 10.5rem;        /* 168: full logo, header, md and up */
  --size-ring-footer: 2.5rem;  /* 40: ring mark in the footer */

  /* ---- Radius ---- */
  --radius-sm: 0.125rem;       /* 2: route dash, label chips */
  --radius-card: 0.25rem;      /* 4: photos, cards, callout, table wrapper */
  --radius-round: 50%;         /* author photo */

  /* ---- Borders and focus ---- */
  --border-width: 1px;
  --border-width-thick: 2px;
  --border-hairline: 1px solid var(--color-border);
  --border-strong: 1px solid var(--color-border-strong);
  --focus-width: 3px;
  --focus-offset: 3px;

  /* ---- Shadow: almost none, on purpose ---- */
  --shadow-none: none;
  --shadow-overlay: 0 14px 28px -18px rgb(46 58 75 / 0.35), 0 1px 2px rgb(46 58 75 / 0.10);                      /* mobile menu panel only */

  /* ---- Photo aspect ratios (Cloudinary c_fill,g_auto) ---- */
  --ratio-hero: 4 / 3;              /* story cover, country hero, section hero. Becomes 2 / 1 from md */
  --ratio-hero-wide: 2 / 1;
  --ratio-card: 4 / 3;              /* standard card */
  --ratio-featured: 3 / 2;          /* featured card. Becomes 2 / 1 from md */
  --ratio-featured-wide: 2 / 1;
  --ratio-compact: 1 / 1;           /* compact card thumbnail */
  --ratio-country: 4 / 5;           /* country card */
  --ratio-author: 1 / 1;            /* author photo */
  --ratio-og: 1200 / 630;           /* social share image */

  /* ---- Route divider (the logo dash: segments 1 : 7 : 18) ---- */
  --route-thickness: 0.3125rem;     /* 5 */
  --route-gap: 0.5625rem;           /* 9 = 1.8 x thickness, as in the logo */
  --route-width: 14rem;             /* 224 */

  /* ---- Motion (optional, always cancelled by prefers-reduced-motion) ---- */
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --ease-out: cubic-bezier(0.2, 0.6, 0.2, 1);

  /* ---- Stacking ---- */
  --z-header: 10;
  --z-menu: 20;
  --z-skip: 100;

  /* ---- Breakpoints (reference only; use the literal in @media) ---- */
  --bp-sm: 30rem;
  --bp-md: 48rem;
  --bp-lg: 64rem;
  --bp-xl: 80rem;
}

/* ---- Colour: dark (follows the device setting) ---- */
@media (prefers-color-scheme: dark) {
  :root {
    --color-page: #12161C;
    --color-surface: #1A2028;
    --color-surface-sunken: #0E1217;
    --color-surface-tint: #15222F;
    --color-border: #2B333E;
    --color-border-strong: #6B7686;
    --color-text: #E8EBF0;
    --color-text-muted: #AEB8C5;
    --color-text-subtle: #9AA5B3;
    --color-link: #7CC2F5;
    --color-link-hover: #A8D8F8;
    --color-link-visited: #C4A6EB;
    --color-route: #2EA3F2;
    --color-focus: #7CC2F5;
    --color-guest: #F2A988;
    --color-guest-surface: #2B1F1A;
    --color-selection: #24496B;
    --color-on-scrim: #FFFFFF;
    --color-scrim: rgb(18 22 28 / 0.64);
    --logo-ink: #E8EBF0;
    --logo-accent: #2EA3F2;
    --shadow-overlay: 0 14px 28px -14px rgb(0 0 0 / 0.65), 0 1px 2px rgb(0 0 0 / 0.40);
  }
}

/* ---- Base rules every page inherits ---- */
::selection { background: var(--color-selection); color: var(--color-text); }

:focus-visible {
  outline: var(--focus-width) solid var(--color-focus);
  outline-offset: var(--focus-offset);
  border-radius: var(--radius-sm);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Appendix B. story.css

```css
/* story.css: styles for story body content. Tokens only. */
.story-grid {
  display: grid;
  /* Text column is 66ch, left-aligned with the title. Photos may use the wide track (up to --container-figure). */
  grid-template-columns:
    [text-start] min(var(--measure-prose), 100%) [text-end]
    minmax(0, calc(var(--container-figure) - var(--measure-prose))) [wide-end];
  font: var(--weight-regular) var(--text-body) / var(--leading-body) var(--font-sans);
  color: var(--color-text);
}
.story-grid > * { grid-column: text-start / text-end; margin-block: 0; }
.story-grid > * + * { margin-block-start: var(--space-5); }
.story-grid > .wide { grid-column: text-start / wide-end; }

.story-grid h2, .story-grid h3, .story-grid h4 {
  font-family: var(--font-serif); font-weight: var(--weight-semibold);
  text-wrap: balance; scroll-margin-top: calc(var(--header-height) + var(--space-4));
}
.story-grid h2 { font-size: var(--text-h2); line-height: var(--leading-snug); letter-spacing: var(--tracking-heading); margin-block-start: var(--space-8); }
.story-grid h3 { font-size: var(--text-h3); line-height: var(--leading-snug); margin-block-start: var(--space-7); }
.story-grid h4 { font-size: var(--text-h4); line-height: var(--leading-heading); margin-block-start: var(--space-6); }
.story-grid h2 + *, .story-grid h3 + *, .story-grid h4 + * { margin-block-start: var(--space-3); }

.story-grid a {
  color: var(--color-link);
  text-decoration: underline;
  text-decoration-thickness: var(--underline-thickness);
  text-underline-offset: var(--underline-offset);
}
.story-grid a:visited { color: var(--color-link-visited); }
.story-grid a:hover { color: var(--color-link-hover); text-decoration-thickness: var(--underline-thickness-hover); }

.story-grid ul, .story-grid ol { padding-inline-start: var(--space-5); }
.story-grid li + li { margin-block-start: var(--space-2); }
.story-grid ul li::marker { color: var(--color-route); }
.story-grid ol li::marker { color: var(--color-text-muted); font-weight: var(--weight-semibold); }

.story-grid blockquote {
  margin-inline: 0; padding-inline-start: var(--space-5);
  border-inline-start: var(--focus-width) solid var(--color-route);
  font: italic var(--weight-regular) var(--text-lead) / var(--leading-lead) var(--font-serif);
}
.story-grid blockquote footer {
  margin-block-start: var(--space-2);
  font: normal var(--weight-regular) var(--text-small) / var(--leading-ui) var(--font-sans);
  color: var(--color-text-muted);
}

.story-grid hr { border: 0; border-block-start: var(--border-hairline); margin-block: var(--space-7); }

.story-grid code {
  font: var(--weight-semibold) 0.9em var(--font-sans);
  letter-spacing: 0.02em; font-variant-numeric: tabular-nums;
  background: var(--color-surface-sunken); border: var(--border-hairline);
  border-radius: var(--radius-sm); padding: 0.1em 0.35em;
}

/* Table: scrolls inside its own wrapper, never the page */
.story-grid .table-wrap {
  overflow-x: auto; background: var(--color-surface);
  border: var(--border-hairline); border-radius: var(--radius-card);
}
.story-grid table {
  width: 100%; min-width: 30rem; border-collapse: collapse;
  font-size: var(--text-small); line-height: var(--leading-ui); font-variant-numeric: tabular-nums;
}
.story-grid caption {
  caption-side: top; text-align: start; padding: var(--space-3) var(--space-4);
  font-weight: var(--weight-semibold);
}
.story-grid th, .story-grid td { padding: var(--space-3) var(--space-4); text-align: start; vertical-align: top; border-block-start: var(--border-hairline); }
.story-grid thead th { background: var(--color-surface-sunken); font-weight: var(--weight-semibold); border-block-end: var(--border-width-thick) solid var(--color-border-strong); }
.story-grid .num { text-align: end; white-space: nowrap; }
.story-grid tfoot th, .story-grid tfoot td { font-weight: var(--weight-semibold); border-block-start: var(--border-width-thick) solid var(--color-border-strong); }

/* Figure: photos keep their own orientation. The credit line is optional: render it only when the credit field is
   filled (required for guest and Reader Story photos). It sits under the caption, never on the photo. */
.story-grid figure { margin-inline: 0; }
.story-grid figure img {
  display: block; width: 100%; height: auto;
  background: var(--color-surface-sunken); border-radius: var(--radius-card);
}
.story-grid figure.portrait img { width: auto; max-width: 100%; max-height: 80svh; max-width: min(100%, 28rem); margin-inline: auto; }
.story-grid figcaption {
  margin-block-start: var(--space-2);
  font-size: var(--text-caption); line-height: var(--leading-ui); color: var(--color-text-muted);
}
.story-grid figcaption .credit { display: block; font-style: italic; color: var(--color-text-subtle); }
```
