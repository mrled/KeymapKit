# KeymapKit

The presentation layer for your keyboard.

KeymapKit provides a UI for displaying keyboard layouts, including key legends, multiple layers, drawing diagram lines to specific keys, and layout tours.

See it in action on its [documentation site](https://pages.micahrl.com/KeymapKit).

It looks like this:

![Screenshot](docs/screenshot.png?raw=true "Screenshot")

## Writing your own keymap

- See the [examples package](./examples)
- Read the [documentation](https://pages.micahrl.com/KeymapKit)

You can generate a blank keymap for any valid keyboard model,
so long as both `@keymapkit/cli` and the keyboard model are available in the current NPM workspace.
For instance, to generate a blank ErgoDox keymap:

```sh
npm install @keymapkit/cli @keymapkit/keyboard.ergodox
npx @keymapkit/cli blank @keymapkit/keyboard.ergodox KeyboardModelErgodox
```

## Development

Use Node.js 24.15.0 or newer on the 24.x line, or Node.js 26 or newer.
The CLI itself also supports Node.js 22.22.2 or newer on the 22.x line.

TypeScript is kept on 6.0.x until the lint, test, and declaration-generation
tools support TypeScript 7.

Use the make file

```console
$ make
help                 Show this help
lint                 Run eslint
format               Run prettier
clean                Clean up
models               Build @keymapkit/models
ui                   Build @keymapkit/ui
keyboard.advantage360 Build @keymapkit/keyboard.advantage360
keyboard.ergodox     Build @keymapkit/keyboard.ergodox
keyboard.planck48    Build @keymapkit/keyboard.planck48
examples             Build the @keymapkit/examples
www                  Build the KeymapKit website in production mode
www.serve            Run the KeymapKit website in development mode with hot reloading
all                  Build everything
```
