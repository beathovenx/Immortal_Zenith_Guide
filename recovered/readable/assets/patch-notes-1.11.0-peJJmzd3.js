const e = `# Version 1.11.0 Patch Notes\r
\r
**A second sky opens above the mortal world. Exploration becomes a map you climb, with fifteen towns to walk between, and the last four tiers of the ladder finally have pills, talismans, materials and cores of their own.**\r
\r
**This one needs an update to play.** Exploration changed shape too much to keep older clients working — a zone is a place on a trail now, not a name in a list — so an old client would draw you a map with no road on it.\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message.\r
\r
---\r
\r
## Exploration is a map you climb\r
\r
Each region is now a **seven-zone chain with three forks**, gates guarding the way up, and a **tyrant holding the domain at the top** — the one fight that opens the next region. The domain is drawn larger than the zones below it, because on a map of equal vignettes the boss stage read as just another stop on the trail.\r
\r
## Fifteen towns, and the roads between them\r
\r
Above the trail sits the world. Towns are **one to five hours apart**, and travel leaves you **cultivating on the road at half Qi** — with a Soul-Tree perk that shortens the journey.\r
\r
Sects now keep their halls **in towns** rather than floating in a region, and random events happen where people are.\r
\r
Inside a town:\r
\r
- **Shops with finite daily shelves**, and a counter that buys back at a third.\r
- **NPC refiners and tailors** who will hone a piece to **+5** for a steep fee, and never fail.\r
- **Profession masters** who take a student on five dice — and **only in the craft you have actually taken**. A master teaching blueprints to an alchemist would be teaching something they can never use, so the door says no before the dice are thrown.\r
\r
**The shop window now shows what a thing does.** A pill, a talisman or a blade reads on the shelf exactly as it will in your bag.\r
\r
---\r
\r
## Reading the world map\r
\r
Two controls in the corner.\r
\r
**Fullscreen**, the way Explore already does it.\r
\r
And an **eye**. Fifteen lettered vignettes tell you where everyone lives while hiding the land they live in — so closing it **folds the towns down to points and writes the region names across the map** instead. It runs in reverse on the way back up.\r
\r
Region and town names were also never being translated. They are now, in all six languages.\r
\r
---\r
\r
## The Celestial Realm\r
\r
**Ten regions above the clouds. A hundred and twenty zones, eleven cities and fortresses, ten tyrants, and thirty beasts at a tier that did not exist before.**\r
\r
Getting there is its own act. Roads run under one sky, so travel stays inside a realm and crossing is **Ascend**, which lands you at the realm's lowest-tier town rather than anywhere you pick.\r
\r
**Two conditions gate it, and both must hold: Immortal Emperor, and the fall of the Endless Rifts tyrant.** A number alone was the wrong shape of gate — cultivation and world progress drift a long way apart, and every other door in this world opens on a tyrant rather than on a realm.\r
\r
A locked sky is **shown rather than hidden**, with both conditions ticked off as you meet them. A door that says only "locked" is a wall.\r
\r
---\r
\r
## Tyrants hold the top of their region\r
\r
**A tyrant now sits at its region's ceiling** rather than one tier under it.\r
\r
One under meant the last fight of a region was not the hardest thing in it — an ordinary beast a zone earlier could hit harder than the tyrant guarding the way out, which is a strange note to end a region on.\r
\r
The mortal ten are untouched and still sit one under theirs.\r
\r
Whatever is holding the thrones above the clouds, you will want to be ready for it.\r
\r
---\r
\r
## Tiers eleven to fourteen have something to brew\r
\r
Every consumable in the game stopped at **tier ten**. A cultivator who crossed into the celestial world kept swallowing the same pills they had carried for the whole climb.\r
\r
**Seventy-six new consumables** — nineteen a tier: eight pills, three buff scrolls, eight talismans. Two families are genuinely new, a **speed-and-crit pill** and a **healing pill**, so the top of the game is not just the old effects with bigger numbers on them. No two items inside a tier do the same thing.\r
\r
**Forty new materials** to make them from, and **forty-four talisman patterns** to observe, spread across the celestial zones so every pattern can be found before any is found twice.\r
\r
**138 new item icons** are in and live.\r
\r
---\r
\r
## Cores go past transcendent\r
\r
The beast-core ladder ran low / mid / high / supreme / transcendent and **stopped at tier 8**. Everything above shared the top rung: whether you were making tier 8 or tier 14, the reagent never changed. Six tiers of climbing on one material.\r
\r
**Twenty-two new cores, eleven elements each:**\r
\r
- **Transcendent** — tiers 8-9\r
- **Celestial** — tiers 10-12\r
- **Sovereign** — tiers 13-14\r
\r
Supreme gives up tier 8 to make room, which fits better anyway: a tier-8 beast was dropping a tier-6 core and now drops the core of its own tier.\r
\r
**327 beast drops, 128 zone yields and 276 recipes** moved onto the new grades. Every grade is obtainable in every element, and no recipe asks for a core nobody can farm.\r
\r
---\r
\r
## The legacy beast cores are retired\r
\r
\`beast_core\` and its seven siblings were a holdover from before the graded ladder existed — and \`beast_core\` was the worst of them: **one flat material dropped by 674 of 684 creatures** across tiers 0 to 13, standing in for the whole game.\r
\r
They are replaced tier-by-tier: a monster's drop takes its band from the monster, a recipe's from the recipe, a zone's from the zone.\r
\r
**Your bags are converted automatically.** Quantities are preserved exactly. **The total core drop-rate is unchanged** for all 684 monsters — the tables just got simpler, with 516 creatures now listing one core where they used to list two.\r
\r
---\r
\r
## Nothing hands out an item far above its own tier\r
\r
**Eighty-eight sources did.** The worst was the first tyrant in the game, at tier 2, handing out a **tier-5 blade 85% of the time** — three chapters of progression arriving in the first hour. These were not lotteries; the equipment offenders took a median 30% share of their table.\r
\r
An opportunity prize now sits at **the zone's tier plus two**, and a zone's own yield sits at **its own tier**.\r
\r
Substitutions stay in the family — **an ore is replaced by an ore, a herb by a herb, and frost zones keep their cold**. Fixing tiers by number alone would have had snow zones handing out desert flowers: one failure traded for another.\r
\r
Six starter beasts dropped a **high** honing essence at 2%, five tiers above themselves. That is a real treat and worth keeping, so they drop the **low** one now — the same thing at the right tier.\r
\r
---\r
\r
## The World Boss\r
\r
**The rank above the leaderboard disagreed with the leaderboard itself** — listed third, told fourth. Two separate reads with strikes landing between them. One statement answers both now, so they cannot disagree, and it is still right for a player outside the visible top ten. The own-row highlight had also never once fired.\r
\r
**And the boss was sized against blows nobody throws.** Its health was priced against a plain attack, but a real strike carries a technique multiplier running up to **2.5x** — and nobody who cares enough to fight the boss swings bare-handed. The world's actual output was roughly double what the boss was built for, so it was dying in about a third of a day to a handful of strong cultivators.\r
\r
The multiplier is now in the sizing, with a **floor** set by what the strongest ten could manage at full effort — a world with its power in five people is a different fight from one with it spread over fifty — and a **ceiling** over both, because the boss resets daily and a claim requires it dead. An unkillable boss pays nobody.\r
\r
---\r
\r
## Also in this release\r
\r
- **The Empowered Tyrant is a real rematch**, at two tiers above the one you felled. The scale factor was being silently discarded.\r
- **Masterworks are capped at two equipped**, and cannot be applied to a piece you are wearing.\r
- **Every daily reset moved to the UTC day** rather than the server's local one.\r
- **The world map and town streets fill the screen properly on a rotated phone.** Fitting to height was right until you turned the device, at which point the map stopped short and left a black band down the side.\r
- **Celestial zones were searching for 82-97 seconds each**, which quietly collapsed their search repeats to one and left the whole realm yielding a quarter of what your crafting slots drain. They match the mortal pace now.\r
`;
export { e as default };
