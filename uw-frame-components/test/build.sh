#!/bin/bash

pushd uw-frame-components
  bower --config.interactive=false install
  rm -rf vendor && mkdir vendor
  cp bower_components/angulartics-google-analytics/dist/* vendor/
popd
