# 14 — Reader Stories (built, hidden)

Status: ready-for-agent
Type: AFK
Source: `docs/plan.md`

## What to build

Build Reader Stories per plan §6.3: `/reader-stories` landing, `/reader-stories/<slug>`, `/reader-stories/submit` guidelines, guest author box and Reader Story label. Off by default behind one switch.

## Acceptance criteria

- [ ] Off: all Reader Stories URLs 404 and nothing appears in menus, lists, sitemap or RSS
- [ ] On: pages render with guest author box; guest links `rel="ugc nofollow"`
- [ ] Guidelines page covers permission to publish/edit, photo ownership, pseudonyms, no mocking private people, no paid posts
- [ ] Tests for both switch states

## Blocked by

- [04 — Full story page with complete content model and SEO](04-story-page.md)
