---
layout: site.njk
title: Multiple Boards Demo
eleventyNavigation:
  title: Multiple Boards
  parent: demos
  order: 4
---

This is a demo of `@keymapkit/ui` with a bunch of different layouts and models to choose from --
more than most normal sites would use.

Toggle debug controls on all KeymapUI elements on this page:
<button onclick="toggleAllKeymapUiDebug()">Toggle Debug Controls</button>

<div id="app"></div>

<script type="module">
  import { KeymapTitleScreenLayoutSimple } from "/KeymapKit/keymaps/title-screen-layout-simple.js";
  import { KeymapTitleScreenLayoutManyLayer } from "/KeymapKit/keymaps/title-screen-layout-manylayer.js";
  import { Planck48ExampleLayout } from "/KeymapKit/keymaps/planck48-example-layout.js";
  import "@keymapkit/keyboard.ergodox";
  import { MicahErgodoxLayout } from "@keymapkit/examples";
  const app = document.getElementById("app");
  const keymapUi = document.createElement("keymap-ui");
  const availableKeymaps = [
    Planck48ExampleLayout,
    Planck48ExampleLayout.model.blankKeymap,
    KeymapTitleScreenLayoutSimple,
    KeymapTitleScreenLayoutSimple.model.blankKeymap,
    KeymapTitleScreenLayoutManyLayer,
    KeymapTitleScreenLayoutManyLayer.model.blankKeymap,
    MicahErgodoxLayout,
    MicahErgodoxLayout.model.blankKeymap,
  ];
  keymapUi.setAttribute("id", "keymap-title");
  keymapUi.setAttribute("show-debug", "true");
  keymapUi.setAttribute("query-prefix", "keymap");
  keymapUi.setModelsAndMaps(availableKeymaps);
  keymapUi.setAttribute("keymap-id", "title-screen-map-simple");
  app.appendChild(keymapUi);
</script>
