---
layout: site.njk
---

# [keymap.click](/)

keymap.click is a tool for visualizing keymaps.

It's designed to help you share your keymaps with others on your own website. You can use it to show off your custom keymap, or to help others understand how to use a new keymap. I built it because when I bought my ErgoDox-EZ to help with my RSI, I wanted to build what I wish had existed for me when I was on the fence about making the investment -- a detailed description not just that the keyboard was ergonomic, but what type of pain it specifically helped with and why.

If you also want to talk about specific key placement or provide details about your layout on your own website, keymap.click is for you. You can provide a detailed explanation of each key, group keys together to describe them in a group (e.g. all QWERTY keys), and users can click around on the board to explore. You can write a guided tour of your map, similar to <a href="https://blog.zsa.io/2004-layout-tours/">tours in Oryx</a>, without needing approval from anyone. In your key explanations or guide steps, you can use keymap.click "key indicator" HTML elements to point to specific keys in the layout, <a href="/?keymap-map=micah-ergodox&keymap-key=l-f-8-9">like this</a>.

To use it, install with npm as <code>npm install @mrled/keymap.click</code>, define a layout in JavaScript, instantiate the web component on your page, and pass it your defined layout. If keymap.click doesn't come with a built-in model for your keyboard, you can define your own model. keymap.click currently ships models of ErgoDox and Planck boards. If you want to see a model for a different board, please <a href="https://github.com/mrled/keymap.click/issues">open an issue</a>, or implement it yourself and publish it as a separate package on NPM (and let me know so I can link to it here).

See the demo below for an example of what keymap.click looks like on a page.

<div id="keymap-container"></div>

For more information, see the [about page](/about).

Thanks for all the clicks.

<script type="module">
import {
  KeymapUIElement,
  MicahErgodoxLayout,
  KeymapTitleScreenLayout,
} from "/keymap.click.js";

let keymapContainer = document.querySelector("#keymap-container")

keymapContainer.appendChild(document.createElement("hr"));

let keymapUi = document.createElement(KeymapUIElement.elementName);
keymapUi.setAttribute("id", "keymap-title");
keymapUi.setModelsAndMaps([
  KeymapTitleScreenLayout,
  MicahErgodoxLayout,
]);
keymapUi.setAttribute("keymap-id", "title-screen-map");
keymapUi.setAttribute("query-prefix", "keymap");
keymapContainer.appendChild(keymapUi);

keymapContainer.appendChild(document.createElement("hr"));
</script>
