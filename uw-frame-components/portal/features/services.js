'use strict';

define(['angular'], function(angular) {
  var app = angular.module('portal.features.services', []);

  app.factory('portalFeaturesService', [
    '$http',
    '$q',
    'miscService',
    'keyValueService',
    'PortalGroupService',
    '$log',
    '$localStorage',
    '$sessionStorage',
    'filterFilter',
    'KV_KEYS',
    'FEATURES',
    function(
      $http,
      $q,
      miscService,
      keyValueService,
      PortalGroupService,
      $log,
      $localStorage,
      $sessionStorage,
      filterFilter,
      KV_KEYS,
      FEATURES
    ) {
    var featuresPromise;
    var filteredFeaturesPromise;
    var getFeatures = function() {
      if(!featuresPromise) {
        featuresPromise = $http.get(FEATURES.serviceURL, {cache: true})
           .then(function(results, status) { // success function
              return results.data;
           }, function(data, status) { // failure function
              miscService.redirectUser(status, 'Get features info');
           });
      }
      if (FEATURES.groupFiltering && PortalGroupService.groupsServiceEnabled && !$localStorage.disableGroupAnnouncementFiltering) {
        if (filteredFeaturesPromise) {
          // cache shortcut
          return filteredFeaturesPromise;
        }
        var successFn = function(results) {
          var array = results[0];
          var groups = results[1];
          return PortalGroupService.filterArrayByGroups(array, groups, 'groups');
        };
        var errorFn = function(reason) {
          miscService.redirectUser(reason.status, 'q for filtered features');
        };

        filteredFeaturesPromise = $q
          .all([featuresPromise,
            PortalGroupService.getGroups(),
          ])
          .then(successFn, errorFn);

        return filteredFeaturesPromise;
      } else {
        return featuresPromise;
      }
    };// end get features

    /*
     * If keyValueService is Active and there exists legacy announcement storage
     * this will convert that to the new store all seen announcement ids rather
     * than just the latest.  Will then delete the legacy announcement storage
     */
    var updateLegacySeenAnnouncements = function() {
      if (!keyValueService.isKVStoreActivated()) {
        return $q.resolve(null);
      }

      return keyValueService
        .getValue('lastviewedannouncementid')
        .then(function(data) {
          if (!data || !data.id) {
            throw Error('no legacy seenAnnouncements');
          }
          // create an array with the seen ids
          var seenAnnouncements = [];
          for (var i = 0; i <= data.id; i++) {
            seenAnnouncements.push(i);
          }
          $sessionStorage.seenAnnouncementIds = seenAnnouncements;
          return keyValueService.setValue(KV_KEYS.VIEWED_ANNOUNCEMENT_IDS, $sessionStorage.seenAnnouncementIds);
        })
        .then(function(data) {
          return keyValueService.deleteValue('lastviewedannouncementid');
        });
    };

    /*
     * If keyValueService is Active and there exists legacy popup storage
     * this will convert that to the new store all seen popup ids rather
     * than just the latest.  Will then delete the legacy popup storage
     */
    var updateLegacyPopups = function() {
      if (!keyValueService.isKVStoreActivated()) {
        return $q.resolve(null);
      }

      return keyValueService
        .getValue('lastviewedpopupid')
        .then(function(data) {
          if (!data || !data.id) {
            throw Error('no legacy popups');
          }
          // create an array with the seen ids
          var seenPopups = [];
          for (var i = 0; i <= data.id; i++) {
            seenPopups.push(i);
          }
          $sessionStorage.seenPopupIds = seenPopups;
          return keyValueService.setValue(KV_KEYS.VIEWED_POPUP_IDS, $sessionStorage.seenPopupIds);
      })
      .then(function(data) {
        return keyValueService.deleteValue('lastviewedpopupid');
      });
    };

    var getSeenAnnouncements = function() {
      if (sessionStorage.seenAnnouncementIds) {
        return $q.resolve($sessionStorage.seenAnnouncementIds);
      }

      return updateLegacySeenAnnouncements()
        .then(function() {
          return keyValueService.getValue(KV_KEYS.VIEWED_ANNOUNCEMENT_IDS);
        })
        .then(function(data) {
          if (Array.isArray(data)) {
            $sessionStorage.seenAnnouncementIds = data;
          } else {
            $sessionStorage.seenAnnouncementIds = [];
          }

          return $sessionStorage.seenAnnouncementIds;
        });
    };

    var getSeenPopups = function() {
      if (sessionStorage.seenPopupIds) {
        return $q.resolve($sessionStorage.seenPopupIds);
      }

      return updateLegacyPopups()
        .then(function() {
            return keyValueService.getValue(KV_KEYS.VIEWED_POPUP_IDS);
        })
        .then(function(data) {
          if (Array.isArray(data)) {
            $sessionStorage.seenPopupIds = data;
          } else {
            $sessionStorage.seenPopupIds = [];
          }

          return $sessionStorage.seenPopupIds;
        });
    };

    var markAnnouncementSeen = function(announcementID) {
      if ($sessionStorage.seenAnnouncementIds) {
        $sessionStorage.seenAnnouncementIds.push(announcementID);
      } else {
        $sessionStorage.seenAnnouncementIds = [announcementID];
      }

      if (!keyValueService.isKVStoreActivated()) {
        return $q.resolve($sessionStorage.seenAnnouncementIds);
      }

      return keyValueService
        .setValue(KV_KEYS.VIEWED_ANNOUNCEMENT_IDS, $sessionStorage.seenAnnouncementIds)
        .then(function(data) {
          return $sessionStorage.seenAnnouncementIds;
        });
    };

    var markPopupSeen = function(popupID) {
      // Store in session storage
      if ($sessionStorage.seenPopupIds) {
        $sessionStorage.seenPopupIds.push(popupID);
      } else {
        $sessionStorage.seenPopupIds = [popupID];
      }

      // Store in keyvalueStorage if able
      if (!keyValueService.isKVStoreActivated()) {
        return $q.resolve($sessionStorage.seenPopupIds);
      }

      return keyValueService
        .setValue(KV_KEYS.VIEWED_POPUP_IDS, $sessionStorage.seenPopupIds)
        .then(function(data) {
          return $sessionStorage.seenPopupIds;
        });
    };

    var getUnseenAnnouncements = function() {
      var successFn = function(data) {
        // features in data[0]  //seenAnnouncements in data[1]
        var announcements = filterFilter(data[0], {isBuckyAnnouncement: true});
        if (announcements && announcements.length != 0) {
         // filter down to ones they haven't seen
          var hasNotSeen = function(feature) {
            if (data[1].indexOf(feature.id) !== -1) {
              return false;
            } else {
              // check dates
              var today = new Date().getTime();
              var startDate = new Date(feature.goLiveYear, feature.goLiveMonth, feature.goLiveDay).getTime();
              var expirationDate = feature.buckyAnnouncement.endDate;
              if (typeof expirationDate === 'string') {
                  expirationDate = new Date(expirationDate).getTime();
              }

              return startDate <= today && today <= expirationDate;
            }
          };
          return announcements.filter(hasNotSeen);
        }
      };
      var errorFn = function(reason) {
        $log.error('error retrieving unseenAnnouncements: ' + reason.status);
        return reason;
      };

      return $q.all([getFeatures(), getSeenAnnouncements()]).then(successFn).catch(errorFn);
    };


    var getUnseenPopups = function() {
      var successFn = function(data) {
        var popupFeatures = filterFilter(data[0], {isPopup: true});
        if (popupFeatures.length != 0) {
          var today = new Date().getTime();
          var filterExpiredPopups = function(feature) {
            var startDate = new Date(feature.popup.startYear, feature.popup.startMonth, feature.popup.startDay).getTime();
            var endDate = new Date(feature.popup.endYear, feature.popup.endMonth, feature.popup.endDay).getTime();
            return today > startDate && today < endDate;
          };
          var filterUnEnabledPopups = function(feature) {
              return feature.popup.enabled;
          };
          var filterSeenPopups = function(feature) {
            return !(data[1].indexOf(feature.id) !== -1);
          };
          return popupFeatures.filter(filterSeenPopups).filter(filterExpiredPopups).filter(filterUnEnabledPopups);
        }
      };
      var errorFn = function(reason) {
        $log.error('error retrieving unseenPopups: ' + reason.status);
        return reason;
      };

      return $q.all([getFeatures(), getSeenPopups()]).then(successFn).catch(errorFn);
    };


    return {
      getFeatures: getFeatures,
      getUnseenAnnouncements: getUnseenAnnouncements,
      markAnnouncementSeen: markAnnouncementSeen,
      markPopupSeen: markPopupSeen,
      getUnseenPopups: getUnseenPopups,
    };
  }]);

  return app;
});
