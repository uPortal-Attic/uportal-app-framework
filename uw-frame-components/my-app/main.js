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
define(['angular',
    'jquery',
    'portal',
    'portal/main/routes',
    'portal/settings/routes',
    'portal/about/route',
    'portal/widgets/routes',
    'portal/messages/routes',
  ], function(
      angular, $, portal, main, settings,
      about, widgets, messages
    ) {
    return angular.module('my-app', ['portal'])
    .config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
        .when('/settings', settings.betaSettings)
        .when('/user-settings', settings.userSettings)
        .when('/notifications', messages.notifications)
        .when('/features', messages.announcements)
        .when('/about', about)
        .when('/access-denied', main.accessDenied)
        .when('/server-error', main.serverError)
        .when('/sorry-safari', main.storageError)
        .when('/demo-widgets', widgets.demoWidgets)
        .when('/', main.main)
        .otherwise('/');
    }]);
});
