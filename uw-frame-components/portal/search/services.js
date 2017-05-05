'use strict';

define(['angular'], function(angular) {
  return angular.module('portal.search.services', [])

  .factory('PortalSearchService', function() {
    var query;

    var getQuery = function() {
      return query;
    };

    var resetQuery = function() {
      query = undefined;
    };

    var setQuery = function(q) {
      query = q;
    };

    return {
      setQuery: setQuery,
      getQuery: getQuery,
      resetQuery: resetQuery,
    };
  });
});
