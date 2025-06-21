---
layout: site.njk
title: Title Screen Demo
eleventyNavigation:
  title: Title Screen
  parent: demos
  order: 1
---

This is a demo of `@keymapkit/ui` with the example title screen keyboard model.

Toggle debug controls on all KeymapUI elements on this page:
<button onclick="toggleAllKeymapUiDebug()">Toggle Debug Controls</button>

<div id="app"></div>

<script type="module">
  import { KeyboardModelTitleScreen } from "/KeymapKit/keymaps/title-screen-keyboard.js";
  import { KeymapTitleScreenLayoutSimple } from "/KeymapKit/keymaps/title-screen-layout-simple.js";
  const app = document.getElementById("app");
  const keymapUi = document.createElement("keymap-ui");
  const availableKeymaps = [KeymapTitleScreenLayoutSimple];
  keymapUi.setAttribute("id", "keymap-title");
  keymapUi.setAttribute("show-debug", "true");
  keymapUi.setAttribute("query-prefix", "keymap");
  keymapUi.setModelsAndMaps(availableKeymaps);
  app.appendChild(keymapUi);
</script>
