---
layout: site.njk
demo: true
title: Planck Demo
eleventyNavigation:
  title: Planck
  parent: demos
  order: 2
---

This is a demo of `@keymapkit/ui` with the Planck 48 keyboard model.

We just use a demo layout to show you the board.

Toggle debug controls on all KeymapUI elements on this page:
<button onclick="toggleAllKeymapUiDebug()">Toggle Debug Controls</button>

<div id="app"></div>

<script type="module">
  import { Planck48ExampleLayout } from "/KeymapKit/keymaps/planck48-example-layout.js";
  const app = document.getElementById("app");
  const keymapUi = document.createElement("keymap-ui");
  const availableKeymaps = [Planck48ExampleLayout];
  keymapUi.setAttribute("id", "keymap-title");
  keymapUi.setAttribute("show-debug", "true");
  keymapUi.setAttribute("query-prefix", "keymap");
  keymapUi.setModelsAndMaps(availableKeymaps);
  app.appendChild(keymapUi);
</script>
