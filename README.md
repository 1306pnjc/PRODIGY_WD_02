# VI Chrono — Stopwatch

> A precision stopwatch built to test and prove JavaScript fundamentals. Started two years ago, redesigned yesterday.

---

## Background

Two years ago, this project was a JavaScript exercise a way of me testing my javascript skills the whole point was to get comfortable with timers, intervals, DOM manipulation, and state management without leaning on any libraries. The logic worked, but it looked like a coding exercise.

Recently, I came back to it and gave it a full visual overhaul. The JS core is the same proof of skill it always was, but now its wrapped in a design system that matches the quality of the code underneath. Custom SVG clock face, animated progress ring, a warm dark palette, and a UI that feels like it belongs on a real product.

The two versions side by side show exactly what two years of growth looks like.

---

## What This Project Demonstrates

**JavaScript (the original focus):**
- Precise timing using `Date.now()` deltas rather than interval drift — the right way to build a stopwatch
- `setInterval` management with proper start/pause/resume state
- Dynamic DOM manipulation — lap entries created and prepended on the fly
- Keyboard shortcut handling (`Space`, `L`, `R`) via `keydown` events
- Clean state management with no frameworks — just well-organised variables and functions

**Design (the revamp):**
- Hand-drawn SVG clock face with tick marks positioned using trigonometry
- Animated `stroke-dashoffset` progress ring driven by the live timer — JS and SVG working together
- CSS body class toggling (`.running`) to trigger a pulsing glow state on the clock
- Consistent design token system shared with the VI Studio project (`--gold`, `--teal`, `--border`, same easing curve)
- Lap list with slide-in animation on each new entry

---

## Features

| Feature | Detail |
|---------|--------|
| Start / Pause / Resume | Seamless state transitions with button label changes |
| Lap recording | Captures split times, displays newest first, scrollable list |
| Progress ring | Completes one full rotation per 60 seconds |
| Millisecond precision | Updates every 10ms |
| Keyboard shortcuts | `Space` → start/pause · `L` → lap · `R` → reset |
| Running glow | Clock face pulses with a gold glow while the timer is active |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Markup | HTML5 (semantic, inline SVG) |
| Styling | Pure CSS (custom properties, animations) |
| Behaviour | Vanilla JavaScript — zero dependencies |
| Fonts | Google Fonts — Cormorant Garamond, DM Mono |

---

## Project Structure

```
vi-chrono/
├── index.html      # Markup, SVG clock face, lap section
├── styles.css      # Full design system — layout, states, animations
├── script.js       # All timer logic, DOM updates, keyboard shortcuts
└── README.md
```

---

## How to Run

No build step, no installs. Open it directly.

**Option 1 — Just open it**
```bash
open index.html
```
Or double-click `index.html` in your file explorer.

**Option 2 — Local server (recommended for consistent font loading)**

VS Code Live Server: right-click `index.html` → *Open with Live Server*

Python:
```bash
python -m http.server 8000
# open http://localhost:8000
```

Node:
```bash
npx serve .
```

---

## Technical Notes Worth Highlighting

**Why `Date.now()` deltas instead of incrementing a counter?**
Using `setInterval` with a counter accumulates drift over time — each 10ms tick is never exactly 10ms. By storing the start timestamp and always computing `Date.now() - startTime`, the display stays accurate regardless of how the browser handles interval timing. This is the same approach used in production timers.

**SVG progress ring math:**
The ring has `r="116"`, giving a circumference of `2π × 116 ≈ 729`. The `stroke-dashoffset` is then set to `729 × (1 - progress)` where progress is the current second within the 60-second cycle. Pure JS driving pure SVG — no canvas, no animation libraries.

---

## Status

Final year student project. Part of the VI design system alongside VI Studio.  
The JavaScript fundamentals that started this project two years ago are still the foundation — the design just finally does them justice.

---

