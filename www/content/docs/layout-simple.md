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

## Generating a blank layout

You can generate a blank keymap for any valid keyboard model,
so long as both `@keymapkit/cli` and the keyboard model are available in the current NPM workspace.
For instance, to generate a blank ErgoDox keymap:

```sh
npm install @keymapkit/cli @keymapkit/keyboard.planck48
npx @keymapkit/cli blank @keymapkit/keyboard.planck48 KeyboardModelPlanck48
```

That will return:

```javascript
import {
  KeymapLayout,
  KeymapGuide,
  KeymapKey,
  KeymapLayer,
} from "@keymapkit/ui";
import { KeyboardModelPlanck48 } from "@keymapkit/keyboard.planck48";

export const BlankLayout = new KeymapLayout({
  displayName: "Blank KeyboardModelPlanck48 Layout",
  uniqueId: "blank-layout",
  model: KeyboardModelPlanck48,
  layers: [
    KeymapLayer.fromKeyList({
      displayName: "Main Layer",
      shortName: "Main",
      welcome: [
        `Welcome to my keymap.`,
        `Select a key from the board above to learn more about it.`,
      ],
      keys: [
        // The planck grid,
        new KeymapKey({ name: "", id: "planck-1-1", info: [""] }),
        new KeymapKey({ name: "", id: "planck-3-1", info: [""] }),
        new KeymapKey({ name: "", id: "planck-5-1", info: [""] }),
        new KeymapKey({ name: "", id: "planck-7-1", info: [""] }),
        new KeymapKey({ name: "", id: "planck-9-1", info: [""] }),
        new KeymapKey({ name: "", id: "planck-11-1", info: [""] }),
        new KeymapKey({ name: "", id: "planck-13-1", info: [""] }),
        new KeymapKey({ name: "", id: "planck-15-1", info: [""] }),
        new KeymapKey({ name: "", id: "planck-17-1", info: [""] }),
        new KeymapKey({ name: "", id: "planck-19-1", info: [""] }),
        new KeymapKey({ name: "", id: "planck-21-1", info: [""] }),
        new KeymapKey({ name: "", id: "planck-23-1", info: [""] }),
        new KeymapKey({ name: "", id: "planck-1-3", info: [""] }),
        new KeymapKey({ name: "", id: "planck-3-3", info: [""] }),
        new KeymapKey({ name: "", id: "planck-5-3", info: [""] }),
        new KeymapKey({ name: "", id: "planck-7-3", info: [""] }),
        new KeymapKey({ name: "", id: "planck-9-3", info: [""] }),
        new KeymapKey({ name: "", id: "planck-11-3", info: [""] }),
        new KeymapKey({ name: "", id: "planck-13-3", info: [""] }),
        new KeymapKey({ name: "", id: "planck-15-3", info: [""] }),
        new KeymapKey({ name: "", id: "planck-17-3", info: [""] }),
        new KeymapKey({ name: "", id: "planck-19-3", info: [""] }),
        new KeymapKey({ name: "", id: "planck-21-3", info: [""] }),
        new KeymapKey({ name: "", id: "planck-23-3", info: [""] }),
        new KeymapKey({ name: "", id: "planck-1-5", info: [""] }),
        new KeymapKey({ name: "", id: "planck-3-5", info: [""] }),
        new KeymapKey({ name: "", id: "planck-5-5", info: [""] }),
        new KeymapKey({ name: "", id: "planck-7-5", info: [""] }),
        new KeymapKey({ name: "", id: "planck-9-5", info: [""] }),
        new KeymapKey({ name: "", id: "planck-11-5", info: [""] }),
        new KeymapKey({ name: "", id: "planck-13-5", info: [""] }),
        new KeymapKey({ name: "", id: "planck-15-5", info: [""] }),
        new KeymapKey({ name: "", id: "planck-17-5", info: [""] }),
        new KeymapKey({ name: "", id: "planck-19-5", info: [""] }),
        new KeymapKey({ name: "", id: "planck-21-5", info: [""] }),
        new KeymapKey({ name: "", id: "planck-23-5", info: [""] }),
        new KeymapKey({ name: "", id: "planck-1-7", info: [""] }),
        new KeymapKey({ name: "", id: "planck-3-7", info: [""] }),
        new KeymapKey({ name: "", id: "planck-5-7", info: [""] }),
        new KeymapKey({ name: "", id: "planck-7-7", info: [""] }),
        new KeymapKey({ name: "", id: "planck-9-7", info: [""] }),
        new KeymapKey({ name: "", id: "planck-11-7", info: [""] }),
        new KeymapKey({ name: "", id: "planck-13-7", info: [""] }),
        new KeymapKey({ name: "", id: "planck-15-7", info: [""] }),
        new KeymapKey({ name: "", id: "planck-17-7", info: [""] }),
        new KeymapKey({ name: "", id: "planck-19-7", info: [""] }),
        new KeymapKey({ name: "", id: "planck-21-7", info: [""] }),
        new KeymapKey({ name: "", id: "planck-23-7", info: [""] }),
      ],
    }),
  ],
  guides: [
    new KeymapGuide({
      title: "Layout Guide",
      shortName: "Guide",
      id: "example-guide",
      steps: [
        {
          title: "Welcome to the guide to my main keyboard layout",
          text: [`The first guide step`],
          selection: [],
        },
        { keyId: "planck-1-1" },
      ],
    }),
  ],
});
```

## An example layout

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

The easiest way is to generate a blank keymap, per above.

If there is enough width on the screen,
the ID is also displayed when clicking on any key.
(On narrow screens like phones, this is hidden so it doesn't consume horizontal screen space.)

### THe source of IDs

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
