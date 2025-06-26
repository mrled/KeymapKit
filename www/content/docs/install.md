---
layout: site.njk
title: Installation
eleventyNavigation:
  title: Installation
  parent: docs
  order: 10
---

To use KeymapKit, you'll need to install it to your web site.

- The core package is called `@keymapkit/ui`.
- KeymapKit also ships keyboard models in separate packages:
  - `@keymapkit/advantage360`
  - `@keymapkit/ergodox`
  - `@keymapki/planck48`

You'll need to install at least the core package and a keyboard.

You can also write your own keyboard, see the Planck Walkthrough for example code.

## Installation methods

### NPM installation for bundlers

```sh
npm install @keymapkit/ui @keymapkit/keyboard.advantage360 @keymapkit/keyboard.ergodox @keymapkit/keyboard.planck48
```

### Use via CDN

You can use via CDN without installing anything.
For instance, here's unpkg:

```html
<script type="importmap">
  {
    "imports": {
      "@keymapkit/ui": "https://unpkg.com/@keymapkit/ui@1.0.0/dist/keymapkit.js",
      "@keymapkit/keyboard.advantage360": "https://unpkg.com/@keymapkit/keyboard.advantage360@1.0.0/dist/keyboard.ergodox.js",
      "@keymapkit/keyboard.ergodox": "https://unpkg.com/@keymapkit/keyboard.ergodox@1.0.0/dist/keyboard.ergodox.js",
      "@keymapkit/keyboard.planck48": "https://unpkg.com/@keymapkit/keyboard.planck48@1.0.0/dist/keyboard.planck48.js"
    }
  }
</script>
```

Any page with that importmap can then use the code below to show a keymap.

### Download script files and host on your site

Get the tarball from [GitHub Releases](https://github.com/mrled/KeymapKit/releases).
That page contains releases for all pacakges,
though you might have to scroll down some to find them all.

Then extract the tarball and put the `*.js` file(s) on your webserver,
perhaps under `/keymapkit`.
Then include this on any page that you want to show a keymap:

```html
<script type="importmap">
  {
    "imports": {
      "@keymapkit/ui": "/keymapkit/keymapkit.js",
      "@keymapkit/keyboard.advantage360": "/keymapkit/keyboard.advantage360.js",
      "@keymapkit/keyboard.ergodox": "/keymapkit/keyboard.ergodox.js",
      "@keymapkit/keyboard.planck48": "/keymapkit/keyboard.planck48.js"
    }
  }
</script>
```

Any page with that importmap can then use the code below to show a keymap.

## Displaying the fallback keyboard

Make sure the UI is working on its own first.

```html
<div id="fallback-container"></div>
<script type="module">
  import "@keymapkit/ui";
  const container = document.getElementById("fallback-container");
  const keymapUi = document.createElement("keymap-ui");
  container.appendChild(keymapUi);
</script>
```

That should show the fallback keyboard, like this:

<div id="fallback-container"></div>
<script type="module">
  import "@keymapkit/ui";
  const container = document.getElementById("fallback-container");
  const keymapUi = document.createElement("keymap-ui");
  container.appendChild(keymapUi);
</script>

## Displaying an empty layout

From there, you can show an empty layout of the keyboard you want.
All keyboard models have a blank keymap that gets created automatically.
For example, the Planck:

```html
<div id="example-container"></div>
<script type="module">
  import "@keymapkit/ui";
  import { KeyboardModelPlanck48 } from "/KeymapKit/keymaps/planck48-example-layout.js";
  const container = document.getElementById("example-container");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setModelsAndMaps([KeyboardModelPlanck48.keyboardModel.blankKeymap]);
  container.appendChild(keymapUi);
</script>
```

<div id="example-container"></div>
<script type="module">
  import "@keymapkit/ui";
  import { KeyboardModelPlanck48 } from "@keymapkit/keyboard.planck48";
  const container = document.getElementById("example-container");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setModelsAndMaps([KeyboardModelPlanck48.blankKeymap]);
  container.appendChild(keymapUi);
</script>

Once you see that, everything is working.
Now all you have to do is define a layout.
