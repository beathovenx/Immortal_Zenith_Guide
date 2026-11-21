const e = `# Version 1.18.0 Patch Notes\r
\r
**The Mortal Road. An eleven-act story campaign running the length of the mortal realm, from the morning you leave your village to the middle of the ring — told in your own origin's voice, and changed again by the profession you take. Every act but one opens a region and puts down the tyrant holding it, so walking the road means walking all ten regions. Plus a world map that remembers where you have been, and four fixes from testing.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message. Only the FIRST blockquote of this opening section is\r
> stripped before posting, so keep this note the only one here.\r
\r
---\r
\r
## The Mortal Road\r
\r
A story that runs alongside your cultivation rather than instead of it.\r
\r
**Eleven acts**, from Jadebrook Village to Immortal City — thirty-one scenes, a hundred and forty-six beats, about an hour of reading.\r
\r
It opens on its own and waits for you at each gate. **Nothing about it is missable and nothing is on a timer.** An act asks for a realm; when you reach that realm, it is there.\r
\r
It begins with a wood where the ground has gone bare and the things coming out of the mist are all the same animal — and nobody can say which animal. What it turns into is not a monster hunt. It is the question of why four hundred years of accurate, correctly filed, undisputed records never once produced anybody willing to go and look.\r
\r
Seventeen speaking parts, each with a portrait.\r
\r
---\r
\r
## It is told in your voice\r
\r
Every origin carries **one of eight voices**, and the narration changes with it. A cast-out cultivator and a sect-raised one are shown the same room and read different sentences in it — and are offered different things to say.\r
\r
Once you **take a profession**, several scenes change again. A smith, an alchemist, a scribe, a formation-master and a tailor are each told something different by the same person, because they each asked a different question.\r
\r
**Your replies are remembered.** Every choice moves three running dispositions — merciful against ruthless, orthodox against heterodox, solitary against bound — and sets marks the later acts read back.\r
\r
Tell a scholar in Act II never to write your name down, and an elder in Act IV will offer you the chance to hold to it. Leave a two-hundred-year-old page where you found it, and the act that wants that page has to find another way to believe you.\r
\r
---\r
\r
## What the road asks of you\r
\r
Errands, and they are ordinary play rather than a separate minigame: learn a battle technique, fill your armour slots, take up a craft, join a sect, claim bounties, buy and sell on the market, walk the towns.\r
\r
**The ten seats.** Every act but the ninth opens one region of the mortal realm and fells the tyrant holding it. Regions unlock in sequence, each waiting on the one before — so finishing the road means you have walked all ten.\r
\r
The story has a reason for it. Every region has one cut stone, older than anything around it, with something sitting on top of it. Clearing one gives up a comprehension, and ten of those added together is the realm named in a standing instruction that four generations of a sect have failed to meet.\r
\r
Act IX asks for nothing at all. That is deliberate, and the act says why.\r
\r
---\r
\r
## The world map remembers\r
\r
Towns used to look identical whether you had walked their streets or only ever seen a dot on a map. That made it a list of destinations rather than a record of a journey — and it gave away what was in a place before anyone went there.\r
\r
Now a town shows **the tier band its wares are pitched at**, or a quiet **?** where you have never been.\r
\r
**Amenities** lists a town's doors, and stays shut until you have stood in it.\r
\r
The tier tag also moved to the top of each picture, clear of the town names lettered across the bottom.\r
\r
---\r
\r
## Every language\r
\r
The game's content is now **fully translated in Spanish, French, German, Italian and Korean** — all 16,650 strings, the Mortal Road included.\r
\r
Items, techniques, recipes, monsters, bloodlines, physiques, the campaign's prose: the lot. Nothing is left in English but proper names.\r
\r
---\r
\r
## Fixes\r
\r
- **Masterwork gear could not be swapped at the cap.** Equipping a masterwork into a slot that already held one counted as three against a cap of two, because the piece being taken off was still being counted. You had to unequip and re-equip to reach the very same state. It now counts your loadout *after* the swap, which is the only number the cap was ever about.\r
- **The six-slot time-dilation talisman did nothing for 56 of the 156 recipes.** It granted two hours, then divided them by the recipe's cycle — so against any craft whose single cycle is longer than two hours it finished nothing *and banked nothing*. That is precisely the long, expensive third of the catalogue anyone would spend one on. Elapsed time was ignored too, so a craft five minutes from done got no credit for those five minutes. Progress now carries over as a head start.\r
- **Donated blueprint scrolls merged into one scroll.** Several different blueprints on a sect shelf collapsed into a single stack and lost what made them different things. They stay distinct now. This could not un-merge what had already merged.\r
- **Signing in on iPad opened a blank white card.** The sign-in sheet was asked for as a popover, and Safari's browser view only draws full screen — so it presented its frame and no page at all. iPhones were never affected.\r
`;
export { e as default };
