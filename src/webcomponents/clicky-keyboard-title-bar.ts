import { PhysicalKey } from "~/lib/PhysicalKey";
import { ClickyKeyboardElement } from "~/webcomponents/clicky-keyboard";
import { Keymap, KeymapKey, KeymapLayer } from "~/lib/Keymap";
import { ClickyKeygridElement } from "~/webcomponents/clicky-keygrid";
import { ClickyKeyElement } from "./clicky-key";
import { Point, Size } from "~/lib/Geometry";
import { KeyboardModel } from "~/lib/KeyboardModel";

/* The faux keyboard in the title bar.
 *
 * It will contain just one key, which will be a copy of the selected key in the reference keyboard.
 */
export class ClickyKeyboardTitleBarElement extends ClickyKeyboardElement {
  static readonly elementName = "clicky-keyboard-title-bar";
  readonly elementName = ClickyKeyboardTitleBarElement.elementName;

  keymapKey: KeymapKey | null = null;
  keyElement: ClickyKeyElement | null = null;
  private _physicalKeys: PhysicalKey[] = [];
  titleKey: PhysicalKey;
  private _model: KeyboardModel;

  constructor() {
    super();
    this.titleKey = new PhysicalKey(
      "title-bar",
      new Point(0, 0),
      // This doesn't matter; it will be set in updateSelectedKey()
      new Size(1, 1)
    );
    this._physicalKeys = [this.titleKey];
    this._model = new KeyboardModel(
      ClickyKeyboardTitleBarElement.elementName,
      new Point(2, 2),
      new Size(2, 2),
      this._physicalKeys
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
        this.elementName,
        model.defaultBlankKeySize,
        model.maxKeySize,
        this._physicalKeys
      );
    }
  }

  _grid: ClickyKeygridElement | null = null;
  get grid(): ClickyKeygridElement {
    if (!this._grid) {
      this._grid = this.querySelector(
        ClickyKeygridElement.elementName
      ) as ClickyKeygridElement;
    }
    if (!this._grid) {
      this._grid = document.createElement(
        ClickyKeygridElement.elementName
      ) as ClickyKeygridElement;
      this.appendChild(this._grid);
      this.grid.setAttribute("name", "title-bar");
    }
    return this._grid;
  }

  connectedCallback() {}

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

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
    selectedKeyId: string
  ): KeymapKey {
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
        this.model.defaultBlankKeySize
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

  createChildren(keys: KeymapKey[]) {
    // TODO: handle this more elegantly
    throw new Error(
      "You don't want to call createChildren() on ClickyKeyboardTitleBarElement; use updateSelectedKey() instead."
    );
  }

  removeAllChildren() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }
}
