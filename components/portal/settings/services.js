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

define(['angular', 'jquery'], function(angular, $) {
    return angular.module('portal.settings.services', [])
      .factory('newLayoutResetService', ['$q', '$http', '$log', 'miscService', 'SERVICE_LOC', 'APP_FLAGS',
        function($q, $http, $log, miscService, SERVICE_LOC, APP_FLAGS) {
          $log.log("in newLayoutResetService");

          function resetNewLayoutPOST() {
            if (SERVICE_LOC.portalNewLayoutResetEndpoint) {
              return $http({
                url: SERVICE_LOC.portalNewLayoutResetEndpoint,
                method: 'POST',
              }).catch(function (err) {
                 $log.log(err);
                 throw err;
            });
            } else {
              return $q.resolve();
            }
          }

          return {
            resetNewLayoutPOST: resetNewLayoutPOST,
          };
        }])

    .factory('portalSkinService', ['$q', '$http', '$log', 'miscService', 'SERVICE_LOC',
        function($q, $http, $log, miscService, SERVICE_LOC) {
          /**
           * Sets the skin on the backend layout manager
           * @param {string} skinKey
           * @return {*}
           */
          function setPortalSkin(skinKey) {
            if (SERVICE_LOC.portalLayoutRestEndpoint) {
              var parameters = {
                'action': 'chooseSkin',
                'skinName': skinKey,
              };
              return $http({
                url: SERVICE_LOC.portalLayoutRestEndpoint,
                method: 'POST',
                params: parameters,
              });
            } else {
              return $q.resolve();
            }
          }

          return {
            setPortalSkin: setPortalSkin,
          };
        }]);
});
