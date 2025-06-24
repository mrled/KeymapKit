---
layout: site.njk
title: ErgoDox Walkthrough
eleventyNavigation:
  title: ErgoDox Walkthrough
  parent: docs
  order: 55
---

The [ErgoDox](https://github.com/mrled/KeymapKit/tree/master/keyboard.ergodox)
contains examples of more complex layouts than the
[Planck](https://github.com/mrled/KeymapKit/tree/master/keyboard.planck48).

A few key points:

- It includes CSS
  - All children of a given `<keymap-ui>` element use **the same shadow DOM**,
    so CSS in a keyboard affects all of it.
    (This is required to draw lines to the keyboard keys.)
- It uses multiple keygrids
  - `l-f`: Left finger grid
  - `l-t`: Left thumb grid
  - `r-f`: Right finger grid
  - `r-t`: Right thumb grid
  - Remember that key IDs are based on their grid name and position,
    so `l-f-1-1` and `r-f-1-1` are different keys.
