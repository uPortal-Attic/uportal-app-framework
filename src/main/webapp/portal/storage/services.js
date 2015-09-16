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
    **/
    app.factory('keyValueService', ['$http', 'miscService', 'SERVICE_LOC', function($http, miscService,SERVICE_LOC) {
      
      var successFn = function(response) {
        return response.data;
      };
      
      var errorFn = function(response) {
        miscService.redirectUser(response.status, "Key Value Service");
        return response.data;
      }
      
      var getValue = function(key){
        return $http.get(SERVICE_LOC.kvURL + "getValue?key="+key).then(successFn, errorFn);
      };
      
      var setValue = function(key, value){
        var data = {};
        data.key = key;
        data.value = value;
        return $http.post(SERVICE_LOC.kvURL + "setValue",data).then(successFn, errorFn);
      };
      
      return {
        setValue : setValue,
        getValue : getValue
      };

    }]);

    return app;

});
