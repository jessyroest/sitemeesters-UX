# AXIOM — Premium Digital Studio

An Awwwards-level, animation-first portfolio website built with Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, Lenis, and GSAP-ready architecture.

## Quick Start

```bash
cd premium-agency
npm install
npm run dev
# → http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Dark theme, design tokens, CSS scroll-driven animations
│   ├── layout.tsx         # Root layout with Syne + Inter fonts (next/font)
│   └── page.tsx           # Main page assembling all sections
├── components/
│   ├── Hero.tsx            # Fullscreen hero: canvas particles, parallax, stagger reveals
│   ├── Proof.tsx           # Stats cards with blur-to-sharp stagger + hover glow
│   ├── FeaturedWork.tsx    # Horizontal project rail + draggable before/after slider
│   ├── Process.tsx         # Scroll-linked timeline with animated step activation
│   ├── Testimonials.tsx    # Infinite marquee with fade edges + reduced-motion
│   ├── FinalCTA.tsx        # Cinematic closing: gradient shift, headline scale, line reveal
│   ├── Navbar.tsx          # Scroll-reactive transparency, underline hover
│   ├── ScrollProgress.tsx  # Gradient progress bar (top of viewport)
│   ├── CustomCursor.tsx    # Light-spot cursor, desktop-only, rAF-synced
│   ├── LenisProvider.tsx   # Butter-smooth scroll via Lenis + rAF sync
│   └── ScrollDrivenDivider.tsx  # Pure CSS scroll-driven animation (progressive enh.)
├── hooks/
│   └── useReducedMotion.ts # Detects prefers-reduced-motion
└── lib/
    └── constants.ts        # Design tokens, colors, easings, content data
```

## Animation Map

| Technique | Where | Library |
|-----------|-------|---------|
| Scroll progress bar | Top of page | Framer Motion `useScroll` + `useSpring` |
| Parallax depth | Hero (text vs background) | Framer Motion `useTransform` |
| Canvas particles | Hero background | Vanilla Canvas + rAF |
| Stagger reveal + blur | Proof cards | Framer Motion `whileInView` |
| Horizontal rail shift | Featured Work | Framer Motion `useTransform` on `scrollYProgress` |
| Before/After slider | Featured Work | Native drag + state |
| Timeline step activation | Process | Framer Motion multi-point `useTransform` |
| Infinite marquee | Testimonials | Framer Motion loop animation |
| Gradient shift on scroll | Final CTA bg | Framer Motion `useTransform` |
| CSS scroll-driven line | Dividers | Native `animation-timeline: view()` |
| Cursor light spot | Desktop overlay | Framer Motion `useSpring` + rAF |
| Nav transparency | Navbar | Framer Motion `useTransform` on scroll |

## Customization

### Colors
Edit `src/lib/constants.ts` → `COLORS` object:
- `primary` — Electric cyan (#00F0FF)
- `warm` — Coral amber (#FF6B35)
- `cool` — Lavender blue (#7B61FF)
- `neutral` — Silver mist (#94A3B8)

### Content
All text content is in `src/lib/constants.ts`:
- `NAV_LINKS`, `PROOF_CARDS`, `PROJECTS`, `PROCESS_STEPS`, `TESTIMONIALS`

### Fonts
Fonts are configured in `src/app/layout.tsx`:
- **Display:** Syne (headlines)
- **Body:** Inter (paragraphs)

### Theme
Dark-mode only. Base background: `#050505`. Modify in `globals.css`.

## Performance Notes

- `prefers-reduced-motion` disables particles, marquee, and cursor
- Canvas particles count adjusts to viewport size
- Cursor uses `requestAnimationFrame` for 60fps
- Scrollbar hidden utility for horizontal scroll areas
- Focus-visible indicators for accessibility

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (scroll mapping, animations)
- **Lenis** (smooth scroll)
- **GSAP + ScrollTrigger** (installed, ready for hero "wow moments")
