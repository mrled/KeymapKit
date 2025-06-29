import { KeyboardModelTitleScreen } from "./title-screen-keyboard.js";
import { KeymapLayout, KeymapKey, KeymapLayer } from "@keymapkit/ui";

/* A simple title screen layout with two layers, for demos
 */
export const KeymapTitleScreenLayoutLegends = new KeymapLayout({
  displayName: "Title Screen Map (Simple)",
  uniqueId: "title-screen-map-legends",
  model: KeyboardModelTitleScreen,
  layers: [
    KeymapLayer.fromKeyList({
      displayName: "KeymapKit is a tool for visualizing keymaps",
      shortName: "Main",
      welcome: ["Examples of all the different types of key legends"],
      keys: [
        new KeymapKey({
          name: "A",
          id: "title-1-1",
          info: ["Using the name for the legend with one character."],
        }),
        new KeymapKey({
          name: "=+",
          id: "title-3-1",
          info: ["Using the name for the legend with two characters."],
        }),
        new KeymapKey({
          name: "bksp",
          id: "title-5-1",
          info: ["Using the name for the legend with four characters."],
        }),
        new KeymapKey({
          name: "cmd",
          textLegend: `⌘`,
          id: "title-7-1",
          info: [
            "A text legend different from the key name.",
            "This is not an image &mdash; it is the unicode <code>⌘</code> character.",
            "Just like when using the name, the text legend could instead be a multi-character string.",
          ],
        }),
        new KeymapKey({
          name: "menu",
          id: "title-9-1",
          imagePath: "/KeymapKit/legends/menu-key.svg",
          imageAttribution:
            "Public domain, published by OpenClipart, https://freesvg.org/menu-key-icon-vector-illustration",
          info: ["An image legend."],
        }),
        new KeymapKey({ name: "", id: "title-11-1", unset: true }),
        new KeymapKey({ name: "", id: "title-13-1", unset: true }),
        new KeymapKey({ name: "", id: "title-15-1", unset: true }),
        new KeymapKey({ name: "", id: "title-17-1", unset: true }),
      ],
    }),
  ],
  guides: [],
});
