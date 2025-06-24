---
layout: site.njk
title: Installation
eleventyNavigation:
  title: Installation
  parent: docs
  order: 10
---

To install the web components and the Planck keyboard, run:

```sh
npm install @keymapkit/ui @keymapkit/keyboard.planck
```

From there, you can show an empty layout to make sure it works in your web page:

```html
<div id="example-container"></div>

<script type="module">
  import { KeyboardModelPlanck48 } from "/KeymapKit/keymaps/planck48-example-layout.js";
  const container = document.getElementById("example-container");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setModelsAndMaps([KeyboardModelPlanck48.keyboardModel.blankKeymap]);
  container.appendChild(keymapUi);
</script>
```

<div id="example-container"></div>

<script type="module">
  import { KeyboardModelPlanck48 } from "@keymapkit/keyboard.planck48";
  const container = document.getElementById("example-container");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setModelsAndMaps([KeyboardModelPlanck48.blankKeymap]);
  container.appendChild(keymapUi);
</script>

Once you see that, everything is working.
Now all you have to do is define a layout.
