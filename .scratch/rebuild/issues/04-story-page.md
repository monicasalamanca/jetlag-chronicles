# 04 — Full story page with complete content model and SEO

Status: done
Type: AFK
Source: `docs/plan.md`

## What to build

Complete the content model (Post, Country, Author per plan §6) and build the full story page (plan §7.2): breadcrumb, cover, title, summary, byline, TOC, body with captioned figures, author box, "Write to us" line, "More from [country]". Includes per-page metadata and JSON-LD.

## Acceptance criteria

- [x] Strapi types match plan §6.1 (required alt on cover, section enum, dates, seo fields, author type team/guest)
- [x] Markdown rendered server-side and sanitized; headings get ids; images become figures with captions; tables, lists, blockquotes styled
- [x] TOC shows only for 4+ H2 sections; reading time computed
- [x] "Updated" date shows only when `updatedDate` is set
- [x] "More from [country]" shows 3 other stories (Life Abroad for lifestyle posts)
- [x] Unique title, description (seoDescription → summary fallback), canonical, OG/Twitter image (Cloudinary 1200×630)
- [x] JSON-LD `BlogPosting` (datePublished, dateModified, authors) + `BreadcrumbList`
- [x] External link `rel` rules: guest/UGC links `ugc nofollow`, sponsored types `sponsored`
- [x] Build/check fails if any body image lacks alt text
- [x] Component tests cover TOC threshold, updated-date logic, rel rules

## Blocked by

- [01 — Walking skeleton: one story renders from Strapi at its real URL](01-walking-skeleton.md)
- [03 — Design system in code: tokens, fonts, logo, header and footer](03-design-system-code.md)

## Comments

**2026-11-22 (Claude):** Built and checked against a local Strapi with seeded stories (production build, Chrome at 320/390/1280, light and dark).
- Strapi: Post gets summary, cover photo + alt (+ optional caption, credit), city, author, publishedDate, updatedDate, seoTitle, seoDescription. New Author type (team/guest, bio, photo, link). Country gets continent, intro, hero photo + alt.
- Strapi publish rules (`cms/src/post-rules.ts`): no publish without an author, a place story without a country, or a body photo without alt. Verified: a bad post is refused with all three messages.
- Story page follows `docs/design/pages/story.html`: breadcrumb, cover with overlapping title, eyebrow, lead, byline (Updated only when set), TOC from 4 sections, body (wide/portrait figures sized from the media library, captions + credits, tables in scroll boxes with number columns), author box (team/guest), Write to us, More from (3 cards, Life Abroad for lifestyle posts).
- SEO: title (seoTitle as the full title when set), description (seoDescription → summary), canonical, OG/Twitter with the Cloudinary 1200×630 crop, JSON-LD BlogPosting (Moni and Dunny as Persons) + BreadcrumbList.
- Links: guest stories' external links and guest author links `ugc nofollow`; `linkRel` also handles affiliate/sponsor → `sponsored noopener` for the Toolkit (issue 15).
- Not done here: the designed share image with title + logo (the share image is the cropped cover for now), and a Markdown syntax for the "Lesson learned" callout. Both can be added later without changing the model.
- On deploy, Railway's Strapi adds the new fields automatically. No posts there yet (migration is issue 05).
