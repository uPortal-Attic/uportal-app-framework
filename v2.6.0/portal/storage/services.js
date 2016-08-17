'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('portal.storage.services', []);

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
    app.factory('keyValueService', ['$http', 'miscService', 'SERVICE_LOC',
        function($http, miscService,SERVICE_LOC) {
      //private functions ------------------------------------------------------
      var successFn = function(response) {
        return response.data;
      };

      var errorFn = function(response) {
        miscService.redirectUser(response.status, "Key Value Service");
        return response.data;
      }

      //public functions -------------------------------------------------------
      var isKVStoreActivated = function() {
        if(SERVICE_LOC.kvURL) {
          return true;
        } else {
          return false;
        }
      }

      var getValue = function(key){
        return $http.get(SERVICE_LOC.kvURL + "/"+key)
                  .then(successFn, errorFn);
      };

      var setValue = function(key, value){
        return $http.put(SERVICE_LOC.kvURL + "/"+ key,value)
                  .then(successFn, errorFn);
      };

      var deleteValue = function(key) {
        return $http.delete(SERVICE_LOC.kvURL + "/"+ key)
                  .then(successFn,errorFn);
      }

      return {
        setValue : setValue,
        deleteValue : deleteValue,
        getValue : getValue,
        isKVStoreActivated : isKVStoreActivated
      };

    }]);

    return app;

});
