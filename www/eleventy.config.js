const fs = require("fs");
const path = require("path");

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Eleventy already depends on this
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({
  html: true, // Enables HTML tags (the default in 11ty but not markdown-it)
  typographer: true, // Enables smart quotes and typographic replacements
});

const draftsPlugin = require("./eleventy.plugin.drafts.js");

module.exports = async (eleventyConfig) => {
  // In dev mode, make sure that changes to passthrough directories are reflected immediately.
  // Requires that different passthrough directories also have different destination directories
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  // The static dir contains files that should be copied as-is to the output dir that are checked in to git
  eleventyConfig.addPassthroughCopy({ static: "/" });

  // Plugins from packages
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  const { HtmlBasePlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // My plugins
  eleventyConfig.addPlugin(draftsPlugin);

  // Custom libraries
  eleventyConfig.setLibrary("md", md);

  // Shortcodes
  eleventyConfig.addShortcode("importcode", (filePath, lang = "text") => {
    // Import a code file and highlight it
    // Unfortunately we have to pass the full path to the file if we use markdown content files
    const fullPath = path.resolve(process.cwd(), filePath);
    const contents = fs.readFileSync(fullPath, "utf8");
    const hilit = md.options.highlight(contents, lang);
    return `<pre><code class="language-${lang}">${hilit}</code></pre>`;
  });

  // Return the configuration object
  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site",
    },
    pathPrefix: "/KeymapKit",
  };
};
