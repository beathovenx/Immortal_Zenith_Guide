# Immortal Zenith guide research

Recovered from the installed Windows client, version **1.33.1**, with the
user's stated permission to decompile it. The Steam installation was not
modified, and the game was not launched.

## Private browser app

Start the guide from this workspace:

```powershell
npm.cmd start
```

Or on Windows, just double-click:

```text
start-guide.cmd
```

Open **http://127.0.0.1:4173**. The server binds to this computer's loopback
address only. Keep the terminal running; press Ctrl+C to stop it. If port 4173
is occupied, use `$env:PORT=4174; npm.cmd start` and open that port instead.

The app includes:

- Your character's starting snapshot, recommended next steps, and a
  browser-saved checklist (not live game progress).
- A realm-by-realm lightning progression planner.
- A fresh-character demonic / yin path with its own checklist, realm guide,
  intermediate traits, martial arts and optional demonic sect considerations.
  Open **http://127.0.0.1:4173/#demonic**.
- A searchable illustrated codex of 43 selected traits and manuals, with
  lightning/yin filters, bonuses, drawbacks, source categories, milestones,
  and raw battle-art scaling, costs and realm gates.
- A Qi Cap pool/time calculator that explicitly does not invent an
  Energy/Stamina reward multiplier.
- An [attributes reference](guide/attributes.md) covering combat stats,
  cultivation, Fortune, elemental defenses and conflicting client descriptions.
  Open **http://127.0.0.1:4173/#attributes**.
- A [reincarnation guide](guide/reincarnation.md) with Soul Tree priorities,
  point budgets, retention paths and evidence limits. Open
  **http://127.0.0.1:4173/#reincarnation**.
- A [world map tier guide](guide/worldmap.md) with confirmed settlement tier
  ranges from in-game labels. Open **http://127.0.0.1:4173/#worldmap**.
- A [patch notes highlights tab](guide/patchnotes.md) covering the largest
  gameplay/system changes from version 1.33.x. Open
  **http://127.0.0.1:4173/#patchnotes**.
- A [Dao Soul Point guide](app/dao-points.md) on maximizing each rebirth,
  checking the reward preview and distinguishing confirmed factors from
  unverified bonuses. Open **http://127.0.0.1:4173/#dao-points**.
- A [fast progression guide](app/fast-progress.md) with a cultivation-first
  Soul Tree plan, the Soul Wandering unlock and action-slot trade-offs. Open
  **http://127.0.0.1:4173/#fast-progress**.
- A complete, locally planned Soul Tree with wiki node effects, costs,
  prerequisites and local artwork. Open **http://127.0.0.1:4173/#soul-tree**.
  The tree fits the available width; scroll the page for lower rows. Planned
  ranks are saved in this browser and never sent to the game.
- The complete Markdown guide topics, rendered as field notes.

All artwork is cached locally, including 45 images resolved using the
installed client's CDN mapping and its embedded logo. The running app makes
no game API requests and needs no account or internet connection. External
official-wiki links only open if you choose them.

For a fresh setup or to rebuild missing guide data/artwork:

```powershell
npm.cmd ci --ignore-scripts --no-audit --no-fund
npm.cmd run prepare:guide
npm.cmd run prepare:soul-tree
npm.cmd test
```

Preparation uses the existing public wiki snapshots and recovered client bundle,
and downloads missing images from the game's artwork CDN. Original recovered
assets are not modified. Artwork source URLs are recorded in
[app/data.json](app/data.json).
Soul Tree preparation separately refreshes its public wiki snapshot and local
node images. Prices and effects are snapshots, not live character data.
Markdown source references to recovered code are displayed as workspace
references rather than exposing the executable or recovered bundles through
the app's web server.

## GitHub Pages deployment

This repo now includes a GitHub Pages workflow:

- Workflow: [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)
- Pages preparation script: [tools/prepare-pages.mjs](tools/prepare-pages.mjs)

The workflow runs on pushes to `main`, installs dependencies, runs
`npm run prepare:pages`, and deploys the [app/](app/) folder.

`prepare:pages` copies:

- `node_modules/marked/lib/marked.esm.js` → [app/vendor/marked.js](app/vendor/marked.js)
- `node_modules/dompurify/dist/purify.es.mjs` →
  [app/vendor/purify.js](app/vendor/purify.js)
- all markdown files from [guide/](guide/) → [app/guide/](app/guide/)

For your custom domain, a [CNAME](app/CNAME) file is included with:
`zenithguide.com`.

## Optional local farming bot (AutoHotkey)

For your requested monster-farming loop automation, a local bot scaffold is in
[bot/README.md](bot/README.md):

- [bot/farm-bot.ahk](bot/farm-bot.ahk)
- [bot/farm-bot.ini](bot/farm-bot.ini)

It implements the flow:

- wait for home HP >= 90%
- open combat and start selected beast fight
- use basic attack or technique
- continue with Again while HP >= 30%
- Return and wait for regen when HP drops below threshold

You must calibrate HP bar regions and click targets for your own resolution/UI
scale before use.

## Recovered files

- [Original embedded assets](recovered/raw/): 70 files, 5,138,100 bytes total,
  decompressed from the executable without changing their contents.
- [Readable assets](recovered/readable/): the same files, with recognized text
  formats processed by Prettier. These are compiled/minified JavaScript bundles,
  not reconstructed original TypeScript or original project modules.
- [Manifest](recovered/manifest.json): executable SHA-256, asset SHA-256 hashes,
  original asset paths, PE table/data offsets, and compressed/uncompressed sizes.
- [Main client bundle](recovered/readable/assets/index-NLmKZ9vy.js):
  English guide text, UI logic, API calls, asset mappings, and client constants.
- [Entry page](recovered/readable/index.html): identifies the active main bundle
  and stylesheet.
- [Extractor](tools/extract-tauri.mjs): reproducible local extraction and
  integrity verification.

The client uses Tauri 2.11.3. Its bundled assets are Brotli-compressed byte
slices referenced by a Rust PHF table in the PE64 executable. All 68 recovered
entries form one contiguous 32-byte-entry table.

## Starting points for system analysis

### Guide topics

- [Qi Cap and breakthrough rewards](guide/qi-cap.md): current evidence,
  quantitative pool/time examples, and the still-unverified reward formula.
- [Your lightning PvE progression](guide/lightning-cultivator.md): a route from
  Qi Condensation 6 through intermediate traits, manuals and martial arts,
  grounded in character inspection and official public wiki snapshots.
- [Fresh-character demonic / yin progression](guide/demonic-cultivator.md):
  a darkness-themed Mental Fortitude route, practical intermediates and
  explicit acquisition limits. Yin combat and demonic sect morality are
  separate; no specific seller or guaranteed trait drop is asserted.

Search the readable main bundle for these text keys and API method names:

| Area                                                 | Starting points                                                       |
| ---------------------------------------------------- | --------------------------------------------------------------------- |
| Cultivation, realms, breakthroughs, tribulations     | `guide.cultivation`, `startCultivation`, `breakthrough`               |
| Combat, elements, techniques, tower, story, bounties | `guide.combat`, `getTechniques`, `towerView`, `storyView`, `bounties` |
| Crafting, alchemy, refining, talismans, arrays       | `guide.crafting`, `getCrafting`, `arrayMaster`                        |
| Inventory and equipment                              | `getInventory`, `equip`, `armorSets`                                  |
| Reincarnation, Soul Tree, soul demons                | `reincarnateBegin`, `soulTree`, `soulDemons`                          |
| Sects, contracts, diplomacy, mentorship              | `sectContracts`, `sectRelations`, `sectMentor`                        |
| Havens, storage, arrays, mentorship                  | `haven`, `havenInstallArray`, `havenMentor`                           |
| Achievements and currencies                          | `guide.achievements`, `guide.currencies`                              |

The other recovered bundles include translated UI text, tutorials, system
overviews, platform integrations, and patch notes through version 1.33.1.
Start with the entry page's imports rather than assuming every bundled chunk
is used by the current screen.

## Important limits

- This is **frontend asset recovery**, not decompilation of the native Rust
  wrapper. Original variable names, comments, source maps, build sources, and
  server source have not been reconstructed.
- The client sends game actions to `https://api.immortalzenith.com/api/v1`.
  Server-authoritative rules and complete live content cannot be recovered
  solely from this executable.
- Many images and videos are mapped to
  `https://d27wzk5al56txp.cloudfront.net`; those remote media files were not
  downloaded.
- No authenticated endpoints were called, credentials read, or gameplay actions
  performed.
- In-game explanations and patch notes are useful evidence, but are not proof
  that a formula matches the current server implementation. A complete guide
  should distinguish client calculations, explanatory text, and gameplay-tested
  behavior.
- The recovered entry page is not a standalone offline game. It expects its
  normal app environment, backend, and remote assets.
- Keep recovered game code/assets local unless redistribution is also permitted.

## Reproduce and verify

Use Node.js and the Windows npm launcher from the workspace:

```powershell
npm.cmd ci --ignore-scripts --no-audit --no-fund
npm.cmd run verify
npm.cmd run check
```

Verification re-reads the installed executable, compares the full recovered
asset inventory and hashes, and checks every readable copy against stable
formatting of its original bytes. Formatting also parses the recognized
JavaScript assets.

To extract into a **fresh** workspace without an existing `recovered` directory:

```powershell
npm.cmd run extract
# Optional alternate executable:
npm.cmd run extract -- "D:\path\to\immortal-zenith.exe"
```

Extraction deliberately refuses to overwrite an existing recovery. After a
game update, preserve the old recovery separately before making a new one.
