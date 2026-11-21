# Attributes: what every number does

A reference for both lightning and demonic/yin builds, based on the recovered
**1.31.0 client**, public wiki snapshots and bundled patch notes. This page
explains the character attributes, cultivation rates, elemental values and
nearby character-sheet indicators. It does not claim to reproduce the server's
complete combat formula.

**Reading the evidence:** "client guide" means an in-game explanation;
"patch notes" means a documented change, not independently tested server code.
Conflicting explanations are called out rather than combined into a made-up rule.

## 1. Quick reference

| Attribute | Main purpose | Do not confuse it with |
| --- | --- | --- |
| Health / Max HP | How much damage you can survive | Defense, or HP regeneration |
| Energy | Resource spent by many arts; associated with some art scaling | Cultivation Qi |
| Stamina | Resource spent by physical/heavy arts; associated with some art scaling | Health or action speed |
| Attack | Base offensive power | Elemental attack or guaranteed final damage |
| Defense | Mitigates incoming damage | A percentage damage-reduction stat |
| Damage Reduction | A flat reduction to incoming hits, per the client guide | "10" meaning 10% |
| Mental Fortitude | Comprehension, mental defenses, tribulation support, and some arts | Energy capacity |
| Speed | Turn order and speed-based extra attacks | Cultivation or exploration speed |
| Crit Chance | Chance of a critical strike | Fortune |
| Crit Damage | Extra damage on a critical strike | Chance to crit |
| HP Regen | Health recovery rate | Maximum Health |
| Energy Regen | Energy recovery rate | Qi generation |
| Stamina Regen | Stamina recovery rate | Maximum Stamina |
| Fortune | Fortuitous encounter success and exploration outcome weighting | Universal drop chance or reward rarity |
| Qi Pool / Qi Cap | Capacity that must fill for a breakthrough | How quickly Qi is generated |
| Qi Generation Rate | How quickly cultivation accumulates Qi | Manual comprehension rate |
| Comprehension | Insight progress in your active cultivation manual | Character realm or weapon/art mastery |
| Elemental Attack | Offense for the specified element | General Attack |
| Elemental Resistance | Defense against the specified element | Guaranteed immunity |

## 2. Health, Energy and Stamina

### Health / Max HP (`health`)

Health is the resource enemies deplete. **Max HP** is its capacity; the current
Health bar can be below that maximum. Reaching zero ends the fight. The
tutorial describes being knocked out and needing to recover.

More Health provides a survival buffer, but it does not itself reduce damage
or increase recovery speed. Compare it with Defense, Damage Reduction and
the defenses relevant to the opponent.

### Energy (`energy`)

Energy pays the **Energy cost** shown on an art. Many magical, mental and
elemental techniques spend it. Energy is **not Qi**: having a full cultivation
pool does not mean you can afford a combat technique.

Some techniques list Energy as their scaling stat. Capacity and affordability
are separate questions: inspect the art's actual cost and combat behavior,
not just the size of your Energy bar.

### Stamina (`stamina`)

Stamina pays the **Stamina cost** on physical or heavy techniques. Some arts
also list it as a scaling stat. It is not a universal movement or attack-speed
stat. An art can have Energy and Stamina fields; read both rather than assuming
its cost from its element or animation.

**Build advice:** enough resources for your chosen battle bar matter more
than a huge pool of the resource none of your equipped arts uses.

## 3. Attack and the two general defenses

### Attack (`attack`)

The client guide calls this **base offensive power**. It is an important
input to combat, not a promise that 100 Attack deals 100 final damage.
Technique properties, elements, enemy defenses and other modifiers matter.

**Important scaling warning:** a technique's wiki `baseAmount`, `scaleStat`
and `scaleFactor` are not a complete server damage formula. Patch 1.25.0
specifically describes attack-dependent treatment of non-Attack scaling arts:

- Defense, Mental Fortitude, resistance and Damage Reduction arts are described
  as being measured using the larger of Attack and **0.8 times** the relevant stat.
- Energy-, Stamina- and Speed-based arts are described as riding Attack,
  adjusted between **0.7x and 1.4x** according to the stat versus a realm baseline.

Treat those as documented mechanics, not enough information to calculate a
final hit. Do not ignore Attack just because your main art lists another stat.

### Defense (`defense`)

Defense softens incoming damage. The tutorial describes it as working against
the attacker's power before Damage Reduction. The dedicated guide says Defense
does not reduce damage to zero by itself.

No complete current mitigation equation was recovered. Patch 1.25.0 says
**Defense counts double between cultivators**; that is a PvP-specific note,
not a blanket instruction to double your displayed Defense against beasts.

### Damage Reduction (`damageReduction`)

The dedicated guide describes a **flat cut from each hit**, not a percentage.
The tutorial places it after Defense in the mitigation sequence.

For illustration only: a flat reduction of 10 would remove 10 from a
100-point intermediate hit, not 10% of every incoming hit. The actual damage
floor and complete ordering with elemental/composite effects are unverified.

The paired **Defense / Reduction** tile shows two different attributes.
A `statsPct.damageReduction` bonus increases the Damage Reduction stat; it
does not turn that stat into a universal percent damage reduction.

## 4. Mental Fortitude and Speed

### Mental Fortitude (`mentalFortitude`)

The dedicated guide links Mental Fortitude to:

- Resistance to mind-element attacks.
- Steadiness during heavenly tribulations.
- **Comprehension**, which advances your active cultivation manual.

The tutorial additionally describes resistance to control effects such as
fear and seals. Exact resistance chances and thresholds are not exposed.

Some attacks, heals or defensive arts list Mental Fortitude as their scaling
stat. It therefore supports the yin route, but **not every yin art scales with
it**, and it is not a replacement for Attack, Energy or general defenses.

For tribulations, the client also recommends **lightning resistance and Defense**.
There is no verified single Mental Fortitude number that guarantees success.

### Speed (`speed`)

The combat guide says Speed decides who acts first. The tutorial and patch
notes also describe extra attacks from sufficiently out-speeding an opponent.

Patch 1.25.0 caps this at **one extra strike per turn in PvP** and says beasts
retain the allowance for two extra strikes. These are limits, not guaranteed
extra attacks at any particular displayed Speed. The required ratios are
not established here.

Speed does **not** mean faster Qi accumulation, crafting or zone searches;
those have their own rates and modifiers.

## 5. Critical hits

### Crit Chance (`critChance`)

The chance that an eligible strike is critical, displayed as a percentage.
It is a different mechanic from Fortune.

The introductory tutorial states a **75% cap**, with deep Soul Tree nodes
able to lift it. Treat this as a tutorial-described cap: the complete cap
calculation and current node-specific limits have not been independently
verified.

### Crit Damage (`critDamage`)

Extra damage when a critical hit occurs. The character-sheet renderer converts
the value to a multiplier using:

`displayed critical multiplier = (100 + Crit Damage) / 100`

For example, **50 Crit Damage is displayed as x1.50**, not x50 and not a
50% chance to crit. This verifies the display convention, not the complete
combat calculation or which arts can crit.

The paired **Crit Chance / Dmg** tile therefore means "how often / how much,"
not two chances.

## 6. The three regeneration rates

| Attribute | Recovers | Display unit |
| --- | --- | --- |
| HP Regen (`healthRegen`) | Health | Points per second |
| Energy Regen (`energyRegen`) | Energy | Points per second |
| Stamina Regen (`staminaRegen`) | Stamina | Points per second |

These are recovery rates, not maximum capacities. As simple out-of-combat
arithmetic, restoring 300 missing Health at an unchanged 10 HP/s takes about
**30 seconds**, ignoring other effects, pauses and rounding.

**Conflicting client text:** the dedicated stats guide explicitly describes
regeneration as **out of combat**. The introductory tutorial says it works
**both during and between fights**. The recovered client does not resolve
that contradiction into a verified current in-combat rule.

Use the rates for planning between-fight recovery. Do not promise an infinite
Energy loop or convert a per-second number directly to recovery per combat
turn without testing the live fight.

## 7. Fortune: opportunities, not a universal loot multiplier

### Fortune (`fortune`)

The dedicated stats guide and exploration patch text establish two uses:

1. **Periodic fortuitous encounters:** an active cultivator rolls roughly once
   an hour, including while away from the keyboard. Fortune changes the chance
   the roll succeeds. Rewards can include items, Qi or insight.
2. **Exploration:** patch 1.25.0 says Fortune shifts outcome weight **between
   materials and opportunities only**. More Fortune favors opportunities.
   The same patch describes a one-in-ten beast encounter rate in zones with beasts.

The stats guide describes a small success chance at **0 Fortune**, increasing
toward near-certainty around **10,000**, and potentially approaching almost
nothing at deeply negative values. Those are qualitative guide statements;
**no exact probability curve is available**.

**100 Fortune is not +100% drop chance.** There is no verified general bonus
to honing success, critical strikes, crafting quality or a specific essence's
drop probability.

**Rarity contradiction:** the introductory tutorial claims Fortune raises
reward rarity, but the dedicated stats guide explicitly says it **never
changes reward rarity tier**. Older patch 1.8.0 wording about "rarer outcomes"
also predates 1.25.0's narrower exploration explanation. Do not market Fortune
as a proven higher-rarity reward multiplier.

Fortune Gathering Arrays I-IV describe **+100 / +200 / +300 / +400 for one hour**.
They do not stack; the strongest wins and using a weaker one over a stronger
one wastes it. These descriptions do not establish the exact probability gain.

## 8. Qi Cap, Qi Generation and Comprehension

### Qi Pool / Qi Cap (`qiPoolCap`)

Your cultivation pool fills toward the next breakthrough. **Current Qi** is
the amount accumulated; **Qi Cap** is capacity. It is not combat Energy.

Patch 1.31.0 says Qi Cap bonuses now operate as a **percentage of your realm's
pool**. A larger pool takes longer to fill at the same rate, but gives more
**Energy and Stamina per breakthrough**.

The exact reward multiplier, multiple-source stacking and rounding are
unverified. Do not promise a corresponding Health reward: older guide text
includes Health, while later patches changed Health growth.

Illustration: if a base pool of 10,000 receives a simple +50% modifier, its
capacity is 15,000. At an unchanged 100 Qi/s, empty-to-full time is 150 seconds
instead of 100. This is pool arithmetic, **not a recovered server formula**.

See the [Qi Cap research](qi-cap.md) and the app's Qi Cap laboratory.

### Qi Generation Rate

How quickly Qi accumulates during cultivation. The guide describes multipliers
from manuals, traits and arrays; the sheet shows the resulting rate.
Read the unit: a multiplier such as `qiGenMult` is not itself a Qi/s amount.

Patch 1.31.0 says exploration and auto-combat accumulate **a quarter of your
cultivation Qi and comprehension** while running. Do not apply a full cultivation
rate to every activity or assume all speed bonuses are interchangeable.

### Comprehension

Insight progress in the **active cultivation manual**, advancing toward its
milestones, normally across levels 0-100. The guide says the comprehension
rate is derived from Mental Fortitude, but no exact conversion is established.

Manual comprehension is separate from:

- Major realm and minor stage.
- Weapon mastery and battle-art mastery.
- Learning a book from inventory.
- A battle art's own minimum realm requirement.

An unlock can require both a manual milestone and an art's separate realm
gate. Higher Qi Generation is not proof of proportionally faster comprehension.

## 9. Elemental attack, resistance, absorption and reflection

Each elemental tile has **attack on top** and **resistance below**. Tap it in
the game for its contributing sources.

### Base elements

The eleven base elements are **Physical, Fire, Water, Lightning, Wind, Earth,
Metal, Mind, Spirit, Yin and Yang**. Each has its own elemental attack/resistance.
Physical is included in this grid; general Attack and Defense are still
separate attributes.

- **Elemental Attack (`elemAtk`):** contributes to offense using that element.
  Fire attack is not automatically useful to a pure lightning strike.
- **Elemental Resistance (`elemRes`):** reduces damage of that element.
  A resistance number is not automatically a percent or complete immunity.
- **Weakness:** a trait may list an elemental weakness in addition to negative
  resistance fields. The tutorial describes weakness as taking half again as
  much damage. Do not infer the full interaction with every other modifier.
- **ABSORB:** the element heals rather than harms you, according to the guide.
  This is not lifesteal on your own attacks.
- **REFLECT:** the tile indicates that attacks of that element are turned
  back on the caster. Exact fractions, ordering and exceptions are unverified.

Milestones can gate absorption/reflection. Replacing a trait removes its old
bonuses and arts; inspect the tile again after a swap.

### Composite elements

The old guide's "eleven elements" description is incomplete: patch 1.25.0
introduces **33 composites**, bringing the documented total to **44**:

| Tier | Elements |
| --- | --- |
| Enhanced | Hellfire, Torrent, Tempest, Sand, Adamant, Tribulation, Dread, Soul, Shadow, Solar, Force |
| Combination | Blood, Magma, Storm, Glacier, Smoke, Wood, Crystal, Plague, Soulfire, Dream, Oath, Divinity |
| Advanced | Void, Karma, Samsara, Calamity, Starfall, Gravity |
| Primordial | Chaos, Creation, Destruction, Entropy |

They are built from parent elements, with their own offense/defense treatment.
The patch describes parent-resistance fallback, partial parent damage and
additional resistance penetration for Advanced composites. It explicitly
says parent absorption does not absorb a Primordial composite.

**Do not assume absorbing lightning makes you immune to every composite with
lightning ancestry.** The full current composite calculation has not been
independently verified. "Shadow" is also a named composite, not a reason to
rename every yin attack Shadow.

### Creature-type modifiers (`vsType`, `fromType`)

These modify matchups against categories such as undead or draconic creatures,
not an elemental affinity or a universal stat boost. `vsType` concerns offense
against the category; `fromType` concerns incoming damage from it.
Read the sign and the actual source description: a negative incoming-damage
modifier can be beneficial. Do not add all category bonuses to every fight.

## 10. Nearby indicators that are not ordinary combat attributes

| Indicator | What it means |
| --- | --- |
| Origin | Your starting background. Some origins also have ongoing stat or activity perks; inspect yours rather than assuming all origins are purely cosmetic or permanently beneficial. |
| Dao Power | A progression/power indicator, not interchangeable with Attack or final damage. A larger score alone is not proof of a winning matchup; no complete score formula is asserted here. |
| Realm / stage | Cultivation progression, affecting access and milestones. It is not the same as manual comprehension or an art's level. |
| Age / lifespan | The time budget of the current life, not Health. Patch 1.24.0 introduces lifespan and old-age rebirth; it is not ordinary combat death. |
| Morality / Your Name | Reputation alignment used by encounters and sect admission. Using yin does not itself establish demonic morality. |
| Weapon/art mastery | Separate proficiency systems earned through their activities, not generic Speed or manual comprehension. |

## 11. Reading bonuses without misleading yourself

The public data distinguishes **flat fields**, **percentage fields** and
**multipliers**:

- `stats.attack: 10` is a flat Attack contribution.
- `statsPct.attack: 10` is a percentage bonus, not 10 flat Attack.
- `elemAtk` and `elemRes` map bonuses to particular elements.
- `qiGenMult` denotes a Qi-generation multiplier.
- `levelStatsPct` contains manual per-comprehension growth fields; it is not
  your already-computed final character total.

Do not treat every raw `qiPoolCap` field as a flat Qi amount: the 1.31.0
percentage change makes that especially misleading. Nor does an item's
"+10%" necessarily mean your current final displayed number rises exactly
10%; stacking, caps, source bases and diminishing returns can intervene.

**Use the in-game source breakdown.** Tap an attribute, the paired Defense/
Reduction or Crit tile, or an elemental tile. The client can show contributions
from cultivation, equipment, manuals, traits, meridians, arrays, Soul Tree,
origin, armor sets, soul demons, family bonuses, conditions and buffs, including
diminishing-return entries.

When comparing upgrades, check:

1. The stat your equipped art actually uses, plus Attack and resource costs.
2. Enemy elements, absorption and creature category.
3. Lost trait milestones, arts and defenses, not only new bonuses.
4. Whether the improvement is temporary, realm-limited or subject to a cap.
5. The final in-game attribute total and ordinary combat result.

## Sources and limits

- [Recovered client](../recovered/readable/assets/index-NLmKZ9vy.js):
  `attr.*`, `guide.stats.*`, `guide.exploration.fortune-encounters.*`,
  `guide.cultivation.*`, the attribute tutorial, character-sheet critical
  multiplier display and `statSources.*`.
- [Patch 1.25.0](../recovered/readable/assets/patch-notes-1.25.0-BKh8Uftl.js):
  composites, PvP Defense/Speed changes, non-Attack art scaling and Fortune's
  exploration weighting.
- [Patch 1.31.0](../recovered/readable/assets/patch-notes-1.31.0-DOI-GocG.js):
  Qi Cap and quarter-rate exploration/auto-combat cultivation.
- [Patch 1.24.0](../recovered/readable/assets/patch-notes-1.24.0-Bb5UBe0A.js):
  lifespan.
- [Official public snapshot provenance](../research/wiki/manifest.json) and
  [technique fields](../research/wiki/techniques.json).

No live combat tests or account actions were performed for this page.
Where the client disagrees with itself, this reference preserves the
uncertainty rather than inventing a definitive answer.
