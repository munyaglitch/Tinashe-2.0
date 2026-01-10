# Design System Spec

This file captures the visual rules that must be applied consistently across the codebase so the UI stays in sync with the uniform design system.

## Core Rules

1. **Rounded Surfaces** – Every primary panel/card/button uses a `border-radius` of `10px` and reuses that radius everywhere it appears. This keeps curves consistent even when nesting elements.
2. **Hard Downward Shadow** – Elevation is expressed with a sharp, centered-down drop shadow. Use `box-shadow: 0 12px 18px rgba(0, 0, 0, 0.35)` (or similar) for cards and modals to make them pop from the background without soft spread.
3. **Color Palette** – Stick to the established palette (deep charcoals, gradients from `#1c7ed6` to `#1dd1a1`, warm whites, and accent neons). Avoid adding new hues unless approved.
4. **Typography** – Headings use oversized, bold sans-serif, body copy stays at 16px with 1.5 line-height, and supporting text is muted using the secondary text color defined in the theme.  
   - Heading example: `font-size: clamp(1.75rem, 2vw + 1rem, 2.5rem); font-weight: 700; letter-spacing: -0.02em;`
   - Body example: `font-size: 1rem; line-height: 1.5; color: #e9ecef;`
5. **Spacing Rhythm** – Use spacing increments of `8px` or `16px` for padding/margins and keep consistent gutters between cards and sections. Larger stacks should use `24px` or `32px` when separating major zones.
6. **Iconography** – Icons live inside rounded buttons/pills that respect rule (1) above and never exceed 24px height to stay proportional. Use neon accent strokes for active states and set `stroke-width: 1.6`.

## Palette

- **Primary gradient:** `linear-gradient(120deg, #1c7ed6, #1dd1a1)` for hero buttons and badges.
- **Deep charcoal surface:** `#10141a` with variants `#141a22`, `#1c2330`.
- **Warm white text:** `#f8f9fa` for primary copy; muted text uses `#bec2cf`.
- **Highlights:** Use `#ffb703`, `#ff6b6b`, `#51cf66` sparingly for alerts or success states.

## Component Guidance

- **Cards/Modals:** `border-radius: 10px`, `box-shadow: 0 12px 18px rgba(0, 0, 0, 0.35)`, `background: #141a22` with a subtle border `1px solid rgba(255,255,255,0.06)`.
- **Buttons:** Maintain the same radius, gradients for fills, and add a downward shadow `box-shadow: 0 6px 12px rgba(0, 0, 0, 0.45)` when elevated. Outline buttons keep the radius and use `border: 1px solid rgba(255,255,255,0.2)`.
- **Inputs:** Wrap inputs in rounded containers with `bg: rgba(255,255,255,0.04)` and `box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08)`; focus states flicker to the neon accent.
- **Avatar/Icons:** Place avatars inside `10px` rounded containers plus the same centered-down shadow so they match cards’ tactile feel.

## Implementation Notes

- Always reference these rules when adding a new screen or component; the radius and shadow are non-negotiable.
- Keep CSS centralized (Tailwind classes or shared `buttonVariants`) so gradient/shadow values stay synchronized.

Adhering to these rules ensures every new screen or component immediately feels like part of the brand.
