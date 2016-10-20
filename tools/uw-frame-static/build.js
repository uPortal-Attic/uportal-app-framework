'use strict';
var exec = require('child_process').exec;

var exec_handler = function(error, stdout, stderr) {
    if (error) {
      throw error;
    }
}

exec('cp -R target/uw-frame-components/* target/uw-frame-static', exec_handler);

exec('cp uw-frame-static/superstatic.json target/uw-frame-static', exec_handler);
