# NXRMOD

> **Premium MOD APKs — Always Free.**
> A fast, SEO-optimized MOD APK listing website built with Next.js 14 App Router. No backend required. Fully deployable on Vercel in minutes.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Adding New Apps](#adding-new-apps)
- [App Data Schema](#app-data-schema)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [SEO Features](#seo-features)
- [Customization](#customization)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [FAQ](#faq)
- [License](#license)

---

## Overview

NXRMOD is a fully static MOD APK listing website similar to LiteAPKs. Each app has its own SEO-optimized detail page generated at build time. Downloads redirect users to a Telegram post link — no file hosting needed.

**Key highlights:**

- Zero backend — data lives in a single JSON file
- Every app page is statically generated for maximum SEO and speed
- Client-side search and category filtering with no API calls
- Dark aesthetic with pink/purple gradient accents
- Mobile-first, fully responsive layout
- Deployable to Vercel with one command

---

## Live Demo

```
https://nxrmod.vercel.app
```

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.2.3 | Framework (App Router) |
| React | 18 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4.1 | Styling |
| Vercel | — | Hosting & deployment |

**Fonts (Google Fonts):**
- [Syne](https://fonts.google.com/specimen/Syne) — Display / headings
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) — Body text
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — Labels / badges

---

## Project Structure

```
nxrmod/
│
├── app/                          # Next.js App Router root
│   ├── layout.tsx                # Root layout — Navbar, Footer, global metadata
│   ├── page.tsx                  # Homepage — hero section + app grid
│   ├── globals.css               # Global styles, CSS variables, animations
│   ├── types.ts                  # TypeScript interface for App
│   ├── not-found.tsx             # Custom 404 page
│   ├── sitemap.ts                # Auto-generated XML sitemap
│   ├── robots.ts                 # robots.txt for search engines
│   │
│   ├── apps/
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic app detail page (/apps/app-name)
│   │
│   └── components/
│       ├── Navbar.tsx            # Top navigation bar
│       ├── Footer.tsx            # Site footer with disclaimer
│       ├── AppCard.tsx           # Individual app card for the grid
│       └── AppGrid.tsx           # Search + filter + grid container (client)
│
├── data/
│   └── apps.json                 # ← All app data lives here
│
├── public/
│   └── icons/                    # App icon images (.png)
│
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind theme (colors, fonts, animations)
├── tsconfig.json                 # TypeScript config
├── postcss.config.js             # PostCSS config
└── package.json                  # Dependencies and scripts
```

---

## Getting Started

### Prerequisites

- Node.js **18.17** or higher
- npm, yarn, or pnpm

### Installation

**1. Clone or extract the project:**

```bash
# If using git
git clone https://github.com/yourname/nxrmod.git
cd nxrmod

# Or if you downloaded the zip
unzip nxrmod.zip
cd nxrmod
```

**2. Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

**3. Start the development server:**

```bash
npm run dev
```

**4. Open your browser:**

```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## Adding New Apps

All app data is stored in `data/apps.json`. To add a new app, open the file and append a new object to the array:

```json
{
  "name": "My App Pro",
  "slug": "my-app-pro",
  "version": "2.5.0",
  "size": "32 MB",
  "developer": "Developer Name",
  "category": "Tools",
  "icon": "/icons/myapp.png",
  "telegram": "https://t.me/yourchannel/POST_ID",
  "description": "A short description of the app and what the MOD unlocks.",
  "features": [
    "Pro subscription unlocked",
    "No ads",
    "All features enabled"
  ],
  "rating": 4.5,
  "downloads": "100K+"
}
```

Then place the app icon at `public/icons/myapp.png` (recommended size: **128×128px** PNG).

That's it — run `npm run build` and the new app page is automatically generated at `/apps/my-app-pro`.

> **Tip:** The `slug` must be unique, lowercase, and use hyphens instead of spaces. It becomes the URL of the app's page.

---

## App Data Schema

Full TypeScript interface for reference (`app/types.ts`):

```typescript
interface App {
  name: string;        // Display name, e.g. "Spotify Premium"
  slug: string;        // URL-safe ID, e.g. "spotify-premium"
  version: string;     // MOD version, e.g. "8.9.14"
  size: string;        // APK file size, e.g. "35 MB"
  developer: string;   // Original developer name
  category: string;    // One of the categories listed below
  icon: string;        // Path to icon in /public, e.g. "/icons/spotify.png"
  telegram: string;    // Full Telegram post URL for the download
  description: string; // 1–3 sentence app description
  features: string[];  // List of MOD features/changes
  rating: number;      // Rating from 0.0 to 5.0 (e.g. 4.8)
  downloads: string;   // Formatted download count (e.g. "10M+")
}
```

### Supported Categories

Categories control the color-coded badge shown on cards and detail pages.

| Category | Badge Color |
|---|---|
| `Education` | Blue |
| `Music` | Green |
| `Video` | Red |
| `Design` | Purple |
| `Photography` | Yellow |
| `Entertainment` | Pink |
| `Tools` | Cyan |

To add a new category, extend the `CATEGORY_COLORS` object in both `AppCard.tsx` and `apps/[slug]/page.tsx`.

---

## Pages & Routes

| Route | Type | Description |
|---|---|---|
| `/` | Static | Homepage with hero and full app grid |
| `/apps/[slug]` | Static (SSG) | Individual app detail page |
| `/sitemap.xml` | Auto-generated | XML sitemap for all pages |
| `/robots.txt` | Auto-generated | Search engine crawl instructions |

All `/apps/[slug]` pages are pre-rendered at build time via `generateStaticParams()`, making them instantly fast and fully crawlable by search engines.

---

## Components

### `Navbar.tsx`
Sticky top navigation bar with:
- NXRMOD logo (gradient icon + wordmark)
- Desktop navigation links
- Telegram channel CTA button
- Mobile hamburger menu with animated toggle

### `AppCard.tsx`
Card component displayed in the grid. Shows:
- App icon with fallback initial letter
- App name, developer, star rating
- Category badge + version badge + download count
- "Download MOD" button (links to the app detail page)

### `AppGrid.tsx` *(Client Component)*
Wraps the app grid with interactive features:
- **Search bar** — filters by app name, developer, or category in real time
- **Category filter buttons** — toggle to filter by a single category
- **Results counter** — shows how many apps match current filters
- **Clear filters** button — resets search and category

### `Footer.tsx`
Site footer with:
- Brand logo and tagline
- Navigation links (Telegram channel, DMCA, Privacy)
- Legal disclaimer about MOD APKs

---

## SEO Features

NXRMOD is built with SEO as a first-class concern.

### Dynamic Metadata (`generateMetadata`)
Each app page generates unique `<title>` and `<meta description>` tags:

```typescript
// Example output for Spotify Premium
title: "Spotify Premium MOD APK v8.9.14 — Download Free | NXRMOD"
description: "Download Spotify Premium MOD APK v8.9.14. Premium unlocked, Unlimited skips, No ads. 35 MB | Spotify AB"
```

### Static Generation
All pages are pre-rendered HTML — no JavaScript required for initial load. This maximizes Core Web Vitals scores and ensures full indexability by Google.

### Sitemap
`/sitemap.xml` is automatically generated at build time and includes all app pages with `lastModified`, `changeFrequency`, and `priority` values.

### Clean URLs
Every app gets a descriptive, human-readable URL:
```
https://nxrmod.vercel.app/apps/spotify-premium
https://nxrmod.vercel.app/apps/canva-pro
```

### Open Graph & Twitter Cards
All pages include Open Graph metadata for rich link previews when shared on social media and messaging apps.

---

## Customization

### Changing the Site Name / Domain

1. Update the site name in `app/layout.tsx` inside the `metadata` export
2. Update the sitemap base URL in `app/sitemap.ts`
3. Update the robots sitemap URL in `app/robots.ts`

### Changing Accent Colors

Colors are defined in `tailwind.config.ts` under `theme.extend.colors`:

```typescript
accent: {
  pink: "#ff3d8a",      // Primary accent
  purple: "#a855f7",    // Secondary accent
  cyan: "#22d3ee",      // Tertiary accent
},
```

Update these values and the gradient utility classes in `globals.css` to match your brand.

### Changing Fonts

Fonts are imported in `app/globals.css` via Google Fonts. Replace the `@import` URL and update the CSS variable names:

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=YourFont...');

:root {
  --font-display: 'YourDisplayFont', sans-serif;
  --font-body: 'YourBodyFont', sans-serif;
}
```

### Changing the Telegram Channel Link

Search the project for `https://t.me/nxrmod` and replace with your own channel URL. Files that contain it:
- `app/components/Navbar.tsx`
- `app/components/Footer.tsx`

Individual app download links are set per-app in `data/apps.json` via the `telegram` field.

---

## Deployment

### Deploy to Vercel (Recommended)

**Option A — Vercel CLI:**

```bash
npm install -g vercel
vercel --prod
```

**Option B — GitHub Integration:**

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and click "New Project"
3. Import your repository
4. Leave all settings as default — Vercel auto-detects Next.js
5. Click **Deploy**

Your site will be live at `https://your-project.vercel.app` within ~60 seconds.

### Deploy to Other Platforms

Since NXRMOD is a fully static site (no API routes), it can be deployed anywhere that serves static files.

**Netlify:**
```bash
npm run build
# Upload the .next folder or connect your Git repo
```

**Self-hosted (Nginx/Apache):**
```bash
npm run build
npm start   # Runs on port 3000 by default
```

---

## Environment Variables

NXRMOD requires **no environment variables** by default. Everything is driven by `data/apps.json`.

If you extend the project with analytics or external APIs in the future, create a `.env.local` file at the project root:

```env
# Example — not required by default
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## FAQ

**Q: Where are the APK files hosted?**
A: Nowhere on this server. The Download button redirects users to a Telegram post where you host the file. NXRMOD is purely a listing/discovery site.

**Q: How do I update an app's version?**
A: Open `data/apps.json`, find the app by its `slug`, and update the `version` field. Rebuild the project with `npm run build`.

**Q: Can I add more than one download source?**
A: Yes — extend the `App` interface in `app/types.ts` to include additional link fields (e.g. `"direct": "https://..."`) and add the extra buttons in `apps/[slug]/page.tsx`.

**Q: Icons aren't showing — what's wrong?**
A: Make sure your icon files are placed in `public/icons/` and the `icon` field in `apps.json` matches the path exactly, including the leading slash (e.g. `"/icons/myapp.png"`). If no icon is found, the app's first letter is displayed as a fallback automatically.

**Q: How do I remove the disclaimer in the footer?**
A: Open `app/components/Footer.tsx` and delete or edit the disclaimer `<div>` block near the bottom of the component.

**Q: Can I add a dark/light mode toggle?**
A: The site is dark-mode only by design. To add a toggle, install `next-themes`, wrap the app in a `ThemeProvider` in `layout.tsx`, and add conditional Tailwind classes using the `dark:` prefix throughout the components.

---

## License

This project is released for personal and commercial use. You are free to use, modify, and deploy NXRMOD for your own MOD APK site. Attribution is appreciated but not required.

---

<div align="center">
  <strong>Built with ♥ by NXRMOD</strong><br/>
  <a href="https://t.me/nxrmod">Telegram</a> · <a href="https://nxrmod.vercel.app">Website</a>
</div>
