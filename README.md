# Feral Regions

**Build a world. Watch a legend.**

Version 1.4.0 · static GitHub Pages project · all files at repository root

Start with **START_HERE.md** for phone-friendly publishing, Firebase setup, controls, and gameplay.

## Included

- Empty-land start with a construction guide and player-controlled admissions.
- A 96 × 72 tile region with six purchasable plots, six encounter biomes, terrain brushes, paths, bridges, scenery, and movable buildings.
- Tycoon economy with service fees, supply costs, upkeep, field-research rewards, and seven milestone grants.
- Persistent autonomous trainers, starter choice, exploration, capture, six-Feral teams and reserve storage, individual money and consumables, healing and retry behavior.
- 108 Feral species / forms with distinct family silhouettes and evolution details: Cinderkit, Bastionhorn, Abysscoil, Gravahound, Titanblood Gravahound, Wishling, and a larger original roster. Ten elements, evolution, stat variation, moves, level progression, and a Feral-dex.
- Animated, automatic turn-based wild, trainer, gym, and ranked battles. Attacks, capture attempts, tonics, fainting, team switching, elemental matchups, critical hits, guard, burn, and slow effects.
- Eight fully configurable gyms. Edit leaders, badge names, 1–6 Feral teams, levels, and moves.
- An initially empty Elite Four hall filled by your own trainers, with a single challenge queue and the exact replace-#4 / swap-upward / #1-champion structure.
- Portrait-phone, unfolded-phone, and tablet CSS layouts; touch pan, pinch, paint, tap, inspection, and follow controls.
- Local autosave, previous-save backup, JSON import/export, Google and email/password accounts, UID-private Firestore saves, and stale-device conflict detection.
- Installable web app metadata, icons, and offline app-shell caching.
- Pause / 1× / 2× / 4×. No offline progress.

## Files

| File | Purpose |
| --- | --- |
| `index.html`, `style.css`, `app.js` | Game interface, touch editor, inspectors, account screens |
| `data.js` | Feral roster, moves, elements, terrain and building definitions |
| `world.js` | Region grid, land, placement rules, route finding, habitats |
| `simulation.js` | Autonomous trainers, economy, services, gyms, Elite Four |
| `battle.js` | Turn resolution, stats, capture, damage, XP and evolution |
| `render.js`, `sprites.js` | Cached Canvas world, 108 species with normal and shiny pixel sprites, smooth battle animation |
| `save.js` | Save serialization, import validation, local backups |
| `cloud.js`, `firestore.rules` | Firebase sign-in, conflict-aware cloud saving, private access rules |
| `manifest.webmanifest`, `sw.js`, `icon*` | Installation and offline support |
| `tests.mjs` | Dependency-free simulation and persistence checks |

## Developer verification

Optional: `npm test` or `node tests.mjs` with a modern Node runtime. No dependencies to install. Tests do not contact Firebase or modify any remote project.

The game uses browser-native modules and Canvas. Firebase SDK modules load from Google’s CDN. Google or email/password authentication is required before entering the game; connection errors stay on the login screen. Existing authenticated sessions restore automatically when Firebase is available. The Firebase browser configuration is public app configuration; authorization is enforced by Authentication and Firestore rules.

Each account has one region. The world is a private local simulation with synchronized saves, not shared multiplayer. Cloud saves are limited to an 850 KB serialized payload and display an actionable error instead of silently truncating a region. The built-in population and history caps keep ordinary regions below this limit.

The project takes control and simulation ideas from the supplied WildLinks reference; it has its own Feral-specific world and battle systems. No Pokémon character art or assets are included.

## New in 1.1

- Blank town, no pre-painted paths, no pre-generated Elite Four. An eight-step guide teaches through construction.
- Six initial trainer places plus six per gym, up to 54 total; gradual arrivals and a pause-admissions control.
- Stronger distinctions in every Feral’s silhouette, proportions, head, tail, and special features.
- Movement runs at 30 simulation steps per second with frame interpolation. Battle canvases persist across live updates. Portraits and navigation routes are cached, pathfinding uses a heap, and terrain repainting is limited to changed areas.
- Slower XP, increasing late-level requirements, longer searching, readable 1.8-second combat turns, and longer breaks between gym attempts.
- Trainer profiles explain gym readiness. New-region and restore-previous-region controls preserve the current local region in an archive.

- Player-created catching areas with painted boundaries, numbered map flags, custom names, individual rosters, level ranges, and badge gates. Up to 40 areas; unmarked terrain does not generate encounters.
- One low-probability capture attempt per unfamiliar wild species per encounter. Automatic team rebalancing considers strength and elemental coverage.
- Starting budget reduced to $5,500; large early grants and trainer payouts reduced.

## Living region (1.3)

`living.js` adds personality preferences, recent transaction accounting, stocked shops, visitor tourism, service upgrades and champion records. Build route networks, pin favorite trainers, filter activity, upgrade services and customize additional decorations. Save migration adds these systems without replacing the map or existing trainers. See START_HERE.md for controls and CHANGELOG.md for the full update.
