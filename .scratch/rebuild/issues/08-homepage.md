# 08 — Homepage

Status: ready-for-agent
Type: AFK
Source: `docs/plan.md`

## What to build

Build the homepage per plan §7.1: featured newest story, "Who we are" + photo, latest 6, "Where we've been" country cards, 3 Life Abroad stories. Home single type in Strapi for the intro texts and photo.

## Acceptance criteria

- [ ] Sections appear in the order in plan §7.1; featured story is not repeated in the latest 6
- [ ] Hidden sections (Reader Stories) never appear
- [ ] `WebSite` + `Person` JSON-LD
- [ ] Featured image is the LCP element and is prioritized; no layout shift
- [ ] Component test covers section composition

## Blocked by

- [07 — Places, country pages and Life Abroad](07-section-pages.md)
