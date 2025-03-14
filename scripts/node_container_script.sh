#!/bin/sh

# Installing Node Dependencies
echo "-----------Installing Node Dependencies-----------"
if [ -d "node_modules" ]; then
    echo "node_modules directory exists. Skipping."
else
    npm install
fi

# Building Node Dependencies
echo "-----------Building Node Dependencies-----------"
if [ -d "public/build" ]; then
    echo "public/build directory exists. Skipping."
else
    npm run build
fi

# Keep the container running
tail -f /dev/null
