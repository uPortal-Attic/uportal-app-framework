'use strict';
require(['./config'], function(config) {
    // eslint-disable-next-line angular/module-getter
    require.config(config);

    require(['angular', 'my-app'], function(angular) {
        angular.bootstrap(document, ['my-app']);
    });
});
