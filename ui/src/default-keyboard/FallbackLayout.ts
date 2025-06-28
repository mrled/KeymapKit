import { KeymapKey, KeymapLayer, KeymapLayout } from "@keymapkit/models";
import { KeyboardModelFallback } from "./FallbackKeyboard";

const message = [
  `If you see this, you need to pass a keyboard model to the keymap-ui element.`,
];

/* A simple title screen layout with two layers, for demos
 */
export const FallbackLayout = new KeymapLayout({
  displayName: "Default Keyboard Layout",
  uniqueId: "fallback-keyboard",
  model: KeyboardModelFallback,
  layers: [
    KeymapLayer.fromKeyList({
      displayName: "ERROR: No keyboard available",
      shortName: "Default",
      welcome: message,
      keys: [
        new KeymapKey({
          name: "F",
          id: "fallback-keyboard-1-1",
          info: message,
        }),
        new KeymapKey({
          name: "A",
          id: "fallback-keyboard-3-1",
          info: message,
        }),
        new KeymapKey({
          name: "L",
          id: "fallback-keyboard-5-1",
          info: message,
        }),
        new KeymapKey({
          name: "L",
          id: "fallback-keyboard-7-1",
          info: message,
        }),
        new KeymapKey({
          name: "B",
          id: "fallback-keyboard-9-1",
          info: message,
        }),
        new KeymapKey({
          name: "A",
          id: "fallback-keyboard-11-1",
          info: message,
        }),
        new KeymapKey({
          name: "C",
          id: "fallback-keyboard-13-1",
          info: message,
        }),
        new KeymapKey({
          name: "K",
          id: "fallback-keyboard-15-1",
          info: message,
        }),
        new KeymapKey({
          name: "K",
          id: "fallback-keyboard-1-3",
          info: message,
        }),
        new KeymapKey({
          name: "E",
          id: "fallback-keyboard-3-3",
          info: message,
        }),
        new KeymapKey({
          name: "Y",
          id: "fallback-keyboard-5-3",
          info: message,
        }),
        new KeymapKey({
          name: "B",
          id: "fallback-keyboard-7-3",
          info: message,
        }),
        new KeymapKey({
          name: "O",
          id: "fallback-keyboard-9-3",
          info: message,
        }),
        new KeymapKey({
          name: "A",
          id: "fallback-keyboard-11-3",
          info: message,
        }),
        new KeymapKey({
          name: "R",
          id: "fallback-keyboard-13-3",
          info: message,
        }),
        new KeymapKey({
          name: "D",
          id: "fallback-keyboard-15-3",
          info: message,
        }),
      ],
    }),
  ],
  guides: [],
});
