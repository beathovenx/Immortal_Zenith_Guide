const e = `# Version 1.9.0 Patch Notes\r
\r
**Array Masters get a whole new craft to work out by hand, alchemists choose a school, combat stops being decided before the first blow lands, and the beast ladder was rebuilt from the bottom.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message.\r
\r
---\r
\r
## Arrays are assembled now, not bought\r
\r
An Array Master used to forge a plate from a recipe. Now you work the formation out yourself.\r
\r
**Diagrams** are found in the world — turned up while exploring, and dropped by beasts (capped by the toughest thing in the pack, so a hard fight is worth taking). Each diagram is one **part** of a formation, and a formation needs four: you pick one for each slot, tune five dials, and **study** the result to learn what you have made.\r
\r
Studying takes time and occupies a crafting slot, like any other work at the bench. Understanding is not instant.\r
\r
A few things worth knowing:\r
\r
- **Parts span the whole ladder**, tier 0 through 10, staggered — so there is always a next one to find.\r
- **Two parts on the same rung cost different materials.** Which one you can afford is a real choice.\r
- **The formation pattern decides whether an array can serve a sect**, not the dials. A sect-grade array has to be built as one.\r
- **Assembled plates wear the artwork of their formation, at their own grade** — twelve formations, four qualities each.\r
- **Forged plates can be sold**, and **sect crafting orders can commission an assembled array.**\r
\r
## Three ways an array lied about what it does\r
\r
All fixed: crafting arrays claimed no crafting benefit (nothing in crafting read the stat — it does now), every array reported **-1500% to -1800% health** from a percentage applied twice, and the Fast/Slow deployment dial changed nothing at all.\r
\r
---\r
\r
## Alchemists pick a school\r
\r
Four of them — **Soul, Life, Empowerment, Elements** — and a **concoction** to develop over 100 levels within the one you choose. Steeping gives you two draws a day, plus one more every ten levels.\r
\r
Pill descriptions also stopped quoting numbers that were written once and never updated. They read the pill now.\r
\r
---\r
\r
## Combat is no longer decided before the first blow\r
\r
Defence used to be checked against damage one line at a time, and about **1.8x defence made a fight unwinnable** — not hard, arithmetically over. Damage now pools all mitigation together and resolves once, so gear advantage bends a fight instead of ending it.\r
\r
Two more changes:\r
\r
- **A hit always lands for something** — the smaller of 0.2% of the target's maximum health or 10% of the attacker's combined attack. You can be outclassed; you cannot be reduced to nothing.\r
- **Weapons vary.** Daggers and two-handed weapons swing wide, fans and staffs land close to their average, everything else sits between. The same character with the same stats no longer plays identically with every weapon.\r
\r
---\r
\r
## The beast ladder was rebuilt\r
\r
An audit put weak, average and strong characters against the beasts at every realm, and the results were bad in both directions: ungeared characters were one-shot at every realm, and high realms collapsed to one-round kills.\r
\r
- **Beasts now climb within their tier.** The 27th beast of a tier is meaningfully stronger than the 1st, and the last sits about 15% below where the next tier starts. No more flat plateaus with a cliff at the end.\r
- **They unlock from humble to fearsome** rather than alphabetically.\r
- **Tier 0 is weaker as a whole.** A realm-0 character with no gear can now struggle through the first few fights instead of dying to them, which is the only realm where being ungeared is realistic.\r
\r
## What beasts drop\r
\r
Materials were falling out of everything. Now **beast cores are the common drop** — roughly one kill in three — and materials are genuinely uncommon. Exploring pays in materials; killing pays in Qi and cores.\r
\r
**Every material in the game now has at least one source you can go and get it from.** Some had none. Honing essences also drop, at a low rate.\r
\r
---\r
\r
## Exploring: rare finds stopped arriving in sixes\r
\r
A cultivation manual was turning up as **"Azure Breath Manual x3"** or **x6**. One resolved search stands in for several real ones — which is right for ore, and nonsense for a manual, where a second copy teaches you nothing. Manuals are authored as a single find and are handed over as one now. Rare finds are no longer multiplied.\r
\r
## And materials came back down\r
\r
Last version raised exploration to keep up with the cauldron: about **76 materials an hour** against crafting's 80. Then crafting slowed right down — a Qi Gathering Pill went from 90 seconds to 27 minutes — and nobody moved the other half. Six slots running flat out now eat about **27 an hour**, so exploring was supplying roughly three times what could be burned.\r
\r
Material yields are scaled back to match. A herb valley pays about **30 an hour** instead of 76. **Searches still find something nearly every time** — that part is not going back; you simply find a sensible amount of it.\r
\r
The guard that watches this ratio now works the drain out from the recipe itself, so a future change to craft times moves it automatically instead of quietly going stale.\r
\r
---\r
\r
## Crafting is a season's work\r
\r
Mastery XP scaled far too gently — tier 14/15 was a weekend. It now takes **months**, and experiment progress no longer scales with your level (which quietly meant every level cost the same 100 cycles, forever).\r
\r
Craft times went up to match: roughly **20 minutes at low tier, up to 4 hours at tier 10.**\r
\r
---\r
\r
## Reincarnation\r
\r
**Eleven new Soul Tree perks**, and a pile of things a rebirth was quietly forgetting to wipe.\r
\r
- **A granted starting realm now arrives at that realm's strength.** Perks that started you higher were handing you the realm without the stats, so you were *weaker* than if you had climbed there yourself.\r
- **Adaptive Blood** and **Malleable Physique** — three ranks each, one bloodline/physique reroll per rank. A reroll replaces what is on offer: you can still take what your last life carried, but the roll you walked away from is gone.\r
- **Polymath Soul** lets you commit to more than one craft — and the workshop now lets you **switch between them**, each with its own mastery.\r
- Two nodes that kept the first two zones unlocked did nothing at all, because those zones were always unlocked. They are now **Wayfarer's Instinct** and **Prospector's Eye**.\r
- Carrying a technique over no longer also hands you a scroll for it.\r
\r
---\r
\r
## Fixes\r
\r
- **The World Boss is a fight you play**, not a button pressed ten times.\r
- **Qi Gathering on iPhone** — about nine taps in ten missed the spheres. The hit test was being done per-mote instead of at the arena.\r
- **The combat background** now applies on mobile.\r
- **Locked things say why**, and a consumable that is refused tells you the reason.\r
- **Slot tiles** in the assembly bench rendered as 2x2 pixels.\r
\r
---\r
\r
## Under the hood\r
\r
- The app **downloaded all six languages** on every load. It fetches the one you use — about **30% off the download**.\r
- A refund that failed used to fail silently. It is recorded now.\r
`;
export { e as default };
