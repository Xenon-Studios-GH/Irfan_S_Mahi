# Irfan Sadiq Mahi — Portfolio

Personal portfolio website for **Irfan Sadiq Mahi**, a professional video editor and motion graphics artist based in Dhaka, Bangladesh.

## Sections

- **Hero** — Full-screen intro with portrait, name watermark, and scrolling role carousel
- **Brand Carousel** — Infinite-scroll showcase of partner brands
- **About** — Bio with "workspace" cards for past collaborations
- **Skills** — Sticky video player + list of 10 expertise areas
- **Collaborations** — Project cards with 3D tilt, stats counters, and staggered scroll reveals
- **Activities** — Infinite-scroll reel cards showing recent work
- **Contact** — Contact form, info, and social links
- **Footer** — Navigation, services, and contact details

## Tech Stack

- **HTML5** — Semantic single-page structure
- **CSS3** — Custom properties, glassmorphism, keyframe animations, responsive design
- **Tailwind CSS** (CDN) — Utility classes for layout and spacing
- **JavaScript (ES6+)** — IntersectionObserver, GSAP, Plyr, touch/a11y handling
- **GSAP** — Scroll-triggered reveal animations
- **Plyr** — Custom video player
- **Google Fonts** — Inter, Space Mono, Sedgwick Ave Display
- **Font Awesome** — Icons

## Getting Started

Clone the repo and open `index.html` in a browser:

```bash
git clone <repo-url>
cd mahi
```

Or serve with a local dev server (recommended):

```bash
# Using VS Code Live Server (port 5501)
# Or Python
python -m http.server 8000
# Or Node
npx serve .
```

## Design

Dark cinematic aesthetic with a warm accent palette (`#715A5A` rose/clay). Features a unique Apple-inspired dynamic island navigation bar, glassmorphism surfaces, radial gradient lighting, and smooth scroll-triggered animations.

## Status

Portfolio prototype — visually polished but needs production hardening (form backend, build pipeline, performance optimization).
