import { KeymapKey } from "@keymapkit/models";
import { KeymapKeyboardElement } from "./keymap-keyboard";
import { KeymapKeyElement } from "./keymap-key";

/* KeymapKeygridElement: An HTML grid template for keyboard keys.
 *
 * A key grid is a sub-section of a keyboard.
 * Some keyboards might have just a single grid for the whole board.
 * An ErgoDox has a left finger grid, a left thumb cluster grid,
 * a right finger grid, and a right thumb cluster grid.
 *
 * Create child <keymap-key> elements directly,
 * or use the createKeys() method to create them from key data.
 * When creating keys in HTML, you must create child <keymap-key> elements
 * and set their attributes manually,
 * including setting an onclick function that emits a "key-selected" event.
 * When using createKeys(),
 * just pass in the list of key IDs and it will create the child elements for you
 * with the correct attributes and onclick functions.
 *
 * Attributes:
 *   name:                  The name of the grid, used for styling with keymap-keygrid[name=THISVALUE].
 *   cols:                  The number of columns in the grid
 *   rows:                  Number of rows in the grid
 */
export class KeymapKeygridElement extends HTMLElement {
  static readonly elementName = "keymap-keygrid";

  static get observedAttributes() {
    return ["name", "cols", "rows"];
  }

  constructor() {
    super();
  }

  /* Handle initial element creation
   */
  connectedCallback() {
    // Call attributeChangedCallback for each attribute to set initial state.
    const cols = this.getAttribute("cols") || "0";
    this.attributeChangedCallback("cols", "0", cols);
    const rows = this.getAttribute("rows") || "0";
    this.attributeChangedCallback("rows", "0", rows);
  }

  /* Handle attribute changes
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "name":
        break;
      case "cols":
        const cols = parseInt(newValue, 10) || 0;
        this.style.gridTemplateColumns = `repeat(${cols}, var(--keyboard-grid-unit))`;
        break;
      case "rows":
        const rows = parseInt(newValue, 10) || 0;
        this.style.gridTemplateRows = `repeat(${rows}, var(--keyboard-grid-unit))`;
        break;
      default:
        console.error(`KeymapKeygridElement: Unhandled attribute: ${name}`);
    }
  }

  /* Get all the child <keymap-key> elements
   */
  get keyElements(): KeymapKeyElement[] {
    return Array.from(
      this.querySelectorAll(KeymapKeyElement.elementName),
    ) as KeymapKeyElement[];
  }

  /* Get a list of all the key IDs of the child <keymap-key> elements
   */
  get keyIds() {
    return this.keyElements
      .filter((elem) => elem.hasAttribute("id"))
      .map((elem) => elem.getAttribute("id"));
  }

  /* Remove all child keys.
   * Useful when working with this element programmatically.
   */
  removeAllChildren() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }

  /* Create a single <keymap-key> element from key data
   */
  #createKey(keyboard: KeymapKeyboardElement, key: KeymapKey, idx: number) {
    const legendText = key.textLegend || key.name;
    const legendHtml = key.htmlLegend || "";
    const legendImage = key.imagePath || "";

    const keyElement = document.createElement(KeymapKeyElement.elementName);

    const physicalKey = keyboard.model.getPhysicalKey(key.id);

    keyElement.setAttribute("position", physicalKey.positionAttribute);
    keyElement.setAttribute("legend-text", legendText);
    keyElement.setAttribute("legend-html", legendHtml);
    keyElement.setAttribute("legend-image", legendImage);
    keyElement.setAttribute("id", key.id);

    // If true, place the key handle in the top half of the key.
    //
    const keyHandleTop = idx % 2 === 0;
    keyElement.setAttribute("key-handle-top", keyHandleTop.toString());

    keyElement.onclick = () => {
      keyElement.dispatchEvent(
        // TODO: Is there a better way to organize our code so that we don't have to do composed:true?
        // We allow this to pass through shadow DOM boundaries because
        // keymap-ui is the root and its descendents are in the shadow DOM.
        new CustomEvent("key-selected", {
          bubbles: true, // Allow event to bubble up to parent elements
          composed: true, // Allow event to pass through shadow DOM boundaries
          detail: key.id,
        }),
      );
    };

    this.appendChild(keyElement);

    return keyElement;
  }

  /* Create <keymap-key> elements from key data.
   *   keys:          List of KeymapKeyElement objects
   *   keyboard:      A KeymapKeyboard instance
   */
  createKeys(keyboard: KeymapKeyboardElement, keys: KeymapKey[]) {
    this.removeAllChildren();
    keys.forEach((key: KeymapKey, idx: number) => {
      this.#createKey(keyboard, key, idx);
    });
  }
}
