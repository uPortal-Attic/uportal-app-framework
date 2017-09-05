define(['angular'], function(angular) {
  /* Keep in sync with docs/markdown/configuration.md*/
  return angular.module('override', [])
    .constant('OVERRIDE', {
      'APP_OPTIONS': {
        'optionsTemplateURL': 'portal/misc/partials/example-options.html',
      },
    });
});
