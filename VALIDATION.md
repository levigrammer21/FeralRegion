# Version 3.0.0 validation

`npm test` passes all 17 suites, including 18 new crafting checks. Checks cover zero-money recovery through foraging and chores, recipe costs and one-time fees, free home crafting, gardens, helper reservation, specialties, locked recipes, deleted buildings, material drops, surplus deliveries, project escrow, migration, save/resume validation, elemental capture charges, status cures and recovery kits.

The prior regression suites continue to cover authentication/storage fallbacks, trainer AI, captures and collections, homes, business accounts, quests, tournaments, spectators, venue movement, chat, installation assets and mobile interaction geometry. Obsolete wholesale-sale assertions were updated for workshops; the first-town timing test now allows time for gathering and crafting.

A 54-trainer stress fixture ran for 180 game-days with eight gyms and progressive habitats. Every trainer earned at least six badges, 36 earned all eight, and the Elite Four filled. Single ranked battle, outside-only Elite challenges, five-day Elite-run cooldowns, seven-day gym-rematch cooldowns and valid save round-trips passed. A final 18-trainer, 30-day run checks subsequent helper and quest refinements.

## Limits

UI modules generate and validate inspection panels in tests, and existing touch/venue geometry regressions pass. An actual phone/tablet browser run was attempted but could not launch: this environment has no browser installed and the browser download failed. Screenshots and real-device visual QA were therefore not completed. Firebase live sign-in and cloud writes were not exercised; existing configuration and authentication code remain in place.
