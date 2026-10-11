# Version 1.5.0 — Tournament circuit

- Build a tournament arena and spectator stands; configure 4/8/16 brackets, 1–6 Ferals, badge/level/element/base-species eligibility, entry fees, prize share, treasury bonuses and ticket prices.
- Automatic mindset-aware signup, visible travel, seeded single-elimination brackets, live animated matches, trophy history and recurring events.
- Fee escrow, exact automatic payouts, full cancellation refunds, locked entrant teams and save/resume of live matches. No tournament XP or tonic consumption; healed battle copies keep entrant collections unchanged.
- Android install prompt, permanent Android/iPad instructions, standalone detection and complete versioned service-worker shell updates.
- This patch applies over v1.4.0. Existing regions migrate without resetting.

# 1.4.0 — Collectors & rare encounters

- 108 species: original 36 preserved plus 24 three-stage families (72 new Ferals). Roxy species renamed Gravahound; Titanblood Roxy renamed Titanblood Gravahound. Old saves migrate automatically.
- Each wild spawn independently rolls a 1% shiny chance. Shinies have alternate palettes/sparkles, unchanged stats/catch odds, and preserve their shiny flag through evolution and saving.
- Six active Ferals with permanent reserves supporting one normal and one shiny of all 108 species. No automatic release at 12. Separate variant ownership prevents duplicate catches; evolution holds when the evolved variant is already owned.
- Trainer collection checklists, reserve-to-active swaps and a manual-team lock. Manual swaps do not heal Ferals and are unavailable during battles/League duty.
- Select Auto, Catch them all, Become the best, or Earn money/train. Collectors prioritize areas missing normal species before gyms; competitors prioritize gym training; earners seek safer wild fights and more rival battles. Auto adapts to personality and switches to money below $35. All goals opportunistically attempt unowned shinies.
- Wild battle victories add exactly $1 to the region treasury, once; captures do not award the defeat bounty.
- Area editor: per-species encounter weights, Common (100), Rare (20), Epic (4) presets, custom 0–1000 weights, zero-to-disable, and normalized appearance percentages. Capture rarity remains species-based; shiny chance remains 1%.
- Large cloud saves gzip automatically when supported. Larger JSON imports support expanded collections. Previous device-save and authentication fixes retained.

# 1.3.1 — Device saving repair

- Region saves, backups and archives now use IndexedDB instead of localStorage when available.
- Current save and rolling backup commit in one transaction; failed writes retain both previous records.
- Existing local saves migrate without deleting them. Loading waits for storage before opening a region; read failures cannot silently create an empty replacement.
- Ordered writes capture the region at the time Save is called. Device autosave runs every 10 seconds, after edits and on backgrounding.
- Persistent save status and manual Save on this device button. Success appears only after commit. Sign-out stops if device saving fails; cloud load/import archive the region before replacement.
- Export JSON still works independently of device storage. Export an unsaved running region BEFORE refreshing to install this update, then import it afterward.

# 1.3.0 — A living region

- Routes: stronger path preference, faster path travel, optional selected-trainer route overlay, area roster signs, and linkable route signs.
- Trainers: Collector, Bold, Patient, Strategist and Wanderer habits affect destinations, supplies and gym preparation. Rename trainers and pin up to six favorites; three appear on the map watchlist.
- Activity: current intentions, filtered event feed, clickable trainers and live challenges, catch/badge celebrations.
- Economy: real shop stock with manual/automatic orders, $300 restocking reserve, service upgrades, visitor appeal, paying visitors and recent income/expense/profit per game-minute.
- Gyms: visible waiting challengers, one battle per gym, gym boards, staff, live ranked-challenge banner and retained champion reign/team/defense records.
- World: professor, healer, shopkeeper, gym leaders, café staff and League host; visiting spectators; functional bench/picnic rests; fences, hedges, lantern posts, picnic tables and champion statues. Existing bridge and landscaping tools remain available.
- Existing region layouts, accounts, trainers and the storage-quota fix are preserved. New fields migrate automatically; historical reigns before this update cannot be reconstructed.

# 1.2.1

- Fix login failure when localStorage is full: prefer IndexedDB, fall back to session storage or memory. Handle quota failures during sign-in without deleting any region saves.

# 1.2.0

- Login/create-account screen before gameplay; signed-out simulation and autosaves are blocked. Existing account saves restore locally; old guest saves remain recoverable. Cloud load/save stays explicit.
- All new terrain is short green grass, including expansion land. Existing maps are preserved.
- Build and category changes select no tool. One-finger dragging pans safely until a tool is chosen.
- Drag building cards onto the map, or select then drag on the map. Translucent previews show individual green/red footprint squares and the entrance. Release then confirm price. Cancel/pinch never commits; placement disarms the tool.

# 1.1.0 — Build your own beginning

## Starting a region

- New regions contain empty land and $5,500. No placed buildings, painted paths, trainers, or founding Elite Four.
- A construction guide walks through the lab, healing lodge, shop, route, custom catching area, admissions, gym, and first trainer journey.
- Admissions are initially closed. Open them when your lab, healing lodge, shop, and an open beginner catching area are reachable.
- Total population capacity: six, plus six for each gym, up to 54 residents. Elite Four members count toward the total. Land does not add population capacity. All arrivals start at the lab.
- New arrivals take 150–210 game-seconds. Admissions can be paused without stopping existing trainers.
- The first eligible residents claim vacant Elite Four seats. Existing rank replacement and swapping rules are retained.

## Visuals and animation

- Replaced shared-body recolors with 36 individual Feral drawings. Evolution stages now change proportions and silhouette.
- Trainer movement is interpolated between 30 Hz simulation steps.
- Battle views keep the same canvas during live updates, and update text/health when a turn changes.
- Portrait encoding is cached. Terrain editing repaints changed areas, and navigation uses cached routes and a priority heap.
- Canvas resolution is capped at 1.5× for a lighter mobile rendering load.

## Progression and clarity

- XP to the next level: 60 + 18 × current level + current level².
- Smaller XP awards; lower rewards for overpowering weak opponents; smaller XP shares for inactive teammates.
- Habitat searches take 10–20 game-seconds; battle turns take 1.8 game-seconds.
- Gym losses trigger a 180-second training break; wins trigger a 150-second break before the next gym.
- Trainer profiles explain their next gym and missing level, health, cooldown, availability, or route requirements.

## Save compatibility

Existing worlds retain all trainers, levels, badges, and buildings. XP progress is mapped proportionally onto the new curve. Existing founding Elite Four members are retained in existing saves.

Account → Start a new empty region archives the current local world. Restore previous region swaps it back. Starting over pauses cloud uploads until the user explicitly saves the new world.

## Create your own catching areas

- Build → Areas creates a named, numbered zone. Brush its shape, choose its roster, set levels and a badge requirement, then open it.
- Map boundaries and flags identify every area like a golf hole. Tap an area or marker to edit it.
- Unmarked terrain produces no encounters. Closed and badge-locked areas are excluded from trainer destinations.
- Species can populate automatically by the selected biome, or from an exact custom list.
- Legacy saves convert owned habitat tiles into marked, editable Imported areas.

## Collecting and economy

- Unfamiliar wild species are deliberately weakened before one orb attempt. Species in the team or reserve are not recaught.
- Catch chance ranges from 2.5% to 22%, rather than the previous much higher odds and repeated throws.
- Active teams share XP. After captures and healing, trainers select a team for strength and type variety. At twelve total Ferals, a new catch replaces a weak reserve.
- Lower starting cash, smaller grants, and reduced research, badge and daily trainer payouts slow the initial economic surge.
