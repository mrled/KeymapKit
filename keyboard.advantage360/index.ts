import {
  PhysicalKey,
  KeymapKeyboardElement,
  Point,
  Size,
  KeymapKeygridElement,
  KeyboardModel,
  KeymapKey,
} from "@keymapkit/ui";

export const KeyboardModelAdvantage360 = new KeyboardModel(
  "keymap-keyboard-advantage360",
  "Kinesis Advantage 360",
  new Size(4, 4),
  new Size(4, 8),
  [
    // Left fingers, number row
    new PhysicalKey("l-f", new Point(1, 1), new Size(5, 4)),
    new PhysicalKey("l-f", new Point(6, 1), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(10, 1), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(14, 1), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(18, 1), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(22, 1), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(26, 1), new Size(4, 4)),
    // Left fingers, qwerty row
    new PhysicalKey("l-f", new Point(1, 5), new Size(5, 4)),
    new PhysicalKey("l-f", new Point(6, 5), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(10, 5), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(14, 5), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(18, 5), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(22, 5), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(26, 5), new Size(4, 4)),
    // Left fingers, asdf row
    new PhysicalKey("l-f", new Point(1, 9), new Size(5, 4)),
    new PhysicalKey("l-f", new Point(6, 9), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(10, 9), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(14, 9), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(18, 9), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(22, 9), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(26, 9), new Size(4, 4)),
    // Left fingers, zxcv row
    new PhysicalKey("l-f", new Point(1, 13), new Size(5, 4)),
    new PhysicalKey("l-f", new Point(6, 13), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(10, 13), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(14, 13), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(18, 13), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(22, 13), new Size(4, 4)),
    // Left fingers, bottom row
    new PhysicalKey("l-f", new Point(1, 17), new Size(5, 4)),
    new PhysicalKey("l-f", new Point(6, 17), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(10, 17), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(14, 17), new Size(4, 4)),
    new PhysicalKey("l-f", new Point(18, 17), new Size(4, 4)),
    /* Left thumb
     *
     *       1 5 9
     *     +------+
     *   1 |   A B
     *   5 | C D E
     *   9 | C D F
     */
    new PhysicalKey("l-t", new Point(5, 1), new Size(4, 4)), // A
    new PhysicalKey("l-t", new Point(9, 1), new Size(4, 4)), // B
    new PhysicalKey("l-t", new Point(1, 5), new Size(4, 8)), // C
    new PhysicalKey("l-t", new Point(5, 5), new Size(4, 8)), // D
    new PhysicalKey("l-t", new Point(9, 5), new Size(4, 4)), // E
    new PhysicalKey("l-t", new Point(9, 9), new Size(4, 4)), // F

    // Right fingers, number row
    new PhysicalKey("r-f", new Point(1, 1), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(5, 1), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(9, 1), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(13, 1), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(17, 1), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(21, 1), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(25, 1), new Size(5, 4)),
    // Right fingers, qwerty row
    new PhysicalKey("r-f", new Point(1, 5), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(5, 5), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(9, 5), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(13, 5), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(17, 5), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(21, 5), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(25, 5), new Size(5, 4)),
    // Right fingers, asdf row
    new PhysicalKey("r-f", new Point(1, 9), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(5, 9), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(9, 9), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(13, 9), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(17, 9), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(21, 9), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(25, 9), new Size(5, 4)),
    // Right fingers, zxcv row
    new PhysicalKey("r-f", new Point(5, 13), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(9, 13), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(13, 13), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(17, 13), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(21, 13), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(25, 13), new Size(5, 4)),
    // Right fingers, bottom row
    new PhysicalKey("r-f", new Point(9, 17), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(13, 17), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(17, 17), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(21, 17), new Size(4, 4)),
    new PhysicalKey("r-f", new Point(25, 17), new Size(5, 4)),
    /* Right thumb
     *
     *       1 5 9
     *     +------+
     *   1 | A B
     *   5 | C D E
     *   9 | F D E
     */
    new PhysicalKey("r-t", new Point(1, 1), new Size(4, 4)), // A
    new PhysicalKey("r-t", new Point(5, 1), new Size(4, 4)), // B
    new PhysicalKey("r-t", new Point(1, 5), new Size(4, 4)), // C
    new PhysicalKey("r-t", new Point(5, 5), new Size(4, 8)), // D
    new PhysicalKey("r-t", new Point(9, 5), new Size(4, 8)), // E
    new PhysicalKey("r-t", new Point(1, 9), new Size(4, 4)), // F
  ],
);

/* Custom stylesheet
 */
const styleSheet = `
/* Make sure the keyboard fits in its container.
 * This **overrides the same selectors in keymap-ui**,
 * because later rules win, and keyboard elements are added after the UI adds its style element.
 */
@container (max-width: 539px) {
  .keymap-ui-kid-container {
    --keyboard-grid-unit: 0.375rem;
  }
}
@container (min-width: 540px) {
  .keymap-ui-kid-container {
    --keyboard-grid-unit: 0.5rem;
  }
}
@container (min-width: 785px) {
  .keymap-ui-kid-container {
    --keyboard-grid-unit: 0.625rem;
  }
}

/* Override font size for key elements.
 *
 * Double the font sizes from the default 2x scaled used by the Planck and the ErgoDox,
 * since we are using a 4x scaled grid.
 */
keymap-key {
  &.legend-type-glyph {
    font-size: calc(var(--keyboard-grid-unit) * 0.9 * 2);
  }
  &.legend-type-text {
    font-size: calc(var(--keyboard-grid-unit) * 0.667 * 2);
  }
}

/* A sub-keyboard is a contiguous set of keys
 *
 * Each sub-board contains one or more keygrids.
 * A sub-board is independently positionable on the screen.
 *
 * It is made up of a title and a div containing the keygrids.
 */
div.keyboard-sub-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  & > h2 {
    font-size: 1.125em;
  }
  & > .keygrid-container {
    display: flex;
  }
}
div.keyboard-sub-board-left {
  & > h2 {
    margin-right: auto;
  }
  & > .keygrid-container {
    flex-direction: row;
  }
}
div.keyboard-sub-board-right {
  & > h2 {
    margin-left: auto;
  }
  & > .keygrid-container {
    flex-direction: row-reverse;
  }
}

/* Left and right thumb clusters of an Advantage360 keyboard */
keymap-keygrid[name="advantage360-left-thumb"] {
  transform: translateX(calc(var(--keyboard-grid-unit) * -6))
    translateY(calc(var(--keyboard-grid-unit) * 14)) rotate(25deg);
  transform-origin: 0 calc(var(--keyboard-grid-unit) * 4);
  padding-bottom: calc(var(--keyboard-grid-unit) * 18);
}
keymap-keygrid[name="advantage360-right-thumb"] {
  transform: translateX(calc(var(--keyboard-grid-unit) * 6))
    translateY(calc(var(--keyboard-grid-unit) * 14)) rotate(-25deg);
  transform-origin: calc(var(--keyboard-grid-unit) * 12)
    calc(var(--keyboard-grid-unit) * 4);
  padding-bottom: calc(var(--keyboard-grid-unit) * 18);
}

`;

/* An Advantage360 keyboard.
 */
export class KeymapKeyboardAdvantage360Element extends KeymapKeyboardElement {
  static elementName = "keymap-keyboard-advantage360";

  constructor() {
    super();
  }

  model = KeyboardModelAdvantage360;

  fingerGridCols = "30";
  fingerGridRows = "20";
  thumbGridCols = "12";
  thumbGridRows = "12";

  /* Create keygrid and key elements from key data for this board.
   */
  createChildren(keys: KeymapKey[]) {
    this.removeAllChildren();

    const style = document.createElement("style");
    style.textContent = styleSheet;
    this.appendChild(style);

    const leftSubBoard = document.createElement("div");
    leftSubBoard.className = "keyboard-sub-board keyboard-sub-board-left";
    this.appendChild(leftSubBoard);

    const leftTitle = document.createElement("h2");
    leftTitle.textContent = "Left hand";
    leftSubBoard.appendChild(leftTitle);

    const leftGridContainer = document.createElement("div");
    leftGridContainer.className = "keygrid-container";
    leftSubBoard.appendChild(leftGridContainer);

    const leftFingerGrid = document.createElement(
      KeymapKeygridElement.elementName,
    ) as KeymapKeygridElement;
    leftFingerGrid.setAttribute("name", "advantage360-left-finger");
    leftFingerGrid.setAttribute("cols", this.fingerGridCols);
    leftFingerGrid.setAttribute("rows", this.fingerGridRows);
    const leftFingerKeys = keys.filter(
      (key) => this.model.getPhysicalKey(key.id).boardId === "l-f",
    );
    leftFingerGrid.createKeys(this, leftFingerKeys);
    leftGridContainer.appendChild(leftFingerGrid);

    const leftThumbGrid = document.createElement(
      KeymapKeygridElement.elementName,
    ) as KeymapKeygridElement;
    leftThumbGrid.setAttribute("name", "advantage360-left-thumb");
    leftThumbGrid.setAttribute("cols", this.thumbGridCols);
    leftThumbGrid.setAttribute("rows", this.thumbGridRows);
    const leftThumbKeys = keys.filter(
      (key) => this.model.getPhysicalKey(key.id).boardId === "l-t",
    );
    leftThumbGrid.createKeys(this, leftThumbKeys);
    leftGridContainer.appendChild(leftThumbGrid);

    const rightSubBoard = document.createElement("div");
    rightSubBoard.className = "keyboard-sub-board keyboard-sub-board-right";
    this.appendChild(rightSubBoard);

    const rightTitle = document.createElement("h2");
    rightTitle.textContent = "Right hand";
    rightSubBoard.appendChild(rightTitle);

    const rightGridContainer = document.createElement("div");
    rightGridContainer.className = "keygrid-container";
    rightSubBoard.appendChild(rightGridContainer);

    const rightFingerGrid = document.createElement(
      KeymapKeygridElement.elementName,
    ) as KeymapKeygridElement;
    rightFingerGrid.setAttribute("name", "advantage360-right-finger");
    rightFingerGrid.setAttribute("cols", this.fingerGridCols);
    rightFingerGrid.setAttribute("rows", this.fingerGridRows);
    const rightFingerKeys = keys.filter(
      (key) => this.model.getPhysicalKey(key.id).boardId === "r-f",
    );
    rightFingerGrid.createKeys(this, rightFingerKeys);
    rightGridContainer.appendChild(rightFingerGrid);

    const rightThumbGrid = document.createElement(
      KeymapKeygridElement.elementName,
    ) as KeymapKeygridElement;
    rightThumbGrid.setAttribute("name", "advantage360-right-thumb");
    rightThumbGrid.setAttribute("cols", this.thumbGridCols);
    rightThumbGrid.setAttribute("rows", this.thumbGridRows);
    const rightThumbKeys = keys.filter(
      (key) => this.model.getPhysicalKey(key.id).boardId === "r-t",
    );
    rightThumbGrid.createKeys(this, rightThumbKeys);
    rightGridContainer.appendChild(rightThumbGrid);
  }
}

if (!customElements.get(KeymapKeyboardAdvantage360Element.elementName)) {
  customElements.define(
    KeymapKeyboardAdvantage360Element.elementName,
    KeymapKeyboardAdvantage360Element,
  );
}
