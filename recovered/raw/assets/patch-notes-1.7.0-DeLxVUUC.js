const e=`# Version 1.7.0 Patch Notes\r
\r
**Bags have a size, the Caravan has a lot more in it, chat has faces, and a great many things on a phone finally fit on the screen they are drawn on.**\r
\r
---\r
\r
## Your bag holds a certain amount now\r
\r
Equipment, consumables and manuals each get **30 slots**. Materials are untouched and always will be — a crafting economy that asks you to throw away ore is not one anybody wants to play.\r
\r
A slot is a **row, not a thing**. Ninety-nine identical pills stack into one slot; ninety-nine different pills take ninety-nine. Topping up a stack you already have is never refused, however full the category is.\r
\r
The bag shows what you're using at the top of each category and turns red at the limit. **When it's full, new items of that kind are lost** — so that readout is worth a glance.\r
\r
**More space** is sold in the Celestial Caravan under Character Upgrades, and from a **+ slot at the end of the bag itself**, which is where you actually want it. Each purchase adds **10 slots to every capped category at once** — it's a bigger bag, not a choice to optimise. It costs **50 crystals**, rising 20 each time to a ceiling of 500 and no further. If you can't afford it, the prompt takes you to where crystals are sold rather than just saying no.\r
\r
**A red hammer** beside the category selector clears a bag by the handful. Pick a rule — quality, rarity or gear slot, each meaning *this or lower* — and it selects everything matching, marking each one with a green tick. Nothing breaks until you press **Break selected** on a set you can see, and you can add or remove ticks by tapping first. Breaking runs the same way it always has, one item at a time, returning materials to anyone with the profession that made them.\r
\r
---\r
\r
## The Celestial Caravan\r
\r
**Ten new wares**, and a shop that is legible on a phone.\r
\r
**Time dilation** — these run the *real* cycles you would have run, not a lump sum, so they are worth exactly the hours they claim at whatever your rates actually are:\r
\r
- **Crafting Time Dilation Talisman** (and Greater / Supreme) — two hours of workshop time across your first **2 / 4 / 6** crafting slots. A slot set to experiment gets that many cycles of experimenting.\r
- **Grand Exploration Array** — two hours of searching your current region, resolved at once.\r
- **Blood-thirsty Rage Talisman** — two hours of repeat-fighting the beast you're already hunting.\r
\r
Each refuses if there's nothing to advance, rather than quietly burning itself.\r
\r
**Fortune Gathering Arrays I–IV** — +100 / 200 / 300 / 400 Fortune for an hour. They **never stack**: the strongest one wins, and a lesser one laid over a greater is simply wasted.\r
\r
**Rousing Spirit Pill** — ends a knockout on the spot and restores full health.\r
\r
**Emote packs** — three sets of **ten illustrated emotes**, unlocked account-wide.\r
\r
**Mythic supporters** now get **knockouts that end in half the time**, replacing "early access to new realms" — a promise about a release schedule was never something an account could actually be given.\r
\r
---\r
\r
## Chat has faces\r
\r
Emotes are **pictures**, inserted from a button beside every message box — world chat, sect chat, DM replies and new messages. Tap one in a conversation to see it full size.\r
\r
You can see every emote anyone sends whether or not you own the pack; owning it puts it in *your* picker.\r
\r
The chat window is also **taller and a fixed height** on a phone — it used to jump every time you switched between Chat and Messages — and the tab strip has moved up into the header, which was previously spending a whole row repeating the word "Chat".\r
\r
---\r
\r
## Combat\r
\r
**Beasts unlock at the end of a fight, not after a walk back.** The result screen now offers **Next** — the next beast in the tier, started immediately — and **Return** takes you back to the tier you were *fighting in*, scrolled to the beast you just fought, instead of the highest tier you've unlocked.\r
\r
**A charging enemy is now visible.** A foe winding up a heavy blow carries a pulsing aura in its element and a countdown saying how many turns until it lands, or **NOW** when it's next. On a phone this warning did not exist at all before.\r
\r
**Qi Surge** has been rebuilt around your element — see 1.6.0's notes if you missed it — and the button says **Focus** until it's charged.\r
\r
Also: the round counter and speed bar hold still while the log scrolls, the fight no longer slides sideways, and the battlefield effect announces itself as a toast at the bottom rather than clipped off the top right.\r
\r
---\r
\r
## Fixes\r
\r
- **Crit chance and crit damage were invisible on items.** Eight stats — speed, both crit stats, fortune, stamina and the three regens — were missing from the inventory's display list entirely, so a hammer whose whole point is +23 crit damage showed a lone attack number. They all show now, and both crit stats read as the percentages they are.\r
- **Claim All told you nothing.** The receipt listing what you claimed and what it paid was rendering *behind* the achievements window. It shows now, with a combined total. Claimable achievements also sort to the top of the list.\r
- **Blood Cleanse Pill** said \`Removed: *\`. It now names the conditions it actually cleansed, and says so when there was nothing to clear.\r
- **"Theory of All Things — you've learned Pure Spirit Charm"** sent people to the Techniques screen. Pure Spirit Charm is a talisman *pattern*; the message now names the kind and where to find it.\r
- **Weapon power comparison** was measuring a one-hander against the wrong hand, so a free second weapon read as a downgrade. A one-hander now shows both hands (\`▲254 / ▲512\`), and a two-hander is judged against the pair it displaces.\r
- **Talismans in sect crafting orders** showed no effect when selected.\r
- **Weapon mastery** from fighting is worth 3× what it was, and the weapon-mastery pill no longer reports "0/s" while working perfectly.\r
- Buff pills of a kind no longer let a weak one refresh a strong one's timer.\r
- Commissioned arrays and talismans are all available (20 arrays and 132 talismans, up from 2 and none).\r
- Market listings expire after 7 days, and sellers are notified when something sells.\r
\r
---\r
\r
## On a phone\r
\r
A long pass over everything that didn't fit:\r
\r
- The **page itself no longer scrolls** — only the pods on it do. That's what was producing white and black bars at the top and bottom of the screen.\r
- The **top bar** scrolls to both ends; the first icon used to be clipped and unreachable. The chat and help buttons stay centred but give ground rather than letting the currency pod paint over them.\r
- **Buttons whose labels were cut off now shrink the label instead.** "Equipment" was rendering as "Equi…", "Main Hand" as "Main …".\r
- Inventory, combat and shop controls are **shorter**, giving the room back to what they sit above.\r
- **Qi Vessel** controls are one row instead of three stacked buttons.\r
- The **Caravan** has a section rail at every width, collapsible to icons, and its window no longer changes size depending on which section is open. Consumables are one per row and grouped by what they're for; supporter tiers keep a readable width and scroll sideways.\r
- The **Dao Trial** is a toggle in the corner beside Reincarnate and Soul Tree, and the tab strip that used to name it is gone.\r
- The character actions menu leads with the cultivator's portrait, and — when opened from chat — is now visible at all.\r
\r
---\r
\r
## Under the hood\r
\r
- **Google Play Billing** updated to 9.1.0.\r
- Version tags now publish a **GitHub Release** carrying these notes.\r
`;export{e as default};
