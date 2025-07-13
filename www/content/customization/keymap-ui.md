---
layout: site.njk
title: keymap-ui Configuration
eleventyNavigation:
  title: keymap-ui Configuration
  parent: customization
  order: 35
---

How to configure the `<keymap-ui>` web component.

## Attributes

The `<keymap-ui>` element can be configured with a few attributes.
See [its definition](https://github.com/mrled/KeymapKit/blob/master/ui/src/webcomponents/keymap-ui.ts#L42)
which is excerpted here:

```typescript
/*
 * Attributes:
 * debug                Enable debug messages and borders
 * keymap-id            The name of one of the passed-in keymaps to use.
 * layer                The layer number to use.
 * selected-key         The id of the key that is selected.
 * query-prefix         A prefix for query parameters.
 *                      If set, the KeymapUIElement will look for parameters
 *                      in the URL query string with this prefix.
 */
```

## Query Strings

If `query-prefix` is set, it will use query parameters with that prefix to store state.
For instance, with `<keymap-ui query-prefix="example"></keymap-ui>`,
clicking on the top-left key of the Planck board will change the query string in the browser to
`?example-id=planck-1-1`.
This works when loading the page, too ---
it'll see that query string and automatically select the upper left key.
Try clicking on [this link](?example-key=planck-1-1).

<div id="example-container"></div>

<script type="module">
  import { KeyboardModelPlanck48 } from "@keymapkit/keyboard.planck48";
  const container = document.getElementById("example-container");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setAttribute("query-prefix", "example")
  keymapUi.setModelsAndMaps([KeyboardModelPlanck48.blankKeymap]);
  container.appendChild(keymapUi);
</script>

The component doesn't mess with your query strings at all by default.

It's recommended that you enable query strings if you can,
so that users can link to specific keys or steps,
but this only makes sense if KeymapKit is the primary purpose of the page.

Here is the list of query string parameters:

```typescript
/*
 * Query string parameters:
 * map              The name of one of the passed-in keymaps to use.
 * layer            The layer number to use.
 * key              The id of the key to select.
 * guide            The name of the guide to use.
 * step             The step number in the guide to use in the guide
 */
```

## Multiple keyboards

The `keymapUi.setModelsAndMaps()` function takes a list of layouts.
If more than one is provided,
it'll display a dropdown list of the options and the user can choose between them.

Here's an example of all the layouts I can get,
including a bunch of blank ones and exammples,
just to show how it works.

```html
<div id="multi-container"></div>
<script type="module">
  import { KeymapTitleScreenLayoutSimple } from "/KeymapKit/keymaps/title-screen-layout-simple.js";
  import { KeymapTitleScreenLayoutManyLayer } from "/KeymapKit/keymaps/title-screen-layout-manylayer.js";
  import { Planck48ExampleLayout } from "/KeymapKit/keymaps/planck48-example-layout.js";
  import { KeyboardModelAdvantage360 } from "@keymapkit/keyboard.advantage360";
  import "@keymapkit/keyboard.ergodox";
  import { MicahErgodoxLayout } from "@keymapkit/examples";
  const multiContainer = document.getElementById("multi-container");
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
    KeyboardModelAdvantage360.blankKeymap,
  ];
  keymapUi.setAttribute("id", "keymap-title");
  keymapUi.setAttribute("show-debug", "true");
  keymapUi.setAttribute("query-prefix", "keymap");
  keymapUi.setModelsAndMaps(availableKeymaps);
  keymapUi.setAttribute("keymap-id", "title-screen-map-simple");
  multiContainer.appendChild(keymapUi);
</script>
```

That looks like this:

<div id="multi-container"></div>
<script type="module">
  import { KeymapTitleScreenLayoutSimple } from "/KeymapKit/keymaps/title-screen-layout-simple.js";
  import { KeymapTitleScreenLayoutManyLayer } from "/KeymapKit/keymaps/title-screen-layout-manylayer.js";
  import { Planck48ExampleLayout } from "/KeymapKit/keymaps/planck48-example-layout.js";
  import { KeyboardModelAdvantage360 } from "@keymapkit/keyboard.advantage360";
  import "@keymapkit/keyboard.ergodox";
  import { MicahErgodoxLayout } from "@keymapkit/examples";
  const multiContainer = document.getElementById("multi-container");
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
    KeyboardModelAdvantage360.blankKeymap
  ];
  keymapUi.setAttribute("id", "keymap-title");
  keymapUi.setAttribute("show-debug", "true");
  keymapUi.setAttribute("query-prefix", "keymap");
  keymapUi.setModelsAndMaps(availableKeymaps);
  keymapUi.setAttribute("keymap-id", "title-screen-map-simple");
  multiContainer.appendChild(keymapUi);
</script>

## Fallback keyboard

If you don't pass any layouts to `setModelsAndMaps()` at all,
you'll see a fallback keyboard:

<div id="fallback-container"></div>

<script type="module">
  import "@keymapkit/ui";
  const fallbackContainer = document.getElementById("fallback-container");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setAttribute("id", "keymap-empty");
  keymapUi.setModelsAndMaps([]);
  fallbackContainer.appendChild(keymapUi);
</script>

## Diagram debugging

Diagram debugging draws lines in the center panel and the "diamargs",
or diagram margins,
which are used to draw key indicator lines.

To enable diagram debugging on all `keymap-ui` elements on a page, use a function like this:

```javascript
/* Toggle debugging for all KeymapUI elements on the page
 */
window.toggleAllKeymapUiDebug = function () {
  document.querySelectorAll("keymap-ui").forEach((keymapUi) => {
    const debugVal = keymapUi.getAttribute("debug") || "0";
    const currentVal = parseInt(debugVal, 10);
    if (currentVal > 0) {
      keymapUi.setAttribute("debug", "0");
    } else {
      keymapUi.setAttribute("debug", "1");
    }
  });
};
```

Then you can make a button or something that enables it:

```html
<button onclick="toggleAllKeymapUiDebug()">Toggle Diagram Debugging</button>
```

And that looks like this:

<script>
  window.toggleAllKeymapUiDebug = function () {
  document.querySelectorAll("keymap-ui").forEach((keymapUi) => {
    const debugVal = keymapUi.getAttribute("debug") || "0";
    const currentVal = parseInt(debugVal, 10);
    if (currentVal > 0) {
      keymapUi.setAttribute("debug", "0");
    } else {
      keymapUi.setAttribute("debug", "1");
    }
  });
};
</script>

<button onclick="toggleAllKeymapUiDebug()">Toggle Diagram Debugging</button>
