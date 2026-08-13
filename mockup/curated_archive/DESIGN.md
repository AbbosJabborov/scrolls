---
name: Curated Archive
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1c17'
  on-tertiary-container: '#86847e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e6e2db'
  tertiary-fixed-dim: '#cac6bf'
  on-tertiary-fixed: '#1c1c17'
  on-tertiary-fixed-variant: '#484742'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.5'
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style
The design system is rooted in the "Modern Museum" aesthetic: a synthesis of archival permanence and contemporary digital luxury. It targets high-end art collectors, historians, and cultural enthusiasts who value quiet sophistication over visual noise.

The style is **Editorial Minimalism**. It prioritizes the artwork above all else, using generous whitespace as a structural element rather than a void. Drawing from Swiss Design principles, it utilizes a strict underlying grid to maintain order, while high-contrast typography and subtle tactile details evoke the feeling of a premium physical art book. The emotional response is one of calm, intellectual discovery and "digital quiet."

## Colors
The palette is centered on a foundation of **Warm Ivory** (#F9F7F2), providing a more organic, humanistic feel than a clinical pure white. **Charcoal** (#1A1A1A) is used for primary UI actions and structural elements, creating a sharp, authoritative contrast.

**Subtle Warm Gold** (#C5A059) is used sparingly as an accent—reserved for authentication markers, active states, or rare high-value calls to action. **Muted Stone Gray** (#E5E1DA) provides a secondary layer for surfaces and containers, ensuring that UI elements remain distinct without breaking the monochromatic harmony. Text should always utilize the **Near-black** (#121212) value to ensure optimal legibility against the ivory backdrop.

## Typography
This design system employs a classic high-contrast pairing. **Bodoni Moda** is the primary display face, used for headlines and titles to convey a sense of heritage and editorial authority. It should be set with tight leading and slight negative tracking in larger sizes to emphasize its verticality.

**Inter** handles all functional UI and body copy. It is chosen for its systematic neutrality, ensuring that metadata and descriptions remain legible and unobtrusive. Use `label-caps` for category headers and overlines to create a clear informational hierarchy. Avoid bolding the serif face; instead, use scale to communicate importance.

## Layout & Spacing
The layout philosophy follows a **Fixed-Fluid Hybrid Grid**. Content is constrained to a maximum width of 1440px to maintain line length readability, but background elements and immersive artwork containers should bleed to the edges of the viewport.

A 12-column grid is used for desktop, while a 4-column grid is used for mobile. Spacing is governed by a strict 8px baseline. Use exaggerated margins (64px+) on desktop to create the "editorial" feel, pushing the content toward the center to create a sense of focused observation. Negative space should be treated as a physical border around the "objects" on the screen.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layering** rather than traditional shadows. To maintain the premium, flat-printed look of a luxury magazine, avoid heavy dropshadows.

1. **Base:** Warm Ivory (#F9F7F2) represents the primary "paper" surface.
2. **Elevated Surfaces:** Use Stone Gray (#E5E1DA) for cards or secondary containers.
3. **Overlays:** For modals or menus, use the Primary Charcoal (#1A1A1A) with 95% opacity or a Backdrop Blur effect on the Ivory surface to create a "glassine" paper overlap.
4. **Interactive State:** When an item is pressed, it should not rise; instead, use a subtle inner stroke or a slight shift in background saturation to indicate a physical "depression."

## Shapes
The shape language is primarily **Sharp (0px)**. This reinforces the architectural and institutional feel of a gallery. 

- **Images:** All artwork and photography containers must have 0px radius corners to mimic framed canvases.
- **Buttons:** Sharp corners for a formal, assertive look.
- **Exceptions:** Artist avatars are strictly circular (50% radius) to provide a soft organic contrast to the rigid grid, making human elements feel approachable within the structured environment.

## Components

### Buttons
Primary buttons are solid Charcoal (#1A1A1A) with Ivory text, sharp corners, and `label-caps` typography. Secondary buttons use a 1px Charcoal stroke with no fill. The hover state for primary buttons involves a transition to the Accent Gold (#C5A059).

### Immersive Containers
Artwork should be displayed in full-bleed or large-format containers with a "Frame" effect: a 1px border of Stone Gray (#E5E1DA) with a 16px internal padding (the "matte") before the image begins.

### Navigation
The navigation bar is minimal and persistent. It should use a transparent background that transitions to a solid Ivory on scroll. Links are set in `label-sm` with a simple underline for active states.

### Input Fields
Inputs are represented by a single 1px bottom border (Charcoal). Labels should be positioned above the line in `label-caps`. Focus states are indicated by the line thickening to 2px.

### Chips & Metadata
Metadata (dates, mediums, locations) should be styled as "ghost chips"—no background, 1px Stone Gray border, and `label-sm` text. This ensures they provide info without competing with the artwork.

### Social Icons
Use 1px weight linear icons. Icons should never be filled; use a simple color change (Charcoal to Gold) for active/liked states.