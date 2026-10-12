# Homepage landing page

## Goal
Make `/` a landing page that shows the band is active: a looping video hero, the
latest releases, and a wall of the latest Instagram and YouTube posts. Content keeps
coming from the Google Sheet (see `2026-10-12-google-sheet-content-design.md`).

## Constraints
- Static site (OVH / GH Pages); no backend, no new API keys.
- Match the design system (`docs/design-system/README.md`): glass cards over smoke.
- Must work on mobile.
- Hero clip is horizontal (landscape).

## Design

### Structure
`Projects.tsx` is replaced by a `Home` page under `src/components/pages/home/`.
The route stays `paths.projects` (`/`), so NavBar and links are unchanged. Same shell
as `Band.tsx` (Smoke, scroll container, `useHeaderHeight`, `NavBar index={0}`).

- `Hero.tsx`: viewport-height section under the navbar.
  - `<video autoPlay muted loop playsInline preload="metadata">` with `object-cover`,
    sources `/hero.webm` and `/hero.mp4`, poster `polymaze_collage.png`.
  - Dark gradient overlay, logo, tagline, buttons "Écouter" (Spotify) and "Concerts" (`/concerts`).
  - Video is not rendered under `prefers-reduced-motion` or on narrow viewports (poster only).
- Releases band: the two existing Spotify embeds (single and EP), moved unchanged.
- `SocialWall.tsx`: heading "Nos derniers posts", glass cards in a grid
  (1 col mobile, 2 tablet, 3 desktop). Videos: all shown. Instagram: first 6, "Voir plus" reveals the rest.

### Data
- Reuse `getInstagramPosts()` and `getYoutubeVideos()` from `SheetsManager.ts`, unchanged.
- Videos and Instagram posts are shown in two separate lanes ("Vidéos", "Instagram"), each a homogeneous grid with `items-start`, so mixed card heights never leave gaps. This replaced the interleaved wall after seeing it live.
- "Latest" = sheet order, top row newest. No date column is added.

### Performance and errors
- Instagram embeds mount only when their card enters the viewport (`IntersectionObserver`).
- Sheet failure yields `[]` (existing behaviour): wall hidden, hero and Spotify still render.
- Missing `hero.*` files: the poster shows; nothing breaks.

### Video file
Provided by the band: `public/hero.webm` and `public/hero.mp4`, landscape, 10-15 s,
muted, looping, about 3 MB max.

## Testing
- No unit test: the wall is presentational; the data functions are covered in `SheetsManager.test.ts`.
- Visual check in the browser at mobile and desktop widths.

## Out of scope
Automatic Instagram fetching, post dates, carousel, any change to `SheetsManager`.
