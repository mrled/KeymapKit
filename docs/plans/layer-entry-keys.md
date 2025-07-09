# Implementation Plan: Layer Entry Key Functionality

## Overview

This plan outlines the implementation of layer entry key functionality for KeymapKit, allowing layers to identify and visually highlight keys that can enter the layer. The implementation follows the existing architectural pattern used for selected key management, where `keymap-ui` centrally handles visual state after keyboard rendering.

## Requirements Summary

1. **Layer Entry Key Functionality**: Add ability for layers to identify keys that can enter the layer via a list of key IDs
2. **Purple Color Scheme**: Use existing CSS variables for layer key colors in both light and dark modes
3. **No Diagram Lines**: Visual distinction through color only, no diagram connections needed
4. **Clean Architecture**: Follow existing patterns without modifying keyboard models

## Architectural Approach

### Key Insight: Follow Selected Key Pattern

The system already has a clean pattern for managing key visual state:

1. **keymap-ui** switches layers and renders keyboard
2. **After rendering**, keymap-ui finds key elements and updates their attributes
3. **CSS** handles styling based on attributes

This same pattern will be used for layer entry keys, avoiding the need to modify any keyboard models.

### Current System Analysis

#### Layer Architecture

- **KeymapLayer**: Core layer class containing `displayName`, `shortName`, `welcome`, and key mappings
- **KeymapLayout**: Contains multiple layers with validation and metadata
- **State Management**: Layer switching handled through `KeymapUIState` with URL synchronization
- **UI Components**: Layer tabs in `keymap-navbar.ts` for layer switching

#### Key Management Pattern (Existing)

- **Selected Keys**: keymap-ui finds key elements by ID and sets `selected="true"` attribute
- **Timing**: Visual updates happen after keyboard rendering is complete
- **DOM Access**: keymap-ui can query and modify any rendered key element
- **CSS Styling**: Attributes drive visual appearance through CSS selectors

#### Key Identification System

- **Key ID Format**: `{boardId}-{x}-{y}` (e.g., `l-f-8-3`, `r-t-1-1`)
- **Physical Keys**: Defined in keyboard models with boardId and grid coordinates
- **KeymapKey**: Layer-specific key definitions with name, info, legends, and selection arrays
- **Validation**: Robust key ID validation and error handling throughout system

#### Current Color System

- **CSS Variables**: Comprehensive color system in `vars.css` with light/dark mode support
- **Key Colors**: Existing variables for normal, active, hover, focus, and diagram target states
- **Pattern**: Light backgrounds with dark text (light mode), dark backgrounds with light text (dark mode)

## Implementation Approach

### 1. Layer Entry Key Data Structure

**Modify KeymapLayer class** (`/home/callista/work/KeymapKit1/models/src/lib/Layout.ts`):

```typescript
export class KeymapLayer {
  constructor(
    readonly displayName: string,
    readonly shortName: string,
    readonly welcome: string,
    readonly keymap: Map<string, KeymapKey>,
    readonly layerEntryKeys?: string[], // NEW: Optional array of key IDs
  ) {}

  // Update fromKeyList method to accept layerEntryKeys parameter
  static fromKeyList(
    displayName: string,
    shortName: string,
    welcome: string,
    keys: KeymapKey[],
    layerEntryKeys?: string[], // NEW: Optional parameter
  ): KeymapLayer {}
}
```

**Benefits of this approach**:

- Clean separation of concerns (layer-level metadata)
- Easy to specify a list of key IDs
- Doesn't complicate the KeymapKey class
- Follows existing patterns for layer properties
- Optional parameter maintains backward compatibility

### 2. CSS Variables for Layer Key Colors

**Use existing purple colors from vars.css** (`/home/callista/work/KeymapKit1/ui/src/styles/vars.css`):

The purple color variables are already available:

```css
--_key-layer-bg: #f3e8ff; /* Light purple background */
--_key-layer-border: #a855f7; /* Medium purple border */
--_key-layer-hover-bg: #e9d5ff; /* Slightly darker hover */
```

With dark mode variants already defined. No changes needed to vars.css.

### 3. Layer Entry Key Detection Logic (New Approach)

**Central Management in keymap-ui** following the selected key pattern:

**Location**: `ui/src/webcomponents/keymap-ui.ts`

```typescript
// After keyboard rendering, update layer entry key attributes
updateLayerEntryKeys() {
  if (!this.layout || !this.state.layer) return;

  // Find all rendered key elements
  const keyElements = this.shadowRoot?.querySelectorAll('keymap-key') || [];

  keyElements.forEach(keyElement => {
    const keyId = keyElement.getAttribute('id');
    if (!keyId) return;

    // Check if this key is a layer entry key for OTHER layers (not current)
    const isLayerEntryKey = this.layout.layers.some(layer =>
      layer !== this.state.layer &&
      layer.layerEntryKeys &&
      layer.layerEntryKeys.includes(keyId)
    );

    // Set attribute for CSS styling
    keyElement.setAttribute('layer-entry-key', isLayerEntryKey.toString());
  });
}
```

**Trigger points** (when to call `updateLayerEntryKeys()`):

- After layer changes and keyboard re-renders
- After keyboard initial render
- Same timing as existing selected key updates

### 4. CSS Attribute-Based Styling

**Add to keygrid.css** (`/home/callista/work/KeymapKit1/ui/src/styles/keygrid.css`):

```css
keymap-key[layer-entry-key="true"] {
  background-color: var(--_key-layer-bg);
  border-color: var(--_key-layer-border);
}

keymap-key[layer-entry-key="true"]:hover {
  background-color: var(--_key-layer-hover-bg);
}
```

**Benefits of attribute-based styling**:

- Follows existing `selected="true"` pattern
- No class management needed
- Clear separation between logic and presentation
- Easy to debug in DevTools

### 5. No Keyboard Model Changes Required

**Key insight**: Keyboard models remain completely unchanged because:

- They just render keys with their IDs (existing behavior)
- keymap-ui finds these key elements after rendering (existing pattern)
- keymap-ui sets attributes based on layout data (existing pattern)
- CSS handles visual styling (existing pattern)

This approach maintains clean separation of concerns and doesn't require modifying any keyboard implementations.

### 6. Layout Definition Usage

See `layout.md` for an example of how this will work.

## Implementation Steps

### Phase 1: Core Data Structure

1. **Modify KeymapLayer class** to accept `layerEntryKeys` parameter
2. **Update constructor and fromKeyList method** to handle the new parameter
3. **Add validation** to ensure layer entry key IDs exist in the keyboard model
4. **Update TypeScript types** and interfaces as needed

### Phase 2: CSS Styling

1. **Add CSS attribute selectors** for layer entry key styling in `keygrid.css` (purple colors already exist in vars.css)
2. **Ensure layer-entry-key attribute** is added to `observedAttributes` in `keymap-key.ts`

### Phase 3: Central Layer Entry Key Management

1. **Add updateLayerEntryKeys method** to `keymap-ui.ts` following selected key pattern
2. **Call updateLayerEntryKeys** after layer changes and keyboard re-renders
3. **Integrate with existing rendering lifecycle** (same timing as selected key updates)

### Phase 4: Testing and Verification

1. **Use existing test layout** in `www/static/keymaps/title-screen-layout-layertest.js`
   - Already has 2 layers with with a layer entry key for the second layer
   - Already demonstrates the "only purple on target layer" behavior
   - Look specifically at the second layer when testing, which is the only layer with a layer entry key
2. **Use existing documentation** in `www/content/docs/layers.md`
   - Already has layer entry key documentation and live demo
3. **Test using live development server** at `https://keymapkit1.chineseroom.micahrl.com/KeymapKit/docs/layers/`
   - Development server auto-reloads with changes
   - Use Playwright MCP to interact with the live site

## Technical Considerations

### Validation

- Layer entry key IDs must exist in the keyboard model
- Validation should occur during layout construction
- Error messages should be clear and helpful (console.log is sufficient)

### Performance

- Layer entry key detection runs after each layer change
- Efficient DOM querying using existing patterns
- No performance impact on keyboard models

### Maintainability

- Zero changes to keyboard model implementations
- Follows existing architectural patterns
- Easy to debug with attribute-based styling

## Files to Modify

1. **`/home/callista/work/KeymapKit1/models/src/lib/Layout.ts`** - Add layerEntryKeys to KeymapLayer ✅ (Already done)
2. **`/home/callista/work/KeymapKit1/ui/src/styles/keygrid.css`** - Add layer entry key CSS selectors ✅ (Already done)
3. **`/home/callista/work/KeymapKit1/ui/src/webcomponents/keymap-ui.ts`** - Add central layer entry key management
4. **`/home/callista/work/KeymapKit1/ui/src/webcomponents/keymap-key.ts`** - Add layer-entry-key to observedAttributes ✅ (Already done)

## Files Already Available for Testing

1. **`/home/callista/work/KeymapKit1/ui/src/styles/vars.css`** - Purple color variables ✅ (Already available)
2. **`/home/callista/work/KeymapKit1/www/static/keymaps/title-screen-layout-layertest.js`** - Test layout ✅ (Already available)
3. **`/home/callista/work/KeymapKit1/www/content/docs/layers.md`** - Documentation ✅ (Already available)

## Live Testing Environment

- **Development URL**: `https://keymapkit1.chineseroom.micahrl.com/KeymapKit/docs/layers/`
- **Auto-reload**: Changes are automatically reflected in the browser
- **Playwright MCP**: Available for automated testing and interaction

## Key Architectural Benefits

1. **Clean Separation**: Keyboard models focus solely on rendering, keymap-ui handles state
2. **Consistent Patterns**: Follows existing selected key management approach
3. **Zero Breaking Changes**: No modifications to existing keyboard implementations
4. **Maintainable**: All layer entry logic centralized in one location
5. **Extensible**: Easy to add future key state management using same pattern
