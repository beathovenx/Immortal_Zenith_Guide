const e=`# Version 1.16.0 Patch Notes\r
\r
**A fifth Dao trial: ride a flying sword down a closing canyon. Every attribute on your sheet can now say where it came from, line by line. Every sect member draws a daily stipend. Masters finish their own lessons and tell you what you learned. And the first gates on the Mortal Realm trail are fights a new cultivator can actually take, rather than walls quoting thirty times what they carry.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message. Only the FIRST blockquote of this opening section is\r
> stripped before posting, so keep this note the only one here.\r
\r
---\r
\r
## Sword Flight\r
\r
**A new Dao trial.** Ride a flying sword down a canyon. Hold to rise, let go to fall, and stay off the rock for as long as you can hold it in the air.\r
\r
The gaps close and the sword flies faster the longer the flight lasts, so a later second is worth nearly twice an early one. The reward for lasting *is* the number that measures it — there is no bonus bolted on the end, just a distance that gets harder to add to.\r
\r
It joins the daily rotation, with a leaderboard of its own.\r
\r
Every canyon is checked before anyone flies one: 400 seeds, 220 columns each, proving every column has a gap wide enough for the sword, that the arena's edges stay solid, that a block hanging in mid-air leaves room on both sides, and that consecutive columns share an opening you can actually cross between. It is meant to be hard, never unfair.\r
\r
It was tuned by flying it rather than by guessing. A simulated pilot with a human's reaction lag flew a few thousand canyons, and the first version killed it in a median of four seconds — 182 of 200 deaths on a block hung at the exact centre of the passage, which is precisely the line a pilot holds. Obstacles now hang clear of the line you are already on: something to steer around, not a coin toss.\r
\r
---\r
\r
## Every attribute can say where it came from\r
\r
Your sheet showed a total and nothing else. But your attack is the base block, plus nine pieces of gear, plus three manuals, plus a bloodline, a physique, an origin, an armour set, a demon pentagram, a family banner, whatever arrays are burning, and whatever you drank an hour ago.\r
\r
So *"why did my attack drop overnight?"* was a question nobody could answer.\r
\r
**Tap any attribute or element now and a panel lists every contributor** — what each one gave, and the total they make.\r
\r
Anything proportional reports both halves: the percentage it promises, and what that promise is worth to you *right now*. A trait with four milestones of +10% correctly reads 46%, not 40%, because those compound. A source that both adds and multiplies keeps its halves apart, rather than merging into one figure that would misreport both.\r
\r
The numbers are measured off the real calculation as it runs, not re-derived alongside it — so the breakdown cannot drift from the arithmetic that actually decides your combat.\r
\r
Weapon mastery is split back out of the weapon it scales, so your sword is credited with what its own item card claims, and your mastery with the rest.\r
\r
---\r
\r
## Every member draws a stipend\r
\r
A treasury that only ever paid for donations gave most members no reason to care what was in it. A disciple who never crafted saw a number on the wall and nothing else.\r
\r
**Every member now draws daily from the sect treasury**, sized by your standing and by the sect's rank. Four disciple ranks and the appointed seats above them, with rank as a multiplier — so the same seat is worth more in a Grand Sect, which is most of why anyone wants the sect promoted.\r
\r
It is paid from the treasury like everything else. Stipends and donations are both outflows, so a sect that overpays runs itself dry. That is a decision the leadership is allowed to make, and has to live with.\r
\r
**The daily allotment now scales with membership.** A sect's bill grows with its people, so its income has to, or a popular sect would be punished for being popular. Bases are up across the ladder — 1,200 a day at the bottom to 120,000 at the top — and double at 200 members, capped there, because an uncapped per-member income would make recruiting anybody at all the only strategy.\r
\r
The stipend bill lands near half of income at every rank, checked at both ends of each rank's own membership band.\r
\r
---\r
\r
## The sect walkthroughs know about the economy\r
\r
The sect-life walkthrough was written for a disciple who joined one, and it talked about contribution as though merit came from nowhere. It does not any more. Three new steps cover what you are paid, where it comes from, and why an emptying treasury is something you will notice.\r
\r
**And founding a sect now has a walkthrough of its own.** Taking the chair hands you the settings, the merit policy and markup, the storehouse and its auto-listing rule, and nine seats that each cost the treasury and buy you somebody who can help run the place — all at once, with no explanation.\r
\r
It is offered for *holding* the seat rather than for founding it, so it also reaches a leader who inherited the chair through succession or a duel, and had even less warning than a founder did.\r
\r
---\r
\r
## Masters finish their own lessons\r
\r
Studying under a profession master took two hours and then waited — with no deadline of its own — for you to walk back to that town and press a button.\r
\r
Two hours is long enough to log off. A lesson you had already paid for with the day's dice could sit unclaimed for days because you had gone somewhere else.\r
\r
**A finished study now settles itself, wherever you are, and sends you a notification saying what you learned.** Once a minute, whether you are standing in that town, in another one, or on the road between two.\r
\r
The tier band still comes from the town you *studied* in. What a master knows is a fact about that master, not about where their student has wandered since — a master in a tier-6 city does not start teaching tier-1 work because you walked into a hamlet.\r
\r
A master with nothing left to teach now says so, in a notification and on the panel, instead of leaving you a button whose only outcome is an error.\r
\r
The button stays for anyone who waited out the two hours standing right there. Pressing it settles the lesson on the spot.\r
\r
---\r
\r
## The first gates are fights, not walls\r
\r
A newly forged cultivator carries about **155 Dao Power**. Dewleaf Glade — the very first gate on the Mortal Realm trail — quoted **4,728**.\r
\r
Nothing was miscalculated. The quote was honest, and if anything optimistic. The fight it honestly described was simply two whole realms away, with nothing on the trail between here and there. A player who finished the walkthroughs and opened the map read a number thirty times their own on the first thing the game offered them.\r
\r
The opening gates did not even climb: 4,728, then 3,160, then 3,160, then 5,352.\r
\r
The entry region's gates have been softened against the *fight* rather than against the score, with the factor reaching the beasts' defences, pools and speed rather than only their health and attack — a softened beast that dies faster but is exactly as hard to wound is still a wall:\r
\r
- **Dewleaf Glade** 4,728 → **1,240**\r
- **Spirit Herb Valley** 3,160 → **1,240**\r
- **Whispering Woods** 3,160 → **1,976**\r
- **Bramblefang Hollow** 5,352 → **2,584**\r
\r
Each is now winnable at the realm it is pitched at, none quotes more than three times what that realm carries, and the trail climbs. Softening only — a gate the target realm already takes was left exactly as it was.\r
\r
---\r
\r
## Walkthroughs wait their turn, and wait to be asked for\r
\r
Three things, all of them about losing a lesson you never declined.\r
\r
**No two at once.** A walkthrough that began while a panel was open dimmed that panel, swallowed its clicks, and pointed at a control you could not reach. The only way out was Skip, which took the rest of the chain with it. New walkthroughs now wait for the panel to close.\r
\r
**Asked for, not arrived at.** The fight walkthrough followed cultivation by seconds, and the map one followed your first fight while the victory screen was still up. Combat now waits until you press Combat yourself, or reach 500 Dao Power. Exploration waits for Explore, or 1,500 with the fight lesson resolved.\r
\r
**A skip is not a verdict on everything downstream.** Skipping used to dismiss every walkthrough that followed the skipped one — "not now" about fighting silenced exploration, the world map, sects, bounties, the world boss, crafting, and all five craft benches. Twelve lessons on unrelated subjects, with no way to ask for any of them back. Only walkthroughs that genuinely *continue* a skipped one go with it now.\r
\r
**And five walkthroughs nobody could ever have seen.** All five crafting lessons were registered under one spelling and looked up under another, so every one of them resolved to nothing — written, anchored, translated into six languages, and unreachable since the day they were added. They work now.\r
\r
---\r
\r
## Trials\r
\r
**Formation Memory gives ten lives, and six more every time you clear the board.** A fixed pool did not survive the board growing: round one deals six pairs and round five deals twelve, so the number of cards you have to hold in your head doubles while your margin for error did not move. Runs were ending on the difficulty curve rather than on the player. The grant is *added* to what you have left, so clearing a round cleanly is worth something in the next one.\r
\r
**Meridian Flow's arrows are a cross.** They were in a row, so pressing "right" meant finding the second button from the left — a translation step, on every press, in a game that is nothing but directions and whose whole difficulty is supposed to be remembering them.\r
\r
Both trials also had a bug the first change exposed: starting a new round did its work twice. Invisible while it only dealt cards, and not invisible at all once a new round also granted lives — clearing round one handed out twelve.\r
\r
---\r
\r
## The world map\r
\r
**The events badge answers the question it raises.** A gold badge on a town said "1", which is the one thing a badge cannot be asked about: it told you something was happening, and then made you travel there to find out what — the very decision you were using the map to make. Press it now and it says what the event is and how long it has left.\r
\r
**Region names no longer run off the map.** They were never centred on their points at all: every label was anchored by its left edge and drawn half a width to the right of where it was authored, so the long ones on the right ran out into a black band you could scroll into. They are centred now, clipped to the map, and nudge themselves back on when a long name would still hang off.\r
\r
**"Descend".** Crossing back down from the Celestial Realm to the Mortal asked you to confirm an *Ascend*.\r
\r
**And the map holds still.** On desktop it juddered between two sizes: it was measuring the box through its own scrollbar, so the number the map was sized from was changed by the map it sized. It reads the box's true edge now, and neither map draws a scrollbar it cannot afford to measure through.\r
\r
---\r
\r
## Fixes\r
\r
- **Exit Game** now sits beside Sign out on the choose-world screen, and under the login screen's only control — offered wherever quitting actually does something.\r
- **"A destiny is forged" shows your origin.** It read "—" on the one screen where the choice is still fresh in your mind.\r
- **Your origin's percentage bonuses** were missing from a freshly created cultivator's sheet until something else happened to recompute them.\r
- **The automatic donation cap** said one number on the sect screen and enforced another, once the allotment started scaling with membership.\r
- **iOS purchase failures are written down.** A rejected receipt gave the operator the same vague sentence it gave the player, on a server that knew exactly which check had failed. Named TestFlight testers can now also redeem sandbox receipts against the live server, so the store path can be tested before a release rather than after one — an account not on that list gets exactly the rejection it always got, from the same code.\r
`;export{e as default};
