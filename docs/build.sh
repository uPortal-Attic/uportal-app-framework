#!/bin/bash

pushd ..;

npm run build-static

rm -rf docs/target
mkdir -p docs/target

cp -r uw-frame-static/target/* docs/target

popd

cp -r js img markdown my-app superstatic.json target/
