'use strict';
var less          = require('less');
var path          = require('path');
var fs            = require('fs');
var exec          = require('child_process').exec;
var autoprefixer  = require('autoprefixer');
var postcss       = require('postcss');

var exec_handler = function(error, stdout, stderr) {
  if (error) throw error;
};

exec('rm -rf uw-frame-static/target/', exec_handler);

exec('mkdir -p uw-frame-static/target/css/themes/', exec_handler);

exec('cp -r uw-frame-components/* uw-frame-static/target', exec_handler);

exec('cp uw-frame-static/superstatic.json uw-frame-static/target/', exec_handler);


var themes = ['uw-madison', 'uw-system', 'uw-river-falls',
  'uw-stevens-point', 'uw-milwaukee', 'uw-whitewater', 'uw-stout',
  'uw-superior', 'uw-platteville', 'uw-parkside', 'uw-oshkosh',
  'uw-greenbay', 'uw-lacrosse', 'uw-eau-claire', 'uw-extension',
  'uw-colleges'];

// Render less and write to .css file for each theme
for (var i = 0; i < themes.length; i++) {
  // Capture theme name and src path in constants to pass to less rendering
  const themeName = themes[i];
  const src = 'uw-frame-components/css/themes/' + themes[i] + '.less';

  // Read input .less file
  fs.readFile(src, function(error, data) {
    // Log any errors
    if(error) throw error;
    // Render less and write css
    writeCss(src, themeName, data.toString());
  });
}

/**
 * Process the .less styles into css, auto-prefix the css, then write to a .css file
 * @param srcPath String for the input .less file path
 * @param theme String for the name of the theme
 * @param styles String read from the input less file
 */
function writeCss(srcPath, theme, styles) {
  // Output file path for the theme
  const output = 'uw-frame-static/target/css/themes/' + theme + '.css';
  // Render .less styles
  less.render(styles,
    {
      paths: [
        path.resolve('uw-frame-components/css/angular.less'),
        path.resolve('uw-frame-components/css/themes/common-variables.less'),
        path.resolve('uw-frame-components/css/themes/' + theme + '-variables.less')],
      filename: path.resolve(srcPath),
      compress: true
    },
    function(error, css) {
      // Log errors
      if(error) throw error;
      // Auto-prefix css
      postcss([ autoprefixer ]).process(css).then(function (result) {
        result.warnings().forEach(function (warn) {
          console.warn(warn.toString());
        });
        // Write prefixed css to output file
        fs.writeFile(output, result.css, function(error) {
          if (error) throw error;
        })
      });
    });

}