# Qi Cap and breakthrough rewards

**Research draft for client version 1.31.0.** The direction of the reward
effect is documented; its exact numerical formula is not yet verified.

## The short answer

Qi Cap is a trade-off: a larger pool takes more Qi to fill, but a successful
breakthrough awards more **Energy and Stamina**.

Do **not** read "+50% Qi Cap" as "+50% to all breakthrough stat gains".
The current patch notes do not promise that. They also do not state whether
Energy/Stamina rewards scale linearly with the cap.

## What changed in 1.31.0?

Qi Cap bonuses are now percentages of the realm's pool, rather than tiny flat
amounts added to it. Manuals, bloodlines, physiques, pills, and arrays can raise
it. Certain pills and random events can also permanently increase or decrease
the pool. [1]

The client also explicitly renders the ordinary `qiPoolCap` stat with a percent
suffix. For example, a value of `20` in that display means `+20%`, not `+20 Qi`. [2]

## Quantifying the pool and cultivation time

For a **single effective percentage modifier**, the natural reading of the
patch is:

```text
B = this realm/stage's pool before the Qi Cap modifier
p = effective Qi Cap modifier, in percentage points

pool = B × (1 + p / 100)
```

This is the percentage interpretation of the patch text, **not a recovered
server implementation**. How multiple sources stack, minimum/maximum caps,
and rounding remain unverified.

Here is what that interpretation means for a hypothetical base pool of
10,000 Qi and a constant cultivation rate of 100 Qi per second, starting empty:

| Effective Qi Cap modifier | Required Qi | Time to fill | Relative time |
| ------------------------- | ----------: | -----------: | ------------: |
| 0%                        |      10,000 |  100 seconds |         1.00x |
| +20%                      |      12,000 |  120 seconds |         1.20x |
| +50%                      |      15,000 |  150 seconds |         1.50x |
| +100%                     |      20,000 |  200 seconds |         2.00x |
| +200%                     |      30,000 |  300 seconds |         3.00x |

These are **arithmetic examples**, not measured character values.
If you already have some Qi:

```text
remaining time = max(0, actual pool − current Qi) / actual Qi per second
```

This assumes a positive, constant rate and no other Qi income or spending.
The client receives the actual `qiCap`, `qiCurrent`, and `qiRatePerSec` from the
server and interpolates the bar locally. [3]

Compare total pool sizes, not just the displayed bonus. Moving from +100% to
+200% takes the pool from 2B to 3B: **50% more Qi**, not twice as much.
That is also 50% longer from empty if the rate is unchanged.

## Which breakthrough stats benefit?

| Stat                              | Evidence                                                                                           | Safe conclusion                                                            |
| --------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Energy                            | 1.31.0 says a bigger pool gives more; 1.25.0 says Energy retains flat breakthrough growth          | Increased reward is documented; exact increment and multiplier are unknown |
| Stamina                           | Same evidence as Energy                                                                            | Increased reward is documented; exact increment and multiplier are unknown |
| Health                            | Older embedded guide includes Health, but 1.25.0 changed it to multiply on the same step as Attack | A Qi Cap-dependent Health bonus is **not established**                     |
| Attack, Defense, other attributes | No Qi Cap reward formula was found in the traced client code                                       | Do not claim that Qi Cap increases these gains                             |

The older guide wording says Health, Energy, and Stamina all gain more with a
larger Qi-pool modifier. [4] That conflicts with the later, more specific
change notes: Health became multiplicative in 1.25.0, while Energy and Stamina
retained flat growth; 1.31.0 names only Energy and Stamina for the Qi Cap
benefit. [1][5] Treat the old sentence as potentially stale, not as proof.

**We cannot currently give a verified table such as "+50% Qi Cap = +X Energy
and +Y Stamina".** The breakthrough action is sent to the server; the UI
refreshes character data rather than calculating those rewards locally. [6]

Unknowns include:

- The base Energy/Stamina reward for each realm and transition.
- Linear versus nonlinear scaling with effective Qi Cap.
- Rounding and caps.
- Whether the modifier is sampled when Qi is earned, when the pool fills, or
  when the breakthrough is attempted.
- Whether changing equipment, manuals, or arrays immediately before a
  breakthrough changes its reward.
- Whether any interaction with Health remains despite the newer wording.

## Is a bigger cap worth it?

It is a documented way to trade **slower realm progression** for **larger
Energy/Stamina rewards per breakthrough**. Whether that also improves rewards
per hour depends on the missing reward formula.

To compare two otherwise matched setups:

```text
time ratio = (new pool / old pool) × (old Qi rate / new Qi rate)
reward-rate ratio = (new reward / old reward) / time ratio
```

Use Energy and Stamina separately for "reward".

For example, if the pool becomes 1.5x larger at unchanged cultivation rate:

- A 1.5x reward would mean unchanged reward per cultivation hour.
- A 1.2x reward would mean 0.8x reward per hour: 20% less.
- A 2.0x reward would mean about 1.333x reward per hour: 33.3% more.

These are **conditional comparisons**, not claims about the game's formula.
Even if reward per hour were unchanged, reaching a new realm later still
delays its unlocks.

## How to establish the exact reward formula

Use consenting players' ordinary gameplay observations. No private/admin
endpoints or automated breakthrough actions are needed.

For each observed successful breakthrough, record:

| Field            | What to record                                                                 |
| ---------------- | ------------------------------------------------------------------------------ |
| Version and date | Server balance can change independently of the installed client                |
| Transition       | Exact old/new major realm and minor stage; mark tribulations                   |
| Qi setup         | Actual pool, displayed Qi Cap modifier, sources, current Qi and rate           |
| Character setup  | Aspect, manuals, traits, gear, arrays, temporary effects, reincarnation perks  |
| Before and after | Maximum Energy, Stamina, Health and Attack, not their current filled amounts   |
| Confounders      | Newly unlocked trait/manual milestones, comprehension levels, expiring effects |

Compare **the same transition** at different cap values across matched
characters/lives. Two consecutive breakthroughs on one character are not a
clean pair: their baseline rewards or unlocks may differ.

Test at least three modifier values, then check whether the reward ratios
track the actual pool ratios. Use larger samples to distinguish integer
rounding from genuine nonlinear scaling. Also test minor and major
transitions separately.

Until that evidence exists, publish the qualitative benefit and cap/time
examples above, but leave the exact breakthrough reward multiplier marked
**unverified**.

## Sources

All local citations refer to the unmodified recovered client assets:

1. [1.31.0 patch notes: Qi Cap that actually works](../recovered/readable/assets/patch-notes-1.31.0-DOI-GocG.js#L24).
2. [Trait stat formatter: qiPoolCap uses percent units](../recovered/readable/assets/index-NLmKZ9vy.js#L47948).
3. [Action state: server pool, rate, current Qi, and local interpolation](../recovered/readable/assets/index-NLmKZ9vy.js#L55349).
4. [Older embedded cultivation guide](../recovered/readable/assets/index-NLmKZ9vy.js#L29686).
5. [1.25.0 patch notes: multiplicative Health; flat Energy/Stamina growth](../recovered/readable/assets/patch-notes-1.25.0-BKh8Uftl.js#L58).
6. [Breakthrough API call](../recovered/readable/assets/index-NLmKZ9vy.js#L33027)
   and [success handling / character refresh](../recovered/readable/assets/index-NLmKZ9vy.js#L55384).

The public [official guides](https://immortalzenith.com/guides) and
[wiki](https://immortalzenith.com/wiki) were also checked; their retrieved page
text did not establish the Qi Cap reward multiplier.
