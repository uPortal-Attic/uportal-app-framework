'use strict';

define(['angular','require'], function(angular, require) {
  var app = angular.module('portal.main.controllers', []);

  app.controller('PortalMainController', ['$localStorage', '$sessionStorage','$scope', '$rootScope', '$document', '$location', 'NAMES', 'MISC_URLS', 'APP_FLAGS','THEMES','miscService', function($localStorage, $sessionStorage, $scope, $rootScope, $document, $location, NAMES, MISC_URLS, APP_FLAGS,THEMES, miscService) {
    var defaults = {
            showSidebar: APP_FLAGS.showSidebar,
            sidebarQuicklinks: false,
            showKeywordsInMarketplace : false,
            homeImg : "img/square.jpg",
            sidebarShowProfile: false,
            profileImg: "img/terrace.jpg",
            typeaheadSearch: false,
            exampleWidgets: false,
            layoutMode : 'list', //other option is 'widgets'
            gravatarEmail : null,
            useGravatar : false,
            webPortletRender : false,
            lastSeenFeature : -1
            };


    //=====functions ======
    var init = function(){
      $scope.$storage = $localStorage.$default(defaults);

      $scope.NAMES=NAMES;
      $scope.classicURL=MISC_URLS.back2ClassicURL;
      $scope.APP_FLAGS=APP_FLAGS;
      $scope.MISC_URLS=MISC_URLS;
      $scope.THEMES = THEMES;

      if(NAMES.title) {
        $document[0].title=NAMES.title;
      }

      //class for ng-view
      $scope.routeClass = "route" + angular.lowercase($location.path().replace(new RegExp('/', 'g'), '-'));
    }
    
    // $scope.switchTheme = function(choice) {
    //   $rootScope.portal.school = choice.name;
    //   $rootScope.portal.crest = choice.crest;
    //   $rootScope.portal.title = choice.title;
    //   
    // }
    
    $scope.resetLocal = function() {
        $localStorage.$reset(defaults);
    };

    $scope.clearSession = function() {
        $sessionStorage.$reset();
    };

    $scope.reload = function() {
        location.reload();
    }
    $scope.pushGAEvent = function (category, action, label) {
      miscService.pushGAEvent(category, action, label);
    }
    $scope.openSidebar = function() {
      $scope.$storage.showSidebar = true;
      miscService.pushGAEvent('Sidebar','Show/Hide Sidebar', 'Show Sidebar');
    }
    $scope.closeSidebar = function() {
      $scope.$storage.showSidebar = false;
      miscService.pushGAEvent('Sidebar','Show/Hide Sidebar', 'Hide Sidebar');
    };

    //run init
    init();
  } ]);

  /* Username */
  app.controller('SessionCheckController', [ 'mainService', 'MISC_URLS', 'NAMES', '$rootScope', function(mainService, MISC_URLS, NAMES, $rootScope) {
    var that = this;
    that.user = [];
    that.feedbackURL = MISC_URLS.feedbackURL;
    that.back2ClassicURL = MISC_URLS.back2ClassicURL;
    that.whatsNewURL = MISC_URLS.whatsNewURL;

    //initialize GuestMode
    $rootScope.GuestMode = false;
    mainService.getUser().then(function(result){
      that.user = result;
      //check if is guest
      if (NAMES.guestUserName && that.user && that.user.userName === NAMES.guestUserName)
        $rootScope.GuestMode = true;

    });
  }]);

  app.controller('PortalPopupController', ['$localStorage', '$sessionStorage','$scope', '$document', 'APP_FLAGS', 'filterFilter', '$modal', 'portalFeaturesService', '$sanitize', function($localStorage, $sessionStorage, $scope, $document, APP_FLAGS, filterFilter, $modal, portalFeaturesService, $sanitize) {
     
     //scope functions ---------------------------------------------------------
     
     $scope.markAnnouncementsSeen = function() {
       $localStorage.lastSeenAnnouncementId = $scope.announcements[$scope.announcements.length - 1].id;
       if($scope.headerCtrl) {
         $scope.headerCtrl.navbarCollapsed = true;
       }
       postGetData($scope.features);
     }
     
     //local functions ---------------------------------------------------------
     
     var postGetData = function(features) {
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
               //TODO: take into consideration the expired announcement
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
             
             $scope.announcements = announcements.filter(hasNotSeen);
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


  /* Header */
  app.controller('PortalHeaderController', ['$rootScope', '$scope','$location', 'NAMES', 'APP_FLAGS', 'MISC_URLS', function($rootScope, $scope, $location, NAMES, APP_FLAGS, MISC_URLS) {
    this.navbarCollapsed = true;
    this.crest = $rootScope.portal.crest;
    this.crestalt = NAMES.crestalt;
    this.sublogo = NAMES.sublogo;
    this.showLogout = !APP_FLAGS.showSidebar;
    $scope.showSearch = false;
    $scope.showSearchFocus = false;
    $scope.APP_FLAGS = APP_FLAGS;
    $scope.MISC_URLS = MISC_URLS;

    this.toggleSearch = function() {
        $scope.showSearch = !$scope.showSearch;
        $scope.showSearchFocus = !$scope.showSearchFocus;
    }
  }]);

  /* Footer */
  app.controller('PortalFooterController', ['$scope', function($scope) {
      $scope.date = new Date();

  }]);

  app.controller('PortalSidebarController',[ '$localStorage', '$scope', 'mainService', 'miscService', 'MISC_URLS', 'APP_FLAGS', function($localStorage, $scope, mainService, miscService, MISC_URLS, APP_FLAGS) {
      $scope.$storage = $localStorage;
      $scope.sidebar = [];
      $scope.MISC_URLS = MISC_URLS;
      $scope.APP_FLAGS = APP_FLAGS;
      mainService.getSidebar().then(function(result){
          $scope.sidebar = result.data.sidebar;
      });

      this.canSee = function(storageVar) {
          if(storageVar === '')
              return true;
          else {
              return $scope.$storage[storageVar];
          }
      }
  }]);

  return app;

});
