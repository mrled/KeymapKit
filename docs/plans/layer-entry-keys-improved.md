# Improve layer entry keys

This plan outlines enhancements to the layer entry key functionality implemented in PLAN.md, focusing on better visual feedback when layer entry keys are selected.

## Requirements Summary

1. **Selected Layer Entry Key Colors**: Add darker purple styling when a layer entry key is selected (both light and dark modes)
2. **Title Bar Color Synchronization**: Selected layer entry keys should use the same colors in the title bar
3. **Layer Selection Button Colors**: Use consistent purple colors for layer selection buttons when switching to layers with entry keys

## Current Implementation Analysis

### Existing Color Variables (from vars.css)

**Light Mode:**

- `--_key-layer-bg: #f3e8ff` - Light purple background
- `--_key-layer-border: #a855f7` - Medium purple border
- `--_key-layer-hover-bg: #e9d5ff` - Slightly darker hover

**Dark Mode:**

- `--_key-layer-bg: #581c87` - Dark purple background
- `--_key-layer-border: #a855f7` - Medium purple border
- `--_key-layer-hover-bg: #6b21a8` - Slightly lighter hover

### Current Layer Entry Key Styling (from keygrid.css)

```css
keymap-key[layer-entry-key="true"] {
  background-color: var(--_key-layer-bg);
  border: 1px solid var(--_key-layer-border);
  &:hover {
    background-color: var(--_key-layer-hover-bg);
  }
  &:focus {
    background-color: var(--_key-layer-hover-bg);
  }
}
```

### Current Layer Tab Styling (from keyInfoPanel.css)

Layer tab buttons currently use standard key colors:

- Normal: `--_key-bg`, `--_key-border`, `--_key-fg`
- Active: `--_key-active-bg`, `--_key-active-border` (orange)
- Hover: `--_key-hover-bg`, `--_key-active-hover-bg`

## Implementation Plan

### 1. Add Selected Layer Entry Key Color Variables

**Location**: `/home/callista/work/KeymapKit1/ui/src/styles/vars.css`

Add new CSS variables for selected layer entry keys:

```css
/* Light mode */
--_key-layer-selected-bg: #c084fc; /* Darker purple for selected state */
--_key-layer-selected-border: #7c3aed; /* Even darker purple border */
--_key-layer-selected-hover-bg: #a855f7; /* Hover state for selected */

/* Dark mode */
--_key-layer-selected-bg: #7c3aed; /* Lighter purple for selected state */
--_key-layer-selected-border: #a855f7; /* Medium purple border */
--_key-layer-selected-hover-bg: #8b5cf6; /* Hover state for selected */
```

### 2. Update Layer Entry Key Styling

**Location**: `/home/callista/work/KeymapKit1/ui/src/styles/keygrid.css`

Add new CSS rules for selected layer entry keys (should come after existing layer-entry-key rules):

```css
/* Selected layer entry keys get darker purple colors */
keymap-key[layer-entry-key="true"][selected="true"] {
  background-color: var(--_key-layer-selected-bg);
  border: 1px solid var(--_key-layer-selected-border);
  &:hover {
    background-color: var(--_key-layer-selected-hover-bg);
  }
  &:focus {
    background-color: var(--_key-layer-selected-hover-bg);
  }
}
```

**CSS Specificity Note**: The combined selector `[layer-entry-key="true"][selected="true"]` has higher specificity than individual attribute selectors, ensuring selected layer entry keys override the base layer entry key styling.

### 3. Update Layer Tab Button Styling

**Location**: `/home/callista/work/KeymapKit1/ui/src/styles/keyInfoPanel.css`

Replace the existing layer tab button styling to always use purple colors:

```css
/* Layer tab buttons always use purple colors instead of orange */
li.layer-tab button.layer-tab-button {
  /* Style like keys */
  padding: 0.25rem 0.5rem;
  border-radius: 0.125rem;
  font-family: var(--_key-legend-font);
  color: var(--_key-fg);
  background-color: var(--_key-layer-bg);
  border: 1px solid var(--_key-layer-border);
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: var(--_key-layer-hover-bg);
  }
  &:focus {
    background-color: var(--_key-layer-hover-bg);
  }
}

/* Active layer tab buttons use selected purple colors */
li.layer-tab button.layer-tab-button.active {
  background-color: var(--_key-layer-selected-bg);
  border-color: var(--_key-layer-selected-border);

  &:hover {
    background-color: var(--_key-layer-selected-hover-bg);
  }
  &:focus {
    background-color: var(--_key-layer-selected-hover-bg);
  }
}
```

### 4. No JavaScript Changes Required

**Location**: `/home/callista/work/KeymapKit1/ui/src/webcomponents/keymap-navbar.ts`

No changes are needed to the navbar component logic. The existing layer tab button creation code will automatically pick up the new purple styling through CSS. The buttons will use purple colors by default, and the `active` class will apply the selected purple colors.

### 5. Title Bar Color Synchronization

**Location**: `/home/callista/work/KeymapKit1/ui/src/webcomponents/keymap-keyboard-title-bar.ts`

The title bar keyboard already inherits the same CSS styling as the main keyboard. When a layer entry key is selected, it will automatically get the combined `[layer-entry-key="true"][selected="true"]` styling, providing consistent colors.

**No additional changes needed** - the existing CSS cascade will handle this automatically.

## Implementation Priority

### Phase 1: Core Color Variables

1. Add new selected layer entry key color variables to `vars.css`
2. Test color contrast and accessibility in both light and dark modes

### Phase 2: Layer Entry Key Selection Styling

1. Add combined selector CSS rules to `keygrid.css`
2. Test with existing layer entry key functionality

### Phase 3: Layer Tab Button Enhancement

1. Replace existing layer tab button CSS with purple color styling
2. Test layer switching with visual feedback

### Phase 4: Integration Testing

1. Test complete flow: switch to layer with entry keys → select layer entry key → observe consistent colors
2. Test title bar synchronization
3. Test in both light and dark modes

## Technical Considerations

### Color Accessibility

- Ensure sufficient contrast ratios for WCAG compliance
- Test with users who have color vision deficiencies

### CSS Specificity

- Combined selectors `[layer-entry-key="true"][selected="true"]` have higher specificity than individual attributes
- Layer tab styling uses classes, allowing for easy override patterns
- Color variables enable consistent theming across components

### Performance

- Minimal performance impact - CSS changes only
- No additional DOM queries or JavaScript processing
- Leverages existing attribute-based styling patterns

## Files to Modify

1. **`/home/callista/work/KeymapKit1/ui/src/styles/vars.css`** - Add selected layer entry key color variables
2. **`/home/callista/work/KeymapKit1/ui/src/styles/keygrid.css`** - Add selected layer entry key styling
3. **`/home/callista/work/KeymapKit1/ui/src/styles/keyInfoPanel.css`** - Replace layer tab button styling with purple colors
4. **No JavaScript changes required** - existing logic will work with new CSS

## Testing Strategy

Use the existing test environment:

- **Test Layout**: `/home/callista/work/KeymapKit1/www/static/keymaps/title-screen-layout-layertest.js`
- **Documentation**: `/home/callista/work/KeymapKit1/www/content/docs/layers.md`
- **Live URL**: `https://keymapkit1.chineseroom.micahrl.com/KeymapKit/docs/layers/`

**Test Scenarios**:

1. Switch between layers → observe all layer tab buttons use purple colors (no orange)
2. Click layer entry key → observe selected state with darker purple
3. Check title bar key matches selected key colors
4. Test in both light and dark modes
5. Verify color consistency across all components

**Playwright MCP Testing**:
Use the MCP Playwright browser tools to automate testing:

```javascript
// Navigate to test page
await mcp__playwright__browser_navigate({
  url: "https://keymapkit1.chineseroom.micahrl.com/KeymapKit/docs/layers/",
});

// Take screenshot to verify layer tab colors
await mcp__playwright__browser_take_screenshot({
  filename: "layer-tabs-purple.png",
});

// Click on different layer tabs to test color transitions
await mcp__playwright__browser_click({
  element: "layer tab button",
  ref: "button.layer-tab-button",
});

// Test layer entry key selection
await mcp__playwright__browser_click({
  element: "layer entry key",
  ref: "keymap-key[layer-entry-key='true']",
});
```

## Key Benefits

1. **Visual Consistency**: All layer entry key related elements use the same purple color family
2. **Enhanced UX**: Clearer visual feedback when layer entry keys are selected
3. **Accessibility**: Maintains existing contrast ratios while adding visual distinction
4. **Maintainability**: Uses CSS variables for easy theme customization
5. **Zero Breaking Changes**: Additive changes only, no modifications to existing functionality
