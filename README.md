# NOIRÉ — Skincare, Considered

A complete, production-quality luxury skincare landing page built from scratch with pure HTML5, CSS3, and Vanilla JavaScript.

Inspired by European editorial print art direction, quiet luxury cosmetic campaigns, and modern responsive ergonomics.

---

## 1. Creative Direction & Brand Identity

- **Brand Personality**: Quiet luxury, editorial beauty photography, refined and confident, feminine without being childish, minimal but visually rich.
- **Editorial Typography**: 
  - Display / Headlines: **Cormorant Garamond** (Google Fonts)
  - Interface / Body / Actions: **Manrope** (Google Fonts)
- **Harmonious Luxury Palette**:
  - Primary Background: `#F6F1E9` (Warm Canvas Cream)
  - Main Dark: `#251714` (Deep Espresso Noir)
  - Brand Burgundy: `#71333D` (Velvet Vintage Bordeaux)
  - Muted Rose: `#C7A6A0` (Dusky Rose Powder)
  - Secondary Cream: `#E8DED1` (Raw Linen & Travertine)
  - Pure White: `#FFFFFF`

---

## 2. Core Architecture & Implemented Features

1. **Header & Navigation**:
   - Refined desktop layout: Left-aligned NOIRÉ wordmark, centered navigation (`The Ritual`, `Ingredients`, `Our Philosophy`), subtle `Discover the Ritual` CTA, and interactive ritual bag indicator.
   - Dynamic scroll transition: Transparent over hero, seamlessly morphing into a blurred cream backdrop (`rgba(246, 241, 233, 0.94)`) with fine border on scroll.
   - Accessible mobile drawer menu with zero horizontal overflow, smooth slide transition, and keyboard escape handling.

2. **Hero Section**:
   - Asymmetric two-column editorial layout.
   - Left: Small uppercase label (`SKINCARE, CONSIDERED`), display headline (*"Less, but better."*), supporting narrative copy, primary CTA (`Explore the Collection`), and secondary link (`Our Philosophy`).
   - Right: Art-directed high-resolution luxury product bottle on warm limestone with editorial annotations (`01 / DAILY RITUAL` and botanical notes tag).

3. **Product Section ("Your everyday essentials.")**:
   - Three fictional skincare products in an editorial grid with 4:5 proportions and subtle hover scale:
     - `01 — The Gentle Cleanser` ($42)
     - `02 — The Daily Serum` ($68)
     - `03 — The Barrier Cream` ($58)
   - Interactive Quick-View Discovery Modal: Detailed formulation profiles, active ingredients, usage steps, and "Add to Ritual" trigger.
   - The Curated Daily Ritual Trio Box: Complete bundle offering with instant bag addition.

4. **Interactive Ritual Bag Drawer (Mini-Cart)**:
   - Full slide-out drawer with real-time state management.
   - Dynamic subtotal calculations, line-item quantity controls (`+` / `–`), and item removal.
   - Live shipping progress indicator with free express delivery threshold ($75).

5. **Philosophy Section ("Care, without the excess.")**:
   - Editorial manifesto layout paired with warm lifestyle ritual photography.
   - Two core principles: *Principle 01: Formula Restraint* and *Principle 02: Tactile Pleasure*.
   - Architectural stats highlighting recyclable glass and zero synthetic fillers.

6. **Ingredients Section ("Considered at molecular depth.")**:
   - Horizontal desktop triptych showcasing three active pillars in non-medical, responsible language:
     - **Niacinamide (Vitamin B3)**: Tone clarity & surface refinement.
     - **Hyaluronic Acid (Multi-Molecular)**: Deep moisture binding & suppleness.
     - **Ceramides (Bio-Identical Complex)**: Stratum corneum lipid defense.
   - Full Disclosure Policy banner with clean call-to-action.

7. **Final CTA & Comprehensive Footer**:
   - High-impact closing statement: *"Make room for your ritual."*
   - Interactive newsletter subscription form with real-time validation and positive confirmation feedback.
   - Concierge contact modal for routine consultations.
   - Complete legal dialogs (Privacy Directive, Terms of Service, Cookie Preferences) and Instagram placeholder (`@noireskincare`).

8. **Accessibility & Responsive Engineering**:
   - Accessible skip link (`#main-content`).
   - Fully responsive across 360px, 390px, 768px, 1024px, and 1440px+ without any horizontal scrolling.
   - Global `:focus-visible` styles and keyboard ESC handlers for all overlays.
   - Support for `prefers-reduced-motion: reduce`.

---

## 3. How to Run Locally

### Option A: Using Node.js (Recommended)
From the project folder, run:
```bash
npm start
```
Or directly:
```bash
node server.js
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Option B: Open Directly in Any Web Browser
Because NOIRÉ uses standard HTML5, CSS3, and Vanilla JavaScript with zero build steps or compilation requirements, you can also double-click [index.html](file:///c:/Users/Mariam/OneDrive/Desktop/NOIR%C3%89/index.html) or open it directly in Chrome, Safari, Edge, or Firefox.
