# Validation — Feral Regions 1.0.0

## Automated checks completed

`node tests.mjs` — 16 passing checks:

1. Autonomous arrival, starter choice, capture, supply purchases, healing, badge wins, and revenue in the starting region.
2. Water blocks travel and a bridge restores connectivity.
3. Placement rejects overlapping or inaccessible buildings.
4. Habitat settings update available encounter locations.
5. Roster integrity and canonical evolutions, including Roxy → Titanblood Roxy and Pebblit → Bastionhorn.
6. Battle turns advance over time and terminate with valid health values.
7. Mid-battle serialization and restoration continue deterministically.
8. Malformed imports are rejected.
9. A corrupted current local save falls back to the previous backup.
10. An Elite newcomer replaces #4 and swaps upward through #3, #2, and champion.
11. A loss after gaining #4 preserves that seat and ends the challenge.
12. One active challenger enters while the next remains queued.
13. A controlled, accelerated eight-gym fixture earns badges 1–8 and enters the live League queue.
14. All local JavaScript imports and offline-cache assets exist at the repository root.
15. A mocked Firestore transaction rejects stale writes and accepts explicit replacement.

An additional regression check verifies that relocating a facility updates a walking trainer’s destination.

Additional checks:

- All JavaScript files passed Node syntax checks.
- The app booted and its panels, gym editing, habitat settings, build toggles, and speed controls ran in a lightweight DOM event harness without errors. This is not a real browser test.
- World and battle canvases were rendered using a native Canvas implementation and visually inspected.
- Icons were rendered at 192 and 512 pixels.
- A larger region save with active trainers and battles was serialized and restored successfully at roughly 228 KB.

## Verification limits

A supported browser-control environment was not available for this delivery. Actual mobile browser layout, pinch gestures, browser installation, offline reload, and Google popups have not been exercised on a phone or iPad.

The Firebase project’s providers, authorized domains, database, and security rules were not accessed or changed. Live Google / email authentication and Firestore writes were not attempted. Follow START_HERE.md, then test sign-in and a save/load round trip from the published address.

The eight-gym progression fixture deliberately uses a strong test trainer and easy gyms to verify the full state flow quickly; it is not a long-duration balance test of the default level curve.

## Deliberate game rules

- Turn-based battles resolve automatically while the world runs. Viewing a battle does not grant manual combat control.
- Teams heal between Elite Four matches. An earned seat is retained after a subsequent loss.
- Founding Elite Four members start around levels 48–60. Normal trainers can level to 75.
- Every gym has its own persistent leader definition; gym teams are fresh at each match. Edits affect future matches.
- Trainer active teams hold up to six Ferals; combined team and reserve storage is capped at twelve.
- The region supports up to 44 adventuring trainers plus four Elite Four residents. Arrival capacity grows with gyms and land.
- Forest terrain is walkable; water requires a bridge. Habitats are encounter zones rather than persistent free-roaming individual wild populations.
- A trainer unable to reach an intended destination displays a “!” and retries later.
- Accounts have one private region each. There is no shared multiplayer or offline progression.
