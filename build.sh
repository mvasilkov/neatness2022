#!/bin/bash
set -eo pipefail

# Clean
git clean -dfx out
rm -rf build
mkdir -p build

# Build
level_editor/virtual/bin/python level_editor/build.py
node_modules/.bin/tsc || true

# Bundle
node_modules/.bin/rollup -f iife -o build/app.js out/app.js

# Optimize
node_modules/.bin/terser -cmo build/app.opt.js build/app.js

# Package
zip -j9 build/app.zip build/app.opt.js
