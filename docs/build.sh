#!/bin/bash

pushd ..;

npm run build-static

rm -rf docs/target
mkdir -p docs/target

cp -r uw-frame-static/target/* docs/target

popd

cp -r js markdown my-app target/
