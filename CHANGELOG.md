# Changelog

All notable changes to NXR Corporation Portfolio are documented in this file.

## [1.0.0] — 2026-03-20

### Added
- Initial release of NXR Corporation Portfolio Website
- Next.js 14 App Router architecture with full SSG
- TypeScript throughout all components and pages
- Tailwind CSS custom theme (light-pink palette, Playfair Display / DM Sans fonts)
- Home page with HeroBanner, services overview, featured projects, testimonial slider, process section, and CTA
- About page with company story, values grid, team members, and mission banner
- Projects listing page with full portfolio grid
- Dynamic project detail pages (`/projects/[slug]`) with `generateStaticParams`
- Services page with 6 service cards, pricing, FAQ, and differentiators section
- Contact page with validated form (client-side), Google Maps embed, and contact info
- Custom 404 not-found page with pink branding
- Auto-generated XML sitemap at `/sitemap.xml`
- Auto-generated `robots.txt` at `/robots.txt`
- JSON-LD structured data on Home (Organization) and all project pages (CreativeWork + Review)
- Open Graph and Twitter Card meta tags on all pages
- Sticky header with scroll-blur, active route highlighting, and mobile hamburger menu
- Footer with newsletter signup, social links, and gradient CTA strip
- Testimonial slider component with auto-advance and manual dot navigation
- ProjectCard component with hover zoom, overlay CTA, and lift animation
- 6 sample projects in `data/projects.json`
- Full TypeScript types in `types/index.ts`
- WCAG AA accessibility: skip links, ARIA landmarks, focus rings, aria-live regions
- ESLint (`next/core-web-vitals`) and Prettier configurations
- Commercial License (`LICENSE.md`)
- Comprehensive README with installation, configuration, and deployment docs
