# Page-Controllable Color Scheme

## Problem Statement

Currently, the KeymapKit UI relies solely on `prefers-color-scheme: dark` media queries to enable dark mode. This makes it impossible for embedding websites to programmatically control the color scheme of the keymap-ui component, which is essential for:

1. **Page-Level Theme Control**: Websites with their own theme toggles want to control the keymap color scheme
2. **User Preference Override**: Users should be able to override system preferences for specific widgets
3. **Consistent UX**: The keymap should match the containing page's theme, not the system theme
4. **Themable**: Websites should be able to override both dark and light theme colors

## Current Implementation Analysis

### Existing Color System

- **CSS Variables**: Uses `--_key-fg`, `--_key-bg`, etc. with user-overridable fallbacks
- **Media Query**: `@media (prefers-color-scheme: dark)` redefines all color variables
- **Shadow DOM**: Styles are encapsulated in shadow DOM with concatenated CSS
- **No Attribute Control**: No HTML attributes for color scheme control

### Architecture Strengths

- Well-organized CSS variable system with override capability
- Clean shadow DOM encapsulation

## Solutions: CSS Data Attributes with Property Switching

**Approach**: Use CSS data attributes with property switching for cleaner conditional styling.

**Implementation Strategy**:

1. Add `color-scheme` attribute that sets `data-color-scheme` on the host
2. Use CSS attribute selectors with custom property switches
3. Leverage CSS `var()` function for conditional values

**CSS Architecture**:

```css
:host {
  --_light-key-fg: var(--light-key-fg, oklch(11.6% 0.017 259.7));
  --_light-key-bg: var(--light-key-bg, oklch(96.7% 0.003 264.5));
  --_dark-key-fg: var(--dark-key-fg, oklch(96.7% 0.003 264.5));
  --_dark-key-bg: var(--dark-key-bg, oklch(37.3% 0.031 259.7));

  /* Default to system preference */
  --_key-fg: var(--_light-key-fg);
  --_key-bg: var(--_light-key-bg);
}

/* System dark mode (when no override) */
@media (prefers-color-scheme: dark) {
  :host:not([data-color-scheme]) {
    --_key-fg: var(--_dark-key-fg);
    --_key-bg: var(--_dark-key-bg);
  }
}

/* Explicit dark mode */
:host([data-color-scheme="dark"]) {
  --_key-fg: var(--_dark-key-fg);
  --_key-bg: var(--_dark-key-bg);
}

/* Explicit light mode */
:host([data-color-scheme="light"]) {
  --_key-fg: var(--_light-key-fg);
  --_key-bg: var(--_light-key-bg);
}
```

**Pros**:

- Clean separation of light/dark values
- No CSS duplication
- Easy to maintain and extend
- Clear data attribute semantics

**Cons**:

- Requires restructuring existing color variable definitions
- More verbose CSS initially

## Implementation Plan

1. Restructure `ui/src/styles/vars.css` to support attribute-based color scheme control

## Testing

1. Use <https://keymapkit1.chineseroom.micahrl.com/KeymapKit/docs/color-scheme/> to test that things are working properly.
2. Use Playwright MCP to connect to that URL. It is automatically running code from this checkout, but you will have to reload the page yourself if you make a change for it to update once its been loaded (no hot reloading).
