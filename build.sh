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
node_modules/.bin/cleancss -O1 -o build/app.opt.css out/app.css

cat <<END > build/config.json
{
  "collapseWhitespace": true,
  "removeAttributeQuotes": true,
  "removeComments": true
}
END
node_modules/.bin/html-minifier-terser -c build/config.json -o build/index.html out/index.html

# Package
mv build/app.opt.js build/app.js
mv build/app.opt.css build/app.css
zip -j9 build/app.zip build/app.js build/app.css build/index.html
# brew install advancecomp
advzip -z4 build/app.zip
