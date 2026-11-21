const e = `# Version 1.22.0 Patch Notes\r
\r
**Combat learns to refuse a blow instead of just surviving it — and for the first time, everything out there can do it back to you.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message.\r
\r
---\r
\r
## Refusing a blow\r
\r
Every defensive idea in this game has been the same idea: **take less**. Armour took a share, resistance took a share, the rest went through.\r
\r
**Absorb** already broke that rule — an element you drink does nothing to you — and it now **heals you for a quarter of what the blow would have done**. Not a quarter of what was swung: a quarter of what would actually have got through after your defence, your resistance and your guard had their say.\r
\r
**Reflect** is the new one, and the louder one. The blow is refused the same way, and **three tenths of it lands on whoever threw it**. The return does not go through the attacker's own defence — it was mitigated once already, by you, and a share of what was left goes home.\r
\r
It pays more than absorb for a plain reason: healing is worth nothing when you are already whole, and a return is worth the same whatever shape you are in.\r
\r
Both come from a bloodline, a physique or a manual milestone. Neither is common, and neither should be.\r
\r
---\r
\r
## Wounds that belong to somebody\r
\r
Bleed has been in this game since the beginning and nothing was ever built on it, because bleed was **8 damage a turn** — written when a cultivator had a few hundred health, and still 8 at Void Emperor with three hundred thousand.\r
\r
A wound's bite is now **a share of the attack of whoever opened it**, read once, at the moment it lands. So a bleed is exactly as bad as the blow that carried it, at every realm, and it does **not** fade if the one who opened it is weakened afterwards.\r
\r
That one change needed six new kinds of status, because a wound now has an author and both parties get a say:\r
\r
- **Lifesteal** — the bearer heals for a share of the damage they deal\r
- **Healing cuts** — healing the bearer *receives* is reduced\r
- **Deeper wounds** — wounds the bearer *opens* hit harder (captured when each one lands)\r
- **Open wounds** — wounds already ticking on the bearer hit harder (read every turn)\r
- **Silence** — no techniques. You may still swing\r
- **Pinned** — you act every turn and the only thing you may do is attack\r
\r
And statuses can **stack** now instead of refreshing. A venom that did the same thing on the tenth dose as the first was a debuff with a snake on the label.\r
\r
---\r
\r
## Arts that are never cast\r
\r
Three new kinds of passive, carried rather than used, costing no turn:\r
\r
- One that **fires once when a health bar crosses a line** — yours or theirs\r
- One that **builds every turn** you are still standing, and never fades\r
- One that **rides every blow you land**\r
\r
The rarest of them refuses death outright: the first strike that would finish you doesn't, you hold at a single thread of life, and nothing touches you for a turn. Once per battle.\r
\r
---\r
\r
## Four bloodlines and physiques, and the manuals only they may read\r
\r
Each comes with a **tier-11 manual that nobody else in the world can comprehend** — and the trait grants only the *right to study it*. The book itself still has to be found.\r
\r
**Envoy of Sublime Death** (S+) — spirit, and a reflect. Its sutra drops rarely from any mortal zone. *Death's Last Bloom* hits half again as hard when you are nearly gone; *Death's Neglect* is the refusal to die.\r
\r
**Heir of Crimson Fate** (SSS) — blood and weapons, physical and metal in equal halves. *Crimson Field Absorption* gives you lifesteal and cuts their healing in half at once. *Heaven Severing Blood* opens every enemy at once and silences half of them. At full comprehension, *Crimson Blood Frenzy* wakes when **either** of you drops below half and doubles every wound you inflict.\r
\r
**Myriad Venom Sovereign Physique** (S+) — earth, water and physical. Two status immunities, one of them poison, and a body that doses whatever touches it.\r
\r
**Vajra Eternal War Physique** (SSS) — yang and metal. A physical reflect. *Perfect War Body* lasts longer the worse shape you are in; *Eternal War Momentum* strips your debuffs and hands them back as buffs half again as strong; *Radiant War Force* leaves a field where nobody may do anything but fight.\r
\r
---\r
\r
## Five hundred traits, made less alike\r
\r
**185 trait stat blocks reshaped.** Ranks had converged on a handful of silhouettes — too many traits that were the same numbers with a different animal on the front. They are varied now, at an unchanged total budget per rank, so this is variety rather than a buff.\r
\r
**164 arts renamed.** Above S rank, a trait's signature art was too often the rank below's art with one word swapped — *Revelation*, *Ancestral Edict*, *Legacy Incarnation* on a loop. No two traits in the game now grant an art by the same name.\r
\r
**42 D-rank drawbacks given their own shape.** Every one of them was the same penalty to defence with the same sentence attached. A brittle frame, a thin meridian, a shallow well — they read as different weaknesses because they are.\r
\r
Both generators had drifted far enough that running them **deleted content**; they were repaired before any of this, and they now carry fields they don't own through untouched instead of dropping them.\r
\r
---\r
\r
## The bestiary fights back\r
\r
A mechanic only the player has is a toy. **202 creatures** now carry arts built on everything above, handed out by what the creature *is* rather than at random — serpents envenom, undead stop a wound closing, constructs turn a blow back, aberrations silence.\r
\r
Ten new beast arts, four of them passives. **58 creatures drink an element** and **31 turn one back on you** — both deliberately rare, both from the upper bestiary only, and **89 creatures gained a weakness** so that a thing which drinks fire has an answer a player can guess.\r
\r
**Region tyrants wind up.** A tyrant's opening blow is announced the turn before it lands. That turn is the fight.\r
\r
**Monster speed keeps climbing.** The old curve flattened at about 80 by tier 14 while cultivators were reaching two and three hundred, so every late fight was a cultivator taking two turns to a tyrant's one. Tiers 0 to 7 are untouched; tier 14 goes from 82 to 151.\r
\r
Eleven region seats were renormalised against their own region's peak, which moved most of them up a little.\r
\r
---\r
\r
## The wiki now says what any of it does\r
\r
You could read all 1,541 battle techniques on the wiki and still not know what a single one of them **did**, because the doing lives in the status ids they list and those were never published. "Applies venom" is not an answer to "what does venom do".\r
\r
**A Status Effects tab**, with all 319 statuses in the game sorted under the sixteen kinds they belong to, read live from the game like everything else there. The kind is the part that matters — the same *25%* is a quarter of your health as a ward, a quarter off the healing somebody gives you, or a quarter more damage from every wound already open — so each card says what its number *means*.\r
\r
Below it, the mechanics that are **not** statuses and could never appear in a list of them: absorb, reflect, weakness, immunity, stacking, who owns a wound, split elements, execution and desperation, death saves, telegraphs, break.\r
\r
---\r
\r
## The guide covers the whole game now\r
\r
It stopped at nine sections a long time ago and the game kept going without it. **Twenty sections**, with eleven new ones: manuals and mastery, making a living, what a fight does to you, exploring, campaigns and climbs, the Wanderer's Path, renown and titles, guardian beasts and soul demons, families and heirs, reincarnation and the Soul Tree, and everybody else in the world.\r
\r
---\r
\r
## Smaller things\r
\r
- **The combat log can describe what is happening to you.** Twelve things it previously had no words for: a blow reflected, a death looked away from, a body proof against a status, a wound drunk, a venom deepening by a stack, a silence, a pin, and afflictions turned back into strength. In all six languages.\r
- **A manual you can no longer read is taken off you.** Change the bloodline a restricted manual belongs to and the comprehension goes with it, rather than leaving you with an art nothing in the game will let you use.\r
- **Everything that moves your health goes through one door.** A single path for damage and a single path for healing, which is the only reason a death save, an immunity and a reflect apply everywhere instead of in the one place each was written for.\r
\r
---\r
\r
## Fixed\r
\r
- **Bleeds and poisons stopped mattering somewhere around Core Formation.** A flat 8 damage a turn is a real wound at tier 1 and a rounding error at tier 14. Every damage-over-time now scales from the attack that opened it.\r
- **A creature's passives never reached the fight it was in.** The battle AI correctly refuses to *cast* a passive, so any passive listed on a creature was quietly skipped and did nothing at all. They are sorted out of the AI's hands at load now and asked for by the engine instead.\r
- **Some creatures could not be beaten.** A lockout art on a creature that heals itself is a stalemate — you may only swing, it mends faster than one swing a turn, and the fight runs to the cap with the creature ahead. A realm-9 lotus went 0 for 24 against a well-geared cultivator before a simulation audit caught it. Neither a lockout nor a reflect goes on something that can mend itself.\r
\r
---\r
\r
## This update is not required\r
\r
1.22.0 is additive and no database migration comes with it. Older clients keep working — but the combat changes are the server's, so wounds, reflects and beast arts apply to your fights whether or not you have updated. What an old client will not do is *describe* them: the new log lines render as blanks until you update.\r
`;
export { e as default };
