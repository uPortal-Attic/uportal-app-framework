'use strict';
define([], function() {

  return {
    paths : {
      'marked'        : "bower_components/marked/lib/marked",
      'ngMarked'      : "bower_components/angular-marked/dist/angular-marked"
    },

    shims : {
      'ngMarked'      : { deps: ['marked','angular']}
    }

  }
});
