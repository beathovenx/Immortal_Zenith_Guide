const e=`# Version 1.15.0 Patch Notes\r
\r
**Every cultivation manual in the game has been rewritten. No two are the same book any more, every art they teach has a name of its own, and they now teach things other than a punch — healing, barriers, and blows you wind up over a turn. Technique costs are a share of your pool instead of a flat number that stopped mattering. Sect merit has become an economy, the merit shop no longer sells the same donated sword forever, and iOS purchases work.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message. Only the FIRST blockquote of this opening section is\r
> stripped before posting, so keep this note the only one here.\r
\r
---\r
\r
## Every manual is its own book now\r
\r
**106 of the 188 manuals were the same manual.** Same stats, same growth, same milestones — everything but the name and the cover. Four different Tier 1 soul manuals were one book with four covers, and there were only 124 real choices behind 188 volumes.\r
\r
Every manual now has a character: a deep well of Qi that hits softly, or a book that hits hard and holds little; one that mends, one that will not be moved. **188 books, 188 different offers.**\r
\r
What a tier is *worth* has not moved a decimal place. The rebalance changed how each book spreads its total, not how much it gets, so nothing you already hold got stronger or weaker overall — it got more particular.\r
\r
---\r
\r
## The arts have their own names\r
\r
Every water manual in the game taught "Surging Palm". Every spirit manual taught "Astral Bolt". Every mind manual taught "Piercing Thought". Read four water manuals and you learned Surging Palm four times.\r
\r
**All 337 arts have been renamed.** No two alike, no two in the same book an adjective apart. *Undertow of the Drowned*, *Ash Road Climbs the Wall*, *The Buried King*, *Nine Cold Springs*.\r
\r
Your manuals teach the same arts they always did, at the same milestones — they simply have names worth reading now.\r
\r
---\r
\r
## Manuals teach more than a punch\r
\r
316 of the 337 arts were damage. Now:\r
\r
**Healing arts.** Turn the art inward and mend instead of striking.\r
\r
**Barriers.** A standing ward that soaks damage before it reaches your health. An elemental ward absorbs about twice as much but only its own element — knowing what is about to hit you is the price of the better wall.\r
\r
**Wind-ups.** Spend the turn gathering, and land the blow next turn at **1.6×**. Your foe is told it is coming and gets a turn to answer, so it is a real decision rather than free damage.\r
\r
Which one a book teaches follows what the book *is*: the wellsprings mend, the bulwarks ward, and the books about one enormous blow are the ones that wind up. **No manual lost its teeth** — every book still teaches something that hits.\r
\r
---\r
\r
## Manuals learn what they hunt\r
\r
Comprehend a manual deeply enough and it starts to specialise. From the second milestone onward, a book that hits hard learns **what to aim at** — fire against dragons, metal against constructs, yin against the undead — and a book about not being hit learns **what it is being hit by**, taking less from the creatures its element answers.\r
\r
The affinity appears at the second milestone and deepens after it, so two cultivators holding the same manual at different depths are no longer carrying the same book.\r
\r
Roughly half the manuals grant one. A bonus everyone has is a bonus nobody notices.\r
\r
---\r
\r
## Technique costs are a share of your pool\r
\r
A flat cost stops meaning anything. Costs ran 16 energy at the first realm to 57 at the last — while your pools grow by more than double *every realm*. So techniques were a real constraint for about an hour and decoration for the rest of the game.\r
\r
**A technique now costs a percentage of the pool it draws on**, and that percentage falls as you outgrow it:\r
\r
- A starting art costs **10%**, dropping a point per realm to a floor of **5%**\r
- Arts learned later start heavier, up to about **18%**, against the larger pool you learn them with\r
- The expensive art of a tier is still the expensive one\r
\r
Outgrowing an art is meant to feel like mastery: what you struggled to afford at the third realm is what you throw around at the ninth. It never becomes free.\r
\r
---\r
\r
## Sect merit is an economy\r
\r
Merit used to come from nowhere. You donated, merit appeared on your row, and nothing anywhere was poorer for it — so a sect's treasury only ever grew and the rank ladder was a matter of waiting.\r
\r
Now it circulates:\r
\r
- **In:** a daily allotment set by the sect's rank, from 500 a day at Minor Sect to 90,000 at Grand\r
- **In:** every merit-shop purchase, returning the buyer's merit to the treasury\r
- **Out:** every donation the sect pays a member for\r
\r
The leader, vice-leader or **Merit Elder** sets how much merit a day the sect will pay out for donations. It defaults to matching the allotment — the one setting that cannot pay out more than the sect takes in — and it tracks the sect's rank rather than going stale at a number typed a year ago.\r
\r
---\r
\r
## Fixes\r
\r
- **iOS purchases work.** Crystal packs and supporter tiers did nothing at all on iPhone: the app's own StoreKit and Game Center plugins were never registered with the bridge, and a call to an unregistered plugin doesn't fail — it just never answers. Tapping a pack greyed the screen forever. Game Center had been broken the same way the whole time.\r
- **The merit shop stops selling the same item twice.** A donated piece had no stock count, so buying it took your merit and left it on the shelf to be bought again. Donations are now single instances that leave when sold.\r
- **Donations respect the sect's auto-listing rule.** Crafted gear used to go up for sale the instant it was donated whatever the rule said. Anything the rule does not cover is now *held* for the Merit Elder to decide on.\r
- **NPC sects keep a merit hall.** They sold nothing at all — not even the art the sect exists to teach — and donations to them vanished with nobody to list them. Both fixed.\r
- **The daily crafting limit was on the wrong thing.** It capped *discovering* new designs; it now caps how many known designs you can write onto scrolls for other players. Research, experiments and study are unlimited again.\r
- **Market listings suggest a real price.** The sell panel opened at 10 for everything, from a tier-0 herb to a legendary manual.\r
- **Tier tags** are now on every item square in the game, coloured by tier.\r
- **The exploration panel** no longer runs off the bottom of the screen on phones.\r
- **Emote packs** said they granted five emotes. They grant ten, and always did.\r
- **The realm bar** on the cultivation page flips to show your major and minor realm as numbers.\r
`;export{e as default};
