const e = `# Version 1.14.0 Patch Notes\r
\r
**Soul Demons arrive: from the Celestial Realm onward you can hunt demons, beat them into submission, and bind five of them into your soul. Beasts across the whole game have been rebalanced so nothing one-shots you at your own tier any more, crystal packs and supporter subscriptions now work on iOS and Android, and talismans finally tell you what they do.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message. Only the FIRST blockquote of this opening section is\r
> stripped before posting, so keep this note the only one here.\r
\r
---\r
\r
## Soul Demons\r
\r
At **Immortal Emperor** the first of five seals opens in your soul. Four more follow, at the realms above it.\r
\r
Each seal holds one demon, and everything it grants applies for as long as it stays bound: stats, elemental power, resistances, extra damage against particular creatures, and the speed you gather Qi, comprehend the Dao and master a weapon.\r
\r
**Every demon also costs you something.** A weakness is never scaled away, and you carry it as long as you carry the demon.\r
\r
**Getting one.** Summoning stones drop from exploring the Celestial Realm and from its tyrants. Each names a single demon — its element and its rank, 1 through 16.\r
\r
Breaking a stone does not hand the demon over. It calls it out, and you have to beat it. A rank far above your realm is a wall rather than a challenge, and **the stone is spent whether you win or lose.**\r
\r
---\r
\r
## What to do with one you have beaten\r
\r
**Soul-Bind** it into a seal. If that seal already holds a demon, you are shown exactly what changes — every line the swap moves, biggest first — before you confirm. The displaced demon goes back to your reserve; you lose its bonuses, not the creature.\r
\r
**One demon per element.** Five fire demons would be the whole system solved, so the pentagram will not take them.\r
\r
**Devour** it instead, and it comes apart into essence that feeds another demon — or, from the centre of the star, all of them at once. A demon straight out of its stone is only a trickle. One you have *fed* gives most of that investment back, so changing your mind about a favourite costs you rather than robs you.\r
\r
---\r
\r
## Raising a demon\r
\r
Feed a demon Qi from your own pool, up to level 150.\r
\r
That Qi is what breakthroughs are made of, so **every level is a breakthrough deferred**. Pouring everything into your demons means climbing the realms more slowly and hitting far harder on the way.\r
\r
It is a real commitment: taking a low-rank demon to level 100 costs roughly ten minor breakthroughs' worth of Qi, and the last fifty levels cost about three times the first hundred.\r
\r
**Every number a demon grants is rolled once**, inside a band its rank decides. Two cultivators holding the same rank-12 fire demon hold meaningfully different creatures — which is why the same demon is worth hunting twice. **Attunement** tells you where yours landed.\r
\r
---\r
\r
## Beasts hit hard, not stupidly\r
\r
A beast's damage has been reviewed across the whole bestiary, and the top half of it was badly out of line — at the highest tiers, *every* beast could kill an appropriately-levelled cultivator in a single critical hit, usually before you had taken a turn.\r
\r
Every tier now sits in the same band: a beast's worst crit takes about a third of your health, and the hardest hitters take two thirds. **Two blows still kill you.** Nothing at your own tier removes you from a fight before you have acted.\r
\r
Something well above your realm still kills you outright. Walking into the wrong zone is meant to be a mistake with a consequence.\r
\r
**And a bug behind it:** certain fights were permanently making beasts stronger — for everyone, cumulatively, until the server restarted. It is why a beast that hit for 67 one minute could hit for 14,000 the next. Fixed.\r
\r
---\r
\r
## Crystals and supporter tiers on mobile\r
\r
Crystal packs and the three supporter subscriptions now work on **iOS and Android**. Purchases are verified with Apple and Google before anything is granted, renewals extend your tier without you having to open the game, and a refund ends it.\r
\r
## Crafting: a daily limit on new designs\r
\r
Alchemy research, the Refiner's and Tailor's experiments, and the Array Master's study all end in the same place — a design you can make from then on — and none of them had a ceiling.\r
\r
You can now work out **2 designs a day, plus one per level of your crafting mastery.** A full master gets sixteen.\r
\r
Nothing is wasted when you run out: insights and understanding stay banked, and the design lands on the next cycle of a fresh day. Recipe *variants* are not limited.\r
\r
---\r
\r
## Fixes\r
\r
- **Crafted gear on the market** listed as the bare word "Blueprint", showed the base item's stats instead of its own rolled ones, and hid its quality grade entirely. All three fixed — refined pieces now show their grade, enhancement level and real stats.\r
- **Talismans** now show what they actually do — in your bag, on the market, and in the item list mid-fight, where only healing items were ever spelled out. Folded talismans showed nothing at all before; charged ones understated themselves by up to two thirds.\r
- **Sects can be joined from the world map.** Tapping a sect in a town's list opens its hall, where the join button lives. Previously the only way into a sect hall was already being in one.\r
- **Feeding a soul demon** now actually spends your Qi. It was being refunded on the very next read.\r
- **The exploration log on phones** no longer runs off the bottom of the screen.\r
- **Character creation** is now all-or-nothing, so a failure part way through can no longer leave a cultivator holding half their origin's starting gear.\r
`;
export { e as default };
