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
      // SERVICE_LOC.portalApi + SERVICE_LOC.marketplace.base + SERVICE_LOC.marketplace.entry + fname + '.json'
      return $http.get(SERVICE_LOC.marketplace.entry + fname + '.json')
        .then(function(result) {
          if (result.data.entry.layoutObject != undefined) {
            return result.data.entry.layoutObject;
          }
        })
        .catch(function(error) {
          $log.error('Something went wrong in the widgetService.getMarketplaceEntry: ' + error);
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
          $log.error('Something went wrong in the widgetService.getWidgetJson: ' + error);
        })
    };

    return {
      getMarketplaceEntry: getMarketplaceEntry,
      getWidgetJson: getWidgetJson
    }

  }]);

  return app;

});
