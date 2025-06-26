---
layout: site.njk
title: Supported Keyboards
eleventyNavigation:
  title: Supported Keyboards
  parent: docs
  order: 40
---

KeymapKit comes with support for the following keyboards:

- [Kinesis Advantage360](https://github.com/mrled/KeymapKit/tree/master/keyboard.advantage360)
- [ErgoDox](https://github.com/mrled/KeymapKit/tree/master/keyboard.ergodox)
- [Planck](https://github.com/mrled/KeymapKit/tree/master/keyboard.planck48)

## Writing your own keyboard

You can write your own keyboard model by instantiating a
[KeyboardModel](https://github.com/mrled/KeymapKit/blob/master/ui/src/lib/KeyboardModel.ts)
and subclassing [KeymapKeyboardElement](https://github.com/mrled/KeymapKit/blob/master/ui/src/webcomponents/keymap-keyboard.ts).

Take a look at the
[Planck keyboard walkthrough]({{ "docs/keyboard-planck-walkthrough.md" | inputPathToUrl }})
for a detailed look at the Planck as an example,
and the [ErgoDox & Advantage360]({{ "docs/keyboard-ergodox-adv360.md" | inputPathToUrl }})
for how to build more complex boards.
