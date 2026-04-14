# Design System Documentation: Editorial Vitality

## 1. Overview & Creative North Star: "The Vitality Gallery"
This design system rejects the "utilitarian health app" aesthetic in favor of a high-end editorial experience. Our Creative North Star is **The Vitality Gallery**. 

Most health-tech interfaces feel clinical or overly engineered. We move in the opposite direction: treating health data as curated art. This system prioritizes breathing room, intentional asymmetry, and a sense of "weightless depth." By leveraging massive typographic scales and organic layering, we create an environment that feels as restorative as the lifestyle choices it encourages. We don't just display data; we frame it.

---

## 2. Colors: The Tonal Landscape
We use color not just for branding, but to define the architecture of the screen.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined solely through background color shifts. 
- Use `surface_container_low` sections sitting on a `surface` background to define structural blocks.
- Transition from `surface` to `surface_container_highest` to draw focus to high-priority interaction zones.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine paper. 
1.  **Canvas:** `surface` (#f7f9fb)
2.  **Structural Zones:** `surface_container_low` (#f2f4f6)
3.  **Floating Elements (Cards):** `surface_container_lowest` (#ffffff)

### The Glass & Gradient Rule
To avoid a "flat" SaaS appearance, all primary CTAs should utilize a subtle linear gradient from `primary` (#006e2f) to `primary_container` (#22c55e). For floating navigation or over-content modals, use Glassmorphism:
- **Background:** `surface` at 70% opacity.
- **Effect:** `backdrop-blur: 24px`.
- This ensures the "energetic" green and "trustworthy" blue bleed through the interface, keeping the experience feeling alive.

---

## 3. Typography: Editorial Authority
We pair the geometric precision of **Manrope** with the functional clarity of **Inter**.

- **Display & Headlines (Manrope):** These are our "editorial voice." Use `display-lg` and `headline-lg` with generous leading and occasional asymmetrical tracking to break the grid. This creates an authoritative, premium feel.
- **Body & Labels (Inter):** Reserved for data and instruction. Inter provides the "Trustworthy" pillar, ensuring that even complex health metrics remain legible and calm.

**Hierarchy Note:** Use `on_surface_variant` (#3d4a3d) for secondary body text to maintain a soft contrast that reduces eye strain, reserving `on_surface` (#191c1e) for primary headlines.

---

## 4. Elevation & Depth: Tonal Layering
Depth in this system is achieved through "Tonal Stacking" rather than traditional drop shadows.

### The Layering Principle
- **Base:** `surface`
- **Raised:** `surface_container_low`
- **Prominent:** `surface_container_highest`
By stacking these, you create a soft, natural lift that feels integrated into the environment.

### Ambient Shadows
When a "floating" effect is required (e.g., a primary action card), use an **Ambient Shadow**:
- **Color:** A tinted version of `on_surface` (e.g., #191c1e at 6% opacity).
- **Blur:** Minimum `48px` to `64px`.
- **Offset:** `Y: 16px`.
This mimics natural, diffused light rather than a harsh digital "drop shadow."

### The "Ghost Border" Fallback
If a border is absolutely required for accessibility, it must be a **Ghost Border**: use `outline_variant` at 15% opacity. Never use 100% opaque borders.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `on_primary` text, and `full` roundedness. 
- **Secondary:** `secondary_container` background with `on_secondary_container` text.
- **Tertiary:** No background, `primary` text, `title-sm` weight.

### Cards (The "Vitality" Card)
- **Style:** Background `surface_container_lowest`, corner radius `xl` (3rem), and an Ambient Shadow.
- **Constraint:** Forbid the use of divider lines. Use `spacing.lg` to separate content blocks within the card.

### Input Fields
- **Style:** Background `surface_container_low`, roundedness `md` (1.5rem). 
- **Interaction:** On focus, the background shifts to `surface_container_lowest` with a 2px `primary` Ghost Border.

### Signature Component: The Metric Orb
For health-tech context, use the `secondary` (#005fae) color in a soft, blurred glow behind key metrics (like heart rate or calorie counts) to symbolize energy and focus.

---

## 6. Do's and Don'ts

### Do
- **Do** use intentional white space. If you think there's enough space, add 16px more.
- **Do** use `xl` (3rem) and `lg` (2rem) corner radii for large containers to emphasize the "helpful and energetic" personality.
- **Do** use "Manrope" for all numbers in data visualizations to maintain the editorial look.

### Don't
- **Don't** use 1px dividers. Ever. Use a background color shift or a `1rem` gap.
- **Don't** use pure black (#000000) for shadows or text. It breaks the "Soft Minimalist" atmosphere.
- **Don't** use the `primary` color for error states. Always use the `error` (#ba1a1a) and `error_container` tokens for clarity.
- **Don't** crowd the center. This system thrives on a centered but spacious layout; give the content room to "breathe" out toward the margins.