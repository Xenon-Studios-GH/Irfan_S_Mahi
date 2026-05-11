# Portfolio Summary

## Goal
- Build a $1M personal portfolio website for Munthasir Rahman (Co-founder of Xenon Studios)
- Lightweight techniques suitable for shared hosting

## Constraints
- Tailwind CSS via CDN
- Lenis for smooth scrolling
- Premium dark theme (#030303 background)
- Mrs Saint Delafield and Pacifico fonts
- Dynamic Island navbar with expand animation
- Video background in hero section
- Separate Coming Soon page (page.html) with HUD Bento Grid

---

## File Structure
```
mahi/
├── index.html            # Main portfolio page
├── page.html             # Coming Soon page (HUD Bento Grid)
├── css/
│   ├── style.css         # Main styles (hero, navbar, carousel)
│   ├── page.css          # Card styles (glassmorphism, neon borders)
│   └── premium-counter.css # Odometer counter styles
├── js/
│   ├── main.js           # Lenis smooth scroll init
│   ├── page.js           # Page-specific functionality
│   └── premium-counter.js # Counter animation logic
├── assets/
│   ├── img/
│   │   └── heroSection_Profile_Photo.png
│   ├── video/
│   │   └── HeroSection_background_Video.mp4
│   └── logo/
│       └── mini_logo.png
└── backup/
    └── phase-2/          # Backup of page files
```

---

## Completed Work

### 1. Coming Soon Page (page.html)
- HUD Bento Grid with 4 cards
- Card 1: 8 brand info lines (logo + name + position format)
- Card 2: 2 carousels with 10+ brand names each, smooth scrolling
- Card 3: 16 skills as glassmorphic tags
- Card 4: Premium odometer counter (5+, 97%, 99+) with circuit board style + animated dots + rotating border

### 2. Main Portfolio (index.html)
- Hero section with video background
- Dynamic Island navbar with expand animation
- Cards section (same as page.html Card 1-4)
- Navbar hides when in hero section, shows when scrolled down

### 3. CSS Files
- `css/style.css` - Hero, navbar, carousel, expand/collapse animations
- `css/page.css` - Glassmorphism, neon borders, card backgrounds
- `css/premium-counter.css` - GPU-accelerated odometer animations

### 4. JavaScript Files
- `js/main.js` - Lenis smooth scroll init
- `js/page.js` - Page-specific functionality
- `js/premium-counter.js` - Scroll-triggered vertical rolling digit animation (Intersection Observer)

---

## Recent Changes (This Session)

### Navbar Hide/Show Fix
- Navbar now hides when user is in hero section
- Added reverse shrink animation (same as expand but opposite)
- Uses `.expand` class for opening, `.hidden` class for collapsing
- Animation: 1000px → 60px (collapse), 60px → 1000px (expand)
- Uses cubic-bezier easing (0.175, 0.885, 0.32, 1.275)
- Animation duration: 1.2s expand, 0.6s collapse

---

## Key Design Decisions
- Vertical rolling digit stack for odometer effect
- Intersection Observer triggers counter animation on scroll
- Different premium background per card for visual variety
- Navbar animation-delay: 0.3s, starts 1.5s after page load for scroll control
- Different background style per card for visual variety

---

## Premium Counter Details
- Uses cubic-bezier easing with 2.5s duration and 150ms stagger per digit
- Counter animation triggers on scroll via Intersection Observer
- Uses GPU-accelerated translate3d animations

---

## Remaining Tasks
- Add more sections (work, about, contact)
- Browser testing

---

## Assets
- Profile Photo: assets/img/heroSection_Profile_Photo.png
- Background Video: assets/video/HeroSection_background_Video.mp4
- Favicon: assets/logo/mini_logo.png