# Portfolio Summary

## File Structure
```
mahi/
├── index.html          # Main HTML file
├── css/
│   └── style.css     # Main stylesheet
├── js/
│   └── main.js      # Main JavaScript
├── assets/
│   ├── img/
│   │   └── heroSection_Profile_Photo.png
│   ├── video/
│   │   └── HeroSection_background_Video.mp4
│   └── logo/
│       └── mini_logo.png
├── backup/
│   └── phase-1/    # Backup files
└── .gitignore
```

## HTML Structure (index.html)
- Tailwind CSS CDN
- Google Fonts (Mrs Saint Delafield)
- Hero Section with:
  - Video Background (.hero-video)
  - Gradient Overlay
  - Profile Picture with Name Overlay via CSS ::before/::after

## CSS Variables (style.css)
```css
:root {
  --hero-name-font-size: 150px;
}
```

## Hero Name Positioning
- `.hero-image::before` (Munthasir): translateX(-465px) translateY(355px)
- `.hero-image::after` (Rahman): translateX(15px) translateY(55px)

## Assets
- Profile Photo: assets/img/heroSection_Profile_Photo.png
- Background Video: assets/video/HeroSection_background_Video.mp4
- Favicon: assets/logo/mini_logo.png