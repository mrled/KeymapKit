import { describe, test, expect } from "@jest/globals";
import { generateBlankKeymap } from "../commands/blank.js";

describe("Planck48 keyboard blank layout generation", () => {
  test("generates correct blank layout", async () => {
    const packageName = "@keymapkit/keyboard.planck48";
    const modelName = "KeyboardModelPlanck48";

    const result = await generateBlankKeymap(packageName, modelName);

    // Basic structure checks
    expect(result).toContain("import {");
    expect(result).toContain("KeymapLayout");
    expect(result).toContain("KeymapGuide");
    expect(result).toContain("KeymapKey");
    expect(result).toContain("KeymapLayer");
    expect(result).toContain(`import { ${modelName} }`);
    expect(result).toContain(`from "${packageName}"`);

    // Layout structure checks
    expect(result).toContain("export const BlankLayout");
    expect(result).toContain(`displayName: "Blank ${modelName} Layout"`);
    expect(result).toContain('uniqueId: "blank-layout"');
    expect(result).toContain(`model: ${modelName}`);

    // Layer checks
    expect(result).toContain('displayName: "Main Layer"');
    expect(result).toContain('shortName: "Main"');
    expect(result).toContain("Welcome to my keymap");

    // Key count check - Planck48 should have 48 keys
    const keyMatches = result.match(/new KeymapKey\(/g);
    expect(keyMatches).toHaveLength(48);

    // Check that all keys have the expected planck grid comment
    expect(result).toContain("// The planck grid");

    // Check specific key IDs that should be present for Planck48
    const expectedKeyIds = [
      "planck-1-1",
      "planck-3-1",
      "planck-5-1",
      "planck-7-1",
      "planck-9-1",
      "planck-11-1",
      "planck-13-1",
      "planck-15-1",
      "planck-17-1",
      "planck-19-1",
      "planck-21-1",
      "planck-23-1",
      "planck-1-3",
      "planck-3-3",
      "planck-5-3",
      "planck-7-3",
      "planck-9-3",
      "planck-11-3",
      "planck-13-3",
      "planck-15-3",
      "planck-17-3",
      "planck-19-3",
      "planck-21-3",
      "planck-23-3",
      "planck-1-5",
      "planck-3-5",
      "planck-5-5",
      "planck-7-5",
      "planck-9-5",
      "planck-11-5",
      "planck-13-5",
      "planck-15-5",
      "planck-17-5",
      "planck-19-5",
      "planck-21-5",
      "planck-23-5",
      "planck-1-7",
      "planck-3-7",
      "planck-5-7",
      "planck-7-7",
      "planck-9-7",
      "planck-11-7",
      "planck-13-7",
      "planck-15-7",
      "planck-17-7",
      "planck-19-7",
      "planck-21-7",
      "planck-23-7",
    ];

    expectedKeyIds.forEach((keyId) => {
      expect(result).toContain(`id:"${keyId}"`);
    });

    // Guide checks
    expect(result).toContain("new KeymapGuide");
    expect(result).toContain('title: "Layout Guide"');
    expect(result).toContain('shortName: "Guide"');
    expect(result).toContain('id: "example-guide"');
    expect(result).toContain('keyId: "planck-1-1"');

    // Check that keys have empty names and info arrays ready for customization
    expect(result).toContain('name:""');
    expect(result).toContain('info:[""]');
  });

  test("handles invalid package", async () => {
    await expect(
      generateBlankKeymap("@nonexistent/package", "NonexistentModel"),
    ).rejects.toThrow("Package '@nonexistent/package' not found");
  });

  test("handles invalid model", async () => {
    await expect(
      generateBlankKeymap("@keymapkit/keyboard.planck48", "NonexistentModel"),
    ).rejects.toThrow("Model 'NonexistentModel' not found");
  });
});
