/* global require */
/* eslint-disable @typescript-eslint/no-require-imports */

const test = require('node:test');
const assert = require('node:assert');
const { generateBlankKeymap } = require('../commands/blank.js');

test('Planck48 keyboard generates correct blank layout', async () => {
  const packageName = '@keymapkit/keyboard.planck48';
  const modelName = 'KeyboardModelPlanck48';
  
  const result = await generateBlankKeymap(packageName, modelName);
  
  // Basic structure checks
  assert.ok(result.includes('import {'), 'Should include import statement');
  assert.ok(result.includes('KeymapLayout'), 'Should import KeymapLayout');
  assert.ok(result.includes('KeymapGuide'), 'Should import KeymapGuide');
  assert.ok(result.includes('KeymapKey'), 'Should import KeymapKey');
  assert.ok(result.includes('KeymapLayer'), 'Should import KeymapLayer');
  assert.ok(result.includes(`import { ${modelName} }`), 'Should import the keyboard model');
  assert.ok(result.includes(`from "${packageName}"`), 'Should import from correct package');
  
  // Layout structure checks
  assert.ok(result.includes('export const BlankLayout'), 'Should export BlankLayout');
  assert.ok(result.includes(`displayName: "Blank ${modelName} Layout"`), 'Should have correct display name');
  assert.ok(result.includes('uniqueId: "blank-layout"'), 'Should have unique ID');
  assert.ok(result.includes(`model: ${modelName}`), 'Should reference the model');
  
  // Layer checks
  assert.ok(result.includes('displayName: "Main Layer"'), 'Should have Main Layer');
  assert.ok(result.includes('shortName: "Main"'), 'Should have Main shortname');
  assert.ok(result.includes('Welcome to my keymap'), 'Should have welcome message');
  
  // Key count check - Planck48 should have 48 keys
  const keyMatches = result.match(/new KeymapKey\(/g);
  assert.strictEqual(keyMatches.length, 48, 'Should generate exactly 48 keys for Planck48');
  
  // Check that all keys have the expected planck grid comment
  assert.ok(result.includes('// The planck grid'), 'Should have planck grid comment');
  
  // Check specific key IDs that should be present for Planck48
  const expectedKeyIds = [
    'planck-1-1', 'planck-3-1', 'planck-5-1', 'planck-7-1', 'planck-9-1', 'planck-11-1',
    'planck-13-1', 'planck-15-1', 'planck-17-1', 'planck-19-1', 'planck-21-1', 'planck-23-1',
    'planck-1-3', 'planck-3-3', 'planck-5-3', 'planck-7-3', 'planck-9-3', 'planck-11-3',
    'planck-13-3', 'planck-15-3', 'planck-17-3', 'planck-19-3', 'planck-21-3', 'planck-23-3',
    'planck-1-5', 'planck-3-5', 'planck-5-5', 'planck-7-5', 'planck-9-5', 'planck-11-5',
    'planck-13-5', 'planck-15-5', 'planck-17-5', 'planck-19-5', 'planck-21-5', 'planck-23-5',
    'planck-1-7', 'planck-3-7', 'planck-5-7', 'planck-7-7', 'planck-9-7', 'planck-11-7',
    'planck-13-7', 'planck-15-7', 'planck-17-7', 'planck-19-7', 'planck-21-7', 'planck-23-7'
  ];
  
  expectedKeyIds.forEach(keyId => {
    assert.ok(result.includes(`id:"${keyId}"`), `Should include key with ID ${keyId}`);
  });
  
  // Guide checks
  assert.ok(result.includes('new KeymapGuide'), 'Should include a KeymapGuide');
  assert.ok(result.includes('title: "Layout Guide"'), 'Should have guide title');
  assert.ok(result.includes('shortName: "Guide"'), 'Should have guide shortname');
  assert.ok(result.includes('id: "example-guide"'), 'Should have guide ID');
  assert.ok(result.includes('keyId: "planck-1-1"'), 'Should reference first key in guide');
  
  // Check that keys have empty names and info arrays ready for customization
  assert.ok(result.includes('name:""'), 'Keys should have empty names');
  assert.ok(result.includes('info:[""]'), 'Keys should have empty info arrays');
});

test('generateBlankKeymap handles invalid package', async () => {
  await assert.rejects(
    async () => {
      await generateBlankKeymap('@nonexistent/package', 'NonexistentModel');
    },
    /Package '@nonexistent\/package' not found/,
    'Should throw error for non-existent package'
  );
});

test('generateBlankKeymap handles invalid model', async () => {
  await assert.rejects(
    async () => {
      await generateBlankKeymap('@keymapkit/keyboard.planck48', 'NonexistentModel');
    },
    /Model 'NonexistentModel' not found/,
    'Should throw error for non-existent model'
  );
});