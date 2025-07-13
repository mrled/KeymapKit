---
layout: site.njk
title: Planck Walkthrough
eleventyNavigation:
  title: Planck Walkthrough
  parent: keyboards
  order: 50
---

When writing a new keyboard,
you may wish to start with the [Planck](https://github.com/mrled/KeymapKit/tree/master/keyboard.planck48)
for a simple example, and build your board based on that.
This page walks you through how the Planck board is defined.

Here's what it looks like:

<div id="planck-container"></div>

<script type="module">
  import { KeyboardModelPlanck48 } from "@keymapkit/keyboard.planck48";
  const container = document.getElementById("planck-container");
  const keymapUi = document.createElement("keymap-ui");
  keymapUi.setAttribute("query-prefix", "planck");
  keymapUi.setModelsAndMaps([KeyboardModelPlanck48.blankKeymap]);
  container.appendChild(keymapUi);
</script>

## The Model

A [KeyboardModel](https://github.com/mrled/KeymapKit/blob/master/ui/src/lib/KeyboardModel.ts)
describes how the board is laid out abstractly,
but doesn't have anything to do with HTML.

Models are **class instances** of the `KeyboardModel` class.
Its constructor:

```typescript
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

  //... snip ...
}
```

It's worth calling out how key sizes work here.
The `defaultBlankKeySize` and `maxKeySize` are both described in **grid units**,
the size of which is set in the CSS variable `--keyboard-grid-unit`,
which is defined in the
[web component styles](https://github.com/mrled/KeymapKit/blob/master/ui/src/styles/vars.css#L77).
On the Planck, all keys are 2x2 grid units in size.

Here is how the Planck instantiates this class.

```typescript
/* A Planck keyboard with 48 keys (all 1U keys, no 2U keys).
 */
const KeyboardModelPlanck48 = new KeyboardModel(
  "keymap-keyboard-planck48",
  "Planck 48",
  new Size(2, 2),
  new Size(2, 2),
  [
    // Top row
    new PhysicalKey("planck", new Point(1, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(3, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(5, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(7, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(9, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(11, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(13, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(15, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(17, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(19, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(21, 1), new Size(2, 2)),
    new PhysicalKey("planck", new Point(23, 1), new Size(2, 2)),
    // Second row
    new PhysicalKey("planck", new Point(1, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(3, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(5, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(7, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(9, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(11, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(13, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(15, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(17, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(19, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(21, 3), new Size(2, 2)),
    new PhysicalKey("planck", new Point(23, 3), new Size(2, 2)),
    // Third row
    new PhysicalKey("planck", new Point(1, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(3, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(5, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(7, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(9, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(11, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(13, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(15, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(17, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(19, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(21, 5), new Size(2, 2)),
    new PhysicalKey("planck", new Point(23, 5), new Size(2, 2)),
    // Bottom row
    new PhysicalKey("planck", new Point(1, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(3, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(5, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(7, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(9, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(11, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(13, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(15, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(17, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(19, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(21, 7), new Size(2, 2)),
    new PhysicalKey("planck", new Point(23, 7), new Size(2, 2)),
  ],
);
```

That long list of physical keys controls the layout.
The [PhysicalKey class](https://github.com/mrled/KeymapKit/blob/master/models/src/lib/PhysicalKey.ts)
takes a board ID (all of which are `planck` for this keyboard),
a position on the board (1-indexed grid units),
and a size (all of which are 2x2 on the Planck).

From that information, it understands the physical layout of the Planck
is a 48-key board of 12x4 keys (24x8 grid units),
arranged in a rectangle.

## The Web Component

A [KeymapKeyboardElement](https://github.com/mrled/KeymapKit/blob/master/ui/src/webcomponents/keymap-keyboard.ts#L10)
is an HTML custom element (aka web component)
that builds the board out of other HTML elements.

Keyboard web components are **subclasses** of `KeymapKeyboardElement`.
The abstract methods and properties that must be overridded on the base class:

```javascript
export abstract class KeymapKeyboardElement extends HTMLElement {

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

  // ... snip ...
}
```

The first two properties assign an element name and the keyboard model we defined previously.
All the magic is in the `createChildren()` function.
Here's how the Planck implements it.

```typescript
/* A 48-key Planck keyboard.
 */
class KeymapKeyboardPlanck48Element extends KeymapKeyboardElement {
  // Set the element name (twice)
  static readonly elementName: string = "keymap-keyboard-planck48";

  // Set the model
  readonly model = KeyboardModelPlanck48;

  /* Create keygrid and key elements from key data for this board.
   */
  createChildren(keys: KeymapKey[]) {
    // Clean up any old children in case this is called twice
    this.removeAllChildren();

    // All keys must be in a key grid.
    // Some boards have mutliple key grids, but the Planck has just one.
    const keyGrid = document.createElement(
      KeymapKeygridElement.elementName,
    ) as KeymapKeygridElement;

    // Each key grid needs a container with the class keygrid-container.
    const gridContainer = document.createElement("div");
    gridContainer.className = "keygrid-container";
    this.appendChild(gridContainer);

    // Place the key grid inside the grid container
    gridContainer.appendChild(keyGrid);

    // The key grid must have a name,
    // which becomes part of the identifier for each key in the grid.
    // The key grid name must be unique in this keyboard.
    // Since we only have one, we'll just call it planck48.
    keyGrid.setAttribute("name", "planck48");

    // The keyGrid cols and rows attributes are in --keyboard-grid-unit
    keyGrid.setAttribute("cols", 24);
    keyGrid.setAttribute("rows", 8);

    // Have the key grid create all the key elements.
    // This assigns all of the keys an ID based on the grid name and their position.
    // For instance, the key at Point(1, 1) in our singular "planck48" keygrid
    // will be given an ID "planck48-1-1".
    keyGrid.createKeys(this, keys);

    // Append all the key elements to the grid container
    gridContainer.appendChild(keyGrid);
  }
}
```

You also have to register the custom element in order to use it:

```typescript
// In order for the browser to know how to use the element, it must be defined.
if (!customElements.get(KeymapKeyboardPlanck48Element.elementName)) {
  customElements.define(
    KeymapKeyboardPlanck48Element.elementName,
    KeymapKeyboardPlanck48Element,
  );
}
```

More complicated keyboards can have multiple keygrids.
For instance the ErgoDox has four keygrids:
left fingers, left thumb, right fingers, and right thumb.
