# -*- mode: Makefile -*-

# Project notes:
# - The GItHub Actions workflow expects a .PHONY target named after each NPM workspace.

# Ignore built-in inference rules that determine eg how to build object files from C source code.
# You might not want this if you're writing a Makefile for a C project.
.SUFFIXES:

# Warn if any variables are undefined.
MAKEFLAGS += --warn-undefined-variables

# Using bash fixes build problems in Vercel.
SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c

# Show a nice table of Make targets.
.PHONY: help
help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

package-lock.json: package.json
	npm install --package-lock-only

node_modules/.installed: package.json package-lock.json */package.json
	npm install
	touch node_modules/.installed

.PHONY: lint
lint: node_modules/.installed ## Run eslint
	npm run lint

.PHONY: format
format: node_modules/.installed ## Run prettier
	npm run format

.PHONY: clean
clean: ## Clean up
	rm -rf */dist
	rm -rf www/_site
	rm -rf www/static/keymapkit/*
	rm -rf cli/dist


# @keymapkit/models
MODELS_SOURCES = $(shell find models/src -type f)
models/dist/index.js: node_modules/.installed $(MODELS_SOURCES)
	npm run build -w models
.PHONY: models
models: models/dist/index.js ## Build @keymapkit/models


# @keymapkit/ui
UI_SOURCES = $(shell find ui/src -type f)
ui/dist/keymapkit.js: node_modules/.installed $(UI_SOURCES) models/dist/index.js
	npm run build -w ui
.PHONY: ui
ui: ui/dist/keymapkit.js ## Build @keymapkit/ui


# @keymapkit/keyboard.advantage360
KEYBOARD_ADV360_SOURCES = $(shell find keyboard.advantage360/ -type f -maxdepth 1)
keyboard.advantage360/dist/keyboard.advantage360.js: node_modules/.installed ui/dist/keymapkit.js $(KEYBOARD_ADV360_SOURCES)
	npm run build -w keyboard.advantage360
.PHONY: keyboard.advantage360
keyboard.advantage360: keyboard.advantage360/dist/keyboard.advantage360.js ## Build @keymapkit/keyboard.advantage360


# @keymapkit/keyboard.ergodox
KEYBOARD_ERGODOX_SOURCES = $(shell find keyboard.ergodox/ -type f -maxdepth 1)
keyboard.ergodox/dist/keyboard.ergodox.js: node_modules/.installed ui/dist/keymapkit.js $(KEYBOARD_ERGODOX_SOURCES)
	npm run build -w keyboard.ergodox
.PHONY: keyboard.ergodox
keyboard.ergodox: keyboard.ergodox/dist/keyboard.ergodox.js ## Build @keymapkit/keyboard.ergodox


# @keymapkit/keyboard.planck48
KEYBOARD_PLANCK48_SOURCES = $(shell find keyboard.planck48/ -type f -maxdepth 1)
keyboard.planck48/dist/keyboard.planck48.js: node_modules/.installed ui/dist/keymapkit.js $(KEYBOARD_PLANCK48_SOURCES)
	npm run build -w keyboard.planck48
.PHONY: keyboard.planck48
keyboard.planck48: keyboard.planck48/dist/keyboard.planck48.js ## Build @keymapkit/keyboard.planck48


## @keymapkit/examples
EXAMPLES_SOURCES = $(shell find examples/ -type f -maxdepth 1)
examples/dist/examples.js: node_modules/.installed ui/dist/keymapkit.js keyboard.ergodox/dist/keyboard.ergodox.js $(EXAMPLES_SOURCES)
	npm run build -w examples
.PHONY: examples
examples: examples/dist/examples.js ## Build the @keymapkit/examples


# @keymapkit/cli
CLI_SOURCES = $(shell find cli/src -type f)
cli/dist/cli.js: node_modules/.installed ui/dist/keymapkit.js $(CLI_SOURCES)
	npm run build -w cli
.PHONY: cli
cli: cli/dist/cli.js ## Build @keymapkit/cli


# @keymapkit/www
WWW_SOURCES = $(shell find www -type f -maxdepth 1)
www/static/keymapkit/keymapkit.js: ui/dist/keymapkit.js
	mkdir -p www/static/keymapkit
	cp ui/dist/keymapkit.js www/static/keymapkit/keymapkit.js
www/static/keymapkit/keyboard.advantage360.js: keyboard.advantage360/dist/keyboard.advantage360.js
	mkdir -p www/static/keymapkit
	cp keyboard.advantage360/dist/keyboard.advantage360.js www/static/keymapkit/keyboard.advantage360.js
www/static/keymapkit/keyboard.ergodox.js: keyboard.ergodox/dist/keyboard.ergodox.js
	mkdir -p www/static/keymapkit
	cp keyboard.ergodox/dist/keyboard.ergodox.js www/static/keymapkit/keyboard.ergodox.js
www/static/keymapkit/keyboard.planck48.js: keyboard.planck48/dist/keyboard.planck48.js
	mkdir -p www/static/keymapkit
	cp keyboard.planck48/dist/keyboard.planck48.js www/static/keymapkit/keyboard.planck48.js
www/static/keymapkit/examples.js: examples/dist/examples.js
	mkdir -p www/static/keymapkit
	cp examples/dist/examples.js www/static/keymapkit/examples.js
WWW_BUILT_DEPS = www/static/keymapkit/keyboard.advantage360.js www/static/keymapkit/keymapkit.js www/static/keymapkit/keyboard.ergodox.js www/static/keymapkit/keyboard.planck48.js www/static/keymapkit/examples.js
www/_site/.build: www/package.json $(WWW_BUILT_DEPS) $(WWW_SOURCES)
	npm run build:prod -w www
	touch www/_site/.build
.PHONY: www
www: www/_site/.build ## Build the KeymapKit website in production mode
.PHONY: www.serve
www.serve: ## Run the KeymapKit website in development mode with hot reloading
	@\
		npm run keymapkit.watch -w models & \
		npm run keymapkit.watch -w ui & \
		npm run keymapkit.watch -w keyboard.advantage360 & \
		npm run keymapkit.watch -w keyboard.ergodox & \
		npm run keymapkit.watch -w keyboard.planck48 & \
		npm run keymapkit.watch -w examples & \
		npm run serve:dev -w www & \
		wait


.PHONY: all
all: models ui keyboard.advantage360 keyboard.ergodox keyboard.planck48 cli examples www ## Build everything
