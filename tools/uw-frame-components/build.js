'use strict';
var less = require('less');
var exec = require('child_process').exec;
var glob = require('glob');

var exec_handler = function(error, stdout, stderr) {
    if (error) throw error;
}

exec('mkdir -p target/uw-frame-components', exec_handler);
exec('cp -r uw-frame-components/* target/uw-frame-components', exec_handler);

exec('mkdir -p target/uw-frame-components/css', exec_handler);
exec('cp node_modules/font-awesome/css/* target/uw-frame-components/css', exec_handler);

exec('mkdir -p target/uw-frame-components/fonts', exec_handler);
exec('cp node_modules/font-awesome/fonts/* target/uw-frame-components/fonts', exec_handler);

glob('uw-frame-components/css/themes/*.less', function(er, files) {
  files.forEach(function(e) {
    if (!(e.indexOf('-variables') > 0)) {
      var output = 'target/' + e.slice(0, -5) + '.css';
      var cmd = 'node_modules/.bin/lessc -x ' + e + ' > ' + output;
      exec(cmd, exec_handler);
    }
  });
});

