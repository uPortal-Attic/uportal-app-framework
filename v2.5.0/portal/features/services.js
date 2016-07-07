'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.features.services', []);

  app.factory('portalFeaturesService', ['$http',
                                        '$q',
                                        'miscService',
                                        'keyValueService',
                                        'PortalGroupService',
                                        'KV_KEYS',
                                        'FEATURES',
                                        function($http,
                                                 $q,
                                                 miscService,
                                                 keyValueService,
                                                 PortalGroupService,
                                                 KV_KEYS,
                                                 FEATURES) {
    var featuresPromise, filteredFeaturesPromise;

    var TYPES = {
      "ANNOUNCEMENTS" : KV_KEYS.LAST_VIEWED_ANNOUNCEMENT_ID,
      "POPUP" : KV_KEYS.LAST_VIEWED_POPUP_ID
    };

    var getFeatures = function() {
      if(!featuresPromise) {
        featuresPromise = $http.get(FEATURES.serviceURL, { cache: true})
                               .then(function(results, status) { //success function
                                  return results.data;
                               },function(data, status) { // failure function
                                  miscService.redirectUser(status, "Get features info");
                               });
      }
      if(FEATURES.groupFiltering && PortalGroupService.groupsServiceEnabled) {
        if(filteredFeaturesPromise) {
          //cache shortcut
          return filteredFeaturesPromise;
        }
        var successFn = function(results){
          var array = results[0];
          var groups = results[1];
          return PortalGroupService.filterArrayByGroups(array, groups, 'groups');
        };
        var errorFn = function(reason) {
          miscService.redirectUser(reason.status, 'q for filtered features');
        }
        filteredFeaturesPromise = $q.all([featuresPromise,
                                          PortalGroupService.getGroups()
                                         ])
                                    .then(successFn, errorFn);
        return filteredFeaturesPromise;
      } else {
        return featuresPromise;
      }
    };//end get features

    var saveLastSeenFeature = function(type, id) {
      if(keyValueService.isKVStoreActivated()) {
        var storage = {};
        storage.id = id;
        keyValueService.setValue(type, storage)
          .then(function(result){
            console.log("Saved feature id to " + result + " successfully.");
          });
      }
    };

    var getLastSeenFeature = function(type){
      return keyValueService.getValue(type);
    }

    var dbStoreLastSeenFeature = function() {
      return keyValueService.isKVStoreActivated();
    }

    return {
      getFeatures : getFeatures,
      saveLastSeenFeature : saveLastSeenFeature,
      getLastSeenFeature : getLastSeenFeature,
      dbStoreLastSeenFeature : dbStoreLastSeenFeature,
      TYPES : TYPES
    };

  }]);

  return app;

});
