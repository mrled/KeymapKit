---
layout: site.njk
title: Color Scheme Control
eleventyNavigation:
  title: Color Scheme Control
  parent: docs
  order: 40
---

How to control the color scheme of the `<keymap-ui>` web component.

## The color-scheme Attribute

The `<keymap-ui>` element supports a `color-scheme` attribute that allows you to override the default color scheme behavior. This gives you programmatic control over whether the keymap displays in light or dark mode, regardless of the user's system preferences.

Here are two UI elements, one in light mode and one in dark mode:

<div id="light-mode-container" style="background-color: white; padding: .5em 1em;"></div>
<script type="module">
  import { KeymapTitleScreenLayoutSimple } from "/KeymapKit/keymaps/title-screen-layout-simple.js";
  const lightContainer = document.getElementById("light-mode-container");
  const lightKeymapUi = document.createElement("keymap-ui");
  lightKeymapUi.setAttribute("color-scheme", "light");
  lightKeymapUi.setAttribute("keymap-id", "title-screen-map-simple");
  lightKeymapUi.setModelsAndMaps([KeymapTitleScreenLayoutSimple]);
  lightContainer.appendChild(lightKeymapUi);
</script>

<div id="dark-mode-container" style="background-color: black; padding: .5em 1em;"></div>
<script type="module">
  import { KeymapTitleScreenLayoutSimple } from "/KeymapKit/keymaps/title-screen-layout-simple.js";
  const darkContainer = document.getElementById("dark-mode-container");
  const darkKeymapUi = document.createElement("keymap-ui");
  darkKeymapUi.setAttribute("color-scheme", "dark");
  darkKeymapUi.setAttribute("keymap-id", "title-screen-map-simple");
  darkKeymapUi.setModelsAndMaps([KeymapTitleScreenLayoutSimple]);
  darkContainer.appendChild(darkKeymapUi);
</script>

### Usage

By default, it uses the system's `prefers-color-scheme` media query,
but you can override this to show the dark mode colors on the light mode page and vice versa.

```html
<!-- Force light mode -->
<keymap-ui color-scheme="light" keymap-id="ergodox"></keymap-ui>

<!-- Force dark mode -->
<keymap-ui color-scheme="dark" keymap-id="ergodox"></keymap-ui>

<!-- Use system preference (default behavior) -->
<keymap-ui keymap-id="ergodox"></keymap-ui>
```

One thing to note: the component doesn't set an overall background color,
so on pages like this one that show both modes,
you need to make sure the container for the `keymap-ui` element has an appropriate background color set,
e.g. black for dark mode and white for light mode.

## Dynamic Color Scheme Control

You can also change the color scheme dynamically using JavaScript:

```javascript
const keymapUi = document.querySelector('keymap-ui');

// Switch to dark mode
keymapUi.setAttribute('color-scheme', 'dark');

// Switch to light mode
keymapUi.setAttribute('color-scheme', 'light');

// Return to system preference
keymapUi.removeAttribute('color-scheme');
```

### Interactive Example

<div id="interactive-container"></div>

<div style="margin-top: 1rem;">
  <button onclick="setColorScheme('light')">Light Mode</button>
  <button onclick="setColorScheme('dark')">Dark Mode</button>
  <button onclick="setColorScheme('system')">System Preference</button>
</div>

<script type="module">
  import { KeymapTitleScreenLayoutSimple } from "/KeymapKit/keymaps/title-screen-layout-simple.js";
  const interactiveContainer = document.getElementById("interactive-container");
  const interactiveKeymapUi = document.createElement("keymap-ui");
  interactiveKeymapUi.setAttribute("id", "interactive-keymap");
  interactiveKeymapUi.setAttribute("keymap-id", "title-screen-map-simple");
  interactiveKeymapUi.setModelsAndMaps([KeymapTitleScreenLayoutSimple]);
  interactiveContainer.appendChild(interactiveKeymapUi);

  window.setColorScheme = function(scheme) {
    const keymap = document.getElementById("interactive-keymap");
    switch (scheme) {
      case "system": {
        interactiveContainer.style = "";
        keymap.removeAttribute("color-scheme");
        break;
      }
      case "light": {
        interactiveContainer.style = "background-color: white;";
        keymap.setAttribute("color-scheme", "light");
        break;
      }
      case "dark": {
        interactiveContainer.style = "background-color: black;";
        keymap.setAttribute("color-scheme", "dark");
        break;
      }
    }
  };
</script>
