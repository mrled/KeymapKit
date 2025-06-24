import {
  KeyboardModel,
  KeymapKeyboardElement,
  KeymapKeygridElement,
  PhysicalKey,
  Point,
  Size,
} from "@keymapkit/ui";

/* The title screen keyboard model
 */
const KeyboardModelTitleScreen = new KeyboardModel(
  "title-screen-keyboard",
  "KeymapKit Title Screen Keyboard",
  new Point(2, 2),
  new Size(2, 2),
  [
    new PhysicalKey("title", new Point(1, 1), new Size(2, 2)), // K
    new PhysicalKey("title", new Point(3, 1), new Size(2, 2)), // E
    new PhysicalKey("title", new Point(5, 1), new Size(2, 2)), // Y
    new PhysicalKey("title", new Point(7, 1), new Size(2, 2)), // M
    new PhysicalKey("title", new Point(9, 1), new Size(2, 2)), // A
    new PhysicalKey("title", new Point(11, 1), new Size(2, 2)), // P
    new PhysicalKey("title", new Point(13, 1), new Size(2, 2)), // K
    new PhysicalKey("title", new Point(15, 1), new Size(2, 2)), // I
    new PhysicalKey("title", new Point(17, 1), new Size(2, 2)), // T
  ],
);

/* The title screen keyboard element
 */
class KeymapKeyboardTitleScreenElement extends KeymapKeyboardElement {
  static elementName = "title-screen-keyboard";

  constructor() {
    super();
  }

  model = KeyboardModelTitleScreen;

  /* Create keygrid and key elements from key data for this board.
   */
  createChildren(keys) {
    this.removeAllChildren();

    const gridContainer = document.createElement("div");
    gridContainer.className = "keygrid-container";
    this.appendChild(gridContainer);

    const keygrid = document.createElement(KeymapKeygridElement.elementName);
    keygrid.setAttribute("name", "title-screen");
    keygrid.setAttribute("cols", "24");
    keygrid.setAttribute("rows", "2");
    keygrid.createKeys(this, keys);
    gridContainer.appendChild(keygrid);
  }
}

if (!customElements.get(KeymapKeyboardTitleScreenElement.elementName)) {
  customElements.define(
    KeymapKeyboardTitleScreenElement.elementName,
    KeymapKeyboardTitleScreenElement,
  );
}

export { KeymapKeyboardTitleScreenElement, KeyboardModelTitleScreen };
