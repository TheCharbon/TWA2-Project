#!/bin/bash
set -e

cd ../client/
npm install
npm run build

rm -rf ../server/react_build || true
cp -r build/ ../server/react_build
rm -rf build/

cd ../server
rm full.zip || true
7z a -tzip full.zip . -xr!node_modules

echo "preparations completed"