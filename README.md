# Irfan Sadiq Mahi — Portfolio

Personal portfolio website for **Irfan Sadiq Mahi**, a professional video editor and motion graphics artist based in Dhaka, Bangladesh.

## Sections

- **Hero** — Full-screen intro with portrait, name watermark, scrolling role carousel, animated navigation buttons, and company cards
- **Brand Carousel** — Infinite-scroll showcase of partner brands
- **About** — Bio with workspace cards linking to past collaborations (TechBuddy BD, Xenon Studios, MrNomster, Dribbling BD)
- **Skills** — Table layout with synchronized decoder + typing scroll-triggered text effects and a floating watermark
- **Collaborations** — Career timeline cards in a 6-column grid, animated stats counters, and staggered scroll reveals
- **Activities** — Infinite-scroll reel cards showing recent work
- **Contact** — Contact form that opens WhatsApp with pre-filled message, contact info with mailto/wa.me links, and social profiles
- **Footer** — Brand column with social links, navigation, and contact details

## Tech Stack

- **HTML5** — Semantic single-page structure
- **CSS3** — Custom properties, glassmorphism, keyframe animations, responsive design
- **Tailwind CSS** (CDN) — Utility classes for layout and spacing
- **JavaScript (ES6+)** — IntersectionObserver, GSAP ScrollTrigger, Lenis smooth scroll, scroll-based section indicator
- **GSAP + ScrollTrigger** — Scroll-triggered reveal animations
- **Lenis** — Smooth scrolling with GSAP integration
- **Google Fonts** — Inter, Space Mono, Sedgwick Ave Display, Orbitron, Lobster, Fira Code
- **Font Awesome 6.7.2** — Icons

## Getting Started

Clone the repo and open `index.html` in a browser:

```bash
git clone <repo-url>
cd mahi
```

Or serve with a local dev server (recommended):

```bash
# Using VS Code Live Server
# Or Python
python -m http.server 8000
# Or Node
npx serve .
```

## Project Structure

```
├── index.html              # Main entry point
├── css/
│   ├── style.css           # Global styles, hero, about, buttons, animations
│   ├── navbar.css          # Dynamic island navigation
│   ├── collab.css          # Collaborations cards & grid
│   ├── collab-counter.css  # Stats counter animation
│   ├── brand-carousel.css  # Brand logo carousel
│   ├── activity-carousel.css # Activity reel cards
│   ├── cta.css             # Contact form & info
│   ├── footer.css          # Footer layout & socials
│   ├── typewriter.css      # Skills table decoder/typing effects
│   ├── section-indicator.css # Side section indicator
│   └── responsive.css      # All responsive breakpoints
├── js/
│   ├── tailwind-init.js    # Suppresses Tailwind CDN console warnings
│   ├── tailwind-config.js  # Tailwind theme configuration
│   ├── lenis-init.js       # Lenis smooth scroll setup + GSAP integration
│   ├── navbar.js           # Expand/collapse on scroll, footer detection
│   ├── collab.js           # Card scroll reveal + 3D tilt parallax
│   ├── collab-counter.js   # Animated stats number counter
│   ├── brand-carousel.js   # Brand carousel duplication
│   ├── activity-carousel.js # Activity card duplication
│   ├── cta.js              # Form → WhatsApp message generation
│   ├── footer.js           # Dynamic copyright year
│   ├── section-indicator.js # Scroll-based section detection
│   ├── typewriter.js       # Decoder + typing text effects
│   └── main.js             # Particles, scroll reveal, nav active state, a11y
└── assets/
    ├── img/                # Hero image
    └── logo/               # Logo files
```

## Features

- **Lenis smooth scroll** with GSAP ScrollTrigger integration
- **Dynamic island navbar** — expands on scroll past 80%, collapses when footer enters viewport
- **Section indicator** — scroll-based midpoint detection (no IntersectionObserver conflicts)
- **Skills typewriter** — synchronized decoder + typing effects triggered on scroll (800ms stagger)
- **Stats counter** — animated digit roll for experience, satisfaction, and projects
- **3D tilt cards** — mouse-follow parallax on collaboration cards
- **Form → WhatsApp** — form submit opens `wa.me` with URL-encoded message
- **Brand-colored social hover** — Facebook blue, Instagram pink, LinkedIn blue, X/Threads white
- **Particle background** — floating particles on hero section
- **Responsive** — breakpoints from 320px to 1024px+ with touch and reduced-motion support
- **Accessibility** — keyboard navigation outlines, `prefers-reduced-motion` support

## Design

Dark cinematic aesthetic with a warm accent palette (`#715A5A` rose/clay). Features a unique Apple-inspired dynamic island navigation bar, glassmorphism surfaces, radial gradient lighting, and smooth scroll-triggered animations.

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Requires ES6+ support.
