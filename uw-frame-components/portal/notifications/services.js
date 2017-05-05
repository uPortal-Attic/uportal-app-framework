'use strict';

define(['angular', 'jquery'], function(angular, $) {
  return angular.module('portal.notifications.services', [])

  .factory('notificationsService', ['$q', '$http', '$log', '$filter', 'miscService', 'PortalGroupService', 'keyValueService', 'SERVICE_LOC', 'KV_KEYS', function($q, $http, $log, $filter, miscService, PortalGroupService, keyValueService, SERVICE_LOC, KV_KEYS) {
    // LOCAL VARIABLES
    var dismissedPromise;

    // ///////////////////
    // SERVICE METHODS //
    // ///////////////////

    /**
     * @typedef {Object} Notification
     * @property {number} id
     * @property {string} title
     * @property {string} actionURL
     * @property {boolean} dismissable
     * @property {boolean} false
     * @property {string} actionALt
     * @property {string=} dataURL
     * @property {string=} dataObject
     * @property {Object=} dataArrayFilter
     */

    /**
     * @typedef {Object} NotificationReturnObject
     * @property {Notification[]} dismissed
     * @property {Notification[]} notDismissed
     */

    /**
     * Get all notifications at the given URL (as set in app-config.js or override.js)
     * @returns {Promise<NotificationReturnObject>} A promise which returns an object containing notifications arrays
     */
    var getAllNotifications = function() {
      return $http.get(SERVICE_LOC.notificationsURL, {cache: true}).then(function(result) {
              return separateNotificationsByDismissal(result.data.notifications);
          }).then(function(seperatedNotifications) {
              return seperatedNotifications;
          }).catch(function(reason) {
            miscService.redirectUser(reason.status, 'notifications json feed call');
        });
    };

    /**
     * Gets notifications and filters them by group and via data if dataURL is
     * present.
     * @returns {Promise<NotificationReturnObject>} A promise which returns an object containing notifications arrays
     */
    var getFilteredNotifications = function() {
      var notifications = {
        'dismissed': [],
        'notDismissed': [],
      };
      return $http.get(SERVICE_LOC.notificationsURL, {cache: true}).then(function(allNotifications) {
              return filterNotificationsByGroup(allNotifications.data.notifications);
         }).then(function(filteredNotificationsByGroup) {
              return separateNotificationsByDismissal(filteredNotificationsByGroup);
         }).then(function(notificationsBydismissal) {
              notifications.dismissed = notificationsBydismissal.dismissed;
              return filterNotificationsByData(notificationsBydismissal.notDismissed);
         }).then(function(notificationsByData) {
              notifications.notDismissed = notificationsByData;
              return notifications;
         }).catch(function(reason) {
             $log.warn('Error in retrieving notifications');
             return [];
         });
    };

    /**
     * Filter the array of notifications based on the groups that were passed in
     * @param {Notification[]} arrayOfNotifications
     * @return {Promise<Notification[]>} : an array filtered by groups. Or an empty array if they have none
    **/
    function filterNotificationsByGroup(arrayOfNotifications) {
      return PortalGroupService.getGroups().then(
        function(groups) {
            var notificationsByGroup = [];
            angular.forEach(arrayOfNotifications, function(notification, index) {
              var added = false;
              // For each group for the current notification
              angular.forEach(notification.groups, function(group, index) {
                if (!added) {
                  // Intersect, then get length
                  var inGroup = $.grep(groups, function(e) {
                    return e.name === group;
                  }).length;
                  if (inGroup > 0) {
                    // If user is in this group, he should see this notification
                    notificationsByGroup.push(notification);
                    added = true;
                  }
                }
              });
            });
            return notificationsByGroup;
        }).catch(function(reason) {
            miscService.redirectUser(reason.status, 'Unable to retrieve groups');
        }
      );
    }

    /**
     * Filter the array of notifications based on if data was requested before showing
     * @param {Notification[]} : an array of notifications
     * @return Promise<Notification[]>} : an array of notifications that includes only non-data notifications
     * and notifications that requested data and had data
    **/
    var filterNotificationsByData = function(notifications) {
      var promises = [];
      var filteredNotifications = [];

      angular.forEach(notifications, function(notification, index) {
        if (notification.dataURL) {
          promises.push($http.get(notification.dataURL).then(
            function(result) {
              var objectToFind = result.data;
              // If dataObject specified, try to use it
              if (result && notification.dataObject) {
                objectToFind = objectToFind[notification.dataObject];
              }
              // If dataArrayFilter specified, then filter
              if (objectToFind && notification.dataArrayFilter) {
                // If you try to do an array filter on a non-array, return blank
                if (!angular.isArray(objectToFind)) {
                  return;
                }
                var arrayFilter = angular.fromJson(notification.dataArrayFilter);
                if ($filter('filter')(objectToFind, arrayFilter).length > 0) {
                  return notification;
                }
              } else if (objectToFind) {
                return notification;
              }

              return;
            }).catch(function(reason) {
              $log.warn('Error retrieving data for notification');
            }
          ));
        }else{
          filteredNotifications.push(notification);
        }
      });

      return $q.all(promises).then(
        function(result) {
          angular.forEach(result, function(notification, index) {
            if (notification) {
              filteredNotifications.push(notification);
            }
          });
          return filteredNotifications;
        }
      );
    };


    /**
     * Separates notification array into new object with two properties
     * @param {Notification[]} : an array of notifications
     * @return {Promise<Notification[]>}: an object with two properties. dismissed and notDismissed
    **/
    var separateNotificationsByDismissal = function(notifications) {
      var separatedNotifications = {
        'dismissed': [],
        'notDismissed': [],
      };
      return getDismissedNotificationIDs().then(
        function(dismissedIDs) {
          // Check notification IDs against dismissed IDs from k/v store and sort notifications into appropriate array
          if (angular.isArray(dismissedIDs)) {
            angular.forEach(notifications, function(notification, index) {
              if (dismissedIDs.indexOf(notification.id) > -1) {
                separatedNotifications.dismissed.push(notification);
              } else {
                separatedNotifications.notDismissed.push(notification);
              }
            });
          } else {
            separatedNotifications.notDismissed = dismissedIDs;
          }
          // Return sorted notifications
          return separatedNotifications;
        }).catch(function(reason) {
          $log.warn('Error in retrieving previously dismissed notifications');
          return notifications;
        }
      );
    };


    /**
     * Save array of dismissed notification IDs in k/v store, reset dismissedPromise
     * @param {Notification[]} - dismissedIds Array of ID strings
     */
    var setDismissedNotifications = function(dismissedIds) {
      keyValueService.setValue(KV_KEYS.DISMISSED_NOTIFICATION_IDS, dismissedIds);
      dismissedPromise = null;
    };

    /**
     * Get array of dismissed notification IDs from k/v store
     * @returns {Promise<number[]>} A promise that returns an array of IDs
     */
    var getDismissedNotificationIDs = function() {
      if (!keyValueService.isKVStoreActivated()) {
        return $q.resolve([]);
      }
      dismissedPromise = dismissedPromise || keyValueService.getValue(KV_KEYS.DISMISSED_NOTIFICATION_IDS)
          .then(function(data) {
            if (data && angular.isString(data.value)) {
              // If data exists and is a string, check for emptiness
              if (data.value) {
                // If string contains things, return parsed JSON
                return angular.fromJson(data.value);
              } else {
                // If it's empty, return empty array
                return [];
              }
            } else if (data) {
              // If data exists but it's just JSON, return the data
              return data;
            } else {
              // If nothing exists, return empty array
              return [];
            }
        });
      return dismissedPromise;
    };

    return {
      getAllNotifications: getAllNotifications,
      getDismissedNotificationIDs: getDismissedNotificationIDs,
      setDismissedNotifications: setDismissedNotifications,
      getFilteredNotifications: getFilteredNotifications,
    };
  }]);
});
