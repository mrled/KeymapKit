---
layout: site.njk
title: Theming
eleventyNavigation:
  title: Theming
  parent: customization
  order: 50
---

Colors and fonts can be overridden with CSS properties.

## Default theme

The default theme uses `oklch` to define base colors,
and then mutate those bases to handle different key states.

As a result, you can modify the base colors and the other states will automatically become variants of your new base color.

You can also take full control and specify all the variants yourself.

## `user.css`

See [user.css](https://github.com/mrled/KeymapKit/blob/master/ui/src/styles/properties/user.css)
for a complete list of properties and how the color system works.
