# Validation — Feral Regions 1.3.1

## Automated checks

`node tests.mjs`: 26 checks, all passing.

Coverage includes:

- Truly empty starting world and first-lab placement before any other building.
- No arrivals before opening admissions, six starting places plus six per gym (54 with eight gyms), no population increase from land, and pausing admissions.
- A first eight-badge trainer claiming vacant Elite Four ranks without generating any residents.
- XP requirements growing faster than equal-level rewards, and explicit trainer gym-readiness explanations.
- Old-save migration preserving buildings, trainers and levels while remapping XP proportionally.
- Autonomous catching, shopping, healing, gym wins and revenue in a deliberately constructed test town.
- Water barriers, bridges, placement constraints, and moved-building route destinations.
- Habitat controls, Feral evolution, timed combat, live-battle save continuation, corrupt-save fallback and malformed imports.
- Elite Four #4 replacement, upward rank swaps, retaining an earned seat after losing, and one active challenger at a time.
- An accelerated eight-gym fixture entering the League queue.
- Root-level imports / offline assets, and mocked cloud transaction conflict handling.

Additional checks:

- Every JavaScript file passes syntax checks.
- A DOM event harness exercises empty-world onboarding and first-lab pointer placement, as well as all inspector panels, gym editing, habitats, build controls and game speed.
- That harness verifies the battle canvas remains the same object across live turn updates.
- All 36 new Feral drawings were rendered together with a native Canvas implementation and visually reviewed for distinct shapes.

## Verification limits

The changes address observed code-level causes of choppy animation, but no supported phone/iPad browser-control environment was available. Device frame rate, touch feel, real browser layout, installation, and Google sign-in still require testing on the published site. The event harness and native Canvas rendering are not substitutes for real device tests.

Firebase project settings were not accessed or changed, and no live cloud writes were performed. Follow START_HERE.md for setup.

The accelerated eight-gym fixture tests the complete progression state flow, not the time required to finish the default game.

## Deliberate rules

- Gameplay is a private autonomous tycoon simulation. Battles play out automatically.
- A fresh town has no buildings or trainers; natural terrain and habitats remain available for the player to develop.
- Wild creatures are generated encounters inside player-painted, open catching areas. Areas have markers, custom rosters and badge gates; unmarked terrain is not an encounter area.
- New Elite Four halls begin with vacancies. Existing saved worlds retain their established residents.
- Six active Ferals and six reserves per trainer; up to 54 residents with eight gyms.
- Level cap 75. Higher levels require more battles, especially when fighting weak opponents.
- No progress occurs while the game is hidden or closed.

Additional update checks cover area persistence, custom rosters and badge gates, one capture attempt per encounter, avoiding catches of reserve-owned species, and active-team rebalancing. The event harness also creates, names, paints and opens an area. Native Canvas rendering verified the map marker/boundary and incremental terrain repaint.

A controlled 20-game-minute starting-town run with one gym, a 64-tile beginner area and default pricing ended with seven trainers, eight catches, two awarded badges, and $3,134 remaining after deducting the initial town, gym, area and path costs. This is one seeded scenario, not a guarantee for every layout or random outcome.

## 1.2 placement and entry checks

All 26 simulation/save checks pass, including all-lawn new worlds. The DOM/Canvas event harness passes login gating, no simulation/save before login, signed-out gate reopening, neutral Build panning, fresh menu selection, building drag preview, cancellation, pinch cancellation, palette drag/drop with price confirmation, and disarming after placement. Existing panel and stable battle-canvas checks pass. Firebase is mocked in the event harness; live provider login and actual phone touch/render performance require checking on the published GitHub Pages site. No browser or device verification is claimed.

1.3.1: mocked authentication checks pass for IndexedDB → session → memory fallback, signup quota recovery without duplicate account creation, and credential errors. Live Firebase login still requires device verification.

## 1.3 living-region validation

26 simulation/save checks pass, including the complete eight-gym and Elite Four sequence. The early autonomy test now covers 30 game-minutes to accommodate cautious personalities. Additional integration checks cover paid stock/reserve, personality readiness and collecting preferences, path detours, paying visitors without trainer capacity consumption, cash flow, champion turnover and save persistence, and exclusive gym battles with waiting queues. Auth fallback checks pass. DOM/Canvas event harness covers favorites, renaming, route toggle, activity filters and visitor pricing as well as previous controls. Native Canvas rendering inspected for staff, decorations, visitors, gym boards and area labels. Actual browser layout, device touch performance and live Firebase remain unverified in this environment.

1.3.1: storage transaction emulator passes with all localStorage writes forced to fail. Checks cover legacy migration without deletion, completed writes, atomic rollback of current/backup on failure, ordered overlapping saves, archives, account separation and corrupt-current backup recovery. Existing UI event harness passes async account loading, onboarding, saves and sign-out. Actual Android IndexedDB and live Firebase remain device verification limits.
