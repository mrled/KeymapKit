// Import the CSS types directly here.
// This is not required for esbuild (maybe ignored by esbuild?),
// but is required for dts-bundle-generator.
// <https://github.com/timocov/dts-bundle-generator/issues/227>
//
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../types/styles.d.ts" />
//
// WARNING: triple-slash directives must be at the top of the file.
// <https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html>

import { KeymapUIOptions } from "~/lib/KeymapUIOptions";
import { ConnectionPair, KeyInfoConnectType } from "~/lib/DiagramConnections";
import { KeymapLayout } from "~/lib/Layout";

import { KeymapKeyHandleElement } from "~/webcomponents/keymap-key-handle";
import { KeymapIndicatorElement } from "~/webcomponents/keymap-indicator";
import { KeymapKeyboardElement } from "./keymap-keyboard";
import { KeymapNavbarElement } from "~/webcomponents/keymap-navbar";
import { KeymapDiagramElement } from "./keymap-diagram";
import {
  KeymapUIState,
  KeymapUIStateChange,
  KeymapUIStateChangeMap,
} from "~/lib/KeymapUIState";
import { IStateObserver } from "~/lib/State";
import {
  setQueryStringFromState,
  setStateFromQsAndAttrib,
} from "~/lib/KeymapUIStateQueryString";

// Import CSS files as inline strings.
// Vite supports the ?inline query parameter to load a file as a string;
// esbuild doesn't require that parameter but does work if it's there.
import varsStyleStr from "~/styles/vars.css?inline";
import rootStyleStr from "~/styles/root.css?inline";
import diagramStyleStr from "~/styles/diagram.css?inline";
import keygridStyleStr from "~/styles/keygrid.css?inline";
import keyInfoPanelStyleStr from "~/styles/keyInfoPanel.css?inline";
import utilityStyleStr from "~/styles/utility.css?inline";

/* The UI of the keymap, including a keyboard, an info panel, and the canvas diagram.
 *
 * Some notes on naming:
 * KID is Keyboard, InfoPanel, Diamargs.
 * - The Keyboard is a <Keyboard> component.
 * - The InfoPanel is our <InfoPanel> component.
 * - Diamargs are diagram margins -- ¡¡Not CSS margins!!, but margins like a book has.
 *   They are narrow divs on either side of the Keyboard/InfoPanel reserved for diagram lines.
 *
 * The diagram lines are drawn from the Keyboard, to the InfoPanel, via the Diamargs.
 *
 * Keeping track of children:
 * - We use private properties with getters and optionally setters to keep track of child elements.
 *   These getters should search for the element in the DOM if it is not already stored --
 *   this is to allow for the element to be created from HTML or from JavaScript outside of this class.
 * - (TODO: check that this class works with child elements created from HTML.)
 * - Handle layout in one place: layOutIdempotently().
 *   Setters should .replaceChild() if appropriate, and always call layOutIdempotently() before returning.
 *   Handling layout in each individual get() method was too confusing.
 * - This means that layOutIdempotently() has to be called only in the connectedCallback() and in setters,
 *   and attributeChangedCallback() should only set the attribute and not call layOutIdempotently().
 *
 * Attributes:
 * debug                Enable debug messages and borders
 * keymap-id            The name of one of the passed-in keymaps to use.
 * layer                The layer number to use.
 * selected-key         The id of the key that is selected.
 * query-prefix         A prefix for query parameters.
 *                      If set, the KeymapUIElement will look for parameters
 *                      in the URL query string with this prefix.
 *
 * Query string parameters:
 * map              The name of one of the passed-in keymaps to use.
 * layer            The layer number to use.
 * key              The id of the key to select.
 * guide            The name of the guide to use.
 * step             The step number in the guide to use in the guide
 *
 * Query string example:
 * 1. The KeymapUIElement is declared in the DOM as:
 *    <keymap-ui selected-key="l-f-1-1" query-prefix="keymap"></keymap-ui>
 * 2. The user loads the URL <https://example.com/>
 *    The query string is empty, so the KeymapUI loads with the default keymap and the l-f-1-1 key selected.
 * 3. The user loads the URL <https://example.com/?keymap-map=mymap&keymap-layer=2&keymap-key=r-t-2-2>
 *    The KeymapUIElement loads with the mymap keymap, the layer number 2, and the r-t-2-2 key selected,
 *    overriding the selected-key attribute set on the element in the DOM.
 * 4. When the user selects a key, or changes the map, the URL is updated with the new query parameters.
 */

export class KeymapUIElement
  extends HTMLElement
  implements IStateObserver<KeymapUIState>
{
  //

  /* The element name to register with customElements.define().
   */
  static readonly elementName = "keymap-ui";

  /* The shadow DOM for us and all descendents.
   */
  shadow = this.attachShadow({ mode: "open" });
  // shadow = this;

  /* The ResizeObserver that watches for changes in the size of the kidContainer.
   */
  resizeObserver: ResizeObserver;

  /* The state.
   * This should not be set outside of the constructor
   * (but state.setState() can be used to set individual properties outside of the constructor).
   */
  private state: KeymapUIState;

  constructor() {
    super();

    /* Set the state object that will be passed to all children.
     */
    this.state = new KeymapUIState();
    this.state.initialized = true;
    this.state.attach(this);

    /* Listen for changes to the size of the browser window,
     * and resize the canvas to match the size of the kidContainer.
     */
    this.addEventListener("resize", () => this.#resizeCanvas);

    /* Create a ResizeObserver that we will use later
     * to watch for changes in the size of the element that the canvas should completely cover
     */
    this.resizeObserver = new ResizeObserver(() =>
      this.#resizeCanvas(this.state),
    );

    /* Listen for this event emitted by any child element.
     * (Make sure the child element emits it with bubbles: true so that we can catch it from any depth.)
     */
    this.addEventListener("key-selected", this.#handleKeySelected);

    /* Listen for browser back/forward navigation
     */
    window.addEventListener("popstate", this.handlePopState);
  }

  //
  // #region Public API methods
  //

  /* Retrieve the debug level from the attribute
   */
  get debugLevel(): number {
    const debug = parseInt(this.getAttribute("debug") || "0", 10);
    if (Number.isNaN(debug)) return 0;
    return debug;
  }

  /* Removes all keymaps and replaces them with the given keymaps.
   *
   * Removes all boards and adds boards referenced by the given keymaps.
   */
  setModelsAndMaps(keymaps: KeymapLayout[]) {
    this.state.setModelsAndMaps(keymaps);
  }

  // #endregion

  //
  // #region Lifecycle methods / callbacks
  //

  /* Run this code when the element is added to the DOM.
   * This might be before or after attributes are changed.
   * Run whether the element is created from HTML or from JavaScript.
   */
  connectedCallback() {
    this.state.debug = this.debugLevel;

    // Set the initial state from the query string and attributes
    setStateFromQsAndAttrib({
      state: this.state,
      keymapUi: this,
    });

    this.layOutIdempotently();
    this.#updateInfoProsePanelFromState();

    // Resize the canvas to the size of the kidContainer for the first time
    this.#resizeCanvas(this.state);
    // Watch for changes in the size of the kidContainer
    this.resizeObserver.observe(this.kidContainer);

    for (const attr of KeymapUIElement.observedAttributes) {
      const value = this.getAttribute(attr);
      if (value !== null) {
        this.attributeChangedCallback(attr, "", value);
      }
    }
  }

  /* Call attributeChangedCallback when any of these attributes are changed from JavaScript
   * (changes to other attributes are ignored).
   */
  static get observedAttributes() {
    return ["debug", "keymap-id", "layer", "query-prefix", "selected-key"];
  }

  /* Run this code when an attribute is changed from JavaScript.
   * Does not run if an attribute is set when defined on the element in HTML.
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // Don't do anything if we're not connected to the DOM.
    // This function is called by connectedCallback() for each attribute anyway,
    // and that function uses a specific order to set the internal properties correctly.
    if (!this.isConnected) {
      return;
    }

    // TODO: sync the state names with the element names for a better time
    switch (name) {
      case "debug":
        this.state.debug = this.debugLevel;
        break;
      case "keymap-id":
        this.state.setStatesByIds({
          keymapId: newValue,
        });
        break;
      case "layer":
        this.state.setStatesByIds({
          layerIdx: parseInt(newValue, 10) || 0,
        });
        break;
      case "selected-key":
        this.state.setStatesByIds({
          selectedKey: newValue,
        });
        break;
      case "query-prefix":
        this.state.queryPrefix = newValue;
        break;
      default:
        console.error(`KeymapUIElement: Unhandled attribute: ${name}`);
        break;
    }

    // setQueryStringFromState(this.state, this);
  }

  // #endregion

  //
  // #region Getters and setters for child elements
  //

  private _styling: HTMLStyleElement | null = null;
  get styling(): HTMLStyleElement {
    if (!this._styling) {
      this._styling = this.shadow.querySelector("style");
    }
    if (!this._styling) {
      this._styling = document.createElement("style");
      // Concatenate all the CSS strings into one string and place it in a <style> element.
      // This is kind of an annoying hack because bundling is awful.
      // TODO: pack CSS separately and use a <style src="..."> element instead.
      // That would be more efficient for web pages that use multiple KeymapUIElement objects.
      // However, that's rare so it's not a priority.
      const styleContents = [
        // Ordered styles
        varsStyleStr,
        rootStyleStr,
        // Alphabetical styles
        diagramStyleStr,
        keygridStyleStr,
        keyInfoPanelStyleStr,
        utilityStyleStr,
      ];
      this._styling.textContent = styleContents.join("\n");
    }
    return this._styling;
  }

  private _keyInfoNavbar: KeymapNavbarElement | null = null;
  get keyInfoNavbar(): KeymapNavbarElement {
    if (!this._keyInfoNavbar) {
      this._keyInfoNavbar = this.shadow.querySelector(
        KeymapNavbarElement.elementName,
      ) as KeymapNavbarElement;
    }
    if (!this._keyInfoNavbar) {
      this._keyInfoNavbar = document.createElement(
        KeymapNavbarElement.elementName,
      ) as KeymapNavbarElement;
      this._keyInfoNavbar.updateTitleKey(
        this.state.layer,
        this.state.keymap.model,
        this.state.selectedKey,
      );
    }
    if (!this._keyInfoNavbar.state.initialized) {
      this._keyInfoNavbar.state = this.state;
    }
    return this._keyInfoNavbar;
  }

  private _diamargLeft: HTMLElement | null = null;
  get diamargLeft(): HTMLElement {
    if (!this._diamargLeft) {
      this._diamargLeft = this.shadow.querySelector(".keymap-ui-diamarg-left");
    }
    if (!this._diamargLeft) {
      this._diamargLeft = document.createElement("div");
      this._diamargLeft.className = "keymap-ui-diamarg keymap-ui-diamarg-left";
    }
    return this._diamargLeft;
  }

  private _diamargRight: HTMLElement | null = null;
  get diamargRight(): HTMLElement {
    if (!this._diamargRight) {
      this._diamargRight = this.shadow.querySelector(
        ".keymap-ui-diamarg-right",
      );
    }
    if (!this._diamargRight) {
      this._diamargRight = document.createElement("div");
      this._diamargRight.className =
        "keymap-ui-diamarg keymap-ui-diamarg-right";
    }
    return this._diamargRight;
  }

  private _centerPanel: HTMLElement | null = null;
  get centerPanel(): HTMLElement {
    if (!this._centerPanel) {
      this._centerPanel = this.shadow.querySelector(".keymap-ui-center-panel");
    }
    if (!this._centerPanel) {
      this._centerPanel = document.createElement("div");
      this._centerPanel.className = "keymap-ui-center-panel";
    }
    return this._centerPanel;
  }

  private _kidContainer: HTMLElement | null = null;
  get kidContainer(): HTMLElement {
    if (!this._kidContainer) {
      this._kidContainer = this.shadow.querySelector(
        ".keymap-ui-kid-container",
      );
    }
    if (!this._kidContainer) {
      this._kidContainer = document.createElement("div");
      this._kidContainer.className = "keymap-ui-kid-container";
    }
    return this._kidContainer;
  }

  private _keyboard: KeymapKeyboardElement | null = null;
  get keyboard(): KeymapKeyboardElement {
    let needsCreate = false;
    if (!this._keyboard) {
      // First, try to find a keyboard in the DOM
      this._keyboard = this.shadow.querySelector(
        "#keyboard",
      ) as KeymapKeyboardElement;
      needsCreate = true;
    }
    if (!this._keyboard) {
      // Next, look for the keyboard element by name if it was set
      const kbElementName = this.state.keymap.model.keyboardElementName;
      if (!customElements.get(kbElementName)) {
        throw new Error(
          `KeymapUIElement: Keyboard element ${kbElementName} not found`,
        );
      }
      this._keyboard = document.createElement(
        kbElementName,
      ) as KeymapKeyboardElement;
    }
    this._keyboard.setAttribute("id", "keyboard");
    this._keyboard.classList.add("keymap-keyboard");
    if (needsCreate) {
      this._keyboard.createChildren(Array.from(this.state.layer.keys.values()));
    }
    return this._keyboard;
  }

  private _infoContainer: HTMLElement | null = null;
  get infoContainer(): HTMLElement {
    if (!this._infoContainer) {
      this._infoContainer = this.shadow.querySelector(
        ".keymap-ui-keyinfo-container",
      );
    }
    if (!this._infoContainer) {
      this._infoContainer = document.createElement("div");
      this._infoContainer.className = "keymap-ui-keyinfo-container";
    }
    return this._infoContainer;
  }

  private _infoProse: HTMLElement | null = null;
  get infoProse(): HTMLElement {
    if (!this._infoProse) {
      this._infoProse = this.shadow.querySelector(".key-info-prose");
    }
    if (!this._infoProse) {
      this._infoProse = document.createElement("div");
      this._infoProse.className = "key-info-prose";
    }
    return this._infoProse;
  }

  private _diagram: KeymapDiagramElement | null = null;
  get diagram(): KeymapDiagramElement {
    if (!this._diagram) {
      this._diagram = this.shadow.querySelector(
        KeymapDiagramElement.elementName,
      ) as KeymapDiagramElement;
    }
    if (!this._diagram) {
      this._diagram = document.createElement(
        KeymapDiagramElement.elementName,
      ) as KeymapDiagramElement;
    }
    if (!this._diagram.readyToDraw) {
      this._diagram.centerPanel = this.centerPanel;
      this._diagram.diamargLeft = this.diamargLeft;
      this._diagram.diamargRight = this.diamargRight;
      this._diagram.infoProse = this.infoProse;
    }
    if (!this._diagram.state.initialized) {
      this._diagram.state = this.state;
    }
    return this._diagram;
  }

  /* Set an element's children
   *
   * If any child element is not a child of the parent,
   * remove all children and add the new children.
   */
  private setChildrenIdempotently(
    parent: HTMLElement | ShadowRoot,
    children: HTMLElement[],
  ) {
    if (!children.every((c) => parent.contains(c))) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
      parent.append(...children);
    }
  }

  /* Lay out all child components.
   *
   * Check if the child components are in the right place, and if not, move them.
   * This might be called a lot, so it should be fast and idempotent.
   */
  private layOutIdempotently() {
    // Direct children of this element
    // Note that because the diagram is last, it is drawn on top of the other elements,
    // which is what we want.
    const diagram = this.diagram;
    this.setChildrenIdempotently(this.shadow, [
      this.styling,
      this.kidContainer,
      diagram,
    ]);
    this.setChildrenIdempotently(this.kidContainer, [
      this.diamargLeft,
      this.centerPanel,
      this.diamargRight,
    ]);
    this.setChildrenIdempotently(this.centerPanel, [
      this.keyboard,
      this.infoContainer,
    ]);
    this.setChildrenIdempotently(this.infoContainer, [
      this.keyInfoNavbar,
      this.infoProse,
    ]);
  }

  // #endregion

  //
  // #region Handle state changes
  //

  readonly observerName = "KeymapUIElement";

  update(stateChanges: KeymapUIStateChangeMap) {
    if (!this.isConnected) {
      return;
    }
    if (stateChanges.has("queryPrefix")) {
      this.#updateQueryPrefix(stateChanges.get("queryPrefix")!);
    }

    // If the keymap changes, the board may change too.
    if (stateChanges.has("keymap")) {
      const keymapChange = stateChanges.get("keymap")!;
      const newKeymap = keymapChange.newValue as KeymapLayout;
      const oldKeyboard = this.keyboard;

      if (oldKeyboard.elementName != newKeymap.model.keyboardElementName) {
        this._keyboard = document.createElement(
          newKeymap.model.keyboardElementName,
        ) as KeymapKeyboardElement;
        this.keyInfoNavbar.setAttribute("key-id", "");

        // Replace the old keyboard with the new one in the DOM
        if (oldKeyboard && this.centerPanel.contains(oldKeyboard)) {
          this.centerPanel.replaceChild(this.keyboard, oldKeyboard);
        }
      }
    }

    // When the keymap or layer changes, recreate all the keys to update all the legends.
    if (stateChanges.has("keymap") || stateChanges.has("layer")) {
      this.keyboard.createChildren(Array.from(this.state.layer.keys.values()));
    }

    if (
      stateChanges.has("keymap") ||
      stateChanges.has("layer") ||
      stateChanges.has("guideStep") ||
      stateChanges.has("guide") ||
      stateChanges.has("selectedKey")
    ) {
      this.#updateInfoProsePanelFromState();
    }

    // Track if any of the updates are user initiated,
    // because we want to push the state to history only for user-initiated changes.
    const isUserInitiated = Array.from(stateChanges.values()).some(
      (change) => change.metadata.isUserInitiated === true,
    );

    setQueryStringFromState(this.state, this, {
      pushToHistory: isUserInitiated,
    });
  }

  /* Update the info prose panel based on active key, guide step, etc.
   */
  #updateInfoProsePanelFromState() {
    let activeKeyId: string = "";
    let keySelection: string[] = [];
    const proseTitleElement = document.createElement("h3");
    let proseTextElements: HTMLParagraphElement[] = [];
    const indicatedElementsById: {
      [key: string]: KeymapKeyHandleElement;
    } = {};
    let proseKeyIndicators: KeymapIndicatorElement[] = [];
    let indicatedKeyIds: string[] = [];

    if (this.state.guideStep) {
      if (this.state.guideStep.keyId) {
        activeKeyId = this.state.guideStep.keyId;
      }
    } else {
      activeKeyId = this.state.selectedKey;
    }

    // Clear the existing content in the key info prose panel
    while (this.infoProse.firstChild) {
      this.infoProse.removeChild(this.infoProse.firstChild);
    }

    if (activeKeyId) {
      // If there's an active key, show the key information in the prose panel.
      // (This will also trigger if the active key is in a guide step.)
      const keyData = this.state.layer.keys.get(activeKeyId);
      if (!keyData) {
        console.error(
          `KeymapUIElement: Key ${activeKeyId} not found in key map '${this.state.keymap.uniqueId}'`,
        );
        return;
      }
      keySelection = keyData.selection || [];
      proseTitleElement.innerHTML = keyData.unset
        ? `<span>Unset key</span> <span class="key-id">id: ${keyData.id}</span>`
        : `<span>The <kbd>${keyData.name}</kbd> key</span> <span class="key-id">id: ${keyData.id}</span>`;
      proseTextElements = keyData.info.map((paragraph: string) => {
        const p = document.createElement("p");
        p.innerHTML = paragraph;
        return p;
      });
    } else if (this.state.guideStep?.text?.length || 0 > 0) {
      // If there's an active guide step but not an active key,
      // show the guide step information in the prose panel
      const guideStep = this.state.guideStep!;
      keySelection = guideStep.selection || [];
      proseTitleElement.innerHTML = guideStep.title || "";
      proseTextElements =
        guideStep.text?.map((paragraph: string) => {
          const p = document.createElement("p");
          p.innerHTML = paragraph;
          return p;
        }) || [];
    } else {
      // If there's no active key or guide step, show the current layer's welcome text
      keySelection = [];
      proseTitleElement.innerText = this.state.layer.displayName;
      proseTextElements = this.state.layer.welcome.map((paragraph: string) => {
        const p = document.createElement("p");
        p.innerHTML = paragraph;
        return p;
      });
    }

    this.infoProse.appendChild(proseTitleElement);
    this.infoProse.append(...proseTextElements);

    proseKeyIndicators = Array.from(
      this.infoProse.querySelectorAll(KeymapIndicatorElement.elementName),
    );
    // Construct a list of all keys indicated in the prose
    indicatedKeyIds = proseKeyIndicators.map(
      (indicator) => indicator.getAttribute("id") || "",
    );

    // Clear any existing connections that back the diagram lines
    const connectionPairs: ConnectionPair[] = [];

    // Update the key in the key info navbar
    this.keyInfoNavbar.updateTitleKey(
      this.state.layer,
      this.state.keymap.model,
      activeKeyId,
    );
    // this.keyInfoNavbar might not be in the DOM on initial load, so we have to lay out here.
    this.layOutIdempotently();
    const navBarHandle = this.keyInfoNavbar.querySelector(
      KeymapKeyHandleElement.elementName,
    );

    // Update every key on the board
    // Make sure not to include the key in the nav bar which needs special handling
    this.keyboard.keyElements.forEach((key) => {
      const keyId = key.getAttribute("id");
      if (!keyId) {
        console.error(`KeymapUIElement: Keyboard child key has no id: ${key}`);
        return;
      }
      const active = keyId === activeKeyId;
      const inKeySelection = !active && keySelection.indexOf(keyId) > -1;
      const indicatorTarget = indicatedKeyIds.indexOf(keyId) > -1;
      key.setAttribute("active", active.toString());
      key.setAttribute("related-to-active", inKeySelection.toString());
      key.setAttribute("target-of-indicator", indicatorTarget.toString());

      const keyHandle = key.querySelector(
        KeymapKeyHandleElement.elementName,
      ) as KeymapKeyHandleElement;
      if (!keyHandle) return;

      if (active && navBarHandle) {
        // Make the connection from the navbar key to this key
        connectionPairs.push(
          new ConnectionPair(
            navBarHandle,
            keyHandle,
            KeyInfoConnectType.Selected,
          ),
        );
      } else if (indicatorTarget) {
        // Store the key handle for making a connection later
        indicatedElementsById[keyId] = keyHandle;
      }
    });

    // Make connections from prose indicators to the keys they indicate.
    // Doing this here lets us ensure we are correct even in weird cases
    // like if a key is indicated by multiple indicators (untested).
    proseKeyIndicators.forEach((indicator) => {
      const indicatorId = indicator.getAttribute("id");
      if (!indicatorId) {
        console.error(`KeymapUIElement: Key indicator has no id: ${indicator}`);
        return;
      }
      const indicated = indicatedElementsById[indicatorId];
      if (!indicated) {
        console.error(
          `KeymapUIElement: Key indicator has no target: ${indicatorId}`,
        );
        return;
      }
      connectionPairs.push(
        new ConnectionPair(indicator, indicated, KeyInfoConnectType.TextRef),
      );
    });

    // This causes the diagram to redraw
    this.state.connectionPairs = connectionPairs;
  }

  /* Update the query prefix and any query parameters that use it.
   */
  #updateQueryPrefix(change: KeymapUIStateChange) {
    if (change.oldValue) {
      // Remove all old query parameters with the old prefix
      const [params, newQs] = KeymapUIOptions.parseQueryString(
        change.oldValue as string,
        window.location.search,
      );
      const newUrl = params.any
        ? `${window.location.pathname}?${newQs.toString()}`
        : `${window.location.pathname}`;
      window.history.replaceState({}, "", newUrl);
    }

    setStateFromQsAndAttrib({ state: this.state });
  }

  // #endregion

  //
  // #region Other private methods
  //

  /* Resize the canvas to the size of the kidContainer.
   *
   * Pass state to it because it's a callback for a ResizeObserver --
   * 'this' will refer to the ResizeObserver, when called by it,
   * so 'this.state' from the KeymapUIElement instance will not be available.
   */
  #resizeCanvas(_state: KeymapUIState) {
    this.diagram.resize(
      this.kidContainer.offsetWidth,
      this.kidContainer.offsetHeight,
    );
  }

  /* Handle a key being selected on the keyboard
   *
   * This is a custom event that is fired by <keymap-key> elements.
   */
  #handleKeySelected(event: Event) {
    const e = event as CustomEvent;
    const keyId = e.detail;
    // TODO: should we have the key set the state directly instead of doing it here?
    if (keyId === this.state.selectedKey) {
      this.state.setStatesByIds({ selectedKey: "", isUserInitiated: true });
    } else {
      this.state.setStatesByIds({ selectedKey: keyId, isUserInitiated: true });
    }
  }

  /* Handle browser back/forward navigation
   *
   * This must be an arrow function to maintain the 'this' context.
   * When calling removeEventListener, we need to use the same function reference,
   * which arrow functions provide (and regular functions do not).
   */
  private handlePopState = (_event: PopStateEvent) => {
    // Re-read the query string and update state
    // Don't mark this as user-initiated since it's from browser navigation
    setStateFromQsAndAttrib({
      state: this.state,
    });
  };

  // #endregion

  disconnectedCallback() {
    // Detach state observer
    this.state.detach(this);

    // Disconnect ResizeObserver
    this.resizeObserver.disconnect();

    // Remove event listeners
    this.removeEventListener("resize", () => this.#resizeCanvas);
    this.removeEventListener("key-selected", this.#handleKeySelected);
    window.removeEventListener("popstate", this.handlePopState);
  }
}
