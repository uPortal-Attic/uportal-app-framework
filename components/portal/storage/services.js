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
    return angular.module('portal.storage.services', [])

    /**
    Key Value Service

    This is your basic key->value store for angular. This goes really well with
    [KeyValueStore](https://github.com/UW-Madison-DoIT/KeyValueStore).

    To enable and use, 1) setup a service that accepts a
    getValue?key=<key> and setValue (this is a post function that has a key and
    value object). 2) set a URL in SERVICE_LOC.kvURL. You may have to use
    json-proxy-service or CORS if your key value store is on another machine.

    Service functions:
      - getValue(key)
        - key : string
      - setValue(key, value)
        - key : string
        - value : object
      - isKVStoreActivated()
    **/
    .factory('keyValueService', ['$http', 'miscService', 'SERVICE_LOC',
        function($http, miscService, SERVICE_LOC) {
      // private functions
      var successFn = function(response) {
        return response.data;
      };

      var errorFn = function(response) {
        miscService.redirectUser(response.status, 'Key Value Service');
        return response.data;
      };

      // public functions
      var isKVStoreActivated = function() {
        return !!SERVICE_LOC.kvURL;
      };

      var getValue = function(key) {
        return $http.get(SERVICE_LOC.kvURL + '/'+key)
                  .then(successFn, errorFn);
      };

      var setValue = function(key, value) {
        return $http.put(SERVICE_LOC.kvURL + '/'+ key, value)
                  .then(successFn, errorFn);
      };

      var deleteValue = function(key) {
        return $http.delete(SERVICE_LOC.kvURL + '/'+ key)
                  .then(successFn, errorFn);
      };

      return {
        setValue: setValue,
        deleteValue: deleteValue,
        getValue: getValue,
        isKVStoreActivated: isKVStoreActivated,
      };
    }]);
});
