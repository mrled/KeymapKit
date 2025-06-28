import { KeyboardModel } from "@keymapkit/models";
import { isNodeError } from "../util/nodeError";

async function generateBlankKeymap(packageName: string, modelName: string) {
  try {
    // Dynamically import @keymapkit/ui (ESM package)
    const { KeyboardModel } = await import("@keymapkit/models");

    // Dynamically import the specified package
    const moduleExports = await import(packageName);

    // Get the keyboard model from the module exports
    const model = moduleExports[modelName];
    if (!model) {
      throw new Error(
        `Model '${modelName}' not found in package '${packageName}'`,
      );
    }

    if (!(model instanceof KeyboardModel)) {
      throw new Error(`'${modelName}' is not a valid KeyboardModel instance`);
    }

    // Generate the blank keymap JavaScript code
    return generateJavaScriptCode(packageName, modelName, model);
  } catch (error) {
    if (isNodeError(error)) {
      throw new Error(
        `Package '${packageName}' not found. Make sure it's installed.`,
      );
    }
    throw error;
  }
}

function generateJavaScriptCode(
  packageName: string,
  modelName: string,
  model: KeyboardModel,
) {
  // Group keys by boardId for the comment structure
  const keysByBoard = new Map();
  model.physicalKeys.forEach((physicalKey) => {
    if (!keysByBoard.has(physicalKey.boardId)) {
      keysByBoard.set(physicalKey.boardId, []);
    }
    keysByBoard
      .get(physicalKey.boardId)
      .push(
        `        new KeymapKey({name:"", id:"${physicalKey.id}", info:[""]})`,
      );
  });

  // Create comments and organized key sections
  const keySections = [];
  for (const [boardId, keys] of keysByBoard) {
    keySections.push(`        // The ${boardId} grid`);
    keySections.push(...keys);
  }

  // Create a simple guide with one example key (use the first key)
  const firstKey = model.physicalKeys[0];
  const guideKeyId = firstKey ? firstKey.id : "example-1-1";

  const jsCode = `import {
  KeymapLayout,
  KeymapGuide,
  KeymapKey,
  KeymapLayer,
} from "@keymapkit/ui";
import { ${modelName} } from "${packageName}";


export const BlankLayout = new KeymapLayout({
  displayName: "Blank ${modelName} Layout",
  uniqueId: "blank-layout",
  model: ${modelName},
  layers: [
    KeymapLayer.fromKeyList({
      displayName: "Main Layer",
      shortName: "Main",
      welcome: [
        \`Welcome to my keymap.\`,
        \`Select a key from the board above to learn more about it.\`,
      ],
      keys: [
${keySections.join(",\n")}
      ]
    }),
  ],
  guides: [
    new KeymapGuide({
      title: "Layout Guide",
      shortName: "Guide",
      id: "example-guide",
      steps: [
        {
          title: "Welcome to the guide to my main keyboard layout",
          text: [
            \`The first guide step\`,
          ],
          selection: [],
        },
        { keyId: "${guideKeyId}" },
      ],
    }),
  ],
});`;

  return jsCode;
}

module.exports = { generateBlankKeymap, generateJavaScriptCode };
