#!/bin/bash

set -e

# Create output directory if not exists
mkdir -p dist

# Clean previous zips
rm -f dist/page_to_md_chrome.zip dist/page_to_md_firefox.zip

# Zip Chrome extension
cd chrome_build
zip -r ../dist/page_to_md_chrome.zip . -x '*.DS_Store'
cd ..

# Zip Firefox extension
cd firefox_build
zip -r ../dist/page_to_md_firefox.zip . -x '*.DS_Store'
cd ..

echo "✅ Packages created:"
ls -lh dist/*.zip
