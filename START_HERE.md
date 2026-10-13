# Feral Regions v2.3.0 — Grand battle venues

This ZIP contains the complete game in one enclosing folder. Upload the files inside that folder directly to the root of your existing GitHub repository, replacing matches. Include the new venues.js and venue-art.js modules, along with all existing files. Do not upload the enclosing folder as a repository subfolder.

Your existing region, trainers, teams, collections, businesses, houses and tournaments migrate without a reset. Export a JSON backup from Account before updating. After Pages publishes, open the installed app online and use Account → Save & load the app update when offered.

## The new battle venues

- Tournament colosseum: **10 × 8 tiles**, tiered arches, banners and a full marked battle court, with **32 built-in spectator seats**.
- Elite Four stadium: **12 × 10 tiles**, four raised colored thrones, champion crown, gold trim, torches, a central staircase and court, with **48 built-in spectator seats**.
- Each defending Elite member walks down from their own throne before their battle. Afterward, returning members walk to the seat they earned. An outside run still starts at #4 and continues as far as possible; ranks remain fixed until defeated, and completed runs still have the five-game-day cooldown.
- Spectators fill built-in seating during events. External stands add eight seats and serve the nearest colosseum, duel court or Elite stadium within 14 tiles. Elite spectator tickets default to $3 and can be set to $0–15 in the building inspector; challenger entry fees remain separate.
- Select a venue and choose **View full stadium**. Battle → **View on map** also frames the whole venue. The live battle panel uses a matching stadium backdrop.

Old 5 × 4 venues keep their IDs, event records and entrance location. On load, an old venue expands only when the larger footprint is safe: no occupied buildings, catching-area cells, water, unavailable land, blocked entrances or disconnected routes. Active events keep their current geometry. If expansion would crowd your town, the venue keeps a compact version with 16 built-in seats; select **Move & expand · $80** and place it in a larger open spot. You do not need to reset your region.

## The new trainer logic

Every trainer's main ambition is to become Champion. Collecting, money, and reputation are secondary preferences, configured in each trainer's profile. Existing mindset selections are retained as preferences; an old “Become the best” selection now means extra interest in reputation/duels, because becoming the best is universal.

The main progression is: next missing badge → prepare and attempt the gym → adapt after a loss → earn eight badges → prepare for an outside Elite Four run. Missing species never block advancement. Trainers do not skip a missing gym order just because a later gym exists.

- Bold trainers attempt earlier, tolerate more risk, and enjoy proving themselves in duels.
- Patient trainers favor healthier teams, safer training, and savings.
- Strategists prepare elemental coverage and counters from their existing collection.
- Collectors and Wanderers seek missing species while pushing into useful stronger zones and earning the badges that unlock further areas.

Gym readiness considers the active party's strength, matchup, health, and leading level. Being competitive is enough to try; victory is never guaranteed. After a loss, trainers need a useful party improvement, a level gain, or two training encounters before retrying. Repeated losses increase preparation targets and retry spacing.

Training areas are scored by useful levels, danger, reachable routes, badge gates and travel, with bounded bonuses for collection, counters and quests. Early-area gaps and unfinished circuit quests cannot monopolize training. Trainers retain a short area plan instead of changing their minds every moment. Repeated wild losses prompt reconsideration.

Automatic teams prepare for the next opponent. Opening Ferals and replacements use health and matchup. Wild encounters can give a reasonably competitive developing teammate a chance to train. Manual active parties remain under your control, including their selected opener; reserves never swap into an ongoing battle or ranked run.

Shopping compares reachable, stocked and affordable stores. Money-focused trainers keep smaller supply budgets and seek profitable gym rematches during preparation. Essential purchases remain possible below their preferred reserve. An eligible primary challenge takes priority over shopping, collecting, quest errands, duels and voluntary tournament entry. Mandatory free regional seasons still include everyone.

## Elite Four — fixed seats, outside challengers only

Members do not challenge each other or leave their seats to climb. The rankings stay set until changed by an outside challenger beating them.

An outside trainer with eight badges starts at #4. A win takes that seat; subsequent wins continue through #3, #2 and #1 in the SAME run. Teams recover between matches. A loss ends the run, preserving any seat already earned. A run also ends when the challenger becomes Champion. Only one run is active at a time.

After a full run ends, that trainer cannot begin another for **five game-days (1,200 game-seconds)**. This timer is saved and pauses with the rest of the world. It never interrupts a successful climb. Outsiders use the wait to train, improve their collection, recover and earn money. A displaced #4 can pursue re-entry once their existing run cooldown permits it.

## Paid gym rematches

After a trainer earns a badge, that gym becomes available to them again after **seven game-days (1,680 game-seconds)**. Every subsequent rematch attempt, won or lost, resets that trainer's timer for that gym. Other trainers and other gyms have independent timers. First-time gym losses use the shorter preparation/retry rules, so beginners are not locked out for a week.

Successful first badge challenges pay $35 + $10 × gym number. Successful rematches pay $35 + $15 × gym number ($50 at Gym 1 through $155 at Gym 8), before any entry fee. Losses pay no prize. Prizes are outside-funded and do not deduct money from your region treasury. Rematches never award duplicate badges and cannot pay twice for the same completed battle.

Trainer profiles show “Paid gym rematches” with each earned gym's prize and availability. When migrating an old region, available recent win records seed those schedules; if a gym's old win time is unavailable, its seven-day timer begins when the trainer's new plan initializes.

## Validation and practical limits

All 15 automated suites pass, including 30 new ambition/rematch checks. The separate stress test runs 54 trainers through a complete eight-gym, five-zone region for 180 game-days using real battles and natural XP. It checks outside-only Elite entry, the five-day run interval, seven-day gym rematches, ranked battle exclusivity and valid saves.

Run `npm test` for regressions and `npm run test:stress` for the full population simulation. `node ai-stress.mjs 180 54` accepts other day/population counts. No remote Firebase writes occur in these checks.

Trainers still need suitable open habitats and connected facilities. The AI cannot invent a missing gym, ignore badge gates, walk through water or guarantee wins against an unbeatable player-designed team. Their profiles explain the next goal and preparation reason; the Problems panel identifies world issues.

App interface logic and native Canvas rendering were checked at phone/tablet sizes with a large reserve collection and 4× frames. Full browser/CSS/native-touch verification remains a device check.
