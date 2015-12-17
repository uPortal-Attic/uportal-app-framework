#!/bin/bash

## Reset
rm -rf target
mkdir -p target

## Resources
cp -r ../uw-frame-components/* ./target/
cp index.html ./target
cp superstatic.json ./target

## Get bower stuff

pushd target
../../node_modules/bower/bin/bower --config.interactive=false install
popd

## Build less
../node_modules/less/bin/lessc -x target/css/themes/uw-madison.less > target/css/themes/uw-madison.css
../node_modules/less/bin/lessc -x target/css/themes/uw-system.less > target/css/themes/uw-system.css
