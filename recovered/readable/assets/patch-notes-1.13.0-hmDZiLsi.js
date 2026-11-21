const e = `# Version 1.13.0 Patch Notes\r
\r
**Every beast in the game now has a kind — fox, dragon, humanoid, elemental — and bloodlines, physiques and weapons can hunt some kinds better than others. The armoury is rebuilt from the ground up, region tyrants stop being pushovers, the World Boss lives a week instead of a day, and a new cultivator is walked through twenty-two guided lessons.**\r
\r
**This release comes with a server reset — characters and worlds start fresh.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message. Only the FIRST blockquote of this opening section is\r
> stripped before posting, so keep this note the only one here.\r
\r
---\r
\r
## Beasts have a kind\r
\r
All 724 beasts now carry one or more creature types — vulpine, draconic, avian, insectoid, humanoid, elemental, and twenty more. You can see them on the beast's card before you commit to the fight.\r
\r
They are not decoration. **Bloodlines, physiques and weapons can now favour or fear a kind:**\r
\r
- 122 bloodlines and 117 physiques carry a creature affinity. A serpent bloodline hunts what serpents hunt.\r
- 60 weapons across every tier do too — a boar spear really is better against boars.\r
- Rank S and above are **pure upside**. No high bloodline carries a drawback.\r
\r
Where they overlap, they multiply. Your bloodline and the blade in your hand both count.\r
\r
**And it is all visible now.** The trait card and the item detail each say what that one source contributes; your stat sheet shows the assembled total; and the pre-fight screen tells you what it comes to against *that* beast — "You deal +23%", "You take +12%". Nothing is shown when the matchup is even, which is most fights.\r
\r
---\r
\r
## Beasts drop the bloodline they look like\r
\r
Every fight — hunting, auto-combat, and the fights you find while exploring — now carries a quiet chance at a bloodline or physique crystal:\r
\r
\`\`\`\r
  rank D–B      2%\r
  rank A–S      1%\r
  rank S+/SSS   0.1%\r
\`\`\`\r
\r
It is weighted by what you killed. Crane beasts drop crane bloodlines; fire beasts drop fire physiques.\r
\r
Deliberately **not** listed in the drop table. A 3.1% chance at a bloodline is meant to be a thing you are surprised by, not a thing you farm.\r
\r
---\r
\r
## The armoury, rebuilt\r
\r
**634 pieces of armour**, generated from the artwork itself so what you see is what you get.\r
\r
Within a tier, families are worth about the same in defence and health — you should not be picking armour by which number is bigger. What differs is the *second* thing each gives: 419 pieces ward and sharpen one element, the rest buy speed, crit, damage reduction or regeneration.\r
\r
**43 families carry a real set bonus.** None below tier 3, all of them from tier 11 up, where the choice is between builds rather than between "a set" and "not a set". Set pieces below tier 11 are **crafted, never found**.\r
\r
Weapons now state what they are — sword, spear, hammer, axe, dagger, staff, fan or shield — instead of it being guessed from the name, and every weapon's stats were rebuilt to match its type.\r
\r
**437 old pieces are retired.** The unnamed starter weapon set is gone, along with its blueprints, and nothing hands them out any more. Seventeen high-tier beasts were dropping tier-2 daggers; they no longer do.\r
\r
**Every material is spendable.** 120 materials, mostly at tiers 10–14, were called for by nothing at all. They are now used. Drop rates follow demand, so a material two hundred designs want is no longer as scarce as one a single pill needs.\r
\r
---\r
\r
## Tyrants are the hard fight now\r
\r
Every one of the ten region tyrants was **weaker than the strongest ordinary gate leading up to it**. Chaoslords Domain scored a seventh of the zone before it.\r
\r
The cause was structural — a tyrant is one monster with no pack scaling, an ordinary gate is three beasts with it. Each tyrant is now scaled to 1.5× its own region's peak.\r
\r
Beasts also have their own speed now, instead of every creature in the bestiary sharing one formula.\r
\r
---\r
\r
## The World Boss lives a week\r
\r
It was sized against what the whole world could do at full effort, which on a single day meant it either died before most people had swung, or ended undefeated and paid out to nobody — a claim requires the kill.\r
\r
Seven days of strikes now go into one pool. **You still get ten strikes a day**; that has not moved. The panel shows both clocks: the boss's week under its health bar, your day's strikes under the strike count.\r
\r
**Its prize was also the same every week.** The roll ignored everything except rarity, so first place took the same legendary forever — and a Foundation cultivator in tenth place was handed gear from seven realms above. It now rolls against the claimant's own realm.\r
\r
---\r
\r
## Elemental Escalations start where you are\r
\r
The mode unlocks at realm 3 and opened at **tier 0** — three realms below anything you had fought in weeks.\r
\r
Worse, all ten chapters covered the identical difficulty band. Chapter ten was tier-for-tier the same as chapter one, differing only in paint. A mode called Escalations restarted, ten times.\r
\r
Normal now opens at tier 3 and ends where Hard begins, so the three difficulties form one continuous ladder, and each chapter is genuinely harder than the last. Bosses hit harder than the fights leading to them, and the modifier rolls are no longer so sparse that two fights in a row could carry none.\r
\r
---\r
\r
## Dao trials pay differently\r
\r
A trial topped your Qi pool up by a flat 15% of it — and a share of the pool is the one reward that can never fall behind, because it *is* the pool.\r
\r
By the Celestial realms, eight attempts a day came to a breakthrough a day, at every realm, forever. A cultivator who played their dailies reached World Creator in **78 days**, against 25.8 years for the same character who did not. The dailies were not a supplement to progression; they were progression.\r
\r
Qi from a trial now runs from 7% of the pool at Human down to 0.1% at World Creator.\r
\r
**What a trial pays instead has grown**, in the two things that are capped and so cannot run away with the pacing:\r
\r
- **Comprehension** — one hour of idle gain per run, up to three. Dailies roughly double a diligent cultivator's rate of understanding.\r
- **Weapon mastery** — new. One hour of training-hall rate, credited to every weapon type you are holding, in full rather than split. It lands even with no active manual.\r
\r
The mortal realms are untouched: through Nascent Soul the trials were never the constraint.\r
\r
---\r
\r
## Tribulation talismans finally do something\r
\r
All fifteen tribulation charms granted a bonus to your *odds* of surviving the Heavenly Tribulation. The tribulation stopped being decided by odds in 1.12.0 — it is a fight now — so every one of them had been doing **nothing whatsoever**.\r
\r
They raise a ward instead. Burn one before you climb; for the next hour it stands ready, and when the lightning comes it closes into an absorb shield **for two turns** — two, because the trial always strikes first, and a one-turn ward would soak the opening blow and nothing else.\r
\r
The shield is a share of your maximum health, and the share is the number the charm already carried: a charm that promised +22% odds now absorbs 22% of your health.\r
\r
---\r
\r
## Twenty-two guided walkthroughs\r
\r
A new cultivator is now walked through the game one screen at a time — the dim comes down, one control is lit, and the text talks about the thing it is pointing at.\r
\r
Six run in sequence: the character sheet, your bag, cultivation, combat, the world map and exploration. The rest wait for something to happen — a battle technique learned, a weapon first trained, a tyrant coming into reach, a sect joined, the Social tab opened for the first time.\r
\r
**Crafting gets its own, at Qi Condensation**, laying out the five professions and what each is actually for. It stops at the choice rather than making it for you.\r
\r
**Then one per bench**, when you take that profession — and each hands over what its first lesson needs, so you can perform it rather than read about it. An alchemist gets twelve fourleaf clover (six research attempts, because one proves nothing); a talisman master gets a pattern and ten sheets of paper.\r
\r
Help no longer interrupts, either: every walkthrough can be replayed from the help button.\r
\r
---\r
\r
## Crafting\r
\r
**Track what you need.** Tick Tracked on any recipe, blueprint, pattern, array diagram or plain material, and the shops answer "do I need this?" for you. The market gets a Tracked filter that stacks with the others; the merit shop marks tracked goods as well as filtering them.\r
\r
**The inscribing bench says what each pattern makes.** 175 patterns showed a name, a tier and an element and nothing about what burning the charm would do — so you chose by the picture and found out by making one. Battle talismans now state their effect and duration, and hour-long buffs state their proportion.\r
\r
**Study ×10 was taking the materials four to six times.** Every press started a fresh run, and since nothing on the Assemble tab draws a crafting slot, none of it was visible. The bench now shows the run in progress — which slot, understanding, sets left, and a countdown.\r
\r
**52 designs could not be studied by the crafter who knew them.** None now.\r
\r
---\r
\r
## How you look\r
\r
**72 new avatars** — thirty-six women and thirty-six men, each with a clear elemental or thematic motif — and **56 frames**, where only twelve were reachable before.\r
\r
The frames also **fit** now. Every frame is a ring with ornament hanging off it, and the ring's hole is about half the image; the portrait was being drawn a third wider than the hole it was meant to sit in, so the band covered its edges. Every frame's inner ring was measured, and the portrait is now the same size behind all of them.\r
\r
**Sects have banners.** The NPC sects were showing a blank square; each now carries an emblem matched to what it practises. And you pick your own emblem **while founding the sect**, on the same page as its name, rather than discovering the option in a settings tab afterwards.\r
\r
---\r
\r
## Fixes\r
\r
- **Sealed caskets could charge you and drop the prize on the floor** if your bag was full — tokens gone, nothing gained. Room is checked before payment now, and the casket says what it handed over.\r
- **The zone survey clipped its own contents.** A rich zone's last materials could not be read and nothing suggested there was more.\r
- **The experiment bench offered materials your profession could learn nothing from**, then refused the pool after you had chosen them.\r
- **The tower, region events, caskets, fortune finds, Caravan kits and the World Boss could all hand back a retired weapon.** Only the town shop was checking.\r
- **Capes were being hammered out of ore** and two cloth families sent to the forge, because "cloth" was decided by a substring test on the filename.\r
`;
export { e as default };
