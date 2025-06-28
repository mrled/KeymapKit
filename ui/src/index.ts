/* Import all our code so that esbuild can find it.
 *
 * Only elements that are required by consumers should be exported here.
 * Also, make sure all our custom elements get registered.
 *
 * This can be done with a plugin or something, but we probably don't need to.
 * <https://github.com/evanw/esbuild/issues/722>
 */

import { KeymapUIElement } from "~/webcomponents/keymap-ui";
import { registerAllKeymapClickWebComponents } from "~/webcomponents/registerall";

import { KeymapKeyboardElement } from "~/webcomponents/keymap-keyboard";
import { KeymapKeygridElement } from "~/webcomponents/keymap-keygrid";

import {
  PhysicalKey,
  KeyboardModel,
  KeymapLayout,
  KeymapGuide,
  KeymapLayer,
  KeymapKey,
  Point,
  Size,
} from "@keymapkit/models";

registerAllKeymapClickWebComponents();

export {
  // Used by consumers
  KeymapUIElement,
  // Used by authors of keyboard models and layouts
  KeymapKeyboardElement,
  KeymapKeygridElement,
  // Re-exports used by authors of keyboard models and layouts
  PhysicalKey,
  KeymapLayout,
  KeymapGuide,
  KeymapLayer,
  KeymapKey,
  Point,
  Size,
  KeyboardModel,
};
