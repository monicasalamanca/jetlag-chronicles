# 15 — Our Travel Toolkit (built, hidden)

Status: ready-for-agent
Type: AFK
Source: `docs/plan.md`

## What to build

Build `/toolkit` per plan §6.4: intro, disclosure at the top, items grouped by category with "why we use it". Off by default behind one switch.

## Acceptance criteria

- [ ] Toolkit item and Toolkit page types in Strapi; `whyWeUseIt` required
- [ ] Affiliate and sponsor links render with `rel="sponsored noopener"` automatically; recommendations are plain links
- [ ] Off: `/toolkit` 404s and the footer link is hidden; On: footer link appears
- [ ] No tracking scripts
- [ ] Tests for rel rules and both switch states
- [ ] Plan note kept: going live means Vercel Pro (or Cloudflare)

## Blocked by

- [03 — Design system in code: tokens, fonts, logo, header and footer](03-design-system-code.md)
