#!/bin/bash
cp -r img dist && cp -r styles dist && cp js/contextMenu.bundle.js dist/js && cp -r options dist && rm dist/options/options.js && cp init.bundle.js dist && \
cp manifest.json dist && cp contextMenu.html dist
