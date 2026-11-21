const e = `# Version 1.10.0 Patch Notes\r
\r
**Talisman crafters get two new verbs, every weapon in the game has been renamed and rebuilt across fifteen tiers, the World Boss pays properly and tells you when it falls, and every herb can finally be found by looking for it.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message.\r
\r
---\r
\r
## 🧧 Talismans: folding and annotation\r
\r
Talisman was the only craft with a single tab. It has two more.\r
\r
**Folding** presses two or three finished charms into one that carries all of their effects, each weakened. It always comes out weaker than using the charms separately — what you are buying is a **turn**. Two talismans cost two actions in a fight; a folded one costs a single action, and a fight decided in four rounds does not have two to spare.\r
\r
- **Mastery finally reaches the charm.** A fold keeps 50% of each effect at mastery 0 and 80% at 14. Inscribing already scaled with mastery, but the charm itself never got better — a tier-14 master made exactly what a beginner did.\r
- **Elements that agree keep more.** All one element: +12%. Three that disagree: −8%.\r
- The folded charm burns for as long as its **shortest** input, and only the strongest trigger technique survives, so a three-fold is not a battery of free ultimates.\r
- Fold a ward with its own spare — a stack can supply two of the three slots.\r
\r
**Annotation** moves power between the effects on a single charm. Higher mastery loses less (55% → 88%), and about one move in eight goes better than it should: either nothing is lost at all, or the charm keeps a fifth to two fifths of what it gave up.\r
\r
Folded and annotated charms keep their own artwork and show what they actually do in your bag.\r
\r
---\r
\r
## ⚔️ The armoury: 480 named weapons\r
\r
Every weapon has been renamed and rebuilt. Sixty per type across eight types — swords, daggers, hammers, axes, staffs, fans, spears and shields — spread over **realm tiers 0 to 14**, four of each type per tier.\r
\r
- **Weapons carry real elemental affinity**, read from what they are: one element below tier 8, two up to eleven, and **three at tier 12 and above**, so a blade at the top of the ladder answers to several daos at once.\r
- Stats now run the full ladder to tier 14 on the same curve as everything else.\r
- A handful of the old favourites were kept and reforged rather than replaced — **Emberblaze Katana**, **Gaia's Fist**, **Joltspike**, **Mindcleave**, **Mindbreaker Maul**, **Mental Convergence Trident**, and the **Blood Demon** three (Pride, Frenzy and Anger), which each carry fire, yin *and* metal.\r
\r
**Your old weapons are safe.** Superseded weapons no longer drop and cannot be newly discovered, but everything you are holding keeps working, keeps its artwork, and can still be sold. Every recipe you have already learned stays craftable — nothing you spent time discovering has been taken away. Monster drops, zone loot and starting gear all point at the nearest new weapon rather than simply losing an entry.\r
\r
---\r
\r
## 🐲 World Boss\r
\r
- **Claiming tells you what you got.** The button used to change to "Reward Claimed" and that was it — you had to compare your own currencies to find out what a World Boss was worth.\r
- **Premium crystals are actually paid.** They were advertised and never granted: 50 to first, 25 to the top three, 10 to the top ten, 5 to anyone who helped.\r
- **The boss is sized to its world.** A flat 20 million had gone stale — health is now scaled to what the realm can actually produce in a day, so it stays a real fight as the world grows.\r
- **The killing blow is worth something.** 25,000 spirit stones, 50 quest tokens and 25 crystals, on top of whatever rank you earned. Deliberately smaller than first place: landing the kill is a matter of striking at the right moment, and a prize that beat the damage board would turn the fight into a race to snipe the last sliver.\r
- **"Felled by"** is on the boss for everyone to see.\r
- **Everyone who struck it is notified when it dies** — in game and on your phone. The kill is when the payout becomes claimable, and nothing announced it, so anyone not watching at the right minute never learned there was something waiting.\r
\r
**Quest tokens buy sealed caskets**: one random piece of gear at a random rarity, from a band of tiers — 0–2, 3–5, 6–8, 9+ — at 60/120/260/550 tokens.\r
\r
---\r
\r
## 🔮 Arrays\r
\r
- **Any formation can serve a sect.** Sect grade used to be the formation's call and two thirds refused, so what a sect could field was decided by a flag rather than by the sect. The choice is free now and the trade is real: a sect array reaches **every member** and gives each of them **less** for it — an ordinary formation keeps about half its figure when spread, one designed for the work keeps around two thirds.\r
- **A sect holds one copy of a formation.** Racking the same array twice buffed the roster twice *and* drained the treasury twice. Duplicates have been collapsed.\r
- **Diagrams come in 2.5× faster** — 3% a search cycle, 5% a victory. You need one diagram of each of the four kinds before the bench does anything at all, and at the old rate that opening set was most of a day's exploring.\r
- **A sect can rack the arrays its masters actually design.** Assembled formations were invisible to the sect rack in five separate places, so an Array Master could work one out, forge it, and have nowhere to put it.\r
\r
There are **7,634,250,000** distinct assemblies, 1,316,250,000 of them sect-capable.\r
\r
---\r
\r
## 🗡️ Every blow looks like the weapon that landed it\r
\r
Basic attacks used to land as the same coloured bloom regardless of what you were swinging. Now:\r
\r
- **Five families of strike.** A sword cuts corner to corner, a spear drives in level, a hammer falls and rings, a staff sweeps, and a creature rakes. The slash is a tapered crescent with a hot core and a burst of sparks where the edge bites; crits swing wider and throw further.\r
- **A weapon's element imbues your basic attacks.** This was quietly dead — the metal on an Azuresteel Greatsword added nothing to the swing it belongs to unless you happened to know a metal technique. It lands on the blow now, and the defender answers with their resistance to *that* element.\r
- **Hit animations work on phones.** They never painted a blow at all: the element flash has been missing from the mobile battlefield since it was written.\r
- **Battleground weather stopped stealing credit.** A 256-damage sword blow was showing the hazard's "1" in the hazard's colour with no strike at all, because the weather bit first and the animation read the wrong hit.\r
- **Solo/Pack is one button** beside Fight Beasts, red when set to Pack.\r
\r
---\r
\r
## 🌿 Exploring, sects and fixes\r
\r
**Every herb can be foraged.** Eighty-nine of a hundred and ten could not be found by exploring at all — they dropped from beasts, so nothing was strictly unobtainable, but an alchemist who needed a particular herb had nowhere to go and look. Eleven ores were in the same state. All of them now grow somewhere.\r
\r
**A sect invitation reaches the person invited.** Clicking Invite on the friends list did nothing anyone could see — it sent a direct message and nothing else. It now arrives as a notification with **Accept** and **Decline** on it, and buzzes your phone.\r
\r
**Also fixed:**\r
\r
- Reincarnation forgot your craft. Carrying mastery through a rebirth dropped the specialization, so **array diagrams stopped dropping entirely** for anyone who had reincarnated.\r
- Four legendary origins granted **craft level 30** where the cap is 14.\r
- Duplicate-looking **Spirit Pill stacks** are not duplicates — a pill brewed from a variant carries a rider that was never shown. They are named now.\r
- **Experiment pools** refuse a material no design of that craft uses, instead of burning it.\r
- **Character select** opens on the cultivator you were last playing.\r
- The **pack penalty** is 5% per additional foe, capped at 15%.\r
`;
export { e as default };
