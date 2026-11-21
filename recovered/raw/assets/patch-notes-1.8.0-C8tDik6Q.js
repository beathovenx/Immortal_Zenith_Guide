const e=`# Version 1.8.0 Patch Notes\r
\r
**Exploring finally pays for the crafting it exists to feed, materials stop going negative, and a sect no longer loses its leader forever when they walk the wheel again.**\r
\r
---\r
\r
## Exploring pays properly now\r
\r
Someone searched overnight for ten hours and came back with three ores. They were right that it was broken, and it was worse than a slow drip: **three separate settings were each overruling what the zones themselves are written to do**, and between them they cut the yield to about a fiftieth of the intent.\r
\r
Ten hours of searching paid roughly **33 materials**. Ten hours of crafting *consumes* about **800**. Exploration could not feed the profession it exists for.\r
\r
All three are fixed:\r
\r
- **Zones have their own pace again.** Every zone is written with a search time of 22–34 seconds; a floor was rounding all of them up to 180, so every zone in the game searched at exactly the same speed. The floor stays — it keeps the event log and the job queue sane — but a cycle that stands in for several searches now **pays like several**.\r
- **Zones yield what they are written to yield.** Each zone authors its own split between materials, opportunities and creature encounters. That was being ignored in favour of one hard-coded 85/5/10 for the entire game, so a beast-heavy warren and a herb valley handed out the same things in the same proportions. **Fortune now shifts weight toward the rarer outcomes** rather than piling on top of them — a lucky cultivator finds *better* things, not simply more.\r
- **Most cycles turn up something.** 88% of them used to return nothing at all.\r
\r
A herb valley now yields around **76 materials an hour** against crafting's 80 — for the same number of events, so nothing got noisier. Combat-leaning zones still pay less in materials and more in Qi and drops, which is what they are for.\r
\r
---\r
\r
## Materials could go negative. They can't now\r
\r
Two things happening at the same moment — a craft cycle and a pill, or two workshop slots finishing together — could both check your stock, both decide there was enough, and both take it. The count went below zero and **stayed** there.\r
\r
Stock is now locked while it's being taken, and the database itself refuses to hold a negative quantity. Any stack already below zero is reset to zero on update. If that was you: **the materials are gone and there is no record of how many there were.** Sorry.\r
\r
## A ten-run craft pays for itself up front\r
\r
Starting a run of ten used to take materials one cycle at a time, so anything else that touched the same materials in between could **starve it halfway** — you asked for ten, got six, and nothing told you why.\r
\r
The whole run is now paid for the moment you start it. **The materials leave your bag immediately**, which will look odd the first time, and **anything unspent comes straight back if you stop early**. If the craft was accepted, everything it needs is already set aside and nothing can reach it.\r
\r
Runs set to go *until materials run out* are unchanged — running out is how they're meant to end.\r
\r
---\r
\r
## A sect always has a leader\r
\r
A sect leader who reincarnated left the seat simply **gone**. Nobody was promoted, nobody was told, and if there was no Vice Leader there was no way back at all — the challenge that takes the seat needs someone holding it.\r
\r
The mantle now passes down the hierarchy, and the new leader is notified:\r
\r
> Vice Leader → Supreme Elder → Merit Elder → Enforcement Elder → Array Elder → the Regular Elder with the highest Dao Power → the highest-ranked member, and among equals the highest Dao Power\r
\r
Vice Leader outranks Supreme Elder here even though the roster lists Supreme higher. That is the entire point of the seat.\r
\r
**Sect daily missions no longer ask for bloodline essences or physique items.** A turn-in was quite happy to demand the one consumable that permanently defines your character, in exchange for merit points.\r
\r
---\r
\r
## Set bonuses that say +7% crit chance give +7% crit chance\r
\r
They were multiplying instead of adding. A 5% base times 1.07 is **5.35**, which is why a set promising +7% left you sitting at 5.6% — and at zero crit it was worse still, because anything times zero is zero, so a crit set granted **nothing at all** to a character who hadn't got any yet.\r
\r
Both crit chance and crit damage now add points, as every set description has been promising. Everything else in a set keeps scaling with your own magnitudes.\r
\r
---\r
\r
## Finding things, and getting to them\r
\r
**Tap a source in Collections and it takes you there.** A zone opens Explore, drilled to the right region with the zone scrolled to and ringed; a beast opens the fight roster on its tier, scrolled to the beast. A brief fade covers the jump so it reads as travel rather than a flicker. (Turn it off with **Disable transitions** if you'd rather not.)\r
\r
**Studying pays now, even when it finds nothing.** Experimenting in Refining and Tailoring awarded XP only on the moment a design was finally learned, so the dozens of cycles it takes to get there were worth exactly zero. Every cycle now gives a small amount of mastery XP. Discovery is still where the real reward is.\r
\r
**Dao trials are worth twice as much.** A par run was half an hour of what you'd gain sitting still; four to eight attempts a day came to two to four hours against a day that has twenty-four in it. A par run is now an hour, a strong one two, and a poor one twenty-four minutes rather than seven — the old floor paid so little that abandoning a bad run was the correct move.\r
\r
**Meridian Flow tells you when you're right.** A wrong arrow flashed red and a correct one did nothing, so pressing the right arrow looked identical to pressing a dead button. It flashes green now.\r
\r
---\r
\r
## Bags, breaking, and screens that fit\r
\r
- **Bags start at 50 slots** per category, up from 30.\r
- **The break menu offers filters that exist.** Gear is graded Low / Normal / **High** / Supreme — "High" was missing entirely, because the menu was offering the *pill* grades for everything. Pill grades no longer sweep up talismans. **All ten gear slots** are always listed; the picker used to be built from what was in your bag, so breaking your last chestpiece made "Chest" vanish from it. And there's a **tier filter** — break everything from the realms you've left behind.\r
- **Top-nav windows are pods on a phone**, held clear of every edge with the content scrolling inside. They used to sit flush against three sides and read as though they were running off the screen.\r
- **Windows no longer hide under the clock.** The height was a flat percentage, which is comfortably clear on a tall phone and *less than a notch* on a short one, so the close button disappeared on exactly the devices with least room.\r
- **Rankings keeps its size** whichever section you pick.\r
- **The ＋ that starts a message works.** It always opened — behind the chat window, where nobody could see it.\r
\r
---\r
\r
## Achievements on both stores\r
\r
Every achievement is now mirrored to **Google Play** (all 162) and **Game Center** (100, Apple's limit), with artwork, so they show on your profile alongside the ones you earn here.\r
`;export{e as default};
