// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Command } = require("commander");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { generateBlankKeymap } = require("./commands/blank.js");

const program = new Command();

program
  .name("@keymapkit/cli")
  .description("CLI tools for KeymapKit")
  .version("0.1.0");

program
  .command("blank")
  .description("Generate a blank keymap layout for a given keyboard model")
  .argument("<package>", "NPM package name (e.g., @keymapkit/keyboard.ergodox)")
  .argument("<model>", "Keyboard model name (e.g., KeyboardModelErgodx)")
  .action(async (packageName, modelName) => {
    try {
      const result = await generateBlankKeymap(packageName, modelName);
      console.log(result);
    } catch (error) {
      console.error("Error generating blank keymap:", error.message);
      process.exit(1);
    }
  });

program.parse();
