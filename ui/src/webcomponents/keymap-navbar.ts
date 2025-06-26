import { KeymapUIState, KeymapUIStateChangeMap } from "~/lib/KeymapUIState";
import { KeyboardModel } from "~/lib/KeyboardModel";
import { KeymapLayer } from "~/lib/Layout";
import { IStateObserver } from "~/lib/State";
import { KeymapKeyboardTitleBarElement } from "~/webcomponents/keymap-keyboard-title-bar";

// #region Helper types

/* A wrapper class that provides helper methods for selectors.
 *
 * It takes a string primitive like 'asdf-sel'
 * and provides properties like .i for '#asdf-sel' and .c for '.asdf-sel'.
 */
class Selector {
  constructor(public r: string) {}
  toString() {
    return this.r;
  }

  /* Get the selector as a CSS-style ID
   */
  get i() {
    return "#" + this.r;
  }

  /* Get the selector as a CSS-style class
   */
  get c() {
    return "." + this.r;
  }
}

/* Selectors that we use in code
 *
 * These are used to find elements in the DOM.
 * They don't include selectors we use in separate CSS files,
 * because those have to be string-matched anyway.
 * But they do include selectors that we use in JavaScript.
 */
const Slctr = {
  Keymap: new Selector("keymap"),
  Guide: new Selector("guide"),
  CtrlButtons: new Selector("control-buttons"),
  GuideNext: new Selector("guide-next-step"),
  GuidePrev: new Selector("guide-prev-step"),
  LayerHome: new Selector("layer-home"),
} as const;
type Sels = (typeof Slctr)[keyof typeof Slctr];

type ChangeListenerFunction = (
  e: Event,
  selectId: string,
  selectElement: HTMLSelectElement,
) => void;

// #endregion

// #region Class definition

/* Title bar for a key-info-panel
 */
export class KeymapNavbarElement
  extends HTMLElement
  implements IStateObserver<KeymapUIState>
{
  //

  // #region Constructor and lifecycle

  static readonly elementName = "keymap-navbar";

  constructor() {
    super();
  }

  connectedCallback() {
    this.updateAll();
    this.layoutIdempotently();
  }

  disconnectedCallback() {
    // Detach state observer
    this._state.detach(this);
  }

  // #endregion

  // #region Public methods

  updateTitleKey(
    keymapLayer: KeymapLayer,
    referenceModel: KeyboardModel,
    selectedKeyId: string,
  ) {
    this.titleBoard.updateSelectedKey(
      keymapLayer,
      referenceModel,
      selectedKeyId,
    );
  }

  // #endregion

  // #region Observed state

  readonly observerName = "KeymapNavbarElement";

  private _state: KeymapUIState = new KeymapUIState();
  set state(value: KeymapUIState) {
    this._state = value;
    this._state.attach(this);
    this.updateAll();
  }
  get state(): KeymapUIState {
    return this._state;
  }

  /* Update the controls when the state changes.
   *
   * We want to update if either the *available* keymaps/layers/guides change,
   * so that we can change the options in the dropdowns,
   * or if the *selected* ones change, so that we can show the currently selected option.
   *
   * Each of these user input elements has a way to check for both changes.
   * For changes to the available keymaps,
   * there is a dedicated property containing all available items.
   * For changes to the layers and guides,
   * we watch for changes to the selected keymap.
   *
   *  ============|===================|=================
   *    controls  |  available items  |  selected item
   *  ============|===================|=================
   *   keymaps    |     keymaps       |    keymap
   *   layers     |     keymap        |    layer
   *   guides     |     keymap        |    guide
   *  ============|===================|=================
   *
   * Keep in mind which state automatically updates other state --
   * for instance, changes to the selected keymap will automatically
   * update the selected layer and guide.
   */
  update(stateChanges: KeymapUIStateChangeMap) {
    if (stateChanges.get("keymaps") || stateChanges.get("keymap")) {
      this.recreateKeymapSelector();
    }
    if (
      stateChanges.get("keymaps") ||
      stateChanges.get("keymap") ||
      stateChanges.get("guide") ||
      stateChanges.get("guideStep")
    ) {
      this.recreateGuideList();
    }
    if (stateChanges.get("keymap") || stateChanges.get("layer")) {
      this.recreateLayerTabs();
    }
    if (stateChanges.get("guide") || stateChanges.get("guideStep")) {
      this.updateGuideControls();
    }
  }

  private updateAll() {
    this.recreateKeymapSelector();
    this.recreateLayerTabs();
    this.recreateGuideList();
    this.updateGuideControls();
  }

  /* Called when the user selects a keymap from the dropdown
   */
  private chooseKeymap: ChangeListenerFunction = (e, id, result) => {
    this.state.setStatesByIds({
      keymapId: result.value,
    });
  };

  /* Update the guide step controls
   */
  private updateGuideControls() {
    const inGuide = this.state.guide !== null;
    this.showHideElement(this.guidePrevButton, inGuide);
    this.showHideElement(this.guideNextButton, inGuide);
    if (this.state.guideStep) {
      if (this.state.guideStep.isFirstStep) {
        this.querySelector(Slctr.GuidePrev.i)?.setAttribute("disabled", "");
      } else {
        this.querySelector(Slctr.GuidePrev.i)?.removeAttribute("disabled");
      }
      if (this.state.guideStep.isLastStep) {
        this.querySelector(Slctr.GuideNext.i)?.setAttribute("disabled", "");
      } else {
        this.querySelector(Slctr.GuideNext.i)?.removeAttribute("disabled");
      }
    }
  }

  // #endregion

  // #region Child elements

  private _guidePrevButton: HTMLButtonElement | null = null;
  get guidePrevButton(): HTMLButtonElement {
    if (!this._guidePrevButton) {
      this._guidePrevButton = document.createElement("button");
      this._guidePrevButton.setAttribute("id", Slctr.GuidePrev.r);
      this._guidePrevButton.classList.add("control-button");
      this._guidePrevButton.innerHTML = "&larr;";
      this._guidePrevButton.ariaLabel = "Previous step";
      this._guidePrevButton.addEventListener("click", () => {
        if (this.state.guideStep && !this.state.guideStep.isFirstStep) {
          this.state.setStatesByIds({
            guideStepIdx: this.state.guideStep.index - 1,
          });
        }
      });
      this.showHideElement(this._guidePrevButton, this.state.guide !== null);
    }
    return this._guidePrevButton;
  }
  private _guideNextButton: HTMLButtonElement | null = null;
  get guideNextButton(): HTMLButtonElement {
    if (!this._guideNextButton) {
      this._guideNextButton = document.createElement("button");
      this._guideNextButton.setAttribute("id", Slctr.GuideNext.r);
      this._guideNextButton.classList.add("control-button");
      this._guideNextButton.innerHTML = "&rarr;";
      this._guideNextButton.ariaLabel = "Next step";
      this._guideNextButton.addEventListener("click", () => {
        if (this.state.guideStep && !this.state.guideStep.isLastStep) {
          this.state.setStatesByIds({
            guideStepIdx: this.state.guideStep.index + 1,
          });
        }
      });
      this.showHideElement(this._guideNextButton, this.state.guide !== null);
    }
    return this._guideNextButton;
  }

  private _layerTabs: HTMLUListElement | null = null;
  get layerTabs(): HTMLUListElement {
    if (!this._layerTabs) {
      this._layerTabs = document.createElement("ul") as HTMLUListElement;
      this._layerTabs.classList.add("layer-tabs");
      const labelLi = document.createElement("li");
      labelLi.textContent = "Layers";
      this._layerTabs.append(labelLi);
      const layerItems = this.state.keymap.layers.map((layer, idx) => {
        const tabButton = document.createElement("button");
        tabButton.textContent = layer.shortName;
        tabButton.classList.add("layer-tab-button");
        if (layer === this.state.layer) {
          tabButton.classList.add("active");
        }
        const li = document.createElement("li");
        tabButton.addEventListener("click", () => {
          this.state.setStatesByIds({ layerIdx: idx, selectedKey: "" });
        });
        li.classList.add("layer-tab");
        li.appendChild(tabButton);
        return li;
      });
      if (this.state.keymap.layers.length <= 1) {
        this._layerTabs.classList.add("hidden");
      }
      this._layerTabs.append(...layerItems);
    }
    return this._layerTabs;
  }
  recreateLayerTabs() {
    const oldLayerTabs = this._layerTabs;
    this._layerTabs = null;
    if (oldLayerTabs && this.contains(oldLayerTabs)) {
      this.replaceChild(this.layerTabs, oldLayerTabs);
    }
  }

  private _keymapSelector: HTMLSelectElement | null = null;
  get keymapSelector(): HTMLSelectElement {
    if (!this._keymapSelector) {
      this._keymapSelector = document.createElement("select");
      this._keymapSelector.setAttribute("id", Slctr.Keymap.r);
      this._keymapSelector.addEventListener("change", (e: Event) => {
        if (!this._keymapSelector) return;
        this.chooseKeymap(e, Slctr.Keymap.r, this._keymapSelector);
      });
      if (this.state.keymaps.size <= 1) {
        this._keymapSelector.disabled = true;
      }
      const options: HTMLOptionElement[] = Array.from(
        this.state.keymaps.values(),
      ).map((keymap) => {
        const option = document.createElement("option");
        option.value = keymap.uniqueId;
        // option.textContent = keymap.displayName;
        option.textContent = `${keymap.displayName} (${keymap.model.displayName})`;
        if (keymap.uniqueId === this.state.keymap.uniqueId) {
          option.selected = true;
        }
        return option;
      });
      this._keymapSelector.append(...options);
    }
    return this._keymapSelector;
  }
  recreateKeymapSelector() {
    const oldKeymapSelector = this._keymapSelector;
    this._keymapSelector = null;
    if (oldKeymapSelector && this.keymapPair.contains(oldKeymapSelector)) {
      this.keymapPair.replaceChild(this.keymapSelector, oldKeymapSelector);
    }
  }

  private _keymapPair: HTMLSpanElement | null = null;
  get keymapPair(): HTMLSpanElement {
    if (!this._keymapPair) {
      this._keymapPair = document.createElement("span");
      this._keymapPair.setAttribute("id", Slctr.Keymap.r + "-pair");
      if (this.state.keymaps.size <= 1) {
        this._keymapPair.classList.add("hidden");
      }
      this._keymapPair.classList.add("controls-pair");
      this._keymapPair.append(
        this.getLabel(Slctr.Keymap, "Keymap"),
        this.keymapSelector,
      );
    }
    return this._keymapPair;
  }

  private _guideList: HTMLUListElement | null = null;
  get guideList(): HTMLUListElement {
    if (!this._guideList) {
      this._guideList = document.createElement("ul");
      this._guideList.setAttribute("id", Slctr.Guide.r);
      this._guideList.classList.add("guide-list");

      const labelLi = document.createElement("li");
      labelLi.textContent = "Guide";
      this._guideList.append(labelLi);

      // We only have UI for a single guide currently
      const guide = this.state.keymap.guides[0] || null;
      const guideActive = this.state.guide?.id === guide?.id;
      if (guide) {
        const actionButton = document.createElement("button");
        actionButton.classList.add("control-button");
        if (guideActive) {
          actionButton.textContent = `Exit Guide`;
          actionButton.addEventListener("click", () => {
            this.state.setStatesByIds({
              guideId: null,
            });
          });
        } else {
          actionButton.textContent = `Start ${guide.shortName}`;
          actionButton.addEventListener("click", () => {
            this.state.setStatesByIds({
              guideId: guide.id,
              guideStepIdx: 0,
            });
          });
        }
        this._guideList.append(actionButton);
      } else {
        this._guideList.classList.add("hidden");
      }
    }

    const controlsLi = document.createElement("li");
    controlsLi.classList.add("guide-tab");
    controlsLi.append(this.guidePrevButton, this.guideNextButton);
    if (this.state.guide === null) {
      controlsLi.classList.add("hidden");
    }
    this._guideList.append(controlsLi);

    return this._guideList;
  }
  recreateGuideList() {
    const oldGuideList = this._guideList;
    this._guideList = null;
    if (oldGuideList && this.contains(oldGuideList)) {
      this.replaceChild(this.guideList, oldGuideList);
    }
  }

  /* Get a label element by the ID of its select element.
   * If it doesn't exist, create it.
   */
  private getLabel(forItem: Sels, text: string): HTMLLabelElement {
    let result = this.querySelector(
      `label[for="${forItem}"]`,
    ) as HTMLLabelElement;
    if (!result) {
      result = document.createElement("label");
      result.setAttribute("for", forItem.r);
      result.textContent = text;
    }
    return result;
  }

  /* Lay out the child elements.
   */
  private layoutIdempotently() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    const titleKeyRow = document.createElement("div");
    titleKeyRow.classList.add("title-key-row");
    titleKeyRow.append(this.titleBoard);
    this.append(titleKeyRow, this.layerTabs, this.keymapPair, this.guideList);
    this.updateAll();
  }

  _titleBoard: KeymapKeyboardTitleBarElement | null = null;
  get titleBoard(): KeymapKeyboardTitleBarElement {
    if (!this._titleBoard) {
      this._titleBoard = this.querySelector(
        KeymapKeyboardTitleBarElement.elementName,
      ) as KeymapKeyboardTitleBarElement;
    }
    if (!this._titleBoard) {
      this._titleBoard = document.createElement(
        KeymapKeyboardTitleBarElement.elementName,
      ) as KeymapKeyboardTitleBarElement;
    }
    return this._titleBoard;
  }

  // #endregion

  // #region Private helpers

  /* Apply or remove the 'hidden' class to an element
   */
  private showHideElement(element: Element, show: boolean) {
    if (show && element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else if (!show && !element.classList.contains("hidden")) {
      element.classList.add("hidden");
    }
  }

  // #endregion
}

// #endregion
