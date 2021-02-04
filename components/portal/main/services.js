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

define(['angular'], function(angular) {
  return angular.module('portal.main.services', [])

  .factory('mainService', [
    '$http', '$log', '$sessionStorage',
    'miscService', 'SERVICE_LOC', 'APP_FLAGS', 'NAMES',
    function($http, $log, $sessionStorage,
             miscService, SERVICE_LOC, APP_FLAGS, NAMES) {
      var prom = $http.get(SERVICE_LOC.sessionInfo, {cache: true});
      var userPromise;

      // Service messages
      var GET_BANNERS_FAILED = 'Could not get banner messages at this time.';

      var getUser = function() {
        if (userPromise) {
          return userPromise;
        }

        userPromise = prom
          .then(function(result) { // success function
            var person = result.data.person;
            return person;
          })
          .catch(function(error) { // failure function
            miscService.redirectUser(error.status, 'Get User Info');
          });
        return userPromise;
      };

      /**
       * Retreives the user and checks against guestUserName
       * @return {Promise<Boolean>} Resolves true if user matches guestUserName
       */
      function isGuest() {
        return getUser().then(function(result) {
          return result.userName === NAMES.guestUserName;
        });
      }

      /**
       * Compute the window title
       *
       * Returns
       * page-title | app-title | portal-title (in an application), or
       * page-title | portal-title (if the app has same name as the portal), or
       * app-title | portal-title (if page name unknown or redundant)
       * portal-title (if page name unknown or redundant and app name redundant)
       *
       * Examples:
       * "Timesheets | STAR Time Entry | MyUW" ,
       * for the Timesheets page in an app named "STAR Time Entry" in
       * a portal named "MyUW", or
       *
       * "Notifications | MyUW",
       * for the notifications page in an app named "MyUW" in
       * a portal named "MyUW".
       *
       * "STAR Time Entry | MyUW"
       * in an app named "STAR Time Entry" in a portal named "MyUW"
       * when the page name is unspecified.
       *
       * "MyUW"
       * in an app named "MyUW" in a portal named "MyUW"
       * when the page name is unspecified.
       */
      function computeWindowTitle(pageTitle, appTitle, portalTitle) {
        var windowTitle = ''; // we finally set the window title to this.

        // assemble the window title from the gathered pieces,
        // starting from the end of the window title and working back to the
        // beginning.

        // if the portal has a name, end the window title with that
        // (if the portal lacks a name, portalTitle is still empty string)

        if (portalTitle) {
          windowTitle = portalTitle;
        }

        // if the app name differs from the portal, prepend it.
        // if it's the same name, omit it to avoid silly redundancy like
        // "MyUW | MyUW"
        if (appTitle && appTitle !== portalTitle) {
          // if the windowTitle already has content, first add a separator
          if (windowTitle) {
            windowTitle = ' | ' + windowTitle;
          }
          windowTitle = appTitle + windowTitle;
        }

        // if there's a page name not redundant with the app name, prepend it.
        if (pageTitle && pageTitle !== '' && pageTitle !== appTitle) {
          // if the windowTitle already has content, first add a separator
          if (windowTitle !== '') {
            windowTitle = ' | ' + windowTitle;
          }
          windowTitle = pageTitle + windowTitle;
        }

        // finally, return the built up windowTitle
        return windowTitle;
      }

      /**
       * Get banner messages from bannersURL endpoint
       */
      function getBanners() {
        return $http.get(SERVICE_LOC.bannersURL)
          .then(function(response) {
            if (response.data
              && angular.isArray(response.data)) {
              return response.data;
            } else {
              return GET_BANNERS_FAILED;
            }
          })
          .catch(function(error) {
            miscService.redirectUser(error.status, 'Get banner messages');
            return GET_BANNERS_FAILED;
          });
      }

    return {
      getUser: getUser,
      isGuest: isGuest,
      computeWindowTitle: computeWindowTitle,
      getBanners: getBanners,
    };
  }]);
});
