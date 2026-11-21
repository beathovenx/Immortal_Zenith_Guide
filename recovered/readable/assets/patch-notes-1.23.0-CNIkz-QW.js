const e = `# Version 1.23.0 Patch Notes\r
\r
**Where you came from stops being a difficulty setting — and a life that ends now leaves something in the ground for a stranger to find.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message.\r
\r
---\r
\r
## An origin becomes a life\r
\r
Every one of the 218 origins was the same shape: a stat block, a purse, and some iron armour, all three scaled by tier. **Every single one** started you in an iron plate chest and iron legplates — 56 "distinct" kits that were nested subsets of one armour set, **29 distinct items across all 218**. Sixty-four of them had no lasting effect of any kind. The difference between a noble heir and a mortal farmer was how much of the same iron they were handed.\r
\r
**Every origin now carries a standing** on the righteous/demonic scale, because *this life left no mark on your name* is a statement about a character, and a blank field is a statement about the content. **90 open righteous, 112 neutral, 31 demonic.**\r
\r
**And every origin now carries a cost.** At every tier, scaled with it, paid in a stat the origin does not boost, against a slightly larger gift. A mythic origin is a bigger **trade**, not a bigger gift — so picking one is a decision instead of a ladder.\r
\r
---\r
\r
## Fifteen new lives, each reaching a system no origin could reach\r
\r
**The Wanderer's Path** — four origins begin already holding an estate, in the starting town. Never with a sect: the loader refuses an origin claiming both, because a formation yard switches off the instant a disciple reads it.\r
\r
**A master** — sixteen origins name who taught you, and hand over what a master is actually worth. Not the book — the **reading** of it. Comprehension is where almost everything a manual pays lives.\r
\r
**The disciple origins, finished** — all twelve already enrolled you and granted the sect's manuals, and none of them had you understand a word of them. They now open **part-way into their own sect's primary art — 8, 20 or 35 comprehension by rank**, under the sect leader's name.\r
\r
**A name** — three origins begin with lifetime renown, which buys real things on day one: cheaper shelves, better searching, faster comprehension. Credited through the renown ledger rather than straight onto the column.\r
\r
**A bench** — blueprints, patterns and arrays were all grantable and alchemy recipes were not, so an origin could be a smith's child and could not be an alchemist's. Four origins now open knowing a recipe.\r
\r
All thirty new names and descriptions are in all six languages.\r
\r
---\r
\r
## A rebirth leaves something behind\r
\r
Reincarnation was entirely private: you ended a life, banked Dao Soul Points, and nothing about it reached anybody else. **One rebirth in four** now soaks something of the old life into the zone where it ended, and the cultivators already searching there come across it.\r
\r
**Three kinds, and they are not interchangeable.** A pool of water thick with the old life's Qi reinforces a **body**. A Soul Condensation Stone feeds **blood and element**. A Mental Clarity Spring sharpens a **mind**. Each gives from its own short list — a mind spring never deepens a bloodline, a body pool never teaches an art — so which one you find means something.\r
\r
**Charges are a guest list, not a counter.** When the relic is laid down it names the cultivators already searching that zone, **longest-standing first**, as many as the dead cultivator's realm earned: one at the bottom, six at the top. Fewer explorers than charges is not a problem to be solved — the relic serves whoever was there, and a quiet forest keeps its secret.\r
\r
---\r
\r
## What a relic is worth\r
\r
**The magnitudes are shares of the finder, not of the source.** Scaling purely by the realm of whoever left it is the obvious design and it is wrong on its own: a World Creator may reincarnate standing in the starter village, which drops an end-game windfall into a tier-0 zone where only novices search.\r
\r
So the source's realm sets the **share** — 2.5% of your own stat for a mortal's remains, 20% for a World Creator's — and the share is taken **of yours**. A great cultivator's remains are worth more everywhere and rewrite nobody.\r
\r
The same reasoning runs through the trait boon: it deepens **your own** bloodline or physique, as three essences of it would. The relic is steeped in somebody else's nature and the body answers by becoming more thoroughly itself. The alternative hands a stranger's SSS bloodline to a novice who found a puddle.\r
\r
A boon that cannot apply declines rather than firing emptily — nobody without a bloodline has one deepened, nobody practising nothing is taught — and another from that relic's list is rolled instead, so a relic never announces itself and then does nothing.\r
\r
---\r
\r
## A character is severed slowly, and can be called back\r
\r
Deleting was one statement: the row went, the slot was free. That made a re-roll free — delete, create, read the bloodline and the physique, repeat until they came up the way you wanted — and rolling a character is meant to be the decision the rest of the game hangs off.\r
\r
**A delete now schedules one, four hours out.** During the hold the character is entirely ordinary: it keeps its name, it keeps its **slot**, and it can still be played. So the friction is real whether or not you are watching the countdown — with a base allowance of one slot, rolling again means waiting, and waiting is never faster than playing the character you have.\r
\r
Cancelling asks for nothing. Scheduling already cost you a retyped name; making the undo equally laborious would protect nobody.\r
\r
---\r
\r
## The supporter tiers deliver what the shop card says\r
\r
**Four of the eight things a subscription advertises were not implemented.** Not broken — absent. Activation set the tier, the expiry and the premium spend that drives VIP, and that was the whole of it. A Mythic supporter was owed six hundred crystals a month, a fifth more Qi and two extra pills a day, and received a badge. All four are live now:\r
\r
- **Celestial Crystals — 100 / 250 / 600**, paid on each entitlement event: an activation, or a renewal the store tells us about. The store's billing period is the only authority on when a month has passed, so they ride on that rather than on a clock of our own.\r
- **Offline Qi — +5% / +10% / +20%.** Read live, so a lapsed subscription reads as no tier at all from the moment it lapses.\r
- **Daily pill safe limit — +1 / +2**, applied *after* the poison floor. A subscription buys extra capacity; it does not undo what a Medicinal Pond did to your body.\r
- **Priority craft orders.** A supporter's commission sorts to the top of the sect board — and now **says so with a badge**, because a sort nobody can see is a perk the buyer cannot tell they are getting.\r
\r
All four are withheld in a free realm, as every other paid benefit is.\r
\r
---\r
\r
## Phones\r
\r
Reported from a phone, and measured rather than guessed:\r
\r
- **The bottom nav buttons that "didn't react."** Not a missed tap. The strip's drag-to-scroll handler is meant to be mouse-only and was running on touch as well — a tap emits synthetic mouse events afterwards, so a finger drifting a few pixels scrolled the strip **under the press**, slid the button away, and the browser dropped the click. It got worse the fuller the bar got. Measured after: a 9px drift during a tap now moves the strip 0px.\r
- **The Haven's buildings** were an 84px target on a phone for the only way into its four rooms. 116px now, unchanged on larger screens.\r
- **The Wanderer's Path tagline** was six words and an ellipsis on a phone. Removed — the screen below it says the same thing at length.\r
- **The title and VIP line** sat under the scrim the character's own name casts, losing its top edge. Lifted clear.\r
- **Your standing** moves to the end of the gender and age line instead of taking a whole row to itself.\r
- **A Dao trial no longer selects its own instructions.** Tapping fast near a word is a double-tap, and iOS answered by highlighting it mid-run with a copy callout. Reported on Sword Flight, fixed for all five trials.\r
\r
---\r
\r
## Fixed\r
\r
- **Pills above your realm could be taken in a fight.** The bag's Use button has always refused a pill meant for a further-along body; the battle sheet never did, which made combat the one place in the game where the rule could be walked around. They are now kept out of the list *and* refused by the server.\r
- **Wandering encounters could arrive mid-battle**, interrupting the fight and sometimes failing it. Held back on both sides now: the client checks the route it is on, which cannot go stale, and the server stops offering them to anyone with a live battle at all. The offer simply waits until you are out of it.\r
---\r
\r
## Fixed — content and balance\r
\r
- **The Heir of Crimson Fate manual was filed in the wrong slot.** It was authored as a body manual, and everything else about it disagreed — a spiritual stat block, and three arts that spend energy rather than stamina. It sits in the spirit slot now, which also uncrosses a clash: a cultivator holding both Crimson Fate and the Vajra Eternal War Physique had two signature manuals competing for one slot and had to choose. The two gated on a bloodline are spirit, the two gated on a physique are body, and no character can hold a pair that competes.\r
- **The four new trait crests and tier-11 manual covers showed as blank cards on the website.** The site keeps a separate, trimmed art manifest and cutting 1.22.0 did not regenerate it.\r
- **The yardstick the whole world's difficulty is measured against was moving on its own.** It picked whichever origin happened to sort to the middle of the id list, so adding fifteen origins slid it from an uncommon life to a legendary one — doubling the baseline every zone gate is scaled against, with no balance figure edited and nothing failing. It is a draw-weighted average now, stable to a fraction when content is added, and it reproduces the old figure to within 4% — so the gates stay calibrated exactly where they are. **This is a stability fix, not a rebalance.**\r
\r
---\r
\r
## This update carries two migrations\r
\r
1.23.0 is the first release in a while that needs the database moved: \`0174\` for the deletion hold and \`0175\` for the relics.\r
\r
MinClient is unchanged. The server-side changes apply to your account whether or not you have updated — supporter benefits pay, relics are left and found, and a delete schedules rather than erases. What an older client cannot do is **show** you the four-hour countdown or the way to cancel it, or the priority badge on a craft order. Update when you can.\r
`;
export { e as default };
