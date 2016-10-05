'use strict';
define([], function() {

  return {
    paths : {
      'marked'        : "https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.6/marked.min",
      'ngMarked'      : "https://cdn.rawgit.com/Hypercubed/angular-marked/v1.0.1/dist/angular-marked.min"
    },

    shims : {
      'ngMarked'      : { deps: ['marked','angular']}
    }

  }
});
