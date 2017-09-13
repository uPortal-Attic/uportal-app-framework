/*
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
'use strict';
/* eslint-env node */
/* eslint-disable angular/log, no-console */
const less = require('less');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

const mkdirp = require('mkdirp');
const copy = require('recursive-copy');
const copyOptions = {
  overwrite: true,
};

mkdirp('uw-frame-static/target/css/themes/', function(error) {
  if (error) throw error;
});


const themes = ['default', 'uw-madison', 'uw-system', 'uw-river-falls',
  'uw-stevens-point', 'uw-milwaukee', 'uw-whitewater', 'uw-stout',
  'uw-superior', 'uw-platteville', 'uw-parkside', 'uw-oshkosh',
  'uw-greenbay', 'uw-lacrosse', 'uw-eau-claire', 'uw-extension',
  'uw-colleges'];

// Render less and write to .css file for each theme
for (let i = 0; i < themes.length; i++) {
  // Capture theme name and src path in constants to pass to less rendering
  const themeName = themes[i];
  const src = 'uw-frame-components/css/themes/' + themes[i] + '.less';

  // Read input .less file
  fs.readFile(src, function(error, data) {
    // Log any errors
    if (error) throw error;
    // Render less and write css
    writeCss(src, themeName, data.toString());
  });
}

copy(
  'uw-frame-components/',
  'uw-frame-static/target',
  copyOptions
).catch(function(error, results) {
  if (error) throw error;
});

copy(
  'node_modules/bootstrap/',
  'uw-frame-static/target/css/themes/node_modules/bootstrap/',
  copyOptions
).catch(function(error) {
  if (error) throw error;
});

copy(
  'node_modules/font-awesome/',
  'uw-frame-static/target/css/themes/node_modules/font-awesome/',
  copyOptions
).catch(function(error) {
  if (error) throw error;
});

copy(
  'node_modules/normalize.less',
  'uw-frame-static/target/css/themes/node_modules/normalize.less',
  copyOptions
).catch(function(error) {
  if (error) throw error;
});

copy(
  'uw-frame-static/superstatic.json',
  'uw-frame-static/target/superstatic.json',
  copyOptions
).catch(function(error, results) {
  if (error) throw error;
});

/**
 * Process the .less styles into css, auto-prefix the css,
 * then write to a .css file
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
        path.resolve('uw-frame-components/css/themes/'+theme+'-variables.less'),
      ],
      filename: path.resolve(srcPath),
      compress: true,
    },
    function(error, rendered) {
      // Log errors
      if (error) throw error;
      // Auto-prefix css
      return postcss([autoprefixer])
      .process(rendered.css)
      .then(function(result) {
        result.warnings().forEach(function(warn) {
          console.warn(warn.toString());
        });
        // Write prefixed css to output file
        fs.writeFile(output, result.css, function(error) {
          if (error) throw error;
        });
        return result;
      });
    }
  );
}
