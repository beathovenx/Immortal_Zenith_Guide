export const realms = [
  "Human",
  "Body Tempering",
  "Qi Condensation",
  "Core Formation",
  "Golden Core",
  "Nascent Soul",
  "Immortal Ascension",
  "Immortal Saint",
  "Immortal Emperor",
  "Shattered Void",
  "Void Emperor",
  "Celestial Immortal",
  "Celestial Saint",
  "Celestial Emperor",
  "World Creator",
];
export const stages = [
  {
    realm: 2,
    title: "Give the storm a voice.",
    manual: "Stormcrown Codex",
    id: "blazing_yang_codex",
    text: "Your first project is a usable lightning battle art. Stormcrown's exact acquisition source is unverified: keep Abyssal Current or use an obtainable lightning fallback if unavailable. Seek a C/B lightning bloodline; keep Steady Pulse until a worthwhile higher-rank physique arrives.",
    goals: [
      "Stormcrown 45: Unhesitating Skysplit",
      "Stormcrown 65: lightning absorption",
      "Thunder Viper or Thunder Stag; skip ranks if a better essence arrives",
    ],
    tag: "START HERE",
  },
  {
    realm: 3,
    title: "Sharpen the mind.",
    manual: "Stormmind Sutra",
    id: "five_spirits_sutra",
    text: "Add a Mind manual rather than replacing your developed Soul project. Your fan's Mental Fortitude makes this a useful direction.",
    goals: [
      "Stormmind 45: The White Instant",
      "Viper/Stag second lightning art unlocks at major 3",
      "Do not risk equal-rank essence swaps just for a preferred name",
    ],
  },
  {
    realm: 4,
    title: "Hold the line.",
    manual: "Stormcrown Codex",
    id: "blazing_yang_codex",
    text: "Keep cultivating what already works. A higher-tier book is not automatically worth restarting comprehension.",
    goals: [
      "Stormcrown 90: lightning ward, requiring major 4",
      "Keep a non-lightning option for resistant enemies",
      "Evaluate Thunderheart as your longer-lived physique bridge",
    ],
  },
  {
    realm: 5,
    title: "Let the sky split.",
    manual: "Skybreaker Lightning Manual",
    id: "skybreaker_lightning_manual",
    text: "An AoE project becomes practical. Skybreaker is an option, not an obligation if you cannot obtain it.",
    goals: [
      "Level 45: Arcline of the Split Sky, AoE with stun effect",
      "Level 65: lightning absorption",
      "Skip this book if Stormbolt becomes your more practical project",
    ],
  },
  {
    realm: 6,
    title: "Thunder in body and soul.",
    manual: "Lightning Dragon Codex",
    id: "lightning_dragon_codex",
    text: "Add a Body route and use Stamina as well as Energy. Stormbolt Sutra is the alternative Soul project.",
    goals: [
      "Lightning Dragon 45: Thunderfall, Stamina-scaling AoE",
      "Stormbolt 45: The Nine Heavens, Energy-scaling AoE",
      "Do not buy and restart every Soul manual",
    ],
  },
  {
    realm: 7,
    title: "The storm turns inward.",
    manual: "Celestial Thunder Emperor Canon",
    id: "celestial_thunder_emperor_canon",
    text: "A later Mind project offers Mental Fortitude-scaling AoE. Thunderheart now supplies its absorption milestone.",
    goals: [
      "Canon 45: Arcline",
      "Thunderheart: lightning absorption and Arc Strike",
      "Verify a manual can retain absorption before replacing Thunderheart",
    ],
  },
  {
    realm: 8,
    title: "Awaken the inheritance.",
    manual: "Thunder Dragon / Celestial Thunderheart",
    text: "Both tier-8 manuals are optional upgrades, not required extra grinds. A-rank bloodline capstones become relevant.",
    goals: [
      "Thunder Lotus/Ape capstone at major 8",
      "Stormbone absorption at major 8",
      "Keep mature manuals unless the new project has a clear purpose",
    ],
  },
  {
    realm: 9,
    title: "Call down the emperor's storm.",
    manual: "Storm Emperor Sutra",
    id: "storm_emperor_sutra",
    text: "A later Soul project for Energy-scaling lightning offense. It is not a requirement to replace a working manual immediately.",
    goals: [
      "Level 45: Stormfall, lightning AoE",
      "Work toward the S-rank target pair as opportunities arise",
      "Keep coverage against lightning absorption",
    ],
  },
  {
    realm: 10,
    title: "Refine, rather than restart.",
    manual: "Your developed manuals",
    text: "There is no compulsory swap at this stage. Improve comprehension, equipment and sustain.",
    goals: [
      "Finish existing milestone projects",
      "Check lost arts and defenses before any trait replacement",
      "Do not equate higher rank with every stat improving",
    ],
  },
  {
    realm: 11,
    title: "Become the coming storm.",
    manual: "Genesis Thunder Court + Heavenly Thunder",
    text: "The practical S-rank pair reaches its late lightning milestone package.",
    goals: [
      "Genesis: The Unanswered Fulgurite and absorption",
      "Heavenly Thunder: Ninefold Judgment and absorption",
      "These unlocks depend on actually owning the traits",
    ],
  },
  {
    realm: 12,
    title: "Master your matchups.",
    manual: "Your finished lightning core",
    text: "Refine offense and survival for actual opponents; a new realm does not require a new trait.",
    goals: [
      "Keep non-lightning coverage",
      "Pursue S+ only if acquisition is realistic",
      "Avoid risky S-to-S sidegrades",
    ],
  },
  {
    realm: 13,
    title: "A sovereign's inheritance.",
    manual: "Emperor of Ten Thousand Thunder",
    text: "Optional S+ pure-lightning direction, not a prerequisite for the build.",
    goals: [
      "Sovereign Strike unlocks at major 13",
      "Compare the complete trait, not rank alone",
      "Rebuild your battle bar after a trait change",
    ],
  },
  {
    realm: 14,
    title: "A world of your own.",
    manual: "Your optimized build",
    text: "No further compulsory trait change. Optimize around enemies, available resources and the arts you actually use.",
    goals: [
      "Maintain coverage and sustain",
      "Validate uncertain interactions in ordinary gameplay",
      "Keep the build's goals ahead of collecting every rarity",
    ],
  },
];
export function calculateQi({ base, bonus, rate, current }) {
  if (
    ![base, bonus, rate, current].every(Number.isFinite) ||
    base <= 0 ||
    bonus <= -100 ||
    rate <= 0 ||
    current < 0
  ) {
    throw new RangeError(
      "Enter a positive base pool and rate, a bonus above -100%, and nonnegative current Qi.",
    );
  }
  const pool = base * (1 + bonus / 100);
  const seconds = Math.max(0, pool - current) / rate;
  if (![pool, seconds].every(Number.isFinite))
    throw new RangeError("These values are too large to calculate.");
  return { pool, seconds, timeRatio: pool / base };
}
export function filterEntries(entries, query, collection, build = "all") {
  const search = query.trim().toLowerCase();
  return entries.filter(
    (entry) =>
      (collection === "all" || entry.collection === collection) &&
      (build === "all" || entry.build === build) &&
      `${entry.name} ${entry.rank ?? ""} ${entry.description ?? ""}`
        .toLowerCase()
        .includes(search),
  );
}
