// eslint-disable-next-line @typescript-eslint/no-require-imports
import { Command } from "commander";
// eslint-disable-next-line @typescript-eslint/no-require-imports
import { generateBlankKeymap } from "./commands/blank.js";

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
  .action(async (packageName: string, modelName: string) => {
    try {
      const result = await generateBlankKeymap(packageName, modelName);
      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error generating blank keymap:", error.message);
      } else {
        console.error("Error generating blank keymap:", error);
      }
      process.exit(1);
    }
  });

program.parse();
