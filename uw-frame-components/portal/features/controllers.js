'use strict';

define(['angular','require'], function(angular, require) {
  var app = angular.module('portal.features.controllers', []);


	app.controller('PortalFeaturesController', ['miscService', '$localStorage', '$sessionStorage','$scope', '$document', 'APP_FLAGS', '$modal', 'portalFeaturesService', '$sanitize', 'MISC_URLS', function(miscService, $localStorage, $sessionStorage, $scope, $document, APP_FLAGS, $modal, portalFeaturesService, $sanitize, MISC_URLS) {
    $scope.features = [];
    $scope.MISC_URLS = MISC_URLS;

    miscService.pushPageview();

		if (APP_FLAGS.features) {
			portalFeaturesService.getFeatures().then(function(data) {
				var features = data;
				if (features.data.length > 0) {
					$scope.features = features.data;
				}
			});
		}
  }]);

  app.controller('PortalPopupController', ['$localStorage',
                                           '$sessionStorage',
                                           '$scope',
                                           '$document',
                                           'APP_FLAGS',
                                           'filterFilter',
                                           '$modal',
                                           'portalFeaturesService',
                                           'miscService',
                                           '$sanitize',
                                  function($localStorage, $sessionStorage, $scope, $document, APP_FLAGS, filterFilter, $modal, portalFeaturesService, miscService, $sanitize) {

     //scope functions ---------------------------------------------------------

     //need this due to isolated scope
     $scope.pushGAEvent = function(a,b,c) {
       miscService.pushGAEvent(a,b,c);
     }

     $scope.markAnnouncementsSeen = function(liked) {
       $localStorage.lastSeenAnnouncementId = $scope.announcements[$scope.announcements.length - 1].id;
       //push change to storage to keep it in sync
       portalFeaturesService.saveLastSeenFeature($localStorage.lastSeenAnnouncementId);

       if($scope.headerCtrl) {
         $scope.headerCtrl.navbarCollapsed = true;
       }
       postGetData($scope.features, true);
       //send ga event for features, if they read more or dismissed, and what was the last id
       miscService.pushGAEvent('feature',liked ? 'read more' : 'dismissed', $localStorage.lastSeenAnnouncementId);
     }

     //local functions ---------------------------------------------------------

     var postGetData = function(features, justSaved) {
       if (features.length > 0) {
         $scope.features = features; //just setting this to scope so we can use it laterco

         // handle legacy local storage
         if ($localStorage.lastSeenFeature === -1) {
           if ($localStorage.hasSeenWelcome) {
             $localStorage.lastSeenFeature = 1;
           } else {
             $localStorage.lastSeenFeature = 0;
           }
           delete $localStorage.hasSeenWelcome;
         }

         if("BUCKY" === $scope.mode || "BUCKY_MOBILE" === $scope.mode) {
           //do bucky announcement
           var announcements = filterFilter(features, {isBuckyAnnouncement : true});
           if(announcements && announcements.length != 0) {
             //filter down to ones they haven't seen
             var hasNotSeen = function(feature) {

               var compare = $localStorage.lastSeenAnnouncementId || 0;

               if(feature.id <= compare) {
                 return false;
               } else {
                 //check dates
                 var today = Date.parse(new Date());
                 var startDate = Date.parse(new Date(feature.goLiveYear, feature.goLiveMonth, feature.goLiveDay));
                 var expirationDate = feature.buckyAnnouncement.endDate;

                 if(startDate <= today && today <= expirationDate) {
                   return true;
                 } else if(expirationDate < today){
                   //expired state, mark as read so its faster next time
                   $localStorage.lastSeenAnnouncementId = feature.id;
                   return false;
                 } else {
                   //hasn't started yet
                   return false;
                 }

               }

             }

             if(!justSaved && portalFeaturesService.dbStoreLastSeenFeature()) { //if we are really initing, then get id from db
               portalFeaturesService.getLastSeenFeature().then(function(data){
                 $localStorage.lastSeenAnnouncementId = data.id || $localStorage.lastSeenAnnouncementId;
                 $scope.announcements = announcements.filter(hasNotSeen);
               });
             } else {
               $scope.announcements = announcements.filter(hasNotSeen);
             }
             $scope.buckyImg = 'img/bucky.gif';
           }
         } else {
           //this is to setup popup modal stuff
           var popupFeatures = filterFilter(features, {isPopup : true});
           if(popupFeatures.length != 0) {
             $scope.latestFeature = popupFeatures[popupFeatures.length -1];
             var today = Date.parse(new Date());
             var startDate = Date.parse(new Date($scope.latestFeature.popup.startYear, $scope.latestFeature.popup.startMonth, $scope.latestFeature.popup.startDay));
             var endDate = Date.parse(new Date($scope.latestFeature.popup.endYear, $scope.latestFeature.popup.endMonth, $scope.latestFeature.popup.endDay));

             var featureIsLive = today > startDate && today < endDate;
             var userHasNotSeenFeature = $localStorage.lastSeenFeature < $scope.latestFeature.id;
             var featureIsEnabled = $scope.latestFeature.popup.enabled;


             if (featureIsLive && userHasNotSeenFeature && featureIsEnabled) {
               $modal.open({
                 animation: $scope.animationsEnabled,
                 templateUrl: require.toUrl('./partials/features-modal-template.html'),
                 size: 'lg',
                 scope: $scope
               });
               $localStorage.lastSeenFeature = $scope.latestFeature.id;
             }
           }
         }
       }
     }

     var init = function() {
      if (APP_FLAGS.features) {
        $scope.features = [];

        portalFeaturesService.getFeatures().then(function(results) {
          postGetData(results.data);
        });
      }
    };

    //run function -------------------------------------------------------------
    init();

  }]);

	return app;
});
