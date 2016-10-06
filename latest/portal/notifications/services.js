'use strict';

define(['angular', 'jquery'], function(angular, $) {

  var app = angular.module('portal.notifications.services', []);

  app.factory('notificationsService', ['$q','$http', 'miscService', 'PortalGroupService', 'keyValueService','SERVICE_LOC', 'KV_KEYS', function($q, $http, miscService, PortalGroupService, keyValueService, SERVICE_LOC, KV_KEYS) {
    // LOCAL VARIABLES
    var filteredNotificationPromise;
    var dismissedPromise;
    var dismissedIds = [];

    /////////////////////
    // SERVICE METHODS //
    /////////////////////
    /**
     * Get all notifications at the given URL (as set in app-config.js or override.js)
     * @returns {*} A promise which returns an object containing notifications arrays
     */
    var getAllNotifications = function() {
      return $q.all([$http.get(SERVICE_LOC.notificationsURL, {cache : true}), getDismissedNotificationIds()])
          .then(function(result) {
            return sortNotifications(result[0].data.notifications, result[1]);
          },
          function(reason) {
            miscService.redirectUser(reason.status, 'notifications json feed call');
          }
        );
    };

    /**
     * Asynchronously fetch notifications and portal groups, then filter notifications by group. Called if group
     * filtering is enabled.
     * @returns {*} A promise which returns an object containing notifications arrays
     */
    var getNotificationsByGroups = function() {
      // If $q already happened, just return the promise
      if(filteredNotificationPromise) {
        return filteredNotificationPromise;
      }

      // If $q completed successfully, filter notifications by group
      var successFn = function(result) {
        //post processing
        var groups = result[1],
          allNotifications = result[0],
          notificationsByGroup = {};
        if(groups && allNotifications) {
          notificationsByGroup.dismissed = filterNotificationsByGroup(allNotifications.dismissed, groups);
          notificationsByGroup.notDismissed = filterNotificationsByGroup(allNotifications.notDismissed, groups);
        }
        // Return filtered notifications, sorted into dismissed and notDismissed arrays
        return notificationsByGroup;
      };
      // If $q failed, redirect user back to login and give a reason
      var errorFn = function(reason) {
        miscService.redirectUser(reason.status, 'q for filtered notifications');
      };

      // Set up asynchronous calls to get notifications and portal groups
      filteredNotificationPromise = $q.all([getAllNotifications(), PortalGroupService.getGroups()]).then(successFn, errorFn);

      return filteredNotificationPromise;
    };

    /**
     * Save array of dismissed notification IDs in k/v store, reset dismissedPromise
     * @param dismissedIds Array of ID strings
     */
    var setDismissedNotifications = function(dismissedIds) {
      keyValueService.setValue(KV_KEYS.DISMISSED_NOTIFICATION_IDS, dismissedIds);
      dismissedPromise = null;
    };

    /**
     * Get array of dismissed notification IDs from k/v store
     * @returns {*} A promise that returns an array of IDs
     */
    var getDismissedNotificationIds = function() {
      if(!keyValueService.isKVStoreActivated()) {
        return $q.resolve([]);
      }
      dismissedPromise = dismissedPromise || keyValueService.getValue(KV_KEYS.DISMISSED_NOTIFICATION_IDS)
          .then(function(data) {
            if(data && typeof data.value === 'string') {
              // If data exists and is a string, check for emptiness
              if(data.value) {
                // If string contains things, return parsed JSON
                return JSON.parse(data.value);
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

    /**
     * Sort all notifications into two arrays to be consumed by notifications controller;
     * @param data Array of notifications
     * @returns {{dismissed: Array, notDismissed: Array}} Object with arrays sorted by dismissal
     */
    var sortNotifications = function(data, dismissedIds) {
      var notifications = {
        'dismissed': [],
        'notDismissed': []
      };
      // Check notification IDs against dismissed IDs from k/v store and sort notifications into appropriate array
      if(angular.isArray(dismissedIds)) {
        angular.forEach(data, function(notification, index) {
          if (dismissedIds.indexOf(notification.id) > -1) {
            notifications.dismissed.push(notification);
          } else {
            notifications.notDismissed.push(notification);
          }
        });
      } else {
        notifications.notDismissed = data;
      }
      // Return sorted notifications
      return notifications;
    };

    /**
     * Filter the array of notifications based on the groups that were passed in
     * @param arrayOfNotifications : an array of notifications
     * @param groups : The list of groups one person is in
     * @return : an array filtered by groups. Or an empty array if they have none
    **/
    function filterNotificationsByGroup(arrayOfNotifications, groups) {
      var notificationsByGroup = [];
      $.each(arrayOfNotifications, function (index, notification) {
        var added = false;
        // For each group for the current notification
        $.each(notification.groups, function(index, group) {
          if(!added) {
            // Intersect, then get length
            var inGroup = $.grep(groups, function(e) {return e.name === group}).length;
            if(inGroup > 0) {
              // If user is in this group, he should see this notification
              notificationsByGroup.push(notification);
              added = true;
            }
          }
        });
      });

      return notificationsByGroup;
    }

    return {
      getAllNotifications: getAllNotifications,
      getNotificationsByGroups : getNotificationsByGroups,
      getDismissedNotificationIds : getDismissedNotificationIds,
      setDismissedNotifications : setDismissedNotifications
    };

  }]);

  return app;

});
