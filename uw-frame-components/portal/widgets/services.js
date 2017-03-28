'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.widgets.services', []);

  app.factory('widgetService', ['$http', '$log', 'SERVICE_LOC', function($http, $log, SERVICE_LOC) {

    /**
     *
     * @param fname
     * @returns {*}
     */
    var getMarketplaceEntry = function getMarketplaceEntry(fname) {
      return $http.get(SERVICE_LOC.widgetApi.entry + fname + '.json')
        .then(function(result) {
          if (result.data.entry.layoutObject != undefined) {
            return result.data.entry.layoutObject;
          }
        })
        .catch(function(error) {
          $log.error('Error getting marketplace entry for ' + fname + ': ' + error);
        });
    };

    /**
     *
     * @param widget
     * @returns {*}
     */
    var getWidgetJson = function(widget) {
      return $http.get(widget.widgetURL, {cache: true})
        .then(function(result) {
          var data = result.data;
          if (data) {
            if (data.result) {
              widget.widgetData = data.result;
            }
            if (data.content) {
              widget.widgetContent = data.content;
            }
            $log.log(widget.fname + '\'s widget data came back with data');
          }
          return data;
        })
        .catch(function(error) {
          $log.error('Error getting widget json for ' + fname + ': ' + error);
        })
    };

    /**
     *
     * @param url
     * @returns {*}
     */
    var getRssAsJson = function(url) {
      return $http.get(url, {cache: true})
        .then(function(result) {
          return result.data;
        })
        .catch(function(error) {
          $log.error('Couldn\'t get rss as JSON: ' + error);
        })
    };

    return {
      getMarketplaceEntry: getMarketplaceEntry,
      getWidgetJson: getWidgetJson,
      getRssAsJson: getRssAsJson
    }

  }]);

  return app;

});
