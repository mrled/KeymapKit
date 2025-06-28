# @keymapkit/cli

CLI tools for KeymapKit keyboard layouts.

## Installation

```bash
npm install @keymapkit/cli
```

## Usage

### Generate a blank keymap

Generate a blank keymap layout for a specific keyboard model:

```bash
npx @keymapkit/cli blank <package> <model>
```

**Arguments:**

- `package`: NPM package name (e.g., `@keymapkit/keyboard.ergodox`)
- `model`: Keyboard model name exported by the package (e.g., `KeyboardModelErgodox`)

**Examples:**

Generate a blank ErgoDox layout:

```bash
npx @keymapkit/cli blank @keymapkit/keyboard.ergodox KeyboardModelErgodox
```

Generate a blank Planck 48 layout:

```bash
npx @keymapkit/cli blank @keymapkit/keyboard.planck48 KeyboardModelPlanck48
```

The command outputs valid JavaScript that you can save to a file and use in your KeymapKit project:

```bash
npx @keymapkit/cli blank @keymapkit/keyboard.planck48 KeyboardModelPlanck48 > my-blank-layout.js
```

## Output

The generated layout includes:

- All physical keys from the keyboard model
- Empty key names and info fields
- A basic guide with welcome text
- Proper imports for KeymapKit components

You can then customize the generated layout by adding key names, descriptions, and additional layers as needed.
