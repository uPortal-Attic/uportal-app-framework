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
    
  }]);
		
		
	return app;

});