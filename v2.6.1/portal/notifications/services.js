'use strict';

define(['angular', 'jquery'], function(angular, $) {

  var app = angular.module('portal.notifications.services', []);

  app.factory('notificationsService', ['$q','$http', 'miscService', 'PortalGroupService', 'keyValueService','SERVICE_LOC', 'KV_KEYS', function($q, $http, miscService, PortalGroupService, keyValueService, SERVICE_LOC, KV_KEYS) {
      var filteredNotificationPromise;
      var dismissedPromise;
      var getAllNotifications = function() {
        return $http.get(SERVICE_LOC.notificationsURL, {cache : true}).then(
            function(result) {
                return  result.data.notifications;
            } ,
            function(reason){
                miscService.redirectUser(reason.status, 'notifications json feed call');
            }
        );
      };

      var getDismissedNotificationIds = function() {
        dismissedPromise = dismissedPromise || keyValueService.getValue(KV_KEYS.DISMISSED_NOTIFICATION_IDS).then(function(data){
          if(data && typeof data.value === 'string') { //data and has a value string
            if(data.value) { //value string contains things
              return JSON.parse(data.value);
            } else { //empty state
              return [];
            }
          } else if (data) { //data exists, but data.value doesn't, so its just json
      	    return data;
      	  } else { // null returned, just empty state it
            return [];
          }
      	});
      	return dismissedPromise;
      };

      var setDismissedNotifications = function(arrayOfIds) {
    		keyValueService.setValue(KV_KEYS.DISMISSED_NOTIFICATION_IDS,arrayOfIds);
        dismissedPromise = null;
      };

      var getNotificationsByGroups = function() {
        var successFn, errorFn;
        //if it already happened, just return it
        if(filteredNotificationPromise) {
          return filteredNotificationPromise;
        }

        successFn = function(result){
          //post processing
          var groups = result[1]
              , allNotifications = result[0]
              , notificationsByGroup = [];
          if(groups && allNotifications) {
            $.each(allNotifications, function (index, notification){ //for each notification
              var added = false;
              $.each(notification.groups, function(index, group) { //for each group for that notification
                if(!added) {
                  var inGroup = $.grep(groups, function(e) {return e.name === group}).length; //intersect, then get length
                  if(inGroup > 0) {//are they in that group?
                    notificationsByGroup.push(notification); //they should see this notification
                    added = true;
                  }
                }
              });
            });
          }

          return notificationsByGroup;
        }

        errorFn = function(reason) {
          miscService.redirectUser(reason.status, 'q for filtered notifications');
        }

        //setup new q
        filteredNotificationPromise = $q.all([getAllNotifications(), PortalGroupService.getGroups()]).then(successFn, errorFn);

        return filteredNotificationPromise;
      };

      return {
        getAllNotifications: getAllNotifications,
        getNotificationsByGroups : getNotificationsByGroups,
        getDismissedNotificationIds : getDismissedNotificationIds,
        setDismissedNotifications : setDismissedNotifications
      };

  }]);

  return app;

});
