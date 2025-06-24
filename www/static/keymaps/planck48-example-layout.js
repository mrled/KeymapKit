import { KeymapLayout, KeymapKey, KeymapLayer } from "@keymapkit/ui";
import { KeyboardModelPlanck48 } from "@keymapkit/keyboard.planck48";

export const Planck48ExampleLayout = new KeymapLayout({
  // The display name for the keymap; sometimes shown to users
  displayName: "Planck 48 Example",

  // The ID must be unique in a given `keymap-ui` element
  uniqueId: "planck48-example-layout",

  // The model must be an existing keyboard model
  model: KeyboardModelPlanck48,

  // Layers is a list of KeymapLayer objects
  // The first layer in the list is shown first
  layers: [
    // Define just a single layer
    KeymapLayer.fromKeyList({
      // A display name for the layer; sometimes shown to users
      displayName: "Planck 48 Main Layer",

      // A short name, used in buttons for switching between layers
      shortName: "Main",

      // The welcome page for the layer. When loading the layer, show this by default.
      welcome: [
        `Hello, and welcome to the example Planck keymap!`,
        `This welcome message is shown when the keymap loads.`,
      ],

      // A list of keys
      // Each key has a name, ID, and info,
      // which in this case is all set to the same thing
      keys: [
        new KeymapKey({ name: "K", id: "planck-1-1", info: ["1st K key"] }),
        new KeymapKey({ name: "E", id: "planck-3-1", info: ["The E key"] }),
        new KeymapKey({ name: "Y", id: "planck-5-1", info: ["The Y key"] }),
        new KeymapKey({ name: "M", id: "planck-7-1", info: ["The M key"] }),
        new KeymapKey({ name: "A", id: "planck-9-1", info: ["The A key"] }),
        new KeymapKey({ name: "P", id: "planck-11-1", info: ["The P key"] }),
        new KeymapKey({ name: ".", id: "planck-13-1", info: ["The . key"] }),
        new KeymapKey({ name: "C", id: "planck-15-1", info: ["1st C key"] }),
        new KeymapKey({ name: "L", id: "planck-17-1", info: ["The L key"] }),
        new KeymapKey({ name: "I", id: "planck-19-1", info: ["The I key"] }),
        new KeymapKey({ name: "C", id: "planck-21-1", info: ["2nd C key"] }),
        new KeymapKey({ name: "K", id: "planck-23-1", info: ["2nd K key"] }),
      ],
    }),
  ],
  guides: [],
});
