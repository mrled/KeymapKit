/* A state object to pass to all KeymapUIElement children.
 *
 * A single source of truth for the UI state of the keymap.
 * Use the observer pattern to notify relevant components when the state changes.
 *
 * We expect that state is immutable.
 * When a component needs to change state, it should create a new object.
 *
 * We expect the root application component - KeymapUIElement, in this case -
 * to create an instance of this class and pass it to all children.
 *
 * The root application component should do something like:
 *  constructor() {
 *    // ...
 *    this.state = new KeymapUIState()
 *    this.state.initialized = true;
 *    this.state.attach(this);
 *
 * The root application componen should also implement the IStateObserver interface:
 *  update<T extends keyof KeymapUIState>(key: T, oldValue: KeymapUIState[T], newValue: KeymapUIState[T]) {
 *    switch (key) {
 *      doWhateverNeedsDoing();
 *      // ...
 *
 * When creating children which need to observe the state object,
 * the root component should check if they're initialized,
 * and if not, assume that that means they don't have a reference to global state.
 *  private _child: ChildElementType | null = null;
 *  get child(): ChileElementType {
 *    if (!this._child) {
 *      this._child = document.createElement("child-element");
 *      this.appendChild(this._child);
 *    }
 *    if (!this._child.state.initialized) {
 *      this._child.state = this.state;
 *    }
 *    return this._child;
 *  }
 *
 * Finally, the children that need to observe state should implement a setter for their state object
 * that attaches to the state automatically when set,
 * and also the IStateObserver interface.
 *  class WhateverElement
 *    extends HTMLElement
 *    implements IStateObserver<KeymapUIState>
 *  {
 *    private _state = new KeymapUIState();
 *    get state() { return this._state; }
 *    set state(value: KeymapUIState) {
 *      this._state = value;
 *      this._state.attach(this);
 *      this.someChildElement.state = value; // Can also set state for children here, if applicable
 *      this.updateEverything(); // or whatever
 *    }
 *
 * (Children can define a default state object with initialized=false,
 * and the KeymapUIElement will know to set the global state object on them.
 * This keeps each child from having to check if its state object is null and makes typing simpler.)
 */

import { KeyboardModel } from "@keymapkit/models";
import {
  IStateObserver,
  StateChange,
  StateChangeMap,
  StateChangeMetadata,
} from "@keymapkit/models";
import { ConnectionPair } from "./DiagramConnections";
import {
  GuideStep,
  KeymapLayout,
  KeymapGuide,
  KeymapLayer,
} from "@keymapkit/models";
import { FallbackLayout } from "~/default-keyboard/FallbackLayout";

/* A map of uniqueID strings to Keymap objects
 */
export type LayoutMap = Map<string, KeymapLayout>;

/* A non-generic state change
 */
export class KeymapUIStateChange extends StateChange<KeymapUIState> {}

/* A non-generic map of key:KeymapUIStateChange
 */
export class KeymapUIStateChangeMap extends Map<string, KeymapUIStateChange> {}

/* Arguments that can be passed to setMultiStateByIdsInSingleTransaction
 */
export interface IKeymapUIStateIdArgs {
  debug?: number;
  queryPrefix?: string;
  keymapId?: string;
  layerIdx?: number;
  guideId?: string | null;
  guideStepIdx?: number;
  selectedKey?: string;
  isUserInitiated?: boolean;
}

/* An object representing the state of the entire KeymapUIElement.
 *
 * A single source of truth for the UI state of the keymap.
 *
 * State properties must be implemented as getters and setters,
 * and there are some special requirements for setters.
 * 1. They must check if the value is actually changed before running --
 *    especially before calling notify() -- to avoid infinite loops.
 *    This means that state properties must be immutable,
 *    as modifying a property in place will not trigger observers.
 * 2. They must call notify() with the key that changed.
 *    This is so that observers can filter on the keys they're interested in.
 *    This is a bit cumbersome, but it makes state that affects other state much easier to implement.
 *
 * Observers will be notified of all changes to the state object;
 * they should filter based on the keys they're interested in.
 *
 * Some things to worry about:
 *  - If a private store for a state property has a default value,
 *    then setting it explicitly to the default value will not trigger an update.
 *    For example:
 *      private _xyz: number = 0;
 *    To work around this, set the private store to null and check for null in the getter.
 *    For example:
 *      private _xyz: number | null = null;
 *      public get xyz(): number {
 *        return this._xyz ?? 0;
 *      }
 *    This will only cause a problem for properties that should trigger an update when set to the default value.
 *    For instance, we have a default keyboard model/map that are kind of placeholders,
 *    but if they are set explicitly then we still need to trigger an update to the KeymapUIElement
 *    so that it knows its keyboard model/map have ever been set.
 */
export class KeymapUIState {
  constructor() {}

  //
  // State observation
  //

  /* A list of observers
   */
  private observers: IStateObserver<KeymapUIState>[] = [];

  /* Attach an observer
   */
  attach(observer: IStateObserver<KeymapUIState>): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) {
      this.observers.push(observer);
    }
  }

  /* Detach an observer
   */
  detach(observer: IStateObserver<KeymapUIState>): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  /* Notify all observers of a set of changes
   */
  notify(stateChanges: StateChange<KeymapUIState>[]): void {
    if (stateChanges.length === 0) return;
    const stateChangeMap = new KeymapUIStateChangeMap(
      stateChanges.map((change) => [change.key, change]),
    );
    for (const observer of this.observers) {
      observer.update(stateChangeMap as StateChangeMap<KeymapUIState>);
    }
  }

  // #region State data

  /* Only the keymap-ui component should ever set this.
   * It allows us to define state objects on every component that needs one,
   * and the keymap-ui will know that any with initialized=false
   * have not been set to the global state object yet.
   */
  public initialized: boolean = false;

  /* Debug level
   */
  private _debug: number = 0;
  public get debug(): number {
    return this._debug;
  }
  public set debug(value: number) {
    if (this._debug === value) return;
    const oldValue = this._debug;
    this._debug = value;
    this.notify([new StateChange("debug", oldValue, value)]);
  }

  /* If nonempty, any query parameters prefixed with this string will be used to set state
   */
  private _queryPrefix: string = "";
  public get queryPrefix(): string {
    return this._queryPrefix;
  }
  public set queryPrefix(value: string) {
    if (this._queryPrefix === value) return;
    const oldValue = this._queryPrefix;
    this._queryPrefix = value;
    this.notify([new StateChange("queryPrefix", oldValue, value)]);
  }

  /* All the keyboard models we know about
   *
   * Note that this is NOT observable state, but a simple convenience getter;
   * observers should listen for changes to the keymaps property instead.
   */
  public get kbModels(): KeyboardModel[] {
    // Construct a list of keyboard models from the keymaps with no duplicates.
    const result: KeyboardModel[] = [];
    this.keymaps.forEach((keymap, _keymapId) => {
      if (keymap && !result.includes(keymap.model)) {
        result.push(keymap.model);
      }
    });
    return result;
  }

  /* The default keyboard model
   *
   * If the state is loaded without otherwise specifying a keyboard model,
   * such as by the query string or having the user select one,
   * it will default to the first entry in the keymaps.
   */
  public get defaultKbModel(): KeyboardModel {
    return this.defaultKeymap.model;
  }

  /* All keymaps that we know about
   *
   * We guarantee that this is never empty.
   *
   * The _kbModels property returns the models for all the keymaps found in this list.
   * The kbModel and keymap properties are guaranteed to exist inside this list.
   */
  private _keymaps: LayoutMap = new Map();
  public get keymaps(): LayoutMap {
    if (this._keymaps.size === 0) {
      this._keymaps.set(FallbackLayout.uniqueId, FallbackLayout);
      // Don't notify during lazy initialization - this causes cascading updates
      // this.notify([new KeymapUIStateChange("keymaps", [], this._keymaps)]);
    }
    return this._keymaps;
  }
  public set keymaps(value: LayoutMap) {
    if (this._keymaps === value) return;
    const oldValue = this._keymaps;
    this._keymaps = value;
    this.notify([new KeymapUIStateChange("keymaps", oldValue, value)]);
  }

  /* The default keymap.
   *
   * If the state is loaded without otherwise specifying a keymap,
   * such as by the query string or having the user select one,
   * it will default to the first entry in the keymaps.
   *
   * We know at least the empty keymap will exist.
   */
  public get defaultKeymap(): KeymapLayout {
    const firstKeymap: KeymapLayout = this.keymaps.values().next().value!;
    return firstKeymap;
  }

  /* The selected keymap, among the known keymaps
   */
  private _keymap: KeymapLayout | null = null;
  get keymap(): KeymapLayout {
    if (this._keymap === null) {
      this._keymap = this.defaultKeymap;
      // Don't notify during lazy initialization - this causes cascading updates
      // this.notify([new KeymapUIStateChange("keymap", null, this._keymap)]);
    }
    return this._keymap;
  }

  /* The ID of the current layer
   */
  private _layer: KeymapLayer | null = null;
  public get layer(): KeymapLayer {
    if (this._layer === null) {
      this._layer = this.keymap.layers[0];
      // Don't notify during lazy initialization - this causes cascading updates
      // this.notify([new KeymapUIStateChange("layer", null, this._layer)]);
    }
    return this._layer;
  }

  /* The ID of the current guide, if any
   */
  private _guide: KeymapGuide | null = null;
  public get guide(): KeymapGuide | null {
    return this._guide;
  }

  /* The current guide step, if any
   */
  private _guideStep: GuideStep | null = null;
  get guideStep(): GuideStep | null {
    return this._guideStep;
  }

  /* The ID of the selected key
   */
  private _selectedKey: string = "";
  public get selectedKey(): string {
    return this._selectedKey;
  }

  /* Connections to draw on the diagram
   */
  private _connectionPairs: ConnectionPair[] = [];
  public get connectionPairs(): ConnectionPair[] {
    return this._connectionPairs;
  }
  public set connectionPairs(value: ConnectionPair[]) {
    if (this._connectionPairs === value) return;
    const oldValue = this._connectionPairs;
    this._connectionPairs = value;
    this.notify([new KeymapUIStateChange("connectionPairs", oldValue, value)]);
  }

  // #region Public helpers

  /* Replace the existing set of keyboard models and keymaps.
   *
   * Remove all existing keyboards and maps.
   * Add each keymap and model in the new set.
   * Set the current keymap and kbModel to the first item in the new set.
   */
  setModelsAndMaps(keymaps: KeymapLayout[]) {
    if (keymaps.length === 0) {
      return;
    }

    const oldKeymaps = this._keymaps;
    const oldKeymap = this._keymap;
    const oldLayer = this._layer;
    const oldGuide = this._guide;
    const oldGuideStep = this._guideStep;
    const oldSelectedKey = this._selectedKey;

    this._keymap = null;
    this._layer = null;
    this._guide = null;
    this._guideStep = null;
    this._selectedKey = "";

    const newKeymaps: LayoutMap = new Map();
    keymaps.forEach((keymap) => {
      newKeymaps.set(keymap.uniqueId, keymap);
    });

    // Get the first keymap and layer from the first keyboard model.
    // We know these exist because we just added them.
    const firstKeymap: KeymapLayout = newKeymaps.values().next().value!;

    this._keymaps = newKeymaps;
    this._keymap = firstKeymap;
    this._layer = firstKeymap.layers[0];

    const changes: KeymapUIStateChange[] = [
      new KeymapUIStateChange("keymap", oldKeymaps, this.keymap),
      new KeymapUIStateChange("keymaps", oldKeymap, this.keymaps),
      new KeymapUIStateChange("layer", oldLayer, this.layer),
    ];
    if (oldGuide) {
      changes.push(new KeymapUIStateChange("guide", oldGuide, this.guide));
    }
    if (oldGuideStep) {
      changes.push(
        new KeymapUIStateChange("guideStep", oldGuideStep, this._guideStep),
      );
    }
    if (oldSelectedKey) {
      changes.push(
        new KeymapUIStateChange(
          "selectedKey",
          oldSelectedKey,
          this.selectedKey,
        ),
      );
    }

    this.notify(changes);
  }

  /* Set state all at once by identifiers, perhaps from a query string.
   *
   * Setting state by identifiers means using known object IDs rather than object references.
   * The IDs can be encoded in HTML element attribute names or query parameters,
   * while real objects obviously can't.
   *
   * Setting state in a single transaction means that all changes are made at once,
   * and observers are notified only once.
   * This is useful when multiple changes are related and should be treated as a single event.
   * For instance, if we set the kbModel normally, we reset other state properties like the selectedKey,
   * and observers would be notified of each change separately.
   * Worse, observers intending to make multiple changes in a row
   *
   * Trigger a single update for all changes.
   * Handle any effects of one change on another.
   */
  setStatesByIds({
    debug,
    queryPrefix,
    keymapId,
    layerIdx,
    guideId,
    guideStepIdx,
    selectedKey,
    isUserInitiated = false,
  }: IKeymapUIStateIdArgs) {
    // Create metadata for all changes in this batch
    const metadata: StateChangeMetadata = { isUserInitiated };

    //

    // Validate the new state properties.
    // Don't make changes to the state yet.

    if (debug !== undefined) {
      if (debug < 0 || debug > 1) {
        console.error(`Invalid debug level: ${debug}`);
        return;
      }
    }

    const specifiedKeymap = keymapId !== undefined;
    const oldKeymap = this.keymap;
    let newKeymap: KeymapLayout | undefined = undefined;
    if (specifiedKeymap) {
      newKeymap = this.keymaps.get(keymapId);
      if (!newKeymap) {
        const knownMaps = Array.from(this.keymaps.values())
          .map((m) => m.uniqueId)
          .join(", ");
        console.error(
          `No keymap found unique ID: ${keymapId} among known keymaps: ${knownMaps}`,
        );
        return;
      }
    } else {
      // If a keymap or keyboard were not specified, the keymap will not change.
      newKeymap = this.keymap;
    }
    const changedKeymap = newKeymap !== oldKeymap;

    const specifiedGuide = guideId !== undefined;
    const oldGuide = this.guide;
    let newGuide: KeymapGuide | undefined | null = undefined;
    if (specifiedGuide) {
      // A null guide is valid as-is, and means no guide is selected;
      // a non-null guide ID must be validated.
      if (guideId === "" || guideId === null) {
        newGuide = null;
      } else {
        newGuide = newKeymap.guides.find((g) => g.id === guideId);
        if (!newGuide) {
          console.error(`No guide found for id: ${guideId} on keymap `);
          return;
        }
      }
    } else if (changedKeymap) {
      // If we don't specify a guide by ID, but the keymap changed,
      // do not enter guide mode.
      newGuide = null;
    } else {
      // If a guide, keymap, or keyboard were not specified, the guide will not change.
      newGuide = this.guide;
    }
    let changedGuide = newGuide !== oldGuide;

    const specifiedGuideStep = guideStepIdx !== undefined;
    const oldGuideStep = this.guideStep;
    let newGuideStep = this.guideStep;
    if (specifiedGuideStep) {
      if (!newGuide) {
        newGuideStep = null;
      } else if (guideStepIdx < 0 || guideStepIdx >= newGuide.steps.length) {
        console.error(`Invalid guide step index: ${guideStepIdx}`);
      } else {
        newGuideStep = newGuide.steps[guideStepIdx];
      }
    } else if (newGuide !== null) {
      // If we don't specify a guide step but a guide is selected, go to the first step.
      newGuideStep = newGuide.steps[0];
    } else {
      newGuideStep = null;
    }
    let changedGuideStep = newGuideStep !== oldGuideStep;

    const specifiedLayer = layerIdx !== undefined;
    const oldLayer = this.layer;
    let newLayer: KeymapLayer | undefined = undefined;
    if (specifiedLayer) {
      if (layerIdx < 0 || layerIdx >= newKeymap.layers.length) {
        console.error(`Invalid layer index: ${layerIdx}`);
        return;
      }
      newLayer = newKeymap.layers[layerIdx];
    } else if (changedKeymap) {
      // If we don't specify a layer by index, but the keymap changed,
      // use the first layer of the new keymap.
      newLayer = newKeymap.layers[0];
    } else if (newGuide && changedGuideStep) {
      // If we've just gone from one step to another in an active guide,
      // use the layer of the new guide step.
      newLayer = newKeymap.layers[newGuideStep!.layerId!];
    } else {
      // If a layer, keymap, or keyboard were not specified, the layer will not change.
      newLayer = this.layer;
    }
    // We have to check for a changed keymap (which will also be true if the keyboard changed)
    // because the layer is a value type and layer 0 of one map is not the same as layer 0 of another.
    const changedLayer = newLayer !== oldLayer || changedKeymap;

    const specifiedSelectedKey = selectedKey !== undefined;
    const oldSelectedKey = this.selectedKey;
    let newSelectedKeyId: string = "";
    if (specifiedSelectedKey) {
      newSelectedKeyId = selectedKey as string;
      // If a guide (or step) is selected, selecting a key exits the guide
      // But only if we're actually selecting a key (not clearing the selection)
      if (newGuide && newSelectedKeyId) {
        newGuide = null;
        newGuideStep = null;
        changedGuide = true;
        changedGuideStep = true;
      }
    } else if (changedKeymap || changedLayer || changedGuide) {
      // If we don't specify a key by ID,
      // but did specify any argument that implies different key functionality,
      // unselect the key.
      newSelectedKeyId = "";
    } else {
      // Otherwise, the selected key will not change.
      newSelectedKeyId = this.selectedKey;
    }
    const changedSelectedKey = newSelectedKeyId !== oldSelectedKey;

    // Now that input is validated, make changes to the state
    const changes: KeymapUIStateChange[] = [];

    if (debug !== undefined) {
      changes.push(
        new KeymapUIStateChange("debug", this.debug, debug, metadata),
      );
      this._debug = debug;
    }

    if (queryPrefix !== undefined) {
      changes.push(
        new KeymapUIStateChange(
          "queryPrefix",
          this.queryPrefix,
          queryPrefix,
          metadata,
        ),
      );
      this._queryPrefix = queryPrefix;
    }

    if (changedKeymap) {
      changes.push(
        new KeymapUIStateChange("keymap", oldKeymap, newKeymap, metadata),
      );
      this._keymap = newKeymap;
    }

    if (changedLayer) {
      changes.push(
        new KeymapUIStateChange("layer", oldLayer, newLayer, metadata),
      );
      this._layer = newLayer;
    }

    if (changedGuide) {
      changes.push(
        new KeymapUIStateChange("guide", oldGuide, newGuide, metadata),
      );
      this._guide = newGuide;
    }

    if (changedGuideStep) {
      changes.push(
        new KeymapUIStateChange(
          "guideStep",
          oldGuideStep,
          newGuideStep,
          metadata,
        ),
      );
      this._guideStep = newGuideStep;
    }

    if (changedSelectedKey) {
      changes.push(
        new KeymapUIStateChange(
          "selectedKey",
          oldSelectedKey,
          newSelectedKeyId,
          metadata,
        ),
      );
      this._selectedKey = newSelectedKeyId;
    }

    this.notify(changes);
  }

  /* A helper function to show the current state and query string
   *
   * Parameters:
   * - forceLog: if true, log the state even if debug is off
   * - keymapUi: the KeymapUI element, if available
   *   if this is provided and it has an id attribute, that will be included in the log messages
   * - messagePrefix: a string to prepend to the log message
   * - logQueryString: if true (default), log the query string
   */
  logState({
    forceLog = false,
    keymapUi = undefined,
    messagePrefix = "",
    logQueryString = true,
  }: {
    forceLog?: boolean;
    keymapUi?: HTMLElement | undefined;
    messagePrefix?: string;
    logQueryString?: boolean;
  }) {
    if (this.debug === 0 && !forceLog) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const qPfx = this.queryPrefix;

    type LogTableRow = {
      prefix: string;
      board: string;
      map: string;
      layer: number;
      key: string;
      info?: string;
    };
    type LogTable = {
      state: LogTableRow;
      attribute?: LogTableRow;
      queryString?: LogTableRow;
    };

    console.log(`${messagePrefix}: current state:`);
    const logTable: LogTable = {
      state: {
        prefix: qPfx,
        board: this.keymap.model.keyboardElementName,
        map: this.keymap.uniqueId,
        layer: this.keymap.layers.indexOf(this.layer),
        key: this.selectedKey,
      },
    };
    if (keymapUi) {
      // TODO: Remove board/map/layer attributes. even selected-key?
      const keymapUiId = keymapUi.getAttribute("id")
        ? "#" + keymapUi.getAttribute("id")
        : "";
      logTable.attribute = {
        prefix: keymapUi.getAttribute("query-prefix") || "",
        board: "N/A",
        map: keymapUi.getAttribute("keymap-id") || "",
        layer: parseInt(keymapUi.getAttribute("layer") || "0", 10),
        key: keymapUi.getAttribute("selected-key") || "",
        info: `KeymapUIElement${keymapUiId}`,
      };
    }
    if (logQueryString) {
      console.log("current query string:", window.location.search);
      if (qPfx) {
        logTable.queryString = {
          prefix: qPfx,
          board: "N/A",
          map: params.get(`${qPfx}-map`) || "",
          layer: parseInt(params.get(`${qPfx}-layer`) || "NaN", 10) || NaN,
          key: params.get(`${qPfx}-key`) || "",
        };
      } else {
        logTable.queryString = {
          prefix: "",
          board: "",
          map: "",
          layer: NaN,
          key: "",
        };
      }
    }

    console.table(logTable);
  }

  // #endregion
}
