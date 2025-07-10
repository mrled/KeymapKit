# Relative Color Conversion Specification

## Overview

Convert existing hardcoded OKLCH colors to use CSS relative color syntax to create consistent color relationships and make the color system more maintainable.

## Background

Currently, all colors in `ui/src/styles/vars.css` are defined as hardcoded OKLCH values. CSS relative color syntax allows us to define colors relative to a base color by manipulating specific color channels (lightness, chroma, hue). This creates more predictable color relationships and makes the system easier to maintain and modify.

## Technical Requirements

### CSS Relative Color Syntax

Use the format: `oklch(from <base-color> <lightness> <chroma> <hue>)`

Examples:

- `oklch(from var(--base-color) calc(l - 0.1) c h)` - darken by 10%
- `oklch(from var(--base-color) l calc(c * 0.5) h)` - reduce chroma by 50%
- `oklch(from var(--base-color) l c h / 0.8)` - add 80% opacity

### Color Groups to Convert

Process both light and dark mode variants for each group:

#### Group 1: Base Key Colors

**Base color**: `key-bg` (background color for normal keys)

- `key-bg` - Base color (keep as-is)
- `key-border` - Darker border version of key-bg
- `key-hover-bg` - Slightly darker hover state
- `key-focus-bg` - Focus state (similar to hover but distinct)

**Current values (light mode)**:

- `key-bg`: `oklch(95.9% 0.009 247.9)`
- `key-border`: `oklch(74.6% 0.03 254.7)`
- `key-hover-bg`: `oklch(86.9% 0.019 250.6)`
- `key-focus-bg`: `oklch(92.9% 0.013 255.5)`

#### Group 2: Active Key Colors

**Base color**: `key-active-bg` (background for actively selected keys)

- `key-active-bg` - Base color (keep as-is)
- `key-active-border` - Darker border version
- `key-active-hover-bg` - Darker hover state
- `key-active-focus-bg` - Focus state
- `diagram-line-selected-color` - Related diagram line color (relative to key-active-bg)

**Current values (light mode)**:

- `key-active-bg`: `oklch(80.1% 0.134 68.8)`
- `key-active-border`: `oklch(57.9% 0.15 43.8)`
- `key-active-hover-bg`: `oklch(65.3% 0.164 48.4)`
- `key-active-focus-bg`: `oklch(76.7% 0.129 69)`
- `diagram-line-selected-color`: `oklch(88.6% 0.099 80.9 / 0.6)`

#### Group 3: Related Active Key Colors

**Base color**: `key-related-active-bg` (background for keys related to active selection)

- `key-related-active-bg` - Base color (keep as-is)
- `key-related-active-border` - Darker border version
- `key-related-active-hover-bg` - Darker hover state
- `key-related-active-focus-bg` - Focus state

**Current values (light mode)**:

- `key-related-active-bg`: `oklch(94.6% 0.05 82.8)`
- `key-related-active-border`: `oklch(72.4% 0.153 56.1)`
- `key-related-active-hover-bg`: `oklch(80.1% 0.134 68.8)`
- `key-related-active-focus-bg`: `oklch(88.9% 0.066 82.6)`

#### Group 4: Diagram Target Key Colors

**Base color**: `key-diagram-target-bg` (background for keys targeted by diagram)

- `key-diagram-target-bg` - Base color (keep as-is)
- `key-diagram-target-border` - Darker border version
- `key-diagram-target-hover-bg` - Darker hover state
- `key-diagram-target-focus-bg` - Focus state
- `diagram-line-textref-color` - Related diagram line color (relative to key-diagram-target-bg)

**Current values (light mode)**:

- `key-diagram-target-bg`: `oklch(93.1% 0.066 154.9)`
- `key-diagram-target-border`: `oklch(71% 0.143 154.5)`
- `key-diagram-target-hover-bg`: `oklch(78.6% 0.138 154.5)`
- `key-diagram-target-focus-bg`: `oklch(86.5% 0.082 153.7)`
- `diagram-line-textref-color`: `oklch(78.6% 0.138 154.5)`

#### Group 5: Layer Key Colors

**Base color**: `key-layer-bg` (background for layer toggle keys)

- `key-layer-bg` - Base color (keep as-is)
- `key-layer-border` - Darker border version
- `key-layer-hover-bg` - Darker hover state
- `key-layer-selected-bg` - Selected state
- `key-layer-selected-border` - Selected state border
- `key-layer-selected-hover-bg` - Selected state hover

**Current values (light mode)**:

- `key-layer-bg`: `oklch(94.6% 0.033 307.2)`
- `key-layer-border`: `oklch(62.7% 0.233 303.9)`
- `key-layer-hover-bg`: `oklch(86.6% 0.084 306.6)`
- `key-layer-selected-bg`: `oklch(78.7% 0.138 306.4)`
- `key-layer-selected-border`: `oklch(54.1% 0.247 293)`
- `key-layer-selected-hover-bg`: `oklch(67.9% 0.212 304.4 / 0.6)`

## Implementation Guidelines

### Step 1: Analyze Current Color Relationships

For each group, calculate the differences between base colors and their variants:

- Lightness differences (how much darker/lighter)
- Chroma differences (how much more/less saturated)
- Hue differences (color shifts)

### Step 2: Create Relative Color Definitions

1. Keep the base color of each group as a hardcoded value
2. Convert related colors to use relative color syntax based on the base
3. Apply the same conversion pattern to both light and dark mode variants

### Step 3: Common Patterns Expected

Based on the current values, expect these patterns:

- **Borders**: Generally darker (lower lightness) than backgrounds
- **Hover states**: Slightly darker than base backgrounds
- **Focus states**: Similar to hover but with subtle differences
- **Selected states**: More saturated (higher chroma) than base
- **Goal**: Make it easy to quickly try out different base colors by changing only the base color definitions

### Step 4: Validation Requirements

After conversion:

1. Visual comparison - colors should look identical before/after
2. Test both light and dark modes
3. Test all interactive states (hover, focus, active)
4. Ensure accessibility contrast ratios are maintained

### Step 5: Browser Compatibility

- Modern browsers only - no fallbacks needed
- CSS relative color syntax is supported

## File Changes Required

### Primary File

- `ui/src/styles/vars.css` - Convert color definitions for both light and dark modes
- **Important**: Only work with this file - do not look at any other files

## Testing Strategy

1. **Visual Testing**: Use <https://keymapkit1.chineseroom.micahrl.com/KeymapKit/docs/color-scheme/> to test
2. **Interactive Testing**: Test all hover/focus/active states on the test page
3. **Theme Testing**: Verify both light and dark modes work
4. **Reload Required**: Must manually reload the test page after making changes (no hot reloading)
5. **Playwright MCP**: Use Playwright MCP to connect to the test URL for automated testing

## Color Relationship Documentation

After conversion, document the mathematical relationships between base colors and their variants for future designers:

### Expected Patterns:

- **Borders**: Typically 15-25% darker (lower lightness) than base
- **Hover states**: 5-15% darker than base backgrounds
- **Focus states**: Similar to hover with potential chroma adjustments
- **Selected states**: Often higher chroma (more saturated) than base
- **Opacity**: Some colors use alpha transparency (e.g., /0.6, /0.8)

### Documentation Format:

For each converted color, document the transformation as comments in the CSS:

```css
/* Base: key-bg */
--_light-key-border: oklch(
  from var(--_light-key-bg) calc(l - 0.2) c h
); /* 20% darker */
--_light-key-hover-bg: oklch(
  from var(--_light-key-bg) calc(l - 0.1) c h
); /* 10% darker */
```

## Requirements Summary

1. **Modern browsers only** - No fallbacks needed
2. **No specific color relationships** - Colors should stay approximately what they are now
3. **Goal**: Make it easy to quickly try different base colors by changing only the base color definitions
4. **Must document relationships** for future designers
5. **Specific relationships**:
   - `diagram-line-textref-color` relative to `key-diagram-target-bg`
   - `diagram-line-selected-color` relative to `key-active-bg`

## Success Criteria

- All colors render identically to current implementation
- Color definitions are more maintainable and consistent
- Both light and dark modes work correctly
- All interactive states function properly
- Code is more readable and easier to modify
- Easy to experiment with different base colors by changing only base color definitions
