# 04 — Full story page with complete content model and SEO

Status: ready-for-agent
Type: AFK
Source: `docs/plan.md`

## What to build

Complete the content model (Post, Country, Author per plan §6) and build the full story page (plan §7.2): breadcrumb, cover, title, summary, byline, TOC, body with captioned figures, author box, "Write to us" line, "More from [country]". Includes per-page metadata and JSON-LD.

## Acceptance criteria

- [ ] Strapi types match plan §6.1 (required alt on cover, section enum, dates, seo fields, author type team/guest)
- [ ] Markdown rendered server-side and sanitized; headings get ids; images become figures with captions; tables, lists, blockquotes styled
- [ ] TOC shows only for 4+ H2 sections; reading time computed
- [ ] "Updated" date shows only when `updatedDate` is set
- [ ] "More from [country]" shows 3 other stories (Life Abroad for lifestyle posts)
- [ ] Unique title, description (seoDescription → summary fallback), canonical, OG/Twitter image (Cloudinary 1200×630)
- [ ] JSON-LD `BlogPosting` (datePublished, dateModified, authors) + `BreadcrumbList`
- [ ] External link `rel` rules: guest/UGC links `ugc nofollow`, sponsored types `sponsored`
- [ ] Build/check fails if any body image lacks alt text
- [ ] Component tests cover TOC threshold, updated-date logic, rel rules

## Blocked by

- [01 — Walking skeleton: one story renders from Strapi at its real URL](01-walking-skeleton.md)
- [03 — Design system in code: tokens, fonts, logo, header and footer](03-design-system-code.md)
