const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// Eleventy already depends on this
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({
  html: true, // Enables HTML tags (the default in 11ty but not markdown-it)
  typographer: true, // Enables smart quotes and typographic replacements
});

const draftsPlugin = require("./eleventy.plugin.drafts.js");

module.exports = (eleventyConfig) => {
  // In dev mode, make sure that changes to passthrough directories are reflected immediately.
  // Requires that different passthrough directories also have different destination directories
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  // The static dir contains files that should be copied as-is to the output dir that are checked in to git
  eleventyConfig.addPassthroughCopy({ static: "/" });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(draftsPlugin);
  eleventyConfig.setLibrary("md", md);
  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site",
    },
    pathPrefix: "/KeymapKit",
  };
};
