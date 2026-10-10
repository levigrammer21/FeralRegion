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
