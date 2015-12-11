#!/bin/bash

## Reset
rm -rf target
mkdir -p target

## Resources
cp -r ../uw-frame-components/* ./target/
cp index.html ./target

## Get bower stuff

pushd target
bower install
popd

## Build less
../node_modules/less/bin/lessc -x target/css/themes/uw-madison.less > target/css/themes/uw-madison.css
../node_modules/less/bin/lessc -x target/css/themes/uw-system.less > target/css/themes/uw-system.css
