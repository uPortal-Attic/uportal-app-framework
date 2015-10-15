define([
    'angular',
    'require',
    'app-config',
    'frame-config',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    './about/controllers',
    './about/services',
    './main/controllers',
    './main/directives',
    './main/services',
    './misc/controllers',
    './misc/directives',
    './misc/filters',
    './misc/services',
    './notifications/controllers',
    './notifications/directives',
    './notifications/services',
    './search/controllers',
    './search/directives',
    './storage/services',
    './features/controllers',
    './features/services',
    'sortable',
    'ui-bootstrap',
    'ui-gravatar'
], function(angular, require) {

    var app = angular.module('portal', [
        'app-config',
        'frame-config',
        'ngRoute',
        'ngSanitize',
        'ngStorage',
        'portal.about.controllers',
        'portal.about.services',
        'portal.main.controllers',
        'portal.main.directives',
        'portal.main.services',
        'portal.misc.controllers',
        'portal.misc.directives',
        'portal.misc.filters',
        'portal.misc.services',
        'portal.notifications.controllers ',
        'portal.notifications.directives',
        'portal.notifications.services',
        'portal.search.controllers',
        'portal.search.directives',
        'portal.storage.services',
        'portal.features.controllers',
        'portal.features.services',
        'ui.bootstrap',
        'ui.gravatar',
        'ui.sortable'
    ]);

    return app;

});

