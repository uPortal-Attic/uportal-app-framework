'use strict';
var less = require('less');
var exec = require('child_process').exec;

var exec_handler = function(error, stdout, stderr) {
    if (error) throw error;
}

exec('cp -r uw-frame-components/* uw-frame-static/target', exec_handler);

exec('cp uw-frame-static/superstatic.json uw-frame-static/target/', exec_handler);

exec('mkdir -p uw-frame-static/target/css/themes', exec_handler);


var themes = ['uw-madison', 'uw-system', 'uw-river-falls',
	      'uw-stevens-point', 'uw-milwaukee', 'uw-whitewater', 'uw-stout',
	      'uw-superior', 'uw-platteville', 'uw-parkside', 'uw-oshkosh',
	      'uw-greenbay', 'uw-lacrosse', 'uw-eau-claire', 'uw-extension',
	      'uw-colleges'];


for (var i = 0; i < themes.length; i++) {
    var cmd = 'node_modules/.bin/lessc -x uw-frame-components/css/themes/'+ themes[i]+ '.less > uw-frame-static/target/css/themes/' + themes[i] + '.css';
    exec(cmd, exec_handler);
}

