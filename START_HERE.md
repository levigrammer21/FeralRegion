# Applying the v1.5.1 changed-files patch

Extract the ZIP into its single Feral-Regions-Update folder. Upload the FILES INSIDE that folder directly to your existing GitHub repository root, replacing matching names and adding the new files. Keep every other existing file. Do not upload the enclosing folder as a subfolder. This patch requires the v1.5.0 game already installed.

After GitHub Pages finishes publishing, reopen the game and check Account for v1.5.1. If the old version is still open, close all game tabs/the installed app and reopen it. You do not need to reset your region or change Firebase rules.

## Visual Feral selection

Routes: tap a catching area, then use the portrait grid to add/remove Ferals. Search by name or filter by element. Selected portraits show a checkmark. Tapping changes the roster to manual selection. Below the grid, only selected Ferals have rarity/weight controls, and percentages update immediately. Save area settings when finished. Auto-populate still works and previews the biome's base-species roster.

Gyms: edit the gym, open a team slot, and tap its portrait/Choose a Feral button. Tap a species in the searchable grid, then adjust its level and moves. You can clear individual slots; a gym still needs at least one Feral. Changing a species resets that slot's move overrides, while keeping its level and all other slots intact. Save gym team when finished.

## Tournaments

Open League → Tournaments (also available from your region panel). Build an arena, then create your tournament. Choose entry fee, prize percentage, optional treasury bonus, winner/top-two/top-four payout, 4/8/16 entrants, 1–6 Ferals, badge range, maximum Feral level, element and base-species restriction. View the exact full-bracket prize calculation before opening registration.

Eligible trainers automatically pay from their own wallets and travel to the venue. Mindsets influence interest; gold-focused trainers consider expected returns. Registration extends every minute if the bracket is short. Full brackets start after all entrants arrive. One regional tournament runs at a time; League residents/current challengers remain on League duty. Entrants need the exact number of qualifying active Ferals and cannot swap until the tournament ends. Healed battle copies compete; no XP, evolution or tonic spending occurs during tournament matches.

Entry fees and the treasury bonus are held for prizes. The host share reaches the treasury on completion. Cancelling refunds entry fees and your bonus; tickets already sold remain earned income. Top four pays 60%/25%/7.5%/7.5% (semifinal losers tie for third); rounding remainder goes to first. Top two pays 70%/30%.

Nearby stands (within 14 tiles) seat eight fans each. Spectators arrive during matches and pay the configured ticket fee once per event. Repeating events reopen the selected number of game days after completion; insufficient bonus funds delay reopening. Stop a scheduled repeat from trophy history. Time stays paused while the game is hidden or closed.

## Install on your device

Open the published HTTPS GitHub Pages game, then Account → Install on your device. Android may show a native install prompt; otherwise use Chrome/Samsung Internet's menu → Install app or Add to home screen. On iPad open Safari → Share → Add to Home Screen → Add. Installed mode opens without the normal browser address bar. Login and cloud sync require internet; installation is not an app-store publication. Cached assets are installed as a complete version. Account shows a save-and-reload button when a new version takes control.

---

# Feral Regions — 1.5.0

A complete, buildless browser tycoon for your phone and iPad. Build the region, set the gym teams, and watch independent trainers become champions.

## 1. Put the files on GitHub

1. Extract this ZIP. It creates one folder named Feral-Regions containing the game files.
2. Upload **the files directly into the repository root**. `index.html`, `app.js`, and all the other files sit beside each other. Open the extracted Feral-Regions folder and upload its contents, not the containing folder.
3. In the repository, open **Settings → Pages**. Publish from your branch and the **root** folder.
4. Open the GitHub Pages URL. The first screen is Log in / Create account. Complete the Firebase setup below to enable entry.

No terminal, npm, build service, or PC is needed to publish or play. Do not double-click index.html as a local file; use the published website.

## 2. Turn on the supplied Firebase project

The supplied `gymrpg-a0fc5` configuration is already in `cloud.js`.

In [Firebase Console](https://console.firebase.google.com/):

1. Select **gymrpg-a0fc5**.
2. Open **Authentication → Sign-in method** and enable **Email/Password** and **Google**. Google may ask you to choose a project support email.
3. Open **Authentication → Settings → Authorized domains**. Add your GitHub Pages hostname, such as `YOUR-USERNAME.github.io`. Use the hostname only, without `https://` or a repository path. Add any custom hostname you use too.
4. Open **Firestore Database** and create the database if it does not exist.
5. In Firestore’s **Rules** tab, publish the contents of `firestore.rules`. These rules allow each signed-in account to read and write only its own region. If this project already serves other apps, merge this file’s `/regions/{uid}` rule into the existing rules instead of discarding their rules.

Sign in with Google or email/password on the opening screen. Then open **Account** at the upper right and choose **Save this region**. On another device, sign in and choose **Load cloud region**.

Sign-in alone does not overwrite either copy. Cloud autosave starts after you explicitly load or save a region. If another device saves a newer version, automatic uploads stop and ask you to choose which copy to keep.

Firebase console settings were not changed for you. Authentication and cloud saving need the steps above before they can work on your published address.

Official references: [Firebase web setup](https://firebase.google.com/docs/web/setup), [Google sign-in](https://firebase.google.com/docs/auth/web/google-signin).

## 3. Play

Your region opens with $5,500 and nothing but short green grass across the entire map. There are no buildings, painted paths, trainers, or pre-generated Elite Four members. The on-screen guide helps you place a lab, healing lodge, supply shop, your own route, and a marked catching area. Open admissions when ready.

- **Watch:** Drag to pan, pinch to zoom, tap trainers, buildings, or battles. Follow a trainer from their profile.
- **Build:** Opens with nothing selected. Drag to pan safely. Pick a terrain brush to paint, or drag a building card onto the map. You can also select a building and drag on the map to position it. Green/red squares show its footprint and a separate square marks the entrance. Release to review the price and confirm. Placement clears the selected tool. Two fingers pan/zoom; the hand tool returns to safe panning. Build mode pauses the simulation.
- **Move:** Tap a building → Move → drag to the new position. Relocation costs $80.
- **Gym control:** Tap a gym → Edit leader, badge & team. Choose 1–6 Ferals, individual levels, and up to four moves per Feral.
- **Catching areas:** Build → Areas → New area. Give it a name, choose a biome, levels, optional badge requirement and roster. Tap Paint / expand, brush its boundary, then Edit / open area → Open to trainers. The map shows a numbered flag, name, levels and boundary. Natural terrain does not generate encounters outside open marked areas.
- **Expansion:** Tap the region name → Expand the region. Purchase adjacent land and connect it with routes and bridges.
- **League:** Build eight gyms and the Elite Four hall. All four seats start empty. Your own eight-badge trainers claim the vacant ranks, then defend them. Residents with eight badges queue to challenge.

### Updating from 1.0

Replace the old repository files with the files inside this ZIP’s Feral-Regions folder, including the new `sprites.js` file. Refresh after deployment. Existing saves keep their money, trainers, levels, badges, and buildings while receiving the new graphics, pacing, and performance changes. Existing owned habitat tiles are converted to marked, editable areas labeled Imported. Existing residents above the new cap are retained; admissions wait until there is room.

To experience the new build-it-yourself opening, choose **Account → Start a new empty region**. Your previous region is archived on this device and can be restored from Account. Cloud uploads pause until you explicitly save the new region. This does not automatically delete or overwrite the cloud copy.

### How a trainer chooses a gym

The trainer considers their lowest-numbered missing gym. Personality sets the target: Bold trainers need 90% of the leader’s highest level and over 65% team health; Collectors 98% / 70%; Strategists 100% / 78%; Wanderers 100% / 72%; Patient trainers 112% / 85%. Level targets round up. The gym must be reachable. Trainers heal to their preferred readiness before a challenge and queue outside a busy gym. Healing and supply needs are handled first.

After a gym loss, the trainer has a 180-game-second training break. After a badge win, they wait 150 game-seconds before considering the next gym. A trainer profile now explains the next gym goal and what is preventing a challenge.

### Elite Four rules

Only one challenger enters at a time. A vacant rank is claimed without a fight, moving upward through any vacant ranks before challenging an incumbent. Once seats are occupied, beat #4 and that trainer is out; the challenger becomes #4. Then challenge #3. A win swaps their ranks. Continue through #2 and #1. **#1 is the champion.**

If the challenger loses before winning a seat, they return to training and can retry later. If they have already gained a seat, they retain the rank reached. A displaced #4 returns to adventuring. Current Elite Four members remain at the hall, waiting for challengers. Teams heal between ranked matches.

### Growing your region

After you open admissions, trainers arrive roughly every 150–210 game-seconds and choose a starter. The total population cap starts at six and increases by six for each gym: 6, 12, 18, 24, 30, 36, 42, 48, and 54 with all eight gyms. Elite Four residents count toward this total. Land does not increase the cap. Every newcomer starts at your lab in the starting town. Pause new arrivals from the region menu whenever you want. They catch weakened wild Ferals with binding orbs, carry up to six active teammates and keep the remaining collection in reserve (one normal and one shiny of each species), earn field-research money, buy supplies, train, heal, and pursue badges. Their teams, inventories, money, records, and histories persist.

Trainers try one binding orb on an unfamiliar species once it is below 40% health. They hold back a knockout blow when preparing a catch. Catch odds are roughly 2.5%–22%, influenced by species rarity, health, level difference, and status. A failed attempt ends catching for that encounter; they finish the battle instead of repeatedly throwing orbs. Species already in the active team or reserve are not targeted.

Active teammates share battle XP, with participants earning more. After catches and healing, trainers rebalance their active six using strength and elemental variety. Up to six additional Ferals stay in reserve. If all twelve slots are full, a new successful catch replaces a weak reserve.

Revenue comes from shops, healing, gym entry, the League, and cafés. Supplies and daily building upkeep cost money. Regional grants fund milestones, with much smaller payouts than 1.0. The first catch pays $125, ten battles $200, and the first badge $400. Trainer research rewards, badge prizes, and daily stipends are also reduced. Trainer wallets are independent of your treasury; external research rewards and guild stipends keep the trainer economy moving.

XP rewards are reduced and next-level requirements follow `60 + 18 × level + level²`. Fighting much weaker Ferals gives less XP; benched team members get a smaller share. Higher levels therefore take progressively longer.

A day lasts four minutes at 1×. Use pause, 1×, 2×, or 4×. **The world does not progress while the app is closed or hidden.**

## 4. Install it like an app

On Android, open the published website in your browser and choose **Install app** / **Add to Home screen**. In the game, Account → Install can show the browser prompt where supported.

On iPad, use Safari → Share → Add to Home Screen.

After loading online once, local gameplay is available offline. Cloud features require internet. Some browsers separate the installed app’s local storage from normal tabs, so use the same account and load the cloud region when moving between them.

## Backups

Account → Export JSON downloads a portable backup. Import JSON validates the file and restores the complete region, including ongoing battles. Keep occasional exports before changing devices or clearing browser storage.

## Troubleshooting

- **Blank or old page:** Confirm `index.html` is at the repository root, wait for Pages deployment, and refresh. The service worker uses network-first updates.
- **Google sign-in blocked:** Check authorized domains and allow the sign-in popup; email/password is also available.
- **Cloud permission error:** Publish the Firestore rules in the correct project.
- **Trainer displays “!”:** An intended destination is unreachable. Connect buildings and habitats with land or bridges. Gyms across a river need a crossing.
- **Trainers aren’t challenging:** Check gym difficulty, trainer health, and accessible habitat levels. They train until their leading Feral approaches the next gym’s highest level.
- **Need more money:** Let the town operate, earn grants, keep supplies affordable, and add profitable services near routes. Landscape spending can wait.

## Verification

See `VALIDATION.md` for the checks completed and the remaining device/cloud verification limits.

Existing regions keep their terrain. Use Account → Start a new empty region for an all-grass map. A previous guest save can be recovered from Account after signing in. Sign-in requires Firebase access; a failed connection stays on the login screen and preserves saves.

## Living-region controls (1.3)

- Tap a trainer to see their intent and personality, rename them, pin a favorite, or show their travel route. Paths make travel quicker and are strongly preferred; grass is still traversable.
- Open the journal for All, Favorites, Battles and Milestones filters. Tap a live battle event to watch it. The golden League banner follows the one active challenger.
- Tap a shop to see stock, order supplies or toggle auto-order. Orbs cost $6 wholesale, tonics $10. Orders retain $300 cash and check every two game-minutes. New shops begin empty and order when the simulation resumes.
- Upgrade shops, healing lodges and cafés twice: $300, then $600. Service becomes faster; each upgrade adds $2 daily upkeep and visitor appeal.
- Region shows recent cash flow and visitor tickets. Visitors tour reachable gyms, cafés or landmarks after an area opens, and pay only an affordable advertised ticket price. They do not count against trainer capacity.
- Build → Decor adds fences, hedges, lamps, picnic tables and statues. Fences and hedges can sit side by side. All still obey entrance/connectivity rules. Link a route sign to an area from its settings.
- League keeps champion history from this update onward. Existing champions begin a record on migration; earlier reign dates cannot be recovered.


## Saving repair (1.5.0)

If the old version currently says device saving failed, use Account → Export JSON before refreshing. Upload this update, sign in, then use Account → Import JSON to restore that downloaded progress. Existing successfully stored regions migrate automatically; no site data is cleared.

Game saves now use IndexedDB, separate from the small localStorage allowance. Device saving runs every 10 seconds and after edits. Check the on-screen Device saved timestamp, or use Account → Save on this device now before leaving. Cloud saving is separate and still requires explicitly loading or saving the cloud region first. If your browser blocks all storage or your device runs out of disk space, export JSON or save to cloud; this update does not claim unlimited device storage.

## Collecting and encounter rarity (1.4)

Tap a trainer → Trainer mindset to select a goal. Auto uses the trainer’s personality and switches to earning money below $35. Catch them all focuses on missing normal species in accessible open areas; it moves toward gyms when those available collections are complete. Earn money deliberately avoids gym/League progression until you change the goal.

Trainer profiles show normal and shiny collection checklists. Choose an active Feral in “When bringing in a reserve, replace,” then tap Move to active team under a reserve. This locks the team; toggle Team selection back to auto to let the trainer rebalance later. Only six fight; reserves are never automatically released for space. Evolution pauses if it would duplicate an owned variant.

Open a catching area → Choose Ferals & encounter rarity. Select the roster (or retain biome auto-population), choose presets or weights, then Save. Common 100, Rare 20, Epic 4 produce relative odds: one of each is about 80.65%, 16.13%, 3.23%. Zero disables a species. The Saved encounter odds section shows the actual probabilities for that area. Every encounter separately rolls 1% shiny. This is a probability, not a guarantee every hundred encounters.

Shinies keep the same catch odds and stats. The treasury earns $1 for each wild-battle victory, separate from trainer money and shop income.
