const e=`# Version 1.33.0 Patch Notes [11/20/2026 4:00 PM]\r
\r
**A rebuilt Soul Tree with a full refund, 31 new perks, a new battle layout, one crafting slot pool for every craft, rebalanced alchemy schools, and fixes for over forty of your reports.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message.\r
\r
Reports are numbered in #bug-reporting as **ISSUE-N** and suggestions in #user-suggestions as **ENHANCE-N**, so you can see when yours was acted on.\r
\r
---\r
\r
## Soul Tree: rebuilt, and every point refunded\r
\r
- **Full refund.** When this patch goes live, every rank you own is refunded at the price you paid, and your lifetime points are recalculated under the new rebirth award. You will get a notice. Spend them fresh.\r
- **Rebirth awards are normalized.** How many points a rebirth grants is changing, so that a few reincarnations no longer fill most of the tree.\r
- **Deeper rows cost more**, so the far ends of the tree are a real long-term goal.\r
- **Branches.** Each tree is now 3–6 themed branches, each with a cheap root that deepens toward its strongest perks. On desktop they sit side by side; on phones they stack, with no sideways scrolling.\r
- **Rebirth branch:** Many Roads leads to three lines (bloodline, start realms, physique). Unbroken Meridians and Treasured Inheritance sit at the end and need all three.\r
- **Unbroken Meridians** now carries 0.01% a rank (was 0.05%), and carries energy and stamina regeneration as well as health.\r
- **Art** for every node.\r
\r
---\r
\r
## 31 new Soul Tree perks\r
\r
- **Cultivation:** Deep Reservoir (+Qi pool), Stable Core (+5% safe pill limit a rank), Moral Anchor (keep part of your alignment through rebirth), Demonic Communion (+3% a rank soul-demon growth from Qi fed), and Enduring Vitality, Endless Breath and Tireless Sinew (+1% health, energy and stamina regeneration a rank, 10 ranks each).\r
- **Combat:** Iron Will (shorter knockouts), Opening Strike (+3% first-turn damage a rank), Boss Slayer (vs region tyrants and world bosses), Guardian Bond (faster eggs, more guardian exp), Bounty Instinct (+1 bounty a rank) and Dangerous Bounty (one bounty a rank becomes much tougher and pays much more).\r
- **Tower Memory:** start 5 floors higher a rank. The floors it skips count as cleared, and one **Claim all** button collects their rewards.\r
- **Exploration:** Lucky Wanderer (+1% find chance a rank), Herbalist's Eye and Miner's Eye (a second look for a higher-tier herb or ore), Secret Realm Sense (+10% daily realm energy a rank).\r
- **Crafting:** Pill Furnace Memory, Blueprint Memory, Loom Memory and Talisman Pattern Recall (keep part of your designs through rebirth; ENHANCE-92), Steady Fire (better pill grades), Charged Ink, Patient Hands, Masterwork Instinct (+1 masterwork a day a rank), Scribe's Diligence (+1 scroll a day), Guild Standing (lower market fees), Array Endurance, and Divine Influence for Refining and for Tailoring (a chance at an extra attribute).\r
- **Beast Lore** now actually adds its damage. It never applied before.\r
\r
---\r
\r
## Crafting\r
\r
- **One slot pool for every craft** (ISSUE-86). Up to 6 slots, shared by every bench, array forge and talisman desk, so a cultivator with several crafts isn't limited by whichever one they started with. Timers now run on the server's clock.\r
- **Alchemy schools rebalanced.** A permanent stat pill now belongs to the school of the stat it raises: health, energy and stamina pills are Life; mental fortitude and Qi pool pills are Soul; attack, defense, speed and crit stay Empowerment. Every school now has permanent pills at nearly every tier. **If you already chose a school, you get one free change**, and your concoction comes with you.\r
- The brewing odds now include your school's quality bonus, which brewing already applied.\r
- **Folding** a Medium or Large talisman now keeps its charge. It used to fold in at Small strength.\r
- **Crafts no longer stall** (ISSUE-108/113): switching an array on or off mid-craft re-times the craft, and stuck crafts are found and restarted.\r
- **Research and open-ended crafts** pay for each cycle as it starts, so running out of materials ends after a full cycle instead of wasting the last one (ISSUE-101).\r
- **Tailoring experiments** now find tailoring patterns, not refining blueprints (ISSUE-110).\r
\r
---\r
\r
## More crafting\r
\r
- **Craft time reduction** now applies to array forging and research, and variants show their own time (ISSUE-97/107/109).\r
- **Array masters** teach diagrams and the top band in high-tier towns (ISSUE-99). The rebirth screen lists the diagrams Diagram Recall keeps (ISSUE-92).\r
- **Qi arrays** worn and in your haven each show their own Qi gain (ISSUE-111).\r
- Each bench's Enhancement tab lists only the gear that profession can hone.\r
- Mastery XP shows for every craft and in the craft log (ENHANCE-91/106). Blueprints show their item type (ENHANCE-108), scrolls show what they make (ENHANCE-104), and locked recipes are listed greyed out (ENHANCE-118).\r
- Clearer names: Primordial essences in the hone list, readable array stats ("Fire ATK"), and tailoring says weave and pattern. Variants that roll the same name get a numeral.\r
\r
---\r
\r
## Combat\r
\r
- **New Ornate battle layout**, now the default, with framed art, technique cards, live turn order and attack cues. It has layouts for narrow windows and phones. Classic is still in Settings → Combat Layout.\r
- **Faster foes act first** when a hunt starts and at the start of each round, so you choose after seeing their move. Duels are unchanged.\r
- **Hotkeys** A, F and D for attack, focus or surge, and defend (ENHANCE-105/112). Settings can hide the Techniques button and open the battle log by default (ENHANCE-101/123).\r
- **Enemy cards** show which elements they absorb, reflect or are weak to (ENHANCE-129).\r
- **Possessed beasts** roll their drops 3–5 times (ENHANCE-114).\r
- **Tribulation heralds** are now 10% faster than you instead of a flat +4 speed. Slow builds were losing almost every Immortal Ascension tribulation.\r
- Long fights keep their hit flashes and animations, and big numbers use K/M/B/T.\r
- Sect-mission fights return you to the missions board (ENHANCE-125).\r
\r
---\r
\r
## Hunting around the clock\r
\r
**Lifetime win counts** now drive the Auto button and every win-count unlock, and old battle history is trimmed to your last 1,000 fights. That trimming also fixes rebirths that timed out on a long history (ISSUE-112).\r
\r
**Misfortune.** Hunting for very long stretches without rest now draws misfortune, and the longer it goes on, the more likely and the worse it gets. A misfortune can be:\r
- thieves stealing 10%, 25%, 50% or 75% of your materials;\r
- a pickpocket taking 10%, 25%, 50% or 75% of your spirit stones;\r
- a demonic ambush that knocks you out for 30–90 minutes and steals 10%, 20% or 30% of your remaining years;\r
- losing a piece of the gear you are wearing;\r
- one stat (health, attack, defense, mental fortitude or speed) weakened by 5%, 10%, 15% or 20% for 24 hours.\r
\r
Ordinary play never comes near it. Rest now and then, and the streak resets.\r
\r
---\r
\r
## Quality of life\r
\r
- **Pills:** grade shows in trades (ENHANCE-88), and every pill shows its pill-load cost and how many of each kind you've taken this realm (ENHANCE-89/97).\r
- **Equipment Souls** get their own bag and Collection group (ENHANCE-90/96).\r
- **Market:** a bloodline and physique rank badge and filter (ENHANCE-103); you stay on the Sell tab after listing (ENHANCE-94); active arrays are easy to spot, and plates show their effects and time left on desktop (ENHANCE-107/120).\r
- **Families:** heads can remove a member (ENHANCE-109/113).\r
- **Sects:** donation rules can name a single item (ENHANCE-98).\r
- **Rebirth:** an heir sees the Dao Soul they will inherit and gets exactly that one (ENHANCE-128). HP regeneration follows the health Unbroken Meridians carries (ENHANCE-46).\r
- A **Rare finds** notification tab (ENHANCE-93).\r
- Exploration drops attack pills of the zone's own tier (ENHANCE-126).\r
- **Character names are unique across every world.** If yours was a later duplicate, it has a suffix and you get a free rename.\r
\r
---\r
\r
## Fixes\r
\r
- **Duplicate stacks** no longer appear when items arrive at the same moment, and existing ones are merged (ISSUE-60).\r
- **Techniques level up again**: manual XP keeps its fractions (ISSUE-77).\r
- **Weapon Instinct levels survive rebirth** (ISSUE-102); **Prospector's Eye** adds its Fortune (ISSUE-103).\r
- **Mental fortitude** from arrays, traits, banners and buffs counts toward comprehension (ISSUE-88).\r
- Travelling ends dual cultivation (ISSUE-76); the world boss accepts only your loadout arts (ISSUE-96).\r
- **Rebirth** opens regions in order (ISSUE-94). Sects start at Body Tempering, and inviting a Human-realm cultivator says so (ISSUE-73).\r
- Event notices name the prize (ISSUE-78/90); market notices name array plates (ISSUE-74).\r
- Physique essences file correctly (ISSUE-84); hidden beast-type damage bonuses are now listed on items and in stat sources (ISSUE-82/98); origin drawbacks show on the picker (ISSUE-105).\r
- The boss card no longer hides behind the battle log (ISSUE-81); the Social tab label is fixed (ISSUE-80); family crests stack correctly (ISSUE-91).\r
- Sect contracts are for outsiders, so members no longer see a Withdraw they can't use (ISSUE-93). Daily sect missions stop asking for Equipment Souls or retired items.\r
- Founding a sect only counts manuals taken by sects in your own world.\r
\r
Thank you for every report and idea. Keep them coming in #bug-reporting and #user-suggestions.\r
`;export{e as default};
