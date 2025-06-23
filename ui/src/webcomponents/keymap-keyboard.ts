/* A class representing any keyboard.
 *
 * Specific boards should extend this class.
 */

import { KeymapKey } from "~/lib/Layout";
import { KeymapKeyElement } from "./keymap-key";
import { KeyboardModel } from "~/lib/KeyboardModel";

export abstract class KeymapKeyboardElement extends HTMLElement {
  constructor() {
    super();
  }

  /* The element name of the keyboard.
   * This name should be passed to customElements.define() when registering the keyboard.
   *
   * Subclasses must implement this property.
   *
   * Note that in addition to this INSTANCE property,
   * there will usually also be a STATIC property of the same name.
   * The KeymapUIElement and state uses the instance property;
   * the customElements.define() call uses the static property.
   * TODO: Can we make this nicer?
   * I think we can't; TypeScript doesn't support abstract static properties or interface static properties.
   *
   * The recommended approach is to define the static property
   * and then have the instance property return the static property.
   */
  static readonly elementName: string;
  abstract readonly elementName: string;

  /* The model for the keyboard, contains information about physical keys etc.
   */
  abstract model: KeyboardModel;

  /* Get all the child <keymap-key> elements.
   */
  get keyElements() {
    return Array.from(
      this.querySelectorAll(KeymapKeyElement.elementName),
    ) as KeymapKeyElement[];
  }

  /* Subclasses should implement this method to create child elements.
   */
  abstract createChildren(keys: KeymapKey[]): void;

  /* A helper to remove all child elements.
   */
  removeAllChildren() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }
}
