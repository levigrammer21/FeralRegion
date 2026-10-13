# Final AI stress run — v2.2.0

Fixture: seed 74179; 54 trainers across all five personalities; 180 game-days; all eight default gyms; five progressively stronger habitats; connected facilities; generous operating cash. Real battles, normal catch odds, natural XP. Regional seasons were disabled to isolate progression.

| Metric | Result |
| --- | --- |
| Trainers | 54 |
| Simulated days | 180 |
| Minimum badges earned by any trainer | 6 |
| Trainers with all eight badges | 24 |
| Filled Elite Four seats | 4 |
| Outside Elite Four runs | 94 |
| Trainers who never attempted a gym | 0 |

All stress invariants passed: outside-only Elite runs, five-day run cooldowns, seven-day per-gym rematches, one active ranked battle, and valid saves. All five zones received training visits.

## Each trainer

| Trainer | Badges | First gym attempt (day) | Final leading level | Final rank |
| --- | --- | --- | --- | --- |
| Collector0 | 8 | 8.16 | 56 | Outside |
| Wanderer1 | 6 | 3.17 | 39 | Outside |
| Patient2 | 6 | 7.56 | 47 | Outside |
| Bold3 | 8 | 15.68 | 59 | Outside |
| Strategist4 | 6 | 20.23 | 41 | Outside |
| Collector5 | 6 | 2.83 | 41 | Outside |
| Wanderer6 | 8 | 11.8 | 59 | Outside |
| Patient7 | 6 | 7.21 | 42 | Outside |
| Bold8 | 6 | 5.31 | 41 | Outside |
| Strategist9 | 6 | 2.63 | 42 | Outside |
| Collector10 | 6 | 14.94 | 54 | Outside |
| Wanderer11 | 6 | 9.95 | 40 | Outside |
| Patient12 | 6 | 6.02 | 42 | Outside |
| Bold13 | 6 | 12.72 | 41 | Outside |
| Strategist14 | 8 | 8.28 | 60 | 1 |
| Collector15 | 8 | 3.3 | 58 | 3 |
| Wanderer16 | 8 | 9.24 | 50 | Outside |
| Patient17 | 8 | 5.84 | 60 | Outside |
| Bold18 | 6 | 2.36 | 41 | Outside |
| Strategist19 | 8 | 12.33 | 59 | 2 |
| Collector20 | 8 | 1.56 | 58 | Outside |
| Wanderer21 | 6 | 2.46 | 39 | Outside |
| Patient22 | 8 | 6.08 | 59 | Outside |
| Bold23 | 6 | 1.71 | 43 | Outside |
| Strategist24 | 6 | 15.11 | 42 | Outside |
| Collector25 | 8 | 2.02 | 58 | 4 |
| Wanderer26 | 8 | 2.26 | 62 | Outside |
| Patient27 | 6 | 4.35 | 43 | Outside |
| Bold28 | 6 | 1.64 | 37 | Outside |
| Strategist29 | 8 | 22.6 | 55 | Outside |
| Collector30 | 8 | 3.79 | 53 | Outside |
| Wanderer31 | 8 | 13.31 | 49 | Outside |
| Patient32 | 6 | 4.5 | 42 | Outside |
| Bold33 | 6 | 6.7 | 37 | Outside |
| Strategist34 | 6 | 2.95 | 39 | Outside |
| Collector35 | 8 | 7.17 | 58 | Outside |
| Wanderer36 | 6 | 10.59 | 41 | Outside |
| Patient37 | 7 | 1.94 | 55 | Outside |
| Bold38 | 6 | 11.34 | 46 | Outside |
| Strategist39 | 8 | 8.83 | 50 | Outside |
| Collector40 | 8 | 2.1 | 58 | Outside |
| Wanderer41 | 8 | 3.68 | 52 | Outside |
| Patient42 | 8 | 2.5 | 53 | Outside |
| Bold43 | 6 | 1.87 | 37 | Outside |
| Strategist44 | 8 | 3.01 | 58 | Outside |
| Collector45 | 6 | 5.25 | 44 | Outside |
| Wanderer46 | 6 | 3.45 | 49 | Outside |
| Patient47 | 8 | 6.5 | 58 | Outside |
| Bold48 | 6 | 11.4 | 42 | Outside |
| Strategist49 | 8 | 1.8 | 56 | Outside |
| Collector50 | 6 | 5.9 | 39 | Outside |
| Wanderer51 | 8 | 6.87 | 60 | Outside |
| Patient52 | 6 | 11.49 | 56 | Outside |
| Bold53 | 6 | 12 | 40 | Outside |

This is a controlled fixture, not a guarantee for every region. Habitats, gym rosters, path lengths, queues and element availability affect individual progress. Run `npm run test:stress` to reproduce it.
