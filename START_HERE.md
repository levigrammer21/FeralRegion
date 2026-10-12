# Feral Regions v1.6.0 — changed files

Upload every file from this folder directly into the root of your existing FeralRegion GitHub repository, replacing files with matching names. Do not upload the enclosing folder itself. Three new runtime files are required: world-chat.js, chat-ui.js, and game-audio.js.

After GitHub Pages finishes publishing, open the installed app online. In Account, use Save & load the app update when offered. If needed, close and reopen once for the new offline cache to activate. Your region is preserved; you do not need to reinstall.

Tap World chat near the bottom of the map to open the feed. Trainers announce game events and talk to each other. Tap − to minimize; new messages become an unread count. Building and opening management panels automatically minimize the feed. Tap a trainer's name to inspect them, or View event to inspect its battle / trainer.

Sound starts off. Open chat and tap ♫ off to enable it, or use Account → Sound. Your preference is saved. Browsers require a tap after reopening before audio can play. Battle effects play for the battle you are watching; milestone chimes work anywhere in the game. No sound plays while the app is hidden.

The feed is local NPC dialogue, not a multiplayer chat or a paid AI service. It follows actual events and keeps up to 120 messages. The existing Journal remains accessible from the clock / region menu.

Validation: full npm test suite including chat persistence, old-save migration, milestone routing, independent dialogue randomness, bounded history, escaping, collapsed UI, and battle sound deduplication. Native phone audio and visual layout still require device verification.
