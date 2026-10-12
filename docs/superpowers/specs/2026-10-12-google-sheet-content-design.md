# Band content from a Google Sheet

## Goal
The band edits Instagram posts and YouTube videos (and, later, concert dates) in a
Google Sheet instead of hand-writing JSON in the Firebase Remote Config console.

## Constraints
- Site stays static (OVH / GH Pages); no backend, no login, no admin UI.
- Firebase stays for analytics.
- Concerts UI lives on `feature/shows` (not merged). This work must not break it.

## Design
- One Google Sheet, published to the web (whole document). Each tab is fetched as CSV by its
  `gid`: `<base>/pub?gid=<gid>&single=true&output=csv`. Tabs, header row required:
  - `instagram`: `url`
  - `youtube`: `title`, `url`
  - `concerts` (consumed by `feature/shows`): `date` (dd/mm/yyyy), `place`, `city`, `department`, `description`
- `src/sheets/SheetsManager.ts` (new):
  - `fetchTab(gid): Promise<Record<string,string>[]>` fetches the published CSV, parses it
    (small quoted-field-aware parser, no dependency) into rows keyed by header, drops blank rows.
  - `getInstagramPosts()` and `getYoutubeVideos()` built on it, same signatures as today.
  - Published base URL and tab gids (instagram `0`, youtube `2012695307`, concerts `1390539612`)
    are code constants (public, not secret).
- `Projects.tsx` imports those two functions from `SheetsManager` instead of `RemoteConfigManager`.
- Errors: fetch failure or bad row logs and yields `[]`/skips the row; page never breaks.
- Freshness: Google caches published CSV ~5 min (was up to 1h).
- Check: one `assert`-based self-check for the CSV parser (commas, quotes, blank rows).

## Out of scope / deferred
- `RemoteConfigManager.ts` is left untouched so `feature/shows` merges cleanly. Remove it
  (and `remoteconfig` in `firebase.json`, `remoteconfig.template.json`) when `feature/shows`
  is merged and its `getConcerts()` switches to `fetchTab("concerts")`.
- Admin UI, schema validation library, offline cache.

## Docs
README gets the band-facing steps: edit the sheet; publishing is already on for the whole document, new tabs need their gid added in code.
