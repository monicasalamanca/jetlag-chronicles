# Migration report

Generated 2026-11-23 from https://jetlag-be-production.up.railway.app by `scripts/migrate`. Re-running the script rewrites this file.

## Summary

- **41 posts** ready to import (28 place, 13 Life Abroad), all credited to Moni & Dunny, original publish dates kept.
- **Countries:** Japan, Thailand, Colombia, Vietnam, Malaysia, Cambodia.
- **25 affiliate links removed** (17 Klook, 8 Wise); the link text is kept.
- **99 flags** in 41 posts; 14 posts need more than alt text.

## Decisions for Moni & Dunny

- [ ] **8 live posts the plan's list of 33 didn't include.** They are published, indexable and return 200 on the current site (they're only missing from its sitemap), so they're imported to keep their URLs. Remove any you don't want before launch (then add a redirect):
  - `/colombia/medellin-bogota-cartagena-comparison`
  - `/colombia/colombia-digital-nomad-visa-requirements-2026`
  - `/colombia/ode-to-bogota`
  - `/colombia/is-colombia-dangerous-2026`
  - `/vietnam/how-to-rent-an-apartment-in-vietnam-2026`
  - `/japan/japan-digital-nomad-visa-guide-2026`
  - `/cambodia/cambodia-ordinary-visa-type-e-guide`
  - `/thailand/wise-thailand-august-2026-tax-changes`
- [ ] **/thailand/wise-thailand-august-2026-tax-changes** is built around an affiliate partner (its links are removed). Keep, rewrite or drop it?
- [ ] **Alt text:** every cover and most body photos had a file name as alt text. Placeholders were generated; replace them with real descriptions (listed per post below).
- [ ] Go through each post below with flags other than alt text and tick it off.

## Posts

### /cambodia/cambodia-ordinary-visa-type-e-guide

**The Cambodia "Ordinary" Visa: Why Your Strategy Starts and Ends with the Type E** · published 2026-05-01

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 3 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Securing Your Residency in Cambodia". Write a real description.
- [ ] **broken-link:** "arrival.gov.kh" links to "arrival.gov.kh" (no https://, so it opens a page on our site).
  - `To secure this entry, the most efficient method is the official e-visa portal at [arrival.gov.kh](arrival.gov.kh), which carries a **$35** (USD) fee and a **3-business-day processing time**.`

### /colombia/colombia-digital-nomad-visa-requirements-2026

**Colombia Digital Nomad Visa 2026** · published 2026-01-22

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 4 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Colombia LaChorrera.2". Write a real description.

### /colombia/is-colombia-dangerous-2026

**Is Colombia Safe in 2026?** · published 2026-02-01

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 4 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Colombia Medellin.2". Write a real description.

### /colombia/medellin-bogota-cartagena-comparison

**Digital Nomad City Comparison 2026: Medellín vs Bogotá vs Cartagena** · published 2026-01-22

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 2 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Medellín vs Bogota vs Cartagena". Write a real description.

### /colombia/ode-to-bogota

**An Ode to Bogotá: What it means to grow into a place, slowly** · published 2026-01-23

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 2 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Colombia Bogota.streetart.musica". Write a real description.

### /japan/japan-digital-nomad-visa-guide-2026

**Japan Digital Nomad Visa: Requirements, Taxes, and 6-Month Living Reality** · published 2026-02-16

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 4 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Japan Tokyo.skytree.golden.turd". Write a real description.

### /lifestyle/2026-southeast-asia-index-rankings

**The 2026 Southeast Asia Expat Index: Where to Relocate Now** · published 2026-04-23

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- summary-shortened: Summary over 200 characters.
  - before: `Where should you move in 2026? We ranked Southeast Asia’s top destinations using a 100-point liveability scale. Compare Malaysia, Thailand, and the Philippines across 8 critical metrics including visa ease and price to quality ratios to find your next base.`
  - after: `Where should you move in 2026? We ranked Southeast Asia’s top destinations using a 100-point liveability scale.`

To check:

- [ ] **alt-text:** 8 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Surat Thani, Thailand, temple selfie". Write a real description.
- [ ] **summary:** Summary was shortened automatically; check it reads well.
  - `Where should you move in 2026? We ranked Southeast Asia’s top destinations using a 100-point liveability scale.`

### /lifestyle/2026-tax-arbitrage-execution-guide

**2026 Tax Arbitrage Execution Guide** · published 2026-04-10

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- affiliate-link-removed: wise.prf.hn: "Wise Business Account"
  - before: `Operating as a global entity means your banking needs to be as mobile as you are. Use a [Wise Business Account](https://wise.prf.hn/click/camref:1101l5F7LZ/destination:https%3A%2F%2Fwise.com%2Fbusiness%2F) to manage international consulting fees and client payments professionally. It’s the standard for maintaining clear books while moving between jurisdictions.`
  - after: `Operating as a global entity means your banking needs to be as mobile as you are. Use a Wise Business Account to manage international consulting fees and client payments professionally. It’s the standard for maintaining clear books while moving between jurisdictions.`
- affiliate-link-removed: wise.prf.hn: "A Wise Personal Account"
  - before: `Under remittance-based rules, the moment you move money is a tax event. [A Wise Personal Account](https://wise.prf.hn/click/camref:1101l5F7LZ/destination:https%3A%2F%2Fwise.com%2Fpersonal%2F) allows you to hold global earnings and only remit what is necessary into the local economy, effectively managing your documentable tax footprint in real-time.`
  - after: `Under remittance-based rules, the moment you move money is a tax event. A Wise Personal Account allows you to hold global earnings and only remit what is necessary into the local economy, effectively managing your documentable tax footprint in real-time.`
- summary-shortened: Summary over 200 characters.
  - before: `The "perpetual traveler" era is dead. Discover the 2026 framework for legitimate tax arbitrage, from navigating DAC8 crypto reporting to mastering the three-layer mechanics of residency. Stop hiding and start building a documentable, high-integrity strategy for the modern era.`
  - after: `The "perpetual traveler" era is dead. Discover the 2026 framework for legitimate tax arbitrage, from navigating DAC8 crypto reporting to mastering the three-layer mechanics of residency.`

To check:

- [ ] **alt-text:** 4 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "2026 Tax Arbitrage Execution Guide". Write a real description.
- [ ] **summary:** Summary was shortened automatically; check it reads well.
  - `The "perpetual traveler" era is dead. Discover the 2026 framework for legitimate tax arbitrage, from navigating DAC8 crypto reporting to mastering the three-layer mechanics of residency.`

### /lifestyle/canadians-second-passports-exit-strategies

**Why More Canadians Are Getting a Plan B: Second Passports, Offshore Assets & an Exit Strategy That Actually Works** · published 2025-12-01

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 5 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "GAME OVER". Write a real description.

### /lifestyle/digital-nomad-plateau-year-two

**The Digital Nomad Plateau** · published 2026-01-21

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 5 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "IMG 8623". Write a real description.

### /lifestyle/easiest-digital-nomad-visas-2026

**The Easiest Digital Nomad Visas to Apply for in 2026** · published 2026-01-03

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 6 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Sand.Lady". Write a real description.

### /lifestyle/first-90-days-abroad-expat-field-manual

**The First 90 Days Abroad: A Field Manual for Expats and Slow Travelers** · published 2026-01-20

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 5 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "20260314 185806". Write a real description.

### /lifestyle/interactive-brokers-digital-nomad-guide

**Interactive Brokers for Digital Nomads: The Ultimate 2026 Nomad Guide** · published 2026-06-02

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 4 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Interactive brokers.01". Write a real description.

### /lifestyle/leaving-your-country-2026

**The Appeal of Leaving: It’s Not Just About Cheaper Drinks and Nicer Weather Anymore** · published 2026-02-06

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 3 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Arrows". Write a real description.

### /lifestyle/lifestyle-design-done-waiting

**Lifestyle Design for People Who Are Done Waiting** · published 2025-12-02

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 3 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Penang Dunny Not.Polite". Write a real description.

### /lifestyle/nomad-middle-class-financial-trap

**The Nomad Middle Class: Not Broke, Not Free, Not Building Much Either** · published 2026-01-29

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 4 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Gucci sign". Write a real description.

### /lifestyle/top-30-digital-nomad-questions-remote-work-guide

**Top 30 FAQ on Remote Work, Visas, and Lifestyle Reality** · published 2026-05-22

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- affiliate-link-removed: wise.prf.hn: "The standard nomad financial toolkit relies on digital-first platforms like Wise for multi-currency holding and low-fee mid-market transfers."
  - before: `Do not rely on traditional retail banks that hit you with international transaction fees and terrible conversion rates. [The standard nomad financial toolkit relies on digital-first platforms like Wise for multi-currency holding and low-fee mid-market transfers.](https://wise.prf.hn/click/camref:1101l5F7LZ) Pair these with a premium domestic card, preferably one that offers unlimited worldwide ATM fee rebates.`
  - after: `Do not rely on traditional retail banks that hit you with international transaction fees and terrible conversion rates. The standard nomad financial toolkit relies on digital-first platforms like Wise for multi-currency holding and low-fee mid-market transfers. Pair these with a premium domestic card, preferably one that offers unlimited worldwide ATM fee rebates.`
- own-link-made-relative: https://thejetlagchronicles.com/thailand/bangkok-condo-rental-guide → /thailand/bangkok-condo-rental-guide

To check:

- [ ] **alt-text:** 6 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "The TOP 30 FAQ digital nomads are asking in 2026". Write a real description.

### /lifestyle/why-digital-nomads-need-multiple-hubs

**Why You Should Have Multiple Hubs Around the World** · published 2025-12-30

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 3 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Aiko.Airport". Write a real description.

### /lifestyle/why-you-shouldnt-live-work-and-bank-in-one-country

**Don’t Live Where You Work - Don’t Work Where You Bank - Don’t Bank Where You Live** · published 2026-02-09

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- affiliate-link-removed: wise.prf.hn: "Wise Personal Account"
  - before: `If you are paid in a strong currency, this matters a lot. You get to choose where you live based on what makes daily life easier, not where an office is located. Rent can be lower. Healthcare can be better. Food and transportation can cost less. By the way, managing that income through a [Wise Personal Account](https://wise.prf.hn/click/camref:1101l5F7LZ/destination:https%3A%2F%2Fwise.com%2Fpersonal%2F) can simplify that whole process. Your income does not change, but your life does.`
  - after: `If you are paid in a strong currency, this matters a lot. You get to choose where you live based on what makes daily life easier, not where an office is located. Rent can be lower. Healthcare can be better. Food and transportation can cost less. By the way, managing that income through a Wise Personal Account can simplify that whole process. Your income does not change, but your life does.`
- affiliate-link-removed: wise.prf.hn: "Wise"
  - before: `Most banks are built for people who never leave. Fixed address. Local job. One currency. One tax system. Step outside that box and things start breaking. Accounts get flagged. Transfers slow down. Paperwork piles up. You end up asking permission to use your own money. To avoid the mess, using [Wise](https://wise.prf.hn/click/camref:1101l5F7LZ/destination:https%3A%2F%2Fwise.com%2Fpersonal%2F) to keep your capital independent of your address ensures that movement doesn't become a liability.`
  - after: `Most banks are built for people who never leave. Fixed address. Local job. One currency. One tax system. Step outside that box and things start breaking. Accounts get flagged. Transfers slow down. Paperwork piles up. You end up asking permission to use your own money. To avoid the mess, using Wise to keep your capital independent of your address ensures that movement doesn't become a liability.`

To check:

- [ ] **alt-text:** 5 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Aiko.Supervisor". Write a real description.

### /malaysia/de-rantau-malaysia-remote-work-visa

**DE Rantau: Malaysia’s Remote Work Visa That Quietly Beats Them All** · published 2025-12-18

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- own-link-made-relative: https://thejetlagchronicles.com/malaysia/mm2h-visa-guide-malaysia → /malaysia/mm2h-visa-guide-malaysia

To check:

- [ ] **alt-text:** 4 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "20260314 193027". Write a real description.

### /malaysia/kuala-lumpur-digital-nomad-city-guide

**An Ode to Kuala Lumpur: The City That Doesn’t Flinch** · published 2025-10-15

Changes made:

- affiliate-link-removed: affiliate.klook.com: "Petronas Towers"
  - before: `Walking in Kuala Lumpur isn’t romantic. It’s hot. It’s chaotic. Sidewalks vanish mid-block. Construction never ends. But there’s a gritty poetry in the way the city moves. Look up and there’s a skyline that means business. [Petronas Towers](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1235253&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F2750-petronas-twin-towers-kuala-lumpur%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3Dae105db7fc), KL Tower, skyscrapers stacked everywhere across the city. Look down and you might spot a family of macaques darting across power lines or a vendor pushing a cart of bao.`
  - after: `Walking in Kuala Lumpur isn’t romantic. It’s hot. It’s chaotic. Sidewalks vanish mid-block. Construction never ends. But there’s a gritty poetry in the way the city moves. Look up and there’s a skyline that means business. Petronas Towers, KL Tower, skyscrapers stacked everywhere across the city. Look down and you might spot a family of macaques darting across power lines or a vendor pushing a cart of bao.`
- affiliate-link-removed: affiliate.klook.com: "Chinatown still feels like a throwback."
  - before: `[Chinatown still feels like a throwback.](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1235255&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F120697-kuala-lumpur-michelin-guided-chinatown-heritage-flavors-tour%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3D6108c47dd6) Faded signage, crumbling shophouses, paper lanterns. But look closer and you'll see third-wave coffee shops hidden in alleyways, art collectives painting over old walls, and the kind of street food that puts five-star kitchens to shame.`
  - after: `Chinatown still feels like a throwback. Faded signage, crumbling shophouses, paper lanterns. But look closer and you'll see third-wave coffee shops hidden in alleyways, art collectives painting over old walls, and the kind of street food that puts five-star kitchens to shame.`

To check:

- [ ] **alt-text:** 8 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Malayasia KL I Love KL". Write a real description.
- [ ] **date:** Published 2025-10-15 but first written 2025-09-05 (looks like a later re-publish). Keep 2025-10-15 (what Google has seen) or change it.

### /malaysia/mm2h-visa-guide-malaysia

**Malaysia My Second Home (MM2H): The Comeback of Asia’s Quiet Residency Giant** · published 2025-11-25

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 5 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Malaysia KL infinity.pool2". Write a real description.

### /malaysia/penang-digital-nomad-guide

**Penang: The Island That Outsmarts the Nomad Hype** · published 2025-11-19

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 6 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Malaysia Georgetown blue.wall". Write a real description.

### /malaysia/penang-vs-kuala-lumpur

**Penang or Kuala Lumpur? How to Choose Between Malaysia’s Two Realities** · published 2025-11-19

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 7 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "20260314 194229". Write a real description.

### /thailand/30-thailand-scams

**30 Scams To Avoid In Thailand (From Someone Who's Been Burned)** · published 2025-09-20

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- cta-box-removed: Newsletter/download box removed: "If island hoping is the game you want to play, know what to expect before you arrive" (button "Download our free Thai island cost of living guide").
  - before: `[CTA type="A" title="If island hoping is the game you want to play, know what to expect before you arrive" link="/home" button="Download our free Thai island cost of living guide" isSubscribeModal="true"]`
- affiliate-link-removed: affiliate.klook.com: "survive the flight"
  - before: `Especially, if you’re coming from other Asian countries, this could happen before you even land. You’re tired, crammed in economy, and just want to [survive the flight](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1233308&k_site=https%3A%2F%2Fwww.klook.com%2Fairport-transfers%2F). That’s when a guy with nerves of steel and a carry-on plan of attack helps himself to your overhead stash while you’re dozing off.`
  - after: `Especially, if you’re coming from other Asian countries, this could happen before you even land. You’re tired, crammed in economy, and just want to survive the flight. That’s when a guy with nerves of steel and a carry-on plan of attack helps himself to your overhead stash while you’re dozing off.`
- affiliate-link-removed: affiliate.klook.com: "Taxi/Tuk Tuk Tours"
  - before: `#### 11. Overpriced [Taxi/Tuk Tuk Tours](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1233311&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F2469-classic-tour-bangkok%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3D992290a5b5)`
  - after: `#### 11. Overpriced Taxi/Tuk Tuk Tours`
- affiliate-link-removed: affiliate.klook.com: "Southeast Asia eSIM"
  - before: `Avoid it: Just get a trusted [Southeast Asia eSIM](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1233318&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F161735-unlimited-esim-south-east-asia%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3De5c7fb735f) before you even land.`
  - after: `Avoid it: Just get a trusted Southeast Asia eSIM before you even land.`

To check:

- [ ] **alt-text:** 12 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "30 SCAMS TO AVOID IN THAILAND". Write a real description.
- [ ] **date:** Published 2025-09-20 but first written 2025-07-07 (looks like a later re-publish). Keep 2025-09-20 (what Google has seen) or change it.

### /thailand/bangkok-condo-rental-guide

**How to Rent a Condo in Bangkok in 2026** · published 2025-09-20

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- cta-box-removed: Newsletter/download box removed: "If Bangkok is not winning you over, don't give up on Thailand just yet" (button "Download our free Thai island cost of living guide").
  - before: `[CTA type="A" title="If Bangkok is not winning you over, don't give up on Thailand just yet" link="/home" button="Download our free Thai island cost of living guide" isSubscribeModal="true"]`

To check:

- [ ] **alt-text:** 5 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "IMG 7543". Write a real description.
- [ ] **date:** Published 2025-09-20 but first written 2025-07-07 (looks like a later re-publish). Keep 2025-09-20 (what Google has seen) or change it.

### /thailand/bangkok-vs-kuala-lumpur-digital-nomads-guide

**Bangkok vs Kuala Lumpur: Which City Fits Your Nomad Life?** · published 2025-11-25

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- affiliate-link-removed: affiliate.klook.com: "night street food tour through Bangkok’s Chinatown"
  - before: `One of the fastest ways to understand it is on a [night street food tour through Bangkok’s Chinatown](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1234589&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F149145-bangkok-night-foodie-tour-in-chinatown%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3D394216154b), where the sidewalks turn into open kitchens after dark.`
  - after: `One of the fastest ways to understand it is on a night street food tour through Bangkok’s Chinatown, where the sidewalks turn into open kitchens after dark.`
- affiliate-link-removed: affiliate.klook.com: "The airport train actually runs on time"
  - before: `Kuala Lumpur? It’s sort of the anti-Bangkok in a lot of ways. It can be chaotic but at no where near the same level as Bangkok. KL just works. Aside from some traffic, the city moves with a kind of precision: [The airport train actually runs on time](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1234592&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1461-klia-ekspres-airport-express-kuala-lumpur%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3D622bcea55a), Trains are clean, malls are refrigerated, clean sidewalks… You get it. But it won’t win you over fast. It wins by showing up every day and never breaking down.`
  - after: `Kuala Lumpur? It’s sort of the anti-Bangkok in a lot of ways. It can be chaotic but at no where near the same level as Bangkok. KL just works. Aside from some traffic, the city moves with a kind of precision: The airport train actually runs on time, Trains are clean, malls are refrigerated, clean sidewalks… You get it. But it won’t win you over fast. It wins by showing up every day and never breaking down.`
- affiliate-link-removed: affiliate.klook.com: "pre-ordering a BTS Rabbit Card"
  - before: `If you want to move like the locals, [pre-ordering a BTS Rabbit Card](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1234611&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F11626-bts-skytrain-rabbit-card-bangkok%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3Daf1b5e763e) and save yourself from standing in ticket lines like a lost tourist every time you want to cross Sukhumvit.`
  - after: `If you want to move like the locals, pre-ordering a BTS Rabbit Card and save yourself from standing in ticket lines like a lost tourist every time you want to cross Sukhumvit.`

To check:

- [ ] **reword:** Reads oddly without its link; reword lightly.
  - `Kuala Lumpur? It’s sort of the anti-Bangkok in a lot of ways. It can be chaotic but at no where near the same level as Bangkok. KL just works. Aside from some traffic, the city moves with a kind of precision: The airport train actually runs on time, Trains are clean, malls are refrigerated, clean sidewalks… You get it. But it won’t win you over fast. It wins by showing up every day and never breaking down.`
- [ ] **alt-text:** 9 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "BangkokVSkl". Write a real description.

### /thailand/chiang-mai-vs-bangkok-expat-guide

**Chiang Mai vs. Bangkok: Which Thai City Is Best for Expats and Digital Nomads?** · published 2025-09-20

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- cta-box-removed: Newsletter/download box removed: "If neither city convinces you, maybe it’s time to explore some of Thailand’s best islands. We’ve got you covered." (button "Download our free Thai island cost of living guide").
  - before: `[CTA type="A" title="If neither city convinces you, maybe it’s time to explore some of Thailand’s best islands. We’ve got you covered." link="/home" button="Download our free Thai island cost of living guide" isSubscribeModal="true"]`

To check:

- [ ] **alt-text:** 12 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Thailand ChiangMai Monks". Write a real description.
- [ ] **date:** Published 2025-09-20 but first written 2025-05-27 (looks like a later re-publish). Keep 2025-09-20 (what Google has seen) or change it.

### /thailand/cost-of-living-thailand

**How Much Does It Really Cost to Live in Thailand?** · published 2025-09-20

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- cta-box-removed: Newsletter/download box removed: "If island life is what you desire, be ready and know not all islands are equal." (button "Download our free Thai Island guide").
  - before: `[CTA type="A" title="If island life is what you desire, be ready and know not all islands are equal." link="/home" button="Download our free Thai Island guide" isSubscribeModal="true"]`

To check:

- [ ] **alt-text:** 3 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Thailand BuddahStatue". Write a real description.
- [ ] **date:** Published 2025-09-20 but first written 2025-06-04 (looks like a later re-publish). Keep 2025-09-20 (what Google has seen) or change it.

### /thailand/dtv-visa-for-remote-workers

**Thailand DTV Visa for Remote Workers: Requirements, Rules, and Long Stay Benefits** · published 2026-01-02

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 4 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "IMG 7514". Write a real description.

### /thailand/is-thailand-still-worth-it

**Thailand Under Pressure: Is the Land of Smiles Still Worth It?** · published 2025-09-20

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- cta-box-removed: Newsletter/download box removed: "Thailand's islands are infamous. Some people show up to escape. Others show up to discover. If you're thinking of island hoping" (button "Download our free Thai island cost of living guide").
  - before: `[CTA type="A" title="Thailand's islands are infamous. Some people show up to escape. Others show up to discover. If you're thinking of island hoping" link="/home" button="Download our free Thai island cost of living guide" isSubscribeModal="true"]`

To check:

- [ ] **alt-text:** 3 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Thailand sukhothai buddah1". Write a real description.
- [ ] **date:** Published 2025-09-20 but first written 2025-07-07 (looks like a later re-publish). Keep 2025-09-20 (what Google has seen) or change it.

### /thailand/ode-to-bangkok-love-letter-to-the-city

**An Ode to Bangkok: A Love Letter to the City of Dreams** · published 2025-04-28

Changes made:

- cta-box-removed: Newsletter/download box removed: "Do you prefer beaches over city streets? We have you covered" (button "Download our free Thai Island guide").
  - before: `[CTA type="A" title="Do you prefer beaches over city streets? We have you covered" link="/home" button="Download our free Thai Island guide" isSubscribeModal="true"]`
- affiliate-link-removed: affiliate.klook.com: "BTS Skytrain Rabbit Card"
  - before: `If you want to skip the ticket machines and start using the system like a local, you can grab a prepaid [BTS Skytrain Rabbit Card](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1232664&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F11626-bts-skytrain-rabbit-card-bangkok%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3Da2ce6e0745)`
  - after: `If you want to skip the ticket machines and start using the system like a local, you can grab a prepaid BTS Skytrain Rabbit Card`
- affiliate-link-removed: affiliate.klook.com: "the Bangkok Samyan 4-Hour Small Group Street Food Tour"
  - before: `And for those who are new to you, Bangkok, [the Bangkok Samyan 4-Hour Small Group Street Food Tour](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1232681&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F9647-best-eats-midnight-food-tour-tuk-tuk-bangkok%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3De16985e935) is a great way to discover the hidden vendors that make your food scene legendary.`
  - after: `And for those who are new to you, Bangkok, the Bangkok Samyan 4-Hour Small Group Street Food Tour is a great way to discover the hidden vendors that make your food scene legendary.`
- affiliate-link-removed: affiliate.klook.com: "200-year-old temple"
  - before: `One minute, you’re standing in front of a [200-year-old temple](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1232710&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F3021-bangkok-must-visit-landmarks-day-tour%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3Dadea4fb763), marveling at its intricacies, and the next, you’re walking through a modern mall that could rival anything in New York or Tokyo.`
  - after: `One minute, you’re standing in front of a 200-year-old temple, marveling at its intricacies, and the next, you’re walking through a modern mall that could rival anything in New York or Tokyo.`

To check:

- [ ] **reword:** Reads oddly without its link; reword lightly.
  - `If you want to skip the ticket machines and start using the system like a local, you can grab a prepaid BTS Skytrain Rabbit Card`
- [ ] **alt-text:** 10 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Bangkok, nightlife man & tuktuk". Write a real description.

### /thailand/phuket-expat-digital-nomad-guide

**Phuket: Is It Still Worth It? A Roast, a Love Letter, and a Warning for Expats and Nomads** · published 2025-09-20

Changes made:

- cta-box-removed: Newsletter/download box removed: "At this point, I hope we haven't scared you away. Island life can offer you a quiet paradise and it doesn't always hurt the wallet." (button "Download our free Thai island cost of living guide").
  - before: `[CTA type="A" title="At this point, I hope we haven't scared you away. Island life can offer you a quiet paradise and it doesn't always hurt the wallet." link="/home" button="Download our free Thai island cost of living guide" isSubscribeModal="true"]`

To check:

- [ ] **alt-text:** 4 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Thailand Phuket beach01". Write a real description.
- [ ] **broken-link:** "www.tigermuaythai.com" links to "link" (no https://, so it opens a page on our site).
  - `_This is a screenshot we stole from the Tiger website. No sponsorship here. Just nerdy fans_ [www.tigermuaythai.com](link)`
- [ ] **date:** Published 2025-09-20 but first written 2025-07-07 (looks like a later re-publish). Keep 2025-09-20 (what Google has seen) or change it.

### /thailand/thailand-dtv-vs-malaysia-de-rantau

**Thailand DTV VS Malaysia DE Rantau: Two Very Different Paths for Long Term Nomads** · published 2025-12-29

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 1 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "DTV vs DE Rantau skyline". Write a real description.

### /thailand/thailand-visa-border-run-guide

**Thai Visas & Border Runs: How Farangs Keep Outsmarting Bureaucracy** · published 2025-09-20

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- cta-box-removed: Newsletter/download box removed: "Visa runs are temporary. Island life doesn’t have to be." (button "Download our free Thai island cost of living guide").
  - before: `[CTA type="A" title="Visa runs are temporary. Island life doesn’t have to be." link="/home" button="Download our free Thai island cost of living guide" isSubscribeModal="true"]`

To check:

- [ ] **alt-text:** 4 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "IMG 7671". Write a real description.
- [ ] **date:** Published 2025-09-20 but first written 2025-05-27 (looks like a later re-publish). Keep 2025-09-20 (what Google has seen) or change it.

### /thailand/wise-thailand-august-2026-tax-changes

**Wise Thailand August 2026: The New Rules for Expat Tax and Assets** · published 2026-05-08

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- affiliate-link-removed: wise.prf.hn: "Do yourself a favor and click here now to get that done."
  - before: `If you have not yet set up your international account to keep your home-base finances separate, you will want to do it here before the August sweep. [Do yourself a favor and click here now to get that done.](https://wise.prf.hn/click/camref:1101l5F7LZ)`
  - after: `If you have not yet set up your international account to keep your home-base finances separate, you will want to do it here before the August sweep. Do yourself a favor and click here now to get that done.`
- affiliate-link-removed: wise.prf.hn: "grab the app here."
  - before: `For those just needing the best rates for QR scanning and local transfers under the new Thai licenses, [grab the app here.](https://wise.prf.hn/click/camref:1101l5F7LZ)`
  - after: `For those just needing the best rates for QR scanning and local transfers under the new Thai licenses, grab the app here.`
- affiliate-link-removed: wise.prf.hn: "Audit your account and get ahead of the August 3rd deadline. Sign up or log in to Wise."
  - before: `[Audit your account and get ahead of the August 3rd deadline. Sign up or log in to Wise.](https://wise.prf.hn/click/camref:1101l5F7LZ/destination:https%3A%2F%2Fwise.com%2F)`
  - after: `Audit your account and get ahead of the August 3rd deadline. Sign up or log in to Wise.`

To check:

- [ ] **reword:** Reads oddly without its link; reword lightly.
  - `If you have not yet set up your international account to keep your home-base finances separate, you will want to do it here before the August sweep. Do yourself a favor and click here now to get that done.`
- [ ] **reword:** Reads oddly without its link; reword lightly.
  - `For those just needing the best rates for QR scanning and local transfers under the new Thai licenses, grab the app here.`
- [ ] **reword:** Reads oddly without its link; reword lightly.
  - `Audit your account and get ahead of the August 3rd deadline. Sign up or log in to Wise.`
- [ ] **alt-text:** Cover photo had no alt text; placeholder "THAILANDS’S NEW REGULATORY HANDCUFFS The Wise Transition 2026". Write a real description.
- [ ] **partner-post:** The post is built around an affiliate partner. Keep it (links removed), rewrite it, or drop it with a redirect.

### /vietnam/how-to-rent-an-apartment-in-vietnam-2026

**Renting in Vietnam: How Foreigners Find and Keep Apartments 2026** · published 2026-02-03

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- own-link-made-relative: https://thejetlagchronicles.com/vietnam/vietnam-visa-reality-for-digital-nomads-the-90-day-hack-border-runs-and-what-s-actually-legal → /vietnam/vietnam-visa-reality-for-digital-nomads-the-90-day-hack-border-runs-and-what-s-actually-legal

To check:

- [ ] **alt-text:** 4 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "20260328 144655". Write a real description.

### /vietnam/vietnam-cost-of-living-2026

**Vietnam Cost of Living 2026: Is It Still the Best Budget Nomad Base?** · published 2025-10-15

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 7 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Vietnam Little Chairs". Write a real description.

### /vietnam/vietnam-digital-nomad-hotspot-2026

**Why Digital Nomads Are Skipping Bali and Booking One-Ways to Vietnam in 2026** · published 2025-10-09

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.
- affiliate-link-removed: affiliate.klook.com: "regardless if you’re slurping a $2 bowl of pho or splurging on fine dining in Ho Chi Minh City"
  - before: `The appeal is obvious. You can rent a modern apartment a five-minute scooter ride from the beach in Da Nang for the price of a parking space in New York. The coffee is rocket fuel and the food is world-class, [regardless if you’re slurping a $2 bowl of pho or splurging on fine dining in Ho Chi Minh City](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1233406&k_site=https%3A%2F%2Fwww.klook.com%2F%2Factivity%2F27549-street-food-scooter-tour-ho-chi-minh-city%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3Dbb6f9876bb). Internet speeds embarrass most of the West, and the country is plugged directly into the trans-Pacific fiber cables.`
  - after: `The appeal is obvious. You can rent a modern apartment a five-minute scooter ride from the beach in Da Nang for the price of a parking space in New York. The coffee is rocket fuel and the food is world-class, regardless if you’re slurping a $2 bowl of pho or splurging on fine dining in Ho Chi Minh City. Internet speeds embarrass most of the West, and the country is plugged directly into the trans-Pacific fiber cables.`
- affiliate-link-removed: affiliate.klook.com: "egg coffee course on 4 famous traditional Wietnamese coffee"
  - before: `Speaking of coffee culture, check out this great [egg coffee course on 4 famous traditional Wietnamese coffee](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1233415&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F126672-egg-coffee-barista-course-ho-chi-minh%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3D2a0d745383)`
  - after: `Speaking of coffee culture, check out this great egg coffee course on 4 famous traditional Wietnamese coffee`
- affiliate-link-removed: affiliate.klook.com: "pre-order this Southeast Asia 5G eSIM"
  - before: `Fiber internet is standard in most cities, and 5G is already blanketing the major hubs. You can upload a YouTube vlog from a cafe in Da Nang faster than your friend back home can load Netflix. Just make sure you [pre-order this Southeast Asia 5G eSIM](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1233416&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F161735-unlimited-esim-south-east-asia%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3D20dcfc483b) so you're plugged in the second you land, and still connected when you inevitably do a border run.`
  - after: `Fiber internet is standard in most cities, and 5G is already blanketing the major hubs. You can upload a YouTube vlog from a cafe in Da Nang faster than your friend back home can load Netflix. Just make sure you pre-order this Southeast Asia 5G eSIM so you're plugged in the second you land, and still connected when you inevitably do a border run.`
- affiliate-link-removed: affiliate.klook.com: "(Make your first hour in the city a little smoother by pre-booking an airport pick up)"
  - before: `Cities like Hanoi and Ho Chi Minh don’t have traffic... they have moving swarms of scooters. Crossing the street those first times is terrifying and surreal. Next thing you know, you are being greeted by an old Vietnamese lady as she takes your hand and helps you across the street. [(Make your first hour in the city a little smoother by pre-booking an airport pick up)](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1233426&k_site=https%3A%2F%2Fwww.klook.com%2Fairport-transfers%2F)`
  - after: `Cities like Hanoi and Ho Chi Minh don’t have traffic... they have moving swarms of scooters. Crossing the street those first times is terrifying and surreal. Next thing you know, you are being greeted by an old Vietnamese lady as she takes your hand and helps you across the street. (Make your first hour in the city a little smoother by pre-booking an airport pick up)`
- affiliate-link-removed: affiliate.klook.com: "don't want to risk a rejection/slow-walked application, you can pay a service fee for this guaranteed-pass agency"
  - before: `**A quick reality check:** The gov site is notoriously buggy. If your photo has a shadow or your payment fails at 2:00 AM, you’re in for a week of anxiety. If you’re high-maintenance or just [don't want to risk a rejection/slow-walked application, you can pay a service fee for this guaranteed-pass agency](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1233410&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F112769-vietnam-e-visa-service-for-international-tourist%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3Dee83fbd670). It’s the "I value my time more than my money" option, and they can even bail you out with a 1-hour urgent visa if you realize you forgot to apply while standing at the check-in counter.`
  - after: `**A quick reality check:** The gov site is notoriously buggy. If your photo has a shadow or your payment fails at 2:00 AM, you’re in for a week of anxiety. If you’re high-maintenance or just don't want to risk a rejection/slow-walked application, you can pay a service fee for this guaranteed-pass agency. It’s the "I value my time more than my money" option, and they can even bail you out with a 1-hour urgent visa if you realize you forgot to apply while standing at the check-in counter.`
- affiliate-link-removed: affiliate.klook.com: "This Southeast Asia 5G eSIM"
  - before: `[This Southeast Asia 5G eSIM](https://affiliate.klook.com/redirect?aid=112243&aff_adid=1233416&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F161735-unlimited-esim-south-east-asia%2F%3Fspm%3DSearchResult.SearchResult_LIST%26clickId%3D20dcfc483b) is basically the Asian nomad gold standard. It’s a few bucks, works the second you hit the ground and, more importantly, stays active across different countries. Obviously, this is a bit of a plug but if you pick one up, it is a win/win. Trust me.`
  - after: `This Southeast Asia 5G eSIM is basically the Asian nomad gold standard. It’s a few bucks, works the second you hit the ground and, more importantly, stays active across different countries. Obviously, this is a bit of a plug but if you pick one up, it is a win/win. Trust me.`

To check:

- [ ] **alt-text:** 11 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "IMG 8463". Write a real description.

### /vietnam/vietnam-visa-reality-for-digital-nomads-the-90-day-hack-border-runs-and-what-s-actually-legal

**Vietnam Visa Reality for Digital Nomads: The 90-Day Hack, Border Runs, and What’s Actually Legal** · published 2025-12-10

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 6 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Vietnam Da.Nang.Handbridge". Write a real description.

### /vietnam/where-to-live-in-vietnam

**Where to Live in Vietnam: Ranking the Best Cities for Expats and Digital Nomads** · published 2025-11-27

Changes made:

- cover-repeat-removed: Removed the cover photo repeated at the top of the body.

To check:

- [ ] **alt-text:** 6 body photo(s) had a file name as alt text; replaced with a placeholder. Write real descriptions.
- [ ] **alt-text:** Cover photo had no alt text; placeholder "Vietnam HCMC skyline". Write a real description.
