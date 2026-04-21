

# Premium Cinematic Intro Animation

Replace the current loader + diamond-expand reveal with a modern, multi-stage cinematic intro that feels like a high-end product launch site (think Apple/Awwwards). The new sequence will play once on first load and never block the rest of the experience.

## The Sequence (≈3.2s total)

```text
[0.0s] Black screen
[0.2s] PG monogram strokes draw themselves (SVG path-draw, neon ice glow)
[0.7s] Monogram fills + soft pulse
[0.9s] Counter "00 → 100" sweeps up beside a thin progress line
[1.6s] Tagline letters reveal: "PAVITHRAN G — AI / ML DEVELOPER"
[2.2s] Two horizontal slabs (top + bottom) split apart and slide off-screen
       revealing the hero with a subtle radial glow from center
[2.6s] Hero name characters stagger-fly in from below with blur-to-clear
[3.0s] Backdrop fog gradient + nav fade in, scroll unlocks
```

## Visual Layers

1. **Backdrop**: Pure black with a faint animated noise/grain texture and a slow ice-tinted radial pulse from center.
2. **Center monogram**: Custom SVG "PG" mark, ~120px, strokes drawn via `stroke-dasharray` animation, finishing with a soft glow halo.
3. **Counter + progress line**: Mono font counter ("00", "12", "47"… "100") synced with a 1px horizontal line that grows from 0 → 240px.
4. **Tagline**: `IBM Plex Mono`, letter-spacing wide, characters staggered with Splitting.js-style reveal (translateY + opacity + slight blur).
5. **Curtain split**: Two full-width black slabs (top half + bottom half) slide vertically apart in opposite directions with `cubic-bezier(0.86, 0, 0.07, 1)` for a dramatic "doors open" effect — replaces the diamond clip-path.
6. **Hero handoff**: Hero name characters animate in immediately as the curtain finishes for seamless continuity.

## Technical Implementation

- **File: `src/components/IntroAnimation.tsx`** (new)
  - Self-contained overlay component, fixed `z-index: 10000`, uses Framer Motion `AnimatePresence` so it cleanly unmounts.
  - Props: `onComplete: () => void`. Calls back at ~3.0s.
  - Internally uses Framer Motion variants for the monogram path-draw, counter increment (using `useMotionValue` + `useTransform` + `animate`), tagline char stagger, and curtain split.
  - Respects `prefers-reduced-motion`: skips straight to a 0.4s fade.

- **File: `src/index.css`**
  - Remove the old `#loader`, `.loader-*`, `.diamond-overlay`, `.diamond-glow` blocks (lines 86–216).
  - Add new minimal classes for the intro: `.intro-grain` (SVG noise overlay), `.intro-monogram` (glow filter), `.intro-curtain-top`, `.intro-curtain-bottom`, `.intro-counter`, `.intro-tagline`.
  - Add a one-time `@keyframes` for the radial pulse and grain shimmer.

- **File: `src/pages/Index.tsx`**
  - Remove the old loader JSX (lines 941–960) and diamond reveal JSX (lines 962–967).
  - Remove the GSAP loader timeline (lines 517–537) and replace with simple state: `const [introDone, setIntroDone] = useState(false)`.
  - Render `<IntroAnimation onComplete={() => setIntroDone(true)} />` when `!introDone`.
  - Replace all `loaded && revealGone` gating with `introDone` (Lenis init, cursor, GSAP, magnetic hover effects).
  - Drop unused refs: `loaderBarRef`, `loaderTextRef`.

- **Performance**
  - Pure CSS transforms + opacity (GPU-accelerated), no layout thrash.
  - SVG monogram is inline, no extra request.
  - Total JS overhead ≈ 2KB (Framer Motion is already in the bundle).
  - Plays only on first mount per session (no localStorage skip — matches user's prior preferences for a consistent first impression).

## Why It's Better Than The Current One

- Current intro: text-based "INITIALIZING…" loader → diamond clip-path expand. Functional but generic and dated.
- New intro: Branded monogram draw → counter build-up → tagline reveal → cinematic curtain split → seamless hero handoff. Modern, premium, memorable, and ties directly to the "PG" brand mark already used in the navbar.

## Files Touched
- `src/components/IntroAnimation.tsx` (new)
- `src/index.css` (replace loader + diamond blocks)
- `src/pages/Index.tsx` (swap intro mount + state gating)

