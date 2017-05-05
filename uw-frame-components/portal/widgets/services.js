'use strict';

define(['angular'], function(angular) {
  return angular.module('portal.widgets.services', [])

  .factory('widgetService', ['$http', '$log', 'SERVICE_LOC', function($http, $log, SERVICE_LOC) {
    /**
     * Get the a single app's full entity file as JSON
     * @param fname The app's fname value (<fname> in entity files)
     * @returns {*}
     */
    var getSingleWidgetData = function getSingleWidgetData(fname) {
      return $http.get(SERVICE_LOC.widgetApi.entry + fname + '.json')
        .then(function(result) {
          if (angular.isDefined(result.data.entry.layoutObject)) {
            return result.data.entry.layoutObject;
          }
        })
        .catch(function(error) {
          $log.warn('Error getting marketplace entry for ' + fname);
          $log.error(error);
          return getErrorPage(fname);
        });
    };

    /**
     * Display error message if a user doesn't have permission to see/use the requested widget
     * @param fname
     * @returns {Object} Special error-case widget configuration
     */
    var getErrorPage = function(fname) {
      return {
        title: fname,
        mdIcon: 'help',
        widgetType: 'generic',
        widgetConfig: {
          additionalText: 'Please contact your help desk if you feel you should be able to access this content',
        },
        widgetTemplate: '<div class=\'overlay__maintenance-mode\'>'
          + '<div class=\'maintenance-content\'>'
          + '<p><md-icon class=\'md-warn\'>warning</md-icon></p>'
          + '<p>You do not have permission to access this content. If you feel this is an error, please contact your help desk.</p>'
          + '</div>'
          + '</div>',
      };
    };

    /**
     * Get additional values/configuration not provided by the widget's basic configuration.
     * Used by Option Link and Custom widgets
     * @param widget
     * @returns {*}
     */
    var getWidgetJson = function(widget) {
      return $http.get(widget.widgetURL, {cache: true})
        .then(function(result) {
          var data = result.data;
          // Consider refactoring to only pull in widgetUrl and only return the raw result -- sorting what to do with
          // the result should be the controller's responsibility
          if (data) {
            if (data.result) {
              widget.widgetData = data.result;
            }
            if (data.content) {
              widget.widgetContent = data.content;
            }
          }
          return data;
        })
        .catch(function(error) {
          $log.error(error);
        });
    };


    /**
     * Get an RSS feed from the provided url as json
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
        });
    };

    return {
      getSingleWidgetData: getSingleWidgetData,
      getWidgetJson: getWidgetJson,
      getRssAsJson: getRssAsJson,
      getErrorPage: getErrorPage,
    };
  }]);
});
