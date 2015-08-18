'use strict';

define(['angular','require'], function(angular, require) {
  var app = angular.module('portal.features.controllers', []);
	
	
	app.controller('FeaturesController', ['$localStorage', '$sessionStorage','$scope', '$document', 'APP_FLAGS', '$modal', 'featuresService', '$sanitize', function($localStorage, $sessionStorage, $scope, $document, APP_FLAGS, $modal, featuresService, $sanitize) {
		
		
		
		if (APP_FLAGS.features) {
			featuresService.getFeatures().then(function(data) {
				var features = data;
				if (features.data.length > 0) {
					$scope.features = features.data;
				} else {
					$scope.features = {} //init view
				}
			})
		}
		
		
		
     var openModal = function() {
      if (APP_FLAGS.welcome && !$localStorage.hasSeenWelcome) {
        
        mainService.getWelcome().then(function(data) {
            var welcome = data;
            if (welcome.data.length > 0) {
                $scope.welcome = welcome.data[0];
            } else {
                $scope.welcome = {};//init view
            }
            var today = Date.parse(new Date());
            var startDate = Date.parse(new Date($scope.welcome.startYear, $scope.welcome.startMonth, $scope.welcome.startDay));
            if (today > startDate) {
              $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: require.toUrl('./partials/welcome-modal-template.html'),
                size: 'lg',
                scope: $scope 
              });
              $localStorage.hasSeenWelcome = true;
            }
        });
      }
    };
    
    openModal();
    
  }]);
  
  app.controller('WelcomeModalController', function ($scope, $modalInstance, $modal, mainService) {
  
      mainService.getWelcome().then(function(data) {
          var welcome = data;
          if (welcome !== null) {
              $scope.welcome = welcome;
          } else {
              $scope.welcome = {};//init view
          }
  
      });
  
      $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
      };
  });
	
	return app;

});