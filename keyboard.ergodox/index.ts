import {
  PhysicalKey,
  KeymapKeyboardElement,
  Point,
  Size,
  KeymapKeygridElement,
  KeyboardModel,
  KeymapKey,
} from "@keymapkit/ui";

const KeyboardModelErgodox = new KeyboardModel(
  "keymap-keyboard-ergodox",
  "ErgoDox",
  new Size(2, 2),
  new Size(4, 3),
  [
    // Left fingers, number row
    new PhysicalKey("l-f", new Point(1, 1), new Size(3, 2)),
    new PhysicalKey("l-f", new Point(4, 1), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(6, 1), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(8, 1), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(10, 1), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(12, 1), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(14, 1), new Size(2, 2)),
    // Left fingers, qwerty row
    new PhysicalKey("l-f", new Point(1, 3), new Size(3, 2)),
    new PhysicalKey("l-f", new Point(4, 3), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(6, 3), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(8, 3), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(10, 3), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(12, 3), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(14, 3), new Size(2, 3)),
    // Left fingers, asdf row
    new PhysicalKey("l-f", new Point(1, 5), new Size(3, 2)),
    new PhysicalKey("l-f", new Point(4, 5), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(6, 5), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(8, 5), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(10, 5), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(12, 5), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(14, 6), new Size(2, 3)),
    // Left fingers, zxcv row
    new PhysicalKey("l-f", new Point(1, 7), new Size(3, 2)),
    new PhysicalKey("l-f", new Point(4, 7), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(6, 7), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(8, 7), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(10, 7), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(12, 7), new Size(2, 2)),
    // Left fingers, bottom row
    new PhysicalKey("l-f", new Point(2, 9), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(4, 9), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(6, 9), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(8, 9), new Size(2, 2)),
    new PhysicalKey("l-f", new Point(10, 9), new Size(2, 2)),
    /* Left thumb
     *
     *       0 2 4
     *     +------+
     *   0 |   A B
     *   2 | C D E
     *   4 | C D F
     */
    new PhysicalKey("l-t", new Point(3, 1), new Size(2, 2)), // A
    new PhysicalKey("l-t", new Point(5, 1), new Size(2, 2)), // B
    new PhysicalKey("l-t", new Point(1, 3), new Size(2, 4)), // C
    new PhysicalKey("l-t", new Point(3, 3), new Size(2, 4)), // D
    new PhysicalKey("l-t", new Point(5, 3), new Size(2, 2)), // E
    new PhysicalKey("l-t", new Point(5, 5), new Size(2, 2)), // F
    // Right fingers, number row
    new PhysicalKey("r-f", new Point(1, 1), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(3, 1), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(5, 1), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(7, 1), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(9, 1), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(11, 1), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(13, 1), new Size(3, 2)),
    // Right fingers, qwerty row
    new PhysicalKey("r-f", new Point(1, 3), new Size(2, 3)),
    new PhysicalKey("r-f", new Point(3, 3), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(5, 3), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(7, 3), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(9, 3), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(11, 3), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(13, 3), new Size(3, 2)),
    // Right fingers, asdf row
    new PhysicalKey("r-f", new Point(1, 6), new Size(2, 3)),
    new PhysicalKey("r-f", new Point(3, 5), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(5, 5), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(7, 5), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(9, 5), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(11, 5), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(13, 5), new Size(3, 2)),
    // Right fingers, zxcv row
    new PhysicalKey("r-f", new Point(3, 7), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(5, 7), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(7, 7), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(9, 7), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(11, 7), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(13, 7), new Size(3, 2)),
    // Right fingers, bottom row
    new PhysicalKey("r-f", new Point(5, 9), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(7, 9), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(9, 9), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(11, 9), new Size(2, 2)),
    new PhysicalKey("r-f", new Point(13, 9), new Size(2, 2)),
    /* Right thumb
     *
     *       0 2 4
     *     +------+
     *   0 | A B
     *   2 | C D E
     *   4 | F D E
     */
    new PhysicalKey("r-t", new Point(1, 1), new Size(2, 2)), // A
    new PhysicalKey("r-t", new Point(3, 1), new Size(2, 2)), // B
    new PhysicalKey("r-t", new Point(1, 3), new Size(2, 2)), // C
    new PhysicalKey("r-t", new Point(3, 3), new Size(2, 4)), // D
    new PhysicalKey("r-t", new Point(5, 3), new Size(2, 4)), // E
    new PhysicalKey("r-t", new Point(1, 5), new Size(2, 2)), // F
  ],
);

/* Custom stylesheet for the ErgoDox keyboard.
 */
const ergodoxStyleSheet = `
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
    font-size: 1.125rem;
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

/* Left and right thumb clusters of an ErgoDox keyboard */
keymap-keygrid[name="ergodox-left-thumb"] {
  transform: translateX(calc(var(--keyboard-grid-unit) * -2))
    translateY(calc(var(--keyboard-grid-unit) * 6)) rotate(25deg);
  transform-origin: 0 calc(var(--keyboard-grid-unit) * 2);
  padding-bottom: calc(var(--keyboard-grid-unit) * 9);
}
keymap-keygrid[name="ergodox-right-thumb"] {
  transform: translateX(calc(var(--keyboard-grid-unit) * 2))
    translateY(calc(var(--keyboard-grid-unit) * 6)) rotate(-25deg);
  transform-origin: calc(var(--keyboard-grid-unit) * 6)
    calc(var(--keyboard-grid-unit) * 2);
  padding-bottom: calc(var(--keyboard-grid-unit) * 9);
}

`;

/* An ErgoDox keyboard.
 */
class KeymapKeyboardErgodoxElement extends KeymapKeyboardElement {
  static elementName = "keymap-keyboard-ergodox";

  constructor() {
    super();
  }

  model = KeyboardModelErgodox;

  fingerGridCols = "15";
  fingerGridRows = "10";
  thumbGridCols = "6";
  thumbGridRows = "6";

  /* Create keygrid and key elements from key data for this board.
   */
  createChildren(keys: KeymapKey[]) {
    this.removeAllChildren();

    const style = document.createElement("style");
    style.textContent = ergodoxStyleSheet;
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
    leftFingerGrid.setAttribute("name", "ergodox-left-finger");
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
    leftThumbGrid.setAttribute("name", "ergodox-left-thumb");
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
    rightFingerGrid.setAttribute("name", "ergodox-right-finger");
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
    rightThumbGrid.setAttribute("name", "ergodox-right-thumb");
    rightThumbGrid.setAttribute("cols", this.thumbGridCols);
    rightThumbGrid.setAttribute("rows", this.thumbGridRows);
    const rightThumbKeys = keys.filter(
      (key) => this.model.getPhysicalKey(key.id).boardId === "r-t",
    );
    rightThumbGrid.createKeys(this, rightThumbKeys);
    rightGridContainer.appendChild(rightThumbGrid);
  }
}

if (!customElements.get(KeymapKeyboardErgodoxElement.elementName)) {
  customElements.define(
    KeymapKeyboardErgodoxElement.elementName,
    KeymapKeyboardErgodoxElement,
  );
}

export { KeymapKeyboardErgodoxElement, KeyboardModelErgodox };
