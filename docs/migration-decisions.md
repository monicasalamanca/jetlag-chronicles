# Migration decisions (issue 06)

Decided by Moni & Dunny on 2026-11-22 after reading `docs/migration-report.md`. Every edit below is in `scripts/migrate/fixes.json` and is applied by `cms/scripts/apply-fixes.js` (re-runnable; run it again after any re-import).

## Posts

| Decision | What happened |
|---|---|
| **Keep the 8 live posts the plan's list didn't include** (Colombia ×4, Vietnam rental, Japan visa, Cambodia visa, Wise Thailand) | Imported at their current URLs. No redirects needed. |
| **Keep the Wise Thailand post** (`/thailand/wise-thailand-august-2026-tax-changes`) | Affiliate links removed in the migration; the three sentences that asked readers to click are reworded (below). Its August 2026 news is dated: add an update note or retire it later (then redirect to `/thailand`). |
| **Keep the original publish dates** on the 8 posts that look like later re-publishes | Unchanged: these are the dates readers and Google have seen. |
| **Approve the two automatically shortened summaries** (2026 Southeast Asia Index, 2026 Tax Arbitrage) | Unchanged. |

## Alt text

All 246 photos (41 covers, 205 inside stories) had file names or placeholders as alt text. Each photo was looked at and given a one-line description of what it shows; tables and infographics list their figures. Applied to the stories' Markdown, the cover alt field and the photo-library records. Spot-check in Strapi and edit any that are wrong (names of people in group shots especially).

## Text fixes

| Story | Before | After |
|---|---|---|
| Ode to Bangkok | …you can grab a prepaid BTS Skytrain Rabbit Card | …you can pick up a prepaid BTS Skytrain Rabbit Card at any station. |
| Ode to Bangkok | a `---` rule straight after the first photo (a large empty gap) | removed |
| Bangkok vs KL | If you want to move like the locals, pre-ordering a BTS Rabbit Card and save yourself… | If you want to move like the locals, get a BTS Rabbit Card and save yourself… |
| Bangkok vs KL | The KL paragraph flagged "reads oddly" | No change: a false alarm, it reads fine. |
| Wise Thailand | …you will want to do it here before the August sweep. Do yourself a favor and click here now to get that done. | …you will want to do it before the August sweep. |
| Wise Thailand | …under the new Thai licenses, grab the app here. | …under the new Thai licenses, the Wise app still does the job. |
| Wise Thailand | …the August 3rd deadline. Sign up or log in to Wise. | …the August 3rd deadline. |
| Phuket | `[www.tigermuaythai.com](link)` | `[www.tigermuaythai.com](https://www.tigermuaythai.com)` |
| Cambodia Type E | `[arrival.gov.kh](arrival.gov.kh)` | `[arrival.gov.kh](https://arrival.gov.kh)` (kept as the source, per Moni) |
