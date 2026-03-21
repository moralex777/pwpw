# CHANGELOG

## [v3.0.0] — manus/v3-visual-upgrade — MMXXVI

### Summary
Comprehensive visual and interactive upgrade. All changes are additive and preserve the original colour palette (`#0a0505`, `#722F37`, `#C5A55A`, `#F5F0E8`), typography (Playfair Display + Geist Sans), and the site's tongue-in-cheek intellectual tone.

---

### Favicon & PWA Icons
- New custom wine-glass favicon generated and integrated (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`, `favicon-180x180.png`, `favicon-192x192.png`, `favicon-512x512.png`)
- `layout.tsx` updated with explicit `<link rel="icon">` and `apple-touch-icon` metadata
- All PWA icon sizes verified

---

### globals.css
- **Hero gradient fixed**: replaced opaque overlay (0.85 opacity) with a vignette-style gradient — transparent in the centre, darkening only at edges and bottom — so the hero video is clearly visible
- Added grain/noise texture overlay (`body::before`) for cinematic depth
- New utility classes: `.gold-divider`, `.gold-divider-wide`, `.wine-line`, `.wine-stain`, `.quote-card-dark`, `.principle-frame`, `.nav-dot`, `.drop-cap`, `.glass-sway`, `.drip-drop`, `.cursor-blink`, `.float-slow`, `.fade-up`
- New keyframe animations: `shimmer`, `drip`, `sway`, `stainPulse`, `fadeUp`, `blink`, `bounce-slow`

---

### HeroSection
- Removed broken conditional rendering (video error fallback was malformed)
- Added Framer Motion parallax on video (`useSpring` + `useTransform`)
- Title entrance: blur-in (`filter: blur(8px)` → `blur(0px)`) with spring easing
- `Est. MMXXVI` label fades in above title with letter-spacing animation
- Subtitle parallax on scroll
- Wine-drop scroll indicator with `drip-drop` CSS animation

---

### RitualSection (full rewrite)
- Refined wine bottle SVG with label detail and shine
- Refined wine glass SVG with proper bowl clip path and wine fill physics
- Wine stream SVG with dual-layer gradient (wine + gold shimmer)
- Step progress indicator (I–IV) at top of sticky viewport
- Four scroll-driven steps: Polewaj → Wypij → Polewaj → Wypij (clink)
- **Ceremonial Pouring Ritual** (Element 7): hold mouse/touch to pour wine drops that follow cursor, with spring physics, drop fade-out, and *"Ah."* satisfaction text on release

---

### QuotesSection (full rewrite)
- Dark card design (`quote-card-dark`) replacing original cream cards
- Roman numeral indicators (I–X) as navigation dots
- Wine glass fill indicator that advances as the user progresses through quotes
- Auto-play (5 s interval), paused on hover
- Drag-to-swipe carousel with velocity detection
- Keyboard arrow navigation
- Decorative opening quote mark and Roman numeral watermark per card

---

### FilozofiaSection (full rewrite)
- `principle-frame` border with corner ornaments (`✦`)
- Word-by-word reveal driven by scroll position
- Dramatic title slide-in from left on section enter
- Ambient wine stain background pulse

---

### New Sections
- **WyroczniaWiniarska** (Element 4): text input → typewriter oracle response in the site's voice, with 10 procedurally varied response templates and philosophy fragment suffixes. Thinking indicator (3 animated dots). Principle frame with corner ornaments.
- **SlownikBiesiadnika** (Element 6): accordion glossary of 10 humorous wine-culture terms with Latin etymologies. *"Losuj hasło"* (Random Entry) button. Staggered entrance animations.

---

### ToastSection (full rewrite)
- **Licznik Toastów** (Element 5): persistent `localStorage` counter of all toasts raised, displayed with animated number transition and deadpan caption (*"Cyceron byłby dumny."*)
- Idle glass sway animation (`glass-sway`)
- Click to clink: glasses animate together with spring physics
- 32-particle burst on clink (wine drops + gold sparks)
- Screen shake via `useAnimation`
- *"Zdrowie!"* text pop on clink

---

### New Components
- `ScrollNavDots`: fixed right-side navigation dots with section labels on hover, appears after 200 px scroll
- `SiteFooter` (client component): vine border gradient, wine stain ambient, *"Wznieś toast"* CTA, footer nav links
- `PouringRitual`: reusable cursor/touch pouring interaction overlay

---

### page.tsx
- All new sections wired in correct order: Hero → Geneza → Ritual → Głosy Winnicy → Filozofia → Wyrocznia → Słownik → Toast → Footer
- `SectionDivider` gradient transitions between sections
- Geneza text uses `drop-cap` on first paragraph
- Server/client component boundary respected (footer extracted to `SiteFooter`)
