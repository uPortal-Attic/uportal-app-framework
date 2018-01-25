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
       * theme.title (in the root portal)
       *
       * Examples:
       * "STAR Time Entry | MyUW" , for an app named "STAR Time Entry" in
       * a portal named "MyUW", or
       * "MyUW", for uPortal-home in a portal named "MyUW".
       */
      function setTitle() {
        var frameTitle = '';
        if ($rootScope.portal && $rootScope.portal.theme) {
          frameTitle = $rootScope.portal.theme.title;
          if (frameTitle !== NAMES.title && !APP_FLAGS.isWeb) {
            frameTitle = ' | ' + frameTitle;
          } else {
            // since frame title equals the title in NAMES lets not duplicate it
            frameTitle = '';
          }
        }
        $document[0].title = NAMES.title + frameTitle;
      }

    return {
      getUser: getUser,
      isGuest: isGuest,
      setTitle: setTitle,
    };
  }]);
});
