import { KeyboardModel } from "./KeyboardModel.js";

/* A key in a layout.
 *
 * name:              The name of the key (displayed in the title bar)
 * id:                The ID of the physical key this key corresponds to (must be unique)
 * info:              An array of paragraphs describing the key; may contain HTML
 * selection:         An array of key IDs that are part of the same selection group,
 *                    which should be highlighted together when the key is selected,
 *                    e.g. all the QWERTY keys or both shift keys etc
 * textLegend:        Text legend for the key; optional
 * htmlLegend:        HTML legend for the key; optional
 * imagePath:         The path on the server to an image to display; optional
 * imageAttribution:  The attribution for the image; optional
 * unset:             The key has no function attached to it; can still contain name/info/selection.
 *
 * For the legend, an image is used if provided, otherwise HTML legend if provided, otherwise text legend if provided, otherwise the name.
 */
export class KeymapKey {
  readonly name: string;
  readonly id;
  readonly info: string[];
  readonly selection?: string[];
  readonly textLegend?: string;
  readonly htmlLegend?: string;
  readonly imagePath?: string;
  readonly imageAttribution?: string;
  readonly unset?: boolean = false;

  constructor({
    name,
    id,
    info,
    selection,
    textLegend,
    htmlLegend,
    imagePath,
    imageAttribution,
    unset,
  }: {
    name: string;
    id: string;
    info: string[] | string | null;
    selection?: string[];
    textLegend?: string;
    htmlLegend?: string;
    imagePath?: string;
    imageAttribution?: string;
    unset?: boolean;
  }) {
    this.name = name || "";
    this.id = id;
    if (info && typeof info === "string") {
      this.info = [info];
    } else if (info && Array.isArray(info)) {
      this.info = info;
    } else {
      this.info = [];
    }
    this.selection = selection;
    this.textLegend = textLegend;
    this.htmlLegend = htmlLegend;
    this.imagePath = imagePath;
    this.imageAttribution = imageAttribution;
    this.unset = unset || false;
  }
}

/* A single step in a guided tour of a layout.
 *
 * keyId:      The ID of a key to highlight; optional
 * title:      The title of the step; required if keyId is not provided
 * text:       The text of the step; required if keyId is not provided
 * selection:  An array of key IDs to highlight together; optional
 *
 * A guide step may either point to a key by its ID,
 * which will show that key's description from the key map and highlight it,
 * or it may provide a title and text to display.
 * In either case, it may also provide an array of key IDs to highlight together.
 */
export interface IGuideStep {
  keyId?: string;
  layerId?: number;
  title?: string;
  text?: string[];
  selection?: string[];
}

/* A single step in a guided tour of a layout.
 *
 * Aside from the implementation of IGuideStep documented above,
 * this class adds a reference to the guide and the index of the step,
 * as well as helper functions.
 *
 * KeymapGuide objects convert a list of objects that implement IGuideStep
 * into a list of these objects.
 */
export class GuideStep implements IGuideStep {
  readonly guide: KeymapGuide;
  readonly index: number;
  readonly keyId?: string;
  readonly title?: string;
  readonly text?: string[];
  readonly layerId?: number;
  readonly selection?: string[];

  constructor({
    guide,
    index,
    keyId,
    title,
    text,
    layerId,
    selection,
  }: {
    guide: KeymapGuide;
    index: number;
    keyId?: string;
    title?: string;
    text?: string[];
    layerId?: number;
    selection?: string[];
  }) {
    this.guide = guide;
    this.index = index;
    if (keyId) {
      if (title || text) {
        throw new Error("Cannot pass Key ID and title or text parameters.");
      }
      this.keyId = keyId;
    } else {
      if (!title || !text) {
        throw new Error("Missing required parameters.");
      }
      this.title = title;
      this.text = text;
    }
    this.layerId = layerId || 0;
    this.selection = selection || [];
  }

  get isFirstStep() {
    return this.index === 0;
  }
  get isLastStep() {
    return this.index === this.guide.steps.length - 1;
  }
  get nextStep(): GuideStep | null {
    return this.isLastStep ? null : this.guide.steps[this.index + 1];
  }
  get previousStep(): GuideStep | null {
    return this.isFirstStep ? null : this.guide.steps[this.index - 1];
  }
}

/* A guide to the layout of a key map
 */
export class KeymapGuide {
  readonly title: string;
  readonly shortName: string;
  readonly id: string;
  readonly steps: GuideStep[];
  constructor({
    title,
    shortName,
    id,
    steps,
  }: {
    title: string;
    shortName: string;
    id: string;
    steps: IGuideStep[];
  }) {
    this.title = title;
    this.shortName = shortName;
    this.id = id;
    this.steps = steps.map(
      (step, index) => new GuideStep({ guide: this, index, ...step }),
    );
  }
}

/* A single layer is a map of physical key IDs to KeymapKey objects.
 */
export class KeymapLayer {
  constructor(
    public readonly displayName: string,
    public readonly shortName: string,
    public readonly welcome: string[],
    public readonly keys: Map<string, KeymapKey>,
  ) {}

  /* Create a new layer from a list of keys.
   *
   * It's nicer to define keys in a list, rather than in a map which must contain the ID twice.
   * This method will check for duplicate keys and throw an error if any are found.
   */
  static fromKeyList({
    displayName,
    shortName,
    welcome,
    keys,
  }: {
    displayName: string;
    shortName: string;
    welcome: string[];
    keys: KeymapKey[];
  }) {
    const duplicateKeys: KeymapKey[] = [];
    const keysById = keys.reduce((map, key) => {
      if (map.has(key.id)) duplicateKeys.push(key);
      map.set(key.id, key);
      return map;
    }, new Map<string, KeymapKey>());

    // Make sure we haven't passed any keys with duplicate IDs
    if (duplicateKeys.length > 0) {
      throw new Error(
        `Duplicate key IDs in key map: ${duplicateKeys
          .map((key) => key.id)
          .join(", ")}`,
      );
    }

    const newLayer = new KeymapLayer(displayName, shortName, welcome, keysById);
    return newLayer;
  }
}

/* A layout for a keyboard.
 *
 * Maps IDs of physical keys to descriptive text and function of the key.
 * May contain guides to the layout.
 * If multiple guides are provided, the first one is the default.
 *
 * Callers may pass an unset key to the constructor,
 * which will be used as the default key if a key ID is not found in the key map.
 *
 * Any keys passed in to the keys parameter will be checked for valid IDs,
 * and an error will be thrown if any are invalid for the keyboard or not unique.
 *
 * Any layer passed in which does not contain all the keys on the keyboard will have unset keys added.
 */
export class KeymapLayout {
  displayName: string;
  uniqueId: string;
  model: KeyboardModel;
  guides: KeymapGuide[];
  layers: KeymapLayer[] = [];

  constructor({
    displayName,
    uniqueId,
    model,
    layers,
    guides,
  }: {
    displayName: string;
    uniqueId: string;
    model: KeyboardModel;
    layers: KeymapLayer[];
    guides?: KeymapGuide[];
  }) {
    this.displayName = displayName;
    this.uniqueId = uniqueId;
    this.model = model;
    this.layers = layers || [];
    this.guides = guides || [];

    this.layers.forEach((layer, layerIdx) => {
      // Add any unset keys to the layer
      model.physicalKeys.forEach((key) => {
        if (!layer.keys.has(key.id)) {
          layer.keys.set(
            key.id,
            new KeymapKey({
              name: "",
              id: key.id,
              info: [],
              unset: true,
            }),
          );
        }
      });

      // Check for any keys in the layer that are not on the keyboard
      const invalidKeys = Array.from(layer.keys.values()).filter(
        (key) => !model.physicalKeymap[key.id],
      );
      if (invalidKeys.length > 0) {
        const invalidKeysListStr = invalidKeys.map((key) => key.id).join(", ");
        throw new Error(
          `Invalid key IDs in key map ${this.displayName} on layer ${layerIdx}: ${invalidKeysListStr}`,
        );
      }
    });
  }
}
