# 🌸 NXR Corporation — Premium Portfolio Website

<div align="center">

![NXR Corporation](https://img.shields.io/badge/NXR-Corporation-ec4899?style=for-the-badge&logo=next.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14.2.5-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-Commercial-ec4899?style=for-the-badge)

**A fully-featured, production-ready portfolio website for NXR Corporation — built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Elegant light-pink theme, SEO-optimised, WCAG AA accessible, and Vercel-ready.**

[Live Demo](#) · [Documentation](#table-of-contents) · [Report Bug](#support) · [Request Feature](#support)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Tailwind Theme](#tailwind-theme)
  - [Adding Projects](#adding-projects)
- [SEO & Performance](#seo--performance)
- [Accessibility](#accessibility)
- [Deployment](#deployment)
- [Customisation Guide](#customisation-guide)
- [License](#license)
- [Support](#support)

---

## Overview

NXR Corporation is a boutique digital studio portfolio website showcasing premium web design and development services priced at $700 per project. The site is engineered for **maximum SEO impact**, **Core Web Vitals performance**, and **conversion optimisation** — while maintaining a refined, luxury aesthetic built around a light-pink palette.

### Design Philosophy

The visual identity is centred on:

- **Typography**: Playfair Display (headings/display) + DM Sans (body) + Cormorant Garamond (accent/quotes)
- **Colour Palette**: Light pink primaries (`#ec4899`, `#fce7f3`, `#fff0f5`) on warm cream (`#fffaf9`) backgrounds
- **Motion**: Subtle fade-up entry animations, CSS blob animations, floating card effects, and smooth hover transitions
- **Spatial Design**: Generous whitespace, asymmetric decorative blobs, overlapping badge cards on hero

---

## Features

### Core
- ✅ **Next.js 14 App Router** with full SSG via `generateStaticParams`
- ✅ **TypeScript** throughout — full type safety on all props, data, and utilities
- ✅ **Tailwind CSS** with a fully custom design token system
- ✅ **Fully responsive** — mobile, tablet, and desktop breakpoints
- ✅ **Zero console errors** — ESLint + strict TypeScript enforced

### SEO
- ✅ Dynamic `<title>` and `<meta description>` per page using Next.js Metadata API
- ✅ **Open Graph** and **Twitter Card** meta tags
- ✅ **JSON-LD structured data** on Home (Organization) and all project pages (CreativeWork + Review)
- ✅ Auto-generated **XML Sitemap** at `/sitemap.xml`
- ✅ Auto-generated **robots.txt** at `/robots.txt`
- ✅ Canonical URLs via `metadataBase`
- ✅ Proper heading hierarchy (H1 → H2 → H3) on every page

### Performance
- ✅ Next.js `<Image>` component with `fill`, `sizes`, and lazy loading
- ✅ Google Fonts loaded via `<link rel="preconnect">` and `display=swap`
- ✅ Static Site Generation (SSG) for all project pages — zero server compute at runtime
- ✅ No layout shift — fixed dimensions on all image containers
- ✅ Vercel-optimised build output

### Accessibility (WCAG AA)
- ✅ Skip-to-content link
- ✅ All interactive elements have visible focus rings
- ✅ `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-live`, `aria-invalid` throughout
- ✅ Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`, `<footer>`)
- ✅ Colour contrast ratios meet AA on all text/background combinations
- ✅ Form validation with inline error messages linked via `aria-describedby`

### UX & Animations
- ✅ Smooth scroll behaviour
- ✅ Fade-up entry animations with configurable delays
- ✅ Animated CSS blobs (morphing border-radius)
- ✅ Floating card animations on hero
- ✅ Hover lift + pink shadow transitions on cards and buttons
- ✅ Auto-advancing testimonial slider with manual dot navigation
- ✅ Mobile hamburger menu with smooth open/close transition
- ✅ Sticky header that gains background/blur on scroll
- ✅ Contact form with real-time validation + loading state + success state

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 14.2.5 |
| Language | TypeScript | 5.5 |
| Styling | Tailwind CSS | 3.4 |
| Animation | CSS Keyframes (native) | — |
| Forms | React Hook Form (ready) | 7.52 |
| Icons | React Icons (ready) | 5.2 |
| Images | Unsplash (CDN) | — |
| Fonts | Google Fonts | — |
| Linting | ESLint + next/core-web-vitals | 8.57 |
| Formatting | Prettier | 3.3 |
| Deployment | Vercel | — |

---

## Project Structure

```
nxr-portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, header, footer)
│   ├── page.tsx                  # Home page (/)
│   ├── not-found.tsx             # Custom 404 page
│   ├── sitemap.ts                # Auto XML sitemap generation
│   ├── robots.ts                 # robots.txt generation
│   ├── about/
│   │   └── page.tsx              # About page (/about)
│   ├── projects/
│   │   ├── page.tsx              # Projects listing (/projects)
│   │   └── [slug]/
│   │       └── page.tsx          # Project detail (/projects/:slug)
│   ├── services/
│   │   └── page.tsx              # Services page (/services)
│   └── contact/
│       ├── layout.tsx            # Contact layout (metadata)
│       └── page.tsx              # Contact page (/contact)
│
├── components/                   # Reusable React components
│   ├── Header.tsx                # Sticky navigation header
│   ├── Footer.tsx                # Full footer with newsletter
│   ├── HeroBanner.tsx            # Home page hero section
│   ├── ProjectCard.tsx           # Portfolio project card
│   └── TestimonialSlider.tsx     # Auto-advancing testimonial carousel
│
├── data/
│   └── projects.json             # All project data (6 projects)
│
├── types/
│   └── index.ts                  # TypeScript interfaces
│
├── styles/
│   └── globals.css               # Global CSS, Tailwind directives, custom utilities
│
├── public/                       # Static assets (favicon, OG image, etc.)
│
├── next.config.mjs               # Next.js configuration (image domains)
├── tailwind.config.ts            # Tailwind custom theme (colours, fonts, shadows, animations)
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
├── .eslintrc.json                # ESLint rules
├── .prettierrc                   # Prettier formatting rules
└── package.json                  # Dependencies and scripts
```

---

## Pages & Routes

| Route | Page | Type | Description |
|-------|------|------|-------------|
| `/` | Home | SSG | Hero, services overview, featured projects, testimonials, process, CTA |
| `/about` | About | SSG | Company story, values, team members, mission statement |
| `/projects` | Projects | SSG | Full portfolio grid with category labels |
| `/projects/[slug]` | Project Detail | SSG | Full project page with gallery, testimonial, related work |
| `/services` | Services | SSG | 6 service cards with pricing, FAQ section |
| `/contact` | Contact | Client | Validated form, map embed, contact info |
| `/not-found` | 404 | SSG | Custom 404 with pink branding |
| `/sitemap.xml` | Sitemap | Generated | All static + dynamic routes |
| `/robots.txt` | Robots | Generated | Search engine crawl instructions |

---

## Components

### `Header.tsx`
- Sticky header that adds `backdrop-blur` + `shadow` on scroll
- Active route highlighting via `usePathname`
- Animated mobile hamburger menu with smooth slide-down
- "Start a Project" CTA button

### `Footer.tsx`
- Full-width gradient CTA strip
- Brand + social links column
- Two navigation link columns (Company, Services)
- Newsletter signup with success state

### `HeroBanner.tsx`
- Full-height hero with decorative morphing blobs
- Staggered fade-up animation sequence
- Stats row (50+ projects, $700 price, 100% satisfaction)
- Floating badge cards (project launched, 5-star rating)

### `ProjectCard.tsx`
- Lazy-loaded image with hover zoom
- Category badge overlay
- Technology pill tags (max 3 + overflow count)
- Hover overlay with "View Details" button
- Hover lift + pink shadow effect

### `TestimonialSlider.tsx`
- Auto-advances every 5 seconds
- Smooth fade + translate transition
- Manual dot navigation with `aria-live` for screen readers
- Author avatar, name, role, and associated project name

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.17.0
- **npm** ≥ 9.0 (or pnpm / yarn)

Verify your environment:
```bash
node --version   # ≥ 18.17.0
npm --version    # ≥ 9.0
```

### Installation

1. **Clone or unzip the project:**
   ```bash
   # If cloning from a repo:
   git clone https://github.com/your-org/nxr-portfolio.git
   cd nxr-portfolio

   # Or if you received a ZIP:
   unzip nxr-portfolio.zip
   cd nxr-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify installation:**
   ```bash
   npm run lint
   ```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The development server supports Hot Module Replacement (HMR) — changes are reflected instantly.

### Building for Production

```bash
# Build the production bundle
npm run build

# Preview the production build locally
npm run start
```

The build will output static HTML for all pages using SSG. Check the build output for any issues:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    ...
├ ○ /about                               ...
├ ○ /projects                            ...
├ ● /projects/[slug]                     ...
├ ○ /services                            ...
└ ○ /contact                             ...
```

---

## Configuration

### Environment Variables

No environment variables are required for the base build. If you add features (e.g., a real contact form backend, analytics), create a `.env.local` file:

```bash
# .env.local (not committed to git)

# Optional: If you add a contact form API endpoint
NEXT_PUBLIC_CONTACT_FORM_URL=https://your-api.com/contact

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Tailwind Theme

All custom design tokens are defined in `tailwind.config.ts`:

```ts
// Custom colours
colors: {
  pink: { 50–900 },      // Full pink scale
  rose: {
    blush: '#FFE4EE',    // Very light blush
    petal: '#FFB8D1',    // Medium petal pink
    mist:  '#FFF0F5',    // Near-white pink mist
    deep:  '#E8789A',    // Deeper rose
  },
  cream:    '#FFFAF9',   // Warm off-white background
  charcoal: '#2D2D35',   // Near-black text
  muted:    '#9B8EA0',   // Muted purple-grey for secondary text
}

// Custom fonts (loaded via Google Fonts)
fontFamily: {
  display: 'Playfair Display'   // Headings
  sans:    'DM Sans'            // Body text
  accent:  'Cormorant Garamond' // Quotes, italic
}

// Custom shadows
boxShadow: {
  'pink-sm': '0 2px 8px rgba(236,72,153,0.12)',
  'pink-md': '0 4px 20px rgba(236,72,153,0.18)',
  'pink-lg': '0 8px 40px rgba(236,72,153,0.22)',
}
```

### Adding Projects

Edit `data/projects.json` to add, edit, or remove projects. Each project follows this schema:

```json
{
  "id": "7",
  "slug": "your-project-slug",
  "title": "Project Name",
  "shortDescription": "One-sentence summary shown on cards.",
  "description": "Full multi-sentence description for the detail page.",
  "image": "https://images.unsplash.com/photo-XXXX?w=800&q=80",
  "gallery": [
    "https://images.unsplash.com/photo-XXXX?w=800&q=80",
    "https://images.unsplash.com/photo-YYYY?w=800&q=80"
  ],
  "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
  "category": "Web Application",
  "client": "Client Name",
  "price": 700,
  "duration": "3 weeks",
  "year": 2025,
  "testimonial": {
    "text": "Client testimonial text here.",
    "author": "First Last",
    "role": "Title, Company",
    "avatar": "https://images.unsplash.com/photo-ZZZZ?w=200&q=80"
  },
  "featured": true
}
```

> **Note**: After adding a new project, the static pages are automatically generated at build time via `generateStaticParams`. No code changes needed.

---

## SEO & Performance

### Metadata Strategy

Every page uses Next.js 14's Metadata API:

```ts
// Static metadata
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description...',
  openGraph: { ... },
};

// Dynamic metadata (project pages)
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  return { title: project.title, description: project.shortDescription };
}
```

### Structured Data (JSON-LD)

- **Home page**: `Organization` schema with social links
- **Project pages**: `CreativeWork` schema with embedded `Review` schema

### Image Optimisation

All images use Next.js `<Image>`:
- `priority` on above-the-fold images
- `loading="lazy"` on gallery/below-fold images
- `sizes` attribute for responsive image downloads
- Served via Next.js image optimisation pipeline

### Core Web Vitals Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| FCP | < 1.8s |
| TTFB | < 800ms |

---

## Accessibility

This project targets **WCAG 2.1 Level AA** compliance:

- **Skip link**: "Skip to main content" visible on focus, positioned at top-left
- **Focus management**: All interactive elements have `:focus-visible` rings using `focus:ring-2 focus:ring-pink-400`
- **ARIA landmarks**: `<header role="banner">`, `<main>`, `<nav aria-label>`, `<footer role="contentinfo">`
- **ARIA live regions**: Testimonial slider uses `aria-live="polite"` + `aria-atomic="true"`
- **Form accessibility**: Labels linked to inputs, error messages linked via `aria-describedby`, `aria-invalid` on error state
- **Semantic headings**: Proper H1 → H6 hierarchy, no skipped levels
- **Image alt text**: All images have meaningful, descriptive alt text
- **Colour contrast**: All text/background combinations meet 4.5:1 minimum

---

## Deployment

### Vercel (Recommended)

The project is optimised for Vercel deployment.

1. **Push to GitHub** (or import the folder directly):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-org/nxr-portfolio.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel auto-detects Next.js — no configuration needed
   - Click **Deploy**

3. **Custom domain**:
   - In Vercel dashboard → Settings → Domains
   - Add `nxrcorporation.com` and follow DNS instructions

4. **Update `metadataBase`** in `app/layout.tsx`:
   ```ts
   metadataBase: new URL('https://your-domain.com'),
   ```

### Other Platforms

```bash
# Netlify
npm run build
# Deploy the .next folder

# Docker
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
EXPOSE 3000
```

---

## Customisation Guide

### Changing the Brand Name

1. Find and replace `NXR Corporation` across all files
2. Update the logo initial in `Header.tsx` and `Footer.tsx` (`<span>N</span>`)
3. Update `metadata` in `app/layout.tsx`

### Changing Colours

Edit `tailwind.config.ts` — the entire palette is defined under `theme.extend.colors`. The main pink accent is `pink-500` (`#ec4899`).

### Changing Fonts

1. Update the Google Fonts `<link>` in `app/layout.tsx`
2. Update the CSS variables in `styles/globals.css`
3. Update `fontFamily` in `tailwind.config.ts`

### Adding a New Page

1. Create `app/your-page/page.tsx`
2. Export `metadata` for SEO
3. Add to `navItems` in `components/Header.tsx`
4. Add to `footerLinks` in `components/Footer.tsx`
5. Add to `sitemap.ts`

### Connecting a Real Contact Form

Replace the `handleSubmit` simulation in `app/contact/page.tsx` with a real API call:

```ts
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  if (res.ok) setSubmitted(true);
};
```

Then create `app/api/contact/route.ts` using your email provider (Resend, SendGrid, etc.).

---

## License

This project is released under a **Commercial License**. See the full terms in [LICENSE.md](./LICENSE.md).

**Summary:**
- ✅ You may use, modify, and deploy this for one (1) commercial project or client
- ✅ You may customise all code, design, and content
- ❌ You may not resell, redistribute, or sublicense the source code
- ❌ You may not create derivative products for sale or distribution

For multi-use or agency licensing, contact: **licenses@nxrcorporation.com**

---

## Support

| Channel | Details |
|---------|---------|
| 📧 Email | support@nxrcorporation.com |
| 🐛 Bug Reports | Open an issue in the project repository |
| 💬 Questions | hello@nxrcorporation.com |
| 📖 Docs | This README |

---

<div align="center">

**Built with 🌸 by [NXR Corporation](https://nxrcorporation.com)**

*Premium digital experiences starting at $700*

</div>
