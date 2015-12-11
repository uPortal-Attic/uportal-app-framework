define(['angular'
, 'jquery'
, 'portal'
, 'portal/main/routes'
, 'portal/settings/route'
, 'portal/notifications/route'
, 'portal/features/route'
, 'portal/about/route'
, 'my-app/home/route']
, function(angular, $, portal, main, settings, notifications, features, about, home) {
    var app = angular.module('my-app', ['portal']);
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
            when('/settings', settings).
            when('/notifications', notifications).
            when('/features', features).
            when('/about', about).
            when('/access-denied', main.accessDenied).
            when('/server-error', main.serverError).
            otherwise(home);
    }]);

    return app

});
