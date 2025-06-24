---
layout: site.njk
title: Simple Layout
eleventyNavigation:
  title: Simple Layout
  parent: docs
  order: 20
---

To set up a new layout for an existing keyboard,
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

## Key IDs

How do you know what a keyboard uses for its key IDs?

Each keyboard has one or more keygrids,
and any number of keys.
The keys each have an identifier based on the keygrid name and their stating location in the grid.
The Planck has only one keygrid, called `planck`,
and all of the key IDs are `planck-X-Y`.
All of the keys are listed in each board's source definition,
for instance,
the [Planck file](https://github.com/mrled/KeymapKit/blob/master/keyboard.planck48/index.ts)
has:

```typescript
const KeyboardModelPlanck48 = new KeyboardModel(
  "keymap-keyboard-planck48",
  "Planck 48",
  new Point(2, 2),
  new Size(4, 3),
  [
    // Top row
    new PhysicalKey("planck", new Point(1, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(3, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(5, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(7, 1), new Size(2, 2)),
    // ...etc
  ],
);
```

This corresponds to IDs:

- `planck-1-1`
- `planck-3-1`
- `planck-5-1`
- `planck-7-1`
- ... etc
