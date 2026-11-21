const e = `# Version 1.28.0 Patch Notes\r
\r
**Hunting now tires you out and pays less Qi, auto-combat is faster, the Dao Market finds what you search for, the World Boss shows its prize, and a long list of fixes.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message.\r
\r
---\r
\r
## Hunting wears you down\r
\r
Fighting beasts back to back for hours was carrying cultivators through three and four major realms in a sitting. Two changes slow that down.\r
\r
- **Exhaustion.** Every 10 beast hunts in a row adds a level of exhaustion, and each level weakens you in every PvE fight: **−10%**, then **−25%**, then **−75%** to every stat, resistance and affinity. Hunt again after the third level and you collapse, knocked out for 20 minutes, and wake fully rested. The hunt screen shows your level, how many hunts until the next, and a countdown.\r
- **Rest it off.** Each 5 minutes without a hunt takes a level away. Twenty minutes clears all of it.\r
- **What counts.** Only Fight Beasts hunts build exhaustion. Auto-combat, the Tower, Elemental Escalations and bounties do not, and duels and sect wars ignore it entirely.\r
- **Beasts pay less Qi.** A quarter of what they did at Human, rising to half from Core Formation up. Packs paid one full kill per beast plus a bonus, and low-tier fights end in seconds, so this was where realms were being skipped.\r
\r
---\r
\r
## Rarer bloodlines and physiques\r
\r
With hundreds of cultivators hunting, high-rank bloodline and physique essences were turning up far too often. The higher ranks now drop much less frequently, in keeping with how rare they are meant to be. The lower ranks are unchanged.\r
\r
## Auto-combat every two minutes\r
\r
Auto-combat now fights one beast every **2 minutes** instead of every 5. The Blood-thirsty Rage Talisman's two hours is 60 fights instead of 24.\r
\r
## Origins at character creation\r
\r
A new character can re-draw the origins on offer **twice**, and the button shows how many are left. After that, Origin Re-draws bought from the Celestial Caravan can be spent here too, not only at rebirth. Leaving the screen and coming back shows the same origins.\r
\r
---\r
\r
## The Dao Market\r
\r
- **The filters work.** Physiques, Bloodlines, Pills & Elixirs, Array Plates and Other were showing little or nothing. Each shelf now holds everything that belongs on it.\r
- **Search finds plurals and categories.** "physiques", "pills" and "stoneheart essence" now find what you meant.\r
- **Newest listings first.** With no filter set, the market opens on what was listed most recently instead of a wall of cheap outgrown gear. Filtered searches still sort cheapest first.\r
- **No more paying for nothing.** Buying with a full bag used to take your stones and lose the item. Now it is refused, and nothing is charged.\r
- **The page buttons moved** above the listings, clear of the desktop menu.\r
\r
## The World Boss\r
\r
The rewards panel now shows the **exact piece of gear** each placement wins this week, as an item tile you can tap. First place gets that piece: before, "legendary gear" could arrive as an epic.\r
\r
---\r
\r
## New\r
\r
- **Friendly names for friends.** Tap ✎ on your friends list. Only you see it, and their real name stays beside it.\r
- **Choose your username.** If you joined with Google, Apple, Steam or GitHub, open the gear on the realm select screen to pick your own.\r
- **Breakthrough arrow.** When you are ready to break through, a gold arrow appears next to your Dao Power on every page. Tap it to go straight to cultivation.\r
- **The Haven storehouse uses item tiles**, like your bag, and shows every item. A big bag used to hide everything past the sixtieth row.\r
- **"Unspecialize" is now "Unlearn"** in crafting, since higher tiers specialize within a profession.\r
\r
---\r
\r
## Fixes\r
\r
- **Weapon mastery follows your weapon.** Swapping weapons now switches body-cultivation training to the new one, after crediting what the old one had earned.\r
- **Leaving a pack hunt** and coming back no longer turns every following fight solo.\r
- **A Dao Trial in progress** only closes with its close button. A stray tap outside used to throw the run away.\r
- **Select many** on the sect donation screen gives whole stacks, not one of each.\r
- **Fortune Gathering Arrays** no longer count against your daily pill limit.\r
- **The world map walkthrough** waits until you arrive instead of starting under the travel screen.\r
- **Elemental Escalation** victory banners show the right chapter, not "undefined".\r
- **Recipe sheets list every effect.** Moss Spirit Pill and others showed none.\r
- **Joining an NPC sect no longer makes you its leader.** The seat belongs to the NPC until someone wins the leader challenge. Three disciple origins also failed to place you in their sect, and now do.\r
- **The 4500-crystal pack is $29.99 on Steam**, the same as everywhere else. The purchase confirmation no longer says payments are coming soon.\r
- **Players sharing a connection** (a household, a school, a mobile network) no longer lock each other out of the realm list.\r
`;
export { e as default };
