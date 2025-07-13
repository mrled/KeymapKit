---
layout: site.njk
title: ErgoDox & Advantage360
eleventyNavigation:
  title: ErgoDox & Advantage360
  parent: keyboards
  order: 55
---

These two similar boards are good examples of more complex board layouts.

## The ErgoDox

The [ErgoDox](https://github.com/mrled/KeymapKit/tree/master/keyboard.ergodox)
contains examples of more complex layouts than the
[Planck](https://github.com/mrled/KeymapKit/tree/master/keyboard.planck48).

Here's what it looks like:

<div id="ergodox-container"></div>

<script type="module">
  import { KeyboardModelErgodox } from "@keymapkit/keyboard.ergodox";
  const container = document.getElementById("ergodox-container");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setAttribute("query-prefix", "ergodox");
  keymapUi.setModelsAndMaps([KeyboardModelErgodox.blankKeymap]);
  container.appendChild(keymapUi);
</script>

A few key points:

- It includes CSS
  - All children of a given `<keymap-ui>` element use **the same shadow DOM**,
    so CSS in a keyboard affects all of it.
    (This is required to draw lines to the keyboard keys.)
- It uses multiple keygrids
  - `l-f`: Left finger grid
  - `l-t`: Left thumb grid
  - `r-f`: Right finger grid
  - `r-t`: Right thumb grid
  - Remember that key IDs are based on their grid name and position,
    so `l-f-1-1` and `r-f-1-1` are different keys.

## The Advantage360

The [Advantage360](https://github.com/mrled/KeymapKit/tree/master/keyboard.advantage360)
is very similar to the ErgoDox.
Here's what it looks like:

<div id="advantage360-container"></div>

<script type="module">
  import { KeyboardModelAdvantage360 } from "@keymapkit/keyboard.advantage360";
  const container = document.getElementById("advantage360-container");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setAttribute("query-prefix", "advantage360");
  keymapUi.setModelsAndMaps([KeyboardModelAdvantage360.blankKeymap]);
  container.appendChild(keymapUi);
</script>

Important differences:

- The key IDs for the Advantage360 are totally different than those of the ErgoDox.
- Advantage360 key grids are higher resolution than ErgoDox key grids.
  In order to accommodate the ErgoDox's 1.5x-width keys,
  we define the smallest key as 2x2 `--keyboard-grid-unit`,
  and the 1.5x keys to be 3x2 `--keyboard-grid-unit`.
  However, the Advantage360 uses 1.25x-width keys instead,
  so we need to set the small keys as 4x4 and the 1.25x-width keys as 5x4.
- This also means that the `--keyboard-grid-unit` variable
  is set to half the size on the Advantage360,
  which requires changing the value at a few different breakpoints.
  Additionally, we change various math constants to double the size,
  so that the keys look to be the same size when displayed on the page.
