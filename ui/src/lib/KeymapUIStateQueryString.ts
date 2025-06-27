/* Synchronize the query string and a state object
 */

import { KeymapUIElement } from "~/webcomponents/keymap-ui";
import { IKeymapUIStateIdArgs, KeymapUIState } from "./KeymapUIState";

/* Read the query string and update the state of the KeymapUIElement.
 *
 * Arguments:
 * - state: the KeymapUIState object
 * - keymapUi: the KeymapUIElement object, which is used to get the current attribute values
 * - explicitDefaults: when true, explicitly sets default values for missing query params;
 *   otherwise, only sets values that are present in the query string
 */
export function setStateFromQsAndAttrib({
  state,
  keymapUi,
  explicitDefaults = false,
}: {
  state: KeymapUIState;
  keymapUi?: KeymapUIElement;
  explicitDefaults?: boolean;
}): (keyof KeymapUIState)[] {
  // If the query prefi is already set in the state, use it as a default value.
  // That should not be the case if keymapUi is passed (see below), though we don't enforce that.
  let queryPrefix = state.queryPrefix;

  // If the keymapUi is passed, we are setting the state on initial load.
  // The keymapUi will pass itself to this function in its connectedCallback() only,
  // so that this function can configure the state based on its attributes and query string.
  // This will change the state to reflect what's in the attributes,
  // and then override those attributes if the query string has different values.
  // We don't want to pass the keymapUi parameter in any other situation,
  // because normally we don't want to override the state with the attributes.
  const currentAttributes: IKeymapUIStateIdArgs = {};
  if (keymapUi) {
    if (keymapUi.hasAttribute("query-prefix")) {
      queryPrefix = keymapUi.getAttribute("query-prefix") || "";
      currentAttributes.queryPrefix = queryPrefix;
    }
    if (keymapUi.hasAttribute("keymap-id")) {
      currentAttributes.keymapId = keymapUi.getAttribute("keymap-id") || "";
    }
    if (keymapUi.hasAttribute("layer")) {
      currentAttributes.layerIdx = parseInt(
        keymapUi.getAttribute("layer") || "0",
        10,
      );
    }
    if (keymapUi.hasAttribute("selected-key")) {
      currentAttributes.selectedKey =
        keymapUi.getAttribute("selected-key") || "";
    }
  }

  const qsArgs: IKeymapUIStateIdArgs = {};
  if (queryPrefix) {
    const currentParams = new URLSearchParams(window.location.search);
    const qDebug = currentParams.get("debug");
    const qMap = currentParams.get(`${queryPrefix}-map`);
    const qLayer = currentParams.get(`${queryPrefix}-layer`);
    const qKey = currentParams.get(`${queryPrefix}-key`);
    const qGuide = currentParams.get(`${queryPrefix}-guide`);
    const qStep = currentParams.get(`${queryPrefix}-step`);

    if (qDebug) {
      qsArgs.debug = qDebug === "true" ? 1 : 0;
    }
    if (qMap) {
      qsArgs.keymapId = qMap;
    }

    // When explicitDefaults is true, we need to explicitly handle missing query params
    if (explicitDefaults) {
      // Always set these values to sync with URL, even if empty/default
      qsArgs.selectedKey = qKey || "";
      qsArgs.layerIdx = qLayer ? parseInt(qLayer, 10) : 0;
      qsArgs.guideId = qGuide || null;
      qsArgs.guideStepIdx = qStep ? parseInt(qStep, 10) : 0;
    } else {
      // For initial load, only set if present in query string
      if (qKey) {
        qsArgs.selectedKey = qKey;
      }
      if (qLayer) {
        qsArgs.layerIdx = parseInt(qLayer, 10);
      }
      if (qGuide) {
        qsArgs.guideId = qGuide;
      }
      if (qStep) {
        qsArgs.guideStepIdx = parseInt(qStep, 10);
      }
    }
  }

  // Merge the changes from the attributes and the query string into a single object, and apply them to the state.
  const newStateArgs: IKeymapUIStateIdArgs = {
    ...currentAttributes,
    ...qsArgs,
  };
  state.setStatesByIds(newStateArgs);

  // Return the keys that were defined in the query string or attributes.
  // This list doesn't take into account what the initial state values were,
  // just what was set by the query string or attributes,
  // so it may include keys that were already set to the same value.
  return Object.keys(newStateArgs) as (keyof KeymapUIState)[];
}

/* Set the query string based on the current state.
 *
 * This is called whenever one of the queryable attributes changes.
 * It does not affect any query parameters other than those with the query prefix.
 *
 * If any of the query parameters match the attributes on the element in the DOM,
 * they are removed from the query string.
 * This means the query string overrides the attributes on the element,
 * and the URL isn't cluttered with unnecessary query parameters.
 *
 * This function doesn't handle changes to the query prefix itself;
 * that is handled by #updateQueryPrefix().
 *
 * Requires the element to be passed in so we can get the current attribute values.
 */
export function setQueryStringFromState(
  state: KeymapUIState,
  keymapUi: KeymapUIElement,
  options: { pushToHistory?: boolean } = {},
) {
  const queryPrefix = state.queryPrefix;

  if (!queryPrefix) {
    return;
  }
  const newParams = new URLSearchParams(window.location.search);

  const tMap = state.keymap.uniqueId;
  const tLayer = state.layer;
  const tLayerIdx = state.keymap.layers.indexOf(tLayer);
  const tKey = state.selectedKey;
  const tGuide = state.guide?.id;
  const tStep = state.guideStep?.index;

  const aMap = keymapUi.getAttribute("keymap-id") || "";
  const aLayer = parseInt(keymapUi.getAttribute("layer") || "0", 10);
  const aKey = keymapUi.getAttribute("selected-key") || "";
  const aGuide = keymapUi.getAttribute("guide-id") || "";
  const aGuideStep = parseInt(keymapUi.getAttribute("guide-step") || "0", 10);

  if (tMap && tMap !== state.defaultKeymap.uniqueId && aMap !== tMap) {
    newParams.set(`${queryPrefix}-map`, tMap);
  } else {
    newParams.delete(`${queryPrefix}-map`);
  }

  if (tLayerIdx !== undefined && aLayer !== tLayerIdx) {
    newParams.set(`${queryPrefix}-layer`, tLayerIdx.toString());
  } else {
    newParams.delete(`${queryPrefix}-layer`);
  }

  if (tKey && aKey !== tKey) {
    newParams.set(`${queryPrefix}-key`, tKey);
  } else {
    newParams.delete(`${queryPrefix}-key`);
  }

  if (tGuide && aGuide !== tGuide) {
    newParams.set(`${queryPrefix}-guide`, tGuide);
  } else {
    newParams.delete(`${queryPrefix}-guide`);
  }

  if (tStep !== undefined && aGuideStep !== tStep) {
    newParams.set(`${queryPrefix}-step`, tStep.toString());
  } else {
    newParams.delete(`${queryPrefix}-step`);
  }

  const newUrl =
    newParams.toString() !== ""
      ? `${window.location.pathname}?${newParams.toString()}`
      : `${window.location.pathname}`;

  const currentUrl = `${window.location.pathname}${window.location.search}`;
  if (currentUrl !== newUrl) {
    // Use pushState for user-initiated navigation to create browser history
    // Use replaceState for programmatic updates to avoid cluttering history
    if (options.pushToHistory) {
      window.history.pushState({}, "", newUrl);
    } else {
      window.history.replaceState({}, "", newUrl);
    }
  }
}
