import { PhysicalKey } from "@keymapkit/models";
import { KeymapKeyboardElement } from "~/webcomponents/keymap-keyboard";
import { KeymapKey, KeymapLayer } from "@keymapkit/models";
import { KeymapKeygridElement } from "~/webcomponents/keymap-keygrid";
import { KeymapKeyElement } from "./keymap-key";
import { Point, Size } from "@keymapkit/models";
import { KeyboardModel } from "@keymapkit/models";

/* The faux keyboard in the title bar.
 *
 * It will contain just one key, which will be a copy of the selected key in the reference keyboard.
 */
export class KeymapKeyboardTitleBarElement extends KeymapKeyboardElement {
  static readonly elementName = "keymap-keyboard-title-bar";

  keymapKey: KeymapKey | null = null;
  keyElement: KeymapKeyElement | null = null;
  private _physicalKeys: PhysicalKey[] = [];
  titleKey: PhysicalKey;
  private _model: KeyboardModel;

  constructor() {
    super();
    this.titleKey = new PhysicalKey(
      "title-bar",
      new Point(0, 0),
      // This doesn't matter; it will be set in updateSelectedKey()
      new Size(1, 1),
    );
    this._physicalKeys = [this.titleKey];
    // Initialize with default size, will be updated when referenceModel is set
    this._model = new KeyboardModel(
      KeymapKeyboardTitleBarElement.elementName,
      "TitleBar",
      new Point(2, 2),
      new Size(2, 2),
      this._physicalKeys,
    );
  }

  get model(): KeyboardModel {
    return this._model;
  }

  _referenceModel: KeyboardModel | null = null;
  get referenceModel(): KeyboardModel | null {
    return this._referenceModel;
  }
  set referenceModel(model: KeyboardModel | null) {
    this._referenceModel = model;
    if (model) {
      this._model = new KeyboardModel(
        KeymapKeyboardTitleBarElement.elementName,
        model.displayName,
        model.defaultBlankKeySize,
        model.maxKeySize,
        this._physicalKeys,
      );
    }
  }

  _grid: KeymapKeygridElement | null = null;
  get grid(): KeymapKeygridElement {
    if (!this._grid) {
      this._grid = this.querySelector(
        KeymapKeygridElement.elementName,
      ) as KeymapKeygridElement;
    }
    if (!this._grid) {
      this._grid = document.createElement(
        KeymapKeygridElement.elementName,
      ) as KeymapKeygridElement;
      this.appendChild(this._grid);
      this.grid.setAttribute("name", "title-bar");
    }
    return this._grid;
  }

  connectedCallback() {}

  attributeChangedCallback(
    _name: string,
    _oldValue: string,
    _newValue: string,
  ) {}

  /* Update the selected key.
   *
   * Creates a new KeymapKey object with the same data as the selected key,
   * but with changes made so it can be displayed in the title bar.
   * Returns that object.
   *
   * Parameters:
   * - keymapLayer: the current layer of the keymap
   * - referenceModel: the model for the keyboard being displayed in the main area
   * - selectedKeyId: the ID of the selected key
   */
  updateSelectedKey(
    keymapLayer: KeymapLayer,
    referenceModel: KeyboardModel,
    selectedKeyId: string,
  ): KeymapKey {
    // Update the reference model if it has changed
    if (this.referenceModel !== referenceModel) {
      this.referenceModel = referenceModel;
    }

    this.grid.setAttribute("cols", this.model.maxKeySize.x.toString());
    this.grid.setAttribute("rows", this.model.maxKeySize.y.toString());

    if (!selectedKeyId) {
      this.keymapKey = new KeymapKey({
        name: "",
        id: "title-bar-0-0",
        info: [],
        selection: [],
        textLegend: "",
        imagePath: "",
        imageAttribution: "",
        unset: true,
      });

      this.titleKey = new PhysicalKey(
        "title-bar",
        new Point(0, 0),
        this.model.defaultBlankKeySize,
      );
    } else {
      const selectedKey = keymapLayer.keys.get(selectedKeyId);
      if (!selectedKey) {
        throw new Error(`Key not found: ${selectedKeyId}`);
      }
      this.keymapKey = new KeymapKey({
        name: selectedKey.name,
        id: "title-bar-0-0",
        info: selectedKey.info.map((s) => s),
        selection: [],
        textLegend: selectedKey.textLegend,
        imagePath: selectedKey.imagePath,
        imageAttribution: selectedKey.imageAttribution,
        unset: selectedKey.unset,
      });
      const activePhysicalKey = referenceModel.getPhysicalKey(selectedKeyId);

      this.titleKey.size.x = activePhysicalKey.size.x;
      this.titleKey.size.y = activePhysicalKey.size.y;
    }

    this.grid.removeAllChildren();
    this.grid.createKeys(this, [this.keymapKey]);
    this.keyElement = this.grid.keyElements[0];
    this.keyElement.setAttribute("position", this.titleKey.positionAttribute);
    this.keyElement.setAttribute("active", "true");
    this.keyElement.onclick = () => {};

    return this.keymapKey;
  }

  createChildren(_keys: KeymapKey[]) {
    // TODO: handle this more elegantly
    throw new Error(
      "You don't want to call createChildren() on KeymapKeyboardTitleBarElement; use updateSelectedKey() instead.",
    );
  }

  removeAllChildren() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }
}
