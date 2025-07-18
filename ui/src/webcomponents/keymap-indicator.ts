import {
  keyInfoConnectFromClass,
  keyInfoConnectFromClassPrefix,
} from "~/lib/DiagramConnections";

/* KeymapIndicatorElement: an element off the keyboard that points to some key on the keyboard via a diagram line.
 */
export class KeymapIndicatorElement extends HTMLElement {
  static readonly elementName = "keymap-indicator";

  static get observedAttributes() {
    return ["id"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.updateComponent();
  }

  attributeChangedCallback(
    _name: string,
    _oldValue: string,
    _newValue: string,
  ) {
    this.updateComponent();
  }

  updateComponent() {
    const keyId = this.getAttribute("id");
    if (keyId) {
      const connectToId = `${keyInfoConnectFromClassPrefix}${keyId}`;
      this.classList.add(keyInfoConnectFromClass);
      this.classList.add(connectToId);
    }
  }
}
