# Feral Regions

**Build a world. Watch a legend.**

Version 1.0.0 · static GitHub Pages project · all files at repository root

Start with **START_HERE.md** for phone-friendly publishing, Firebase setup, controls, and gameplay.

## Included

- A 96 × 72 tile region with six purchasable plots, six encounter biomes, terrain brushes, paths, bridges, scenery, and movable buildings.
- Tycoon economy with service fees, supply costs, upkeep, field-research rewards, and seven milestone grants.
- Persistent autonomous trainers, starter choice, exploration, capture, six-Feral teams and reserve storage, individual money and consumables, healing and retry behavior.
- 36 Feral species / forms: Cinderkit, Bastionhorn, Abysscoil, Roxy, Titanblood Roxy, Wishling, and a larger original roster. Ten elements, evolution, stat variation, moves, level progression, and a Feral-dex.
- Animated, automatic turn-based wild, trainer, gym, and ranked battles. Attacks, capture attempts, tonics, fainting, team switching, elemental matchups, critical hits, guard, burn, and slow effects.
- Eight fully configurable gyms. Edit leaders, badge names, 1–6 Feral teams, levels, and moves.
- Elite Four with a single challenge queue and the exact replace-#4 / swap-upward / #1-champion structure.
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
| `render.js` | Canvas world, authored procedural pixel sprites, battle animation |
| `save.js` | Save serialization, import validation, local backups |
| `cloud.js`, `firestore.rules` | Firebase sign-in, conflict-aware cloud saving, private access rules |
| `manifest.webmanifest`, `sw.js`, `icon*` | Installation and offline support |
| `tests.mjs` | Dependency-free simulation and persistence checks |

## Developer verification

Optional: `npm test` or `node tests.mjs` with a modern Node runtime. No dependencies to install. Tests do not contact Firebase or modify any remote project.

The game uses browser-native modules and Canvas. Firebase SDK modules are loaded lazily from Google’s CDN, so network failure does not prevent guest gameplay. The Firebase browser configuration is public app configuration; authorization is enforced by Authentication and Firestore rules.

Each account has one region. The world is a private local simulation with synchronized saves, not shared multiplayer. Cloud saves are limited to an 850 KB serialized payload and display an actionable error instead of silently truncating a region. The built-in population and history caps keep ordinary regions below this limit.

The project takes control and simulation ideas from the supplied WildLinks reference; it has its own Feral-specific world and battle systems. No Pokémon character art or assets are included.
