---
layout: site.njk
title: Key Legends
eleventyNavigation:
  title: Key Legends
  parent: docs
  order: 33
---

A "legend" on a physical keyboard is the character printed on the key.
In KeymapKit, keys will usually have a very short legend like `⌘`,
different from the key name like `cmd`.

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
  You could even embed a bitmap with a
  [data URL](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data).
  When using an HTML legend, you are responsible for making sure the result fits properly in the key area,
  and you can use `<style>` tags and/or `style=` attributes to constrain the size if necessary.
- If `imagePath` is passed, use an image on the webserver instead of text.
  With this option, you can also set `imageAttribution`,
  although at this time this is not displayed in the UI.

A key with any type of legend can add an optional property called `imageAttribution`,
which is displayed after the key info in the UI.
(This is designed for use with `imagePath` and `htmlLegend` keys,
but technically works on the other tyeps too.)

## Demo

Here's a demo of all of these different ways to show a legend.

<div id="keymap-container"></div>

<script type="module">
import { KeymapTitleScreenLayoutLegends } from "/KeymapKit/keymaps/title-screen-layout-legends.js";

let keymapUi = document.createElement("keymap-ui");
keymapUi.setAttribute("id", "keymap-title");
keymapUi.setModelsAndMaps([KeymapTitleScreenLayoutLegends]);
keymapUi.setAttribute("keymap-id", "title-screen-map-legends");
keymapUi.setAttribute("query-prefix", "keymap");
let keymapContainer = document.querySelector("#keymap-container")
keymapContainer.appendChild(keymapUi);
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
