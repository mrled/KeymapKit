/* A class representing any keyboard.
 *
 * Specific boards should extend this class.
 */

import { KeymapKey } from "@keymapkit/models";
import { KeymapKeyElement } from "./keymap-key";
import { KeyboardModel } from "@keymapkit/models";

export abstract class KeymapKeyboardElement extends HTMLElement {
  //
  // #region Abstract methods and properties
  //

  /* The element name of the keyboard.
   * This name should be passed to customElements.define() when registering the keyboard.
   *
   * THIS IS NOT AN ABSTRACT PROPERTY, BUT SUBCLASSES MUST OVERRIDE IT.
   *
   * Unfortunately, TypeScript does not support abstract static properties,
   * so we cannot require this at compile time.
   * If you forget to implement this property,
   * your keyboard will be a <missing-keyboard-element-name> element,
   * and if two keyboards forget to implement it they'll overwrite each other.
   */
  static readonly elementName: string = "missing-keyboard-element-name";

  /* The model for the keyboard, contains information about physical keys etc.
   */
  abstract model: KeyboardModel;

  /* Subclasses should implement this method to create child elements.
   */
  abstract createChildren(keys: KeymapKey[]): void;

  // #endregion

  //
  // #region Base class methods and properties
  //

  constructor() {
    super();
  }

  /* An instance property that returns the element name from the static property.
   *
   * The instance property is required by KeymapUIElement and state.
   * The static property is used by customElements.define() and elsewhere.
   */
  get elementName(): string {
    return (this.constructor as typeof KeymapKeyboardElement)["elementName"];
  }

  /* Get all the child <keymap-key> elements.
   */
  get keyElements() {
    return Array.from(
      this.querySelectorAll(KeymapKeyElement.elementName),
    ) as KeymapKeyElement[];
  }

  /* A helper to remove all child elements.
   */
  removeAllChildren() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }

  // #endregion
}
