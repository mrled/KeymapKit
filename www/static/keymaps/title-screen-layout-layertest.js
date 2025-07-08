import { KeyboardModelTitleScreen } from "./title-screen-keyboard.js";
import { KeymapLayout, KeymapKey, KeymapLayer } from "@keymapkit/ui";

const welcome = [
  `Welcome to the Layer Entry Key Test!`,
  `This layout demonstrates layer entry key functionality.`,
  `Click on any key above to see information about it.`,
];

const secondLayerWelcome = [
  `You're now on the second layer!`,
  `This layer was accessed via the layer entry key from the main layer.`,
  `The first key (K) is the key used to enter this layer. It's highlighted in purple to indicate this.`,
  `Click on any key above to see information about it.`,
];

const keyInfo = [
  "Click another key, or click the same key again to close the info and go back to the welcome message.",
];

const layerEntryKeyInfo = [
  "This is a layer entry key. Layer entry keys are highlighted in purple to show their special function.",
  "Click this key to switch to the corresponding layer.",
];

/* A test layout with layer entry keys functionality
 * Features two layers with keys that can switch between them
 */
export const KeymapTitleScreenLayoutLayerTest = new KeymapLayout({
  displayName: "Title Screen Map (Layer Test)",
  uniqueId: "title-screen-map-layertest",
  model: KeyboardModelTitleScreen,
  layers: [
    KeymapLayer.fromKeyList({
      displayName: "Main Layer",
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
      ]
    }),
    KeymapLayer.fromKeyList({
      displayName: "Second Layer",
      shortName: "Layer2",
      welcome: secondLayerWelcome,
      keys: [
        new KeymapKey({ name: "K", id: "title-1-1", info: layerEntryKeyInfo }),
        new KeymapKey({ name: "E", id: "title-3-1", info: keyInfo }),
        new KeymapKey({ name: "Y", id: "title-5-1", info: keyInfo }),
        new KeymapKey({ name: "M", id: "title-7-1", info: keyInfo }),
        new KeymapKey({ name: "A", id: "title-9-1", info: keyInfo }),
        new KeymapKey({ name: "P", id: "title-11-1", info: keyInfo }),
        new KeymapKey({ name: "K", id: "title-13-1", info: keyInfo }),
        new KeymapKey({ name: "I", id: "title-15-1", info: keyInfo }),
        new KeymapKey({ name: "T", id: "title-17-1", info: keyInfo }),
      ],
      layerEntryKeys: ["title-1-1"], // K key (first one) enters this layer
    }),
  ],
  guides: [],
});