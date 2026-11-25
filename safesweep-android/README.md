# SafeSweep — a safe phone cleaner for Android

## Install
1. On your Android phone, open this repo's **Releases** on GitHub and pick the newest `SafeSweep 1.0.x`.
2. Tap `SafeSweep.apk` → Install (allow "Install unknown apps" for your browser if asked).
3. Open SafeSweep → **Grant access** (All files access), and on the Apps tab **Usage access**.

## What it cleans
| Category | Pre-ticked | Where it goes |
|---|---|---|
| Gallery thumbnail caches | yes | deleted (Android rebuilds them) |
| Temp / log / crash-dump files (>24 h old) | yes | Recycle bin |
| Leftover installer APKs | yes | Recycle bin |
| Folders left behind by uninstalled apps | no | Recycle bin |
| Duplicate files (SHA-256 verified, one copy always kept) | no | Recycle bin |
| Old downloads (90+ days) | no | Recycle bin |
| Large files (100 MB+) | no | Recycle bin |
| Empty folders | no | deleted |
| All apps' caches | — | Android's own system cache cleaner (Android 11+) |
| Unused apps / pre-installed bloat | — | Android's own uninstall / disable screens |

Recycle bin items can be restored for 7 days, then are removed automatically.

## Why it can't brick your phone
- **No root.** Android forbids normal apps from touching `/system`, `/data`, boot partitions or other apps' private data. A bug here simply can't reach them.
- `SafetyGuard` checks every operation: only inside user storage, canonical paths, no symlinks, never `Android/` (except reviewed leftover folders), never standard folders, never hidden folders.
- Files are re-checked right before cleaning; anything that changed since the scan is skipped.
- If a move to the Recycle bin fails, the file stays where it is. It's never deleted outright as a fallback.
- No `INTERNET` permission.
- `app/src/test/.../SafetyTest.kt` checks all of this; CI runs it before every build.

`app/sideload.keystore` is a non-secret signing key (standard Android debug passwords), committed so every build installs as an update over the last.
