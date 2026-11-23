# The Jet Lag Chronicles — Rebuild Plan

**Status:** Decisions locked (grilling session, 2026-11-17). Not yet built.
**Who:** Moni & Dunny (Canadian-Colombian duo).
**Site:** https://thejetlagchronicles.com

This file is the source of truth. If a build choice contradicts it, update this file first (and say why), then build.

---

## 1. Goal

Rebuild thejetlagchronicles.com from scratch as a **nice, simple, non-monetized travel-story blog**: our own stories, with the real-life lessons in them.

Non-negotiables:
- **Keep all existing posts at their current URLs** (41 live; the list below had 33) (the SEO we've built). Everything else (look, UX, copy, structure, features) is new.
- **Very strong SEO**, **WCAG 2.2 AA accessibility**, **fast** (targets in §9).
- Simple to run: publish in Strapi, live in seconds, no maintenance chores.

## 2. Direction & voice

- Travel stories with real-life lessons. Warm, first-person ("we"), honest, a little funny.
- For a mix of readers: people dreaming about travel, people planning a move, people already abroad.
- Organized **by place**, newest stories first.
- Two kinds of content now (**Place stories**, **Life Abroad**), one later (**Reader Stories**, §6.3).

## 3. What's removed

Comments · newsletter / Kit · ads / AdSense · reCAPTCHA · guides / free downloads (`/guides`, `/free/*`) · Google Analytics · tags · view counters · share buttons · popular posts · carousels · interactive map.

## 4. Site map

| Page | URL | Notes |
|---|---|---|
| Home | `/` | §7.1 |
| Places | `/places` | Countries grouped by continent. Only countries with ≥1 story. |
| Country | `/<country>` e.g. `/thailand` | Personal intro + all its stories, newest first. City filter later. Exists only once it has ≥1 story. |
| Life Abroad | `/lifestyle` | Intro + all Life Abroad stories. Menu label "Life Abroad", URL stays `/lifestyle`. |
| All stories | `/stories` | Everything, newest first, paginated. |
| Story | `/<country>/<slug>` or `/lifestyle/<slug>` | §7.2. Current URLs unchanged. |
| About | `/about` | Who we are, photos, how to reach us. |
| Our Travel Toolkit | `/toolkit` | **Built, hidden** (§6.4). |
| Reader Stories | `/reader-stories`, `/reader-stories/<slug>` | **Built, hidden** (§6.3). |
| Submission guidelines | `/reader-stories/submit` | Hidden with Reader Stories. |
| Privacy | `/privacy` | Short and honest: no cookies, Cloudflare Web Analytics, email contact. |
| 404 | — | Friendly, links to Places / Stories / Home. |
| RSS | `/rss.xml` | All published stories. |
| Sitemap | `/sitemap.xml` | Published, visible pages only. |

**Menu:** Places · Life Abroad · Stories · About.
**Footer:** ring mark · `info@thejetlagchronicles.com` (obfuscated) · Instagram · YouTube · X · RSS · Privacy · (Toolkit, when live) · © Moni & Dunny.

Hidden = not in menu, footer, lists, sitemap or RSS; returns 404 until switched on by a single flag per section.

## 5. The posts (migrate, same URLs)

> **Update 2026-11-22 (issue 05):** the live old API has **41** published posts. The 8 not listed below are live and indexable (200, `index, follow`), only missing from the old sitemap: `/colombia/medellin-bogota-cartagena-comparison`, `/colombia/colombia-digital-nomad-visa-requirements-2026`, `/colombia/ode-to-bogota`, `/colombia/is-colombia-dangerous-2026`, `/vietnam/how-to-rent-an-apartment-in-vietnam-2026`, `/japan/japan-digital-nomad-visa-guide-2026`, `/cambodia/cambodia-ordinary-visa-type-e-guide`, `/thailand/wise-thailand-august-2026-tax-changes`. They are migrated too (decision confirmed or changed in issue 06). Countries: Thailand, Malaysia, Vietnam, Colombia, Japan, Cambodia.

- **Thailand (11):** 30-thailand-scams, bangkok-condo-rental-guide, bangkok-vs-kuala-lumpur-digital-nomads-guide, chiang-mai-vs-bangkok-expat-guide, cost-of-living-thailand, dtv-visa-for-remote-workers, is-thailand-still-worth-it, ode-to-bangkok-love-letter-to-the-city, phuket-expat-digital-nomad-guide, thailand-dtv-vs-malaysia-de-rantau, thailand-visa-border-run-guide
- **Malaysia (5):** de-rantau-malaysia-remote-work-visa, kuala-lumpur-digital-nomad-city-guide, mm2h-visa-guide-malaysia, penang-digital-nomad-guide, penang-vs-kuala-lumpur
- **Vietnam (4):** vietnam-cost-of-living-2026, vietnam-digital-nomad-hotspot-2026, vietnam-visa-reality-for-digital-nomads-the-90-day-hack-border-runs-and-what-s-actually-legal, where-to-live-in-vietnam
- **Life Abroad (13):** 2026-southeast-asia-index-rankings, 2026-tax-arbitrage-execution-guide, canadians-second-passports-exit-strategies, digital-nomad-plateau-year-two, easiest-digital-nomad-visas-2026, first-90-days-abroad-expat-field-manual, interactive-brokers-digital-nomad-guide, leaving-your-country-2026, lifestyle-design-done-waiting, nomad-middle-class-financial-trap, top-30-digital-nomad-questions-remote-work-guide, why-digital-nomads-need-multiple-hubs, why-you-shouldnt-live-work-and-bank-in-one-country

All are credited to **"Moni & Dunny"**. Original publish dates are kept.

## 6. Content model (Strapi 5, i18n on, English only for now)

### 6.1 Collection types

**Post**
| Field | Type | Rules |
|---|---|---|
| title | text | required |
| slug | uid | required, lowercase-hyphen, unique per section/country |
| section | enum `place` / `life_abroad` / `reader_story` | required; decides the URL prefix |
| summary | text | required, ≤ 200 chars; used as intro + fallback meta description |
| coverPhoto | media (image) | required |
| coverAlt | text | **required** |
| coverCaption | text | optional; shown under the cover |
| coverCredit | text | optional; shown as "Photo: …" only when filled in (required in practice for guest photos) |
| body | Markdown (richtext) | required. Images in body need alt text (build check fails otherwise) |
| country | relation → Country | required when section = place; optional for reader-story |
| city | text | optional (future city filter) |
| author | relation → Author | required |
| publishedDate | date | required (original date for migrated posts) |
| updatedDate | date | optional; shows "Updated …" when set |
| seoTitle | text | optional, ≤ 60 |
| seoDescription | text | optional, ≤ 160 |

**Country:** name, slug, continent (enum), intro (Markdown), heroPhoto + heroAlt.

**Author:** name, slug, bio, photo + alt, type `team` / `guest`, link (optional; guest links rendered `rel="ugc nofollow"`).

**Toolkit item:** name, category, whyWeUseIt (required), link, type `affiliate` / `sponsor` / `recommendation`, logo (optional), order.
`affiliate` and `sponsor` links are rendered with `rel="sponsored noopener"` automatically. `recommendation` links are plain.

### 6.2 Single types
**Home** (intro text, "who we are" text + photo), **About**, **Life Abroad intro**, **Privacy**, **Toolkit page** (intro + disclosure text), **Reader Stories page** (intro + guidelines), **Site settings** (socials, contact email, section visibility flags if we don't keep them in env).

### 6.3 Reader Stories (built now, hidden)
- Funny / weird / strange travel stories from other travelers, at `/reader-stories/<slug>`. Goes live at **~5 stories**. Name TBD (ideas: Tales from the Road, Jet Lagged & Confused, Strange But True, Postcards from Strangers).
- Submissions by email to info@. **Guests never get Strapi access**; we enter their story.
- Guidelines page: they grant permission to publish and lightly edit; they own (or have rights to) the photos; pseudonyms OK; no mocking private people; **no paid posts**.
- Guest author box shows their name, short bio and optional link (`ugc nofollow`).

### 6.4 Our Travel Toolkit (built now, hidden)
- `/toolkit`, footer link only. Affiliate links only for now; `sponsor` type exists in the model for later.
- Each item says **why we use it**. Disclosure at the top of the page. No tracking scripts.
- **Going live = switch Vercel to Pro** (Hobby is personal/non-commercial only) or move to Cloudflare (§12).
- Posts may link to `/toolkit` instead of carrying affiliate links.

## 7. Page designs

### 7.1 Home (top to bottom)
Header → featured newest story (big photo, title, summary) → "Who we are" + photo → latest 6 stories → "Where we've been" (country cards: photo + story count) → 3 Life Abroad stories → footer.

### 7.2 Story page
Breadcrumb → cover photo, title, summary → byline (author, published date, "Updated" date if any, reading time) → table of contents if 4+ H2 sections → body (full-width captioned photos) → author box → "Write to us" line (info@) → "More from [country]" (3 cards; Life Abroad for lifestyle posts).
No share buttons, lightbox, prev/next or sidebar.

### 7.3 Design system — Mood board A

> **Done (issue 00):** `docs/design-system.md` plus `web/src/styles/tokens.css` **replace this section as the design source of truth**. The values below were the starting point (Board A); where they differ, the design system wins.

| Token | Value | Use |
|---|---|---|
| Ink | `#2E3A4B` | text, logo |
| Route Blue | `#0C90E9` | pin, route dashes, decoration only (3.4:1 on white, not for text) |
| Link Blue | `#0A64A4` | links, focus ring (AA) |
| Page | `#FBFAF7` | background |
| Dividers | `#ECE6DA` | rules, card borders |

- **Type:** headlines Source Serif 4; text Source Sans 3 (the logo's typeface). Self-hosted woff2 via `next/font/local`.
- **Motif:** the logo's three-segment dash (≈1:7:18) as a "route" section divider.
- **Logo:** user's SVG kept as drawn, recoloured via tokens (`--logo-ink`, `--logo-accent`). Full logo crop viewBox `8 8 306 76`; ring mark alone (`8 8 76 76`) is the favicon / footer mark.
- **Dark mode:** follows device setting (`prefers-color-scheme`), no toggle. Dark token values defined alongside light ones; all pairs checked for AA.
- Tokens only: components never hardcode colours, fonts, spacing, radii or shadows.

## 8. Architecture

```
jetlag-chronicles/          one repo
  cms/                      new lean Strapi 5 → Railway (new Postgres), Cloudinary upload provider (same account)
  web/                      Next.js 16 App Router → Vercel (Hobby until Toolkit goes live)
  scripts/migrate/          one-time migration from the old live Strapi API
  docs/                     this plan, issue tracker notes
```

**Web** (based on the-bio-hive setup): Next.js 16, React 19, TypeScript, pnpm, CSS Modules + `tokens.css`, `next/font/local`, Vitest, GitHub Actions CI, `robots.ts` / `sitemap.ts`, "pages load, components render", `proxy.ts` password gate (`SITE_USER` / `SITE_PASSWORD`), `SITE_LIVE` controls indexing.
Not carried over from bio-hive: content-collections/MDX, claims linter, `/en/` prefix (English unprefixed; `/es/` added later), Kit signup.

**Rendering:** every page static. Strapi webhook on publish/unpublish/update → `/api/revalidate` (secret) → revalidate by tag → live in seconds. If Strapi is down, the site keeps serving the last build.

**Images:** Cloudinary custom image loader (`f_auto,q_auto,w_…`). Vercel image optimization **off** (Hobby limit 5K transforms/month; also keeps us portable).

**Markdown:** rendered server-side, sanitized; headings get ids for the TOC; images become captioned figures; external links get `rel` per §10.
A photo on its own line becomes a figure; its Markdown title is the caption, with an optional credit after a bar: `![Alt text](url "Caption | Photo: Dunny")`. Right-aligned table columns (`|---:|`) are number columns.
**Publish rules** (Strapi, `cms/src/post-rules.ts`): a post can't be published without an author, a place story without a country, or a body photo without alt text. The web build fails too if a body photo has no alt.

**Portability:** no Vercel-only features (Edge Config, KV, Vercel password protection). Must run on Cloudflare via the OpenNext adapter.

## 9. Quality targets (checked in CI)

- **Lighthouse:** SEO 100, Accessibility 100, Best Practices 100, Performance ≥ 95 (mobile) on Home, a country page and a story page (Lighthouse CI).
- **Core Web Vitals pass** (LCP < 2.5s, INP < 200ms, CLS < 0.1).
- **WCAG 2.2 AA:** semantic landmarks, skip link, visible focus, keyboard-only navigation, AA contrast in light and dark, alt text required, `prefers-reduced-motion` respected, axe checks in CI.
- **Zero third-party requests on page load** except Cloudinary images and the Cloudflare analytics beacon. No cookies.

## 10. SEO

- Unique `<title>`, meta description, canonical, Open Graph + Twitter image per page (story cover via Cloudinary 1200×630).
- JSON-LD: `WebSite` (home), `BlogPosting` (stories, with `datePublished` / `dateModified`, author `Person`s), `Person` (Moni, Dunny), `BreadcrumbList` (every inner page), `CollectionPage` (country, Life Abroad, Stories).
- `/sitemap.xml` (with `lastmod`) + `/rss.xml`; `robots.txt` points at the sitemap.
- Non-www, HTTPS, no trailing slashes, lowercase URLs.
- Required alt text (Strapi + build check).
- Internal linking: breadcrumbs, "More from [country]", country intros link to their stories.
- Link `rel`: affiliate/sponsor → `sponsored`; guest author / reader-story links → `ugc nofollow`.
- Preview environment: password gate + `noindex` until `SITE_LIVE=true`.
- Hidden sections and drafts never appear in sitemap, RSS or lists.

## 11. Redirects (301)

| Old | New |
|---|---|
| `/about-us` | `/about` |
| `/blog` | `/stories` |
| `/privacy-policy`, `/terms-of-service` | `/privacy` |
| `/guides` | `/places` |
| `/guides/bangkok-guide` | `/thailand/ode-to-bangkok-love-letter-to-the-city` |
| `/guides/chiang-mai-guide` | `/thailand/chiang-mai-vs-bangkok-expat-guide` |
| `/guides/phuket-guide` | `/thailand/phuket-expat-digital-nomad-guide` |
| `/guides/thailand-playbook-guide` | `/thailand/is-thailand-still-worth-it` |
| all other `/guides/*` | `/thailand` |
| `/free/*`, `/thank-you`, `/confirm-subscription` | `/` |
| ~~`/japan`, `/colombia`, `/cambodia` → `/places`~~ | Not needed: all three have live stories (see §5 update), so they are real country pages. |
| `/home` | `/` |
| `/chronicles` | `/stories` |
| existing legacy slug redirects in `jetlag-fe/next.config.ts` (e.g. `thailand-scams-2025`) | carried over, pointing straight at the final URL (no chains) |

**Rule:** every URL in the old sitemap must return **200 or a single 301**. A test checks this against a saved copy of the old sitemap.

## 12. Hosting, email, analytics

- **CMS:** new Strapi 5 on Railway, new Postgres, same Cloudinary account. Admin: Moni + Dunny only, 2FA-strength unique passwords.
- **Web:** Vercel Hobby during build and while non-commercial. **Vercel Pro (~$20/mo) from the day `/toolkit` goes live**, or move to Cloudflare.
- **Optional Cloudflare phase:** move DNS from GoDaddy to Cloudflare (free); deploy `web/` with OpenNext. Documented, not scheduled.
- **Analytics:** Google Search Console + Cloudflare Web Analytics. No cookies, no banner. GA removed; **export GA reports before launch** (history stays in GA).
- **Email:** Zoho Mail (zohocloud.ca). `info@` is contact-only: a Zoho **group** delivering to both of us. Shown obfuscated on the site (assembled, not plain text in HTML). Never used for logins.
- **Mail auth (GoDaddy DNS):** SPF ✓ (`include:zohocloud.ca`), DKIM ✓ (`zmail`). DMARC is `p=none` → add `rua` reporting, confirm legit mail passes for ~2 weeks, then `p=quarantine`, then `p=reject`.
- **Account safety:** unique passwords + 2FA on Railway, Vercel, GitHub, Cloudinary, GoDaddy, Zoho, Strapi admin.
- **Reserve option (not built):** contact form with honeypot + Cloudflare Turnstile, if spam to info@ gets bad.

## 13. Copy

Claude drafts all new copy as **Strapi drafts**; we edit later: home intro, "who we are", About, country intros (Thailand, Malaysia, Vietnam), Life Abroad intro, Moni / Dunny / joint bios, privacy, 404, Toolkit intro + disclosure, Reader Stories intro + guidelines, all SEO titles/descriptions for new pages.

**Needed from us before launch:** short bio + photo for Moni, for Dunny, and one joint photo.

## 14. Migration (one-time script)

1. Pull all posts from the **live** old Strapi API (not the stale `jetlag_prod.sql`).
2. Map fields: title, slug, description → summary, content → body, `images[0]` → cover (alt from the image's alt/caption or flagged), country → Country relation, `lifestyle` → section `life_abroad`, seoTitle / seoDescription, original `publishedAt` → publishedDate. Author = "Moni & Dunny".
3. Keep Cloudinary image URLs unchanged (no re-upload).
4. **Remove the 22 affiliate links** (17 Klook, 5 Wise) in 8 posts; keep the sentence, reword lightly where it reads oddly.
5. **Flag** any newsletter / subscribe / "download the guide" / CTA text and links to `/guides` or `/free`.
6. Flag missing alt text, broken internal links, old-domain or `www` links.
7. Write a **migration report** (`docs/migration-report.md`): every change per post, every flag, and anything needing a human decision.
8. Import into the new Strapi as **published** (dates preserved). Re-runnable (upsert by slug).
9. Verify every old sitemap URL on the new site (§11 rule).

Posts with affiliate links: `/thailand/ode-to-bangkok-love-letter-to-the-city`, `/thailand/30-thailand-scams`, `/malaysia/kuala-lumpur-digital-nomad-city-guide`, `/vietnam/vietnam-digital-nomad-hotspot-2026`, `/thailand/bangkok-vs-kuala-lumpur-digital-nomads-guide`, `/lifestyle/why-you-shouldnt-live-work-and-bank-in-one-country`, `/lifestyle/2026-tax-arbitrage-execution-guide`, `/lifestyle/top-30-digital-nomad-questions-remote-work-guide`.

## 15. Launch

**Build:** behind the password gate on a Vercel preview, `noindex`.

**Launch checklist**
- [ ] All posts migrated (41), migration report reviewed
- [ ] Every old sitemap URL returns 200 or a single 301
- [ ] Lighthouse + axe targets met in CI (§9)
- [ ] Copy edited, bios + photos in
- [ ] GA reports exported
- [ ] Zoho `info@` group delivers to both; DMARC `rua` reporting on
- [ ] Search Console verified for the domain; Cloudflare Web Analytics site created
- [ ] Strapi webhook → revalidate tested (publish an edit, see it live in seconds)
- [ ] Old Strapi DB backed up

**Switch:** point the domain at the new Vercel project in one step (instant rollback = point it back). Set `SITE_LIVE=true`, remove the password gate. Submit the sitemap in Search Console; spot-check top pages with URL Inspection.

**After 30 days:** DMARC → quarantine (then reject). Back up and shut down the old Railway Strapi and old Vercel project; archive `jetlag-fe` and `jetlag-be` repos.

## 16. Later (not now)

Spanish (`/es/`) · city filter on country pages · Reader Stories go live (~5 stories) · Toolkit goes live (+ Vercel Pro) · Cloudflare move · contact form if spam demands it · new countries (Japan, Colombia, Cambodia) as stories arrive.
