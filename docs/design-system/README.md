# Polymaze

Dark, smoky and purple. Polymaze is a French rock trio; the site is a stage in the dark with one accent colour, translucent cards and the maze logo as its signature.

## Principles
- **One accent.** Purple (`purple`) is the only colour. Everything else is white on black.
- **Glass over smoke.** Content sits on translucent cards (`glass`, `glass-border`, 6px blur) so the smoke animation stays visible behind it.
- **Poster, not table.** Big dates and venue names, little chrome. No divider lines, no table headers.
- **Light feedback.** Hover lifts a card 2px and adds `glow-hover` with a `purple` border. Nothing else moves.

## Content
Text is French, direct and short. Dates read "20 avril 2025". A venue reads "Place, **City** (department)". Empty fields are left out, never shown as a dash.

## Components
**Glass card** (concert, member). `glass` fill, 1px `glass-border`, `radius-card`, 6px backdrop blur, padding `space-2` (`space-3` from 600px). Hover: border `purple`, `glow-hover`, translateY(-2px), 0.2s ease. Built with MUI `Paper` and `elevation={0}`.

**Date block.** Day in `date-day`, month uppercase 14px bold, year 12px at 70% opacity, all `purple`, centred, 72px wide.

**Chip.** MUI `Chip` outlined, text and border `purple`. Carries one short fact: an instrument or "Privée".

**Avatar.** 112px circle, 3px `purple` ring, `radius-full`.

**Lead and quote.** The first paragraph of a text page is `lead` in white. A closing line is `quote`: italic, `purple`, with a 3px `purple` left bar.

**Past items.** Dimmed to 55% opacity, full opacity on hover, listed under a "Passés" heading below upcoming ones.

## Layout
One centred column, max width 768px (`max-w-3xl`), 16px side padding. Member cards form three columns from 600px and stack below.

## Stack
React, MUI v5 (`Paper`, `Chip`, `Avatar`, `Typography`, `Stack`) and Tailwind utilities. Colours are not in an MUI theme: components read `src/assets/colors.json` (`purple`) and use the rgba values above inline.
