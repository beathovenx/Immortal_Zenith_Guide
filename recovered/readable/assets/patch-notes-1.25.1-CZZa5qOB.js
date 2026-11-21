const e = `# Version 1.25.1 Patch Notes\r
\r
**The rest of the game speaks your language, pills break one at a time, and a rebirth once begun is finished.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message.\r
\r
---\r
\r
## Your language, on every screen\r
\r
Changing the language in Settings used to leave a good part of the game in English: labels, buttons, tooltips, messages and whole tabs that had never been sent for translation. That covered the character sheet, Settings, the sect, the bag, the crafting benches, combat, the Caravan, achievements, the rebirth wizard and more.\r
\r
All of it now follows the language you chose, in **Spanish, French, German, Italian and Korean**:\r
\r
- **Hundreds of labels and messages** that were stuck in English.\r
- **Item, element, technique, monster and region names** wherever they appear, including several screens that always showed elements in English.\r
- **The help pages** behind the **?** button, every one of them.\r
- **Dates and numbers.** They used to follow your browser rather than the game, so a Spanish player on an English computer read achievement dates as 10/26/2026. They now read 26/10/2026, with the separators your language uses.\r
\r
A few things are still in English because the server sends them as plain text: Guardian Beast names and moves, cosmetic names, armour sets, emotes and the exploration and battle logs. Those are next.\r
\r
---\r
\r
## Breaking part of a stack\r
\r
Pills and other stackables are one stack holding many, and breaking them treated the stack as a single item:\r
\r
- **All But One** did nothing at all on a stack.\r
- **Break One** destroyed the **whole stack**.\r
\r
Both now count pills, not stacks. All But One leaves you exactly one, Break One takes exactly one, and with the profession that makes the item you get materials back for each one broken.\r
\r
---\r
\r
## A rebirth, once begun, is finished\r
\r
Starting a rebirth banks this life's Dao Soul Points, and the Soul Tree perks they buy take effect at once. Nothing stopped you there: backing out to character select, or simply closing the game, left the old life playable with the next life's perks.\r
\r
Now:\r
\r
- **The old life stops** the moment the rebirth begins. It no longer cultivates or explores while you are away.\r
- **Coming back to that character opens the rebirth again**, wherever you return to. The points you banked are not paid twice, and the rolls you were offered are the ones still waiting.\r
- **Closing the rebirth takes you to character select**, not back into the old life.\r
\r
If a rebirth ever told you **"could not finalize reincarnation"**, two things have changed. A rebirth that did go through is no longer reported as failed. And the server now records why one fails, so the next report can be answered.\r
\r
---\r
\r
## Smaller things\r
\r
- **Escape opens Settings** on the desktop and Steam builds, from anywhere in the game, and closes it again. It only does so when nothing else is open, so one press still closes a dialog first.\r
- **Duel and Martial Arena opponents are drawn as themselves** on phones and in the wide desktop layout, rather than as a placeholder beast.\r
- **The page Steam opens after a Celestial Crystal purchase** now looks like the game instead of plain black text on white, and offers a way back to it. On desktop the game window comes forward when the crystals arrive.\r
`;
export { e as default };
