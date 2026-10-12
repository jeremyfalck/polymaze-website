# Homepage landing page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/` page with a landing page: looping video hero, Spotify releases, and a wall of the latest Instagram and YouTube posts from the Google Sheet.

**Architecture:** A new `Home` page in `src/components/pages/home/` replaces `Projects.tsx` on the same route. It reuses the Band page shell (Smoke, scroll container, NavBar) and the existing `getInstagramPosts()` / `getYoutubeVideos()`. A pure `interleave` merges the two lists; Instagram embeds mount lazily.

**Tech Stack:** React 18, TypeScript, Tailwind, MUI `Paper`, `react-social-media-embed`, Jest via `react-scripts test`.

**Spec:** `docs/superpowers/specs/2026-10-12-homepage-landing-design.md`

## Global Constraints

- Route stays `paths.projects` (`/`); NavBar and `paths.json` unchanged.
- No change to `src/sheets/SheetsManager.ts`.
- Glass card style from the design system: fill `rgba(255,255,255,0.05)`, `backdropFilter: blur(6px)`, border `1px solid rgba(201,165,227,0.25)`, radius 3 (same as `ConcertItem.tsx`).
- Wall: first 6 items, then "Voir plus" reveals the rest; 1 col mobile, 2 tablet, 3 desktop.
- Video: `/hero.webm` and `/hero.mp4`, poster `src/assets/images/polymaze_collage.png`, muted, loop, `playsInline`, `preload="metadata"`; not shown under `prefers-reduced-motion` or on narrow viewports.
- Missing video files or failed sheet fetch must not break the page.

## Review Focus

- Both lists empty: wall section is not rendered (no empty heading).
- Only one list non-empty: wall shows that list in sheet order.
- Exactly 6 items: no "Voir plus" button.
- Sheet fetch rejects/slow: hero and Spotify render immediately.
- `hero.*` files absent: poster visible, no layout shift.

---

### Task 1: `interleave` helper

**Files:**
- Create: `src/components/pages/home/interleave.ts`
- Test: `src/components/pages/home/interleave.test.ts`

**Interfaces:**
- Produces: `export const interleave = <T>(a: T[], b: T[]): T[]`

- [ ] **Step 1: Write the failing tests** in `interleave.test.ts`, as `describe("interleave")`:
  - `it("alternates a and b")`: `interleave([1,2,3],[10,20,30])` equals `[1,10,2,20,3,30]`
  - `it("appends leftovers of the longer list")`: `interleave([1],[10,20,30])` equals `[1,10,20,30]`; `interleave([1,2,3],[10])` equals `[1,10,2,3]`
  - `it("handles empty inputs")`: `interleave([],[])` equals `[]`; `interleave([1,2],[])` equals `[1,2]`; `interleave([],[1,2])` equals `[1,2]`
- [ ] **Step 2: Run** `CI=true npx react-scripts test src/components/pages/home/interleave.test.ts`. Expected: FAIL, module not found.
- [ ] **Step 3: Implement** `interleave` in `interleave.ts`: one loop over `Math.max(a.length, b.length)`, pushing `a[i]` then `b[i]` when defined by index.
- [ ] **Step 4: Run** the same command. Expected: 3 passed.
- [ ] **Step 5: Commit**
```bash
git add src/components/pages/home/interleave.ts src/components/pages/home/interleave.test.ts
git commit -m "Add interleave helper for the social wall"
```

---

### Task 2: Hero and Home shell (replaces Projects)

**Files:**
- Create: `src/components/pages/home/Hero.tsx`, `src/components/pages/home/Home.tsx`
- Modify: `src/App.tsx` (import `Home` from `./components/pages/home/Home` in place of `Projects`; same route)
- Delete: `src/components/pages/projects/Projects.tsx` (its Spotify embeds move into `Home.tsx`; the wall in Task 3 replaces its Instagram/YouTube columns)

**Interfaces:**
- Consumes: `NavBar` (`index`, `ref`), `useHeaderHeight`, `Smoke`, `colors.purple`, as used in `Band.tsx`.
- Produces: `export default function Home()`; `export const Hero: () => JSX.Element`. `Home` renders `<SocialWall />` as a placeholder-free import added in Task 3 (in this task, `Home` renders Hero and releases only).

- [ ] **Step 1: Implement `Hero.tsx`**
  - Section `relative w-full overflow-hidden` with `style={{ height: "calc(100vh - <headerHeight>px)" }}` taking `headerHeight` as a prop (`Hero({ headerHeight }: { headerHeight: number })`), min-height 480px.
  - Background layer: `div` with `polymaze_collage.png` as `background-size: cover`; on top, `<video className="hidden sm:block motion-reduce:hidden absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata">` with `<source src="/hero.webm" type="video/webm">` then `<source src="/hero.mp4" type="video/mp4">`.
  - Overlay `bg-gradient-to-b from-black/40 via-black/30 to-black`; centered content: `polymaze_logo.png` (classes as `BandHeader`), tagline "Nouveau single : Take your hand", and two buttons: "Écouter" (`href="https://open.spotify.com/album/3aLOe8ePJqIUMqUgNziMcV"`, `target="_blank"`, `rel="noreferrer noopener"`) and "Concerts" (`href="#/concerts"`; the app uses `HashRouter`). Style buttons purple-filled and glass-outlined, `rounded-md`.
- [ ] **Step 2: Implement `Home.tsx`** from `Band.tsx`'s shell: same dimensions/resize state, `Smoke`, scroll container, `NavBar index={0}`. Body: `<Hero headerHeight={headerHeight} />` then a "Écouter" section containing the two Spotify iframes copied unchanged from the old `Projects.tsx` (titles "Nouveau single: Take your hand" and "Notre EP : Another Step"), in a `max-w-5xl mx-auto` two-column grid on `lg`.
- [ ] **Step 3: Update `App.tsx`**, delete `Projects.tsx`.
- [ ] **Step 4: Verify** `npx tsc --noEmit` passes, then `npm start` and check `/`: poster fills the hero at desktop width, no video requests 404-break the page (404 on `/hero.*` is expected until files exist), mobile width shows poster only, NavBar and `/band`, `/concerts` still work.
- [ ] **Step 5: Commit**
```bash
git add -A src/components/pages src/App.tsx
git commit -m "Add video hero and releases band as the new home page"
```

---

### Task 3: Social wall

**Files:**
- Create: `src/components/pages/home/SocialWall.tsx`
- Modify: `src/components/pages/home/Home.tsx` (render `<SocialWall />` after the releases section)
- Delete: `src/components/pages/projects/YoutubeVideo.tsx`

**Interfaces:**
- Consumes: `interleave` (Task 1); `getInstagramPosts(): Promise<string[]>`, `getYoutubeVideos(): Promise<YoutubeVideoConfig[]>` from `src/sheets/SheetsManager`; `InstagramEmbed` from `react-social-media-embed`.
- Produces: `export default function SocialWall()`; internal `type WallItem = { kind: "instagram"; url: string } | { kind: "youtube"; title: string; url: string }`.

- [ ] **Step 1: Implement `SocialWall.tsx`**
  - State `items: WallItem[]`, `showAll: boolean`. In a `useEffect`, `Promise.all` the two getters (each already resolves `[]` on failure), map to `WallItem`, `interleave(instagramItems, youtubeItems)`.
  - If `items.length === 0` return `null`.
  - Heading "Nos derniers posts" (same text classes as the old page headings), then grid `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`, rendering `items.slice(0, showAll ? undefined : 6)`.
  - Card: MUI `Paper elevation={0}` with the glass `sx` from Global Constraints. YouTube card: title, then `<iframe loading="lazy" style={{aspectRatio:"16/9"}} className="w-full rounded-lg">`. Instagram card: `<LazyEmbed>`, a small in-file component using `IntersectionObserver` (`rootMargin: "200px"`) that renders `<InstagramEmbed url={url} width="100%" />` only once visible, with a `min-h-[300px]` placeholder before.
  - "Voir plus" button only when `items.length > 6 && !showAll`.
- [ ] **Step 2: Wire into `Home.tsx`**, delete `YoutubeVideo.tsx`; run `grep -rn YoutubeVideo src` to confirm no leftover imports.
- [ ] **Step 3: Verify** `npx tsc --noEmit` and `CI=true npx react-scripts test` (the existing `SheetsManager` and `interleave` tests pass; `App.test.tsx` was already failing before this work, ignore it). In `npm start`: cards interleave IG/YT, Instagram embeds load only when scrolled near, "Voir plus" appears only above 6 items, the layout has no horizontal scroll at 375px width.
- [ ] **Step 4: Commit**
```bash
git add -A src/components/pages
git commit -m "Add social wall interleaving Instagram and YouTube posts"
```

---

### Task 4: Document the hero video

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add a "Hero video" section** to `README.md`: files go in `public/hero.webm` and `public/hero.mp4`, landscape, 10-15 s, muted, loops, about 3 MB max each; include the two ffmpeg commands:
```bash
ffmpeg -i input.mov -an -vf "scale=1280:-2,fps=30" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart public/hero.mp4
ffmpeg -i input.mov -an -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 public/hero.webm
```
  plus the tuning note: if a file is over 3 MB, raise `-crf` by 2 (smaller, softer) or trim the clip.
- [ ] **Step 2: Commit**
```bash
git add README.md
git commit -m "Document how to prepare the hero video"
```
