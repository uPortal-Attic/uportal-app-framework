'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.features.services', []);

  app.factory('portalFeaturesService', ['$http',
                                        '$q',
                                        'miscService',
                                        'keyValueService',
                                        'PortalGroupService',
                                        '$sessionStorage',
                                        'filterFilter',
                                        'KV_KEYS',
                                        'FEATURES',
                                        function($http,
                                                 $q,
                                                 miscService,
                                                 keyValueService,
                                                 PortalGroupService,
                                                 $sessionStorage,
                                                 filterFilter,
                                                 KV_KEYS,
                                                 FEATURES) {
    var featuresPromise, filteredFeaturesPromise;

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
    
    /*
     * If keyValueService is Active and there exists legacy announcement storage
     * this will convert that to the new store all seen announcement ids rather
     * than just the latest.  Will then delete the legacy announcement storage
     */
    var updateLegacySeenAnnouncements = function(){
      return $q(function(resolve, reject){
        if(keyValueService.isKVStoreActivated()){
          keyValueService.getValue("lastviewedannouncementid").then(function(data){
            if(data && data.id){
              //create an array with the seen ids
              var seenAnnouncements = [];
              for(var i=0; i<=data.id; i++){
                seenAnnouncements.push(i);
              }
              $sessionStorage.seenAnnouncmentIds = seenAnnouncements;
              keyValueService.setValue(KV_KEYS.VIEWED_ANNOUNCEMENT_IDS, $sessionStorage.seenAnnouncmentIds).then(function(data){
                keyValueService.deleteValue("lastviewedannouncementid").then(function(){
                  return resolve(null);
                }, function(response){
                  return reject(response);
                });
              },function(response){
                return reject(response);
              }); 
            }else{ //no legacy seenAnnounements
              return resolve(null);
            }
          }, function(response){ //getLegacyLastViewAnnouncement promise failure
            return resolve(response);
          });
        }else{ //kvStore is not activated
          return resolve(null);
        }
      });
    }
    
    /*
     * If keyValueService is Active and there exists legacy popup storage
     * this will convert that to the new store all seen popup ids rather
     * than just the latest.  Will then delete the legacy popup storage
     */
    var updateLegacyPopups = function(){
      return $q(function(resolve, reject){
        if(keyValueService.isKVStoreActivated()){
          keyValueService.getValue("lastviewedpopupid").then(function(data){
            if(data && data.id){
              //create an array with the seen ids
              var seenPopups = [];
              for(var i=0; i<=data.id; i++){
                seenPopups.push(i);
              }
              $sessionStorage.seenPopupIds = seenPopups;
              keyValueService.setValue(KV_KEYS.VIEWED_POPUP_IDS, $sessionStorage.seenPopupIds).then(function(data){
                keyValueService.deleteValue("lastviewedpopupid").then(function(){
                  return resolve(null);
                }, function(response){
                  return reject(response);
                });
              },function(response){
                return reject(response);
              }); 
            }else{ //no legacy popups
              return resolve(null);
            }
          }, function(response){ //getLegacyPopups promise failure
            return resolve(response);
          });
        }else{ //kvStore is not activated
          return resolve(null);
        }
      });
    }

    var getSeenAnnouncments = function(){
      return $q(function(resolve, reject){
        if(!$sessionStorage.seenAnnouncmentIds){
          updateLegacySeenAnnouncements().then(function(){
            keyValueService.getValue(KV_KEYS.VIEWED_ANNOUNCEMENT_IDS).then(function(data){
              if(!Array.isArray(data)){
                $sessionStorage.seenAnnouncmentIds = [];
              }else{
                $sessionStorage.seenAnnouncmentIds = data;
              }
              return resolve($sessionStorage.seenAnnouncmentIds);
            }, function(response){
              return reject(response);
            });
          }, function(response){
            return reject(response);
          });
        }else{
          return resolve($sessionStorage.seenAnnouncmentIds);
        };
      });
    }

    var getSeenPopups = function(){
      return $q(function(resolve, reject){
        if(!$sessionStorage.seenPopupIds){
          updateLegacyPopups().then(function(){
            keyValueService.getValue(KV_KEYS.VIEWED_POPUP_IDS).then(function(data){
              if(!Array.isArray(data)){
                $sessionStorage.seenPopupIds = [];
              }else{
                $sessionStorage.seenPopupIds = data;
              }
              return resolve($sessionStorage.seenPopupIds);
            }, function(response){
              return reject(response);
            });
          }, function(response){
            return reject(response);
          });
        }else{
          return resolve($sessionStorage.seenPopupIds);
        };
      });
    }
    
    var markAnnouncementSeen = function(announcementID){
      return $q(function(resolve, reject){
        //Store in session storage
        if(!$sessionStorage.seenAnnouncmentIds){
          $sessionStorage.seenAnnouncmentIds = [announcementID];
        }else{
          $sessionStorage.seenAnnouncmentIds.push(announcementID);
        }
        //Store in keyvalueStorage if able
        if(keyValueService.isKVStoreActivated()){
          keyValueService.setValue(KV_KEYS.VIEWED_ANNOUNCEMENT_IDS, $sessionStorage.seenAnnouncmentIds).then(function(data){
            return resolve($sessionStorage.seenAnnouncmentIds);
          },function(response){
            return reject(response);
          }); 
        }else{
          return resolve($sessionStorage.seenAnnouncmentIds);
        }
      });
    }
    
    var markPopupSeen = function(popupID){
      return $q(function(resolve, reject){
        //Store in session storage
        if(!$sessionStorage.seenPopupIds){
          $sessionStorage.seenPopupIds = [popupID];
        }else{
          $sessionStorage.seenPopupIds.push(popupID);
        }
        //Store in keyvalueStorage if able
        if(keyValueService.isKVStoreActivated()){
          keyValueService.setValue(KV_KEYS.VIEWED_POPUP_IDS, $sessionStorage.seenPopupIds).then(function(data){
            return resolve($sessionStorage.seenPopupIds);
          },function(response){
            return reject(response);
          }); 
        }else{
          return resolve($sessionStorage.seenPopupIds);
        }
      });
    }

    var getUnseenAnnouncements = function(){
      var successFn, errorFn;
      successFn = function(data){
        //features in data[0]  //seenAnnouncments in data[1]
        var announcements = filterFilter(data[0], {isBuckyAnnouncement : true});
        if(announcements && announcements.length != 0) {
         //filter down to ones they haven't seen
          var hasNotSeen = function(feature) {
            if(data[1].indexOf(feature.id) !== -1) {
              return false;
            } else {
              //check dates
              var today = Date.parse(new Date());
              var startDate = Date.parse(new Date(feature.goLiveYear, feature.goLiveMonth, feature.goLiveDay));
              var expirationDate = feature.buckyAnnouncement.endDate;
              if(startDate <= today && today <= expirationDate) {
                return true;
              } else {//hasn't started yet
                return false;
              }
            }
          }
          return announcements.filter(hasNotSeen);
        }
      };
      errorFn = function(reason){
        //Currently logging errors to console.
        console.log("error retreiving unseenAnnouncements: " +  reason.status);
        return reason;
      };
   
      return $q.all([getFeatures(), getSeenAnnouncments()]).then(successFn, errorFn);
    }

    
    var getUnseenPopups = function(){
      var successFn, errorFn;
      successFn = function(data){
        var popupFeatures = filterFilter(data[0], {isPopup : true});
        if(popupFeatures.length != 0){
          var today = Date.parse(new Date());
          var filterExpiredPopups = function(feature){
            var startDate = Date.parse(new Date(feature.popup.startYear, feature.popup.startMonth, feature.popup.startDay));
            var endDate = Date.parse(new Date(feature.popup.endYear, feature.popup.endMonth, feature.popup.endDay));
            return (today > startDate && today < endDate);
          }
          var filterUnEnabledPopups = function(feature){
              return feature.popup.enabled;
          }
          var filterSeenPopups = function(feature){
            if(data[1].indexOf(feature.id) !== -1){
              return false;
            }
            return true;
          }
          var filteredPopupFeatures = popupFeatures.filter(filterSeenPopups).filter(filterExpiredPopups).filter(filterUnEnabledPopups);
          return filteredPopupFeatures;
        }
      }

      errorFn = function(reason){
        //Currently logging errors to console.
        console.log("error retreiving unseenPopups: " +  reason.status);
        return reason;
      };
      
      return $q.all([getFeatures(), getSeenPopups()]).then(successFn, errorFn);
    }


    return {
      getFeatures : getFeatures,
      getUnseenAnnouncements: getUnseenAnnouncements,
      markAnnouncementSeen: markAnnouncementSeen,
      markPopupSeen:markPopupSeen,
      getUnseenPopups: getUnseenPopups
    };

  }]);

  return app;

});
