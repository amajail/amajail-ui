# @amajail/ui

Shared design tokens, global CSS, and Astro components for my personal sites
(`amajail.github.io`, `my-afip/dashboard`, and any future sites).

Requires **Astro 5+** and **Tailwind CSS v4** in the consuming project.

## Install

While developing locally (sibling folder layout):

```jsonc
// consumer's package.json
"dependencies": {
  "@amajail/ui": "file:../amajail-ui"
}
```

Once published to GitHub:

```jsonc
"dependencies": {
  "@amajail/ui": "github:amajail/amajail-ui"
}
```

## Use

In your site's main CSS (e.g. `src/styles/global.css`):

```css
@import "@amajail/ui/fonts";   /* Google Fonts — must be first */
@import "tailwindcss";          /* required by Tailwind v4; install in consumer */
@import "@amajail/ui/styles";  /* tokens (@theme), base, component classes */
```

> The `@import "tailwindcss"` line stays in the consumer because the
> Tailwind v4 Vite plugin resolves `tailwindcss` relative to the file that
> owns `node_modules`. The shared package contributes the `@theme` block,
> base styles, and component classes only.

Then import components as needed:

```astro
---
import Card from "@amajail/ui/components/Card.astro";
import Badge from "@amajail/ui/components/Badge.astro";
import TerminalBlock from "@amajail/ui/components/TerminalBlock.astro";
---
```

## Tokens

Colors (Tailwind utilities follow the `--color-*` names — `bg-surface`, `text-text-primary`, etc.):

| Variable | Value |
| --- | --- |
| `--color-bg` | `#f8fafc` |
| `--color-surface` | `#ffffff` |
| `--color-surface-2` | `#f1f5f9` |
| `--color-border` | `#e2e8f0` |
| `--color-border-2` | `#cbd5e1` |
| `--color-text-primary` | `#0f172a` |
| `--color-muted` | `#64748b` |
| `--color-accent` | `#1d4ed8` |
| `--color-accent-h` | `#1e40af` |
| `--color-accent-cyan` | `#0891b2` |
| `--color-accent-indigo` | `#6366f1` |
| `--color-accent-pending` | `#f59e0b` |

Fonts: `--font-sans` (Plus Jakarta Sans), `--font-mono` (JetBrains Mono).

Shadows: `--shadow-card`, `--shadow-card-hover`, `--shadow-btn`, `--shadow-btn-hover`.

Component classes provided by `components.css`: `.eyebrow`, `.accent-line`, `.card`, `.card-strip`, `.stat-cell`, `.badge`, `.badge-success`, `.badge-pending`, `.badge-failed`, `.skeleton`.

## Changing tokens

Edit `src/styles/tokens.css`. All consumers pick up the change on their next install/build.
