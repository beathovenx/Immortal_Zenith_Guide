const e=`# Version 1.6.0 Patch Notes\r
\r
**Crafting discovery has been rebuilt, the market opens on its goods, and a cultivator can now leave something behind.**\r
\r
---\r
\r
## Experimenting is a body of study, not a guessing game\r
\r
Discovery used to be a guess at an exact answer. A blueprint's ingredients were a fixed list in fixed quantities, and an experiment only matched if the bag you submitted equalled it *exactly* — three ore and one core taught you nothing if the recipe wanted three ore and **two** cores. Nothing told you the quantities. A wrong guess cost every material you put in.\r
\r
That's gone. **Refiners and Tailors now pool materials** within one tier of each other and work through them:\r
\r
- Each cycle has a chance to use up one unit of the pool — **50%**, falling 3 points per mastery level to a floor of 10%. A practised hand wastes less.\r
- Each cycle also has a **15% chance of an insight** into some design those materials go into.\r
- **Two to five insights** (by tier) and the design is yours.\r
- A pool can't be *wrong*, only slow. Materials leave your bag as they're actually used, so stopping early returns everything unspent.\r
\r
**Already know a design?** Aim the bench at it. Surplus insights past learning tighten the grade you roll — at 5, 10, 25 and 100 — and that bonus applies whether you craft it yourself or fill a commission.\r
\r
The crafting screen shows your insight count on any design you tap, and designs you're still working out sit dimmed among the rest with their progress on the tile.\r
\r
**New Soul Tree node — Artisan's Eye** (Crafting): +5% insight chance per rank, up to 4 ranks.\r
\r
An experiment over materials that can teach you nothing new is now refused up front, rather than quietly burning your pool for two minutes a cycle toward a result that was already decided.\r
\r
---\r
\r
## The market\r
\r
**It opens on its goods now.** Browsing used to return nothing until you'd guessed a filter — if you didn't already know what was for sale, you had no way to find out. The stalls now show everything, sixty listings a page, cheapest first, with page controls and a count of what was found.\r
\r
That gate was hiding something: behind it sat a hard cap of 300 results, so any filter matching more than that silently dropped the rest. **That truncation is gone.**\r
\r
- **You're now told when your goods sell**, and for how much. A listing sells while you're elsewhere — that's the point of a market — so the only evidence used to be a stone count that had quietly changed.\r
- **Listings expire after 7 days** and come home to your bag. A stall nobody clears fills with things priced for a realm the world passed long ago.\r
\r
---\r
\r
## Sect crafting orders\r
\r
**Every profession is commissionable now.** The orders screen showed two entries under Array and none at all under Talisman, because the system only understood recipes — and array plates and talisman patterns aren't recipes. **Array now lists 20, Talisman 132.**\r
\r
A commissioned array plate is delivered as a personal plate, and **its lifespan comes from the mastery of whoever forged it** — which is the whole reason to commission one rather than make it yourself.\r
\r
The screen itself got a rework:\r
\r
- **Profession tabs replaced by a Filters button** — type, tier, rarity, effect and material, applied together. The default is all 1,157 commissions. The tabs were a filter you couldn't turn off or combine, so "every legendary pill" meant knowing which tab to look under first.\r
- **The builder shows what you're paying for**: a pill's effect, gear's stats, an array plate's bonuses. Commissioning something used to name it and stop there.\r
- **+/- steppers** on ingredient quantities.\r
\r
---\r
\r
## Treasured Inheritance\r
\r
**New Soul Tree node** (Cultivation). At major realm 8 or beyond, a cultivator may name one legendary-or-better possession a **treasure** at the end of a life and hand it down — to their family line, or to their sect.\r
\r
- Its stats rise **10%, compounding every time it is handed down**. An heirloom passed through five lives is worth 1.61× what it started as, so a family's oldest possession becomes its best one.\r
- Only that line or that sect may ever wear it.\r
- **It can never be sold.** It changes hands by inheritance or by conquest.\r
\r
A family treasure goes to the head of the line; a sect treasure goes to the vault. **Winning a sect war carries one off** — the most storied one — and rebinds it to the victors, who can now wear what the losers no longer can.\r
\r
**The sect storehouse has a Treasures tab**, listing each heirloom with how many souls have handed it on and the bonus that has earned. Elders and above may take one out to wear, and put it back.\r
\r
Reincarnating also now offers to **empty your materials and consumables into your sect's storage** rather than lose them. No merit for it — this is a bequest, not a donation.\r
\r
---\r
\r
## Combat\r
\r
- **The battlefield is no longer chosen.** An ordinary fight rolls its own terrain when it starts: half the time neutral ground, half the time one of the ten. Picking it before every fight was a chore, and since the attunement helps whichever side matches the element, the answer was always "whichever suits my build". A tyrant still fights on its home ground, and the banner still tells you what was drawn.\r
- **New setting — Compact fight selection.** Pick a tier first, then choose a beast from its artwork alone; details, drops and the fight options open on tap.\r
- On a phone the combat log collapses to its icon, freeing the header row.\r
\r
---\r
\r
## Alchemy\r
\r
The pill catalogue has been rebuilt onto a proper matrix. **Duplicate effects across tiers are gone**, effect combinations are spread far more widely, and Qi restoration now scales as a share of your realm's own pool rather than a flat number.\r
\r
- **Tier 0** pills are single-stat, covering every main stat plus an all-affinity and an all-resist.\r
- Bonuses grow with tier, and pills start carrying more than one stat as they climb; **tier 7+ carry three**.\r
- **Single-stat pills always give more** of that stat than a multi-stat one at the same tier.\r
- **Blood Burst pills at tiers 1, 4 and 8**, each stronger than the last.\r
- **Hour-long buff pills** for Qi generation, comprehension, weapon mastery and regeneration, scattered up the tiers at rising percentages.\r
- **Every element now has a pill** raising its attack or resistance at least every other tier.\r
\r
**Every origin now grants starting equipment** — some a piece or two, some a full set, some a weapon.\r
\r
---\r
\r
## Masterworking\r
\r
The daily limit — **3 pieces, 4 at refining mastery 5, 5 at full mastery** — has always been enforced, but nothing in the workshop said so. The only way to find out was to spend a full bar of stamina and be refused. The Masterwork tab now reads "2 / 3 today", and at the limit the button says why.\r
\r
It also didn't entirely hold: two requests arriving together could both slip past, producing four masterworks against a cap of three and paying for two of them with one bar of stamina. **Fixed.**\r
\r
---\r
\r
## Interface and fixes\r
\r
- **The top bar fits on one line on a phone.** At 320px it was three rows and 158px tall, with Dao Power stranded on a line of its own. It's now 112px, with Dao Power left, chat and help centred, and currency right — and it still holds one row at 280px.\r
- Blueprint scrolls draw as a scroll with the design's item on it, whether or not the design resolves.\r
- Heraldry banners and family crests have their artwork.\r
- Twenty-four new pill illustrations.\r
- The bottom nav's expand caret is back to the full-width strip it had in 1.5.0.\r
- Tap targets across the achievements panel, the help button and the currency pod now meet the 44px minimum.\r
`;export{e as default};
