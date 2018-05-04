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
  return angular.module('portal.about.services', [])
  .factory('portalAboutService', [
    '$http', 'miscService', 'FRAME_URLS',
    function($http, miscService, FRAME_URLS) {
    /**
     * Gets frame information from generated about-frame.json
     * @return {*}
    **/
    var getFrameDetails = function() {
      return getDetails(FRAME_URLS.aboutFrame);
    };

    /**
     * Get information
     * @param {String} URL
     * @return {*}
    **/
    var getDetails = function(URL) {
      return $http.get(URL, {cache: true})
        .then(function(result) {
          return result.data;
        },
        function(reason) {
          miscService.redirectUser(reason.status, URL);
        });
    };

      /**
       * Get info for about page
       * @param {String} url
       * @returns {*}
       */
    var getAboutPage = function(url) {
      return $http.get(url, {cache: true})
        .then(function(result) {
          return result.data;
        })
        .catch(function(error) {
          miscService.redirectUser(error.status, url);
        });
    };

    return {
      getFrameDetails: getFrameDetails,
      getDetails: getDetails,
      getAboutPage: getAboutPage,
    };
  }]);
});
