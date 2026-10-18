# Feral Regions 3.0.0 — The Crafting Update

Upload every file in this ZIP directly into the root of your existing GitHub repository, replacing matching files. Keep the new crafting.js and crafting-ui.js alongside app.js. Your Firebase project configuration is unchanged.

Open the game normally. Existing supply shops become community workshops, including trainer-owned businesses. Existing trainer gold, collections, homes, badges and supplies remain. The offline cache has a new release number and includes the crafting modules.

## Where to find the new features

- Tap a trainer: preparation plan, material chest, crafting skills, unlocked recipes and crafted supplies.
- Tap an owned home: upgrade the bench, expand the herb garden and assign a reserve Feral helper. Bench upgrades cost the homeowner 90 then 180 gold; garden levels cost 75 gold each. A 25-gold reserve remains required. Owners also buy basic improvements automatically when they have ample surplus.
- Tap a community workshop: bench fee, active crafters and chore workers. No items are sold or restocked. Trainers bring their own materials and pay per batch; a chore earns a single free session.
- Tap the starter lab: new quests and the regional project board. Project rewards are funded from the region treasury up front, then earned by contributing trainers.

## How trainers recover

Wild victories award gold and common materials, with a chance of rare elemental cores. Captures also award encounter supplies. Low supplies prompt trainers to gather missing ingredients, travel home or to a workshop, and craft. Every essential ingredient can be foraged without battling, money or capture orbs. When no habitat is usable, slow route scavenging keeps basic crafting possible. Trainers still need a reachable home or community workshop to craft; foraging cannot fix a disconnected building or a missing training route.

Trainers keep their badge and Champion ambitions. Competitive gym attempts take priority over errands. Crafting fills needs rather than running endlessly. Delivery quests retain two tonics for the trainer, and project contributions use surplus materials.

## Recipes

| Recipe | Ingredients | Base output | Unlock |
| --- | --- | --- | --- |
| Binding orbs | 2 fiber, 1 shell, 1 essence | 3 | Everyone |
| Healing tonics | 2 herbs, 1 gel | 2 | Everyone |
| Status cures | 2 herbs, 1 essence | 2 | 1 badge or medium quest |
| Elemental capture charges | 2 shells, 3 essence, 1 core | 3 | 2 badges or hard quest |
| Team recovery kits | 4 herbs, 3 gel, 1 core | 1 | 3 badges or hard quest |

Elemental charges are used with binding orbs, increasing the chance of the existing single capture attempt. Status cures clear battle statuses. Recovery kits heal multiple heavily injured party members after ordinary battles. Tournament exhibition copies do not consume those items.

Orb making, brewing and advanced crafting improve through use. Skill levels shorten crafting time and eventually increase yield. Home bench levels speed crafting and increase batch output. Helpers stay in reserve, with elemental affinities improving compatible crafting; Nature helpers also increase herb harvests. Release a helper at its home before adding it to the party. Choosing no helper keeps automatic assignment off for that home.

Gardens generate herbs and gel each game-day. Community garden projects improve foraging; workshop projects improve public crafting speed. Repeating a completed project pays contributors again but does not stack its permanent speed/yield benefit.

## Verification

Run `npm test` for the full regression suite and 18 crafting checks. See VALIDATION.md and AI_STRESS_RESULTS.md for measured simulation results and the browser-testing limitation.
