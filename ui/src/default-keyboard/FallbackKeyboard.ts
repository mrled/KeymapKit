import { Point, Size } from "@keymapkit/models";
import { KeyboardModel } from "@keymapkit/models";
import { KeymapKey } from "@keymapkit/models";
import { PhysicalKey } from "@keymapkit/models";
import { KeymapKeyboardElement } from "~/webcomponents/keymap-keyboard";
import { KeymapKeygridElement } from "~/webcomponents/keymap-keygrid";

/* The fallback keyboard model
 */
const KeyboardModelFallback = new KeyboardModel(
  "fallback-keyboard",
  "KeymapKit Fallback Keyboard",
  new Size(2, 2),
  new Size(2, 2),
  [
    new PhysicalKey("fallback-keyboard", new Point(1, 1), new Size(2, 2)), // F
    new PhysicalKey("fallback-keyboard", new Point(3, 1), new Size(2, 2)), // A
    new PhysicalKey("fallback-keyboard", new Point(5, 1), new Size(2, 2)), // L
    new PhysicalKey("fallback-keyboard", new Point(7, 1), new Size(2, 2)), // L
    new PhysicalKey("fallback-keyboard", new Point(9, 1), new Size(2, 2)), // B
    new PhysicalKey("fallback-keyboard", new Point(11, 1), new Size(2, 2)), // A
    new PhysicalKey("fallback-keyboard", new Point(13, 1), new Size(2, 2)), // C
    new PhysicalKey("fallback-keyboard", new Point(15, 1), new Size(2, 2)), // K

    new PhysicalKey("fallback-keyboard", new Point(1, 3), new Size(2, 2)), // K
    new PhysicalKey("fallback-keyboard", new Point(3, 3), new Size(2, 2)), // E
    new PhysicalKey("fallback-keyboard", new Point(5, 3), new Size(2, 2)), // Y
    new PhysicalKey("fallback-keyboard", new Point(7, 3), new Size(2, 2)), // B
    new PhysicalKey("fallback-keyboard", new Point(9, 3), new Size(2, 2)), // O
    new PhysicalKey("fallback-keyboard", new Point(11, 3), new Size(2, 2)), // A
    new PhysicalKey("fallback-keyboard", new Point(13, 3), new Size(2, 2)), // R
    new PhysicalKey("fallback-keyboard", new Point(15, 3), new Size(2, 2)), // D
  ],
);

/* The fallback keyboard element
 */
class FallbackKeyboardElement extends KeymapKeyboardElement {
  static elementName = "fallback-keyboard";

  constructor() {
    super();
  }

  model = KeyboardModelFallback;

  /* Create keygrid and key elements from key data for this board.
   */
  createChildren(keys: KeymapKey[]) {
    this.removeAllChildren();

    const gridContainer = document.createElement("div");
    gridContainer.className = "keygrid-container";
    this.appendChild(gridContainer);

    const keygrid = document.createElement(
      KeymapKeygridElement.elementName,
    ) as KeymapKeygridElement;
    keygrid.setAttribute("name", "fallback-keyboard");
    keygrid.setAttribute("cols", "16");
    keygrid.setAttribute("rows", "4");
    keygrid.createKeys(this, keys);
    gridContainer.appendChild(keygrid);
  }
}

if (!customElements.get(FallbackKeyboardElement.elementName)) {
  customElements.define(
    FallbackKeyboardElement.elementName,
    FallbackKeyboardElement,
  );
}

export { FallbackKeyboardElement, KeyboardModelFallback };
