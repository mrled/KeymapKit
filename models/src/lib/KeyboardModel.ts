/* A model representing a keyboard.
 *
 * Specific boards should extend this class.
 */

import { PhysicalKey } from "./PhysicalKey.js";
import { Point, Size } from "./Geometry.js";
import { KeymapLayout, KeymapKey, KeymapLayer } from "./Layout.js";

type KeyIdToPhysicalKeymap = { [key: string]: PhysicalKey };

// TODO: simplify this class, don't require defaultBlankKeySize and maxKeySize, which we should be able to infer from the physical keys.
export class KeyboardModel {
  constructor(
    //The element name for the keyboard that this instance models
    public readonly keyboardElementName: string,

    // A human-friendly name for the keyboard
    public readonly displayName: string,

    // The size of the blank key to display in the title bar when no key is selected.
    public readonly defaultBlankKeySize: Size = new Point(2, 2),

    // The maximum dimensions of any key on the keyboard.
    public readonly maxKeySize: Size = new Size(4, 4),

    // A list of physical key objects on the board
    public readonly physicalKeys: PhysicalKey[] = [],
  ) {}

  /* A map of string key IDs to PhysicalKey objects.
   */
  private _physicalKeymap: KeyIdToPhysicalKeymap = {};
  get physicalKeymap() {
    if (Object.keys(this._physicalKeymap).length === 0) {
      this._physicalKeymap = this.physicalKeys.reduce(
        (acc: KeyIdToPhysicalKeymap, key: PhysicalKey) => {
          acc[key.id] = key;
          return acc;
        },
        {},
      );
    }
    return this._physicalKeymap;
  }

  /* Get a physical key by its ID, or throw an error if not found.
   */
  getPhysicalKey(id: string) {
    const key = this.physicalKeymap[id];
    if (!key) {
      throw new Error(
        `Physical key not found with id '${id}' on board '${this.keyboardElementName}'`,
      );
    }
    return key;
  }

  /* A helper that provides a blank KeymapKey for each physical key.
   */
  get blankKeymapKeys(): KeymapKey[] {
    return this.physicalKeys.map(
      (key) => new KeymapKey({ name: "", id: key.id, info: [""], unset: true }),
    );
  }

  /* A helper that provides a blank Keymap for the keyboard.
   */
  get blankKeymap(): KeymapLayout {
    return new KeymapLayout({
      displayName: "Blank",
      uniqueId: `${this.keyboardElementName}-blank-keymap`,
      model: this,
      layers: [
        KeymapLayer.fromKeyList({
          displayName: "Blank layer",
          shortName: "Blank",
          welcome: ["No keymap selected"],
          keys: this.blankKeymapKeys,
        }),
      ],
      guides: [],
    });
  }
}
