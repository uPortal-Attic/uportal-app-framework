#!/bin/bash

## Reset
rm -rf target
mkdir -p target

## Resources
cp -r ../uw-frame-components/* ./target/

## Copy over superstatic configuration for dev superstatic instance
cp superstatic.json ./target

## Note index.html is copied in via grunt script

## Get bower stuff

pushd target
../../node_modules/bower/bin/bower --config.interactive=false --allow-root install
popd

## Build less
../node_modules/less/bin/lessc -x target/css/themes/uw-madison.less > target/css/themes/uw-madison.css
../node_modules/less/bin/lessc -x target/css/themes/uw-system.less > target/css/themes/uw-system.css
../node_modules/less/bin/lessc -x target/css/themes/uw-river-falls.less > target/css/themes/uw-river-falls.css
../node_modules/less/bin/lessc -x target/css/themes/uw-stevens-point.less > target/css/themes/uw-stevens-point.css
../node_modules/less/bin/lessc -x target/css/themes/uw-milwaukee.less > target/css/themes/uw-milwaukee.css
../node_modules/less/bin/lessc -x target/css/themes/uw-whitewater.less > target/css/themes/uw-whitewater.css
../node_modules/less/bin/lessc -x target/css/themes/uw-stout.less > target/css/themes/uw-stout.css
../node_modules/less/bin/lessc -x target/css/themes/uw-superior.less > target/css/themes/uw-superior.css
../node_modules/less/bin/lessc -x target/css/themes/uw-platteville.less > target/css/themes/uw-platteville.css
../node_modules/less/bin/lessc -x target/css/themes/uw-parkside.less > target/css/themes/uw-parkside.css
../node_modules/less/bin/lessc -x target/css/themes/uw-oskhosh.less > target/css/themes/uw-oskhosh.css
../node_modules/less/bin/lessc -x target/css/themes/uw-greenbay.less > target/css/themes/uw-greenbay.css
../node_modules/less/bin/lessc -x target/css/themes/uw-lacrosse.less > target/css/themes/uw-lacrosse.css