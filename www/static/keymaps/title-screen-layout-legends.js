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
          name: "pi",
          id: "title-9-1",
          htmlLegend: "&pi;",
          info: [
            "An HTML legend, using the HTML entity for pi.",
            "This is not an image &mdash; it is the HTML entity <code>&amp;pi;</code> .",
          ],
        }),
        new KeymapKey({
          name: "win",
          id: "title-11-1",
          htmlLegend: `
            <div style="width: 1rem; height: 1rem;">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <title>windows</title>
                <path d="M12.882 15.997c-1.491-0.766-2.94-1.155-4.309-1.155-0.186 0-0.373 0.006-0.561 0.022-1.746 0.145-3.341 0.605-4.367 0.963-0.272 0.1-0.551 0.205-0.838 0.322l-2.807 9.731c1.928-0.713 3.634-1.061 5.196-1.061 2.526 0 4.36 0.944 5.875 1.916 0.718-2.435 2.439-8.315 2.953-10.073-0.373-0.228-0.752-0.455-1.141-0.666zM16.511 18.471l-2.826 9.817c0.838 0.48 3.659 2.002 5.819 2.002 1.744 0 3.695-0.447 5.964-1.369l2.699-9.437c-1.832 0.591-3.59 0.891-5.233 0.891-2.998 0-5.097-0.972-6.422-1.905zM9.151 11.525c2.41 0.025 4.192 0.944 5.669 1.891l2.899-9.917c-0.611-0.35-2.213-1.222-3.371-1.519-0.762-0.178-1.563-0.269-2.413-0.269-1.619 0.030-3.387 0.436-5.403 1.244l-2.764 9.706c2.025-0.764 3.77-1.136 5.378-1.136 0.001 0 0.004 0 0.004 0zM32 6.191c-1.838 0.713-3.631 1.077-5.345 1.077-2.865 0-4.978-0.994-6.347-1.949l-2.873 9.945c1.93 1.241 4.009 1.871 6.191 1.871 1.78 0 3.623-0.427 5.483-1.271l-0.006-0.069 0.117-0.028 2.779-9.576z"></path>
              </svg>
            </div>
          `,
          imageAttribution:
            "CC BY 4.0, published by <a href='https://icomoon.io/'>IcoMoon</a>",
          info: [
            "An HTML legend, using an embedded SVG.",
            "This legend is a <code>&lt;div&gt;</code> element with a <code>style=</code> attribute to set the size and an <code>&lt;svg&gt;</code> inside it.",
          ],
        }),
        new KeymapKey({
          name: "shift",
          id: "title-13-1",
          htmlLegend: `<span style="font-size: 2em;">⇧</span>`,
          info: [
            "An HTML legend, using a simple HTML element.",
            "This legend consts of a a <code>&lt;span&gt;</code> containing a Unicode character.",
            "It has a <code>style</code> attribute to set the character to double default size, which is useful for characters like the Unicode shift character displayed here that are very small at default size.",
          ],
        }),
        new KeymapKey({
          name: "menu",
          id: "title-15-1",
          imagePath: "/KeymapKit/legends/menu-key.svg",
          imageAttribution:
            "Public Domain, by <a href='https://freesvg.org/menu-key-icon-vector-illustration'>OpenClipart</a>.",
          info: [
            "An image legend.",
            "The image is loaded from a separate file on the webserver.",
            "Images are constrained to be 1rem x 1rem so that they fit inside the key. For more control than this, you have to use an HTML legend.",
          ],
        }),
        new KeymapKey({ name: "", id: "title-17-1", unset: true }),
      ],
    }),
  ],
  guides: [],
});
