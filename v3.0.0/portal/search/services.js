'use strict';

define(['angular'], function(angular) {


  var app = angular.module('portal.search.services', []);

  app.factory('PortalSearchService', function(){

    var query;

    var getQuery = function() {
      return query;
    }

    var resetQuery = function(){
      query = undefined;
    }

    var setQuery = function(q){
      query = q;
    }

    return {
      setQuery : setQuery,
      getQuery : getQuery,
      resetQuery : resetQuery
    };

  });

  return app;

});
