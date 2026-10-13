# Feral Regions v2.1.0

This is the complete updated game. Extract the ZIP into its one enclosing folder. Upload the files INSIDE that folder directly to the root of your existing GitHub repository, replacing matching files. Include all six new JavaScript modules. Do not upload the enclosing folder as a repository subfolder.

Your existing account, region, buildings, trainers, collections, and tournaments migrate automatically. No reset or reinstall is needed. Export a JSON backup from Account before updating.

After GitHub Pages publishes, open the installed app online. Account → Save & load the app update applies the new cached release when offered. Close and reopen if needed.

## Where to find the new features

- **Problems:** tap the `!` camera button or Region → Region problems. Toggle map warnings, Locate a warning, or Inspect its building/trainer/area. Warnings clear when you resolve them.
- **Businesses:** Region → Businesses, or inspect a shop, healing lodge, or café. Set the sale price and profit tax, then list it. Run the game to receive offers. Review and approve a sale; ownership never transfers automatically. A buyer must afford the price plus a $120 operating reserve and $80 personal buffer, and can own only one business.
- **Business accounts:** customer payments fund the business. Supplies, upgrades, and daily upkeep come from its funds and owner wallet. At day end, tax on positive daily profit goes to your treasury; cash above the $120 reserve goes to the owner. Owner wallets automatically cover operating deficits where possible. An unfunded business pauses service; you can approve a $120 owner contribution, approve an owner-funded upgrade, or buy it back. Owned businesses must be bought back before demolition. Moving and setting service fees still work.
- **Rivalries:** Region → Rivalries and each trainer's profile show head-to-head records after at least two meetings. Close-level rivals receive a rematch preference. Established rivalries attract spectators faster at duels and tournaments; seat capacity still limits crowds.
- **Sanctuary:** Build → Buildings → Feral sanctuary. Inspect it, choose a trainer and reserve Feral, and add up to eight exhibits. Rare and shiny Ferals improve visitor interest. The Ferals remain their trainers' property, without changing battle stats. Bringing an exhibit onto its active team removes it from display. Set tickets from $0 to $15; excessive prices deter exhibition visitors. A reachable entrance and an open catching area are required for exhibition ticket income.

## Combat and efficiency

Tonics are never used inside battles. After ordinary battles, an injured teammate below half health may consume one tonic to recover half its maximum HP. Tournament teams are fresh exhibition copies; Elite battles already provide full free recovery and do not waste tonics afterward.

Quest reachability now uses connected land sections. Habitat candidates and tile membership are cached, initialization does not rescan the population every simulation step, and trainer profiles update changing sections without rebuilding large reserve collections. Operating profit is separated from grants, construction, upgrades, and business sales.

The level-cap evolution edge case, invalid imported speeds, capture action ordering, and placements that cut off entrances are fixed. Late-game careers were not added.

## Verification

All 14 automated test suites pass, including 13 new gameplay/accounting regression checks. App interface logic and native Canvas rendering were checked at 390×844 and 1024×1366 with a 216-Feral collection and 4× simulation. A complete browser/CSS/touch check was unavailable in the build environment; check native touch controls on your device after publishing. Live Firebase behavior was not changed or exercised against your account.
