# Feral Regions — 1.1.0

A complete, buildless browser tycoon for your phone and iPad. Build the region, set the gym teams, and watch independent trainers become champions.

## 1. Put the files on GitHub

1. Extract this ZIP. It creates one folder named Feral-Regions containing the game files.
2. Upload **the files directly into the repository root**. `index.html`, `app.js`, and all the other files sit beside each other. Open the extracted Feral-Regions folder and upload its contents, not the containing folder.
3. In the repository, open **Settings → Pages**. Publish from your branch and the **root** folder.
4. Open the GitHub Pages URL. You can immediately play as a guest.

No terminal, npm, build service, or PC is needed to publish or play. Do not double-click index.html as a local file; use the published website.

## 2. Turn on the supplied Firebase project

The supplied `gymrpg-a0fc5` configuration is already in `cloud.js`.

In [Firebase Console](https://console.firebase.google.com/):

1. Select **gymrpg-a0fc5**.
2. Open **Authentication → Sign-in method** and enable **Email/Password** and **Google**. Google may ask you to choose a project support email.
3. Open **Authentication → Settings → Authorized domains**. Add your GitHub Pages hostname, such as `YOUR-USERNAME.github.io`. Use the hostname only, without `https://` or a repository path. Add any custom hostname you use too.
4. Open **Firestore Database** and create the database if it does not exist.
5. In Firestore’s **Rules** tab, publish the contents of `firestore.rules`. These rules allow each signed-in account to read and write only its own region. If this project already serves other apps, merge this file’s `/regions/{uid}` rule into the existing rules instead of discarding their rules.

In the game, open **Account** at the upper right. Sign in with Google or email/password, then choose **Save this region**. On another device, sign in and choose **Load cloud region**.

Sign-in alone does not overwrite either copy. Cloud autosave starts after you explicitly load or save a region. If another device saves a newer version, automatic uploads stop and ask you to choose which copy to keep.

Firebase console settings were not changed for you. Authentication and cloud saving need the steps above before they can work on your published address.

Official references: [Firebase web setup](https://firebase.google.com/docs/web/setup), [Google sign-in](https://firebase.google.com/docs/auth/web/google-signin).

## 3. Play

Your region opens with $5,500 and empty land. There are no buildings, painted paths, trainers, or pre-generated Elite Four members. The on-screen guide helps you place a lab, healing lodge, supply shop, your own route, and a marked catching area. Open admissions when ready.

- **Watch:** Drag to pan, pinch to zoom, tap trainers, buildings, or battles. Follow a trainer from their profile.
- **Build:** Paint with one finger; pan and zoom with two. The hand tool pans with one finger. Tap to place a building and confirm its price. Build mode pauses the simulation.
- **Move:** Tap a building → Move → tap the new position. Relocation costs $80.
- **Gym control:** Tap a gym → Edit leader, badge & team. Choose 1–6 Ferals, individual levels, and up to four moves per Feral.
- **Catching areas:** Build → Areas → New area. Give it a name, choose a biome, levels, optional badge requirement and roster. Tap Paint / expand, brush its boundary, then Edit / open area → Open to trainers. The map shows a numbered flag, name, levels and boundary. Natural terrain does not generate encounters outside open marked areas.
- **Expansion:** Tap the region name → Expand the region. Purchase adjacent land and connect it with routes and bridges.
- **League:** Build eight gyms and the Elite Four hall. All four seats start empty. Your own eight-badge trainers claim the vacant ranks, then defend them. Residents with eight badges queue to challenge.

### Updating from 1.0

Replace the old repository files with the files inside this ZIP’s Feral-Regions folder, including the new `sprites.js` file. Refresh after deployment. Existing saves keep their money, trainers, levels, badges, and buildings while receiving the new graphics, pacing, and performance changes. Existing owned habitat tiles are converted to marked, editable areas labeled Imported. Existing residents above the new cap are retained; admissions wait until there is room.

To experience the new build-it-yourself opening, choose **Account → Start a new empty region**. Your previous region is archived on this device and can be restored from Account. Cloud uploads pause until you explicitly save the new region. This does not automatically delete or overwrite the cloud copy.

### How a trainer chooses a gym

The trainer considers their lowest-numbered missing gym. Their strongest Feral must reach at least 93% of that gym’s highest level (rounded up to the next whole level), and their team must have more than 65% combined health. The gym must be free and reachable. Healing and supply needs are handled first.

After a gym loss, the trainer has a 180-game-second training break. After a badge win, they wait 150 game-seconds before considering the next gym. A trainer profile now explains the next gym goal and what is preventing a challenge.

### Elite Four rules

Only one challenger enters at a time. A vacant rank is claimed without a fight, moving upward through any vacant ranks before challenging an incumbent. Once seats are occupied, beat #4 and that trainer is out; the challenger becomes #4. Then challenge #3. A win swaps their ranks. Continue through #2 and #1. **#1 is the champion.**

If the challenger loses before winning a seat, they return to training and can retry later. If they have already gained a seat, they retain the rank reached. A displaced #4 returns to adventuring. Current Elite Four members remain at the hall, waiting for challengers. Teams heal between ranked matches.

### Growing your region

After you open admissions, trainers arrive roughly every 150–210 game-seconds and choose a starter. The total population cap starts at six and increases by six for each gym: 6, 12, 18, 24, 30, 36, 42, 48, and 54 with all eight gyms. Elite Four residents count toward this total. Land does not increase the cap. Every newcomer starts at your lab in the starting town. Pause new arrivals from the region menu whenever you want. They catch weakened wild Ferals with binding orbs, carry up to six teammates and six reserves, earn field-research money, buy supplies, train, heal, and pursue badges. Their teams, inventories, money, records, and histories persist.

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
