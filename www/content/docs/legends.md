---
layout: site.njk
title: Key Legends
eleventyNavigation:
  title: Key Legends
  parent: docs
  order: 33
---

A "legend" on a physical keyboard is the character printed on the key.
In KeymapKit, keys that aren't letters, numbers, or punctuation
will usually have a very short legend like `⌘` or `cmd`,
different from the key name like `command`.

- By default, the `name` is used for the legend.
  Very common for plain letter and number keys.
  A single letter is displayed in large text,
  two letters in smaller,
  and four letters smaller still.
  More than four letters will overflow the standard size on most keyboards.
- If `textLegend` is passed, a different string can be used as a legend.
  Useful for names that are too long for a legend (`command` vs `cmd`),
  or using Unicode symbols (`command` vs `⌘`).
- If `htmlLegend` is passed, render HTML for the legend.
  This might be something simple like an HTML entity such as `&pi;`,
  it might be an entire embedded `<svg>`,
  or it could be any other valid HTML.
- If `imagePath` is passed, use an image on the webserver instead of text.
  Images passed this way automatically have their colors inverted when in dark mode.

A key with any type of legend can add an optional property called `imageAttribution`,
which is displayed after the key info in the UI.
(This is designed for use with `imagePath` and `htmlLegend` keys,
but technically works on the other tyeps too.)

### Images in `htmlLegend` vs `imagePath`

`imagePath` can take the path to any image on your webserver.
Its image are constrained to fit in the keyboard key,
and have their colors inverted when in dark mode.
It's designed to be simple and do the right thing most of the time.

`htmlLegend` can contain any HTML,
including an `<img>` tag with a URI to your webserver (or even another webserver for hotlinking),
an `<img>` tag with a [data URL](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data),
or an `<svg>` element.
Its contents are not size constrained and may overflow,
and images do not automatically invert colors in dark mode,
although an `<svg>` may use `currentColor` and non-image elements will inherit CSS `color`.
It's designed for maximum flexibility, even if that requires the layout designer to do a bit more work.

## Demo

Here's a demo of all of these different ways to show a legend.

<div id="keymap-container"></div>

<div style="margin-top: 1rem;">
  <button onclick="setColorScheme('light')">Light Mode</button>
  <button onclick="setColorScheme('dark')">Dark Mode</button>
  <button onclick="setColorScheme('system')">System Preference</button>
</div>

<script type="module">
import { KeymapTitleScreenLayoutLegends } from "/KeymapKit/keymaps/title-screen-layout-legends.js";

let keymapUi = document.createElement("keymap-ui");
keymapUi.setAttribute("id", "keymap-title");
keymapUi.setModelsAndMaps([KeymapTitleScreenLayoutLegends]);
keymapUi.setAttribute("keymap-id", "title-screen-map-legends");
keymapUi.setAttribute("query-prefix", "keymap");
let keymapContainer = document.querySelector("#keymap-container")
keymapContainer.appendChild(keymapUi);

window.setColorScheme = function(scheme) {
  const keymap = document.getElementById("keymap-title");
  switch (scheme) {
    case "system": {
      keymapContainer.style = "";
      keymap.removeAttribute("color-scheme");
      break;
    }
    case "light": {
      keymapContainer.style = "background-color: white;";
      keymap.setAttribute("color-scheme", "light");
      break;
    }
    case "dark": {
      keymapContainer.style = "background-color: black;";
      keymap.setAttribute("color-scheme", "dark");
      break;
    }
  }
};
</script>

## Legend suggestions

When looking for symbols for your key legends, consider:

- [Xah Lee on computing symbols in Unicode](http://xahlee.info/comp/unicode_computing_symbols.html)

For image legends:

- [Google Font to SVG Path](https://danmarshall.github.io/google-font-to-svg-path/):
  Convert a glyph from any font to an SVG
  (not limited to Google Fonts despite the name)
- [Material Design icons](https://material.io/resources/icons)
- [IcoMoon](https://icomoon.io/)
- [Phosphor Icons](https://phosphoricons.com/)
- [Feather Icons](https://feathericons.com/)
- [Atlas Icons](https://atlasicons.vectopus.com/)
- [FreeSVG](https://freesvg.org)
- [OpenClipArt](https://openclipart.org/)

## Demo layout code

This is the code for the layout in the above demo.

{% importcode "static/keymaps/title-screen-layout-legends.js", "javascript" %}

## KeymapKey constructor

Keys are instances of [KeymapKey](https://github.com/mrled/KeymapKit/blob/master/models/src/lib/Layout.ts):

```typescript
/* A key in a layout.
 *
 * name:              The name of the key (displayed in the title bar)
 * id:                The ID of the physical key this key corresponds to (must be unique)
 * info:              An array of paragraphs describing the key; may contain HTML
 * selection:         An array of key IDs that are part of the same selection group,
 *                    which should be highlighted together when the key is selected,
 *                    e.g. all the QWERTY keys or both shift keys etc
 * textLegend:        Text legend for the key; optional
 * imagePath:         The path on the server to an image to display; optional
 * imageAttribution:  The attribution for the image; optional
 * unset:             The key has no function attached to it; can still contain name/info/selection.
 *
 * For the legend, an image is used if provided, otherwise text legend if provided, otherwise the name.
 */
export class KeymapKey {
  readonly name: string;
  readonly id;
  readonly info: string[];
  readonly selection?: string[];
  readonly textLegend?: string;
  readonly imagePath?: string;
  readonly imageAttribution?: string;
  readonly unset?: boolean = false;
  // ...
}
```
