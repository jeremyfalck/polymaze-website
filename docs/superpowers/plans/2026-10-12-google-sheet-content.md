# Band content from a Google Sheet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve Instagram posts and YouTube videos on the Projects page from a published Google Sheet instead of Firebase Remote Config JSON.

**Architecture:** A new `src/sheets/SheetsManager.ts` fetches a published tab as CSV by `gid`, parses it into header-keyed rows, and exposes `getInstagramPosts()` / `getYoutubeVideos()` with the same signatures as today. `Projects.tsx` switches its import. `RemoteConfigManager.ts` is left untouched.

**Tech Stack:** React 18 + TypeScript (CRA / react-scripts, Jest), `fetch`. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-10-12-google-sheet-content-design.md`

## Global Constraints

- No new npm dependency (CSV parsed by hand).
- Published base URL: `https://docs.google.com/spreadsheets/d/e/2PACX-1vQf1AzFwx46osZhKNAbyZKpgzgtcBr2iZfh0ggf1KMAyx6Igr4QyVPCBFIloRO7WCnHxvIcoN4g9H6P/pub`; tab URL is `<base>?gid=<gid>&single=true&output=csv`.
- Tab gids: instagram `0`, youtube `2012695307`, concerts `1390539612`.
- Columns: instagram `url`; youtube `title`,`url`; concerts `date,place,city,department,description` (concerts consumed by `feature/shows`, not this work).
- Do not modify `src/firebase/RemoteConfigManager.ts`, `firebase.json`, or `remoteconfig.template.json`.
- Errors: fetch failure / non-OK status / bad row => log and return `[]` / skip the row; never throw to the page.
- Work on `develop`.

## Review Focus

- CSV exported with CRLF line endings and no trailing newline (the live youtube tab has none): rows still parse.
- Quoted field containing a comma or a doubled `""` quote (a video title like `Live, "acoustic"`): parsed to the literal text.
- Tab with only a header row, or blank rows in the middle: returns `[]` / skips the blanks.
- Network failure or HTTP error: `getInstagramPosts()` resolves `[]`, page still renders.
- A youtube/instagram row with an empty `url`: skipped, not rendered as a broken iframe.

---

### Task 1: CSV parsing and tab fetch

**Files:**
- Create: `src/sheets/SheetsManager.ts`
- Test: `src/sheets/SheetsManager.test.ts`

**Interfaces:**
- Produces:
  - `parseCsv(text: string): Record<string, string>[]` — first row is the header; skips rows whose cells are all empty; handles quotes, `""`, commas/newlines in quotes, CRLF/LF, missing trailing newline.
  - `fetchTab(gid: string): Promise<Record<string, string>[]>` — GETs the tab URL, `parseCsv` on the body; `[]` (with `console.log`) on network error or `!response.ok`.

- [ ] **Step 1: Write failing tests** in `SheetsManager.test.ts`:
  - `parseCsv("url\r\na\r\nb")` equals `[{url:"a"},{url:"b"}]`
  - `parseCsv('title,url\n"Live, ""acoustic""",http://x')` equals `[{title:'Live, "acoustic"', url:"http://x"}]`
  - `parseCsv("url\n\n,\na\n")` equals `[{url:"a"}]`; `parseCsv("url\n")` equals `[]`
  - `fetchTab("0")` with `global.fetch` mocked to reject resolves `[]`; mocked `{ok:false}` resolves `[]`; mocked `{ok:true, text: async()=>"url\na"}` resolves `[{url:"a"}]` and was called with a URL containing `gid=0&single=true&output=csv`.
- [ ] **Step 2:** Run `CI=true npx react-scripts test --watchAll=false src/sheets` — Expected: FAIL (module not found).
- [ ] **Step 3: Implement** `parseCsv` as a single-pass character state machine (in-quotes flag, current field, current row) and `fetchTab` in `SheetsManager.ts`; export the base URL and `GIDS = { instagram: "0", youtube: "2012695307", concerts: "1390539612" }` constants.
- [ ] **Step 4:** Re-run the same command — Expected: PASS.
- [ ] **Step 5: Commit**
```bash
git add src/sheets && git commit -m "Add Google Sheet CSV reader"
```

### Task 2: Wire Instagram and YouTube to the sheet

**Files:**
- Modify: `src/sheets/SheetsManager.ts`, `src/components/pages/projects/Projects.tsx:8-12`, `README.md`
- Test: `src/sheets/SheetsManager.test.ts`

**Interfaces:**
- Consumes: `fetchTab`, `GIDS` from Task 1; `YoutubeVideoConfig` from `src/firebase/RemoteConfigManager.ts` (import the type only).
- Produces:
  - `getInstagramPosts(): Promise<string[]>` — `url` of each instagram row, empty urls dropped.
  - `getYoutubeVideos(): Promise<YoutubeVideoConfig[]>` — `{title, url}` per youtube row, rows with empty `url` dropped.

- [ ] **Step 1: Write failing tests:** with `fetch` mocked per gid, `getInstagramPosts()` returns the urls in sheet order and drops a row with empty `url`; `getYoutubeVideos()` returns `[{title:"T", url:"U"}]`; with fetch rejecting, both resolve `[]`.
- [ ] **Step 2:** Run the test command from Task 1 — Expected: FAIL (functions undefined).
- [ ] **Step 3: Implement** both functions in `SheetsManager.ts` on top of `fetchTab`.
- [ ] **Step 4:** In `Projects.tsx` import `getInstagramPosts`, `getYoutubeVideos` from `../../../sheets/SheetsManager` and keep `YoutubeVideoConfig` imported from the firebase module. Add a README section "Editing site content" (edit the sheet; changes appear within ~5 min; new tab needs its gid added to `GIDS`).
- [ ] **Step 5:** Run `CI=true npx react-scripts test --watchAll=false` and `npx tsc --noEmit` — Expected: all pass, no type errors. Then `npm start` and confirm the Projects page shows the 3 Instagram posts and 2 YouTube videos from the sheet.
- [ ] **Step 6: Commit**
```bash
git add -A src README.md && git commit -m "Read Instagram and YouTube content from Google Sheet"
```
