---
layout: site.njk
title: Layers
eleventyNavigation:
  title: Layers
  parent: docs
  order: 30
---

KeymapKit supports multiple layers in keyboard layouts, allowing you to define different key mappings that can be switched between. This is useful for creating layouts with function layers, number layers, or any other key groupings.

## Layer Entry Keys

Layer entry keys are special keys that can switch between different layers. These keys are highlighted in purple to indicate their function and help users understand which keys can be used to access different layers.

To define layer entry keys, use the `layerEntryKeys` parameter when creating a layer:

```javascript
KeymapLayer.fromKeyList({
  displayName: "Second Layer",
  shortName: "Second",
  welcome: ["Welcome to the second layer"],
  layerEntryKeys: ["key-id-1"], // These keys will be highlighted in purple
  keys: [
    // ... key definitions
  ],
});
```

## Example: Layer Entry Keys

Here's an example layout that demonstrates layer entry key functionality:

<div id="layer-test-container"></div>

<script type="module">
  import { KeymapTitleScreenLayoutLayerTest } from "/KeymapKit/keymaps/title-screen-layout-layertest.js";
  const container = document.getElementById("layer-test-container");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setModelsAndMaps([KeymapTitleScreenLayoutLayerTest]);
  container.appendChild(keymapUi);
</script>

{% importcode "static/keymaps/title-screen-layout-layertest.js", "javascript" %}

## Layer Entry Colors Override Others

Note that the layer entry color overrides other colors,
including orange key selection groups and green key indicators.
