---
layout: site.njk
title: Empty UI Demo
eleventyNavigation:
  title: Empty UI
  parent: demos
  order: 3
---

This is a demo of the `@keymapkit/ui` without adding any models or layouts.

Toggle debug controls on all KeymapUI elements on this page:
<button onclick="toggleAllKeymapUiDebug()">Toggle Debug Controls</button>

<div id="app"></div>

<script type="module">
  import "@keymapkit/ui";
  const app = document.getElementById("app");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setAttribute("id", "keymap-empty");
  keymapUi.setAttribute("show-debug", "true");
  keymapUi.setAttribute("query-prefix", "keymap");
  keymapUi.setModelsAndMaps([]);
  app.appendChild(keymapUi);
</script>
