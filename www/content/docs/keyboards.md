---
layout: site.njk
title: Keyboards
eleventyNavigation:
  title: Keyboards
  parent: docs
  order: 40
---

KeymapKit comes with support for the following keyboards:

- [ErgoDox](https://github.com/mrled/KeymapKit/tree/master/keyboard.ergodox)
- [Planck](https://github.com/mrled/KeymapKit/tree/master/keyboard.planck48)

## Writing your own keyboard

You can write your own keyboard model by instantiating a
[KeyboardModel](https://github.com/mrled/KeymapKit/blob/master/ui/src/lib/KeyboardModel.ts)
and subclassing [KeymapKeyboardElement](https://github.com/mrled/KeymapKit/blob/master/ui/src/webcomponents/keymap-keyboard.ts).

Take a look at the Planck keyboard walkthrough for a detailed look at the Planck as an example.
