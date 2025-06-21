---
layout: site.njk
title: Demos
eleventyNavigation:
  key: demos
  title: Demos
  order: 3
---

Here are some demos of the KeymapKit UI
along with a few different keyboards and layouts.

This website -- not just the demos page, but the whole Eleventy site --
works by copying the bundled Javascript UI, keyboards, and layouts
from multiple different NPM packages,
all of which are stored in the repository root.
The other packages are all built separately with `esbuild` in `--watch` mode
and copied into this site's `public` directory.
User sites would work a similar way
if they copy the bundled KeymapKit code into their website or use the CDN,
so these demos are a good way to test that everything is working end to end.

This page and its children are not built for the docs website in prod,
because they have `demo: true` set in their frontmatter.
