---
layout: site.njk
title: Complex Layout
eleventyNavigation:
  title: Complex
  parent: layouts
  order: 30
---

See [my early ErgoDox layout](https://github.com/mrled/KeymapKit/blob/master/examples/MicahErgodoxLayout.ts)
for a much more complex layout.
It looks like this:

<div id="ergodox-example"></div>

<script type="module">
  import "@keymapkit/ui";
  import "@keymapkit/keyboard.ergodox";
  import { MicahErgodoxLayout } from "@keymapkit/examples";
  const container = document.getElementById("ergodox-example");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setAttribute("id", "ergodox-example-ui");
  keymapUi.setAttribute("query-prefix", "keymap");
  keymapUi.setModelsAndMaps([MicahErgodoxLayout]);
  container.appendChild(keymapUi);
</script>

It shows key groupings, guides, and multiple layers.
It's long but pretty repetitive,
so it should be pretty easy to crib from once you understand the simple example.

A few things to point out:

- **We don't sanitize inputs.**
  This package is designed for displaying your own layouts on your own website.
  Don't give it untrusted input.
- Each key's `info` property is an array of strings,
  which are placed in to `<p>` elements directly.
  To reiterate, NO sanitization or parsing is done,
  so dumb quotes, HTML tags like `<kbd>`,
  etc are passed in directly.
- A key can be part of a selection group, like all QWERTY keys.
  This lets you easily talk about a group of keys at once.
- This layout implements a guide.
  You can click around on individual keys,
  or click the "Start Guide" button to be taken on a guided tour of the layout.
- It uses `<kbd>` elements for nicely styled key-looking elements in the description.
- It uses `<keymap-indicator>` elements to draw a line from the reference to a physical key on the board.
  For instance, `<keymap-indicator id="l-t-1-3"><kbd>shift</kbd></keymap-indicator>`
  draws a line from that part of the key info to the physical key at `l-t-1-3`.

## The full layout

{% importcode "../examples/MicahErgodoxLayout.ts", "typescript" %}
