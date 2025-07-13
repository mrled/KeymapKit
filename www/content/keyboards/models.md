---
layout: site.njk
title: Keyboard Models
eleventyNavigation:
  title: Models
  parent: keyboards
  order: 10
---

KeymapKit comes with support for the following keyboards:

- [Kinesis Advantage360](https://github.com/mrled/KeymapKit/tree/master/keyboard.advantage360)
- [ErgoDox](https://github.com/mrled/KeymapKit/tree/master/keyboard.ergodox)
- [Planck](https://github.com/mrled/KeymapKit/tree/master/keyboard.planck48)

## Writing your own keyboard

You can write your own keyboard model by instantiating a
[KeyboardModel](https://github.com/mrled/KeymapKit/blob/master/models/src/lib/KeyboardModel.ts)
and subclassing [KeymapKeyboardElement](https://github.com/mrled/KeymapKit/blob/master/ui/src/webcomponents/keymap-keyboard.ts).
