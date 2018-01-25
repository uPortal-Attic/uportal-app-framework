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
    'miscService', 'SERVICE_LOC', 'APP_FLAGS', '$rootScope', 'NAMES',
    '$document',
    function($http, $log, $sessionStorage,
             miscService, SERVICE_LOC, APP_FLAGS, $rootScope, NAMES,
             $document) {
      var prom = $http.get(SERVICE_LOC.sessionInfo, {cache: true});
      var userPromise;

      var getUser = function() {
        if (userPromise) {
          return userPromise;
        }

        userPromise = prom
          .then(function(result, status) { // success function
            var person = result.data.person;
            if (APP_FLAGS.loginOnLoad) {
              // quick check to make sure you are who your browser says you are
              if (
                $sessionStorage.portal && $sessionStorage.portal.username &&
                person.userName !== $sessionStorage.portal.username &&
                person.originalUsername !== $sessionStorage.portal.username
              ) {
                $log.warn('Thought they were '
                  + $sessionStorage.portal.username
                  + ' but session sent back '
                  + person.userName +'. Redirect!');
                delete $sessionStorage.portal;
                miscService.redirectUser(
                  302, 'Wrong User than populated in session storage.');
              }
            }
            return person;
          })
          .catch(function(data, status) { // failure function
            miscService.redirectUser(status, 'Get User Info');
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
       * set the window title
       *
       * results in title
       * NAMES.title | theme.title (in an application), or
       * theme.title (if these names are the same, e.g. in the root portal)
       *
       * Examples:
       * "STAR Time Entry | MyUW" , for an app named "STAR Time Entry" in
       * a portal named "MyUW", or
       * "MyUW", for a uPortal-home named "MyUW" in a portal named "MyUW".
       */
      function setTitle() {
        var windowTitle = ''; // we finally set the window title to this.
        var portalTitle = ''; // the name of the portal if we can determine it

        if ($rootScope.portal && $rootScope.portal.theme &&
              $rootScope.portal.theme.title) {
          // there's an active theme with a title.
          // consider that title the name of the portal
          portalTitle = $rootScope.portal.theme.title;

          if (portalTitle == NAMES.title) {
            // titles like "MyUW | MyUW" e.g. would be silly,
            // so just use e.g. "MyUW"
            windowTitle = NAMES.title;
          } else {
            // app title differs from portal title, so include both in
            // window title to communicate app-in-context-of-portal.
            windowTitle = NAMES.title + ' | ' + portalTitle;
          }
        } else {
          // there isn't an active theme with a title
          // so just use the name of the app
          windowTitle = NAMES.title;
        }

        $document[0].title = windowTitle;
      }

    return {
      getUser: getUser,
      isGuest: isGuest,
      setTitle: setTitle,
    };
  }]);
});
