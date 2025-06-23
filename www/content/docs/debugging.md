---
layout: site.njk
title: Debugging Tips
eleventyNavigation:
  title: Debugging Tips
  parent: docs
  order: 2
---

## Diagram debugging

Diagram debugging draws lines in the center panel and the "diamargs",
or diagram margins,
which are used to draw key indicator lines.

To enable diagram debugging on all `keymap-ui` elements on a page, use a function like this:

```javascript
/* Toggle debugging for all KeymapUI elements on the page
 */
window.toggleAllKeymapUiDebug = function () {
  document.querySelectorAll("keymap-ui").forEach((keymapUi) => {
    const debugVal = keymapUi.getAttribute("debug") || "0";
    const currentVal = parseInt(debugVal, 10);
    if (currentVal > 0) {
      keymapUi.setAttribute("debug", "0");
    } else {
      keymapUi.setAttribute("debug", "1");
    }
  });
};
```

Then you can make a button or something that enables it:

```html
<button onclick="toggleAllKeymapUiDebug()">Toggle Diagram Debugging</button>
```
