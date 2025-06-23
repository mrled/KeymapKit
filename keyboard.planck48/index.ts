import {
  KeyboardModel,
  KeymapKey,
  KeymapKeyboardElement,
  KeymapKeygridElement,
  PhysicalKey,
  Point,
  Size,
} from "@keymapkit/ui";

/* A Planck keyboard with 48 keys (all 1U keys, no 2U keys).
 */
const KeyboardModelPlanck48 = new KeyboardModel(
  "keymap-keyboard-planck48",
  "Planck 48",
  new Size(2, 2),
  new Size(4, 3),
  [
    // Top row
    new PhysicalKey("planck", new Point(1, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(3, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(5, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(7, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(9, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(11, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(13, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(15, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(17, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(19, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(21, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(23, 1), new Size(2, 2)),
    // Second row
    new PhysicalKey("planck", new Point(1, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(3, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(5, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(7, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(9, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(11, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(13, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(15, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(17, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(19, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(21, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(23, 3), new Size(2, 2)),
    // Third row
    new PhysicalKey("planck", new Point(1, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(3, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(5, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(7, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(9, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(11, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(13, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(15, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(17, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(19, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(21, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(23, 5), new Size(2, 2)),
    // Bottom row
    new PhysicalKey("planck", new Point(1, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(3, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(5, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(7, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(9, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(11, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(13, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(15, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(17, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(19, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(21, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(23, 7), new Size(2, 2)),
  ],
);

/* A 48-key Planck keyboard.
 */
class KeymapKeyboardPlanck48Element extends KeymapKeyboardElement {
  static readonly elementName: string = "keymap-keyboard-planck48";
  readonly elementName = KeymapKeyboardPlanck48Element.elementName;

  constructor() {
    super();
  }

  readonly model = KeyboardModelPlanck48;

  readonly columns: number = 24;
  readonly rows: number = 8;

  /* Create keygrid and key elements from key data for this board.
   */
  createChildren(keys: KeymapKey[]) {
    this.removeAllChildren();

    const gridContainer = document.createElement("div");
    gridContainer.className = "keygrid-container";
    this.appendChild(gridContainer);

    const keyGrid = document.createElement(
      KeymapKeygridElement.elementName,
    ) as KeymapKeygridElement;
    keyGrid.setAttribute("name", "planck48");
    keyGrid.setAttribute("cols", this.columns.toString());
    keyGrid.setAttribute("rows", this.rows.toString());
    keyGrid.createKeys(this, keys);
    gridContainer.appendChild(keyGrid);
  }
}

if (!customElements.get(KeymapKeyboardPlanck48Element.elementName)) {
  customElements.define(
    KeymapKeyboardPlanck48Element.elementName,
    KeymapKeyboardPlanck48Element,
  );
}

export { KeymapKeyboardPlanck48Element, KeyboardModelPlanck48 };
