---
layout: site.njk
title: Simple Keymap
eleventyNavigation:
  title: Simple Keymap
  parent: docs
  order: 20
---

To set up a new keymap for an existing keyboard,
you need to create a new `KeymapLayout`.
Here's a very simple example of a Planck layout that only populates a few keys.

{% importcode "static/keymaps/planck48-example-layout.js", "javascript" %}

You can then use it on a web page like this:

```html
<div id="example-container"></div>

<script type="module">
  import { Planck48ExampleLayout } from "/KeymapKit/keymaps/planck48-example-layout.js";
  const container = document.getElementById("example-container");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setModelsAndMaps([Planck48ExampleLayout]);
  container.appendChild(keymapUi);
</script>
```

Which looks like this:

<div id="example-container"></div>

<script type="module">
  import { Planck48ExampleLayout } from "/KeymapKit/keymaps/planck48-example-layout.js";
  const container = document.getElementById("example-container");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setModelsAndMaps([Planck48ExampleLayout]);
  container.appendChild(keymapUi);
</script>
