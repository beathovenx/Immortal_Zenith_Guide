const e = `# Version 1.11.1 Patch Notes\r
\r
**A hotfix for 1.11.0. Five essences and a herb had no source anywhere in the world, and the tyrants above the clouds were fighting on blank ground.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message.\r
\r
---\r
\r
## Six materials nobody could get\r
\r
A balance pass in 1.11.0 was meant to stop zones handing out things far below their own tier. It went too far and removed the **only** source of six materials, which left them in the catalogue and nowhere in the world:\r
\r
- **Lightning Essence**\r
- **Mind Essence**\r
- **Physical Essence**\r
- **Yang Essence**\r
- **Yin Essence**\r
- **Ghostflame Herb**\r
\r
All six are back where they came from. Lightning Essence in particular is a crafting input, and it had six homes across the storm regions before it had none.\r
\r
The mistake was treating a low-tier material in a high-tier zone as an error. Usually it is — but the elemental essences are placed deliberately, in the elemental zones that thematically own them, and the pass could not tell the two apart. It no longer makes that call, and it can no longer remove the last place an item comes from.\r
\r
---\r
\r
## The celestial tyrants fight on their own ground\r
\r
Every tyrant in the Mortal Realm fights on its home terrain, with the weather that comes with it — volcanic ash, bitter frost, a raging storm overhead.\r
\r
The ten above the clouds were fighting on **nothing at all**. They named their home correctly; the game simply had no terrain on file for any region in the Celestial Realm, so the last fight of each region ran with no environment.\r
\r
All ten now have their own:\r
\r
- **Ninefold Gale** over the Celestial Cloudsea\r
- **Primordial Blaze** in the Sunfire Expanse\r
- **Abyssal Tide** on the Azure Immortal Sea\r
- **Deathless Winter** in the Eternal Frostlands\r
- **Origin Thunder** under the Thunder Sovereignty\r
- **Worldroot Verdure** through the Serene Wilds\r
- **Devouring Dark** across the Astral Wastes\r
- **Eternal Dawn** over the Radiant Dawnscape\r
- **Black Moonlight** in the Voidmoon Dominion\r
- **Omniscient Radiance** within the Heavenly Light Sanctuary\r
\r
Each favours its region's element and carries a hazard that bites every round, the same way the mortal ten do — a little harder, as befits the sky.\r
`;
export { e as default };
