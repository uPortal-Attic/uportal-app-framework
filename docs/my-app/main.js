define(['angular'
, 'jquery'
, 'portal'
, 'marked'
, 'ngMarked'
, 'portal/main/routes'
, 'portal/settings/route'
, 'portal/notifications/route'
, 'portal/features/route'
, 'portal/about/route'
, 'my-app/home/route',
, 'my-app/home/controllers']
, function(angular, $, portal, marked, ngMarked , main, settings, notifications, features, about, home) {
    var app = angular.module('my-app', ['portal', 'hc.marked', 'docs.main.controllers']);
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/settings', settings).
            when('/notifications', notifications).
            when('/features', features).
            when('/about', about).
            when('/access-denied', main.accessDenied).
            when('/server-error', main.serverError).
            when('/demo', home.demo).
            when('/home', home.docHome).
            when('/md/:markdownfilename', home.md).
            otherwise(home.docHome);
    }]);

    return app

});
