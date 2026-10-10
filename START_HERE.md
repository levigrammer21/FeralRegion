# Feral Regions — 1.0.0

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

Your region opens with $8,500, a starter lab, healing lodge, supply shop, and the first gym.

- **Watch:** Drag to pan, pinch to zoom, tap trainers, buildings, or battles. Follow a trainer from their profile.
- **Build:** Paint with one finger; pan and zoom with two. The hand tool pans with one finger. Tap to place a building and confirm its price. Build mode pauses the simulation.
- **Move:** Tap a building → Move → tap the new position. Relocation costs $80.
- **Gym control:** Tap a gym → Edit leader, badge & team. Choose 1–6 Ferals, individual levels, and up to four moves per Feral.
- **Habitat control:** Tap the region name → Wild habitats. Adjust the level range and optional species list for each biome.
- **Expansion:** Tap the region name → Expand the region. Purchase adjacent land and connect it with routes and bridges.
- **League:** Build eight gyms and the Elite Four hall. Founding masters take the four seats. Residents with eight badges queue to challenge.

### Elite Four rules

Only one challenger enters at a time. Beat #4 and that trainer is out; the challenger becomes #4. Then challenge #3. A win swaps their ranks. Continue through #2 and #1. **#1 is the champion.**

If the challenger loses before winning a seat, they return to training and can retry later. If they have already gained a seat, they retain the rank reached. A displaced #4 returns to adventuring. Current Elite Four members remain at the hall, waiting for challengers. Teams heal between ranked matches.

### Growing your region

Trainers arrive over time and choose a starter. They catch weakened wild Ferals with binding orbs, carry up to six teammates and six reserves, earn field-research money, buy supplies, train, heal, and pursue badges. Their teams, inventories, money, records, and histories persist.

Revenue comes from shops, healing, gym entry, the League, and cafés. Supplies and daily building upkeep cost money. Regional grants fund milestones. Trainer wallets are independent of your treasury; external research rewards and guild stipends keep the trainer economy moving.

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
