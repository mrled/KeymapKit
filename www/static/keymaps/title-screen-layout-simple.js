import { KeyboardModelTitleScreen } from "./title-screen-keyboard.js";
import { KeymapLayout, KeymapKey, KeymapLayer } from "@keymapkit/ui";

const welcome = [
  `Hello, and welcome to KeymapKit!`,
  `This is an example layout for a fictional 9-key keyboard.`,
  `Click on any key above to see information about it.`,
];

const keyInfo = [
  "Click another key, or click the same key again again to close the info and go back to the welcome message.",
];

/* A simple title screen layout with two layers, for demos
 */
export const KeymapTitleScreenLayoutSimple = new KeymapLayout({
  displayName: "Title Screen Map (Simple)",
  uniqueId: "title-screen-map-simple",
  model: KeyboardModelTitleScreen,
  layers: [
    KeymapLayer.fromKeyList({
      displayName: "KeymapKit is a tool for visualizing keymaps",
      shortName: "Main",
      welcome: welcome,
      keys: [
        new KeymapKey({ name: "K", id: "title-1-1", info: keyInfo }),
        new KeymapKey({ name: "E", id: "title-3-1", info: keyInfo }),
        new KeymapKey({ name: "Y", id: "title-5-1", info: keyInfo }),
        new KeymapKey({ name: "M", id: "title-7-1", info: keyInfo }),
        new KeymapKey({ name: "A", id: "title-9-1", info: keyInfo }),
        new KeymapKey({ name: "P", id: "title-11-1", info: keyInfo }),
        new KeymapKey({ name: "K", id: "title-13-1", info: keyInfo }),
        new KeymapKey({ name: "I", id: "title-15-1", info: keyInfo }),
        new KeymapKey({ name: "T", id: "title-17-1", info: keyInfo }),
      ],
    }),
  ],
  guides: [],
});
