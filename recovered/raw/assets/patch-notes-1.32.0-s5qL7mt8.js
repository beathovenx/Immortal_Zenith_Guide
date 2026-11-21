const e=`# Version 1.32.0 Patch Notes\r
\r
**Built from your reports and ideas: item locks, a technique quick-bar, bulk buying, region trails that climb, Qi Cap that pays at every breakthrough, and fixes for more than sixty of your bug reports.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message.\r
\r
Reports are numbered in #bug-reporting as **ISSUE-N** and suggestions in #user-suggestions as **ENHANCE-N**, so you can see when yours was acted on.\r
\r
---\r
\r
## From your suggestions\r
\r
- **Lock items** (ENHANCE-61). Tap 🔒 on anything in your bag. A locked item can't be sold, listed, traded, donated, wagered or broken (bulk break included), and crafts won't use it as a material. You can still eat, equip or store it.\r
- **Technique quick-bar** (ENHANCE-3). Your equipped arts sit on the battle screen as one-tap buttons. On desktop, keys 1–6 use them. It can be hidden in Settings.\r
- **Bulk buy** in the sect merit shop (ENHANCE-49), and **list several copies** of the same gear or plate on the market at once (ENHANCE-44).\r
- **Pill variants on sect orders** (ENHANCE-67). Order any variant someone in your sect knows. Only a crafter who knows it can fill the order, and the pills are graded like their own brew, so a master alchemist or a strong variant delivers better pills.\r
- **Pill saturation preview** (ENHANCE-84). A stat pill shows how strong its next dose will be, and asks before you eat one at reduced effect or past your daily safe limit.\r
- **Known manuals are marked** in the market, bookstores and sect shop (ENHANCE-18).\r
- **"You own N"** on item sheets (ENHANCE-45), and **weapon types** in shops and the market (ENHANCE-72).\r
\r
---\r
\r
## More of your suggestions\r
\r
- **Market:** scrolls show the tier of what they teach (ENHANCE-29/41); array plates show their remaining life (ENHANCE-30).\r
- **Crafting:** research benches stay open until the server accepts (ENHANCE-19), materials say "Fully researched" or how many designs are left (ENHANCE-32), and every craft shows its time up front and a live countdown while it runs (ENHANCE-79/81).\r
- **Events:** the world map shows each event's tier (ENHANCE-24), and a new top-bar button lists every event in your world, even while travelling (ENHANCE-78).\r
- **Notifications** get Market, Events and Sect & family tabs (ENHANCE-70).\r
- **Martial Arena:** Return after a bout goes back to the arena (ENHANCE-83).\r
- **Reduce flashing effects**, a new Accessibility setting for battle flashes, the low-health pulse and lightning flicker (ENHANCE-75).\r
- **Disable transitions** now also skips the login and realm-change video, which can always be tapped to skip; Back goes to your world list (ENHANCE-11/60).\r
- Clearer words: "Comprehension speed" on pills (ENHANCE-59), and tribulations now say "Face N Strikes" (ENHANCE-68): you have to defeat the lightning.\r
\r
---\r
\r
## Balance\r
\r
- **Qi Cap pays at every breakthrough** (ISSUE-71). Each breakthrough's Health, Energy and Stamina gain is multiplied by your Qi Cap % plus a tenth of it: ×1.10 at your realm's base pool, ×2.75 at the widest, ×0.55 at the narrowest. Health now counts too, and the bonus never compounds. Breakthroughs you have already made are unchanged.\r
- **Region trails climb** (ENHANCE-86). The first gate fight of a new region now starts just below the tyrant you beat to open it, the fights grow stronger along the trail, and each region's tyrant is a real final fight. Some tyrants are stronger than before.\r
- **Treasured Inheritance** adds 10% of an heirloom's base stats per hand-down instead of compounding: ×2 after ten lives, ×4 after thirty (ENHANCE-25). Existing heirlooms are converted. Plain (unrefined) heirlooms now actually get their bonus, and enhancing one no longer wipes it.\r
- **Dao Realizations** fire freely up to Golden Core. Above that, only in realms your soul reached in a past life, and one realization gives at most a day of Qi (ENHANCE-39).\r
- **Soul Tree:** every weapon and ward node now hangs straight off Tireless Fist at the same cost (ENHANCE-52). Nothing you bought is lost.\r
- **Region events** only appear where someone in your world can enter them, at tiers that follow where players are (ENHANCE-76).\r
\r
---\r
\r
## More balance\r
\r
- **Fortune now raises beast drop chances**: about +10% at 100 Fortune, +20% at 1,000 and +30% at 10,000 (ISSUE-57).\r
- **Bookstores sell manuals of every tier** within their town's range, but only to cultivators who have reached the realm to learn them (ISSUE-53/64).\r
- **Unbroken Meridians** now grows through realms granted at rebirth as if you had climbed them (ISSUE-43/49).\r
- **Bleed and Searing Burn** scale with your attack like every other wound (ISSUE-68).\r
- **Shops** buy back at 5% of shelf price, from a daily purse per shop, after mythic gear was selling for millions over the counter.\r
- **Crit no longer compounds.** Masterwork, weapon mastery, quality grade and honing stopped multiplying crit on top of each other. Grades and honing still raise it, by a quarter of their bonus.\r
- **Tribulations** for Immortal Saint and Emperor are sterner, and each strike past two adds 8%.\r
- **Tower and Elemental Escalations** are tuned per tier, so a cultivator of the tier no longer clears every floor untouched.\r
\r
---\r
\r
## Sects and families\r
\r
- **Merit shop limits by rank** (ISSUE-37). Leaders and Merit Elders choose the highest tier and rarity each disciple rank may buy, and locked items say why.\r
- **Sect rules apply to stock already in storage** when you save them, and to items handed down at rebirth (ISSUE-48/55). Essence rules now cover every tier.\r
- **Every sect sells its own primary art**, including player-founded sects.\r
- **Spirit stone donations** appear in the Ledger (ISSUE-41), and sect core manuals can be bought again after rebirth (ISSUE-40).\r
- **Haven and sects** (ISSUE-29): a sect disciple who owns a haven can still empty its storehouse, but can't use the rest of it.\r
- **Families** (ISSUE-28): a member who leaves is marked as departed, no longer counts for family level or banner stats, and can't be made head. The banner panel greys the stats your family level hasn't lit yet.\r
- **Gather missions** show "Done today" once turned in (ISSUE-72).\r
- **Demonic sects** now hold only fallen cultivators, and leaving the path removes you (ISSUE-5).\r
\r
---\r
\r
## Crafting\r
\r
- **Masters teach their own craft**: no more tailoring patterns from the Refining Master (ISSUE-56/66).\r
- **Alchemy Recipe Draws teach a recipe you don't know** first, and give a variant only once you know every recipe in the band. The odds shown before buying now count only unknown recipes.\r
- **Steeping** uses the stack you pick, keeps its grade, and leaves steeped pills out of the list (ISSUE-61).\r
- **Bought crafting slots** reach array forges and talisman desks, and the Caravan stops selling a slot your benches can't use (ISSUE-42/58).\r
- **Masterwork** now counts in an item's Power (ISSUE-54).\r
- **Polymaths:** every craft you follow counts for honing, sect orders and commissions, and an array study shows as one in your slots (ISSUE-46).\r
- **Talismans** name the technique they fire and what it does, and array designs list what they grant, before you craft (ISSUE-62).\r
- **Graded pill stacks** arrive whole from the market, trades and the storehouse; before, only one of each arrived.\r
- **Sect orders** finished early by a time-dilation talisman now complete (ISSUE-23), and rebirth no longer strands an order you were crafting (ISSUE-12).\r
\r
---\r
\r
## Fixes\r
\r
- **Martial Arena tournaments** open again after one finishes (ISSUE-69).\r
- **Market** scrolls down to the offers even with a listing reserved for you (ISSUE-27); battle arenas no longer clip on mid-width screens (ISSUE-39); the fan and tailoring icons show on Windows (ISSUE-35).\r
- **Stats:** Water and Earth no longer vanish under the Five Elements array (ISSUE-32); a hidden +15% damage taken on some physiques is gone (ISSUE-52); a base stat stuck at 0 is restored (ISSUE-65).\r
- **Rebirth** resets your alignment and alchemy recipes like every other craft (ISSUE-31/45).\r
- **Gear loadouts:** worn gear no longer takes bag space once you own a loadout (ISSUE-42).\r
- **Collections** list shops, sect halls and origins as sources (ISSUE-34); the second soul explores any zone you've opened (ISSUE-38).\r
- **Last stand:** buying back years now saves you.\r
- **World Boss** rewards rank like the board (ISSUE-21); **pond** notices list your pills (ISSUE-63); Qi Cap shows its 250% limit (ISSUE-59).\r
- **Thunderpoint** is a spear (ISSUE-33); **Jade, Lapis, Lavastone** and Crystal Lotus appear in Emberscar (ISSUE-44); magma core ore drops from tier-6 fire beasts (ISSUE-51).\r
- Plus many smaller fixes: pill grades, push notifications opening the right realm, portrait frames and more.\r
- **Also fixed:** ISSUE-2, ISSUE-3, ISSUE-6, ISSUE-7, ISSUE-8, ISSUE-9, ISSUE-10, ISSUE-11, ISSUE-13, ISSUE-14, ISSUE-15, ISSUE-16, ISSUE-17, ISSUE-18, ISSUE-19, ISSUE-20, ISSUE-22, ISSUE-24, ISSUE-25, ISSUE-26, ISSUE-36, ISSUE-47, ISSUE-50 and ISSUE-70.\r
\r
Thank you for every report and idea. Keep them coming in #bug-reporting and #user-suggestions.\r
`;export{e as default};
