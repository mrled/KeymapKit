---
layout: site.njk
title: ErgoDox Demo
eleventyNavigation:
  title: ErgoDox
  parent: demos
  order: 5
---

This is a demo of `@keymapkit/ui` showing an ErgoDox keyboard with my layout.

Toggle debug controls on all KeymapUI elements on this page:
<button onclick="toggleAllKeymapUiDebug()">Toggle Debug Controls</button>

<div id="app"></div>

<script type="module">
  import "@keymapkit/ui";
  import "@keymapkit/keyboard.ergodox";
  import { MicahErgodoxLayout } from "@keymapkit/examples";
  const app = document.getElementById("app");
  const keymapUi = document.createElement("keymap-ui");
  const availableKeymaps = [MicahErgodoxLayout];
  keymapUi.setAttribute("id", "keymap-title");
  keymapUi.setAttribute("show-debug", "true");
  keymapUi.setAttribute("query-prefix", "keymap");
  keymapUi.setModelsAndMaps(availableKeymaps);
  app.appendChild(keymapUi);
</script>
